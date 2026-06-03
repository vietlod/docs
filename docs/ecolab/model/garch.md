---
title: ARCH / GARCH — Mô hình độ biến động
sidebar_position: 3
description: Mô hình ARCH/GARCH mô hình hóa phương sai có điều kiện thay đổi theo thời gian (volatility clustering) cho chuỗi tài chính, và cách chạy trong EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# ARCH / GARCH — Mô hình độ biến động

**ARCH/GARCH** mô hình hóa **phương sai có điều kiện thay đổi theo thời gian** — hiện tượng **volatility clustering** (giai đoạn biến động mạnh nối tiếp biến động mạnh) rất phổ biến ở **chuỗi tài chính** (lợi suất cổ phiếu, tỷ giá). Thay vì giả định phương sai sai số không đổi, chúng cho phép phương sai phụ thuộc quá khứ.

:::tip Khi nào dùng
Dùng khi chuỗi (thường là **lợi suất**) có **biến động theo cụm** và muốn mô hình hóa/dự báo **rủi ro (volatility)**. Thường kết hợp: trung bình theo [ARIMA](/ecolab/model/arima) + phương sai theo GARCH.
:::

---

## Đặc tả mô hình

GARCH(1,1) cho phương sai có điều kiện $\sigma_t^2$:

$$
\sigma_t^2 = \omega + \alpha \, \varepsilon_{t-1}^2 + \beta \, \sigma_{t-1}^2
$$

- $\alpha$ (ARCH): phản ứng với cú sốc gần nhất; $\beta$ (GARCH): tính dai dẳng của biến động.
- **ARCH(q)** là trường hợp $\beta = 0$. Điều kiện dừng: $\alpha + \beta < 1$.

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Chuỗi thời gian đơn biến* → **ARCH/GARCH**.
2. Chọn chuỗi (lợi suất); khai báo bậc $(p,q)$ và phương trình trung bình (vd ARMA).
3. Chạy; xem $\hat{\sigma}_t$ ước lượng + dự báo biến động; xuất **mã tái lập**.

---

## Minh họa mã tái lập

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* === ARCH / GARCH — Mô hình độ biến động ===

* --- Ước lượng GARCH(1,1) cho lợi suất ---
arch ret, arch(1) garch(1)

* --- Dự báo phương sai có điều kiện ---
predict sigma2, variance
gen sigma = sqrt(sigma2)

* --- Kiểm định hiệu ứng ARCH (LM test) ---
reg ret
predict resid, residuals
gen resid2 = resid^2
reg resid2 L.resid2
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# === ARCH / GARCH — Mô hình độ biến động ===
library(rugarch)

# --- Định nghĩa đặc tả GARCH(1,1) ---
spec <- ugarchspec(
  variance.model = list(model = "sGARCH", garchOrder = c(1, 1)),
  mean.model     = list(armaOrder = c(0, 0), include.mean = TRUE),
  distribution.model = "norm"
)

# --- Ước lượng ---
fit <- ugarchfit(spec = spec, data = ret)
show(fit)

# --- Phương sai có điều kiện ---
sigma_t <- sigma(fit)
plot(sigma_t, type = "l", main = "Conditional Volatility")

# --- Dự báo 10 kỳ ---
fc <- ugarchforecast(fit, n.ahead = 10)
plot(fc, which = 1)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# === ARCH / GARCH — Mô hình độ biến động ===
from arch import arch_model
import matplotlib.pyplot as plt

# --- Ước lượng GARCH(1,1) ---
am = arch_model(ret, vol="Garch", p=1, q=1, mean="Constant")
res = am.fit(disp="off")
print(res.summary())

# --- Phương sai có điều kiện ---
fig, ax = plt.subplots()
ax.plot(res.conditional_volatility, label="Conditional Volatility")
ax.set_title("GARCH(1,1) — Conditional Volatility")
ax.legend()
plt.show()

# --- Dự báo 10 kỳ ---
forecasts = res.forecast(horizon=10)
print(forecasts.variance.iloc[-1])
```

  </TabItem>
</Tabs>

---

## Hạn chế

- GARCH chuẩn **đối xứng** (tin tốt/xấu tác động như nhau) ⇒ dùng [EGARCH](/ecolab/model/egarch) cho hiệu ứng đòn bẩy.
- Nhạy với phân phối sai số (chuẩn vs t-Student).

## Video minh họa

<VideoTutorial
  title="Hướng dẫn chạy GARCH trong EcoLab"
  src="https://www.youtube.com/embed/m3wyHeBOfUE"
/>

## Xem thêm

- [EGARCH](/ecolab/model/egarch) · [ARIMA](/ecolab/model/arima) · [Danh mục](/ecolab/model/group)

