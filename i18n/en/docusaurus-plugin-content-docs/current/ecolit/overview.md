---
title: EcoLit Overview
sidebar_position: 1
---

# EcoLit Overview (EconLit Review)

**EconLit Review** is an AI-powered economics literature review system. The application assists economics researchers, faculty, and graduate students in gathering metadata for millions of papers, exploring multidimensional connections between studies, and conducting automated literature reviews on a highly secure platform.

EcoLit directly integrates academic data from two of the world's largest repositories, **OpenAlex** and **CrossRef**, creating a local Knowledge Base and representing it as a Knowledge Graph to support deep AI reasoning.

---

## 1. 5-Layer System Architecture

EcoLit is organized into a robust 5-layer architecture to optimize big data processing on local computing resources:

1.  **Frontend Layer (Next.js 15):** Provides a professional academic control room interface, progress dashboards, interactive citation network graphs, and the AI Chat interface.
2.  **API Layer (FastAPI):** Provides REST API endpoints synchronized with OpenAlex/CrossRef and Server-Sent Events (SSE) for streaming AI outputs.
3.  **Ingestion Pipeline Layer:** An Ingestion and Economics Classifier background service that filters economics-related documents and loads them into the system.
4.  **Database Layer (Knowledge Base & Graph):** Uses **PostgreSQL 16** as the source of truth for metadata and **Neo4j 5** to store the Academic Knowledge Graph.
5.  **AI Agent Layer:** Utilizes local LLMs via **Ollama** (such as Qwen3-30B, Phi-4, DeepSeek-R1) combined with **BGE-M3** embeddings for data privacy.

---

## 2. Knowledge Graph Ontology Schema

EcoLit represents research literature as a rich network on Neo4j consisting of 4 main entity classes:

*   **Academic Registry Layer:** Entities representing `Paper`, `Author`, `Institution` (universities/research centers), and `Venue` (journals/conference proceedings).
*   **Methodology Layer:** Entities representing `Topic`, `Method` (econometric models), `ModelSpec` (model specifications), `Variable`, and `Dataset`.
*   **Empirical Evidence Layer:** Entities representing `Finding` (empirical results), `EvidenceSpan` (text clips proving findings), and `Limitation`.
*   **Research Task Layer:** Stores `ReviewProject` configurations, `ReviewQuestion` setups, and `ConversationSession` history.

```
(Author {orcid: '0000-0003-1234-5678'})-[:AUTHORED]->(Paper)-[:PUBLISHED_IN]->(Venue)
(Paper)-[:STUDIES_TOPIC]->(:Topic)
(Paper)-[:USES_METHOD]->(:Method)
(Paper)-[:REPORTS_FINDING]->(:Finding)-[:SUPPORTS/CONTRADICTS]->(:Finding)
```

This integration enables the AI Chatbot to perform complex multi-step reasoning queries (e.g., *Find papers that used GMM to study FDI volatility in Vietnam and highlight contradicting findings*).
