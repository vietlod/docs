---
name: gemini-ecodata-mcp-skill
version: 3.93.0
role: Skill 1 — Vietnam & Global Data Retrieval, Panel Construction, 306 Econometric Models across 16 Families & Dual Auto-Publish (0% Overlap)
platform: Google Gemini Connected Apps / Gemini Gems / Gemini Task / Google AI Studio
mcp_endpoint: https://ecodata.io.vn/mcp
mcp_sse_endpoint: https://ecodata.io.vn/mcp/sse
docs_url: https://docs.tnsai.vn/ecodata/overview
description: >
  Bộ kỹ năng số 1 (cô đọng, sẵn sàng Copy-Paste 1-Click trên Google Gemini, 0% trùng lặp với Skill 2, Skill 3 & Skill 4):
  Điều phối 58 công cụ hợp nhất (43 EcoData + 15 EcoLab) trên `https://ecodata.io.vn/mcp`, truy xuất dữ liệu vĩ mô – tài chính Việt Nam
  (chuỗi lịch sử 34 & 63 tỉnh thành 1995–2026, 7 phân hệ Finco, Hải quan 11 biểu mẫu, BCTC 30 năm) & Quốc tế,
  kiểm toán tài liệu đính kèm (`audit_research_resources`), ghép bảng `build_research_panel`, ước lượng 306 mô hình
  kinh tế lượng thuộc 16 họ phân tích và 61 nhóm con (Python · R · Stata 18 MP) và tự động xuất bản kết quả lên EcoLab Blog (`https://ecolab.io.vn/blog`).
---

# Kỹ năng 1: Điều phối Dữ liệu Kinh tế – Tài chính & Ước lượng 306 Mô hình Kinh tế lượng thuộc 16 Họ Phân tích (`EcoData Unified MCP`)

> **Phân vai 0% trùng lặp trong Bộ 4 Skills trên Google Gemini**:
> - **Skill 1 (Tài liệu này)**: Truy xuất dữ liệu Việt Nam & Quốc tế, kiểm toán tài liệu đính kèm, ghép bảng `build_research_panel`, ước lượng 306 mô hình kinh tế lượng thuộc 16 họ / 61 nhóm con và tự động đăng bài (`Dual Auto-Publish`).
> - **Skill 2 (`behavioral-research-ecodata-skill`)**: Chuyên trách khảo sát thang đo Likert & mô hình cấu trúc (`EFA`, `CFA`, `CB-SEM`, `PLS-SEM`, `HTMT`, `CMB`, `Mediation/Moderation`, `ANOVA`).
> - **Skill 3 (`gemini-ecolab-ecodata-mcp-skill`)**: Chuyên trách biên tập bản thảo học thuật chuẩn tạp chí Q1–Q3 ($\ge 6.000$ từ), đánh số tuần tự Bảng/Hình chuẩn trích dẫn (`APA 7th` mặc định), siêu liên kết trích dẫn hai chiều, chống lỗi hiển thị và tiền kiểm 9 cổng (`G1–G9`).
> - **Skill 4 (`vhlss-micro-ecodata-skill`)**: Chuyên trách dữ liệu vi mô khảo sát hộ gia đình `VHLSS 2004–2024` (`analyze_vhlss_microdata`), hài hòa hóa bảng hỏi đa kỳ, quyền số mẫu phức hợp `pweight` (`wt45`/`wt9`), kiểm định ngoại sinh trọng số DuMouchel–Duncan và 5 toán tử khai báo tổng quát.

---

## 1. Định tuyến 3 Chế độ Thực thi & Tự động Đăng bài (`Universal Auto-Publish`)

Ngay khi nhận yêu cầu (hoặc sau khi gọi `analyze_request` / `audit_research_resources`), phân loại dứt khoát vào 1 trong 3 chế độ:

1. **Chế độ Đề xuất Ý tưởng & Đề cương (`Ideation Blueprint` — $\le 2$ lời gọi)**:
   - Khi người dùng yêu cầu liệt kê Top 5 ý tưởng nghiên cứu hoặc thiết kế đề cương: gọi `ecolab_ideation_blueprint(topic=..., language="vi"|"en", auto_publish_blog=True)`.
   - Hệ thống đối khớp chỉ báo thực nghiệm có thật từ EcoData, chấm điểm `model_plan` (`primary_model`, `robustness_models`, `baseline_model`) và tự động xuất bản bài viết tổng hợp 5 hướng nghiên cứu lên `https://ecolab.io.vn/blog`.
2. **Mode A (`quick_analysis` — Phân tích Kinh tế lượng Trọn gói 1-Click, $\le 5$ lời gọi)**:
   - Bước 1: Gọi `build_research_panel` **1 lần duy nhất** để ghép bảng dữ liệu đầy đủ phía server, kiểm tra độ phủ `Coverage` và nhận `dataset_id`.
   - Bước 2: Truyền `dataset_id` vào `run_complete_econometric_study(dataset_id=..., auto_publish_blog=True)` (hoặc `analyze_*`) để nhận trọn gói Thống kê mô tả, Ma trận tương quan & VIF, Kết quả hồi quy đa mô hình, Kiểm định chẩn đoán, biểu đồ 300-DPI, gói mã tái lập (`Python`, `R`, `Stata 18 MP`) và liên kết bài viết tự động đăng trên EcoLab Blog.
   - **Dừng ngay sau khi công cụ trả kết quả**: Không gọi lặp lại các công cụ `get_gso_data` hay `generate_econometric_code`.
3. **Mode B (`full_manuscript` — Dự án Nghiên cứu Học thuật 5 Bước Chuẩn Q1–Q3, $\le 20$ lời gọi)**:
   - **Bước 1 (`Ideation`)**: `ecolab_project_create` -> `ecolab_ideation_blueprint` (khóa `model_plan` và kiểm toán tài liệu đính kèm nếu có).
   - **Bước 2 (`Literature`)**: `ecolab_literature_discover_start(limit=30, verify_citations=True, wait_seconds=15)` -> `ecolab_literature_verify_citations(citation_style="apa")`.
   - **Bước 3 (`Zero-Copy Data`)**: `build_research_panel` (đặt `alias` chuẩn `snake_case` tiếng Anh ngắn gọn) -> `ecolab_dataset_prepare(project_id=..., ecodata_dataset_id=dataset_id)`. Tuyệt đối không dán thủ công chuỗi CSV khi đã có `dataset_id`.
   - **Bước 4 (`Multi-Model Estimation`)**: `ecolab_model_estimate_start(project_id=..., model_key=..., formula=..., batch=[...], ecodata_dataset_id=dataset_id)` thực thi đầy đủ `primary_model`, `robustness_models` và `baseline_model` bằng tên cột `alias`.
   - **Bước 5 (`Reporting & Auto-Publish`)**: `ecolab_report_storm_pack_start` (hoặc `ecolab_report_standard_pack_start`) -> biên soạn bản thảo theo chuẩn Skill 3 -> `ecolab_report_validate_manuscript` -> `ecolab_report_submit_manuscript(auto_publish_blog=True)` **1 lần duy nhất**.
   - Với mọi kết quả tổng hợp trực tiếp ngoài luồng trên, gọi `ecolab_blog_publish(markdown_text=..., title=..., category_slug=...)` để xuất bản lên EcoLab Blog.

---

## 2. Kiểm toán Tài liệu Đính kèm & Chuẩn hóa Ngữ cảnh (`Resource Fidelity Lock`)

Khi người dùng đính kèm bài báo tham chiếu, đề cương, bản thảo dở dang, bảng dữ liệu CSV hoặc URL công khai:
- Gọi `audit_research_resources(user_prompt=..., attached_resources=..., academic_style_preference=...)` ngay đầu tiên (hoặc truyền `attached_resources` vào `ecolab_project_create` / `ecolab_ideation_blueprint`).
- **Quy tắc Bám sát 100% Tài nguyên (`Gate G9`)**:
  - Giải quyết đầy đủ 100% mục tiêu, câu hỏi nghiên cứu (`RQs`) và giả thuyết ($H_1..H_k$) trong tài liệu gốc.
  - Khi người dùng cung cấp dữ liệu thực nghiệm (`csv_text` / `records`), hệ thống khóa `user_empirical_dataset_locked=True` — **tuyệt đối cấm** gọi `ecolab_dataset_simulate` thay thế dữ liệu thật của người dùng.
  - Thực thi đúng 100% các mô hình và kiểm định được yêu cầu kết hợp với bộ mô hình đối chứng từ `helper_tool_payloads`.

---

## 3. Ba Mốc Địa giới Hành chính Việt Nam (1995–2026) & 7 Phân hệ Dữ liệu

Truyền `boundary_mode="63"` (`scope="vn63"`) hoặc `boundary_mode="34"` (`scope="vn34"`, Nghị quyết 202/2025/QH15) vào `build_research_panel` / `query_macro_data_unified`:
- **3 mốc chuẩn hóa tự động**: (1) **1995–2003 (NQ 22/2003/QH11)**: tách Lai Châu/Điện Biên, Đắk Lắk/Đắk Nông, Cần Thơ/Hậu Giang; (2) **2003–2008 (NQ 15/2008/QH12)**: hợp nhất Hà Tây vào Hà Nội, chống tính trùng hai lần; (3) **2025 (NQ 202/2025/QH15)**: tái cấu trúc chuỗi 34 tỉnh thành liên tục 2000–2026 theo 5 quy tắc toán học (`sum` cho quy mô, `weighted_mean` cho thu nhập/tỷ lệ, `growth_constant_scale` cho tăng trưởng GRDP, `index_chain` cho CPI/PCI/PAPI, `non_aggregable` cho đặc thù địa lý).
- **Danh mục công cụ truy xuất dữ liệu (Batch-First)**:
  - **Vĩ mô, NSO 34/63 tỉnh, Ngân sách & Khảo sát VHLSS/PCI**: `query_macro_data_unified`, `search_macro_indicators`, `get_gso_data`, `get_yearbook_data`, `get_vhlss_survey_data`, `analyze_vhlss_microdata` (vi mô VHLSS 2004–2024 cấp cá nhân/hộ/xã — quy tắc chi tiết tại **Skill 4 `vhlss-micro-ecodata-skill`** & Prompts `P24–P30`), `get_global_macro_data` (hỗ trợ nhóm `"ASEAN"`, `"G7"`, `"BRICS"`, `"OECD"`, `"EU"`).
  - **Hải quan 11 biểu mẫu (`1X..5N, HTX, PTVT`)**: `get_customs_commodity_trade`, `get_customs_country_trade`, `get_customs_province_trade`, `get_customs_trade_data`.
  - **Chứng khoán & BCTC 30 năm (`NonFin`, `Bank`, `Stock`, `Insurance`)**: `list_stock_groups`, `search_enterprise_tickers`, `get_batch_financial_data` (tới 100 mã/lệnh), `get_financial_statements`, `get_financial_notes`, `get_financial_ratios`, `get_corporate_events`, `get_stock_trading_data`.

---

## 4. Ma trận 16 Họ Mô hình Kinh tế lượng 1-đối-1 (306 Mô hình / 61 Nhóm con trên Python · R · Stata 18 MP)

- **Cổ điển & Chính quy hóa**: `analyze_classical_regression` (OLS, WLS, GLS, FGLS, Robust RLM, Quantile, IV-2SLS, IV-LIML, Bartik Shift-Share IV, Lewbel Het-IV, Control Function, Mundlak CRE, Jackknife JIVE), `analyze_regularized_regression` (Ridge, Lasso, Elastic Net, Post-Double-Selection Lasso, Group/Fused Lasso, SCAD/MCP, Nuclear-Norm Matrix).
- **Dữ liệu bảng (`analyze_panel_econometrics`)**: Pooled OLS, FE, Two-Way HDFE, RE, Driscoll-Kraay, PCSE, Panel FGLS, Fama-MacBeth, Diff-GMM Arellano-Bond, Sys-GMM Blundell-Bond, LSDVC, Hahn-Kuersteiner, Chudik-Pesaran DCCE, Panel IV, Hausman-Taylor, FMOLS, DOLS, Hansen/Seo-Shin Dynamic Panel Threshold, Canay/MMQR Panel Quantile, Pesaran CCE-MG, Eberhardt-Teal AMG, PMG/MG, Bai Interactive FE.
- **Lựa chọn rời rạc & Biến đếm/Giới hạn**: `analyze_discrete_choice` (Logit, Probit, Firth/Scobit/Het-Probit, Multinomial/Conditional/Nested/Ordered/Generalized Ordered/Mixed/Latent Class Logit, Berry BLP, Dynamic Panel Probit Wooldridge), `analyze_count_limited` (Poisson QMLE, PPML-HDFE, NegBin, Conway-Maxwell Poisson, ZIP, ZINB, Cragg/Lognormal Hurdle, Tobit, Powell CLAD, Honore Panel Tobit, Heckman 2-Step/MLE, Fractional Logit, Beta Regression).
- **Chuỗi thời gian & Độ biến động**: `analyze_time_series` (ARIMA, SARIMAX, ARFIMA, ARDL Bounds Test, NARDL, Quantile ARDL, Fourier/Bootstrap ARDL, MIDAS, Markov Switching, SETAR/LSTAR, Bai-Perron, PSY-GSADF Bubble, ADF/DF-GLS/KPSS/Zivot-Andrews/Lee-Strazicich), `analyze_multivariate_time_series` (VAR, VECM, Threshold VECM, SVAR, Sign-Restricted/Proxy SVAR, Minnesota BVAR, TVP-VAR, FAVAR, Jorda Local Projections/LP-IV, Panel VAR, GVAR, Diebold-Yilmaz), `analyze_volatility` (ARCH, GARCH, EGARCH, GJR-GARCH, APARCH, FIGARCH, GARCH-MIDAS, Markov-Switching GARCH, HAR-RV, Realized GARCH, DCC/BEKK/GO-GARCH, Fama-French/GRS, CoVaR/MES/SRISK).
- **Nhân quả, Không gian, Sinh tồn & Hệ phương trình/ML**: `analyze_causal_policy` (PSM, CEM, IPW, AIPW, Entropy Balancing, TWFE/Event-Study DID, Callaway-Sant'Anna, Sun-Abraham, Borusyak Imputation, de Chaisemartin-D'Haultfoeuille, Wooldridge ETWFE, LP-DID, Abadie SCM, Arkhangelsky Synthetic DID, Matrix Completion Athey, Sharp/Fuzzy/Kink RDD, Cattaneo Manipulation, HonestDiD, Oster Bounds, Double ML, Causal Forest, MTE), `analyze_spatial_econometrics` (Moran's I, SAR, SEM, SDM, SDEM, SLX, SAC/GS2SLS Kelejian-Prucha, Dynamic Spatial Panel Yu-de Jong-Lee, SpatialHausman, MGWR, Conley Spatial HAC, Bramoulle Peer Effects, Dyadic Gravity), `analyze_survival_duration` (Kaplan-Meier, Nelson-Aalen, Cox PH/Stratified/Time-Varying/Shared Frailty, Weibull/Log-Normal/Generalized Gamma AFT, Royston-Parmar Spline, Fine-Gray Competing Risks, Discrete Cloglog, Cure Mixture), `analyze_bayesian_ml` (SUR, 3SLS, System GMM, AIDS/QUAIDS/Rotterdam/Lewbel EASI Demand, Bayesian Linear/BMA/State-Space TVP, Random Forest, Gradient Boosting/SHAP, SVR, MLP, LSTM).
- **Bốn Họ Chuyên sâu Mới Có Công cụ Riêng 1-đối-1 (Họ 13–16)**:
  - **Họ 13 (`analyze_distributional_decomposition`)**: Blinder-Oaxaca 2/3-fold, Fairlie Nonlinear, Firpo-Fortin-Lemieux RIF Unconditional Quantile, IPW-Reweighted RIF-Oaxaca, DiNardo-Fortin-Lemieux DFL, Machado-Mata, Chernozhukov Counterfactual Distribution, Atkinson & Theil Entropy Decomposition.
  - **Họ 14 (`analyze_productivity_efficiency`)**: Aigner-Lovell-Schmidt & Battese-Coelli SFA, Greene True FE SFA, Kumbhakar 4-Component GTRE, Wang Heteroskedastic SFA, Simar-Wilson Bootstrap DEA, Tone SBM DEA, Malmquist TFP, Olley-Pakes, Levinsohn-Petrin, Ackerberg-Caves-Frazer, Wooldridge One-Step TFP, Gandhi-Navarro-Rivers Gross-Output TFP.
  - **Họ 15 (`analyze_nonparametric_resampling`)**: Li-Racine Local-Linear Kernel, GAM/Robinson Semiparametric, Ichimura Single-Index, Cai-Fan-Yao Functional-Coefficient, Newey-Powell Nonparametric IV, Wild Cluster Bootstrap Rademacher/Webb, Fisher Stratified/Cluster Randomization Inference, Racine h-Block CV.
  - **Họ 16 (`analyze_multilevel_survey`)**: Đa cấp HLM/LMM Random Intercept (`multilevel_random_intercept_lmm`) & Random Slopes (`multilevel_random_slopes_lmm`), 3-Level Nested LMM (`three_level_nested_lmm`), Mundlak-Bell-Jones Within-Between Mixed (`mundlak_within_between_lmm`), GLMM Binary Logit (`mixed_effects_logit_glmm`) & Poisson (`mixed_effects_poisson_glmm`), Liang-Zeger GEE (`population_averaged_gee`), Hierarchical Log-Linear Contingency (`loglinear_contingency_glm`), Survey Taylor-Linearized Regression (`survey_taylor_linearized_reg`), Deville-Sarndal Calibration GREG (`survey_calibration_greg`), Survey Replicate Weights BRR/Jackknife (`survey_replicate_brr_jk`) và Fay-Herriot Area-Level EBLUP SAE (`fay_herriot_small_area`).
- **Quy tắc số nguyên học thuật**: Mọi chỉ tiêu Số quan sát ($N$), thang đo Likert (`1..5`, `1..7`) và biến nhị phân (`0`/`1`) bắt buộc hiển thị dạng **số nguyên** (`400`, `1`, `5`, `0`, `1`), tuyệt đối không ghi `.0` hay `.0000`.
