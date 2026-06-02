---
title: Truncated Regression
sidebar_position: 4
description: Truncated regression when the sample only contains observations above/below a threshold, how it differs from Tobit, and how to run it in EcoLab.
---

# Truncated Regression

**Truncated Regression** is used when the sample **only contains observations satisfying a threshold** — units outside the threshold **do not appear at all** in the data (unlike [Tobit](/en/ecolab/mo-hinh/tobit), where threshold units are still observed with a piled value).

:::warning Truncation biases OLS
Under truncation, the in-sample error distribution **no longer has zero mean** ⇒ OLS is biased. A truncated (MLE) estimator is required to correct this.
:::

---

## Model specification

For lower truncation at $a$, the likelihood is based on the distribution **conditional on $Y > a$**:

$$
f(Y_i \mid Y_i > a) = \frac{\phi\!\left(\frac{Y_i - X_i\beta}{\sigma}\right)}{\sigma \, \Phi\!\left(\frac{X_i\beta - a}{\sigma}\right)}
$$

Estimated by **MLE**.

---

## Running in EcoLab

1. **Modeling** module → *Limited dependent variable* family → **Truncated**.
2. Select $Y$, the $X$ variables; declare the **truncation threshold** and direction (upper/lower).
3. Run; read the corrected coefficients; export the **replication code**.

---

## Limitations

- Requires correct knowledge of the **threshold and truncation mechanism**.
- Sensitive to the normality assumption of the error.

## See also

- [Tobit](/en/ecolab/mo-hinh/tobit) · [Heckman](/en/ecolab/mo-hinh/heckman) · [Catalog](/en/ecolab/mo-hinh/danh-muc)
