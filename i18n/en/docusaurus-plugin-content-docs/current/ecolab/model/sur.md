---
title: SUR — Seemingly Unrelated Regressions
sidebar_position: 3
description: Seemingly Unrelated Regressions (SUR) estimates multiple equations with cross-equation correlated errors for efficiency, and how to run it in EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# SUR — Seemingly Unrelated Regressions

**SUR (Seemingly Unrelated Regressions)** estimates **multiple equations** jointly when they **appear independent** but their **errors are correlated across equations**. By exploiting that correlation (via [GLS](/en/ecolab/model/gls)), SUR yields **more efficient** estimates than running OLS on each equation separately.

:::tip When to use
Use SUR when **multiple equations share common shocks** (e.g. expenditure systems across goods, demand functions across sectors) — no endogeneity but correlated errors. If there is endogeneity ⇒ [3SLS](/en/ecolab/model/3sls).
:::

---

## Model specification

A system of $m$ equations $Y_g = X_g \beta_g + \varepsilon_g$ with $\mathrm{Cov}(\varepsilon_g, \varepsilon_h) \ne 0$. SUR is estimated by **FGLS** using the cross-equation error covariance $\Sigma$:

$$
\hat{\beta}_{SUR} = \big(X'(\Sigma^{-1} \otimes I)X\big)^{-1} X'(\Sigma^{-1}\otimes I)Y
$$

When equations share the **same regressors** or errors are uncorrelated, SUR reduces to equation-by-equation OLS.

---

## Running in EcoLab

1. **Modeling** module → *IV & simultaneous equations* family → **SUR**.
2. Declare the **equations** (each with its own $Y_g$ and $X_g$).
3. Run; read system-wide coefficients + the error-correlation matrix; export the **replication code**.

---

## Replication code

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* ── SUR estimation ────────────────────────────────
* Equation 1: y1 depends on x1, x2
* Equation 2: y2 depends on x3, x4
sureg (eq1: y1 x1 x2) (eq2: y2 x3 x4)

* Test cross-equation restrictions
test [eq1]x1 = [eq2]x3
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# ── SUR estimation ────────────────────────────────
library(systemfit)

# Define the system of equations
eq1 <- y1 ~ x1 + x2
eq2 <- y2 ~ x3 + x4
sys <- list(eq1 = eq1, eq2 = eq2)

# Estimate with SUR (Seemingly Unrelated Regressions)
model_sur <- systemfit(sys, method = "SUR", data = df)
summary(model_sur)

# Cross-equation error correlation matrix
model_sur$residCov
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# ── SUR estimation ────────────────────────────────
from linearmodels.system import SUR

# Define equations as a dictionary of formulas
equations = {
    "eq1": {"dependent": df["y1"],
            "exog": df[["x1", "x2"]]},
    "eq2": {"dependent": df["y2"],
            "exog": df[["x3", "x4"]]},
}

model = SUR(equations)
results = model.fit(cov_type="robust")
print(results)
```

  </TabItem>
</Tabs>

---

## Limitations

- Efficiency gains are **small** when errors are weakly correlated or equations share regressors.
- Sensitive to misspecification in any equation.

## Video tutorial

<VideoTutorial
  title="Guide to running SUR in EcoLab"
  src="https://www.youtube.com/embed/m3wyHeBOfUE"
/>

## See also

- [3SLS](/en/ecolab/model/3sls) · [IV/2SLS](/en/ecolab/model/iv-2sls) · [Catalog](/en/ecolab/model/group)

