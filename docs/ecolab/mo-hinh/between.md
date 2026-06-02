---
title: Between Estimator
sidebar_position: 3
description: Ước lượng Between dùng trung bình theo đơn vị để khai thác biến thiên giữa các đơn vị (cross-unit), khác FE/RE, và cách chạy trong EcoLab.
---

# Between Estimator — Ước lượng giữa các đơn vị

**Between Estimator** chạy hồi quy trên **trung bình theo đơn vị** của các biến — khai thác **biến thiên giữa các đơn vị (between variation)** thay vì biến thiên theo thời gian (within) như [Fixed Effects](/ecolab/mo-hinh/fem-rem). Nó trả lời câu hỏi "đơn vị có $X$ trung bình cao hơn thì $Y$ trung bình ra sao".

:::tip Khi nào dùng
Dùng Between khi quan tâm **khác biệt dài hạn giữa các đơn vị** (vd so sánh các quốc gia/doanh nghiệp theo mức trung bình). RE thực chất là **trung bình có trọng số** của Between và Within.
:::

---

## Đặc tả mô hình

$$
\bar{Y}_i = \beta_0 + \bar{X}_i \beta + \bar{\varepsilon}_i, \qquad \bar{Y}_i = \frac{1}{T}\sum_t Y_{it}
$$

Ước lượng OLS trên dữ liệu đã lấy trung bình theo đơn vị.

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Dữ liệu bảng tuyến tính* → **Between**.
2. Khai báo entity/time, $Y$, $X$.
3. Chạy; đối chiếu với FE (within) để phân tích nguồn biến thiên; xuất **mã tái lập**.

## Hạn chế

- **Bỏ qua biến thiên theo thời gian**; không kiểm soát hiệu ứng cá thể như FE.
- Mất thông tin động.

## Xem thêm

- [FEM/REM](/ecolab/mo-hinh/fem-rem) · [Pooled OLS](/ecolab/mo-hinh/pooled-ols) · [Danh mục](/ecolab/mo-hinh/danh-muc)
