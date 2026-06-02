---
title: 'Example: Returns to education on wages (OLS)'
sidebar_position: 3
description: Hands-on OLS in EcoLab — estimating the Mincer wage equation (effect of schooling and experience on wages), from idea to a report with replication code.
---

# Example: Returns to education on wages (Mincer, OLS)

This illustrates EcoLab's 5-step workflow with the most classic model in labor economics: the **Mincer wage equation** estimated by [OLS](/en/ecolab/mo-hinh/ols). The figures are **format illustrations**.

> Summary: regress **log wage** on **years of schooling** and **experience** to estimate the "return to education" (the payoff to each additional year of schooling).

---

## Step 1 — Ideation
- **Question:** by what percentage does one more year of schooling raise wages?

## Step 2 — Literature Review
Human-capital theory (Becker, Mincer); standardize citations; clarify variables and the log-lin form.

## Step 3 — Data Collection

| Variable | Symbol | Measurement | Source |
| :--- | :--- | :--- | :--- |
| Log wage | `lnwage` | log(hourly/monthly wage) | VHLSS; labor survey |
| Years of schooling | `educ` | years | VHLSS |
| Experience | `exper`, `exper2` | years and squared | from age − schooling − 6 |
| Controls | `gender`, `region` | binary | VHLSS |

## Step 4 — Modeling

Mincer form (log-lin, with squared experience to capture concavity):

$$
\ln(wage_i) = \beta_0 + \beta_1\,educ_i + \beta_2\,exper_i + \beta_3\,exper_i^2 + X_i\gamma + \varepsilon_i
$$

Choose the *Classical linear regression* family → **OLS**, with **robust standard errors** (heteroskedasticity is common in micro data).

**Illustrative results (format — not real results):**

| Variable | Coefficient | SE (robust) | p-value |
| :--- | :--- | :--- | :--- |
| educ | 0.082 | 0.005 | 0.000 |
| exper | 0.031 | 0.004 | 0.000 |
| exper2 | −0.0005 | 0.0001 | 0.000 |
| $R^2$ | 0.38 | | |

Sample interpretation: $\hat{\beta}_1 = 0.082$ ⇒ each extra year of schooling is associated with about **8.2%** higher wages (approximately, given log-lin); experience is concave (rising then flattening).

## Step 5 — Reporting
Export an APA/Harvard… report with **replication code**.

:::warning Endogeneity caveat
`educ` may be **endogenous** (unobserved ability affects both schooling and wages) ⇒ OLS may be biased. See the instrumental-variables fix in [IV example: Returns to education](/en/ecolab/vi-du/iv-loi-suat-giao-duc).
:::

## See also
- [OLS](/en/ecolab/mo-hinh/ols) · [IV example](/en/ecolab/vi-du/iv-loi-suat-giao-duc) · [Catalog](/en/ecolab/mo-hinh/danh-muc)
