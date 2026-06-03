---
title: 'Wage inequality (Quantile)'
sidebar_position: 6
description: Hands-on quantile regression in EcoLab — returns to education differ across wage quantiles (heterogeneous effects across the distribution).
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Wage inequality across quantiles (Quantile Regression)

This illustrates [quantile regression](/en/ecolab/model/quantile): the return to education is **heterogeneous** between low- and high-wage groups — something [OLS](/en/ecolab/model/ols) (mean only) cannot reveal. Figures are **illustrative**.

> Summary: estimate $\beta(\tau)$ of `educ` at quantiles $\tau$ = 0.1, 0.25, 0.5, 0.75, 0.9 to see how education affects wages differently along the distribution.

---

## Step 1 — Ideation
- **Question:** does the return to education differ between high- and low-wage groups (glass-ceiling/floor effects)?

## Step 2 — Literature Review
Wage-inequality literature; quantile effects of education.

## Step 3 — Data Collection
Labor micro data (`lnwage`, `educ`, `exper`, controls) — as in the [Mincer example](/en/ecolab/vi-du/luong-giao-duc-ols).

## Step 4 — Modeling

Choose the *Quantile regression* family → **Quantile**, with a list of $\tau$:

$$
Q_{\tau}(\ln wage_i \mid X_i) = \beta_0(\tau) + \beta_1(\tau)\,educ_i + \dots
$$

**Illustrative results — `educ` coefficient by quantile (not real results):**

| Quantile $\tau$ | $\hat{\beta}_1(\tau)$ (educ) |
| :--- | :--- |
| 0.10 | 0.061 |
| 0.50 | 0.080 |
| 0.90 | 0.103 |

Sample interpretation: the return to education **rises with the quantile** (0.061 → 0.103) ⇒ education **widens** wage inequality (a larger effect for high earners). OLS gives a single mean (~0.08) that masks this difference.

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* --- Wage inequality: Quantile Regression ---
sqreg lnwage educ exper female, quantiles(.10 .25 .50 .75 .90) reps(200)

* Compare coefficients across quantiles
estimates table, stats(N)
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# --- Wage inequality: Quantile Regression ---
library(quantreg)

taus <- c(0.10, 0.25, 0.50, 0.75, 0.90)
fit  <- rq(lnwage ~ educ + exper + female, data = df, tau = taus)
summary(fit, se = "boot", R = 200)

# Quantile-process plot for educ coefficient
plot(summary(rq(lnwage ~ educ + exper + female, data = df,
                tau = seq(0.05, 0.95, 0.05)), se = "boot"),
     parm = "educ")
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
import statsmodels.api as sm
import pandas as pd
import matplotlib.pyplot as plt

X = sm.add_constant(df[['educ', 'exper', 'female']])
y = df['lnwage']

# Estimate at multiple quantiles and collect educ coefficient
taus = [0.10, 0.25, 0.50, 0.75, 0.90]
coefs = []
for t in taus:
    res = sm.QuantReg(y, X).fit(q=t)
    coefs.append(res.params['educ'])
    print(f"\n=== Quantile {t} ===")
    print(res.summary())

# Plot the quantile-process for educ
plt.plot(taus, coefs, marker='o')
plt.xlabel('Quantile'); plt.ylabel('educ coefficient')
plt.title('Return to education across wage quantiles')
plt.show()
```

  </TabItem>
</Tabs>

## Step 5 — Reporting
Export a report + the **quantile-process** plot + **replication code**; SE by bootstrap.

## Video tutorial

<VideoTutorial
  title="Running Quantile Regression in EcoLab"
  src="https://www.youtube.com/user/vietlod"
/>

## See also
- [Quantile Regression](/en/ecolab/model/quantile) · [Panel FE-QR](/en/ecolab/model/panel-quantile) · [Mincer example (OLS)](/en/ecolab/vi-du/luong-giao-duc-ols)
