# Quy trình Truyền Cấu hình Nginx Bằng Base64 Qua PowerShell SSH

## 1. Nguyên nhân Sự cố Nuốt Biến `$`

Khi gọi `plink.exe` từ Windows PowerShell với chuỗi lệnh kép `"cat << 'EOF' > /etc/nginx/... $uri ..."`, PowerShell sẽ tự động thay thế `$uri`, `$host`, `$scheme` bằng chuỗi rỗng `""` trước khi gửi qua SSH, dẫn đến tệp Nginx trên VPS bị hỏng cú pháp (`try_files  / /index.html;`).

## 2. Mẫu Lệnh Chuẩn An Toàn Tuyệt Đối (Base64 Pipeline)

```powershell
# Bước 1: Đọc nội dung tệp cấu hình ở Local và mã hóa sang Base64
$rawContent = Get-Content -Raw -Encoding UTF8 "d:\docs\default.conf"
$b64Content = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($rawContent))

# Bước 2: Giải mã trên VPS, kiểm tra cú pháp nginx -t trước khi áp dụng
& "C:/Program Files/PuTTY/plink.exe" -batch -ssh -pw $VPS_PASS root@31.97.110.12 -hostkey $VPS_HOSTKEY `
  "echo '$b64Content' | base64 -d > /tmp/nginx_candidate.conf && head -n 20 /tmp/nginx_candidate.conf"
```

## 3. Quy tắc Xóa Symlink Cũ Khi Chuyển Đổi Tên Miền

Như bài học từ sự cố chuyển đổi `pdfhub.tnsai.tech` -> `pdfhub.tnsai.vn` (2026-05-31):
- Luôn xóa symlink cũ trong `/etc/nginx/sites-enabled/` sau khi kích hoạt Virtual Host mới.
- Cập nhật đồng bộ `CORS_ORIGINS` và `TNS_REDIRECT_URI` trong `.env.prod` nếu thay đổi tên miền ứng dụng.
