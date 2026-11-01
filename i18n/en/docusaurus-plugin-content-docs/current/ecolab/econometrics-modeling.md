---
title: Quantitative Analysis
sidebar_position: 3
description: Complete workflow for estimating 201+ econometric models across 15 families and 58 sub-models on Python, R, and Stata 18 MP with separated Pre/Postestimation diagnostics and .zip replication bundles in EcoLab.
---

# Econometrics Estimation & Modeling (201+ Estimators)

EcoLab's **Modeling** workspace (`v1.5.0`) connects directly to the **EcoData Tri-Engine** (**Python**, **R** via the RMCP gateway, and **Stata 18 MP**), exposing a dynamically synchronized catalog of **201+ core estimators across 15 model families and 58 sub-models** covering cross-sectional, time-series, longitudinal panel, spatial, and structural microeconometric designs.

Whenever an EcoData administrator publishes a newly verified (`B1–B4`) estimator, EcoLab refreshes its model catalog from `GET /api/catalog/manifest` automatically within **`<= 60` seconds**.

---

## 1. Fifteen Supported Model Families

| Structural Domain | Model Families in EcoLab | Representative Estimators | Scholarly Application Scope |
| :--- | :--- | :--- | :--- |
| **Linear, Multi-Way HDFE & Regularization** | Family 1 (Classical Linear & HDFE), Family 2 (Regularization) | OLS, WLS, GLS/FGLS, TLS, Multi-Way HDFE (`reghdfe`/`fixest`), Ridge, Lasso, Elastic Net, Adaptive Lasso | Baseline regressions, high-dimensional fixed-effects absorption, and variable selection under severe collinearity. |
| **Static, Dynamic & Cointegrated Panels** | Family 3 (Linear Panel), Family 4 (Dynamic & Threshold Panel) | Pooled OLS, FE/RE, Between, Mundlak CRE, Driscoll-Kraay, CCE-MG, PCSE, Difference/System GMM (Windmeijer), Dynamic Panel Threshold, Panel DOLS/FMOLS/PMG | 34/63-province, cross-country, and firm panels with cross-sectional dependence, dynamic persistence, and long-run cointegration. |
| **Discrete Choice, Selection, Survival & Count** | Family 5 (Discrete & Survival), Family 6 (Count & Gravity PPML) | Binary/Multinomial/Ordered Logit & Probit, Tobit, Truncated, Heckman, Fractional, Cox PH, Weibull AFT, Poisson, NegBin, ZIP, ZINB, Gravity PPML-HDFE | Discrete choices, default risk, non-random sample selection, duration outcomes, and zero-rich bilateral trade gravity equations. |
| **Quantile, Time Series & Simultaneous Systems** | Family 7 (Quantile & Decomposition), Family 8 (Univariate TS), Family 9 (Multivariate TS & LP), Family 10 (IV & Systems), Family 11 (Non-Linear & Threshold) | Quantile, Panel MM-QR, RIF, Oaxaca-Blinder, ARIMA, GARCH/EGARCH, ARDL/NARDL, Markov-Switching, PSY GSADF, VAR/VECM/SVAR, Local Projections, IV-2SLS, LIML, Lewbel IV, Bartik Shift-Share, 3SLS, SUR, NLS, GAM, Hansen Threshold | Distributional heterogeneity, asymmetric macro-financial pass-through, impulse response horizons, and weak-instrument-robust IV systems. |
| **Modern Causal, Structural IO, Frontier TFP & Causal ML** | Family 12 (Causal & Spatial), Family 13 (Demand Systems & BLP), Family 14 (Frontier & TFP), Family 15 (Bootstrap & Causal ML) | TWFE & Staggered DID (Callaway-Sant'Anna, Sun-Abraham, BJS, dCDH, Bacon, LP-DID, SDID), Synthetic Control, Sharp/Fuzzy RDD, PSM/AIPW, Spatial SAR/SEM/SDM & Conley HAC, AIDS/QUAIDS, Berry-BLP, SFA, DEA, Malmquist, OP/LP/Wooldridge/ACF TFP, Wild Cluster Bootstrap, Double ML, Causal Forest | Staggered policy evaluation, spatial spillovers, structural demand elasticities, technical efficiency & firm TFP, and few-cluster inference. |

---

## 2. Separated Pre-Estimation and Postestimation Diagnostics

EcoLab cleanly separates data-level specification diagnostics from model-level residual diagnostics, paired with **Smart Pre-Check** validation:

1. **Pre-Estimation Diagnostics (Stage 3 Data Diagnostics & Stage 4 Pre-Check):**
   - Time-series and panel unit-root batteries: ADF, Phillips-Perron, KPSS, Im-Pesaran-Shin, Levin-Lin-Chu, and Pesaran CIPS.
   - Multicollinearity $VIF$, Pesaran CD cross-sectional dependence, Moran's $I$ spatial autocorrelation, and Pedroni / Kao / Westerlund / Johansen cointegration tests.
   - Smart Pre-Check verifies sample-size thresholds, panel balance, and integration compatibility prior to job dispatch.
2. **Postestimation Diagnostics (Automatically Attached to Every Model Run):**
   - Breusch-Pagan / White heteroskedasticity, Durbin-Watson / Breusch-Godfrey / Wooldridge serial correlation, Ramsey RESET, and Jarque-Bera residual normality.
   - Hausman & Mundlak (FE vs RE), Arellano-Bond AR(1)/AR(2) & Hansen/Sargan $J$ (GMM), Kleibergen-Paap rk Wald $F$ (weak instruments), Pesaran Bounds $F/t$ & NARDL asymmetry Wald, Event-Study Pre-Trend joint Wald (DID), and McCrary density continuity (RDD).

---

## 3. Estimation Workflow and Fail-Closed `422` Guarantee

1. In the **Modeling** module, click **Add Model** to open the dynamic **15-family model selector**.
2. Select your model family and specific estimator, declare the dependent variable ($Y$), explanatory covariates ($X_1, \dots, X_k$), entity/time identifiers, endogenous/instrument slots, and standard-error structure (Homoskedastic, Robust HC0–HC3, HAC, Driscoll-Kraay, Conley Spatial HAC, One-Way/Multi-Way Clustering, or Wild Cluster Bootstrap).
3. Choose the target execution runtime (**Python**, **R**, or **Stata 18 MP**) and click **Run Model**.
4. If an unregistered estimator key is requested or mandatory structural inputs are omitted, the engine fails closed with an explicit **`422 UNSUPPORTED_ESTIMATOR` / `422 INVALID_SPECIFICATION`** diagnostic — never silently substituting OLS.

---

## 4. Reviewing Results and Exporting Three-Language `.zip` Bundles

Completed runs populate four structured workspace tabs:

- **Estimation Table Tab:** Parameter estimates ($\hat{\beta}$), standard errors, $t/z$-statistics, $p$-values, significance stars (`***`, `**`, `*`), and goodness-of-fit statistics ($R^2$, Within-$R^2$, $F$/Wald, Log-Likelihood, AIC, BIC), ready for 5-gate evidence locking in Stage 5 reports.
- **Postestimation Diagnostics Tab:** Full test statistics, degrees of freedom, $p$-values, and methodological interpretations.
- **Robustness Tab:** Side-by-side multi-column comparison across alternative estimators, subsamples, standard-error structures, and 63-province vs. 34-province regimes.
- **Replication Bundle Tab (`.zip`):** One-click `.zip` archive containing standalone **Stata 18 MP (`.do`)**, **R (`.R`)**, and **Python (`.py`)** scripts, cleaned dataset slices, and **`SHA256SUMS.txt`** verification hashes.
