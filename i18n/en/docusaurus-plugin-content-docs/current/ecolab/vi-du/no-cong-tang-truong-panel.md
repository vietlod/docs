---
title: 'Public debt and growth (panel data)'
sidebar_position: 2
description: A full hands-on walkthrough in EcoLab — analyzing the impact of public debt on economic growth with cross-country panel data, comparing FEM/REM and System GMM, from idea to report.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Worked example: Public debt and economic growth (panel data)

This page illustrates EcoLab's **5-step workflow** for a common panel-data topic: *the impact of public debt on economic growth*. The focus is how to choose between [FEM/REM](/en/ecolab/model/fem-rem) and [dynamic GMM](/en/ecolab/model/gmm) when the model is dynamic and endogeneity is suspected. The figures in the results are **format illustrations**, not official empirical findings.

> Summary: with a panel of many countries × many years and a dynamic growth model (with a lagged growth term), **System GMM** is usually preferable to FEM because it controls for endogeneity and the Nickell bias.

---

## Step 1 — Ideation

- **Research question:** How does public debt (debt/GDP) affect growth, and is there a nonlinear threshold?
- **Intended contribution:** test the debt–growth relationship while controlling for endogeneity with GMM on an updated sample.

## Step 2 — Literature Review

EcoLab synthesizes the literature (e.g., the debate around the 90%-of-GDP debt threshold), standardizes citations, and clarifies the gap and the variables. Framework: neoclassical plus endogenous growth theory.

## Step 3 — Data Collection

| Variable | Symbol | Measurement | Source |
| :--- | :--- | :--- | :--- |
| GDP growth | `growth` | % change in real GDP | World Bank WDI; IMF WEO |
| Public debt | `debt` | Public debt / GDP (%) | IMF; World Bank |
| Investment | `invest` | Gross fixed capital / GDP (%) | World Bank WDI |
| Trade openness | `open` | (Exports + Imports)/GDP (%) | World Bank WDI |
| Inflation | `inf` | % change in CPI | World Bank WDI |

- **Structure:** a panel of ~30–60 countries × ~20 years (large N, moderate T) — suitable for dynamic GMM.
- In EcoLab, connect [EcoData](/en/ecodata/overview) or public sources, merge variables, clean, and view descriptive statistics.

## Step 4 — Modeling

**Estimation strategy, in order:**

1. **Pooled OLS** (baseline) → **FEM/REM**; run **Hausman** to choose between FEM and REM.
2. Recognize the **dynamics** (add `growth_lag`) and **endogeneity** (debt may be endogenous) → switch to **[System GMM](/en/ecolab/model/gmm)**.
3. Mandatory GMM tests: **AR(2)**, **Hansen**, and control of the **instrument count**.

**Illustrative results (format — not real results):**

| | FEM | System GMM |
| :--- | :--- | :--- |
| growth_lag | — | 0.30*** |
| debt | −0.06** | −0.04** |
| invest | 0.22*** | 0.19*** |
| Hausman | p=0.01 → FEM | — |
| AR(2) p-value | — | 0.37 (valid) |
| Hansen p-value | — | 0.31 (valid) |

Sample interpretation: public debt has a small negative effect on growth; GMM confirms the sign after controlling for endogeneity and dynamics.

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* ---- Panel: Public debt and growth ----
use "debt_growth_panel.dta", clear
xtset country year

* Fixed Effects with robust SE
xtreg growth debt invest open, fe vce(robust)
estimates store fe

* Random Effects
xtreg growth debt invest open, re
estimates store re

* Hausman test
hausman fe re
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# ---- Panel: Public debt and growth ----
library(plm)

# Load data (illustrative)
df <- read.csv("debt_growth_panel.csv")
pdata <- pdata.frame(df, index = c("country", "year"))

# Fixed Effects
fe <- plm(growth ~ debt + invest + open,
          data = pdata, model = "within")
summary(fe)

# Random Effects
re <- plm(growth ~ debt + invest + open,
          data = pdata, model = "random")
summary(re)

# Hausman test
phtest(fe, re)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# ---- Panel: Public debt and growth ----
import pandas as pd
from linearmodels.panel import PanelOLS, RandomEffects

# Load data (illustrative)
df = pd.read_csv("debt_growth_panel.csv")
df = df.set_index(["country", "year"])

y = df["growth"]
X = df[["debt", "invest", "open"]]

# Fixed Effects with clustered SE
fe = PanelOLS(y, X, entity_effects=True).fit(
    cov_type="clustered", cluster_entity=True)
print(fe)

# Random Effects
re = RandomEffects(y, X).fit()
print(re)
```

  </TabItem>
</Tabs>

## Step 5 — Reporting

EcoLab produces a standard report (APA/Chicago/Harvard/IEEE/MLA) including data & methodology, an FEM-vs-GMM results table, diagnostics, discussion, and a **replication-code appendix** (Stata/R/Python).

---

## Reproducibility and verification

Every estimation step (FEM, REM, Hausman, System GMM with AR(2)/Hansen) is generated as **replication code** under the relevant tab so it can be re-run independently — ensuring transparency and verifiability.

---

## Video tutorial

<VideoTutorial
  title="Panel data analysis (public debt and growth) in EcoLab"
  src="https://www.youtube.com/embed/m3wyHeBOfUE"
/>

## See also

- [GMM for dynamic panels](/en/ecolab/model/gmm) · [FEM and REM](/en/ecolab/model/fem-rem)
- [Worked example: FDI and growth in Vietnam (ARDL)](/en/ecolab/vi-du/fdi-tang-truong-ardl)
- [EcoLab Overview](/en/ecolab/overview) · [Estimation & Modeling](/en/ecolab/econometrics-modeling)

