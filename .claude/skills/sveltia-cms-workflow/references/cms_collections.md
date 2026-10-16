# Quy chuẩn Khai báo Collections trong `static/admin/config.yml`

## 1. Cấu trúc Backend & Media Chuẩn

```yaml
backend:
  name: github
  repo: vietlod/docs
  branch: main
  base_url: https://docs.tnsai.vn
  auth_endpoint: oauth/auth

media_folder: "static/img"
public_folder: "/img"
```

## 2. Tái sử dụng Schema Trường bằng YAML Anchor (`&doc_fields` / `*doc_fields`)

Để tránh lặp lại khai báo và đảm bảo đồng nhất frontmatter giữa Sveltia CMS và Docusaurus:
```yaml
    fields: &doc_fields
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Sidebar Position", name: "sidebar_position", widget: "number", required: false }
      - { label: "Sidebar Label", name: "sidebar_label", widget: "string", required: false }
      - { label: "Description", name: "description", widget: "string", required: false }
      - { label: "Keywords", name: "keywords", widget: "list", required: false }
      - { label: "Body", name: "body", widget: "markdown" }
```
Các collection tiếp theo chỉ cần tham chiếu `fields: *doc_fields`.

## 3. Quy tắc Đồng bộ Collection Tiếng Việt & Tiếng Anh

Khi thêm một thư mục con mới vào `docs/<app>/<sub-folder>`, cần bổ sung đồng thời:
1. Một mục collection Tiếng Việt trỏ tới `folder: "docs/<app>/<sub-folder>"`.
2. Một mục collection Tiếng Anh (`-en`) ở phần cuối tệp trỏ tới `folder: "i18n/en/docusaurus-plugin-content-docs/current/<app>/<sub-folder>"`.
