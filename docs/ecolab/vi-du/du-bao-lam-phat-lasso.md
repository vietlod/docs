---
title: 'Ví dụ: Dự báo lạm phát với nhiều biến (Lasso)'
sidebar_position: 8
description: Thực hành Lasso/Elastic Net trên EcoLab — dự báo lạm phát từ rất nhiều biến vĩ mô, chọn biến tự động và tránh overfitting.
---

# Ví dụ: Dự báo lạm phát với nhiều biến (Lasso / Elastic Net)

Minh họa nhóm [chính quy hóa](/ecolab/mo-hinh/lasso): khi có **rất nhiều biến dự báo** vĩ mô (cung tiền, tỷ giá, giá dầu, lãi suất, độ trễ…), [OLS](/ecolab/mo-hinh/ols) dễ **overfitting** và đa cộng tuyến. [Lasso](/ecolab/mo-hinh/lasso)/[Elastic Net](/ecolab/mo-hinh/elastic-net) **tự động chọn biến** và co hệ số. Số liệu là **minh họa**.

> Tóm tắt: dùng Lasso/Elastic Net để chọn tập biến dự báo lạm phát tốt nhất ngoài mẫu (out-of-sample).

---

## Bước 1 — Ý tưởng
- **Câu hỏi:** biến vĩ mô nào thực sự hữu ích để dự báo lạm phát, và mô hình dự báo ngoài mẫu ra sao?

## Bước 2 — Tổng quan tài liệu
Dự báo lạm phát, mô hình nhiều biến (data-rich forecasting), regularization.

## Bước 3 — Thu thập dữ liệu
Chuỗi tháng/quý: `cpi` (lạm phát), và **20–50 biến** ứng viên (`m2`, `er`, `oil`, `rate`, sản lượng, kỳ vọng, độ trễ…) từ [EcoData](/ecodata/overview)/World Bank/FRED.

## Bước 4 — Mô hình hóa

Chọn họ *Hồi quy chính quy hóa* → **Lasso** (hoặc **Elastic Net** khi biến tương quan nhóm); **chuẩn hóa** biến; chọn $\lambda$ bằng cross-validation.

$$
\min_{\beta} \sum_{t} (cpi_t - X_t\beta)^2 + \lambda \sum_j |\beta_j|
$$

**Kết quả minh họa (định dạng — không phải kết quả thực):**

| | OLS (mọi biến) | Lasso |
| :--- | :--- | :--- |
| Số biến khác 0 | 45 | 8 |
| RMSE ngoài mẫu | 1.00 (chuẩn hóa) | 0.78 |
| Biến được giữ | — | m2_lag, oil, er, rate… |

Diễn giải mẫu: Lasso giữ lại **8/45 biến** và **giảm RMSE ngoài mẫu** so với OLS đầy đủ ⇒ mô hình thưa, dự báo tốt hơn, dễ diễn giải.

## Bước 5 — Báo cáo
Xuất báo cáo + đường co theo $\lambda$ + **mã tái lập**.

:::warning Lưu ý
Regularization thiên về **dự báo**, không phải suy diễn nhân quả; hệ số đã bị co. Để suy diễn, kết hợp lý thuyết hoặc [Adaptive Lasso](/ecolab/mo-hinh/adaptive-lasso).
:::

## Xem thêm
- [Lasso](/ecolab/mo-hinh/lasso) · [Elastic Net](/ecolab/mo-hinh/elastic-net) · [Ridge](/ecolab/mo-hinh/ridge) · [Danh mục](/ecolab/mo-hinh/danh-muc)
