---
title: ZINB — Zero-Inflated Negative Binomial
sidebar_position: 4
description: The Zero-Inflated Negative Binomial (ZINB) model for count data with both excess zeros and overdispersion, and how to run it in EcoLab.
---

# ZINB — Zero-Inflated Negative Binomial

**ZINB** combines the **zero-inflation** idea ([ZIP](/en/ecolab/mo-hinh/zip)) with **Negative Binomial** ([NegBin](/en/ecolab/mo-hinh/negbin)) — suitable when count data has **both excess zeros and overdispersion**. It is the most flexible model in the count family when both problems coexist.

:::tip When to use
Use ZINB when there are **excess zeros** AND the count part is **overdispersed** (variance > mean). If only overdispersion (no excess zeros) ⇒ NegBin; only excess zeros (no overdispersion) ⇒ ZIP.
:::

---

## Specification

Like ZIP but with the count part following a **Negative Binomial** (with dispersion parameter $\alpha$):

$$
P(Y_i = 0) = \pi_i + (1-\pi_i)\,(1+\alpha\mu_i)^{-1/\alpha}
$$

where $\pi_i$ is the "always zero" part (logit/probit) and the NegBin count part has $\mu_i = \exp(X_i\beta)$.

---

## Running in EcoLab

1. **Modeling** module → *Count data* family → **ZINB**.
2. Declare the **count-part** and **inflation-part** variables.
3. Run; compare AIC/BIC/Vuong with ZIP & NegBin to choose the model; export the **replication code**.

---

## Limitations

- Many parameters ⇒ needs a large sample; risk of **overfitting**.
- Complex interpretation; model choice should rest on theory + information criteria.

## See also

- [ZIP](/en/ecolab/mo-hinh/zip) · [Negative Binomial](/en/ecolab/mo-hinh/negbin) · [Poisson](/en/ecolab/mo-hinh/poisson) · [Catalog](/en/ecolab/mo-hinh/danh-muc)
