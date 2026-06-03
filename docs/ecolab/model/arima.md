---
title: AR / MA / ARMA / ARIMA
sidebar_position: 1
description: Họ mô hình Box-Jenkins (AR, MA, ARMA, ARIMA) cho chuỗi thời gian đơn biến, bậc tích hợp, quy trình nhận dạng và dự báo, cách chạy trong EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# AR / MA / ARMA / ARIMA — Họ Box-Jenkins

Đây là họ mô hình **chuỗi thời gian đơn biến** kinh điển để mô tả và **dự báo** một chuỗi dựa trên chính quá khứ của nó:

- **AR(p)** — Autoregressive: $Y_t$ phụ thuộc các giá trị trễ của chính nó.
- **MA(q)** — Moving Average: $Y_t$ phụ thuộc các sai số (cú sốc) trễ.
- **ARMA(p,q)** — kết hợp AR và MA cho chuỗi **dừng**.
- **ARIMA(p,d,q)** — thêm **sai phân bậc $d$** để xử lý chuỗi **không dừng**.

:::tip Khi nào dùng
Dùng cho **dự báo một chuỗi** (doanh thu, lạm phát, giá). Kiểm tra **tính dừng** trước (ADF/KPSS); nếu không dừng, lấy sai phân (bậc $d$) ⇒ ARIMA. Có mùa vụ ⇒ [SARIMA](/ecolab/model/sarima); có biến động cụm ⇒ [GARCH](/ecolab/model/garch).
:::

---

## Đặc tả mô hình

ARMA(p,q):

$$
Y_t = c + \sum_{i=1}^{p} \phi_i Y_{t-i} + \varepsilon_t + \sum_{j=1}^{q} \theta_j \varepsilon_{t-j}
$$

ARIMA(p,d,q): áp dụng ARMA(p,q) cho chuỗi đã sai phân $d$ lần $\Delta^d Y_t$.

---

## Quy trình Box-Jenkins

```mermaid
flowchart LR
    A["Kiểm tra dừng (ADF/KPSS)"] --> B["Sai phân nếu cần (chọn d)"]
    B --> C["Nhận dạng p,q (ACF/PACF, AIC/BIC)"]
    C --> D["Ước lượng (MLE)"]
    D --> E["Chẩn đoán phần dư (Ljung-Box)"]
    E --> F["Dự báo"]
```

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Chuỗi thời gian đơn biến* → **ARIMA**.
2. Chọn chuỗi $Y$; khai báo $(p,d,q)$ hoặc dùng auto-ARIMA (AIC/BIC).
3. Chạy; xem chẩn đoán phần dư + **dự báo** kèm khoảng tin cậy; xuất **mã tái lập**.

---

## Minh họa mã tái lập

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* === ARIMA — Họ Box-Jenkins ===

* --- Kiểm định tính dừng ---
dfuller gdp_growth, lags(4) regress
kpss gdp_growth

* --- Ước lượng ARIMA(1,1,1) ---
arima gdp_growth, arima(1,1,1)

* --- Hoặc: sai phân thủ công + ARMA ---
gen d_gdp = D.gdp_growth
arima d_gdp, ar(1) ma(1)

* --- Chẩn đoán phần dư ---
predict resid, residuals
corrgram resid, lags(20)
wntestq resid, lags(12)

* --- Dự báo ---
tsappend, add(12)
predict gdp_hat, dynamic(.)
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# === ARIMA — Họ Box-Jenkins ===
library(forecast)
library(tseries)

# --- Kiểm định tính dừng ---
adf.test(ts_data)

# --- Tự động chọn bậc ARIMA (AIC) ---
fit <- auto.arima(ts_data)
summary(fit)

# --- Chẩn đoán phần dư ---
checkresiduals(fit)

# --- Dự báo 12 kỳ ---
fc <- forecast(fit, h = 12)
plot(fc)
print(fc)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# === ARIMA — Họ Box-Jenkins ===
from statsmodels.tsa.arima.model import ARIMA
from statsmodels.tsa.stattools import adfuller
from statsmodels.stats.diagnostic import acorr_ljungbox
import matplotlib.pyplot as plt

# --- Kiểm định tính dừng ---
result = adfuller(y)
print(f"ADF Statistic: {result[0]:.4f}, p-value: {result[1]:.4f}")

# --- Ước lượng ARIMA(1,1,1) ---
model = ARIMA(y, order=(1, 1, 1)).fit()
print(model.summary())

# --- Chẩn đoán phần dư ---
lb_test = acorr_ljungbox(model.resid, lags=12)
print(lb_test)

# --- Dự báo 12 kỳ ---
forecast = model.forecast(steps=12)
print(forecast)
```

  </TabItem>
</Tabs>

---

## Hạn chế

- Giả định quan hệ **tuyến tính** và cấu trúc ổn định; kém khi có gãy cấu trúc.
- Không mô hình hóa **phương sai thay đổi theo thời gian** ⇒ dùng ARCH/GARCH.

## Video minh họa

<VideoTutorial
  title="Hướng dẫn chạy ARIMA trong EcoLab"
  src="https://www.youtube.com/user/vietlod"
/>

## Xem thêm

- [SARIMA](/ecolab/model/sarima) · [GARCH](/ecolab/model/garch) · [ARDL](/ecolab/model/ardl) · [Danh mục](/ecolab/model/group)
