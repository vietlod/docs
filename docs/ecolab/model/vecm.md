---
title: Mô hình VECM
sidebar_position: 4
description: VECM (Vector Error Correction Model) là gì, quan hệ với VAR và đồng liên kết Johansen, khi nào dùng, các bước kiểm định và cách chạy VECM trong EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Mô hình VECM (Vector Error Correction Model)

**VECM** là mô hình đa biến dùng khi nhiều chuỗi thời gian **không dừng I(1)** nhưng **đồng liên kết (cointegrated)** — tức tồn tại quan hệ cân bằng dài hạn giữa chúng. VECM mở rộng VAR bằng cách thêm **số hạng hiệu chỉnh sai số (error correction term)** thể hiện tốc độ các biến quay về cân bằng dài hạn sau cú sốc.

Trong EcoLab, VECM thuộc nhóm **Chuỗi thời gian**. Khác với [ARDL](/ecolab/model/ardl) (một phương trình, phù hợp khi có một biến phụ thuộc rõ), VECM phù hợp khi nghi ngờ **quan hệ đồng thời nhiều chiều** giữa các biến.

---

## Khi nào nên dùng VECM?

- Có **từ hai biến trở lên cùng I(1)** và nghi ngờ quan hệ dài hạn (đồng liên kết).
- Quan tâm **động học hệ thống** (phản ứng đẩy IRF, phân rã phương sai) chứ không chỉ một phương trình.
- Đã xác nhận đồng liên kết qua **kiểm định Johansen** (trace / max-eigenvalue).

**Nếu các biến đều dừng I(0)** → dùng VAR thường. **Nếu I(1) nhưng KHÔNG đồng liên kết** → dùng VAR ở sai phân.

---

## Đặc tả mô hình

Dạng VECM rút gọn:

$$
\Delta Y_t = \Pi \, Y_{t-1} + \sum_i \Gamma_i \, \Delta Y_{t-i} + \varepsilon_t
$$

- $\Pi = \alpha \beta'$: ma trận $\beta$ chứa các **vector đồng liên kết** (quan hệ dài hạn); $\alpha$ là **tốc độ điều chỉnh**.
- **Hạng (rank) của $\Pi = r$** = số quan hệ đồng liên kết, xác định bằng kiểm định Johansen.
- $\Gamma_i$: động học ngắn hạn.

---

## Quy trình kiểm định

1. **Kiểm định nghiệm đơn vị** (ADF/PP/KPSS): xác nhận các biến cùng I(1).
2. **Chọn độ trễ** cho VAR cơ sở (AIC/BIC/HQ).
3. **Kiểm định đồng liên kết Johansen** (trace & max-eigenvalue) → xác định hạng `r`.
4. Ước lượng VECM với hạng `r`; kiểm tra dấu và ý nghĩa của `α` (điều chỉnh sai số).
5. **Chẩn đoán phần dư**: tự tương quan (LM), phân phối chuẩn, ổn định; phân tích **IRF** và **phân rã phương sai (FEVD)**.

---

## Thực hiện trong EcoLab

1. Module **Thu thập dữ liệu**: lấy các chuỗi thời gian liên quan (cùng tần suất).
2. Module **Mô hình hóa** → nhóm *Chuỗi thời gian* → *VAR/VECM*; chọn tập biến hệ thống.
3. Khai báo độ trễ và hạng đồng liên kết (hoặc để hệ thống đề xuất từ Johansen).
4. Đọc kết quả: vector dài hạn `β`, hệ số điều chỉnh `α`, IRF/FEVD; lấy mã ở thẻ **Mã tái lập**.

---

## Ví dụ đầu vào / đầu ra

**Đầu vào (minh họa):** chuỗi quý của `lgdp` (log GDP), `lm2` (log cung tiền), `lcpi` (log giá).

**Đầu ra (định dạng, số liệu minh họa — không phải kết quả thực):**

| Thành phần | Giá trị | Ghi chú |
| :--- | :--- | :--- |
| Johansen trace (r=0) | bác bỏ | có ít nhất 1 quan hệ |
| Johansen trace (r≤1) | không bác bỏ | r = 1 |
| α (lgdp) | −0.18*** | điều chỉnh về cân bằng |
| Vector dài hạn β | lgdp − 0.7·lm2 + 0.5·lcpi | quan hệ cân bằng |

---

## Minh họa mã tái lập

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* === VECM — Vector Error Correction Model ===

* --- Khai báo chuỗi thời gian ---
tsset quarter

* --- Kiểm định hạng đồng liên kết Johansen ---
vecrank y1 y2 y3, lags(2) max

* --- Ước lượng VECM với hạng r=1 ---
vec y1 y2 y3, rank(1) lags(2)

* --- Chẩn đoán phần dư ---
veclmar, mlag(4)
vecnorm

* --- Phản ứng đẩy ---
irf create vecm_irf, set(vecm_irf) step(20)
irf graph oirf
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# === VECM — Vector Error Correction Model ===
library(urca)
library(vars)

# --- Kiểm định đồng liên kết Johansen ---
jo_test <- ca.jo(data, type = "trace", K = 2,
                 ecdet = "const", spec = "longrun")
summary(jo_test)

# --- Ước lượng VECM (hạng r=1) ---
vecm <- cajorls(jo_test, r = 1)
summary(vecm$rlm)

# --- Chuyển sang VAR dạng mức để tính IRF ---
var_from_vec <- vec2var(jo_test, r = 1)
irf_result <- irf(var_from_vec, n.ahead = 20, boot = TRUE)
plot(irf_result)

# --- Phân rã phương sai ---
fevd_result <- fevd(var_from_vec, n.ahead = 20)
plot(fevd_result)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# === VECM — Vector Error Correction Model ===
from statsmodels.tsa.vector_ar.vecm import VECM, coint_johansen
import numpy as np

# --- Kiểm định đồng liên kết Johansen ---
johansen = coint_johansen(data, det_order=0, k_ar_diff=1)
print("Trace statistic:", johansen.lr1)
print("Critical values (90%, 95%, 99%):")
print(johansen.cvt)

# --- Ước lượng VECM (hạng r=1) ---
model = VECM(data, k_ar_diff=1, coint_rank=1,
             deterministic="co")
result = model.fit()
print(result.summary())

# --- Phản ứng đẩy ---
irf = result.irf(periods=20)
irf.plot(orth=True)
```

  </TabItem>
</Tabs>

---

## Hạn chế và lưu ý

- Nhạy với **lựa chọn độ trễ** và **thành phần xác định** (hằng số/xu thế) trong Johansen.
- Cần mẫu đủ dài; kết quả Johansen kém tin cậy với mẫu ngắn.
- Diễn giải vector đồng liên kết cần chuẩn hóa và bám lý thuyết kinh tế.
- Không xử lý biến I(2); kiểm tra bậc tích hợp trước.

---

## Video minh họa

<VideoTutorial
  title="Hướng dẫn chạy VECM trong EcoLab"
  src="https://www.youtube.com/embed/m3wyHeBOfUE"
/>

## Xem thêm

- [Mô hình ARDL](/ecolab/model/ardl) — thay thế một phương trình
- [Ví dụ: FDI và tăng trưởng (ARDL)](/ecolab/vi-du/fdi-tang-truong-ardl)
- [Ước lượng & Mô hình hóa Kinh tế lượng](/ecolab/econometrics-modeling)

