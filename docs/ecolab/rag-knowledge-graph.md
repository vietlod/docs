---
title: Đồ thị & Tra cứu RAG
sidebar_position: 2
description: Hướng dẫn phân hệ Tổng quan tài liệu 6 nguồn học thuật xác thực DOI, Sổ cái Trích dẫn Xác thực và Đồ thị Tri thức trên EcoLab.
---

# Tổng quan tài liệu 6 nguồn học thuật & Đồ thị Tri thức

Phân hệ **Tổng quan tài liệu** của EcoLab tự động hóa quy trình tìm kiếm, thẩm định siêu dữ liệu DOI, tổng hợp bằng chứng thực nghiệm và trực quan hóa mạng lưới tri thức học thuật liên quan đến đề tài nghiên cứu của bạn. Mọi bài báo đưa vào tổng hợp đều được neo chặt vào **Sổ cái Trích dẫn Xác thực (Verified Citation Ledger)** nhằm loại bỏ triệt để hiện tượng bịa đặt tài liệu tham khảo của AI.

---

## 1. Truy vấn đồng thời 6 nguồn cơ sở dữ liệu học thuật và khóa cá nhân

EcoLab kết nối trực tiếp tới **6 nguồn cơ sở dữ liệu học thuật uy tín quốc tế**:

- **4 nguồn học thuật mở hoạt động ngay mặc định:** **OpenAlex**, **Crossref**, **DOAJ** (Directory of Open Access Journals) và **arXiv**.
- **2 nguồn học thuật mở rộng qua khóa API cá nhân:** **Semantic Scholar** và **CORE** — người dùng có thể lưu khóa cá nhân được mã hóa bảo mật ngay trong mục **Cài đặt → Khóa API học thuật** kèm nút kiểm tra kết nối trực tiếp (`Probe`) trước khi chạy tổng quan.

Quy trình thực hiện:

1. Mở phân hệ **Tổng quan tài liệu** trong dự án nghiên cứu.
2. Nhập câu hỏi nghiên cứu hoặc từ khóa chuyên ngành; hệ thống tự động kết hợp ngữ cảnh ý tưởng đã chọn từ Giai đoạn 1.
3. Kiểm tra trạng thái sẵn sàng của 6 nguồn dữ liệu và nhấn **Chạy tổng quan**.
4. Duyệt danh sách công bố khoa học tại thẻ **Bài báo** với đầy đủ tiêu đề, tác giả, năm xuất bản, tên tạp chí, lượt trích dẫn, mã định danh DOI/URL gốc và trạng thái xác thực.

---

## 2. Năm cấu trúc tổng hợp học thuật chuyên sâu

Sau khi thu thập và khử trùng lặp danh mục công bố từ 6 nguồn, EcoLab phân tích nội dung tóm tắt và siêu dữ liệu học thuật để cấu trúc hóa kết quả thành 5 thành phần:

### Bảng ma trận tổng hợp tài liệu (Literature Matrix)
Đối chiếu có hệ thống các nghiên cứu tiền nhiệm trên cùng một bảng chuẩn:
- **Tác giả, năm & nguồn công bố:** Xác định dòng thời gian phát triển lý thuyết và thực nghiệm.
- **Câu hỏi nghiên cứu trọng tâm:** Vấn đề kinh tế cốt lõi được giải quyết.
- **Phương pháp kinh tế lượng:** Các kỹ thuật định danh và ước lượng đã áp dụng (như HDFE, System GMM, Staggered DID, PPML, ARDL/NARDL, ACF TFP).
- **Biến số & phát hiện định lượng chính:** Chiều hướng tác động, mức ý nghĩa thống kê và điều kiện mẫu.

### Khoảng trống nghiên cứu (Research Gaps)
Phân loại rõ các khoảng trống tri thức mà đề tài của bạn có thể đóng góp:
- *Khoảng trống bối cảnh & thể chế:* Thiếu bằng chứng thực nghiệm tại các nền kinh tế mới nổi hoặc dữ liệu cấp tỉnh/doanh nghiệp Việt Nam (đặc biệt trên chuỗi chuẩn hóa 34 tỉnh).
- *Khoảng trống phương pháp luận:* Các nghiên cứu trước chưa xử lý triệt để nội sinh, phụ thuộc chéo không gian hoặc hiệu ứng xử lý không đồng nhất theo thời điểm.
- *Khoảng trống dữ liệu & giai đoạn:* Chưa cập nhật các cú sốc chính sách, chuyển đổi số và biến động vĩ mô giai đoạn mới.

### Mục tiêu và giả thuyết kiểm định ($H_0 / H_1$)
Chuyển hóa tổng quan tài liệu thành hệ thống mục tiêu tổng quát, mục tiêu cụ thể và các cặp giả thuyết khoa học có thể kiểm định trực tiếp ở bước mô hình hóa.

### Đề xuất khung biến số và họ mô hình ước lượng
- **Bảng từ điển biến số đề xuất:** Phân định rõ vai trò biến phụ thuộc, biến giải thích trọng tâm, biến kiểm soát, biến nội sinh/công cụ, công thức đo lường và dấu kỳ vọng ($+$, $-$, $?$).
- **Gợi ý bộ ước lượng trong 15 họ mô hình:** Đề xuất phương pháp ước lượng chính và các mô hình kiểm tra độ vững tương thích trực tiếp với danh mục **201+ bộ ước lượng** của EcoLab.

### Bản đồ Đồ thị Tri thức học thuật (Academic Knowledge Graph)
Trực quan hóa mạng lưới kết nối đa chiều giữa:
- Cụm trích dẫn và đồng trích dẫn giữa các công trình nền tảng.
- Mối liên hệ ngữ nghĩa giữa các khái niệm kinh tế và cơ chế truyền dẫn.
- Các cụm phương pháp kinh tế lượng được sử dụng phổ biến nhất trong lĩnh vực nghiên cứu.
