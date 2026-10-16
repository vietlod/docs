---
name: multi-app-sidebars-routing
description: >
  Quản lý kiến trúc 1 Docusaurus Instance tích hợp 5 Sidebars độc lập (ecodataSidebar, ecolabSidebar,
  ecolitSidebar, pdfhubSidebar, keywordsSidebar) trong sidebars.js và docusaurus.config.js, đồng thời
  duy trì quy chuẩn định tuyến URL tiếng Anh (model/, group/). Kích hoạt khi thêm bài viết mới,
  cập nhật cấu trúc danh mục sidebar, sửa đổi thanh điều hướng Navbar, hoặc kiểm tra lỗi broken links.
  Không dùng cho việc chỉnh sửa nội dung chi tiết bên trong từng bài viết hay cấu hình máy chủ VPS.
---

# Hướng dẫn Kiến trúc 5-App Sidebars & Định tuyến URL

## 1. Nguyên tắc Cốt lõi (Core Principles)
- **Kiến trúc 1 Instance - 5 Sidebars Cô lập**: Cổng tài liệu `docs.tnsai.vn` vận hành trên một Docusaurus instance duy nhất nhưng phân tách hoàn toàn 5 không gian tài liệu (`ecodata`, `ecolab`, `ecolit`, `pdfhub`, `keywords`) thông qua `type: 'docSidebar'` trên Navbar trong `docusaurus.config.js`.
- **Cấu trúc Mở đầu Chuẩn**: Mỗi sidebar bắt buộc mở đầu bằng trang `<app>/overview` và danh mục **`Bắt đầu`** (`collapsed: false`).
- **Chuẩn hóa Đường dẫn URL (Slug Standardization)**: Sử dụng tên thư mục chuẩn tiếng Anh cho các mô hình học thuật của EcoLab (`ecolab/model/`, `ecolab/model/group`). Tuyệt đối không tạo lại các thư mục không dấu kiểu cũ (`mo-hinh/`, `danh-muc/`).

## 2. Quy trình Thực hiện (Progressive Workflow)
1. **Chạy kịch bản kiểm chứng toàn bộ liên kết doc IDs trong `sidebars.js` và `docusaurus.config.js`**:
   ```bash
   python .agents/skills/multi-app-sidebars-routing/scripts/verify_routing.py
   ```
2. **Tham chiếu bản đồ ánh xạ 5 ứng dụng & Navbar**: Đọc [`references/sidebar_architecture.md`](references/sidebar_architecture.md) trước khi thêm/xóa mục trong `sidebars.js`.
3. **Tham chiếu quy ước đặt tên đường dẫn (slug)**: Đọc [`references/slug_conventions.md`](references/slug_conventions.md) khi tạo thư mục hoặc tệp tài liệu mới.
