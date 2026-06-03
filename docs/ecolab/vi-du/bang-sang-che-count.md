---
title: 'R&D và số bằng sáng chế (Count)'
sidebar_position: 5
description: Thực hành mô hình biến đếm trên EcoLab — tác động của chi R&D lên số bằng sáng chế của doanh nghiệp, Poisson vs Negative Binomial.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# R&D và số bằng sáng chế (dữ liệu đếm)

Minh họa nhóm [biến đếm](/ecolab/model/poisson): số **bằng sáng chế** một doanh nghiệp đăng ký (số nguyên không âm) theo chi **R&D** và quy mô. Số liệu là **minh họa**.

> Tóm tắt: vì biến đếm thường **overdispersion**, ta so sánh [Poisson](/ecolab/model/poisson) và [Negative Binomial](/ecolab/model/negbin) và chọn mô hình phù hợp.

---

## Bước 1 — Ý tưởng
- **Câu hỏi:** tăng chi R&D làm tăng số bằng sáng chế bao nhiêu?

## Bước 2 — Tổng quan tài liệu
Kinh tế học đổi mới sáng tạo (innovation), hàm sản xuất tri thức; biến đếm patents.

## Bước 3 — Thu thập dữ liệu

| Biến | Ký hiệu | Đo lường | Nguồn |
| :--- | :--- | :--- | :--- |
| Số bằng sáng chế | `patents` | số đếm/năm | cơ sở dữ liệu sở hữu trí tuệ |
| Chi R&D | `lnrd` | log chi R&D | BCTC |
| Quy mô | `lnsize` | log tài sản/lao động | BCTC |

## Bước 4 — Mô hình hóa

Chọn họ *Dữ liệu đếm* → **Poisson**, kiểm tra **overdispersion**; nếu có ⇒ **Negative Binomial**:

$$
E[patents_i \mid X_i] = \exp(\beta_0 + \beta_1 lnrd_i + \beta_2 lnsize_i)
$$

**Kết quả minh họa (định dạng — không phải kết quả thực):**

| | Poisson | NegBin |
| :--- | :--- | :--- |
| lnrd (IRR) | 1.35*** | 1.31*** |
| lnsize (IRR) | 1.12** | 1.10** |
| Overdispersion $\alpha$ | — | 0.42 (≠0) ⇒ chọn NegBin |

Diễn giải mẫu: chi R&D tăng 1% gắn với số bằng sáng chế kỳ vọng cao hơn (IRR > 1); kiểm định $\alpha \ne 0$ ⇒ **NegBin phù hợp hơn Poisson**.

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* === So sánh Poisson vs Negative Binomial ===

* Poisson với sai số chuẩn robust
poisson patents rd_spend size_log, vce(robust)
estimates store pois

* Negative Binomial với sai số chuẩn robust
nbreg patents rd_spend size_log, vce(robust)
estimates store nb

* So sánh AIC/BIC
estimates stats pois nb

* IRR
nbreg patents rd_spend size_log, vce(robust) irr

* Kiểm định alpha = 0 (NegBin vs Poisson)
* ⇒ LR test tự động hiển thị trong output nbreg
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# === So sánh Poisson vs Negative Binomial ===
library(MASS)

# Poisson
pois <- glm(patents ~ rd_spend + size_log,
            family = poisson, data = df)

# Negative Binomial
nb <- glm.nb(patents ~ rd_spend + size_log, data = df)

# So sánh AIC
AIC(pois, nb)

# IRR — NegBin
exp(coef(nb))
exp(confint(nb))

# Kiểm tra overdispersion
library(AER)
dispersiontest(pois)

# Kết luận: AIC NegBin < AIC Poisson ⇒ NegBin phù hợp hơn
summary(nb)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# === So sánh Poisson vs Negative Binomial ===
import statsmodels.api as sm
import numpy as np

X = sm.add_constant(df[["rd_spend", "size_log"]])
y = df["patents"]

# Poisson
pois = sm.GLM(y, X, family=sm.families.Poisson()).fit()
print("=== Poisson ===")
print(pois.summary())

# Negative Binomial
nb = sm.GLM(y, X, family=sm.families.NegativeBinomial()).fit()
print("\n=== Negative Binomial ===")
print(nb.summary())

# So sánh AIC
print(f"\nAIC Poisson:  {pois.aic:.2f}")
print(f"AIC NegBin:   {nb.aic:.2f}")

# IRR — NegBin
print("\nIRR (NegBin):")
print(np.exp(nb.params))

# Overdispersion ratio
print(f"\nOverdispersion (Poisson): {pois.pearson_chi2 / pois.df_resid:.2f}")
```

  </TabItem>
</Tabs>

## Bước 5 — Báo cáo
Xuất báo cáo + **mã tái lập**; nếu dư thừa số 0 (nhiều DN 0 bằng sáng chế) ⇒ cân nhắc [ZINB](/ecolab/model/zinb).

## Video minh họa

<VideoTutorial
  title="Hướng dẫn chạy mô hình biến đếm (Poisson / NegBin) trong EcoLab"
  src="https://www.youtube.com/embed/m3wyHeBOfUE"
/>

## Xem thêm
- [Poisson](/ecolab/model/poisson) · [Negative Binomial](/ecolab/model/negbin) · [ZINB](/ecolab/model/zinb) · [Danh mục](/ecolab/model/group)

