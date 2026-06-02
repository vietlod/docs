---
title: 'Example: Wage inequality (Quantile)'
sidebar_position: 6
description: Hands-on quantile regression in EcoLab — returns to education differ across wage quantiles (heterogeneous effects across the distribution).
---

# Example: Wage inequality across quantiles (Quantile Regression)

This illustrates [quantile regression](/en/ecolab/mo-hinh/quantile): the return to education is **heterogeneous** between low- and high-wage groups — something [OLS](/en/ecolab/mo-hinh/ols) (mean only) cannot reveal. Figures are **illustrative**.

> Summary: estimate $\beta(\tau)$ of `educ` at quantiles $\tau$ = 0.1, 0.25, 0.5, 0.75, 0.9 to see how education affects wages differently along the distribution.

---

## Step 1 — Ideation
- **Question:** does the return to education differ between high- and low-wage groups (glass-ceiling/floor effects)?

## Step 2 — Literature Review
Wage-inequality literature; quantile effects of education.

## Step 3 — Data Collection
Labor micro data (`lnwage`, `educ`, `exper`, controls) — as in the [Mincer example](/en/ecolab/vi-du/luong-giao-duc-ols).

## Step 4 — Modeling

Choose the *Quantile regression* family → **Quantile**, with a list of $\tau$:

$$
Q_{\tau}(\ln wage_i \mid X_i) = \beta_0(\tau) + \beta_1(\tau)\,educ_i + \dots
$$

**Illustrative results — `educ` coefficient by quantile (not real results):**

| Quantile $\tau$ | $\hat{\beta}_1(\tau)$ (educ) |
| :--- | :--- |
| 0.10 | 0.061 |
| 0.50 | 0.080 |
| 0.90 | 0.103 |

Sample interpretation: the return to education **rises with the quantile** (0.061 → 0.103) ⇒ education **widens** wage inequality (a larger effect for high earners). OLS gives a single mean (~0.08) that masks this difference.

## Step 5 — Reporting
Export a report + the **quantile-process** plot + **replication code**; SE by bootstrap.

## See also
- [Quantile Regression](/en/ecolab/mo-hinh/quantile) · [Panel FE-QR](/en/ecolab/mo-hinh/panel-quantile) · [Mincer example (OLS)](/en/ecolab/vi-du/luong-giao-duc-ols)
