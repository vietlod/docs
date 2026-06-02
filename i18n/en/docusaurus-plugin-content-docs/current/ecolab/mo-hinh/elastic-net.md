---
title: Elastic Net — L1 + L2
sidebar_position: 3
description: Elastic Net combines the L1 (Lasso) and L2 (Ridge) penalties to both select variables and handle highly correlated variable groups, and how to run it in EcoLab.
---

# Elastic Net — L1 + L2 regularization

**Elastic Net** combines the **L1 penalty** ([Lasso](/en/ecolab/mo-hinh/lasso)) and the **L2 penalty** ([Ridge](/en/ecolab/mo-hinh/ridge)). It both **selects variables** (like Lasso) and handles **highly correlated variable groups** well (like Ridge) — fixing Lasso's instability under correlation.

:::tip When to use
Use Elastic Net when you have **many variables** and there are **groups of highly correlated variables** that you want to keep/drop together rather than picking one at random.
:::

---

## Model specification

$$
\min_{\beta} \; \sum_{i=1}^{n} (Y_i - X_i \beta)^2 + \lambda \left[ \alpha \sum_{j} |\beta_j| + (1-\alpha) \sum_{j} \beta_j^2 \right]
$$

- $\alpha \in [0,1]$ is the **mixing ratio**: $\alpha = 1$ ⇒ Lasso; $\alpha = 0$ ⇒ Ridge.
- $\lambda$ controls the total penalty.

---

## Running in EcoLab

1. **Modeling** module → *Regularized regression* family → **Elastic Net**.
2. Select $Y$, the $X$ variables; **standardize**; choose $\alpha$ and $\lambda$ (2-D grid CV).
3. Read the retained variables + coefficients; export the **replication code**.

---

## Limitations

- Has **two tuning parameters** ($\alpha$, $\lambda$) ⇒ heavier CV.
- Still a **prediction-oriented** method; causal interpretation requires care.

## See also

- [Ridge](/en/ecolab/mo-hinh/ridge) · [Lasso](/en/ecolab/mo-hinh/lasso) · [Adaptive Lasso](/en/ecolab/mo-hinh/adaptive-lasso) · [Catalog](/en/ecolab/mo-hinh/danh-muc)
