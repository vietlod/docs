---
name: ui-theme-components
description: >
  Chuẩn hóa thiết kế giao diện học thuật tối giản sang trọng (Premium Academic Style) trong
  src/css/custom.css, quản lý các React/SVG components tại src/components/ và trang chủ src/pages/index.js,
  đồng thời đảm bảo hiển thị responsive cho bảng dữ liệu kinh tế lượng lớn và sơ đồ Mermaid trên di động.
  Kích hoạt khi chỉnh sửa giao diện Sáng/Tối (Light/Dark mode), thêm React component mới, hoặc kiểm định
  chất lượng UI/UX. Không dùng cho việc cấu hình máy chủ VPS hay quản trị biến môi trường.
---

# Hướng dẫn Thiết kế Giao diện Học thuật & React Components (UI Theme & Components)

## 1. Nguyên tắc Cốt lõi (Core Principles)
- **Phong cách Tối giản Học thuật (Premium Academic Style)**: Toàn bộ 5 ứng dụng trên `docs.tnsai.vn` dùng chung hệ thống biến CSS (`--ifm-color-primary*`, `--ifm-font-family-base`) tại `src/css/custom.css`, hỗ trợ mượt mà cả chế độ Sáng (`:root`) và Tối (`[data-theme='dark']`).
- **Tương thích Di động (Responsive Mobile First)**:
  - Các bảng biểu lớn (danh mục họ mô hình kinh tế lượng, bảng chỉ tiêu vĩ mô) bắt buộc có cơ chế cuộn ngang (`overflow-x: auto`) để không làm vỡ khung nhìn di động.
  - Sơ đồ Mermaid và các khối SVG động (`src/components/EcoDataSvg/`) phải co giãn theo `viewBox` và sử dụng CSS Module độc lập (`*.module.css`).
- **Đăng ký MDX Toàn cục An toàn**: Các component dùng chung trong bài viết được đăng ký tại `src/theme/MDXComponents.js` hoặc import tường minh ở đầu tệp `.mdx`.

## 2. Quy trình Thực hiện (Progressive Workflow)
1. **Chạy kịch bản kiểm tra tính toàn vẹn của CSS, React components và theme**:
   ```bash
   python .agents/skills/ui-theme-components/scripts/verify_ui_build.py
   ```
2. **Tham chiếu hệ thống Design Tokens & Dark Mode**: Đọc [`references/theme_tokens.md`](references/theme_tokens.md) khi tinh chỉnh màu sắc, typography hoặc thẻ bài (cards).
3. **Tham chiếu quy chuẩn Responsive cho Bảng, Mermaid & SVG**: Đọc [`references/responsive_tables_mermaid.md`](references/responsive_tables_mermaid.md) khi xây dựng component trực quan hóa mới.
