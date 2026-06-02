---
title: 'Example: Corporate default probability (Logit)'
sidebar_position: 4
description: Hands-on Logit in EcoLab — predicting corporate default probability from financial ratios, reading odds ratios and marginal effects.
---

# Example: Corporate default probability (Logit)

This illustrates [Logit](/en/ecolab/mo-hinh/logit) for a binary outcome: predicting the **probability of default** ($Y=1$ if default) from financial ratios. Figures are **illustrative**.

> Summary: regress the binary `default` on leverage, profitability and liquidity; interpret via **odds ratios** and **marginal effects**.

---

## Step 1 — Ideation
- **Question:** which financial ratios raise default probability, and by how much?

## Step 2 — Literature Review
Early-warning credit-risk models (Altman Z-score, hazard models); clarify variables and threshold.

## Step 3 — Data Collection

| Variable | Symbol | Measurement | Source |
| :--- | :--- | :--- | :--- |
| Default | `default` | 1 = default, 0 = not | listed-firm statements |
| Leverage | `leverage` | Debt/Total assets | financials |
| Profitability | `roa` | Net income/Total assets | financials |
| Liquidity | `current` | Current assets/Current liab. | financials |

## Step 4 — Modeling

Choose the *Limited dependent variable* family → **Logit**:

$$
P(default_i = 1) = \frac{1}{1 + e^{-(\beta_0 + \beta_1 leverage_i + \beta_2 roa_i + \beta_3 current_i)}}
$$

**Illustrative results (format — not real results):**

| Variable | Coefficient | Odds ratio | AME | p-value |
| :--- | :--- | :--- | :--- | :--- |
| leverage | 1.45 | 4.26 | 0.21 | 0.000 |
| roa | −3.10 | 0.045 | −0.28 | 0.000 |
| current | −0.60 | 0.55 | −0.07 | 0.012 |
| AUC | 0.84 | | | |

Sample interpretation: high leverage **raises** default odds (OR ≈ 4.3); higher ROA and liquidity **reduce** risk; AUC 0.84 indicates good classification.

## Step 5 — Reporting
Export a report + **replication code**; include the classification table and ROC curve.

## See also
- [Logit](/en/ecolab/mo-hinh/logit) · [Probit](/en/ecolab/mo-hinh/probit) · [Catalog](/en/ecolab/mo-hinh/danh-muc)
