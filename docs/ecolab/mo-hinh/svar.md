---
title: SVAR — Structural VAR
sidebar_position: 3
description: Mô hình SVAR (Structural VAR) áp ràng buộc nhận dạng để diễn giải cú sốc cấu trúc có ý nghĩa kinh tế, khác VAR rút gọn, và cách chạy trong EcoLab.
---

# SVAR — Structural VAR

**SVAR (Structural VAR)** mở rộng [VAR](/ecolab/mo-hinh/var) bằng cách áp **ràng buộc nhận dạng (identification restrictions)** để tách các **cú sốc cấu trúc có ý nghĩa kinh tế** (vd cú sốc cung, cầu, chính sách tiền tệ) từ sai số rút gọn. Nhờ đó IRF của SVAR diễn giải được về mặt kinh tế, không chỉ là tương quan thống kê.

:::tip Khi nào dùng
Dùng SVAR khi cần **diễn giải cú sốc cấu trúc** (không chỉ dự báo). Việc nhận dạng đòi hỏi **lý thuyết kinh tế** để áp ràng buộc.
:::

---

## Nhận dạng cú sốc cấu trúc

Quan hệ giữa sai số rút gọn $\varepsilon_t$ và cú sốc cấu trúc $u_t$: $\varepsilon_t = B u_t$. Cần ràng buộc để xác định $B$:

| Cách nhận dạng | Ý tưởng |
| :--- | :--- |
| **Recursive (Cholesky)** | Thứ tự biến ⇒ ma trận tam giác |
| **Short-run** | Ràng buộc tác động tức thời = 0 |
| **Long-run (Blanchard-Quah)** | Ràng buộc tác động dài hạn |
| **Sign restrictions** | Áp dấu của phản ứng |

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Chuỗi thời gian đa biến* → **SVAR**.
2. Chọn biến, độ trễ, và **sơ đồ nhận dạng** (Cholesky/short-run/long-run).
3. Chạy; xem IRF/FEVD cấu trúc; xuất **mã tái lập**.

## Hạn chế

- Kết quả **phụ thuộc mạnh vào ràng buộc nhận dạng** (và thứ tự biến với Cholesky).
- Cần biện minh lý thuyết cho mọi ràng buộc.

## Xem thêm

- [VAR](/ecolab/mo-hinh/var) · [VECM](/ecolab/mo-hinh/vecm) · [Danh mục](/ecolab/mo-hinh/danh-muc)
