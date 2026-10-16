# Hệ thống Design Tokens & Quy chuẩn Light/Dark Mode

## 1. Cấu trúc Tệp Giao diện Trung tâm

- **`src/css/custom.css`**: Định nghĩa biến Infima (`--ifm-*`), bảng màu học thuật cho `:root` (Light Mode) và `[data-theme='dark']` (Dark Mode).
- **`src/pages/index.js` & `src/pages/index.module.css`**: Trang đích (Landing Page) giới thiệu hệ sinh thái 5 ứng dụng TNS AI.
- **`src/theme/MDXComponents.js`**: Ánh xạ các thẻ/component tùy chỉnh (`Available`, `FeatureNotAvailable`, `Steps`, `VideoTutorial`) cho toàn bộ bài viết.

## 2. Quy tắc Bảo toàn Tương phản Sáng/Tối

- Không gán cứng mã màu nền trắng (`#ffffff`) hoặc chữ đen (`#000000`) trực tiếp trong inline style của React component mà không có biến CSS chuyển đổi theo `[data-theme='dark']`.
- Luôn kiểm tra cân bằng dấu ngoặc nhọn `{}` trong mọi tệp `.css` và `.module.css` để tránh lỗi trình biên dịch PostCSS/CssMinimizer khi chạy `npm run build`.
