---
title: Tobit — Censored regression
sidebar_position: 3
description: The Tobit model for a censored dependent variable, e.g. spending/hours bounded at zero, and how to run it in EcoLab.
---

# Tobit — Censored regression

**Tobit** handles a **censored** dependent variable — values are observed within a range but pile up (mass point) at a threshold. A classic example: spending on an item, overtime hours, investment — many observations are **0** while the latent variable could be negative.

:::tip Censored vs truncated
**Censored (Tobit)**: the unit at the threshold is still observed (value piled at the threshold). **Truncated** ([Truncated Regression](/en/ecolab/mo-hinh/truncated)): units beyond the threshold **do not appear** in the sample.
:::

---

## Model specification

Latent variable $Y_i^{*} = X_i \beta + \varepsilon_i$, observed:

$$
Y_i = \begin{cases} Y_i^{*} & \text{if } Y_i^{*} > 0 \\ 0 & \text{if } Y_i^{*} \le 0 \end{cases}
$$

Estimated by **MLE**. OLS on censored data yields **biased** coefficients.

---

## Running in EcoLab

1. **Modeling** module → *Limited dependent variable* family → **Tobit**.
2. Select $Y$ (with a censoring threshold, e.g. piled at 0) and the $X$ variables; declare the **threshold**.
3. Run; read coefficients + **marginal effects** (censored/uncensored); export the **replication code**.

---

## Limitations

- Sensitive to the **normality & homoskedasticity** assumptions of the error.
- If the "participate or not" mechanism differs from the "how much" mechanism, consider [Heckman](/en/ecolab/mo-hinh/heckman) (two-part/selection).

## See also

- [Truncated Regression](/en/ecolab/mo-hinh/truncated) · [Heckman](/en/ecolab/mo-hinh/heckman) · [Catalog](/en/ecolab/mo-hinh/danh-muc)
