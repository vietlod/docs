---
title: VECM Model
sidebar_position: 4
description: What VECM (Vector Error Correction Model) is, its relationship to VAR and Johansen cointegration, when to use it, the testing workflow, and how to run VECM in EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# VECM (Vector Error Correction Model)

**VECM** is a multivariate model used when several time series are **non-stationary I(1)** yet **cointegrated** — that is, a long-run equilibrium relationship exists among them. VECM extends VAR by adding an **error correction term** that captures the speed at which the variables return to long-run equilibrium after a shock.

In EcoLab, VECM belongs to the **Time Series** group. Unlike [ARDL](/en/ecolab/model/ardl) (a single equation, suitable when there is one clear dependent variable), VECM is appropriate when you suspect a **multi-directional simultaneous relationship** among the variables.

---

## When should you use VECM?

- You have **two or more variables that are all I(1)** and suspect a long-run (cointegrating) relationship.
- You care about **system dynamics** (impulse responses, variance decomposition), not just a single equation.
- Cointegration has been confirmed by the **Johansen test** (trace / max-eigenvalue).

**If all variables are I(0)** → use a plain VAR. **If they are I(1) but NOT cointegrated** → use a VAR in differences.

---

## Model specification

Reduced VECM form:

$$
\Delta Y_t = \Pi \, Y_{t-1} + \sum_i \Gamma_i \, \Delta Y_{t-i} + \varepsilon_t
$$

- $\Pi = \alpha \beta'$: the matrix $\beta$ contains the **cointegrating vectors** (long-run relationships); $\alpha$ is the **speed of adjustment**.
- **The rank of $\Pi = r$** = the number of cointegrating relationships, determined by the Johansen test.
- $\Gamma_i$: short-run dynamics.

---

## Testing workflow

1. **Unit-root tests** (ADF/PP/KPSS): confirm the variables are all I(1).
2. **Lag selection** for the base VAR (AIC/BIC/HQ).
3. **Johansen cointegration test** (trace & max-eigenvalue) → determine the rank $r$.
4. Estimate the VECM with rank $r$; check the sign and significance of $\alpha$ (error correction).
5. **Residual diagnostics**: autocorrelation (LM), normality, stability; analyze **IRF** and **variance decomposition (FEVD)**.

---

## Running in EcoLab

1. **Data Collection** module: obtain the relevant time series (same frequency).
2. **Modeling** module → *Time Series* group → *VAR/VECM*; choose the system of variables.
3. Declare the lag length and the cointegration rank (or let the system suggest them from Johansen).
4. Read the results: the long-run vector $\beta$, the adjustment coefficient $\alpha$, IRF/FEVD; get the code from the **Replication Code** tab.

---

## Input / output example

**Input (illustrative):** quarterly series of `lgdp` (log GDP), `lm2` (log money supply), `lcpi` (log price).

**Output (format, illustrative figures — not real results):**

| Component | Value | Note |
| :--- | :--- | :--- |
| Johansen trace (r=0) | rejected | at least one relationship |
| Johansen trace (r≤1) | not rejected | r = 1 |
| $\alpha$ (lgdp) | −0.18*** | adjusts toward equilibrium |
| Long-run vector $\beta$ | lgdp − 0.7·lm2 + 0.5·lcpi | equilibrium relationship |

---

## Replication code

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* --- VECM ---
tsset time

* Step 1: Johansen cointegration rank test
vecrank y1 y2 y3, lags(2)

* Step 2: Estimate VECM with rank r = 1
vec y1 y2 y3, rank(1) lags(2)

* Long-run cointegrating vector (beta)
* Speed-of-adjustment coefficients (alpha)

* IRF from VECM
irf create vecirf, set(vec_irf) step(20)
irf graph oirf
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# --- VECM ---
library(urca)
library(vars)

# Step 1: Johansen cointegration test
data_mat <- cbind(y1, y2, y3)
jo_test  <- ca.jo(data_mat, type = "trace", K = 2,
                  ecdet = "const")
summary(jo_test)

# Step 2: Convert to VECM (rank = 1)
vecm <- cajorls(jo_test, r = 1)
summary(vecm$rlm)

# Convert VECM to VAR-level for IRF
var_from_vec <- vec2var(jo_test, r = 1)
irf_res <- irf(var_from_vec, n.ahead = 20)
plot(irf_res)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
from statsmodels.tsa.vector_ar.vecm import VECM, coint_johansen
import matplotlib.pyplot as plt

data = df[['y1', 'y2', 'y3']]

# Step 1: Johansen cointegration test
johansen = coint_johansen(data, det_order=0, k_ar_diff=1)
print("Trace statistic:", johansen.lr1)
print("Critical values:", johansen.cvt)

# Step 2: Estimate VECM with rank 1
model = VECM(data, k_ar_diff=1, coint_rank=1)
result = model.fit()
print(result.summary())

# IRF
irf = result.irf(20)
irf.plot()
plt.tight_layout(); plt.show()
```

  </TabItem>
</Tabs>

---

## Limitations and notes

- Sensitive to **lag selection** and the **deterministic terms** (constant/trend) in Johansen.
- Requires a sufficiently long sample; Johansen results are unreliable with short samples.
- Interpreting cointegrating vectors requires normalization and grounding in economic theory.
- Does not handle I(2) variables; check the order of integration first.

---

## Video tutorial

<VideoTutorial
  title="Running VECM in EcoLab"
  src="https://www.youtube.com/user/vietlod"
/>

## See also

- [ARDL Model](/en/ecolab/model/ardl) — single-equation alternative
- [Worked example: FDI and growth (ARDL)](/en/ecolab/vi-du/fdi-tang-truong-ardl)
- [Estimation & Econometric Modeling](/en/ecolab/econometrics-modeling)
