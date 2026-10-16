---
name: vps-nginx-isolation
description: >
  Bảo vệ an toàn cách ly tuyệt đối trên máy chủ VPS đa ứng dụng (31.97.110.12), quản lý cấu hình
  Nginx Virtual Host (docs.tnsai.vn, pdfhub.tnsai.vn), áp dụng kỹ thuật truyền tệp qua SSH bằng Base64
  để tránh lỗi PowerShell nuốt biến ($uri, $host), và kiểm tra cú pháp nginx -t trước khi reload.
  Kích hoạt khi thao tác qua SSH trên VPS, chỉnh sửa tệp cấu hình Nginx, cấp phát SSL Certbot,
  hoặc kiểm tra phân bổ cổng nội bộ. Không dùng cho việc viết bài hướng dẫn sử dụng hay sửa CSS giao diện.
---

# Hướng dẫn An toàn Hạ tầng VPS Đa ứng dụng & Cô lập Nginx

## 1. Nguyên tắc Cốt lõi (Core Principles)
- **Cô lập Tuyệt đối 11 Ứng dụng trên VPS (`31.97.110.12`)**: Chỉ thao tác trong phạm vi `/opt/docs/` và cấu hình Nginx được giao quản lý (`docs.tnsai.vn`, `ecodata.tnsai.vn`, `pdfhub.tnsai.vn`). Tuyệt đối không chạm vào các container Docker, PostgreSQL (`5434`, `5435`, `5436`), Redis (`6381`, `6382`) hay Virtual Host của các ứng dụng khác (`ecolab.io.vn`, `ecolit.io.vn`, `keywords.tnsai.vn`, `bodulieu.tnsai.vn`, `vietlod.tnsai.vn`, `sachktl.tnsai.vn`, `kidsmath.tnsai.tech`, `marketplace.tnsai.vn`).
- **Quy tắc Truyền Tệp Qua SSH Bằng Base64**: Khi truyền tệp cấu hình Nginx hoặc script chứa ký tự `$` (`$uri`, `$host`, `$remote_addr`) từ PowerShell lên VPS qua `plink.exe`, bắt buộc mã hóa Base64 ở Local và giải mã bằng `base64 -d` trên VPS để ngăn PowerShell nội suy làm mất biến.
- **Kiểm định `nginx -t` Bắt buộc**: Luôn chạy `nginx -t` và xác nhận `syntax is ok` / `test is successful` trước khi chạy `systemctl reload nginx`.

## 2. Quy trình Thực hiện (Progressive Workflow)
1. **Chạy kịch bản kiểm tra cấu hình Nginx cục bộ & bản đồ phân bổ cổng VPS**:
   ```bash
   python .agents/skills/vps-nginx-isolation/scripts/verify_vps_isolation.py
   ```
2. **Tham chiếu bảng đăng ký cổng và tên miền của 11 ứng dụng trên VPS**: Đọc [`references/vps_port_domain_map.md`](references/vps_port_domain_map.md) trước bất kỳ thay đổi cổng hoặc proxy nào.
3. **Tham chiếu quy trình truyền Base64 qua SSH & Certbot SSL**: Đọc [`references/ssh_base64_transfer.md`](references/ssh_base64_transfer.md) trước khi cập nhật tệp trên VPS.
