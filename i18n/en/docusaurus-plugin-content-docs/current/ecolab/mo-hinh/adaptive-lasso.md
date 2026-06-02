---
title: Adaptive Lasso
sidebar_position: 4
description: Adaptive Lasso uses coefficient-specific weights to achieve the oracle property (consistent variable selection), how it differs from plain Lasso, and how to run it in EcoLab.
---

# Adaptive Lasso

**Adaptive Lasso** improves on [Lasso](/en/ecolab/mo-hinh/lasso) by applying **coefficient-specific weights** to the L1 penalty — penalizing important variables lightly and weak variables heavily. As a result, Adaptive Lasso enjoys the **oracle property**: it selects the correct variable set and estimates coefficients consistently in large samples.

:::tip When to use
Use Adaptive Lasso when you need **consistent variable selection** with a stronger theoretical basis than plain Lasso, especially when **inference** (not just prediction) matters.
:::

---

## Model specification

$$
\min_{\beta} \; \sum_{i=1}^{n} (Y_i - X_i \beta)^2 + \lambda \sum_{j=1}^{p} \hat{w}_j \, |\beta_j|, \qquad \hat{w}_j = \frac{1}{|\hat{\beta}_j^{init}|^{\gamma}}
$$

The weights $\hat{w}_j$ come from an initial estimate $\hat{\beta}_j^{init}$ (usually OLS or Ridge); a large initial coefficient ⇒ small weight ⇒ less penalized.

---

## Running in EcoLab

1. **Modeling** module → *Regularized regression* family → **Adaptive Lasso**.
2. Select $Y$, the $X$ variables; choose the initial estimator (OLS/Ridge), $\gamma$ and $\lambda$ (CV).
3. Read the selected variables + coefficients; export the **replication code**.

---

## Limitations

- Depends on the **initial estimate**; a poor initial (e.g., must use Ridge when $p > n$) can bias results.
- Adds a $\gamma$ parameter to tune.

## See also

- [Lasso](/en/ecolab/mo-hinh/lasso) · [Ridge](/en/ecolab/mo-hinh/ridge) · [Elastic Net](/en/ecolab/mo-hinh/elastic-net) · [Catalog](/en/ecolab/mo-hinh/danh-muc)
