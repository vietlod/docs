# Quy tắc Phòng chống Lỗi Biên dịch Acorn MDX v3

## 1. Cơ chế Phân tích Cú pháp của MDX v3 (Docusaurus 3.8)

MDX v3 sử dụng trình phân tích cú pháp **Acorn** để biên dịch mọi cặp dấu ngoặc nhọn `{...}` nằm ngoài khối code và khối toán học thành biểu thức JavaScript (JSX).

### Các mẫu gây lỗi phổ biến và cách khắc phục:

| Mẫu gây lỗi (Làm gãy `npm run build`) | Nguyên nhân | Cách viết chuẩn xác |
| :--- | :--- | :--- |
| `Mô hình ARMA(p, q) với p \in {1, 2, 3}` | `{1, 2, 3}` bị Acorn hiểu là Object JS không hợp lệ, `\in` nằm ngoài math. | `Mô hình ARMA($p, q$) với $p \in \{1, 2, 3\}$` |
| `Biến phụ thuộc Y_{i,t} = \alpha_i + \beta X_{i,t}` | `{i,t}` nằm ngoài khối `$` làm Acorn báo lỗi cú pháp. | `$Y_{i,t} = \alpha_i + \beta X_{i,t}$` |
| `Đường dẫn C:\Users\admin\data` | `\U` và `\a` ngoài code block bị nuốt ký tự thoát. | `` `C:\Users\admin\data` `` |
| `So sánh p < 0.05 và t > 1.96` (kèm ký tự chữ ngay sau `<`) | `<0` đôi khi bị nhầm với thẻ mở HTML/JSX. | `$p < 0.05$` và `$t > 1.96$` |

## 2. Quy tắc Xử lý Khi Gặp Lỗi Build

Theo **Escalation Rule #3** trong `/Agents.md`:
- Nếu phát hiện lỗi cú pháp bao bọc (thiếu `$`, thiếu đóng ```` ``` ````), sửa ngay lập tức mà **không làm thay đổi nội dung toán học gốc**.
- Nếu công thức học thuật phức tạp bị xung đột cấu trúc bảng mà việc sửa có nguy cơ làm thay đổi ý nghĩa học thuật của mô hình kinh tế lượng, **bắt buộc dừng lại và xin ý kiến người dùng**.
