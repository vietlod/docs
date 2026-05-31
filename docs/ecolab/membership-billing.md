---
title: Tài khoản & Thanh toán
sidebar_position: 4
---

# Quản lý Tài khoản, Khóa API & Thanh toán SePay

EcoLab cung cấp một giao diện quản trị trực quan tại mục **Cài đặt** để giúp bạn quản lý thông tin cá nhân, kiểm soát khóa API của các mô hình ngôn ngữ lớn (LLM), theo dõi hạn mức sử dụng và thực hiện nâng cấp tài khoản thông qua cổng chuyển khoản tự động SePay.

---

## 1. Quản lý Hồ sơ & Thống kê sử dụng

Tại thẻ **Hồ sơ (Profile)**, bạn có thể thực hiện:
*   Cập nhật họ tên, thông tin liên hệ và đổi mật khẩu tài khoản.
*   Xem gói dịch vụ hiện tại (Free, Premium, Academic Partner) và thời gian hết hạn.

Tại thẻ **Sử dụng Token (Token Usage)**, hệ thống thống kê trực quan mức độ tiêu thụ tài nguyên AI của bạn:
*   *Lượng Token tiêu thụ:* Số lượng token đầu vào (input tokens) và token đầu ra (output tokens) đã sử dụng.
*   *Chi phí ước tính:* Quy đổi lượng token đã dùng sang giá trị USD hoặc VND tương đương dựa trên bảng giá thực tế của nhà cung cấp LLM.
*   *Số lượt gọi API:* Số lượng kết nối thành công đến các dịch vụ AI theo thời gian thực.
*   Biểu đồ cột biểu diễn xu hướng tiêu thụ token theo ngày giúp bạn dễ dàng tối ưu hóa câu lệnh (prompts).

---

## 2. Cấu hình Khóa API (API Keys) của LLMs

Để kích hoạt đầy đủ các tính năng hỗ trợ của Tác tử AI trong suốt quy trình nghiên cứu, bạn cần cấu hình ít nhất một khóa API hợp lệ của một nhà cung cấp LLM.

### Hướng dẫn thiết lập
1.  Truy cập **Cài đặt → Khóa API (API Keys)**.
2.  Lựa chọn nhà cung cấp bạn có sẵn khóa:
    *   **DeepSeek:** Mô hình suy luận chính (reasoning engine), đặc biệt tối ưu cho phân tích cấu trúc toán học và logic kinh tế lượng.
    *   **OpenAI:** Các mô hình dòng GPT-4, có độ ổn định rất cao và xử lý đa tác vụ tốt.
    *   **Gemini (Google):** Dòng mô hình Flash, cho tốc độ phản hồi cực nhanh, phù hợp cho các tác vụ hỏi đáp thông thường.
    *   **Perplexity:** Mô hình tích hợp tìm kiếm web thời gian thực, phục vụ đắc lực cho bước Tìm kiếm bài báo học thuật.
    *   **OpenRouter:** Bộ tổng hợp (aggregator) giúp bạn truy cập hơn 400 mô hình nguồn mở khác nhau từ một cổng duy nhất.
3.  Dán khóa API của bạn vào ô nhập liệu và nhấn **Thêm**.
4.  Nhấn nút **Kiểm tra (Test Connection)**. Hệ thống sẽ gửi một câu lệnh kiểm tra ngắn để xác thực. Dấu tích xanh hiển thị nghĩa là khóa hoạt động chính xác.

> [!IMPORTANT]
> **Cam kết bảo mật:** Tất cả các khóa API do người dùng cung cấp đều được **mã hóa bất đối xứng ở mức cơ sở dữ liệu** trước khi lưu trữ. Khóa chỉ được giải mã tạm thời trong bộ nhớ RAM tại thời điểm gửi request đến máy chủ AI, đảm bảo tuyệt đối không bị rò rỉ.

---

## 3. Nâng cấp tài khoản qua Cổng thanh toán SePay

EcoLab tích hợp cổng thanh toán tự động qua **SePay** để hỗ trợ người dùng nâng cấp lên gói Premium hoặc mua thêm hạn mức token AI trực tiếp bằng chuyển khoản ngân hàng Việt Nam.

```
Người dùng chọn gói → Hệ thống tạo mã QR thanh toán kèm mã giao dịch → 
Chuyển khoản ngân hàng → SePay webhook thông báo → Hệ thống kích hoạt gói tức thì
```

### Các bước nâng cấp tài khoản
1.  Truy cập trang **Nâng cấp (Upgrade)** hoặc tab **Thanh toán**.
2.  Lựa chọn gói dịch vụ phù hợp với nhu cầu nghiên cứu của bạn (ví dụ: *Gói Tháng Academic*, *Gói Năm Professional*, hoặc *Mua thêm Hạn mức Token*).
3.  Hệ thống sẽ hiển thị một cửa sổ thanh toán chứa:
    *   **Mã QR thanh toán VietQR** (hỗ trợ quét nhanh trên mọi ứng dụng ngân hàng di động - Mobile Banking).
    *   **Thông tin chuyển khoản chi tiết:** Số tài khoản, Ngân hàng thụ hưởng, Số tiền chính xác và **Nội dung chuyển khoản** (chứa mã giao dịch duy nhất có định dạng dạng `ECOLABXXXXX`).
4.  Thực hiện chuyển khoản thông qua ứng dụng ngân hàng của bạn.
    *   > [!WARNING]
    *   Nếu chuyển khoản thủ công (không quét QR), **bạn phải nhập chính xác Nội dung chuyển khoản** được hiển thị. Đây là thông tin duy nhất để hệ thống khớp giao dịch tự động.
5.  Ngay khi ngân hàng xử lý thành công (thường từ 3 - 10 giây), SePay sẽ gửi webhook xác nhận về máy chủ EcoLab. Hệ thống sẽ tự động kích hoạt tài khoản Premium của bạn và hiển thị thông báo thành công trên màn hình mà không cần bạn phải tải lại trang.
