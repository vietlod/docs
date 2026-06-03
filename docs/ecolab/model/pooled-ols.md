---
title: Pooled OLS
sidebar_position: 1
description: Pooled OLS gộp toàn bộ dữ liệu bảng và chạy OLS, là mô hình cơ sở cho dữ liệu bảng, khi nào phù hợp và cách chạy trong EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Pooled OLS — Hồi quy gộp dữ liệu bảng

**Pooled OLS** gộp toàn bộ quan sát của [dữ liệu bảng](/ecolab/model/fem-rem) (N đơn vị × T kỳ) thành một mẫu duy nhất rồi chạy [OLS](/ecolab/model/ols) như dữ liệu chéo, **bỏ qua cấu trúc bảng**. Đây là mô hình **cơ sở (baseline)** để so sánh với FE/RE.

:::warning Giả định mạnh
Pooled OLS giả định **không có hiệu ứng cá thể** ($\alpha_i$ giống nhau mọi đơn vị). Nếu tồn tại đặc điểm riêng không quan sát được tương quan với $X$, Pooled OLS **chệch** ⇒ dùng [FE](/ecolab/model/fem-rem). Sai số trong cùng đơn vị thường tương quan ⇒ cần **sai số chuẩn cụm (clustered)**.
:::

---

## Đặc tả mô hình

$$
Y_{it} = \beta_0 + X_{it}\beta + \varepsilon_{it}
$$

Giống OLS nhưng dùng toàn bộ $N \times T$ quan sát. Nên dùng **clustered SE theo đơn vị**.

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Dữ liệu bảng tuyến tính* → **Pooled OLS**.
2. Khai báo entity/time, $Y$, $X$; chọn **clustered SE**.
3. Chạy; so sánh với FE/RE qua kiểm định; xuất **mã tái lập**.

---

## Minh họa mã tái lập

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* === Pooled OLS với sai số chuẩn cụm ===
* Sai số chuẩn cụm theo đơn vị (entity)
reg y x1 x2, vce(cluster id)
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# === Pooled OLS (R — plm) ===
library(plm)

pdata <- pdata.frame(df, index = c("id", "year"))

# Pooled OLS (model = "pooling")
model_pool <- plm(y ~ x1 + x2, data = pdata, model = "pooling")
summary(model_pool)

# Sai số chuẩn cụm theo đơn vị
library(lmtest)
coeftest(model_pool, vcov = vcovHC(model_pool,
         type = "HC1", cluster = "group"))
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
from linearmodels.panel import PooledOLS
import statsmodels.api as sm

# === Pooled OLS (Python — linearmodels) ===
df = df.set_index(['id', 'year'])
y = df['y']
X = sm.add_constant(df[['x1', 'x2']])

model = PooledOLS(y, X).fit(cov_type='clustered', cluster_entity=True)
print(model.summary)
```

  </TabItem>
</Tabs>

## Video minh họa

<VideoTutorial
  title="Hướng dẫn chạy Pooled OLS trong EcoLab"
  src="https://www.youtube.com/user/vietlod"
/>

## Xem thêm

- [FEM/REM](/ecolab/model/fem-rem) · [Between](/ecolab/model/between) · [Danh mục](/ecolab/model/group)
