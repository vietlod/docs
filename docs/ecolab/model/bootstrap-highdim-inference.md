---
title: Wild Cluster Bootstrap, học máy nhân quả (Double ML, Causal Forest) & suy diễn nhiều chiều
sidebar_position: 15
description: Hướng dẫn suy diễn tái lấy mẫu Wild Cluster Bootstrap, học máy nhân quả Chernozhukov Double/Debiased ML, Athey-Wager Causal Forest và phân tích nhiều chiều PCA/Factor trên EcoData và EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Wild Cluster Bootstrap, học máy nhân quả (Double ML, Causal Forest) & suy diễn nhiều chiều

**Họ mô hình 15 (Tái lấy mẫu, học máy nhân quả & suy diễn nhiều chiều)** giải quyết hai thách thức hiện đại của nghiên cứu kinh tế thực nghiệm: (1) suy diễn thống kê chuẩn xác khi số lượng cụm nhỏ hoặc kích thước cụm mất cân đối (ví dụ dữ liệu **34 tỉnh thành** hoặc 6 vùng kinh tế), và (2) ước lượng tác động nhân quả không chệch khi tập biến kiểm soát nhiều chiều hoặc phi tuyến phức tạp.

Trong EcoLab, nhóm mô hình này nằm tại **Mô hình hóa → 15. Bootstrap & Causal ML**. Xem thêm [Danh mục 15 họ mô hình](/ecolab/model/group).

---

## Khi nào nên dùng họ mô hình 15?

- **Wild Cluster Bootstrap (Cameron-Gelbach-Miller; Roodman-MacKinnon-Nielsen-Webb):** Khi sai số tương quan nội cụm nhưng số lượng cụm ít ($G < 30$ hoặc $G = 34$ tỉnh có quy mô dân số/GRDP chênh lệch lớn), khiến sai số chuẩn cụm tiệm cận thông thường có xu hướng bác bỏ quá mức giả thuyết không.
- **Nonparametric Pairs, Moving-Block & Panel Cluster Bootstrap:** Khi cần khoảng tin cậy thực nghiệm cho các bộ ước lượng nhiều bước (như Heckman, Oaxaca-Blinder, DEA, ACF TFP) hoặc chuỗi thời gian phụ thuộc.
- **Double / Debiased Machine Learning (Chernozhukov et al., 2018):** Khi muốn ước lượng tham số nhân quả $\theta_0$ với tốc độ hội tụ $\sqrt{N}$ trong khi kiểm soát hàng trăm biến nhiễu $W$ bằng Lasso, Random Forest hoặc Gradient Boosting thông qua trực giao hóa Neyman và chia chéo mẫu (cross-fitting).
- **Generalized Random Forests / Causal Forest (Wager & Athey, 2018):** Khi mục tiêu là ước lượng tác động xử lý có điều kiện không đồng nhất $\tau(x) = \mathbb{E}[Y(1) - Y(0) \mid X = x]$ (CATE) kèm khoảng tin cậy tiệm cận hợp lệ.
- **PCA, Exploratory Factor Analysis & Clustering:** Khi cần xây dựng chỉ số tổng hợp thể chế, tài chính toàn diện hoặc phân nhóm cấu trúc địa phương/doanh nghiệp trước khi đưa vào hồi quy.

---

## Đặc tả toán học cốt lõi

### 1. Wild Restricted Cluster Bootstrap (`boottest`)

Dưới giả thuyết không bị ràng buộc $H_0: \beta_1 = \beta_1^0$, phần dư bị ràng buộc $\tilde{u}_g$ của từng cụm $g = 1, \dots, G$ được nhân với trọng số ngẫu nhiên độc lập $v_g^{(b)}$ (phân phối Rademacher $\{\pm 1\}$ hoặc phân phối 6 điểm Webb khi $G \le 12$):

$$
\mathbf{y}_g^{*(b)} = \mathbf{X}_g \tilde{\beta} + v_g^{(b)} \tilde{\mathbf{u}}_g, \qquad t^{*(b)} = \frac{\hat{\beta}_1^{*(b)} - \beta_1^0}{\text{SE}_{\text{CR}}(\hat{\beta}_1^{*(b)})}
$$

Trị số $p$ bootstrap đối xứng thu được từ phân phối thực nghiệm của $|t^{*(b)}|$ đạt hiệu chỉnh tiệm cận bậc cao (asymptotic refinement).

### 2. Trực giao hóa Neyman trong Double / Debiased ML (Partially Linear Model)

Với mô hình tuyến tính từng phần $Y = D\theta_0 + g_0(W) + U$ và $D = m_0(W) + V$:

$$
\hat{\theta}_{\text{DML}} = \left(\frac{1}{N} \sum_{k=1}^{K} \sum_{i \in I_k} \hat{V}_{i}^{(-k)} \hat{V}_{i}^{(-k)}\right)^{-1} \left(\frac{1}{N} \sum_{k=1}^{K} \sum_{i \in I_k} \hat{V}_{i}^{(-k)} \hat{U}_{i}^{(-k)}\right)
$$

trong đó phần dư $\hat{U}_i^{(-k)} = Y_i - \hat{\ell}_0^{(-k)}(W_i)$ và $\hat{V}_i^{(-k)} = D_i - \hat{m}_0^{(-k)}(W_i)$ được ước lượng trên các tập con ngoài nếp gấp $I_k^c$ ($K$-fold cross-fitting), loại bỏ chệch chính quy hóa bậc nhất.

---

## Giả định và kiểm định hậu ước lượng

1. **Lựa chọn phân phối trọng số Wild Bootstrap:** Sử dụng trọng số **Rademacher** cho $G \ge 13$ cụm và trọng số **Webb 6 điểm** khi số cụm rất nhỏ ($G \le 12$) để đảm bảo số tổ hợp hoán vị đủ lớn ($6^G$).
2. **Độ ổn định Cross-Fitting & Overlap (Double ML / Causal Forest):** Kiểm định miền giao thoa điểm xu hướng $\hat{m}(W) \in [\epsilon, 1-\epsilon]$, sai số dự báo ngoài mẫu của hàm nhiễu $(\hat{\ell}_0, \hat{m}_0)$ và kiểm định tính không đồng nhất thực sự của CATE (Best Linear Predictor calibration test của Chernozhukov-Demirer-Duflo-Fernández-Val).
3. **Độ thích hợp mẫu phân tích nhân tố (PCA / Factor):** Kiểm định Kaiser-Meyer-Olkin ($\text{KMO} > 0.6$), kiểm định cầu Bartlett và tỷ lệ phương sai trích lũy kế.

---

## Minh họa mã tái lập 3 ngôn ngữ

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata 18 MP" default>

```stata
* === 1. Wild Cluster Bootstrap với Rademacher / Webb weights (boottest) ===
reghdfe grdp_growth public_inv fdi_ratio human_cap, absorb(prov_id year) vce(cluster prov_id)
boottest public_inv, cluster(prov_id) reps(9999) weighttype(rademacher) seed(2026)

* === 2. Double / Debiased Machine Learning (xporegress / ddml) ===
xporegress grdp_growth public_inv, controls(c.x1##c.x2 x3-x40) vce(cluster prov_id) rseed(2026)
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# === 1. Fast Wild Cluster Bootstrap (fwildclusterboot + fixest) ===
library(fixest)
library(fwildclusterboot)
fe_fit <- feols(grdp_growth ~ public_inv + fdi_ratio + human_cap | prov_id + year,
                cluster = ~prov_id, data = df)
boot_res <- boottest(fe_fit, clustid = "prov_id", param = "public_inv",
                     B = 9999, type = "rademacher")
summary(boot_res)

# === 2. Causal Forest CATE Estimation (grf) ===
library(grf)
cf_fit <- causal_forest(X = as.matrix(df[, control_cols]), Y = df$y, W = df$treat, seed = 2026)
average_treatment_effect(cf_fit, target.sample = "all")
test_calibration(cf_fit)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# === Double / Debiased Machine Learning With K-Fold Cross-Fitting (doubleml) ===
import doubleml as dml
from sklearn.ensemble import RandomForestRegressor

dml_data = dml.DoubleMLData(df, y_col="grdp_growth", d_cols="public_inv", x_cols=control_cols)
ml_l = RandomForestRegressor(n_estimators=300, max_depth=8, random_state=2026)
ml_m = RandomForestRegressor(n_estimators=300, max_depth=8, random_state=2026)

dml_plr = dml.DoubleMLPLR(dml_data, ml_l=ml_l, ml_m=ml_m, n_folds=5)
dml_plr.fit()
print(dml_plr.summary)
```

  </TabItem>
</Tabs>
