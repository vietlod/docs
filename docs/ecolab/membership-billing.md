---
title: Tài khoản & Thanh toán
sidebar_position: 4
description: Hướng dẫn quản lý hồ sơ, khóa API cá nhân (BYOK AI, Semantic Scholar, CORE, MCP Access Token) và nâng cấp gói thành viên trên EcoLab.
---

# Quản lý tài khoản, khóa API cá nhân & thanh toán

EcoLab (`v1.5.0`) cung cấp trung tâm quản lý tập trung tại mục **Cài đặt** giúp nhà nghiên cứu kiểm soát hồ sơ học thuật, khóa API cá nhân cho mô hình ngôn ngữ lớn, khóa cơ sở dữ liệu học thuật mở rộng, khóa kết nối MCP và gói thành viên.

---

## 1. Quản lý hồ sơ & thống kê sử dụng

Tại thẻ **Hồ sơ (Profile)**, bạn có thể:
- Cập nhật họ tên, đơn vị công tác, email liên hệ và mật khẩu bảo mật.
- Theo dõi gói thành viên hiện tại, hạn mức dự án và thời hạn hiệu lực.

Tại thẻ **Sử dụng tài nguyên (Usage Analytics)**, hệ thống hiển thị minh bạch:
- Lượng token đầu vào và đầu ra theo từng giai đoạn của quy trình nghiên cứu 5 bước.
- Lịch sử phiên ước lượng kinh tế lượng và xuất bản thảo học thuật theo ngày.

---

## 2. Cấu hình ba nhóm khóa cá nhân (BYOK, Học thuật & MCP)

Tại mục **Cài đặt → Khóa API**, EcoLab tách bạch ba nhóm khóa cá nhân để tối đa hóa quyền tự chủ của nhà nghiên cứu:

1. **Khóa nhà cung cấp AI cá nhân (BYOK AI Providers):**
   - Hỗ trợ kết nối khóa cá nhân từ các nhà cung cấp mô hình ngôn ngữ lớn phổ biến (**Google Gemini**, **OpenAI**, **Anthropic Claude**, **Perplexity**, **OpenRouter** và các cổng tương thích chuẩn OpenAI) kèm nút **Kiểm tra kết nối** trực tiếp.
2. **Khóa cơ sở dữ liệu học thuật cá nhân (Scholarly Literature Keys):**
   - Bốn nguồn học thuật mở (**OpenAlex**, **Crossref**, **DOAJ**, **arXiv**) hoạt động sẵn 100% không cần khóa.
   - Người dùng có thể lưu thêm khóa cá nhân **Semantic Scholar** và **CORE** kèm nút kiểm tra trực tiếp (`Probe`) để mở khóa trọn vẹn **6/6 nguồn tổng hợp tài liệu** với hạn mức truy vấn riêng biệt.
3. **Khóa truy cập EcoLab MCP (`Personal MCP Access Tokens`):**
   - Cấp phát, xoay vòng và thu hồi mã truy cập cá nhân để kết nối trực tiếp trợ lý AI (Gemini Task, AntiGravity, Claude Code, Codex, Cursor) vào cổng **`https://ecolab.io.vn/mcp`** dưới cơ chế khóa cứng `server_llm_calls == 0`.

:::info[Bảo mật mã hóa khóa cá nhân]
Toàn bộ khóa API do người dùng lưu trữ đều được **mã hóa đối xứng chuẩn Fernet (AES-128-CBC + HMAC-SHA256)** trước khi ghi xuống cơ sở dữ liệu, chỉ hiển thị phần hậu tố nhận diện trên giao diện và chỉ giải mã tạm thời trong bộ nhớ RAM đúng tại thời điểm thực thi yêu cầu của chính chủ sở hữu khóa.
:::

---

## 3. Nâng cấp gói thành viên qua cổng thanh toán tự động

EcoLab tích hợp thanh toán chuyển khoản ngân hàng tự động qua **SePay** (mã VietQR) và cổng thanh toán trực tuyến để nâng cấp gói thành viên nghiên cứu:

```text
Chọn gói thành viên -> Hệ thống sinh mã VietQR kèm nội dung định danh giao dịch duy nhất ->
Quét mã chuyển khoản trên ứng dụng ngân hàng -> Webhook xác thực tự động -> Kích hoạt gói tức thì
```

1. Mở trang **Nâng cấp gói** hoặc thẻ **Thanh toán** trong mục **Cài đặt**.
2. Lựa chọn gói thành viên phù hợp với nhu cầu nghiên cứu cá nhân hoặc nhóm nghiên cứu.
3. Quét **mã QR thanh toán VietQR** trên ứng dụng Mobile Banking để tự động điền chính xác số tiền và mã định danh giao dịch.

:::warning[Lưu ý khi chuyển khoản thủ công]
Nếu nhập tay thông tin chuyển khoản thay vì quét mã VietQR, bạn cần **giữ nguyên chính xác chuỗi Nội dung chuyển khoản** hiển thị trên màn hình để hệ thống đối soát và kích hoạt quyền truy cập tự động trong vài giây.
:::
