---
title: 'Ví dụ: Lợi suất giáo dục với biến công cụ (IV)'
sidebar_position: 7
description: Thực hành IV/2SLS trên EcoLab — xử lý nội sinh của học vấn khi ước lượng lợi suất giáo dục, dùng biến công cụ và kiểm định công cụ.
---

# Ví dụ: Lợi suất giáo dục với biến công cụ (IV/2SLS)

Tiếp nối [ví dụ Mincer OLS](/ecolab/vi-du/luong-giao-duc-ols): vì `educ` có thể **nội sinh** (năng lực bẩm sinh không quan sát), ta dùng [IV/2SLS](/ecolab/mo-hinh/iv-2sls) để ước lượng nhất quán. Số liệu là **minh họa**.

> Tóm tắt: dùng một **biến công cụ** cho học vấn (vd khoảng cách tới trường, cải cách giáo dục, học phí vùng) để tách phần ngoại sinh và ước lượng lợi suất giáo dục không chệch.

---

## Bước 1 — Ý tưởng
- **Câu hỏi:** lợi suất giáo dục thực sự là bao nhiêu sau khi khử nội sinh?

## Bước 2 — Tổng quan tài liệu
Tài liệu returns to schooling dùng IV (Card 1995; Angrist–Krueger 1991 — quý sinh); thảo luận tính hợp lệ của công cụ.

## Bước 3 — Thu thập dữ liệu

| Vai trò | Biến | Ví dụ |
| :--- | :--- | :--- |
| Phụ thuộc | `lnwage` | log lương |
| Nội sinh | `educ` | số năm học |
| Công cụ $Z$ | `khoang_cach_truong` | khoảng cách tới trường gần nhất |
| Ngoại sinh | `exper`, `gioi_tinh`, `khu_vuc` | kiểm soát |

## Bước 4 — Mô hình hóa

Chọn họ *IV & hệ phương trình* → **IV/2SLS**; khai báo nội sinh `educ` và công cụ $Z$:

```mermaid
flowchart LR
    A["GĐ1: educ ~ Z + biến ngoại sinh"] --> B["educ dự báo"]
    B --> C["GĐ2: lnwage ~ educ_dự_báo + ngoại sinh"]
```

**Kết quả minh họa (định dạng — không phải kết quả thực):**

| | OLS | IV/2SLS |
| :--- | :--- | :--- |
| educ | 0.082*** | 0.104*** |
| F giai đoạn 1 | — | 24.5 (> 10 ⇒ công cụ mạnh) |
| Hansen J (p) | — | 0.31 (công cụ hợp lệ) |
| Durbin-Wu-Hausman (p) | — | 0.04 ⇒ có nội sinh, cần IV |

Diễn giải mẫu: IV cho lợi suất **cao hơn OLS** (0.104 vs 0.082) — phù hợp với nhiều nghiên cứu; F > 10 và Hansen không bác bỏ ⇒ công cụ chấp nhận được.

## Bước 5 — Báo cáo
Xuất báo cáo + **mã tái lập**; báo cáo đầy đủ F giai đoạn 1, kiểm định nội sinh và overidentification.

## Xem thêm
- [IV/2SLS](/ecolab/mo-hinh/iv-2sls) · [Ví dụ Mincer (OLS)](/ecolab/vi-du/luong-giao-duc-ols) · [Danh mục](/ecolab/mo-hinh/danh-muc)
