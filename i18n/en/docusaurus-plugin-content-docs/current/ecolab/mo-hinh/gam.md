---
title: GAM — Generalized Additive Models
sidebar_position: 2
description: Generalized Additive Models (GAM) model smooth nonlinear relationships via splines without pre-specifying the functional form, and how to run them in EcoLab.
---

# GAM — Generalized Additive Models

**GAM (Generalized Additive Models)** model **smooth nonlinear** relationships between $Y$ and each regressor using **smooth functions (splines)** instead of linear coefficients — **without pre-specifying the functional form** as [NLS](/en/ecolab/mo-hinh/nls) requires. GAM bridges linear regression and nonparametric models.

:::tip When to use
Use GAM when you suspect a relationship is **nonlinear but of unknown shape** (e.g. a U-shaped effect of age/income). GAM produces interpretable smooth-function plots while keeping additivity.
:::

---

## Model specification

$$
g\big(E[Y_i]\big) = \beta_0 + f_1(X_{1i}) + f_2(X_{2i}) + \dots + f_k(X_{ki})
$$

where $g(\cdot)$ is a link function (identity/logit/log…) and each $f_j$ is a **smooth function** (spline) estimated from data, with a **roughness penalty** to avoid overfitting; smoothness is chosen via GCV/REML.

---

## Running in EcoLab

1. **Modeling** module → *Non-linear & semi-parametric* family → **GAM**.
2. Select $Y$, the $X$ variables, mark which use a **smooth function**; choose the link.
3. Run; view the per-variable **smooth-function plots** + effective degrees of freedom; export the **replication code**.

---

## Limitations

- Interpreted via **plots** rather than a single coefficient; harder to fit into concise causal inference.
- Assumes **additivity** (does not automatically capture interactions unless specified).

## See also

- [NLS](/en/ecolab/mo-hinh/nls) · [Quantile Regression](/en/ecolab/mo-hinh/quantile) · [Catalog](/en/ecolab/mo-hinh/danh-muc)
