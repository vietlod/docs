---
title: Tổng quan EcoLit
sidebar_position: 1
---

# Tổng quan EcoLit (EconLit Review)

**EconLit Review** là hệ thống tổng quan tài liệu học thuật kinh tế tích hợp trí tuệ nhân tạo (AI-powered Economics Literature Review System). Ứng dụng này giúp các nhà nghiên cứu, giảng viên và nghiên cứu sinh kinh tế thu thập metadata hàng triệu bài báo, khám phá mối liên hệ đa chiều giữa các nghiên cứu, và thực hiện tổng quan tài liệu tự động trên một hệ thống bảo mật cao.

EcoLit tích hợp trực tiếp nguồn dữ liệu học thuật từ hai cổng lớn nhất thế giới là **OpenAlex** và **CrossRef**, xây dựng cơ sở tri thức (Knowledge Base) và biểu diễn dưới dạng Đồ thị tri thức (Knowledge Graph) để hỗ trợ AI suy luận sâu.

---

## 1. Kiến trúc Hệ thống 5 lớp

EcoLit được tổ chức theo kiến trúc 5 lớp vững chắc để tối ưu hóa việc xử lý dữ liệu lớn trên tài nguyên local:

1.  **Lớp Frontend (Next.js 15):** Cung cấp giao diện học thuật chuyên nghiệp (Academic Control Room), Dashboard tiến độ, sơ đồ mạng lưới trích dẫn tương tác và giao diện AI Chat.
2.  **Lớp API (FastAPI):** Cung cấp các endpoint REST API đồng bộ với OpenAlex/CrossRef và Server-Sent Events (SSE) để stream kết quả AI.
3.  **Lớp Ingestion Pipeline:** Bộ thu thập và phân loại tự động (Economics Classifier) lọc các tài liệu thuộc ngành kinh tế và tải vào hệ thống.
4.  **Lớp cơ sở dữ liệu (Knowledge Base & Graph):** Sử dụng **PostgreSQL 16** làm Source of Truth cho metadata và **Neo4j 5** để lưu trữ Đồ thị tri thức học thuật.
5.  **Lớp Trí tuệ nhân tạo (AI Agent Layer):** Sử dụng các mô hình chạy local qua **Ollama** (như Qwen3-30B, Phi-4, DeepSeek-R1) kết hợp cùng mô hình nhúng **BGE-M3** để bảo mật tuyệt đối dữ liệu.

---

## 2. Bản đồ Ontology Đồ thị Tri thức (Knowledge Graph Schema)

EcoLit biểu diễn tài liệu nghiên cứu dưới dạng một mạng lưới đồ thị tri thức phong phú trên Neo4j gồm 4 lớp đối tượng chính:

*   **Lớp Thư mục học thuật (Academic Registry):** Các thực thể `Paper` (Bài báo), `Author` (Tác giả), `Institution` (Viện nghiên cứu/Trường đại học), và `Venue` (Tạp chí/Hội thảo).
*   **Lớp Phương pháp luận (Methodology):** Thực thể `Topic` (Chủ đề), `Method` (Phương pháp kinh tế lượng), `ModelSpec` (Đặc tả mô hình), `Variable` (Biến số), và `Dataset` (Bộ dữ liệu).
*   **Lớp Bằng chứng khoa học (Empirical Evidence):** Thực thể `Finding` (Kết quả phát hiện), `EvidenceSpan` (Đoạn văn trích dẫn làm bằng chứng), và `Limitation` (Hạn chế nghiên cứu).
*   **Lớp Tác vụ Nghiên cứu (Research Task):** Lưu trữ lịch sử `ReviewProject` (Dự án review), `ReviewQuestion` (Câu hỏi review), và `ConversationSession` (Phiên chat AI).

```
(:Author)-[:AUTHORED]->(:Paper)-[:PUBLISHED_IN]->(:Venue)
(:Paper)-[:STUDIES_TOPIC]->(:Topic)
(:Paper)-[:USES_METHOD]->(:Method)
(:Paper)-[:REPORTS_FINDING]->(:Finding)-[:SUPPORTS/CONTRADICTS]->(:Finding)
```

Sự kết hợp này cho phép AI Chatbot thực hiện các truy vấn suy luận đa bước phức tạp (ví dụ: *Tìm các bài báo sử dụng phương pháp GMM để nghiên cứu biến động FDI tại Việt Nam và chỉ ra các phát hiện mâu thuẫn nhau*).
