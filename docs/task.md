# Danh sách Task triển khai nâng cấp trang tài liệu (docs.tnsai.vn)

Tài liệu này dùng để theo dõi tiến độ thực hiện dự án nâng cấp trang tài liệu dùng chung `docs.tnsai.vn`.

---

## PHASE 1: CHUẨN BỊ VÀ KIẾN TRÚC DÙNG CHUNG (SHARED INFRASTRUCTURE)
- [ ] **Session 1.1: Tái cấu trúc thư mục tài liệu**
  - [ ] Task 1.1.1: Tạo các thư mục con trong `docs/` (`ecodata`, `ecolab`, `ecolit`, `pdfhub`, `keywords`).
  - [ ] Task 1.1.2: Di chuyển tài liệu EcoData cũ từ `docs/` vào `docs/ecodata/`.
  - [ ] Task 1.1.3: Di chuyển bản dịch tiếng Anh của EcoData từ `i18n/en/docusaurus-plugin-content-docs/current/` vào thư mục con `ecodata/`.
  - [ ] *Checkpoint 1.1: Cấu trúc thư mục được phân chia rõ ràng.*
- [ ] **Session 1.2: Cấu hình & Sidebar Docusaurus**
  - [ ] Task 1.2.1: Chỉnh sửa [sidebars.js](file:///d:/docs/sidebars.js) để tạo 5 sidebars độc lập cho 5 app.
  - [ ] Task 1.2.2: Sửa [docusaurus.config.js](file:///d:/docs/docusaurus.config.js) cập nhật domain `docs.tnsai.vn`, navbar logo & items dạng `docSidebar`.
  - [ ] *Checkpoint 1.2: Navbar hiển thị 5 tabs chuyển đổi sidebar chính xác.*

---

## PHASE 2: BIÊN SOẠN NỘI DUNG TÀI LIỆU HƯỚNG DẪN CÁC APP
- [ ] **Session 2.1: Biên soạn tài liệu cho EcoLab**
  - [ ] Task 2.1.1: Nghiên cứu codebase `D:\FLOW\EconLab` (RAG, Econometrics, Membership).
  - [ ] Task 2.1.2: Viết các file tiếng Việt trong `docs/ecolab/` (overview, RAG, Econometrics modeling, Membership billing).
  - [ ] Task 2.1.3: Dịch tài liệu EcoLab sang tiếng Anh trong `i18n/en/.../ecolab/`.
  - [ ] *Checkpoint 2.1: Hoàn thành tài liệu EcoLab song ngữ.*
- [ ] **Session 2.2: Biên soạn tài liệu cho EcoLit**
  - [ ] Task 2.2.1: Nghiên cứu codebase `D:\EconLit` (OpenAlex, Crossref, ORCID).
  - [ ] Task 2.2.2: Viết các file tiếng Việt trong `docs/ecolit/` (overview, OpenAlex search, Crossref metadata, ORCID integration).
  - [ ] Task 2.2.3: Dịch tài liệu EcoLit sang tiếng Anh trong `i18n/en/.../ecolit/`.
  - [ ] *Checkpoint 2.2: Hoàn thành tài liệu EcoLit song ngữ.*
- [ ] **Session 2.3: Biên soạn tài liệu cho PDFHUB**
  - [ ] Task 2.3.1: Nghiên cứu codebase `D:\PDFHUB` (Parser, LiteParse, Agentic RAG).
  - [ ] Task 2.3.2: Viết các file tiếng Việt trong `docs/pdfhub/` (overview, Parser engine, LiteParse prompt caching, Agentic RAG).
  - [ ] Task 2.3.3: Dịch tài liệu PDFHUB sang tiếng Anh trong `i18n/en/.../pdfhub/`.
  - [ ] *Checkpoint 2.3: Hoàn thành tài liệu PDFHUB song ngữ.*
- [ ] **Session 2.4: Biên soạn tài liệu cho KEYWORDs**
  - [ ] Task 2.4.1: Nghiên cứu codebase `D:\tools\fintech` (Crawler, SEO Analysis).
  - [ ] Task 2.4.2: Viết các file tiếng Việt trong `docs/keywords/` (overview, Crawler settings, Semantic analysis).
  - [ ] Task 2.4.3: Dịch tài liệu KEYWORDs sang tiếng Anh trong `i18n/en/.../keywords/`.
  - [ ] *Checkpoint 2.4: Hoàn thành tài liệu KEYWORDs song ngữ.*

---

## PHASE 3: TỐI ƯU HÓA UI/UX, ĐA NGÔN NGỮ & KIỂM THỬ
- [ ] **Session 3.1: Quản lý Đa ngôn ngữ (i18n) & Tránh Hardcode**
  - [ ] Task 3.1.1: Quét mã nguồn React và Docusaurus config để trích xuất text cứng.
  - [ ] Task 3.1.2: Cập nhật file dịch `code.json` cho cả tiếng Anh và tiếng Việt.
  - [ ] Task 3.1.3: Kiểm tra đồng bộ ngôn ngữ trên toàn trang.
  - [ ] *Checkpoint 3.1: Đảm bảo 100% text giao diện được dịch qua i18n.*
- [ ] **Session 3.2: Thiết kế UI/UX Premium & Responsive**
  - [ ] Task 3.2.1: Nâng cấp màu sắc HSL, Typography học thuật chuyên nghiệp trong `custom.css`.
  - [ ] Task 3.2.2: Tối ưu responsive (cuộn bảng biểu, hiển thị code block và Mermaid trên mobile).
  - [ ] *Checkpoint 3.2: Đạt độ hiển thị responsive và thẩm mỹ premium.*

## PHASE 4: TRIỂN KHAI VPS VÀ CẤU HÌNH DOMAIN MỚI
- [ ] **Session 4.1: Cấu hình VPS & Nginx**
  - [ ] Task 4.1.1: SSH vào VPS `31.97.110.12`.
  - [ ] Task 4.1.2: Tạo cấu hình Nginx virtual host cho `docs.tnsai.vn`.
  - [ ] Task 4.1.3: Cấu hình thư mục gốc trỏ về `/opt/docs/build`.
  - [ ] *Checkpoint 4.1: Reload Nginx thành công.*
- [ ] **Session 4.2: Thiết lập SSL & Deploy**
  - [ ] Task 4.2.1: Chạy Certbot cấp SSL cho domain `docs.tnsai.vn`.
  - [ ] Task 4.2.2: Biên dịch và tải mã nguồn build lên VPS.
  - [ ] Task 4.2.3: Kiểm tra E2E cuối cùng (HTTPS, tải trang, liên kết chéo).
  - [ ] *Checkpoint 4.2: Hệ thống chạy live ổn định và bảo mật.*
