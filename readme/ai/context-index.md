# context-index.md - Cổng mục lục AI Governance

Tài liệu này là navigation layer trung tâm giúp các AI Agent định hướng nhanh chóng trong toàn bộ hệ thống tài liệu quản trị AI Governance, giảm tối đa mức tiêu thụ token bằng cách chỉ đọc các tệp tin thực sự cần thiết cho từng loại tác vụ.

---

## 1. Phân tầng Ưu tiên đọc tài liệu (Reading Priority)

Khi bắt đầu một phiên làm việc, **BẮT BUỘC** đọc theo thứ tự sau:
1.  [`/CLAUDE.md`](file:///d:/docs/CLAUDE.md)
2.  [`/Memory.md`](file:///d:/docs/Memory.md)
3.  [`/Agents.md`](file:///d:/docs/Agents.md)
4.  [`/readme/ai/context-index.md`](file:///d:/docs/readme/ai/context-index.md) (Tài liệu này)
5.  *Chọn lọc* mở các tệp tin trong bảng dưới đây tùy thuộc vào tác vụ cụ thể.

---

## 2. Bản đồ Tác vụ và Tài liệu tương ứng (Use Case Mapping)

| Loại tác vụ | Tài liệu cần đọc | Nội dung chính của tài liệu |
| :--- | :--- | :--- |
| **Tìm hiểu cấu trúc & luồng dữ liệu** | [`architecture-map.md`](file:///d:/docs/readme/ai/architecture-map.md) | Sơ đồ module, luồng dữ liệu, entry points của cổng tài liệu Docusaurus. |
| **Phát triển / Sửa đổi mã nguồn** | [`service-boundaries.md`](file:///d:/docs/readme/ai/service-boundaries.md)<br>[`file-criticality-map.md`](file:///d:/docs/readme/ai/file-criticality-map.md) | Ranh giới giữa các module và phân cấp độ nhạy cảm của từng tệp tin trong repo. |
| **Ghi nhận & Tham chiếu thiết kế** | [`decision-log.md`](file:///d:/docs/readme/ai/decision-log.md) | Nhật ký ghi nhận các quyết định kiến trúc, lựa chọn giải pháp kỹ thuật. |
| **Chẩn đoán & Xử lý sự cố** | [`debug-playbook.md`](file:///d:/docs/readme/ai/debug-playbook.md) | Các bước điều tra lỗi (compilation, Nginx 502/404, Certbot SSL). |
| **Kiểm thử chất lượng (QA/QC)** | [`testing-strategy.md`](file:///d:/docs/readme/ai/testing-strategy.md) | Chiến lược test, các lệnh test local, tiêu chuẩn responsive và đa ngôn ngữ. |
| **Kiểm tra thông tin VPS** | [`vps-app-context.md`](file:///d:/docs/readme/ai/vps-app-context.md) | Bản đồ phân bổ port, domain, dịch vụ và rủi ro ảnh hưởng chéo trên VPS. |
| **Biên dịch & Build tĩnh** | [`build-runbook.md`](file:///d:/docs/readme/ai/build-runbook.md) | Quy trình và các lệnh build tĩnh ở local, Docker hoặc VPS. |
| **Đóng gói container Docker** | [`docker-map.md`](file:///d:/docs/readme/ai/docker-map.md) | Cấu trúc docker-compose, Dockerfile, ports, volumes và networks của docs site & các app liên quan. |
| **Triển khai Production (Deploy)** | [`deploy-checklist.md`](file:///d:/docs/readme/ai/deploy-checklist.md) | Các bước deploy an toàn lên VPS, thứ tự thao tác và kiểm tra sau deploy. |

---

## 3. Các vùng rủi ro cao cần lưu ý (High-Risk Areas)
*   **Chỉnh sửa tệp cấu hình Nginx trên VPS**: Có thể làm sập định tuyến của các ứng dụng khác đang chạy song song. Bắt buộc phải đọc kỹ [`vps-app-context.md`](file:///d:/docs/readme/ai/vps-app-context.md) trước khi sửa.
*   **Docusaurus Sidebars & Config**: Chỉnh sửa sai cấu trúc trong `docusaurus.config.js` hoặc `sidebars.js` sẽ gây lỗi biên dịch hoặc gãy liên kết (broken links) diện rộng. Bắt buộc phải chạy `npm run build` ở local trước khi commit.

---

## 4. Danh mục 8 Agent Skills Theo Chuẩn Progressive Disclosure (`.agents/skills/`)

Ngoài các tài liệu trong `/readme/ai/`, AI Agent có thể kích hoạt theo nhu cầu (On-demand) bộ **8 Skills** được đồng bộ tại `.agents/skills/`, `.agent/skills/`, và `.claude/skills/`:

| Tên Skill | Mục đích & Ngữ cảnh kích hoạt | Kịch bản kiểm chứng (`scripts/verify_*.py`) |
| :--- | :--- | :--- |
| **`repo-governance`** | Quy trình Layered Context, Plan Mode, Conventional Commits, chống rò rỉ token Git. | `python .agents/skills/repo-governance/scripts/verify_governance.py` |
| **`docusaurus-mdx-latex`** | Phòng chống lỗi biên dịch Acorn MDX v3, cô lập công thức KaTeX `$$...$$`, chuẩn Admonitions/SVG. | `python .agents/skills/docusaurus-mdx-latex/scripts/verify_mdx_latex.py` |
| **`multi-app-sidebars-routing`** | Quản lý 5 sidebars độc lập (`sidebars.js`), Navbar switching và chuẩn hóa slug (`model/`, `group/`). | `python .agents/skills/multi-app-sidebars-routing/scripts/verify_routing.py` |
| **`i18n-bilingual-sync`** | Đảm bảo đối xứng 1:1 giữa `docs/` (VI) và `i18n/en/` (EN) cùng 4 tệp từ điển JSON. | `python .agents/skills/i18n-bilingual-sync/scripts/verify_i18n.py` |
| **`sveltia-cms-workflow`** | Quản trị Sveltia CMS (`static/admin/config.yml`, 22 collections) và GitHub OAuth Proxy (port 3050). | `python .agents/skills/sveltia-cms-workflow/scripts/verify_cms.py` |
| **`webhook-cicd-deploy`** | Quy trình tự động build qua HTTPS Webhook (`docs-webhook` port 3051, HMAC SHA-256). | `python .agents/skills/webhook-cicd-deploy/scripts/verify_webhook.py` |
| **`vps-nginx-isolation`** | Cô lập 11 ứng dụng trên VPS `31.97.110.12`, truyền file qua SSH bằng Base64, kiểm định `nginx -t`. | `python .agents/skills/vps-nginx-isolation/scripts/verify_vps_isolation.py` |
| **`ui-theme-components`** | Thiết kế giao diện học thuật `src/css/custom.css`, Dark/Light mode, bảng responsive và SVG động. | `python .agents/skills/ui-theme-components/scripts/verify_ui_build.py` |

