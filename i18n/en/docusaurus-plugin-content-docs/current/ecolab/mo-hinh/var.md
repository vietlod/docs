---
title: VAR — Vector Autoregression
sidebar_position: 1
description: The VAR (Vector Autoregression) model for systems of stationary time series, impulse responses (IRF), variance decomposition, Granger causality, and how to run it in EcoLab.
---

# VAR — Vector Autoregression

**VAR** models a **system of time series** where each variable depends on **its own lags and the lags of the others** — without imposing a priori causal direction. It is the standard tool for **system dynamics**: impulse responses (IRF), forecast error variance decomposition (FEVD), and Granger causality tests.

:::tip When to use
Use VAR when all series are **stationary I(0)** (or differenced). If I(1) series are **cointegrated** ⇒ use [VECM](/en/ecolab/mo-hinh/vecm); if I(1) but not cointegrated ⇒ VAR in differences.
:::

---

## Model specification

$$
Y_t = c + A_1 Y_{t-1} + A_2 Y_{t-2} + \dots + A_p Y_{t-p} + \varepsilon_t
$$

where $Y_t$ is a vector of variables and $A_i$ are coefficient matrices. Choose lag $p$ via AIC/BIC/HQ.

---

## Post-estimation analysis

- **IRF**: the system's response to a shock.
- **FEVD**: decomposition of forecast variance by shock source.
- **Granger causality**: which variable helps forecast which.

---

## Running in EcoLab

1. **Modeling** module → *Multivariate time series* family → **VAR**.
2. Choose the variable set (same frequency, stationarity checked), the lag length.
3. Run; view IRF/FEVD/Granger; export the **replication code**.

## Limitations

- Many parameters (explodes with number of variables × lags).
- Structural IRFs require identification assumptions ⇒ see [SVAR](/en/ecolab/mo-hinh/svar).

## See also

- [VECM](/en/ecolab/mo-hinh/vecm) · [SVAR](/en/ecolab/mo-hinh/svar) · [Catalog](/en/ecolab/mo-hinh/danh-muc)
