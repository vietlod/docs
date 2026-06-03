---
title: 'Interest rate – inflation – output (VAR)'
sidebar_position: 9
description: Hands-on VAR in EcoLab — analyzing the dynamic interactions among interest rate, inflation and output via impulse responses (IRF) and variance decomposition.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Interest rate – inflation – output interactions (VAR)

This illustrates [VAR](/en/ecolab/model/var): analyzing the **macro system dynamics** among the policy rate, inflation and output — without imposing a priori causal direction. Figures are **illustrative**.

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

Sample interpretation: a tightening shock (rate up) **lowers inflation** after a few periods and **temporarily reduces output** — consistent with monetary transmission. To interpret structural shocks, use [SVAR](/en/ecolab/model/svar).

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* --- Macro VAR example ---
tsset time

* Estimate VAR(4)
var rate inflation output, lags(1/4)

* Granger causality
vargranger

* Impulse Response Functions
irf create myirf, set(irf_macro) step(20)
irf graph oirf, impulse(rate) response(inflation output)

* Variance Decomposition
irf graph fevd
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# --- Macro VAR example ---
library(vars)

data_var <- cbind(rate, inflation, output)

# Select lags and estimate VAR(4)
VARselect(data_var, lag.max = 8)
model <- VAR(data_var, p = 4)
summary(model)

# Granger causality
causality(model, cause = "rate")

# IRF and FEVD
irf_res <- irf(model, impulse = "rate", n.ahead = 20)
plot(irf_res)
plot(fevd(model, n.ahead = 20))
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
from statsmodels.tsa.api import VAR
import matplotlib.pyplot as plt

data = df[['rate', 'inflation', 'output']]

# Estimate VAR(4)
model = VAR(data)
result = model.fit(4)
print(result.summary())

# Granger causality
for col in data.columns:
    test = result.test_causality(col,
               causing=data.columns.drop(col).tolist())
    print(test.summary())

# Impulse Response Functions
irf = result.irf(20)
irf.plot()
plt.tight_layout(); plt.show()

# Variance Decomposition
fevd = result.fevd(20)
fevd.plot()
plt.show()
```

  </TabItem>
</Tabs>

## Step 5 — Reporting
Export a report + **IRF/FEVD** plots + **replication code**.

## Video tutorial

<VideoTutorial
  title="Running VAR in EcoLab"
  src="https://www.youtube.com/user/vietlod"
/>

## See also
- [VAR](/en/ecolab/model/var) · [SVAR](/en/ecolab/model/svar) · [VECM](/en/ecolab/model/vecm) · [Catalog](/en/ecolab/model/group)
