---
title: ZINB — Zero-Inflated Negative Binomial
sidebar_position: 4
description: Mô hình Zero-Inflated Negative Binomial (ZINB) cho biến đếm vừa dư thừa số 0 vừa overdispersion, và cách chạy trong EcoLab.
---

# ZINB — Zero-Inflated Negative Binomial

**ZINB** kết hợp ý tưởng **zero-inflation** ([ZIP](/ecolab/mo-hinh/zip)) với **Negative Binomial** ([NegBin](/ecolab/mo-hinh/negbin)) — phù hợp khi biến đếm **vừa có dư thừa số 0 vừa có overdispersion**. Đây là mô hình linh hoạt nhất trong nhóm biến đếm khi cả hai vấn đề cùng xuất hiện.

:::tip Khi nào dùng
Dùng ZINB khi có **excess zeros** VÀ phần đếm **phương sai > kỳ vọng**. Nếu chỉ overdispersion (không dư zero) ⇒ NegBin; chỉ dư zero (không overdispersion) ⇒ ZIP.
:::

---

## Đặc tả

Giống ZIP nhưng phần đếm theo **Negative Binomial** (có tham số phân tán $\alpha$):

$$
P(Y_i = 0) = \pi_i + (1-\pi_i)\,(1+\alpha\mu_i)^{-1/\alpha}
$$

với $\pi_i$ là phần "luôn 0" (logit/probit), phần đếm NegBin có $\mu_i = \exp(X_i\beta)$.

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Dữ liệu đếm* → **ZINB**.
2. Khai báo biến **phần đếm** và **phần inflation**.
3. Chạy; so sánh AIC/BIC/Vuong với ZIP & NegBin để chọn mô hình; xuất **mã tái lập**.

---

## Hạn chế

- Nhiều tham số ⇒ cần mẫu lớn; rủi ro **quá khớp**.
- Diễn giải phức tạp; chọn mô hình nên dựa trên lý thuyết + tiêu chuẩn thông tin.

## Xem thêm

- [ZIP](/ecolab/mo-hinh/zip) · [Negative Binomial](/ecolab/mo-hinh/negbin) · [Poisson](/ecolab/mo-hinh/poisson) · [Danh mục](/ecolab/mo-hinh/danh-muc)
