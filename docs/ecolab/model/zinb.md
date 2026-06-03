---
title: ZINB — Zero-Inflated Negative Binomial
sidebar_position: 4
description: Mô hình Zero-Inflated Negative Binomial (ZINB) cho biến đếm vừa dư thừa số 0 vừa overdispersion, và cách chạy trong EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# ZINB — Zero-Inflated Negative Binomial

**ZINB** kết hợp ý tưởng **zero-inflation** ([ZIP](/ecolab/model/zip)) với **Negative Binomial** ([NegBin](/ecolab/model/negbin)) — phù hợp khi biến đếm **vừa có dư thừa số 0 vừa có overdispersion**. Đây là mô hình linh hoạt nhất trong nhóm biến đếm khi cả hai vấn đề cùng xuất hiện.

:::tip Khi nào dùng
Dùng ZINB khi có **excess zeros** VÀ phần đếm **phương sai > kỳ vọng**. Nếu chỉ overdispersion (không dư zero) ⇒ NegBin; chỉ dư zero (không overdispersion) ⇒ ZIP.
:::

---

## Đặc tả

Giống ZIP nhưng phần đếm theo **Negative Binomial** (có tham số phân tán $\alpha$):

$$
P(Y_i = 0) = \pi_i + (1-\pi_i)\,(1+\alpha\mu_i)^{-1/\alpha}
$$

với $\pi_i$ là phần "luôn 0" (logit/probit), phần đếm NegBin có $\mu_i = \exp(X_i\beta)$.

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Dữ liệu đếm* → **ZINB**.
2. Khai báo biến **phần đếm** và **phần inflation**.
3. Chạy; so sánh AIC/BIC/Vuong với ZIP & NegBin để chọn mô hình; xuất **mã tái lập**.

---

## Minh họa mã tái lập

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* === Zero-Inflated Negative Binomial (ZINB) ===
zinb patents rd_spend firm_size, inflate(small_firm) vuong

* inflate(): biến dự báo nhóm "luôn 0"
* vuong: kiểm định Vuong so sánh ZINB vs NegBin chuẩn

* Đọc kết quả:
*   - Phần đếm (NegBin): hệ số + alpha (overdispersion)
*   - Phần inflation (Logit): hệ số small_firm
*   - Vuong test: z > 1.96 ⇒ ZINB phù hợp hơn NegBin

* So sánh AIC/BIC với các mô hình khác
estimates stats
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# === Zero-Inflated Negative Binomial (ZINB) ===
library(pscl)

model <- zeroinfl(
  patents ~ rd_spend + firm_size | small_firm,
  data = df,
  dist = "negbin"
)
summary(model)

# So sánh AIC với ZIP, NegBin, Poisson
zip_model <- zeroinfl(patents ~ rd_spend + firm_size | small_firm,
                      data = df, dist = "poisson")
library(MASS)
nb_model <- glm.nb(patents ~ rd_spend + firm_size, data = df)
pois_model <- glm(patents ~ rd_spend + firm_size, family = poisson, data = df)

AIC(pois_model, nb_model, zip_model, model)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# === Zero-Inflated Negative Binomial (ZINB) ===
import statsmodels.api as sm

X = sm.add_constant(df[["rd_spend", "firm_size"]])
Z = sm.add_constant(df[["small_firm"]])  # biến inflation
y = df["patents"]

model = sm.ZeroInflatedNegativeBinomialP(
    endog      = y,
    exog       = X,
    exog_infl  = Z,
    inflation  = "logit"
).fit()

print(model.summary())

# So sánh AIC với các mô hình khác
pois = sm.GLM(y, X, family=sm.families.Poisson()).fit()
nb   = sm.GLM(y, X, family=sm.families.NegativeBinomial()).fit()
zip_m = sm.ZeroInflatedPoisson(y, X, exog_infl=Z).fit()

print(f"\nAIC Poisson: {pois.aic:.2f}")
print(f"AIC NegBin:  {nb.aic:.2f}")
print(f"AIC ZIP:     {zip_m.aic:.2f}")
print(f"AIC ZINB:    {model.aic:.2f}")
```

  </TabItem>
</Tabs>

---

## Hạn chế

- Nhiều tham số ⇒ cần mẫu lớn; rủi ro **quá khớp**.
- Diễn giải phức tạp; chọn mô hình nên dựa trên lý thuyết + tiêu chuẩn thông tin.

## Video minh họa

<VideoTutorial
  title="Hướng dẫn chạy Zero-Inflated Negative Binomial (ZINB) trong EcoLab"
  src="https://www.youtube.com/embed/m3wyHeBOfUE"
/>

## Xem thêm

- [ZIP](/ecolab/model/zip) · [Negative Binomial](/ecolab/model/negbin) · [Poisson](/ecolab/model/poisson) · [Danh mục](/ecolab/model/group)

