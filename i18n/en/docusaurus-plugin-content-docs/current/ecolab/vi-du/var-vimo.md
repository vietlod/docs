---
title: 'Example: Interest rate – inflation – output (VAR)'
sidebar_position: 9
description: Hands-on VAR in EcoLab — analyzing the dynamic interactions among interest rate, inflation and output via impulse responses (IRF) and variance decomposition.
---

# Example: Interest rate – inflation – output interactions (VAR)

This illustrates [VAR](/en/ecolab/mo-hinh/var): analyzing the **macro system dynamics** among the policy rate, inflation and output — without imposing a priori causal direction. Figures are **illustrative**.

> Summary: estimate a 3-variable VAR, read the **impulse responses (IRF)** and **variance decomposition (FEVD)** to see how an interest-rate shock propagates.

---

## Step 1 — Ideation
- **Question:** how does an interest-rate hike affect inflation and output over time?

## Step 2 — Literature Review
Monetary policy, the transmission mechanism; macro VAR/SVAR.

## Step 3 — Data Collection

| Variable | Symbol | Measurement | Source |
| :--- | :--- | :--- | :--- |
| Interest rate | `rate` | policy rate (%) | central bank; IMF |
| Inflation | `inf` | % change in CPI | GSO; World Bank |
| Output | `lny` | log real GDP / production index | GSO |

## Step 4 — Modeling

Check **stationarity** (difference if needed). Choose the *Multivariate time series* family → **VAR**; select lags by AIC/BIC:

$$
Y_t = c + A_1 Y_{t-1} + \dots + A_p Y_{t-p} + \varepsilon_t, \quad Y_t = (rate_t, inf_t, lny_t)'
$$

**Illustrative results (format — not real results):**

| Analysis | Sample result |
| :--- | :--- |
| Optimal lag | 2 (by AIC) |
| IRF: `rate` ↑ shock | `inf` falls after 2–4 periods; `lny` falls temporarily |
| Granger | `rate` → `inf` (p &lt; 0.05) |
| FEVD (lny, 10 periods) | ~25% due to interest-rate shock |

Sample interpretation: a tightening shock (rate up) **lowers inflation** after a few periods and **temporarily reduces output** — consistent with monetary transmission. To interpret structural shocks, use [SVAR](/en/ecolab/mo-hinh/svar).

## Step 5 — Reporting
Export a report + **IRF/FEVD** plots + **replication code**.

## See also
- [VAR](/en/ecolab/mo-hinh/var) · [SVAR](/en/ecolab/mo-hinh/svar) · [VECM](/en/ecolab/mo-hinh/vecm) · [Catalog](/en/ecolab/mo-hinh/danh-muc)
