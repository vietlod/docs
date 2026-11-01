---
title: Consumer Demand Systems (AIDS, QUAIDS) & Structural Berry-BLP
sidebar_position: 13
description: Guide to estimating Deaton-Muellbauer AIDS, Banks-Blundell-Lewbel QUAIDS, and Berry Logit IV / Random-Coefficients BLP differentiated-product demand models in EcoData and EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Consumer Demand Systems (AIDS, QUAIDS) & Structural Berry-BLP

**Family 13 (Structural IO & Demand Systems)** provides structural estimators for multi-good household budget-share equations and market-level differentiated-product discrete choice demand. These estimators underpin empirical welfare analysis, commodity tax incidence, household living-standards research (**VHLSS**), and competition or merger counterfactuals.

In EcoLab, access these estimators under **Modeling → 13. Demand Systems & BLP**. See also the [15-Family Estimator Catalog](/ecolab/model/group).

---

## When Should You Use Family 13?

- **AIDS & QUAIDS:** When analyzing household expenditure shares across $J$ mutually exclusive commodity groups ($\sum_{j=1}^J w_j = 1$), capturing curvature in Engel curves with respect to log total expenditure, and computing Marshallian (uncompensated) and Hicksian (compensated) price elasticities subject to adding-up, homogeneity, and Slutsky symmetry restrictions.
- **Berry Logit IV & Random-Coefficients BLP:** When observing aggregate market shares $s_{jt}$, prices $p_{jt}$, and product attributes $x_{jt}$ across markets $t$, where prices correlate with unobserved product quality shocks $\xi_{jt}$ and consumers exhibit heterogeneous taste coefficients over product characteristics.

---

## Structural Mathematical Specifications

### 1. Quadratic Almost Ideal Demand System — QUAIDS (Banks, Blundell & Lewbel, 1997)

Budget share $w_i$ for commodity group $i$ given total expenditure $m$ and price vector $\mathbf{p}$ satisfies:

$$
w_i = \alpha_i + \sum_{j=1}^{J} \gamma_{ij} \ln p_j + \beta_i \ln \left[\frac{m}{a(\mathbf{p})}\right] + \frac{\lambda_i}{b(\mathbf{p})} \left\{\ln \left[\frac{m}{a(\mathbf{p})}\right]\right\}^2 + u_i
$$

subject to theoretical demand restrictions $\sum_i \alpha_i = 1$, $\sum_i \beta_i = \sum_i \lambda_i = 0$, $\sum_j \gamma_{ij} = 0$, and symmetry $\gamma_{ij} = \gamma_{ji}$. Restricting $\lambda_i = 0$ for all $i$ yields the classical **AIDS** model of Deaton & Muellbauer (1980).

### 2. Differentiated-Product Berry Logit IV & BLP (Berry, Levinsohn & Pakes, 1995)

Indirect utility of consumer $i$ choosing product $j$ in market $t$ is given by:

$$
u_{ijt} = x_{jt} \bar{\beta} - \bar{\alpha} p_{jt} + \xi_{jt} + \mu_{ijt}(x_{jt}, p_{jt}, \nu_i; \Sigma) + \varepsilon_{ijt}
$$

- Under **Berry (1994) Logit IV** ($\Sigma = 0$), share inversion yields the linear IV equation $\ln(s_{jt}) - \ln(s_{0t}) = x_{jt}\bar{\beta} - \bar{\alpha} p_{jt} + \xi_{jt}$ estimated with BLP rival-characteristics instruments or cost shifters.
- Under **Random-Coefficients BLP**, Berry's contraction mapping inverts observed market shares for mean utilities $\delta_{jt}(s_t; \Sigma)$ inside an optimal two-step GMM routine.

---

## Identification Assumptions and Postestimation Diagnostics

1. **Demand-Theory Restrictions (AIDS/QUAIDS):** Joint Wald tests for zero-degree homogeneity and Slutsky symmetry, alongside quadratic Engel-curve significance tests on $\lambda_i$.
2. **Price Endogeneity & Instrument Strength (Berry/BLP):** Kleibergen-Paap / Sanderson-Windmeijer first-stage $F$-statistics and Hansen $J$ overidentification tests on excluded cost or differentiation instruments.
3. **Economic Regularity of Own-Price Elasticities:** Verifies negative own-price elasticities ($\eta_{ii} < 0$) so implied Bertrand-Nash markups remain economically well-defined.

---

## Three-Language Replication Code Examples

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata 18 MP" default>

```stata
* === 1. QUAIDS Demand System With Demographic Scaling ===
quaids w_food w_housing w_transport w_other, anot(10) ///
    prices(p_food p_housing p_transport p_other) ///
    expenditure(total_exp) demographics(hh_size urban)
estat expenditure, atmeans
estat uncompensated, atmeans

* === 2. Berry (1994) Logit Demand IV ===
gen log_share_ratio = ln(share) - ln(outside_share)
ivregress 2sls log_share_ratio x_quality x_size (price = cost_shifter blp_iv_other), vce(cluster market_id)
estat firststage
estat overid
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# === 1. AIDS / LA-AIDS Demand System (micEconAids) ===
library(micEconAids)
aids_fit <- aidsEst(
  priceNames = c("p_food", "p_housing", "p_transport", "p_other"),
  shareNames = c("w_food", "w_housing", "w_transport", "w_other"),
  totExpName = "total_exp",
  data = df,
  method = "LA"
)
summary(aids_fit)
elas(aids_fit)

# === 2. Berry Logit Demand IV (fixest) ===
library(fixest)
df$log_share_ratio <- log(df$share) - log(df$outside_share)
berry_fit <- feols(log_share_ratio ~ x_quality + x_size | market_id | price ~ cost_shifter + blp_iv_other,
                   cluster = ~market_id, data = df)
summary(berry_fit)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# === Random-Coefficients BLP & Elasticities (pyblp) ===
import pyblp

problem = pyblp.Problem(
    product_formulations=(
        pyblp.Formulation("1 + prices + x_quality + x_size"),
        pyblp.Formulation("0 + prices + x_quality"),
    ),
    product_data=product_df,
    integration=pyblp.Integration("halton", size=100),
)
results = problem.solve(sigma=[[0.5, 0.0], [0.0, 0.5]], method="2s")
elasticities = results.compute_elasticities()
markups = results.compute_markups()
print(results)
```

  </TabItem>
</Tabs>
