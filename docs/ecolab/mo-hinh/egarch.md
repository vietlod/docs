---
title: EGARCH — GARCH bất đối xứng
sidebar_position: 4
description: Mô hình EGARCH (Exponential GARCH) nắm bắt hiệu ứng đòn bẩy (tin xấu tác động mạnh hơn tin tốt) trong biến động tài chính, và cách chạy trong EcoLab.
---

# EGARCH — Exponential GARCH

**EGARCH (Exponential GARCH)** mở rộng [GARCH](/ecolab/mo-hinh/garch) để nắm bắt **hiệu ứng bất đối xứng / đòn bẩy (leverage effect)** — trên thị trường tài chính, **tin xấu (cú sốc âm)** thường làm tăng biến động **mạnh hơn** tin tốt cùng độ lớn. GARCH chuẩn không phân biệt được dấu cú sốc; EGARCH thì có.

:::tip Khi nào dùng
Dùng EGARCH khi nghi ngờ **biến động phản ứng bất đối xứng** với cú sốc dương/âm (rất phổ biến ở lợi suất cổ phiếu). Mô hình hóa **log phương sai** nên không cần ràng buộc dương.
:::

---

## Đặc tả mô hình

$$
\ln(\sigma_t^2) = \omega + \alpha \left( |z_{t-1}| - E|z_{t-1}| \right) + \gamma \, z_{t-1} + \beta \ln(\sigma_{t-1}^2)
$$

với $z_{t-1} = \varepsilon_{t-1}/\sigma_{t-1}$. Tham số **$\gamma \ne 0$** đo **hiệu ứng đòn bẩy**: $\gamma < 0$ ⇒ cú sốc âm làm tăng biến động nhiều hơn.

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Chuỗi thời gian đơn biến* → **EGARCH**.
2. Chọn chuỗi lợi suất; khai báo bậc và phương trình trung bình.
3. Chạy; kiểm tra dấu/ý nghĩa của $\gamma$ (đòn bẩy); xuất **mã tái lập**.

## Hạn chế

- Diễn giải tham số phức tạp hơn GARCH.
- Nhạy với giả định phân phối; cần mẫu đủ lớn.

## Xem thêm

- [ARCH/GARCH](/ecolab/mo-hinh/garch) · [ARIMA](/ecolab/mo-hinh/arima) · [Danh mục](/ecolab/mo-hinh/danh-muc)
