---
title: SVAR — Structural VAR
sidebar_position: 3
description: The SVAR (Structural VAR) model imposes identification restrictions to interpret economically meaningful structural shocks, how it differs from reduced-form VAR, and how to run it in EcoLab.
---

# SVAR — Structural VAR

**SVAR (Structural VAR)** extends [VAR](/en/ecolab/mo-hinh/var) by imposing **identification restrictions** to separate **economically meaningful structural shocks** (e.g. supply, demand, monetary policy shocks) from the reduced-form errors. As a result, SVAR impulse responses are economically interpretable, not merely statistical correlations.

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

## Limitations

- Results **depend heavily on the identification restrictions** (and variable ordering with Cholesky).
- Requires theoretical justification for every restriction.

## See also

- [VAR](/en/ecolab/mo-hinh/var) · [VECM](/en/ecolab/mo-hinh/vecm) · [Catalog](/en/ecolab/mo-hinh/danh-muc)
