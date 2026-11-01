---
title: Biên hiệu quả (SFA, DEA, Malmquist) & năng suất cấu trúc TFP (OP, LP, ACF)
sidebar_position: 14
description: Hướng dẫn ước lượng biên ngẫu nhiên SFA, bao dữ liệu DEA, chỉ số Malmquist và năng suất nhân tố tổng hợp cấu trúc Olley-Pakes, Levinsohn-Petrin, Wooldridge và Ackerberg-Caves-Frazer (ACF) TFP trên EcoData và EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Biên hiệu quả (SFA, DEA, Malmquist) & năng suất cấu trúc TFP (OP, LP, ACF)

**Họ mô hình 14 (Biên hiệu quả, năng suất & TFP)** cung cấp trọn bộ công cụ đo lường hiệu quả kỹ thuật, hiệu quả chi phí và năng suất nhân tố tổng hợp (**Total Factor Productivity — TFP**) cho doanh nghiệp sản xuất, ngân hàng thương mại, bệnh viện và địa phương.

Trong EcoLab, nhóm mô hình này nằm tại **Mô hình hóa → 14. Biên hiệu quả & TFP**. Xem thêm [Danh mục 15 họ mô hình](/ecolab/model/group).

---

## Khi nào nên dùng họ mô hình 14?

- **Stochastic Frontier Analysis (SFA — Aigner-Lovell-Schmidt, Battese-Coelli):** Khi muốn tách bạch nhiễu ngẫu nhiên đối xứng $v_{it}$ khỏi thành phần phi hiệu quả kỹ thuật một phía $u_{it} \ge 0$ dưới dạng hàm sản xuất hoặc hàm chi phí Cobb-Douglas / Translog.
- **Data Envelopment Analysis (DEA — CCR, BCC) & Chỉ số Malmquist:** Khi cần đo lường hiệu quả phi tham số đa đầu vào – đa đầu ra mà không áp đặt dạng hàm sản xuất, đồng thời phân rã thay đổi năng suất theo thời gian thành dịch chuyển công nghệ và bắt kịp hiệu quả.
- **Hàm sản xuất cấu trúc (Olley-Pakes, Levinsohn-Petrin, Wooldridge, Ackerberg-Caves-Frazer ACF TFP):** Khi ước lượng hàm sản xuất cấp doanh nghiệp (ví dụ từ BCTC niêm yết hoặc điều tra doanh nghiệp VES) mà quyết định thuê lao động và mua nguyên vật liệu của doanh nghiệp phụ thuộc vào cú sốc năng suất $\omega_{it}$ không quan sát được (thiên lệch đồng thời của Marschak-Andrews).

---

## Đặc tả toán học cốt lõi

### 1. Mô hình biên ngẫu nhiên dữ liệu bảng (Battese & Coelli, 1995)

$$
\ln Y_{it} = \beta_0 + \sum_{k=1}^{K} \beta_k \ln X_{kit} + v_{it} - u_{it}, \qquad v_{it} \sim \mathcal{N}(0, \sigma_v^2), \quad u_{it} \sim \mathcal{N}^+(z_{it}\delta, \sigma_u^2)
$$

Hiệu quả kỹ thuật của đơn vị $i$ tại kỳ $t$ được tính bởi $\text{TE}_{it} = \mathbb{E}[\exp(-u_{it}) \mid \varepsilon_{it}] \in (0, 1]$.

### 2. Ước lượng hàm sản xuất cấu trúc ACF TFP (Ackerberg, Caves & Frazer, 2015)

Hàm giá trị gia tăng logarit với lao động $l_{it}$, vốn $k_{it}$ và năng suất chuỗi Markov bậc nhất $\omega_{it} = g(\omega_{it-1}) + \xi_{it}$:

$$
y_{it} = \beta_l l_{it} + \beta_k k_{it} + \omega_{it} + \eta_{it}
$$

Sử dụng hàm cầu đầu vào trung gian đơn điệu $m_{it} = f_t(k_{it}, l_{it}, \omega_{it})$, bước 1 khử nhiễu đo lường $\eta_{it}$ để thu được $\hat{\Phi}_{it}$, và bước 2 định danh đồng thời $(\beta_l, \beta_k)$ từ điều kiện mô-men trực giao trên đổi mới năng suất $\mathbb{E}[\xi_{it}(\beta_l, \beta_k) \otimes \mathbf{Z}_{it}] = 0$.

---

## Giả định và kiểm định hậu ước lượng

1. **Kiểm định sự tồn tại của phi hiệu quả biên (SFA):** Kiểm định tỷ số hợp lý suy rộng (Generalized Likelihood-Ratio test) cho giả thuyết $H_0: \sigma_u^2 = 0$ (phân phối hỗn hợp $\bar{\chi}^2$ của Kodde-Palm) và hệ số tỷ trọng phương sai $\gamma = \sigma_u^2 / (\sigma_v^2 + \sigma_u^2)$.
2. **Hiệu suất theo quy mô & độ tin cậy biên DEA:** So sánh điểm hiệu quả CRS (CCR) và VRS (BCC) để tính hiệu quả quy mô (Scale Efficiency), kết hợp bootstrap Simar-Wilson hiệu chỉnh chệch biên.
3. **Tính đơn điệu proxy & kiểm định Hansen GMM (OP/LP/Wooldridge/ACF):** Đảm bảo biến đầu tư $i_{it} > 0$ (OP) hoặc chi phí trung gian $m_{it} > 0$ (LP/ACF) đồng biến theo năng suất, kiểm định hiệu suất theo quy mô $\beta_l + \beta_k = 1$ và kiểm định quá định danh Hansen $J$.

---

## Minh họa mã tái lập 3 ngôn ngữ

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata 18 MP" default>

```stata
* === 1. Biên ngẫu nhiên dữ liệu bảng (Battese-Coelli SFA) ===
xtset firm_id year
xtfrontier ln_output ln_capital ln_labor, tvd
predict te_sfa, te

* === 2. Năng suất nhân tố tổng hợp cấu trúc ACF (prodest) ===
prodest ln_va, free(ln_labor) state(ln_capital) proxy(ln_materials) ///
    va acf id(firm_id) t(year) reps(50)
predict tfp_acf, resid
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# === 1. Stochastic Frontier Analysis (frontier) ===
library(frontier)
sfa_fit <- sfa(ln_output ~ ln_capital + ln_labor | export_dummy + firm_age, data = df)
summary(sfa_fit)
df$te_score <- efficiencies(sfa_fit)

# === 2. Structural Production Function & DEA (prodest / Benchmarking) ===
library(prodest)
acf_fit <- prodestACF(Y = df$ln_va, fX = df$ln_labor, sX = df$ln_capital,
                      pX = df$ln_materials, idvar = df$firm_id, timevar = df$year)
summary(acf_fit)
df$tfp_acf <- omega(acf_fit)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# === Structural Two-Step Control-Function ACF GMM & DEA LP ===
import numpy as np
import statsmodels.api as sm
from scipy.optimize import minimize

# Bước 1: Xấp xỉ đa thức bậc 3 khử nhiễu đo lường trên (k, l, m)
poly_terms = np.column_stack([
    df["ln_k"], df["ln_l"], df["ln_m"],
    df["ln_k"] ** 2, df["ln_l"] ** 2, df["ln_m"] ** 2,
    df["ln_k"] * df["ln_m"], df["ln_l"] * df["ln_m"],
])
phi_hat = sm.OLS(df["ln_va"], sm.add_constant(poly_terms)).fit().fittedvalues

# Bước 2: Điều kiện mô-men GMM trên đổi mới năng suất Markov xi_it
def acf_gmm_loss(beta):
    b_l, b_k = beta
    omega = phi_hat - b_l * df["ln_l"].to_numpy() - b_k * df["ln_k"].to_numpy()
    # Trực giao xi_it với biến trễ l_{t-1} và k_t hiện tại
    omega_lag = df.assign(om=omega).groupby("firm_id")["om"].shift(1)
    valid = omega_lag.notna()
    xi = sm.OLS(omega[valid], sm.add_constant(omega_lag[valid])).fit().resid
    Z = np.column_stack([df.loc[valid, "ln_k"], df.groupby("firm_id")["ln_l"].shift(1)[valid]])
    moments = (Z.T @ xi) / valid.sum()
    return float(moments @ moments)

opt = minimize(acf_gmm_loss, x0=[0.6, 0.35], method="BFGS")
print("ACF structural elasticities (beta_l, beta_k):", opt.x)
```

  </TabItem>
</Tabs>
