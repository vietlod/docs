---
title: Ingesting Documents
sidebar_position: 1
---

# Ingesting & Managing PDF Documents

The PDFHUB data extraction workflow starts by uploading and classifying source documents. This guide explains how to ingest documents into the system.

---

## 1. Drag-and-Drop Interface (Document Explorer)

PDFHUB provides an intuitive Document Explorer interface to manage file lifecycles:

1.  Select the **Documents** module from the left navigation bar.
2.  To upload new documents:
    *   **Drag & Drop:** Drag one or more PDF files from your computer and drop them into the designated upload area.
    *   **Browse Files:** Click the upload area to open your system's file browser and select the target PDFs.
3.  Once uploaded, the file status will change to *Uploading*, then *Queued* as it waits for the extraction pipeline.

---

## 2. Metadata Tagging

To route extraction correctly and support subsequent querying, each document must be classified using metadata tags. The system automatically populates these tags based on file name analysis, or you can edit them manually:

*   **Year:** Identifies the statistical calendar year of the data (e.g., `2024`).
*   **Publisher:**
    *   `GSO` — General Statistics Office (Statistical yearbooks, socio-economic reports).
    *   `GDC` — General Department of Vietnam Customs (Import-export volume reports).
    *   `MOF` — Ministry of Finance / Insurance Supervisory Authority.
    *   `Enterprise` — Listed corporate financial statements.
*   **Document Type:** Distinguishes between *Yearbook*, *Report*, or *Financial Statement*.
*   **Topic/Domain:** The primary focus area of the data (e.g., *GDP, International Trade, Labor and Employment, General Insurance*).

---

## 3. Ingestion Constraints

To ensure server stability and optimize parsing API costs, PDFHUB applies the following file constraints:

| Constraint Type | Limit Threshold | Suggested Workaround |
| :--- | :--- | :--- |
| **File Size** | 50 MB | If the document is heavy (such as 1000-page yearbooks), we recommend using a PDF splitter to keep only the appendix pages containing the target tables before uploading. |
| **Page Length** | 200 pages | The system supports parsing by page ranges. You can set `page_range="300-350"` to parse only the pages containing target tables, saving resources. |
| **Scan Resolution** | Min 150 DPI | For older scanned documents, ensure the text is legible and not blurred so that the OCR engine can read numeric characters accurately. |
