---
title: Tobit — Censored regression
sidebar_position: 3
description: The Tobit model for a censored dependent variable, e.g. spending/hours bounded at zero, and how to run it in EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Tobit — Censored regression

**Tobit** handles a **censored** dependent variable — values are observed within a range but pile up (mass point) at a threshold. A classic example: spending on an item, overtime hours, investment — many observations are **0** while the latent variable could be negative.

:::tip Censored vs truncated
**Censored (Tobit)**: the unit at the threshold is still observed (value piled at the threshold). **Truncated** ([Truncated Regression](/en/ecolab/model/truncated)): units beyond the threshold **do not appear** in the sample.
:::

---

## Model specification

Latent variable $Y_i^{*} = X_i \beta + \varepsilon_i$, observed:

$$
Y_i = \begin{cases} Y_i^{*} & \text{if } Y_i^{*} > 0 \\ 0 & \text{if } Y_i^{*} \le 0 \end{cases}
$$

Estimated by **MLE**. OLS on censored data yields **biased** coefficients.

---

## Running in EcoLab

1. **Modeling** module → *Limited dependent variable* family → **Tobit**.
2. Select $Y$ (with a censoring threshold, e.g. piled at 0) and the $X$ variables; declare the **threshold**.
3. Run; read coefficients + **marginal effects** (censored/uncensored); export the **replication code**.

---

## Replication code

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* ===== Tobit — Censored regression =====
* Lower-censored at 0
tobit y x1 x2, ll(0)

* Marginal effects on E[Y | Y > 0] (conditional on being uncensored)
margins, dydx(*) predict(e(0, .))

* Marginal effects on E[Y*] (latent variable)
margins, dydx(*)

* Upper-censored (e.g. at 100) — if needed
* tobit y x1 x2, ul(100)
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# ===== Tobit — Censored regression =====
library(AER)

# Lower-censored at 0
model <- tobit(y ~ x1 + x2, left = 0, data = df)

summary(model)

# Log-likelihood and coefficients
logLik(model)
coef(model)

# For marginal effects, use the censReg package
library(censReg)
model_cr <- censReg(y ~ x1 + x2, left = 0, data = df)
margEff(model_cr)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# ===== Tobit — Censored regression (MLE) =====
# statsmodels does not have a built-in Tobit command;
# we use a manual MLE approach or the tobit package.

# Option 1: Using a dedicated package
# pip install tobit
from tobit import TobitModel
import pandas as pd

model = TobitModel()
model.fit(X=df[["x1", "x2"]], y=df["y"], cens=df["y"].clip(lower=0))
print(model.coef_)

# Option 2: Conceptual MLE with scipy
import numpy as np
from scipy.optimize import minimize
from scipy.stats import norm

def tobit_loglik(params, X, y, lower=0):
    beta = params[:-1]
    sigma = np.exp(params[-1])  # ensure sigma > 0
    Xb = X @ beta
    # Uncensored observations
    unc = y > lower
    ll = np.sum(norm.logpdf(y[unc], Xb[unc], sigma))
    # Censored observations (at lower bound)
    ll += np.sum(norm.logcdf((lower - Xb[~unc]) / sigma))
    return -ll

# X = sm.add_constant(df[["x1","x2"]]).values
# y = df["y"].values
# result = minimize(tobit_loglik, x0, args=(X, y, 0))
```

  </TabItem>
</Tabs>

---

## Limitations

- Sensitive to the **normality & homoskedasticity** assumptions of the error.
- If the "participate or not" mechanism differs from the "how much" mechanism, consider [Heckman](/en/ecolab/model/heckman) (two-part/selection).

## Video tutorial

<VideoTutorial
  title="Guide to running Tobit (censored regression) in EcoLab"
  src="https://www.youtube.com/embed/m3wyHeBOfUE"
/>

## See also

- [Truncated Regression](/en/ecolab/model/truncated) · [Heckman](/en/ecolab/model/heckman) · [Catalog](/en/ecolab/model/group)

