---
title: Elastic Net — L1 + L2
sidebar_position: 3
description: Elastic Net combines the L1 (Lasso) and L2 (Ridge) penalties to both select variables and handle highly correlated variable groups, and how to run it in EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Elastic Net — L1 + L2 regularization

**Elastic Net** combines the **L1 penalty** ([Lasso](/en/ecolab/model/lasso)) and the **L2 penalty** ([Ridge](/en/ecolab/model/ridge)). It both **selects variables** (like Lasso) and handles **highly correlated variable groups** well (like Ridge) — fixing Lasso's instability under correlation.

:::tip When to use
Use Elastic Net when you have **many variables** and there are **groups of highly correlated variables** that you want to keep/drop together rather than picking one at random.
:::

---

## Model specification

$$
\min_{\beta} \; \sum_{i=1}^{n} (Y_i - X_i \beta)^2 + \lambda \left[ \alpha \sum_{j} |\beta_j| + (1-\alpha) \sum_{j} \beta_j^2 \right]
$$

- $\alpha \in [0,1]$ is the **mixing ratio**: $\alpha = 1$ ⇒ Lasso; $\alpha = 0$ ⇒ Ridge.
- $\lambda$ controls the total penalty.

---

## Running in EcoLab

1. **Modeling** module → *Regularized regression* family → **Elastic Net**.
2. Select $Y$, the $X$ variables; **standardize**; choose $\alpha$ and $\lambda$ (2-D grid CV).
3. Read the retained variables + coefficients; export the **replication code**.

---

## Replication code

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* ---- Elastic Net with cross-validation ----
use "macro_data.dta", clear

elasticnet linear y x1-x20, selection(cv) alphas(0.5)

* Display selected coefficients
lassocoef, display(coef, standardized)
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# ---- Elastic Net (alpha = 0.5) with cross-validation ----
library(glmnet)

# Load and prepare data (illustrative)
df <- read.csv("macro_data.csv")
X <- as.matrix(df[, paste0("x", 1:20)])
y <- df$y

# Elastic Net with alpha = 0.5 (midpoint between Ridge and Lasso)
cv_enet <- cv.glmnet(X, y, alpha = 0.5)
plot(cv_enet)

# Best lambda and coefficients
best_lambda <- cv_enet$lambda.min
coef(cv_enet, s = best_lambda)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# ---- Elastic Net with cross-validation ----
from sklearn.linear_model import ElasticNetCV
from sklearn.preprocessing import StandardScaler
import pandas as pd

# Load data (illustrative)
df = pd.read_csv("macro_data.csv")
X = df[[f"x{i}" for i in range(1, 21)]]
y = df["y"]

# Standardize
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Elastic Net: l1_ratio = alpha (0.5 = equal L1 + L2)
model = ElasticNetCV(l1_ratio=0.5, cv=5).fit(X_scaled, y)
print(f"Best alpha (lambda): {model.alpha_}")
print(f"Non-zero coefficients: {sum(model.coef_ != 0)}")
print(f"Coefficients: {model.coef_}")
```

  </TabItem>
</Tabs>

---

## Limitations

- Has **two tuning parameters** ($\alpha$, $\lambda$) ⇒ heavier CV.
- Still a **prediction-oriented** method; causal interpretation requires care.

## Video tutorial

<VideoTutorial
  title="Running Elastic Net in EcoLab"
  src="https://www.youtube.com/user/vietlod"
/>

## See also

- [Ridge](/en/ecolab/model/ridge) · [Lasso](/en/ecolab/model/lasso) · [Adaptive Lasso](/en/ecolab/model/adaptive-lasso) · [Catalog](/en/ecolab/model/group)
