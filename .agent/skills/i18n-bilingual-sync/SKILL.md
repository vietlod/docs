---
name: i18n-bilingual-sync
description: >
  Đảm bảo tính đối xứng song ngữ 100% (1:1 parity) giữa tài liệu gốc Tiếng Việt (docs/) và bản dịch
  Tiếng Anh (i18n/en/docusaurus-plugin-content-docs/current/), đồng thời kiểm soát từ điển giao diện
  JSON (i18n/en/code.json, current.json, src/i18n/). Kích hoạt khi tạo bài viết mới, dịch thuật nội dung,
  cập nhật nhãn danh mục sidebar, hoặc kiểm định độ phủ đa ngôn ngữ trước khi build.
  Không dùng cho việc cấu hình máy chủ Nginx hay quản trị container Docker trên VPS.
---

# Hướng dẫn Đồng bộ Song ngữ Việt - Anh (i18n Bilingual Sync)

## 1. Nguyên tắc Cốt lõi (Core Principles)
- **Đối xứng Tệp tin Tuyệt đối (1:1 File Parity)**: Mọi tệp `.md` hoặc `.mdx` tại `docs/<app>/<path>` bắt buộc phải có tệp bản dịch Tiếng Anh tương ứng cùng tên và cùng phần mở rộng tại `i18n/en/docusaurus-plugin-content-docs/current/<app>/<path>`.
- **Đồng bộ Từ điển Giao diện & Sidebar JSON**:
  - Nhãn danh mục của 5 sidebars Tiếng Anh được định nghĩa trong `i18n/en/docusaurus-plugin-content-docs/current.json`.
  - Chuỗi văn bản cố định của theme/trang chủ được quản lý tại `i18n/en/code.json`, `src/i18n/vi.json`, và `src/i18n/en.json`.
- **Bảo toàn Cấu trúc Frontmatter & Component**: Khi dịch sang Tiếng Anh, chỉ dịch giá trị của `title`, `sidebar_label`, `description` và nội dung văn bản; tuyệt đối giữ nguyên khóa `id`, `slug`, `sidebar_position` và cấu trúc import React component (đổi prop `locale="vi"` thành `locale="en"` nếu có).

## 2. Quy trình Thực hiện (Progressive Workflow)
1. **Chạy kịch bản kiểm định đối xứng song ngữ 1:1 và cú pháp JSON**:
   ```bash
   python .agents/skills/i18n-bilingual-sync/scripts/verify_i18n.py
   ```
2. **Tham chiếu ma trận đối xứng thư mục song ngữ**: Đọc [`references/i18n_parity_matrix.md`](references/i18n_parity_matrix.md) khi thêm tài liệu mới cho bất kỳ ứng dụng nào trong 5 ứng dụng.
3. **Tham chiếu cấu trúc tệp từ điển JSON**: Đọc [`references/json_catalogs.md`](references/json_catalogs.md) khi thêm category mới vào `sidebars.js` hoặc chỉnh sửa giao diện trang chủ.
