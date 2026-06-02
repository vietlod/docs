---
title: Panel Quantile (FE-QR)
sidebar_position: 2
description: Quantile regression for panel data with fixed effects (FE-QR), combining quantile regression with panel structure, and how to run it in EcoLab.
---

# Panel Quantile Regression (FE-QR)

**Panel Quantile (FE-QR)** extends [quantile regression](/en/ecolab/mo-hinh/quantile) to **panel data** with **fixed effects** by unit. It estimates effects at different quantiles while **controlling for unobserved unit characteristics** — combining the strengths of [FE](/en/ecolab/mo-hinh/fem-rem) and quantile regression.

:::tip When to use
Use it when you have **panel data** and want **heterogeneous effects across quantiles** while removing individual effects (e.g. a policy's effect on firms at different productivity levels).
:::

---

## Model specification

$$
Q_{\tau}(Y_{it} \mid X_{it}, \alpha_i) = X_{it} \beta(\tau) + \alpha_i
$$

where $\alpha_i$ is the unit fixed effect. Common methods: Koenker (penalized FE-QR), Canay (two-step), Machado–Santos Silva (MM-QR).

---

## Running in EcoLab

1. **Modeling** module → *Quantile regression* family → **Panel Quantile**.
2. Declare **entity/time**, $Y$, $X$, and a list of quantiles $\tau$.
3. Run; read $\beta(\tau)$ by quantile; bootstrap SE; export the **replication code**.

---

## Limitations

- FE-QR estimation is **not unique** (multiple approaches, results may differ).
- Some methods need a large $T$; computation is heavy.

## See also

- [Quantile Regression](/en/ecolab/mo-hinh/quantile) · [FEM/REM](/en/ecolab/mo-hinh/fem-rem) · [Catalog](/en/ecolab/mo-hinh/danh-muc)
