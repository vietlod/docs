# Kiến trúc & Vận hành Dịch vụ GitHub OAuth Proxy (Port 3050)

## 1. Luồng Xác thực OAuth của Sveltia CMS

1. Quản trị viên truy cập `https://docs.tnsai.vn/admin/` và nhấn **Sign In with GitHub**.
2. Sveltia CMS mở popup tới `https://docs.tnsai.vn/oauth/auth`.
3. Nginx định tuyến block `location /oauth/` về `http://127.0.0.1:3050`.
4. Dịch vụ Node.js `docs-oauth-proxy` (quản lý bởi PM2 tại `/opt/docs/oauth-proxy/`) thực hiện trao đổi `code` lấy `access_token` với GitHub OAuth App và trả kết quả về cửa sổ `/admin/` qua `window.opener.postMessage`.

## 2. Lệnh Kiểm tra & Khởi động lại trên VPS

Khi cần kiểm tra trạng thái dịch vụ OAuth Proxy trên VPS `31.97.110.12`:
```bash
pm2 status docs-oauth-proxy
pm2 logs docs-oauth-proxy --lines 20 --nostream
```
Khởi động lại khi cập nhật biến môi trường (`GITHUB_OAUTH_CLIENT_ID` / `GITHUB_OAUTH_CLIENT_SECRET`):
```bash
cd /opt/docs/oauth-proxy && pm2 restart docs-oauth-proxy --update-env
```
> **Lưu ý an toàn**: Dịch vụ chỉ bind nội bộ trên `127.0.0.1:3050`, hoàn toàn cô lập với các ứng dụng Docker khác trên VPS.
