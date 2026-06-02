---
title: Pooled OLS
sidebar_position: 1
description: Pooled OLS pools all panel data and runs OLS, the baseline panel model, when it is appropriate, and how to run it in EcoLab.
---

# Pooled OLS — Pooled panel regression

**Pooled OLS** pools all observations of [panel data](/en/ecolab/mo-hinh/fem-rem) (N units × T periods) into a single sample and runs [OLS](/en/ecolab/mo-hinh/ols) as if cross-sectional, **ignoring the panel structure**. It is the **baseline** for comparison with FE/RE.

:::warning Strong assumption
Pooled OLS assumes **no individual effects** ($\alpha_i$ identical across units). If unobserved unit characteristics are correlated with $X$, Pooled OLS is **biased** ⇒ use [FE](/en/ecolab/mo-hinh/fem-rem). Errors within a unit are usually correlated ⇒ use **clustered standard errors**.
:::

---

## Model specification

$$
Y_{it} = \beta_0 + X_{it}\beta + \varepsilon_{it}
$$

Like OLS but using all $N \times T$ observations. Use **clustered SE by unit**.

---

## Running in EcoLab

1. **Modeling** module → *Linear panel data* family → **Pooled OLS**.
2. Declare entity/time, $Y$, $X$; choose **clustered SE**.
3. Run; compare with FE/RE via tests; export the **replication code**.

## See also

- [FEM/REM](/en/ecolab/mo-hinh/fem-rem) · [Between](/en/ecolab/mo-hinh/between) · [Catalog](/en/ecolab/mo-hinh/danh-muc)
