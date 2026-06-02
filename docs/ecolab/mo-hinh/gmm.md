---
title: GMM cho dữ liệu bảng động
sidebar_position: 3
description: GMM hệ thống (System GMM) và sai phân (Difference GMM) của Arellano-Bond/Blundell-Bond cho dữ liệu bảng động, khi nào dùng, kiểm định AR(2) và Hansen/Sargan, cách chạy trong EcoLab.
---

# GMM cho dữ liệu bảng động (Dynamic Panel GMM)

**GMM (Generalized Method of Moments)** cho dữ liệu bảng động xử lý trường hợp **biến phụ thuộc trễ** xuất hiện ở vế phải (`Y_{t-1}`) và/hoặc có **biến nội sinh**. Khi đó FEM/REM bị chệch (chệch Nickell với T nhỏ); GMM dùng các **biến công cụ nội tại** (độ trễ của chính các biến) để ước lượng nhất quán. Hai biến thể phổ biến: **Difference GMM** (Arellano–Bond, 1991) và **System GMM** (Arellano–Bover/Blundell–Bond, 1998).

Trong EcoLab, GMM thuộc nhóm **Dữ liệu bảng** và sinh mã tái lập Stata/R/Python. Xem [FEM và REM](/ecolab/mo-hinh/fem-rem) và [Ước lượng & Mô hình hóa](/ecolab/econometrics-modeling).

---

## Khi nào nên dùng GMM động?

- Mô hình **động**: có `Y_{t-1}` (hoặc nhiều độ trễ) trong các biến giải thích.
- Bảng **N lớn, T nhỏ** (nhiều đơn vị, ít thời kỳ) — đặc trưng dữ liệu doanh nghiệp/quốc gia.
- Có **biến nội sinh** tương quan với sai số, nhưng thiếu biến công cụ ngoài.
- Cần kiểm soát hiệu ứng cá thể không quan sát được trong bối cảnh động.

**System GMM** ưu tiên khi chuỗi gần "đi bộ ngẫu nhiên" (persistent) — lúc đó độ trễ là công cụ yếu cho Difference GMM.

---

## Đặc tả mô hình

```
Y_it = α·Y_{i,t-1} + β·X_it + μ_i + ε_it
```

- `Y_{i,t-1}`: biến phụ thuộc trễ (nguồn gốc tính động và nội sinh với `μ_i`).
- Difference GMM: lấy sai phân bậc nhất để khử `μ_i`, dùng độ trễ mức (levels) làm công cụ.
- System GMM: kết hợp phương trình sai phân và phương trình mức, dùng thêm độ trễ sai phân làm công cụ cho phương trình mức.

---

## Giả định và kiểm định bắt buộc

1. **AR(2) — Arellano–Bond:** kiểm định tự tương quan bậc 2 của phần dư sai phân; **không được bác bỏ H0** (p > 0.05) thì công cụ mới hợp lệ.
2. **Hansen/Sargan:** kiểm định tính hợp lệ của tập biến công cụ (overidentifying restrictions); p-value quá cao (≈1.00) là dấu hiệu **quá nhiều công cụ (instrument proliferation)**.
3. **Số công cụ ≤ số nhóm (N):** giữ số công cụ nhỏ (collapse/limit lags) để tránh làm yếu Hansen.
4. Phân biệt biến **ngoại sinh / tiền định (predetermined) / nội sinh** khi khai báo.

---

## Thực hiện trong EcoLab

1. Module **Thu thập dữ liệu**: chuẩn bị bảng động (cột entity + time), đảm bảo đủ độ trễ.
2. Module **Mô hình hóa** → nhóm *Panel Data* → *GMM (Arellano–Bond / Blundell–Bond)*.
3. Khai báo `Y`, biến trễ, phân loại biến (ngoại sinh/tiền định/nội sinh), chọn Difference hoặc System GMM.
4. Chạy và đọc thẻ **Chẩn đoán**: AR(1)/AR(2), Hansen, số công cụ. Lấy mã ở thẻ **Mã tái lập**.

---

## Ví dụ đầu vào / đầu ra

**Đầu vào (minh họa):** bảng 30 quốc gia × 15 năm; `growth` phụ thuộc; `growth_lag`, `invest`, `open` giải thích.

**Đầu ra (định dạng, số liệu minh họa — không phải kết quả thực):**

| | Hệ số | p-value |
| :--- | :--- | :--- |
| growth_lag | 0.34*** | 0.000 |
| invest | 0.21** | 0.018 |
| AR(2) p-value | 0.41 | (không bác bỏ — hợp lệ) |
| Hansen p-value | 0.28 | (công cụ hợp lệ) |
| Số công cụ / số nhóm | 18 / 30 | (an toàn) |

---

## Hạn chế và lưu ý

- **Instrument proliferation** làm Hansen mất hiệu lực; luôn báo cáo số công cụ và dùng collapse/giới hạn độ trễ.
- Difference GMM yếu với chuỗi rất bền (persistent) → cân nhắc System GMM.
- Cần N đủ lớn; với N nhỏ, sai số chuẩn kém tin cậy (dùng hiệu chỉnh Windmeijer).
- Không phù hợp khi T lớn (cân nhắc ước lượng bảng động khác).

---

## Xem thêm

- [FEM và REM](/ecolab/mo-hinh/fem-rem) · [Mô hình ARDL](/ecolab/mo-hinh/ardl)
- [Ví dụ: Nợ công và tăng trưởng (dữ liệu bảng)](/ecolab/vi-du/no-cong-tang-truong-panel)
- [Ước lượng & Mô hình hóa Kinh tế lượng](/ecolab/econometrics-modeling)
