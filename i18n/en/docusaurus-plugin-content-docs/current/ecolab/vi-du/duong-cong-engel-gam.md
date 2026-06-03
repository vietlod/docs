---
title: 'Nonlinear Engel curve (GAM)'
sidebar_position: 10
description: Hands-on GAM in EcoLab — modeling the nonlinear relationship between food spending and income (the Engel curve) with smooth functions.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Nonlinear Engel curve (GAM)

This illustrates [GAM](/en/ecolab/model/gam): the relationship between the **food expenditure share** and **income** (the Engel curve) is typically **nonlinear** — declining as income rises (Engel's law). GAM captures this curvature with a **smooth function** without pre-specifying the form. Figures are **illustrative**.

> Summary: use a smooth function $f(\text{income})$ to model the Engel curve, versus a linear OLS.

---

## Step 1 — Ideation
- **Question:** how does the food expenditure share change nonlinearly with income?

## Step 2 — Literature Review
Engel's law; nonparametric/semiparametric Engel-curve estimation.

## Step 3 — Data Collection
Household data (VHLSS): `food_share` (food expenditure share), `lninc` (log income/expenditure), controls for household size and region.

## Step 4 — Modeling

Choose the *Non-linear & semi-parametric* family → **GAM**; mark `lninc` as a smooth term:

$$
food\_share_i = \beta_0 + f(lninc_i) + X_i\gamma + \varepsilon_i
$$

**Illustrative results (format — not real results):**

| | Linear OLS | GAM |
| :--- | :--- | :--- |
| Relationship shape | straight line | **declining curve** (concave) |
| Adjusted $R^2$ | 0.41 | 0.52 |
| edf of f(lninc) | — | 3.8 (clearly nonlinear) |

Sample interpretation: the smooth-function plot shows the food share **falling quickly at low income then flattening** — exactly Engel's law; GAM fits better than linear OLS (edf > 1 ⇒ nonlinear).

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* ── GAM: Engel curve ──────────────────────────────
* Smooth nonlinear relationship: food_share ~ f(income)
npregress series food_share income, basis(bspline 4)

* Marginal effect plot
margins, at(income=(1(0.5)10)) post
marginsplot
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# ── GAM: Engel curve ──────────────────────────────
library(mgcv)

model_engel <- gam(
  food_share ~ s(log_income) + household_size,
  data   = df,
  method = "REML"
)

summary(model_engel)

# Smooth-function plot with partial residuals
plot(model_engel, residuals = TRUE, pch = 20,
     main = "Engel curve — smooth f(log income)")
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# ── GAM: Engel curve ──────────────────────────────
from pygam import LinearGAM, s, l
import matplotlib.pyplot as plt

X = df[["log_income", "household_size"]].values
y = df["food_share"].values

gam = LinearGAM(s(0) + l(1)).fit(X, y)
print(gam.summary())

# Plot the smooth function for log_income
gam.plot(term=0)
plt.title("Engel curve — smooth f(log income)")
plt.show()
```

  </TabItem>
</Tabs>

## Step 5 — Reporting
Export a report + the **smooth-function plot** + **replication code**.

## Video tutorial

<VideoTutorial
  title="Guide to running GAM in EcoLab"
  src="https://www.youtube.com/embed/m3wyHeBOfUE"
/>

## See also
- [GAM](/en/ecolab/model/gam) · [NLS](/en/ecolab/model/nls) · [Catalog](/en/ecolab/model/group)

