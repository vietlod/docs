---
title: GLS / FGLS — Bình phương nhỏ nhất tổng quát
sidebar_position: 3
description: Hồi quy GLS và FGLS (Feasible GLS) xử lý phương sai sai số thay đổi và tự tương quan qua ma trận hiệp phương sai, và cách chạy trong EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# GLS / FGLS — Bình phương nhỏ nhất tổng quát

**GLS (Generalized Least Squares)** tổng quát hóa [OLS](/ecolab/model/ols) để xử lý **phương sai sai số thay đổi** và/hoặc **tự tương quan** thông qua ma trận hiệp phương sai sai số $\Omega$. Khi $\Omega$ chưa biết và phải ước lượng từ dữ liệu, ta dùng **FGLS (Feasible GLS)**.

:::tip Khi nào dùng
Dùng GLS/FGLS khi sai số có **cấu trúc tương quan/phương sai phức tạp** (vd tự tương quan AR(1), nhóm). [WLS](/ecolab/model/wls) là trường hợp đặc biệt của GLS khi $\Omega$ chéo.
:::

---

## Đặc tả mô hình

GLS ước lượng:

$$
\hat{\beta}_{GLS} = (X' \Omega^{-1} X)^{-1} X' \Omega^{-1} Y
$$

trong đó $\Omega = \mathrm{Var}(\varepsilon \mid X)$ là ma trận hiệp phương sai sai số. Nếu $\Omega = \sigma^2 I$ thì GLS trùng OLS.

---

## GLS vs FGLS

| | GLS | FGLS |
| :--- | :--- | :--- |
| $\Omega$ | Biết trước | Ước lượng từ dữ liệu |
| Tính chất | Hiệu quả (nếu $\Omega$ đúng) | Tiệm cận hiệu quả (mẫu lớn) |
| Thực tế | Hiếm khi biết $\Omega$ | Phổ biến hơn |

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Hồi quy tuyến tính cổ điển* → **GLS** hoặc **FGLS**.
2. Chọn $Y$, các $X$, và cấu trúc hiệp phương sai (vd AR(1), nhóm).
3. Chạy và đọc thẻ **Ước lượng**, **Chẩn đoán**; xuất **mã tái lập**.

---

## Minh họa mã tái lập

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* === FGLS cho dữ liệu bảng ===
* Phương sai thay đổi theo nhóm + tự tương quan AR(1)
xtset id year
xtgls y x1 x2, panels(hetero) corr(ar1)

* FGLS đơn giản (Prais-Winsten cho chuỗi thời gian)
* prais y x1 x2, corc
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# === GLS trong R (gói nlme) ===
library(nlme)

# GLS với tự tương quan AR(1) và phương sai thay đổi
model_gls <- gls(y ~ x1 + x2,
                 correlation = corAR1(form = ~ 1 | id),
                 weights = varPower(),
                 data = df)
summary(model_gls)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
import numpy as np
import statsmodels.api as sm

# === GLS trong Python ===
X = sm.add_constant(df[['x1', 'x2']])
y = df['y']

# Xây dựng ma trận hiệp phương sai Omega (ví dụ ước lượng từ OLS residuals)
ols_resid = sm.OLS(y, X).fit().resid
sigma = np.diag(ols_resid ** 2)  # Ước lượng sơ bộ

model_gls = sm.GLS(y, X, sigma=sigma).fit()
print(model_gls.summary())
```

  </TabItem>
</Tabs>

---

## Hạn chế

- FGLS có thể **chệch ở mẫu nhỏ** nếu $\Omega$ ước lượng kém.
- Nếu chỉ cần suy diễn vững, OLS + sai số chuẩn **robust/clustered** thường đơn giản và an toàn hơn.

## Video minh họa

<VideoTutorial
  title="Hướng dẫn chạy GLS / FGLS trong EcoLab"
  src="https://www.youtube.com/user/vietlod"
/>

## Xem thêm

- [OLS](/ecolab/model/ols) · [WLS](/ecolab/model/wls) · [Danh mục mô hình](/ecolab/model/group)
