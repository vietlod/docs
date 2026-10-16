# Quy chuẩn Bảo mật Thông tin Triển khai & Đồng bộ Git 3 Chiều

## 1. Danh mục Tệp Nhạy cảm Bắt buộc Cô lập (`.gitignore`)

Các tệp sau chỉ được tồn tại ở máy trạm Local hoặc môi trường dịch vụ VPS, tuyệt đối không được đưa vào Git index:
- `.env`, `.env.*`, `.env.deploy`, `.env.local`, `.env.production.local`
- `.claude/settings.local.json`, `.agent/settings.local.json`, `.agents/settings.local.json`
- Khóa bảo mật: `*.pem`, `*.key`, `*.ppk`, `*credentials*.json`
- Bộ nhớ đệm thực thi kịch bản kiểm thử: `__pycache__/`, `*.py[cod]`

## 2. Giao thức Push/Pull Không Lưu Token (Zero-Token Persistence)

Thay vì dùng `git remote set-url origin https://<TOKEN>@github.com/vietlod/docs.git` (gây lộ token trong `.git/config`), luôn giữ URL gốc sạch:
```bash
git remote set-url origin https://github.com/vietlod/docs.git
```

Khi thực hiện `git pull` hoặc `git push` trên PowerShell (Local):
```powershell
$b64 = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("x-access-token:$GITHUB_TOKEN"))
git -c "http.extraHeader=Authorization: Basic $b64" push origin main
```

## 3. Kiểm tra Trạng thái Đồng bộ 3 Chiều (Local - GitHub - VPS)

Sau mỗi đợt triển khai, xác minh cả 3 đầu mối trỏ về cùng một mã SHA-1 commit và không còn tệp bẩn:
1. **Local (`d:\docs`)**: `git status -s` (trống) & `git rev-parse --short HEAD`
2. **GitHub (`origin/main`)**: `git rev-parse --short origin/main`
3. **VPS (`/opt/docs/ecodata`)**: `cd /opt/docs/ecodata && git status -s && git rev-parse --short HEAD`
