---
title: Truncated Regression
sidebar_position: 4
description: Hồi quy cắt cụt (truncated) khi mẫu chỉ chứa quan sát vượt/dưới ngưỡng, khác Tobit, và cách chạy trong EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Truncated Regression — Hồi quy cắt cụt

**Truncated Regression** dùng khi mẫu **chỉ chứa các quan sát thỏa một ngưỡng** — các đơn vị ngoài ngưỡng **hoàn toàn không xuất hiện** trong dữ liệu (khác với [Tobit](/ecolab/model/tobit), nơi đơn vị tại ngưỡng vẫn được quan sát với giá trị dồn).

:::warning Cắt cụt gây chệch nếu dùng OLS
Khi mẫu bị cắt cụt, phân phối sai số trong mẫu **không còn kỳ vọng 0** ⇒ OLS chệch. Phải dùng ước lượng truncated (MLE) để hiệu chỉnh.
:::

---

## Đặc tả mô hình

Với cắt cụt dưới tại $a$, hàm hợp lý dựa trên phân phối **có điều kiện $Y > a$**:

$$
f(Y_i \mid Y_i > a) = \frac{\phi\!\left(\frac{Y_i - X_i\beta}{\sigma}\right)}{\sigma \, \Phi\!\left(\frac{X_i\beta - a}{\sigma}\right)}
$$

Ước lượng bằng **MLE**.

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Biến phụ thuộc giới hạn* → **Truncated**.
2. Chọn $Y$, các $X$; khai báo **ngưỡng cắt cụt** và chiều (trên/dưới).
3. Chạy, đọc hệ số đã hiệu chỉnh; xuất **mã tái lập**.

---

## Minh họa mã tái lập

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* === Hồi quy Truncated — cắt cụt dưới tại 0 ===
truncreg y x1 x2, ll(0)

* Hiển thị hệ số, sigma, log-likelihood
estimates table
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# === Hồi quy Truncated — cắt cụt dưới tại 0 ===
library(truncreg)

model <- truncreg(y ~ x1 + x2,
                  point     = 0,
                  direction = "left",
                  data      = df)
summary(model)

# Hệ số đã hiệu chỉnh cho cắt cụt
coef(model)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# === Hồi quy Truncated — Python ===
# statsmodels chưa có lệnh truncated regression tích hợp sẵn.
# Cách tiếp cận: ước lượng MLE thủ công.

import numpy as np
from scipy.optimize import minimize
from scipy.stats import norm

def trunc_loglik(params, X, y, lower=0):
    beta = params[:-1]
    sigma = np.exp(params[-1])  # đảm bảo sigma > 0
    Xb = X @ beta
    # Log-likelihood với cắt cụt dưới
    ll = np.sum(
        norm.logpdf(y, Xb, sigma)
        - np.log(1 - norm.cdf((lower - Xb) / sigma))
    )
    return -ll

# X đã có hằng số, y chỉ chứa quan sát > 0
# init = np.zeros(X.shape[1] + 1)
# result = minimize(trunc_loglik, init, args=(X, y))
# print("Hệ số Truncated:", result.x[:-1])
# print("Sigma:", np.exp(result.x[-1]))
```

  </TabItem>
</Tabs>

---

## Hạn chế

- Cần biết đúng **ngưỡng và cơ chế cắt cụt**.
- Nhạy với giả định phân phối chuẩn của sai số.

## Video minh họa

<VideoTutorial
  title="Hướng dẫn chạy Truncated Regression trong EcoLab"
  src="https://www.youtube.com/embed/m3wyHeBOfUE"
/>

## Xem thêm

- [Tobit](/ecolab/model/tobit) · [Heckman](/ecolab/model/heckman) · [Danh mục](/ecolab/model/group)

