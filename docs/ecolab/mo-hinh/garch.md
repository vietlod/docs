---
title: ARCH / GARCH — Mô hình độ biến động
sidebar_position: 3
description: Mô hình ARCH/GARCH mô hình hóa phương sai có điều kiện thay đổi theo thời gian (volatility clustering) cho chuỗi tài chính, và cách chạy trong EcoLab.
---

# ARCH / GARCH — Mô hình độ biến động

**ARCH/GARCH** mô hình hóa **phương sai có điều kiện thay đổi theo thời gian** — hiện tượng **volatility clustering** (giai đoạn biến động mạnh nối tiếp biến động mạnh) rất phổ biến ở **chuỗi tài chính** (lợi suất cổ phiếu, tỷ giá). Thay vì giả định phương sai sai số không đổi, chúng cho phép phương sai phụ thuộc quá khứ.

:::tip Khi nào dùng
Dùng khi chuỗi (thường là **lợi suất**) có **biến động theo cụm** và muốn mô hình hóa/dự báo **rủi ro (volatility)**. Thường kết hợp: trung bình theo [ARIMA](/ecolab/mo-hinh/arima) + phương sai theo GARCH.
:::

---

## Đặc tả mô hình

GARCH(1,1) cho phương sai có điều kiện $\sigma_t^2$:

$$
\sigma_t^2 = \omega + \alpha \, \varepsilon_{t-1}^2 + \beta \, \sigma_{t-1}^2
$$

- $\alpha$ (ARCH): phản ứng với cú sốc gần nhất; $\beta$ (GARCH): tính dai dẳng của biến động.
- **ARCH(q)** là trường hợp $\beta = 0$. Điều kiện dừng: $\alpha + \beta < 1$.

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Chuỗi thời gian đơn biến* → **ARCH/GARCH**.
2. Chọn chuỗi (lợi suất); khai báo bậc $(p,q)$ và phương trình trung bình (vd ARMA).
3. Chạy; xem $\hat{\sigma}_t$ ước lượng + dự báo biến động; xuất **mã tái lập**.

## Hạn chế

- GARCH chuẩn **đối xứng** (tin tốt/xấu tác động như nhau) ⇒ dùng [EGARCH](/ecolab/mo-hinh/egarch) cho hiệu ứng đòn bẩy.
- Nhạy với phân phối sai số (chuẩn vs t-Student).

## Xem thêm

- [EGARCH](/ecolab/mo-hinh/egarch) · [ARIMA](/ecolab/mo-hinh/arima) · [Danh mục](/ecolab/mo-hinh/danh-muc)
