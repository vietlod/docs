# Quy ước Đặt tên Thư mục & Định tuyến URL (Slug Conventions)

## 1. Quyết định Chuẩn hóa Đường dẫn EcoLab (Durable Decision 2026-06-03)

Để nhất quán giữa cấu trúc tệp vật lý và định tuyến URL trên cả hai ngôn ngữ Tiếng Việt (`/`) và Tiếng Anh (`/en/`):
- **ĐÚNG**:
  - `docs/ecolab/model/group.md` -> URL: `/ecolab/model/group` và `/en/ecolab/model/group`
  - `docs/ecolab/model/<ten-mo-hinh>.md` -> URL: `/ecolab/model/<ten-mo-hinh>`
- **CẤM SỬ DỤNG LẠI (Deprecated Slugs)**:
  - `docs/ecolab/mo-hinh/` (đã thay bằng `model/`)
  - `docs/ecolab/mo-hinh/danh-muc.md` (đã thay bằng `model/group.md`)

## 2. Quy tắc Đặt tên Tệp tin Tài liệu Mới

- Chỉ sử dụng chữ cái thường ASCII (`a-z`), chữ số (`0-9`) và dấu gạch ngang (`-`).
- Không dùng dấu gạch dưới (`_`) hoặc ký tự có dấu tiếng Việt trong tên tệp/thư mục.
- Đối với các trang chứa React component nhúng (như `overview.mdx`), sử dụng phần mở rộng `.mdx` đồng nhất ở cả `docs/` và `i18n/en/`.
