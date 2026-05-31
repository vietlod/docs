# build-runbook.md - Hướng dẫn Biên dịch & Vận hành

Tài liệu này cung cấp các lệnh CLI cụ thể và quy trình vận hành để xây dựng, kiểm thử, chạy thử và khôi phục (rollback) hệ thống tài liệu và ứng dụng.

---

## 1. Vận hành Cổng Tài liệu (`docs.tnsai.vn`)

### 1.1 Môi trường Phát triển (Local Development)
*   **Cài đặt dependencies**:
    ```bash
    npm install
    ```
*   **Chạy local server với hot-reload**:
    ```bash
    npm run start
    # Hoặc: npm run dev
    ```
    *Giao diện sẽ chạy tại: `http://localhost:3000/`*

*   **Biên dịch tĩnh kiểm thử**:
    ```bash
    npm run build
    ```
*   **Chạy thử bản build tĩnh cục bộ**:
    ```bash
    npm run serve
    ```

### 1.2 Môi trường Standalone Docker (Chạy thử cục bộ bằng Container)
*   **Xây dựng và khởi chạy container**:
    ```bash
    docker compose up -d --build
    ```
    *Giao diện sẽ chạy tại: `http://localhost:3001/`*
*   **Kiểm tra logs container**:
    ```bash
    docker logs -f ecodata-docs-standalone
    ```
*   **Dừng container**:
    ```bash
    docker compose down
    ```

### 1.3 Quy trình triển khai & Build trên VPS (Production Build)
*   **Đồng bộ mã nguồn**:
    ```bash
    cd /opt/docs/ecodata
    git pull origin main
    ```
*   **Chạy biên dịch**:
    ```bash
    npm run build
    ```
    *Thư mục build tĩnh đầu ra sẽ nằm tại `/opt/docs/ecodata/build`.*

---

## 2. Vận hành PDFHub trên VPS (Docker Compose)

*   **Chạy lại và cập nhật cấu hình môi trường**:
    ```bash
    cd /opt/pdfhub
    docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build backend celery-worker
    ```
*   **Xem logs thời gian thực**:
    ```bash
    docker compose -f docker-compose.prod.yml logs -f backend
    ```
*   **Chạy database migration**:
    ```bash
    docker compose -f docker-compose.prod.yml exec backend alembic upgrade head
    ```

---

## 3. Quy trình khôi phục nhanh (Rollback Runbook)

Khi phát hiện bản deploy mới trên VPS bị lỗi nghiêm trọng hoặc hỏng liên kết:

1.  **Dừng và quay lại commit trước đó**:
    ```bash
    cd /opt/docs/ecodata
    git log --oneline -5
    # Reset về commit hash an toàn gần nhất
    git reset --hard <COMMIT_HASH>
    ```
2.  **Biên dịch lại bản cũ**:
    ```bash
    npm run build
    ```
3.  **Khôi phục Nginx (nếu sửa file config Nginx lỗi)**:
    *   Khôi phục file backup cấu hình Nginx.
    *   Chạy `nginx -t` và `systemctl reload nginx`.
