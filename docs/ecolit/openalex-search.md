---
title: Khai thác OpenAlex
sidebar_position: 2
---

# Khai thác Dữ liệu qua OpenAlex API

Phân hệ kết nối dữ liệu của EcoLit được thiết kế đồng bộ hoàn chỉnh với cấu trúc API của **OpenAlex** (cơ sở dữ liệu thư mục học thuật mở lớn nhất thế giới). Việc thiết kế đồng bộ này giúp các nhà nghiên cứu dễ dàng truy vấn dữ liệu local bằng các cú pháp quen thuộc của OpenAlex.

---

## 1. Bản đồ ánh xạ Endpoint (Endpoint Mapping)

Hệ thống cung cấp các API endpoint local tương ứng trực tiếp với OpenAlex để truy xuất thông tin:

| OpenAlex Endpoint gốc | App API Endpoint | Đối tượng trích xuất |
| :--- | :--- | :--- |
| `GET /works` | `GET /api/openalex/works` | Danh sách bài báo, sách, luận văn (Works). |
| `GET /works/{id}` | `GET /api/openalex/works/{id}` | Chi tiết một tác phẩm học thuật theo ID OpenAlex. |
| `GET /authors` | `GET /api/openalex/authors` | Danh sách các tác giả nghiên cứu (Authors). |
| `GET /authors/{id}` | `GET /api/openalex/authors/{id}` | Thông tin chi tiết tác giả, chỉ số h-index, đơn vị công tác. |
| `GET /sources` | `GET /api/openalex/sources` | Nguồn xuất bản (Tạp chí, kho lưu trữ preprint). |
| `GET /institutions` | `GET /api/openalex/institutions` | Các trường đại học, viện nghiên cứu (Institutions). |
| `GET /topics` | `GET /api/openalex/topics` | Phân cấp chủ đề nghiên cứu (Topics/Subfields/Fields). |

---

## 2. Cú pháp bộ lọc dữ liệu (Query Parameters)

Hệ thống hỗ trợ toàn bộ các bộ lọc nâng cao theo đúng chuẩn của OpenAlex. Bạn có thể sử dụng các tham số sau trong thanh tìm kiếm hoặc qua API:

*   **`filter=` (Bộ lọc):** Cho phép lọc dữ liệu chính xác.
    *   *Điều kiện AND:* Ngăn cách bằng dấu phẩy (`,`). Ví dụ: `filter=publication_year:2020,has_abstract:true`
    *   *Điều kiện OR:* Ngăn cách bằng dấu gạch đứng (`|`). Ví dụ: `filter=institutions.country_code:vn|institutions.country_code:sg`
    *   *Phép phủ định:* Thêm dấu chấm than (`!`). Ví dụ: `filter=type:!dataset`
    *   *Khoảng giá trị:* Sử dụng dấu gạch ngang (`-`). Ví dụ: `filter=cited_by_count:10-100`
*   **`search=` (Tìm kiếm toàn văn):** Tìm kiếm từ khóa xuất hiện trong tiêu đề, abstract hoặc nội dung. Ví dụ: `search=green finance`
*   **`sort=` (Sắp xếp):** Sắp xếp theo các chỉ số đo lường. Ví dụ: `sort=cited_by_count:desc` (Sắp xếp theo số trích dẫn từ cao xuống thấp).
*   **`group_by=` (Phân nhóm/Thống kê):** Gom nhóm để vẽ biểu đồ tần suất. Ví dụ: `group_by=publication_year`
*   **`sample=` (Lấy mẫu ngẫu nhiên):** Lấy ngẫu nhiên $N$ kết quả để khảo sát sơ bộ. Ví dụ: `sample=50`

---

## 3. Cơ chế Dự phòng & Ủy nhiệm (Proxy & Fallback Strategy)

Do bộ dữ liệu học thuật thế giới vô cùng khổng lồ, EcoLit áp dụng một quy trình truy vấn thông minh 2 lớp để tối ưu dung lượng lưu trữ:

```
Yêu cầu truy vấn → Kiểm tra Cơ sở dữ liệu local (PostgreSQL)
  ├─► [Có dữ liệu] ──► Trả kết quả ngay lập tức
  └─► [Không có] ───► Proxy gọi API OpenAlex gốc ──► Trả kết quả & Ghi nhận vào PostgreSQL
```

1.  Khi người dùng thực hiện một yêu cầu truy xuất tác phẩm hoặc tác giả (ví dụ: `GET /api/openalex/works/W4285741639`), hệ thống sẽ kiểm tra trong cơ sở dữ liệu PostgreSQL local trước.
2.  Nếu tìm thấy bản ghi, hệ thống lập tức trả về kết quả (tốc độ < 50ms).
3.  Nếu bản ghi chưa được tải về máy local, EcoLit sẽ tự động kích hoạt **Cơ chế Dự phòng (Fallback Proxy)**: gửi yêu cầu trực tiếp đến máy chủ OpenAlex gốc (`https://api.openalex.org/works/W4285741639`) sử dụng Polite Pool ID.
4.  Khi nhận được dữ liệu từ OpenAlex, hệ thống sẽ trả kết quả cho người dùng, đồng thời tạo một tác vụ ngầm để lưu trữ thông tin này vào PostgreSQL và đồng bộ sang đồ thị Neo4j, giúp các truy vấn tiếp theo không cần gọi ra Internet nữa.
