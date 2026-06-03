---
title: Between Estimator
sidebar_position: 3
description: Ước lượng Between dùng trung bình theo đơn vị để khai thác biến thiên giữa các đơn vị (cross-unit), khác FE/RE, và cách chạy trong EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Between Estimator — Ước lượng giữa các đơn vị

**Between Estimator** chạy hồi quy trên **trung bình theo đơn vị** của các biến — khai thác **biến thiên giữa các đơn vị (between variation)** thay vì biến thiên theo thời gian (within) như [Fixed Effects](/ecolab/model/fem-rem). Nó trả lời câu hỏi "đơn vị có $X$ trung bình cao hơn thì $Y$ trung bình ra sao".

:::tip Khi nào dùng
Dùng Between khi quan tâm **khác biệt dài hạn giữa các đơn vị** (vd so sánh các quốc gia/doanh nghiệp theo mức trung bình). RE thực chất là **trung bình có trọng số** của Between và Within.
:::

---

## Đặc tả mô hình

$$
\bar{Y}_i = \beta_0 + \bar{X}_i \beta + \bar{\varepsilon}_i, \qquad \bar{Y}_i = \frac{1}{T}\sum_t Y_{it}
$$

Ước lượng OLS trên dữ liệu đã lấy trung bình theo đơn vị.

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Dữ liệu bảng tuyến tính* → **Between**.
2. Khai báo entity/time, $Y$, $X$.
3. Chạy; đối chiếu với FE (within) để phân tích nguồn biến thiên; xuất **mã tái lập**.

---

## Minh họa mã tái lập

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* === Between Estimator (Stata) ===
xtset id year

* Ước lượng Between
xtreg y x1 x2, be
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# === Between Estimator (R — plm) ===
library(plm)

pdata <- pdata.frame(df, index = c("id", "year"))

# Between estimator
model_be <- plm(y ~ x1 + x2, data = pdata, model = "between")
summary(model_be)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
from linearmodels.panel import BetweenOLS
import statsmodels.api as sm

# === Between Estimator (Python — linearmodels) ===
df = df.set_index(['id', 'year'])
y = df['y']
X = sm.add_constant(df[['x1', 'x2']])

model = BetweenOLS(y, X).fit()
print(model.summary)
```

  </TabItem>
</Tabs>

## Hạn chế

- **Bỏ qua biến thiên theo thời gian**; không kiểm soát hiệu ứng cá thể như FE.
- Mất thông tin động.

## Video minh họa

<VideoTutorial
  title="Hướng dẫn chạy Between Estimator trong EcoLab"
  src="https://www.youtube.com/user/vietlod"
/>

## Xem thêm

- [FEM/REM](/ecolab/model/fem-rem) · [Pooled OLS](/ecolab/model/pooled-ols) · [Danh mục](/ecolab/model/group)
