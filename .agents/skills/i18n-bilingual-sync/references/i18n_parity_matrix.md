# Ma trận Đối xứng Thư mục Song ngữ (1:1 Directory Parity Matrix)

## 1. Ánh xạ Đường dẫn Vật lý (`vi` ↔ `en`)

| Ứng dụng | Đường dẫn Tiếng Việt (Mặc định `/`) | Đường dẫn Tiếng Anh (`/en/`) |
| :--- | :--- | :--- |
| **EcoData** | `docs/ecodata/**` | `i18n/en/docusaurus-plugin-content-docs/current/ecodata/**` |
| **EcoLab** | `docs/ecolab/**` | `i18n/en/docusaurus-plugin-content-docs/current/ecolab/**` |
| **EcoLit** | `docs/ecolit/**` | `i18n/en/docusaurus-plugin-content-docs/current/ecolit/**` |
| **PDFHub** | `docs/pdfhub/**` | `i18n/en/docusaurus-plugin-content-docs/current/pdfhub/**` |
| **KEYWORDs** | `docs/keywords/**` | `i18n/en/docusaurus-plugin-content-docs/current/keywords/**` |

## 2. Quy tắc Đồng bộ Phần mở rộng (`.md` vs `.mdx`)

- Nếu tệp gốc ở `docs/` dùng `.mdx` (ví dụ `docs/ecodata/overview.mdx`), tệp tương ứng ở `i18n/en/` cũng bắt buộc phải là `.mdx` (`i18n/en/docusaurus-plugin-content-docs/current/ecodata/overview.mdx`).
- Không được để tồn tại song song cả `file.md` và `file.mdx` trong cùng một thư mục vì sẽ gây xung đột định tuyến trùng lặp (Duplicate routes) khi biên dịch.
