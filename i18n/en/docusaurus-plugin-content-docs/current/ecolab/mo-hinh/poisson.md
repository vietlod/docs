---
title: Poisson — Count regression
sidebar_position: 1
description: Poisson regression for count data (non-negative integers), the mean = variance assumption, overdispersion testing, and how to run it in EcoLab.
---

# Poisson — Count regression

**Poisson regression** models **count data** (non-negative integers: number of patents, doctor visits, accidents…). It uses a log link to keep the expected value positive.

:::tip When to use
Use Poisson when $Y$ is a **count**. The core assumption: **mean equals variance** (equidispersion). If the variance exceeds the mean (**overdispersion**), switch to [Negative Binomial](/en/ecolab/mo-hinh/negbin).
:::

---

## Model specification

$$
E[Y_i \mid X_i] = \exp(\beta_0 + \beta_1 X_{1i} + \dots + \beta_k X_{ki}), \qquad Y_i \sim \text{Poisson}(\mu_i)
$$

Estimated by **MLE**. Coefficients are interpreted via the **incidence rate ratio** $e^{\beta_j}$.

---

## Diagnostics

- **Overdispersion**: test whether $\text{Var}(Y) > E[Y]$ (e.g. Cameron-Trivedi test). If present ⇒ SE understated ⇒ use NegBin or Poisson with **robust SE/QMLE**.
- Excess zeros ⇒ [ZIP](/en/ecolab/mo-hinh/zip).

---

## Running in EcoLab

1. **Modeling** module → *Count data* family → **Poisson**.
2. Select the count $Y$ and the $X$ variables; add an **exposure/offset** if needed (e.g. per population).
3. Run; read IRRs; check overdispersion; export the **replication code**.

---

## Limitations

- The equidispersion assumption is often violated in practice.
- Excess zeros make Poisson fit poorly ⇒ use zero-inflated/hurdle models.

## See also

- [Negative Binomial](/en/ecolab/mo-hinh/negbin) · [ZIP](/en/ecolab/mo-hinh/zip) · [ZINB](/en/ecolab/mo-hinh/zinb) · [Catalog](/en/ecolab/mo-hinh/danh-muc)
