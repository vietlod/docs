---
title: Phân tích Định lượng
sidebar_position: 3
description: Hướng dẫn quy trình ước lượng 201+ mô hình kinh tế lượng thuộc 15 họ phân tích và 58 mô hình con trên Python, R và Stata 18 MP kèm kiểm định tiền/hậu ước lượng và gói mã tái lập .zip trên EcoLab.
---

# Ước lượng & mô hình hóa kinh tế lượng (201+ bộ ước lượng)

Phân hệ **Mô hình hóa** của EcoLab (`v1.5.0`) kết nối trực tiếp đến lõi tính toán **EcoData Tri-Engine** (**Python**, **R** qua cổng RMCP và **Stata 18 MP**), cung cấp danh mục động **201+ bộ ước lượng cốt lõi thuộc 15 họ mô hình và 58 mô hình con** cho mọi cấu trúc dữ liệu (chéo, chuỗi thời gian, dữ liệu bảng, không gian và vi mô doanh nghiệp – hộ gia đình).

Danh mục mô hình trên EcoLab tự động đồng bộ từ `GET /api/catalog/manifest` của EcoData trong vòng **`<= 60` giây** mỗi khi quản trị viên xuất bản bộ ước lượng mới đã vượt qua 4 cổng kiểm chứng `B1–B4`.

---

## 1. Hệ thống 15 họ mô hình hỗ trợ

| Nhóm cấu trúc | Họ mô hình trong EcoLab | Các bộ ước lượng tiêu biểu | Phạm vi ứng dụng học thuật |
| :--- | :--- | :--- | :--- |
| **Tuyến tính, HDFE & chính quy hóa** | Họ 1 (Tuyến tính cổ điển & HDFE), Họ 2 (Chính quy hóa) | OLS, WLS, GLS/FGLS, TLS, Multi-Way HDFE (`reghdfe`/`fixest`), Ridge, Lasso, Elastic Net, Adaptive Lasso | Hồi quy cơ sở, hấp thụ tác động cố định đa chiều quy mô lớn và chọn biến khi đa cộng tuyến cao. |
| **Dữ liệu bảng tĩnh, động & đồng liên kết** | Họ 3 (Bảng tuyến tính), Họ 4 (Bảng động & ngưỡng) | Pooled OLS, FE/RE, Between, Mundlak CRE, Driscoll-Kraay, CCE-MG, PCSE, Difference/System GMM (Windmeijer), Dynamic Panel Threshold, Panel DOLS/FMOLS/PMG | Dữ liệu bảng 34/63 tỉnh, quốc gia hoặc doanh nghiệp có phụ thuộc chéo, biến trễ nội sinh và quan hệ đồng liên kết dài hạn. |
| **Biến rời rạc, chọn mẫu, sinh tồn & dữ liệu đếm** | Họ 5 (Rời rạc & sinh tồn), Họ 6 (Dữ liệu đếm & PPML) | Binary/Multinomial/Ordered Logit & Probit, Tobit, Truncated, Heckman, Fractional, Cox PH, Weibull AFT, Poisson, NegBin, ZIP, ZINB, Gravity PPML-HDFE | Lựa chọn tiêu dùng, xác suất vỡ nợ, chọn mẫu phi ngẫu nhiên, thời gian sống sót và thương mại song phương có nhiều giá trị $0$. |
| **Phân vị, chuỗi thời gian & hệ phương trình** | Họ 7 (Phân vị & phân rã), Họ 8 (Đơn biến), Họ 9 (Đa biến & LP), Họ 10 (IV & hệ phương trình), Họ 11 (Phi tuyến & ngưỡng) | Quantile, Panel MM-QR, RIF, Oaxaca-Blinder, ARIMA, GARCH/EGARCH, ARDL/NARDL, Markov-Switching, PSY GSADF, VAR/VECM/SVAR, Local Projections, IV-2SLS, LIML, Lewbel IV, Bartik Shift-Share, 3SLS, SUR, NLS, GAM, Hansen Threshold | Phân phối bất bình đẳng, truyền dẫn bất đối xứng vĩ mô – tài chính, phản ứng đẩy IRF và xử lý biến nội sinh công cụ yếu. |
| **Nhân quả hiện đại, cầu cấu trúc, năng suất & học máy nhân quả** | Họ 12 (Nhân quả & không gian), Họ 13 (Hệ thống cầu & BLP), Họ 14 (Biên hiệu quả & TFP), Họ 15 (Bootstrap & Causal ML) | TWFE & Staggered DID (Callaway-Sant'Anna, Sun-Abraham, BJS, dCDH, Bacon, LP-DID, SDID), Synthetic Control, Sharp/Fuzzy RDD, PSM/AIPW, Spatial SAR/SEM/SDM & Conley HAC, AIDS/QUAIDS, Berry-BLP, SFA, DEA, Malmquist, OP/LP/Wooldridge/ACF TFP, Wild Cluster Bootstrap, Double ML, Causal Forest | Đánh giá chính sách đa thời điểm, lan tỏa không gian, ước lượng cầu thị trường, hiệu quả kỹ thuật – năng suất TFP và suy diễn cụm ít. |

---

## 2. Tách bạch kiểm định tiền ước lượng và hậu ước lượng

EcoLab tách riêng hai lớp kiểm định chẩn đoán kèm cơ chế **Kiểm tra thông minh trước thực thi (Smart Pre-Check)**:

1. **Kiểm định tiền ước lượng (Pre-Estimation Diagnostics — thực hiện tại Giai đoạn 3 & đầu Giai đoạn 4):**
   - Kiểm định tính dừng chuỗi thời gian và dữ liệu bảng: ADF, Phillips-Perron, KPSS, Im-Pesaran-Shin, Levin-Lin-Chu, Pesaran CIPS.
   - Chẩn đoán đa cộng tuyến $VIF$, phụ thuộc chéo Pesaran CD, tự tương quan không gian Moran's $I$ và đồng liên kết Pedroni / Kao / Westerlund / Johansen.
   - Smart Pre-Check tự động cảnh báo cỡ mẫu tối thiểu, cấu trúc bảng cân đối/không cân đối và bậc tích hợp trước khi gửi tác vụ ước lượng.
2. **Kiểm định hậu ước lượng (Postestimation Diagnostics — đính kèm tự động vào mỗi kết quả mô hình):**
   - Breusch-Pagan / White (phương sai sai số thay đổi), Durbin-Watson / Breusch-Godfrey / Wooldridge (tự tương quan), Ramsey RESET, Jarque-Bera.
   - Hausman & Mundlak (FE vs RE), Arellano-Bond AR(1)/AR(2) & Hansen/Sargan $J$ (GMM), Kleibergen-Paap rk Wald $F$ (công cụ yếu), Pesaran Bounds $F/t$ & Wald bất đối xứng (ARDL/NARDL), Event-Study Pre-Trend Wald (DID) và McCrary density (RDD).

---

## 3. Quy trình thực hiện và cam kết Fail-Closed `422`

1. Tại phân hệ **Mô hình hóa**, nhấn **Thêm mô hình** để mở cây phân loại động **15 họ mô hình**.
2. Chọn họ mô hình và bộ ước lượng cụ thể, khai báo biến phụ thuộc ($Y$), biến giải thích ($X_1, \dots, X_k$), biến thực thể – thời gian, biến nội sinh/công cụ và cấu trúc sai số chuẩn (Homoskedastic, Robust HC0–HC3, HAC, Driscoll-Kraay, Conley Spatial HAC, Clustered một chiều/hai chiều hoặc Wild Cluster Bootstrap).
3. Lựa chọn môi trường thực thi (**Python**, **R** hoặc **Stata 18 MP**) và nhấn **Chạy mô hình**.
4. Nếu khóa mô hình chưa được đăng ký hoặc thiếu tham số cấu trúc bắt buộc, hệ thống trả về thông báo lỗi tường minh **`422 UNSUPPORTED_ESTIMATOR` / `422 INVALID_SPECIFICATION`** — tuyệt đối không bao giờ âm thầm chuyển sang OLS để che giấu lỗi đặc tả.

---

## 4. Đọc kết quả và tải gói tái lập `.zip` ba ngôn ngữ

Kết quả ước lượng được tổ chức thành 4 thẻ trực quan:

- **Thẻ Bảng ước lượng:** Hệ số hồi quy ($\hat{\beta}$), sai số chuẩn, thống kê $t/z$, trị số $p$, mức ý nghĩa (`***`, `**`, `*`) và chỉ tiêu độ phù hợp ($R^2$, Within-$R^2$, $F$/Wald, Log-Likelihood, AIC, BIC), sẵn sàng khóa bằng chứng sang Giai đoạn 5 (Báo cáo IMRaD/STORM).
- **Thẻ Kiểm định hậu ước lượng:** Trình bày đầy đủ trị số thống kê, trị số $p$ và kết luận học thuật cho từng giả định phương pháp.
- **Thẻ Phân tích độ vững (Robustness):** So sánh song song nhiều cột đặc tả, mẫu con, cấu trúc sai số chuẩn và đối chiếu giữa chế độ 63 tỉnh và 34 tỉnh.
- **Thẻ Gói mã tái lập (`.zip` Reproducibility Bundle):** Tải về một chạm tệp nén `.zip` chứa trọn bộ mã nguồn thực thi độc lập trên **Stata 18 MP (`.do`)**, **R (`.R`)**, **Python (`.py`)**, lát cắt dữ liệu sạch và tệp băm kiểm chứng **`SHA256SUMS.txt`**.
