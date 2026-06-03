---
title: Panel Quantile (FE-QR)
sidebar_position: 2
description: Hồi quy phân vị cho dữ liệu bảng có hiệu ứng cố định (FE-QR), kết hợp quantile regression với panel, và cách chạy trong EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Panel Quantile Regression (FE-QR)

**Panel Quantile (FE-QR)** mở rộng [hồi quy phân vị](/ecolab/model/quantile) cho **dữ liệu bảng** có **hiệu ứng cố định** theo đơn vị. Nó ước lượng tác động ở các phân vị khác nhau **đồng thời kiểm soát đặc điểm không quan sát được** của từng đơn vị — kết hợp ưu điểm của [FE](/ecolab/model/fem-rem) và quantile regression.

:::tip Khi nào dùng
Dùng khi có **dữ liệu bảng** và muốn xem **tác động không đồng nhất theo phân vị** trong khi vẫn khử hiệu ứng cá thể (vd tác động chính sách lên doanh nghiệp ở các mức năng suất khác nhau).
:::

---

## Đặc tả mô hình

$$
Q_{\tau}(Y_{it} \mid X_{it}, \alpha_i) = X_{it} \beta(\tau) + \alpha_i
$$

với $\alpha_i$ là hiệu ứng cố định đơn vị. Các phương pháp phổ biến: Koenker (penalized FE-QR), Canay (two-step), Machado–Santos Silva (MM-QR).

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Hồi quy phân vị* → **Panel Quantile**.
2. Khai báo **entity/time**, $Y$, $X$, và danh sách phân vị $\tau$.
3. Chạy, đọc $\beta(\tau)$ theo phân vị; bootstrap SE; xuất **mã tái lập**.

---

## Minh họa mã tái lập

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* === Panel Quantile Regression (FE-QR) ===
* Cài đặt community package (chạy một lần)
* ssc install xtqreg

* --- Khai báo dữ liệu bảng ---
xtset id year

* --- Hồi quy phân vị panel tại trung vị ---
xtqreg y x1 x2, i(id) quantile(0.5)

* --- Ước lượng tại nhiều phân vị ---
xtqreg y x1 x2, i(id) quantile(0.25)
xtqreg y x1 x2, i(id) quantile(0.75)
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# === Panel Quantile Regression (FE-QR) ===
# Phương pháp Canay (2011) two-step

library(quantreg)
library(plm)

# --- Bước 1: Ước lượng FE trung bình để lấy alpha_i ---
fe_model <- plm(y ~ x1 + x2, data = pdata,
                model = "within", index = c("id", "year"))
pdata$alpha_i <- fixef(fe_model)[as.character(pdata$id)]

# --- Bước 2: Trừ hiệu ứng cố định ---
pdata$y_tilde <- pdata$y - pdata$alpha_i

# --- Bước 3: Hồi quy phân vị trên dữ liệu đã khử FE ---
fit <- rq(y_tilde ~ x1 + x2, data = pdata, tau = 0.5)
summary(fit, se = "boot", R = 200)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# === Panel Quantile Regression (FE-QR) ===
# Phương pháp Canay (2011) two-step
import statsmodels.api as sm
import pandas as pd
import numpy as np

# --- Bước 1: Ước lượng FE trung bình (demeaning) ---
group_means = df.groupby("id")[["y", "x1", "x2"]].transform("mean")
alpha_i = df.groupby("id")["y"].transform("mean") - (
    sm.OLS(df["y"] - group_means["y"],
           sm.add_constant(df[["x1", "x2"]] - group_means[["x1", "x2"]]))
    .fit().predict(sm.add_constant(df[["x1", "x2"]] - group_means[["x1", "x2"]]))
)

# --- Bước 2: Trừ hiệu ứng cố định ---
y_tilde = df["y"] - df.groupby("id")["y"].transform("mean")
X = sm.add_constant(df[["x1", "x2"]] - group_means[["x1", "x2"]])

# --- Bước 3: Hồi quy phân vị ---
mod = sm.QuantReg(y_tilde, X).fit(q=0.5)
print(mod.summary())
```

  </TabItem>
</Tabs>

---

## Hạn chế

- Ước lượng FE-QR **không duy nhất** (nhiều cách tiếp cận, kết quả có thể khác).
- Cần $T$ đủ lớn cho một số phương pháp; tính toán nặng.

## Video minh họa

<VideoTutorial
  title="Hướng dẫn chạy Panel Quantile (FE-QR) trong EcoLab"
  src="https://www.youtube.com/embed/m3wyHeBOfUE"
/>

## Xem thêm

- [Hồi quy phân vị](/ecolab/model/quantile) · [FEM/REM](/ecolab/model/fem-rem) · [Danh mục](/ecolab/model/group)

