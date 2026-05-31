# testing-strategy.md - Chiến lược Kiểm thử Chất lượng Docs

Tài liệu này định nghĩa tiêu chuẩn và quy trình kiểm thử bắt buộc nhằm đảm bảo trang tài liệu `docs.tnsai.vn` đạt chất lượng học thuật cao, ổn định, hiển thị hoàn hảo trên mọi thiết bị và đồng bộ đa ngôn ngữ 100%.

---

## 1. Các cấp độ Kiểm thử (Testing Levels)

### Cấp độ 1: Kiểm định Biên dịch tĩnh (Compilation Verification)
*   **Mục tiêu**: Đảm bảo toàn bộ mã nguồn Docusaurus, cấu trúc sidebar và cú pháp Markdown/MDX không có lỗi.
*   **Lệnh thực hiện (Local)**:
    *   Build bản Tiếng Việt: `npm run build`
    *   Build bản Tiếng Anh: Docusaurus tự động biên dịch chéo trong quá trình build nếu cấu hình i18n chuẩn.
*   **Tiêu chuẩn đạt (DoD)**: Console không báo lỗi (Error) và Docusaurus hoàn thành tạo thư mục `build/` mà không có cảnh báo về liên kết hỏng (Broken links).

### Cấp độ 2: Kiểm định Đa ngôn ngữ (i18n Coverage Check)
*   **Mục tiêu**: Đảm bảo mọi bài viết, nhãn danh mục, thanh điều hướng và chân trang đều được dịch 100% sang cả tiếng Anh và tiếng Việt.
*   **Yêu cầu kiểm tra**:
    *   Cấu trúc thư mục của bản dịch tiếng Anh tại `i18n/en/docusaurus-plugin-content-docs/current/` phải khớp chính xác cấu trúc thư mục của `docs/` gốc.
    *   Mỗi tệp `.md` hoặc `.mdx` mới tạo ở bản tiếng Việt bắt buộc phải có tệp dịch tương ứng cùng tên và cùng đường dẫn tương đối trong thư mục tiếng Anh.
    *   Mọi text giao diện cố định phải được định nghĩa trong `i18n/en/code.json`.

### Cấp độ 3: Kiểm định Giao diện Responsive (UI/UX Mobile)
*   **Mục tiêu**: Đảm bảo khả năng hiển thị xuất sắc của trang web trên thiết bị di động, đặc biệt với các bảng dữ liệu lớn và sơ đồ Mermaid.
*   **Yêu cầu kỹ thuật**:
    *   Bảng biểu lớn (như danh sách các họ mô hình Econometrics) phải có thanh cuộn ngang để không làm vỡ layout trang.
    *   Sơ đồ Mermaid phải được cấu hình tự động co giãn hoặc có cuộn trang để hiển thị rõ chữ trên màn hình nhỏ.
    *   Các đoạn code mẫu phải hiển thị thanh cuộn ngang độc lập khi dòng code quá dài.

---

## 2. Checklist Nghiệm thu (Definition of Done)

Trước khi đẩy thay đổi từ local lên VPS hoặc bàn giao cho người dùng, AI Agent phải tự kiểm tra:
- [ ] Lệnh `npm run build` chạy thành công không lỗi ở local.
- [ ] Không có bất kỳ cảnh báo nào về "Broken link" hoặc "Link pointing to invalid document".
- [ ] Tất cả 5 tab ứng dụng trên Navbar đều hiển thị đúng sidebar tương ứng khi click.
- [ ] Đã dịch đầy đủ 100% nội dung bài viết và nhãn danh mục sidebar sang tiếng Anh.
- [ ] Các công thức toán học LaTeX được định dạng an toàn, không chứa ký tự ngoặc nhọn `{}` trần.
- [ ] Bản build tĩnh trên VPS hoạt động mượt mà qua giao thức HTTPS.
