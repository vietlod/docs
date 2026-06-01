---
title: Mô hình ARDL
sidebar_position: 1
description: ARDL (Autoregressive Distributed Lag) là gì, khi nào dùng, giả định, kiểm định đường bao (bounds test) và cách chạy ARDL trong EcoLab với dữ liệu chuỗi thời gian.
---

# Mô hình ARDL (Autoregressive Distributed Lag)

**ARDL** là mô hình hồi quy chuỗi thời gian kết hợp độ trễ của biến phụ thuộc và độ trễ của các biến độc lập trong cùng một phương trình. ARDL phù hợp khi các biến có bậc tích hợp **hỗn hợp** — một số dừng ở bậc gốc I(0), một số dừng ở sai phân bậc nhất I(1) — và cho phép kiểm định **đồng liên kết (cointegration)** giữa các biến qua **kiểm định đường bao (bounds test)** của Pesaran, Shin và Smith (2001).

Trong EcoLab, ARDL thuộc nhóm **Chuỗi thời gian (Time Series)** và sinh được mã tái lập trên Stata, R và Python. Xem thêm [Ước lượng & Mô hình hóa](/ecolab/econometrics-modeling) và [Tổng quan EcoLab](/ecolab/overview).

---

## Khi nào nên dùng ARDL?

Dùng ARDL khi đồng thời thỏa các điều kiện sau:

- Dữ liệu là **chuỗi thời gian** (một quốc gia/đơn vị theo thời gian), mẫu quan sát thường nhỏ đến vừa.
- Các biến có bậc tích hợp **không quá I(1)** (không có biến nào I(2)).
- Bậc tích hợp **hỗn hợp** I(0)/I(1) — trường hợp mà Engle–Granger hay Johansen khó áp dụng.
- Cần ước lượng đồng thời **quan hệ dài hạn (long-run)** và **động học ngắn hạn (short-run)** qua mô hình hiệu chỉnh sai số (ECM).

**Không dùng ARDL** khi có biến I(2), hoặc khi dữ liệu là dữ liệu bảng nhiều đơn vị (cân nhắc [FEM/REM](/ecolab/mo-hinh/fem-rem) hoặc panel ARDL/PMG).

---

## Đặc tả mô hình

Dạng tổng quát của ARDL(p, q) với một biến độc lập:

```
Y_t = c + Σ(i=1..p) φ_i · Y_{t-i} + Σ(j=0..q) β_j · X_{t-j} + ε_t
```

Trong đó `p` là độ trễ của biến phụ thuộc `Y`, `q` là độ trễ của biến độc lập `X`. Dạng hiệu chỉnh sai số (ARDL-ECM) tách quan hệ dài hạn và điều chỉnh ngắn hạn:

```
ΔY_t = c + α·(Y_{t-1} − θ·X_{t-1}) + Σ γ_i·ΔY_{t-i} + Σ δ_j·ΔX_{t-j} + ε_t
```

`θ` là hệ số dài hạn; `α` (hệ số điều chỉnh, error correction term) phải âm và có ý nghĩa thống kê để khẳng định tồn tại quan hệ đồng liên kết.

---

## Giả định và bước kiểm định

1. **Bậc tích hợp:** kiểm định nghiệm đơn vị (ADF, Phillips–Perron, KPSS) để chắc chắn không có biến I(2).
2. **Chọn độ trễ tối ưu:** dựa trên tiêu chuẩn thông tin AIC/BIC.
3. **Kiểm định đường bao (bounds test):** thống kê F so với giá trị tới hạn cận trên/cận dưới để kết luận có đồng liên kết hay không.
4. **Chẩn đoán khuyết tật:** tự tương quan (Breusch–Godfrey), phương sai sai số thay đổi (Breusch–Pagan/White), phân phối chuẩn của phần dư (Jarque–Bera).
5. **Tính ổn định:** kiểm định CUSUM và CUSUMSQ.

---

## Thực hiện ARDL trong EcoLab

1. Ở module **Thu thập dữ liệu**, kết nối [EcoData](/ecodata/overview) hoặc nguồn công khai (World Bank, IMF, FRED) để lấy chuỗi thời gian của biến phụ thuộc và các biến độc lập.
2. Ở module **Mô hình hóa**, nhấn **Thêm mô hình** → chọn nhóm *Chuỗi thời gian* → *ARDL*.
3. Chọn biến phụ thuộc `Y`, các biến độc lập `X`, và để hệ thống chọn độ trễ theo AIC/BIC (hoặc cố định thủ công).
4. Nhấn **Chạy mô hình**. Xem thẻ **Ước lượng** (hệ số ngắn hạn/dài hạn), thẻ **Chẩn đoán** (bounds test, CUSUM), và thẻ **Mã tái lập** để lấy script Stata/R/Python.

---

## Ví dụ đầu vào / đầu ra

**Đầu vào (minh họa):** chuỗi năm 1990–2023 gồm `growth` (tăng trưởng GDP %), `fdi` (FDI/GDP %), `open` (độ mở thương mại %), `inf` (lạm phát %).

**Đầu ra (định dạng, số liệu minh họa — không phải kết quả thực):**

| Thành phần | Hệ số | Sai số chuẩn | p-value |
| :--- | :--- | :--- | :--- |
| Dài hạn: fdi | 0.42 | 0.15 | 0.012 |
| Dài hạn: open | 0.08 | 0.04 | 0.061 |
| ECM (α) | −0.55 | 0.13 | 0.001 |
| Bounds F-stat | 6.10 | (vượt cận trên I(1)) | có đồng liên kết |

Diễn giải: hệ số ECM âm và có ý nghĩa xác nhận đồng liên kết; tốc độ điều chỉnh về cân bằng dài hạn khoảng 55%/năm.

---

## Hạn chế và lưu ý

- ARDL **không xử lý** biến I(2); phải kiểm tra trước bằng kiểm định nghiệm đơn vị.
- Nhạy với lựa chọn độ trễ; nên đối chiếu AIC và BIC.
- Mẫu quá nhỏ làm bounds test kém tin cậy.
- ARDL là mô hình **một phương trình**; nếu nghi ngờ quan hệ đồng thời nhiều chiều, cân nhắc VAR/VECM.

---

## Xem thêm

- [Ví dụ: FDI và tăng trưởng kinh tế Việt Nam (ARDL)](/ecolab/vi-du/fdi-tang-truong-ardl)
- [FEM và REM cho dữ liệu bảng](/ecolab/mo-hinh/fem-rem)
- [Ước lượng & Mô hình hóa Kinh tế lượng](/ecolab/econometrics-modeling)
