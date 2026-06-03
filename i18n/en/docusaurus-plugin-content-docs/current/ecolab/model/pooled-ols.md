---
title: Pooled OLS
sidebar_position: 1
description: Pooled OLS pools all panel data and runs OLS, the baseline panel model, when it is appropriate, and how to run it in EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Pooled OLS — Pooled panel regression

**Pooled OLS** pools all observations of [panel data](/en/ecolab/model/fem-rem) (N units × T periods) into a single sample and runs [OLS](/en/ecolab/model/ols) as if cross-sectional, **ignoring the panel structure**. It is the **baseline** for comparison with FE/RE.

:::warning Strong assumption
Pooled OLS assumes **no individual effects** ($\alpha_i$ identical across units). If unobserved unit characteristics are correlated with $X$, Pooled OLS is **biased** ⇒ use [FE](/en/ecolab/model/fem-rem). Errors within a unit are usually correlated ⇒ use **clustered standard errors**.
:::

---

## Model specification

$$
Y_{it} = \beta_0 + X_{it}\beta + \varepsilon_{it}
$$

Like OLS but using all $N \times T$ observations. Use **clustered SE by unit**.

---

## Running in EcoLab

1. **Modeling** module → *Linear panel data* family → **Pooled OLS**.
2. Declare entity/time, $Y$, $X$; choose **clustered SE**.
3. Run; compare with FE/RE via tests; export the **replication code**.

---

## Replication code

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* ---- Pooled OLS with clustered SE ----
use "panel_data.dta", clear

* Pooled OLS with clustered standard errors by entity
reg y x1 x2, vce(cluster id)
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# ---- Pooled OLS ----
library(plm)

# Load panel data (illustrative)
df <- read.csv("panel_data.csv")
pdata <- pdata.frame(df, index = c("id", "time"))

# Pooled OLS
model_pooled <- plm(y ~ x1 + x2, data = pdata, model = "pooling")
summary(model_pooled)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# ---- Pooled OLS with clustered SE ----
import pandas as pd
from linearmodels.panel import PooledOLS

# Load panel data (illustrative)
df = pd.read_csv("panel_data.csv")
df = df.set_index(["id", "time"])

y = df["y"]
X = df[["x1", "x2"]]

model = PooledOLS(y, X).fit(cov_type="clustered", cluster_entity=True)
print(model)
```

  </TabItem>
</Tabs>

## Video tutorial

<VideoTutorial
  title="Running Pooled OLS in EcoLab"
  src="https://www.youtube.com/user/vietlod"
/>

## See also

- [FEM/REM](/en/ecolab/model/fem-rem) · [Between](/en/ecolab/model/between) · [Catalog](/en/ecolab/model/group)
