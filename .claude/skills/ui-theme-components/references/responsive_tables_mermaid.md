# Quy chuẩn Hiển thị Responsive cho Bảng Dữ liệu, Mermaid & SVG Động

## 1. Bảng Dữ liệu Học thuật Lớn (Econometrics & Indicators Tables)

Theo `readme/ai/testing-strategy.md` (Cấp độ 3 - UI/UX Mobile):
- Các bảng nhiều cột bắt buộc hiển thị với `display: block; overflow-x: auto;` trên màn hình nhỏ (`max-width: 768px`).
- Các khối code mẫu dài phải có thanh cuộn ngang độc lập, không đẩy tràn chiều ngang trang web.

## 2. Sơ đồ Kiến trúc SVG Động (`src/components/EcoDataSvg/`)

Bộ 3 component SVG động của EcoData:
1. `EconometricsPipelineSvg.jsx`: Minh họa quy trình ước lượng và kiểm định kinh tế lượng.
2. `McpServerFlowSvg.jsx`: Minh họa kiến trúc kết nối Model Context Protocol (MCP).
3. `JevCoProcessorSvg.jsx`: Minh họa bộ đồng xử lý dữ liệu và suy luận.

**Quy chuẩn kỹ thuật**:
- Luôn khai báo thuộc tính `viewBox` chuẩn xác và `width="100%"` để tự động co giãn trên mọi độ phân giải.
- Hỗ trợ prop `locale` (`"vi"` hoặc `"en"`) để hiển thị nhãn song ngữ đồng bộ với trang tài liệu đang mở.
