---
title: Bắt đầu & Xác thực
sidebar_position: 1
---

# Xác thực, Phân quyền & Quản lý API Key

Để bắt đầu khai thác kho tri thức học thuật khổng lồ của EcoLit, bạn cần thực hiện đăng nhập hệ thống và cấu hình hạn mức tài nguyên AI phù hợp.

---

## 1. Xác thực Google Sign In & Quản lý Quyền truy cập

EcoLit tích hợp giải pháp xác thực một chạm (Single Sign-On - SSO) thông qua tài khoản Google để đơn giản hóa quy trình đăng ký:

1.  Truy cập trang chủ EcoLit.
2.  Nhấn nút **Đăng nhập bằng Google (Sign in with Google)**.
3.  Hệ thống sẽ chuyển hướng sang màn hình xác thực bảo mật của Google. Chọn tài khoản email của bạn.
4.  Sau khi đăng nhập thành công, backend sẽ tự động kiểm tra và khởi tạo hồ sơ người dùng trong cơ sở dữ liệu PostgreSQL. Các tài khoản mới tạo sẽ được cấp gói **Starter** mặc định.

### Phân quyền dựa trên vai trò (RBAC - Role-Based Access Control)
Hệ thống phân quyền truy cập của người dùng thành 3 vai trò chính:
*   **Viewer:** Chỉ có quyền đọc (Read-only) - tìm kiếm bài báo và khám phá Đồ thị tri thức có sẵn, không được sử dụng AI Chatbot.
*   **Researcher (Mặc định):** Tìm kiếm bài báo, tương tác trực quan với Graph, sử dụng Trợ lý AI Chatbot và cấu hình API Key cá nhân.
*   **Admin:** Toàn quyền quản trị hệ thống - cấu hình quy tắc cào dữ liệu, quản lý tài khoản người dùng, thay đổi vai trò/gói dịch vụ và giám sát hóa đơn token.

---

## 2. Các gói dịch vụ & Hạn mức Token (AI Quota)

Để đảm bảo hiệu năng và kiểm soát chi phí tính toán AI, hệ thống áp dụng hạn mức sử dụng (token quota) hàng tháng:

| Gói dịch vụ (Plan) | Hạn mức Token/Tháng | Quyền truy cập AI Chat | Graph Explorer | Literature Search | Quyền Admin |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Starter** (Mặc định) | 50,000 tokens | ✅ (Có giới hạn lượt hỏi) | ✅ | ✅ | ❌ |
| **Pro** | 500,000 tokens | ✅ | ✅ | ✅ | ❌ |
| **Enterprise** | Không giới hạn | ✅ | ✅ | ✅ | ✅ |

*Hệ thống phân biệt rõ ràng giá trị của token đầu vào (input prompt) và token đầu ra (output completion) để trừ quota chính xác nhất.*

---

## 3. Cấu hình API Key cá nhân (User Settings)

Hệ thống mặc định sử dụng các mô hình chạy local qua bộ máy **Ollama** (như Qwen3-30B hoặc Phi-4) để xử lý tác vụ nhằm bảo mật tuyệt đối dữ liệu. Tuy nhiên, nếu bạn muốn nâng cao chất lượng câu trả lời hoặc khi máy chủ local bị quá tải, bạn có thể tự cấu hình API Key của các nhà cung cấp bên thứ ba:

### Các bước cấu hình
1.  Truy cập mục **Cài đặt (Settings) → Khóa API (API Keys)**.
2.  Tại đây, bạn sẽ thấy giao diện quản lý dạng thẻ (cards) cho từng nhà cung cấp: **OpenAI, Google Gemini, DeepSeek, và Anthropic (Claude)**.
3.  Nhấp vào liên kết *"Hướng dẫn lấy API Key"* để được dẫn tới trang console của nhà cung cấp.
4.  Dán mã khóa API vào ô nhập liệu (khóa sẽ được tự động ẩn bớt ký tự để bảo mật).
5.  Nhấn nút **Kiểm tra kết nối (Test Connection)**. Hệ thống sẽ gọi thử API. Khi hiển thị trạng thái `✅ Đã kết nối`, bạn có thể chọn mô hình mặc định và nhấn lưu.
6.  Bật tùy chọn **Đặt làm nhà cung cấp ưa thích (Set as preferred)** để hệ thống ưu tiên sử dụng API key này thay vì Ollama local.

> [!IMPORTANT]
> **Bảo mật mã hóa:** Khóa API của bạn được mã hóa bằng thuật toán **AES-256** trước khi ghi vào cơ sở dữ liệu PostgreSQL và chỉ được giải mã tạm thời trên bộ nhớ RAM khi gọi API.
