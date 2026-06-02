---
title: Poisson — Hồi quy biến đếm
sidebar_position: 1
description: Hồi quy Poisson cho biến đếm (số nguyên không âm), giả định mean = variance, kiểm định overdispersion và cách chạy trong EcoLab.
---

# Poisson — Hồi quy biến đếm

**Hồi quy Poisson** mô hình hóa **biến đếm** (số nguyên không âm: số bằng sáng chế, số lần khám bệnh, số vụ tai nạn…). Mô hình dùng hàm liên kết log đảm bảo kỳ vọng luôn dương.

:::tip Khi nào dùng
Dùng Poisson khi $Y$ là **số đếm**. Giả định cốt lõi: **kỳ vọng bằng phương sai** (equidispersion). Nếu phương sai lớn hơn kỳ vọng (**overdispersion**), chuyển sang [Negative Binomial](/ecolab/mo-hinh/negbin).
:::

---

## Đặc tả mô hình

$$
E[Y_i \mid X_i] = \exp(\beta_0 + \beta_1 X_{1i} + \dots + \beta_k X_{ki}), \qquad Y_i \sim \text{Poisson}(\mu_i)
$$

Ước lượng bằng **MLE**. Hệ số diễn giải qua **tỷ số tỷ lệ sự kiện** $e^{\beta_j}$ (incidence rate ratio).

---

## Chẩn đoán

- **Overdispersion**: kiểm tra $\text{Var}(Y) > E[Y]$ (vd kiểm định của Cameron-Trivedi). Nếu có ⇒ SE bị đánh giá thấp ⇒ dùng NegBin hoặc Poisson với **sai số chuẩn robust/QMLE**.
- Dư thừa số 0 (excess zeros) ⇒ [ZIP](/ecolab/mo-hinh/zip).

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Dữ liệu đếm* → **Poisson**.
2. Chọn $Y$ đếm và các $X$; chọn **exposure/offset** nếu cần (vd theo dân số).
3. Chạy, đọc IRR, kiểm tra overdispersion; xuất **mã tái lập**.

---

## Hạn chế

- Giả định equidispersion thường bị vi phạm trong thực tế.
- Excess zeros làm Poisson khớp kém ⇒ dùng mô hình zero-inflated/hurdle.

## Xem thêm

- [Negative Binomial](/ecolab/mo-hinh/negbin) · [ZIP](/ecolab/mo-hinh/zip) · [ZINB](/ecolab/mo-hinh/zinb) · [Danh mục](/ecolab/mo-hinh/danh-muc)
