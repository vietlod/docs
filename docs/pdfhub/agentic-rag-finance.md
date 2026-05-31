---
title: RAG Tài chính
sidebar_position: 4
---

# Agentic RAG & Trích xuất Số liệu Tài chính

Để xử lý các báo cáo tài chính doanh nghiệp (BCTC) phức tạp có tính ràng buộc toán học chặt chẽ, PDFHUB áp dụng công nghệ **Tác tử RAG (Agentic RAG)**. Hệ thống không chỉ tìm kiếm văn bản đơn thuần mà còn vận hành như một chuyên gia tài chính ảo, tự động kiểm tra chéo số liệu và xuất ra bộ dữ liệu sạch sẵn sàng cho nghiên cứu định lượng.

---

## 1. Nguyên lý hoạt động của Agentic RAG Tài chính

Khác với các hệ thống RAG thông thường chỉ cắt nhỏ file PDF và tìm kiếm theo độ tương đồng vector (Vector Search), Agentic RAG của PDFHUB vận hành theo quy trình suy luận và hành động có chủ đích:

```
Truy vấn của người dùng ──► Clarify Intent (Hiểu yêu cầu tài chính)
                            └──► Execute Plan (Tự chạy Cypher/Vector search)
                                   └──► Cross-Check (Kiểm tra logic toán học)
                                          └──► Synthesize (Trả lời kèm trích dẫn)
```

1.  **Hiểu ý đồ tài chính (Intent Clarification):** Nhận diện các chỉ tiêu tài chính cần tìm kiếm (ví dụ: *Hệ số nợ, ROE, Dòng tiền từ hoạt động kinh doanh*).
2.  **Lập kế hoạch truy vấn (Query Planning):** Tác tử AI tự động quyết định sử dụng công cụ nào để lấy dữ liệu: chạy truy vấn SQL/Cypher trên cơ sở dữ liệu số liệu đã parse, hay thực hiện Vector Search trên phần Thuyết minh báo cáo tài chính.
3.  **Thu thập và Trích xuất bằng chứng (Evidence Collection):** Truy vết các bảng số liệu gốc và đoạn văn thuyết minh cụ thể, lưu lại tọa độ trang và ID bảng để làm bằng chứng đối chiếu (audit trail).
4.  **Tổng hợp kèm kiểm tra chéo:** So sánh số liệu thuyết minh với số liệu trên bảng cân đối kế toán hoặc báo cáo kết quả kinh doanh để đảm bảo tính đồng nhất.

---

## 2. Cơ chế kiểm tra logic kế toán & Toán học (Cross-Check)

Báo cáo tài chính đòi hỏi tính chính xác tuyệt đối. Do đó, tác tử RAG của PDFHUB được tích hợp các thuật toán kiểm tra chéo tự động:

*   **Ràng buộc tổng thể (Aggregational Constraints):** Kiểm tra xem tổng các khoản mục con có bằng khoản mục lớn hay không.
    *   *Tổng tài sản = Tài sản ngắn hạn + Tài sản dài hạn*
    *   *Tổng nguồn vốn = Nợ phải trả + Vốn chủ sở hữu*
*   **Tính nhất quán của dòng tiền (Cash Flow Logic):** Đối chiếu số dư tiền và tương đương tiền cuối kỳ trên Báo cáo lưu chuyển tiền tệ với chỉ tiêu tương ứng trên Bảng cân đối kế toán.
*   **Phát hiện sai lệch:** Nếu phát hiện sai số vượt quá ngưỡng cho phép (do lỗi làm tròn số hoặc lỗi parser), hệ thống sẽ:
    *   Đánh dấu cảnh báo đỏ trên giao diện người dùng.
    *   Chỉ rõ ô số liệu bị nghi ngờ sai lệch.
    *   Tự động chạy lại bộ parser với cấu hình độ phân giải cao hơn.

---

## 3. Báo cáo chất lượng dữ liệu & Xuất kết quả

Sau khi quá trình trích xuất và kiểm tra chéo hoàn tất, PDFHUB cung cấp:

### Báo cáo chất lượng dữ liệu (Data Quality Report)
*   **Tỷ lệ trích xuất thành công (Fill Rate):** Phần trăm các trường thông tin trong schema được điền đầy đủ.
*   **Báo cáo sai lệch (Discrepancy Log):** Danh sách các kiểm định logic toán học bị vi phạm kèm vị trí trang tương ứng trong file PDF gốc.

### Định dạng xuất dữ liệu (Data Export)
Hệ thống cho phép xuất dữ liệu tài chính đã làm sạch ra các định dạng phục vụ phân tích kinh tế lượng:
*   **Parquet / DuckDB:** Tối ưu dung lượng, giữ nguyên kiểu dữ liệu của số liệu, sẵn sàng nạp trực tiếp vào thư viện Pandas (Python) hoặc Plm (R).
*   **CSV / XLSX:** Định dạng bảng quen thuộc để nhập nhanh vào Stata hoặc Excel để chạy hồi quy OLS, Fixed Effects.
*   **Markdown / LaTeX:** Xuất các bảng số liệu tài chính đã định dạng đẹp mắt để chèn thẳng vào báo cáo nghiên cứu học thuật của bạn.
