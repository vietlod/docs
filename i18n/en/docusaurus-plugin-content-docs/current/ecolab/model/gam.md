---
title: GAM — Generalized Additive Models
sidebar_position: 2
description: Generalized Additive Models (GAM) model smooth nonlinear relationships via splines without pre-specifying the functional form, and how to run them in EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# GAM — Generalized Additive Models

**GAM (Generalized Additive Models)** model **smooth nonlinear** relationships between $Y$ and each regressor using **smooth functions (splines)** instead of linear coefficients — **without pre-specifying the functional form** as [NLS](/en/ecolab/model/nls) requires. GAM bridges linear regression and nonparametric models.

:::tip When to use
Use GAM when you suspect a relationship is **nonlinear but of unknown shape** (e.g. a U-shaped effect of age/income). GAM produces interpretable smooth-function plots while keeping additivity.
:::

---

## Model specification

$$
g\big(E[Y_i]\big) = \beta_0 + f_1(X_{1i}) + f_2(X_{2i}) + \dots + f_k(X_{ki})
$$

where $g(\cdot)$ is a link function (identity/logit/log…) and each $f_j$ is a **smooth function** (spline) estimated from data, with a **roughness penalty** to avoid overfitting; smoothness is chosen via GCV/REML.

---

## Running in EcoLab

1. **Modeling** module → *Non-linear & semi-parametric* family → **GAM**.
2. Select $Y$, the $X$ variables, mark which use a **smooth function**; choose the link.
3. Run; view the per-variable **smooth-function plots** + effective degrees of freedom; export the **replication code**.

---

## Replication code

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* ── GAM estimation (semiparametric) ───────────────
* Stata does not have a built-in gam command;
* use npregress series or the community semipar command.

* Option 1: npregress series with B-spline basis
npregress series y x1, basis(bspline)

* Option 2: semipar (community-contributed)
* ssc install semipar
semipar y x2 x3, nonpar(x1)
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# ── GAM estimation ────────────────────────────────
library(mgcv)

# Smooth terms s() for nonlinear, linear term for x3
model_gam <- gam(
  y ~ s(x1) + s(x2) + x3,
  data   = df,
  method = "REML"
)

# Summary: edf, significance of smooth terms
summary(model_gam)

# Smooth-function plots
plot(model_gam, pages = 1, residuals = TRUE)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# ── GAM estimation ────────────────────────────────
from pygam import LinearGAM, s, l

# s(i) = smooth spline for column i
# l(i) = linear term for column i
X = df[["x1", "x2", "x3"]].values
y = df["y"].values

gam = LinearGAM(s(0) + s(1) + l(2)).fit(X, y)

# Summary: effective degrees of freedom, p-values
print(gam.summary())

# Plot partial dependence for each term
for i, term in enumerate(gam.terms):
    if term.isintercept:
        continue
    gam.plot(term=i)
```

  </TabItem>
</Tabs>

---

## Limitations

- Interpreted via **plots** rather than a single coefficient; harder to fit into concise causal inference.
- Assumes **additivity** (does not automatically capture interactions unless specified).

## Video tutorial

<VideoTutorial
  title="Guide to running GAM in EcoLab"
  src="https://www.youtube.com/user/vietlod"
/>

## See also

- [NLS](/en/ecolab/model/nls) · [Quantile Regression](/en/ecolab/model/quantile) · [Catalog](/en/ecolab/model/group)
