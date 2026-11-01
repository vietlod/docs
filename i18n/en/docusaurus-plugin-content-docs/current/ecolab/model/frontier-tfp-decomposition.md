---
title: Efficiency Frontiers (SFA, DEA, Malmquist) & Structural TFP (OP, LP, ACF)
sidebar_position: 14
description: Guide to Stochastic Frontier Analysis (SFA), Data Envelopment Analysis (DEA), Malmquist Productivity Indices, and structural Olley-Pakes, Levinsohn-Petrin, Wooldridge, and Ackerberg-Caves-Frazer (ACF) TFP estimation in EcoData and EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Efficiency Frontiers (SFA, DEA, Malmquist) & Structural TFP (OP, LP, ACF)

**Family 14 (Productivity, Frontier & TFP Estimation)** delivers parametric, non-parametric, and structural control-function estimators for technical efficiency, cost efficiency, and firm-level **Total Factor Productivity (TFP)** across manufacturing firms, commercial banks, hospitals, and regional economies.

In EcoLab, access these estimators under **Modeling → 14. Frontier & TFP Estimation**. See also the [15-Family Estimator Catalog](/ecolab/model/group).

---

## When Should You Use Family 14?

- **Stochastic Frontier Analysis (SFA — Aigner-Lovell-Schmidt, Battese-Coelli):** When separating symmetric random shocks $v_{it}$ from one-sided technical or cost inefficiency $u_{it} \ge 0$ under Cobb-Douglas or Translog production/cost frontiers.
- **Data Envelopment Analysis (DEA — CCR, BCC) & Malmquist Index:** When benchmarking multi-input, multi-output decision-making units without imposing parametric functional forms, or decomposing dynamic productivity growth into technological frontier shifts and efficiency catch-up.
- **Structural Production Functions (Olley-Pakes, Levinsohn-Petrin, Wooldridge, Ackerberg-Caves-Frazer ACF TFP):** When estimating firm-level production elasticities (e.g., on listed corporate financials or enterprise surveys) where variable input choices correlate with unobserved productivity shocks $\omega_{it}$ (solving Marschak-Andrews simultaneity bias).

---

## Structural Mathematical Specifications

### 1. Panel Stochastic Production Frontier (Battese & Coelli, 1995)

$$
\ln Y_{it} = \beta_0 + \sum_{k=1}^{K} \beta_k \ln X_{kit} + v_{it} - u_{it}, \qquad v_{it} \sim \mathcal{N}(0, \sigma_v^2), \quad u_{it} \sim \mathcal{N}^+(z_{it}\delta, \sigma_u^2)
$$

Unit-specific technical efficiency is recovered via $\text{TE}_{it} = \mathbb{E}[\exp(-u_{it}) \mid \varepsilon_{it}] \in (0, 1]$.

### 2. Ackerberg-Caves-Frazer Structural TFP (ACF, 2015)

For log value added $y_{it}$ with labor $l_{it}$, capital $k_{it}$, and first-order Markov productivity $\omega_{it} = g(\omega_{it-1}) + \xi_{it}$:

$$
y_{it} = \beta_l l_{it} + \beta_k k_{it} + \omega_{it} + \eta_{it}
$$

Inverting strictly monotonic intermediate input demand $m_{it} = f_t(k_{it}, l_{it}, \omega_{it})$, Stage 1 purges measurement noise $\eta_{it}$ to recover expected output $\hat{\Phi}_{it}$, while Stage 2 jointly identifies $(\beta_l, \beta_k)$ via GMM orthogonality conditions on productivity innovations $\mathbb{E}[\xi_{it}(\beta_l, \beta_k) \otimes \mathbf{Z}_{it}] = 0$.

---

## Identification Assumptions and Postestimation Diagnostics

1. **Boundary Likelihood-Ratio Test for Inefficiency (SFA):** Generalized LR test of $H_0: \sigma_u^2 = 0$ evaluated against the Kodde-Palm mixed $\bar{\chi}^2$ distribution alongside variance-share $\gamma = \sigma_u^2 / (\sigma_v^2 + \sigma_u^2)$.
2. **Scale Efficiency & Bias-Corrected Frontiers (DEA):** Compares CRS (CCR) and VRS (BCC) scores to isolate scale efficiency, paired with Simar-Wilson bootstrap confidence intervals.
3. **Proxy Monotonicity & Returns-to-Scale Wald Tests (OP/LP/Wooldridge/ACF):** Verifies strictly positive investment $i_{it} > 0$ (OP) or intermediate materials $m_{it} > 0$ (LP/ACF), tests constant returns to scale $H_0: \beta_l + \beta_k = 1$, and reports Hansen $J$ overidentification statistics.

---

## Three-Language Replication Code Examples

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata 18 MP" default>

```stata
* === 1. Panel Stochastic Production Frontier (Battese-Coelli SFA) ===
xtset firm_id year
xtfrontier ln_output ln_capital ln_labor, tvd
predict te_sfa, te

* === 2. Ackerberg-Caves-Frazer Structural TFP (prodest) ===
prodest ln_va, free(ln_labor) state(ln_capital) proxy(ln_materials) ///
    va acf id(firm_id) t(year) reps(50)
predict tfp_acf, resid
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# === 1. Stochastic Frontier Analysis (frontier) ===
library(frontier)
sfa_fit <- sfa(ln_output ~ ln_capital + ln_labor | export_dummy + firm_age, data = df)
summary(sfa_fit)
df$te_score <- efficiencies(sfa_fit)

# === 2. Structural Production Function & TFP (prodest) ===
library(prodest)
acf_fit <- prodestACF(Y = df$ln_va, fX = df$ln_labor, sX = df$ln_capital,
                      pX = df$ln_materials, idvar = df$firm_id, timevar = df$year)
summary(acf_fit)
df$tfp_acf <- omega(acf_fit)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# === Structural Two-Step Control-Function ACF GMM ===
import numpy as np
import statsmodels.api as sm
from scipy.optimize import minimize

# Stage 1: Third-order polynomial approximation purging measurement error
poly_terms = np.column_stack([
    df["ln_k"], df["ln_l"], df["ln_m"],
    df["ln_k"] ** 2, df["ln_l"] ** 2, df["ln_m"] ** 2,
    df["ln_k"] * df["ln_m"], df["ln_l"] * df["ln_m"],
])
phi_hat = sm.OLS(df["ln_va"], sm.add_constant(poly_terms)).fit().fittedvalues

# Stage 2: GMM orthogonality on Markov productivity innovations xi_it
def acf_gmm_loss(beta):
    b_l, b_k = beta
    omega = phi_hat - b_l * df["ln_l"].to_numpy() - b_k * df["ln_k"].to_numpy()
    omega_lag = df.assign(om=omega).groupby("firm_id")["om"].shift(1)
    valid = omega_lag.notna()
    xi = sm.OLS(omega[valid], sm.add_constant(omega_lag[valid])).fit().resid
    Z = np.column_stack([df.loc[valid, "ln_k"], df.groupby("firm_id")["ln_l"].shift(1)[valid]])
    moments = (Z.T @ xi) / valid.sum()
    return float(moments @ moments)

opt = minimize(acf_gmm_loss, x0=[0.6, 0.35], method="BFGS")
print("ACF structural elasticities (beta_l, beta_k):", opt.x)
```

  </TabItem>
</Tabs>
