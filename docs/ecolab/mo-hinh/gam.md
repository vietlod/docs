---
title: GAM — Mô hình cộng tính tổng quát
sidebar_position: 2
description: Generalized Additive Models (GAM) mô hình quan hệ phi tuyến mượt bằng hàm trơn (splines) mà không cần định trước dạng hàm, và cách chạy trong EcoLab.
---

# GAM — Mô hình cộng tính tổng quát

**GAM (Generalized Additive Models)** mô hình hóa quan hệ **phi tuyến mượt** giữa $Y$ và từng biến giải thích bằng **hàm trơn (smooth functions / splines)** thay vì hệ số tuyến tính — **không cần định trước dạng hàm** như [NLS](/ecolab/mo-hinh/nls). GAM là cầu nối giữa hồi quy tuyến tính và mô hình phi tham số.

:::tip Khi nào dùng
Dùng GAM khi nghi ngờ quan hệ **phi tuyến nhưng chưa biết dạng** (vd tác động tuổi/thu nhập có hình chữ U). GAM cho đồ thị hàm trơn dễ diễn giải mà vẫn giữ tính cộng tính.
:::

---

## Đặc tả mô hình

$$
g\big(E[Y_i]\big) = \beta_0 + f_1(X_{1i}) + f_2(X_{2i}) + \dots + f_k(X_{ki})
$$

với $g(\cdot)$ là hàm liên kết (identity/logit/log…) và $f_j$ là **hàm trơn** (spline) ước lượng từ dữ liệu, có **phạt độ cong** để tránh quá khớp; độ trơn chọn qua GCV/REML.

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Phi tuyến & bán tham số* → **GAM**.
2. Chọn $Y$, các $X$, đánh dấu biến nào dùng **hàm trơn**; chọn hàm liên kết.
3. Chạy, xem **đồ thị hàm trơn** từng biến + độ tự do hiệu dụng; xuất **mã tái lập**.

---

## Hạn chế

- Diễn giải bằng **đồ thị** thay vì một hệ số duy nhất; khó đưa vào suy diễn nhân quả gọn.
- Giả định **cộng tính** (không tự động bắt tương tác trừ khi khai báo).

## Xem thêm

- [NLS](/ecolab/mo-hinh/nls) · [Hồi quy phân vị](/ecolab/mo-hinh/quantile) · [Danh mục](/ecolab/mo-hinh/danh-muc)
