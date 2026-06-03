---
title: 'Returns to education with IV'
sidebar_position: 7
description: Hands-on IV/2SLS in EcoLab — addressing the endogeneity of schooling when estimating returns to education, using an instrument and instrument tests.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Returns to education with instrumental variables (IV/2SLS)

Following the [Mincer OLS example](/en/ecolab/vi-du/luong-giao-duc-ols): because `educ` may be **endogenous** (unobserved ability), we use [IV/2SLS](/en/ecolab/model/iv-2sls) for a consistent estimate. Figures are **illustrative**.

> Summary: use an **instrument** for schooling (e.g. distance to school, an education reform, regional tuition) to isolate the exogenous part and estimate an unbiased return to education.

---

## Step 1 — Ideation
- **Question:** what is the true return to education after removing endogeneity?

## Step 2 — Literature Review
Returns-to-schooling literature using IV (Card 1995; Angrist–Krueger 1991 — quarter of birth); discuss instrument validity.

## Step 3 — Data Collection

| Role | Variable | Example |
| :--- | :--- | :--- |
| Dependent | `lnwage` | log wage |
| Endogenous | `educ` | years of schooling |
| Instrument $Z$ | `distance_to_school` | distance to the nearest school |
| Exogenous | `exper`, `gender`, `region` | controls |

## Step 4 — Modeling

Choose the *IV & simultaneous equations* family → **IV/2SLS**; declare the endogenous `educ` and the instrument $Z$:

```mermaid
flowchart LR
    A["Stage 1: educ ~ Z + exogenous"] --> B["fitted educ"]
    B --> C["Stage 2: lnwage ~ fitted educ + exogenous"]
```

**Illustrative results (format — not real results):**

| | OLS | IV/2SLS |
| :--- | :--- | :--- |
| educ | 0.082*** | 0.104*** |
| First-stage F | — | 24.5 (> 10 ⇒ strong instrument) |
| Hansen J (p) | — | 0.31 (instruments valid) |
| Durbin-Wu-Hausman (p) | — | 0.04 ⇒ endogeneity present, IV needed |

Sample interpretation: IV gives a **higher** return than OLS (0.104 vs 0.082) — consistent with much of the literature; F > 10 and a non-rejected Hansen ⇒ the instrument is acceptable.

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* ── IV/2SLS: returns to education ─────────────────
* Endogenous: educ | Instruments: near_college, parent_educ
ivregress 2sls lnwage exper exper2 ///
    (educ = near_college parent_educ), first robust

* ── Diagnostics ───────────────────────────────────
estat firststage        // First-stage F-statistic
estat endogenous        // Durbin-Wu-Hausman test
estat overid            // Sargan / Hansen J test
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# ── IV/2SLS: returns to education ─────────────────
library(AER)

model_iv <- ivreg(
  lnwage ~ educ + exper + exper2 |
           near_college + parent_educ + exper + exper2,
  data = df
)

# Summary with all diagnostics
# (Weak instruments, Wu-Hausman, Sargan)
summary(model_iv, diagnostics = TRUE)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# ── IV/2SLS: returns to education ─────────────────
from linearmodels.iv import IV2SLS

dep   = df["lnwage"]
exog  = df[["exper", "exper2"]]
endog = df[["educ"]]
instr = df[["near_college", "parent_educ"]]

results = IV2SLS(dep, exog, endog, instr).fit(
    cov_type="robust"
)
print(results)
# Check first_stage.diagnostics for F-stat
```

  </TabItem>
</Tabs>

## Step 5 — Reporting
Export a report + **replication code**; report the first-stage F, the endogeneity test and overidentification.

## Video tutorial

<VideoTutorial
  title="Guide to running IV/2SLS in EcoLab"
  src="https://www.youtube.com/embed/m3wyHeBOfUE"
/>

## See also
- [IV/2SLS](/en/ecolab/model/iv-2sls) · [Mincer example (OLS)](/en/ecolab/vi-du/luong-giao-duc-ols) · [Catalog](/en/ecolab/model/group)

