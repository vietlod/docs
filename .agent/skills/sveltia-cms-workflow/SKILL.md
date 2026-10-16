---
name: sveltia-cms-workflow
description: >
  Quản lý cấu hình Sveltia CMS (TNS AI Docs tại /admin/), định nghĩa collections cho 5 ứng dụng
  song ngữ trong static/admin/config.yml, giao diện static/admin/index.html, và luồng xác thực
  GitHub OAuth Proxy (port 3050). Kích hoạt khi thêm thư mục collection mới vào CMS, cập nhật
  schema trường frontmatter, sửa lỗi đăng nhập OAuth /admin/, hoặc kiểm tra cấu hình quản trị nội dung.
  Không dùng cho việc biên dịch công thức toán học LaTeX hay cấu hình database của các ứng dụng khác.
---

# Hướng dẫn Quản trị Sveltia CMS & GitHub OAuth Proxy

## 1. Nguyên tắc Cốt lõi (Core Principles)
- **Kiến trúc Static Headless CMS**: Trang quản trị TNS AI Docs tại `https://docs.tnsai.vn/admin/` sử dụng **Sveltia CMS** (`static/admin/index.html` + `static/admin/config.yml`), ghi trực tiếp commit vào nhánh `main` của repo `vietlod/docs` trên GitHub mà không cần cơ sở dữ liệu riêng.
- **Tích hợp OAuth Proxy Nội bộ (`127.0.0.1:3050`)**: Khối `backend` trong `static/admin/config.yml` bắt buộc giữ nguyên `base_url: https://docs.tnsai.vn` và `auth_endpoint: oauth/auth` để định tuyến qua tiến trình PM2 `docs-oauth-proxy` (cổng 3050).
- **Khớp Định dạng Tệp Theo Ứng dụng**: Các collections của EcoData sử dụng `extension: "mdx"`, trong khi các collections chuẩn của EcoLab, EcoLit, PDFHub, KEYWORDs sử dụng `extension: "md"` (trừ trang overview nếu dùng component). Mọi đường dẫn `folder:` trong `config.yml` phải tồn tại thực tế trong repository.

## 2. Quy trình Thực hiện (Progressive Workflow)
1. **Chạy kịch bản kiểm tra tính toàn vẹn của `static/admin/config.yml` và `index.html`**:
   ```bash
   python .agents/skills/sveltia-cms-workflow/scripts/verify_cms.py
   ```
2. **Tham chiếu quy chuẩn khai báo Collections & YAML Anchors**: Đọc [`references/cms_collections.md`](references/cms_collections.md) khi cần mở rộng danh mục quản trị bài viết trên `/admin/`.
3. **Tham chiếu kiến trúc dịch vụ `docs-oauth-proxy` (port 3050)**: Đọc [`references/oauth_proxy_flow.md`](references/oauth_proxy_flow.md) khi chẩn đoán sự cố đăng nhập GitHub OAuth.
