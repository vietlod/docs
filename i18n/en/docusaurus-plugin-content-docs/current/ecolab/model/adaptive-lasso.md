---
title: Adaptive Lasso
sidebar_position: 4
description: Adaptive Lasso uses coefficient-specific weights to achieve the oracle property (consistent variable selection), how it differs from plain Lasso, and how to run it in EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Adaptive Lasso

**Adaptive Lasso** improves on [Lasso](/en/ecolab/model/lasso) by applying **coefficient-specific weights** to the L1 penalty — penalizing important variables lightly and weak variables heavily. As a result, Adaptive Lasso enjoys the **oracle property**: it selects the correct variable set and estimates coefficients consistently in large samples.

:::tip When to use
Use Adaptive Lasso when you need **consistent variable selection** with a stronger theoretical basis than plain Lasso, especially when **inference** (not just prediction) matters.
:::

---

## Model specification

$$
\min_{\beta} \; \sum_{i=1}^{n} (Y_i - X_i \beta)^2 + \lambda \sum_{j=1}^{p} \hat{w}_j \, |\beta_j|, \qquad \hat{w}_j = \frac{1}{|\hat{\beta}_j^{init}|^{\gamma}}
$$

The weights $\hat{w}_j$ come from an initial estimate $\hat{\beta}_j^{init}$ (usually OLS or Ridge); a large initial coefficient ⇒ small weight ⇒ less penalized.

---

## Running in EcoLab

1. **Modeling** module → *Regularized regression* family → **Adaptive Lasso**.
2. Select $Y$, the $X$ variables; choose the initial estimator (OLS/Ridge), $\gamma$ and $\lambda$ (CV).
3. Read the selected variables + coefficients; export the **replication code**.

---

## Replication code

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* ---- Adaptive Lasso ----
use "macro_data.dta", clear

* Stata 16+ built-in adaptive selection
lasso linear y x1-x20, selection(adaptive)

* Display selected coefficients
lassocoef, display(coef, standardized)
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# ---- Adaptive Lasso ----
library(glmnet)

# Load and prepare data (illustrative)
df <- read.csv("macro_data.csv")
X <- as.matrix(df[, paste0("x", 1:20)])
y <- df$y

# Step 1: initial OLS (or Ridge) to get weights
ols_fit <- lm(y ~ X)
beta_ols <- coef(ols_fit)[-1]  # exclude intercept
weights <- 1 / abs(beta_ols)

# Step 2: weighted Lasso (adaptive)
cv_alasso <- cv.glmnet(X, y, alpha = 1, penalty.factor = weights)
best_lambda <- cv_alasso$lambda.min
coef(cv_alasso, s = best_lambda)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# ---- Adaptive Lasso ----
import numpy as np
import pandas as pd
from sklearn.linear_model import Lasso, LassoCV
from sklearn.preprocessing import StandardScaler

# Load data (illustrative)
df = pd.read_csv("macro_data.csv")
X = df[[f"x{i}" for i in range(1, 21)]].values
y = df["y"].values

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Step 1: initial OLS to get weights
from numpy.linalg import lstsq
beta_ols, _, _, _ = lstsq(X_scaled, y, rcond=None)
weights = 1.0 / (np.abs(beta_ols) + 1e-6)

# Step 2: weighted Lasso (= Adaptive Lasso)
X_weighted = X_scaled / weights  # rescale columns
cv_model = LassoCV(cv=5).fit(X_weighted, y)
adaptive_coef = cv_model.coef_ / weights
print(f"Non-zero: {sum(adaptive_coef != 0)}")
print(f"Coefficients: {adaptive_coef}")
```

  </TabItem>
</Tabs>

---

## Limitations

- Depends on the **initial estimate**; a poor initial (e.g., must use Ridge when $p > n$) can bias results.
- Adds a $\gamma$ parameter to tune.

## Video tutorial

<VideoTutorial
  title="Running Adaptive Lasso in EcoLab"
  src="https://www.youtube.com/user/vietlod"
/>

## See also

- [Lasso](/en/ecolab/model/lasso) · [Ridge](/en/ecolab/model/ridge) · [Elastic Net](/en/ecolab/model/elastic-net) · [Catalog](/en/ecolab/model/group)
