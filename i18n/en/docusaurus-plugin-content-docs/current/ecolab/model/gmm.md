---
title: GMM for dynamic panels
sidebar_position: 3
description: System GMM and Difference GMM (Arellano-Bond/Blundell-Bond) for dynamic panel data, when to use them, the AR(2) and Hansen/Sargan tests, and how to run GMM in EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# GMM for dynamic panel data

**GMM (Generalized Method of Moments)** for dynamic panels handles the case where a **lagged dependent variable** appears on the right-hand side ($Y_{t-1}$) and/or there are **endogenous regressors**. In that case FEM/REM are biased (the Nickell bias for small T); GMM uses **internal instruments** (lags of the variables themselves) to obtain consistent estimates. Two common variants: **Difference GMM** (Arellano–Bond, 1991) and **System GMM** (Arellano–Bover/Blundell–Bond, 1998).

In EcoLab, GMM belongs to the **Panel Data** group and generates reproducible Stata/R/Python code. See [FEM and REM](/en/ecolab/model/fem-rem) and [Estimation & Modeling](/en/ecolab/econometrics-modeling).

---

## When should you use dynamic GMM?

- The model is **dynamic**: it contains $Y_{t-1}$ (or several lags) among the regressors.
- The panel has **large N, small T** (many units, few periods) — typical of firm/country data.
- There are **endogenous regressors** correlated with the error, but no external instruments are available.
- You need to control for unobserved unit effects in a dynamic context.

**System GMM** is preferred when the series is close to a random walk (persistent) — then lags are weak instruments for Difference GMM.

---

## Model specification

$$
Y_{it} = \alpha \, Y_{i,t-1} + \beta \, X_{it} + \mu_i + \varepsilon_{it}
$$

- $Y_{i,t-1}$: the lagged dependent variable (source of dynamics and endogeneity with $\mu_i$).
- Difference GMM: take first differences to remove $\mu_i$, using level lags as instruments.
- System GMM: combine the difference and level equations, adding lagged differences as instruments for the level equation.

---

## Required assumptions and tests

1. **AR(2) — Arellano–Bond:** tests for second-order autocorrelation of the differenced residuals; **must not be rejected** (p > 0.05) for the instruments to be valid.
2. **Hansen/Sargan:** tests the validity of the instrument set (overidentifying restrictions); a p-value that is too high (≈1.00) signals **instrument proliferation**.
3. **Number of instruments ≤ number of groups (N):** keep the instrument count small (collapse/limit lags) to avoid weakening Hansen.
4. Distinguish **exogenous / predetermined / endogenous** variables when declaring them.

---

## Running in EcoLab

1. **Data Collection** module: prepare the dynamic panel (entity + time columns), ensuring enough lags.
2. **Modeling** module → *Panel Data* group → *GMM (Arellano–Bond / Blundell–Bond)*.
3. Declare $Y$, the lag terms, classify variables (exogenous/predetermined/endogenous), and choose Difference or System GMM.
4. Run and read the **Diagnostics** tab: AR(1)/AR(2), Hansen, instrument count. Get the code from the **Replication Code** tab.

---

## Input / output example

**Input (illustrative):** a panel of 30 countries × 15 years; `growth` is the dependent variable; `growth_lag`, `invest`, `open` are regressors.

**Output (format, illustrative figures — not real results):**

| | Coefficient | p-value |
| :--- | :--- | :--- |
| growth_lag | 0.34*** | 0.000 |
| invest | 0.21** | 0.018 |
| AR(2) p-value | 0.41 | (not rejected — valid) |
| Hansen p-value | 0.28 | (instruments valid) |
| Instruments / groups | 18 / 30 | (safe) |

---

## Replication code

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* ===== System GMM — Arellano-Bover / Blundell-Bond =====
* Panel setting
xtset country_id year

* System GMM: two-step with Windmeijer-corrected robust SE
* gmm() declares the endogenous variable and its instrument lag range
* iv() declares the strictly exogenous variable
xtabond2 growth L.growth invest open, ///
    gmm(L.growth, lag(2 4)) iv(open) ///
    twostep robust

* --- Diagnostics ---
* AR(2) p-value > 0.05 → no second-order autocorrelation (valid)
* Hansen p-value: not too low (<0.05) nor too high (≈1.00)
* Number of instruments ≤ number of groups

* Difference GMM (Arellano-Bond) for comparison
xtabond2 growth L.growth invest open, ///
    gmm(L.growth, lag(2 4)) iv(open) ///
    twostep robust noleveleq
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# ===== System GMM — Arellano-Bover / Blundell-Bond =====
library(plm)

# Prepare panel data frame
pdata <- pdata.frame(df, index = c("country_id", "year"))

# System GMM: two-step estimator
# Dependent: growth; lagged dep. var as instrument (lags 2–4)
gmm_sys <- pgmm(
  growth ~ lag(growth, 1) + invest | lag(growth, 2:4),
  data   = pdata,
  effect = "twoways",
  model  = "twosteps"
)

# Robust summary (Windmeijer-corrected SE)
summary(gmm_sys, robust = TRUE)

# --- Diagnostics ---
# AR(2) test and Sargan/Hansen test printed in summary
# Ensure: AR(2) p > 0.05, Hansen p not too low or ≈1.00
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# ===== System GMM — using pydynpd =====
# Install: pip install pydynpd
import pandas as pd
from pydynpd import regression

# df must contain: country_id, year, growth, invest, open
# pydynpd uses Arellano-Bond / Blundell-Bond internally

# System GMM command string (similar to Stata syntax)
command = (
    "growth L1.growth invest open | "
    "gmm(growth, 2 4) | "
    "iv(open) | "
    "twostep nolevel"  # remove 'nolevel' for System GMM
)

# For System GMM (both level + difference equations):
command_sys = (
    "growth L1.growth invest open | "
    "gmm(growth, 2 4) | "
    "iv(open) | "
    "twostep"
)

result = regression.abond(command_sys, df, ["country_id", "year"])

# result prints: coefficients, AR(1)/AR(2), Hansen test
# Verify: AR(2) p > 0.05, Hansen p in a reasonable range
```

  </TabItem>
</Tabs>

---

## Limitations and notes

- **Instrument proliferation** invalidates Hansen; always report the instrument count and use collapse/limited lags.
- Difference GMM is weak with highly persistent series → consider System GMM.
- Requires a large enough N; with small N, standard errors are unreliable (use the Windmeijer correction).
- Not appropriate when T is large (consider other dynamic-panel estimators).

---

## Video tutorial

<VideoTutorial
  title="Guide to running GMM (System/Difference) in EcoLab"
  src="https://www.youtube.com/user/vietlod"
/>

## See also

- [FEM and REM](/en/ecolab/model/fem-rem) · [ARDL Model](/en/ecolab/model/ardl)
- [Worked example: Public debt and growth (panel data)](/en/ecolab/vi-du/no-cong-tang-truong-panel)
- [Estimation & Econometric Modeling](/en/ecolab/econometrics-modeling)
