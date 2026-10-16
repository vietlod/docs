# CLAUDE.md - Quy tắc Phát triển & Quản trị AI Agent

Tài liệu này quy định bắt buộc đối với mọi AI Coding Agent (Claude Code, Anti Gravity, Codex, v.v.) hoạt động trong repository này.

---

## 1. Lệnh Xây dựng và Chạy thử (Build & Run Commands)

### Môi trường Local:
*   Cài đặt thư viện: `npm install`
*   Chạy thử local server (Development): `npm run start` hoặc `npm run dev`
*   Biên dịch tĩnh (Production Build): `npm run build`
*   Chạy thử bản build cục bộ: `npm run serve`

### Môi trường VPS (Production Deployment):
*   Thư mục dự án: `/opt/docs/ecodata`
*   Kéo mã nguồn mới: `git pull origin main`
*   Cài đặt/cập nhật thư viện: `npm install`
*   Biên dịch tĩnh: `npm run build`
*   Reload Nginx: `nginx -t && systemctl reload nginx`

---

## 2. Quy trình Bắt buộc dành cho AI Agent

### Quy tắc 1: Luôn Đọc Context Theo Tầng (Layered Context Loading)
Mỗi khi bắt đầu phiên làm việc, tác nhân phải đọc các tài liệu hướng dẫn theo thứ tự ưu tiên giảm dần để tối ưu token:
1.  `/CLAUDE.md` (Workflow & Quy tắc vận hành)
2.  `/Memory.md` (Bài học kinh nghiệm & Lịch sử lỗi)
3.  `/Agents.md` (Phân chia vai trò tác nhân)
4.  `/readme/ai/context-index.md` (Mục lục dẫn đường)
5.  *Chỉ đọc* các file trong thư mục `/readme/ai` liên quan trực tiếp đến tác vụ hiện tại. Không đọc tràn lan nếu không cần thiết.

### Quy tắc 2: Chế độ Lập kế hoạch (Plan Mode)
*   Mọi tác vụ không thuộc diện điều chỉnh nhỏ (minor follow-up) bắt buộc phải tạo/cập nhật `implementation_plan.md` và `task.md` trước khi viết code hoặc sửa đổi cấu hình.
*   Đặt `request_feedback: true` trong metadata để yêu cầu sự phê duyệt từ người dùng. Chỉ thực hiện khi được duyệt.

### Quy tắc 3: Quy tắc 5 Câu hỏi Cốt lõi (Ask User Rule)
Nếu thiếu ngữ cảnh về hệ thống, nghiệp vụ hoặc hạ tầng VPS, AI Agent bắt buộc phải dừng lại và hỏi người dùng ít nhất 5 câu hỏi cốt lõi bao trùm:
1.  Mục tiêu nghiệp vụ chính.
2.  Hành vi mong muốn sau cùng.
3.  Phạm vi (Scope) và những điều nằm ngoài phạm vi (Non-goals).
4.  Ràng buộc hạ tầng/deploy/môi trường.
5.  Tiêu chí hoàn thành (Definition of Done) & cách xác minh.

---

## 3. Quy tắc Đóng góp Mã nguồn & Git Commit
*   **KHÔNG** thêm dòng "Co-authored-by", "Co-Author By" hoặc bất kỳ ghi nhận đóng góp nào của AI (AI attribution) trong nội dung commit.
*   **KHÔNG** ghi tên mô hình AI hoặc thông tin quảng cáo, disclaimers vào commit message hay PR descriptions.
*   Nội dung commit message phải ngắn gọn, đi thẳng vào vấn đề theo chuẩn Conventional Commits (ví dụ: `feat(home): ...`, `fix(nginx): ...`, `docs(ecodata): ...`).

---

## 4. An toàn trên Môi trường VPS Đa ứng dụng
*   Mọi cấu hình Virtual Host Nginx hay khởi động lại Docker compose phải được cô lập chính xác.
*   Tuyệt đối không chỉnh sửa tệp cấu hình hoặc thay đổi cổng của các ứng dụng khác đang chạy song song trên VPS (`bodulieu.tnsai.vn`, `vietlod.tnsai.vn`, `ecolab.io.vn`, `ecolit.io.vn`, v.v.).
*   Luôn chạy kiểm tra cú pháp Nginx (`nginx -t`) trước khi tải lại cấu hình (`systemctl reload nginx`).

---

## 5. Hệ thống Agent Skills Theo Chuẩn Progressive Disclosure

Repository triển khai chuẩn mở **Agent Skills Specification** đồng bộ trên 3 môi trường: `.agents/skills/` (AntiGravity IDE/CLI), `.agent/skills/`, và `.claude/skills/` (Claude Code).

### Cơ chế Nạp Lũy Tiến 3 Giai đoạn (Progressive Disclosure):
1.  **Khám phá (Discovery)**: Chỉ nạp metadata (`name`, `description` trong YAML frontmatter ~100 tokens/skill).
2.  **Kích hoạt (Activation)**: Chỉ đọc `SKILL.md` (< 5.000 tokens) khi tác vụ khớp với `description`.
3.  **Thực thi (Execution)**: Chỉ đọc tệp cụ thể trong `references/*.md` hoặc chạy kịch bản kiểm chứng trong `scripts/verify_*.py` khi cần thiết.

### Danh mục 8 Skills & Lệnh Kiểm chứng Tự động:
*   `python .agents/skills/repo-governance/scripts/verify_governance.py` — Kiểm tra Governance docs, `.gitignore`, Conventional Commits & chống rò rỉ GitHub PAT.
*   `python .agents/skills/docusaurus-mdx-latex/scripts/verify_mdx_latex.py` — Kiểm tra cú pháp MDX v3 (Acorn), khối code và công thức KaTeX/LaTeX.
*   `python .agents/skills/multi-app-sidebars-routing/scripts/verify_routing.py` — Kiểm tra 5 sidebars độc lập, Navbar bindings và chuẩn hóa đường dẫn URL.
*   `python .agents/skills/i18n-bilingual-sync/scripts/verify_i18n.py` — Kiểm tra đối xứng 1:1 giữa `docs/` (VI) và `i18n/en/` (EN) cùng 4 từ điển JSON.
*   `python .agents/skills/sveltia-cms-workflow/scripts/verify_cms.py` — Kiểm tra cấu hình Sveltia CMS (`static/admin/config.yml`) và OAuth Proxy (port 3050).
*   `python .agents/skills/webhook-cicd-deploy/scripts/verify_webhook.py` — Kiểm tra cấu hình CI/CD HTTPS Webhook (port 3051) và kịch bản build.
*   `python .agents/skills/vps-nginx-isolation/scripts/verify_vps_isolation.py` — Kiểm tra cấu hình Nginx (`default.conf`, bảo toàn `$uri`) và cô lập 11 ứng dụng trên VPS.
*   `python .agents/skills/ui-theme-components/scripts/verify_ui_build.py` — Kiểm tra `src/css/custom.css`, Dark/Light mode tokens và các component SVG/React.

