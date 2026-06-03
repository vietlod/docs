---
title: 'Inflation forecasting with many predictors (Lasso)'
sidebar_position: 8
description: Hands-on Lasso/Elastic Net in EcoLab — forecasting inflation from many macro predictors, automatic variable selection and avoiding overfitting.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Inflation forecasting with many predictors (Lasso / Elastic Net)

This illustrates the [regularization](/en/ecolab/model/lasso) family: with **many macro predictors** (money supply, exchange rate, oil price, interest rate, lags…), [OLS](/en/ecolab/model/ols) easily **overfits** and suffers multicollinearity. [Lasso](/en/ecolab/model/lasso)/[Elastic Net](/en/ecolab/model/elastic-net) **select variables automatically** and shrink coefficients. Figures are **illustrative**.

> Summary: use Lasso/Elastic Net to select the best set of predictors for out-of-sample inflation forecasting.

---

## Step 1 — Ideation
- **Question:** which macro variables are actually useful for forecasting inflation, and how does the out-of-sample model perform?

## Step 2 — Literature Review
Inflation forecasting, data-rich (many-predictor) forecasting, regularization.

## Step 3 — Data Collection
Monthly/quarterly series: `cpi` (inflation) and **20–50 candidate variables** (`m2`, `er`, `oil`, `rate`, output, expectations, lags…) from [EcoData](/en/ecodata/overview)/World Bank/FRED.

## Step 4 — Modeling

Choose the *Regularized regression* family → **Lasso** (or **Elastic Net** for correlated groups); **standardize** variables; select $\lambda$ by cross-validation.

$$
\min_{\beta} \sum_{t} (cpi_t - X_t\beta)^2 + \lambda \sum_j |\beta_j|
$$

**Illustrative results (format — not real results):**

| | OLS (all variables) | Lasso |
| :--- | :--- | :--- |
| Non-zero variables | 45 | 8 |
| Out-of-sample RMSE | 1.00 (normalized) | 0.78 |
| Retained variables | — | m2_lag, oil, er, rate… |

Sample interpretation: Lasso keeps **8/45 variables** and **lowers out-of-sample RMSE** vs full OLS ⇒ a sparse model with better forecasts and easier interpretation.

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* ---- Inflation forecasting with Lasso ----
use "inflation_data.dta", clear

* Lasso with cross-validation
lasso linear inflation x1-x15, selection(cv)

* Display selected coefficients
lassocoef, display(coef, standardized)
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# ---- Inflation forecasting with Lasso ----
library(glmnet)

# Load data and split train/test (illustrative)
df <- read.csv("inflation_data.csv")
train <- df[1:100, ]
test  <- df[101:120, ]

X_train <- as.matrix(train[, paste0("x", 1:15)])
y_train <- train$inflation
X_test  <- as.matrix(test[, paste0("x", 1:15)])

# Lasso with CV
fit <- cv.glmnet(X_train, y_train, alpha = 1)
best_lambda <- fit$lambda.min

# Predict out-of-sample
y_pred <- predict(fit, X_test, s = best_lambda)
rmse <- sqrt(mean((test$inflation - y_pred)^2))
cat("Out-of-sample RMSE:", rmse, "\n")
coef(fit, s = best_lambda)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# ---- Inflation forecasting with Lasso ----
from sklearn.linear_model import LassoCV
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error
import pandas as pd
import numpy as np

# Load data and split (illustrative)
df = pd.read_csv("inflation_data.csv")
X = df[[f"x{i}" for i in range(1, 16)]]
y = df["inflation"]

X_train, X_test = X.iloc[:100], X.iloc[100:]
y_train, y_test = y.iloc[:100], y.iloc[100:]

scaler = StandardScaler()
X_train_s = scaler.fit_transform(X_train)
X_test_s  = scaler.transform(X_test)

# LassoCV with 10-fold CV
model = LassoCV(cv=10).fit(X_train_s, y_train)
y_pred = model.predict(X_test_s)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))

print(f"Best alpha: {model.alpha_}")
print(f"Non-zero: {sum(model.coef_ != 0)}")
print(f"Out-of-sample RMSE: {rmse:.4f}")
```

  </TabItem>
</Tabs>

## Step 5 — Reporting
Export a report + the shrinkage path over $\lambda$ + **replication code**.

:::warning Note
Regularization is **prediction-oriented**, not causal inference; coefficients are shrunk. For inference, combine with theory or [Adaptive Lasso](/en/ecolab/model/adaptive-lasso).
:::

## Video tutorial

<VideoTutorial
  title="Inflation forecasting with Lasso in EcoLab"
  src="https://www.youtube.com/user/vietlod"
/>

## See also
- [Lasso](/en/ecolab/model/lasso) · [Elastic Net](/en/ecolab/model/elastic-net) · [Ridge](/en/ecolab/model/ridge) · [Catalog](/en/ecolab/model/group)
