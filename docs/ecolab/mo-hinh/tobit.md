---
title: Tobit — Hồi quy kiểm duyệt
sidebar_position: 3
description: Mô hình Tobit cho biến phụ thuộc bị kiểm duyệt (censored), ví dụ chi tiêu/giờ làm bị chặn tại 0, và cách chạy trong EcoLab.
---

# Tobit — Hồi quy biến bị kiểm duyệt (censored)

**Tobit** xử lý biến phụ thuộc **bị kiểm duyệt (censored)** — quan sát được phần giá trị trong một khoảng nhưng bị dồn (mass point) tại ngưỡng. Ví dụ điển hình: chi tiêu cho một mặt hàng, số giờ làm thêm, đầu tư — nhiều quan sát bằng **0** trong khi biến tiềm ẩn có thể âm.

:::tip Kiểm duyệt vs cắt cụt
**Censored (Tobit)**: vẫn quan sát được đơn vị tại ngưỡng (giá trị bị dồn về ngưỡng). **Truncated** ([Truncated Regression](/ecolab/mo-hinh/truncated)): đơn vị ngoài ngưỡng **không xuất hiện** trong mẫu.
:::

---

## Đặc tả mô hình

Biến tiềm ẩn $Y_i^{*} = X_i \beta + \varepsilon_i$, quan sát:

$$
Y_i = \begin{cases} Y_i^{*} & \text{nếu } Y_i^{*} > 0 \\ 0 & \text{nếu } Y_i^{*} \le 0 \end{cases}
$$

Ước lượng bằng **MLE**. OLS trên dữ liệu kiểm duyệt cho hệ số **chệch**.

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Biến phụ thuộc giới hạn* → **Tobit**.
2. Chọn $Y$ (có ngưỡng kiểm duyệt, vd dồn tại 0) và các $X$; khai báo **ngưỡng**.
3. Chạy, đọc hệ số + **tác động biên** (có/không kiểm duyệt); xuất **mã tái lập**.

---

## Hạn chế

- Nhạy với giả định **chuẩn & đồng phương sai** của sai số.
- Nếu cơ chế "có tham gia hay không" khác cơ chế "mức độ", cân nhắc [Heckman](/ecolab/mo-hinh/heckman) (two-part/selection).

## Xem thêm

- [Truncated Regression](/ecolab/mo-hinh/truncated) · [Heckman](/ecolab/mo-hinh/heckman) · [Danh mục](/ecolab/mo-hinh/danh-muc)
