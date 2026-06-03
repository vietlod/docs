---
title: SVAR — Structural VAR
sidebar_position: 3
description: Mô hình SVAR (Structural VAR) áp ràng buộc nhận dạng để diễn giải cú sốc cấu trúc có ý nghĩa kinh tế, khác VAR rút gọn, và cách chạy trong EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# SVAR — Structural VAR

**SVAR (Structural VAR)** mở rộng [VAR](/ecolab/model/var) bằng cách áp **ràng buộc nhận dạng (identification restrictions)** để tách các **cú sốc cấu trúc có ý nghĩa kinh tế** (vd cú sốc cung, cầu, chính sách tiền tệ) từ sai số rút gọn. Nhờ đó IRF của SVAR diễn giải được về mặt kinh tế, không chỉ là tương quan thống kê.

:::tip Khi nào dùng
Dùng SVAR khi cần **diễn giải cú sốc cấu trúc** (không chỉ dự báo). Việc nhận dạng đòi hỏi **lý thuyết kinh tế** để áp ràng buộc.
:::

---

## Nhận dạng cú sốc cấu trúc

Quan hệ giữa sai số rút gọn $\varepsilon_t$ và cú sốc cấu trúc $u_t$: $\varepsilon_t = B u_t$. Cần ràng buộc để xác định $B$:

| Cách nhận dạng | Ý tưởng |
| :--- | :--- |
| **Recursive (Cholesky)** | Thứ tự biến ⇒ ma trận tam giác |
| **Short-run** | Ràng buộc tác động tức thời = 0 |
| **Long-run (Blanchard-Quah)** | Ràng buộc tác động dài hạn |
| **Sign restrictions** | Áp dấu của phản ứng |

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Chuỗi thời gian đa biến* → **SVAR**.
2. Chọn biến, độ trễ, và **sơ đồ nhận dạng** (Cholesky/short-run/long-run).
3. Chạy; xem IRF/FEVD cấu trúc; xuất **mã tái lập**.

---

## Minh họa mã tái lập

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* === SVAR — Structural VAR ===

* --- Ước lượng VAR rút gọn trước ---
var rate inflation output, lags(1/2)

* --- Định nghĩa ma trận ràng buộc A (recursive/Cholesky) ---
matrix A = (1, 0, 0 \ ., 1, 0 \ ., ., 1)
matrix B = (., 0, 0 \ 0, ., 0 \ 0, 0, .)

* --- Ước lượng SVAR ---
svar rate inflation output, aeq(A) beq(B)

* --- Phản ứng đẩy cấu trúc ---
irf create svar_irf, set(svar_irf) step(20)
irf graph sirf, impulse(rate) response(inflation output)
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# === SVAR — Structural VAR ===
library(vars)

# --- Ước lượng VAR rút gọn ---
var_model <- VAR(data, p = 2, type = "const")

# --- Định nghĩa ma trận ràng buộc A (recursive) ---
A <- diag(3)
A[lower.tri(A)] <- NA   # ước lượng phần tam giác dưới

# --- Ước lượng SVAR ---
svar_model <- SVAR(var_model, Amat = A, estmethod = "scoring")
summary(svar_model)

# --- Phản ứng đẩy cấu trúc ---
svar_irf <- irf(svar_model, impulse = "rate",
                response = c("inflation", "output"),
                n.ahead = 20, boot = TRUE)
plot(svar_irf)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# === SVAR — Structural VAR ===
from statsmodels.tsa.api import VAR
import numpy as np

# --- Ước lượng VAR rút gọn ---
model = VAR(data)
results = model.fit(2)
print(results.summary())

# --- IRF với phân rã Cholesky (recursive) ---
# Thứ tự biến: rate, inflation, output
irf = results.irf(periods=20)
irf.plot(orth=True)   # orth=True dùng phân rã Cholesky

# --- Phân rã phương sai cấu trúc ---
fevd = results.fevd(20)
fevd.plot()
```

  </TabItem>
</Tabs>

---

## Hạn chế

- Kết quả **phụ thuộc mạnh vào ràng buộc nhận dạng** (và thứ tự biến với Cholesky).
- Cần biện minh lý thuyết cho mọi ràng buộc.

## Video minh họa

<VideoTutorial
  title="Hướng dẫn chạy SVAR trong EcoLab"
  src="https://www.youtube.com/user/vietlod"
/>

## Xem thêm

- [VAR](/ecolab/model/var) · [VECM](/ecolab/model/vecm) · [Danh mục](/ecolab/model/group)
