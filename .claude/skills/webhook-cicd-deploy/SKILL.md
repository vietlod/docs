---
name: webhook-cicd-deploy
description: >
  Quản lý quy trình CI/CD tự động qua HTTPS Webhook (https://docs.tnsai.vn/webhook/docs -> PM2
  docs-webhook tại cổng 3051), xác thực chữ ký bảo mật HMAC SHA-256, và quy trình biên dịch tĩnh
  (git pull && npm run build) tại /opt/docs/ecodata trên VPS. Kích hoạt khi kiểm tra tiến trình
  auto-deploy, cấu hìnhビルド trong package.json/Dockerfile/Makefile, hoặc xử lý lỗi triển khai CI/CD.
  Không dùng cho việc biên tập nội dung học thuật hay chỉnh sửa CSS giao diện.
---

# Hướng dẫn Vận hành CI/CD HTTPS Webhook & Triển khai Tĩnh

## 1. Nguyên tắc Cốt lõi (Core Principles)
- **Kiến trúc Native HTTPS Webhook (Thay thế SSH GitHub Actions)**: Do nhà cung cấp hạ tầng VPS chặn kết nối SSH inbound từ các dải IP của GitHub Actions runner, toàn bộ luồng CI/CD sử dụng **HTTPS Webhook trực tiếp** (`https://docs.tnsai.vn/webhook/docs`) trỏ về dịch vụ Node.js `docs-webhook` chạy trên `127.0.0.1:3051` dưới sự quản lý của PM2.
- **Xác thực Chữ ký HMAC SHA-256**: Mọi gói tin POST từ GitHub bắt buộc được kiểm tra header `X-Hub-Signature-256` khớp với `WEBHOOK_SECRET` trước khi kích hoạt lệnh `cd /opt/docs/ecodata && git pull origin main && npm run build`.
- **Triển khai Zero-Downtime**: Quá trình `npm run build` chỉ ghi đè thư mục `/opt/docs/ecodata/build` sau khi biên dịch hoàn tất; Nginx phục vụ trực tiếp tệp tĩnh từ thư mục này mà không cần reload dịch vụ.

## 2. Quy trình Thực hiện (Progressive Workflow)
1. **Chạy kịch bản kiểm tra cấu hình build & tài liệu triển khai Webhook**:
   ```bash
   python .agents/skills/webhook-cicd-deploy/scripts/verify_webhook.py
   ```
2. **Tham chiếu luồng xử lý HMAC SHA-256 & Webhook**: Đọc [`references/webhook_hmac_pipeline.md`](references/webhook_hmac_pipeline.md) khi kiểm tra sự kiện push từ GitHub hoặc Sveltia CMS.
3. **Tham chiếu lệnh vận hành PM2 & Triển khai thủ công dự phòng**: Đọc [`references/pm2_operations.md`](references/pm2_operations.md) khi cần kiểm tra log hoặc chạy build thủ công qua SSH (`plink.exe`).
