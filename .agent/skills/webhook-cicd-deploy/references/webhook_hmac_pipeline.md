# Luồng Xử lý HTTPS Webhook & Xác thực HMAC SHA-256

## 1. Sơ đồ Luồng Triển khai Tự động (Auto-Deploy Pipeline)

```
[Git Push / Sveltia CMS Commit (main)]
        │
        ▼ (HTTPS POST + X-Hub-Signature-256)
[Nginx Reverse Proxy: https://docs.tnsai.vn/webhook/docs]
        │
        ▼ (proxy_pass http://127.0.0.1:3051)
[PM2 Service: docs-webhook (/opt/docs/webhook)]
        │
        ├── 1. Kiểm tra HMAC SHA-256 (WEBHOOK_SECRET)
        ├── 2. Kiểm tra ref === "refs/heads/main"
        └── 3. Thực thi nền: cd /opt/docs/ecodata && git pull origin main && npm run build
```

## 2. Các Điểm Cuối (Endpoints) Kiểm tra Trạng thái

- **Healthcheck Endpoint**: `GET https://docs.tnsai.vn/webhook/health` -> Trả về HTTP 200 kèm JSON trạng thái.
- **Webhook Receiver**: `POST https://docs.tnsai.vn/webhook/docs` -> Trả về HTTP 202 Accepted ngay khi chữ ký hợp lệ để tránh timeout từ phía GitHub (10 giây).
