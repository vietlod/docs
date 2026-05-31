# file-criticality-map.md - Bản đồ Độ Nhạy cảm của Tệp tin

Tài liệu này phân loại các tệp tin trong repository và trên VPS theo các mức độ nhạy cảm và rủi ro khi chỉnh sửa, giúp các AI Agent định vị vùng an toàn và tránh sửa nhầm các file cấu hình cốt lõi.

---

## 1. Phân nhóm Mức độ Nhạy cảm (Criticality Tiers)

```
+-----------------------------------------------------------------------+
|  CRITICAL (Rủi ro cực cao): docusaurus.config.js, sidebars.js,        |
|                            Nginx configs, .env.prod                   |
+-----------------------------------------------------------------------+
                                  |
+-----------------------------------------------------------------------+
|  MEDIUM (Rủi ro trung bình): custom.css, index.js, components,        |
|                             code.json                                 |
+-----------------------------------------------------------------------+
                                  |
+-----------------------------------------------------------------------+
|  LOW (An toàn chỉnh sửa): docs/*.md, docs/*.mdx, translations         |
+-----------------------------------------------------------------------+
```

---

## 2. Bản đồ Chi tiết các Tệp tin (Detailed File Matrix)

| Đường dẫn tệp tin | Mức độ nhạy cảm | Rủi ro khi chỉnh sửa | Biện pháp phòng ngừa / Quy tắc |
| :--- | :--- | :--- | :--- |
| **[`/docusaurus.config.js`](file:///d:/docs/docusaurus.config.js)** | **Critical** | Làm sập trang tài liệu, hỏng cấu hình i18n hoặc Navbar. | Luôn chạy `npm run build` ở local trước khi commit. Không tự ý thay đổi `baseUrl` hoặc cấu hình plugin. |
| **[`/sidebars.js`](file:///d:/docs/sidebars.js)** | **Critical** | Gây lỗi compilation hoặc làm biến mất toàn bộ sidebar định hướng bên trái. | Kiểm tra cú pháp JS, đảm bảo các ID tài liệu trỏ tới tồn tại thực tế. |
| **`/etc/nginx/sites-available/*`** (VPS) | **Critical** | Làm sập định tuyến, gây lỗi 502/404 hoặc mất SSL cho các ứng dụng vĩ mô trên VPS. | Luôn backup trước khi sửa. Bắt buộc chạy `nginx -t` trước khi reload. |
| **`/opt/pdfhub/.env.prod`** (VPS) | **Critical** | Gây lỗi CORS hoặc hỏng luồng đăng nhập SSO của PDFHub. | Kiểm tra kỹ URL callback redirect, restart container backend và worker sau khi sửa. |
| **[`/src/css/custom.css`](file:///d:/docs/src/css/custom.css)** | **Medium** | Phá vỡ bố cục giao diện học thuật (CSS layout), hỏng màu sắc hoặc font chữ. | Kiểm tra trên trình duyệt ở cả chế độ Dark mode và Light mode, màn hình máy tính và điện thoại. |
| **[`/src/pages/index.js`](file:///d:/docs/src/pages/index.js)** | **Medium** | Hỏng trang chủ chính của docs. | Đảm bảo các component nhúng vào hoạt động bình thường. |
| **[`/i18n/en/code.json`](file:///d:/docs/i18n/en/docusaurus-plugin-content-docs/current.json)** | **Medium** | Gây lỗi dịch thuật giao diện hoặc thiếu nhãn danh mục sidebar. | Chỉ chỉnh sửa nội dung chuỗi dịch, không đổi cấu trúc JSON key. |
| **`docs/**/*.md` / `docs/**/*.mdx`** | **Low** | Lỗi chính tả, hỏng liên kết trong bài viết (chỉ ảnh hưởng cục bộ). | Đảm bảo không vi phạm lỗi cú pháp LaTeX. |
| **`i18n/en/docusaurus-plugin-content-docs/**/*.md`** | **Low** | Bản dịch bị thiếu hoặc sai lệch. | Giữ cấu trúc thư mục đồng bộ với thư mục gốc `docs/`. |
