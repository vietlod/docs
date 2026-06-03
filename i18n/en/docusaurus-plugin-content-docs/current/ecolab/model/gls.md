---
title: GLS / FGLS — Generalized Least Squares
sidebar_position: 3
description: GLS and FGLS (Feasible GLS) regression handle heteroskedasticity and autocorrelation via the error covariance matrix, and how to run them in EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# GLS / FGLS — Generalized Least Squares

**GLS (Generalized Least Squares)** generalizes [OLS](/en/ecolab/model/ols) to handle **heteroskedasticity** and/or **autocorrelation** through the error covariance matrix $\Omega$. When $\Omega$ is unknown and must be estimated from data, we use **FGLS (Feasible GLS)**.

:::tip When to use
Use GLS/FGLS when errors have a **complex variance/correlation structure** (e.g., AR(1) autocorrelation, grouping). [WLS](/en/ecolab/model/wls) is the special case of GLS when $\Omega$ is diagonal.
:::

---

## Model specification

GLS estimates:

$$
\hat{\beta}_{GLS} = (X' \Omega^{-1} X)^{-1} X' \Omega^{-1} Y
$$

where $\Omega = \mathrm{Var}(\varepsilon \mid X)$ is the error covariance matrix. If $\Omega = \sigma^2 I$, GLS reduces to OLS.

---

## GLS vs FGLS

| | GLS | FGLS |
| :--- | :--- | :--- |
| $\Omega$ | Known | Estimated from data |
| Property | Efficient (if $\Omega$ correct) | Asymptotically efficient (large sample) |
| In practice | Rarely know $\Omega$ | More common |

---

## Running in EcoLab

1. **Modeling** module → *Classical linear regression* family → **GLS** or **FGLS**.
2. Select $Y$, the $X$ variables, and the covariance structure (e.g., AR(1), grouping).
3. Run and read the **Estimation** and **Diagnostics** tabs; export the **replication code**.

---

## Replication code

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* ---- GLS / FGLS ----
* Load panel data (illustrative)
use "panel_data.dta", clear
xtset id time

* FGLS with heteroskedastic panels and AR(1) correlation
xtgls y x1 x2, panels(hetero) corr(ar1)
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# ---- GLS / FGLS ----
library(nlme)

# Load data (illustrative)
df <- read.csv("panel_data.csv")

# GLS with AR(1) correlation and heteroskedastic variance
model_gls <- gls(y ~ x1 + x2,
                 correlation = corAR1(),
                 weights = varPower(),
                 data = df)
summary(model_gls)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# ---- GLS ----
import numpy as np
import statsmodels.api as sm

# Load data (illustrative)
import pandas as pd
df = pd.read_csv("panel_data.csv")

X = sm.add_constant(df[["x1", "x2"]])
y = df["y"]

# GLS with a known covariance matrix Omega
# (In practice, estimate Omega from OLS residuals for FGLS)
Omega = np.eye(len(y))  # placeholder — replace with estimated Omega
model_gls = sm.GLS(y, X, sigma=Omega).fit()
print(model_gls.summary())
```

  </TabItem>
</Tabs>

---

## Limitations

- FGLS can be **biased in small samples** if $\Omega$ is poorly estimated.
- If you only need robust inference, OLS + **robust/clustered** standard errors is often simpler and safer.

## Video tutorial

<VideoTutorial
  title="Running GLS in EcoLab"
  src="https://www.youtube.com/embed/m3wyHeBOfUE"
/>

## See also

- [OLS](/en/ecolab/model/ols) · [WLS](/en/ecolab/model/wls) · [Model catalog](/en/ecolab/model/group)

