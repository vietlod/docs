---
title: OLS — Bình phương nhỏ nhất
sidebar_position: 1
description: Hồi quy OLS (Ordinary Least Squares) là gì, các giả định Gauss-Markov, chẩn đoán khuyết tật, sai số chuẩn vững và cách chạy OLS trong EcoLab.
---

# OLS — Hồi quy bình phương nhỏ nhất

**OLS (Ordinary Least Squares)** là mô hình hồi quy tuyến tính nền tảng, ước lượng hệ số bằng cách **tối thiểu hóa tổng bình phương phần dư**. Đây là điểm khởi đầu của hầu hết phân tích thực nghiệm và là cơ sở để so sánh với các ước lượng phức tạp hơn.

:::tip Khi nào dùng
OLS phù hợp cho **dữ liệu chéo (cross-section)** với biến phụ thuộc liên tục và quan hệ tuyến tính theo tham số. Nếu vi phạm giả định (phương sai sai số thay đổi, nội sinh, dữ liệu bảng…), hãy chuyển sang ước lượng phù hợp.
:::

---

## Đặc tả mô hình

$$
Y_i = \beta_0 + \beta_1 X_{1i} + \dots + \beta_k X_{ki} + \varepsilon_i
$$

Ước lượng OLS (dạng ma trận): $\hat{\beta} = (X'X)^{-1} X'Y$, là nghiệm của bài toán $\min_{\beta} \sum_{i=1}^{n} \varepsilon_i^2$.

---

## Giả định Gauss-Markov

1. **Tuyến tính theo tham số** và mô hình đặc tả đúng.
2. **Kỳ vọng sai số bằng 0**: $E[\varepsilon_i \mid X] = 0$ (ngoại sinh).
3. **Không phương sai sai số thay đổi**: $\mathrm{Var}(\varepsilon_i) = \sigma^2$ (homoskedasticity).
4. **Không tự tương quan** giữa các sai số.
5. **Không đa cộng tuyến hoàn hảo** giữa các biến giải thích.

Khi 1–5 thỏa, OLS là **BLUE** (ước lượng tuyến tính không chệch tốt nhất).

---

## Chẩn đoán & xử lý

| Vấn đề | Kiểm định | Xử lý |
| :--- | :--- | :--- |
| Phương sai sai số thay đổi | Breusch-Pagan, White | Sai số chuẩn **robust (HC0–HC3)** |
| Tự tương quan | Durbin-Watson, Breusch-Godfrey | Newey-West / [GLS](/ecolab/mo-hinh/gls) |
| Đa cộng tuyến | VIF | Bỏ biến / [Ridge, Lasso](/ecolab/mo-hinh/danh-muc) |
| Nội sinh | Hausman | [IV/2SLS](/ecolab/mo-hinh/danh-muc) |
| Sai phân phối chuẩn phần dư | Jarque-Bera | Biến đổi biến / mẫu lớn |

:::info Sai số chuẩn vững
Khi nghi ngờ phương sai sai số thay đổi, chọn cấu trúc **White Robust (HC0–HC3)** hoặc **Clustered** để t-stat và p-value tin cậy hơn — đây chính là cách EcoLab tạo nhiều bộ ước lượng từ cùng một mô hình.
:::

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Hồi quy tuyến tính cổ điển* → **OLS**.
2. Chọn biến phụ thuộc $Y$ và các biến độc lập $X_1, \dots, X_k$.
3. Chọn cấu trúc sai số chuẩn (Homoskedastic / Robust / Clustered).
4. Chạy và đọc thẻ **Ước lượng**, **Chẩn đoán**, **Mã tái lập**.

---

## Ví dụ đầu vào / đầu ra

**Đầu vào (minh họa):** `wage` (lương) theo `educ` (số năm học), `exper` (kinh nghiệm).

**Đầu ra (định dạng, số liệu minh họa — không phải kết quả thực):**

| Biến | Hệ số | SE (robust) | p-value |
| :--- | :--- | :--- | :--- |
| educ | 0.078 | 0.012 | 0.000 |
| exper | 0.021 | 0.006 | 0.001 |
| $R^2$ | 0.34 | | |

---

## Hạn chế

- Nhạy với **outlier** và sai đặc tả dạng hàm.
- Không phù hợp khi $Y$ rời rạc/bị chặn (dùng [Logit/Probit/Tobit](/ecolab/mo-hinh/danh-muc)) hoặc dữ liệu bảng (dùng [FE/RE](/ecolab/mo-hinh/fem-rem)).

## Xem thêm

- [WLS](/ecolab/mo-hinh/wls) · [GLS](/ecolab/mo-hinh/gls) · [Danh mục mô hình](/ecolab/mo-hinh/danh-muc)
- [Ước lượng & Mô hình hóa](/ecolab/econometrics-modeling)
