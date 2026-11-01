# decision-log.md - Nhật ký Quyết định Thiết kế

Tài liệu này ghi lại các quyết định thiết kế hệ thống quan trọng, các phương án thay thế đã được cân nhắc, và lý do lựa chọn giải pháp hiện tại.

---

## Quyết định 1: Tích hợp 5 Ứng dụng trong 1 Docusaurus Instance

*   **Ngày quyết định**: 2026-05-31
*   **Trạng thái**: Đã thực thi (Active)
*   **Ngữ cảnh (Context)**: Người dùng muốn nâng cấp trang tài liệu hiện tại của EcoData thành cổng tài liệu hướng dẫn dùng chung cho 5 ứng dụng: EcoData, EcoLab, EcoLit, PDFHUB, và KEYWORDs.
*   **Các phương án cân nhắc**:
    *   *Phương án A (Docusaurus Multi-instance Docs)*: Cấu hình mỗi ứng dụng thành một instance tài liệu riêng biệt trong `docusaurus.config.js`. Cô lập route tốt nhưng cấu hình cực kỳ phức tạp, khó đồng bộ layout và tăng thời gian build.
    *   *Phương án B (Dùng 1 Doc Instance duy nhất - CHỌN)*: Di chuyển toàn bộ file của từng app vào các thư mục con trong `docs/` (`docs/ecodata/`, `docs/ecolab/`...), cấu hình `sidebars.js` với 5 sidebars độc lập, và sử dụng Navbar để hoán đổi sidebar động.
*   **Lý do lựa chọn**:
    *   Đơn giản hóa cấu hình hệ thống, dễ dàng duy trì một giao diện nhất quán cho tất cả các ứng dụng.
    *   Tối ưu hóa thời gian build tĩnh trên VPS, giảm đáng kể dung lượng bộ nhớ đệm.
    *   Dễ dàng bản địa hóa đa ngôn ngữ (i18n) cho tất cả các app tại một cấu trúc thư mục dịch chung.
*   **Hệ quả / Đánh đổi (Tradeoffs)**:
    *   Bắt buộc các file tài liệu của từng app phải nằm gọn trong thư mục con riêng biệt để tránh xung đột tên tệp.
    *   Phải cấu hình Navbar items dạng `docSidebar` trỏ chính xác tới ID sidebar tương ứng.

---

## Quyết định 2: Thay thế hoàn toàn tên miền PDFHub (.tech -> .vn)

*   **Ngày quyết định**: 2026-05-31
*   **Trạng thái**: Đã thực thi (Active)
*   **Ngữ cảnh (Context)**: Yêu cầu chuyển đổi tên miền truy cập ứng dụng PDFHub từ `https://pdfhub.tnsai.tech` sang tên miền chính thức mới là `https://pdfhub.tnsai.vn`.
*   **Các phương án cân nhắc**:
    *   *Phương án A (Chạy song song + Redirect)*: Giữ cấu hình Nginx cũ, cấu hình redirect 301 từ tên miền cũ sang tên miền mới.
    *   *Phương án B (Thay thế hoàn toàn - CHỌN)*: Tạo Virtual Host mới cho `pdfhub.tnsai.vn`, sửa cấu hình CORS và callback SSO trong `.env.prod`, chạy lại Docker container, và xóa bỏ hoàn toàn liên kết định tuyến cũ của `pdfhub.tnsai.tech`.
*   **Lý do lựa chọn**:
    *   Người dùng yêu cầu thay thế trực tiếp, không sử dụng redirect tự động trên Nginx để đơn giản hóa tài nguyên mạng.
    *   Tránh lãng phí chứng chỉ SSL Certbot cho các tên miền cũ không còn sử dụng.
    *   Giữ cho cấu hình reverse proxy Nginx trên VPS luôn tinh gọn, dễ quản lý.
*   **Hệ quả / Đánh đổi (Tradeoffs)**:
    *   Người dùng truy cập qua liên kết `.tech` cũ sẽ nhận lỗi không tìm thấy trang hoặc lỗi kết nối. Cần truyền thông và cập nhật link hướng dẫn sử dụng kịp thời.

---

## Quyết định 3: Chuyển đổi sang 4 Ứng dụng Cốt lõi (EcoData, EcoLab, Finco, VietLOD) và Kiến trúc Zero-Downtime Atomic Build

*   **Ngày quyết định**: 2026-11-01
*   **Trạng thái**: Đã thực thi (Active)
*   **Ngữ cảnh (Context)**: Hệ sinh thái TNS AI tái cấu trúc cổng tài liệu `docs.tnsai.vn` để tập trung vào 4 nền tảng nghiên cứu định lượng và phân tích đầu tư cốt lõi (**EcoData**, **EcoLab**, **Finco**, **VietLOD**), loại bỏ 3 phân hệ phụ (`EcoLit`, `PDFHUB`, `KEYWORDs`) và mở rộng quy mô lên 724 trang MDX song ngữ (`362` VI + `362` EN).
*   **Các quyết định kỹ thuật**:
    1.  **Kiến trúc 550 trang MDX cho VietLOD**: Tự động hóa chuyển đổi 15 Chương $\to$ 58 Nhóm phương pháp $\to$ 201 Mô hình kinh tế lượng sang định dạng How-To MDX đối xứng 1:1 (`docs/vietlod/` & `i18n/en/.../vietlod/`), tích hợp `Steps`, `VideoTutorial`, `FeatureCards`, `Available`, `FeatureNotAvailable`, code `Stata 18 MP` / `R 4.x` / `Python 3.11+` và tài nguyên dữ liệu/đồ thị tại `https://vietlod.tnsai.vn/src/ecoaz/`.
    2.  **Kiến trúc 16 trang MDX cho Finco**: Xây dựng 8 chuyên đề How-To mỗi ngôn ngữ (`docs/finco/` & `i18n/en/.../finco/`) bao phủ dữ liệu vĩ mô, chứng khoán, thuyết minh BCTC, 3.448 chỉ tiêu hàng hóa MXV, xuất Excel 2-sheet chuẩn SPSS và 138 công cụ StockMCP.
    3.  **Zero-Downtime Atomic Build trên `docs-webhook` (Port 3051)**: Thay vì chạy `docusaurus build` trực tiếp vào thư mục `/opt/docs/ecodata/build` (khiến tệp `index.html` bị xóa tạm thời trong ~5 phút biên dịch và gây lỗi `403 Forbidden`), dịch vụ `docs-webhook` biên dịch vào thư mục tạm `build_staging` (`npx docusaurus build --out-dir build_staging`, `timeout: 1200000`, `maxBuffer: 50MB`) rồi thực hiện hoán đổi nguyên tử `mv build_staging build` trong `< 2 ms`.
    4.  **Tối ưu hóa SEO/AEO**: Tích hợp `docusaurus-plugin-llms` sinh tự động `/llms.txt` (`119 KB`) và `/llms-full.txt` (`4.9 MB`) cùng dữ liệu có cấu trúc JSON-LD (`WebSite` & `SoftwareApplication`).

---

## Quyết định 4: Mở rộng sang 5 Ứng dụng Cốt lõi với SachKTL (1.078 Trang MDX Song ngữ)

*   **Ngày quyết định**: 2026-11-01
*   **Trạng thái**: Đã thực thi (Active)
*   **Ngữ cảnh (Context)**: Bổ sung thanh điều hướng **SachKTL** ngay sau **VietLOD** trên `docs.tnsai.vn` để cung cấp tài liệu hướng dẫn How-To cho toàn bộ 30 bộ giáo trình (`503` chương, `2.650` bài học) và 4 khóa học Kinh tế lượng ứng dụng (`58` buổi học, `201` bài giảng) tại `https://sachktl.tnsai.vn`.
*   **Các quyết định kỹ thuật**:
    1.  **Kiến trúc 539 trang MDX mỗi ngôn ngữ (`1.078` trang tổng cộng)**: Thiết kế 1 trang Tổng quan (`overview.mdx`), 5 trang hướng dẫn 4 Khóa học (`courses/index.mdx` + 4 cấp độ), 30 trang Tổng quan bộ giáo trình (`book-01-{slug}/index.mdx` .. `book-30-{slug}/index.mdx`) và 503 trang Hướng dẫn thực hành cấp Chương (`chapter-{XX}-{sec_slug}.mdx`) tổng hợp toàn bộ 2.650 bài học kèm bảng backlinks trỏ trực tiếp về bài viết gốc trên `sachktl.tnsai.vn`.
    2.  **Đồng bộ kiểm chứng 5 Sidebars**: Cập nhật `verify_routing.py` và `verify_i18n.py` trên cả 3 thư mục `.agents/skills/`, `.agent/skills/` và `.claude/skills/` để kiểm chứng tự động 5 sidebars và 1.800 tệp MDX (`900` VI + `900` EN).

