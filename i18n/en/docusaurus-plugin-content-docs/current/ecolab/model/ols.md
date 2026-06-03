---
title: OLS — Ordinary Least Squares
sidebar_position: 1
description: What OLS (Ordinary Least Squares) regression is, the Gauss-Markov assumptions, diagnostics, robust standard errors, and how to run OLS in EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# OLS — Ordinary Least Squares regression

**OLS (Ordinary Least Squares)** is the foundational linear regression model; it estimates coefficients by **minimizing the sum of squared residuals**. It is the starting point of most empirical analysis and the baseline against which more complex estimators are compared.

:::tip When to use
OLS suits **cross-section data** with a continuous dependent variable and a relationship linear in parameters. If assumptions are violated (heteroskedasticity, endogeneity, panel structure…), switch to an appropriate estimator.
:::

---

## Model specification

$$
Y_i = \beta_0 + \beta_1 X_{1i} + \dots + \beta_k X_{ki} + \varepsilon_i
$$

The OLS estimator (matrix form): $\hat{\beta} = (X'X)^{-1} X'Y$, the solution to $\min_{\beta} \sum_{i=1}^{n} \varepsilon_i^2$.

---

## Gauss-Markov assumptions

1. **Linear in parameters** and correctly specified.
2. **Zero conditional mean**: $E[\varepsilon_i \mid X] = 0$ (exogeneity).
3. **Homoskedasticity**: $\mathrm{Var}(\varepsilon_i) = \sigma^2$.
4. **No autocorrelation** among errors.
5. **No perfect multicollinearity** among regressors.

When 1–5 hold, OLS is **BLUE** (Best Linear Unbiased Estimator).

---

## Diagnostics & remedies

| Issue | Test | Remedy |
| :--- | :--- | :--- |
| Heteroskedasticity | Breusch-Pagan, White | **Robust SE (HC0–HC3)** |
| Autocorrelation | Durbin-Watson, Breusch-Godfrey | Newey-West / [GLS](/en/ecolab/model/gls) |
| Multicollinearity | VIF | Drop variable / [Ridge, Lasso](/en/ecolab/model/group) |
| Endogeneity | Hausman | [IV/2SLS](/en/ecolab/model/group) |
| Non-normal residuals | Jarque-Bera | Transform / large sample |

:::info Robust standard errors
When heteroskedasticity is suspected, choose **White Robust (HC0–HC3)** or **Clustered** SE for more reliable t-stats and p-values — this is exactly how EcoLab forms multiple estimators from the same model.
:::

---

## Running in EcoLab

1. **Modeling** module → *Classical linear regression* family → **OLS**.
2. Select the dependent variable $Y$ and the independent variables $X_1, \dots, X_k$.
3. Choose the standard-error structure (Homoskedastic / Robust / Clustered).
4. Run and read the **Estimation**, **Diagnostics** and **Replication Code** tabs.

---

## Input / output example

**Input (illustrative):** `wage` on `educ` (years of schooling), `exper` (experience).

**Output (format, illustrative figures — not real results):**

| Variable | Coefficient | SE (robust) | p-value |
| :--- | :--- | :--- | :--- |
| educ | 0.078 | 0.012 | 0.000 |
| exper | 0.021 | 0.006 | 0.001 |
| $R^2$ | 0.34 | | |

---

## Replication code

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* ---- OLS with robust standard errors ----
* Load data (illustrative)
use "wage_data.dta", clear

* Generate squared experience
gen exper2 = exper^2

* OLS with White robust standard errors
regress lnwage educ exper exper2, vce(robust)

* Diagnostics: Breusch-Pagan heteroskedasticity test
estat hettest

* Variance Inflation Factor (multicollinearity check)
vif
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# ---- OLS with robust standard errors ----
library(lmtest)
library(sandwich)

# Load data (illustrative)
df <- read.csv("wage_data.csv")
df$exper2 <- df$exper^2

# Fit OLS model
model <- lm(lnwage ~ educ + exper + exper2, data = df)
summary(model)

# Robust standard errors (HC1, equivalent to Stata's robust)
coeftest(model, vcov = vcovHC(model, type = "HC1"))

# Variance Inflation Factor
library(car)
vif(model)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# ---- OLS with robust standard errors ----
import pandas as pd
import statsmodels.api as sm

# Load data (illustrative)
df = pd.read_csv("wage_data.csv")
df["exper2"] = df["exper"] ** 2

# Define variables
X = sm.add_constant(df[["educ", "exper", "exper2"]])
y = df["lnwage"]

# Fit OLS with HC1 robust standard errors
model = sm.OLS(y, X).fit(cov_type="HC1")
print(model.summary())
```

  </TabItem>
</Tabs>

---

## Limitations

- Sensitive to **outliers** and functional-form misspecification.
- Not suitable when $Y$ is discrete/censored (use [Logit/Probit/Tobit](/en/ecolab/model/group)) or for panel data (use [FE/RE](/en/ecolab/model/fem-rem)).

## Video tutorial

<VideoTutorial
  title="Running OLS in EcoLab"
  src="https://www.youtube.com/user/vietlod"
/>

## See also

- [WLS](/en/ecolab/model/wls) · [GLS](/en/ecolab/model/gls) · [Model catalog](/en/ecolab/model/group)
- [Estimation & Modeling](/en/ecolab/econometrics-modeling)
