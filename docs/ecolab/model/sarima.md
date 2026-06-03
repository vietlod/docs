---
title: SARIMA — ARIMA mùa vụ
sidebar_position: 2
description: Mô hình SARIMA (Seasonal ARIMA) mở rộng ARIMA cho chuỗi có yếu tố mùa vụ, ký hiệu (p,d,q)(P,D,Q)s, và cách chạy trong EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# SARIMA — Seasonal ARIMA

**SARIMA** mở rộng [ARIMA](/ecolab/model/arima) để xử lý **yếu tố mùa vụ (seasonality)** — mẫu hình lặp lại theo chu kỳ cố định (tháng, quý). SARIMA thêm các thành phần AR/MA/sai phân **theo mùa** bên cạnh thành phần thường.

:::tip Khi nào dùng
Dùng SARIMA khi chuỗi có **chu kỳ mùa vụ rõ** (vd doanh số bán lẻ theo tháng, du lịch theo quý). ACF có đỉnh tại các độ trễ mùa vụ là dấu hiệu cần SARIMA.
:::

---

## Ký hiệu mô hình

$$
\text{SARIMA}(p,d,q)(P,D,Q)_s
$$

- $(p,d,q)$: phần **không mùa vụ** (như ARIMA).
- $(P,D,Q)$: phần **mùa vụ** với chu kỳ $s$ (vd $s=12$ cho dữ liệu tháng, $s=4$ cho quý).

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Chuỗi thời gian đơn biến* → **SARIMA**.
2. Chọn $Y$; khai báo $(p,d,q)(P,D,Q)_s$ và chu kỳ mùa $s$ (hoặc auto).
3. Chạy; xem dự báo có tính mùa vụ + chẩn đoán; xuất **mã tái lập**.

---

## Minh họa mã tái lập

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* === SARIMA — Seasonal ARIMA ===

* --- Khai báo chuỗi thời gian (dữ liệu tháng) ---
tsset month, monthly

* --- Ước lượng SARIMA(1,1,1)(1,1,1)_12 ---
arima y, arima(1,1,1) sarima(1,1,1,12)

* --- Chẩn đoán phần dư ---
predict resid, residuals
corrgram resid, lags(24)
wntestq resid, lags(24)

* --- Dự báo 12 tháng ---
tsappend, add(12)
predict y_hat, dynamic(.)
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# === SARIMA — Seasonal ARIMA ===
library(forecast)

# --- Tạo chuỗi thời gian (dữ liệu tháng) ---
ts_data <- ts(y, frequency = 12, start = c(2010, 1))

# --- Tự động chọn bậc SARIMA ---
fit <- auto.arima(ts_data, seasonal = TRUE)
summary(fit)

# --- Hoặc chỉ định thủ công ---
fit2 <- Arima(ts_data, order = c(1, 1, 1),
              seasonal = c(1, 1, 1))

# --- Chẩn đoán ---
checkresiduals(fit)

# --- Dự báo 12 tháng ---
fc <- forecast(fit, h = 12)
plot(fc)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# === SARIMA — Seasonal ARIMA ===
from statsmodels.tsa.statespace.sarimax import SARIMAX
import matplotlib.pyplot as plt

# --- Ước lượng SARIMA(1,1,1)(1,1,1)_12 ---
model = SARIMAX(y,
                order=(1, 1, 1),
                seasonal_order=(1, 1, 1, 12),
                enforce_stationarity=False,
                enforce_invertibility=False)
results = model.fit(disp=False)
print(results.summary())

# --- Chẩn đoán phần dư ---
results.plot_diagnostics(figsize=(10, 8))
plt.tight_layout()
plt.show()

# --- Dự báo 12 tháng ---
forecast = results.get_forecast(steps=12)
print(forecast.summary_frame())
```

  </TabItem>
</Tabs>

---

## Hạn chế

- Nhiều tham số ⇒ cần chuỗi đủ dài qua nhiều chu kỳ mùa.
- Giả định mẫu mùa vụ **ổn định** theo thời gian.

## Video minh họa

<VideoTutorial
  title="Hướng dẫn chạy SARIMA trong EcoLab"
  src="https://www.youtube.com/user/vietlod"
/>

## Xem thêm

- [ARIMA](/ecolab/model/arima) · [GARCH](/ecolab/model/garch) · [Danh mục](/ecolab/model/group)
