---
title: 'Example: Inflation forecasting with many predictors (Lasso)'
sidebar_position: 8
description: Hands-on Lasso/Elastic Net in EcoLab — forecasting inflation from many macro predictors, automatic variable selection and avoiding overfitting.
---

# Example: Inflation forecasting with many predictors (Lasso / Elastic Net)

This illustrates the [regularization](/en/ecolab/mo-hinh/lasso) family: with **many macro predictors** (money supply, exchange rate, oil price, interest rate, lags…), [OLS](/en/ecolab/mo-hinh/ols) easily **overfits** and suffers multicollinearity. [Lasso](/en/ecolab/mo-hinh/lasso)/[Elastic Net](/en/ecolab/mo-hinh/elastic-net) **select variables automatically** and shrink coefficients. Figures are **illustrative**.

> Summary: use Lasso/Elastic Net to select the best set of predictors for out-of-sample inflation forecasting.

---

## Step 1 — Ideation
- **Question:** which macro variables are actually useful for forecasting inflation, and how does the out-of-sample model perform?

## Step 2 — Literature Review
Inflation forecasting, data-rich (many-predictor) forecasting, regularization.

## Step 3 — Data Collection
Monthly/quarterly series: `cpi` (inflation) and **20–50 candidate variables** (`m2`, `er`, `oil`, `rate`, output, expectations, lags…) from [EcoData](/en/ecodata/overview)/World Bank/FRED.

## Step 4 — Modeling

Choose the *Regularized regression* family → **Lasso** (or **Elastic Net** for correlated groups); **standardize** variables; select $\lambda$ by cross-validation.

$$
\min_{\beta} \sum_{t} (cpi_t - X_t\beta)^2 + \lambda \sum_j |\beta_j|
$$

**Illustrative results (format — not real results):**

| | OLS (all variables) | Lasso |
| :--- | :--- | :--- |
| Non-zero variables | 45 | 8 |
| Out-of-sample RMSE | 1.00 (normalized) | 0.78 |
| Retained variables | — | m2_lag, oil, er, rate… |

Sample interpretation: Lasso keeps **8/45 variables** and **lowers out-of-sample RMSE** vs full OLS ⇒ a sparse model with better forecasts and easier interpretation.

## Step 5 — Reporting
Export a report + the shrinkage path over $\lambda$ + **replication code**.

:::warning Note
Regularization is **prediction-oriented**, not causal inference; coefficients are shrunk. For inference, combine with theory or [Adaptive Lasso](/en/ecolab/mo-hinh/adaptive-lasso).
:::

## See also
- [Lasso](/en/ecolab/mo-hinh/lasso) · [Elastic Net](/en/ecolab/mo-hinh/elastic-net) · [Ridge](/en/ecolab/mo-hinh/ridge) · [Catalog](/en/ecolab/mo-hinh/danh-muc)
