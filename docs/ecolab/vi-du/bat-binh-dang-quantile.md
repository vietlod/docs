---
title: 'Bất bình đẳng tiền lương (Quantile)'
sidebar_position: 6
description: Thực hành hồi quy phân vị trên EcoLab — lợi suất giáo dục khác nhau ở các phân vị tiền lương (tác động không đồng nhất theo phân phối).
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Bất bình đẳng tiền lương theo phân vị (Quantile)

Minh họa [hồi quy phân vị](/ecolab/model/quantile): lợi suất giáo dục **không đồng nhất** giữa nhóm lương thấp và lương cao — điều mà [OLS](/ecolab/model/ols) (chỉ trung bình) không cho thấy. Số liệu là **minh họa**.

> Tóm tắt: ước lượng $\beta(\tau)$ của `educ` tại các phân vị $\tau$ = 0.1, 0.25, 0.5, 0.75, 0.9 để xem giáo dục tác động khác nhau ra sao dọc phân phối lương.

---

## Bước 1 — Ý tưởng
- **Câu hỏi:** lợi suất giáo dục ở nhóm lương cao có khác nhóm lương thấp không (hiệu ứng "trần kính"/"sàn")?

## Bước 2 — Tổng quan tài liệu
Tài liệu bất bình đẳng tiền lương, hiệu ứng phân vị của giáo dục.

## Bước 3 — Thu thập dữ liệu
Dữ liệu vi mô lao động (`lnwage`, `educ`, `exper`, kiểm soát) — như [ví dụ Mincer](/ecolab/vi-du/luong-giao-duc-ols).

## Bước 4 — Mô hình hóa

Chọn họ *Hồi quy phân vị* → **Quantile**, danh sách $\tau$:

$$
Q_{\tau}(\ln wage_i \mid X_i) = \beta_0(\tau) + \beta_1(\tau)\,educ_i + \dots
$$

**Kết quả minh họa — hệ số `educ` theo phân vị (không phải kết quả thực):**

| Phân vị $\tau$ | $\hat{\beta}_1(\tau)$ (educ) |
| :--- | :--- |
| 0.10 | 0.061 |
| 0.50 | 0.080 |
| 0.90 | 0.103 |

Diễn giải mẫu: lợi suất giáo dục **tăng dần theo phân vị** (0.061 → 0.103) ⇒ giáo dục làm **giãn** bất bình đẳng lương (tác động lớn hơn ở nhóm lương cao). OLS chỉ cho một con số trung bình (~0.08), che giấu sự khác biệt này.

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* === Bất bình đẳng tiền lương — Hồi quy phân vị ===

* --- Ước lượng đồng thời 5 phân vị (bootstrap SE) ---
sqreg lnwage educ exper female, ///
    quantiles(0.10 0.25 0.50 0.75 0.90) reps(200)

* --- Kiểm định sự khác biệt hệ số educ giữa τ=0.1 và τ=0.9 ---
test [q10]educ = [q90]educ
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# === Bất bình đẳng tiền lương — Hồi quy phân vị ===
library(quantreg)

# --- Ước lượng tại 5 phân vị ---
fit <- rq(lnwage ~ educ + exper + female, data = df,
          tau = c(0.10, 0.25, 0.50, 0.75, 0.90))
summary(fit, se = "boot", R = 200)

# --- Đồ thị quantile process ---
plot(summary(rq(lnwage ~ educ + exper + female, data = df,
                tau = seq(0.05, 0.95, by = 0.05)),
             se = "boot"),
     parm = "educ")
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# === Bất bình đẳng tiền lương — Hồi quy phân vị ===
import statsmodels.api as sm
import pandas as pd
import matplotlib.pyplot as plt

X = sm.add_constant(df[["educ", "exper", "female"]])
y = df["lnwage"]

# --- Ước lượng tại 5 phân vị ---
taus = [0.10, 0.25, 0.50, 0.75, 0.90]
results = {}
for t in taus:
    results[t] = sm.QuantReg(y, X).fit(q=t)

# --- Bảng hệ số educ theo phân vị ---
coef_educ = pd.Series({t: r.params["educ"] for t, r in results.items()})
print(coef_educ)

# --- Đồ thị quantile process cho educ ---
plt.plot(coef_educ.index, coef_educ.values, marker="o")
plt.xlabel("Quantile (τ)")
plt.ylabel("β(τ) — educ")
plt.title("Quantile Process: Lợi suất giáo dục")
plt.grid(True)
plt.show()
```

  </TabItem>
</Tabs>

## Bước 5 — Báo cáo
Xuất báo cáo + đồ thị **quantile process** + **mã tái lập**; SE bằng bootstrap.

## Video minh họa

<VideoTutorial
  title="Hướng dẫn chạy Hồi quy phân vị (Quantile) trong EcoLab"
  src="https://www.youtube.com/embed/m3wyHeBOfUE"
/>

## Xem thêm
- [Hồi quy phân vị](/ecolab/model/quantile) · [Panel FE-QR](/ecolab/model/panel-quantile) · [Ví dụ Mincer (OLS)](/ecolab/vi-du/luong-giao-duc-ols)

