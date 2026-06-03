---
title: Tobit — Hồi quy kiểm duyệt
sidebar_position: 3
description: Mô hình Tobit cho biến phụ thuộc bị kiểm duyệt (censored), ví dụ chi tiêu/giờ làm bị chặn tại 0, và cách chạy trong EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Tobit — Hồi quy biến bị kiểm duyệt (censored)

**Tobit** xử lý biến phụ thuộc **bị kiểm duyệt (censored)** — quan sát được phần giá trị trong một khoảng nhưng bị dồn (mass point) tại ngưỡng. Ví dụ điển hình: chi tiêu cho một mặt hàng, số giờ làm thêm, đầu tư — nhiều quan sát bằng **0** trong khi biến tiềm ẩn có thể âm.

:::tip Kiểm duyệt vs cắt cụt
**Censored (Tobit)**: vẫn quan sát được đơn vị tại ngưỡng (giá trị bị dồn về ngưỡng). **Truncated** ([Truncated Regression](/ecolab/model/truncated)): đơn vị ngoài ngưỡng **không xuất hiện** trong mẫu.
:::

---

## Đặc tả mô hình

Biến tiềm ẩn $Y_i^{*} = X_i \beta + \varepsilon_i$, quan sát:

$$
Y_i = \begin{cases} Y_i^{*} & \text{nếu } Y_i^{*} > 0 \\ 0 & \text{nếu } Y_i^{*} \le 0 \end{cases}
$$

Ước lượng bằng **MLE**. OLS trên dữ liệu kiểm duyệt cho hệ số **chệch**.

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Biến phụ thuộc giới hạn* → **Tobit**.
2. Chọn $Y$ (có ngưỡng kiểm duyệt, vd dồn tại 0) và các $X$; khai báo **ngưỡng**.
3. Chạy, đọc hệ số + **tác động biên** (có/không kiểm duyệt); xuất **mã tái lập**.

---

## Minh họa mã tái lập

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* === Hồi quy Tobit — kiểm duyệt dưới tại 0 ===
tobit y x1 x2, ll(0)

* Tác động biên (tại trung bình — conditional on being uncensored)
margins, dydx(*) predict(ystar(0,.))

* Hệ số và sigma
estimates table
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# === Hồi quy Tobit — kiểm duyệt dưới tại 0 ===
library(AER)

model <- tobit(y ~ x1 + x2, left = 0, data = df)
summary(model)

# Hệ số
coef(model)

# Log-likelihood
logLik(model)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# === Hồi quy Tobit — Python ===
# statsmodels chưa có lệnh tobit tích hợp sẵn.
# Cách tiếp cận: ước lượng MLE thủ công hoặc dùng gói bên ngoài.

import numpy as np
from scipy.optimize import minimize
from scipy.stats import norm

def tobit_loglik(params, X, y, lower=0):
    beta = params[:-1]
    sigma = np.exp(params[-1])  # đảm bảo sigma > 0
    Xb = X @ beta
    # Quan sát không bị kiểm duyệt
    uncens = y > lower
    ll = np.sum(norm.logpdf(y[uncens], Xb[uncens], sigma))
    # Quan sát bị kiểm duyệt
    ll += np.sum(norm.logcdf((lower - Xb[~uncens]) / sigma))
    return -ll

# X đã có hằng số, y là biến phụ thuộc
# init = np.zeros(X.shape[1] + 1)
# result = minimize(tobit_loglik, init, args=(X, y))
# print("Hệ số Tobit:", result.x[:-1])

# Hoặc dùng gói tobit: pip install tobit
# from tobit import TobitModel
# model = TobitModel().fit(X, y, cens=y <= 0)
```

  </TabItem>
</Tabs>

---

## Hạn chế

- Nhạy với giả định **chuẩn & đồng phương sai** của sai số.
- Nếu cơ chế "có tham gia hay không" khác cơ chế "mức độ", cân nhắc [Heckman](/ecolab/model/heckman) (two-part/selection).

## Video minh họa

<VideoTutorial
  title="Hướng dẫn chạy Tobit trong EcoLab"
  src="https://www.youtube.com/embed/m3wyHeBOfUE"
/>

## Xem thêm

- [Truncated Regression](/ecolab/model/truncated) · [Heckman](/ecolab/model/heckman) · [Danh mục](/ecolab/model/group)

