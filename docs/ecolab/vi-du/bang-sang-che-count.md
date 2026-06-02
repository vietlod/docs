---
title: 'Ví dụ: R&D và số bằng sáng chế (Count)'
sidebar_position: 5
description: Thực hành mô hình biến đếm trên EcoLab — tác động của chi R&D lên số bằng sáng chế của doanh nghiệp, Poisson vs Negative Binomial.
---

# Ví dụ: R&D và số bằng sáng chế (dữ liệu đếm)

Minh họa nhóm [biến đếm](/ecolab/mo-hinh/poisson): số **bằng sáng chế** một doanh nghiệp đăng ký (số nguyên không âm) theo chi **R&D** và quy mô. Số liệu là **minh họa**.

> Tóm tắt: vì biến đếm thường **overdispersion**, ta so sánh [Poisson](/ecolab/mo-hinh/poisson) và [Negative Binomial](/ecolab/mo-hinh/negbin) và chọn mô hình phù hợp.

---

## Bước 1 — Ý tưởng
- **Câu hỏi:** tăng chi R&D làm tăng số bằng sáng chế bao nhiêu?

## Bước 2 — Tổng quan tài liệu
Kinh tế học đổi mới sáng tạo (innovation), hàm sản xuất tri thức; biến đếm patents.

## Bước 3 — Thu thập dữ liệu

| Biến | Ký hiệu | Đo lường | Nguồn |
| :--- | :--- | :--- | :--- |
| Số bằng sáng chế | `patents` | số đếm/năm | cơ sở dữ liệu sở hữu trí tuệ |
| Chi R&D | `lnrd` | log chi R&D | BCTC |
| Quy mô | `lnsize` | log tài sản/lao động | BCTC |

## Bước 4 — Mô hình hóa

Chọn họ *Dữ liệu đếm* → **Poisson**, kiểm tra **overdispersion**; nếu có ⇒ **Negative Binomial**:

$$
E[patents_i \mid X_i] = \exp(\beta_0 + \beta_1 lnrd_i + \beta_2 lnsize_i)
$$

**Kết quả minh họa (định dạng — không phải kết quả thực):**

| | Poisson | NegBin |
| :--- | :--- | :--- |
| lnrd (IRR) | 1.35*** | 1.31*** |
| lnsize (IRR) | 1.12** | 1.10** |
| Overdispersion $\alpha$ | — | 0.42 (≠0) ⇒ chọn NegBin |

Diễn giải mẫu: chi R&D tăng 1% gắn với số bằng sáng chế kỳ vọng cao hơn (IRR > 1); kiểm định $\alpha \ne 0$ ⇒ **NegBin phù hợp hơn Poisson**.

## Bước 5 — Báo cáo
Xuất báo cáo + **mã tái lập**; nếu dư thừa số 0 (nhiều DN 0 bằng sáng chế) ⇒ cân nhắc [ZINB](/ecolab/mo-hinh/zinb).

## Xem thêm
- [Poisson](/ecolab/mo-hinh/poisson) · [Negative Binomial](/ecolab/mo-hinh/negbin) · [ZINB](/ecolab/mo-hinh/zinb) · [Danh mục](/ecolab/mo-hinh/danh-muc)
