---
name: repo-governance
description: >
  Thực thi quy trình quản trị AI Agent (Layered Context Loading, Plan Mode, Quy tắc 5 câu hỏi),
  kiểm soát chuẩn Conventional Commits không chứa AI attribution, và ngăn chặn rò rỉ thông tin nhạy cảm
  (GitHub PAT, khóa SSH, tệp .env) trong repository docs.tnsai.vn. Kích hoạt khi bắt đầu phiên làm việc,
  trước khi lập kế hoạch, trước khi commit/push Git, hoặc khi kiểm toán bảo mật repository.
  Không dùng cho các tác vụ chỉnh sửa CSS giao diện hay cấu hình chi tiết của từng mô hình kinh tế lượng.
---

# Hướng dẫn Quản trị Repository & Bảo mật Thông tin (Repo Governance)

## 1. Nguyên tắc Cốt lõi (Core Principles)
- **Nạp Ngữ cảnh Theo Tầng (Layered Context Loading)**: Luôn đọc đúng 4 tệp nền tảng trước khi hành động: `/CLAUDE.md` -> `/Memory.md` -> `/Agents.md` -> `/readme/ai/context-index.md`. Không đọc tràn lan các tệp trong `/readme/ai/` nếu kế hoạch chưa chứng minh sự cần thiết.
- **Chế độ Lập kế hoạch (Plan Mode) & 5 Câu hỏi**: Bắt buộc tạo/cập nhật `implementation_plan.md` và `task.md`, đồng thời hỏi tối thiểu 5 câu hỏi cốt lõi (Business Goal, Expected Behavior, Scope/Non-goals, Infra/Deploy Constraints, Definition of Done) trước khi thực thi.
- **Chuẩn Conventional Commits**: Tuyệt đối không ghi dòng `Co-authored-by`, không gắn tên mô hình AI hoặc nội dung quảng cáo trong commit message.
- **Vệ sinh Bảo mật Git (Zero-Token Persistence)**: Không bao giờ lưu cứng `ghp_...` hoặc `github_pat_...` trong `.git/config`. Khi cần push/pull tự động, sử dụng cơ chế `http.extraHeader` tạm thời trên dòng lệnh.

## 2. Quy trình Thực hiện (Progressive Workflow)
1. **Chạy kịch bản kiểm chứng quản trị & bảo mật trước và sau khi thao tác**:
   ```bash
   python .agents/skills/repo-governance/scripts/verify_governance.py
   ```
2. **Tham chiếu quy tắc phân tầng và bàn giao vai trò**: Đọc [`references/governance_rules.md`](references/governance_rules.md) khi cần kiểm tra ma trận phân vai Planner/Implementer/Tester/Deployer/Documenter hoặc quy tắc leo thang (Escalation Rules).
3. **Tham chiếu quy chuẩn bảo mật Git & biến môi trường**: Đọc [`references/secret_hygiene.md`](references/secret_hygiene.md) trước khi thực hiện thao tác đồng bộ Git 3 chiều (Local - GitHub - VPS).
