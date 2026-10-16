---
name: docusaurus-mdx-latex
description: >
  Chuẩn hóa cú pháp biên tập tài liệu học thuật Markdown/MDX v3 và biểu thức toán học KaTeX/LaTeX
  cho cổng tài liệu Docusaurus 3.8. Ngăn chặn lỗi biên dịch Acorn MDX parser do ký tự ngoặc nhọn {}
  hoặc dấu gạch chéo ngược \ nằm ngoài khối toán học, đồng thời kiểm soát cấu trúc Admonitions và SVG.
  Kích hoạt khi viết mới, chỉnh sửa hoặc chẩn đoán lỗi biên dịch các tệp .md/.mdx trong docs/ và i18n/en/.
  Không dùng cho việc cấu hình Nginx hoặc quản lý tiến trình PM2 trên VPS.
---

# Hướng dẫn Biên dịch Học thuật Docusaurus MDX v3 & KaTeX

## 1. Nguyên tắc Cốt lõi (Core Principles)
- **Cô lập Biểu thức Toán học**: Mọi công thức LaTeX có chứa `{`, `}`, `\frac`, `\sum`, `\beta`, `\hat`, `\_` bắt buộc phải đặt bên trong khối hiển thị `$$ ... $$` hoặc inline `$ ... $` (hoặc code틱 `` `...` ``). Tuyệt đối không để ký tự `{}` trần trong văn bản thường vì trình biên dịch MDX v3 (Acorn) sẽ hiểu nhầm là biểu thức JavaScript JSX.
- **Cân bằng Cặp Khối (Block Delimiters)**: Mọi khối code ```` ``` ```` và khối toán học `$$` hoặc admonition `:::` phải đóng mở đối xứng trong cùng một tệp.
- **Tích hợp Component SVG/JSX trong `.mdx`**: Chỉ import React/SVG components từ `@site/src/components/...` ở ngay dưới YAML frontmatter và đóng thẻ JSX chuẩn xác (`<Component />`).

## 2. Quy trình Thực hiện (Progressive Workflow)
1. **Chạy kịch bản kiểm tra cú pháp MDX & LaTeX trên toàn bộ kho tài liệu**:
   ```bash
   python .agents/skills/docusaurus-mdx-latex/scripts/verify_mdx_latex.py
   ```
2. **Tham chiếu quy tắc phòng chống lỗi Acorn MDX v3**: Đọc [`references/mdx_acorn_rules.md`](references/mdx_acorn_rules.md) khi gặp lỗi `Could not parse expression with acorn` hoặc `Unexpected character` lúc chạy `npm run build`.
3. **Tham chiếu chuẩn KaTeX, Admonitions và Component SVG**: Đọc [`references/katex_svg_standards.md`](references/katex_svg_standards.md) khi biên soạn công thức kinh tế lượng (EcoLab/EcoData) hoặc nhúng sơ đồ minh họa.
