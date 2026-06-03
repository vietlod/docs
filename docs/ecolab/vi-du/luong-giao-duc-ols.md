---
title: 'Lợi suất giáo dục lên tiền lương (OLS)'
sidebar_position: 3
description: Thực hành OLS trên EcoLab — ước lượng hàm tiền lương Mincer (tác động của số năm học và kinh nghiệm lên lương), từ ý tưởng đến báo cáo có mã tái lập.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Lợi suất giáo dục lên tiền lương (hàm Mincer, OLS)

Minh họa quy trình 5 bước của EcoLab với mô hình kinh điển nhất trong kinh tế lao động: **hàm tiền lương Mincer** ước lượng bằng [OLS](/ecolab/model/ols). Số liệu kết quả là **minh họa định dạng**.

> Tóm tắt: hồi quy **log tiền lương** theo **số năm học** và **kinh nghiệm** cho ước lượng "lợi suất giáo dục" (suất sinh lợi của mỗi năm học tăng thêm).

---

## Bước 1 — Ý tưởng
- **Câu hỏi:** thêm một năm học làm tăng tiền lương bao nhiêu phần trăm?

## Bước 2 — Tổng quan tài liệu
Khung lý thuyết vốn con người (Becker, Mincer); chuẩn hóa trích dẫn; làm rõ biến và dạng log-lin.

## Bước 3 — Thu thập dữ liệu

| Biến | Ký hiệu | Đo lường | Nguồn |
| :--- | :--- | :--- | :--- |
| Log tiền lương | `lnwage` | log(lương giờ/tháng) | VHLSS; khảo sát lao động |
| Số năm học | `educ` | số năm | VHLSS |
| Kinh nghiệm | `exper`, `exper2` | năm và bình phương | tính từ tuổi − học − 6 |
| Kiểm soát | `gioi_tinh`, `khu_vuc` | nhị phân | VHLSS |

## Bước 4 — Mô hình hóa

Dạng Mincer (log-lin, có kinh nghiệm bậc 2 để bắt dạng lõm):

$$
\ln(wage_i) = \beta_0 + \beta_1\,educ_i + \beta_2\,exper_i + \beta_3\,exper_i^2 + X_i\gamma + \varepsilon_i
$$

Chọn họ *Hồi quy tuyến tính cổ điển* → **OLS**, dùng **sai số chuẩn robust** (heteroskedasticity thường gặp ở dữ liệu vi mô).

**Kết quả minh họa (định dạng — không phải kết quả thực):**

| Biến | Hệ số | SE (robust) | p-value |
| :--- | :--- | :--- | :--- |
| educ | 0.082 | 0.005 | 0.000 |
| exper | 0.031 | 0.004 | 0.000 |
| exper2 | −0.0005 | 0.0001 | 0.000 |
| $R^2$ | 0.38 | | |

Diễn giải mẫu: $\hat{\beta}_1 = 0.082$ ⇒ mỗi năm học tăng thêm gắn với lương cao hơn **~8.2%** (xấp xỉ, do log-lin); kinh nghiệm có quan hệ lõm (tăng rồi chậm lại).

**Mã tái lập:**

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* === Hàm Mincer — OLS robust ===
use wage_data, clear

* Tạo biến kinh nghiệm bậc 2
gen exper2 = exper^2

* Hồi quy OLS với sai số chuẩn robust
regress lnwage educ exper exper2 gioi_tinh khu_vuc, vce(robust)
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# === Hàm Mincer — OLS robust ===
library(lmtest)
library(sandwich)

model <- lm(lnwage ~ educ + exper + I(exper^2) + gioi_tinh + khu_vuc,
            data = df)

# Sai số chuẩn robust (HC1)
coeftest(model, vcov = vcovHC(model, type = "HC1"))
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
import statsmodels.api as sm

# === Hàm Mincer — OLS robust ===
df['exper2'] = df['exper'] ** 2
X = df[['educ', 'exper', 'exper2', 'gioi_tinh', 'khu_vuc']]
X = sm.add_constant(X)

model = sm.OLS(df['lnwage'], X).fit(cov_type='HC1')
print(model.summary())
```

  </TabItem>
</Tabs>

## Bước 5 — Báo cáo
Xuất báo cáo APA/Harvard… kèm **mã tái lập** Stata/R/Python.

:::warning Lưu ý nội sinh
`educ` có thể **nội sinh** (năng lực bẩm sinh không quan sát ảnh hưởng cả học vấn lẫn lương) ⇒ OLS có thể chệch. Xem cách xử lý bằng biến công cụ tại [Ví dụ IV: Lợi suất giáo dục](/ecolab/vi-du/iv-loi-suat-giao-duc).
:::

## Video minh họa

<VideoTutorial
  title="Hướng dẫn chạy OLS (hàm Mincer) trong EcoLab"
  src="https://www.youtube.com/user/vietlod"
/>

## Xem thêm
- [OLS](/ecolab/model/ols) · [Ví dụ IV](/ecolab/vi-du/iv-loi-suat-giao-duc) · [Danh mục](/ecolab/model/group)
