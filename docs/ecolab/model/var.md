---
title: VAR — Vector Autoregression
sidebar_position: 1
description: Mô hình VAR (Vector Autoregression) cho hệ nhiều chuỗi thời gian dừng, phản ứng đẩy (IRF), phân rã phương sai, Granger, và cách chạy trong EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# VAR — Vector Autoregression

**VAR** mô hình hóa **hệ nhiều chuỗi thời gian** trong đó mỗi biến phụ thuộc vào **độ trễ của chính nó và của các biến khác** — không áp đặt quan hệ nhân quả tiên nghiệm. VAR là công cụ chuẩn để phân tích **động học hệ thống**: phản ứng đẩy (IRF), phân rã phương sai (FEVD), kiểm định nhân quả Granger.

:::tip Khi nào dùng
Dùng VAR khi các chuỗi **đều dừng I(0)** (hoặc đã sai phân). Nếu các chuỗi I(1) **đồng liên kết** ⇒ dùng [VECM](/ecolab/model/vecm); nếu I(1) không đồng liên kết ⇒ VAR ở sai phân.
:::

---

## Đặc tả mô hình

$$
Y_t = c + A_1 Y_{t-1} + A_2 Y_{t-2} + \dots + A_p Y_{t-p} + \varepsilon_t
$$

với $Y_t$ là vector biến, $A_i$ là ma trận hệ số. Chọn độ trễ $p$ bằng AIC/BIC/HQ.

---

## Phân tích sau ước lượng

- **IRF**: phản ứng của hệ trước một cú sốc.
- **FEVD**: phân rã phương sai dự báo theo nguồn cú sốc.
- **Granger causality**: biến nào giúp dự báo biến nào.

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Chuỗi thời gian đa biến* → **VAR**.
2. Chọn tập biến (cùng tần suất, đã kiểm tra dừng), độ trễ.
3. Chạy; xem IRF/FEVD/Granger; xuất **mã tái lập**.

---

## Minh họa mã tái lập

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* === VAR — Vector Autoregression ===

* --- Khai báo chuỗi thời gian ---
tsset quarter

* --- Ước lượng VAR(2) ---
var rate inflation output, lags(1/2)

* --- Kiểm định nhân quả Granger ---
vargranger

* --- Phản ứng đẩy (IRF) ---
irf create myirf, set(myirf) step(20)
irf graph oirf, impulse(rate) response(inflation output)

* --- Phân rã phương sai ---
irf graph fevd
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# === VAR — Vector Autoregression ===
library(vars)

# --- Chọn độ trễ tối ưu ---
VARselect(data, lag.max = 8, type = "const")

# --- Ước lượng VAR(2) ---
var_model <- VAR(data, p = 2, type = "const")
summary(var_model)

# --- Kiểm định nhân quả Granger ---
causality(var_model, cause = "inflation")

# --- Phản ứng đẩy (IRF) ---
irf_result <- irf(var_model, impulse = "rate",
                  response = c("inflation", "output"),
                  n.ahead = 20, boot = TRUE)
plot(irf_result)

# --- Phân rã phương sai ---
fevd_result <- fevd(var_model, n.ahead = 20)
plot(fevd_result)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# === VAR — Vector Autoregression ===
from statsmodels.tsa.api import VAR

# --- Chọn độ trễ tối ưu ---
model = VAR(data)
print(model.select_order(maxlags=8).summary())

# --- Ước lượng VAR(2) ---
results = model.fit(2)
print(results.summary())

# --- Kiểm định nhân quả Granger ---
granger = results.test_causality("inflation", causing="rate")
print(granger.summary())

# --- Phản ứng đẩy (IRF) ---
irf = results.irf(10)
irf.plot(orth=True)

# --- Phân rã phương sai ---
fevd = results.fevd(10)
fevd.plot()
```

  </TabItem>
</Tabs>

---

## Hạn chế

- Nhiều tham số (nhanh chóng bùng nổ theo số biến × độ trễ).
- IRF cấu trúc cần giả định nhận dạng ⇒ xem [SVAR](/ecolab/model/svar).

## Video minh họa

<VideoTutorial
  title="Hướng dẫn chạy VAR trong EcoLab"
  src="https://www.youtube.com/user/vietlod"
/>

## Xem thêm

- [VECM](/ecolab/model/vecm) · [SVAR](/ecolab/model/svar) · [Danh mục](/ecolab/model/group)
