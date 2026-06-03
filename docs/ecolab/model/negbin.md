---
title: Negative Binomial
sidebar_position: 2
description: Hồi quy nhị thức âm (Negative Binomial) cho biến đếm có overdispersion (phương sai > kỳ vọng), khác Poisson, và cách chạy trong EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Negative Binomial — Hồi quy nhị thức âm

**Negative Binomial (NegBin)** là mô hình biến đếm xử lý **overdispersion** — khi **phương sai lớn hơn kỳ vọng**, tình huống rất phổ biến mà [Poisson](/ecolab/model/poisson) không mô tả đúng. NegBin thêm một tham số phân tán $\alpha$ để nới lỏng ràng buộc equidispersion.

:::tip Khi nào dùng
Dùng NegBin khi $Y$ là **số đếm có overdispersion** ($\text{Var}(Y) > E[Y]$). Nếu $\alpha \to 0$, NegBin quy về Poisson.
:::

---

## Đặc tả mô hình

$$
E[Y_i \mid X_i] = \mu_i = \exp(X_i \beta), \qquad \text{Var}(Y_i) = \mu_i + \alpha \, \mu_i^2
$$

Tham số $\alpha > 0$ đo mức **overdispersion**. Ước lượng bằng **MLE**.

---

## Chẩn đoán

- Kiểm định $H_0: \alpha = 0$ (NegBin vs Poisson): bác bỏ ⇒ NegBin phù hợp hơn.
- Nếu vẫn dư thừa số 0 ⇒ [ZINB](/ecolab/model/zinb).

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Dữ liệu đếm* → **Negative Binomial**.
2. Chọn $Y$ đếm, các $X$, offset nếu cần.
3. Chạy, đọc IRR và $\alpha$; so sánh AIC/BIC với Poisson; xuất **mã tái lập**.

---

## Minh họa mã tái lập

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* === Hồi quy Negative Binomial ===
nbreg patents rd_spend firm_size, vce(robust)

* Incidence Rate Ratios (IRR)
nbreg patents rd_spend firm_size, vce(robust) irr

* Tham số overdispersion alpha (lnalpha trong output)
* Kiểm định alpha = 0 (NegBin vs Poisson)
* ⇒ Likelihood-ratio test tự động hiển thị
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# === Hồi quy Negative Binomial ===
library(MASS)

model <- glm.nb(patents ~ rd_spend + firm_size, data = df)
summary(model)

# Incidence Rate Ratios (IRR)
exp(coef(model))
exp(confint(model))

# Tham số overdispersion theta (1/alpha)
model$theta

# So sánh AIC với Poisson
pois <- glm(patents ~ rd_spend + firm_size, family = poisson, data = df)
AIC(pois, model)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# === Hồi quy Negative Binomial ===
import statsmodels.api as sm
import numpy as np

X = sm.add_constant(df[["rd_spend", "firm_size"]])
y = df["patents"]

model = sm.GLM(y, X, family=sm.families.NegativeBinomial()).fit()
print(model.summary())

# Incidence Rate Ratios (IRR)
print("\nIRR:")
print(np.exp(model.params))

# So sánh AIC với Poisson
pois = sm.GLM(y, X, family=sm.families.Poisson()).fit()
print(f"\nAIC Poisson:  {pois.aic:.2f}")
print(f"AIC NegBin:   {model.aic:.2f}")
```

  </TabItem>
</Tabs>

---

## Hạn chế

- Vẫn kém khi có **excess zeros** từ một cơ chế riêng ⇒ dùng zero-inflated.
- Cần mẫu đủ lớn để ước lượng $\alpha$ ổn định.

## Video minh họa

<VideoTutorial
  title="Hướng dẫn chạy Negative Binomial trong EcoLab"
  src="https://www.youtube.com/embed/m3wyHeBOfUE"
/>

## Xem thêm

- [Poisson](/ecolab/model/poisson) · [ZIP](/ecolab/model/zip) · [ZINB](/ecolab/model/zinb) · [Danh mục](/ecolab/model/group)

