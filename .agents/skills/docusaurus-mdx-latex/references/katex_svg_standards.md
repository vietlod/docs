# Tiêu chuẩn Biểu thức KaTeX, Admonitions & Nhúng Component SVG

## 1. Chuẩn Trình bày Công thức Kinh tế lượng (KaTeX)

Dự án đã tích hợp `remark-math` và `rehype-katex` trong `docusaurus.config.js`.
- **Công thức nội dòng (Inline Math)**: Dùng `$ ... $` cho ký hiệu biến số đơn lẻ (ví dụ: $\hat{\beta}_{OLS}$, $R^2$, $\sigma^2$).
- **Công thức khối độc lập (Display Math)**: Đặt dấu `$$` trên dòng riêng biệt cho hệ phương trình hoặc mô hình hồi quy:
  ```markdown
  $$
  Y_{it} = \alpha_i + \gamma_t + \mathbf{X}_{it}'\boldsymbol{\beta} + \varepsilon_{it}
  $$
  ```

## 2. Chuẩn Khối Ghi chú Học thuật (Docusaurus Admonitions)

Sử dụng cú pháp `:::` của Docusaurus với tiêu đề tùy chỉnh:
```markdown
:::tip[Khuyến nghị Thực hành]
Luôn kiểm định tính dừng (Stationarity) bằng kiểm định ADF/PP trước khi ước lượng VAR/VECM.
:::
```
Các loại hợp lệ: `:::note`, `:::tip`, `:::info`, `:::warning`, `:::danger`. Luôn đóng khối bằng một dòng `:::` độc lập.

## 3. Nhúng React/SVG Components trong Tệp `.mdx`

Đối với các trang tổng quan sử dụng sơ đồ động (như `docs/ecodata/overview.mdx`):
```mdx
import {
  EconometricsPipelineSvg,
  McpServerFlowSvg,
  JevCoProcessorSvg,
} from '@site/src/components/EcoDataSvg';

<EconometricsPipelineSvg locale="vi" />
```
- Bản tiếng Việt (`docs/`) truyền `locale="vi"`.
- Bản tiếng Anh (`i18n/en/...`) truyền `locale="en"`.
