---
title: VAR — Vector Autoregression
sidebar_position: 1
description: Mô hình VAR (Vector Autoregression) cho hệ nhiều chuỗi thời gian dừng, phản ứng đẩy (IRF), phân rã phương sai, Granger, và cách chạy trong EcoLab.
---

# VAR — Vector Autoregression

**VAR** mô hình hóa **hệ nhiều chuỗi thời gian** trong đó mỗi biến phụ thuộc vào **độ trễ của chính nó và của các biến khác** — không áp đặt quan hệ nhân quả tiên nghiệm. VAR là công cụ chuẩn để phân tích **động học hệ thống**: phản ứng đẩy (IRF), phân rã phương sai (FEVD), kiểm định nhân quả Granger.

:::tip Khi nào dùng
Dùng VAR khi các chuỗi **đều dừng I(0)** (hoặc đã sai phân). Nếu các chuỗi I(1) **đồng liên kết** ⇒ dùng [VECM](/ecolab/mo-hinh/vecm); nếu I(1) không đồng liên kết ⇒ VAR ở sai phân.
:::

---

## Đặc tả mô hình

$$
Y_t = c + A_1 Y_{t-1} + A_2 Y_{t-2} + \dots + A_p Y_{t-p} + \varepsilon_t
$$

với $Y_t$ là vector biến, $A_i$ là ma trận hệ số. Chọn độ trễ $p$ bằng AIC/BIC/HQ.

---

## Phân tích sau ước lượng

- **IRF**: phản ứng của hệ trước một cú sốc.
- **FEVD**: phân rã phương sai dự báo theo nguồn cú sốc.
- **Granger causality**: biến nào giúp dự báo biến nào.

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Chuỗi thời gian đa biến* → **VAR**.
2. Chọn tập biến (cùng tần suất, đã kiểm tra dừng), độ trễ.
3. Chạy; xem IRF/FEVD/Granger; xuất **mã tái lập**.

## Hạn chế

- Nhiều tham số (nhanh chóng bùng nổ theo số biến × độ trễ).
- IRF cấu trúc cần giả định nhận dạng ⇒ xem [SVAR](/ecolab/mo-hinh/svar).

## Xem thêm

- [VECM](/ecolab/mo-hinh/vecm) · [SVAR](/ecolab/mo-hinh/svar) · [Danh mục](/ecolab/mo-hinh/danh-muc)
