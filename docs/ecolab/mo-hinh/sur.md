---
title: SUR — Hồi quy có vẻ không liên quan
sidebar_position: 3
description: Seemingly Unrelated Regressions (SUR) ước lượng nhiều phương trình có sai số tương quan chéo để tăng hiệu quả, và cách chạy trong EcoLab.
---

# SUR — Seemingly Unrelated Regressions

**SUR (Seemingly Unrelated Regressions)** ước lượng **nhiều phương trình** cùng lúc khi chúng **dường như độc lập** nhưng **sai số tương quan chéo** giữa các phương trình. Bằng cách khai thác tương quan đó (qua [GLS](/ecolab/mo-hinh/gls)), SUR cho ước lượng **hiệu quả hơn** so với chạy OLS từng phương trình riêng lẻ.

:::tip Khi nào dùng
Dùng SUR khi có **nhiều phương trình chia sẻ cú sốc chung** (vd hệ phương trình chi tiêu cho nhiều nhóm hàng, hàm cầu nhiều ngành) — không có nội sinh nhưng sai số liên quan. Nếu có nội sinh ⇒ [3SLS](/ecolab/mo-hinh/3sls).
:::

---

## Đặc tả mô hình

Hệ $m$ phương trình $Y_g = X_g \beta_g + \varepsilon_g$ với $\mathrm{Cov}(\varepsilon_g, \varepsilon_h) \ne 0$. SUR ước lượng bằng **FGLS** dùng ma trận hiệp phương sai sai số chéo $\Sigma$:

$$
\hat{\beta}_{SUR} = \big(X'(\Sigma^{-1} \otimes I)X\big)^{-1} X'(\Sigma^{-1}\otimes I)Y
$$

Khi các phương trình có **cùng tập biến giải thích** hoặc sai số không tương quan, SUR quy về OLS từng phương trình.

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *IV & hệ phương trình* → **SUR**.
2. Khai báo **các phương trình** (mỗi phương trình có $Y_g$ và $X_g$ riêng).
3. Chạy, đọc hệ số toàn hệ + ma trận tương quan sai số; xuất **mã tái lập**.

---

## Hạn chế

- Lợi ích hiệu quả **nhỏ** khi sai số ít tương quan hoặc các phương trình cùng biến giải thích.
- Nhạy với sai đặc tả ở bất kỳ phương trình nào.

## Xem thêm

- [3SLS](/ecolab/mo-hinh/3sls) · [IV/2SLS](/ecolab/mo-hinh/iv-2sls) · [Danh mục](/ecolab/mo-hinh/danh-muc)
