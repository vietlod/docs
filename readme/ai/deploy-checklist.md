# deploy-checklist.md - Quy trình Triển khai Lên VPS (Production Deploy)

Tài liệu này cung cấp checklist các bước triển khai an toàn và có hệ thống dành cho việc cập nhật tài liệu `docs.tnsai.vn` và cấu hình hệ thống `pdfhub.tnsai.vn`.

---

## 1. Triển khai Cổng Tài liệu (`docs.tnsai.vn`)

### Bước 1: Kiểm tra trước triển khai (Pre-Deploy Checks - Local)
*   [ ] Chạy biên dịch thử nghiệm cục bộ thành công: `npm run build`
*   [ ] Đảm bảo không có lỗi broken links hoặc lỗi MDX.
*   [ ] Xác nhận tất cả các file dịch Tiếng Anh đã được cập nhật tương ứng.
*   [ ] Commit code sạch sẽ và đẩy lên GitHub: `git push origin main`

### Bước 2: Triển khai trên VPS (Deploy execution)
*   [ ] SSH kết nối vào VPS bằng tài khoản root.
*   [ ] Di chuyển vào thư mục dự án: `cd /opt/docs/ecodata`
*   [ ] Kéo code mới: `git pull origin main`
*   [ ] Tạo bản build tĩnh mới trên VPS: `npm run build`
*   [ ] Đảm bảo thư mục `/opt/docs/ecodata/build` chứa các tệp tĩnh vừa tạo.

### Bước 3: Xác minh sau triển khai (Post-Deploy Verification)
*   [ ] Kiểm tra truy cập qua HTTPS: `curl -I https://docs.tnsai.vn/` (phải trả về HTTP 200).
*   [ ] Kiểm tra chuyển đổi Tiếng Anh / Tiếng Việt trên giao diện trực tiếp.
*   [ ] Đảm bảo không có lỗi 404 khi chuyển đổi sidebar giữa các app.

---

## 2. Triển khai & Chuyển đổi Cấu hình PDFHub (`pdfhub.tnsai.vn`)

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
