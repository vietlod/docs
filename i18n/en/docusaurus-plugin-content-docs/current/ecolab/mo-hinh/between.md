---
title: Between Estimator
sidebar_position: 3
description: The Between estimator uses unit means to exploit cross-unit variation, how it differs from FE/RE, and how to run it in EcoLab.
---

# Between Estimator

The **Between Estimator** regresses on the **unit means** of the variables — exploiting **between-unit variation** rather than the within (time) variation used by [Fixed Effects](/en/ecolab/mo-hinh/fem-rem). It answers "do units with a higher average $X$ have a higher average $Y$".

:::tip When to use
Use Between when you care about **long-run differences across units** (e.g. comparing countries/firms by their averages). RE is essentially a **weighted average** of Between and Within.
:::

---

## Model specification

$$
\bar{Y}_i = \beta_0 + \bar{X}_i \beta + \bar{\varepsilon}_i, \qquad \bar{Y}_i = \frac{1}{T}\sum_t Y_{it}
$$

OLS on the unit-averaged data.

---

## Running in EcoLab

1. **Modeling** module → *Linear panel data* family → **Between**.
2. Declare entity/time, $Y$, $X$.
3. Run; contrast with FE (within) to analyze the source of variation; export the **replication code**.

## Limitations

- **Ignores time variation**; does not control for individual effects like FE.
- Loses dynamic information.

## See also

- [FEM/REM](/en/ecolab/mo-hinh/fem-rem) · [Pooled OLS](/en/ecolab/mo-hinh/pooled-ols) · [Catalog](/en/ecolab/mo-hinh/danh-muc)
