---
title: FEM and REM (panel data)
sidebar_position: 2
description: Fixed Effects (FEM) vs Random Effects (REM) for panel data, when to use each, the Hausman test, and how to run them in EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# FEM and REM for panel data

When data tracks **multiple units** (countries, firms, provinces) over **multiple periods**, the two most common estimators are **FEM (Fixed Effects Model)** and **REM (Random Effects Model)**. Both control for unobserved unit-specific characteristics, but they differ in their assumption about the correlation between those characteristics and the explanatory variables.

In EcoLab, FEM/REM belong to the **Panel Data** group and generate reproducible code for Stata, R and Python. See [Estimation & Modeling](/en/ecolab/econometrics-modeling).

---

## Core difference

- **FEM** assumes the unobserved unit-specific effect ($\alpha_i$) **may be correlated** with the regressors. FEM removes $\alpha_i$ through the within transformation (subtracting unit means), so it is **consistent** even under such correlation — but it **cannot estimate time-invariant** variables.
- **REM** assumes $\alpha_i$ is **uncorrelated** with the regressors and treats it as a random component. REM is **more efficient** (smaller standard errors) when the assumption holds, and it can estimate time-invariant variables — but it is **biased** if the assumption is violated.

---

## Which model should you use?

| Situation | Recommended |
| :--- | :--- |
| You suspect $\alpha_i$ correlates with regressors (endogeneity from unit characteristics) | **FEM** |
| You care about coefficients of **time-invariant** variables (gender, fixed geography) | **REM** |
| The sample is a random draw from a large population; $\alpha_i$ treated as random | **REM** |
| Uncertain | Run both and use the **Hausman test** |

---

## Model specification

$$
Y_{it} = \beta \, X_{it} + \alpha_i + u_{it}
$$

- $Y_{it}$: dependent variable of unit $i$ at period $t$.
- $X_{it}$: vector of regressors.
- $\alpha_i$: unobserved unit-specific characteristic of unit $i$.
- FEM treats $\alpha_i$ as a fixed parameter; REM treats $\alpha_i$ as a random variable with $E[\alpha_i \mid X_{it}] = 0$.

---

## The Hausman test

The Hausman test compares the FEM and REM estimates:

- **Null hypothesis H0:** REM is consistent (no correlation between $\alpha_i$ and $X$) → choose **REM** (more efficient).
- **Reject H0** (small p-value) → REM is biased → choose **FEM**.

Besides Hausman, also check: heteroskedasticity (Modified Wald), autocorrelation (Wooldridge), and cross-sectional dependence with long panels. When these issues are present, use **clustered robust standard errors**.

---

## Running in EcoLab

1. In the **Data Collection** module, obtain panel data (make sure it has an **entity** column and a **time** column).
2. In the **Modeling** module, click **Add model** → *Panel Data* group → choose *Fixed Effects* or *Random Effects*.
3. Declare the **Entity** and **Time** variables, select $Y$ and the $X$ variables.
4. Choose the standard-error structure: *Robust* or *Clustered* by unit if you suspect issues.
5. Run both FEM and REM, open the **Diagnostics** tab to view the **Hausman test** and decide on the final model.

---

## Input / output example

**Input (illustrative):** a panel of 63 provinces × 10 years with `pci` (competitiveness index), `fdi` (FDI capital), `labor` (labor force).

**Output (format, illustrative figures — not real results):**

| | FEM | REM |
| :--- | :--- | :--- |
| fdi | 0.31*** | 0.29*** |
| labor | 0.12* | 0.18** |
| Hausman p-value | — | 0.004 → choose **FEM** |

Interpretation: Hausman rejects H0 ⇒ prefer FEM; the partly time-invariant `labor` variable is less stable under FEM.

---

## Replication code

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* ---- FEM / REM with Hausman test ----
use "panel_data.dta", clear
xtset id time

* Fixed Effects (within estimator) with robust SE
xtreg y x1 x2, fe vce(robust)
estimates store fe

* Random Effects
xtreg y x1 x2, re
estimates store re

* Hausman test: FE vs RE
hausman fe re
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# ---- FEM / REM with Hausman test ----
library(plm)

# Load panel data (illustrative)
df <- read.csv("panel_data.csv")
pdata <- pdata.frame(df, index = c("id", "time"))

# Fixed Effects (within)
fe <- plm(y ~ x1 + x2, data = pdata, model = "within")
summary(fe)

# Random Effects
re <- plm(y ~ x1 + x2, data = pdata, model = "random")
summary(re)

# Hausman test
phtest(fe, re)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# ---- FEM / REM ----
import pandas as pd
from linearmodels.panel import PanelOLS, RandomEffects

# Load panel data (illustrative)
df = pd.read_csv("panel_data.csv")
df = df.set_index(["id", "time"])

y = df["y"]
X = df[["x1", "x2"]]

# Fixed Effects with entity effects
fe = PanelOLS(y, X, entity_effects=True).fit()
print(fe)

# Random Effects
re = RandomEffects(y, X).fit()
print(re)

# Compare FE vs RE results to decide
print("FE params:", fe.params.values)
print("RE params:", re.params.values)
```

  </TabItem>
</Tabs>

---

## Limitations and notes

- FEM **cannot estimate** time-invariant variables.
- REM is biased if the no-correlation assumption is violated — always check Hausman.
- "Time-wide" panels (large T) require attention to cross-sectional dependence and stationarity; consider panel time-series methods.
- With a lagged dependent variable on the right-hand side or dynamic endogeneity, consider **GMM (Arellano–Bond)**.

---

## Video tutorial

<VideoTutorial
  title="Running FEM and REM in EcoLab"
  src="https://www.youtube.com/user/vietlod"
/>

## See also

- [ARDL Model (time series)](/en/ecolab/model/ardl)
- [Worked example: Public debt and growth (panel data)](/en/ecolab/vi-du/no-cong-tang-truong-panel)
- [Estimation & Econometric Modeling](/en/ecolab/econometrics-modeling)
