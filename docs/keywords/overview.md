---
title: Tổng quan KEYWORDs
sidebar_position: 1
---

# Tổng quan KEYWORDs

**Keywords Extraction Platform** là hệ thống tự động cào, trích xuất và phân tích tần suất từ khóa song ngữ (Tiếng Việt + Tiếng Anh) từ các báo cáo thường niên (BCTN) và tài liệu doanh nghiệp. Hệ thống được thiết kế chuyên biệt để hỗ trợ các nhà nghiên cứu tài chính và SEO phân tích xu hướng công nghệ, chiến lược chuyển đổi số và mức độ tập trung phát triển của doanh nghiệp thông qua ngôn ngữ báo cáo.

---

## 1. Kiến trúc Hệ thống

Ứng dụng được thiết kế trên mô hình container hóa Docker với các thành phần cốt lõi:

*   **Frontend (React + Vite, TypeScript):** Cung cấp bảng điều khiển thời gian thực, biểu đồ phân tích nhóm từ khóa, wordcloud sinh động và bảng thống kê heatmap trực quan.
*   **Backend API (FastAPI, Python 3.11):** Xử lý xác thực Google OAuth2, quản lý phiên làm việc và giao tiếp thời gian thực qua WebSocket.
*   **Hàng đợi tác vụ (Celery + Redis 7):** Quản lý tiến trình trích xuất tài liệu ngầm theo thứ tự để bảo vệ tài nguyên phần cứng của VPS.
*   **Bộ trích xuất văn bản (Extraction Engine):** Tích hợp các thư viện chuyên sâu xử lý đa định dạng (PyMuPDF, pdfplumber, python-docx, openpyxl, pandas) và bộ máy OCR (EasyOCR) local.
*   **Cơ sở dữ liệu (SQLite):** Lưu trữ thông tin công việc (jobs), kết quả phân tích tần suất từ khóa và cấu hình riêng biệt của từng người dùng.

---

## 2. 11 Nhóm từ khóa Công nghệ & Tài chính mặc định

Hệ thống tự động nhận diện và phân loại từ khóa thành 11 nhóm chuyên sâu (được tải động từ tệp định nghĩa từ khóa):

1.  **Hạ tầng dữ liệu (Data Infrastructure):** Quản trị dữ liệu, Big Data, kho dữ liệu.
2.  **Phân tích & AI (Analytics & AI):** Học máy (Machine Learning), phân tích dự báo, xử lý ngôn ngữ tự nhiên (NLP).
3.  **Hạ tầng đám mây (Cloud Infrastructure):** Điện toán đám mây, SaaS, microservices.
4.  **Sổ cái & Bảo mật (Ledger Technology & Security):** Blockchain, mật mã học, an ninh mạng (cybersecurity).
5.  **Quản trị & Vận hành (Governance & Operations):** RegTech, tuân thủ, quản trị rủi ro.
6.  **Ngân hàng mở (Open Banking):** API banking, open finance, BaaS.
7.  **Dịch vụ ngân hàng số (Digital Banking Services):** Mobile banking, định danh điện tử (eKYC).
8.  **Cho vay & Huy động vốn (Lending & Fundraising):** Cho vay ngang hàng (P2P), gọi vốn cộng đồng, mua trước trả sau (BNPL).
9.  **Thanh toán & Ví điện tử (Payments & Digital Wallets):** Ví điện tử, thanh toán mã QR, thanh toán không tiếp xúc.
10. **Sản phẩm tài chính mới (New Financial Products):** InsurTech (công nghệ bảo hiểm), WealthTech, robot tư vấn.
11. **Quản trị thông minh & Tiếp thị (Smart Governance & Marketing):** Digital marketing, hệ thống CRM, phân tích hành vi khách hàng.

---

## 3. Mô hình cô lập không gian làm việc (Workspace Isolation)

Để hỗ trợ nhiều nhà nghiên cứu sử dụng chung hệ thống mà không ảnh hưởng lẫn nhau, KEYWORDs triển khai mô hình cô lập dữ liệu tuyệt đối ở mức tài khoản người dùng:

*   **Cài đặt riêng biệt:** Mỗi email đăng nhập sở hữu một cấu hình thư mục Google Drive (`gdrive_folder_id`) và tệp từ khóa active (`keywords_xlsx`) riêng.
*   **Ảnh chụp cấu hình công việc (Job Snapshot):** Khi một công việc trích xuất được khởi chạy, hệ thống sẽ chụp lại cấu hình thư mục Drive và file từ khóa tại đúng thời điểm đó. Điều này đảm bảo kết quả trích xuất luôn nhất quán và có thể kiểm toán lại ngay cả khi người dùng thay đổi cài đặt sau này.
*   **Độc lập tác vụ:** Người dùng chỉ có quyền quản lý (tạm dừng, tiếp tục, chẩn đoán, xóa) các công việc do chính mình khởi tạo. Việc bắt đầu một job mới của người dùng A sẽ không ảnh hưởng đến tiến trình đang chạy của người dùng B.
