---
name: reproducibility-research-ecodata-skill
version: 3.97.0
role: Skill 5 — Harvard Dataverse & Empirical Reproducibility Studies, >23-Year Q1 Peer-Review Critique, Tri-Runtime <=1.0% Tolerance Gate & Gated Package Publishing (0% Overlap)
platform: Google Gemini Connected Apps / Gemini Gems / Claude Code / Cursor / Antigravity / OpenAI Codex
mcp_endpoint: https://ecodata.io.vn/mcp
ecolab_endpoint: https://ecolab.io.vn/mcp
blog_category_url: https://ecolab.io.vn/blog?category=nghien-cuu-tai-lap
description: >
  Bộ kỹ năng chuyên biệt cho Nghiên cứu Tái lập chuẩn Q2–Q1 (cô đọng, sẵn sàng Copy-Paste 1-Click trên Google Gemini,
  0% trùng lặp với các kỹ năng Dữ liệu/328 Mô hình, Khảo sát Hành vi SEM, Định dạng Bản thảo IMRaD và Vi mô VHLSS):
  Thẩm định gói dữ liệu thực nghiệm Harvard Dataverse / DOI quốc tế, phân loại 9 chuyên đề kinh tế chuẩn,
  giải quyết dữ liệu theo 3 tầng minh bạch, đối chiếu đa nền tảng R · Stata · Python với khóa dung sai định lượng <= 1.0%,
  biên soạn Phụ lục A bình duyệt học thuật độc lập (>23 năm kinh nghiệm phản biện Q1), bảo vệ 0% rò rỉ mã nguồn trên văn bản công khai
  và kiểm định – xuất bản tự động lên chuyên mục Nghiên cứu tái lập (`nghien-cuu-tai-lap`) qua `ecolab_replication_verify_and_publish`.
---

# Kỹ năng Chuyên biệt: Nghiên cứu Tái lập Thực nghiệm Chuẩn Tạp chí Q2–Q1, Bình duyệt Độc lập & Kiểm chứng Đa Công cụ (`Reproducibility Studies`)

> **Phạm vi kích hoạt nghiêm ngặt (`Scope Gate — 0% Overlap`)**:
> Chỉ kích hoạt kỹ năng này khi thực hiện **Nghiên cứu Tái lập (`Reproducibility / Empirical Replication Study`)** đối với các công trình kinh tế quốc tế (từ `Harvard Dataverse`, kho lưu trữ tạp chí `AER`, `QJE`, `JPE`, `Econometrica`, `REStud`, `JFE`, `JPubE`, `JDE` hoặc bài báo có `DOI` xác thực). Phối hợp liền mạch nhưng **không lặp lại nội dung** của: `gemini-ecodata-mcp-skill` (truy xuất dữ liệu & 328 mô hình thuộc 16 họ), `behavioral-research-ecodata-skill` (thang đo Likert/SEM), `gemini-ecolab-ecodata-mcp-skill` (quy tắc trình bày IMRaD, KaTeX, APA 7th) và `vhlss-micro-ecodata-skill` (vi mô VHLSS).

---

## 1. Thẩm định Gói Lưu trữ Harvard Dataverse, Chống Trùng lặp & Phân loại 9 TAG Cha

1. **Kiểm toán Gói Tái lập Gốc (`Archive & Resource Audit`)**:
   - Đọc và đối chiếu đầy đủ 4 thành phần của gói lưu trữ gốc: (a) bài báo gốc (`PDF`/`TeX`) & bảng ước lượng mục tiêu; (b) kịch bản mã lệnh gốc (`.do`, `.R`, `.py`, `.m`); (c) tệp dữ liệu thực nghiệm (`.dta`, `.csv`, `.rds`, `.parquet`, `.tsv`); (d) tài liệu `README` / `Codebook` định nghĩa biến số, quy tắc lọc mẫu, winsorize và phân cụm sai số chuẩn.
   - Gọi `audit_research_resources` (hoặc `ecolab_audit_and_standardize_context`) để khóa `original_doi`, câu hỏi nghiên cứu, phương trình mục tiêu và cấu trúc mẫu ($N$, $T$). Kiểm tra chống trùng lặp theo cặp khóa `(original_doi, slug)` trước khi khởi chạy.
2. **Định danh Chuyên mục & 9 TAG Chuyên đề Cha Chuẩn hóa**:
   - Mọi công trình tái lập bắt buộc gắn chuyên mục chính **`category_slug="nghien-cuu-tai-lap"`** (*Nghiên cứu tái lập* / *Reproducibility Studies*) và chọn đúng **1 TAG chuyên đề cha** phù hợp nhất trong 9 chuyên đề chuẩn:
     `tai-chinh-cong` (*Tài chính công*), `kinh-te-luong` (*Kinh tế lượng*), `kinh-te-vi-mo` (*Kinh tế vĩ mô*), `kinh-te-vi-mo-hoc` (*Kinh tế vi mô*), `kinh-te-phat-trien` (*Kinh tế phát triển*), `kinh-te-lao-dong` (*Kinh tế lao động*), `kinh-te-tai-chinh` (*Kinh tế tài chính*), `kinh-te-quoc-te` (*Kinh tế quốc tế*), `kinh-te-moi-truong` (*Kinh tế môi trường*).

---

## 2. Chiến lược Giải quyết Dữ liệu 3 Tầng & Minh bạch Nguồn gốc (`3-Tier Data Provenance`)

1. **Tầng 1 — Dữ liệu Thực nghiệm Gốc từ Gói Lưu trữ (`data_tier="original"`, Ưu tiên Tuyệt đối)**:
   - Trích xuất, chuẩn hóa bảng mã UTF-8 và tái tạo đúng mẫu phân tích từ tệp `.dta`/`.csv`/`.rds` của tác giả trên Harvard Dataverse (`is_simulated=False`, `data_source="Harvard Dataverse"`). Nạp qua `ecolab_dataset_prepare` để khóa cứng `user_empirical_dataset_locked=True`.
2. **Tầng 2 — Tái cấu trúc Chuỗi Thực nghiệm Chính thức qua EcoData (`data_tier="ecodata"`)**:
   - Khi gói lưu trữ khuyết tệp dữ liệu thô do bản quyền bên thứ ba nhưng công bố rõ mã chỉ báo công khai (`World Bank`, `IMF`, `FRED`, `OECD`, `GSO`, `Hải quan`, `VHLSS`, `Finco`), gọi `build_research_panel` (hoặc `query_macro_data_unified` / `get_global_macro_data`) để tái lập bảng dữ liệu thực nghiệm (`is_simulated=False`, chuyển giao Zero-Copy qua `ecodata_dataset_id`) và ghi rõ nguồn đối chiếu Tầng 2.
3. **Tầng 3 — Mô phỏng Cấu trúc DGP Hiệu chỉnh (`data_tier="simulated"`, Chỉ dùng khi Dữ liệu Mật/Đóng)**:
   - Chỉ khi dữ liệu gốc thuộc diện vi mô hành chính đóng kín không thể truy cập công khai, mới gọi `ecolab_dataset_simulate` hiệu chỉnh đúng tham số phân phối biên, ma trận hiệp phương sai và cỡ mẫu công bố trong bài báo gốc; bắt buộc gắn cờ `is_simulated=True`, khai báo minh bạch phương pháp hiệu chỉnh DGP tại mục dữ liệu và tuân thủ nghiêm ngặt Cổng kiểm định `G3` & `G9`.

---

## 3. Kiểm chứng Chéo Đa Nền tảng (`R · Stata · Python`) & Khóa Dung sai Định lượng `<= 1.0%`

1. **Đối chiếu Tam giác Thực thi & 328 Mô hình Kinh tế lượng trên EcoData MCP**:
   - Thực thi kịch bản ước lượng đồng bộ trên cả **3 hệ quy chiếu độc lập (`R`, `StataNow 19.5 MP` chuẩn `version 19.5` với dự phòng tức thì `0s`, `Python`)** kết hợp công cụ ước lượng trên `https://ecodata.io.vn/mcp` (`analyze_*`, `run_complete_econometric_study` hoặc `ecolab_model_estimate_start` trên hệ thống **328 mô hình thuộc 16 họ phân tích và 61 nhóm con**).
   - Khớp chính xác bậc tự do hiệu ứng cố định (`HDFE`), trọng số mẫu (`pweight`/`aweight`), cấu trúc phân cụm sai số chuẩn (`one-way`/`multi-way cluster`, `Driscoll–Kraay`, `Conley Spatial HAC`, `Newey–West`) và quy tắc xử lý quan sát khuyết.
2. **Ngưỡng Khóa Dung sai Định lượng Bắt buộc (`max_coef_diff_pct <= 1.0%`) & Chẩn đoán Độ vững Hiện đại**:
   - Tính sai lệch tương đối tối đa của hệ số ước lượng trọng tâm và sai số chuẩn giữa kết quả tái lập trên 3 công cụ so với bài báo gốc:
     $$\Delta_{\max}(\%) = \max_{k} \left| \frac{\hat{\beta}_{k,\text{rep}} - \hat{\beta}_{k,\text{orig}}}{\hat{\beta}_{k,\text{orig}}} \right| \times 100\% \le 1.0\%$$
   - Khi kiểm định mở rộng hoặc đối chứng chuyên đề: sử dụng `analyze_causal_policy(..., covariates=..., enable_oster_bounds=True)` cho kiểm định chọn lọc biến không quan sát được Oster (2019), `analyze_spatial_econometrics(..., enable_policy_taxonomy=True)` cho **ESDA (Moran's $I$ / LISA), SDM Lee–Yu, phân rã LeSage–Pace & Phân loại Chính sách Đa chiều 4 nhóm theo Ngưỡng Phân vị**, và `analyze_multivariate_time_series` cho **phân rã hiện giá Campbell–Shiller**.
   - Chỉ khi đạt đồng thời `tolerance_passed=True` và `tolerance_pct <= 1.0` mới được phép xuất bản. Nếu bài báo gốc sử dụng biến thể ước lượng chuyên biệt chưa có trong 328 mô hình hiện hữu, báo cáo rõ cấu hình đề xuất giám tuyển bổ sung theo quy trình `[B1–B4]`, tuyệt đối không âm thầm thay bằng mô hình sai khác bản chất định danh.

---

## 4. Khung Bình duyệt Học thuật Độc lập >23 Năm Kinh nghiệm (`## Phụ lục A. Báo cáo bình duyệt học thuật độc lập`)

Mỗi bài viết Nghiên cứu Tái lập bắt buộc có mục **`## Phụ lục A. Báo cáo bình duyệt học thuật độc lập`** (tiếng Anh: `## Appendix A. Independent Academic Peer-Review Critique`) viết với văn phong sắc sảo, khách quan của Tổng biên tập / Phản biện tạp chí Q1 (>23 năm kinh nghiệm), gồm đầy đủ **5 tiểu mục**:

- **`### A.1. Đóng góp học thuật và định vị công trình`**: Đánh giá tính mới lý thuyết – thực nghiệm và vị thế của bài báo gốc trong dòng văn chương chuyên ngành.
- **`### A.2. Phản biện chiến lược định danh nhân quả và giả định kinh tế lượng`**: Mổ xẻ trực diện các mối đe dọa đối với tính vững và tính không chệch (nội sinh đồng thời, biến bỏ sót `OVB`, tự tương quan chuỗi/không gian, chệch chọn mẫu, vi phạm xu hướng song song `Parallel Trends`, công cụ yếu `Weak IV` hoặc sai lệch `TWFE` khi tác động không đồng nhất theo thời gian).
- **`### A.3. Thẩm định chất lượng dữ liệu, đo lường biến số và độ nhạy mẫu`**: Đánh giá sai số đo lường biến đại diện, hao hụt mẫu (`attrition`), ngoại lai và độ nhạy theo giai đoạn/nhóm con.
- **`### A.4. Các hạn chế cấu trúc cốt lõi và cơ chế chệch ước lượng`**: Chỉ rõ **3–5 hạn chế cấu trúc trọng yếu**, phân tích tường minh chiều hướng chệch toán học (chệch lên hay chệch xuống đối với $\hat{\beta}$) của từng hạn chế.
- **`### A.5. Lộ trình nâng cấp và mở rộng nghiên cứu chuẩn Q2–Q1`**: Đề xuất các thiết kế thực nghiệm, biến công cụ mới, mô hình bán tham số/nhân quả hiện đại và hướng ứng dụng dữ liệu thực nghiệm tại Việt Nam / thị trường mới nổi.
- **Quy tắc Ngôn ngữ Thuần khiết (`Zero Meta-Commentary`)**: Tuyệt đối `0%` lời thoại AI, `0%` nhắc tên cổng kỹ thuật nội bộ, `0%` chèn chú thích dịch thô tiếng Anh trong ngoặc đơn bên cạnh thuật ngữ tiếng Việt phổ thông.

---

## 5. Bản thảo IMRaD Tiếng Việt Chuẩn Q2–Q1, Khóa `0%` Rò rỉ Code & Xuất bản qua `ecolab_replication_verify_and_publish`

1. **Cấu trúc Bản thảo, Thuật ngữ Chuẩn, Slug Ngắn gọn & Đồ họa Tiếng Việt `300-DPI`**:
   - Tuân thủ chuẩn trình bày tại `gemini-ecolab-ecodata-mcp-skill`: đúng 6 nhãn Callout (`[!ABSTRACT]`, `[!METHODOLOGY]`, `[!FINDINGS]`, `[!POLICY]`, `[!IDEA]`, `[!LIMITATION]` với `> [!ABSTRACT]` & `Trong đó:` định dạng bullet đối xứng), **URL `slug` ngắn gọn $\le 75$ ký tự**, chuẩn thuật ngữ kinh tế lượng (*"kiểm định chẩn đoán"*, cấm dùng *"kiểm định pháp y"* / *"thẩm định pháp y"*), **viết in hoa chữ cái đầu ngay sau dấu `;`** (`; Thứ hai,`), viết hoa đúng tên tác giả, bảng không có chuỗi `\\\`, tài liệu tham khảo APA 7th có DOI liên kết một chiều sạch (`#ref-{author}-{year}`, `0` nút quay lại `↩`) đối xứng `1-1`.
   - Mọi biểu đồ `300-DPI` phải dùng tiếng Việt chuẩn UTF-8 (`0` ký tự `?`, `0` công thức ASCII thô kiểu `tau ->`, `0` mã biến thô), ảnh bìa `1200×630` ngắt dòng `UPPERCASE` có nghĩa; bảng kết quả trung tâm đặt cạnh nhau: **Bài báo gốc** vs. **Tái lập R** vs. **Tái lập Stata** vs. **Tái lập Python** vs. **Sai lệch tối đa (`%`)**, kèm cỡ mẫu số nguyên $N$, sai số chuẩn trong ngoặc đơn và $R^2$.
2. **Bảo mật Gói Tái lập — `0%` Rò rỉ Mã nguồn (`Zero Script Leak`) & Xuất Kèm `.docx` + `.pdf`**:
   - **Cấm tuyệt đối** nhúng khối mã thực thi (```` ```r ````, ```` ```stata ````, ```` ```python ````) vào trong `markdown_text` công khai của bài viết.
   - Đóng gói toàn bộ kịch bản 3 ngôn ngữ (`scripts: {"r": "...", "stata": "...", "python": "..."}`) và dữ liệu thực nghiệm UTF-8 (`dataset_csv`, `dataset_filename` không chứa ký tự duyệt thư mục `..`/`/`/`\`) **duy nhất bên trong tham số `replication_package`**. Máy chủ EcoLab tự động lưu trữ tách biệt, gỡ `dataset_csv` khỏi JSONB công khai, đồng thời tích hợp **bản thảo định dạng tạp chí `.docx` và `.pdf`** vào gói `replication-package.zip` sau cổng hội viên trả phí (`replication_access` + chữ ký HMAC-SHA256 thời hạn ngắn).
3. **Kiểm tra Kép `100%` (`Double-Check Gate`) & Quy trình 2 Bước Kiểm định – Xuất bản**:
   - Đối chiếu chéo `100%` từng con số trong bảng Markdown khớp tuyệt đối với kết quả chạy thực tế từ chính `dataset_csv` và bộ 3 kịch bản trong `replication_package`.
   - **Bước 1 (Tiền kiểm an toàn — `server_llm_calls == 0`)**: Gọi `ecolab_replication_verify_and_publish(markdown_text=..., replication_package=..., original_doi=..., tolerance_pct=..., tolerance_passed=True, topic_tag=..., dry_run=True, validate_9_gates=True)` để xác nhận vượt qua toàn bộ khóa không rò rỉ code, Phụ lục A, dung sai `<= 1.0%` và 9 cổng `G1–G9`.
   - **Bước 2 (Xuất bản chính thức — Admin)**: Khi Bước 1 trả về `verified=True`, gọi `ecolab_replication_verify_and_publish(..., dry_run=False, category_slug="nghien-cuu-tai-lap", original_citation=..., journal_name=..., data_source="Harvard Dataverse", is_simulated=False, engines_verified=["r", "stata", "python"])` **1 lần duy nhất** để xuất bản bài viết lên `https://ecolab.io.vn/blog?category=nghien-cuu-tai-lap` và trả về liên kết trực tiếp cho người dùng.
