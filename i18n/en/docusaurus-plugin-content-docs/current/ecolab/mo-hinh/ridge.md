---
title: Ridge — L2 regularization
sidebar_position: 1
description: Ridge regression (L2 regularization) handles multicollinearity and overfitting, the L2 penalty, choosing lambda, and how to run it in EcoLab.
---

# Ridge — L2 regularized regression

**Ridge** adds an **L2 penalty** to the OLS objective to **shrink** coefficients toward zero, stabilizing estimates under **multicollinearity** or with **many regressors** (large p). Ridge does not set coefficients exactly to zero (no variable selection) but substantially reduces estimation variance.

:::tip When to use
Use Ridge when regressors are **highly correlated** (multicollinearity), making [OLS](/en/ecolab/mo-hinh/ols) unstable (inflated, sign-flipping coefficients). If you need **variable selection**, use [Lasso](/en/ecolab/mo-hinh/lasso).
:::

---

## Model specification

Ridge minimizes the residual sum of squares plus an **L2 penalty**:

$$
\min_{\beta} \; \sum_{i=1}^{n} (Y_i - X_i \beta)^2 + \lambda \sum_{j=1}^{p} \beta_j^2
$$

$\lambda \ge 0$ is the **regularization parameter**: $\lambda = 0$ ⇒ OLS; larger $\lambda$ ⇒ stronger shrinkage.

---

## Choosing lambda & notes

- Choose $\lambda$ by **cross-validation** (CV).
- **Standardize** variables first, since the penalty is scale-sensitive.
- Ridge **reduces variance** but **increases bias** (bias-variance tradeoff).

---

## Running in EcoLab

1. **Modeling** module → *Regularized regression* family → **Ridge**.
2. Select $Y$, the $X$ variables; enable **standardization**; choose $\lambda$ (or auto CV).
3. Run and read the shrunk coefficients and the shrinkage path; export the **replication code**.

---

## Limitations

- Does **not select variables** (all coefficients non-zero).
- Coefficients are harder to interpret due to shrinkage; typically used for **prediction** rather than causal inference.

## See also

- [Lasso](/en/ecolab/mo-hinh/lasso) · [Elastic Net](/en/ecolab/mo-hinh/elastic-net) · [OLS](/en/ecolab/mo-hinh/ols) · [Catalog](/en/ecolab/mo-hinh/danh-muc)
