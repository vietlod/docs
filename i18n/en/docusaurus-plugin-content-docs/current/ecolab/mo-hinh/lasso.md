---
title: Lasso — L1 regularization
sidebar_position: 2
description: Lasso regression (L1 regularization) both shrinks coefficients and performs automatic variable selection, the L1 penalty, and how to run it in EcoLab.
---

# Lasso — L1 regularized regression

**Lasso (Least Absolute Shrinkage and Selection Operator)** adds an **L1 penalty** to OLS. Unlike [Ridge](/en/ecolab/mo-hinh/ridge), Lasso can drive some coefficients **exactly to zero** — i.e. **automatic variable selection**, yielding a sparse, interpretable model.

:::tip When to use
Use Lasso when you have **many regressors** and want to **select the important subset**. When groups of variables are highly correlated, consider [Elastic Net](/en/ecolab/mo-hinh/elastic-net).
:::

---

## Model specification

$$
\min_{\beta} \; \sum_{i=1}^{n} (Y_i - X_i \beta)^2 + \lambda \sum_{j=1}^{p} |\beta_j|
$$

The L1 penalty ($\sum |\beta_j|$) produces **corner solutions** ⇒ many $\beta_j = 0$. $\lambda$ controls the sparsity level.

---

## Notes

- Choose $\lambda$ by **cross-validation**; **standardize** variables first.
- With **highly correlated** variables, Lasso tends to pick one and drop the rest (unstable) ⇒ Elastic Net fixes this.
- Post-selection inference requires care.

---

## Running in EcoLab

1. **Modeling** module → *Regularized regression* family → **Lasso**.
2. Select $Y$, the $X$ variables; enable **standardization**; choose $\lambda$ (CV).
3. Read the retained variables (non-zero coefficients) and the path; export the **replication code**.

---

## Limitations

- Unstable when variables are highly correlated.
- Selects at most $n$ variables when $p > n$.

## See also

- [Ridge](/en/ecolab/mo-hinh/ridge) · [Elastic Net](/en/ecolab/mo-hinh/elastic-net) · [Adaptive Lasso](/en/ecolab/mo-hinh/adaptive-lasso) · [Catalog](/en/ecolab/mo-hinh/danh-muc)
