---
title: Ridge — L2 regularization
sidebar_position: 1
description: Ridge regression (L2 regularization) handles multicollinearity and overfitting, the L2 penalty, choosing lambda, and how to run it in EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Ridge — L2 regularized regression

**Ridge** adds an **L2 penalty** to the OLS objective to **shrink** coefficients toward zero, stabilizing estimates under **multicollinearity** or with **many regressors** (large p). Ridge does not set coefficients exactly to zero (no variable selection) but substantially reduces estimation variance.

:::tip When to use
Use Ridge when regressors are **highly correlated** (multicollinearity), making [OLS](/en/ecolab/model/ols) unstable (inflated, sign-flipping coefficients). If you need **variable selection**, use [Lasso](/en/ecolab/model/lasso).
:::

---

## Model specification

Ridge minimizes the residual sum of squares plus an **L2 penalty**:

$$
\min_{\beta} \; \sum_{i=1}^{n} (Y_i - X_i \beta)^2 + \lambda \sum_{j=1}^{p} \beta_j^2
$$

$\lambda \ge 0$ is the **regularization parameter**: $\lambda = 0$ ⇒ OLS; larger $\lambda$ ⇒ stronger shrinkage.

---

## Choosing lambda & notes

- Choose $\lambda$ by **cross-validation** (CV).
- **Standardize** variables first, since the penalty is scale-sensitive.
- Ridge **reduces variance** but **increases bias** (bias-variance tradeoff).

---

## Running in EcoLab

1. **Modeling** module → *Regularized regression* family → **Ridge**.
2. Select $Y$, the $X$ variables; enable **standardization**; choose $\lambda$ (or auto CV).
3. Run and read the shrunk coefficients and the shrinkage path; export the **replication code**.

---

## Replication code

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* ---- Ridge Regression ----
* Note: ridgereg is a community-contributed command
* Install: ssc install ridgereg
use "macro_data.dta", clear

ridgereg y x1-x20, model(orr)
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# ---- Ridge Regression (alpha = 0) ----
library(glmnet)

# Load and prepare data (illustrative)
df <- read.csv("macro_data.csv")
X <- as.matrix(df[, paste0("x", 1:20)])
y <- df$y

# Ridge with cross-validation to choose lambda
cv_ridge <- cv.glmnet(X, y, alpha = 0)
plot(cv_ridge)

# Best lambda and coefficients
best_lambda <- cv_ridge$lambda.min
coef(cv_ridge, s = best_lambda)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# ---- Ridge Regression with cross-validation ----
from sklearn.linear_model import RidgeCV
from sklearn.preprocessing import StandardScaler
import pandas as pd

# Load data (illustrative)
df = pd.read_csv("macro_data.csv")
X = df[[f"x{i}" for i in range(1, 21)]]
y = df["y"]

# Standardize
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Ridge with CV over a grid of alphas (= lambda)
model = RidgeCV(alphas=[0.1, 1, 10]).fit(X_scaled, y)
print(f"Best alpha: {model.alpha_}")
print(f"Coefficients: {model.coef_}")
```

  </TabItem>
</Tabs>

---

## Limitations

- Does **not select variables** (all coefficients non-zero).
- Coefficients are harder to interpret due to shrinkage; typically used for **prediction** rather than causal inference.

## Video tutorial

<VideoTutorial
  title="Running Ridge regression in EcoLab"
  src="https://www.youtube.com/user/vietlod"
/>

## See also

- [Lasso](/en/ecolab/model/lasso) · [Elastic Net](/en/ecolab/model/elastic-net) · [OLS](/en/ecolab/model/ols) · [Catalog](/en/ecolab/model/group)
