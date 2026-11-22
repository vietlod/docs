---
title: Multilevel Mixed-Effects, Nonlinear GLMM & Complex Survey Small-Area Models
sidebar_position: 16
description: Guide to Hierarchical Linear Mixed Models (HLM), Generalized Linear Mixed Models (GLMM), Taylor/BRR/Jackknife complex survey inference, and Fay–Herriot small-area estimation on EcoData and EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Multilevel Mixed-Effects, Nonlinear GLMM & Complex Survey Small-Area Models

**Family 16 (Multilevel, Mixed-Effects and Complex Survey Econometrics)** comprises **3 sub-models** and **12 canonical estimators** engineered for hierarchical nested microdata (households within communes and provinces) and multi-stage stratified probability surveys such as **VHLSS 2004–2024**, **LFS**, **DHS**, and **World Bank Enterprise Surveys**.

In EcoLab, access these estimators under **Modeling → 16. Multilevel, Mixed & Survey**, synchronized with the `analyze_multilevel_survey` MCP tool. See also the [16-Family Estimator Catalog](/en/ecolab/model/group).

---

## Three Methodological Sub-Models in Family 16

1. **Hierarchical Linear and Mixed-Effects Models (`hierarchical_linear_mixed`)**:
   - `linear_mixed_hlm` — Random-intercept and random-slope REML / ML linear mixed model.
   - `three_level_nested_mixed` — Three-level nested variance-components model.
   - `crossed_random_effects_mixed` — Two-way non-nested crossed random-effects model.
   - `mundlak_within_between_mixed` — Within-between correlated random-effects hybrid model.
2. **Generalized Linear Mixed Models (`generalized_mixed_glmm`)**:
   - `mixed_effects_logit` — Adaptive Gauss–Hermite quadrature mixed-effects logistic model.
   - `mixed_effects_probit` — Multilevel random-effects probit specification.
   - `mixed_effects_poisson_nb` — Multilevel mixed-effects Poisson and negative binomial count model.
   - `mixed_effects_ordinal_logit` — Multilevel cumulative ordered logit model.
3. **Complex Survey Design and Small-Area Estimation (`complex_survey_sae`)**:
   - `svy_taylor_linearized_glm` — Stratified multi-stage PSU Taylor-linearized survey GLM.
   - `svy_brr_jackknife_repweights` — Balanced Repeated Replication (BRR), Fay, and Delete-1 Jackknife replicate-weight variance estimation.
   - `fay_herriot_small_area` — Empirical Best Linear Unbiased Prediction (EBLUP) area-level Fay–Herriot model.
   - `nested_error_unit_sae` — Battese–Harter–Fuller unit-level nested-error small-area poverty/income estimator.

---

## Three-Language Replication Code Examples

<Tabs groupId="lang">
  <TabItem value="stata" label="StataNow 19.5 MP" default>

```stata
* === 1. Three-Level Hierarchical Linear Mixed Model (mixed REML) ===
mixed log_exp edu_head hh_size urban || prov_id: || commune_id:, reml
estat icc

* === 2. Stratified Multi-Stage PSU Survey Regression (svy linearized) ===
svyset commune_id [pweight = wt_hh], strata(stratum_id) vce(linearized) singleunit(centered)
svy: regress log_exp edu_head hh_size urban
estat effects
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# === 1. Hierarchical Linear Mixed Model (lme4) ===
library(lme4)
fit_hlm <- lmer(log_exp ~ edu_head + hh_size + urban + (1 | prov_id/commune_id), data = df, REML = TRUE)
summary(fit_hlm)

# === 2. Complex Survey Taylor Linearized GLM (survey) ===
library(survey)
des <- svydesign(id = ~commune_id, strata = ~stratum_id, weights = ~wt_hh, data = df, nest = TRUE)
fit_svy <- svyglm(log_exp ~ edu_head + hh_size + urban, design = des)
summary(fit_svy)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# === Hierarchical Mixed Linear Model (statsmodels MixedLM) ===
import statsmodels.formula.api as smf

md = smf.mixedlm("log_exp ~ edu_head + hh_size + urban", data=df, groups=df["prov_id"])
mdf = md.fit(reml=True)
print(mdf.summary())
```

  </TabItem>
</Tabs>
