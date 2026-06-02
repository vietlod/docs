---
title: Mô hình VECM
sidebar_position: 4
description: VECM (Vector Error Correction Model) là gì, quan hệ với VAR và đồng liên kết Johansen, khi nào dùng, các bước kiểm định và cách chạy VECM trong EcoLab.
---

# Mô hình VECM (Vector Error Correction Model)

**VECM** là mô hình đa biến dùng khi nhiều chuỗi thời gian **không dừng I(1)** nhưng **đồng liên kết (cointegrated)** — tức tồn tại quan hệ cân bằng dài hạn giữa chúng. VECM mở rộng VAR bằng cách thêm **số hạng hiệu chỉnh sai số (error correction term)** thể hiện tốc độ các biến quay về cân bằng dài hạn sau cú sốc.

Trong EcoLab, VECM thuộc nhóm **Chuỗi thời gian**. Khác với [ARDL](/ecolab/mo-hinh/ardl) (một phương trình, phù hợp khi có một biến phụ thuộc rõ), VECM phù hợp khi nghi ngờ **quan hệ đồng thời nhiều chiều** giữa các biến.

---

## Khi nào nên dùng VECM?

- Có **từ hai biến trở lên cùng I(1)** và nghi ngờ quan hệ dài hạn (đồng liên kết).
- Quan tâm **động học hệ thống** (phản ứng đẩy IRF, phân rã phương sai) chứ không chỉ một phương trình.
- Đã xác nhận đồng liên kết qua **kiểm định Johansen** (trace / max-eigenvalue).

**Nếu các biến đều dừng I(0)** → dùng VAR thường. **Nếu I(1) nhưng KHÔNG đồng liên kết** → dùng VAR ở sai phân.

---

## Đặc tả mô hình

Dạng VECM rút gọn:

```
ΔY_t = Π·Y_{t-1} + Σ Γ_i·ΔY_{t-i} + ε_t
```

- `Π = α·β'`: ma trận `β` chứa các **vector đồng liên kết** (quan hệ dài hạn); `α` là **tốc độ điều chỉnh**.
- **Hạng (rank) của Π = r** = số quan hệ đồng liên kết, xác định bằng kiểm định Johansen.
- `Γ_i`: động học ngắn hạn.

---

## Quy trình kiểm định

1. **Kiểm định nghiệm đơn vị** (ADF/PP/KPSS): xác nhận các biến cùng I(1).
2. **Chọn độ trễ** cho VAR cơ sở (AIC/BIC/HQ).
3. **Kiểm định đồng liên kết Johansen** (trace & max-eigenvalue) → xác định hạng `r`.
4. Ước lượng VECM với hạng `r`; kiểm tra dấu và ý nghĩa của `α` (điều chỉnh sai số).
5. **Chẩn đoán phần dư**: tự tương quan (LM), phân phối chuẩn, ổn định; phân tích **IRF** và **phân rã phương sai (FEVD)**.

---

## Thực hiện trong EcoLab

1. Module **Thu thập dữ liệu**: lấy các chuỗi thời gian liên quan (cùng tần suất).
2. Module **Mô hình hóa** → nhóm *Chuỗi thời gian* → *VAR/VECM*; chọn tập biến hệ thống.
3. Khai báo độ trễ và hạng đồng liên kết (hoặc để hệ thống đề xuất từ Johansen).
4. Đọc kết quả: vector dài hạn `β`, hệ số điều chỉnh `α`, IRF/FEVD; lấy mã ở thẻ **Mã tái lập**.

---

## Ví dụ đầu vào / đầu ra

**Đầu vào (minh họa):** chuỗi quý của `lgdp` (log GDP), `lm2` (log cung tiền), `lcpi` (log giá).

**Đầu ra (định dạng, số liệu minh họa — không phải kết quả thực):**

| Thành phần | Giá trị | Ghi chú |
| :--- | :--- | :--- |
| Johansen trace (r=0) | bác bỏ | có ít nhất 1 quan hệ |
| Johansen trace (r≤1) | không bác bỏ | r = 1 |
| α (lgdp) | −0.18*** | điều chỉnh về cân bằng |
| Vector dài hạn β | lgdp − 0.7·lm2 + 0.5·lcpi | quan hệ cân bằng |

---

## Hạn chế và lưu ý

- Nhạy với **lựa chọn độ trễ** và **thành phần xác định** (hằng số/xu thế) trong Johansen.
- Cần mẫu đủ dài; kết quả Johansen kém tin cậy với mẫu ngắn.
- Diễn giải vector đồng liên kết cần chuẩn hóa và bám lý thuyết kinh tế.
- Không xử lý biến I(2); kiểm tra bậc tích hợp trước.

---

## Xem thêm

- [Mô hình ARDL](/ecolab/mo-hinh/ardl) — thay thế một phương trình
- [Ví dụ: FDI và tăng trưởng (ARDL)](/ecolab/vi-du/fdi-tang-truong-ardl)
- [Ước lượng & Mô hình hóa Kinh tế lượng](/ecolab/econometrics-modeling)
