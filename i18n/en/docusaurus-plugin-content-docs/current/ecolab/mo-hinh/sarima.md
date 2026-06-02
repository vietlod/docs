---
title: SARIMA — Seasonal ARIMA
sidebar_position: 2
description: The SARIMA (Seasonal ARIMA) model extends ARIMA for series with seasonality, the (p,d,q)(P,D,Q)s notation, and how to run it in EcoLab.
---

# SARIMA — Seasonal ARIMA

**SARIMA** extends [ARIMA](/en/ecolab/mo-hinh/arima) to handle **seasonality** — patterns that repeat over a fixed cycle (month, quarter). SARIMA adds **seasonal** AR/MA/differencing components alongside the non-seasonal ones.

:::tip When to use
Use SARIMA when the series has a **clear seasonal cycle** (e.g. monthly retail sales, quarterly tourism). ACF spikes at seasonal lags signal the need for SARIMA.
:::

---

## Model notation

$$
\text{SARIMA}(p,d,q)(P,D,Q)_s
$$

- $(p,d,q)$: the **non-seasonal** part (as in ARIMA).
- $(P,D,Q)$: the **seasonal** part with cycle $s$ (e.g. $s=12$ for monthly, $s=4$ for quarterly data).

---

## Running in EcoLab

1. **Modeling** module → *Univariate time series* family → **SARIMA**.
2. Choose $Y$; declare $(p,d,q)(P,D,Q)_s$ and the seasonal period $s$ (or auto).
3. Run; view seasonal forecasts + diagnostics; export the **replication code**.

## Limitations

- Many parameters ⇒ needs a long series spanning several seasonal cycles.
- Assumes the seasonal pattern is **stable** over time.

## See also

- [ARIMA](/en/ecolab/mo-hinh/arima) · [GARCH](/en/ecolab/mo-hinh/garch) · [Catalog](/en/ecolab/mo-hinh/danh-muc)
