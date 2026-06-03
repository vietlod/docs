---
title: Difference-in-Differences (DID)
sidebar_position: 5
description: The Difference-in-Differences (DID) method for policy impact evaluation, the parallel trends assumption, event study, and how to run DID in EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Difference-in-Differences (DID)

**DID** is a **causal inference** method that estimates the effect of an intervention/policy by comparing the change over time between a **treatment group** and a **control group**. The idea: the difference of the *before–after differences* between the two groups is the policy effect, provided the two groups would have followed **parallel trends** absent the intervention.

In EcoLab, DID belongs to the **Causal Inference** group. See [Estimation & Modeling](/en/ecolab/econometrics-modeling).

---

## When should you use DID?

- There is a **shock/policy** applied to one group at a point in time, while another group is not.
- You have data **before and after** the intervention for both groups (panel or repeated cross-sections).
- The **parallel trends** assumption is plausible (testable via pre-trends).

---

## Model specification

Two-group, two-period DID form:

$$
Y_{it} = \beta_0 + \beta_1 \, \text{Treat}_i + \beta_2 \, \text{Post}_t + \delta \, (\text{Treat}_i \times \text{Post}_t) + \varepsilon_{it}
$$

- $\delta$ (the interaction coefficient) is the **estimated policy effect (ATT)**.
- Extension: TWFE (two-way fixed effects) with unit and time fixed effects for multiple groups/periods.

---

## Assumptions and tests

1. **Parallel trends:** check by comparing **pre-intervention** trends (pre-trends) via an **event study**.
2. **No simultaneous shock** affecting only one group.
3. **SUTVA / no spillover** between treatment and control groups.
4. With **staggered** treatment timing, traditional TWFE can be biased — consider modern estimators (Callaway–Sant'Anna, Sun–Abraham).
5. **Clustered** standard errors by unit.

---

## Running in EcoLab

1. **Data Collection** module: create the `Treat`, `Post` and interaction variables; prepare panel data.
2. **Modeling** module → *Causal Inference* group → *DiD* (or TWFE).
3. Declare the treatment variable, time, outcome variable and controls; choose clustered standard errors.
4. Run an **event study** to check pre-trends; read the $\delta$ coefficient (ATT) and the replication code.

---

## Input / output example

**Input (illustrative):** a business-support policy applied from year T in some provinces; `revenue` is the outcome.

**Output (format, illustrative figures — not real results):**

| Component | Coefficient | p-value |
| :--- | :--- | :--- |
| Treat × Post ($\delta$, ATT) | 0.124*** | 0.003 |
| Pre-trend (event study) | ≈ 0, not significant | parallel trends hold |

Interpretation: the policy raised the outcome by about 12.4% relative to the control group; insignificant pre-trends support the parallel-trends assumption.

---

## Replication code

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* ── DID: two-group, two-period ────────────────────
* treated = treatment dummy, post = post-intervention dummy
regress y i.treated##i.post controls, vce(cluster id)

* ── Modern DID for staggered treatment ────────────
* Install: ssc install did_multiplegt
did_multiplegt y id time treated, robust_dynamic ///
    placebo(3) dynamic(3) breps(100)
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# ── DID: two-group, two-period ────────────────────
library(did)
library(lmtest)
library(sandwich)

# Option 1: simple interaction regression
model_did <- lm(y ~ treated * post + controls, data = df)
coeftest(model_did, vcov = vcovCL(model_did,
                                   cluster = df$id))

# Option 2: Callaway & Sant'Anna (staggered DID)
cs_did <- att_gt(
  yname  = "y",
  tname  = "time",
  idname = "id",
  gname  = "first_treat",
  data   = df
)
summary(cs_did)
ggdid(cs_did)   # Event study plot
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# ── DID: two-group, two-period ────────────────────
import statsmodels.formula.api as smf

model_did = smf.ols(
    "y ~ treated * post + controls",
    data=df
).fit(
    cov_type="cluster",
    cov_kwds={"groups": df["id"]}
)
print(model_did.summary())

# The coefficient on treated:post is the ATT (δ)
```

  </TabItem>
</Tabs>

---

## Limitations and notes

- Results are **invalid** if parallel trends are violated — always report the event study.
- **Staggered DID** with TWFE can suffer from "negative weighting"; use modern estimators when treatment timing differs.
- The control group must be genuinely comparable; consider combining with PSM or synthetic control.
- You need enough pre-intervention observations to test pre-trends.

---

## Video tutorial

<VideoTutorial
  title="Guide to running DID in EcoLab"
  src="https://www.youtube.com/user/vietlod"
/>

## See also

- [FEM and REM (TWFE)](/en/ecolab/model/fem-rem)
- [Worked example: Public debt and growth (panel data)](/en/ecolab/vi-du/no-cong-tang-truong-panel)
- [Estimation & Econometric Modeling](/en/ecolab/econometrics-modeling)
