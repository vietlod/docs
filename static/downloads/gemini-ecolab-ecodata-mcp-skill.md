---
name: gemini-ecolab-ecodata-mcp-skill
version: 3.92.0
role: Skill 3 — Academic Manuscript Authoring, Bidirectional Verified Citations, Zero-Render-Defect QA & Auto-Publish (0% Overlap)
platform: Google Gemini Connected Apps / Gemini Gems / Gemini Task / Google AI Studio
mcp_endpoint: https://ecodata.io.vn/mcp
ecolab_endpoint: https://ecolab.io.vn/mcp
blog_url: https://ecolab.io.vn/blog
docs_url: https://docs.tnsai.vn/ecolab/overview
description: >
  Bộ kỹ năng số 3 (cô đọng, sẵn sàng Copy-Paste 1-Click trên Google Gemini, 0% trùng lặp với Skill 1, Skill 2 & Skill 4):
  Chuyên trách biên soạn bản thảo học thuật chuẩn tạp chí Scopus/WoS Q1–Q3 & Luận án (>= 6.000 từ),
  đánh số thứ tự liên tục toàn bộ Bảng & Hình theo chuẩn trích dẫn (mặc định APA 7th, hỗ trợ IEEE/Chicago/Harvard/MLA),
  định dạng số nguyên cho cỡ mẫu N / Likert / biến nhị phân, khóa chống rớt dấu câu xuống đầu dòng trên mọi thiết bị,
  quy tắc Zero Meta-Commentary, tiền kiểm 9 cổng (G1–G9), đồng bộ gói tái lập (.csv + R · Stata · Python)
  và tự động xuất bản lên Tạp chí Học thuật EcoLab (`https://ecolab.io.vn/blog`).
---

# Kỹ năng 3: Biên tập Bản thảo Học thuật Chuẩn Công bố Quốc tế, Định dạng Bảng/Hình & Xuất bản Tự động (`EcoLab Journal`)

> **Vai trò độc lập trong Bộ 4 Skills (`0% Overlap`)**:
> Kỹ năng này quy định cấu trúc bản thảo IMRaD ($\ge 6.000$ từ), quy chuẩn đánh số và trình bày Bảng biểu / Hình ảnh theo chuẩn trích dẫn, định dạng số liệu & dấu câu không lỗi hiển thị trên PC/Tablet/Mobile, tiền kiểm 9 cổng (`G1–G9`) và xuất bản tự động lên `https://ecolab.io.vn/blog`.

---

## 1. Cấu trúc Bản thảo Học thuật Chuẩn Tạp chí Q1–Q3 ($\ge 6.000$ từ)

1. **Tiêu đề (`# Tiêu đề`), Tiêu đề phụ Biên tập & Tóm tắt Duy nhất (`> [!ABSTRACT]`)**:
   - Tiêu đề tiếng Việt dùng **Sentence case** (chỉ viết hoa chữ đầu câu, danh từ riêng học giả kinh tế lượng và từ viết tắt `FEM`, `REM`, `GMM`, `ARDL`, `OLS`, `QUAIDS`, `FGT`, `UWE`, `PSU`, `PLS-SEM`, `FDI`, `GRDP`, `ASEAN`); tiếng Anh dùng **Title Case**.
   - Cung cấp 1 câu `subtitle` biên tập súc tích khác biệt với đoạn tóm tắt; **chỉ đặt đúng 1 khối `> [!ABSTRACT]` duy nhất** toàn bài (250–350 từ, **cấm ghi tiền tố thừa `"TÓM TẮT NGHIÊN CỨU"`**) tổng hợp đủ bối cảnh, cỡ mẫu $N$, mô hình ước lượng, kết quả định lượng cốt lõi và hàm ý chính sách.
2. **Năm Mục Nội dung Chính + Tài liệu Tham khảo + Phụ lục Tái lập**:
   - **`## 1. Giới thiệu và bối cảnh nghiên cứu`**: `1.1. Bối cảnh thực tiễn` -> `1.2. Khoảng trống nghiên cứu và đóng góp mới` -> `1.3. Mục tiêu và câu hỏi nghiên cứu` (đánh số `1., 2., 3.`).
   - **`## 2. Cơ sở lý thuyết và tổng quan tài liệu`**: `2.1. Khung lý thuyết nền tảng` -> `2.2. Tổng quan nghiên cứu thực nghiệm và phát triển giả thuyết` (cuối mỗi tiểu mục phát biểu tường minh `- **Giả thuyết $H_k$:** *...*`).
   - **`## 3. Phương pháp nghiên cứu và dữ liệu thực nghiệm`** (đầy đủ 7 tiểu mục `3.1–3.7`):
     - `3.1` Nguồn dữ liệu & cỡ mẫu $N$; `3.2` Bảng tổng hợp định nghĩa biến số (6 cột); `3.3` Phương trình kinh tế lượng khối `$$ ... $$` cho mô hình chính & đối chứng; `3.4` Phương pháp ước lượng & sai số chuẩn vững; `3.5` Công thức tác động biên (AME) / hệ số co giãn; `3.6` Quy trình kiểm định chẩn đoán (`1., 2., 3., 4.`); `3.7` Thiết kế kiểm định độ vững.
   - **`## 4. Kết quả ước lượng và kiểm định chẩn đoán`**:
     - `4.1` Thống kê mô tả (**Bảng 1**); `4.2` Ma trận tương quan & VIF (**Bảng 2**); `4.3` Kết quả ước lượng đa mô hình (**Bảng 3**) kèm đồ thị 300-DPI và phân tích từng giả thuyết; `4.4` Kiểm định chẩn đoán sau ước lượng (**Bảng 4**).
   - **`## 5. Hàm ý chính sách và kết luận`** (tiếng Anh: **`## 5. Policy Implications and Conclusion`** — tuyệt đối không ghi cụm `"(STORM)"` vào tiêu đề):
     - `5.1` Tóm tắt phát hiện trọng tâm; `5.2` Khung hàm ý chính sách / quản trị (đánh số tuần tự `1., 2., 3., 4.`); `5.3` Hạn chế và hướng nghiên cứu tiếp theo.
   - **`## Tài liệu tham khảo`**:
     - **Tuyệt đối không bịa đặt hoặc ảo giác lược khảo**: Chỉ đưa vào các công trình học thuật có thật đã xác thực qua Crossref / OpenAlex (`verified_citation_ledger`). Tiêu đề bài báo viết **Sentence case**, tên tạp chí in nghiêng **Title Case** (`*Journal of Econometrics*`), mã DOI gắn link trực tiếp `[https://doi.org/10.xxxx/...](https://doi.org/10.xxxx/...)`.
     - **Đối xứng hai chiều `1-1` (`100% Parity`)**: Mọi trích dẫn trong bài `(Author, Year)` và `Author (Year)` phải có đúng công trình tương ứng ở mục Tài liệu tham khảo và ngược lại (`0` trích dẫn mồ côi, `0` tài liệu thừa không trích dẫn); hệ thống tự động kết nối hyperlink không gạch chân từ trích dẫn xuống tài liệu tham khảo kèm nút `↩` ở cuối mỗi mục tham khảo để nhảy mượt về **lần xuất hiện đầu tiên** trong bài.
   - **`## Phụ lục`**:
     - `### Phụ lục A`: Bảng ánh xạ giữa ký hiệu toán học trong bài và tên cột thực tế trong tệp dữ liệu `.csv` (các bảng ở phụ lục đánh số riêng `Bảng A1`, `Bảng A2`).
     - `### Phụ lục B`: Ma trận tương quan đầy đủ và kiểm định mở rộng.

---

## 2. Bảy Quy chuẩn Định dạng Bảng, Hình, Số liệu & Dấu câu (`Zero-Render-Defect Rules`)

1. **Đánh số Liên tục Bảng biểu & Hình ảnh theo Chuẩn Trích dẫn (`APA 7th` Mặc định)**:
   - Nếu người dùng chỉ định chuẩn trích dẫn (`apa`, `chicago`, `harvard`, `ieee`, `mla`), định dạng tiêu đề bảng và chú thích hình theo đúng chuẩn đó; **nếu không chỉ định, mặc định áp dụng `APA 7th`**:
     - **Bảng biểu (Tiêu đề đặt phía trên bảng)**: Đánh số liên tục `Bảng 1`, `Bảng 2`, `Bảng 3`... trong phần chính và `Bảng A1`, `Bảng A2`... trong Phụ lục theo mẫu `**Bảng 1:** *Tên bảng học thuật*` (chuẩn `IEEE` dùng chữ số La Mã `**BẢNG I:** *Tên bảng*`).
     - **Hình ảnh & Sơ đồ (Chú thích đặt phía dưới hình)**: Mọi hình ảnh, biểu đồ chẩn đoán và sơ đồ cấu trúc (`M1`, `M2`, `R1`) bắt buộc hiển thị đầy đủ và **đánh số thứ tự liên tục toàn bài** `Hình 1`, `Hình 2`, `Hình 3`... (`![Hình 1: Chú thích học thuật](...)` — tuyệt đối không đánh số nhảy cóc hay pha trộn `Hình 3.1`, `Hình 4.1` với `Hình 1`).
     - **Đồng bộ tham chiếu 100%**: Mọi tham chiếu trong lời văn (`xem Bảng 1`, `Hình 1 và 2`) phải khớp tuyệt đối với số thứ tự thực tế của Bảng và Hình.
2. **Định dạng Số nguyên Học thuật cho Cỡ mẫu $N$, Thang đo Likert & Biến Nhị phân**:
   - Số quan sát ($N$), giá trị `Min`/`Max` của thang đo khảo sát Likert (`1..5`, `1..7`), số bậc thang đo và biến nhị phân (`0`/`1`) bắt buộc viết dưới dạng **số nguyên** (`N = 400`, `1`, `5`, `0`, `1` — cấm viết `400.0`, `1.0000`, `5.0000`).
   - Các thống kê liên tục (`Mean`, `SD`, hệ số ước lượng $\hat{\beta}$, sai số chuẩn `SE`, $t$-stat, $p$-value, $R^2$) giữ chuẩn thập phân (`2`–`4` chữ số sau dấu chấm).
3. **Chống Rớt Dấu câu Xuống dòng hoặc Đứng Đầu dòng trên Mọi Thiết bị (`Zero Orphan Punctuation`)**:
   - Luôn viết dấu câu (`.`, `,`, `;`, `:`, `?`, `!`, `)`, `]`, `%`) **sát ngay sau từ, số, ngoặc đóng hoặc công thức toán học `$ ... $` đứng trước nó**, tuyệt đối không để khoảng trắng thừa trước dấu câu (ví dụ viết `đạt mức ý nghĩa tại $p < 0.01$.` thay vì `$p < 0.01$ .` hay `**Tiêu đề :**`).
   - Khi dùng dấu ngã `~` biểu thị xấp xỉ hoặc phân phối, viết liền hoặc đặt trong công thức toán học (`$\varepsilon_i \sim \mathcal{N}(0, \sigma^2)$`) để dấu câu không bao giờ bị đẩy lẻ loi sang đầu dòng mới trên PC, Tablet và Mobile.
4. **Toán học LaTeX/KaTeX Sạch 100% & Bảo vệ Văn bản Chính (`Gate G4 & G6`)**:
   - Bọc mọi ký hiệu toán học inline trong `$ ... $` (`$H_1$`, `$\text{QUIT}_i$`, `$\hat{\beta}_1$`, `$R^2 = 0.784$`). Cấm viết lặp ký hiệu chữ thường sát công thức (`$Q_{it}$Qit`). Trong ô bảng Markdown chỉ dùng `$ ... $` inline.
   - Không để lộ tên cột `snake_case` kỹ thuật (`wage_satisfaction`, `hh_consumption`) trong lời văn hoặc bảng chính (chỉ dùng tại Phụ lục A và khối code tái lập).
5. **Sử dụng Đúng 6 Khối Callout & Không Chèn Dòng Chữ In Hoa Cuối Bài**:
   - Dùng đúng 6 nhãn Callout: `> [!ABSTRACT]`, `> [!METHODOLOGY]`, `> [!FINDINGS]`, `> [!POLICY]`, `> [!IDEA]`, `> [!LIMITATION]`. Không tự chèn dòng `*DỮ LIỆU MÔ PHỎNG HỌC THUẬT...*` ở cuối bài (EcoLab tự động hiển thị hộp Callout minh bạch ở chân trang).
6. **Quy tắc `Zero Meta-Commentary` & Thuần khiết Học thuật Tuyệt đối**:
   - Bản thảo phải là công trình nghiên cứu khoa học độc lập hoàn chỉnh. **Cấm tuyệt đối** để lộ tên tệp đặc tả nội bộ (`.xlsx`, `docs/...`), câu lệnh prompt đầu vào, tên cổng kiểm định (`"Gate 1..9"`, `"nhằm giải trình yêu cầu của Gate 7"`), cụm tự quảng bá công cụ (`"chuẩn luận án tiến sĩ"`, `"trên EcoData"`) hay vai trò chuyên gia nội bộ trong tiêu đề, hình ảnh và lời văn chính (chỉ nêu khách quan tại Tuyên bố tính sẵn có dữ liệu & tái lập cuối bài).
7. **Tiền kiểm 9 Cổng (`G1–G9`) & Tự động Xuất bản Mọi Kết quả lên EcoLab Blog**:
   - Với dự án Mode B (5 bước): gọi `ecolab_report_validate_manuscript` đạt `passed=True` -> gọi `ecolab_report_submit_manuscript(auto_publish_blog=True)` **1 lần duy nhất**.
   - Với mọi kết quả nghiên cứu khác (Top 5 ý tưởng nghiên cứu, phân tích kinh tế lượng 1-Click Mode A hoặc báo cáo chuyên đề): bật `auto_publish_blog=True` hoặc gọi `ecolab_blog_publish` để tự động đăng bài kèm ảnh bìa 3D 1200×630, mục lục tự động, nút `Back to Top`, nút tải `.csv` và 3 tab mã tái lập `R · Stata · Python` trên `https://ecolab.io.vn/blog`.
