---
title: Hệ thống cầu tiêu dùng (AIDS, QUAIDS) & cầu cấu trúc Berry-BLP
sidebar_position: 13
description: Hướng dẫn ước lượng hệ thống cầu Deaton-Muellbauer AIDS, Banks-Blundell-Lewbel QUAIDS và mô hình cầu sản phẩm phân biệt Berry Logit IV / Random-Coefficients BLP trên EcoData và EcoLab.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Hệ thống cầu tiêu dùng (AIDS, QUAIDS) & cầu cấu trúc Berry-BLP

**Họ mô hình 13 (Tổ chức ngành cấu trúc & hệ thống cầu)** bao gồm các phương pháp ước lượng hệ thống tỷ trọng chi tiêu hộ gia đình và mô hình lựa chọn rời rạc sản phẩm phân biệt ở cấp thị trường. Nhóm phương pháp này là công cụ chuẩn mực trong kinh tế học phúc lợi, thuế tiêu dùng, khảo sát mức sống hộ gia đình (**VHLSS**) và phân tích cạnh tranh – sáp nhập doanh nghiệp.

Trong EcoLab, nhóm mô hình này nằm tại **Mô hình hóa → 13. Hệ thống cầu & BLP**. Xem thêm [Danh mục 15 họ mô hình](/ecolab/model/group).

---

## Khi nào nên dùng họ mô hình 13?

- **AIDS & QUAIDS:** Khi phân tích tỷ trọng ngân sách chi tiêu của hộ gia đình trên nhiều nhóm hàng hóa ($w_1, \dots, w_J$ có tổng bằng $1$), cần kiểm soát tính phi tuyến của đường cong Engel theo logarit tổng chi tiêu và ước lượng ma trận độ co giãn giá Marshallian / Hicksian thỏa mãn tiên đề lý thuyết cầu (cộng tổng, thuần nhất và đối xứng Slutsky).
- **Berry Logit IV & Random-Coefficients BLP:** Khi dữ liệu ở cấp độ thị trường – sản phẩm (thị phần $s_{jt}$, giá $p_{jt}$ và đặc tính sản phẩm $x_{jt}$), trong đó giá bán nội sinh với chất lượng không quan sát được $\xi_{jt}$ và người tiêu dùng có sở thích không đồng nhất đối với thuộc tính sản phẩm.

---

## Đặc tả toán học cốt lõi

### 1. Hệ thống cầu bậc hai QUAIDS (Banks, Blundell & Lewbel, 1997)

Tỷ trọng chi tiêu hàng hóa $i$ trong tổng chi tiêu $m$ được xác định bởi:

$$
w_i = \alpha_i + \sum_{j=1}^{J} \gamma_{ij} \ln p_j + \beta_i \ln \left[\frac{m}{a(\mathbf{p})}\right] + \frac{\lambda_i}{b(\mathbf{p})} \left\{\ln \left[\frac{m}{a(\mathbf{p})}\right]\right\}^2 + u_i
$$

với các ràng buộc lý thuyết cầu $\sum_i \alpha_i = 1$, $\sum_i \beta_i = \sum_i \lambda_i = 0$, $\sum_j \gamma_{ij} = 0$ và tính đối xứng $\gamma_{ij} = \gamma_{ji}$. Khi $\lambda_i = 0$ với mọi $i$, mô hình thu gọn về **AIDS** của Deaton & Muellbauer (1980).

### 2. Cầu sản phẩm phân biệt Berry Logit IV & BLP (Berry, Levinsohn & Pakes, 1995)

Độ thỏa dụng gián tiếp của người tiêu dùng $i$ đối với sản phẩm $j$ tại thị trường $t$:

$$
u_{ijt} = x_{jt} \bar{\beta} - \bar{\alpha} p_{jt} + \xi_{jt} + \mu_{ijt}(x_{jt}, p_{jt}, \nu_i; \Sigma) + \varepsilon_{ijt}
$$

- Trong **Berry (1994) Logit IV**, khi $\Sigma = 0$, phép biến đổi nghịch đảo thị phần đưa về phương trình tuyến tính $\ln(s_{jt}) - \ln(s_{0t}) = x_{jt}\bar{\beta} - \bar{\alpha} p_{jt} + \xi_{jt}$ ước lượng bằng biến công cụ (BLP instruments hoặc Hausman cost shifters).
- Trong **Random-Coefficients BLP**, ánh xạ co của Berry giải độ thỏa dụng trung bình $\delta_{jt}(s_t; \Sigma)$ và ước lượng tham số bằng GMM hai bước tối ưu.

---

## Giả định và kiểm định hậu ước lượng

1. **Ràng buộc lý thuyết tiêu dùng (AIDS/QUAIDS):** Kiểm định Wald cho tính thuần nhất bậc không và tính đối xứng ma trận Slutsky; kiểm định ý nghĩa thống kê của hệ số bậc hai $\lambda_i$ để quyết định QUAIDS so với AIDS.
2. **Nội sinh giá và sức mạnh biến công cụ (Berry/BLP):** Kiểm định công cụ yếu Kleibergen-Paap / Sanderson-Windmeijer first-stage $F$ và kiểm định quá định danh Hansen $J$ cho các biến công cụ BLP hoặc biến cú sốc chi phí.
3. **Tính hợp lý kinh tế của độ co giãn:** Độ co giãn giá riêng phải mang dấu âm ($\eta_{ii} < 0$) trên miền dữ liệu quan sát để biên lợi nhuận cân bằng Nash-Bertrand dương hợp lệ.

---

## Minh họa mã tái lập 3 ngôn ngữ

<Tabs groupId="lang">
  <TabItem value="stata" label="Stata 18 MP" default>

```stata
* === 1. Hệ thống cầu QUAIDS với biến nhân khẩu học ===
quaids w_food w_housing w_transport w_other, anot(10) ///
    prices(p_food p_housing p_transport p_other) ///
    expenditure(total_exp) demographics(hh_size urban)
estat expenditure, atmeans
estat uncompensated, atmeans

* === 2. Berry (1994) Logit Demand IV ===
gen log_share_ratio = ln(share) - ln(outside_share)
ivregress 2sls log_share_ratio x_quality x_size (price = cost_shifter blp_iv_other), vce(cluster market_id)
estat firststage
estat overid
```

  </TabItem>
  <TabItem value="r" label="R">

```r
# === 1. Hệ thống cầu AIDS / QUAIDS (micEconAids) ===
library(micEconAids)
aids_fit <- aidsEst(
  priceNames = c("p_food", "p_housing", "p_transport", "p_other"),
  shareNames = c("w_food", "w_housing", "w_transport", "w_other"),
  totExpName = "total_exp",
  data = df,
  method = "LA"
)
summary(aids_fit)
elas(aids_fit)

# === 2. Berry Logit Demand IV (fixest) ===
library(fixest)
df$log_share_ratio <- log(df$share) - log(df$outside_share)
berry_fit <- feols(log_share_ratio ~ x_quality + x_size | market_id | price ~ cost_shifter + blp_iv_other,
                   cluster = ~market_id, data = df)
summary(berry_fit)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# === Random-Coefficients BLP & Berry Logit IV (pyblp) ===
import pyblp

problem = pyblp.Problem(
    product_formulations=(
        pyblp.Formulation("1 + prices + x_quality + x_size"),
        pyblp.Formulation("0 + prices + x_quality"),
    ),
    product_data=product_df,
    integration=pyblp.Integration("halton", size=100),
)
results = problem.solve(sigma=[[0.5, 0.0], [0.0, 0.5]], method="2s")
elasticities = results.compute_elasticities()
markups = results.compute_markups()
print(results)
```

  </TabItem>
</Tabs>
