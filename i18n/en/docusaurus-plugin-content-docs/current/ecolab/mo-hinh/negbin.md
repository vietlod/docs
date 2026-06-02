---
title: Negative Binomial
sidebar_position: 2
description: Negative Binomial regression for overdispersed count data (variance > mean), how it differs from Poisson, and how to run it in EcoLab.
---

# Negative Binomial regression

**Negative Binomial (NegBin)** is a count model that handles **overdispersion** — when the **variance exceeds the mean**, a very common situation that [Poisson](/en/ecolab/mo-hinh/poisson) cannot describe correctly. NegBin adds a dispersion parameter $\alpha$ to relax the equidispersion constraint.

:::tip When to use
Use NegBin when $Y$ is a **count with overdispersion** ($\text{Var}(Y) > E[Y]$). As $\alpha \to 0$, NegBin reduces to Poisson.
:::

---

## Model specification

$$
E[Y_i \mid X_i] = \mu_i = \exp(X_i \beta), \qquad \text{Var}(Y_i) = \mu_i + \alpha \, \mu_i^2
$$

The parameter $\alpha > 0$ measures **overdispersion**. Estimated by **MLE**.

---

## Diagnostics

- Test $H_0: \alpha = 0$ (NegBin vs Poisson): rejection ⇒ NegBin is more appropriate.
- If excess zeros remain ⇒ [ZINB](/en/ecolab/mo-hinh/zinb).

---

## Running in EcoLab

1. **Modeling** module → *Count data* family → **Negative Binomial**.
2. Select the count $Y$, the $X$ variables, an offset if needed.
3. Run; read IRRs and $\alpha$; compare AIC/BIC with Poisson; export the **replication code**.

---

## Limitations

- Still poor when **excess zeros** arise from a separate mechanism ⇒ use zero-inflated.
- Needs a large enough sample to estimate $\alpha$ stably.

## See also

- [Poisson](/en/ecolab/mo-hinh/poisson) · [ZIP](/en/ecolab/mo-hinh/zip) · [ZINB](/en/ecolab/mo-hinh/zinb) · [Catalog](/en/ecolab/mo-hinh/danh-muc)
