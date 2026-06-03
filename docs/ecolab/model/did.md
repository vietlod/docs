---
title: Difference-in-Differences (DID)
sidebar_position: 5
description: Phương pháp Difference-in-Differences (DID) đánh giá tác động chính sách, giả định xu hướng song song (parallel trends), event study, và cách chạy DID trong EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Difference-in-Differences (DID)

**DID (Sai phân kép)** là phương pháp **suy luận nhân quả** ước lượng tác động của một can thiệp/chính sách bằng cách so sánh thay đổi theo thời gian giữa **nhóm xử lý (treatment)** và **nhóm đối chứng (control)**. Ý tưởng: chênh lệch của *chênh lệch trước–sau* giữa hai nhóm chính là tác động chính sách, với điều kiện hai nhóm có **xu hướng song song (parallel trends)** nếu không có can thiệp.

Trong EcoLab, DID thuộc nhóm **Suy luận nhân quả (Causal Inference)**. Xem [Ước lượng & Mô hình hóa](/ecolab/econometrics-modeling).

---

## Khi nào nên dùng DID?

- Có một **cú sốc/chính sách** áp dụng cho một nhóm tại một thời điểm, nhóm khác không bị áp dụng.
- Có dữ liệu **trước và sau** can thiệp cho cả hai nhóm (panel hoặc lặp lại chéo).
- Giả định **xu hướng song song** là hợp lý (kiểm tra được bằng pre-trends).

---

## Đặc tả mô hình

Dạng DID hai nhóm – hai thời kỳ:

$$
Y_{it} = \beta_0 + \beta_1 \, \text{Treat}_i + \beta_2 \, \text{Post}_t + \delta \, (\text{Treat}_i \times \text{Post}_t) + \varepsilon_{it}
$$

- $\delta$ (hệ số tương tác) là **ước lượng tác động chính sách (ATT)**.
- Mở rộng: TWFE (two-way fixed effects) với hiệu ứng cố định đơn vị và thời gian cho nhiều nhóm/nhiều thời kỳ.

---

## Giả định và kiểm định

1. **Xu hướng song song (parallel trends):** kiểm tra bằng so sánh xu hướng **trước can thiệp** (pre-trends) qua **event study**.
2. **Không có cú sốc đồng thời** chỉ ảnh hưởng một nhóm.
3. **SUTVA / không lan tỏa** giữa nhóm xử lý và đối chứng.
4. Với **thời điểm xử lý so le (staggered)**, TWFE truyền thống có thể chệch — cân nhắc các ước lượng hiện đại (Callaway–Sant'Anna, Sun–Abraham).
5. Sai số chuẩn **cụm (clustered)** theo đơn vị.

---

## Thực hiện trong EcoLab

1. Module **Thu thập dữ liệu**: tạo biến `Treat`, `Post` và biến tương tác; chuẩn bị dữ liệu panel.
2. Module **Mô hình hóa** → nhóm *Causal Inference* → *DiD* (hoặc TWFE).
3. Khai báo biến xử lý, thời gian, biến kết quả và các biến kiểm soát; chọn sai số chuẩn cụm.
4. Chạy **event study** để kiểm tra pre-trends; đọc hệ số `δ` (ATT) và mã tái lập.

---

## Ví dụ đầu vào / đầu ra

**Đầu vào (minh họa):** chính sách hỗ trợ doanh nghiệp áp dụng từ năm T tại một số tỉnh; `revenue` là kết quả.

**Đầu ra (định dạng, số liệu minh họa — không phải kết quả thực):**

| Thành phần | Hệ số | p-value |
| :--- | :--- | :--- |
| Treat × Post (δ, ATT) | 0.124*** | 0.003 |
| Pre-trend (event study) | ≈ 0, không ý nghĩa | song song hợp lệ |

Diễn giải: chính sách làm tăng kết quả khoảng 12.4% so với đối chứng; pre-trends không ý nghĩa củng cố giả định song song.

---

## Minh họa mã tái lập

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* === DID — Difference-in-Differences ===

* Cách 1: Hồi quy tương tác với sai số chuẩn cụm
regress y i.treated##i.post controls, vce(cluster id)

* Cách 2: Lệnh chuyên dụng diff (cần cài ssc install diff)
diff y, t(treated) p(post)

* Staggered DID hiện đại (Callaway–Sant'Anna)
* cần cài: ssc install did_multiplegt
did_multiplegt y id time treated
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# === DID — Difference-in-Differences ===

# Cách 1: Hồi quy tương tác + sai số chuẩn cụm
library(lmtest)
library(sandwich)

did_lm <- lm(y ~ treated * post + controls, data = df)
coeftest(did_lm, vcov = vcovCL(did_lm, cluster = df$id))

# Cách 2: Gói did (Callaway–Sant'Anna) cho staggered DID
library(did)
att <- att_gt(
  yname    = "y",
  tname    = "time",
  idname   = "id",
  gname    = "first_treated",
  data     = df
)
summary(att)
aggte(att, type = "dynamic")  # event study
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# === DID — Difference-in-Differences ===

import statsmodels.formula.api as smf

# Hồi quy tương tác với sai số chuẩn cụm
did_model = smf.ols('y ~ treated * post + controls', data=df)
result = did_model.fit(
    cov_type='cluster',
    cov_kwds={'groups': df['id']}
)
print(result.summary())

# Hệ số tương tác treated:post = δ (ATT)
```

  </TabItem>
</Tabs>

---

## Hạn chế và lưu ý

- Kết quả **vô hiệu** nếu xu hướng song song bị vi phạm — luôn báo cáo event study.
- **Staggered DID** với TWFE có thể bị "negative weighting"; dùng ước lượng hiện đại khi thời điểm xử lý khác nhau.
- Nhóm đối chứng phải thực sự so sánh được; cân nhắc kết hợp [PSM] hoặc synthetic control.
- Cần đủ quan sát trước can thiệp để kiểm tra pre-trends.

---

## Video minh họa

<VideoTutorial
  title="Hướng dẫn chạy DID trong EcoLab"
  src="https://www.youtube.com/user/vietlod"
/>

## Xem thêm

- [FEM và REM (TWFE)](/ecolab/model/fem-rem)
- [Ví dụ: Nợ công và tăng trưởng (dữ liệu bảng)](/ecolab/vi-du/no-cong-tang-truong-panel)
- [Ước lượng & Mô hình hóa Kinh tế lượng](/ecolab/econometrics-modeling)
