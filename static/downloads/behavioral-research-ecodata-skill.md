---
name: behavioral-research-ecodata-skill
version: 3.92.0
role: Skill 2 — Behavioral Economics, Psychology, Management & Marketing Survey/SEM Pipeline (0% Overlap)
platform: Google Gemini Connected Apps / Gemini Gems / Claude Code / Cursor / Antigravity / OpenAI Codex
mcp_endpoint: https://ecodata.io.vn/mcp
ecolab_endpoint: https://ecolab.io.vn/mcp
description: >
  Bộ kỹ năng số 2 (cô đọng, sẵn sàng Copy-Paste 1-Click trên Google Gemini, 0% trùng lặp với Skill 1, Skill 3 & Skill 4):
  Chuyên trách nghiên cứu Kinh tế hành vi – Tâm lý học tổ chức – Quản trị – Marketing (`survey_behavioral`,
  `EFA`, `CFA`, `CB-SEM`, `PLS-SEM`): thiết kế đề cương Luận án (3–5 chương) hoặc Bài báo Q1–Q3 (IMRaD),
  tính cỡ mẫu & mô phỏng dữ liệu khảo sát Likert (`Pilot` + `Main Survey`, mã hóa ngược, khóa bảng hỏi),
  kiểm định Cronbach's Alpha, EFA/PAF + Parallel Analysis, CFA/PLS-SEM (AVE, CR, HTMT, Fornell–Larcker),
  CMB (Harman, Kock VIF), Mediation Bootstrap, Moderation Simple Slopes (±1 SD), ANOVA/Welch/Tukey HSD
  và kết xuất bộ 3 sơ đồ cấu trúc 300-DPI chuẩn Q1 (`M1`, `M2`, `R1`).
---

# Kỹ năng 2: Nghiên cứu Kinh tế Hành vi – Tâm lý học – Quản trị – Marketing (`EFA / CFA / SEM / PLS-SEM`)

> **Phạm vi kích hoạt nghiêm ngặt (`Scope Gate — 0% Overlap`)**:
> Chỉ kích hoạt kỹ năng này khi nghiên cứu sử dụng **dữ liệu khảo sát thang đo Likert, phỏng vấn sâu định tính kết hợp định lượng hoặc mô hình phương trình cấu trúc biến tiềm ẩn** (`data_type="survey_behavioral"`, `pls_sem`, `cb_sem`, `efa_cfa`, `psychometrics`). Không áp dụng cho dữ liệu bảng vĩ mô/tài chính hoặc hồi quy Logit/Probit đơn phương trình không có nhân tố tiềm ẩn.

---

## 1. Quy trình 6 Bước Triển khai Chuẩn Tạp chí Q1–Q3 & Luận án trên `https://ecodata.io.vn/mcp`

### Bước 1 — Khởi tạo Dự án, Kiểm toán Bảng hỏi & Đề cương Học thuật Kép (`Ideation`)
1. Gọi `ecolab_project_create(name=..., content_language="vi"|"en", research_question=..., custom_constructs=..., strict_questionnaire_lock=True)`.
2. Gọi `ecolab_ideation_blueprint(topic=..., project_id=..., data_structure_hint="survey_behavioral", custom_constructs=..., strict_questionnaire_lock=True)`.
   - Nếu người dùng đính kèm bảng hỏi/thang đo riêng, truyền `custom_constructs` và `strict_questionnaire_lock=True` để khóa đúng 100% mã thang đo, số mục hỏi (`items`) và câu hỏi gốc.
   - Hệ thống trả về 2 khung đề cương chuẩn: **`thesis_vn`** (Luận văn/Luận án 3–5 chương: Nghiên cứu định tính phỏng vấn sâu $N = 10\text{–}15$ chuyên gia, mã hóa `Open/Axial Coding` -> Khảo sát sơ bộ `Pilot` -> Khảo sát chính thức `Main Survey`) và **`journal_q3`** (Bài báo quốc tế IMRaD chuẩn APA 7th: Khung lý thuyết `SET`, `COR`, `TPB`, `UTAUT2`, `SOR`, `JD-R` và giả thuyết $H_1\text{–}H_k$).

### Bước 2 — Tính toán Cỡ mẫu & Chuẩn bị / Mô phỏng Dữ liệu Khảo sát Likert (`Data`)
- **Trường hợp 1 (Người dùng cung cấp dữ liệu khảo sát thực tế)**: Gọi `ecolab_dataset_prepare(project_id=..., data_csv=...)` để khóa `user_empirical_dataset_locked=True`.
- **Trường hợp 2 (Thiết kế mô phỏng phương pháp luận khi chưa có dữ liệu thực địa)**:
  Gọi `ecolab_dataset_simulate(project_id=..., data_type="survey_behavioral", methodology="pls_sem"|"cb_sem", template="turnover"|"consumer"|"organizational", likert_points=5|7, n_pilot=110, num_observations=400, custom_constructs=..., strict_questionnaire_lock=True)`.
  - Tự động tính cỡ mẫu tối thiểu theo 5 chuẩn: **Cochran (1977)**, **Yamane (1967)**, **Green (1991)** ($50 + 8m$), **Hair et al. (2022)** ($5\text{–}10 \times \text{items}$) và **G*Power** ($f^2 = 0.15, \alpha = 0.05, 1-\beta = 0.95$).
  - Sinh dữ liệu `Pilot` và `Main Survey` bằng thuật toán `Latent-Variable Rejection Sampling`, bao gồm biến nhân khẩu học và mục hỏi mã hóa ngược ($X_{\text{recoded}} = K + 1 - X_{\text{raw}}$).

### Bước 3 — Kiểm định Thang đo & Chất lượng Tâm trắc học (`Psychometric Quality Gates`)
Gọi `analyze_behavioral_psychometrics` hoặc `ecolab_model_estimate_start(project_id=..., model_key="pls_sem", ...)`:
1. **Độ tin cậy (`Reliability`) & Sàng lọc phản hồi**:
   - Kiểm tra khoảng cách Levenshtein phát hiện phản hồi rập khuôn (`straight-lining`).
   - Đánh giá **Cronbach's $\alpha \ge 0.70$**, độ tin cậy **$\rho_A \ge 0.70$**, tương quan biến-tổng hiệu chỉnh **$\text{CITC} \ge 0.30$** và $\alpha$ nếu loại biến.
2. **Phân tích Nhân tố Khám phá (`EFA — PAF + Promax`)**:
   - Kiểm định **$\text{KMO} \ge 0.70$**, **Bartlett's Test** ($p < 0.001$), xác định số nhân tố bằng **Parallel Analysis** (Horn, 1965) kết hợp Eigenvalue $> 1$, hệ số tải $\lambda \ge 0.50$, không tải chéo.
3. **Mô hình Đo lường (`CFA / PLS-SEM Outer Model`)**:
   - **Hội tụ (`Convergent Validity`)**: Hệ số tải chuẩn hóa $\lambda \ge 0.708$, độ tin cậy tổng hợp $\text{CR} \ge 0.70$, phương sai trích trung bình $\text{AVE} \ge 0.50$.
   - **Phân biệt (`Discriminant Validity`)**: Tiêu chuẩn **Fornell–Larcker** ($\sqrt{\text{AVE}}_k > \max_{j \ne k}|r_{kj}|$) và chỉ số **$\text{HTMT} < 0.85$** (kèm khoảng tin cậy Bootstrap).

### Bước 4 — Kiểm soát Sai lệch Phương sai Chung (`CMB`) & Phân tích Độ nhạy
- **Common Method Bias (`CMB`)**: Kiểm định đơn nhân tố **Harman** (phương sai nhân tố đầu tiên $< 50\%$) và **Full Collinearity VIF** theo Kock (2015) ($\text{VIF}_{\text{inner}} < 3.30$).
- **Phân tích Độ nhạy (`Sensitivity Analysis`)**: Đối chiếu ước lượng giữa mẫu làm sạch (`Valid Sample`) và mẫu thô (`Full Raw Sample`).

### Bước 5 — Ước lượng Cấu trúc, Trung gian, Điều tiết & Khác biệt Nhóm (`Structural Model`)
- **Đường dẫn cấu trúc**: Báo cáo $\hat{\beta}$, $SE_{\text{Bootstrap}}$, $t$-stat, $p$-value, `95% CI [LL, UL]`, $R^2$, $R^2_{\text{adj}}$, kích thước ảnh hưởng $f^2$ ($0.02, 0.15, 0.35$) và kết luận giả thuyết.
- **Trung gian (`Mediation`)**: Tác động trực tiếp ($c'$), gián tiếp ($\text{IE} = a \times b$), tổng tác động ($c$) và tỷ lệ **VAF** ($<20\%$ không trung gian; $20\text{–}80\%$ trung gian một phần; $>80\%$ trung gian toàn phần).
- **Điều tiết (`Moderation & Simple Slopes`)**: Kiểm định $X \times W \to Y$ và phân tích độ dốc đơn giản tại 3 mức của biến điều tiết $W$: **$\text{Mean} - 1\text{ SD}$**, **$\text{Mean}$**, **$\text{Mean} + 1\text{ SD}$**.
- **Khác biệt Nhân khẩu học**: Kiểm định Levene -> dùng `One-Way ANOVA` (nếu $p_{\text{Levene}} \ge 0.05$) hoặc `Welch's F-test` (nếu $p_{\text{Levene}} < 0.05$) kèm hậu kiểm `Tukey HSD`.

---

## 2. Quy chuẩn Hiển thị Số nguyên Thang đo Likert & Bộ 3 Sơ đồ Cấu trúc 300-DPI

1. **Định dạng Số nguyên Bắt buộc cho Thang đo Khảo sát & Cỡ mẫu**:
   - Mọi giá trị cá biệt và cực trị (`Min`, `Max`) của các mục hỏi Likert (`1..5`, `1..7`), biến phân loại/nhị phân (`0`/`1`), số mục hỏi của thang đo và cỡ mẫu ($N_{\text{pilot}}$, $N_{\text{main}}$) trong văn bản, bảng thống kê mô tả và tệp `.csv` tải về **bắt buộc hiển thị dạng số nguyên** (`1`, `5`, `7`, `0`, `400` — tuyệt đối không viết `1.0000`, `5.0000`, `400.0`).
   - Các chỉ tiêu tính toán liên tục (`Mean`, `SD`, $\hat{\beta}$, `SE`, `AVE`, `CR`, `HTMT`) giữ định dạng số thập phân học thuật chuẩn (`2`–`4` chữ số thập phân).
2. **Bộ 3 Sơ đồ Cấu trúc 300-DPI (`M1`, `M2`, `R1`) & Đánh số Hình Liên tục**:
   - Hệ thống tự động kết xuất và nhúng **đúng 1 lần duy nhất** bộ 3 sơ đồ cấu trúc chuẩn công bố quốc tế:
     - **Sơ đồ M1 (Mục 3 — Khung lý thuyết & Mô hình đo lường EFA/CFA)**: Ô biến quan sát ghi gọn `CODE1–CODEk` (ví dụ `ENV1–ENV4`) kèm `λ ∈ [min; max]`; tên khái niệm nằm trọn trong khối elip.
     - **Sơ đồ M2 (Cuối Mục 3 — Đối sánh Mô hình cơ sở vs. Mô hình mở rộng)**: Khung đôi `Panel A` & `Panel B` kèm thanh chú giải mã khái niệm ở chân hình.
     - **Sơ đồ R1 (Mục 4 — Kết quả ước lượng đường dẫn SEM/PLS-SEM)**: Hiển thị hệ số ước lượng + mức ý nghĩa thống kê gọn gàng trên từng nhánh (`H1: β̂ = +0.307***`, `H4: β̂ = +0.039 (ns)`).
   - Toàn bộ sơ đồ và biểu đồ kiểm định được **đánh số thứ tự liên tục toàn bài** (`Hình 1`, `Hình 2`, `Hình 3`... hoặc `Figure 1`, `Figure 2`... theo chuẩn trích dẫn tại Skill 3) và đồng bộ 100% với tham chiếu trong bài viết.
