---
title: OLS — Ordinary Least Squares
sidebar_position: 1
description: What OLS (Ordinary Least Squares) regression is, the Gauss-Markov assumptions, diagnostics, robust standard errors, and how to run OLS in EcoLab.
---

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
| Autocorrelation | Durbin-Watson, Breusch-Godfrey | Newey-West / [GLS](/en/ecolab/mo-hinh/gls) |
| Multicollinearity | VIF | Drop variable / [Ridge, Lasso](/en/ecolab/mo-hinh/danh-muc) |
| Endogeneity | Hausman | [IV/2SLS](/en/ecolab/mo-hinh/danh-muc) |
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

## Limitations

- Sensitive to **outliers** and functional-form misspecification.
- Not suitable when $Y$ is discrete/censored (use [Logit/Probit/Tobit](/en/ecolab/mo-hinh/danh-muc)) or for panel data (use [FE/RE](/en/ecolab/mo-hinh/fem-rem)).

## See also

- [WLS](/en/ecolab/mo-hinh/wls) · [GLS](/en/ecolab/mo-hinh/gls) · [Model catalog](/en/ecolab/mo-hinh/danh-muc)
- [Estimation & Modeling](/en/ecolab/econometrics-modeling)
