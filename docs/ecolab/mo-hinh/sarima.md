---
title: SARIMA — ARIMA mùa vụ
sidebar_position: 2
description: Mô hình SARIMA (Seasonal ARIMA) mở rộng ARIMA cho chuỗi có yếu tố mùa vụ, ký hiệu (p,d,q)(P,D,Q)s, và cách chạy trong EcoLab.
---

# SARIMA — Seasonal ARIMA

**SARIMA** mở rộng [ARIMA](/ecolab/mo-hinh/arima) để xử lý **yếu tố mùa vụ (seasonality)** — mẫu hình lặp lại theo chu kỳ cố định (tháng, quý). SARIMA thêm các thành phần AR/MA/sai phân **theo mùa** bên cạnh thành phần thường.

:::tip Khi nào dùng
Dùng SARIMA khi chuỗi có **chu kỳ mùa vụ rõ** (vd doanh số bán lẻ theo tháng, du lịch theo quý). ACF có đỉnh tại các độ trễ mùa vụ là dấu hiệu cần SARIMA.
:::

---

## Ký hiệu mô hình

$$
\text{SARIMA}(p,d,q)(P,D,Q)_s
$$

- $(p,d,q)$: phần **không mùa vụ** (như ARIMA).
- $(P,D,Q)$: phần **mùa vụ** với chu kỳ $s$ (vd $s=12$ cho dữ liệu tháng, $s=4$ cho quý).

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Chuỗi thời gian đơn biến* → **SARIMA**.
2. Chọn $Y$; khai báo $(p,d,q)(P,D,Q)_s$ và chu kỳ mùa $s$ (hoặc auto).
3. Chạy; xem dự báo có tính mùa vụ + chẩn đoán; xuất **mã tái lập**.

## Hạn chế

- Nhiều tham số ⇒ cần chuỗi đủ dài qua nhiều chu kỳ mùa.
- Giả định mẫu mùa vụ **ổn định** theo thời gian.

## Xem thêm

- [ARIMA](/ecolab/mo-hinh/arima) · [GARCH](/ecolab/mo-hinh/garch) · [Danh mục](/ecolab/mo-hinh/danh-muc)
