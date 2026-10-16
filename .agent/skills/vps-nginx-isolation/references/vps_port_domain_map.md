# Bản đồ Đăng ký Cổng Nội bộ & Tên miền trên VPS (`31.97.110.12`)

## 1. Bảng Phân bổ Tài nguyên Đang Hoạt động (Cấm Xung đột)

| Ứng dụng | Tên miền công khai | Cổng nội bộ đã cấp phát | Thư mục VPS |
| :--- | :--- | :--- | :--- |
| **TNS AI Docs** | `docs.tnsai.vn`, `ecodata.tnsai.vn` | Tệp tĩnh + `3050` (OAuth) + `3051` (Webhook) | `/opt/docs/ecodata` |
| **PDFHub** | `pdfhub.tnsai.vn` | FE: `3008`, BE: `8007`, PG: `5436`, Redis: `6382` | `/opt/pdfhub` |
| **EcoLab** | `ecolab.io.vn`, `econlab.tnsai.tech` | FE: `3003`, BE: `8006`, PG: `5434`, Redis: `6381`, RMQ: `5673`/`15673` | `/opt/econlab` |
| **EcoLit** | `ecolit.io.vn`, `econlit.tnsai.tech` | FE: `3003`, BE: `8006`, PG: `5435`, Redis: `6381` | `/opt/econlit` |
| **KEYWORDs** | `keywords.tnsai.vn` | FE: `3002` | `/opt/keywords` |
| **Bộ Dữ Liệu** | `bodulieu.tnsai.vn` | `3014` | `/opt/bodulieu` |
| **Vietlod WP** | `vietlod.tnsai.vn` | `3012` | `/opt/vietlod` |
| **Sách KTL WP** | `sachktl.tnsai.vn` | `3013` | `/opt/sachktl` |
| **KidsMath** | `kidsmath.tnsai.tech` | `3010` | `/opt/kidsmath` |
| **Marketplace** | `marketplace.tnsai.vn` | `3306` (MariaDB) | `/opt/marketplace` |

## 2. Quy tắc Leo thang (Escalation Gate)

Theo `/Agents.md`, nếu phát hiện bất kỳ yêu cầu mở cổng mới nào trùng với danh sách cổng trên hoặc lệnh `certbot` báo lỗi xác thực bản ghi DNS A/AAAA, Agent phải **DỪNG LẠI NGAY LẬP TỨC** và báo cáo người dùng.
