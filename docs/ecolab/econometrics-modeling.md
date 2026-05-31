---
title: Phân tích Định lượng
sidebar_position: 3
---

# Ước lượng & Mô hình hóa Kinh tế lượng

EcoLab hỗ trợ một hệ thống toàn diện gồm hơn 30 mô hình kinh tế lượng, phục vụ cho nhiều loại cấu trúc dữ liệu khác nhau (dữ liệu chéo, dữ liệu chuỗi thời gian, dữ liệu bảng). Phân hệ này được thiết kế để kết nối trực tiếp đến các bộ máy tính toán (execution engines) mạnh mẽ chạy bằng **Python**, **R** (thông qua cổng giao tiếp RMCP) và **Stata**.

---

## 1. Phân loại các mô hình hỗ trợ

Hệ thống phân chia các mô hình thành 5 nhóm chuyên sâu:

| Phân nhóm mô hình | Các mô hình cụ thể | Phạm vi ứng dụng |
| :--- | :--- | :--- |
| **Cổ điển & Regularization** | OLS (Bình phương nhỏ nhất), WLS (Trọng số), GLS (Tổng quát), Hồi quy Ridge, Lasso, Elastic Net | Mô hình cơ sở, phân tích hồi quy tuyến tính cổ điển và xử lý đa cộng tuyến bằng phương pháp chính quy hóa. |
| **Dữ liệu bảng (Panel Data)** | Fixed Effects (FE - Hiệu ứng cố định), Random Effects (RE - Hiệu ứng ngẫu nhiên), Between Estimator, GMM (Arellano-Bond, Blundell-Bond), IV/2SLS, 3SLS | Phù hợp với bộ dữ liệu theo dõi nhiều đơn vị (doanh nghiệp, quốc gia) qua nhiều năm. FE/RE giúp kiểm soát đặc điểm không quan sát được thay đổi theo cá thể. |
| **Chuỗi thời gian (Time Series)** | ARIMA, GARCH, EGARCH, VAR (Vector AutoRegression) | Phân tích dữ liệu tài chính, chu kỳ kinh tế vĩ mô và dự báo xu hướng tương lai. |
| **Biến phụ thuộc giới hạn & Biến đếm** | Logit, Probit, Tobit, Hồi quy Poisson, Hồi quy Negative Binomial (Nhị thức âm) | Hồi quy khi biến phụ thuộc có dạng nhị phân (0/1), bị chặn (censored) hoặc là số nguyên không âm. |
| **Suy luận nhân quả (Causal Inference)** | PSM (Ghép cặp điểm xu hướng), DiD (Sai phân trong sai phân), RDD (Thiết kế gián đoạn hồi quy), IV/2SLS | Đánh giá tác động của chính sách hoặc các sự kiện kinh tế lên đối tượng nghiên cứu, giảm thiểu tối đa hiện tượng nội sinh. |

---

## 2. Quy trình thực hiện hồi quy

1.  Tại phân hệ **Mô hình hóa (Modeling)**, nhấn nút **Thêm mô hình** để mở bảng cấu hình hồi quy.
2.  **Lựa chọn đặc tả mô hình:**
    *   Chọn nhóm mô hình và mô hình cụ thể (ví dụ: *Panel Data* → *Fixed Effects*).
    *   Chọn biến phụ thuộc ($Y$) từ danh sách các cột dữ liệu đã tải lên/truy xuất từ ECODATA.
    *   Chọn các biến độc lập và biến kiểm soát ($X_1, X_2, \dots, X_k$).
3.  **Cấu hình tham số nâng cao (Tùy chọn):**
    *   Đối với dữ liệu bảng: Chọn biến thực thể (Entity) và biến thời gian (Time).
    *   Đối với mô hình IV/2SLS: Chỉ định biến nội sinh và lựa chọn biến công cụ (Instrumental variables).
    *   Chọn cấu trúc sai số chuẩn: Homoskedastic (thường), Robust (vững), hoặc Clustered (theo cụm).
4.  Nhấn nút **Chạy mô hình** để gửi yêu cầu đến máy chủ tính toán.

---

## 3. Xem xét kết quả hồi quy

Kết quả tính toán được trả về ngay lập tức trên giao diện qua 4 thẻ nội dung:

### Thẻ Ước lượng (Estimation Table)
Hiển thị bảng báo cáo hệ số hồi quy chuẩn học thuật:
*   Hệ số hồi quy ($\beta$), Sai số chuẩn (Standard Error), giá trị kiểm định $t$-stat (hoặc $z$-stat) và giá trị $p$-value.
*   Các mức ý nghĩa thống kê được ký hiệu bằng dấu sao quen thuộc: `***` ($p < 0.01$), `**` ($p < 0.05$), `*` ($p < 0.1$).
*   Thống kê tóm tắt mô hình: Hệ số xác định $R^2$, Adj-$R^2$, thống kê kiểm định $F$-statistic, Log-Likelihood, tiêu chuẩn thông tin AIC và BIC.

### Thẻ Chẩn đoán khuyết tật (Diagnostics)
Tự động chạy các kiểm định thống kê cần thiết để đảm bảo mô hình không vi phạm các giả định cổ điển:
*   **Breusch-Pagan / White Test:** Kiểm định phương sai sai số thay đổi (Heteroskedasticity).
*   **Durbin-Watson / Ljung-Box Test:** Kiểm định tự tương quan của sai số (Autocorrelation).
*   **Jarque-Bera Test:** Kiểm định phân phối chuẩn của sai số.
*   **Hausman Test:** (Chỉ áp dụng cho dữ liệu bảng) Lựa chọn giữa mô hình Hiệu ứng cố định (FE) và Hiệu ứng ngẫu nhiên (RE).

### Thẻ Phân tích độ vững (Robustness)
Hỗ trợ kiểm tra độ tin cậy của kết quả hồi quy:
*   Chạy hồi quy trên các mẫu con (subsample analysis) để xem kết quả có bị thay đổi khi loại bỏ các quan sát biên.
*   Hồi quy với đặc tả thay thế (sử dụng biến đo lường thay thế hoặc thêm bớt các biến kiểm soát).

### Thẻ Mã tái lập (Replication Code)
Hệ thống tự động biên dịch và hiển thị mã nguồn hoàn chỉnh bằng **Python**, **R** hoặc **Stata** tương ứng để bạn có thể sao chép trực tiếp vào phần mềm cục bộ và chạy độc lập nhằm đối chiếu kết quả.
