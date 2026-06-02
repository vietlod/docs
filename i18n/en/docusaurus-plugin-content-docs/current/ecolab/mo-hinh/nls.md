---
title: NLS — Nonlinear Least Squares
sidebar_position: 1
description: Nonlinear Least Squares (NLS) for relationships nonlinear in parameters, e.g. growth/production functions, and how to run it in EcoLab.
---

# NLS — Nonlinear Least Squares

**NLS (Nonlinear Least Squares)** estimates models that are **nonlinear in parameters** — when the relationship cannot be linearized, e.g. logistic growth functions, CES production functions, saturation models. NLS minimizes the residual sum of squares of a nonlinear function $f(X_i, \beta)$.

:::tip When to use
Use NLS when theory prescribes a **specific nonlinear functional form** (e.g. CES, logistic). If the model is nonlinear in variables but linear in parameters (e.g. adding $X^2$), [OLS](/en/ecolab/mo-hinh/ols) still works.
:::

---

## Model specification

$$
Y_i = f(X_i, \beta) + \varepsilon_i, \qquad \hat{\beta} = \arg\min_{\beta} \sum_{i} \big(Y_i - f(X_i,\beta)\big)^2
$$

Solved by iterative algorithms (Gauss-Newton, Levenberg-Marquardt); requires reasonable **starting values**.

---

## Running in EcoLab

1. **Modeling** module → *Non-linear & semi-parametric* family → **NLS**.
2. Declare the **functional form** $f(X,\beta)$ and **starting values** for the parameters.
3. Run; check convergence + coefficients; export the **replication code**.

---

## Limitations

- Sensitive to **starting values**; may converge to a **local minimum** or fail to converge.
- Inference relies on asymptotic approximation; needs a large enough sample.

## See also

- [GAM](/en/ecolab/mo-hinh/gam) · [OLS](/en/ecolab/mo-hinh/ols) · [Catalog](/en/ecolab/mo-hinh/danh-muc)
