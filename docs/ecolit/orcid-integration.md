---
title: Tích hợp ORCID
sidebar_position: 4
---

# Tích hợp Mã định danh Tác giả ORCID

Để hỗ trợ việc tra cứu và quản lý chính xác công trình nghiên cứu của từng tác giả (tránh hiện tượng trùng tên tác giả hoặc sai lệch đơn vị công tác), EcoLit tích hợp sâu hệ thống mã định danh tác giả **ORCID** (Open Researcher and Contributor ID).

---

## 1. ORCID là gì và vai trò trong hệ thống?

ORCID là một mã số phi thương mại gồm 16 chữ số (ví dụ: `0000-0002-1825-0097`) được cấp duy nhất cho mỗi nhà nghiên cứu trên toàn thế giới. 

Trong EcoLit, mã ORCID đóng vai trò:
*   Là khóa chính (Unique Key) để định danh tác giả trong cơ sở dữ liệu PostgreSQL (`paper_authors` table) và Neo4j (`Author` node).
*   Giúp gom cụm và hiển thị toàn bộ danh sách công trình của một tác giả một cách chính xác nhất mà không bị lẫn lộn giữa các tác giả trùng tên (ví dụ: "Nguyen, V.").
*   Đồng bộ siêu dữ liệu từ hồ sơ công khai của tác giả trên hệ thống ORCID quốc tế về cơ sở dữ liệu local.

---

## 2. Quy trình đồng bộ hồ sơ tác giả qua ORCID

Người dùng có vai trò **Researcher** có thể đồng bộ hồ sơ của một tác giả bất kỳ (hoặc hồ sơ cá nhân) bằng cách:

1.  Điều hướng tới phân hệ **Hồ sơ cá nhân (Personal Profiles)** hoặc mục tra cứu tác giả.
2.  Nhập mã ORCID 16 chữ số của tác giả vào ô liên kết (ví dụ: `0000-0003-1234-5678`).
3.  Nhấn nút **Đồng bộ hồ sơ (Sync Profile)**.
4.  Hệ thống sẽ kích hoạt một tiến trình ngầm (Background Worker) thực hiện:
    *   Gọi API công khai của ORCID để lấy thông tin tiểu sử: Họ tên, danh sách các cơ quan/viện nghiên cứu từng công tác, danh sách các đề tài tài trợ.
    *   Truy vấn chéo sang OpenAlex và Crossref để tự động tải về siêu dữ liệu của tất cả các bài báo (`works`) mà mã ORCID này được gán làm tác giả.
    *   Cập nhật thông tin vào PostgreSQL.

---

## 3. Liên kết Đồ thị Tri thức Neo4j

Sau khi quá trình đồng bộ hoàn tất, cơ chế đồng bộ tự động của EcoLit sẽ ánh xạ các thông tin thu được lên Đồ thị tri thức học thuật Neo4j:

```
(Author {orcid: '0000-0003-1234-5678'})-[:AUTHORED]->(Paper)
(Author)-[:AFFILIATED_WITH]->(Institution)
(Paper)-[:PUBLISHED_IN]->(Venue)
```

Khi khám phá Đồ thị tri thức, bạn có thể click vào nút đại diện cho Tác giả để:
*   Xem sơ đồ mạng lưới cộng tác viên (Co-authorship network) - các tác giả thường xuyên đồng tác giả.
*   Xem biểu đồ phân bố các chủ đề nghiên cứu (Topics) mà tác giả đó tập trung nhiều nhất.
*   Tra cứu nhanh các cơ quan (Institutions) có mối liên hệ mật thiết với tác giả.
*   Trích xuất tất cả các đoạn văn bằng chứng (`Finding`) được trích từ các công trình của tác giả này.
