---
title: NLS — Hồi quy phi tuyến
sidebar_position: 1
description: Hồi quy phi tuyến (Nonlinear Least Squares) cho quan hệ phi tuyến theo tham số, ví dụ hàm tăng trưởng/sản xuất, và cách chạy trong EcoLab.
---

# NLS — Bình phương nhỏ nhất phi tuyến

**NLS (Nonlinear Least Squares)** ước lượng mô hình **phi tuyến theo tham số** — khi quan hệ không thể tuyến tính hóa, vd hàm tăng trưởng logistic, hàm sản xuất CES, mô hình bão hòa. NLS tối thiểu hóa tổng bình phương phần dư của một hàm phi tuyến $f(X_i, \beta)$.

:::tip Khi nào dùng
Dùng NLS khi lý thuyết quy định **dạng hàm phi tuyến cụ thể** (vd CES, logistic). Nếu chỉ phi tuyến theo biến nhưng tuyến tính theo tham số (vd thêm $X^2$), [OLS](/ecolab/mo-hinh/ols) vẫn dùng được.
:::

---

## Đặc tả mô hình

$$
Y_i = f(X_i, \beta) + \varepsilon_i, \qquad \hat{\beta} = \arg\min_{\beta} \sum_{i} \big(Y_i - f(X_i,\beta)\big)^2
$$

Giải bằng thuật toán lặp (Gauss-Newton, Levenberg-Marquardt); cần **giá trị khởi tạo** hợp lý.

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Phi tuyến & bán tham số* → **NLS**.
2. Khai báo **dạng hàm** $f(X,\beta)$ và **giá trị khởi tạo** tham số.
3. Chạy, kiểm tra hội tụ + hệ số; xuất **mã tái lập**.

---

## Hạn chế

- Nhạy với **giá trị khởi tạo**; có thể hội tụ về **cực tiểu địa phương** hoặc không hội tụ.
- Suy diễn dựa trên xấp xỉ tiệm cận; cần mẫu đủ lớn.

## Xem thêm

- [GAM](/ecolab/mo-hinh/gam) · [OLS](/ecolab/mo-hinh/ols) · [Danh mục](/ecolab/mo-hinh/danh-muc)
