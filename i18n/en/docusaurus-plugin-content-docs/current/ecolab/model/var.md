---
title: VAR — Vector Autoregression
sidebar_position: 1
description: The VAR (Vector Autoregression) model for systems of stationary time series, impulse responses (IRF), variance decomposition, Granger causality, and how to run it in EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# VAR — Vector Autoregression

**VAR** models a **system of time series** where each variable depends on **its own lags and the lags of the others** — without imposing a priori causal direction. It is the standard tool for **system dynamics**: impulse responses (IRF), forecast error variance decomposition (FEVD), and Granger causality tests.

:::tip When to use
Use VAR when all series are **stationary I(0)** (or differenced). If I(1) series are **cointegrated** ⇒ use [VECM](/en/ecolab/model/vecm); if I(1) but not cointegrated ⇒ VAR in differences.
:::

---

## Model specification

$$
Y_t = c + A_1 Y_{t-1} + A_2 Y_{t-2} + \dots + A_p Y_{t-p} + \varepsilon_t
$$

where $Y_t$ is a vector of variables and $A_i$ are coefficient matrices. Choose lag $p$ via AIC/BIC/HQ.

---

## Post-estimation analysis

- **IRF**: the system's response to a shock.
- **FEVD**: decomposition of forecast variance by shock source.
- **Granger causality**: which variable helps forecast which.

---

## Running in EcoLab

1. **Modeling** module → *Multivariate time series* family → **VAR**.
2. Choose the variable set (same frequency, stationarity checked), the lag length.
3. Run; view IRF/FEVD/Granger; export the **replication code**.

---

## Replication code

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* --- VAR ---
tsset time

* Estimate VAR(2)
var rate inflation output, lags(1/2)

* Granger causality test
vargranger

* Impulse Response Functions (orthogonalized)
irf create myirf, set(irf_results) step(20)
irf graph oirf, impulse(rate) response(inflation output)

* Forecast Error Variance Decomposition
irf graph fevd
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# --- VAR ---
library(vars)

# Prepare data matrix
data_var <- cbind(rate, inflation, output)

# Select lag order
VARselect(data_var, lag.max = 8)

# Estimate VAR(2)
model <- VAR(data_var, p = 2)
summary(model)

# Granger causality
causality(model, cause = "rate")

# Impulse Response Functions
irf_res <- irf(model, impulse = "rate", n.ahead = 20)
plot(irf_res)

# Forecast Error Variance Decomposition
fevd_res <- fevd(model, n.ahead = 20)
plot(fevd_res)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
from statsmodels.tsa.api import VAR
import matplotlib.pyplot as plt

# Prepare data
data = df[['rate', 'inflation', 'output']]

# Estimate VAR(2)
model = VAR(data)
result = model.fit(2)
print(result.summary())

# Granger causality
for col in data.columns:
    test = result.test_causality(col, causing=data.columns.drop(col).tolist())
    print(test.summary())

# Impulse Response Functions
irf = result.irf(10)
irf.plot()
plt.tight_layout(); plt.show()

# Forecast Error Variance Decomposition
fevd = result.fevd(10)
fevd.plot()
plt.show()
```

  </TabItem>
</Tabs>

---

## Limitations

- Many parameters (explodes with number of variables × lags).
- Structural IRFs require identification assumptions ⇒ see [SVAR](/en/ecolab/model/svar).

## Video tutorial

<VideoTutorial
  title="Running VAR in EcoLab"
  src="https://www.youtube.com/embed/m3wyHeBOfUE"
/>

## See also

- [VECM](/en/ecolab/model/vecm) · [SVAR](/en/ecolab/model/svar) · [Catalog](/en/ecolab/model/group)

