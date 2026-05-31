---
title: Phân tích Ngữ nghĩa SEO
sidebar_position: 3
---

# Bộ máy So khớp Từ khóa & Phân tích Ngữ nghĩa

Để mang lại kết quả đếm từ khóa chính xác nhất trên các văn bản định dạng phức tạp (như bảng biểu, văn bản căn lề hai bên, tệp scan chất lượng kém) mà vẫn đảm bảo hiệu năng máy chủ, KEYWORDs tích hợp bộ máy so khớp 3 lớp cùng cơ chế hiệu chuẩn OCR nâng cao.

---

## 1. Giới hạn tài nguyên & Tối ưu hóa đa luồng (Resource Isolation)

Để tránh hiện tượng tiến trình OCR chiếm dụng toàn bộ tài nguyên hệ thống làm ảnh hưởng đến các ứng dụng khác chạy chung trên VPS, KEYWORDs áp dụng các giới hạn phần cứng nghiêm ngặt ở mức container Docker và thư viện:

*   **Giới hạn phần cứng:** Container xử lý tác vụ (Celery worker) được giới hạn tối đa ở **2 vCPU** và **6 GB RAM**. Container backend được giới hạn ở **1.5 vCPU** và **1 GB RAM**.
*   **Cấu hình luồng thư viện (`runtime_limits.py`):** Ép buộc các thư viện tính toán nặng (PyTorch, OpenCV, OpenBLAS, MKL) và công cụ EasyOCR chỉ được chạy tối đa **2 luồng song song** trùng khớp với tài nguyên CPU được cấp phát. Điều này loại bỏ hoàn toàn hiện tượng nghẽn cổ chai và xung đột CPU (CPU runaway).

---

## 2. Cơ chế Hiệu chuẩn OCR đa phân giải (Multi-DPI Calibration)

Thông thường, việc quét OCR ở độ phân giải cố định (như 180 DPI) sẽ cho kết quả kém nếu tài liệu gốc có cỡ chữ quá nhỏ hoặc nét in bị nhòe. KEYWORDs giải quyết vấn đề này bằng thuật toán hiệu chuẩn thông minh:

1.  **Lấy mẫu thử nghiệm (Sampling):** Khi phát hiện tệp PDF dạng ảnh quét cần chạy OCR, hệ thống chọn ra 5 trang ngẫu nhiên mang tính đại diện.
2.  **Quét thử nghiệm đa phân giải:** Chạy thử OCR trên 5 trang này tại 5 mức phân giải (DPI) khác nhau: **150, 200, 250, 300, và 400 DPI**.
3.  **Đánh giá hiệu quả:** Đếm số lượng từ khóa thu được ở từng mức DPI. Mức DPI nào cho năng suất thu từ khóa cao nhất và có tự tin score tốt nhất sẽ được chọn làm **DPI tối ưu**.
4.  **Quét toàn bộ tài liệu:** Thực hiện quét toàn bộ trang của tài liệu tại đúng mức DPI tối ưu đã chọn. Cơ chế này giúp tăng độ chính xác trích xuất lên tới **40%** so với cấu hình DPI cố định.

---

## 3. Bộ máy so khớp từ khóa 3 lớp (3-Layer Keyword Matching Engine)

Các tệp PDF thường bị lỗi xuống dòng ngẫu nhiên hoặc lỗi mã hóa Unicode tiếng Việt khiến các công cụ tìm kiếm chuỗi thông thường bị bỏ sót từ khóa (false negatives). KEYWORDs triển khai bộ máy khớp từ khóa 3 lớp để khắc phục:

```
Văn bản đầu vào ──► Lớp 1: Exact Match (Khớp chuỗi chính xác)
                     └──► Lớp 2: Whitespace Normalization (Khớp gộp dòng \n)
                            └──► Lớp 3: Diacritics Stripping (Khớp không dấu fallback)
```

### Lớp 1: Khớp chính xác (Exact Match)
Thực hiện so khớp chuỗi nhạy chữ hoa/chữ thường thông thường để tìm kiếm các từ khóa khớp hoàn hảo.

### Lớp 2: Chuẩn hóa khoảng trắng (Whitespace Normalization)
*   **Vấn đề:** Trong PDF dạng cột, từ khóa có thể bị ngắt dòng bằng ký tự xuống dòng `\n` ở giữa từ (ví dụ: `Chuyển\nđổi số`).
*   **Giải pháp:** Hệ thống tự động gộp tất cả các khoảng trắng phức tạp và ký tự xuống dòng thành một khoảng trắng đơn trước khi so khớp. Từ khóa `Chuyển đổi số` sẽ khớp thành công với đoạn văn bị ngắt dòng trên.

### Lớp 3: Loại bỏ dấu tiếng Việt (Diacritics Stripping - Fallback)
*   **Vấn đề:** Nhiều tệp PDF tiếng Việt bị lỗi giải mã Unicode (lỗi font nhúng) khiến các nguyên âm có dấu bị tách rời hoặc hiển thị dưới dạng ký tự lạ (như `chuyển` thành `chuyê'n`).
*   **Giải pháp:** Khi hai lớp trên không khớp, hệ thống sẽ chuyển sang chế độ dự phòng an toàn: loại bỏ toàn bộ dấu tiếng Việt của cả từ khóa và văn bản nguồn để so khớp không dấu (ví dụ: `chuyen doi so` khớp với `chuyê'n đổi số`). Cơ chế này giúp thu hồi tối đa các chỉ số bị mất do lỗi định dạng file.

---

## 4. Xuất kịch bản Python (Google Colab Notebook)

Để hỗ trợ các nhà nghiên cứu muốn chạy phân tích độc lập trên máy cá nhân hoặc trên nền tảng đám mây miễn phí của Google:

*   Hệ thống cung cấp tính năng xuất kịch bản một chạm: tạo ra tệp kịch bản Jupyter Notebook `.ipynb` hoàn chỉnh (`fintech_extract.ipynb`).
*   Kịch bản này chứa đầy đủ mã nguồn Python được ghi chú chi tiết:
    *   Mã kết nối (mount) Google Drive cá nhân.
    *   Cài đặt các thư viện trích xuất text và OCR (PyMuPDF, EasyOCR).
    *   Bộ máy đếm từ khóa và phân nhóm tương tự như trên web.
    *   Mã xuất báo cáo Excel định dạng đẹp mắt.
*   Bạn chỉ cần tải file `.ipynb` này lên Google Colab và nhấn chạy toàn bộ (Run all) để xử lý dữ liệu hoàn toàn miễn phí mà không cần cài đặt môi trường phức tạp.
