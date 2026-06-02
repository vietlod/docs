---
title: WLS — Weighted Least Squares
sidebar_position: 2
description: WLS (Weighted Least Squares) regression for known heteroskedasticity, the weighting formula, and how to run WLS in EcoLab.
---

# WLS — Weighted Least Squares

**WLS (Weighted Least Squares)** is a variant of [OLS](/en/ecolab/mo-hinh/ols) used when there is **heteroskedasticity** whose structure is known (or can be estimated). WLS assigns **weights** inversely proportional to the error variance to restore estimation efficiency.

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
- If the variance must be estimated from data, you have [FGLS](/en/ecolab/mo-hinh/gls) (Feasible GLS).
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

## Limitations

- Very sensitive to **incorrect weight choice**.
- When unsure about the variance structure, prefer OLS + robust SE or [GLS/FGLS](/en/ecolab/mo-hinh/gls).

## See also

- [OLS](/en/ecolab/mo-hinh/ols) · [GLS](/en/ecolab/mo-hinh/gls) · [Model catalog](/en/ecolab/mo-hinh/danh-muc)
