---
title: FEM và REM (dữ liệu bảng)
sidebar_position: 2
description: Phân biệt mô hình hiệu ứng cố định (FEM) và hiệu ứng ngẫu nhiên (REM) cho dữ liệu bảng, khi nào dùng mô hình nào, kiểm định Hausman và cách chạy trong EcoLab.
---

# FEM và REM cho dữ liệu bảng (Panel Data)

Khi dữ liệu theo dõi **nhiều đơn vị** (quốc gia, doanh nghiệp, tỉnh thành) qua **nhiều thời kỳ**, hai ước lượng phổ biến nhất là **FEM (Fixed Effects Model — hiệu ứng cố định)** và **REM (Random Effects Model — hiệu ứng ngẫu nhiên)**. Cả hai đều kiểm soát đặc điểm không quan sát được của từng đơn vị, nhưng khác nhau ở giả định về mối tương quan giữa đặc điểm đó và các biến giải thích.

Trong EcoLab, FEM/REM thuộc nhóm **Dữ liệu bảng (Panel Data)** và sinh được mã tái lập trên Stata, R, Python. Xem [Ước lượng & Mô hình hóa](/ecolab/econometrics-modeling).

---

## Khác biệt cốt lõi

- **FEM** giả định đặc điểm riêng không quan sát được của đơn vị (`α_i`) **có thể tương quan** với biến giải thích. FEM loại bỏ `α_i` bằng biến đổi within (trừ trung bình theo đơn vị), nên ước lượng **nhất quán** ngay cả khi có tương quan đó — nhưng không ước lượng được biến **bất biến theo thời gian** (time-invariant).
- **REM** giả định `α_i` **không tương quan** với biến giải thích và xem nó như thành phần ngẫu nhiên. REM **hiệu quả hơn** (sai số chuẩn nhỏ hơn) nếu giả định đúng, và ước lượng được cả biến bất biến theo thời gian — nhưng **chệch (biased)** nếu giả định bị vi phạm.

---

## Khi nào dùng mô hình nào?

| Tình huống | Nên chọn |
| :--- | :--- |
| Nghi ngờ `α_i` tương quan với biến giải thích (nội sinh do đặc điểm đơn vị) | **FEM** |
| Quan tâm hệ số của biến **bất biến theo thời gian** (giới tính, vị trí địa lý cố định) | **REM** |
| Mẫu là chọn ngẫu nhiên từ tổng thể lớn, `α_i` được xem như ngẫu nhiên | **REM** |
| Không chắc chắn | Chạy cả hai và dùng **kiểm định Hausman** |

---

## Đặc tả mô hình

$$
Y_{it} = \beta \, X_{it} + \alpha_i + u_{it}
$$

- $Y_{it}$: biến phụ thuộc của đơn vị $i$ tại thời kỳ $t$.
- $X_{it}$: vector biến giải thích.
- $\alpha_i$: đặc điểm riêng không quan sát được của đơn vị $i$.
- FEM xử lý $\alpha_i$ như tham số cố định; REM xử lý $\alpha_i$ như biến ngẫu nhiên với $E[\alpha_i \mid X_{it}] = 0$.

---

## Kiểm định Hausman

Kiểm định Hausman so sánh ước lượng FEM và REM:

- **Giả thuyết H0:** REM nhất quán (không có tương quan giữa `α_i` và `X`) → chọn **REM** (hiệu quả hơn).
- **Bác bỏ H0** (p-value nhỏ) → REM chệch → chọn **FEM**.

Ngoài Hausman, nên kiểm tra: phương sai sai số thay đổi (Modified Wald), tự tương quan (Wooldridge), và phụ thuộc chéo (cross-sectional dependence) với bảng nhiều thời kỳ. Khi có các khuyết tật này, dùng **sai số chuẩn vững/cụm (clustered robust)**.

---

## Thực hiện trong EcoLab

1. Ở module **Thu thập dữ liệu**, lấy dữ liệu bảng (đảm bảo có cột **đơn vị/entity** và cột **thời gian/time**).
2. Ở module **Mô hình hóa**, nhấn **Thêm mô hình** → nhóm *Panel Data* → chọn *Fixed Effects* hoặc *Random Effects*.
3. Khai báo biến **Entity** và **Time**, chọn `Y` và các biến `X`.
4. Chọn cấu trúc sai số chuẩn: *Robust* hoặc *Clustered* theo đơn vị nếu nghi ngờ khuyết tật.
5. Chạy cả FEM và REM, mở thẻ **Chẩn đoán** để xem **kiểm định Hausman** và quyết định mô hình cuối cùng.

---

## Ví dụ đầu vào / đầu ra

**Đầu vào (minh họa):** bảng 63 tỉnh × 10 năm với `pci` (chỉ số năng lực cạnh tranh), `fdi` (vốn FDI), `labor` (lực lượng lao động).

**Đầu ra (định dạng, số liệu minh họa — không phải kết quả thực):**

| | FEM | REM |
| :--- | :--- | :--- |
| fdi | 0.31*** | 0.29*** |
| labor | 0.12* | 0.18** |
| Hausman p-value | — | 0.004 → chọn **FEM** |

Diễn giải: Hausman bác bỏ H0 ⇒ ưu tiên FEM; hệ số `labor` time-invariant một phần nên FEM kém ổn định với biến ít biến thiên.

---

## Hạn chế và lưu ý

- FEM **không ước lượng được** biến bất biến theo thời gian.
- REM cho kết quả chệch nếu giả định không tương quan bị vi phạm — luôn kiểm tra Hausman.
- Bảng "rộng theo thời gian" (T lớn) cần lưu ý phụ thuộc chéo và tính dừng; cân nhắc panel chuỗi thời gian.
- Với biến phụ thuộc trễ ở vế phải hoặc nội sinh động, cân nhắc **GMM (Arellano–Bond)**.

---

## Xem thêm

- [Mô hình ARDL (chuỗi thời gian)](/ecolab/mo-hinh/ardl)
- [Ví dụ: FDI và tăng trưởng kinh tế Việt Nam](/ecolab/vi-du/fdi-tang-truong-ardl)
- [Ước lượng & Mô hình hóa Kinh tế lượng](/ecolab/econometrics-modeling)
