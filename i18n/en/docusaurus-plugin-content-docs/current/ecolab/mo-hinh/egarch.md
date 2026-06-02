---
title: EGARCH — Asymmetric GARCH
sidebar_position: 4
description: The EGARCH (Exponential GARCH) model captures the leverage effect (bad news raises volatility more than good news) in financial volatility, and how to run it in EcoLab.
---

# EGARCH — Exponential GARCH

**EGARCH (Exponential GARCH)** extends [GARCH](/en/ecolab/mo-hinh/garch) to capture the **asymmetric / leverage effect** — in financial markets, **bad news (negative shocks)** typically raises volatility **more** than good news of the same magnitude. Standard GARCH cannot distinguish the sign of shocks; EGARCH can.

:::tip When to use
Use EGARCH when you suspect volatility responds **asymmetrically** to positive/negative shocks (very common in stock returns). It models **log variance**, so no positivity constraints are needed.
:::

---

## Model specification

$$
\ln(\sigma_t^2) = \omega + \alpha \left( |z_{t-1}| - E|z_{t-1}| \right) + \gamma \, z_{t-1} + \beta \ln(\sigma_{t-1}^2)
$$

where $z_{t-1} = \varepsilon_{t-1}/\sigma_{t-1}$. The parameter **$\gamma \ne 0$** measures the **leverage effect**: $\gamma < 0$ ⇒ negative shocks raise volatility more.

---

## Running in EcoLab

1. **Modeling** module → *Univariate time series* family → **EGARCH**.
2. Choose the returns series; declare the order and mean equation.
3. Run; check the sign/significance of $\gamma$ (leverage); export the **replication code**.

## Limitations

- Parameter interpretation is more complex than GARCH.
- Sensitive to the distributional assumption; needs a large enough sample.

## See also

- [ARCH/GARCH](/en/ecolab/mo-hinh/garch) · [ARIMA](/en/ecolab/mo-hinh/arima) · [Catalog](/en/ecolab/mo-hinh/danh-muc)
