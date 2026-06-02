---
title: Negative Binomial
sidebar_position: 2
description: Hồi quy nhị thức âm (Negative Binomial) cho biến đếm có overdispersion (phương sai > kỳ vọng), khác Poisson, và cách chạy trong EcoLab.
---

# Negative Binomial — Hồi quy nhị thức âm

**Negative Binomial (NegBin)** là mô hình biến đếm xử lý **overdispersion** — khi **phương sai lớn hơn kỳ vọng**, tình huống rất phổ biến mà [Poisson](/ecolab/mo-hinh/poisson) không mô tả đúng. NegBin thêm một tham số phân tán $\alpha$ để nới lỏng ràng buộc equidispersion.

:::tip Khi nào dùng
Dùng NegBin khi $Y$ là **số đếm có overdispersion** ($\text{Var}(Y) > E[Y]$). Nếu $\alpha \to 0$, NegBin quy về Poisson.
:::

---

## Đặc tả mô hình

$$
E[Y_i \mid X_i] = \mu_i = \exp(X_i \beta), \qquad \text{Var}(Y_i) = \mu_i + \alpha \, \mu_i^2
$$

Tham số $\alpha > 0$ đo mức **overdispersion**. Ước lượng bằng **MLE**.

---

## Chẩn đoán

- Kiểm định $H_0: \alpha = 0$ (NegBin vs Poisson): bác bỏ ⇒ NegBin phù hợp hơn.
- Nếu vẫn dư thừa số 0 ⇒ [ZINB](/ecolab/mo-hinh/zinb).

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Dữ liệu đếm* → **Negative Binomial**.
2. Chọn $Y$ đếm, các $X$, offset nếu cần.
3. Chạy, đọc IRR và $\alpha$; so sánh AIC/BIC với Poisson; xuất **mã tái lập**.

---

## Hạn chế

- Vẫn kém khi có **excess zeros** từ một cơ chế riêng ⇒ dùng zero-inflated.
- Cần mẫu đủ lớn để ước lượng $\alpha$ ổn định.

## Xem thêm

- [Poisson](/ecolab/mo-hinh/poisson) · [ZIP](/ecolab/mo-hinh/zip) · [ZINB](/ecolab/mo-hinh/zinb) · [Danh mục](/ecolab/mo-hinh/danh-muc)
