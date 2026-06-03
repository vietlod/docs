---
title: Logit — Hồi quy logistic
sidebar_position: 1
description: Mô hình Logit cho biến phụ thuộc nhị phân, hàm liên kết logistic, tỷ số odds, tác động biên (marginal effects) và cách chạy trong EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Logit — Hồi quy logistic nhị phân

**Logit** mô hình hóa xác suất của một **biến phụ thuộc nhị phân** ($Y \in \{0,1\}$) qua hàm liên kết **logistic**. Đây là mô hình chuẩn khi kết quả là "có/không" (vỡ nợ, tham gia, đậu/rớt…).

:::tip Khi nào dùng
Dùng Logit khi $Y$ **nhị phân**. Hệ số Logit diễn giải qua **tỷ số odds** $e^{\beta}$; để diễn giải trực tiếp theo xác suất, hãy đọc **tác động biên (marginal effects)**.
:::

---

## Đặc tả mô hình

$$
P(Y_i = 1 \mid X_i) = \frac{1}{1 + e^{-(\beta_0 + \beta_1 X_{1i} + \dots + \beta_k X_{ki})}}
$$

Ước lượng bằng **Maximum Likelihood (MLE)**. Hệ số $\beta_j$: $e^{\beta_j}$ là tỷ số odds; tác động biên phụ thuộc giá trị $X$.

---

## Diễn giải & chẩn đoán

- **Tỷ số odds** $e^{\beta_j} > 1$ ⇒ tăng odds; $< 1$ ⇒ giảm.
- **Tác động biên** (trung bình AME hoặc tại trung bình MEM) cho thay đổi xác suất.
- Đánh giá khớp: **Pseudo-$R^2$** (McFadden), độ chính xác phân loại, đường ROC/AUC.
- Kiểm tra: phân tách hoàn hảo (perfect separation), đa cộng tuyến.

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Biến phụ thuộc giới hạn* → **Logit**.
2. Chọn $Y$ nhị phân và các $X$.
3. Chạy, đọc hệ số, **tỷ số odds**, **tác động biên**, AUC; xuất **mã tái lập**.

---

## Ví dụ đầu vào / đầu ra

**Đầu vào (minh họa):** `vo_no` (0/1) theo `don_bay`, `roa`, `quy_mo`.

**Đầu ra (định dạng, số liệu minh họa — không phải kết quả thực):**

| Biến | Hệ số | Odds ratio | AME | p-value |
| :--- | :--- | :--- | :--- | :--- |
| don_bay | 1.20 | 3.32 | 0.18 | 0.000 |
| roa | −2.10 | 0.12 | −0.31 | 0.001 |

---

## Minh họa mã tái lập

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* === Hồi quy Logit ===
logit vo_no don_bay roa quy_mo

* Tác động biên trung bình (AME)
margins, dydx(*)

* Bảng phân loại (confusion matrix)
estat classification

* Odds ratio
logit vo_no don_bay roa quy_mo, or

* Đường ROC và AUC
lroc
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# === Hồi quy Logit ===
model <- glm(vo_no ~ don_bay + roa + quy_mo,
             family = binomial(link = "logit"),
             data   = df)
summary(model)

# Odds ratio
exp(coef(model))
exp(confint(model))

# Tác động biên trung bình (AME)
library(margins)
m <- margins(model)
summary(m)

# Bảng phân loại và AUC
pred_prob <- fitted(model)
pred_class <- ifelse(pred_prob > 0.5, 1, 0)
table(Predicted = pred_class, Actual = df$vo_no)

library(pROC)
roc_obj <- roc(df$vo_no, pred_prob)
auc(roc_obj)
plot(roc_obj)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# === Hồi quy Logit ===
import statsmodels.api as sm
import pandas as pd

X = sm.add_constant(df[["don_bay", "roa", "quy_mo"]])
y = df["vo_no"]

model = sm.Logit(y, X).fit()
print(model.summary())

# Odds ratio
import numpy as np
print("Odds Ratios:")
print(np.exp(model.params))

# Tác động biên trung bình (AME)
mfx = model.get_margeff()
print(mfx.summary())

# Bảng phân loại
pred = (model.predict(X) > 0.5).astype(int)
print(pd.crosstab(pred, y, rownames=["Predicted"], colnames=["Actual"]))

# AUC
from sklearn.metrics import roc_auc_score, roc_curve
auc = roc_auc_score(y, model.predict(X))
print(f"AUC = {auc:.4f}")
```

  </TabItem>
</Tabs>

---

## Hạn chế

- Hệ số thô **không** là tác động xác suất — phải dùng marginal effects.
- Giả định dạng hàm logistic; với probit normal CDF xem [Probit](/ecolab/model/probit).

## Video minh họa

<VideoTutorial
  title="Hướng dẫn chạy Logit trong EcoLab"
  src="https://www.youtube.com/user/vietlod"
/>

## Xem thêm

- [Probit](/ecolab/model/probit) · [Tobit](/ecolab/model/tobit) · [Danh mục](/ecolab/model/group)
