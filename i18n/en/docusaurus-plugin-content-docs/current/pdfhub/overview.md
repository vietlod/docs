---
title: PDFHUB Overview
sidebar_position: 1
---

# PDFHUB Overview

**PDFHUB** is an automated financial document parser and analytics system. The application focuses on processing complex Vietnamese PDF documents (such as GSO statistical yearbooks, Customs import-export reports, and corporate financial statements) to automatically extract dense data tables into structured formats (JSON/CSV).

Data extracted and normalized through PDFHUB is designed to integrate with econometrics and causal inference workflows (Python, R, Stata).

---

## 1. Challenges with Vietnamese Statistical & Financial PDFs

Financial and statistical publications in Vietnam often present unique technical challenges for traditional OCR systems:
*   **Vietnamese Unicode Issues:** Strange embedded fonts or separated characters (combining vs. precomposed Unicode) can scramble text during raw copying.
*   **Complex Table Layouts:** Tables containing merged cells, multi-tiered column headers, regional/industry sub-groupings, and footnotes positioned immediately below the grid.
*   **Inconsistent Structures:** A single indicator (e.g., *GDP by sector*) may undergo minor modifications in column names, currency units (VND billions ↔ USD millions), or base-year prices across different years.

---

## 2. PDFHUB 4-Tier Ingestion Architecture

To address these challenges, PDFHUB is built on a logical 4-tier pipeline:

```
Source PDF (GSO/GDC) ──► Document Management Tier
                            └──► Parsing Tier (LlamaParse/LiteParse)
                                   └──► Ingestion Tier (LlamaExtract/Pydantic Schema)
                                          └──► Normalization Tier (PostgreSQL/DuckDB)
```

1.  **Document Management Tier:** Classifies and tags uploaded PDFs by year, publishing agency (General Statistics Office, General Department of Vietnam Customs, Ministry of Finance), and topic.
2.  **Layout-aware Parsing Tier:** Employs **LlamaParse** Cloud or **LiteParse** local to analyze the document's spatial layout, isolating tables from surrounding text and exporting them as JSON matrices or structured Markdown.
3.  **Schema-based Ingestion Tier:** Uses pre-defined Pydantic schemas to map table grids row-by-row (`PER_TABLE_ROW`) into typed database records.
4.  **Normalization & Database Tier:** Normalizes classification codes (VSIC sector codes, administrative region codes, HS commodity codes), handles missing data symbols (e.g., `-`, `..`, `x`), and merges annual records into time-series panel data.
