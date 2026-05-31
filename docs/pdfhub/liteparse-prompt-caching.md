---
title: LiteParse & Prompt Caching
sidebar_position: 3
---

# Tối ưu hóa với LiteParse & Prompt Caching

Để giảm thiểu chi phí vận hành API và tăng tốc độ xử lý dữ liệu lớn, PDFHUB tích hợp hai công nghệ tối ưu hóa cốt lõi: công cụ parsing tài liệu local **LiteParse** và cơ chế **Prompt Caching** (Bộ nhớ đệm câu lệnh).

---

## 1. LiteParse: Công cụ Parsing Bố cục Local

Trong khi LlamaParse Cloud cung cấp khả năng phân tích cực kỳ mạnh mẽ nhờ tài nguyên đám mây, PDFHUB hỗ trợ thêm công cụ **LiteParse** chạy trực tiếp trên máy chủ local (không yêu cầu GPU) cho các trường hợp cần bảo mật dữ liệu tuyệt đối hoặc tiết kiệm chi phí:

*   **Không cần mô hình lớn (Model-Free):** LiteParse sử dụng các thuật toán phân tích hình học không gian (spatial geometry) để xác định các dòng, cột và khối văn bản trực tiếp từ mã vector của tệp PDF.
*   **Hỗ trợ OCR Local:** Đối với các trang scan, LiteParse tích hợp công cụ OCR nhẹ (như PaddleOCR hoặc Tesseract) để nhận diện ký tự mà không cần gửi dữ liệu ra Internet.
*   **Bảo toàn cấu trúc không gian (Spatial Layout Preservation):** Trích xuất văn bản kèm theo tọa độ ranh giới $(x, y, w, h)$ của từng phần tử, giữ nguyên cấu trúc bố cục gốc.
*   **Chạy qua CLI:** Bạn có thể khởi chạy tác vụ parse nhanh trên máy chủ thông qua dòng lệnh:
    ```bash
    liteparse parse --file report.pdf --format markdown --output result.md
    ```

---

## 2. Prompt Caching: Tiết kiệm chi phí API

Khi người dùng thực hiện truy vấn RAG hoặc trích xuất số liệu nhiều lần trên cùng một tài liệu PDF lớn (ví dụ: liên tục hỏi đáp về một Báo cáo tài chính doanh nghiệp 150 trang), chi phí gửi toàn bộ ngữ cảnh tài liệu lên các LLM đám mây (như Anthropic Claude hay Google Gemini) là rất lớn. PDFHUB giải quyết bài toán này bằng cơ chế **Prompt Caching**:

```
Yêu cầu truy vấn 1 ──► Gửi đầy đủ (Prompt + 150 trang PDF) ──► Server xử lý & Lưu Cache (100% chi phí)
Yêu cầu truy vấn 2 ──► Gửi (Prompt mới + Cache Token ID) ─► Server tái sử dụng Cache (Giảm ~80% chi phí)
```

### Cách thức hoạt động
1.  **Phát hiện Tiền tố Trùng lặp (Prefix Matching):** Hệ thống chia nhỏ câu lệnh gửi đi thành các phần. Phần văn bản tài liệu PDF lớn (ngữ cảnh nền) được đặt ở đầu câu lệnh (System Prompt / Context block).
2.  **Lưu trữ trạng thái (Caching):** Ở lần truy vấn đầu tiên, nhà cung cấp mô hình (ví dụ: Anthropic/DeepSeek) sẽ biên dịch và lưu trạng thái phân tích ngữ cảnh tài liệu này vào bộ nhớ đệm của họ.
3.  **Tái sử dụng (Cache Hit):** Ở các câu hỏi tiếp theo của cùng phiên chat, hệ thống chỉ gửi câu hỏi mới và mã định danh bộ đệm. Mô hình sẽ tái sử dụng trạng thái đã cache để trả lời ngay lập tức.

### Hiệu quả kinh tế
*   **Giảm chi phí đầu vào:** Giảm từ **50% đến 80%** chi phí token đầu vào (input tokens) đối với các tài liệu dài trên 10.000 từ.
*   **Giảm độ trễ (Time-to-first-token):** Tốc độ phản hồi từ khi người dùng bấm gửi đến khi AI bắt đầu gõ chữ nhanh hơn gấp **3 - 5 lần** do mô hình không phải đọc lại toàn bộ văn bản từ đầu.
