---
title: GLS / FGLS — Generalized Least Squares
sidebar_position: 3
description: GLS and FGLS (Feasible GLS) regression handle heteroskedasticity and autocorrelation via the error covariance matrix, and how to run them in EcoLab.
---

# GLS / FGLS — Generalized Least Squares

**GLS (Generalized Least Squares)** generalizes [OLS](/en/ecolab/mo-hinh/ols) to handle **heteroskedasticity** and/or **autocorrelation** through the error covariance matrix $\Omega$. When $\Omega$ is unknown and must be estimated from data, we use **FGLS (Feasible GLS)**.

:::tip When to use
Use GLS/FGLS when errors have a **complex variance/correlation structure** (e.g., AR(1) autocorrelation, grouping). [WLS](/en/ecolab/mo-hinh/wls) is the special case of GLS when $\Omega$ is diagonal.
:::

---

## Model specification

GLS estimates:

$$
\hat{\beta}_{GLS} = (X' \Omega^{-1} X)^{-1} X' \Omega^{-1} Y
$$

where $\Omega = \mathrm{Var}(\varepsilon \mid X)$ is the error covariance matrix. If $\Omega = \sigma^2 I$, GLS reduces to OLS.

---

## GLS vs FGLS

| | GLS | FGLS |
| :--- | :--- | :--- |
| $\Omega$ | Known | Estimated from data |
| Property | Efficient (if $\Omega$ correct) | Asymptotically efficient (large sample) |
| In practice | Rarely know $\Omega$ | More common |

---

## Running in EcoLab

1. **Modeling** module → *Classical linear regression* family → **GLS** or **FGLS**.
2. Select $Y$, the $X$ variables, and the covariance structure (e.g., AR(1), grouping).
3. Run and read the **Estimation** and **Diagnostics** tabs; export the **replication code**.

---

## Limitations

- FGLS can be **biased in small samples** if $\Omega$ is poorly estimated.
- If you only need robust inference, OLS + **robust/clustered** standard errors is often simpler and safer.

## See also

- [OLS](/en/ecolab/mo-hinh/ols) · [WLS](/en/ecolab/mo-hinh/wls) · [Model catalog](/en/ecolab/mo-hinh/danh-muc)
