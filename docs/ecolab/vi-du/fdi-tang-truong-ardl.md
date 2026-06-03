---
title: 'FDI và tăng trưởng kinh tế Việt Nam (ARDL)'
sidebar_position: 1
description: Hướng dẫn thực hành đầy đủ trên EcoLab — nghiên cứu tác động của FDI đến tăng trưởng kinh tế Việt Nam 1990–2023 bằng mô hình ARDL, từ ý tưởng đến báo cáo có mã tái lập.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# FDI và tăng trưởng kinh tế Việt Nam (ARDL)

Trang này minh họa **toàn bộ quy trình nghiên cứu 5 bước** của EcoLab qua một đề tài quen thuộc với học viên cao học và nghiên cứu sinh kinh tế: *tác động của đầu tư trực tiếp nước ngoài (FDI) đến tăng trưởng kinh tế Việt Nam*. Mục tiêu là cho thấy cách đi từ một câu hỏi nghiên cứu đến một báo cáo có **mã tái lập (replication code)** — chứ không phải công bố kết quả thực nghiệm chính thức. Các con số ở phần kết quả là **minh họa định dạng**.

> Tóm tắt: với chuỗi thời gian quốc gia 1990–2023 và các biến có bậc tích hợp hỗn hợp I(0)/I(1), [mô hình ARDL](/ecolab/model/ardl) là lựa chọn phù hợp để ước lượng đồng thời quan hệ dài hạn và ngắn hạn giữa FDI và tăng trưởng.

---

## Bước 1 — Tạo ý tưởng (Ideation)

- **Câu hỏi nghiên cứu:** FDI có thúc đẩy tăng trưởng kinh tế Việt Nam trong dài hạn không, và tốc độ điều chỉnh về cân bằng ra sao?
- **Bối cảnh:** Việt Nam mở cửa thu hút FDI mạnh từ thập niên 1990; quan hệ FDI–tăng trưởng còn nhiều tranh luận về chiều và độ lớn.
- **Đóng góp dự kiến:** kiểm định đồng liên kết FDI–tăng trưởng cho giai đoạn cập nhật, có kiểm soát độ mở thương mại và lạm phát.

Ở module **Tạo ý tưởng**, nhập từ khóa ("FDI", "economic growth", "Vietnam", "ARDL") để hệ thống đề xuất câu hỏi, khoảng trống và biến số sơ bộ.

---

## Bước 2 — Tổng quan tài liệu (Literature Review)

Ở module **Tổng quan tài liệu**, EcoLab tìm và tổng hợp các bài báo liên quan, chuẩn hóa trích dẫn (APA/Harvard…) và làm rõ:

- **Khung lý thuyết:** lý thuyết tăng trưởng nội sinh, vai trò lan tỏa công nghệ của FDI.
- **Khoảng trống:** thiếu nghiên cứu cập nhật dùng ARDL với dữ liệu Việt Nam gần đây và kiểm soát đầy đủ.
- **Biến đề xuất:** biến phụ thuộc và các biến giải thích/kiểm soát (xem Bước 3).

---

## Bước 3 — Thu thập dữ liệu (Data Collection)

| Biến | Ký hiệu | Đo lường | Nguồn |
| :--- | :--- | :--- | :--- |
| Tăng trưởng GDP | `growth` | % thay đổi GDP thực hằng năm | World Bank WDI; Tổng cục Thống kê (GSO) |
| Cường độ FDI | `fdi` | FDI ròng / GDP (%) | World Bank WDI; [EcoData](/ecodata/overview) |
| Độ mở thương mại | `open` | (Xuất khẩu + Nhập khẩu)/GDP (%) | World Bank WDI; Hải quan Việt Nam |
| Lạm phát | `inf` | % thay đổi CPI hằng năm | World Bank WDI; GSO |

- **Giai đoạn:** 1990–2023 (dữ liệu năm).
- Trong EcoLab, kết nối **EcoData** hoặc nguồn công khai để trích xuất, ghép biến theo năm, làm sạch và xem **thống kê mô tả** trước khi ước lượng.

---

## Bước 4 — Mô hình hóa (Modeling)

1. **Kiểm định nghiệm đơn vị** (ADF/PP/KPSS) cho từng biến để xác nhận không có biến I(2) — điều kiện dùng ARDL.
2. Chọn nhóm *Chuỗi thời gian* → **ARDL**; khai báo `growth` là biến phụ thuộc, `fdi`, `open`, `inf` là biến giải thích.
3. Để hệ thống chọn độ trễ theo **AIC/BIC**.
4. Chạy **kiểm định đường bao (bounds test)** để kết luận đồng liên kết; xem hệ số dài hạn và **ECM**.

**Kết quả minh họa (định dạng — không phải kết quả thực):**

| Thành phần | Hệ số | Sai số chuẩn | p-value |
| :--- | :--- | :--- | :--- |
| Dài hạn: fdi | 0.42 | 0.15 | 0.012 |
| Dài hạn: open | 0.08 | 0.04 | 0.061 |
| Dài hạn: inf | −0.05 | 0.03 | 0.089 |
| ECM (α) | −0.55 | 0.13 | 0.001 |
| Bounds F-stat | 6.10 | vượt cận trên I(1) | có đồng liên kết |

Diễn giải mẫu: hệ số ECM âm và có ý nghĩa khẳng định tồn tại quan hệ dài hạn; FDI có tác động dương dài hạn đến tăng trưởng trong đặc tả minh họa này.

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* === FDI và tăng trưởng kinh tế Việt Nam — ARDL ===

* --- Khai báo chuỗi thời gian ---
tsset year

* --- Kiểm định nghiệm đơn vị ---
dfuller growth, lags(2) regress
dfuller fdi, lags(2) regress
dfuller open, lags(2) regress
dfuller inf, lags(2) regress

* --- Ước lượng ARDL ---
ardl growth fdi open inf, lags(. 2 2 2)

* --- Kiểm định đường bao (Bounds test) ---
estat btest

* --- Dạng hiệu chỉnh sai số (ECM) ---
ardl growth fdi open inf, ec

* --- Chẩn đoán ổn định ---
estat sbcusum
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# === FDI và tăng trưởng kinh tế Việt Nam — ARDL ===
library(ARDL)

# --- Ước lượng ARDL ---
ardl_model <- ardl(growth ~ fdi + open + inf,
                   data = ts_df, order = c(2, 2, 2, 2))
summary(ardl_model)

# --- Kiểm định đường bao ---
bounds_f_test(ardl_model, case = 3)

# --- Hệ số dài hạn ---
multipliers(ardl_model)

# --- Dạng ECM ---
ecm_model <- recm(ardl_model, case = 3)
summary(ecm_model)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# === FDI và tăng trưởng kinh tế Việt Nam — ARDL ===
from statsmodels.tsa.ardl import ARDL
from statsmodels.tsa.stattools import adfuller
import pandas as pd

# --- Kiểm định nghiệm đơn vị ---
for col in ["growth", "fdi", "open", "inf"]:
    adf = adfuller(df[col].dropna())
    print(f"{col}: ADF={adf[0]:.3f}, p={adf[1]:.4f}")

# --- Ước lượng ARDL ---
model = ARDL(endog=df["growth"], lags=2,
             exog=df[["fdi", "open", "inf"]], order=2)
result = model.fit()
print(result.summary())

# --- Hệ số dài hạn (tính thủ công từ hệ số ước lượng) ---
# long_run_coef = sum(beta_X) / (1 - sum(phi_Y))
```

  </TabItem>
</Tabs>

---

## Bước 5 — Báo cáo (Reporting)

Ở module **Báo cáo**, EcoLab tạo bản thảo học thuật (chuẩn APA 7th, Chicago, Harvard, IEEE hoặc MLA) gồm: giới thiệu, tổng quan, dữ liệu & phương pháp, kết quả, thảo luận và **phụ lục mã tái lập** (Stata/R/Python). Bạn tải về và tiếp tục hoàn thiện theo yêu cầu của tạp chí hoặc hội đồng.

---

## Tái lập và kiểm chứng

Toàn bộ bước ước lượng được EcoLab sinh thành **mã nguồn hoàn chỉnh** trên Stata, R hoặc Python ở thẻ **Mã tái lập**. Bạn có thể chạy lại độc lập trên máy cục bộ để đối chiếu, đảm bảo kết quả **minh bạch và kiểm chứng được** — yếu tố cốt lõi cho công bố học thuật.

---

## Video minh họa

<VideoTutorial
  title="Hướng dẫn chạy ARDL trong EcoLab"
  src="https://www.youtube.com/embed/m3wyHeBOfUE"
/>

## Xem thêm

- [Mô hình ARDL](/ecolab/model/ardl) — chi tiết giả định và kiểm định đường bao
- [FEM và REM](/ecolab/model/fem-rem) — nếu mở rộng sang dữ liệu bảng nhiều tỉnh/quốc gia
- [Tổng quan EcoLab](/ecolab/overview) · [Ước lượng & Mô hình hóa](/ecolab/econometrics-modeling)

