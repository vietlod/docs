# service-boundaries.md - Ranh giới Dịch vụ & Phụ thuộc

Tài liệu này xác định ranh giới hoạt động và các mối quan hệ phụ thuộc giữa cổng tài liệu tĩnh `docs.tnsai.vn` và các ứng dụng chức năng thực tế trong hệ sinh thái TNS AI.

---

## 1. Ranh giới Kiến trúc (Architectural Boundaries)

Trang tài liệu `docs.tnsai.vn` là một **Static Web Application (Tệp tĩnh)**. 

*   **Ranh giới Phụ thuộc**: Cổng tài liệu **hoàn toàn độc lập** về mặt mã nguồn, cơ sở dữ liệu và thời gian chạy (runtime) với tất cả các ứng dụng khác. Sự thay đổi về mã nguồn hoặc cấu trúc dữ liệu của các ứng dụng (EcoData, EcoLab, PDFHub...) không ảnh hưởng đến hoạt động biên dịch và hiển thị của trang docs, miễn là các tài liệu Markdown hướng dẫn được cập nhật đồng bộ.
*   **Ranh giới Cấu hình**: Cấu hình Nginx Virtual Host của `docs.tnsai.vn` được tách biệt hoàn toàn thành một file cấu hình độc lập tại `/etc/nginx/sites-available/docs.tnsai.vn`.

```
+-------------------------------------------------------------------------+
|                              VPS Host                                   |
|                                                                         |
|  +--------------------+   +-------------------+   +------------------+  |
|  |   docs.tnsai.vn    |   |  pdfhub.tnsai.vn  |   | ecolab.io.vn     |  |
|  |                    |   |                   |   |                  |  |
|  |  [Nginx Static]    |   |  [Nginx Reverse]  |   | [Nginx Reverse]  |  |
|  |        |           |   |         |         |   |         |        |  |
|  |   Static HTML      |   |   Docker Ports    |   |   Docker Ports   |  |
|  |   (Docusaurus)     |   |   (3008 / 8007)   |   |   (4001 / 5434)  |  |
|  +--------|-----------+   +---------|---------+   +---------|--------+  |
+-----------|-------------------------|-----------------------|-----------+
            +-------- Hyperlinks -----+-----------------------+
```

---

## 2. Các quy tắc phụ thuộc được phép (Allowed Dependencies)

*   **Hyperlinks**: Cổng tài liệu được phép liên kết trực tiếp đến URL chính thức của các ứng dụng (ví dụ: `https://pdfhub.tnsai.vn/`, `https://ecodata.io.vn/econometrics`) thông qua thẻ `<Link>` hoặc liên kết Markdown chuẩn.
*   **Public Assets / Media**: Được phép nhúng các hình ảnh, sơ đồ Mermaid, hoặc tài liệu hướng dẫn nằm trong cấu trúc thư mục `/static/img` của dự án.
*   **TNS AI SSO**: Việc hướng dẫn luồng đăng nhập SSO của hệ sinh thái TNS AI trong tài liệu chỉ mang tính chất mô tả và không được chứa bất kỳ khóa bảo mật, Client Secret, hoặc dữ liệu nhạy cảm nào của SSO.

---

## 3. Các hành vi cấm kỵ (Forbidden Dependencies)

*   **Cấm gọi API trực tiếp ở mức Code**: Không viết các hàm Javascript trong docs site để gọi trực tiếp các API backend riêng tư của các ứng dụng hoặc thực hiện truy vấn trực tiếp vào database.
*   **Cấm chia sẻ tệp cấu hình môi trường**: Tệp `.env` hoặc các khóa bí mật của các ứng dụng tuyệt đối không được đưa vào repository tài liệu này dưới mọi hình thức (kể cả dạng file nháp hoặc backup).
*   **Cấm thay đổi cấu hình định tuyến Nginx của các app khác**: AI agent khi deploy trang docs tuyệt đối không được chỉnh sửa phần proxy_pass hoặc port map trong cấu hình Nginx của các ứng dụng khác trên VPS.
