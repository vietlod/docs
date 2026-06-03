---
title: ARDL Model
sidebar_position: 1
description: What ARDL (Autoregressive Distributed Lag) is, when to use it, assumptions, the bounds test for cointegration, and how to run ARDL in EcoLab with time-series data.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# ARDL Model (Autoregressive Distributed Lag)

**ARDL** is a time-series regression model that combines lags of the dependent variable and lags of the independent variables in a single equation. ARDL is appropriate when variables have a **mixed** order of integration — some stationary at level I(0), some at first difference I(1) — and it allows testing for **cointegration** through the **bounds test** of Pesaran, Shin and Smith (2001).

In EcoLab, ARDL belongs to the **Time Series** group and generates reproducible code for Stata, R and Python. See also [Estimation & Modeling](/en/ecolab/econometrics-modeling) and [EcoLab Overview](/en/ecolab/overview).

---

## When should you use ARDL?

Use ARDL when all of the following hold:

- The data is **time series** (a single country/unit over time), typically a small-to-moderate sample.
- Variables are integrated of order **no higher than I(1)** (no variable is I(2)).
- The order of integration is **mixed** I(0)/I(1) — a case where Engle–Granger or Johansen is hard to apply.
- You need to estimate both the **long-run relationship** and the **short-run dynamics** via an error correction model (ECM).

**Do not use ARDL** when any variable is I(2), or when the data is multi-unit panel data (consider [FEM/REM](/en/ecolab/model/fem-rem) or panel ARDL/PMG).

---

## Model specification

General form of ARDL($p$, $q$) with one independent variable:

$$
Y_t = c + \sum_{i=1}^{p} \varphi_i \, Y_{t-i} + \sum_{j=0}^{q} \beta_j \, X_{t-j} + \varepsilon_t
$$

where $p$ is the lag order of the dependent variable $Y$ and $q$ is the lag order of the independent variable $X$. The error correction form (ARDL-ECM) separates the long-run relationship from short-run adjustment:

$$
\Delta Y_t = c + \alpha \, (Y_{t-1} - \theta \, X_{t-1}) + \sum_i \gamma_i \, \Delta Y_{t-i} + \sum_j \delta_j \, \Delta X_{t-j} + \varepsilon_t
$$

$\theta$ is the long-run coefficient; $\alpha$ (the error correction term) must be negative and statistically significant to confirm the existence of a cointegrating relationship.

---

## Assumptions and testing steps

1. **Order of integration:** unit-root tests (ADF, Phillips–Perron, KPSS) to ensure no variable is I(2).
2. **Optimal lag selection:** based on information criteria (AIC/BIC).
3. **Bounds test:** the F-statistic compared against the upper/lower critical bounds to conclude on cointegration.
4. **Diagnostics:** autocorrelation (Breusch–Godfrey), heteroskedasticity (Breusch–Pagan/White), normality of residuals (Jarque–Bera).
5. **Stability:** CUSUM and CUSUMSQ tests.

---

## Running ARDL in EcoLab

1. In the **Data Collection** module, connect [EcoData](/en/ecodata/overview) or public sources (World Bank, IMF, FRED) to obtain the time series of the dependent and independent variables.
2. In the **Modeling** module, click **Add model** → choose the *Time Series* group → *ARDL*.
3. Select the dependent variable $Y$, the independent variables $X$, and let the system pick lags by AIC/BIC (or set them manually).
4. Click **Run model**. Review the **Estimation** tab (short-run/long-run coefficients), the **Diagnostics** tab (bounds test, CUSUM), and the **Replication Code** tab for the Stata/R/Python script.

---

## Input / output example

**Input (illustrative):** annual series 1990–2023 with `growth` (GDP growth %), `fdi` (FDI/GDP %), `open` (trade openness %), `inf` (inflation %).

**Output (format, illustrative figures — not real results):**

| Component | Coefficient | Std. error | p-value |
| :--- | :--- | :--- | :--- |
| Long run: fdi | 0.42 | 0.15 | 0.012 |
| Long run: open | 0.08 | 0.04 | 0.061 |
| ECM ($\alpha$) | −0.55 | 0.13 | 0.001 |
| Bounds F-stat | 6.10 | (above upper I(1) bound) | cointegrated |

Interpretation: a negative and significant ECM coefficient confirms cointegration; the speed of adjustment toward long-run equilibrium is about 55% per year.

---

## Replication code

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* --- ARDL Model ---
tsset year

* Estimate ARDL with automatic lag selection
* lags(. 2 2 2): auto for Y, max 2 for each X
ardl growth fdi open inf, lags(. 2 2 2)

* Bounds test for cointegration (Pesaran et al. 2001)
estat btest

* Error Correction Model (ECM) form
ardl growth fdi open inf, lags(. 2 2 2) ec

* Post-estimation diagnostics
estat bgodfrey     // autocorrelation
estat hettest      // heteroskedasticity
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# --- ARDL Model ---
library(ARDL)

# Estimate ARDL with specified lag orders
model <- ardl(growth ~ fdi + open + inf, data = df,
              order = c(2, 2, 2, 2))
summary(model)

# Bounds test for cointegration
bounds <- bounds_f_test(model, case = 3)
print(bounds)

# Error Correction Model (long-run coefficients)
ecm <- recm(model, case = 3)
summary(ecm)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
from statsmodels.tsa.ardl import ARDL
import statsmodels.api as sm

# Estimate ARDL(2, 2, 2, 2)
y = df['growth']
X = df[['fdi', 'open', 'inf']]

model = ARDL(endog=y, lags=2, exog=X, order=2)
result = model.fit()
print(result.summary())

# Bounds test (manual F-test on lagged levels)
# Compare F-statistic against PSS critical values
print("AIC:", result.aic)
print("BIC:", result.bic)
```

  </TabItem>
</Tabs>

---

## Limitations and notes

- ARDL **cannot handle** I(2) variables; check beforehand with unit-root tests.
- Sensitive to lag selection; compare AIC and BIC.
- Too small a sample makes the bounds test unreliable.
- ARDL is a **single-equation** model; if you suspect multi-directional simultaneity, consider VAR/VECM.

---

## Video tutorial

<VideoTutorial
  title="Running ARDL in EcoLab"
  src="https://www.youtube.com/embed/m3wyHeBOfUE"
/>

## See also

- [Worked example: FDI and economic growth in Vietnam (ARDL)](/en/ecolab/vi-du/fdi-tang-truong-ardl)
- [FEM and REM for panel data](/en/ecolab/model/fem-rem)
- [Estimation & Econometric Modeling](/en/ecolab/econometrics-modeling)

