---
title: 'Ví dụ: Bất bình đẳng tiền lương (Quantile)'
sidebar_position: 6
description: Thực hành hồi quy phân vị trên EcoLab — lợi suất giáo dục khác nhau ở các phân vị tiền lương (tác động không đồng nhất theo phân phối).
---

# Ví dụ: Bất bình đẳng tiền lương theo phân vị (Quantile)

Minh họa [hồi quy phân vị](/ecolab/mo-hinh/quantile): lợi suất giáo dục **không đồng nhất** giữa nhóm lương thấp và lương cao — điều mà [OLS](/ecolab/mo-hinh/ols) (chỉ trung bình) không cho thấy. Số liệu là **minh họa**.

> Tóm tắt: ước lượng $\beta(\tau)$ của `educ` tại các phân vị $\tau$ = 0.1, 0.25, 0.5, 0.75, 0.9 để xem giáo dục tác động khác nhau ra sao dọc phân phối lương.

---

## Bước 1 — Ý tưởng
- **Câu hỏi:** lợi suất giáo dục ở nhóm lương cao có khác nhóm lương thấp không (hiệu ứng "trần kính"/"sàn")?

## Bước 2 — Tổng quan tài liệu
Tài liệu bất bình đẳng tiền lương, hiệu ứng phân vị của giáo dục.

## Bước 3 — Thu thập dữ liệu
Dữ liệu vi mô lao động (`lnwage`, `educ`, `exper`, kiểm soát) — như [ví dụ Mincer](/ecolab/vi-du/luong-giao-duc-ols).

## Bước 4 — Mô hình hóa

Chọn họ *Hồi quy phân vị* → **Quantile**, danh sách $\tau$:

$$
Q_{\tau}(\ln wage_i \mid X_i) = \beta_0(\tau) + \beta_1(\tau)\,educ_i + \dots
$$

**Kết quả minh họa — hệ số `educ` theo phân vị (không phải kết quả thực):**

| Phân vị $\tau$ | $\hat{\beta}_1(\tau)$ (educ) |
| :--- | :--- |
| 0.10 | 0.061 |
| 0.50 | 0.080 |
| 0.90 | 0.103 |

Diễn giải mẫu: lợi suất giáo dục **tăng dần theo phân vị** (0.061 → 0.103) ⇒ giáo dục làm **giãn** bất bình đẳng lương (tác động lớn hơn ở nhóm lương cao). OLS chỉ cho một con số trung bình (~0.08), che giấu sự khác biệt này.

## Bước 5 — Báo cáo
Xuất báo cáo + đồ thị **quantile process** + **mã tái lập**; SE bằng bootstrap.

## Xem thêm
- [Hồi quy phân vị](/ecolab/mo-hinh/quantile) · [Panel FE-QR](/ecolab/mo-hinh/panel-quantile) · [Ví dụ Mincer (OLS)](/ecolab/vi-du/luong-giao-duc-ols)
