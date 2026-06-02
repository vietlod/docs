---
title: AR / MA / ARMA / ARIMA
sidebar_position: 1
description: The Box-Jenkins family (AR, MA, ARMA, ARIMA) for univariate time series, integration order, the identification-and-forecasting workflow, and how to run it in EcoLab.
---

# AR / MA / ARMA / ARIMA — The Box-Jenkins family

This is the classic family of **univariate time-series** models that describe and **forecast** a series from its own past:

- **AR(p)** — Autoregressive: $Y_t$ depends on its own lagged values.
- **MA(q)** — Moving Average: $Y_t$ depends on lagged errors (shocks).
- **ARMA(p,q)** — combines AR and MA for **stationary** series.
- **ARIMA(p,d,q)** — adds **differencing of order $d$** to handle **non-stationary** series.

:::tip When to use
Use for **forecasting a single series** (revenue, inflation, prices). Check **stationarity** first (ADF/KPSS); if non-stationary, difference it (order $d$) ⇒ ARIMA. Seasonal ⇒ [SARIMA](/en/ecolab/mo-hinh/sarima); volatility clustering ⇒ [GARCH](/en/ecolab/mo-hinh/garch).
:::

---

## Model specification

ARMA(p,q):

$$
Y_t = c + \sum_{i=1}^{p} \phi_i Y_{t-i} + \varepsilon_t + \sum_{j=1}^{q} \theta_j \varepsilon_{t-j}
$$

ARIMA(p,d,q): apply ARMA(p,q) to the $d$-times differenced series $\Delta^d Y_t$.

---

## Box-Jenkins workflow

```mermaid
flowchart LR
    A["Check stationarity (ADF/KPSS)"] --> B["Difference if needed (choose d)"]
    B --> C["Identify p,q (ACF/PACF, AIC/BIC)"]
    C --> D["Estimate (MLE)"]
    D --> E["Residual diagnostics (Ljung-Box)"]
    E --> F["Forecast"]
```

---

## Running in EcoLab

1. **Modeling** module → *Univariate time series* family → **ARIMA**.
2. Choose the series $Y$; declare $(p,d,q)$ or use auto-ARIMA (AIC/BIC).
3. Run; view residual diagnostics + **forecasts** with confidence intervals; export the **replication code**.

## Limitations

- Assumes a **linear** relationship and stable structure; weak under structural breaks.
- Does not model **time-varying variance** ⇒ use ARCH/GARCH.

## See also

- [SARIMA](/en/ecolab/mo-hinh/sarima) · [GARCH](/en/ecolab/mo-hinh/garch) · [ARDL](/en/ecolab/mo-hinh/ardl) · [Catalog](/en/ecolab/mo-hinh/danh-muc)
