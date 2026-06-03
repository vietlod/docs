---
title: 3SLS — Hệ phương trình đồng thời
sidebar_position: 2
description: Bình phương nhỏ nhất ba giai đoạn (3SLS) ước lượng hệ phương trình đồng thời có nội sinh và sai số tương quan chéo, và cách chạy trong EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# 3SLS — Bình phương nhỏ nhất ba giai đoạn

**3SLS (Three-Stage Least Squares)** ước lượng một **hệ phương trình đồng thời (simultaneous equations)** trong đó các biến nội sinh xuất hiện ở nhiều phương trình và **sai số tương quan chéo** giữa các phương trình. 3SLS kết hợp [2SLS](/ecolab/model/iv-2sls) (xử lý nội sinh) với [GLS](/ecolab/model/gls) (khai thác tương quan chéo) ⇒ hiệu quả hơn 2SLS từng phương trình.

:::tip Khi nào dùng
Dùng 3SLS khi mô hình là **hệ nhiều phương trình cấu trúc** có nội sinh (vd cung–cầu, hệ kinh tế vĩ mô) và sai số các phương trình tương quan. Nếu chỉ 1 phương trình ⇒ dùng 2SLS.
:::

---

## Ba giai đoạn

```mermaid
flowchart LR
    A["GĐ1: ước lượng giá trị dự báo biến nội sinh (như 2SLS)"] --> B["GĐ2: ước lượng ma trận hiệp phương sai sai số chéo"]
    B --> C["GĐ3: GLS toàn hệ dùng ma trận đó"]
```

---

## Thực hiện trong EcoLab

1. Module **Mô hình hóa** → họ *IV & hệ phương trình* → **3SLS**.
2. Khai báo **các phương trình** của hệ, biến nội sinh và công cụ chung.
3. Chạy, đọc hệ số toàn hệ; so sánh với 2SLS từng phương trình; xuất **mã tái lập**.

---

## Minh họa mã tái lập

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* === 3SLS — Hệ phương trình đồng thời ===

* Ước lượng hệ cung–cầu bằng 3SLS
* demand: q phụ thuộc p và income
* supply: q phụ thuộc p và cost
reg3 (demand: q p income) (supply: q p cost), 3sls

* Kết quả: hệ số từng phương trình + ma trận hiệp phương sai sai số
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# === 3SLS — Hệ phương trình đồng thời ===

library(systemfit)

# Định nghĩa hệ phương trình
eq_demand <- q ~ p + income
eq_supply <- q ~ p + cost
system_eq <- list(demand = eq_demand, supply = eq_supply)

# Biến công cụ (biến ngoại sinh dùng chung cho nhận dạng)
inst <- ~ income + cost

# Ước lượng 3SLS
result_3sls <- systemfit(system_eq, method = "3SLS", inst = inst, data = df)
summary(result_3sls)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# === 3SLS — Hệ phương trình đồng thời ===
# Python: linearmodels hỗ trợ SUR; 3SLS cần tiếp cận thủ công
# hoặc dùng gói bổ sung. Minh họa tiếp cận 2 bước:

import numpy as np
from linearmodels.iv import IV2SLS

# Bước 1–2: Ước lượng 2SLS từng phương trình
demand = IV2SLS.from_formula('q ~ 1 + income + [p ~ cost]', data=df).fit()
supply = IV2SLS.from_formula('q ~ 1 + cost + [p ~ income]', data=df).fit()

print("=== Demand ===")
print(demand)
print("=== Supply ===")
print(supply)

# Bước 3: Khai thác tương quan sai số chéo (GLS)
# → Dùng ước lượng phần dư để xây dựng ma trận Sigma
# và ước lượng GLS toàn hệ (triển khai đầy đủ cần mã thủ công)
```

  </TabItem>
</Tabs>

---

## Hạn chế

- **Sai đặc tả một phương trình** có thể lan sang toàn hệ (kém vững hơn ước lượng từng phương trình).
- Cần nhận dạng (identification) đầy đủ cho mọi phương trình.

## Video minh họa

<VideoTutorial
  title="Hướng dẫn chạy 3SLS trong EcoLab"
  src="https://www.youtube.com/user/vietlod"
/>

## Xem thêm

- [IV/2SLS](/ecolab/model/iv-2sls) · [SUR](/ecolab/model/sur) · [Danh mục](/ecolab/model/group)
