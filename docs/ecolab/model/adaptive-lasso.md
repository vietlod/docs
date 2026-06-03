---
title: Adaptive Lasso
sidebar_position: 4
description: Adaptive Lasso dùng trọng số riêng cho từng hệ số để đạt tính chất oracle (chọn biến nhất quán), khác Lasso thường, và cách chạy trong EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Adaptive Lasso

**Adaptive Lasso** là cải tiến của [Lasso](/ecolab/model/lasso): áp **trọng số riêng** cho phạt L1 của từng hệ số, phạt nhẹ các biến quan trọng và phạt nặng các biến yếu. Nhờ đó Adaptive Lasso đạt **tính chất oracle** — chọn đúng tập biến và ước lượng hệ số nhất quán khi mẫu đủ lớn.

:::tip Khi nào dùng
Dùng Adaptive Lasso khi cần **chọn biến nhất quán** (consistent selection) với nền tảng lý thuyết vững hơn Lasso thường, đặc biệt khi quan tâm **suy diễn** chứ không chỉ dự báo.
:::

---

## Đặc tả mô hình

$$
\min_{\beta} \; \sum_{i=1}^{n} (Y_i - X_i \beta)^2 + \lambda \sum_{j=1}^{p} \hat{w}_j \, |\beta_j|, \qquad \hat{w}_j = \frac{1}{|\hat{\beta}_j^{init}|^{\gamma}}
$$

Trọng số $\hat{w}_j$ tính từ một ước lượng sơ bộ $\hat{\beta}_j^{init}$ (thường OLS hoặc Ridge); biến có hệ số sơ bộ lớn ⇒ trọng số nhỏ ⇒ ít bị phạt.

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Hồi quy chính quy hóa* → **Adaptive Lasso**.
2. Chọn $Y$, các $X$; chọn ước lượng sơ bộ (OLS/Ridge), $\gamma$ và $\lambda$ (CV).
3. Đọc tập biến chọn + hệ số; xuất **mã tái lập**.

---

## Minh họa mã tái lập

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* === Adaptive Lasso (Stata 16+) ===
* selection(adaptive) tự tính trọng số từ ước lượng sơ bộ
lasso linear y x1-x20, selection(adaptive)

* Xem hệ số và biến được chọn
lassocoef, display(coef, penalized)
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# === Adaptive Lasso (R — glmnet) ===
library(glmnet)

X <- as.matrix(df[, paste0("x", 1:20)])
y <- df$y

# Bước 1: ước lượng sơ bộ bằng OLS (hoặc Ridge nếu p > n)
beta_ols <- coef(lm(y ~ X))[-1]  # bỏ intercept

# Bước 2: tính trọng số adaptive (gamma = 1)
weights <- 1 / abs(beta_ols)

# Bước 3: chạy Lasso có trọng số
cv_alasso <- cv.glmnet(X, y, alpha = 1, penalty.factor = weights)
coef(cv_alasso, s = "lambda.min")
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
import numpy as np
from sklearn.linear_model import Lasso, LassoCV, LinearRegression
from sklearn.preprocessing import StandardScaler

# === Adaptive Lasso (Python) ===
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
y = df['y'].values

# Bước 1: ước lượng sơ bộ OLS
ols = LinearRegression().fit(X_scaled, y)
beta_ols = ols.coef_

# Bước 2: tính trọng số adaptive (gamma = 1)
weights = 1.0 / (np.abs(beta_ols) + 1e-6)

# Bước 3: Lasso trên dữ liệu đã nhân trọng số
X_weighted = X_scaled / weights
model = LassoCV(cv=5, random_state=42).fit(X_weighted, y)

# Hệ số gốc
coef_adaptive = model.coef_ / weights
print(f"Số biến được chọn: {np.sum(coef_adaptive != 0)}")
```

  </TabItem>
</Tabs>

---

## Hạn chế

- Phụ thuộc **ước lượng sơ bộ**; nếu sơ bộ kém (vd $p > n$ phải dùng Ridge), kết quả có thể lệch.
- Thêm tham số $\gamma$ cần tinh chỉnh.

## Video minh họa

<VideoTutorial
  title="Hướng dẫn chạy Adaptive Lasso trong EcoLab"
  src="https://www.youtube.com/user/vietlod"
/>

## Xem thêm

- [Lasso](/ecolab/model/lasso) · [Ridge](/ecolab/model/ridge) · [Elastic Net](/ecolab/model/elastic-net) · [Danh mục](/ecolab/model/group)
