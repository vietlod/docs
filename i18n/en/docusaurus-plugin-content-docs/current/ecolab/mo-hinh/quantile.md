---
title: Quantile Regression
sidebar_position: 1
description: Quantile Regression estimates effects at different quantiles of the dependent variable's distribution, unlike OLS mean regression, and how to run it in EcoLab.
---

# Quantile Regression

**Quantile Regression** estimates the effect of regressors on different **quantiles** of the distribution of $Y$ — not just the mean as in [OLS](/en/ecolab/mo-hinh/ols). It reveals how $X$ affects the "low", "median" and "high" groups differently (e.g. an effect on low-income vs high-income individuals).

:::tip When to use
Use Quantile Regression when you care about **heterogeneous effects across the distribution**, or when $Y$ is **skewed/has outliers** so the OLS mean is unrepresentative. Median regression ($\tau=0.5$) is **more robust to outliers** than OLS.
:::

---

## Model specification

The $\tau$-th conditional quantile of $Y$ given $X$:

$$
Q_{\tau}(Y_i \mid X_i) = X_i \beta(\tau)
$$

Estimated by minimizing the **asymmetrically weighted absolute errors** (check function $\rho_\tau$):

$$
\hat{\beta}(\tau) = \arg\min_{\beta} \sum_{i} \rho_{\tau}\big(Y_i - X_i\beta\big), \quad \rho_\tau(u) = u\,(\tau - \mathbb{1}[u<0])
$$

---

## Running in EcoLab

1. **Modeling** module → *Quantile regression* family → **Quantile**.
2. Select $Y$, the $X$ variables, and a **list of quantiles** $\tau$ (e.g. 0.1, 0.25, 0.5, 0.75, 0.9).
3. Run; read $\beta(\tau)$ per quantile + the quantile-process plot; **bootstrap SE**; export the **replication code**.

---

## Limitations

- SE typically requires **bootstrap**; heavier computation than OLS.
- Interpreting many quantiles is more complex than a single mean coefficient.

## See also

- [Panel Quantile (FE-QR)](/en/ecolab/mo-hinh/panel-quantile) · [OLS](/en/ecolab/mo-hinh/ols) · [Catalog](/en/ecolab/mo-hinh/danh-muc)
