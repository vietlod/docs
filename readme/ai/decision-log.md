# decision-log.md - Nhật ký Quyết định Thiết kế

Tài liệu này ghi lại các quyết định thiết kế hệ thống quan trọng, các phương án thay thế đã được cân nhắc, và lý do lựa chọn giải pháp hiện tại.

---

## Quyết định 1: Tích hợp 5 Ứng dụng trong 1 Docusaurus Instance

*   **Ngày quyết định**: 2026-05-31
*   **Trạng thái**: Đã thực thi (Active)
*   **Ngữ cảnh (Context)**: Người dùng muốn nâng cấp trang tài liệu hiện tại của EcoData thành cổng tài liệu hướng dẫn dùng chung cho 5 ứng dụng: EcoData, EcoLab, EcoLit, PDFHUB, và KEYWORDs.
*   **Các phương án cân nhắc**:
    *   *Phương án A (Docusaurus Multi-instance Docs)*: Cấu hình mỗi ứng dụng thành một instance tài liệu riêng biệt trong `docusaurus.config.js`. Cô lập route tốt nhưng cấu hình cực kỳ phức tạp, khó đồng bộ layout và tăng thời gian build.
    *   *Phương án B (Dùng 1 Doc Instance duy nhất - CHỌN)*: Di chuyển toàn bộ file của từng app vào các thư mục con trong `docs/` (`docs/ecodata/`, `docs/ecolab/`...), cấu hình `sidebars.js` với 5 sidebars độc lập, và sử dụng Navbar để hoán đổi sidebar động.
*   **Lý do lựa chọn**:
    *   Đơn giản hóa cấu hình hệ thống, dễ dàng duy trì một giao diện nhất quán cho tất cả các ứng dụng.
    *   Tối ưu hóa thời gian build tĩnh trên VPS, giảm đáng kể dung lượng bộ nhớ đệm.
    *   Dễ dàng bản địa hóa đa ngôn ngữ (i18n) cho tất cả các app tại một cấu trúc thư mục dịch chung.
*   **Hệ quả / Đánh đổi (Tradeoffs)**:
    *   Bắt buộc các file tài liệu của từng app phải nằm gọn trong thư mục con riêng biệt để tránh xung đột tên tệp.
    *   Phải cấu hình Navbar items dạng `docSidebar` trỏ chính xác tới ID sidebar tương ứng.

---

## Quyết định 2: Thay thế hoàn toàn tên miền PDFHub (.tech -> .vn)

*   **Ngày quyết định**: 2026-05-31
*   **Trạng thái**: Đã thực thi (Active)
*   **Ngữ cảnh (Context)**: Yêu cầu chuyển đổi tên miền truy cập ứng dụng PDFHub từ `https://pdfhub.tnsai.tech` sang tên miền chính thức mới là `https://pdfhub.tnsai.vn`.
*   **Các phương án cân nhắc**:
    *   *Phương án A (Chạy song song + Redirect)*: Giữ cấu hình Nginx cũ, cấu hình redirect 301 từ tên miền cũ sang tên miền mới.
    *   *Phương án B (Thay thế hoàn toàn - CHỌN)*: Tạo Virtual Host mới cho `pdfhub.tnsai.vn`, sửa cấu hình CORS và callback SSO trong `.env.prod`, chạy lại Docker container, và xóa bỏ hoàn toàn liên kết định tuyến cũ của `pdfhub.tnsai.tech`.
*   **Lý do lựa chọn**:
    *   Người dùng yêu cầu thay thế trực tiếp, không sử dụng redirect tự động trên Nginx để đơn giản hóa tài nguyên mạng.
    *   Tránh lãng phí chứng chỉ SSL Certbot cho các tên miền cũ không còn sử dụng.
    *   Giữ cho cấu hình reverse proxy Nginx trên VPS luôn tinh gọn, dễ quản lý.
*   **Hệ quả / Đánh đổi (Tradeoffs)**:
    *   Người dùng truy cập qua liên kết `.tech` cũ sẽ nhận lỗi không tìm thấy trang hoặc lỗi kết nối. Cần truyền thông và cập nhật link hướng dẫn sử dụng kịp thời.
