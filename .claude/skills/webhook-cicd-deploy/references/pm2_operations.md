# Quy trình Quản lý PM2 & Triển khai Dự phòng qua SSH

## 1. Danh mục Tiến trình PM2 của Cổng Tài liệu trên VPS

| Tên tiến trình PM2 | Cổng nội bộ | Thư mục trên VPS | Vai trò |
| :--- | :--- | :--- | :--- |
| `docs-oauth-proxy` | `127.0.0.1:3050` | `/opt/docs/oauth-proxy` | Xác thực GitHub OAuth cho Sveltia CMS `/admin/` |
| `docs-webhook` | `127.0.0.1:3051` | `/opt/docs/webhook` | Nhận GitHub Webhook & tự động chạy `git pull && npm run build` |

## 2. Các Lệnh Chẩn đoán & Vận hành trên VPS

- **Xem trạng thái tiến trình**:
  ```bash
  pm2 list
  ```
- **Xem nhật ký triển khai của Webhook**:
  ```bash
  pm2 logs docs-webhook --lines 30 --nostream
  ```
- **Chạy đồng bộ và biên dịch thủ công qua SSH (khi cần kiểm tra trực tiếp)**:
  ```bash
  cd /opt/docs/ecodata && git pull origin main && npm run build
  ```
