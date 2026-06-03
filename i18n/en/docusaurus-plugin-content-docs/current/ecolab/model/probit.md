---
title: Probit
sidebar_position: 2
description: The Probit model for a binary outcome using the standard normal CDF, how it differs from Logit, marginal effects, and how to run it in EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Probit — Normal binary regression

**Probit** models the probability of a **binary** outcome through the **standard normal cumulative distribution function** $\Phi(\cdot)$. Empirically, Probit and [Logit](/en/ecolab/model/logit) usually lead to similar conclusions; they differ in the assumed error distribution (normal vs logistic).

:::tip Logit or Probit?
Results are usually very close. **Logit** is convenient for its **odds ratios**; **Probit** is preferred when a normal error assumption is more reasonable or within extended models (Heckman, biprobit). Always compare through **marginal effects**.
:::

---

## Model specification

$$
P(Y_i = 1 \mid X_i) = \Phi(\beta_0 + \beta_1 X_{1i} + \dots + \beta_k X_{ki})
$$

where $\Phi$ is the standard normal CDF. Estimated by **MLE**.

---

## Interpretation

- Coefficients $\beta_j$ are **not** read directly; use **marginal effects** (AME/MEM).
- Model fit: Pseudo-$R^2$, classification, AUC.

---

## Running in EcoLab

1. **Modeling** module → *Limited dependent variable* family → **Probit**.
2. Select the binary $Y$ and the $X$ variables.
3. Run; read **marginal effects**; compare with Logit; export the **replication code**.

---

## Replication code

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* ===== Probit — Normal binary regression =====
* Estimate the probit model
probit y x1 x2 x3

* Average marginal effects (AME)
margins, dydx(*)

* Predicted probabilities
predict phat, pr

* Classification table
estat classification

* Pseudo-R² is shown in the estimation output
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# ===== Probit — Normal binary regression =====
# Estimate the probit model
model <- glm(y ~ x1 + x2 + x3,
             data   = df,
             family = binomial(link = "probit"))

summary(model)

# Average marginal effects (AME)
library(margins)
mfx <- margins(model)
summary(mfx)

# Predicted probabilities
df$phat <- predict(model, type = "response")

# McFadden Pseudo-R²
null_model <- glm(y ~ 1, data = df, family = binomial(link = "probit"))
1 - logLik(model) / logLik(null_model)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# ===== Probit — Normal binary regression =====
import statsmodels.api as sm

# Prepare data
X = sm.add_constant(df[["x1", "x2", "x3"]])
y = df["y"]

# Estimate the probit model
model = sm.Probit(y, X).fit()
print(model.summary())

# Average marginal effects (AME)
mfx = model.get_margeff()
print(mfx.summary())

# Predicted probabilities
df["phat"] = model.predict(X)

# McFadden Pseudo-R² is shown in model.summary()
print("Pseudo R²:", model.prsquared)
```

  </TabItem>
</Tabs>

---

## Limitations

- No odds interpretation like Logit.
- Same underlying assumptions (exogeneity, correct specification) as other binary-choice models.

## Video tutorial

<VideoTutorial
  title="Guide to running Probit in EcoLab"
  src="https://www.youtube.com/embed/m3wyHeBOfUE"
/>

## See also

- [Logit](/en/ecolab/model/logit) · [Heckman](/en/ecolab/model/heckman) · [Catalog](/en/ecolab/model/group)

