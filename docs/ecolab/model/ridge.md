---
title: Ridge — Hồi quy co L2
sidebar_position: 1
description: Hồi quy Ridge (chính quy hóa L2) xử lý đa cộng tuyến và overfitting, công thức phạt L2, chọn lambda, và cách chạy trong EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Ridge — Hồi quy chính quy hóa L2

**Ridge** thêm một **lượng phạt L2** vào hàm mục tiêu OLS để **co (shrink)** các hệ số về gần 0, giúp ổn định ước lượng khi có **đa cộng tuyến** hoặc **nhiều biến giải thích** (p lớn). Ridge không đưa hệ số về đúng 0 (không chọn biến) nhưng giảm phương sai ước lượng đáng kể.

:::tip Khi nào dùng
Dùng Ridge khi các biến giải thích **tương quan cao** (đa cộng tuyến) khiến [OLS](/ecolab/model/ols) bất ổn (hệ số phình to, đổi dấu). Nếu cần **chọn biến**, dùng [Lasso](/ecolab/model/lasso).
:::

---

## Đặc tả mô hình

Ridge tối thiểu hóa tổng bình phương phần dư cộng **phạt L2**:

$$
\min_{\beta} \; \sum_{i=1}^{n} (Y_i - X_i \beta)^2 + \lambda \sum_{j=1}^{p} \beta_j^2
$$

$\lambda \ge 0$ là **tham số điều chuẩn (regularization)**: $\lambda = 0$ ⇒ OLS; $\lambda$ càng lớn ⇒ co càng mạnh.

---

## Chọn lambda & lưu ý

- Chọn $\lambda$ bằng **cross-validation** (CV).
- **Chuẩn hóa (standardize)** biến trước khi chạy vì phạt nhạy với thang đo.
- Ridge **giảm phương sai** nhưng **tăng độ chệch** (bias-variance tradeoff).

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Hồi quy chính quy hóa* → **Ridge**.
2. Chọn $Y$, các $X$; bật **chuẩn hóa**; chọn $\lambda$ (hoặc CV tự động).
3. Chạy và đọc hệ số đã co, đường co theo $\lambda$; xuất **mã tái lập**.

---

## Minh họa mã tái lập

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* === Ridge Regression (Stata) ===
* Stata không có lệnh ridge tích hợp chính thức.
* Dùng gói ridgereg (cài: ssc install ridgereg) hoặc tính thủ công:

* Cách 1: Dùng gói ridgereg
* ridgereg y x1-x20, lambda(10)

* Cách 2: Post-estimation thủ công
* Chuẩn hóa biến trước, ước lượng OLS sau khi thêm phạt L2
regress y x1-x20
estat ic
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# === Ridge Regression (R — glmnet) ===
library(glmnet)

X <- as.matrix(df[, paste0("x", 1:20)])
y <- df$y

# Ridge: alpha = 0; chọn lambda bằng CV
cv_ridge <- cv.glmnet(X, y, alpha = 0)
plot(cv_ridge)

# Hệ số tại lambda tối ưu
coef(cv_ridge, s = "lambda.min")
cat("Lambda tối ưu:", cv_ridge$lambda.min, "\n")
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
from sklearn.linear_model import RidgeCV
from sklearn.preprocessing import StandardScaler

# === Ridge Regression (Python — scikit-learn) ===
scaler = StandardScaler()
X_scaled = scaler.fit_transform(df[['x1', 'x2', 'x3']])  # chuẩn hóa
y = df['y']

# RidgeCV: tự chọn alpha (lambda) bằng CV
model = RidgeCV(alphas=[0.01, 0.1, 1, 10, 100], cv=5)
model.fit(X_scaled, y)

print(f"Alpha tối ưu: {model.alpha_}")
print(f"Hệ số: {model.coef_}")
print(f"R²: {model.score(X_scaled, y):.4f}")
```

  </TabItem>
</Tabs>

---

## Hạn chế

- Không **chọn biến** (mọi hệ số khác 0).
- Diễn giải hệ số khó hơn OLS do đã bị co; thường dùng cho **dự báo** hơn là suy diễn nhân quả.

## Video minh họa

<VideoTutorial
  title="Hướng dẫn chạy Ridge trong EcoLab"
  src="https://www.youtube.com/user/vietlod"
/>

## Xem thêm

- [Lasso](/ecolab/model/lasso) · [Elastic Net](/ecolab/model/elastic-net) · [OLS](/ecolab/model/ols) · [Danh mục](/ecolab/model/group)
