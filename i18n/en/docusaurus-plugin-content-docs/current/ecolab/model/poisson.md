---
title: Poisson — Count regression
sidebar_position: 1
description: Poisson regression for count data (non-negative integers), the mean = variance assumption, overdispersion testing, and how to run it in EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Poisson — Count regression

**Poisson regression** models **count data** (non-negative integers: number of patents, doctor visits, accidents…). It uses a log link to keep the expected value positive.

:::tip When to use
Use Poisson when $Y$ is a **count**. The core assumption: **mean equals variance** (equidispersion). If the variance exceeds the mean (**overdispersion**), switch to [Negative Binomial](/en/ecolab/model/negbin).
:::

---

## Model specification

$$
E[Y_i \mid X_i] = \exp(\beta_0 + \beta_1 X_{1i} + \dots + \beta_k X_{ki}), \qquad Y_i \sim \text{Poisson}(\mu_i)
$$

Estimated by **MLE**. Coefficients are interpreted via the **incidence rate ratio** $e^{\beta_j}$.

---

## Diagnostics

- **Overdispersion**: test whether $\text{Var}(Y) > E[Y]$ (e.g. Cameron-Trivedi test). If present ⇒ SE understated ⇒ use NegBin or Poisson with **robust SE/QMLE**.
- Excess zeros ⇒ [ZIP](/en/ecolab/model/zip).

---

## Running in EcoLab

1. **Modeling** module → *Count data* family → **Poisson**.
2. Select the count $Y$ and the $X$ variables; add an **exposure/offset** if needed (e.g. per population).
3. Run; read IRRs; check overdispersion; export the **replication code**.

---

## Replication code

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* ===== Poisson — Count regression =====
* Estimate with robust standard errors
poisson patents rd_spend firm_size, vce(robust)

* Incidence Rate Ratios (IRR)
poisson patents rd_spend firm_size, vce(robust) irr

* Overdispersion test (Cameron-Trivedi)
* After estimation, check if Var(Y) >> E[Y]
estat gof

* Predicted counts
predict yhat, n
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# ===== Poisson — Count regression =====
model <- glm(patents ~ rd_spend + firm_size,
             data   = df,
             family = poisson(link = "log"))

summary(model)

# Incidence Rate Ratios (IRR)
exp(coef(model))
exp(confint(model))

# Overdispersion test
library(AER)
dispersiontest(model)

# If overdispersed, use robust SE (quasi-Poisson)
model_qp <- glm(patents ~ rd_spend + firm_size,
                 data   = df,
                 family = quasipoisson())
summary(model_qp)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# ===== Poisson — Count regression =====
import statsmodels.api as sm
import numpy as np

# Prepare data
X = sm.add_constant(df[["rd_spend", "firm_size"]])
y = df["patents"]

# Estimate Poisson with robust SE
model = sm.GLM(y, X, family=sm.families.Poisson()).fit(cov_type="HC1")
print(model.summary())

# Incidence Rate Ratios (IRR)
print("IRR:")
print(np.exp(model.params))

# Check overdispersion: Pearson chi² / df_resid >> 1 ⇒ overdispersed
print("Dispersion:", model.pearson_chi2 / model.df_resid)
```

  </TabItem>
</Tabs>

---

## Limitations

- The equidispersion assumption is often violated in practice.
- Excess zeros make Poisson fit poorly ⇒ use zero-inflated/hurdle models.

## Video tutorial

<VideoTutorial
  title="Guide to running Poisson regression in EcoLab"
  src="https://www.youtube.com/user/vietlod"
/>

## See also

- [Negative Binomial](/en/ecolab/model/negbin) · [ZIP](/en/ecolab/model/zip) · [ZINB](/en/ecolab/model/zinb) · [Catalog](/en/ecolab/model/group)
