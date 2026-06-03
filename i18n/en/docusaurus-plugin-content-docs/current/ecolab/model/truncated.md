---
title: Truncated Regression
sidebar_position: 4
description: Truncated regression when the sample only contains observations above/below a threshold, how it differs from Tobit, and how to run it in EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Truncated Regression

**Truncated Regression** is used when the sample **only contains observations satisfying a threshold** — units outside the threshold **do not appear at all** in the data (unlike [Tobit](/en/ecolab/model/tobit), where threshold units are still observed with a piled value).

:::warning Truncation biases OLS
Under truncation, the in-sample error distribution **no longer has zero mean** ⇒ OLS is biased. A truncated (MLE) estimator is required to correct this.
:::

---

## Model specification

For lower truncation at $a$, the likelihood is based on the distribution **conditional on $Y > a$**:

$$
f(Y_i \mid Y_i > a) = \frac{\phi\!\left(\frac{Y_i - X_i\beta}{\sigma}\right)}{\sigma \, \Phi\!\left(\frac{X_i\beta - a}{\sigma}\right)}
$$

Estimated by **MLE**.

---

## Running in EcoLab

1. **Modeling** module → *Limited dependent variable* family → **Truncated**.
2. Select $Y$, the $X$ variables; declare the **truncation threshold** and direction (upper/lower).
3. Run; read the corrected coefficients; export the **replication code**.

---

## Replication code

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* ===== Truncated Regression =====
* Lower-truncated at 0 (observations with y ≤ 0 are absent)
truncreg y x1 x2, ll(0)

* Upper-truncated at a threshold — if needed
* truncreg y x1 x2, ul(100)

* Marginal effects
margins, dydx(*)
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# ===== Truncated Regression =====
library(truncreg)

# Lower-truncated at 0
model <- truncreg(y ~ x1 + x2,
                  data      = df,
                  point     = 0,
                  direction = "left")

summary(model)
coef(model)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# ===== Truncated Regression (MLE) =====
# No built-in command in statsmodels;
# conceptual MLE approach with scipy.

import numpy as np
from scipy.optimize import minimize
from scipy.stats import norm

def trunc_loglik(params, X, y, lower=0):
    beta = params[:-1]
    sigma = np.exp(params[-1])  # ensure sigma > 0
    Xb = X @ beta
    # Log-likelihood for truncated normal (left-truncated at lower)
    ll = np.sum(
        norm.logpdf(y, Xb, sigma)
        - np.log(1 - norm.cdf((lower - Xb) / sigma))
    )
    return -ll

# Usage:
# import statsmodels.api as sm
# X = sm.add_constant(df[["x1", "x2"]]).values
# y = df["y"].values  (only observations where y > 0)
# k = X.shape[1]
# x0 = np.zeros(k + 1)  # beta + log(sigma)
# result = minimize(trunc_loglik, x0, args=(X, y, 0), method="BFGS")
# beta_hat = result.x[:-1]
# sigma_hat = np.exp(result.x[-1])
```

  </TabItem>
</Tabs>

---

## Limitations

- Requires correct knowledge of the **threshold and truncation mechanism**.
- Sensitive to the normality assumption of the error.

## Video tutorial

<VideoTutorial
  title="Guide to running Truncated Regression in EcoLab"
  src="https://www.youtube.com/user/vietlod"
/>

## See also

- [Tobit](/en/ecolab/model/tobit) · [Heckman](/en/ecolab/model/heckman) · [Catalog](/en/ecolab/model/group)
