---
title: SUR — Hồi quy có vẻ không liên quan
sidebar_position: 3
description: Seemingly Unrelated Regressions (SUR) ước lượng nhiều phương trình có sai số tương quan chéo để tăng hiệu quả, và cách chạy trong EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# SUR — Seemingly Unrelated Regressions

**SUR (Seemingly Unrelated Regressions)** ước lượng **nhiều phương trình** cùng lúc khi chúng **dường như độc lập** nhưng **sai số tương quan chéo** giữa các phương trình. Bằng cách khai thác tương quan đó (qua [GLS](/ecolab/model/gls)), SUR cho ước lượng **hiệu quả hơn** so với chạy OLS từng phương trình riêng lẻ.

:::tip Khi nào dùng
Dùng SUR khi có **nhiều phương trình chia sẻ cú sốc chung** (vd hệ phương trình chi tiêu cho nhiều nhóm hàng, hàm cầu nhiều ngành) — không có nội sinh nhưng sai số liên quan. Nếu có nội sinh ⇒ [3SLS](/ecolab/model/3sls).
:::

---

## Đặc tả mô hình

Hệ $m$ phương trình $Y_g = X_g \beta_g + \varepsilon_g$ với $\mathrm{Cov}(\varepsilon_g, \varepsilon_h) \ne 0$. SUR ước lượng bằng **FGLS** dùng ma trận hiệp phương sai sai số chéo $\Sigma$:

$$
\hat{\beta}_{SUR} = \big(X'(\Sigma^{-1} \otimes I)X\big)^{-1} X'(\Sigma^{-1}\otimes I)Y
$$

Khi các phương trình có **cùng tập biến giải thích** hoặc sai số không tương quan, SUR quy về OLS từng phương trình.

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *IV & hệ phương trình* → **SUR**.
2. Khai báo **các phương trình** (mỗi phương trình có $Y_g$ và $X_g$ riêng).
3. Chạy, đọc hệ số toàn hệ + ma trận tương quan sai số; xuất **mã tái lập**.

---

## Minh họa mã tái lập

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* === SUR — Seemingly Unrelated Regressions ===

* Ước lượng hệ SUR: hai phương trình có sai số tương quan chéo
sureg (eq1: y1 x1 x2) (eq2: y2 x3 x4)

* Hiển thị ma trận tương quan sai số chéo
estat summarize
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# === SUR — Seemingly Unrelated Regressions ===

library(systemfit)

# Định nghĩa hệ phương trình
eq1 <- y1 ~ x1 + x2
eq2 <- y2 ~ x3 + x4
system_eq <- list(eq1 = eq1, eq2 = eq2)

# Ước lượng SUR
sur_model <- systemfit(system_eq, method = "SUR", data = df)
summary(sur_model)

# Ma trận tương quan sai số chéo
sur_model$residCov
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# === SUR — Seemingly Unrelated Regressions ===

from linearmodels.system import SUR

# Ước lượng SUR từ công thức
model = SUR.from_formula(
    {
        'eq1': 'y1 ~ 1 + x1 + x2',
        'eq2': 'y2 ~ 1 + x3 + x4'
    },
    data=df
)
result = model.fit()
print(result)
```

  </TabItem>
</Tabs>

---

## Hạn chế

- Lợi ích hiệu quả **nhỏ** khi sai số ít tương quan hoặc các phương trình cùng biến giải thích.
- Nhạy với sai đặc tả ở bất kỳ phương trình nào.

## Video minh họa

<VideoTutorial
  title="Hướng dẫn chạy SUR trong EcoLab"
  src="https://www.youtube.com/embed/m3wyHeBOfUE"
/>

## Xem thêm

- [3SLS](/ecolab/model/3sls) · [IV/2SLS](/ecolab/model/iv-2sls) · [Danh mục](/ecolab/model/group)

