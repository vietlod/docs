---
title: Hồi quy phân vị (Quantile)
sidebar_position: 1
description: Hồi quy phân vị (Quantile Regression) ước lượng tác động tại các phân vị khác nhau của phân phối biến phụ thuộc, khác hồi quy trung bình OLS, và cách chạy trong EcoLab.
---

# Hồi quy phân vị (Quantile Regression)

**Hồi quy phân vị** ước lượng tác động của biến giải thích lên **các phân vị (quantile)** khác nhau của phân phối $Y$ — không chỉ trung bình như [OLS](/ecolab/mo-hinh/ols). Nó cho thấy biến $X$ ảnh hưởng khác nhau ở nhóm "thấp", "trung vị" và "cao" (vd tác động lên người thu nhập thấp khác người thu nhập cao).

:::tip Khi nào dùng
Dùng Quantile Regression khi quan tâm **tác động không đồng nhất theo phân phối** (heterogeneous effects), hoặc khi phân phối $Y$ **lệch/nhiều outlier** khiến trung bình OLS kém đại diện. Hồi quy trung vị ($\tau=0.5$) **vững với outlier** hơn OLS.
:::

---

## Đặc tả mô hình

Phân vị $\tau \in (0,1)$ của $Y$ điều kiện theo $X$:

$$
Q_{\tau}(Y_i \mid X_i) = X_i \beta(\tau)
$$

Ước lượng bằng cách tối thiểu hóa **tổng sai số tuyệt đối có trọng số bất đối xứng** (check function $\rho_\tau$):

$$
\hat{\beta}(\tau) = \arg\min_{\beta} \sum_{i} \rho_{\tau}\big(Y_i - X_i\beta\big), \quad \rho_\tau(u) = u\,(\tau - \mathbb{1}[u<0])
$$

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Hồi quy phân vị* → **Quantile**.
2. Chọn $Y$, các $X$, và **danh sách phân vị** $\tau$ (vd 0.1, 0.25, 0.5, 0.75, 0.9).
3. Chạy, đọc hệ số $\beta(\tau)$ theo từng phân vị + đồ thị quantile process; **bootstrap SE**; xuất **mã tái lập**.

---

## Hạn chế

- SE thường cần **bootstrap**; tốn tính toán hơn OLS.
- Diễn giải nhiều phân vị phức tạp hơn một hệ số trung bình.

## Xem thêm

- [Panel Quantile (FE-QR)](/ecolab/mo-hinh/panel-quantile) · [OLS](/ecolab/mo-hinh/ols) · [Danh mục](/ecolab/mo-hinh/danh-muc)
