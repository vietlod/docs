# Quy chuẩn Phân tầng Ngữ cảnh & Phối hợp Vai trò AI Agent

## 1. Ma trận Nạp Ngữ cảnh Theo Tầng (Layered Context Protocol)

| Thứ tự | Tệp tin bắt buộc | Mục đích & Giới hạn Token |
| :--- | :--- | :--- |
| **1** | `/CLAUDE.md` | Quy tắc vận hành bắt buộc, lệnh build local/VPS, quy tắc commit và an toàn VPS. |
| **2** | `/Memory.md` | Bài học từ sự cố thực tế (502 VNStock, chuyển miền PDFHub, lỗi Acorn LaTeX, Base64 SSH). |
| **3** | `/Agents.md` | Phân vai 5 tác tử (Planner, Implementer, Tester, Deployer, Documenter) và Escalation Gate. |
| **4** | `/readme/ai/context-index.md` | Bản đồ định tuyến sang 9 tệp chuyên sâu trong `/readme/ai/` và 8 Agent Skills. |

## 2. Quy tắc 5 Câu hỏi Cốt lõi (Clarification Gate)

Khi yêu cầu có điểm chưa tường minh về nghiệp vụ hoặc hạ tầng, Planner phải làm rõ đủ 5 khía cạnh:
1. **Business Goal**: Mục tiêu nghiệp vụ cốt lõi cần đạt.
2. **Expected Behavior**: Hành vi đầu ra cụ thể của hệ thống/tài liệu.
3. **Scope & Non-goals**: Ranh giới các tệp được phép sửa và các thành phần cấm chạm vào.
4. **Infra & Deploy Constraints**: Ràng buộc về cổng, Nginx, PM2, Docker và môi trường VPS.
5. **Definition of Done (DoD)**: Tiêu chí nghiệm thu định lượng (benchmark, exit code, git status).

## 3. Quy chuẩn Thông điệp Commit (Conventional Commits)

- **Cấu trúc**: `<type>(<scope>): <short summary>`
  - Ví dụ hợp lệ: `feat(ecodata): add spatial econometrics guide`, `docs(governance): sync agent skills specification`
- **Danh sách Cấm tuyệt đối**:
  - Cấm chuỗi `Co-authored-by:` hoặc `Signed-off-by:` đại diện cho AI.
  - Cấm nhắc tên công cụ/mô hình (`Claude`, `Gemini`, `GPT`, `AntiGravity`, `Generated with`).
