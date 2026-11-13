---
name: vhlss-micro-ecodata-skill
version: 3.93.0
role: Skill 4 — VHLSS 2004–2024 Microdata, Complex Survey Weights, Multi-Wave Harmonization, Family 16 Multilevel/SAE & Declarative Pipeline (0% Overlap)
platform: Google Gemini Connected Apps / Gemini Gems / Claude Code / Cursor / Antigravity / OpenAI Codex
mcp_endpoint: https://ecodata.io.vn/mcp
ecolab_endpoint: https://ecolab.io.vn/mcp
docs_url: https://docs.tnsai.vn/ecodata/indicators/macro-survey-vhlss
description: >
  Bộ kỹ năng số 4 (cô đọng, sẵn sàng Copy-Paste 1-Click trên Google Gemini, 0% trùng lặp với Skill 1, Skill 2 & Skill 3):
  Chuyên trách khai thác Dữ liệu Vi mô Khảo sát Mức sống Dân cư Việt Nam (GSO VHLSS 2004–2024, 11 kỳ khảo sát,
  cấp cá nhân / hộ gia đình / xã) qua công cụ `analyze_vhlss_microdata`: bản đồ hài hòa hóa bảng hỏi đa kỳ
  (`MUC1A/1B/XDTVHo`, `MUC2V+2X`, `MUC4A/4D`, `MUC5A1/5A2/5B1`, `HO1..HO4`, `XA`), ma trận quyết định quyền số mẫu
  phức hợp (`pweight` `wt45`/`wt9`, phân cụm `PSU`, hệ số Kish `UWE`, kiểm định ngoại sinh trọng số DuMouchel–Duncan),
  5 toán tử khai báo tổng quát (`conditional_aggregations`, `exclude_self`, `contextual_variables` `leave_one_out`,
  khử lạm phát `CPI`), chuyển giao Zero-Copy `dataset_id` và xuất gói tái lập `Stata 18 MP · R · Python`.
---

# Kỹ năng 4: Khai thác Chuyên sâu Dữ liệu Vi mô VHLSS 2004–2024 & Trọng số Mẫu Phức hợp (`analyze_vhlss_microdata`)

> **Phạm vi kích hoạt nghiêm ngặt (`Scope Gate — 0% Overlap` trong Bộ 4 Skills)**:
> Chỉ kích hoạt kỹ năng này khi nghiên cứu khai thác **Dữ liệu Vi mô Khảo sát Mức sống Dân cư Việt Nam (`VHLSS 2004–2024`)** ở cấp cá nhân, hộ gia đình hoặc xã/phường qua `analyze_vhlss_microdata`. Phối hợp với **Skill 1** (điều phối chung & dữ liệu vĩ mô/tỉnh/BCTC), **Skill 2** (khảo sát Likert/SEM) và **Skill 3** (biên tập bản thảo chuẩn tạp chí Q1–Q3 & trích dẫn hai chiều).

---

## 1. Bản đồ Hài hòa hóa Bảng hỏi & Cạm bẫy Dữ liệu Đa kỳ VHLSS (`2004–2024`)

1. **Ba Khung Chọn mẫu Tổng điều tra Dân số GSO (`Census Master Frames`)**:
   - Ba khung độc lập gồm **`2004–2008`**, **`2010–2018`** và **`2020–2024`**. Chỉ chạy ghép bảng dọc hộ luân phiên `mode="merge_panel"` ($\le 5$ kỳ, khóa hộ 16 chữ số) **bên trong cùng một khung Tổng điều tra** (ví dụ `2014–2016–2018` hoặc `2020–2022–2024`). Khi phân tích xu hướng dài hạn xuyên khung (`2004–2024` hoặc `2014–2024`), bắt buộc dùng gộp lát cắt chéo `mode="append"` kèm `weight_normalization="wave_normalized"`.
2. **Năm Quy tắc Đồng bộ Module Bảng hỏi Xuyên kỳ (Bắt buộc tuân thủ)**:
   - **Nhân khẩu học & Thành viên di cư tách hộ (`MUC1A` + `MUC1B` + `Ho_XDTVHo`)**: Bảng thành viên hộ (`MUC1A` / `Ho_ThanhVien` / `Thanhvien`, biến tuổi `m1ac5`/`M1A_C5`, giới tính `m1ac2`/`M1A_C2`, vắng nhà vì công việc `m1ac10 == 5` / `M1A_C9 == 5`) cần đối chiếu bổ sung với `MUC1B` năm 2018 (người đi ăn ở riêng vì việc làm `m1bc7 in [3, 4]`) và bảng sàng lọc `Ho_XDTVHo` năm 2022 (`Q4E == 1`: lao động đi làm ăn xa $\ge 6$ tháng bị loại khỏi danh sách nhân khẩu thường trú) khi nghiên cứu di cư lao động.
   - **Giáo dục & Bằng cấp (`MUC2V` $\cup$ `MUC2X` giai đoạn `2018–2020`)**: Ở các kỳ tách bảng đang đi học (`MUC2V`) và đã thôi học (`MUC2X`), phải hợp nhất hai nhánh (hoặc dùng biến chuẩn hóa trình độ học vấn) để bảo toàn 100% độ phủ mẫu tuổi lao động $15\text{–}64$, tránh mất quan sát chọn lọc.
   - **Việc làm, Tiền lương & Thu nhập phi kiều hối (`MUC4A`, `MUC4D`)**: Khi ước lượng quyết định di cư hoặc cung lao động cá nhân (`entity="individual"`), tính thu nhập của **các thành viên còn lại trong hộ** bằng `exclude_self=True` và tách riêng kiều hối nội địa/quốc tế tại `MUC4D` (`101`/`102` hoặc `M4D_01`/`M4D_02`) khỏi thu nhập hộ trước di cư để triệt tiêu nội sinh ngược.
   - **Chi tiêu Chi tiết & Chuẩn hóa Kỳ Hồi tưởng (`MUC5A1`, `MUC5A2`, `MUC5B1`, `MUC5B2`, `HO1..HO4`)**: Các khoản chi dịp lễ Tết 12 tháng (`Muc5a1`) và phi lương thực năm (`Muc5b2`, y tế `MUC3`, giáo dục `MUC2`) giữ `scale_factor=1.0`; các khoản chi thường xuyên kỳ tham chiếu **30 ngày** (`Muc5a2` lương thực – thực phẩm – thuốc lá mã `115`/`116` và `Muc5b1` phi lương thực hàng tháng) **bắt buộc nhân `scale_factor=12.0`** để quy đổi đồng nhất về chi tiêu năm (nghìn đồng/năm). Hệ thống tự động đồng bộ bí danh tổng hợp xuyên kỳ (`THUNHAP` $\leftrightarrow$ `TONGTHU`, `TONGCHITIEU` $\leftrightarrow$ `TONGCHI`, `thubq`, `chibq`).
   - **Hạ tầng Xã Nông thôn (`XA`)**: Bảng `Xa` chỉ khảo sát địa bàn nông thôn; luôn dùng phép nối trái phân cấp `commune -> ea -> household -> individual` để giữ nguyên các hộ thành thị (`ttnt == 1`) kèm cờ cảnh báo minh bạch `commune_partial_match`.

---

## 2. Ma trận Quyết định Quyền số Mẫu Phức hợp (`Deaton, 1997; Solon, Haider & Wooldridge, 2015`)

VHLSS áp dụng thiết kế chọn mẫu phân tầng 2 giai đoạn tỷ lệ với quy mô cụm (`126` tầng `tinh × ttnt`; đơn vị chọn mẫu sơ cấp `psu` 13 chữ số `tinh-huyen-xa-diaban`):

| Mục tiêu phân tích | Quy tắc quyền số (`pweight`) & chuẩn hóa | Sai số chuẩn & Kiểm định chẩn đoán bắt buộc |
| :--- | :--- | :--- |
| **Trung bình, tỷ lệ, tổng dân số, nghèo `FGT P0–P2`, bất bình đẳng `Gini`, `Theil`** | **Bắt buộc `pweight`**: `wt45` (`wt36`) cho mẫu thu nhập – nhân khẩu ~45.000 hộ; **`wt9`** khi ghép mô-đun chi tiêu chi tiết ~9.400 hộ. Nhân thêm quy mô hộ `songuoi` khi tính phân phối phúc lợi bình quân đầu người từ tệp cấp hộ. | Sai số chuẩn tuyến tính hóa Taylor phân cụm tại `psu`. Báo cáo hệ số thiết kế Kish $\text{UWE} = 1 + \text{CV}(w)^2$ và cỡ mẫu hiệu dụng $N_{\text{eff}} = N / \text{UWE}$. **Cấm tuyệt đối** làm tròn `wt45`/`wt9` làm `fweight` (`[fw=...]`). |
| **Gộp lát cắt chéo đa kỳ (`mode="append"`, ví dụ `2014–2024`)** | Đặt **`weight_normalization="wave_normalized"`** ($w_{it}^* = w_{it} \cdot \frac{N_t}{\sum_{j \in t} w_{jt}}$) kết hợp hiệu ứng cố định năm. Chỉ dùng `"raw"` khi cộng tổng quy mô dân số tuyệt đối. | Phân cụm sai số chuẩn tại `psu` (`cluster_var="psu"`), ngăn các kỳ có dân số hoặc cỡ mẫu lớn hơn chi phối hàm hợp lý gộp. |
| **Bảng dọc hộ luân phiên (`mode="merge_panel"`, ví dụ `2020–2022–2024`)** | Đặt **`weight_normalization="longitudinal_base"`** (neo quyền số kỳ gốc đầu tiên trong cùng khung Tổng điều tra). | Phân cụm tại mã hộ cố định hoặc `psu`; kiểm tra hao hụt mẫu (`balanced` vs `unbalanced`) trước khi chạy `panel_fe` hoặc Mundlak `CRE`. |
| **Hồi quy nhân quả & cấu trúc (`OLS`, `Logit`, `Probit`, `Tobit`, `Cragg`, `PPML`, `Heckman`, `IV-2SLS`, `QUAIDS`)** | Đặt **`use_weights=True, compare_unweighted=True`** để ước lượng song song hai cột **Không trọng số** và **Có trọng số (`pweight`)**. | **Luôn phân cụm SE tại `psu` cho cả hai cột** và đọc kiểm định ngoại sinh trọng số **DuMouchel–Duncan (1983) / Solon–Haider–Wooldridge (2015)** trên các tương tác $w_i \cdot X_i$: nếu $p \ge 0.05$, quyền số ngoại sinh có điều kiện nên ước lượng Không trọng số đạt phương sai nhỏ hơn theo hệ số $\text{UWE}$; nếu $p < 0.05$, tồn tại chọn mẫu nội sinh hoặc tác động không đồng nhất theo tầng nên ưu tiên ước lượng `pweight` và bổ sung biến tương tác vùng/thành thị – nông thôn. |

---

## 3. Quy trình 3 Bước Thực thi Khai báo trên `analyze_vhlss_microdata`

1. **Bước 1 — Khám phá biến & kiểm tra quyền số (`action="discover"`)**:
   - Gọi `analyze_vhlss_microdata(action="discover", waves=[2018, 2020, 2022, 2024], keyword="...", muc="Muc1A")` để xác nhận chính xác tên biến, mã tệp, tính sẵn có của `wt45`/`wt9` và tính tương thích khung Tổng điều tra trước khi ghép bảng.
2. **Bước 2 — Dựng bộ dữ liệu Zero-Copy bằng 5 Toán tử Khai báo (`action="build_dataset"`)**:
   - Không viết kịch bản cắt ghép thủ công ngoài hệ thống; khai báo trực tiếp trong một lệnh `build_dataset`:
   ```json
   {
     "action": "build_dataset",
     "entity": "household",
     "mode": "append",
     "waves": [2014, 2016, 2018, 2020, 2022, 2024],
     "variable_names": ["tinh", "ttnt", "songuoi", "thubq", "chibq", "m1ac2", "m1ac5"],
     "include_weights": true,
     "weight_normalization": "wave_normalized",
     "aggregations": {"m1ac2": "head_of_household", "m1ac5": "head_of_household"},
     "conditional_aggregations": [
       {
         "name": "tob_regular_annual",
         "source_section": "Muc5A2",
         "source_var": "m5a2c2b",
         "agg": "sum",
         "filters": [{"var": "m5a2ma", "op": "in", "value": [115, 116]}],
         "scale_factor": 12.0,
         "fill_missing": 0.0,
         "exclude_self": false
       }
     ],
     "contextual_variables": [
       {
         "name": "peer_prev_prov_loo",
         "source_var": "tob_regular_annual",
         "level": "province",
         "stat": "mean",
         "leave_one_out": true,
         "weighted": true
       }
     ],
     "deflate_cpi_base_year": 2024,
     "monetary_variables": ["thubq", "chibq", "tob_regular_annual"],
     "derived_variables": [
       {"name": "ln_real_exp", "formula": "log( clip(chibq, 1, 1e9) )"}
     ],
     "filters": [{"var": "songuoi", "op": "gte", "value": 1}]
   }
   ```
   - Lưu lại mã **`dataset_id`** trả về (Zero-Copy trên máy chủ, đã tự động gỡ bỏ cột định danh cá nhân PII, đính kèm chỉ số `Gini`/`Theil`/`FGT P0–P2`, hệ số Kish `UWE` và gói tải về `.csv`/`.dta`/`_replication.zip`).
3. **Bước 3 — Ước lượng Đa Mô hình & Chuyển giao sang Bản thảo Q1 (`action="run_econometrics"` / `EcoLab`)**:
   - **Phân tích nhanh (Mode A)**: Gọi `analyze_vhlss_microdata(action="run_econometrics", dataset_id=..., model_type="logit"|"probit"|"tobit"|"ppml"|"heckman_selection"|"iv_2sls"|"panel_fe"|"oaxaca_blinder"|"quantile", dep_var=..., indep_vars=[...], cluster_var="psu", use_weights=True, compare_unweighted=True, selected_engine="auto")` để nhận bảng đối sánh Có trọng số vs. Không trọng số, kiểm định $F$ DuMouchel–Duncan và mã tái lập `svyset psu [pw=...]` (Stata 18 MP), `survey::svydesign` (R), Sandwich PSU (Python).
   - **Bản thảo học thuật hoàn chỉnh (Mode B — phối hợp Skill 3)**: Truyền `ecodata_dataset_id=dataset_id` vào `ecolab_dataset_prepare` để ước lượng đa mô hình đối chứng và xuất bản thảo đạt chuẩn quốc tế (tuyệt đối không để lộ tên tệp đặc tả nội bộ `.xlsx`/prompt trong bài viết, chỉ giữ đúng 1 khối `> [!ABSTRACT]` + tiêu đề phụ biên tập gọn 1 câu, và bảo đảm đối xứng `1-1` giữa trích dẫn trong bài với danh mục Tài liệu tham khảo có DOI xác thực).
