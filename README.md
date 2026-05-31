# TNS AI Docs

Mã nguồn cổng thông tin tài liệu hướng dẫn sử dụng dùng chung cho hệ sinh thái các ứng dụng **TNS AI**: **EcoData, EcoLab, EcoLit, PDFHUB, và KEYWORDs**. Hệ thống được xây dựng trên framework [Docusaurus](https://docusaurus.io/).

**Live Site:** [https://docs.tnsai.vn/](https://docs.tnsai.vn/)

---

## 📋 Tổng quan (Overview)

TNS AI Docs cung cấp hướng dẫn vận hành chi tiết cho 5 phân hệ:
*   **EcoData**: Phân hệ dữ liệu kinh tế vĩ mô và vi mô chính thức của Việt Nam (GSO, Hải quan, khảo sát VHLSS/VES) và quốc tế (WB, IMF, ADB, FRED...).
*   **EcoLab**: Phân hệ phân tích định lượng học thuật (hơn 100 mô hình toán), tích hợp RAG, Đồ thị tri thức (Neo4j) và thanh toán SePay.
*   **EcoLit**: Phân hệ nghiên cứu tài liệu học thuật (OpenAlex, Crossref) kết hợp đồng bộ ORCID.
*   **PDFHUB**: Phân hệ trích xuất báo cáo tài chính tự động sử dụng Layout-aware Parsing, LiteParse, Prompt Caching và Agentic RAG.
*   **KEYWORDs**: Phân hệ theo dõi và phân tích từ khóa SEO kết hợp mô hình semantic clustering.

---

## 🛠️ Công nghệ Sử dụng (Tech Stack)

*   **Docusaurus v3** - Framework biên dịch tài liệu tĩnh.
*   **React 19 & TypeScript** - Thư viện xây dựng giao diện.
*   **Mermaid** - Tích hợp sơ đồ kiến trúc động.
*   **i18n** - Hỗ trợ dịch đa ngôn ngữ toàn diện (Tiếng Việt `vi` và Tiếng Anh `en`).
*   **CSS Vanilla** - Giao diện Premium tối giản sang trọng, tối ưu hóa di động.

---

## 🚀 Khởi chạy Cục bộ (Local Development)

### Yêu cầu trước khi cài đặt:
*   **Node.js**: Version >= 20.x
*   **npm**: Version >= 10.x

### Cài đặt và Chạy:
```bash
# Cài đặt thư viện
npm install

# Khởi chạy máy chủ phát triển (Tiếng Việt)
npm run start -- --locale vi

# Khởi chạy máy chủ phát triển (Tiếng Anh)
npm run start -- --locale en

# Biên dịch tĩnh production
npm run build

# Chạy thử bản build tĩnh cục bộ
npm run serve
```
*Giao diện phát triển sẽ chạy tại địa chỉ: `http://localhost:3000/`*

---

## 📁 Cấu trúc Thư mục (Project Structure)

```
docs-repository/
├── docs/                             # Nội dung tài liệu gốc (Tiếng Việt)
│   ├── ecodata/                      # Hướng dẫn sử dụng EcoData
│   ├── ecolab/                       # Hồi quy & Phân tích lượng EcoLab
│   ├── ecolit/                       # Tìm kiếm thư mục học thuật EcoLit
│   ├── pdfhub/                       # Phân tích BCTC PDFHUB
│   └── keywords/                     # Trình cào & SEO KEYWORDs
├── i18n/                             # Bản dịch đa ngôn ngữ
│   └── en/
│       └── docusaurus-plugin-content-docs/current/ # Tài liệu Tiếng Anh
├── src/                              # Mã nguồn giao diện React
│   ├── components/                   # React components (Highlights, Showcase)
│   ├── css/                          # Custom styles (CSS học thuật)
│   └── pages/                        # Trang chủ index
├── static/                           # Tài sản tĩnh (Ảnh, Favicon, SVG)
├── readme/                           # Tài liệu AI Governance & VPS Map
│   └── ai/                           # Sách hướng dẫn vận hành cho AI agent
├── docusaurus.config.js              # File cấu hình Docusaurus trung tâm
├── sidebars.js                       # Khai báo cấu trúc Sidebar cho 5 app
└── package.json                      # Scripts & dependencies
```

---

## 🌐 Triển khai & Vận hành trên VPS (Production Deploy)

Dự án được deploy tĩnh và chạy trực tiếp trên máy chủ VPS `31.97.110.12` dưới sự quản lý của reverse proxy Nginx.

Chi tiết lệnh deploy nhanh trên VPS:
```bash
cd /opt/docs/ecodata
git pull origin main
npm install
npm run build
# Bản build tĩnh sẽ được Nginx Host phục vụ từ: /opt/docs/ecodata/build
```

---

## 🛡️ AI Governance & Quản trị Phát triển

Để đảm bảo việc code và deploy an toàn trên môi trường VPS chạy chung nhiều ứng dụng, dự án áp dụng hệ thống file governance bắt buộc:
*   [CLAUDE.md](./CLAUDE.md): Workflow và lệnh biên dịch chuẩn.
*   [Memory.md](./Memory.md): Nhật ký bền vững lưu trữ các quyết định thiết kế và bài học incident.
*   [Agents.md](./Agents.md): Định nghĩa vai trò tác nhân AI.
*   [readme/ai/context-index.md](./readme/ai/context-index.md): Mục lục định hướng nhanh cho AI Agent để tiết kiệm token.
*   [readme/ai/vps-app-context.md](./readme/ai/vps-app-context.md): Bản đồ phân bổ port, domain của các ứng dụng trên VPS.
