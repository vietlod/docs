---
title: 'Ví dụ: Đường cong Engel phi tuyến (GAM)'
sidebar_position: 10
description: Thực hành GAM trên EcoLab — mô hình quan hệ phi tuyến giữa chi tiêu thực phẩm và thu nhập (đường cong Engel) bằng hàm trơn.
---

# Ví dụ: Đường cong Engel phi tuyến (GAM)

Minh họa [GAM](/ecolab/mo-hinh/gam): quan hệ giữa **tỷ trọng chi tiêu thực phẩm** và **thu nhập** (đường cong Engel) thường **phi tuyến** — giảm dần khi thu nhập tăng (định luật Engel). GAM bắt dạng cong này bằng **hàm trơn** mà không cần định trước dạng hàm. Số liệu là **minh họa**.

> Tóm tắt: dùng hàm trơn $f(\text{thu nhập})$ để mô hình hóa đường Engel, so với OLS tuyến tính.

---

## Bước 1 — Ý tưởng
- **Câu hỏi:** tỷ trọng chi tiêu thực phẩm thay đổi phi tuyến thế nào theo thu nhập?

## Bước 2 — Tổng quan tài liệu
Định luật Engel; ước lượng đường cong Engel phi tham số/bán tham số.

## Bước 3 — Thu thập dữ liệu
Dữ liệu hộ gia đình (VHLSS): `food_share` (tỷ trọng chi thực phẩm), `lninc` (log thu nhập/chi tiêu), kiểm soát quy mô hộ, khu vực.

## Bước 4 — Mô hình hóa

Chọn họ *Phi tuyến & bán tham số* → **GAM**; đánh dấu `lninc` dùng hàm trơn:

$$
food\_share_i = \beta_0 + f(lninc_i) + X_i\gamma + \varepsilon_i
$$

**Kết quả minh họa (định dạng — không phải kết quả thực):**

| | OLS tuyến tính | GAM |
| :--- | :--- | :--- |
| Dạng quan hệ | đường thẳng | **đường cong giảm dần** (lõm) |
| $R^2$ điều chỉnh | 0.41 | 0.52 |
| edf của f(lninc) | — | 3.8 (phi tuyến rõ) |

Diễn giải mẫu: đồ thị hàm trơn cho thấy tỷ trọng thực phẩm **giảm nhanh ở thu nhập thấp rồi chững lại** — đúng định luật Engel; GAM khớp tốt hơn OLS tuyến tính (edf > 1 ⇒ phi tuyến).

## Bước 5 — Báo cáo
Xuất báo cáo + **đồ thị hàm trơn** + **mã tái lập**.

## Xem thêm
- [GAM](/ecolab/mo-hinh/gam) · [NLS](/ecolab/mo-hinh/nls) · [Danh mục](/ecolab/mo-hinh/danh-muc)
