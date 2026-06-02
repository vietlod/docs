---
title: 'Example: R&D and patent counts (Count)'
sidebar_position: 5
description: Hands-on count models in EcoLab — the effect of R&D spending on a firm's patent count, Poisson vs Negative Binomial.
---

# Example: R&D and patent counts (count data)

This illustrates the [count-data](/en/ecolab/mo-hinh/poisson) family: the number of **patents** a firm files (non-negative integer) as a function of **R&D** and size. Figures are **illustrative**.

> Summary: because count data is often **overdispersed**, we compare [Poisson](/en/ecolab/mo-hinh/poisson) and [Negative Binomial](/en/ecolab/mo-hinh/negbin) and select the appropriate model.

---

## Step 1 — Ideation
- **Question:** how much does more R&D raise the patent count?

## Step 2 — Literature Review
Economics of innovation, the knowledge production function; the patents count outcome.

## Step 3 — Data Collection

| Variable | Symbol | Measurement | Source |
| :--- | :--- | :--- | :--- |
| Patent count | `patents` | count/year | IP database |
| R&D spending | `lnrd` | log R&D | financials |
| Size | `lnsize` | log assets/labor | financials |

## Step 4 — Modeling

Choose the *Count data* family → **Poisson**, test for **overdispersion**; if present ⇒ **Negative Binomial**:

$$
E[patents_i \mid X_i] = \exp(\beta_0 + \beta_1 lnrd_i + \beta_2 lnsize_i)
$$

**Illustrative results (format — not real results):**

| | Poisson | NegBin |
| :--- | :--- | :--- |
| lnrd (IRR) | 1.35*** | 1.31*** |
| lnsize (IRR) | 1.12** | 1.10** |
| Overdispersion $\alpha$ | — | 0.42 (≠0) ⇒ choose NegBin |

Sample interpretation: a 1% rise in R&D is associated with a higher expected patent count (IRR > 1); the test $\alpha \ne 0$ ⇒ **NegBin fits better than Poisson**.

## Step 5 — Reporting
Export a report + **replication code**; if there are excess zeros (many firms with 0 patents) ⇒ consider [ZINB](/en/ecolab/mo-hinh/zinb).

## See also
- [Poisson](/en/ecolab/mo-hinh/poisson) · [Negative Binomial](/en/ecolab/mo-hinh/negbin) · [ZINB](/en/ecolab/mo-hinh/zinb) · [Catalog](/en/ecolab/mo-hinh/danh-muc)
