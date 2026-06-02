---
title: Probit
sidebar_position: 2
description: Mô hình Probit cho biến nhị phân dùng hàm phân phối chuẩn tích lũy, khác biệt với Logit, tác động biên và cách chạy trong EcoLab.
---

# Probit — Hồi quy nhị phân chuẩn

**Probit** mô hình hóa xác suất biến **nhị phân** qua **hàm phân phối chuẩn tích lũy** $\Phi(\cdot)$. Về mặt thực nghiệm, Probit và [Logit](/ecolab/mo-hinh/logit) thường cho kết luận tương tự; khác biệt nằm ở giả định phân phối sai số (chuẩn vs logistic).

:::tip Logit hay Probit?
Kết quả thường rất gần nhau. **Logit** tiện vì có **tỷ số odds**; **Probit** được ưa dùng khi giả định sai số chuẩn hợp lý hơn hoặc trong các mô hình mở rộng (Heckman, biprobit). Luôn so sánh qua **tác động biên**.
:::

---

## Đặc tả mô hình

$$
P(Y_i = 1 \mid X_i) = \Phi(\beta_0 + \beta_1 X_{1i} + \dots + \beta_k X_{ki})
$$

với $\Phi$ là CDF của phân phối chuẩn chuẩn tắc. Ước lượng bằng **MLE**.

---

## Diễn giải

- Hệ số $\beta_j$ **không** đọc trực tiếp; dùng **tác động biên** (AME/MEM).
- Khớp mô hình: Pseudo-$R^2$, phân loại, AUC.

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Biến phụ thuộc giới hạn* → **Probit**.
2. Chọn $Y$ nhị phân và các $X$.
3. Chạy, đọc **tác động biên**; so sánh với Logit; xuất **mã tái lập**.

---

## Hạn chế

- Không có diễn giải odds như Logit.
- Cùng giả định nền (ngoại sinh, đặc tả đúng) như các mô hình lựa chọn nhị phân.

## Xem thêm

- [Logit](/ecolab/mo-hinh/logit) · [Heckman](/ecolab/mo-hinh/heckman) · [Danh mục](/ecolab/mo-hinh/danh-muc)
