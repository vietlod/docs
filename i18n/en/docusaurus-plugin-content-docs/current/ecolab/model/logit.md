---
title: Logit — Logistic regression
sidebar_position: 1
description: The Logit model for a binary dependent variable, the logistic link, odds ratios, marginal effects, and how to run it in EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Logit — Binary logistic regression

**Logit** models the probability of a **binary dependent variable** ($Y \in \{0,1\}$) through the **logistic** link. It is the standard model when the outcome is "yes/no" (default, participation, pass/fail…).

:::tip When to use
Use Logit when $Y$ is **binary**. Logit coefficients are interpreted via the **odds ratio** $e^{\beta}$; to interpret directly in probability terms, read the **marginal effects**.
:::

---

## Model specification

$$
P(Y_i = 1 \mid X_i) = \frac{1}{1 + e^{-(\beta_0 + \beta_1 X_{1i} + \dots + \beta_k X_{ki})}}
$$

Estimated by **Maximum Likelihood (MLE)**. For coefficient $\beta_j$: $e^{\beta_j}$ is the odds ratio; marginal effects depend on the value of $X$.

---

## Interpretation & diagnostics

- **Odds ratio** $e^{\beta_j} > 1$ ⇒ increases odds; $< 1$ ⇒ decreases.
- **Marginal effects** (average AME or at-the-mean MEM) give the change in probability.
- Fit: **Pseudo-$R^2$** (McFadden), classification accuracy, ROC/AUC.
- Check: perfect separation, multicollinearity.

---

## Running in EcoLab

1. **Modeling** module → *Limited dependent variable* family → **Logit**.
2. Select the binary $Y$ and the $X$ variables.
3. Run; read coefficients, **odds ratios**, **marginal effects**, AUC; export the **replication code**.

---

## Input / output example

**Input (illustrative):** `default` (0/1) on `leverage`, `roa`, `size`.

**Output (format, illustrative figures — not real results):**

| Variable | Coefficient | Odds ratio | AME | p-value |
| :--- | :--- | :--- | :--- | :--- |
| leverage | 1.20 | 3.32 | 0.18 | 0.000 |
| roa | −2.10 | 0.12 | −0.31 | 0.001 |

---

## Replication code

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* ===== Logit — Binary logistic regression =====
* Estimate the logit model
logit vo_no don_bay roa quy_mo

* Odds ratios
logit vo_no don_bay roa quy_mo, or

* Average marginal effects (AME)
margins, dydx(*)

* Classification table (sensitivity, specificity)
estat classification

* ROC curve and AUC
lroc
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# ===== Logit — Binary logistic regression =====
# Estimate the logit model
model <- glm(vo_no ~ don_bay + roa + quy_mo,
             data   = df,
             family = binomial(link = "logit"))

summary(model)

# Odds ratios
exp(coef(model))
exp(confint(model))

# Average marginal effects (AME)
library(margins)
mfx <- margins(model)
summary(mfx)

# Classification & AUC
library(pROC)
pred  <- predict(model, type = "response")
roc_obj <- roc(df$vo_no, pred)
auc(roc_obj)
plot(roc_obj, main = "ROC Curve — Logit")
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# ===== Logit — Binary logistic regression =====
import statsmodels.api as sm
from sklearn.metrics import roc_auc_score, classification_report

# Prepare data
X = sm.add_constant(df[["don_bay", "roa", "quy_mo"]])
y = df["vo_no"]

# Estimate the logit model
model = sm.Logit(y, X).fit()
print(model.summary())

# Odds ratios
import numpy as np
print("Odds Ratios:")
print(np.exp(model.params))

# Average marginal effects (AME)
mfx = model.get_margeff()
print(mfx.summary())

# Classification & AUC
y_pred = model.predict(X)
print("AUC:", roc_auc_score(y, y_pred))
print(classification_report(y, (y_pred > 0.5).astype(int)))
```

  </TabItem>
</Tabs>

---

## Limitations

- Raw coefficients are **not** probability effects — use marginal effects.
- Assumes the logistic form; for the normal-CDF link see [Probit](/en/ecolab/model/probit).

## Video tutorial

<VideoTutorial
  title="Guide to running Logit (logistic regression) in EcoLab"
  src="https://www.youtube.com/user/vietlod"
/>

## See also

- [Probit](/en/ecolab/model/probit) · [Tobit](/en/ecolab/model/tobit) · [Catalog](/en/ecolab/model/group)
