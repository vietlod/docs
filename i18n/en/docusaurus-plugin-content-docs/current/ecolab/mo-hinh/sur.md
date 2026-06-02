---
title: SUR — Seemingly Unrelated Regressions
sidebar_position: 3
description: Seemingly Unrelated Regressions (SUR) estimates multiple equations with cross-equation correlated errors for efficiency, and how to run it in EcoLab.
---

# SUR — Seemingly Unrelated Regressions

**SUR (Seemingly Unrelated Regressions)** estimates **multiple equations** jointly when they **appear independent** but their **errors are correlated across equations**. By exploiting that correlation (via [GLS](/en/ecolab/mo-hinh/gls)), SUR yields **more efficient** estimates than running OLS on each equation separately.

:::tip When to use
Use SUR when **multiple equations share common shocks** (e.g. expenditure systems across goods, demand functions across sectors) — no endogeneity but correlated errors. If there is endogeneity ⇒ [3SLS](/en/ecolab/mo-hinh/3sls).
:::

---

## Model specification

A system of $m$ equations $Y_g = X_g \beta_g + \varepsilon_g$ with $\mathrm{Cov}(\varepsilon_g, \varepsilon_h) \ne 0$. SUR is estimated by **FGLS** using the cross-equation error covariance $\Sigma$:

$$
\hat{\beta}_{SUR} = \big(X'(\Sigma^{-1} \otimes I)X\big)^{-1} X'(\Sigma^{-1}\otimes I)Y
$$

When equations share the **same regressors** or errors are uncorrelated, SUR reduces to equation-by-equation OLS.

---

## Running in EcoLab

1. **Modeling** module → *IV & simultaneous equations* family → **SUR**.
2. Declare the **equations** (each with its own $Y_g$ and $X_g$).
3. Run; read system-wide coefficients + the error-correlation matrix; export the **replication code**.

---

## Limitations

- Efficiency gains are **small** when errors are weakly correlated or equations share regressors.
- Sensitive to misspecification in any equation.

## See also

- [3SLS](/en/ecolab/mo-hinh/3sls) · [IV/2SLS](/en/ecolab/mo-hinh/iv-2sls) · [Catalog](/en/ecolab/mo-hinh/danh-muc)
