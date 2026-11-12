---
name: gemini-ecodata-mcp-skill
version: 3.92.0
role: Skill 1 — Vietnam & Global Data Retrieval, Panel Construction, 205+ Econometric Models & Dual Auto-Publish (0% Overlap)
platform: Google Gemini Connected Apps / Gemini Gems / Gemini Task / Google AI Studio
mcp_endpoint: https://ecodata.io.vn/mcp
mcp_sse_endpoint: https://ecodata.io.vn/mcp/sse
docs_url: https://docs.tnsai.vn/ecodata/overview
description: >
  Bộ kỹ năng số 1 (cô đọng, sẵn sàng Copy-Paste 1-Click trên Google Gemini, 0% trùng lặp với Skill 2, Skill 3 & Skill 4):
  Điều phối 54 công cụ hợp nhất trên `https://ecodata.io.vn/mcp`, truy xuất dữ liệu vĩ mô – tài chính Việt Nam
  (chuỗi lịch sử 34 & 63 tỉnh thành 1995–2026, 7 phân hệ Finco, Hải quan 11 biểu mẫu, BCTC 30 năm) & Quốc tế,
  kiểm toán tài liệu đính kèm (`audit_research_resources`), ghép bảng `build_research_panel`, ước lượng 205+ mô hình
  kinh tế lượng (Python · R · Stata 18 MP) và tự động xuất bản kết quả lên EcoLab Blog (`https://ecolab.io.vn/blog`).
---

# Kỹ năng 1: Điều phối Dữ liệu Kinh tế – Tài chính & Ước lượng 205+ Mô hình Kinh tế lượng (`EcoData Unified MCP`)

> **Phân vai 0% trùng lặp trong Bộ 4 Skills trên Google Gemini**:
> - **Skill 1 (Tài liệu này)**: Truy xuất dữ liệu Việt Nam & Quốc tế, kiểm toán tài liệu đính kèm, ghép bảng `build_research_panel`, ước lượng 205+ mô hình kinh tế lượng và tự động đăng bài (`Dual Auto-Publish`).
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

## 4. Ma trận 16 Họ Mô hình Kinh tế lượng (205+ Mô hình trên Python · R · Stata 18 MP)

- **Cổ điển & Chính quy hóa**: `analyze_classical_regression` (OLS, WLS, GLS, FGLS, Robust RLM, Quantile, IV-2SLS, IV-LIML), `analyze_regularized_regression` (Ridge, Lasso, Elastic Net, LARS, PCR).
- **Dữ liệu bảng (`analyze_panel_econometrics`)**: Pooled OLS, FE, Two-Way FE, RE, Driscoll-Kraay, PCSE, Panel FGLS, Fama-MacBeth, Diff-GMM Arellano-Bond, Sys-GMM Blundell-Bond, LSDVC, Panel IV, Hausman-Taylor, FMOLS, DOLS, Dynamic Panel Threshold (Hansen 1999), CCE-MG, AMG, PMG/MG.
- **Lựa chọn rời rạc & Biến đếm/Giới hạn**: `analyze_discrete_choice` (Logit, Probit, Multinomial/Conditional/Ordered/Mixed Logit), `analyze_count_limited` (Poisson QMLE, PPML, NegBin, ZIP, ZINB, Hurdle, Tobit, Heckman, Fractional Logit).
- **Chuỗi thời gian & Độ biến động**: `analyze_time_series` (ARIMA, SARIMAX, ARDL Bounds Test, NARDL, QARDL, Local Projections, Threshold, Structural Break, ADF/PP/KPSS/Zivot-Andrews/Johansen), `analyze_multivariate_time_series` (VAR, VECM, SVAR, BVAR, TVP-VAR, FAVAR, Granger, Toda-Yamamoto, Markov Switching), `analyze_volatility` (ARCH, GARCH, EGARCH, GJR-GARCH, FIGARCH, HAR-RV, DCC-GARCH).
- **Nhân quả, Không gian, Sinh tồn & Đa chiều**: `analyze_causal_policy` (PSM, IPW, AIPW, Entropy Balancing, DID, Callaway-Sant'Anna Staggered DID, Sun-Abraham, Synthetic DID, RDD, Double ML, Causal Forest, Synthetic Control), `analyze_spatial_econometrics` (Moran's I, SAR, SEM, SDM, Spatial Panel FE/RE, MGWR, Conley HAC), `analyze_survival_duration` (Kaplan-Meier, Cox PH, AFT, Fine-Gray), `analyze_bayesian_ml` (SUR, 3SLS, Bayesian MCMC, BMA, XGBoost/SHAP), cùng các mô hình Cầu thị trường (`AIDS/QUAIDS/BLP`), Biên hiệu quả TFP (`SFA/DEA/Malmquist/LP/OP/ACF/Oaxaca-Blinder`), Bootstrap (`Wild Cluster/Romano-Wolf`) và `analyze_behavioral_psychometrics` (chi tiết tại Skill 2).
- **Quy tắc số nguyên học thuật**: Mọi chỉ tiêu Số quan sát ($N$), thang đo Likert (`1..5`, `1..7`) và biến nhị phân (`0`/`1`) bắt buộc hiển thị dạng **số nguyên** (`400`, `1`, `5`, `0`, `1`), tuyệt đối không ghi `.0` hay `.0000`.
