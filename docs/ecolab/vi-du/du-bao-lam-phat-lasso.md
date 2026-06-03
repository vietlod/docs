---
title: 'Dự báo lạm phát với nhiều biến (Lasso)'
sidebar_position: 8
description: Thực hành Lasso/Elastic Net trên EcoLab — dự báo lạm phát từ rất nhiều biến vĩ mô, chọn biến tự động và tránh overfitting.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Dự báo lạm phát với nhiều biến (Lasso / Elastic Net)

Minh họa nhóm [chính quy hóa](/ecolab/model/lasso): khi có **rất nhiều biến dự báo** vĩ mô (cung tiền, tỷ giá, giá dầu, lãi suất, độ trễ…), [OLS](/ecolab/model/ols) dễ **overfitting** và đa cộng tuyến. [Lasso](/ecolab/model/lasso)/[Elastic Net](/ecolab/model/elastic-net) **tự động chọn biến** và co hệ số. Số liệu là **minh họa**.

> Tóm tắt: dùng Lasso/Elastic Net để chọn tập biến dự báo lạm phát tốt nhất ngoài mẫu (out-of-sample).

---

## Bước 1 — Ý tưởng
- **Câu hỏi:** biến vĩ mô nào thực sự hữu ích để dự báo lạm phát, và mô hình dự báo ngoài mẫu ra sao?

## Bước 2 — Tổng quan tài liệu
Dự báo lạm phát, mô hình nhiều biến (data-rich forecasting), regularization.

## Bước 3 — Thu thập dữ liệu
Chuỗi tháng/quý: `cpi` (lạm phát), và **20–50 biến** ứng viên (`m2`, `er`, `oil`, `rate`, sản lượng, kỳ vọng, độ trễ…) từ [EcoData](/ecodata/overview)/World Bank/FRED.

## Bước 4 — Mô hình hóa

Chọn họ *Hồi quy chính quy hóa* → **Lasso** (hoặc **Elastic Net** khi biến tương quan nhóm); **chuẩn hóa** biến; chọn $\lambda$ bằng cross-validation.

$$
\min_{\beta} \sum_{t} (cpi_t - X_t\beta)^2 + \lambda \sum_j |\beta_j|
$$

**Kết quả minh họa (định dạng — không phải kết quả thực):**

| | OLS (mọi biến) | Lasso |
| :--- | :--- | :--- |
| Số biến khác 0 | 45 | 8 |
| RMSE ngoài mẫu | 1.00 (chuẩn hóa) | 0.78 |
| Biến được giữ | — | m2_lag, oil, er, rate… |

Diễn giải mẫu: Lasso giữ lại **8/45 biến** và **giảm RMSE ngoài mẫu** so với OLS đầy đủ ⇒ mô hình thưa, dự báo tốt hơn, dễ diễn giải.

**Mã tái lập:**

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* === Dự báo lạm phát — Lasso ===
* Chọn lambda bằng cross-validation
lasso linear inflation x1-x15, selection(cv)

* Xem hệ số biến được chọn / bị phạt
lassocoef, display(coef, penalized)

* Dự báo ngoài mẫu
predict inflation_hat, xb
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# === Dự báo lạm phát — Lasso ===
library(glmnet)

X_train <- as.matrix(train[, vars])
y_train <- train$inflation
X_test  <- as.matrix(test[, vars])

# Lasso: alpha = 1, chọn lambda bằng CV
cv_fit <- cv.glmnet(X_train, y_train, alpha = 1)

# Dự báo ngoài mẫu
pred <- predict(cv_fit, X_test, s = "lambda.min")
cat("RMSE ngoài mẫu:", sqrt(mean((test$inflation - pred)^2)), "\n")
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
import numpy as np
from sklearn.linear_model import LassoCV
from sklearn.metrics import mean_squared_error

# === Dự báo lạm phát — Lasso ===
model = LassoCV(cv=10, random_state=42)
model.fit(X_train, y_train)

# Biến được chọn (hệ số khác 0)
selected = np.where(model.coef_ != 0)[0]
print(f"Số biến được chọn: {len(selected)}")
print(f"Biến: {[vars[i] for i in selected]}")

# RMSE ngoài mẫu
pred = model.predict(X_test)
rmse = np.sqrt(mean_squared_error(y_test, pred))
print(f"RMSE ngoài mẫu: {rmse:.4f}")
```

  </TabItem>
</Tabs>

## Bước 5 — Báo cáo
Xuất báo cáo + đường co theo $\lambda$ + **mã tái lập**.

:::warning Lưu ý
Regularization thiên về **dự báo**, không phải suy diễn nhân quả; hệ số đã bị co. Để suy diễn, kết hợp lý thuyết hoặc [Adaptive Lasso](/ecolab/model/adaptive-lasso).
:::

## Video minh họa

<VideoTutorial
  title="Hướng dẫn chạy Lasso dự báo lạm phát trong EcoLab"
  src="https://www.youtube.com/embed/m3wyHeBOfUE"
/>

## Xem thêm
- [Lasso](/ecolab/model/lasso) · [Elastic Net](/ecolab/model/elastic-net) · [Ridge](/ecolab/model/ridge) · [Danh mục](/ecolab/model/group)

