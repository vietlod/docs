---
title: Elastic Net — Kết hợp L1 + L2
sidebar_position: 3
description: Elastic Net kết hợp phạt L1 (Lasso) và L2 (Ridge) để vừa chọn biến vừa xử lý nhóm biến tương quan cao, và cách chạy trong EcoLab.
---

# Elastic Net — Chính quy hóa L1 + L2

**Elastic Net** kết hợp **phạt L1** ([Lasso](/ecolab/mo-hinh/lasso)) và **phạt L2** ([Ridge](/ecolab/mo-hinh/ridge)). Nó vừa **chọn biến** (như Lasso) vừa xử lý tốt **nhóm biến tương quan cao** (như Ridge) — khắc phục nhược điểm không ổn định của Lasso khi các biến tương quan.

:::tip Khi nào dùng
Dùng Elastic Net khi có **nhiều biến** và tồn tại **nhóm biến tương quan cao** mà bạn muốn giữ/loại theo nhóm thay vì chọn ngẫu nhiên một biến.
:::

---

## Đặc tả mô hình

$$
\min_{\beta} \; \sum_{i=1}^{n} (Y_i - X_i \beta)^2 + \lambda \left[ \alpha \sum_{j} |\beta_j| + (1-\alpha) \sum_{j} \beta_j^2 \right]
$$

- $\alpha \in [0,1]$ là **tỉ lệ trộn**: $\alpha = 1$ ⇒ Lasso; $\alpha = 0$ ⇒ Ridge.
- $\lambda$ điều khiển tổng mức phạt.

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Hồi quy chính quy hóa* → **Elastic Net**.
2. Chọn $Y$, các $X$; **chuẩn hóa**; chọn $\alpha$ và $\lambda$ (CV trên lưới 2 chiều).
3. Đọc tập biến giữ lại + hệ số; xuất **mã tái lập**.

---

## Hạn chế

- Có **2 tham số** ($\alpha$, $\lambda$) cần tinh chỉnh ⇒ CV tốn hơn.
- Vẫn là phương pháp **thiên về dự báo**; diễn giải nhân quả cần thận trọng.

## Xem thêm

- [Ridge](/ecolab/mo-hinh/ridge) · [Lasso](/ecolab/mo-hinh/lasso) · [Adaptive Lasso](/ecolab/mo-hinh/adaptive-lasso) · [Danh mục](/ecolab/mo-hinh/danh-muc)
