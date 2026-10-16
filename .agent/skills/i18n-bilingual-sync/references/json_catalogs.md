# Quy chuẩn Quản lý Từ điển Dịch thuật JSON (Translation Catalogs)

## 1. Hệ thống Tệp JSON Đa ngôn ngữ trong Repository

1. **`i18n/en/docusaurus-plugin-content-docs/current.json`**:
   - Chứa bản dịch Tiếng Anh cho toàn bộ nhãn `category` trong 5 sidebars.
   - Định dạng khóa chuẩn:
     ```json
     {
       "sidebar.ecolabSidebar.category.Mô hình kinh tế lượng": {
         "message": "Econometric Models",
         "description": "The label for category Mô hình kinh tế lượng in sidebar ecolabSidebar"
       }
     }
     ```
2. **`i18n/en/code.json`**:
   - Chứa chuỗi dịch của Docusaurus theme và các thông báo mặc định.
3. **`src/i18n/vi.json` & `src/i18n/en.json`**:
   - Chứa từ điển song ngữ cho trang chủ (`src/pages/index.js`) và các custom React components (`src/components/`).
   - Mọi khóa thêm vào `src/i18n/vi.json` bắt buộc phải có khóa đối ứng trong `src/i18n/en.json`.
