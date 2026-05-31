---
title: KEYWORDs Overview
sidebar_position: 1
---

# KEYWORDs Overview

**Keywords Extraction Platform** is an automated system for crawling, extracting, and analyzing the frequency of bilingual keywords (Vietnamese + English) from corporate annual reports and business documents. The system is designed specifically to help financial and SEO researchers analyze technology trends, digital transformation strategies, and corporate focus areas through reporting language.

---

## 1. System Architecture

The application is built on a containerized Docker model with the following core components:

*   **Frontend (React + Vite, TypeScript):** Provides a real-time control dashboard, charts analyzing keyword categories, an interactive word cloud, and a visual heatmap table.
*   **Backend API (FastAPI, Python 3.11):** Handles Google OAuth2 authentication, session management, and real-time WebSocket progress reporting.
*   **Task Queue (Celery + Redis 7):** Manages background document extraction queues sequentially to protect VPS computing resources.
*   **Document Extraction Engine:** Integrates specialized libraries for multi-format processing (PyMuPDF, pdfplumber, python-docx, openpyxl, pandas) and a local OCR engine (EasyOCR).
*   **Database (SQLite):** Stores job history, keyword frequency results, and user-scoped workspace settings.

---

## 2. 11 Default Technology & Finance Keyword Groups

The system dynamically loads and categorizes keywords into 11 specialized groups:

1.  **Data Infrastructure:** Data management, Big Data, data warehousing.
2.  **Analytics & AI:** Machine Learning, predictive analytics, Natural Language Processing (NLP).
3.  **Cloud Infrastructure:** Cloud computing, SaaS, microservices.
4.  **Ledger Technology & Security:** Blockchain, cryptography, cybersecurity.
5.  **Governance & Operations:** RegTech, compliance, risk management.
6.  **Open Banking:** API banking, open finance, BaaS.
7.  **Digital Banking Services:** Mobile banking, electronic identity (eKYC).
8.  **Lending & Fundraising:** Peer-to-peer (P2P) lending, crowdfunding, buy now pay later (BNPL).
9.  **Payments & Digital Wallets:** E-wallets, QR code payments, contactless payments.
10. **New Financial Products:** InsurTech, WealthTech, robo-advisors.
11. **Smart Governance & Marketing:** Digital marketing, CRM, customer analytics.

---

## 3. Workspace Isolation Model

To support multiple researchers using the same system without mutual interference, KEYWORDs implements strict user-level workspace isolation:

*   **User-scoped Settings:** Each logged-in email owns an independent Google Drive folder configuration (`gdrive_folder_id`) and active keywords file (`keywords_xlsx`).
*   **Job Snapshotting:** When an extraction job is launched, the system snapshots the Drive folder ID and keywords file path at that exact moment. This ensures extraction results remain auditable and consistent even if the user edits settings later.
*   **Task Independence:** Users can only manage (stop, resume, diagnose, delete) jobs they created. Launching a new job for user A does not terminate or affect active jobs for user B.
