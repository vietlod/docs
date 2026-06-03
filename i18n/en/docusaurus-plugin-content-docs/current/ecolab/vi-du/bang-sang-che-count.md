---
title: 'R&D and patent counts (Count)'
sidebar_position: 5
description: Hands-on count models in EcoLab — the effect of R&D spending on a firm's patent count, Poisson vs Negative Binomial.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# R&D and patent counts (count data)

This illustrates the [count-data](/en/ecolab/model/poisson) family: the number of **patents** a firm files (non-negative integer) as a function of **R&D** and size. Figures are **illustrative**.

> Summary: because count data is often **overdispersed**, we compare [Poisson](/en/ecolab/model/poisson) and [Negative Binomial](/en/ecolab/model/negbin) and select the appropriate model.

---

## Step 1 — Ideation
- **Question:** how much does more R&D raise the patent count?

## Step 2 — Literature Review
Economics of innovation, the knowledge production function; the patents count outcome.

## Step 3 — Data Collection

| Variable | Symbol | Measurement | Source |
| :--- | :--- | :--- | :--- |
| Patent count | `patents` | count/year | IP database |
| R&D spending | `lnrd` | log R&D | financials |
| Size | `lnsize` | log assets/labor | financials |

## Step 4 — Modeling

Choose the *Count data* family → **Poisson**, test for **overdispersion**; if present ⇒ **Negative Binomial**:

$$
E[patents_i \mid X_i] = \exp(\beta_0 + \beta_1 lnrd_i + \beta_2 lnsize_i)
$$

**Illustrative results (format — not real results):**

| | Poisson | NegBin |
| :--- | :--- | :--- |
| lnrd (IRR) | 1.35*** | 1.31*** |
| lnsize (IRR) | 1.12** | 1.10** |
| Overdispersion $\alpha$ | — | 0.42 (≠0) ⇒ choose NegBin |

Sample interpretation: a 1% rise in R&D is associated with a higher expected patent count (IRR > 1); the test $\alpha \ne 0$ ⇒ **NegBin fits better than Poisson**.

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* ===== Count Models — Patents & R&D =====
* Poisson with robust SE
poisson patents lnrd lnsize, vce(robust)
estimates store pois

* Negative Binomial with robust SE
nbreg patents lnrd lnsize, vce(robust)
estimates store nb

* Compare AIC/BIC
estimates stats pois nb

* IRR for interpretation
nbreg patents lnrd lnsize, vce(robust) irr

* Overdispersion: the LR test of alpha at the bottom
* of nbreg output. p < 0.05 ⇒ NegBin preferred
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# ===== Count Models — Patents & R&D =====
# Poisson
pois <- glm(patents ~ lnrd + lnsize,
            data   = df,
            family = poisson())

summary(pois)

# Negative Binomial
library(MASS)
nb <- glm.nb(patents ~ lnrd + lnsize, data = df)

summary(nb)

# IRR
exp(coef(nb))

# Compare AIC
AIC(pois, nb)
# Lower AIC ⇒ better fit

# Overdispersion test
library(AER)
dispersiontest(pois)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# ===== Count Models — Patents & R&D =====
import statsmodels.api as sm
import numpy as np

# Prepare data
X = sm.add_constant(df[["lnrd", "lnsize"]])
y = df["patents"]

# Poisson
pois = sm.GLM(y, X, family=sm.families.Poisson()).fit(cov_type="HC1")
print("=== Poisson ===")
print(pois.summary())
print("IRR:", np.exp(pois.params).round(4))

# Negative Binomial
nb = sm.GLM(y, X, family=sm.families.NegativeBinomial()).fit()
print("\n=== Negative Binomial ===")
print(nb.summary())
print("IRR:", np.exp(nb.params).round(4))

# Compare AIC
print(f"\nAIC Poisson: {pois.aic:.1f}")
print(f"AIC NegBin:  {nb.aic:.1f}")

# Overdispersion check
print(f"Dispersion (Poisson): {pois.pearson_chi2 / pois.df_resid:.2f}")
# Value >> 1 indicates overdispersion ⇒ prefer NegBin
```

  </TabItem>
</Tabs>

## Step 5 — Reporting
Export a report + **replication code**; if there are excess zeros (many firms with 0 patents) ⇒ consider [ZINB](/en/ecolab/model/zinb).

## Video tutorial

<VideoTutorial
  title="Guide to running count models (Poisson/NegBin) in EcoLab"
  src="https://www.youtube.com/user/vietlod"
/>

## See also
- [Poisson](/en/ecolab/model/poisson) · [Negative Binomial](/en/ecolab/model/negbin) · [ZINB](/en/ecolab/model/zinb) · [Catalog](/en/ecolab/model/group)
