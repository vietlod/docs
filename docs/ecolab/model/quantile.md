---
title: Hồi quy phân vị (Quantile)
sidebar_position: 1
description: Hồi quy phân vị (Quantile Regression) ước lượng tác động tại các phân vị khác nhau của phân phối biến phụ thuộc, khác hồi quy trung bình OLS, và cách chạy trong EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Hồi quy phân vị (Quantile Regression)

**Hồi quy phân vị** ước lượng tác động của biến giải thích lên **các phân vị (quantile)** khác nhau của phân phối $Y$ — không chỉ trung bình như [OLS](/ecolab/model/ols). Nó cho thấy biến $X$ ảnh hưởng khác nhau ở nhóm "thấp", "trung vị" và "cao" (vd tác động lên người thu nhập thấp khác người thu nhập cao).

:::tip Khi nào dùng
Dùng Quantile Regression khi quan tâm **tác động không đồng nhất theo phân phối** (heterogeneous effects), hoặc khi phân phối $Y$ **lệch/nhiều outlier** khiến trung bình OLS kém đại diện. Hồi quy trung vị ($\tau=0.5$) **vững với outlier** hơn OLS.
:::

---

## Đặc tả mô hình

Phân vị $\tau \in (0,1)$ của $Y$ điều kiện theo $X$:

$$
Q_{\tau}(Y_i \mid X_i) = X_i \beta(\tau)
$$

Ước lượng bằng cách tối thiểu hóa **tổng sai số tuyệt đối có trọng số bất đối xứng** (check function $\rho_\tau$):

$$
\hat{\beta}(\tau) = \arg\min_{\beta} \sum_{i} \rho_{\tau}\big(Y_i - X_i\beta\big), \quad \rho_\tau(u) = u\,(\tau - \mathbb{1}[u<0])
$$

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Hồi quy phân vị* → **Quantile**.
2. Chọn $Y$, các $X$, và **danh sách phân vị** $\tau$ (vd 0.1, 0.25, 0.5, 0.75, 0.9).
3. Chạy, đọc hệ số $\beta(\tau)$ theo từng phân vị + đồ thị quantile process; **bootstrap SE**; xuất **mã tái lập**.

---

## Minh họa mã tái lập

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* === Hồi quy phân vị (Quantile Regression) ===

* --- Hồi quy tại từng phân vị ---
qreg lnwage educ exper, quantile(0.25)
qreg lnwage educ exper, quantile(0.5)
qreg lnwage educ exper, quantile(0.75)

* --- Ước lượng đồng thời nhiều phân vị (bootstrap SE) ---
sqreg lnwage educ exper, quantiles(0.25 0.5 0.75) reps(100)

* --- Kiểm định sự khác biệt hệ số giữa các phân vị ---
test [q25]educ = [q75]educ
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# === Hồi quy phân vị (Quantile Regression) ===
library(quantreg)

# --- Ước lượng tại nhiều phân vị ---
fit <- rq(lnwage ~ educ + exper, data = df,
          tau = c(0.25, 0.5, 0.75))

# --- Tóm tắt với bootstrap SE ---
summary(fit, se = "boot", R = 200)

# --- Đồ thị quantile process ---
plot(summary(rq(lnwage ~ educ + exper, data = df,
                tau = seq(0.05, 0.95, by = 0.05)),
             se = "boot"))
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# === Hồi quy phân vị (Quantile Regression) ===
import statsmodels.api as sm
import pandas as pd

X = sm.add_constant(df[["educ", "exper"]])
y = df["lnwage"]

# --- Ước lượng tại nhiều phân vị ---
taus = [0.25, 0.5, 0.75]
results = {}
for t in taus:
    mod = sm.QuantReg(y, X).fit(q=t)
    results[t] = mod
    print(f"\n--- Quantile {t} ---")
    print(mod.summary())

# --- So sánh hệ số giữa các phân vị ---
coef_df = pd.DataFrame({t: r.params for t, r in results.items()})
print(coef_df)
```

  </TabItem>
</Tabs>

---

## Hạn chế

- SE thường cần **bootstrap**; tốn tính toán hơn OLS.
- Diễn giải nhiều phân vị phức tạp hơn một hệ số trung bình.

## Video minh họa

<VideoTutorial
  title="Hướng dẫn chạy Hồi quy phân vị (Quantile Regression) trong EcoLab"
  src="https://www.youtube.com/user/vietlod"
/>

## Xem thêm

- [Panel Quantile (FE-QR)](/ecolab/model/panel-quantile) · [OLS](/ecolab/model/ols) · [Danh mục](/ecolab/model/group)
