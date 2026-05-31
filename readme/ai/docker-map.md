# docker-map.md - Bản đồ Container & Docker Topology

Tài liệu này mô tả cấu trúc Docker của dự án tài liệu và ứng dụng PDFHub có liên quan trên máy chủ VPS.

---

## 1. Dịch vụ Tài liệu Standalone (Docusaurus)

*   **Tệp tin cấu hình**:
    *   Compose: [`/docker-compose.yml`](file:///d:/docs/docker-compose.yml)
    *   Dockerfile: [`/Dockerfile`](file:///d:/docs/Dockerfile)
    *   Nginx lồng: [`/default.conf`](file:///d:/docs/default.conf)
*   **Chi tiết Service**:

| Service Name | Container Name | Host Port | Internal Port | Môi trường | Vai trò |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `docs` | `ecodata-docs-standalone` | `3001` | `80` | Production (Docker-mode) | Chạy độc lập dưới cổng 3001 thông qua container Nginx tĩnh. |

*   *Lưu ý*: Hiện tại trên VPS, cấu hình Nginx Host đang trỏ trực tiếp vào thư mục tệp tĩnh `/opt/docs/ecodata/build` thay vì proxy_pass vào container port 3001 để đạt hiệu suất tối đa. File docker-compose này dùng làm backup hoặc môi trường test độc lập.

---

## 2. Ứng dụng PDFHub (Multi-container Deployment)

*   **Tệp tin cấu hình**:
    *   Compose: `/opt/pdfhub/docker-compose.prod.yml`
    *   Environment File: `/opt/pdfhub/.env.prod`
*   **Chi tiết Dịch vụ**:

| Service Name | Container Name | Host Port | Internal Port | Loại dịch vụ | Vai trò |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `postgres` | `pdfhub-postgres` | `5436` | `5432` | PostgreSQL 16 | Lưu trữ thông tin cơ sở dữ liệu chính |
| `redis` | `pdfhub-redis` | `6382` | `6379` | Redis 7-Alpine | Bộ nhớ đệm (Cache) và Message Broker cho Celery |
| `neo4j` | `pdfhub-neo4j` | Internal only | `7474`, `7687` | Neo4j 5-Community | Lưu trữ Graph Database phục vụ Agentic RAG |
| `backend` | `pdfhub-backend` | `8007` | `8000` | FastAPI (Python) | API Backend phục vụ trích xuất và chat |
| `celery-worker` | `pdfhub-celery` | Internal only | — | Celery | Xử lý các tác vụ parsing PDF nặng ngầm |
| `frontend` | `pdfhub-frontend` | `3008` | `3000` | Next.js | Giao diện người dùng Webapp |

*   **Mạng (Networks)**: Sử dụng bridge network cô lập tên là `pdfhub-net`.
*   **Phụ thuộc (Volume Mounts)**:
    *   `pdfhub_prod_pgdata`: Lưu trữ database Postgres.
    *   `pdfhub_prod_redis`: Lưu trữ dữ liệu Redis.
    *   `pdfhub_prod_neo4j`: Lưu trữ database đồ thị Neo4j.
    *   `pdfhub_prod_uploads`: Thư mục lưu trữ tệp PDF tải lên (chia sẻ chung giữa `backend` và `celery-worker` tại `/app/uploads`).

---

## 3. Quy tắc An toàn Docker
*   **Cấm đổi cổng (Port Allocation Guard)**: Tuyệt đối không thay đổi các cổng map ngoài của PDFHub (Frontend: 3008, Backend: 8007, Postgres: 5436, Redis: 6382) vì chúng đã được cố định trong cấu hình Nginx reverse proxy của Host. Việc đổi cổng sẽ gây lỗi 502.
*   **Cách khởi động lại an toàn**: Khi thay đổi cấu hình môi trường, chỉ khởi động lại các container tương ứng (ví dụ: `backend` và `celery-worker`), không restart database `postgres` hoặc `neo4j` nếu không cần thiết để tránh gián đoạn truy cập dữ liệu.
