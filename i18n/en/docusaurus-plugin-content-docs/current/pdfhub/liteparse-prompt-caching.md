---
title: LiteParse & Prompt Caching
sidebar_position: 3
---

# Optimization with LiteParse & Prompt Caching

To minimize API operating costs and accelerate bulk document parsing, PDFHUB integrates two core optimization technologies: the local open-source document parser **LiteParse** and API **Prompt Caching**.

---

## 1. LiteParse: Local Document Parsing

While LlamaParse Cloud offers advanced parsing capabilities, PDFHUB also supports **LiteParse** running directly on your local CPU (no GPU required) for situations requiring strict data privacy or zero-cost execution:

*   **Model-Free Parsing:** LiteParse uses spatial geometry algorithms to identify lines, columns, and text blocks directly from the vector code of PDF files.
*   **Local OCR Support:** For scanned pages, LiteParse integrates lightweight OCR tools (such as PaddleOCR or Tesseract) to recognize text without sending data online.
*   **Spatial Layout Preservation:** Extracts text along with bounding coordinates $(x, y, w, h)$ for each element, keeping the original spatial structure.
*   **CLI Support:** Run quick parsing tasks via the CLI on your server:
    ```bash
    liteparse parse --file report.pdf --format markdown --output result.md
    ```

---

## 2. Prompt Caching: Minimizing API Overhead

When users perform multiple RAG queries or data extractions on the same large PDF document (e.g., querying details across a 150-page corporate financial report), sending the entire document context repeatedly to cloud LLMs (such as Anthropic Claude or DeepSeek) is expensive. PDFHUB addresses this using **Prompt Caching**:

```
Query 1 ──► Send Full Context (Prompt + 150-page PDF) ──► Server Processes & Caches (100% cost)
Query 2 ──► Send New Question + Cache Token ID ────────► Server Reuses Cached State (Saves ~80% cost)
```

### How It Works
1.  **Prefix Matching:** The system splits outgoing prompts. The heavy PDF document context is positioned at the beginning of the prompt sequence (System Prompt / Context block).
2.  **State Caching:** On the first query, the model provider (e.g., Anthropic/DeepSeek) compiles and stores this context state in their server-side cache.
3.  **Cache Hits:** In subsequent queries within the same chat session, the system only sends the new question and a cache token identifier. The model reuses the cached context, processing the response immediately.

### Economic Benefits
*   **Reduced Input Cost:** Saves **50% to 80%** of input token costs for documents exceeding 10,000 words.
*   **Lower Latency (Time-to-first-token):** The time to begin generating the response is **3 to 5 times faster** since the model does not need to re-read the entire document.
