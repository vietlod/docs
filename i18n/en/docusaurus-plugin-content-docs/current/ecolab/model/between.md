---
title: Between Estimator
sidebar_position: 3
description: The Between estimator uses unit means to exploit cross-unit variation, how it differs from FE/RE, and how to run it in EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Between Estimator

The **Between Estimator** regresses on the **unit means** of the variables — exploiting **between-unit variation** rather than the within (time) variation used by [Fixed Effects](/en/ecolab/model/fem-rem). It answers "do units with a higher average $X$ have a higher average $Y$".

:::tip When to use
Use Between when you care about **long-run differences across units** (e.g. comparing countries/firms by their averages). RE is essentially a **weighted average** of Between and Within.
:::

---

## Model specification

$$
\bar{Y}_i = \beta_0 + \bar{X}_i \beta + \bar{\varepsilon}_i, \qquad \bar{Y}_i = \frac{1}{T}\sum_t Y_{it}
$$

OLS on the unit-averaged data.

---

## Running in EcoLab

1. **Modeling** module → *Linear panel data* family → **Between**.
2. Declare entity/time, $Y$, $X$.
3. Run; contrast with FE (within) to analyze the source of variation; export the **replication code**.

---

## Replication code

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* ---- Between Estimator ----
use "panel_data.dta", clear
xtset id time

* Between estimator (regression on unit means)
xtreg y x1 x2, be
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# ---- Between Estimator ----
library(plm)

# Load panel data (illustrative)
df <- read.csv("panel_data.csv")
pdata <- pdata.frame(df, index = c("id", "time"))

# Between estimator
model_be <- plm(y ~ x1 + x2, data = pdata, model = "between")
summary(model_be)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# ---- Between Estimator ----
import pandas as pd
from linearmodels.panel import BetweenOLS

# Load panel data (illustrative)
df = pd.read_csv("panel_data.csv")
df = df.set_index(["id", "time"])

y = df["y"]
X = df[["x1", "x2"]]

model_be = BetweenOLS(y, X).fit()
print(model_be)
```

  </TabItem>
</Tabs>

## Limitations

- **Ignores time variation**; does not control for individual effects like FE.
- Loses dynamic information.

## Video tutorial

<VideoTutorial
  title="Running the Between estimator in EcoLab"
  src="https://www.youtube.com/user/vietlod"
/>

## See also

- [FEM/REM](/en/ecolab/model/fem-rem) · [Pooled OLS](/en/ecolab/model/pooled-ols) · [Catalog](/en/ecolab/model/group)
