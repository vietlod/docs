---
title: 'FDI and economic growth in Vietnam (ARDL)'
sidebar_position: 1
description: A full hands-on walkthrough in EcoLab — studying the impact of FDI on Vietnam's economic growth (1990–2023) with an ARDL model, from idea to a report with replication code.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Worked example: FDI and economic growth in Vietnam (ARDL)

This page illustrates EcoLab's **entire 5-step research workflow** through a topic familiar to graduate students and PhD candidates in economics: *the impact of foreign direct investment (FDI) on Vietnam's economic growth*. The goal is to show how to go from a research question to a report with **replication code** — not to publish official empirical findings. The figures in the results section are **format illustrations**.

> Summary: with a national time series for 1990–2023 and variables of mixed I(0)/I(1) order of integration, the [ARDL model](/en/ecolab/model/ardl) is a suitable choice to estimate both the long-run and short-run relationships between FDI and growth.

---

## Step 1 — Ideation

- **Research question:** Does FDI promote Vietnam's economic growth in the long run, and how fast does the economy adjust to equilibrium?
- **Context:** Vietnam has attracted FDI strongly since the 1990s; the FDI–growth relationship is still debated in terms of sign and magnitude.
- **Intended contribution:** test FDI–growth cointegration for an updated period, controlling for trade openness and inflation.

In the **Ideation** module, enter keywords ("FDI", "economic growth", "Vietnam", "ARDL") so the system suggests questions, gaps and preliminary variables.

---

## Step 2 — Literature Review

In the **Literature Review** module, EcoLab finds and synthesizes related papers, standardizes citations (APA/Harvard…) and clarifies:

- **Theoretical framework:** endogenous growth theory, the technology-spillover role of FDI.
- **Gap:** a lack of updated ARDL studies using recent Vietnamese data with full controls.
- **Proposed variables:** the dependent and explanatory/control variables (see Step 3).

---

## Step 3 — Data Collection

| Variable | Symbol | Measurement | Source |
| :--- | :--- | :--- | :--- |
| GDP growth | `growth` | Annual % change in real GDP | World Bank WDI; GSO Vietnam |
| FDI intensity | `fdi` | Net FDI / GDP (%) | World Bank WDI; [EcoData](/en/ecodata/overview) |
| Trade openness | `open` | (Exports + Imports)/GDP (%) | World Bank WDI; Vietnam Customs |
| Inflation | `inf` | Annual % change in CPI | World Bank WDI; GSO |

- **Period:** 1990–2023 (annual data).
- In EcoLab, connect **EcoData** or public sources to extract, merge by year, clean, and view **descriptive statistics** before estimation.

---

## Step 4 — Modeling

1. **Unit-root tests** (ADF/PP/KPSS) for each variable to confirm no variable is I(2) — the condition for using ARDL.
2. Choose the *Time Series* group → **ARDL**; set `growth` as the dependent variable and `fdi`, `open`, `inf` as regressors.
3. Let the system pick lags by **AIC/BIC**.
4. Run the **bounds test** to conclude on cointegration; review the long-run coefficients and the **ECM**.

**Illustrative results (format — not real results):**

| Component | Coefficient | Std. error | p-value |
| :--- | :--- | :--- | :--- |
| Long run: fdi | 0.42 | 0.15 | 0.012 |
| Long run: open | 0.08 | 0.04 | 0.061 |
| Long run: inf | −0.05 | 0.03 | 0.089 |
| ECM ($\alpha$) | −0.55 | 0.13 | 0.001 |
| Bounds F-stat | 6.10 | above upper I(1) bound | cointegrated |

Sample interpretation: a negative, significant ECM coefficient confirms a long-run relationship; FDI has a positive long-run effect on growth in this illustrative specification.

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* --- FDI & Growth: ARDL ---
tsset year

* Estimate ARDL with automatic lag selection
ardl growth fdi open inf, lags(. 2 2 2)

* Bounds test for cointegration
estat btest

* Error Correction Model
ardl growth fdi open inf, lags(. 2 2 2) ec

* Diagnostics
estat bgodfrey
estat hettest
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# --- FDI & Growth: ARDL ---
library(ARDL)

# Estimate ARDL
model <- ardl(growth ~ fdi + open + inf, data = df,
              order = c(2, 2, 2, 2))
summary(model)

# Bounds test
bounds <- bounds_f_test(model, case = 3)
print(bounds)

# Error Correction Model (long-run & ECM)
ecm <- recm(model, case = 3)
summary(ecm)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
from statsmodels.tsa.ardl import ARDL

# Estimate ARDL(2, 2, 2, 2)
y = df['growth']
X = df[['fdi', 'open', 'inf']]

model = ARDL(endog=y, lags=2, exog=X, order=2)
result = model.fit()
print(result.summary())

# Review AIC/BIC for lag selection
print("AIC:", result.aic, " BIC:", result.bic)
```

  </TabItem>
</Tabs>

---

## Step 5 — Reporting

In the **Reporting** module, EcoLab produces an academic draft (APA 7th, Chicago, Harvard, IEEE or MLA) including: introduction, literature review, data & methodology, results, discussion, and a **replication-code appendix** (Stata/R/Python). You download it and continue refining it for your journal or committee.

---

## Reproducibility and verification

Every estimation step is generated by EcoLab as **complete source code** in Stata, R or Python under the **Replication Code** tab. You can re-run it independently on your local machine to verify, ensuring the results are **transparent and reproducible** — a core requirement for academic publishing.

---

## Video tutorial

<VideoTutorial
  title="Running ARDL in EcoLab"
  src="https://www.youtube.com/user/vietlod"
/>

## See also

- [ARDL Model](/en/ecolab/model/ardl) — details of the assumptions and the bounds test
- [FEM and REM](/en/ecolab/model/fem-rem) — if extending to multi-province/multi-country panel data
- [EcoLab Overview](/en/ecolab/overview) · [Estimation & Modeling](/en/ecolab/econometrics-modeling)
