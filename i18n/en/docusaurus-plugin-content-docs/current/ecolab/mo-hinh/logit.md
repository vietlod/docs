---
title: Logit — Logistic regression
sidebar_position: 1
description: The Logit model for a binary dependent variable, the logistic link, odds ratios, marginal effects, and how to run it in EcoLab.
---

# Logit — Binary logistic regression

**Logit** models the probability of a **binary dependent variable** ($Y \in \{0,1\}$) through the **logistic** link. It is the standard model when the outcome is "yes/no" (default, participation, pass/fail…).

:::tip When to use
Use Logit when $Y$ is **binary**. Logit coefficients are interpreted via the **odds ratio** $e^{\beta}$; to interpret directly in probability terms, read the **marginal effects**.
:::

---

## Model specification

$$
P(Y_i = 1 \mid X_i) = \frac{1}{1 + e^{-(\beta_0 + \beta_1 X_{1i} + \dots + \beta_k X_{ki})}}
$$

Estimated by **Maximum Likelihood (MLE)**. For coefficient $\beta_j$: $e^{\beta_j}$ is the odds ratio; marginal effects depend on the value of $X$.

---

## Interpretation & diagnostics

- **Odds ratio** $e^{\beta_j} > 1$ ⇒ increases odds; $< 1$ ⇒ decreases.
- **Marginal effects** (average AME or at-the-mean MEM) give the change in probability.
- Fit: **Pseudo-$R^2$** (McFadden), classification accuracy, ROC/AUC.
- Check: perfect separation, multicollinearity.

---

## Running in EcoLab

1. **Modeling** module → *Limited dependent variable* family → **Logit**.
2. Select the binary $Y$ and the $X$ variables.
3. Run; read coefficients, **odds ratios**, **marginal effects**, AUC; export the **replication code**.

---

## Input / output example

**Input (illustrative):** `default` (0/1) on `leverage`, `roa`, `size`.

**Output (format, illustrative figures — not real results):**

| Variable | Coefficient | Odds ratio | AME | p-value |
| :--- | :--- | :--- | :--- | :--- |
| leverage | 1.20 | 3.32 | 0.18 | 0.000 |
| roa | −2.10 | 0.12 | −0.31 | 0.001 |

---

## Limitations

- Raw coefficients are **not** probability effects — use marginal effects.
- Assumes the logistic form; for the normal-CDF link see [Probit](/en/ecolab/mo-hinh/probit).

## See also

- [Probit](/en/ecolab/mo-hinh/probit) · [Tobit](/en/ecolab/mo-hinh/tobit) · [Catalog](/en/ecolab/mo-hinh/danh-muc)
