---
title: Tải lên tài liệu
sidebar_position: 1
---

# Tải lên & Quản lý Tài liệu PDF

Quy trình trích xuất dữ liệu của PDFHUB bắt đầu bằng việc tải lên và phân loại tài liệu nguồn. Hướng dẫn này sẽ chỉ dẫn bạn cách nạp tài liệu vào hệ thống một cách hiệu quả.

---

## 1. Giao diện Kéo-Thả & Quản lý Tài liệu (Document Explorer)

PDFHUB cung cấp một giao diện quản lý tài liệu trực quan (Document Explorer) để quản lý vòng đời tệp tin:

1.  Tại thanh điều hướng bên trái, chọn phân hệ **Quản lý tài liệu (Documents)**.
2.  Để tải lên tài liệu mới:
    *   **Kéo & Thả:** Kéo trực tiếp một hoặc nhiều tệp PDF từ thư mục máy tính của bạn vào vùng nhận diện nét đứt trên giao diện.
    *   **Duyệt tệp:** Nhấp vào vùng nhận diện để mở hộp thoại duyệt file của hệ thống và chọn các tệp PDF cần phân tích.
3.  Khi tệp tin được tải lên, hệ thống sẽ đưa file vào trạng thái *Đang tải lên* (Uploading), sau đó chuyển sang *Chờ xử lý* (Queued) trong khi chờ pipeline trích xuất.

---

## 2. Gắn nhãn phân loại (Metadata Tagging)

Để hệ thống định tuyến chính xác mô hình trích xuất và hỗ trợ việc truy vấn sau này, mỗi tài liệu cần được gắn các nhãn siêu dữ liệu (metadata tags) rõ ràng. Hệ thống sẽ tự động điền các nhãn này dựa trên phân tích tên file, hoặc bạn có thể chỉnh sửa thủ công:

*   **Năm công bố (Year):** Xác định mốc thời gian của số liệu thống kê trong tài liệu (ví dụ: `2024`).
*   **Cơ quan ban hành (Publisher):**
    *   `GSO` — Tổng cục Thống kê (Niên giám thống kê, báo cáo kinh tế xã hội).
    *   `GDC` — Tổng cục Hải quan (Báo cáo số liệu kim ngạch XNK).
    *   `MOF` — Bộ Tài chính / Cục Quản lý Giám sát Bảo hiểm.
    *   `Enterprise` — Báo cáo tài chính doanh nghiệp niêm yết.
*   **Loại tài liệu (Document Type):** Phân biệt giữa *Niên giám (Yearbook)*, *Báo cáo chuyên đề (Report)*, hoặc *Bản cáo bạch/Báo cáo tài chính (Financial Statement)*.
*   **Chủ đề chỉ tiêu (Topic/Domain):** Lĩnh vực chính của dữ liệu (ví dụ: *GDP, Thương mại, Lao động việc làm, Bảo hiểm phi nhân thọ*).

---

## 3. Ràng buộc & Giới hạn Tệp tin (Ingestion Constraints)

Để đảm bảo độ ổn định của máy chủ và tối ưu hóa chi phí API parsing, PDFHUB áp dụng các giới hạn tệp tin sau:

| Tiêu chí giới hạn | Ngưỡng tối đa | Hướng xử lý đề xuất |
| :--- | :--- | :--- |
| **Dung lượng file** | 50 MB | Nếu tài liệu quá nặng (như Niên giám Thống kê 1000 trang), khuyến nghị sử dụng công cụ cắt PDF để chỉ giữ lại các chương phụ lục chứa bảng số liệu trước khi tải lên. |
| **Độ dài trang** | 200 trang | Hệ thống hỗ trợ giới hạn dải trang parsing (Page Range). Bạn có thể đặt tham số `page_range="300-350"` để chỉ parse đúng vùng trang chứa bảng mục tiêu, tiết kiệm tài nguyên. |
| **Độ phân giải scan** | Tối thiểu 150 DPI | Với các tài liệu scan cũ, đảm bảo chữ trên trang không bị nhòe hoặc quá mờ để bộ OCR của LlamaParse/LiteParse nhận diện ký hiệu số chính xác. |
