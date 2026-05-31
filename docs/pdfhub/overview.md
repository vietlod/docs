---
title: Tổng quan PDFHUB
sidebar_position: 1
---

# Tổng quan PDFHUB

**PDFHUB** là hệ thống trích xuất và phân tích báo cáo tài chính tự động (Automated Financial Document Parser & Analytics System). Ứng dụng tập trung vào việc xử lý các tài liệu PDF tiếng Việt phức tạp (báo cáo niên giám thống kê của GSO, báo cáo kim ngạch xuất nhập khẩu của Hải quan, báo cáo tài chính doanh nghiệp) để tự động trích xuất các bảng dữ liệu số liệu dày đặc thành cấu trúc dữ liệu sạch (JSON/CSV).

Dữ liệu sau khi trích xuất và chuẩn hóa được thiết kế để kết nối trực tiếp vào các môi trường phân tích kinh tế lượng và suy luận nhân quả (Python, R, Stata).

---

## 1. Thách thức với PDF Thống kê/Tài chính tiếng Việt

Các tài liệu tài chính và thống kê công bố tại Việt Nam thường có các đặc thù kỹ thuật khó xử lý đối với các OCR truyền thống:
*   **Mã tiếng Việt đặc thù:** Font chữ nhúng lạ hoặc bị tách ký tự (Unicode tổ hợp/dựng sẵn) làm vỡ chữ khi copy thô.
*   **Bảng biểu phức tạp:** Bảng chứa các ô gộp (merged cells), tiêu đề cột nhiều tầng, phân cụm địa phương/ngành và phụ chú nằm ngay sát chân bảng.
*   **Không đồng nhất cấu trúc:** Một loại chỉ tiêu (ví dụ: *GDP phân theo ngành*) có thể bị thay đổi nhẹ tên cột, đơn vị (tỷ đồng ↔ triệu USD) hoặc giá so sánh qua các năm.

---

## 2. Kiến trúc 4 tầng của PDFHUB

Để giải quyết triệt để các thách thức trên, PDFHUB được xây dựng trên một pipeline 4 tầng logic:

```
PDF Nguồn (GSO/GDC) ──► Tầng Quản lý (Document Management)
                         └──► Tầng Parsing (LlamaParse/LiteParse)
                                └──► Tầng Trích xuất (LlamaExtract/Pydantic Schema)
                                       └──► Tầng Chuẩn hóa & Nạp CSDL (PostgreSQL/DuckDB)
```

1.  **Tầng Quản lý tài liệu (Document Management):** Phân loại, gắn nhãn tài liệu theo năm, cơ quan ban hành (Tổng cục Thống kê, Tổng cục Hải quan, Bộ Tài chính) và chủ đề.
2.  **Tầng Parsing bố cục (Layout-aware Parsing):** Sử dụng **LlamaParse** Cloud hoặc **LiteParse** local để phân tích hình học trang tài liệu, cô lập bảng biểu khỏi văn bản xung quanh và xuất ra định dạng JSON/Markdown giữ nguyên cấu trúc hàng - cột.
3.  **Tầng Trích xuất cấu trúc (Schema-based Extraction):** Sử dụng các schema Pydantic/JSON định nghĩa trước để ánh xạ từng dòng của bảng (`PER_TABLE_ROW`) thành các bản ghi dữ liệu có kiểu dữ liệu rõ ràng.
4.  **Tầng Chuẩn hóa và Tổng hợp (Normalization):** Chuẩn hóa mã phân loại (mã ngành VSIC, mã địa giới hành chính, mã HS), xử lý các ký hiệu thiếu dữ liệu (như `-`, `..`, `x`) và ghép nối dữ liệu qua các năm thành bộ dữ liệu bảng (panel data) hoàn chỉnh.
