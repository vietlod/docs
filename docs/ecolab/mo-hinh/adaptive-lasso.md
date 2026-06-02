---
title: Adaptive Lasso
sidebar_position: 4
description: Adaptive Lasso dùng trọng số riêng cho từng hệ số để đạt tính chất oracle (chọn biến nhất quán), khác Lasso thường, và cách chạy trong EcoLab.
---

# Adaptive Lasso

**Adaptive Lasso** là cải tiến của [Lasso](/ecolab/mo-hinh/lasso): áp **trọng số riêng** cho phạt L1 của từng hệ số, phạt nhẹ các biến quan trọng và phạt nặng các biến yếu. Nhờ đó Adaptive Lasso đạt **tính chất oracle** — chọn đúng tập biến và ước lượng hệ số nhất quán khi mẫu đủ lớn.

:::tip Khi nào dùng
Dùng Adaptive Lasso khi cần **chọn biến nhất quán** (consistent selection) với nền tảng lý thuyết vững hơn Lasso thường, đặc biệt khi quan tâm **suy diễn** chứ không chỉ dự báo.
:::

---

## Đặc tả mô hình

$$
\min_{\beta} \; \sum_{i=1}^{n} (Y_i - X_i \beta)^2 + \lambda \sum_{j=1}^{p} \hat{w}_j \, |\beta_j|, \qquad \hat{w}_j = \frac{1}{|\hat{\beta}_j^{init}|^{\gamma}}
$$

Trọng số $\hat{w}_j$ tính từ một ước lượng sơ bộ $\hat{\beta}_j^{init}$ (thường OLS hoặc Ridge); biến có hệ số sơ bộ lớn ⇒ trọng số nhỏ ⇒ ít bị phạt.

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Hồi quy chính quy hóa* → **Adaptive Lasso**.
2. Chọn $Y$, các $X$; chọn ước lượng sơ bộ (OLS/Ridge), $\gamma$ và $\lambda$ (CV).
3. Đọc tập biến chọn + hệ số; xuất **mã tái lập**.

---

## Hạn chế

- Phụ thuộc **ước lượng sơ bộ**; nếu sơ bộ kém (vd $p > n$ phải dùng Ridge), kết quả có thể lệch.
- Thêm tham số $\gamma$ cần tinh chỉnh.

## Xem thêm

- [Lasso](/ecolab/mo-hinh/lasso) · [Ridge](/ecolab/mo-hinh/ridge) · [Elastic Net](/ecolab/mo-hinh/elastic-net) · [Danh mục](/ecolab/mo-hinh/danh-muc)
