---
title: Wild Cluster Bootstrap, Causal Machine Learning (Double ML, Causal Forest) & High-Dimensional Inference
sidebar_position: 15
description: Guide to Wild Cluster Bootstrap resampling, Chernozhukov Double/Debiased Machine Learning, Athey-Wager Causal Forests, and PCA/Factor dimensionality reduction in EcoData and EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Wild Cluster Bootstrap, Causal Machine Learning (Double ML, Causal Forest) & High-Dimensional Inference

**Family 15 (Resampling, Econometric ML & High-Dimensional Inference)** addresses two central challenges in modern empirical economics: (1) valid finite-sample inference when clusters are few or unbalanced in size (such as **34 consolidated provinces** or regional macro blocks), and (2) root-$N$ consistent causal estimation under high-dimensional or non-linear confounding.

In EcoLab, access these estimators under **Modeling → 15. Bootstrap & Causal ML**. See also the [15-Family Estimator Catalog](/ecolab/model/group).

---

## When Should You Use Family 15?

- **Wild Cluster Bootstrap (Cameron-Gelbach-Miller; Roodman-MacKinnon-Nielsen-Webb):** When errors correlate within clusters and the number of clusters is modest ($G < 30$, or $G = 34$ provinces with skewed cluster sizes), where conventional asymptotic cluster-robust standard errors over-reject true null hypotheses.
- **Nonparametric Pairs, Moving-Block & Panel Cluster Bootstrap:** When constructing valid standard errors and percentile-t confidence intervals for multi-step estimators (Heckman, Oaxaca-Blinder, DEA, ACF TFP) or serially dependent series.
- **Double / Debiased Machine Learning (Chernozhukov et al., 2018):** When estimating a low-dimensional causal parameter $\theta_0$ while partialling out dozens or hundreds of nuisance covariates $W$ via Lasso, Random Forests, or Gradient Boosting using Neyman-orthogonal scores and $K$-fold cross-fitting.
- **Generalized Random Forests / Causal Forest (Wager & Athey, 2018):** When estimating heterogeneous Conditional Average Treatment Effects $\tau(x) = \mathbb{E}[Y(1) - Y(0) \mid X = x]$ (CATE) with honest sample splitting and valid asymptotic confidence intervals.
- **PCA, Exploratory Factor Analysis & Clustering:** When constructing composite governance, financial-inclusion, or ESG indices and structural typologies prior to econometric estimation.

---

## Structural Mathematical Specifications

### 1. Wild Restricted Cluster Bootstrap (`boottest`)

Imposing the null hypothesis $H_0: \beta_1 = \beta_1^0$, restricted cluster residuals $\tilde{\mathbf{u}}_g$ ($g = 1, \dots, G$) are perturbed by independent auxiliary weights $v_g^{(b)}$ (Rademacher $\{\pm 1\}$ or Webb's 6-point distribution when $G \le 12$):

$$
\mathbf{y}_g^{*(b)} = \mathbf{X}_g \tilde{\beta} + v_g^{(b)} \tilde{\mathbf{u}}_g, \qquad t^{*(b)} = \frac{\hat{\beta}_1^{*(b)} - \beta_1^0}{\text{SE}_{\text{CR}}(\hat{\beta}_1^{*(b)})}
$$

Evaluating the empirical distribution of pivotal $|t^{*(b)}|$ statistics delivers asymptotic refinement in finite cluster samples.

### 2. Neyman Orthogonalization in Double / Debiased ML (Partially Linear Model)

For the partially linear regression $Y = D\theta_0 + g_0(W) + U$ with $D = m_0(W) + V$:

$$
\hat{\theta}_{\text{DML}} = \left(\frac{1}{N} \sum_{k=1}^{K} \sum_{i \in I_k} \hat{V}_{i}^{(-k)} \hat{V}_{i}^{(-k)}\right)^{-1} \left(\frac{1}{N} \sum_{k=1}^{K} \sum_{i \in I_k} \hat{V}_{i}^{(-k)} \hat{U}_{i}^{(-k)}\right)
$$

where nuisance residuals $\hat{U}_i^{(-k)} = Y_i - \hat{\ell}_0^{(-k)}(W_i)$ and $\hat{V}_i^{(-k)} = D_i - \hat{m}_0^{(-k)}(W_i)$ are predicted out-of-fold on $I_k^c$, eliminating regularization and overfitting bias.

---

## Identification Assumptions and Postestimation Diagnostics

1. **Auxiliary Weight Selection (Wild Bootstrap):** Uses **Rademacher** weights for $G \ge 13$ clusters and **Webb 6-point** weights when $G \le 12$ to prevent discrete enumeration collapse ($2^G$ vs. $6^G$).
2. **Positivity Overlap & CATE Calibration (Double ML / Causal Forest):** Audits propensity-score overlap $\hat{m}(W) \in [\epsilon, 1-\epsilon]$, out-of-sample nuisance RMSE, and Best Linear Predictor (BLP) heterogeneity calibration tests.
3. **Sampling Adequacy (PCA / Factor):** Reports Kaiser-Meyer-Olkin ($\text{KMO} > 0.6$), Bartlett's sphericity test, and cumulative explained variance shares.

---

## Three-Language Replication Code Examples

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata 18 MP" default>

```stata
* === 1. Wild Cluster Bootstrap With Rademacher / Webb Weights (boottest) ===
reghdfe grdp_growth public_inv fdi_ratio human_cap, absorb(prov_id year) vce(cluster prov_id)
boottest public_inv, cluster(prov_id) reps(9999) weighttype(rademacher) seed(2026)

* === 2. Double / Debiased Machine Learning Cross-Fit Partialing-Out ===
xporegress grdp_growth public_inv, controls(c.x1##c.x2 x3-x40) vce(cluster prov_id) rseed(2026)
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# === 1. Fast Wild Cluster Bootstrap (fwildclusterboot + fixest) ===
library(fixest)
library(fwildclusterboot)
fe_fit <- feols(grdp_growth ~ public_inv + fdi_ratio + human_cap | prov_id + year,
                cluster = ~prov_id, data = df)
boot_res <- boottest(fe_fit, clustid = "prov_id", param = "public_inv",
                     B = 9999, type = "rademacher")
summary(boot_res)

# === 2. Honest Causal Forest CATE Estimation (grf) ===
library(grf)
cf_fit <- causal_forest(X = as.matrix(df[, control_cols]), Y = df$y, W = df$treat, seed = 2026)
average_treatment_effect(cf_fit, target.sample = "all")
test_calibration(cf_fit)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# === Double / Debiased Machine Learning With K-Fold Cross-Fitting (doubleml) ===
import doubleml as dml
from sklearn.ensemble import RandomForestRegressor

dml_data = dml.DoubleMLData(df, y_col="grdp_growth", d_cols="public_inv", x_cols=control_cols)
ml_l = RandomForestRegressor(n_estimators=300, max_depth=8, random_state=2026)
ml_m = RandomForestRegressor(n_estimators=300, max_depth=8, random_state=2026)

dml_plr = dml.DoubleMLPLR(dml_data, ml_l=ml_l, ml_m=ml_m, n_folds=5)
dml_plr.fit()
print(dml_plr.summary)
```

  </TabItem>
</Tabs>
