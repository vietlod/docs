---
title: 'Example: Nonlinear Engel curve (GAM)'
sidebar_position: 10
description: Hands-on GAM in EcoLab — modeling the nonlinear relationship between food spending and income (the Engel curve) with smooth functions.
---

# Example: Nonlinear Engel curve (GAM)

This illustrates [GAM](/en/ecolab/mo-hinh/gam): the relationship between the **food expenditure share** and **income** (the Engel curve) is typically **nonlinear** — declining as income rises (Engel's law). GAM captures this curvature with a **smooth function** without pre-specifying the form. Figures are **illustrative**.

> Summary: use a smooth function $f(\text{income})$ to model the Engel curve, versus a linear OLS.

---

## Step 1 — Ideation
- **Question:** how does the food expenditure share change nonlinearly with income?

## Step 2 — Literature Review
Engel's law; nonparametric/semiparametric Engel-curve estimation.

## Step 3 — Data Collection
Household data (VHLSS): `food_share` (food expenditure share), `lninc` (log income/expenditure), controls for household size and region.

## Step 4 — Modeling

Choose the *Non-linear & semi-parametric* family → **GAM**; mark `lninc` as a smooth term:

$$
food\_share_i = \beta_0 + f(lninc_i) + X_i\gamma + \varepsilon_i
$$

**Illustrative results (format — not real results):**

| | Linear OLS | GAM |
| :--- | :--- | :--- |
| Relationship shape | straight line | **declining curve** (concave) |
| Adjusted $R^2$ | 0.41 | 0.52 |
| edf of f(lninc) | — | 3.8 (clearly nonlinear) |

Sample interpretation: the smooth-function plot shows the food share **falling quickly at low income then flattening** — exactly Engel's law; GAM fits better than linear OLS (edf > 1 ⇒ nonlinear).

## Step 5 — Reporting
Export a report + the **smooth-function plot** + **replication code**.

## See also
- [GAM](/en/ecolab/mo-hinh/gam) · [NLS](/en/ecolab/mo-hinh/nls) · [Catalog](/en/ecolab/mo-hinh/danh-muc)
