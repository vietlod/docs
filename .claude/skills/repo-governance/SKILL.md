# Repo Governance Skill for Claude Code

Skill này quy định các bước hành động nhanh để AI agent tuân thủ tuyệt đối quy trình quản trị mã nguồn (governance), lập kế hoạch, kiểm thử và an toàn deploy trong repository.

---

## 1. Bản tóm tắt Quy tắc Hành động (Quick Rules Card)

*   **Đọc nén trước (Layered Context)**: Bắt đầu phiên làm việc bằng cách đọc:
    `/CLAUDE.md` -> `/Memory.md` -> `/Agents.md` -> `/readme/ai/context-index.md`.
*   **Bắt buộc Plan Mode**: Không code ngay. Tạo/cập nhật `implementation_plan.md` và `task.md` trước.
*   **Hỏi khi thiếu Context**: Hỏi ít nhất 5 câu hỏi cốt lõi trước khi sửa đổi lớn.
*   **An toàn VPS**: Không đụng cấu hình app khác, luôn chạy `nginx -t` trước khi reload.
*   **Commit chuẩn**: Không attribution, không marketing, không có dòng "Co-authored-by".
*   **Cập nhật tri thức**: Sau mỗi bugfix hoặc tính năng mới, cập nhật `Memory.md` và `walkthrough.md`.

---

## 2. Quy trình Thực thi Nhiệm vụ (Execution Flow)

```
[Nhận Task] -> [Đọc CLAUDE.md/Memory.md] -> [Tạo Plan & Checklist] -> [Chờ User duyệt]
      |
      +--> [Thực hiện sửa đổi] -> [Build Test Local] -> [Deploy VPS] -> [Xác minh Endpoint]
                                                                              |
                                                                              v
                                                                   [Cập nhật Memory & Walkthrough]
```

---

## 3. Lệnh vận hành nhanh (Quick Commands Reference)

*   **Build tài liệu**: `npm run build`
*   **Kiểm tra cú pháp Nginx (VPS)**: `nginx -t`
*   **Reload Nginx (VPS)**: `systemctl reload nginx`
*   **Docker restart backend (PDFHub VPS)**:
    `docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build backend celery-worker`
