# Memory.md - Ghi nhớ Quyết định & Bài học Kinh nghiệm

Tài liệu này lưu trữ các quyết định thiết kế bền vững, bài học từ các sự cố vận hành thực tế, và quy tắc heuristic để các AI agent kế thừa tri thức mà không phải phân tích lại từ đầu.

---

## 1. Nhật ký Sự kiện & Bài học Vận hành (Incident Postmortems)

### Sự cố 1: Lỗi 502 Bad Gateway trên VNStock Data Ingestion
*   **Ngày xảy ra**: 2026-01-09 (Version v2.8.9)
*   **Hiện tượng**: Khi admin nhấn nút tạm dừng (Pause) hoặc hủy (Cancel) một tiến trình cào dữ liệu VNStock có nhiều mã chứng khoán (UPCOM), hệ thống mất hơn 60 giây không phản hồi, gây nghẽn kết nối và trả về lỗi 502 Bad Gateway từ Nginx. Người dùng không thể đăng nhập lại sau đó do backend bị treo.
*   **Nguyên nhân**: API Ingestion của VNStock chạy đồng bộ, không có timeout bảo vệ, làm nghẽn Event Loop của backend khi gọi API ngoài bị chậm hoặc giới hạn tần suất.
*   **Giải pháp**:
    1.  Wrap các lệnh gọi API Ingestion bằng `asyncio.wait_for()` để thiết lập timeout nghiêm ngặt (30-45 giây).
    2.  Chuyển đổi cơ chế phản hồi của endpoint `Pause/Cancel` sang mô hình phản hồi ngay lập tức (Immediate Response): backend lưu trạng thái flag và trả về HTTP 200 OK ngay lập tức (mất 2-5 giây), tiến trình chạy ngầm sẽ tự động kiểm tra flag và dừng lại sau khi xử lý xong mã chứng khoán hiện tại.
    3.  Cấu hình lại timeout của Nginx admin proxy xuống 60 giây (từ 300 giây) để giải phóng kết nối nghẽn nhanh hơn.

### Sự cố 2: Thay đổi Tên miền PDFHub (.tech -> .vn)
*   **Ngày xảy ra**: 2026-05-31
*   **Hiện tượng**: Chuyển đổi toàn bộ tên miền dịch vụ PDFHub từ `pdfhub.tnsai.tech` sang `pdfhub.tnsai.vn`.
*   **Bài học / Điểm lưu ý**:
    1.  Cần cập nhật đồng thời cấu hình CORS và TNS Redirect URI trong `.env.prod` của backend và chạy lại container Docker (`docker compose up -d --build backend celery-worker`) để tránh lỗi từ chối CORS từ frontend hoặc lỗi callback sau đăng nhập.
    2.  Khi cấu hình Virtual Host Nginx mới, luôn xóa Virtual Host cũ (`pdfhub.tnsai.tech`) khỏi thư mục `sites-enabled` để giải phóng cấu hình định tuyến.
    3.  Chạy Certbot SSL riêng rẽ để cô lập chứng chỉ cho từng subdomain mới.

---

## 2. Các Quyết định Kiến trúc Bền vững (Durable Decisions)

### Tích hợp Tài liệu 5 Ứng dụng trong 1 Docusaurus Instance (2026-05-31)
*   **Context**: Cần cải tiến hướng dẫn sử dụng EcoData thành tài liệu chung cho 5 ứng dụng: EcoData, EcoLab, EcoLit, PDFHUB, và KEYWORDs.
*   **Lựa chọn cân nhắc**:
    -   *Phương án A*: Dùng Docusaurus Multi-instance Docs (phức tạp về config, cô lập route tốt).
    -   *Phương án B (Chọn)*: Dùng 1 Doc Instance duy nhất, chia thư mục trong `docs/` và cấu hình Navbar để tự động hoán đổi Sidebars của từng app.
*   **Lý do chọn**: Giúp quản lý mã nguồn tập trung, đồng bộ tệp CSS/UI thống nhất phong cách tối giản sang trọng (premium academic style) và tiết kiệm tài nguyên build trên VPS.

### Chuẩn hóa tên thư mục và URL định tuyến EcoLab (2026-06-03)
*   **Quyết định**: Đồng bộ hóa tên thư mục chứa tài liệu học thuật từ tiếng Việt không dấu sang tiếng Anh để nhất quán giữa cấu trúc vật lý và định tuyến URL trên môi trường đa ngôn ngữ:
    - Thay thế `mo-hinh/` thành `model/`
    - Thay thế `danh-muc/` thành `group/`
*   **Lợi ích**: Tránh lỗi mã hóa URL khi chia sẻ liên kết, đồng thời tạo cấu trúc link thân thiện với SEO đối với cả bản dịch tiếng Anh (i18n) và tiếng Việt.


---

## 3. Quy tắc Tránh Lỗi Thường Gặp (Pitfalls Mapping)
*   **Lỗi LaTeX MDX compilation**: Trong Docusaurus, các biểu thức toán học LaTeX chứa dấu ngoặc nhọn `{}` hoặc dấu gạch chéo ngược `\` ở ngoài khối code/math block sẽ làm vỡ trình biên dịch MDX Acorn.
    *   *Giải pháp*: Luôn giữ công thức toán học trong khối `$$ ... $$` hoặc định dạng bằng text thuần nếu nằm ngoài khối toán học.
*   **Ký tự `$` bị nuốt khi truyền lệnh qua SSH**: Khi dùng các lệnh `cat << 'EOF'` lồng trong chuỗi lệnh PowerShell để ghi file Nginx cấu hình lên VPS, các biến `$uri`, `$host` có thể bị PowerShell nuốt hoặc thông dịch sai.
    *   *Giải pháp*: Mã hóa Base64 nội dung tệp ở local, truyền chuỗi Base64 qua SSH và giải mã bằng lệnh `echo "BASE64" | base64 -d > path` trên VPS.

### Tích hợp Sveltia CMS + GitHub Actions CI/CD (2026-06-04)
*   **Context**: Cần dashboard quản trị nội dung cho Admin (tạo/sửa/xóa bài) và CI/CD tự động deploy.
*   **Quyết định**:
    - CMS: **Sveltia CMS** (static admin panel, không cần DB, i18n tích hợp, < 300KB). Truy cập tại `/admin/`.
    - CI/CD: **GitHub Actions** + rsync (build trên GitHub runner, deploy build/ xuống VPS). Paths filter tiết kiệm minutes.
    - OAuth: Node.js proxy nhỏ trên VPS port 3050, PM2, Nginx `/oauth/` location block.
*   **Các phương án đã loại**: TinaCMS (quá nặng, cần DB + Node.js backend), Keystatic (chỉ hỗ trợ Next.js/Astro), Webhook VPS (tốn CPU VPS khi build).
*   **VPS Impact**: Port 3050 (nội bộ), 1 PM2 process (`docs-oauth-proxy`), 1 Nginx location block. Không ảnh hưởng app khác.
