---
title: Pooled OLS
sidebar_position: 1
description: Pooled OLS gộp toàn bộ dữ liệu bảng và chạy OLS, là mô hình cơ sở cho dữ liệu bảng, khi nào phù hợp và cách chạy trong EcoLab.
---

# Pooled OLS — Hồi quy gộp dữ liệu bảng

**Pooled OLS** gộp toàn bộ quan sát của [dữ liệu bảng](/ecolab/mo-hinh/fem-rem) (N đơn vị × T kỳ) thành một mẫu duy nhất rồi chạy [OLS](/ecolab/mo-hinh/ols) như dữ liệu chéo, **bỏ qua cấu trúc bảng**. Đây là mô hình **cơ sở (baseline)** để so sánh với FE/RE.

:::warning Giả định mạnh
Pooled OLS giả định **không có hiệu ứng cá thể** ($\alpha_i$ giống nhau mọi đơn vị). Nếu tồn tại đặc điểm riêng không quan sát được tương quan với $X$, Pooled OLS **chệch** ⇒ dùng [FE](/ecolab/mo-hinh/fem-rem). Sai số trong cùng đơn vị thường tương quan ⇒ cần **sai số chuẩn cụm (clustered)**.
:::

---

## Đặc tả mô hình

$$
Y_{it} = \beta_0 + X_{it}\beta + \varepsilon_{it}
$$

Giống OLS nhưng dùng toàn bộ $N \times T$ quan sát. Nên dùng **clustered SE theo đơn vị**.

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Dữ liệu bảng tuyến tính* → **Pooled OLS**.
2. Khai báo entity/time, $Y$, $X$; chọn **clustered SE**.
3. Chạy; so sánh với FE/RE qua kiểm định; xuất **mã tái lập**.

## Xem thêm

- [FEM/REM](/ecolab/mo-hinh/fem-rem) · [Between](/ecolab/mo-hinh/between) · [Danh mục](/ecolab/mo-hinh/danh-muc)
