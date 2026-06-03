---
title: SARIMA — Seasonal ARIMA
sidebar_position: 2
description: The SARIMA (Seasonal ARIMA) model extends ARIMA for series with seasonality, the (p,d,q)(P,D,Q)s notation, and how to run it in EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# SARIMA — Seasonal ARIMA

**SARIMA** extends [ARIMA](/en/ecolab/model/arima) to handle **seasonality** — patterns that repeat over a fixed cycle (month, quarter). SARIMA adds **seasonal** AR/MA/differencing components alongside the non-seasonal ones.

:::tip When to use
Use SARIMA when the series has a **clear seasonal cycle** (e.g. monthly retail sales, quarterly tourism). ACF spikes at seasonal lags signal the need for SARIMA.
:::

---

## Model notation

$$
\text{SARIMA}(p,d,q)(P,D,Q)_s
$$

- $(p,d,q)$: the **non-seasonal** part (as in ARIMA).
- $(P,D,Q)$: the **seasonal** part with cycle $s$ (e.g. $s=12$ for monthly, $s=4$ for quarterly data).

---

## Running in EcoLab

1. **Modeling** module → *Univariate time series* family → **SARIMA**.
2. Choose $Y$; declare $(p,d,q)(P,D,Q)_s$ and the seasonal period $s$ (or auto).
3. Run; view seasonal forecasts + diagnostics; export the **replication code**.

---

## Replication code

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* --- SARIMA(1,1,1)(1,1,1)_12 ---
tsset time

* Estimate SARIMA with seasonal component (s = 12)
arima y, arima(1,1,1) sarima(1,1,1,12)

* Residual diagnostics
predict resid, residuals
corrgram resid, lags(24)

* Forecast
tsappend, add(12)
predict yhat, dynamic(.)
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# --- SARIMA ---
library(forecast)

# Create monthly time series
ts_data <- ts(df$y, start = c(2010, 1), frequency = 12)

# Fit SARIMA(1,1,1)(1,1,1)[12]
fit <- Arima(ts_data, order = c(1, 1, 1),
             seasonal = c(1, 1, 1))
summary(fit)

# Diagnostics and forecast
checkresiduals(fit)
fc <- forecast(fit, h = 24)
plot(fc)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
from statsmodels.tsa.statespace.sarimax import SARIMAX
import matplotlib.pyplot as plt

# Estimate SARIMA(1,1,1)(1,1,1,12)
model = SARIMAX(df['y'],
                order=(1, 1, 1),
                seasonal_order=(1, 1, 1, 12))
result = model.fit(disp=False)
print(result.summary())

# Diagnostics
result.plot_diagnostics(figsize=(10, 6))
plt.tight_layout(); plt.show()

# Forecast 24 months
forecast = result.get_forecast(steps=24)
print(forecast.summary_frame())
```

  </TabItem>
</Tabs>

---

## Limitations

- Many parameters ⇒ needs a long series spanning several seasonal cycles.
- Assumes the seasonal pattern is **stable** over time.

## Video tutorial

<VideoTutorial
  title="Running SARIMA in EcoLab"
  src="https://www.youtube.com/user/vietlod"
/>

## See also

- [ARIMA](/en/ecolab/model/arima) · [GARCH](/en/ecolab/model/garch) · [Catalog](/en/ecolab/model/group)
