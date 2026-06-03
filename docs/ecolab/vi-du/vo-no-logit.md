---
title: 'Xác suất vỡ nợ doanh nghiệp (Logit)'
sidebar_position: 4
description: Thực hành Logit trên EcoLab — dự báo xác suất vỡ nợ của doanh nghiệp từ các chỉ số tài chính, đọc odds ratio và tác động biên.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Xác suất vỡ nợ doanh nghiệp (Logit)

Minh họa [Logit](/ecolab/model/logit) cho biến nhị phân: dự báo **xác suất vỡ nợ** ($Y=1$ nếu vỡ nợ) từ các chỉ số tài chính. Số liệu là **minh họa**.

> Tóm tắt: hồi quy biến nhị phân `vo_no` theo đòn bẩy, khả năng sinh lời và thanh khoản; diễn giải bằng **odds ratio** và **tác động biên**.

---

## Bước 1 — Ý tưởng
- **Câu hỏi:** chỉ số tài chính nào làm tăng xác suất vỡ nợ, và mức độ ra sao?

## Bước 2 — Tổng quan tài liệu
Mô hình cảnh báo sớm rủi ro tín dụng (Altman Z-score, mô hình hazard); làm rõ biến và ngưỡng.

## Bước 3 — Thu thập dữ liệu

| Biến | Ký hiệu | Đo lường | Nguồn |
| :--- | :--- | :--- | :--- |
| Vỡ nợ | `vo_no` | 1 = vỡ nợ, 0 = không | BCTC doanh nghiệp niêm yết |
| Đòn bẩy | `don_bay` | Nợ/Tổng tài sản | BCTC |
| Sinh lời | `roa` | LN ròng/Tổng tài sản | BCTC |
| Thanh khoản | `current` | TS ngắn hạn/Nợ ngắn hạn | BCTC |

## Bước 4 — Mô hình hóa

Chọn họ *Biến phụ thuộc giới hạn* → **Logit**:

$$
P(vo\_no_i = 1) = \frac{1}{1 + e^{-(\beta_0 + \beta_1 don\_bay_i + \beta_2 roa_i + \beta_3 current_i)}}
$$

**Kết quả minh họa (định dạng — không phải kết quả thực):**

| Biến | Hệ số | Odds ratio | AME | p-value |
| :--- | :--- | :--- | :--- | :--- |
| don_bay | 1.45 | 4.26 | 0.21 | 0.000 |
| roa | −3.10 | 0.045 | −0.28 | 0.000 |
| current | −0.60 | 0.55 | −0.07 | 0.012 |
| AUC | 0.84 | | | |

Diễn giải mẫu: đòn bẩy cao làm **tăng** odds vỡ nợ (OR ≈ 4.3); ROA và thanh khoản cao **giảm** rủi ro; AUC 0.84 cho thấy phân loại tốt.

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* === Logit — Xác suất vỡ nợ doanh nghiệp ===
logit vo_no don_bay roa current

* Tác động biên trung bình (AME)
margins, dydx(*)

* Đường ROC và AUC
lroc

* Bảng phân loại (confusion matrix)
estat classification

* Odds ratio
logit vo_no don_bay roa current, or
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# === Logit — Xác suất vỡ nợ doanh nghiệp ===
model <- glm(vo_no ~ don_bay + roa + current,
             family = binomial(link = "logit"),
             data   = df)
summary(model)

# Odds ratio và khoảng tin cậy
exp(coef(model))
exp(confint(model))

# Tác động biên trung bình (AME)
library(margins)
m <- margins(model)
summary(m)

# Đường ROC và AUC
library(pROC)
roc_obj <- roc(df$vo_no, fitted(model))
auc(roc_obj)
plot(roc_obj, main = "ROC — Logit vỡ nợ")
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# === Logit — Xác suất vỡ nợ doanh nghiệp ===
import statsmodels.api as sm
import numpy as np
import pandas as pd

X = sm.add_constant(df[["don_bay", "roa", "current"]])
y = df["vo_no"]

model = sm.Logit(y, X).fit()
print(model.summary())

# Odds ratio
print("\nOdds Ratios:")
print(np.exp(model.params))

# Tác động biên trung bình (AME)
mfx = model.get_margeff()
print(mfx.summary())

# ROC / AUC
from sklearn.metrics import roc_auc_score, roc_curve
import matplotlib.pyplot as plt

y_pred = model.predict(X)
auc = roc_auc_score(y, y_pred)
print(f"\nAUC = {auc:.4f}")

fpr, tpr, _ = roc_curve(y, y_pred)
plt.plot(fpr, tpr, label=f"AUC = {auc:.2f}")
plt.xlabel("FPR"); plt.ylabel("TPR")
plt.title("ROC — Logit vỡ nợ")
plt.legend(); plt.show()
```

  </TabItem>
</Tabs>

## Bước 5 — Báo cáo
Xuất báo cáo + **mã tái lập**; kèm bảng phân loại và đường ROC.

## Video minh họa

<VideoTutorial
  title="Hướng dẫn chạy Logit (vỡ nợ doanh nghiệp) trong EcoLab"
  src="https://www.youtube.com/user/vietlod"
/>

## Xem thêm
- [Logit](/ecolab/model/logit) · [Probit](/ecolab/model/probit) · [Danh mục](/ecolab/model/group)
