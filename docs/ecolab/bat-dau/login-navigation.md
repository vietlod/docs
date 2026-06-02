---
title: Đăng ký & Điều hướng
sidebar_position: 1
---

# Đăng ký, Đăng nhập & Tạo dự án

Chào mừng bạn đến với EcoLab. Hướng dẫn này giúp bạn thực hiện những bước đầu tiên để thiết lập tài khoản và khởi tạo một dự án nghiên cứu mới trên hệ thống.

---

## 1. Đăng ký & Đăng nhập

### Quy trình thực hiện
1.  Mở trình duyệt và truy cập vào địa chỉ domain của ứng dụng EcoLab (`https://ecolab.io.vn`).
2.  Trên màn hình trang chủ, nhấn nút **Bắt đầu nghiên cứu**.
3.  **Đăng ký tài khoản mới:**
    *   Nhập họ tên, địa chỉ email học thuật (khuyến nghị sử dụng email `.edu.vn` hoặc email tổ chức).
    *   Đặt mật khẩu bảo mật (tối thiểu 8 ký tự, bao gồm chữ hoa, chữ thường và chữ số).
    *   Nhấn **Đăng ký**.
4.  **Đăng nhập tài khoản:**
    *   Nhập email và mật khẩu đã đăng ký, sau đó nhấn **Đăng nhập**.
    *   Sau khi xác thực thành công, hệ thống sẽ tự động chuyển hướng bạn đến giao diện **Bảng điều khiển (Dashboard)**.

### Ràng buộc bảo mật hệ thống
Để bảo vệ tài nguyên tính toán AI và dữ liệu nghiên cứu của người dùng, hệ thống áp dụng các chính sách bảo mật sau:

*   **Giới hạn tần suất (Rate Limiting):** Nếu nhập sai mật khẩu quá 5 lần trong vòng 10 phút, hệ thống sẽ tạm khóa tài khoản để phòng chống tấn công dò mật khẩu (brute-force).
*   **Thời gian sống của Session (Token TTL):** Phiên đăng nhập (JWT token) có hiệu lực tối đa 8 giờ. Sau thời gian này, bạn cần đăng nhập lại.
*   **An toàn Cookie:** Session token được lưu trữ an toàn trong Cookie của trình duyệt với các thuộc tính bảo mật cao: `SameSite=Lax` và `Secure` (chỉ gửi qua kết nối mã hóa HTTPS).

---

## 2. Khởi tạo dự án nghiên cứu

Mọi hoạt động nghiên cứu, thu thập dữ liệu và chạy mô hình trong EcoLab đều bắt buộc phải được tổ chức bên trong các **Dự án (Projects)** để đảm bảo tính cô lập và quản lý ngữ cảnh.

### Hướng dẫn tạo dự án
1.  Tại giao diện Bảng điều khiển, nhấn nút **Tạo dự án mới** (New Project).
2.  Nhập **Tên dự án** (ví dụ: *Tác động của cấu trúc vốn đến hiệu quả kinh doanh của doanh nghiệp niêm yết*).
3.  Nhập **Mô tả dự án** (Tùy chọn - tóm tắt mục tiêu nghiên cứu).
4.  **Cài đặt ngôn ngữ nội dung (Content Language):** 
    *   Lựa chọn **Tiếng Việt** hoặc **Tiếng Anh** cho đầu ra AI.

    :::warning
    **Cài đặt này sẽ bị KHÓA vĩnh viễn** sau khi dự án được tạo. Ngôn ngữ nội dung này quyết định ngôn ngữ của tất cả các kết quả do AI trả về trong suốt quá trình nghiên cứu (ý tưởng, tóm tắt tài liệu, báo cáo).
    :::
5.  Nhấn nút **Tạo** để hoàn tất khởi tạo. Dự án mới sẽ tự động được chọn làm dự án đang hoạt động (Active Project).

---

## 3. Quản lý Vòng đời Dự án

Hệ thống cung cấp các công cụ quản lý dự án linh hoạt từ Bảng điều khiển hoặc tab **Cài đặt → Dự án**:

| Thao tác | Mô tả tính năng |
| :--- | :--- |
| **Lưu phiên bản (Version Snapshot)** | Tạo một ảnh chụp trạng thái nghiên cứu tại thời điểm hiện tại kèm nhãn mô tả. Tính năng này cực kỳ hữu ích trước khi bạn thực hiện các thay đổi lớn về biến số hoặc mô hình. |
| **Khôi phục phiên bản** | Quay ngược trạng thái dự án về một ảnh chụp đã lưu trước đó. Toàn bộ dữ liệu của các phân hệ sẽ quay về đúng thời điểm đó. |
| **Nhân bản dự án (Clone)** | Tạo ra một bản sao giống hệt dự án hiện tại (kế thừa toàn bộ dữ liệu cấu hình, bài báo học thuật và mô hình) để thử nghiệm các hướng tiếp cận hoặc mô hình kinh tế lượng khác. |
| **Lưu trữ dự án (Archive)** | Ẩn dự án đã hoàn thành khỏi danh sách hoạt động chính để làm gọn giao diện Bảng điều khiển. Dự án có thể khôi phục lại bất kỳ lúc nào từ cài đặt. |
| **Xóa vĩnh viễn (Delete)** | Xóa bỏ hoàn toàn dự án cùng tất cả dữ liệu liên quan khỏi cơ sở dữ liệu. Thao tác này không thể hoàn tác. |
