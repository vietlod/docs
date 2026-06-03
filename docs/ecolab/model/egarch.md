---
title: EGARCH — GARCH bất đối xứng
sidebar_position: 4
description: Mô hình EGARCH (Exponential GARCH) nắm bắt hiệu ứng đòn bẩy (tin xấu tác động mạnh hơn tin tốt) trong biến động tài chính, và cách chạy trong EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# EGARCH — Exponential GARCH

**EGARCH (Exponential GARCH)** mở rộng [GARCH](/ecolab/model/garch) để nắm bắt **hiệu ứng bất đối xứng / đòn bẩy (leverage effect)** — trên thị trường tài chính, **tin xấu (cú sốc âm)** thường làm tăng biến động **mạnh hơn** tin tốt cùng độ lớn. GARCH chuẩn không phân biệt được dấu cú sốc; EGARCH thì có.

:::tip Khi nào dùng
Dùng EGARCH khi nghi ngờ **biến động phản ứng bất đối xứng** với cú sốc dương/âm (rất phổ biến ở lợi suất cổ phiếu). Mô hình hóa **log phương sai** nên không cần ràng buộc dương.
:::

---

## Đặc tả mô hình

$$
\ln(\sigma_t^2) = \omega + \alpha \left( |z_{t-1}| - E|z_{t-1}| \right) + \gamma \, z_{t-1} + \beta \ln(\sigma_{t-1}^2)
$$

với $z_{t-1} = \varepsilon_{t-1}/\sigma_{t-1}$. Tham số **$\gamma \ne 0$** đo **hiệu ứng đòn bẩy**: $\gamma < 0$ ⇒ cú sốc âm làm tăng biến động nhiều hơn.

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Chuỗi thời gian đơn biến* → **EGARCH**.
2. Chọn chuỗi lợi suất; khai báo bậc và phương trình trung bình.
3. Chạy; kiểm tra dấu/ý nghĩa của $\gamma$ (đòn bẩy); xuất **mã tái lập**.

---

## Minh họa mã tái lập

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* === EGARCH — Exponential GARCH ===

* --- Ước lượng EGARCH(1,1) cho lợi suất ---
arch ret, earch(1) egarch(1)

* --- Dự báo phương sai có điều kiện ---
predict sigma2, variance
gen sigma = sqrt(sigma2)

* --- Kiểm tra hiệu ứng đòn bẩy (gamma) ---
* Hệ số earch_a có ý nghĩa thống kê và âm → có leverage effect
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# === EGARCH — Exponential GARCH ===
library(rugarch)

# --- Định nghĩa đặc tả EGARCH(1,1) ---
spec <- ugarchspec(
  variance.model = list(model = "eGARCH", garchOrder = c(1, 1)),
  mean.model     = list(armaOrder = c(0, 0), include.mean = TRUE),
  distribution.model = "std"
)

# --- Ước lượng ---
fit <- ugarchfit(spec = spec, data = ret)
show(fit)

# --- Kiểm tra hiệu ứng đòn bẩy (alpha1 trong eGARCH) ---
coef(fit)

# --- Đồ thị biến động có điều kiện ---
plot(sigma(fit), type = "l",
     main = "EGARCH(1,1) — Conditional Volatility")
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# === EGARCH — Exponential GARCH ===
from arch import arch_model
import matplotlib.pyplot as plt

# --- Ước lượng EGARCH(1,1) ---
am = arch_model(ret, vol="EGARCH", p=1, q=1, mean="Constant")
res = am.fit(disp="off")
print(res.summary())

# --- Kiểm tra hiệu ứng đòn bẩy ---
# Hệ số gamma < 0 → tin xấu làm tăng biến động nhiều hơn
print("Leverage (gamma):", res.params.filter(like="gamma"))

# --- Đồ thị biến động có điều kiện ---
fig, ax = plt.subplots()
ax.plot(res.conditional_volatility, label="EGARCH Volatility")
ax.set_title("EGARCH(1,1) — Conditional Volatility")
ax.legend()
plt.show()
```

  </TabItem>
</Tabs>

---

## Hạn chế

- Diễn giải tham số phức tạp hơn GARCH.
- Nhạy với giả định phân phối; cần mẫu đủ lớn.

## Video minh họa

<VideoTutorial
  title="Hướng dẫn chạy EGARCH trong EcoLab"
  src="https://www.youtube.com/user/vietlod"
/>

## Xem thêm

- [ARCH/GARCH](/ecolab/model/garch) · [ARIMA](/ecolab/model/arima) · [Danh mục](/ecolab/model/group)
