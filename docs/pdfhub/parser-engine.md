---
title: Cơ chế Trích xuất (Parser)
sidebar_position: 2
---

# Cơ chế Parsing & Trích xuất theo Schema

Trái tim của PDFHUB là bộ máy trích xuất dữ liệu thông minh kết hợp giữa công nghệ **Parsing nhận diện bố cục (Layout-aware Parsing)** của LlamaParse/LiteParse và công nghệ **Trích xuất theo lược đồ (Schema-based Extraction)**. Cơ chế này giúp chuyển đổi các trang PDF bảng biểu hỗn tạp thành các bảng dữ liệu dạng dòng (row-level data) có cấu trúc chặt chẽ.

---

## 1. Cơ chế Parsing bố cục (Layout-aware Parsing)

Các thư mục OCR truyền thống thường đọc tài liệu theo luồng từ trái sang phải, từ trên xuống dưới, làm vỡ hoàn toàn cấu trúc cột của bảng số liệu. PDFHUB giải quyết vấn đề này thông qua LlamaParse:

*   **Phân tích hình học (Layout Analysis):** Bộ parser phân tích cấu trúc vật lý của trang để cô lập vùng văn bản, vùng bảng biểu, vùng đồ thị và vùng footnote.
*   **Tái dựng cấu trúc bảng:** Nhận diện ranh giới hàng, cột, các ô gộp (merged cells - ví dụ: gộp cột khu vực kinh tế hoặc gộp dòng địa phương).
*   **Xuất kết quả trung gian:** Xuất dữ liệu bảng ra định dạng JSON biểu diễn ma trận ô dữ liệu hoặc Markdown giữ nguyên cấu trúc phân tách (ví dụ: các ô cách nhau bằng dấu `|`).

---

## 2. Trích xuất dựa trên Schema (Schema-based Extraction)

Sau khi bảng được nhận diện dưới dạng lưới cấu trúc thô, hệ thống sử dụng **LlamaExtract** kết hợp các mô hình Pydantic định nghĩa sẵn để chuyển đổi ma trận ô thành các bản ghi dữ liệu chuẩn hóa.

Thay vì trích xuất cả bảng lớn thành một khối khó xử lý, hệ thống sử dụng tùy chọn `PER_TABLE_ROW` (trích xuất theo từng dòng). Mỗi dòng trong bảng PDF sẽ được ánh xạ thành một đối tượng dữ liệu duy nhất.

### Ví dụ mô hình Pydantic của bảng GDP:
Dưới đây là mã định nghĩa schema Pydantic cho bảng chỉ tiêu GDP:

```python
from pydantic import BaseModel, Field

class GdpBySector(BaseModel):
    year: int = Field(description="Năm thống kê của số liệu")
    sector_code: str = Field(description="Mã phân cấp ngành kinh tế (ví dụ: A, B, C...)")
    sector_name_vi: str = Field(description="Tên ngành kinh tế bằng tiếng Việt")
    value: float = Field(description="Giá trị GDP tương ứng với ngành")
    unit: str = Field(description="Đơn vị tính, ví dụ: Tỷ đồng")
```

Khi áp dụng schema này, mô hình AI sẽ tự động phân tích dòng bảng PDF:
`Nông, lâm nghiệp và thủy sản | 2023 | Tỷ đồng | 1,234,567.8`
Và chuyển hóa thành đối tượng JSON chuẩn xác:
```json
{
  "year": 2023,
  "sector_code": "A",
  "sector_name_vi": "Nông, lâm nghiệp và thủy sản",
  "value": 1234567.8,
  "unit": "Tỷ đồng"
}
```

---

## 3. Định tuyến bảng tự động (Table Routing)

Trong một niên giám thống kê có hàng trăm bảng biểu thuộc nhiều chủ đề khác nhau, hệ thống cần biết bảng nào áp dụng schema nào. PDFHUB triển khai cơ chế **Định tuyến bảng (Table Router)**:

1.  Hệ thống đọc tiêu đề bảng (table caption) và các đoạn văn cảnh giới thiệu xung quanh bảng (ví dụ: *"Bảng 2.15: Kim ngạch xuất khẩu một số mặt hàng chủ yếu phân theo đối tác"*).
2.  Tác tử LLM Router phân loại tiêu đề này vào nhóm chủ đề tương ứng (ví dụ: *Thương mại quốc tế / Xuất khẩu*).
3.  Áp dụng schema cấu hình sẵn cho nhóm đó (ví dụ: `TradeByCommodity` schema) để tiến hành trích xuất dòng.
4.  Nếu tiêu đề bảng lạ chưa có schema phù hợp, hệ thống sẽ đưa bảng vào danh mục *Chờ định nghĩa schema* và gửi thông báo cho quản trị viên.
