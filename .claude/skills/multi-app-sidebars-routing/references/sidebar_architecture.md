# Bản đồ Kiến trúc 5 Sidebars & Cơ chế Hoán đổi Động

## 1. Ánh xạ Navbar sang Sidebars (`docusaurus.config.js` ↔ `sidebars.js`)

| Ứng dụng | Khóa Sidebar trong `sidebars.js` | Thư mục gốc (`docs/`) | Trang đích mặc định |
| :--- | :--- | :--- | :--- |
| **EcoData** | `ecodataSidebar` | `docs/ecodata/` | `/ecodata/overview` |
| **EcoLab** | `ecolabSidebar` | `docs/ecolab/` | `/ecolab/overview` |
| **EcoLit** | `ecolitSidebar` | `docs/ecolit/` | `/ecolit/overview` |
| **PDFHub** | `pdfhubSidebar` | `docs/pdfhub/` | `/pdfhub/overview` |
| **KEYWORDs** | `keywordsSidebar` | `docs/keywords/` | `/keywords/overview` |

## 2. Quy tắc Khai báo Doc ID trong `sidebars.js`

- Mọi chuỗi doc ID trong `sidebars.js` (ví dụ: `'ecolab/model/ols'`) phải khớp chính xác với một tệp `.md` hoặc `.mdx` tại `docs/ecolab/model/ols.md(x)` **và** tại `i18n/en/docusaurus-plugin-content-docs/current/ecolab/model/ols.md(x)`.
- Khi thêm một `category` mới trong `sidebars.js`, bắt buộc bổ sung bản dịch nhãn tương ứng vào `i18n/en/docusaurus-plugin-content-docs/current.json` với khóa `sidebar.<sidebarName>.category.<Label>`.
