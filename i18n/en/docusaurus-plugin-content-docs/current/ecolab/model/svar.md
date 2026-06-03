---
title: SVAR — Structural VAR
sidebar_position: 3
description: The SVAR (Structural VAR) model imposes identification restrictions to interpret economically meaningful structural shocks, how it differs from reduced-form VAR, and how to run it in EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# SVAR — Structural VAR

**SVAR (Structural VAR)** extends [VAR](/en/ecolab/model/var) by imposing **identification restrictions** to separate **economically meaningful structural shocks** (e.g. supply, demand, monetary policy shocks) from the reduced-form errors. As a result, SVAR impulse responses are economically interpretable, not merely statistical correlations.

:::tip When to use
Use SVAR when you need to **interpret structural shocks** (not just forecast). Identification requires **economic theory** to impose restrictions.
:::

---

## Identifying structural shocks

The relation between reduced-form errors $\varepsilon_t$ and structural shocks $u_t$: $\varepsilon_t = B u_t$. Restrictions are needed to identify $B$:

| Identification | Idea |
| :--- | :--- |
| **Recursive (Cholesky)** | Variable ordering ⇒ triangular matrix |
| **Short-run** | Restrict instantaneous effects to 0 |
| **Long-run (Blanchard-Quah)** | Restrict long-run effects |
| **Sign restrictions** | Impose the sign of responses |

---

## Running in EcoLab

1. **Modeling** module → *Multivariate time series* family → **SVAR**.
2. Choose variables, lag length, and the **identification scheme** (Cholesky/short-run/long-run).
3. Run; view structural IRF/FEVD; export the **replication code**.

---

## Replication code

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* --- SVAR (Cholesky identification) ---
tsset time

* Step 1: Estimate reduced-form VAR
var rate inflation output, lags(1/2)

* Step 2: Impose short-run restrictions (lower-triangular A matrix)
* Define restriction matrix A
matrix A = (1, 0, 0 \ ., 1, 0 \ ., ., 1)
matrix B = (., 0, 0 \ 0, ., 0 \ 0, 0, .)

svar rate inflation output, lags(1/2) aeq(A) beq(B)

* Structural IRFs
irf create sirf, set(svar_irf) step(20)
irf graph sirf, impulse(rate) response(inflation output)
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# --- SVAR (Cholesky / short-run restrictions) ---
library(vars)

data_var <- cbind(rate, inflation, output)

# Step 1: Estimate reduced-form VAR
var_model <- VAR(data_var, p = 2)

# Step 2: Define restriction matrix A (lower-triangular)
A <- diag(3)
A[lower.tri(A)] <- NA   # free parameters below diagonal

# Estimate SVAR with short-run restrictions
svar_model <- SVAR(var_model, Amat = A)
summary(svar_model)

# Structural IRFs
irf_struct <- irf(svar_model, n.ahead = 20)
plot(irf_struct)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
from statsmodels.tsa.api import VAR
import numpy as np
import matplotlib.pyplot as plt

data = df[['rate', 'inflation', 'output']]

# Step 1: Estimate reduced-form VAR
model = VAR(data)
result = model.fit(2)

# Step 2: Cholesky identification (default in statsmodels IRF)
# The ordering of columns determines the recursive structure
irf = result.irf(20)
irf.plot(orth=True)   # orthogonalized (Cholesky) IRFs
plt.suptitle('Structural IRF (Cholesky)')
plt.tight_layout(); plt.show()

# FEVD
fevd = result.fevd(20)
fevd.plot()
plt.show()
```

  </TabItem>
</Tabs>

---

## Limitations

- Results **depend heavily on the identification restrictions** (and variable ordering with Cholesky).
- Requires theoretical justification for every restriction.

## Video tutorial

<VideoTutorial
  title="Running SVAR in EcoLab"
  src="https://www.youtube.com/user/vietlod"
/>

## See also

- [VAR](/en/ecolab/model/var) · [VECM](/en/ecolab/model/vecm) · [Catalog](/en/ecolab/model/group)
