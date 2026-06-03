---
title: Probit
sidebar_position: 2
description: Mô hình Probit cho biến nhị phân dùng hàm phân phối chuẩn tích lũy, khác biệt với Logit, tác động biên và cách chạy trong EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Probit — Hồi quy nhị phân chuẩn

**Probit** mô hình hóa xác suất biến **nhị phân** qua **hàm phân phối chuẩn tích lũy** $\Phi(\cdot)$. Về mặt thực nghiệm, Probit và [Logit](/ecolab/model/logit) thường cho kết luận tương tự; khác biệt nằm ở giả định phân phối sai số (chuẩn vs logistic).

:::tip Logit hay Probit?
Kết quả thường rất gần nhau. **Logit** tiện vì có **tỷ số odds**; **Probit** được ưa dùng khi giả định sai số chuẩn hợp lý hơn hoặc trong các mô hình mở rộng (Heckman, biprobit). Luôn so sánh qua **tác động biên**.
:::

---

## Đặc tả mô hình

$$
P(Y_i = 1 \mid X_i) = \Phi(\beta_0 + \beta_1 X_{1i} + \dots + \beta_k X_{ki})
$$

với $\Phi$ là CDF của phân phối chuẩn chuẩn tắc. Ước lượng bằng **MLE**.

---

## Diễn giải

- Hệ số $\beta_j$ **không** đọc trực tiếp; dùng **tác động biên** (AME/MEM).
- Khớp mô hình: Pseudo-$R^2$, phân loại, AUC.

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Biến phụ thuộc giới hạn* → **Probit**.
2. Chọn $Y$ nhị phân và các $X$.
3. Chạy, đọc **tác động biên**; so sánh với Logit; xuất **mã tái lập**.

---

## Minh họa mã tái lập

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* === Hồi quy Probit ===
probit y x1 x2 x3

* Tác động biên trung bình (AME)
margins, dydx(*)

* Bảng phân loại
estat classification

* Pseudo R-squared (hiển thị trong kết quả probit)
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# === Hồi quy Probit ===
model <- glm(y ~ x1 + x2 + x3,
             family = binomial(link = "probit"),
             data   = df)
summary(model)

# Tác động biên trung bình (AME)
library(margins)
m <- margins(model)
summary(m)

# Pseudo R-squared (McFadden)
null_model <- glm(y ~ 1, family = binomial(link = "probit"), data = df)
1 - logLik(model) / logLik(null_model)

# AUC
library(pROC)
roc_obj <- roc(df$y, fitted(model))
auc(roc_obj)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# === Hồi quy Probit ===
import statsmodels.api as sm

X = sm.add_constant(df[["x1", "x2", "x3"]])
y = df["y"]

model = sm.Probit(y, X).fit()
print(model.summary())

# Tác động biên trung bình (AME)
mfx = model.get_margeff()
print(mfx.summary())

# Pseudo R-squared (McFadden) — có sẵn trong summary
print(f"Pseudo R² = {model.prsquared:.4f}")
```

  </TabItem>
</Tabs>

---

## Hạn chế

- Không có diễn giải odds như Logit.
- Cùng giả định nền (ngoại sinh, đặc tả đúng) như các mô hình lựa chọn nhị phân.

## Video minh họa

<VideoTutorial
  title="Hướng dẫn chạy Probit trong EcoLab"
  src="https://www.youtube.com/embed/m3wyHeBOfUE"
/>

## Xem thêm

- [Logit](/ecolab/model/logit) · [Heckman](/ecolab/model/heckman) · [Danh mục](/ecolab/model/group)

