---
title: ZINB — Zero-Inflated Negative Binomial
sidebar_position: 4
description: The Zero-Inflated Negative Binomial (ZINB) model for count data with both excess zeros and overdispersion, and how to run it in EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# ZINB — Zero-Inflated Negative Binomial

**ZINB** combines the **zero-inflation** idea ([ZIP](/en/ecolab/model/zip)) with **Negative Binomial** ([NegBin](/en/ecolab/model/negbin)) — suitable when count data has **both excess zeros and overdispersion**. It is the most flexible model in the count family when both problems coexist.

:::tip When to use
Use ZINB when there are **excess zeros** AND the count part is **overdispersed** (variance > mean). If only overdispersion (no excess zeros) ⇒ NegBin; only excess zeros (no overdispersion) ⇒ ZIP.
:::

---

## Specification

Like ZIP but with the count part following a **Negative Binomial** (with dispersion parameter $\alpha$):

$$
P(Y_i = 0) = \pi_i + (1-\pi_i)\,(1+\alpha\mu_i)^{-1/\alpha}
$$

where $\pi_i$ is the "always zero" part (logit/probit) and the NegBin count part has $\mu_i = \exp(X_i\beta)$.

---

## Running in EcoLab

1. **Modeling** module → *Count data* family → **ZINB**.
2. Declare the **count-part** and **inflation-part** variables.
3. Run; compare AIC/BIC/Vuong with ZIP & NegBin to choose the model; export the **replication code**.

---

## Replication code

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* ===== ZINB — Zero-Inflated Negative Binomial =====
* Count part: patents ~ rd_spend + firm_size
* Inflation part: inflate(small_firm)
zinb patents rd_spend firm_size, inflate(small_firm) vuong

* IRR for the count part
zinb patents rd_spend firm_size, inflate(small_firm) irr

* Vuong test: significant ⇒ ZINB preferred over NegBin
* Compare AIC/BIC with ZIP and NegBin
estimates store zinb_m
quietly zip patents rd_spend firm_size, inflate(small_firm)
estimates store zip_m
quietly nbreg patents rd_spend firm_size
estimates store nb_m
estimates stats zinb_m zip_m nb_m
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# ===== ZINB — Zero-Inflated Negative Binomial =====
library(pscl)

# Count part: patents ~ rd_spend + firm_size
# Inflation part: ~ small_firm
model <- zeroinfl(patents ~ rd_spend + firm_size | small_firm,
                  data = df,
                  dist = "negbin")

summary(model)

# IRR for the count part
exp(coef(model, "count"))

# Compare AIC with ZIP and NegBin
model_zip <- zeroinfl(patents ~ rd_spend + firm_size | small_firm,
                      data = df, dist = "poisson")
library(MASS)
model_nb  <- glm.nb(patents ~ rd_spend + firm_size, data = df)

AIC(model, model_zip, model_nb)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# ===== ZINB — Zero-Inflated Negative Binomial =====
import statsmodels.api as sm
import numpy as np

# Prepare data
X = sm.add_constant(df[["rd_spend", "firm_size"]])  # count part
Z = sm.add_constant(df[["small_firm"]])              # inflation part
y = df["patents"]

# Estimate ZINB model
model = sm.ZeroInflatedNegativeBinomialP(
    y, X, exog_infl=Z
).fit()
print(model.summary())

# IRR for the count part
print("IRR (count part):")
print(np.exp(model.params[:X.shape[1]]))

# Compare AIC with ZIP and NegBin
model_zip = sm.ZeroInflatedPoisson(y, X, exog_infl=Z).fit()
model_nb  = sm.GLM(y, X,
                    family=sm.families.NegativeBinomial()).fit()

print(f"AIC ZINB:    {model.aic:.1f}")
print(f"AIC ZIP:     {model_zip.aic:.1f}")
print(f"AIC NegBin:  {model_nb.aic:.1f}")
# Lowest AIC ⇒ best-fitting model
```

  </TabItem>
</Tabs>

---

## Limitations

- Many parameters ⇒ needs a large sample; risk of **overfitting**.
- Complex interpretation; model choice should rest on theory + information criteria.

## Video tutorial

<VideoTutorial
  title="Guide to running ZINB (Zero-Inflated Negative Binomial) in EcoLab"
  src="https://www.youtube.com/embed/m3wyHeBOfUE"
/>

## See also

- [ZIP](/en/ecolab/model/zip) · [Negative Binomial](/en/ecolab/model/negbin) · [Poisson](/en/ecolab/model/poisson) · [Catalog](/en/ecolab/model/group)

