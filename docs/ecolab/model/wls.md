---
title: WLS — Bình phương nhỏ nhất có trọng số
sidebar_position: 2
description: Hồi quy WLS (Weighted Least Squares) xử lý phương sai sai số thay đổi đã biết, công thức trọng số, và cách chạy WLS trong EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# WLS — Bình phương nhỏ nhất có trọng số

**WLS (Weighted Least Squares)** là biến thể của [OLS](/ecolab/model/ols) dùng khi **phương sai sai số thay đổi (heteroskedasticity)** và ta biết (hoặc ước lượng được) cấu trúc của nó. WLS gán **trọng số** tỉ lệ nghịch với phương sai sai số để khôi phục tính hiệu quả của ước lượng.

:::tip Khi nào dùng
Dùng WLS khi phương sai sai số **không đồng nhất nhưng có cấu trúc biết trước** (ví dụ phương sai tỉ lệ với một biến). Nếu chỉ cần suy diễn vững mà không biết cấu trúc, dùng OLS + **sai số chuẩn robust**.
:::

---

## Đặc tả mô hình

WLS tối thiểu hóa tổng bình phương phần dư **có trọng số** $w_i$:

$$
\min_{\beta} \sum_{i=1}^{n} w_i \, (Y_i - X_i \beta)^2, \qquad w_i = \frac{1}{\sigma_i^2}
$$

Trọng số tối ưu là nghịch đảo phương sai sai số $\sigma_i^2$. Khi mọi $w_i$ bằng nhau, WLS trùng OLS.

---

## Giả định & lưu ý

- Cần **biết hoặc ước lượng đúng** cấu trúc phương sai $\sigma_i^2$; chọn sai trọng số có thể làm kết quả tệ hơn OLS.
- Nếu phương sai phải ước lượng từ dữ liệu, ta có [FGLS](/ecolab/model/gls) (Feasible GLS).
- Vẫn cần ngoại sinh ($E[\varepsilon \mid X] = 0$) như OLS.

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *Hồi quy tuyến tính cổ điển* → **WLS**.
2. Chọn $Y$, các $X$, và **biến/quy tắc trọng số** (ví dụ $1/x$, $1/x^2$).
3. Chạy và so sánh với OLS ở thẻ **Ước lượng**; xuất **mã tái lập**.

---

## Ví dụ đầu vào / đầu ra

**Đầu vào (minh họa):** `chi_tieu` hộ gia đình theo `thu_nhap`; phương sai tăng theo thu nhập ⇒ trọng số $1/\text{thu\_nhap}$.

**Đầu ra (định dạng, số liệu minh họa — không phải kết quả thực):** hệ số tương tự OLS nhưng **SE nhỏ hơn** (hiệu quả hơn) khi trọng số đúng.

---

## Minh họa mã tái lập

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* === WLS với trọng số phân tích (analytic weights) ===
* Trọng số tỉ lệ nghịch phương sai: w = 1/thu_nhap
regress chi_tieu thu_nhap x2 [aweight = 1/thu_nhap]

* Hoặc dùng lệnh vwls khi biết độ lệch chuẩn sai số
* vwls chi_tieu thu_nhap x2, sd(sigma)
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# === WLS trong R ===
# Trọng số: nghịch đảo phương sai (1/thu_nhap)
model_wls <- lm(chi_tieu ~ thu_nhap + x2,
                weights = 1 / thu_nhap,
                data = df)
summary(model_wls)

# So sánh SE với OLS thường
model_ols <- lm(chi_tieu ~ thu_nhap + x2, data = df)
cbind(WLS = coef(summary(model_wls))[, "Std. Error"],
      OLS = coef(summary(model_ols))[, "Std. Error"])
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
import statsmodels.api as sm

# === WLS trong Python ===
X = sm.add_constant(df[['thu_nhap', 'x2']])
y = df['chi_tieu']

# Trọng số = 1 / phương sai sai số (1/thu_nhap)
weights = 1 / df['thu_nhap']

model_wls = sm.WLS(y, X, weights=weights).fit()
print(model_wls.summary())
```

  </TabItem>
</Tabs>

---

## Hạn chế

- Rất nhạy với việc **chọn sai trọng số**.
- Khi không chắc cấu trúc phương sai, ưu tiên OLS + robust SE hoặc [GLS/FGLS](/ecolab/model/gls).

## Video minh họa

<VideoTutorial
  title="Hướng dẫn chạy WLS trong EcoLab"
  src="https://www.youtube.com/user/vietlod"
/>

## Xem thêm

- [OLS](/ecolab/model/ols) · [GLS](/ecolab/model/gls) · [Danh mục mô hình](/ecolab/model/group)
