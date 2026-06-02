---
title: GLS / FGLS — Bình phương nhỏ nhất tổng quát
sidebar_position: 3
description: Hồi quy GLS và FGLS (Feasible GLS) xử lý phương sai sai số thay đổi và tự tương quan qua ma trận hiệp phương sai, và cách chạy trong EcoLab.
---

# GLS / FGLS — Bình phương nhỏ nhất tổng quát

**GLS (Generalized Least Squares)** tổng quát hóa [OLS](/ecolab/mo-hinh/ols) để xử lý **phương sai sai số thay đổi** và/hoặc **tự tương quan** thông qua ma trận hiệp phương sai sai số $\Omega$. Khi $\Omega$ chưa biết và phải ước lượng từ dữ liệu, ta dùng **FGLS (Feasible GLS)**.

:::tip Khi nào dùng
Dùng GLS/FGLS khi sai số có **cấu trúc tương quan/phương sai phức tạp** (vd tự tương quan AR(1), nhóm). [WLS](/ecolab/mo-hinh/wls) là trường hợp đặc biệt của GLS khi $\Omega$ chéo.
:::

---

## Đặc tả mô hình

GLS ước lượng:

$$
\hat{\beta}_{GLS} = (X' \Omega^{-1} X)^{-1} X' \Omega^{-1} Y
$$

trong đó $\Omega = \mathrm{Var}(\varepsilon \mid X)$ là ma trận hiệp phương sai sai số. Nếu $\Omega = \sigma^2 I$ thì GLS trùng OLS.

---

## GLS vs FGLS

| | GLS | FGLS |
| :--- | :--- | :--- |
| $\Omega$ | Biết trước | Ước lượng từ dữ liệu |
| Tính chất | Hiệu quả (nếu $\Omega$ đúng) | Tiệm cận hiệu quả (mẫu lớn) |
| Thực tế | Hiếm khi biết $\Omega$ | Phổ biến hơn |

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Hồi quy tuyến tính cổ điển* → **GLS** hoặc **FGLS**.
2. Chọn $Y$, các $X$, và cấu trúc hiệp phương sai (vd AR(1), nhóm).
3. Chạy và đọc thẻ **Ước lượng**, **Chẩn đoán**; xuất **mã tái lập**.

---

## Hạn chế

- FGLS có thể **chệch ở mẫu nhỏ** nếu $\Omega$ ước lượng kém.
- Nếu chỉ cần suy diễn vững, OLS + sai số chuẩn **robust/clustered** thường đơn giản và an toàn hơn.

## Xem thêm

- [OLS](/ecolab/mo-hinh/ols) · [WLS](/ecolab/mo-hinh/wls) · [Danh mục mô hình](/ecolab/mo-hinh/danh-muc)
