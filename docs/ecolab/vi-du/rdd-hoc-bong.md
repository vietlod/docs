---
title: 'Tác động học bổng (RDD)'
sidebar_position: 11
description: Thực hành RDD trên EcoLab — đánh giá tác động của học bổng dựa trên ngưỡng điểm xét tuyển lên kết quả học tập.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoTutorial from '@site/src/components/VideoTutorial';

# Tác động của học bổng lên kết quả học tập (RDD)

Minh họa [RDD](/ecolab/model/rdd): học bổng được cấp cho sinh viên có **điểm xét ≥ ngưỡng**. So sánh sinh viên **ngay trên và ngay dưới ngưỡng** (gần như ngẫu nhiên) cho ước lượng nhân quả đáng tin tại ngưỡng. Số liệu là **minh họa**.

> Tóm tắt: ước lượng **bước nhảy** của kết quả học tập (GPA năm sau) tại ngưỡng điểm xét = tác động nhân quả của học bổng tại ngưỡng.

---

## Bước 1 — Ý tưởng
- **Câu hỏi:** nhận học bổng có cải thiện kết quả học tập không?

## Bước 2 — Tổng quan tài liệu
Đánh giá tác động hỗ trợ tài chính giáo dục; thiết kế gián đoạn hồi quy.

## Bước 3 — Thu thập dữ liệu

| Vai trò | Biến | Mô tả |
| :--- | :--- | :--- |
| Biến chạy | `diem_xet` | điểm xét tuyển (running variable) |
| Ngưỡng | `cutoff` | điểm chuẩn cấp học bổng |
| Can thiệp | `hoc_bong` | 1 nếu nhận (sharp: điểm ≥ cutoff) |
| Kết quả | `gpa_sau` | GPA kỳ/năm sau |

## Bước 4 — Mô hình hóa

Chọn họ *Suy luận nhân quả* → **RDD** (sharp); khai báo biến chạy, ngưỡng, băng thông:

```mermaid
flowchart LR
    A["diem_xet"] --> B{"≥ cutoff?"}
    B -->|"Có"| C["Nhận học bổng"]
    B -->|"Không"| D["Không nhận"]
    C --> E["Bước nhảy của GPA tại cutoff = LATE"]
    D --> E
```

**Kết quả minh họa (định dạng — không phải kết quả thực):**

| | Giá trị |
| :--- | :--- |
| Bước nhảy GPA tại ngưỡng (LATE) | +0.18*** |
| Băng thông tối ưu | ±0.5 điểm |
| McCrary (p) | 0.42 (không thao túng ngưỡng) |

Diễn giải mẫu: học bổng làm **tăng GPA ~0.18** tại ngưỡng; kiểm định McCrary không bác bỏ ⇒ không có dấu hiệu thao túng điểm quanh ngưỡng. Tác động này là **cục bộ tại ngưỡng** (LATE).

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata" default>

```stata
* === Tác động học bổng — RDD ===
* cần cài: ssc install rdrobust

* Ước lượng RDD: bước nhảy GPA tại ngưỡng điểm xét = 50
rdrobust gpa score, c(50)

* Đồ thị RDD (scatter + đường khớp hai bên ngưỡng)
rdplot gpa score, c(50) p(1) ci(95)

* Chọn băng thông tối ưu
rdbwselect gpa score, c(50)
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# === Tác động học bổng — RDD ===

library(rdrobust)

# Ước lượng RDD: bước nhảy GPA tại ngưỡng = 50
rd <- rdrobust(y = df$gpa, x = df$score, c = 50)
summary(rd)

# Đồ thị RDD
rdplot(y = df$gpa, x = df$score, c = 50)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# === Tác động học bổng — RDD ===

from rdrobust import rdrobust, rdplot

# Ước lượng RDD: bước nhảy GPA tại ngưỡng = 50
result = rdrobust(y=df['gpa'], x=df['score'], c=50)
print(result)

# Đồ thị RDD
rdplot(y=df['gpa'], x=df['score'], c=50)
```

  </TabItem>
</Tabs>

## Bước 5 — Báo cáo
Xuất báo cáo + **đồ thị RDD** (scatter + đường khớp 2 bên ngưỡng) + **mã tái lập**.

## Video minh họa

<VideoTutorial
  title="Hướng dẫn chạy RDD trong EcoLab"
  src="https://www.youtube.com/embed/m3wyHeBOfUE"
/>

## Xem thêm
- [RDD](/ecolab/model/rdd) · [PSM](/ecolab/model/psm) · [DiD](/ecolab/model/did) · [Danh mục](/ecolab/model/group)

