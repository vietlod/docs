---
title: Panel Quantile (FE-QR)
sidebar_position: 2
description: Quantile regression for panel data with fixed effects (FE-QR), combining quantile regression with panel structure, and how to run it in EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Panel Quantile Regression (FE-QR)

**Panel Quantile (FE-QR)** extends [quantile regression](/en/ecolab/model/quantile) to **panel data** with **fixed effects** by unit. It estimates effects at different quantiles while **controlling for unobserved unit characteristics** — combining the strengths of [FE](/en/ecolab/model/fem-rem) and quantile regression.

:::tip When to use
Use it when you have **panel data** and want **heterogeneous effects across quantiles** while removing individual effects (e.g. a policy's effect on firms at different productivity levels).
:::

---

## Model specification

$$
Q_{\tau}(Y_{it} \mid X_{it}, \alpha_i) = X_{it} \beta(\tau) + \alpha_i
$$

where $\alpha_i$ is the unit fixed effect. Common methods: Koenker (penalized FE-QR), Canay (two-step), Machado–Santos Silva (MM-QR).

---

## Running in EcoLab

1. **Modeling** module → *Quantile regression* family → **Panel Quantile**.
2. Declare **entity/time**, $Y$, $X$, and a list of quantiles $\tau$.
3. Run; read $\beta(\tau)$ by quantile; bootstrap SE; export the **replication code**.

---

## Replication code

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* --- Panel Quantile Regression (FE-QR) ---
* Requires: ssc install xtqreg
xtset id year

* Canay (2011) two-step FE quantile regression
xtqreg y x1 x2, i(id) quantile(0.5)

* Multiple quantiles
foreach q in 0.25 0.50 0.75 {
    xtqreg y x1 x2, i(id) quantile(`q')
}
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# --- Panel Quantile Regression (Canay 2011 approach) ---
library(quantreg)

# Step 1: Estimate FE via within-estimator (mean regression)
library(plm)
fe_model <- plm(y ~ x1 + x2, data = pdata, model = "within")
alpha_i   <- fixef(fe_model)

# Step 2: Remove fixed effects from dependent variable
pdata$y_tilde <- pdata$y - alpha_i[as.character(pdata$id)]

# Step 3: Standard quantile regression on demeaned data
fit_qr <- rq(y_tilde ~ x1 + x2, data = pdata,
             tau = c(0.25, 0.5, 0.75))
summary(fit_qr, se = "boot", R = 200)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
import statsmodels.api as sm
import pandas as pd

# --- Panel Quantile Regression (Canay 2011) ---
# Step 1: Demean Y by removing individual FE (within mean)
group_mean = df.groupby('id')['y'].transform('mean')
df['y_tilde'] = df['y'] - group_mean

# Step 2: Run quantile regression on demeaned data
X = sm.add_constant(df[['x1', 'x2']])
quantiles = [0.25, 0.50, 0.75]

for q in quantiles:
    res = sm.QuantReg(df['y_tilde'], X).fit(q=q)
    print(f"\n=== Quantile {q} ===")
    print(res.summary())
```

  </TabItem>
</Tabs>

---

## Limitations

- FE-QR estimation is **not unique** (multiple approaches, results may differ).
- Some methods need a large $T$; computation is heavy.

## Video tutorial

<VideoTutorial
  title="Running Panel Quantile Regression in EcoLab"
  src="https://www.youtube.com/user/vietlod"
/>

## See also

- [Quantile Regression](/en/ecolab/model/quantile) · [FEM/REM](/en/ecolab/model/fem-rem) · [Catalog](/en/ecolab/model/group)
