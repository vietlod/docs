---
title: 'Nợ công và tăng trưởng (dữ liệu bảng)'
sidebar_position: 2
description: Thực hành đầy đủ trên EcoLab — phân tích tác động của nợ công đến tăng trưởng kinh tế bằng dữ liệu bảng đa quốc gia, so sánh FEM/REM và System GMM, từ ý tưởng đến báo cáo.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Nợ công và tăng trưởng kinh tế (dữ liệu bảng)

Trang này minh họa **quy trình 5 bước** của EcoLab cho một đề tài dữ liệu bảng phổ biến: *tác động của nợ công đến tăng trưởng kinh tế*. Trọng tâm là cách chọn giữa [FEM/REM](/ecolab/model/fem-rem) và [GMM động](/ecolab/model/gmm) khi mô hình có tính động và nghi ngờ nội sinh. Các con số kết quả là **minh họa định dạng**, không phải kết quả thực nghiệm chính thức.

> Tóm tắt: với bảng nhiều quốc gia × nhiều năm và mô hình tăng trưởng động (có biến tăng trưởng trễ), **System GMM** thường phù hợp hơn FEM do kiểm soát được nội sinh và chệch Nickell.

---

## Bước 1 — Tạo ý tưởng (Ideation)

- **Câu hỏi nghiên cứu:** nợ công (debt/GDP) ảnh hưởng thế nào đến tăng trưởng, và có ngưỡng phi tuyến không?
- **Đóng góp dự kiến:** kiểm định quan hệ nợ–tăng trưởng có kiểm soát nội sinh bằng GMM cho mẫu cập nhật.

## Bước 2 — Tổng quan tài liệu (Literature Review)

EcoLab tổng hợp tài liệu (ví dụ tranh luận quanh ngưỡng nợ 90% GDP), chuẩn hóa trích dẫn, làm rõ khoảng trống và biến số. Khung: lý thuyết tăng trưởng tân cổ điển + nội sinh.

## Bước 3 — Thu thập dữ liệu (Data Collection)

| Biến | Ký hiệu | Đo lường | Nguồn |
| :--- | :--- | :--- | :--- |
| Tăng trưởng GDP | `growth` | % thay đổi GDP thực | World Bank WDI; IMF WEO |
| Nợ công | `debt` | Nợ công / GDP (%) | IMF; World Bank |
| Đầu tư | `invest` | Tổng vốn cố định / GDP (%) | World Bank WDI |
| Độ mở thương mại | `open` | (XK + NK)/GDP (%) | World Bank WDI |
| Lạm phát | `inf` | % thay đổi CPI | World Bank WDI |

- **Cấu trúc:** bảng ~30–60 quốc gia × ~20 năm (N lớn, T vừa) — phù hợp GMM động.
- Trong EcoLab, kết nối [EcoData](/ecodata/overview) hoặc nguồn công khai, ghép biến, làm sạch và xem thống kê mô tả.

## Bước 4 — Mô hình hóa (Modeling)

**Chiến lược ước lượng theo thứ tự:**

1. **Pooled OLS** (cơ sở) → **FEM/REM**; chạy **Hausman** để chọn giữa FEM và REM.
2. Nhận diện **tính động** (thêm `growth_lag`) và **nội sinh** (debt có thể nội sinh) → chuyển sang **[System GMM](/ecolab/model/gmm)**.
3. Kiểm định bắt buộc cho GMM: **AR(2)**, **Hansen**, kiểm soát **số công cụ**.

**Kết quả minh họa (định dạng — không phải kết quả thực):**

| | FEM | System GMM |
| :--- | :--- | :--- |
| growth_lag | — | 0.30*** |
| debt | −0.06** | −0.04** |
| invest | 0.22*** | 0.19*** |
| Hausman | p=0.01 → FEM | — |
| AR(2) p-value | — | 0.37 (hợp lệ) |
| Hansen p-value | — | 0.31 (hợp lệ) |

Diễn giải mẫu: nợ công có tác động âm nhỏ đến tăng trưởng; GMM xác nhận dấu sau khi kiểm soát nội sinh và tính động.

**Mã tái lập:**

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* === Nợ công & Tăng trưởng — Panel FE/RE + Hausman ===
xtset country year

* Fixed Effects với sai số chuẩn robust
xtreg growth debt invest open, fe vce(robust)
estimates store fe_est

* Random Effects
xtreg growth debt invest open, re
estimates store re_est

* Kiểm định Hausman
hausman fe_est re_est
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# === Nợ công & Tăng trưởng — Panel FE/RE + Hausman ===
library(plm)

pdata <- pdata.frame(df, index = c("country", "year"))

# Fixed Effects
fe <- plm(growth ~ debt + invest + open,
          data = pdata, model = "within")
summary(fe)

# Random Effects
re <- plm(growth ~ debt + invest + open,
          data = pdata, model = "random")
summary(re)

# Kiểm định Hausman
phtest(fe, re)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
from linearmodels.panel import PanelOLS, RandomEffects
import statsmodels.api as sm

# === Nợ công & Tăng trưởng — Panel FE ===
df = df.set_index(['country', 'year'])
y = df['growth']
X = sm.add_constant(df[['debt', 'invest', 'open']])

# Fixed Effects với sai số chuẩn cụm
fe = PanelOLS(y, X, entity_effects=True).fit(
    cov_type='clustered', cluster_entity=True)
print(fe.summary)

# Random Effects
re = RandomEffects(y, X).fit()
print(re.summary)
```

  </TabItem>
</Tabs>

## Bước 5 — Báo cáo (Reporting)

EcoLab tạo báo cáo chuẩn (APA/Chicago/Harvard/IEEE/MLA) gồm dữ liệu & phương pháp, bảng kết quả FEM vs GMM, chẩn đoán, thảo luận và **phụ lục mã tái lập** (Stata/R/Python).

---

## Tái lập và kiểm chứng

Mọi bước ước lượng (FEM, REM, Hausman, System GMM với AR(2)/Hansen) được sinh thành **mã tái lập** ở thẻ tương ứng để chạy lại độc lập — đảm bảo minh bạch và kiểm chứng được.

---

## Video minh họa

<VideoTutorial
  title="Hướng dẫn phân tích nợ công và tăng trưởng trong EcoLab"
  src="https://www.youtube.com/embed/m3wyHeBOfUE"
/>

## Xem thêm

- [GMM cho dữ liệu bảng động](/ecolab/model/gmm) · [FEM và REM](/ecolab/model/fem-rem)
- [Ví dụ: FDI và tăng trưởng Việt Nam (ARDL)](/ecolab/vi-du/fdi-tang-truong-ardl)
- [Tổng quan EcoLab](/ecolab/overview) · [Ước lượng & Mô hình hóa](/ecolab/econometrics-modeling)

