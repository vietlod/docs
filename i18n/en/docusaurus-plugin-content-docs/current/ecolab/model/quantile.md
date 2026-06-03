---
title: Quantile Regression
sidebar_position: 1
description: Quantile Regression estimates effects at different quantiles of the dependent variable's distribution, unlike OLS mean regression, and how to run it in EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Quantile Regression

**Quantile Regression** estimates the effect of regressors on different **quantiles** of the distribution of $Y$ — not just the mean as in [OLS](/en/ecolab/model/ols). It reveals how $X$ affects the "low", "median" and "high" groups differently (e.g. an effect on low-income vs high-income individuals).

:::tip When to use
Use Quantile Regression when you care about **heterogeneous effects across the distribution**, or when $Y$ is **skewed/has outliers** so the OLS mean is unrepresentative. Median regression ($\tau=0.5$) is **more robust to outliers** than OLS.
:::

---

## Model specification

The $\tau$-th conditional quantile of $Y$ given $X$:

$$
Q_{\tau}(Y_i \mid X_i) = X_i \beta(\tau)
$$

Estimated by minimizing the **asymmetrically weighted absolute errors** (check function $\rho_\tau$):

$$
\hat{\beta}(\tau) = \arg\min_{\beta} \sum_{i} \rho_{\tau}\big(Y_i - X_i\beta\big), \quad \rho_\tau(u) = u\,(\tau - \mathbb{1}[u<0])
$$

---

## Running in EcoLab

1. **Modeling** module → *Quantile regression* family → **Quantile**.
2. Select $Y$, the $X$ variables, and a **list of quantiles** $\tau$ (e.g. 0.1, 0.25, 0.5, 0.75, 0.9).
3. Run; read $\beta(\tau)$ per quantile + the quantile-process plot; **bootstrap SE**; export the **replication code**.

---

## Replication code

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* --- Quantile Regression ---
* Simultaneous quantile regression with bootstrap SE
sqreg lnwage educ exper, quantiles(0.25 0.5 0.75) reps(100)

* View results for each quantile
estimates table, stats(N)
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# --- Quantile Regression ---
library(quantreg)

# Estimate at multiple quantiles
fit <- rq(lnwage ~ educ + exper, tau = c(0.25, 0.5, 0.75),
          data = df)
summary(fit, se = "boot", R = 200)

# Quantile-process plot
plot(summary(rq(lnwage ~ educ + exper, tau = seq(0.05, 0.95, 0.05),
                data = df), se = "boot"))
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
import statsmodels.api as sm
import pandas as pd

X = sm.add_constant(df[['educ', 'exper']])
y = df['lnwage']

# Estimate at multiple quantiles
quantiles = [0.25, 0.50, 0.75]
results = {}
for q in quantiles:
    model = sm.QuantReg(y, X)
    res = model.fit(q=q)
    results[q] = res
    print(f"\n=== Quantile {q} ===")
    print(res.summary())
```

  </TabItem>
</Tabs>

---

## Limitations

- SE typically requires **bootstrap**; heavier computation than OLS.
- Interpreting many quantiles is more complex than a single mean coefficient.

## Video tutorial

<VideoTutorial
  title="Running Quantile Regression in EcoLab"
  src="https://www.youtube.com/embed/m3wyHeBOfUE"
/>

## See also

- [Panel Quantile (FE-QR)](/en/ecolab/model/panel-quantile) · [OLS](/en/ecolab/model/ols) · [Catalog](/en/ecolab/model/group)

