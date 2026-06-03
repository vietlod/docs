---
title: WLS — Weighted Least Squares
sidebar_position: 2
description: WLS (Weighted Least Squares) regression for known heteroskedasticity, the weighting formula, and how to run WLS in EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# WLS — Weighted Least Squares

**WLS (Weighted Least Squares)** is a variant of [OLS](/en/ecolab/model/ols) used when there is **heteroskedasticity** whose structure is known (or can be estimated). WLS assigns **weights** inversely proportional to the error variance to restore estimation efficiency.

:::tip When to use
Use WLS when the error variance is **non-constant but has a known structure** (e.g., variance proportional to a variable). If you only need robust inference without knowing the structure, use OLS + **robust standard errors**.
:::

---

## Model specification

WLS minimizes the **weighted** sum of squared residuals with weights $w_i$:

$$
\min_{\beta} \sum_{i=1}^{n} w_i \, (Y_i - X_i \beta)^2, \qquad w_i = \frac{1}{\sigma_i^2}
$$

The optimal weight is the inverse of the error variance $\sigma_i^2$. When all $w_i$ are equal, WLS reduces to OLS.

---

## Assumptions & notes

- You must **know or correctly estimate** the variance structure $\sigma_i^2$; wrong weights can make results worse than OLS.
- If the variance must be estimated from data, you have [FGLS](/en/ecolab/model/gls) (Feasible GLS).
- Still requires exogeneity ($E[\varepsilon \mid X] = 0$) as in OLS.

---

## Running in EcoLab

1. **Modeling** module → *Classical linear regression* family → **WLS**.
2. Select $Y$, the $X$ variables, and the **weight variable/rule** (e.g., $1/x$, $1/x^2$).
3. Run and compare with OLS in the **Estimation** tab; export the **replication code**.

---

## Input / output example

**Input (illustrative):** household `spending` on `income`; variance grows with income ⇒ weights $1/\text{income}$.

**Output (format, illustrative figures — not real results):** coefficients similar to OLS but with **smaller SE** (more efficient) when the weights are correct.

---

## Replication code

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* ---- WLS: Weighted Least Squares ----
* Load data (illustrative)
use "household_data.dta", clear

* WLS with analytical weights (weight = 1/income)
regress spending x1 x2 [aweight=w]

* Compare with OLS
regress spending x1 x2
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# ---- WLS: Weighted Least Squares ----
# Load data (illustrative)
df <- read.csv("household_data.csv")

# WLS with weights inversely proportional to variance
model_wls <- lm(y ~ x1 + x2, weights = w, data = df)
summary(model_wls)

# Compare with OLS
model_ols <- lm(y ~ x1 + x2, data = df)
summary(model_ols)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# ---- WLS: Weighted Least Squares ----
import pandas as pd
import statsmodels.api as sm

# Load data (illustrative)
df = pd.read_csv("household_data.csv")

X = sm.add_constant(df[["x1", "x2"]])
y = df["y"]

# WLS: weights = 1/sigma^2
sigma2 = df["income"]  # variance proportional to income
model_wls = sm.WLS(y, X, weights=1 / sigma2).fit()
print(model_wls.summary())
```

  </TabItem>
</Tabs>

---

## Limitations

- Very sensitive to **incorrect weight choice**.
- When unsure about the variance structure, prefer OLS + robust SE or [GLS/FGLS](/en/ecolab/model/gls).

## Video tutorial

<VideoTutorial
  title="Running WLS in EcoLab"
  src="https://www.youtube.com/embed/m3wyHeBOfUE"
/>

## See also

- [OLS](/en/ecolab/model/ols) · [GLS](/en/ecolab/model/gls) · [Model catalog](/en/ecolab/model/group)

