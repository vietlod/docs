# vps-app-context.md - Bản đồ Ứng dụng & Vận hành VPS

Tài liệu này lập hồ sơ cấu trúc và phân bổ tài nguyên của tất cả các ứng dụng đang chạy song song trên máy chủ VPS `31.97.110.12`, giúp tránh tuyệt đối việc sửa nhầm cổng, nhầm tệp tin cấu hình hoặc gây ảnh hưởng chéo (cross-app impact).

---

## 1. Hồ sơ Máy chủ (Server Specifications)

*   **Địa chỉ IP VPS**: `31.97.110.12`
*   **Hệ điều hành**: Ubuntu 24.04 LTS
*   **Môi trường runtime**:
    *   Node.js: `v22.22.2` (npm `v10.9.7`)
    *   Docker: Đang hoạt động (quản lý phần lớn các app qua Docker Compose)
    *   Nginx: Đang hoạt động (đóng vai trò Reverse Proxy và SSL Termination trên Host)

---

## 2. Bản đồ Phân bổ Cổng và Tên miền (Subdomain & Port Map)

Dưới đây là danh sách phân bổ tài nguyên thực tế của các ứng dụng trên VPS:

| Ứng dụng | Tên miền công khai | Cổng nội bộ | Loại hình dịch vụ | Đường dẫn dự án trên VPS | Tệp cấu hình Nginx trên Host |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TNS AI Docs** | `docs.tnsai.vn` | Tệp tĩnh | Docusaurus Build | `/opt/docs/ecodata` | `/etc/nginx/sites-available/docs.tnsai.vn` |
| **EcoData Docs** | `ecodata.tnsai.vn` | Tệp tĩnh | Docusaurus Build (chung) | `/opt/docs/ecodata` | `/etc/nginx/sites-available/ecodata.tnsai.vn` |
| **PDFHub** | `pdfhub.tnsai.vn` | Frontend: `3008`<br>Backend: `8007`<br>PostgreSQL: `5436`<br>Redis: `6382` | Docker Compose (Next.js + FastAPI + PostgreSQL + Redis + Celery + Neo4j) | `/opt/pdfhub` | `/etc/nginx/sites-available/pdfhub.tnsai.vn` |
| **EcoLab** | `ecolab.io.vn`<br>`econlab.tnsai.tech` | Frontend: `3003`<br>Backend: `8006`<br>PostgreSQL: `5434`<br>Redis: `6381`<br>RabbitMQ: `5673`/`15673` | Docker Compose (Python quantitative modeling engine + R + SePay) | `/opt/econlab` (hoặc tương đương) | `/etc/nginx/sites-available/ecolab.io.vn` |
| **EcoLit** | `ecolit.io.vn`<br>`econlit.tnsai.tech` | Frontend: `3003`<br>Backend: `8006`<br>PostgreSQL: `5435`<br>Redis: `6381` | Docker Compose (OpenAlex, Crossref, ORCID API integrator) | `/opt/econlit` | `/etc/nginx/sites-available/ecolit.io.vn` |
| **KEYWORDs** | `keywords.tnsai.vn` | Frontend: `3002` | Docker Compose (Crawler + OCR Matching) | `/opt/keywords` | `/etc/nginx/sites-available/keywords.tnsai.vn` |
| **Bộ Dữ Liệu** | `bodulieu.tnsai.vn` | `3014` | Docker Container (PHP App) | `/opt/bodulieu` | `/etc/nginx/sites-available/bodulieu.tnsai.vn` |
| **Vietlod WP** | `vietlod.tnsai.vn` | `3012` | Docker Container (WordPress) | `/opt/vietlod` | `/etc/nginx/sites-available/vietlod.tnsai.vn` |
| **Sách KTL WP** | `sachktl.tnsai.vn` | `3013` | Docker Container (WordPress) | `/opt/sachktl` | `/etc/nginx/sites-available/sachktl.tnsai.vn` |
| **KidsMath** | `kidsmath.tnsai.tech` | `3010` | Docker Container (Vite Frontend) | `/opt/kidsmath` | `/etc/nginx/sites-available/kidsmath.tnsai.tech` |
| **Marketplace** | `marketplace.tnsai.vn` | `3306` (MariaDB) | Docker Container | `/opt/marketplace` | `/etc/nginx/sites-available/marketplace.tnsai.vn` |

---

## 3. Rủi ro Ảnh hưởng Chéo & Biện pháp Đề phòng

> [!CAUTION]
> **Quy tắc an toàn tuyệt đối khi vận hành trên VPS:**
> 
> 1.  **Cấm sửa file cấu hình Nginx lạ**: Không mở hoặc chỉnh sửa bất kỳ tệp tin nào trong `/etc/nginx/sites-available/` mà không thuộc dự án `docs.tnsai.vn` hoặc `pdfhub.tnsai.vn` (hai dự án được giao quản lý).
> 2.  **Xác thực trước khi reload Nginx**: Trước khi chạy `systemctl reload nginx`, bắt buộc phải chạy `nginx -t` để đảm bảo cú pháp tệp cấu hình không bị lỗi. Nếu tệp cấu hình của bất kỳ app nào khác bị lỗi từ trước đó, lệnh reload sẽ thất bại hoặc làm sập toàn bộ dịch vụ Nginx trên VPS.
> 3.  **Không đụng vào cơ sở dữ liệu dùng chung**: Các container PostgreSQL (`port 5434, 5435, 5436`) và Redis (`port 6381, 6382`) chạy độc lập cho từng ứng dụng. Tuyệt đối không được dùng lệnh docker để restart các container DB của các dự án khác.
