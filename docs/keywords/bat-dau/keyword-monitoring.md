---
title: Theo dõi Từ khóa
sidebar_position: 1
---

# Đăng nhập, Liên kết Google Drive & Quản lý Từ khóa

Hướng dẫn này giúp bạn đăng nhập hệ thống KEYWORDs, liên kết thư mục chứa báo cáo của bạn trên Google Drive và cấu hình tệp định nghĩa từ khóa tùy chỉnh.

---

## 1. Đăng nhập & Whitelist người dùng

Hệ thống sử dụng cơ chế đăng nhập một chạm qua **Google OAuth2** để bảo mật và tự động phân tách không gian làm việc:

1.  Truy cập vào giao diện ứng dụng KEYWORDs (`https://keywords.tnsai.vn`).
2.  Nhấp chọn **Đăng nhập bằng tài khoản Google (Sign in with Google)**.
3.  **Cơ chế danh sách trắng (Whitelist):**
    *   Để kiểm soát chi phí API và bảo vệ máy chủ, chỉ các địa chỉ email nằm trong Danh sách whitelist do quản trị viên phê duyệt (cấu hình trong cài đặt admin) mới có thể đăng nhập thành công.
    *   Địa chỉ email của quản trị viên (`ADMIN_EMAIL`) luôn được tự động cho phép đăng nhập.

---

## 2. Liên kết thư mục Google Drive chứa báo cáo

Để hệ thống tự động quét và tải về các tài liệu báo cáo của bạn:

1.  Mở Google Drive của bạn và tạo một thư mục riêng chứa các báo cáo cần phân tích (PDF, DOCX, XLSX, TXT).
2.  Sao chép **Mã định danh thư mục (Folder ID)** từ thanh địa chỉ trình duyệt. Mã Folder ID là chuỗi ký tự nằm sau cụm `folders/` (ví dụ: `1a2b3c4d5e6f7g8h9i0j...`).
3.  Trong ứng dụng KEYWORDs, mở bảng **Cài đặt (Settings)**.
4.  Tại trường **Google Drive Folder ID**, dán mã Folder ID của bạn vào.
5.  Nhấn **Lưu cài đặt**.
6.  Hệ thống sẽ chạy một kết nối thử nghiệm đến thư mục của bạn để đảm bảo quyền truy cập hợp lệ trước khi lưu.

---

## 3. Cấu hình tệp định nghĩa từ khóa (Keywords File)

Mỗi dự án trích xuất sẽ đếm từ khóa dựa trên tệp định nghĩa từ khóa hoạt động. Bạn có thể sử dụng tệp mặc định của hệ thống hoặc tự tải lên tệp của riêng mình:

### Sử dụng tệp từ khóa mặc định
Hệ thống tích hợp sẵn tệp `fintech_keywords.xlsx` chứa **331 từ khóa** song ngữ được chia sẵn vào 11 nhóm công nghệ tài chính tiêu chuẩn.

### Tải lên từ khóa tùy chỉnh
Nếu bạn muốn theo dõi các nhóm từ khóa khác (ví dụ: các từ khóa về *Phát triển bền vững - ESG*, hoặc *SEO Thương mại điện tử*):
1.  Truy cập **Cài đặt → Tệp từ khóa (Keywords File)**.
2.  Nhấn nút **Tải tệp mẫu (Download Template)** để tải về cấu trúc tệp Excel chuẩn đang được sử dụng trong tài khoản của bạn.
3.  Mở tệp bằng Excel và chỉnh sửa:
    *   **Sheet 1 (Metadata):** Định nghĩa tên dự án và mô tả.
    *   **Sheet 2 (Keywords List):** Cấu trúc gồm 2 cột chính: `Keyword` (từ khóa cần đếm) và `Category` (nhóm phân loại tương ứng). Bạn có thể thêm bao nhiêu dòng và nhóm tùy ý.
4.  Lưu tệp Excel lại.
5.  Trên giao diện cài đặt, nhấp chọn **Tải lên tệp mới (Upload New File)** và chọn tệp Excel vừa lưu.
6.  Hệ thống sẽ kiểm tra cấu trúc tệp. Nếu hợp lệ, tệp từ khóa này sẽ lập tức được áp dụng làm bộ từ khóa hoạt động trong không gian làm việc của bạn.
