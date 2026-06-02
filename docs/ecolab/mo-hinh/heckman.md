---
title: Heckman — Mô hình chọn mẫu
sidebar_position: 5
description: Mô hình Heckman (Heckit) hiệu chỉnh thiên lệch chọn mẫu (sample selection bias) qua tỷ số Mills nghịch đảo, hai bước/MLE, và cách chạy trong EcoLab.
---

# Heckman — Mô hình hiệu chỉnh chọn mẫu (Heckit)

**Mô hình Heckman (Heckit)** hiệu chỉnh **thiên lệch chọn mẫu (sample selection bias)** — khi việc một quan sát có giá trị kết quả hay không **phụ thuộc các yếu tố** liên quan đến chính kết quả đó. Ví dụ: chỉ quan sát được **tiền lương** của người **có đi làm**; mẫu người đi làm không ngẫu nhiên ⇒ OLS chệch.

:::tip Khi nào dùng
Dùng Heckman khi mẫu kết quả bị **chọn lọc nội sinh** (vd lương ↔ quyết định tham gia lực lượng lao động). Cần một **biến loại trừ (exclusion restriction)**: biến ảnh hưởng việc *được chọn* nhưng không ảnh hưởng trực tiếp *kết quả*.
:::

---

## Cấu trúc 2 phương trình

```mermaid
flowchart LR
    A["PT chọn mẫu (Probit):<br/>có quan sát kết quả không?"] --> C["Tỷ số Mills nghịch đảo (IMR)"]
    C --> B["PT kết quả (OLS) có thêm IMR<br/>để khử thiên lệch"]
```

- **Phương trình chọn mẫu**: $S_i = 1[Z_i \gamma + u_i > 0]$ (Probit).
- **Phương trình kết quả**: $Y_i = X_i \beta + \rho \sigma_\varepsilon \, \lambda(Z_i \gamma) + \xi_i$, với $\lambda(\cdot)$ là **tỷ số Mills nghịch đảo (IMR)**.

Hệ số của IMR có ý nghĩa thống kê ⇒ **có thiên lệch chọn mẫu** (và Heckman là cần thiết).

---

## Hai cách ước lượng

| Cách | Mô tả |
| :--- | :--- |
| **Two-step (Heckit)** | Bước 1 Probit chọn mẫu → tính IMR; bước 2 OLS kết quả có IMR |
| **MLE** | Ước lượng đồng thời cả hai phương trình (hiệu quả hơn) |

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Biến phụ thuộc giới hạn* → **Heckman**.
2. Khai báo **phương trình kết quả** ($Y$, $X$) và **phương trình chọn mẫu** ($Z$, gồm biến loại trừ).
3. Chọn two-step hoặc MLE; chạy, đọc hệ số IMR ($\rho$) để xác nhận thiên lệch; xuất **mã tái lập**.

---

## Hạn chế

- **Rất phụ thuộc biến loại trừ** hợp lệ; thiếu nó, mô hình nhận diện kém (collinearity với IMR).
- Nhạy với giả định chuẩn 2 biến của sai số.

## Xem thêm

- [Probit](/ecolab/mo-hinh/probit) · [Tobit](/ecolab/mo-hinh/tobit) · [Truncated](/ecolab/mo-hinh/truncated) · [Danh mục](/ecolab/mo-hinh/danh-muc)
