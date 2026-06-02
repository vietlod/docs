---
title: Lasso — Hồi quy co L1
sidebar_position: 2
description: Hồi quy Lasso (chính quy hóa L1) vừa co hệ số vừa chọn biến tự động, công thức phạt L1, và cách chạy trong EcoLab.
---

# Lasso — Hồi quy chính quy hóa L1

**Lasso (Least Absolute Shrinkage and Selection Operator)** thêm **phạt L1** vào OLS. Khác [Ridge](/ecolab/mo-hinh/ridge), Lasso có thể đưa một số hệ số về **đúng bằng 0** — tức **tự động chọn biến (variable selection)**, cho mô hình thưa (sparse) dễ diễn giải.

:::tip Khi nào dùng
Dùng Lasso khi có **nhiều biến giải thích** và muốn **chọn ra tập biến quan trọng**. Khi nhóm biến tương quan cao, cân nhắc [Elastic Net](/ecolab/mo-hinh/elastic-net).
:::

---

## Đặc tả mô hình

$$
\min_{\beta} \; \sum_{i=1}^{n} (Y_i - X_i \beta)^2 + \lambda \sum_{j=1}^{p} |\beta_j|
$$

Phạt L1 ($\sum |\beta_j|$) tạo nghiệm **góc cạnh** ⇒ nhiều $\beta_j = 0$. $\lambda$ điều khiển mức độ thưa.

---

## Lưu ý

- Chọn $\lambda$ bằng **cross-validation**; **chuẩn hóa** biến trước.
- Khi nhiều biến **tương quan cao**, Lasso có xu hướng chọn 1 và loại phần còn lại (không ổn định) ⇒ Elastic Net khắc phục.
- Suy diễn sau chọn biến (post-selection inference) cần thận trọng.

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Hồi quy chính quy hóa* → **Lasso**.
2. Chọn $Y$, các $X$; bật **chuẩn hóa**; chọn $\lambda$ (CV).
3. Đọc tập biến được giữ (hệ số khác 0) và đường co; xuất **mã tái lập**.

---

## Hạn chế

- Không ổn định khi biến tương quan cao.
- Bị giới hạn số biến chọn được khi $p > n$ (chọn tối đa $n$ biến).

## Xem thêm

- [Ridge](/ecolab/mo-hinh/ridge) · [Elastic Net](/ecolab/mo-hinh/elastic-net) · [Adaptive Lasso](/ecolab/mo-hinh/adaptive-lasso) · [Danh mục](/ecolab/mo-hinh/danh-muc)
