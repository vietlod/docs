---
title: Tổng quan EcoLab & Hướng dẫn sử dụng từng bước
sidebar_position: 1
description: Hướng dẫn sử dụng từng bước nền tảng nghiên cứu kinh tế định lượng và hành vi EcoLab (v1.9.0) từ kiểm toán tài liệu đầu vào, mô phỏng khảo sát tùy chỉnh, ước lượng đa mô hình, sơ đồ cấu trúc chuẩn tạp chí quốc tế đến xuất bản báo cáo hoàn chỉnh.
---

import McpPromptCatalog from '@site/src/components/McpPromptCatalog';

# Tổng quan EcoLab & Hướng dẫn sử dụng từng bước

**EcoLab** (phiên bản `v1.9.0`) là không gian nghiên cứu kinh tế định lượng, tài chính và khoa học hành vi chuyên sâu hỗ trợ trọn vẹn vòng đời học thuật — từ chuẩn hóa ý tưởng và tài liệu đính kèm, tổng hợp tài liệu xác thực DOI, chuẩn bị dữ liệu nghiên cứu, ước lượng đa mô hình đến biên tập bài báo khoa học và luận án hoàn chỉnh.

---

## 1. Năm năng lực nghiên cứu cốt lõi dành cho người dùng

| Năng lực trọng tâm | Trải nghiệm dành cho nhà nghiên cứu | Giá trị học thuật thực tiễn |
| :--- | :--- | :--- |
| **1. Kiểm toán & chuẩn hóa tài liệu đính kèm** | Đính kèm bài báo gốc tham chiếu, đề cương nghiên cứu, bảng câu hỏi khảo sát, tệp dữ liệu thực tế hoặc đường dẫn bài báo công khai ngay trong mô tả ban đầu | Tự động phát hiện điểm chưa phù hợp trong đề cương/thang đo, khóa chặt câu hỏi nghiên cứu (`RQ1..RQk`), giả thuyết (`H1..Hk`), cá nhân hóa văn phong học thuật và đảm bảo báo cáo bám sát 100% dữ liệu thực tế đã cung cấp. |
| **2. Tổng hợp tài liệu 6 nguồn xác thực DOI** | Tìm kiếm đồng thời trên 6 cơ sở dữ liệu học thuật quốc tế và đối chiếu mã định danh DOI thật | Toàn bộ trích dẫn trong bài viết được tự động gắn **siêu liên kết 1 chiều không gạch chân** (nhận diện tinh tế bằng màu sắc học thuật); bấm vào trích dẫn sẽ cuộn mượt xuống đúng tài liệu tại mục Tài liệu tham khảo. |
| **3. Nghiên cứu khảo sát hành vi & khóa bảng hỏi tùy chỉnh** | Hỗ trợ nghiên cứu thang đo Likert và phỏng vấn sâu với chế độ giữ nguyên 100% câu hỏi gốc của người dùng hoặc tự động bổ sung câu hỏi cho nhân tố thiếu biến | Thực hiện đầy đủ kiểm định độ tin cậy thang đo, phân tích nhân tố khám phá/khẳng định, kiểm soát phương sai chung, phân tích độ nhạy, trung gian, điều tiết và so sánh nhóm nhân khẩu học. |
| **4. Bộ 3 sơ đồ cấu trúc 300-DPI chuẩn công bố quốc tế** | Tự động vẽ và nhúng 3 sơ đồ học thuật sắc nét cho các nghiên cứu `EFA / CFA / SEM / PLS-SEM` (`Hình 3.1: Sơ đồ M1`, `Hình 3.2: Sơ đồ M2`, `Hình 4.1: Sơ đồ R1`) | Hiển thị gọn gàng dải biến quan sát (`ENV1–ENV4`) kèm khoảng hệ số tải chuẩn hóa, khung đối chiếu song song Mô hình cơ sở (`Panel A`) và Mô hình mở rộng (`Panel B`), cùng hệ số đường dẫn và mức ý nghĩa thống kê ngay trên từng nhánh mũi tên. |
| **5. Bản thảo sạch chuẩn tạp chí & gói dữ liệu tái lập** | Xuất bản thảo hoàn chỉnh không chứa bất kỳ câu chữ giải trình kỹ thuật nội bộ nào, kèm nút **Về đầu trang** hiển thị tiến độ đọc | Độc giả có thể tải trực tiếp tệp dữ liệu `.csv` và chuyển đổi xem mã nguồn tái lập đa ngôn ngữ (`R · Stata · Python`) ngay trên cả máy tính và điện thoại. |

---

## 2. Hướng dẫn sử dụng từng bước (Step-by-Step) cho 3 tình huống phổ biến

### Tình huống A — Khi bạn đã có Đề cương, Bài báo tham chiếu hoặc Dữ liệu thực tế

1. **Bước 1 (Cung cấp tài liệu ban đầu):** Mở trợ lý AI đã kết nối EcoData/EcoLab hoặc bàn làm việc dự án, đính kèm tệp đề cương, bài báo mẫu, đường dẫn DOI hoặc tệp dữ liệu thực tế và nêu mục tiêu nghiên cứu.
2. **Bước 2 (Xem kết quả rà soát & chuẩn hóa):** Hệ thống tự động rà soát 4 khía cạnh (mục tiêu & giả thuyết, cấu trúc dữ liệu/bảng hỏi, tính tương thích của mô hình và danh mục tài liệu trích dẫn), chỉ ra các điểm cần hiệu chỉnh và chuẩn hóa đầu vào phân tích.
3. **Bước 3 (Thực thi ước lượng trên dữ liệu thực tế):** Khi bạn đã đính kèm dữ liệu thực nghiệm, hệ thống tự động khóa chế độ dữ liệu thực tế (không dùng dữ liệu mô phỏng), chạy đầy đủ mô hình chính, mô hình đối chứng và các kiểm định chẩn đoán.
4. **Bước 4 (Nhận báo cáo học thuật hoàn chỉnh):** Nhận bài báo hoặc luận án hoàn chỉnh giải quyết đúng 100% câu hỏi nghiên cứu và giả thuyết từ dữ liệu của bạn, sẵn sàng nộp phản biện hoặc xuất bản.

### Tình huống B — Khi bạn nghiên cứu Khảo sát Hành vi / Thang đo Likert (`EFA / CFA / SEM / PLS-SEM`)

1. **Bước 1 (Nhập chủ đề hoặc bảng câu hỏi khảo sát):** Cung cấp các khái niệm nghiên cứu (ví dụ: Lãnh đạo chuyển đổi, Trao quyền tâm lý, Hành vi đổi mới) hoặc dán bảng câu hỏi khảo sát riêng của bạn.
   - Nếu bạn yêu cầu **giữ nguyên tuyệt đối bảng hỏi**, hệ thống sẽ bảo toàn 100% số lượng câu hỏi của bạn mà không tự ý thêm hay bớt mục hỏi.
2. **Bước 2 (Kiểm định thang đo & ước lượng cấu trúc):** Hệ thống tự động kiểm định độ tin cậy Cronbach's Alpha, EFA, CFA/PLS-SEM (AVE, CR, HTMT, Fornell–Larcker), kiểm soát sai lệch phương sai chung (CMB), phân tích độ nhạy và ước lượng đường dẫn cấu trúc.
3. **Bước 3 (Khai thác Bộ 3 Sơ đồ cấu trúc tự động trong báo cáo):**
   - **Tại Mục 3 (`Hình 3.1: Sơ đồ M1`):** Quan sát sơ đồ mô hình đo lường với dải biến quan sát gọn gàng (`AIC1–AIC4`, `λ ∈ [0.84; 0.87]`) và tên khái niệm nằm trọn trong khối elip.
   - **Tại cuối Mục 3 (`Hình 3.2: Sơ đồ M2`):** Đối chiếu trực quan giữa **Panel A (Mô hình cấu trúc cơ sở)** và **Panel B (Mô hình cấu trúc mở rộng / trung gian)** kèm thanh giải nghĩa mã khái niệm ở chân hình.
   - **Tại Mục 4 (`Hình 4.1: Sơ đồ R1`):** Xem trực tiếp hệ số ước lượng chuẩn hóa và mức ý nghĩa thống kê trên từng nhánh giả thuyết (`H1: β̂ = +0.307***`, `H8: β̂ = +0.039 (ns)`).

### Tình huống C — Tra cứu Trích dẫn 1 Chiều & Tải Gói Tái lập trên Chuyên mục Bài viết (`/blog`)

1. **Tra cứu trích dẫn 1 chiều:** Khi đọc bài viết trên EcoLab, các trích dẫn học thuật như `Hair et al. (2022)` hoặc `(Fornell & Larcker, 1981)` được hiển thị bằng màu sắc nổi bật tinh tế (không gạch chân). Bấm vào bất kỳ trích dẫn nào để cuộn mượt xuống đúng tài liệu đó tại **Mục 6. Tài liệu tham khảo** và bấm vào liên kết `https://doi.org/...` để mở bài báo gốc.
2. **Quay về đầu trang nhanh:** Sử dụng nút tròn **Về đầu trang** ở góc dưới bên phải màn hình (tích hợp vòng tròn hiển thị % tiến độ đọc bài viết).
3. **Tải dữ liệu `.csv` và sao chép mã nguồn tái lập:** Cuộn xuống mục **Phụ lục**, nhấn **Tải dữ liệu (.csv)** và bấm chuyển đổi giữa 3 thẻ **R**, **Stata**, **Python** để sao chép toàn bộ kịch bản tái lập khớp 100% với tên cột trong tệp dữ liệu.

---

## 3. Danh mục 23 Prompts mẫu thực nghiệm (P01–P23)

Nhấn **Sao chép** ở bất kỳ mẫu câu lệnh nào dưới đây để trải nghiệm ngay quy trình nghiên cứu 5 bước:

<McpPromptCatalog locale="vi" />
