---
title: Lasso — L1 regularization
sidebar_position: 2
description: Lasso regression (L1 regularization) both shrinks coefficients and performs automatic variable selection, the L1 penalty, and how to run it in EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Lasso — L1 regularized regression

**Lasso (Least Absolute Shrinkage and Selection Operator)** adds an **L1 penalty** to OLS. Unlike [Ridge](/en/ecolab/model/ridge), Lasso can drive some coefficients **exactly to zero** — i.e. **automatic variable selection**, yielding a sparse, interpretable model.

:::tip When to use
Use Lasso when you have **many regressors** and want to **select the important subset**. When groups of variables are highly correlated, consider [Elastic Net](/en/ecolab/model/elastic-net).
:::

---

## Model specification

$$
\min_{\beta} \; \sum_{i=1}^{n} (Y_i - X_i \beta)^2 + \lambda \sum_{j=1}^{p} |\beta_j|
$$

The L1 penalty ($\sum |\beta_j|$) produces **corner solutions** ⇒ many $\beta_j = 0$. $\lambda$ controls the sparsity level.

---

## Notes

- Choose $\lambda$ by **cross-validation**; **standardize** variables first.
- With **highly correlated** variables, Lasso tends to pick one and drop the rest (unstable) ⇒ Elastic Net fixes this.
- Post-selection inference requires care.

---

## Running in EcoLab

1. **Modeling** module → *Regularized regression* family → **Lasso**.
2. Select $Y$, the $X$ variables; enable **standardization**; choose $\lambda$ (CV).
3. Read the retained variables (non-zero coefficients) and the path; export the **replication code**.

---

## Replication code

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* ---- Lasso with cross-validation ----
use "macro_data.dta", clear

lasso linear y x1-x20, selection(cv)

* Display selected variables and coefficients
lassocoef, display(coef, standardized)
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# ---- Lasso (alpha = 1) with cross-validation ----
library(glmnet)

# Load and prepare data (illustrative)
df <- read.csv("macro_data.csv")
X <- as.matrix(df[, paste0("x", 1:20)])
y <- df$y

# Lasso with CV
cv_lasso <- cv.glmnet(X, y, alpha = 1)
plot(cv_lasso)

# Best lambda and non-zero coefficients
best_lambda <- cv_lasso$lambda.min
coef(cv_lasso, s = best_lambda)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# ---- Lasso with cross-validation ----
from sklearn.linear_model import LassoCV
from sklearn.preprocessing import StandardScaler
import pandas as pd

# Load data (illustrative)
df = pd.read_csv("macro_data.csv")
X = df[[f"x{i}" for i in range(1, 21)]]
y = df["y"]

# Standardize
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# LassoCV selects lambda automatically
model = LassoCV(cv=5).fit(X_scaled, y)
print(f"Best alpha (lambda): {model.alpha_}")
print(f"Non-zero coefficients: {sum(model.coef_ != 0)}")
print(f"Coefficients: {model.coef_}")
```

  </TabItem>
</Tabs>

---

## Limitations

- Unstable when variables are highly correlated.
- Selects at most $n$ variables when $p > n$.

## Video tutorial

<VideoTutorial
  title="Running Lasso regression in EcoLab"
  src="https://www.youtube.com/user/vietlod"
/>

## See also

- [Ridge](/en/ecolab/model/ridge) · [Elastic Net](/en/ecolab/model/elastic-net) · [Adaptive Lasso](/en/ecolab/model/adaptive-lasso) · [Catalog](/en/ecolab/model/group)
