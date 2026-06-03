---
title: 'Lãi suất – lạm phát – sản lượng (VAR)'
sidebar_position: 9
description: Thực hành VAR trên EcoLab — phân tích tương tác động giữa lãi suất, lạm phát và sản lượng bằng phản ứng đẩy (IRF) và phân rã phương sai.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Tương tác lãi suất – lạm phát – sản lượng (VAR)

Minh họa [VAR](/ecolab/model/var): phân tích **động học hệ thống vĩ mô** giữa lãi suất chính sách, lạm phát và sản lượng — không áp đặt chiều nhân quả tiên nghiệm. Số liệu là **minh họa**.

> Tóm tắt: ước lượng VAR 3 biến, đọc **phản ứng đẩy (IRF)** và **phân rã phương sai (FEVD)** để xem cú sốc lãi suất lan truyền thế nào.

---

## Bước 1 — Ý tưởng
- **Câu hỏi:** một cú sốc tăng lãi suất ảnh hưởng ra sao đến lạm phát và sản lượng theo thời gian?

## Bước 2 — Tổng quan tài liệu
Chính sách tiền tệ, cơ chế truyền dẫn; VAR/SVAR vĩ mô.

## Bước 3 — Thu thập dữ liệu

| Biến | Ký hiệu | Đo lường | Nguồn |
| :--- | :--- | :--- | :--- |
| Lãi suất | `rate` | lãi suất chính sách (%) | NHNN; IMF |
| Lạm phát | `inf` | % thay đổi CPI | GSO; World Bank |
| Sản lượng | `lny` | log GDP thực / chỉ số sản xuất | GSO |

## Bước 4 — Mô hình hóa

Kiểm tra **tính dừng** (sai phân nếu cần). Chọn họ *Chuỗi thời gian đa biến* → **VAR**; chọn độ trễ theo AIC/BIC:

$$
Y_t = c + A_1 Y_{t-1} + \dots + A_p Y_{t-p} + \varepsilon_t, \quad Y_t = (rate_t, inf_t, lny_t)'
$$

**Kết quả minh họa (định dạng — không phải kết quả thực):**

| Phân tích | Kết quả mẫu |
| :--- | :--- |
| Độ trễ tối ưu | 2 (theo AIC) |
| IRF: sốc `rate` ↑ | `inf` giảm sau 2–4 kỳ; `lny` giảm tạm thời |
| Granger | `rate` → `inf` (p &lt; 0.05) |
| FEVD (lny, 10 kỳ) | ~25% do sốc lãi suất |

Diễn giải mẫu: cú sốc thắt chặt (lãi suất tăng) làm **giảm lạm phát** sau vài kỳ và **giảm sản lượng** tạm thời — phù hợp truyền dẫn chính sách tiền tệ. Để diễn giải cú sốc cấu trúc, dùng [SVAR](/ecolab/model/svar).

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* === Lãi suất – Lạm phát – Sản lượng (VAR) ===

* --- Khai báo chuỗi thời gian ---
tsset quarter

* --- Ước lượng VAR(4) ---
var rate inflation output, lags(1/4)

* --- Kiểm định nhân quả Granger ---
vargranger

* --- Phản ứng đẩy (IRF) ---
irf create macro_irf, set(macro_irf) step(20)
irf graph oirf, impulse(rate) response(inflation output)

* --- Phân rã phương sai ---
irf graph fevd
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# === Lãi suất – Lạm phát – Sản lượng (VAR) ===
library(vars)

# --- Ước lượng VAR(4) ---
var_model <- VAR(cbind(rate, inflation, output),
                 p = 4, type = "const")

# --- Kiểm định nhân quả Granger ---
causality(var_model, cause = "rate")

# --- Phản ứng đẩy (IRF) ---
irf_result <- irf(var_model, impulse = "rate",
                  response = c("inflation", "output"),
                  n.ahead = 20, boot = TRUE)
plot(irf_result)

# --- Phân rã phương sai ---
plot(fevd(var_model, n.ahead = 20))
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# === Lãi suất – Lạm phát – Sản lượng (VAR) ===
from statsmodels.tsa.api import VAR

# --- Ước lượng VAR(4) ---
model = VAR(df[["rate", "inflation", "output"]])
results = model.fit(4)
print(results.summary())

# --- Kiểm định nhân quả Granger ---
granger = results.test_causality("inflation", causing="rate")
print(granger.summary())

# --- Phản ứng đẩy (IRF) ---
irf = results.irf(20)
irf.plot(orth=True)

# --- Phân rã phương sai ---
fevd = results.fevd(20)
fevd.plot()
```

  </TabItem>
</Tabs>

## Bước 5 — Báo cáo
Xuất báo cáo + đồ thị **IRF/FEVD** + **mã tái lập**.

## Video minh họa

<VideoTutorial
  title="Hướng dẫn chạy VAR trong EcoLab"
  src="https://www.youtube.com/embed/m3wyHeBOfUE"
/>

## Xem thêm
- [VAR](/ecolab/model/var) · [SVAR](/ecolab/model/svar) · [VECM](/ecolab/model/vecm) · [Danh mục](/ecolab/model/group)

