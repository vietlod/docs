---
title: Probit
sidebar_position: 2
description: The Probit model for a binary outcome using the standard normal CDF, how it differs from Logit, marginal effects, and how to run it in EcoLab.
---

# Probit — Normal binary regression

**Probit** models the probability of a **binary** outcome through the **standard normal cumulative distribution function** $\Phi(\cdot)$. Empirically, Probit and [Logit](/en/ecolab/mo-hinh/logit) usually lead to similar conclusions; they differ in the assumed error distribution (normal vs logistic).

:::tip Logit or Probit?
Results are usually very close. **Logit** is convenient for its **odds ratios**; **Probit** is preferred when a normal error assumption is more reasonable or within extended models (Heckman, biprobit). Always compare through **marginal effects**.
:::

---

## Model specification

$$
P(Y_i = 1 \mid X_i) = \Phi(\beta_0 + \beta_1 X_{1i} + \dots + \beta_k X_{ki})
$$

where $\Phi$ is the standard normal CDF. Estimated by **MLE**.

---

## Interpretation

- Coefficients $\beta_j$ are **not** read directly; use **marginal effects** (AME/MEM).
- Model fit: Pseudo-$R^2$, classification, AUC.

---

## Running in EcoLab

1. **Modeling** module → *Limited dependent variable* family → **Probit**.
2. Select the binary $Y$ and the $X$ variables.
3. Run; read **marginal effects**; compare with Logit; export the **replication code**.

---

## Limitations

- No odds interpretation like Logit.
- Same underlying assumptions (exogeneity, correct specification) as other binary-choice models.

## See also

- [Logit](/en/ecolab/mo-hinh/logit) · [Heckman](/en/ecolab/mo-hinh/heckman) · [Catalog](/en/ecolab/mo-hinh/danh-muc)
