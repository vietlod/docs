---
title: Ridge — Hồi quy co L2
sidebar_position: 1
description: Hồi quy Ridge (chính quy hóa L2) xử lý đa cộng tuyến và overfitting, công thức phạt L2, chọn lambda, và cách chạy trong EcoLab.
---

# Ridge — Hồi quy chính quy hóa L2

**Ridge** thêm một **lượng phạt L2** vào hàm mục tiêu OLS để **co (shrink)** các hệ số về gần 0, giúp ổn định ước lượng khi có **đa cộng tuyến** hoặc **nhiều biến giải thích** (p lớn). Ridge không đưa hệ số về đúng 0 (không chọn biến) nhưng giảm phương sai ước lượng đáng kể.

:::tip Khi nào dùng
Dùng Ridge khi các biến giải thích **tương quan cao** (đa cộng tuyến) khiến [OLS](/ecolab/mo-hinh/ols) bất ổn (hệ số phình to, đổi dấu). Nếu cần **chọn biến**, dùng [Lasso](/ecolab/mo-hinh/lasso).
:::

---

## Đặc tả mô hình

Ridge tối thiểu hóa tổng bình phương phần dư cộng **phạt L2**:

$$
\min_{\beta} \; \sum_{i=1}^{n} (Y_i - X_i \beta)^2 + \lambda \sum_{j=1}^{p} \beta_j^2
$$

$\lambda \ge 0$ là **tham số điều chuẩn (regularization)**: $\lambda = 0$ ⇒ OLS; $\lambda$ càng lớn ⇒ co càng mạnh.

---

## Chọn lambda & lưu ý

- Chọn $\lambda$ bằng **cross-validation** (CV).
- **Chuẩn hóa (standardize)** biến trước khi chạy vì phạt nhạy với thang đo.
- Ridge **giảm phương sai** nhưng **tăng độ chệch** (bias-variance tradeoff).

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Hồi quy chính quy hóa* → **Ridge**.
2. Chọn $Y$, các $X$; bật **chuẩn hóa**; chọn $\lambda$ (hoặc CV tự động).
3. Chạy và đọc hệ số đã co, đường co theo $\lambda$; xuất **mã tái lập**.

---

## Hạn chế

- Không **chọn biến** (mọi hệ số khác 0).
- Diễn giải hệ số khó hơn OLS do đã bị co; thường dùng cho **dự báo** hơn là suy diễn nhân quả.

## Xem thêm

- [Lasso](/ecolab/mo-hinh/lasso) · [Elastic Net](/ecolab/mo-hinh/elastic-net) · [OLS](/ecolab/mo-hinh/ols) · [Danh mục](/ecolab/mo-hinh/danh-muc)
