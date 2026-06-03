---
title: ARCH / GARCH — Volatility models
sidebar_position: 3
description: ARCH/GARCH models capture time-varying conditional variance (volatility clustering) in financial series, and how to run them in EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# ARCH / GARCH — Volatility models

**ARCH/GARCH** model **time-varying conditional variance** — the **volatility clustering** phenomenon (periods of high volatility follow high volatility) that is pervasive in **financial series** (stock returns, exchange rates). Instead of assuming constant error variance, they let variance depend on the past.

:::tip When to use
Use when a series (usually **returns**) exhibits **volatility clustering** and you want to model/forecast **risk (volatility)**. Often combined: mean by [ARIMA](/en/ecolab/model/arima) + variance by GARCH.
:::

---

## Model specification

GARCH(1,1) for the conditional variance $\sigma_t^2$:

$$
\sigma_t^2 = \omega + \alpha \, \varepsilon_{t-1}^2 + \beta \, \sigma_{t-1}^2
$$

- $\alpha$ (ARCH): reaction to the latest shock; $\beta$ (GARCH): persistence of volatility.
- **ARCH(q)** is the case $\beta = 0$. Stationarity condition: $\alpha + \beta < 1$.

---

## Running in EcoLab

1. **Modeling** module → *Univariate time series* family → **ARCH/GARCH**.
2. Choose the series (returns); declare the order $(p,q)$ and the mean equation (e.g. ARMA).
3. Run; view the estimated $\hat{\sigma}_t$ + volatility forecast; export the **replication code**.

---

## Replication code

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* --- GARCH(1,1) ---
* Estimate GARCH(1,1) for return series
arch ret, arch(1) garch(1)

* Conditional variance
predict sigma2, variance

* Plot conditional volatility
tsline sigma2, title("Conditional Variance - GARCH(1,1)")
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# --- GARCH(1,1) ---
library(rugarch)

# Specify GARCH(1,1) with constant mean
spec <- ugarchspec(
  variance.model = list(model = "sGARCH", garchOrder = c(1, 1)),
  mean.model     = list(armaOrder = c(0, 0), include.mean = TRUE),
  distribution.model = "std"   # Student-t innovations
)

# Fit
fit <- ugarchfit(spec = spec, data = ret)
show(fit)

# Conditional volatility plot
plot(sigma(fit), type = "l", main = "Conditional Volatility")
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
from arch import arch_model
import matplotlib.pyplot as plt

# Estimate GARCH(1,1)
model = arch_model(ret, vol='Garch', p=1, q=1, dist='t')
result = model.fit(disp='off')
print(result.summary())

# Plot conditional volatility
fig, ax = plt.subplots()
ax.plot(result.conditional_volatility)
ax.set_title('Conditional Volatility — GARCH(1,1)')
plt.show()
```

  </TabItem>
</Tabs>

---

## Limitations

- Standard GARCH is **symmetric** (good/bad news have equal effect) ⇒ use [EGARCH](/en/ecolab/model/egarch) for the leverage effect.
- Sensitive to the error distribution (normal vs Student-t).

## Video tutorial

<VideoTutorial
  title="Running GARCH in EcoLab"
  src="https://www.youtube.com/user/vietlod"
/>

## See also

- [EGARCH](/en/ecolab/model/egarch) · [ARIMA](/en/ecolab/model/arima) · [Catalog](/en/ecolab/model/group)
