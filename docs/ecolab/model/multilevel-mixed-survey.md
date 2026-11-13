---
title: Mô hình đa cấp, hiệu ứng hỗn hợp phi tuyến GLMM & khảo sát phức hợp vùng nhỏ
sidebar_position: 16
description: Hướng dẫn ước lượng mô hình phân cấp tuyến tính HLM, hiệu ứng hỗn hợp tổng quát GLMM, phương sai khảo sát phức hợp Taylor/BRR/Jackknife và ước lượng vùng nhỏ Fay–Herriot trên EcoData và EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Mô hình đa cấp, hiệu ứng hỗn hợp phi tuyến GLMM & khảo sát phức hợp vùng nhỏ

**Họ mô hình 16 (Kinh tế lượng đa cấp, hiệu ứng hỗn hợp và khảo sát phức hợp)** gồm **3 nhóm con** và **12 mô hình chuẩn mực** dùng cho dữ liệu vi mô có cấu trúc phân cấp lồng nhau (hộ gia đình – xã – tỉnh, học sinh – trường – sở) và dữ liệu điều tra chọn mẫu phân tầng nhiều giai đoạn như **VHLSS 2004–2024**, **LFS**, **DHS** hoặc **Enterprise Survey**.

Trong EcoLab, nhóm mô hình này nằm tại **Mô hình hóa → 16. Đa cấp, hỗn hợp & khảo sát**, đồng bộ trực tiếp với công cụ MCP `analyze_multilevel_survey`. Xem thêm [Danh mục 16 họ mô hình](/ecolab/model/group).

---

## Ba nhóm mô hình con trong Họ 16

1. **Mô hình tuyến tính phân cấp và hiệu ứng hỗn hợp (`hierarchical_linear_mixed`)**:
   - `linear_mixed_hlm` — Hồi quy tuyến tính đa cấp REML / ML với hệ số chặn và hệ số góc ngẫu nhiên.
   - `three_level_nested_mixed` — Mô hình hỗn hợp lồng nhau 3 cấp (hộ – xã – tỉnh).
   - `crossed_random_effects_mixed` — Hiệu ứng ngẫu nhiên chéo hai chiều không lồng nhau.
   - `mundlak_within_between_mixed` — Phân tách tác động nội cụm và giữa các cụm Correlated Random Effects.
2. **Mô hình hỗn hợp tổng quát phi tuyến (`generalized_mixed_glmm`)**:
   - `mixed_effects_logit` — Logit hiệu ứng hỗn hợp với cầu phương Gauss–Hermite thích nghi.
   - `mixed_effects_probit` — Probit hiệu ứng hỗn hợp đa cấp.
   - `mixed_effects_poisson_nb` — Poisson và Nhị thức âm hiệu ứng hỗn hợp cho dữ liệu đếm phân cấp.
   - `mixed_effects_ordinal_logit` — Logit thứ tự tích lũy đa cấp.
3. **Khảo sát phức hợp và ước lượng vùng nhỏ (`complex_survey_sae`)**:
   - `svy_taylor_linearized_glm` — Hồi quy GLM trọng số xác suất `pweight` kèm tuyến tính hóa Taylor phân tầng PSU.
   - `svy_brr_jackknife_repweights` — Suy luận phương sai trọng số lặp BRR, Fay và Delete-1 Jackknife.
   - `fay_herriot_small_area` — Ước lượng vùng nhỏ Empirical Best Linear Unbiased Prediction Fay–Herriot.
   - `nested_error_unit_sae` — Ước lượng vùng nhỏ cấp đơn vị Battese–Harter–Fuller / Elbers–Lanjouw–Lanjouw.

---

## Minh họa mã tái lập 3 ngôn ngữ

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata 18 MP" default>

```stata
* === 1. Mô hình tuyến tính đa cấp 3 bậc (mixed REML) ===
mixed log_exp edu_head hh_size urban || prov_id: || commune_id:, reml
estat icc

* === 2. Khảo sát phức hợp phân tầng PSU (svy linearized) ===
svyset commune_id [pweight = wt_hh], strata(stratum_id) vce(linearized) singleunit(centered)
svy: regress log_exp edu_head hh_size urban
estat effects
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# === 1. Hierarchical Linear Mixed Model (lme4) ===
library(lme4)
fit_hlm <- lmer(log_exp ~ edu_head + hh_size + urban + (1 | prov_id/commune_id), data = df, REML = TRUE)
summary(fit_hlm)

# === 2. Complex Survey Taylor Linearized GLM (survey) ===
library(survey)
des <- svydesign(id = ~commune_id, strata = ~stratum_id, weights = ~wt_hh, data = df, nest = TRUE)
fit_svy <- svyglm(log_exp ~ edu_head + hh_size + urban, design = des)
summary(fit_svy)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# === Hierarchical Mixed Linear Model (statsmodels MixedLM) ===
import statsmodels.formula.api as smf

md = smf.mixedlm("log_exp ~ edu_head + hh_size + urban", data=df, groups=df["prov_id"])
mdf = md.fit(reml=True)
print(mdf.summary())
```

  </TabItem>
</Tabs>
