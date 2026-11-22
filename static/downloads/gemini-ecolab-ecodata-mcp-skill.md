---
name: gemini-ecolab-ecodata-mcp-skill
version: 3.97.0
role: Skill 3 — Academic Manuscript Authoring, Clean One-Way Verified Citations, Concise Slugs, .docx+.pdf Exports & Auto-Publish (0% Overlap)
platform: Google Gemini Connected Apps / Gemini Gems / Gemini Task / Google AI Studio
mcp_endpoint: https://ecodata.io.vn/mcp
ecolab_endpoint: https://ecolab.io.vn/mcp
blog_url: https://ecolab.io.vn/blog
docs_url: https://docs.tnsai.vn/ecolab/overview
description: >
  Bộ kỹ năng số 3 (cô đọng, sẵn sàng Copy-Paste 1-Click trên Google Gemini, 0% trùng lặp với Skill 1, Skill 2, Skill 4 & Skill 5):
  Chuyên trách biên soạn bản thảo học thuật chuẩn tạp chí Scopus/WoS Q1–Q3 & Luận án (>= 6.000 từ),
  chuẩn thuật ngữ kinh tế lượng tiếng Việt, trích dẫn liên kết một chiều sạch kèm DOI xác thực (`APA 7th` mặc định),
  khối `> [!ABSTRACT]` & giải thích phương trình `Trong đó:` dạng bullet sang trọng, URL slug ngắn gọn theo từ khóa,
  đánh số tuần tự Bảng/Hình, tiền kiểm 9 cổng (`G1–G9`), xuất bản kèm gói `.docx` + `.pdf` + `.csv` + mã `R · Stata · Python`
  lên Tạp chí Học thuật EcoLab (`https://ecolab.io.vn/blog`).
---

# Kỹ năng 3: Biên tập Bản thảo Học thuật Chuẩn Công bố Quốc tế, Định dạng Bảng/Hình & Xuất bản Tự động (`EcoLab Journal`)

> **Vai trò độc lập trong Bộ 5 Skills (`0% Overlap`)**:
> Kỹ năng này quy định cấu trúc bản thảo IMRaD ($\ge 6.000$ từ), chuẩn thuật ngữ kinh tế lượng – toán kinh tế tiếng Việt, định dạng `> [!ABSTRACT]` & `Trong đó:`, trích dẫn liên kết một chiều sạch không nút quay lại, URL slug ngắn gọn, quy chuẩn ảnh bìa 1200×630 & đồ thị 300-DPI, tiền kiểm 9 cổng (`G1–G9`) và gói tải `.docx` + `.pdf` khi xuất bản lên `https://ecolab.io.vn/blog`.

---

## 1. Cấu trúc Bản thảo Học thuật Chuẩn Tạp chí Q1–Q3 ($\ge 6.000$ từ)

1. **Tiêu đề (`# Tiêu đề`), Tiêu đề phụ, URL Slug Ngắn gọn & Khối Tóm tắt Cốt lõi (`> [!ABSTRACT]`)**:
   - **URL Slug chuẩn SEO học thuật**: Rút gọn `slug` ở mức **$\le 75$ ký tự (`6–10` từ khóa trọng tâm)** phản ánh trực tiếp chủ đề, mô hình và bối cảnh nghiên cứu (ví dụ `ham-cau-chi-tieu-thuoc-la-vhlss-2016-2024`, tuyệt đối không dùng slug lê thê quá dài).
   - **Tiêu đề & Tiêu đề phụ**: Tiêu đề tiếng Việt dùng **Sentence case** (chỉ viết hoa chữ đầu câu, danh từ riêng học giả kinh tế lượng và từ viết tắt `FEM`, `REM`, `GMM`, `ARDL`, `OLS`, `SDM`, `QUAIDS`, `FGT`, `UWE`, `PSU`, `PLS-SEM`, `FDI`, `GRDP`, `ASEAN`); tiếng Anh dùng **Title Case**. Tên học giả, tác giả trong tiêu đề, lời văn và danh mục tài liệu phải viết in hoa đúng quy chuẩn từng họ/tên riêng.
   - **Tóm tắt Cốt lõi (`> [!ABSTRACT]`) dạng Bullet Sang trọng**: Đặt **đúng 1 khối `> [!ABSTRACT]` duy nhất** toàn bài (cấm ghi tiền tố thừa `"TÓM TẮT NGHIÊN CỨU"`), trình bày gồm **1 đoạn dẫn ngắn (`2–3` câu)** nêu bài toán, dữ liệu và phương pháp nhận dạng, nối tiếp bởi **`3–4` đầu mục bullet in đậm** phân tách rõ dòng:
     * `- **Dữ liệu & Thiết kế nhận dạng:** ...`
     * `- **Phát hiện định lượng trọng tâm:** ...`
     * `- **Kiểm định chẩn đoán & Hàm ý chính sách:** ...`
   - **Giải thích ký hiệu phương trình (`Trong đó:`) dạng Bullet Đối xứng 1-1**: Ngay sau mọi khối phương trình kinh tế lượng `$$ ... $$`, tuyệt đối không dồn `Trong đó:` thành một đoạn văn dài đặc chữ; hãy trình bày thành danh sách bullet gọn rõ và bảo đảm **100% ký hiệu xuất hiện trong mục `Trong đó:` khớp chính xác 1-đối-1 với các biến có mặt trong phương trình phía trên** (không liệt kê biến ngoài phương trình, không bỏ sót biến trong phương trình).
2. **Năm Mục Nội dung Chính + Tài liệu Tham khảo + Phụ lục Tái lập**:
   - **`## 1. Giới thiệu và bối cảnh nghiên cứu`**: `1.1. Bối cảnh thực tiễn` -> `1.2. Khoảng trống nghiên cứu và đóng góp mới` -> `1.3. Mục tiêu và câu hỏi nghiên cứu` (đánh số `1., 2., 3.`).
   - **`## 2. Cơ sở lý thuyết và tổng quan tài liệu`**: `2.1. Khung lý thuyết nền tảng` -> `2.2. Tổng quan nghiên cứu thực nghiệm và phát triển giả thuyết` (cuối mỗi tiểu mục phát biểu tường minh `- **Giả thuyết $H_k$:** *...*`).
   - **`## 3. Phương pháp nghiên cứu và dữ liệu thực nghiệm`** (đầy đủ 7 tiểu mục `3.1–3.7`):
     - `3.1` Nguồn dữ liệu & cỡ mẫu $N$; `3.2` Bảng tổng hợp định nghĩa biến số (6 cột); `3.3` Phương trình kinh tế lượng khối `$$ ... $$` kèm mục bullet `Trong đó:`; `3.4` Phương pháp ước lượng & sai số chuẩn vững; `3.5` Công thức tác động biên (AME) / hệ số co giãn; `3.6` Quy trình kiểm định chẩn đoán (`1., 2., 3., 4.`); `3.7` Thiết kế kiểm định độ vững.
   - **`## 4. Kết quả ước lượng và kiểm định chẩn đoán`**:
     - `4.1` Thống kê mô tả (**Bảng 1**); `4.2` Ma trận tương quan & VIF (**Bảng 2**); `4.3` Kết quả ước lượng đa mô hình (**Bảng 3**) kèm đồ thị 300-DPI và phân tích từng giả thuyết; `4.4` Kiểm định chẩn đoán sau ước lượng (**Bảng 4**).
   - **`## 5. Hàm ý chính sách và kết luận`** (tiếng Anh: **`## 5. Policy Implications and Conclusion`** — tuyệt đối không ghi cụm `"(STORM)"` vào tiêu đề):
     - `5.1` Tóm tắt phát hiện trọng tâm; `5.2` Khung hàm ý chính sách / quản trị (đánh số tuần tự `1., 2., 3., 4.`); `5.3` Hạn chế và hướng nghiên cứu tiếp theo.
   - **`## Tài liệu tham khảo`**:
     - **Tuyệt đối không bịa đặt hoặc ảo giác lược khảo**: Chỉ đưa vào các công trình học thuật có thật đã xác thực qua Crossref / OpenAlex (`verified_citation_ledger`). Tiêu đề bài báo viết **Sentence case**, tên tạp chí in nghiêng **Title Case** (`*Journal of Econometrics*`), mã DOI gắn link trực tiếp `[https://doi.org/10.xxxx/...](https://doi.org/10.xxxx/...)`.
     - **Đối xứng `1-1` & Siêu liên kết Một chiều Sạch**: Mọi trích dẫn trong bài `(Author, Year)` và `Theo Author (Year)` phải có đúng công trình tương ứng ở mục Tài liệu tham khảo và ngược lại (`0` trích dẫn mồ côi, `0` tài liệu thừa không trích dẫn); hệ thống tự động gắn **siêu liên kết một chiều không gạch chân** `#ref-{author}-{year}` nhảy từ trích dẫn trong văn bản xuống mục Tài liệu tham khảo (tuyệt đối không gắn nút quay lại `↩` hay tạo siêu liên kết hai chiều gây nhiễu bố cục).
   - **`## Phụ lục`**:
     - `### Phụ lục A`: Bảng ánh xạ giữa ký hiệu toán học trong bài và tên cột thực tế trong tệp dữ liệu `.csv` (các bảng ở phụ lục đánh số riêng `Bảng A1`, `Bảng A2`).
     - `### Phụ lục B`: Ma trận tương quan đầy đủ và kiểm định mở rộng.

---

## 2. Chín Quy chuẩn Thuật ngữ, Định dạng Bảng, Hình, Số liệu & Xuất bản (`Zero-Render-Defect Rules`)

1. **Thuật ngữ Kinh tế lượng Chính xác & Quy tắc Viết hoa sau Dấu Chấm phẩy (`; Chữ hoa`)**:
   - Sử dụng **chính xác thuật ngữ chuyên ngành kinh tế lượng – toán kinh tế** tiếng Việt: dùng *"kiểm định chẩn đoán"*, *"kiểm định hậu ước lượng"*, *"kiểm định độ vững"*, *"sai số chuẩn phân cụm"* (**cấm tuyệt đối** dùng các cụm dịch sai chuyên ngành như *"kiểm định pháp y"* hay *"thẩm định pháp y"*).
   - **Bắt buộc viết in hoa ký tự đầu tiên ngay sau dấu chấm phẩy** trong toàn bộ văn xuôi học thuật và ghi chú bảng (ví dụ: `; Thứ hai,`, `; Thứ ba,`, `; Tuy nhiên,`, `; Đồng thời,`).
2. **Đánh số Liên tục Bảng biểu & Hình ảnh theo Chuẩn Trích dẫn (`APA 7th` Mặc định)**:
   - Nếu người dùng chỉ định chuẩn trích dẫn (`apa`, `chicago`, `harvard`, `ieee`, `mla`), định dạng tiêu đề bảng và chú thích hình theo đúng chuẩn đó; **nếu không chỉ định, mặc định áp dụng `APA 7th`**:
     - **Bảng biểu (Tiêu đề đặt phía trên bảng) & Ghi chú Ý nghĩa Thống kê Sạch**: Đánh số liên tục `Bảng 1`, `Bảng 2`, `Bảng 3`... trong phần chính và `Bảng A1`, `Bảng A2`... trong Phụ lục theo mẫu `**Bảng 1:** *Tên bảng học thuật*` (chuẩn `IEEE` dùng chữ số La Mã `**BẢNG I:** *Tên bảng*`). Trong dòng `Ghi chú:` dưới bảng **tuyệt đối không xuất hiện chuỗi thoát thô `\\\`**; luôn ghi rõ `* p < 0.10, ** p < 0.05, *** p < 0.01`.
     - **Hình ảnh & Sơ đồ (Chú thích đặt phía dưới hình) — 100% Tiếng Việt UTF-8 Sạch**: Mọi hình ảnh, biểu đồ chẩn đoán và sơ đồ cấu trúc (`M1`, `M2`, `R1`) bắt buộc **đánh số thứ tự liên tục toàn bài** `Hình 1`, `Hình 2`, `Hình 3`... (`![Hình 1: Chú thích học thuật](...)`). Toàn bộ tiêu đề, trục tọa độ và chú giải trên hình viết **100% tiếng Việt chuẩn UTF-8** (không viết tắt mã biến thô kiểu `y_it`, `m5a2c2b`, không lỗi dấu `?`, không dùng ASCII giả toán học như `tau ->`, `y_t`).
     - **Ảnh Bìa Bất đối xứng `1200×630`**: Ảnh đại diện dùng tiêu đề **`UPPERCASE` ngắt 2–3 dòng có nghĩa** (không để từ đơn lẻ rớt đầu dòng mới), nền tối giản sang trọng, **không nhồi 4 ô thẻ số liệu** hay huy hiệu chuyên mục dư thừa lên ảnh bìa.
     - **Đồng bộ tham chiếu 100%**: Mọi tham chiếu trong lời văn (`xem Bảng 1`, `Hình 1 và 2`) phải khớp tuyệt đối với số thứ tự thực tế của Bảng và Hình.
3. **Định dạng Số nguyên Học thuật cho Cỡ mẫu $N$, Thang đo Likert & Biến Nhị phân**:
   - Số quan sát ($N$), giá trị `Min`/`Max` của thang đo khảo sát Likert (`1..5`, `1..7`), số bậc thang đo và biến nhị phân (`0`/`1`) bắt buộc viết dưới dạng **số nguyên** (`N = 400`, `1`, `5`, `0`, `1` — cấm viết `400.0`, `1.0000`, `5.0000`).
   - Các thống kê liên tục (`Mean`, `SD`, hệ số ước lượng $\hat{\beta}$, sai số chuẩn `SE`, $t$-stat, $p$-value, $R^2$) giữ chuẩn thập phân (`2`–`4` chữ số sau dấu chấm).
4. **Chống Rớt Dấu câu Xuống dòng hoặc Đứng Đầu dòng trên Mọi Thiết bị (`Zero Orphan Punctuation`)**:
   - Luôn viết dấu câu (`.`, `,`, `;`, `:`, `?`, `!`, `)`, `]`, `%`) **sát ngay sau từ, số, ngoặc đóng hoặc công thức toán học `$ ... $` đứng trước nó**, tuyệt đối không để khoảng trắng thừa trước dấu câu (ví dụ viết `đạt mức ý nghĩa tại $p < 0.01$.` thay vì `$p < 0.01$ .` hay `**Tiêu đề :**`).
   - Khi dùng dấu ngã `~` biểu thị xấp xỉ hoặc phân phối, viết liền hoặc đặt trong công thức toán học (`$\varepsilon_i \sim \mathcal{N}(0, \sigma^2)$`) để dấu câu không bao giờ bị đẩy lẻ loi sang đầu dòng mới trên PC, Tablet và Mobile.
5. **Toán học LaTeX/KaTeX Sạch 100% & Bảo vệ Văn bản Chính (`Gate G4 & G6`)**:
   - Bọc mọi ký hiệu toán học inline trong `$ ... $` (`$H_1$`, `$\text{QUIT}_i$`, `$\hat{\beta}_1$`, `$R^2 = 0.784$`). Cấm viết lặp ký hiệu chữ thường sát công thức (`$Q_{it}$Qit`). Trong ô bảng Markdown chỉ dùng `$ ... $` inline.
   - Không để lộ tên cột `snake_case` kỹ thuật (`wage_satisfaction`, `hh_consumption`) trong lời văn hoặc bảng chính (chỉ dùng tại Phụ lục A và khối code tái lập).
6. **Sử dụng Đúng 6 Khối Callout & Không Chèn Dòng Chữ In Hoa Cuối Bài**:
   - Dùng đúng 6 nhãn Callout: `> [!ABSTRACT]`, `> [!METHODOLOGY]`, `> [!FINDINGS]`, `> [!POLICY]`, `> [!IDEA]`, `> [!LIMITATION]`. Không tự chèn dòng `*DỮ LIỆU MÔ PHỎNG HỌC THUẬT...*` ở cuối bài (EcoLab tự động hiển thị hộp Callout minh bạch ở chân trang).
7. **Quy tắc `Zero Meta-Commentary` & Thuần khiết Học thuật Tuyệt đối**:
   - Bản thảo phải là công trình nghiên cứu khoa học độc lập hoàn chỉnh. **Cấm tuyệt đối** để lộ tên tệp đặc tả nội bộ (`.xlsx`, `docs/...`), câu lệnh prompt đầu vào, tên cổng kiểm định (`"Gate 1..9"`, `"nhằm giải trình yêu cầu của Gate 7"`), cụm tự quảng bá công cụ (`"chuẩn luận án tiến sĩ"`, `"trên EcoData"`) hay vai trò chuyên gia nội bộ trong tiêu đề, hình ảnh và lời văn chính (chỉ nêu khách quan tại Tuyên bố tính sẵn có dữ liệu & tái lập cuối bài).
8. **Tiền kiểm 9 Cổng (`G1–G9`), Xuất bản Kèm `.docx` + `.pdf` Trong Gói Zip & Auto-Publish EcoLab Blog**:
   - Với dự án Mode B (5 bước): gọi `ecolab_report_validate_manuscript` đạt `passed=True` -> gọi `ecolab_report_submit_manuscript(auto_publish_blog=True)` **1 lần duy nhất**.
   - Với mọi kết quả nghiên cứu khác (Top 5 ý tưởng nghiên cứu, phân tích kinh tế lượng 1-Click Mode A hoặc báo cáo chuyên đề): bật `auto_publish_blog=True` hoặc gọi `ecolab_blog_publish` để tự động đăng bài kèm ảnh bìa bất đối xứng `1200×630`, mục lục sạch, nút `Back to Top`, tải `.csv` và **gói tải về `replication-package.zip` tích hợp sẵn bản thảo định dạng tạp chí dạng `.docx` + `.pdf`** cùng 3 tab mã tái lập `R · Stata · Python` trên `https://ecolab.io.vn/blog`.
