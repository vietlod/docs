---
title: Corporate default probability (Logit)
sidebar_position: 4
description: Hands-on Logit in EcoLab — predicting corporate default probability from financial ratios, reading odds ratios and marginal effects.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Corporate default probability (Logit)

This illustrates [Logit](/en/ecolab/model/logit) for a binary outcome: predicting the **probability of default** ($Y=1$ if default) from financial ratios. Figures are **illustrative**.

> Summary: regress the binary `default` on leverage, profitability and liquidity; interpret via **odds ratios** and **marginal effects**.

---

## Step 1 — Ideation
- **Question:** which financial ratios raise default probability, and by how much?

## Step 2 — Literature Review
Early-warning credit-risk models (Altman Z-score, hazard models); clarify variables and threshold.

## Step 3 — Data Collection

| Variable | Symbol | Measurement | Source |
| :--- | :--- | :--- | :--- |
| Default | `default` | 1 = default, 0 = not | listed-firm statements |
| Leverage | `leverage` | Debt/Total assets | financials |
| Profitability | `roa` | Net income/Total assets | financials |
| Liquidity | `current` | Current assets/Current liab. | financials |

## Step 4 — Modeling

Choose the *Limited dependent variable* family → **Logit**:

$$
P(default_i = 1) = \frac{1}{1 + e^{-(\beta_0 + \beta_1 leverage_i + \beta_2 roa_i + \beta_3 current_i)}}
$$

**Illustrative results (format — not real results):**

| Variable | Coefficient | Odds ratio | AME | p-value |
| :--- | :--- | :--- | :--- | :--- |
| leverage | 1.45 | 4.26 | 0.21 | 0.000 |
| roa | −3.10 | 0.045 | −0.28 | 0.000 |
| current | −0.60 | 0.55 | −0.07 | 0.012 |
| AUC | 0.84 | | | |

Sample interpretation: high leverage **raises** default odds (OR ≈ 4.3); higher ROA and liquidity **reduce** risk; AUC 0.84 indicates good classification.

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* ===== Logit — Corporate default probability =====
* Estimate the logit model
logit default leverage roa current

* Odds ratios
logit default leverage roa current, or

* Average marginal effects (AME)
margins, dydx(*)

* Classification table
estat classification

* ROC curve and AUC
lroc
lsens
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# ===== Logit — Corporate default probability =====
model <- glm(default ~ leverage + roa + current,
             data   = df,
             family = binomial(link = "logit"))

summary(model)

# Odds ratios
exp(coef(model))
exp(confint(model))

# Average marginal effects (AME)
library(margins)
summary(margins(model))

# ROC curve and AUC
library(pROC)
pred <- predict(model, type = "response")
roc_obj <- roc(df$default, pred)
auc(roc_obj)
plot(roc_obj, main = "ROC Curve — Default Logit")
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# ===== Logit — Corporate default probability =====
import statsmodels.api as sm
import numpy as np
from sklearn.metrics import roc_auc_score, roc_curve
import matplotlib.pyplot as plt

# Prepare data
X = sm.add_constant(df[["leverage", "roa", "current"]])
y = df["default"]

# Estimate the logit model
model = sm.Logit(y, X).fit()
print(model.summary())

# Odds ratios
print("Odds Ratios:")
print(np.exp(model.params))

# Average marginal effects
mfx = model.get_margeff()
print(mfx.summary())

# ROC curve and AUC
y_pred = model.predict(X)
print("AUC:", roc_auc_score(y, y_pred))

fpr, tpr, _ = roc_curve(y, y_pred)
plt.plot(fpr, tpr, label=f"AUC = {roc_auc_score(y, y_pred):.2f}")
plt.xlabel("False Positive Rate")
plt.ylabel("True Positive Rate")
plt.title("ROC Curve — Default Logit")
plt.legend()
plt.show()
```

  </TabItem>
</Tabs>

## Step 5 — Reporting
Export a report + **replication code**; include the classification table and ROC curve.

## Video tutorial

<VideoTutorial
  title="Guide to running Logit for default prediction in EcoLab"
  src="https://www.youtube.com/user/vietlod"
/>

## See also
- [Logit](/en/ecolab/model/logit) · [Probit](/en/ecolab/model/probit) · [Catalog](/en/ecolab/model/group)
