---
title: NLS — Nonlinear Least Squares
sidebar_position: 1
description: Nonlinear Least Squares (NLS) for relationships nonlinear in parameters, e.g. growth/production functions, and how to run it in EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# NLS — Nonlinear Least Squares

**NLS (Nonlinear Least Squares)** estimates models that are **nonlinear in parameters** — when the relationship cannot be linearized, e.g. logistic growth functions, CES production functions, saturation models. NLS minimizes the residual sum of squares of a nonlinear function $f(X_i, \beta)$.

:::tip When to use
Use NLS when theory prescribes a **specific nonlinear functional form** (e.g. CES, logistic). If the model is nonlinear in variables but linear in parameters (e.g. adding $X^2$), [OLS](/en/ecolab/model/ols) still works.
:::

---

## Model specification

$$
Y_i = f(X_i, \beta) + \varepsilon_i, \qquad \hat{\beta} = \arg\min_{\beta} \sum_{i} \big(Y_i - f(X_i,\beta)\big)^2
$$

Solved by iterative algorithms (Gauss-Newton, Levenberg-Marquardt); requires reasonable **starting values**.

---

## Running in EcoLab

1. **Modeling** module → *Non-linear & semi-parametric* family → **NLS**.
2. Declare the **functional form** $f(X,\beta)$ and **starting values** for the parameters.
3. Run; check convergence + coefficients; export the **replication code**.

---

## Replication code

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* ── NLS estimation ────────────────────────────────
* Model: y = b0 + b1 * x1^b2  (nonlinear in b2)
nl (y = {b0} + {b1} * x1^{b2}), initial(b0 1 b1 1 b2 0.5)

* View coefficients and convergence info
estimates table
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# ── NLS estimation ────────────────────────────────
# Model: y = b0 + b1 * x1^b2
model_nls <- nls(
  y ~ b0 + b1 * x1^b2,
  data  = df,
  start = list(b0 = 1, b1 = 1, b2 = 0.5)
)

summary(model_nls)

# Fitted values and residual diagnostics
fitted(model_nls)
residuals(model_nls)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# ── NLS estimation ────────────────────────────────
import numpy as np
from scipy.optimize import curve_fit

# Define the nonlinear function
def model_func(x, b0, b1, b2):
    return b0 + b1 * x ** b2

# Fit with starting values
popt, pcov = curve_fit(
    model_func,
    xdata = df["x1"].values,
    ydata = df["y"].values,
    p0    = [1, 1, 0.5]       # starting values
)

print(f"b0 = {popt[0]:.4f}")
print(f"b1 = {popt[1]:.4f}")
print(f"b2 = {popt[2]:.4f}")

# Standard errors from covariance matrix
se = np.sqrt(np.diag(pcov))
print(f"SE: {se}")
```

  </TabItem>
</Tabs>

---

## Limitations

- Sensitive to **starting values**; may converge to a **local minimum** or fail to converge.
- Inference relies on asymptotic approximation; needs a large enough sample.

## Video tutorial

<VideoTutorial
  title="Guide to running NLS in EcoLab"
  src="https://www.youtube.com/embed/m3wyHeBOfUE"
/>

## See also

- [GAM](/en/ecolab/model/gam) · [OLS](/en/ecolab/model/ols) · [Catalog](/en/ecolab/model/group)

