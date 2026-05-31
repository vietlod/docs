# debug-playbook.md - Sách hướng dẫn Xử lý Sự cố (Runbook)

Tài liệu này cung cấp các checklist chẩn đoán và quy trình từng bước để phát hiện, cô lập và khắc phục nhanh các lỗi thường gặp trên hệ thống tài liệu và reverse proxy Nginx trên VPS.

---

## 1. Phân loại lỗi và Hướng xử lý nhanh

### 1.1 Lỗi Biên dịch Docusaurus (Compilation/Acorn Errors)
*   **Dấu hiệu**: Lệnh `npm run build` bị lỗi dừng giữa chừng, báo lỗi cú pháp MDX hoặc lỗi Acorn liên quan đến ký tự đặc biệt.
*   **Nguyên nhân thường gặp**: Công thức toán học LaTeX chứa dấu ngoặc nhọn `{}` hoặc dấu gạch chéo ngược `\` đặt trực tiếp trong văn bản Markdown thay vì đặt trong khối code block hoặc khối toán học `$$`.
*   **Cách khắc phục**:
    1.  Kiểm tra dòng báo lỗi cụ thể trong console log.
    2.  Tìm file markdown bị lỗi và kiểm tra xem có phương trình toán nào viết sai cú pháp hay không.
    3.  Chuyển phương trình toán đó vào khối code block hoặc đổi thành text thường.

### 1.2 Lỗi 502 Bad Gateway (Nginx)
*   **Dấu hiệu**: Truy cập trang web báo lỗi `502 Bad Gateway`.
*   **Nguyên nhân thường gặp**: Dịch vụ backend/frontend chạy bằng Docker compose bị sập hoặc chưa khởi động xong, hoặc Nginx không thể kết nối tới port nội bộ.
*   **Quy trình chẩn đoán**:
    1.  SSH vào VPS và kiểm tra trạng thái container:
        ```bash
        docker ps --filter name=pdfhub
        ```
    2.  Nếu container sập (Exited), kiểm tra log của container đó:
        ```bash
        docker logs --tail 100 pdfhub-backend
        ```
    3.  Nếu container vẫn chạy bình thường (Up và Healthy), kiểm tra log lỗi của Nginx:
        ```bash
        tail -n 50 /var/log/nginx/pdfhub.tnsai.vn.error.log
        ```
    4.  Xác nhận xem cổng nội bộ trong file cấu hình Nginx (ví dụ: `http://127.0.0.1:8007`) có khớp với cổng export của Docker container hay không.

### 1.3 Lỗi 404 Not Found (Nginx)
*   **Dấu hiệu**: Truy cập trang web báo lỗi `404 Not Found` từ Nginx.
*   **Nguyên nhân thường gặp**: Cấu hình sai thư mục gốc (`root`) trong file Virtual Host Nginx, hoặc thiếu chỉ thị `try_files` để phục vụ ứng dụng Single Page Application (SPA).
*   **Cách khắc phục**:
    1.  Kiểm tra dòng `root` trong file `/etc/nginx/sites-available/docs.tnsai.vn`. Phải trỏ chính xác về `/opt/docs/ecodata/build`.
    2.  Đảm bảo có dòng cấu hình SPA routing:
        ```nginx
        location / {
            try_files $uri $uri/ /index.html;
        }
        ```

### 1.4 Lỗi xác thực SSL Certbot
*   **Dấu hiệu**: Lệnh `certbot --nginx` báo lỗi không thể tạo thử thách ACME (ACME challenge failed).
*   **Nguyên nhân thường gặp**: Bản ghi DNS (A record) của tên miền mới chưa cập nhật hoặc trỏ sai IP, hoặc cổng 80 bị chặn trên tường lửa VPS.
*   **Cách khắc phục**:
    1.  Kiểm tra xem DNS đã cập nhật chưa bằng lệnh ping từ máy khách hoặc local:
        ```powershell
        Resolve-DnsName docs.tnsai.vn
        ```
    2.  Đảm bảo tường lửa VPS cho phép lưu lượng cổng 80 và 443:
        ```bash
        ufw allow 80/tcp
        ufw allow 443/tcp
        ```

---

## 2. Các lệnh kiểm tra hệ thống nhanh trên VPS

*   **Kiểm tra cú pháp Nginx**: `nginx -t`
*   **Tải lại cấu hình Nginx**: `systemctl reload nginx`
*   **Xem trạng thái Nginx**: `systemctl status nginx`
*   **Xem logs Nginx theo thời gian thực**:
    ```bash
    tail -f /var/log/nginx/docs.tnsai.vn.error.log
    ```
*   **Xem log Docker Compose (PDFHub)**:
    ```bash
    cd /opt/pdfhub && docker compose -f docker-compose.prod.yml --env-file .env.prod logs -f backend
    ```
