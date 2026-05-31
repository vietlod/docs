---
title: Đồ thị & Tra cứu RAG
sidebar_position: 2
---

# Tác tử RAG & Đồ thị Tri thức học thuật

Module **Tổng quan tài liệu** của EcoLab được thiết kế để tự động hóa hoàn toàn quy trình tìm kiếm, đánh giá và tổng hợp các nghiên cứu học thuật liên quan đến đề tài nghiên cứu của bạn. Phân hệ này sử dụng công nghệ **Tạo nội dung tăng cường bằng truy xuất (RAG)** phối hợp cùng **Đồ thị tri thức (Knowledge Graph)** trên nền tảng Neo4j để đảm bảo tính chính xác khoa học và tránh hiện tượng "ảo tưởng" (hallucination) của AI.

---

## 1. Tìm kiếm và Lọc bài báo học thuật

Hệ thống kết nối trực tiếp với các cơ sở dữ liệu học thuật mở quy mô lớn (Semantic Scholar, ArXiv) để truy xuất các bài viết liên quan:

1.  Điều hướng tới phân hệ **Tổng quan tài liệu**.
2.  Nhập câu hỏi nghiên cứu hoặc chủ đề của bạn vào ô tìm kiếm. Tác tử AI sẽ tự động phân tích và kết hợp với ý tưởng nghiên cứu đã chọn từ module trước làm ngữ cảnh nền.
3.  Nhấn nút **Chạy tổng quan** (Run Review).
4.  Kết quả tìm kiếm hiển thị tại tab **Bài báo** với các thông tin chi tiết:
    *   Tiêu đề bài báo, danh sách tác giả, tạp chí xuất bản và năm.
    *   Số lượng trích dẫn (Citation count) - chỉ số đo lường mức độ uy tín của bài viết.
    *   Trạng thái xác minh (Verification status).

---

## 2. Các phân hệ Tổng hợp học thuật

Sau khi thu thập các bài báo, tác tử RAG của EcoLab sẽ phân tích sâu nội dung tóm tắt (abstract) và toàn văn (nếu có) để trích xuất và hiển thị thông tin thành 5 cấu trúc chuyên biệt:

### Bảng tóm tắt tài liệu (Literature Matrix)
Bảng tóm tắt có cấu trúc giúp bạn nhanh chóng so sánh các nghiên cứu trước đây:
*   **Tác giả & Năm:** Xác định mốc thời gian và nhóm nghiên cứu.
*   **Vấn đề nghiên cứu:** Câu hỏi cốt lõi mà bài viết giải quyết.
*   **Phương pháp kinh tế lượng:** Các công cụ ước lượng được sử dụng (ví dụ: OLS, GMM, FE/RE).
*   **Phát hiện chính:** Kết quả định lượng quan trọng nhất của bài nghiên cứu.
*   **Biến số & Chiến lược nhận dạng:** Các biến số chính được đưa vào mô hình.

### Lỗ hổng nghiên cứu (Research Gaps)
Tác tử AI phân tích tập hợp các bài báo để xác định các lỗ hổng tri thức còn tồn tại mà nghiên cứu của bạn có thể lấp đầy:
*   *Lỗ hổng về mặt địa lý/bối cảnh:* Nghiên cứu chưa được thực hiện ở các nước đang phát triển hoặc tại Việt Nam.
*   *Lỗ hổng phương pháp luận:* Thiếu các kiểm định độ vững hoặc xử lý nội sinh triệt để.
*   *Lỗ hổng về thời gian:* Bộ dữ liệu của các nghiên cứu trước đã cũ, chưa cập nhật bối cảnh kinh tế mới (ví dụ: sau dịch bệnh hoặc khủng hoảng tài chính).

### Mục tiêu & Giả thuyết nghiên cứu
AI tự động chuyển hóa ý tưởng và tài liệu tham khảo thành hệ thống mục tiêu và câu hỏi nghiên cứu rõ ràng:
*   **Mục tiêu tổng quát & Mục tiêu cụ thể.**
*   **Giả thuyết kiểm định khoa học (Hypotheses):** Định nghĩa rõ các giả thuyết kiểm định (ví dụ: $H_0$, $H_1$) để làm cơ sở cho bước mô hình hóa kinh tế lượng.

### Mô hình đề xuất (Proposed Variables & Estimator)
Dựa trên các bài báo đã chọn, AI đề xuất cấu trúc mô hình phù hợp:
*   **Bảng biến số có thể chỉnh sửa:**
    *   *Tên biến:* Tên biến số (ví dụ: ROA, Leverage, Size).
    *   *Vai trò biến:* Phụ thuộc (Dependent), Độc lập (Independent) hoặc Kiểm soát (Control).
    *   *Đo lường (Measurement):* Cách thức tính toán chỉ tiêu.
    *   *Dấu kỳ vọng (Expected sign):* Tác động âm ($-$), dương ($+$) hoặc chưa xác định ($?$) dựa trên lý thuyết và thực nghiệm trước đây.
*   **Gợi ý phương pháp ước lượng:** Gợi ý sử dụng OLS, Fixed Effects, hoặc GMM tùy thuộc vào cấu trúc dữ liệu đề xuất.

### Bản đồ tri thức (Knowledge Graph Viz)
Sử dụng công nghệ Neo4j để vẽ sơ đồ trực quan kết nối:
*   Mối quan hệ trích dẫn giữa các bài báo.
*   Mối quan hệ ngữ nghĩa giữa các khái niệm nghiên cứu.
*   Các cụm phương pháp luận được áp dụng nhiều nhất.
