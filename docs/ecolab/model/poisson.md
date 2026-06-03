---
title: Poisson — Hồi quy biến đếm
sidebar_position: 1
description: Hồi quy Poisson cho biến đếm (số nguyên không âm), giả định mean = variance, kiểm định overdispersion và cách chạy trong EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Poisson — Hồi quy biến đếm

**Hồi quy Poisson** mô hình hóa **biến đếm** (số nguyên không âm: số bằng sáng chế, số lần khám bệnh, số vụ tai nạn…). Mô hình dùng hàm liên kết log đảm bảo kỳ vọng luôn dương.

:::tip Khi nào dùng
Dùng Poisson khi $Y$ là **số đếm**. Giả định cốt lõi: **kỳ vọng bằng phương sai** (equidispersion). Nếu phương sai lớn hơn kỳ vọng (**overdispersion**), chuyển sang [Negative Binomial](/ecolab/model/negbin).
:::

---

## Đặc tả mô hình

$$
E[Y_i \mid X_i] = \exp(\beta_0 + \beta_1 X_{1i} + \dots + \beta_k X_{ki}), \qquad Y_i \sim \text{Poisson}(\mu_i)
$$

Ước lượng bằng **MLE**. Hệ số diễn giải qua **tỷ số tỷ lệ sự kiện** $e^{\beta_j}$ (incidence rate ratio).

---

## Chẩn đoán

- **Overdispersion**: kiểm tra $\text{Var}(Y) > E[Y]$ (vd kiểm định của Cameron-Trivedi). Nếu có ⇒ SE bị đánh giá thấp ⇒ dùng NegBin hoặc Poisson với **sai số chuẩn robust/QMLE**.
- Dư thừa số 0 (excess zeros) ⇒ [ZIP](/ecolab/model/zip).

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Dữ liệu đếm* → **Poisson**.
2. Chọn $Y$ đếm và các $X$; chọn **exposure/offset** nếu cần (vd theo dân số).
3. Chạy, đọc IRR, kiểm tra overdispersion; xuất **mã tái lập**.

---

## Minh họa mã tái lập

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* === Hồi quy Poisson ===
poisson patents rd_spend firm_size, vce(robust)

* Incidence Rate Ratios (IRR)
poisson patents rd_spend firm_size, vce(robust) irr

* Kiểm tra overdispersion (so sánh mean vs variance)
estat gof
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# === Hồi quy Poisson ===
model <- glm(patents ~ rd_spend + firm_size,
             family = poisson,
             data   = df)
summary(model)

# Incidence Rate Ratios (IRR)
exp(coef(model))
exp(confint(model))

# Kiểm tra overdispersion
library(AER)
dispersiontest(model)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# === Hồi quy Poisson ===
import statsmodels.api as sm
import numpy as np

X = sm.add_constant(df[["rd_spend", "firm_size"]])
y = df["patents"]

model = sm.GLM(y, X, family=sm.families.Poisson()).fit()
print(model.summary())

# Incidence Rate Ratios (IRR)
print("\nIRR:")
print(np.exp(model.params))

# Kiểm tra overdispersion: Pearson chi2 / df_resid >> 1 ⇒ overdispersion
print(f"\nOverdispersion ratio: {model.pearson_chi2 / model.df_resid:.2f}")
```

  </TabItem>
</Tabs>

---

## Hạn chế

- Giả định equidispersion thường bị vi phạm trong thực tế.
- Excess zeros làm Poisson khớp kém ⇒ dùng mô hình zero-inflated/hurdle.

## Video minh họa

<VideoTutorial
  title="Hướng dẫn chạy Poisson Regression trong EcoLab"
  src="https://www.youtube.com/embed/m3wyHeBOfUE"
/>

## Xem thêm

- [Negative Binomial](/ecolab/model/negbin) · [ZIP](/ecolab/model/zip) · [ZINB](/ecolab/model/zinb) · [Danh mục](/ecolab/model/group)

