---
title: Tổng quan EcoLab & Hướng dẫn sử dụng từng bước
sidebar_position: 1
description: Hướng dẫn sử dụng từng bước nền tảng nghiên cứu kinh tế định lượng và hành vi EcoLab (v1.10.0) từ kiểm toán tài liệu đầu vào, mô phỏng khảo sát tùy chỉnh, đánh số bảng và hình ảnh liên tục chuẩn trích dẫn, định dạng số nguyên thang đo học thuật đến tự động đăng bài toàn diện cho mọi chế độ phân tích.
---

import McpPromptCatalog from '@site/src/components/McpPromptCatalog';

# Tổng quan EcoLab & Hướng dẫn sử dụng từng bước

**EcoLab** (phiên bản `v1.10.0`) là không gian nghiên cứu kinh tế định lượng, tài chính và khoa học hành vi chuyên sâu hỗ trợ trọn vẹn vòng đời học thuật — từ chuẩn hóa ý tưởng và tài liệu đính kèm, tổng hợp tài liệu xác thực DOI, chuẩn bị dữ liệu nghiên cứu, ước lượng đa mô hình đến biên tập bài báo khoa học, luận án hoàn chỉnh và tự động xuất bản lên chuyên mục học thuật.

---

## 1. Sáu năng lực nghiên cứu cốt lõi dành cho người dùng

| Năng lực trọng tâm | Trải nghiệm dành cho nhà nghiên cứu | Giá trị học thuật thực tiễn |
| :--- | :--- | :--- |
| **1. Kiểm toán & chuẩn hóa tài liệu đính kèm** | Đính kèm bài báo gốc tham chiếu, đề cương nghiên cứu, bảng câu hỏi khảo sát, tệp dữ liệu thực tế hoặc đường dẫn bài báo công khai ngay trong mô tả ban đầu | Tự động phát hiện điểm chưa phù hợp trong đề cương/thang đo, khóa chặt câu hỏi nghiên cứu (`RQ1..RQk`), giả thuyết (`H1..Hk`), cá nhân hóa văn phong học thuật và đảm bảo báo cáo bám sát 100% dữ liệu thực tế đã cung cấp. |
| **2. Tổng hợp tài liệu 6 nguồn xác thực DOI** | Tìm kiếm đồng thời trên 6 cơ sở dữ liệu học thuật quốc tế và đối chiếu mã định danh DOI thật | Toàn bộ trích dẫn trong bài viết được tự động gắn **siêu liên kết 1 chiều không gạch chân** (nhận diện tinh tế bằng màu sắc học thuật); bấm vào trích dẫn sẽ cuộn mượt xuống đúng tài liệu tại mục Tài liệu tham khảo. |
| **3. Nghiên cứu khảo sát hành vi & định dạng số nguyên chuẩn học thuật** | Hỗ trợ nghiên cứu thang đo Likert (`1..5`, `1..7`), biến nhị phân (`0`/`1`) và phỏng vấn sâu với chế độ giữ nguyên 100% câu hỏi gốc của người dùng | Toàn bộ cỡ mẫu $N$, giá trị tối thiểu/tối đa của biến Likert và biến nhị phân trong cả bảng thống kê lẫn tệp dữ liệu `.csv` đều được định dạng chuẩn **số nguyên** (`400`, `1`, `5`, `0`, `1`), trong khi các chỉ tiêu liên tục (`Mean`, `SD`, hệ số ước lượng) giữ đúng độ chính xác thập phân học thuật. |
| **4. Đánh số liên tục Bảng & Hình ảnh chuẩn trích dẫn (`APA 7th` mặc định)** | Mọi biểu đồ, sơ đồ cấu trúc (`M1`, `M2`, `R1`) và bảng biểu được đánh số thứ tự liên tục xuyên suốt bài viết (`Hình 1, Hình 2, Hình 3...` và `Bảng 1, Bảng 2, Bảng 3...`; `Bảng A1...` tại Phụ lục; hoặc `BẢNG I, BẢNG II` theo chuẩn `IEEE`) | Đồng bộ 100% tham chiếu chéo trong văn bản với tiêu đề bảng và hình ảnh; đồng thời khóa chặt quy tắc ngắt dòng để dấu câu (`.`, `?`, `~`, `,`, `;`, `:`, `!`) không bao giờ bị rớt xuống đầu dòng trên máy tính, máy tính bảng và điện thoại. |
| **5. Tự động xuất bản bài viết cho mọi chế độ phản hồi** | Tự động đăng bài lên chuyên mục Học thuật (`/blog`) không chỉ cho Dự án nghiên cứu 5 bước (Mode B) mà cho cả **Top 5 ý tưởng nghiên cứu**, **Phân tích kinh tế lượng trọn gói 1 chạm (Mode A)** và mọi báo cáo tổng hợp từ trợ lý AI | Mỗi lần thực thi đều trả về đường dẫn bài viết công khai ngay lập tức kèm ảnh bìa học thuật và gói tái lập dữ liệu. |
| **6. Bản thảo sạch chuẩn tạp chí & bộ 3 kỹ năng cô đọng 1 chạm** | Xuất bản thảo hoàn chỉnh không chứa bất kỳ câu chữ giải trình kỹ thuật nội bộ nào, kèm nút **Về đầu trang** hiển thị tiến độ đọc và bộ 3 kỹ năng cô đọng dễ dàng sao chép – dán trên Gemini Connected Apps | Độc giả có thể tải trực tiếp tệp dữ liệu `.csv` và chuyển đổi xem mã nguồn tái lập đa ngôn ngữ (`R · Stata · Python`) ngay trên cả máy tính và điện thoại. |

---

## 2. Hướng dẫn sử dụng từng bước (Step-by-Step) cho 4 tình huống phổ biến

### Tình huống A — Khi bạn đã có Đề cương, Bài báo tham chiếu hoặc Dữ liệu thực tế

1. **Bước 1 (Cung cấp tài liệu ban đầu):** Mở trợ lý AI đã kết nối EcoData/EcoLab hoặc bàn làm việc dự án, đính kèm tệp đề cương, bài báo mẫu, đường dẫn DOI hoặc tệp dữ liệu thực tế và nêu mục tiêu nghiên cứu.
2. **Bước 2 (Xem kết quả rà soát & chuẩn hóa):** Hệ thống tự động rà soát 4 khía cạnh (mục tiêu & giả thuyết, cấu trúc dữ liệu/bảng hỏi, tính tương thích của mô hình và danh mục tài liệu trích dẫn), chỉ ra các điểm cần hiệu chỉnh và chuẩn hóa đầu vào phân tích.
3. **Bước 3 (Thực thi ước lượng trên dữ liệu thực tế):** Khi bạn đã đính kèm dữ liệu thực nghiệm, hệ thống tự động khóa chế độ dữ liệu thực tế (không dùng dữ liệu mô phỏng), chạy đầy đủ mô hình chính, mô hình đối chứng và các kiểm định chẩn đoán.
4. **Bước 4 (Nhận báo cáo học thuật & đường dẫn bài viết xuất bản):** Nhận bài báo hoặc luận án hoàn chỉnh với bảng biểu và hình ảnh đánh số liên tục (`Bảng 1, Bảng 2...`, `Hình 1, Hình 2...`) kèm đường dẫn bài viết đã xuất bản tự động trên chuyên mục Học thuật (`/blog`).

### Tình huống B — Khi bạn nghiên cứu Khảo sát Hành vi / Thang đo Likert (`EFA / CFA / SEM / PLS-SEM`)

1. **Bước 1 (Nhập chủ đề hoặc bảng câu hỏi khảo sát):** Cung cấp các khái niệm nghiên cứu (ví dụ: Lãnh đạo chuyển đổi, Trao quyền tâm lý, Hành vi đổi mới) hoặc dán bảng câu hỏi khảo sát riêng của bạn.
   - Nếu bạn yêu cầu **giữ nguyên tuyệt đối bảng hỏi**, hệ thống sẽ bảo toàn 100% số lượng câu hỏi của bạn mà không tự ý thêm hay bớt mục hỏi.
2. **Bước 2 (Kiểm định thang đo & định dạng chuẩn số nguyên học thuật):** Hệ thống tự động kiểm định độ tin cậy Cronbach's Alpha, EFA, CFA/PLS-SEM (AVE, CR, HTMT, Fornell–Larcker), kiểm soát sai lệch phương sai chung (CMB), phân tích độ nhạy và ước lượng đường dẫn cấu trúc. Số quan sát ($N$) và giá trị `Min`/`Max` của các mục hỏi Likert hoặc biến nhị phân được trình bày chuẩn số nguyên (`1`, `5`, `0`, `1`).
3. **Bước 3 (Khai thác Bộ 3 Sơ đồ cấu trúc đánh số liên tục trong báo cáo):**
   - **Sơ đồ mô hình đo lường (`Hình 1`):** Hiển thị dải biến quan sát gọn gàng (`AIC1–AIC4`, `λ ∈ [0.84; 0.87]`) và tên khái niệm nằm trọn trong khối elip.
   - **Sơ đồ đối chiếu mô hình (`Hình 2`):** Đối chiếu trực quan giữa **Panel A (Mô hình cấu trúc cơ sở)** và **Panel B (Mô hình cấu trúc mở rộng / trung gian)** kèm thanh giải nghĩa mã khái niệm ở chân hình.
   - **Sơ đồ kết quả ước lượng đường dẫn (`Hình 3`):** Xem trực tiếp hệ số ước lượng chuẩn hóa và mức ý nghĩa thống kê trên từng nhánh giả thuyết (`H1: β̂ = +0.307***`, `H8: β̂ = +0.039 (ns)`).

### Tình huống C — Khi bạn yêu cầu Gợi ý Top 5 Ý tưởng Nghiên cứu hoặc Phân tích Kinh tế lượng 1 Chạm (Mode A)

1. **Gợi ý Top 5 ý tưởng nghiên cứu:** Chỉ cần nhập chủ đề quan tâm (ví dụ: *"Liệt kê top 5 ý tưởng nghiên cứu mới về chuyển đổi số và hiệu quả hoạt động ngân hàng tại Việt Nam"*), hệ thống sẽ xây dựng 5 phương án đề tài kèm khoảng trống nghiên cứu, phương pháp định lượng, thiết kế dữ liệu và **tự động đăng thành bài viết hoàn chỉnh** trên chuyên mục `/blog`.
2. **Phân tích kinh tế lượng trọn gói 1 chạm (Mode A):** Khi bạn yêu cầu chạy nhanh một mô hình hoặc quy trình kinh tế lượng tự động 1 chạm, hệ thống thực thi đầy đủ kiểm định tiền ước lượng, ước lượng đa mô hình, kiểm định hậu ước lượng và **tự động xuất bản báo cáo kèm mã tái lập** lên chuyên mục `/blog`.

### Tình huống D — Tra cứu Trích dẫn 1 Chiều & Tải Gói Tái lập trên Chuyên mục Bài viết (`/blog`)

1. **Tra cứu trích dẫn 1 chiều:** Khi đọc bài viết trên EcoLab, các trích dẫn học thuật như `Hair et al. (2022)` hoặc `(Fornell & Larcker, 1981)` được hiển thị bằng màu sắc nổi bật tinh tế (không gạch chân). Bấm vào bất kỳ trích dẫn nào để cuộn mượt xuống đúng tài liệu đó tại **Mục 6. Tài liệu tham khảo** và bấm vào liên kết `https://doi.org/...` để mở bài báo gốc.
2. **Quay về đầu trang nhanh:** Sử dụng nút tròn **Về đầu trang** ở góc dưới bên phải màn hình (tích hợp vòng tròn hiển thị % tiến độ đọc bài viết).
3. **Tải dữ liệu `.csv` và sao chép mã nguồn tái lập:** Cuộn xuống mục **Phụ lục**, nhấn **Tải dữ liệu (.csv)** (các cột thang đo Likert và biến nhị phân được xuất chuẩn số nguyên) và bấm chuyển đổi giữa 3 thẻ **R**, **Stata**, **Python** để sao chép toàn bộ kịch bản tái lập khớp 100% với tên cột trong tệp dữ liệu.

---

## 3. Danh mục 23 Prompts mẫu thực nghiệm (P01–P23)

Nhấn **Sao chép** ở bất kỳ mẫu câu lệnh nào dưới đây để trải nghiệm ngay quy trình nghiên cứu 5 bước:

<McpPromptCatalog locale="vi" />
