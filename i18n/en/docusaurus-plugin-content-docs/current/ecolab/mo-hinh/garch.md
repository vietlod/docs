---
title: ARCH / GARCH — Volatility models
sidebar_position: 3
description: ARCH/GARCH models capture time-varying conditional variance (volatility clustering) in financial series, and how to run them in EcoLab.
---

# ARCH / GARCH — Volatility models

**ARCH/GARCH** model **time-varying conditional variance** — the **volatility clustering** phenomenon (periods of high volatility follow high volatility) that is pervasive in **financial series** (stock returns, exchange rates). Instead of assuming constant error variance, they let variance depend on the past.

:::tip When to use
Use when a series (usually **returns**) exhibits **volatility clustering** and you want to model/forecast **risk (volatility)**. Often combined: mean by [ARIMA](/en/ecolab/mo-hinh/arima) + variance by GARCH.
:::

---

## Model specification

GARCH(1,1) for the conditional variance $\sigma_t^2$:

$$
\sigma_t^2 = \omega + \alpha \, \varepsilon_{t-1}^2 + \beta \, \sigma_{t-1}^2
$$

- $\alpha$ (ARCH): reaction to the latest shock; $\beta$ (GARCH): persistence of volatility.
- **ARCH(q)** is the case $\beta = 0$. Stationarity condition: $\alpha + \beta < 1$.

---

## Running in EcoLab

1. **Modeling** module → *Univariate time series* family → **ARCH/GARCH**.
2. Choose the series (returns); declare the order $(p,q)$ and the mean equation (e.g. ARMA).
3. Run; view the estimated $\hat{\sigma}_t$ + volatility forecast; export the **replication code**.

## Limitations

- Standard GARCH is **symmetric** (good/bad news have equal effect) ⇒ use [EGARCH](/en/ecolab/mo-hinh/egarch) for the leverage effect.
- Sensitive to the error distribution (normal vs Student-t).

## See also

- [EGARCH](/en/ecolab/mo-hinh/egarch) · [ARIMA](/en/ecolab/mo-hinh/arima) · [Catalog](/en/ecolab/mo-hinh/danh-muc)
