---
title: EGARCH — Asymmetric GARCH
sidebar_position: 4
description: The EGARCH (Exponential GARCH) model captures the leverage effect (bad news raises volatility more than good news) in financial volatility, and how to run it in EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# EGARCH — Exponential GARCH

**EGARCH (Exponential GARCH)** extends [GARCH](/en/ecolab/model/garch) to capture the **asymmetric / leverage effect** — in financial markets, **bad news (negative shocks)** typically raises volatility **more** than good news of the same magnitude. Standard GARCH cannot distinguish the sign of shocks; EGARCH can.

:::tip When to use
Use EGARCH when you suspect volatility responds **asymmetrically** to positive/negative shocks (very common in stock returns). It models **log variance**, so no positivity constraints are needed.
:::

---

## Model specification

$$
\ln(\sigma_t^2) = \omega + \alpha \left( |z_{t-1}| - E|z_{t-1}| \right) + \gamma \, z_{t-1} + \beta \ln(\sigma_{t-1}^2)
$$

where $z_{t-1} = \varepsilon_{t-1}/\sigma_{t-1}$. The parameter **$\gamma \ne 0$** measures the **leverage effect**: $\gamma < 0$ ⇒ negative shocks raise volatility more.

---

## Running in EcoLab

1. **Modeling** module → *Univariate time series* family → **EGARCH**.
2. Choose the returns series; declare the order and mean equation.
3. Run; check the sign/significance of $\gamma$ (leverage); export the **replication code**.

---

## Replication code

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* --- EGARCH(1,1) ---
arch ret, earch(1) egarch(1)

* Conditional variance
predict sigma2, variance

* Check leverage coefficient (gamma)
* A significant negative gamma confirms leverage effect
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# --- EGARCH(1,1) ---
library(rugarch)

spec <- ugarchspec(
  variance.model = list(model = "eGARCH", garchOrder = c(1, 1)),
  mean.model     = list(armaOrder = c(0, 0), include.mean = TRUE),
  distribution.model = "std"
)

fit <- ugarchfit(spec = spec, data = ret)
show(fit)

# Check the leverage parameter (alpha1 in rugarch = gamma)
# Negative and significant => leverage effect confirmed
plot(sigma(fit), type = "l", main = "EGARCH Conditional Volatility")
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
from arch import arch_model
import matplotlib.pyplot as plt

# Estimate EGARCH(1,1)
model = arch_model(ret, vol='EGARCH', p=1, q=1, dist='t')
result = model.fit(disp='off')
print(result.summary())

# The gamma parameter captures leverage
# Negative & significant => bad news increases volatility more
fig, ax = plt.subplots()
ax.plot(result.conditional_volatility)
ax.set_title('EGARCH(1,1) Conditional Volatility')
plt.show()
```

  </TabItem>
</Tabs>

---

## Limitations

- Parameter interpretation is more complex than GARCH.
- Sensitive to the distributional assumption; needs a large enough sample.

## Video tutorial

<VideoTutorial
  title="Running EGARCH in EcoLab"
  src="https://www.youtube.com/embed/m3wyHeBOfUE"
/>

## See also

- [ARCH/GARCH](/en/ecolab/model/garch) · [ARIMA](/en/ecolab/model/arima) · [Catalog](/en/ecolab/model/group)

