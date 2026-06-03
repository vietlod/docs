---
title: NLS — Hồi quy phi tuyến
sidebar_position: 1
description: Hồi quy phi tuyến (Nonlinear Least Squares) cho quan hệ phi tuyến theo tham số, ví dụ hàm tăng trưởng/sản xuất, và cách chạy trong EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# NLS — Bình phương nhỏ nhất phi tuyến

**NLS (Nonlinear Least Squares)** ước lượng mô hình **phi tuyến theo tham số** — khi quan hệ không thể tuyến tính hóa, vd hàm tăng trưởng logistic, hàm sản xuất CES, mô hình bão hòa. NLS tối thiểu hóa tổng bình phương phần dư của một hàm phi tuyến $f(X_i, \beta)$.

:::tip Khi nào dùng
Dùng NLS khi lý thuyết quy định **dạng hàm phi tuyến cụ thể** (vd CES, logistic). Nếu chỉ phi tuyến theo biến nhưng tuyến tính theo tham số (vd thêm $X^2$), [OLS](/ecolab/model/ols) vẫn dùng được.
:::

---

## Đặc tả mô hình

$$
Y_i = f(X_i, \beta) + \varepsilon_i, \qquad \hat{\beta} = \arg\min_{\beta} \sum_{i} \big(Y_i - f(X_i,\beta)\big)^2
$$

Giải bằng thuật toán lặp (Gauss-Newton, Levenberg-Marquardt); cần **giá trị khởi tạo** hợp lý.

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Phi tuyến & bán tham số* → **NLS**.
2. Khai báo **dạng hàm** $f(X,\beta)$ và **giá trị khởi tạo** tham số.
3. Chạy, kiểm tra hội tụ + hệ số; xuất **mã tái lập**.

---

## Minh họa mã tái lập

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* === NLS — Hồi quy phi tuyến ===

* Ước lượng dạng hàm: y = b0 + b1 * x1^b2
nl (y = {b0} + {b1}*x1^{b2}), variables(x1) initial(b0 1 b1 1 b2 0.5)

* Xem kết quả hội tụ và hệ số
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# === NLS — Hồi quy phi tuyến ===

# Ước lượng dạng hàm: y = b0 + b1 * x1^b2
nls_model <- nls(y ~ b0 + b1 * x1^b2,
                 data = df,
                 start = list(b0 = 1, b1 = 1, b2 = 0.5))

summary(nls_model)

# Giá trị dự báo
df$y_hat <- predict(nls_model)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# === NLS — Hồi quy phi tuyến ===

import numpy as np
from scipy.optimize import curve_fit

# Định nghĩa dạng hàm phi tuyến
def func(x, b0, b1, b2):
    return b0 + b1 * x**b2

# Ước lượng với giá trị khởi tạo
popt, pcov = curve_fit(func, df['x1'].values, df['y'].values,
                        p0=[1, 1, 0.5])

print(f"b0 = {popt[0]:.4f}, b1 = {popt[1]:.4f}, b2 = {popt[2]:.4f}")

# Sai số chuẩn của tham số
perr = np.sqrt(np.diag(pcov))
print(f"SE: {perr}")
```

  </TabItem>
</Tabs>

---

## Hạn chế

- Nhạy với **giá trị khởi tạo**; có thể hội tụ về **cực tiểu địa phương** hoặc không hội tụ.
- Suy diễn dựa trên xấp xỉ tiệm cận; cần mẫu đủ lớn.

## Video minh họa

<VideoTutorial
  title="Hướng dẫn chạy NLS trong EcoLab"
  src="https://www.youtube.com/user/vietlod"
/>

## Xem thêm

- [GAM](/ecolab/model/gam) · [OLS](/ecolab/model/ols) · [Danh mục](/ecolab/model/group)
