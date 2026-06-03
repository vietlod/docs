---
title: Elastic Net — Kết hợp L1 + L2
sidebar_position: 3
description: Elastic Net kết hợp phạt L1 (Lasso) và L2 (Ridge) để vừa chọn biến vừa xử lý nhóm biến tương quan cao, và cách chạy trong EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Elastic Net — Chính quy hóa L1 + L2

**Elastic Net** kết hợp **phạt L1** ([Lasso](/ecolab/model/lasso)) và **phạt L2** ([Ridge](/ecolab/model/ridge)). Nó vừa **chọn biến** (như Lasso) vừa xử lý tốt **nhóm biến tương quan cao** (như Ridge) — khắc phục nhược điểm không ổn định của Lasso khi các biến tương quan.

:::tip Khi nào dùng
Dùng Elastic Net khi có **nhiều biến** và tồn tại **nhóm biến tương quan cao** mà bạn muốn giữ/loại theo nhóm thay vì chọn ngẫu nhiên một biến.
:::

---

## Đặc tả mô hình

$$
\min_{\beta} \; \sum_{i=1}^{n} (Y_i - X_i \beta)^2 + \lambda \left[ \alpha \sum_{j} |\beta_j| + (1-\alpha) \sum_{j} \beta_j^2 \right]
$$

- $\alpha \in [0,1]$ là **tỉ lệ trộn**: $\alpha = 1$ ⇒ Lasso; $\alpha = 0$ ⇒ Ridge.
- $\lambda$ điều khiển tổng mức phạt.

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Hồi quy chính quy hóa* → **Elastic Net**.
2. Chọn $Y$, các $X$; **chuẩn hóa**; chọn $\alpha$ và $\lambda$ (CV trên lưới 2 chiều).
3. Đọc tập biến giữ lại + hệ số; xuất **mã tái lập**.

---

## Minh họa mã tái lập

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* === Elastic Net (Stata 16+) ===
* alpha = 0.5 (tỉ lệ trộn L1/L2), chọn lambda bằng CV
elasticnet linear y x1-x20, selection(cv) alphas(0.5)

* Xem hệ số và biến được chọn
lassocoef, display(coef, penalized)
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# === Elastic Net (R — glmnet) ===
library(glmnet)

X <- as.matrix(df[, paste0("x", 1:20)])
y <- df$y

# Elastic Net: alpha = 0.5 (trộn 50/50 L1 + L2)
cv_enet <- cv.glmnet(X, y, alpha = 0.5)
plot(cv_enet)

# Hệ số tại lambda tối ưu
coef(cv_enet, s = "lambda.min")
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
from sklearn.linear_model import ElasticNetCV
from sklearn.preprocessing import StandardScaler
import numpy as np

# === Elastic Net (Python — scikit-learn) ===
scaler = StandardScaler()
X_scaled = scaler.fit_transform(df[['x1', 'x2', 'x3']])
y = df['y'].values

# l1_ratio = 0.5 (tương đương alpha trong glmnet)
model = ElasticNetCV(l1_ratio=0.5, cv=5, random_state=42)
model.fit(X_scaled, y)

print(f"Alpha tối ưu: {model.alpha_:.4f}")
print(f"Số biến được chọn: {np.sum(model.coef_ != 0)}")
print(f"Hệ số: {model.coef_}")
```

  </TabItem>
</Tabs>

---

## Hạn chế

- Có **2 tham số** ($\alpha$, $\lambda$) cần tinh chỉnh ⇒ CV tốn hơn.
- Vẫn là phương pháp **thiên về dự báo**; diễn giải nhân quả cần thận trọng.

## Video minh họa

<VideoTutorial
  title="Hướng dẫn chạy Elastic Net trong EcoLab"
  src="https://www.youtube.com/embed/m3wyHeBOfUE"
/>

## Xem thêm

- [Ridge](/ecolab/model/ridge) · [Lasso](/ecolab/model/lasso) · [Adaptive Lasso](/ecolab/model/adaptive-lasso) · [Danh mục](/ecolab/model/group)

