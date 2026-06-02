---
title: Truncated Regression
sidebar_position: 4
description: Hồi quy cắt cụt (truncated) khi mẫu chỉ chứa quan sát vượt/dưới ngưỡng, khác Tobit, và cách chạy trong EcoLab.
---

# Truncated Regression — Hồi quy cắt cụt

**Truncated Regression** dùng khi mẫu **chỉ chứa các quan sát thỏa một ngưỡng** — các đơn vị ngoài ngưỡng **hoàn toàn không xuất hiện** trong dữ liệu (khác với [Tobit](/ecolab/mo-hinh/tobit), nơi đơn vị tại ngưỡng vẫn được quan sát với giá trị dồn).

:::warning Cắt cụt gây chệch nếu dùng OLS
Khi mẫu bị cắt cụt, phân phối sai số trong mẫu **không còn kỳ vọng 0** ⇒ OLS chệch. Phải dùng ước lượng truncated (MLE) để hiệu chỉnh.
:::

---

## Đặc tả mô hình

Với cắt cụt dưới tại $a$, hàm hợp lý dựa trên phân phối **có điều kiện $Y > a$**:

$$
f(Y_i \mid Y_i > a) = \frac{\phi\!\left(\frac{Y_i - X_i\beta}{\sigma}\right)}{\sigma \, \Phi\!\left(\frac{X_i\beta - a}{\sigma}\right)}
$$

Ước lượng bằng **MLE**.

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Biến phụ thuộc giới hạn* → **Truncated**.
2. Chọn $Y$, các $X$; khai báo **ngưỡng cắt cụt** và chiều (trên/dưới).
3. Chạy, đọc hệ số đã hiệu chỉnh; xuất **mã tái lập**.

---

## Hạn chế

- Cần biết đúng **ngưỡng và cơ chế cắt cụt**.
- Nhạy với giả định phân phối chuẩn của sai số.

## Xem thêm

- [Tobit](/ecolab/mo-hinh/tobit) · [Heckman](/ecolab/mo-hinh/heckman) · [Danh mục](/ecolab/mo-hinh/danh-muc)
