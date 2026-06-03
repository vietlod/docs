---
title: 'Scholarship effect (RDD)'
sidebar_position: 11
description: Hands-on RDD in EcoLab — evaluating the effect of a scholarship based on an admission-score cutoff on academic performance.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Effect of a scholarship on academic performance (RDD)

This illustrates [RDD](/en/ecolab/model/rdd): a scholarship is awarded to students with an **admission score ≥ cutoff**. Comparing students **just above and just below the cutoff** (as-good-as random) yields a credible causal estimate at the threshold. Figures are **illustrative**.

> Summary: estimate the **jump** in academic performance (next-year GPA) at the score cutoff = the causal effect of the scholarship at the threshold.

---

## Step 1 — Ideation
- **Question:** does receiving the scholarship improve academic performance?

## Step 2 — Literature Review
Impact evaluation of financial aid in education; regression discontinuity design.

## Step 3 — Data Collection

| Role | Variable | Description |
| :--- | :--- | :--- |
| Running variable | `score` | admission score |
| Cutoff | `cutoff` | scholarship threshold |
| Treatment | `scholarship` | 1 if received (sharp: score ≥ cutoff) |
| Outcome | `gpa_next` | next-term/year GPA |

## Step 4 — Modeling

Choose the *Causal inference* family → **RDD** (sharp); declare the running variable, cutoff, bandwidth:

```mermaid
flowchart LR
    A["score"] --> B{"≥ cutoff?"}
    B -->|"Yes"| C["Scholarship"]
    B -->|"No"| D["No scholarship"]
    C --> E["Jump in GPA at cutoff = LATE"]
    D --> E
```

**Illustrative results (format — not real results):**

| | Value |
| :--- | :--- |
| GPA jump at cutoff (LATE) | +0.18*** |
| Optimal bandwidth | ±0.5 points |
| McCrary (p) | 0.42 (no manipulation of the cutoff) |

Sample interpretation: the scholarship **raises GPA by ~0.18** at the threshold; a non-rejected McCrary test ⇒ no sign of score manipulation around the cutoff. This effect is **local to the cutoff** (LATE).

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* ── RDD: scholarship effect on GPA ────────────────
* Install: ssc install rdrobust
rdrobust gpa score, c(50)

* ── RDD plot ──────────────────────────────────────
rdplot gpa score, c(50)

* ── Optimal bandwidth selection ───────────────────
rdbwselect gpa score, c(50)
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# ── RDD: scholarship effect on GPA ────────────────
library(rdrobust)

# Robust RD estimate at cutoff = 50
rd <- rdrobust(df$gpa, df$score, c = 50)
summary(rd)

# RDD plot
rdplot(df$gpa, df$score, c = 50,
       title = "Scholarship effect on GPA",
       x.label = "Admission score",
       y.label = "GPA (next year)")
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# ── RDD: scholarship effect on GPA ────────────────
from rdrobust import rdrobust, rdplot

# Robust RD estimate at cutoff = 50
rd = rdrobust(df["gpa"], df["score"], c=50)
print(rd)

# RDD plot
rdplot(df["gpa"], df["score"], c=50,
       title="Scholarship effect on GPA",
       x_label="Admission score",
       y_label="GPA (next year)")
```

  </TabItem>
</Tabs>

## Step 5 — Reporting
Export a report + the **RDD plot** (scatter + fitted lines on both sides of the cutoff) + **replication code**.

## Video tutorial

<VideoTutorial
  title="Guide to running RDD in EcoLab"
  src="https://www.youtube.com/user/vietlod"
/>

## See also
- [RDD](/en/ecolab/model/rdd) · [PSM](/en/ecolab/model/psm) · [DiD](/en/ecolab/model/did) · [Catalog](/en/ecolab/model/group)
