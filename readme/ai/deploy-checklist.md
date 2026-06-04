# deploy-checklist.md - Quy trình Triển khai Lên VPS (Production Deploy)

Tài liệu này cung cấp checklist các bước triển khai an toàn và có hệ thống dành cho việc cập nhật tài liệu `docs.tnsai.vn` và cấu hình hệ thống `pdfhub.tnsai.vn`.

> **Biến môi trường triển khai**: Tất cả thông tin đăng nhập VPS, GitHub Token, OAuth credentials được lưu tại `/.env.deploy` (gitignored, chỉ tồn tại trên máy local). AI Agent đọc file này để lấy biến khi cần triển khai.

---

## 1. Triển khai Cổng Tài liệu (`docs.tnsai.vn`)

### Phương thức A: CI/CD Tự động (Khuyên dùng)

Khi có push lên nhánh `main` với thay đổi ở `docs/`, `i18n/`, `static/`, `src/`, `sidebars.js`, `docusaurus.config.js` hoặc `package.json`:
1. **GitHub Actions** tự động trigger workflow `.github/workflows/deploy.yml`
2. Build Docusaurus trên GitHub runner (không tốn CPU VPS)
3. rsync `build/` xuống VPS tại `/opt/docs/ecodata/build`
4. Nginx phục vụ nội dung mới ngay lập tức (không cần reload)

**Yêu cầu**: GitHub Secrets (`VPS_SSH_KEY`, `VPS_HOST`, `VPS_USER`) đã được cấu hình.

### Phương thức B: Triển khai thủ công qua SSH

#### Bước 1: Kiểm tra trước triển khai (Pre-Deploy Checks - Local)
*   [ ] Chạy biên dịch thử nghiệm cục bộ thành công: `npm run build`
*   [ ] Đảm bảo không có lỗi broken links hoặc lỗi MDX.
*   [ ] Xác nhận tất cả các file dịch Tiếng Anh đã được cập nhật tương ứng.
*   [ ] Commit code sạch sẽ và đẩy lên GitHub: `git push origin main`

#### Bước 2: Triển khai trên VPS (Deploy execution)

Sử dụng biến SSH từ `/.env.deploy`:
```powershell
# PowerShell — Kết nối VPS:
& "$env:VPS_PLINK" -ssh -pw "$env:VPS_PASSWORD" "$env:VPS_USER@$env:VPS_HOST" -hostkey "$env:VPS_HOSTKEY" "<lệnh>"

# Hoặc trực tiếp:
& "C:/Program Files/PuTTY/plink.exe" -ssh -pw '<VPS_PASSWORD>' root@<VPS_HOST> -hostkey "<VPS_HOSTKEY>" "cd /opt/docs/ecodata && git pull origin main && npm run build"
```

*   [ ] SSH kết nối vào VPS.
*   [ ] Di chuyển vào thư mục dự án: `cd /opt/docs/ecodata`
*   [ ] Kéo code mới: `git pull origin main`
*   [ ] Tạo bản build tĩnh mới trên VPS: `npm run build`
*   [ ] Đảm bảo thư mục `/opt/docs/ecodata/build` chứa các tệp tĩnh vừa tạo.

#### Bước 3: Xác minh sau triển khai (Post-Deploy Verification)
*   [ ] Kiểm tra truy cập qua HTTPS: `curl -I https://docs.tnsai.vn/` (phải trả về HTTP 200).
*   [ ] Kiểm tra chuyển đổi Tiếng Anh / Tiếng Việt trên giao diện trực tiếp.
*   [ ] Đảm bảo không có lỗi 404 khi chuyển đổi sidebar giữa các app.
*   [ ] Kiểm tra trang CMS admin: `https://docs.tnsai.vn/admin/` (phải hiển thị giao diện Sveltia CMS).

---

## 2. Quản lý Dịch vụ CMS trên VPS

### OAuth Proxy (`docs-oauth-proxy`)
*   **Đường dẫn**: `/opt/docs/oauth-proxy/`
*   **PM2**: `pm2 restart docs-oauth-proxy` | `pm2 logs docs-oauth-proxy`
*   **Port**: `3050` (nội bộ `127.0.0.1`, Nginx proxy tại `/oauth/`)
*   **Cấu hình**: `ecosystem.config.js` chứa `GITHUB_OAUTH_CLIENT_ID` và `GITHUB_OAUTH_CLIENT_SECRET`

### Khởi động lại OAuth Proxy (nếu cần)
```bash
cd /opt/docs/oauth-proxy && pm2 restart docs-oauth-proxy --update-env
pm2 logs docs-oauth-proxy --lines 5 --nostream
```

---

## 3. Triển khai & Chuyển đổi Cấu hình PDFHub (`pdfhub.tnsai.vn`)

### Bước 1: Cập nhật biến môi trường trên VPS
*   [ ] Truy cập tệp `/opt/pdfhub/.env.prod` và chỉnh sửa:
    *   `CORS_ORIGINS=https://pdfhub.tnsai.vn`
    *   `TNS_REDIRECT_URI=https://pdfhub.tnsai.vn/auth/callback`

### Bước 2: Khởi động lại Container Backend
*   [ ] Di chuyển tới `/opt/pdfhub`.
*   [ ] Restart các dịch vụ bị ảnh hưởng bởi biến môi trường:
    ```bash
    docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build backend celery-worker
    ```
*   [ ] Đảm bảo container chạy lại thành công: `docker ps --filter name=pdfhub`

### Bước 3: Cấu hình và Tải lại Nginx
*   [ ] Tạo file cấu hình Virtual Host `/etc/nginx/sites-available/pdfhub.tnsai.vn`.
*   [ ] Tạo symlink kích hoạt: `ln -sf /etc/nginx/sites-available/pdfhub.tnsai.vn /etc/nginx/sites-enabled/`
*   [ ] Xóa bỏ Virtual Host cũ: `rm -f /etc/nginx/sites-enabled/pdfhub.tnsai.tech`
*   [ ] Chạy `nginx -t` kiểm tra cú pháp thành công.
*   [ ] Reload Nginx: `systemctl reload nginx`

### Bước 4: Kiểm tra hoạt động (Smoke Tests)
*   [ ] Kiểm tra healthcheck: `curl https://pdfhub.tnsai.vn/health` (phải trả về status: ok).
*   [ ] Đăng nhập thử qua TNS SSO để kiểm tra callback redirect URI.
*   [ ] Upload và parse một tệp tin PDF mẫu để đảm bảo CORS backend hoạt động vững.

