---
title: Panel Quantile (FE-QR)
sidebar_position: 2
description: Hồi quy phân vị cho dữ liệu bảng có hiệu ứng cố định (FE-QR), kết hợp quantile regression với panel, và cách chạy trong EcoLab.
---

# Panel Quantile Regression (FE-QR)

**Panel Quantile (FE-QR)** mở rộng [hồi quy phân vị](/ecolab/mo-hinh/quantile) cho **dữ liệu bảng** có **hiệu ứng cố định** theo đơn vị. Nó ước lượng tác động ở các phân vị khác nhau **đồng thời kiểm soát đặc điểm không quan sát được** của từng đơn vị — kết hợp ưu điểm của [FE](/ecolab/mo-hinh/fem-rem) và quantile regression.

:::tip Khi nào dùng
Dùng khi có **dữ liệu bảng** và muốn xem **tác động không đồng nhất theo phân vị** trong khi vẫn khử hiệu ứng cá thể (vd tác động chính sách lên doanh nghiệp ở các mức năng suất khác nhau).
:::

---

## Đặc tả mô hình

$$
Q_{\tau}(Y_{it} \mid X_{it}, \alpha_i) = X_{it} \beta(\tau) + \alpha_i
$$

với $\alpha_i$ là hiệu ứng cố định đơn vị. Các phương pháp phổ biến: Koenker (penalized FE-QR), Canay (two-step), Machado–Santos Silva (MM-QR).

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Hồi quy phân vị* → **Panel Quantile**.
2. Khai báo **entity/time**, $Y$, $X$, và danh sách phân vị $\tau$.
3. Chạy, đọc $\beta(\tau)$ theo phân vị; bootstrap SE; xuất **mã tái lập**.

---

## Hạn chế

- Ước lượng FE-QR **không duy nhất** (nhiều cách tiếp cận, kết quả có thể khác).
- Cần $T$ đủ lớn cho một số phương pháp; tính toán nặng.

## Xem thêm

- [Hồi quy phân vị](/ecolab/mo-hinh/quantile) · [FEM/REM](/ecolab/mo-hinh/fem-rem) · [Danh mục](/ecolab/mo-hinh/danh-muc)
