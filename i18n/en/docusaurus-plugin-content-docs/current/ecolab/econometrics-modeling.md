---
title: Quantitative Analysis
sidebar_position: 3
---

# Econometrics Estimation & Modeling

EcoLab supports a comprehensive array of over 30 econometric models, handling various data structures such as cross-sectional, time-series, and panel data. The modeling module connects directly to powerful computation engines running **Python**, **R** (via the RMCP gateway), and **Stata**.

---

## 1. Supported Model Classification

The system categorizes models into 5 specialized groups:

| Model Group | Estimators | Application |
| :--- | :--- | :--- |
| **Classical & Regularization** | OLS (Ordinary Least Squares), WLS (Weighted), GLS (Generalized), Ridge, Lasso, Elastic Net | Baseline models, classical linear regression, and multicollinearity mitigation using regularization methods. |
| **Panel Data** | Fixed Effects (FE), Random Effects (RE), Between Estimator, GMM (Arellano-Bond, Blundell-Bond), IV/2SLS, 3SLS | Best for datasets tracking multiple entities (firms, countries) over several time periods. FE/RE helps control for unobserved time-invariant heterogeneity. |
| **Time Series** | ARIMA, GARCH, EGARCH, VAR (Vector AutoRegression) | Financial volatility modeling, macroeconomic business cycles, and forecasting. |
| **Limited Dependent & Count** | Logit, Probit, Tobit, Poisson Regression, Negative Binomial Regression | Used when the dependent variable is binary (0/1), censored, or a non-negative integer. |
| **Causal Inference** | PSM (Propensity Score Matching), DiD (Difference-in-Differences), RDD (Regression Discontinuity), IV/2SLS | Evaluates the impact of policy interventions or economic events while addressing endogeneity issues. |

---

## 2. Estimation Workflow

1.  In the **Mô hình hóa (Modeling)** module, click the **Thêm mô hình** (Add Model) button to open the configuration panel.
2.  **Define Model Specification:**
    *   Select the model group and estimator (e.g., *Panel Data* → *Fixed Effects*).
    *   Select the Dependent Variable ($Y$) from the parsed data columns.
    *   Select the Independent and Control Variables ($X_1, X_2, \dots, X_k$).
3.  **Advanced Configurations (Optional):**
    *   For panel data: Specify the Entity and Time identifier variables.
    *   For IV/2SLS: Select the endogenous variable(s) and their matching instrumental variables.
    *   Select standard error corrections: Homoskedastic, Robust, or Clustered (by entity/time).
4.  Click **Chạy mô hình** (Run Model) to send the request to the computation server.

---

## 3. Reviewing Estimation Results

Results are returned instantly and organized across 4 tabs:

### Estimation Tab
Presents the regression coefficients table in academic format:
*   Estimated coefficients ($\beta$), Standard Errors, $t$-stat (or $z$-stat) values, and $p$-values.
*   Statistical significance is represented by standard asterisks: `***` ($p < 0.01$), `**` ($p < 0.05$), `*` ($p < 0.1$).
*   Model summary metrics: Coefficient of determination $R^2$, Adj-$R^2$, $F$-statistic, Log-Likelihood, AIC, and BIC.

### Diagnostics Tab
Automatically runs standard statistical tests to verify classical regression assumptions:
*   **Breusch-Pagan / White Test:** Tests for Heteroskedasticity (non-constant error variance).
*   **Durbin-Watson / Ljung-Box Test:** Tests for Autocorrelation in errors.
*   **Jarque-Bera Test:** Tests for Normality of the residuals.
*   **Hausman Test:** (For panel data) Decides between Fixed Effects (FE) and Random Effects (RE).

### Robustness Tab
Checks the sensitivity of your estimation:
*   Runs regressions on subsamples (subsample analysis) to see if results change when removing outliers.
*   Estimates alternative specifications (e.g., using alternative proxies or adding/removing controls).

### Replication Code Tab
The system automatically compiles and displays the replication script in **Python**, **R**, or **Stata**. You can copy this code to run locally for verification and reporting.
