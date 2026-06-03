---
title: Lasso — Hồi quy co L1
sidebar_position: 2
description: Hồi quy Lasso (chính quy hóa L1) vừa co hệ số vừa chọn biến tự động, công thức phạt L1, và cách chạy trong EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Lasso — Hồi quy chính quy hóa L1

**Lasso (Least Absolute Shrinkage and Selection Operator)** thêm **phạt L1** vào OLS. Khác [Ridge](/ecolab/model/ridge), Lasso có thể đưa một số hệ số về **đúng bằng 0** — tức **tự động chọn biến (variable selection)**, cho mô hình thưa (sparse) dễ diễn giải.

:::tip Khi nào dùng
Dùng Lasso khi có **nhiều biến giải thích** và muốn **chọn ra tập biến quan trọng**. Khi nhóm biến tương quan cao, cân nhắc [Elastic Net](/ecolab/model/elastic-net).
:::

---

## Đặc tả mô hình

$$
\min_{\beta} \; \sum_{i=1}^{n} (Y_i - X_i \beta)^2 + \lambda \sum_{j=1}^{p} |\beta_j|
$$

Phạt L1 ($\sum |\beta_j|$) tạo nghiệm **góc cạnh** ⇒ nhiều $\beta_j = 0$. $\lambda$ điều khiển mức độ thưa.

---

## Lưu ý

- Chọn $\lambda$ bằng **cross-validation**; **chuẩn hóa** biến trước.
- Khi nhiều biến **tương quan cao**, Lasso có xu hướng chọn 1 và loại phần còn lại (không ổn định) ⇒ Elastic Net khắc phục.
- Suy diễn sau chọn biến (post-selection inference) cần thận trọng.

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Hồi quy chính quy hóa* → **Lasso**.
2. Chọn $Y$, các $X$; bật **chuẩn hóa**; chọn $\lambda$ (CV).
3. Đọc tập biến được giữ (hệ số khác 0) và đường co; xuất **mã tái lập**.

---

## Minh họa mã tái lập

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* === Lasso Regression (Stata 16+) ===
* Chọn lambda bằng cross-validation
lasso linear y x1-x20, selection(cv)

* Xem hệ số được chọn
lassocoef, display(coef, penalized)

* Xem biến được giữ lại
lassoinfo
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# === Lasso Regression (R — glmnet) ===
library(glmnet)

X <- as.matrix(df[, paste0("x", 1:20)])
y <- df$y

# Lasso: alpha = 1; chọn lambda bằng CV
cv_lasso <- cv.glmnet(X, y, alpha = 1)
plot(cv_lasso)

# Hệ số tại lambda tối ưu
coef(cv_lasso, s = "lambda.min")

# Số biến khác 0
sum(coef(cv_lasso, s = "lambda.min") != 0) - 1  # trừ intercept
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
from sklearn.linear_model import LassoCV
from sklearn.preprocessing import StandardScaler
import numpy as np

# === Lasso Regression (Python — scikit-learn) ===
scaler = StandardScaler()
X_scaled = scaler.fit_transform(df[['x1', 'x2', 'x3']])  # chuẩn hóa
y = df['y'].values

# LassoCV: tự chọn alpha (lambda) bằng CV
model = LassoCV(cv=5, random_state=42)
model.fit(X_scaled, y)

print(f"Alpha tối ưu: {model.alpha_:.4f}")
print(f"Số biến được chọn: {np.sum(model.coef_ != 0)}")
print(f"Hệ số: {model.coef_}")
```

  </TabItem>
</Tabs>

---

## Hạn chế

- Không ổn định khi biến tương quan cao.
- Bị giới hạn số biến chọn được khi $p > n$ (chọn tối đa $n$ biến).

## Video minh họa

<VideoTutorial
  title="Hướng dẫn chạy Lasso trong EcoLab"
  src="https://www.youtube.com/embed/m3wyHeBOfUE"
/>

## Xem thêm

- [Ridge](/ecolab/model/ridge) · [Elastic Net](/ecolab/model/elastic-net) · [Adaptive Lasso](/ecolab/model/adaptive-lasso) · [Danh mục](/ecolab/model/group)

