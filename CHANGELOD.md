# CHANGELOD - Nhật ký Thay đổi Dự án (Changelog)

Tất cả các thay đổi đáng chú ý đối với dự án này sẽ được ghi nhận trong tệp này. Định dạng được dựa trên [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) và dự án tuân thủ [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [3.0.0] - 2026-05-31

### Added
*   **Hỗ trợ Multi-app**: Nâng cấp toàn diện trang hướng dẫn EcoData thành cổng tài liệu dùng chung cho 5 ứng dụng: EcoData, EcoLab, EcoLit, PDFHUB, và KEYWORDs.
*   **Sidebars Cô lập**: Cấu hình 5 Sidebars độc lập trong `sidebars.js` bắt đầu bằng danh mục "Bắt đầu" đặc thù cho từng ứng dụng.
*   **Giao diện Premium**: Tích hợp các component React tương tác động như `Highlights` và `EconometricsShowcase` (chứa SVG animation và citation switcher) trực tiếp tại trang chủ.
*   **i18n Tiếng Anh**: Dịch thuật đầy đủ 100% nội dung tài liệu hướng dẫn và nhãn giao diện sang tiếng Anh tại cấu trúc thư mục dịch `i18n/en/`.
*   **Hệ thống AI Governance**: Thiết lập 15 tệp tin hướng dẫn an toàn code, phân vai AI agent, và lập bản đồ phân bổ cổng/tên miền VPS (`vps-app-context.md`, `docker-map.md`, v.v.).
*   **Kỹ năng Claude Code**: Tạo skill tự động hóa tuân thủ quản trị tại `.claude/skills/repo-governance/SKILL.md`.

### Changed
*   **Tên miền truy cập**: Đổi domain chính thức từ `ecodata.tnsai.vn` sang `docs.tnsai.vn` trên máy chủ reverse proxy Nginx.
*   **Cấu trúc thư mục**: Di chuyển các tệp tài liệu cũ vào thư mục con `docs/ecodata/`.
*   **Tên miền PDFHub**: Thay đổi toàn bộ cấu hình reverse proxy, biến môi trường CORS và callback redirect SSO của ứng dụng PDFHub từ `pdfhub.tnsai.tech` sang `pdfhub.tnsai.vn`.

### Security
*   **Chứng chỉ SSL**: Cấp chứng chỉ Let's Encrypt SSL qua Certbot cho 2 domain mới: `docs.tnsai.vn` và `pdfhub.tnsai.vn`.

---

## [2.8.9] - 2026-01-09

### Fixed
*   **VNStock Ingestion 502 Bad Gateway**: Khắc phục triệt để lỗi phản hồi chậm gây treo kết nối Nginx khi tạm dừng hoặc hủy tiến trình cào dữ liệu:
    *   Thêm timeout bảo vệ (30-45 giây) cho các API gọi ngoài bằng `asyncio.wait_for()`.
    *   Chuyển đổi endpoint Pause/Cancel sang cơ chế Immediate Response (ghi nhận flag và trả về HTTP 200 OK ngay lập tức, tác vụ nền tự dừng sau đó).
    *   Giảm timeout của proxy admin Nginx từ 300 giây xuống 60 giây để tối ưu giải phóng kết nối.

### Added
*   Ghi nhận chi tiết quy trình khắc phục sự cố tại `deployment/502_fix_deployment_report_2026-01-09.md`.
*   Tạo script hỗ trợ deploy nhanh `scripts/deployment/deploy_502_fix.ps1`.

---

## [2.8.0] - 2025-12-25

### Added
*   Tích hợp công cụ vẽ biểu đồ Mermaid hỗ trợ trực quan hóa luồng dữ liệu của các chỉ số macro.
*   Bản địa hóa sơ bộ trang chủ sang tiếng Việt.

### Changed
*   Nâng cấp phiên bản Docusaurus core lên `3.9.2`.

---

## [1.0.0] - 2025-10-15

### Added
*   Bản phát hành đầu tiên (First Release) trang hướng dẫn sử dụng độc lập dành cho EcoData.
*   Hỗ trợ tài liệu hiển thị chỉ số macro Việt Nam và quốc tế.
