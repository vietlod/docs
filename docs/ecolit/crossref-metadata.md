---
title: Siêu dữ liệu Crossref
sidebar_position: 3
---

# Khai thác Siêu dữ liệu qua Crossref API

Bên cạnh OpenAlex, EcoLit đồng bộ hóa toàn diện với API của **CrossRef** - tổ chức đăng ký mã định danh đối tượng số (DOI) lớn nhất dành cho các ấn bản học thuật. Module này giúp bạn tra cứu siêu dữ liệu (metadata) chính xác của bất kỳ bài báo nào thông qua mã DOI.

---

## 1. Ánh xạ Endpoint Crossref

Hệ thống cung cấp các endpoint local được thiết kế theo cấu trúc nguyên bản của Crossref:

| Crossref Endpoint gốc | App API Endpoint | Nội dung tra cứu |
| :--- | :--- | :--- |
| `GET /works` | `GET /api/crossref/works` | Tìm kiếm và lọc danh sách tác phẩm trên toàn hệ thống Crossref. |
| `GET /works/{doi}` | `GET /api/crossref/works/{doi}` | Tra cứu siêu dữ liệu chi tiết của bài báo dựa trên mã DOI cụ thể. |
| `GET /journals` | `GET /api/crossref/journals` | Danh sách các tạp chí khoa học đã đăng ký với Crossref. |
| `GET /journals/{issn}/works` | `GET /api/crossref/journals/{issn}/works` | Lấy danh sách các bài báo thuộc một tạp chí cụ thể theo mã ISSN. |
| `GET /members/{id}/works` | `GET /api/crossref/members/{id}/works` | Danh sách bài báo thuộc một tổ chức xuất bản (Publisher Member). |

---

## 2. Cú pháp tham số truy vấn Crossref

Khác với OpenAlex, Crossref sử dụng một bộ quy tắc đặt tên tham số truy vấn và bộ lọc riêng biệt. EcoLit hỗ trợ hoàn toàn cú pháp này:

*   **`query=` (Tìm kiếm từ khóa):** Truy vấn từ khóa tự do trên toàn bộ metadata của tác phẩm. Ví dụ: `query=inflation targeting`
*   **`filter=` (Bộ lọc Crossref):** Lọc theo các tiêu chí siêu dữ liệu.
    *   *Lọc theo ngày:* `filter=from-pub-date:2020-01-01`
    *   *Chỉ lấy bài báo có mã ORCID của tác giả:* `filter=has-orcid:true`
    *   *Lọc theo nhà tài trợ nghiên cứu:* `filter=funder:10.13039/100000001`
*   **`rows=` (Số lượng bản ghi):** Khác với giới hạn 100 của OpenAlex, Crossref cho phép tải tối đa **1000** dòng trên mỗi request. Ví dụ: `rows=500`
*   **`cursor=` (Phân trang sâu - Deep Pagination):** Khi tải dữ liệu lớn lên đến hàng chục ngàn dòng, sử dụng con trỏ `cursor=*` để tiếp tục tải trang tiếp theo một cách hiệu quả thay vì dùng số trang (`page`).
*   **`mailto=` (Polite Pool):** Hệ thống tự động đính kèm email cấu hình trong cài đặt vào tham số này để đưa request vào luồng ưu tiên (Polite Pool) của Crossref, tăng tốc độ phản hồi và tránh bị chặn (rate-limit).

---

## 3. Quy trình xử lý Fallback Proxy

Tương tự OpenAlex, khi bạn gọi chi tiết một bài báo bằng mã DOI (ví dụ: `/api/crossref/works/10.1016/j.jfineco.2020.04.019`):

1.  Hệ thống tìm kiếm bản ghi DOI này trong bảng `papers_core` của cơ sở dữ liệu PostgreSQL local.
2.  Nếu tồn tại bản ghi, hệ thống trả về ngay lập tức dữ liệu dưới định dạng JSON chuẩn của Crossref.
3.  Nếu không tồn tại, EcoLit sẽ đóng vai trò **Proxy**: gửi yêu cầu trực tiếp sang server của Crossref (`https://api.crossref.org/works/10.1016/j.jfineco.2020.04.019`) kèm theo header `mailto` đã cấu hình.
4.  Dữ liệu nhận về được lưu vào PostgreSQL local để phục vụ cho các truy vấn trong tương lai, đồng thời trích xuất các mối quan hệ trích dẫn (`paper_references`) để vẽ bản đồ mạng lưới trích dẫn trên giao diện.
