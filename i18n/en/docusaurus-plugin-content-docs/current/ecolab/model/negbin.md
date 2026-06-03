---
title: Negative Binomial
sidebar_position: 2
description: Negative Binomial regression for overdispersed count data (variance > mean), how it differs from Poisson, and how to run it in EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Negative Binomial regression

**Negative Binomial (NegBin)** is a count model that handles **overdispersion** — when the **variance exceeds the mean**, a very common situation that [Poisson](/en/ecolab/model/poisson) cannot describe correctly. NegBin adds a dispersion parameter $\alpha$ to relax the equidispersion constraint.

:::tip When to use
Use NegBin when $Y$ is a **count with overdispersion** ($\text{Var}(Y) > E[Y]$). As $\alpha \to 0$, NegBin reduces to Poisson.
:::

---

## Model specification

$$
E[Y_i \mid X_i] = \mu_i = \exp(X_i \beta), \qquad \text{Var}(Y_i) = \mu_i + \alpha \, \mu_i^2
$$

The parameter $\alpha > 0$ measures **overdispersion**. Estimated by **MLE**.

---

## Diagnostics

- Test $H_0: \alpha = 0$ (NegBin vs Poisson): rejection ⇒ NegBin is more appropriate.
- If excess zeros remain ⇒ [ZINB](/en/ecolab/model/zinb).

---

## Running in EcoLab

1. **Modeling** module → *Count data* family → **Negative Binomial**.
2. Select the count $Y$, the $X$ variables, an offset if needed.
3. Run; read IRRs and $\alpha$; compare AIC/BIC with Poisson; export the **replication code**.

---

## Replication code

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* ===== Negative Binomial Regression =====
* Estimate with robust standard errors
nbreg patents rd_spend firm_size, vce(robust)

* Incidence Rate Ratios (IRR)
nbreg patents rd_spend firm_size, vce(robust) irr

* Test alpha = 0 (NegBin vs Poisson)
* The LR test of alpha is shown at the bottom of output
* p < 0.05 ⇒ NegBin preferred over Poisson

* Compare AIC/BIC
estimates store nb
quietly poisson patents rd_spend firm_size, vce(robust)
estimates store pois
estimates stats pois nb
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# ===== Negative Binomial Regression =====
library(MASS)

model <- glm.nb(patents ~ rd_spend + firm_size, data = df)

summary(model)

# Incidence Rate Ratios (IRR)
exp(coef(model))
exp(confint(model))

# Dispersion parameter (theta); alpha = 1/theta
cat("alpha (overdispersion) =", 1 / model$theta, "\n")

# Compare AIC with Poisson
model_pois <- glm(patents ~ rd_spend + firm_size,
                   data = df, family = poisson())
AIC(model_pois, model)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# ===== Negative Binomial Regression =====
import statsmodels.api as sm
import numpy as np

# Prepare data
X = sm.add_constant(df[["rd_spend", "firm_size"]])
y = df["patents"]

# Estimate Negative Binomial (NB2 parameterization)
model = sm.GLM(y, X,
               family=sm.families.NegativeBinomial()).fit()
print(model.summary())

# Incidence Rate Ratios (IRR)
print("IRR:")
print(np.exp(model.params))

# Compare AIC with Poisson
model_pois = sm.GLM(y, X, family=sm.families.Poisson()).fit()
print(f"AIC Poisson: {model_pois.aic:.1f}")
print(f"AIC NegBin:  {model.aic:.1f}")
# Lower AIC ⇒ better fit
```

  </TabItem>
</Tabs>

---

## Limitations

- Still poor when **excess zeros** arise from a separate mechanism ⇒ use zero-inflated.
- Needs a large enough sample to estimate $\alpha$ stably.

## Video tutorial

<VideoTutorial
  title="Guide to running Negative Binomial regression in EcoLab"
  src="https://www.youtube.com/user/vietlod"
/>

## See also

- [Poisson](/en/ecolab/model/poisson) · [ZIP](/en/ecolab/model/zip) · [ZINB](/en/ecolab/model/zinb) · [Catalog](/en/ecolab/model/group)
