---
title: Financial RAG
sidebar_position: 4
---

# Agentic RAG & Financial Data Extraction

To process corporate financial statements (IFS/BCTC) that carry strict mathematical constraints, PDFHUB deploys **Agentic RAG**. The system acts as a virtual financial analyst, cross-checking numbers and exporting clean datasets ready for empirical analysis.

---

## 1. Principles of Financial Agentic RAG

Unlike standard RAG systems that split PDFs and search solely by vector similarity, PDFHUB's Agentic RAG follows a goal-oriented reasoning workflow:

```
User Query ──► Clarify Intent (Interpret financial metrics)
                  └──► Execute Plan (Query SQL/Cypher database or run Vector Search)
                         └──► Cross-Check (Verify accounting consistency)
                                └──► Synthesize (Return answers with citations)
```

1.  **Intent Clarification:** Recognizes target financial indicators (e.g., *Debt-to-equity ratio, ROE, Cash flow from operating activities*).
2.  **Query Planning:** The AI agent determines whether to fetch structured data using SQL/Cypher on previously parsed tables or run a vector search on the Notes to the Financial Statements.
3.  **Evidence Collection:** Locates the original tables and notes, preserving page coordinates and table IDs to establish a visual audit trail.
4.  **Synthesis & Validation:** Compares figures across the balance sheet, income statement, and notes to ensure mathematical consistency.

---

## 2. Accounting Logic & Mathematical Cross-Checking

Financial statements require absolute precision. PDFHUB's RAG agent integrates automated cross-checking algorithms:

*   **Aggregational Constraints:** Verifies if the sum of sub-items matches the parent totals.
    *   *Total Assets = Current Assets + Non-Current Assets*
    *   *Total Equity & Liabilities = Total Liabilities + Owner's Equity*
*   **Cash Flow Consistency:** Matches the ending cash balance on the Cash Flow Statement with the corresponding cash indicators on the Balance Sheet.
*   **Anomaly Logging:** If discrepancies are found (due to rounding errors or parser issues), the system will:
    *   Highlight the suspected cell values in red on the UI.
    *   Log a warning outlining the mathematical mismatch.
    *   Trigger the parser to rerun on those pages at a higher resolution.

---

## 3. Data Quality Reports & Export Formats

Upon completion of extraction and validation, PDFHUB provides:

### Data Quality Report
*   **Fill Rate:** The percentage of schema fields populated.
*   **Discrepancy Log:** A list of mathematical mismatches along with their source page locations.

### Data Export Options
The system exports normalized financial data in formats suitable for quantitative analysis:
*   **Parquet / DuckDB:** High-performance formats that preserve column data types, ready to be loaded into Pandas (Python) or Plm (R).
*   **CSV / XLSX:** Standard sheet formats for quick imports into Stata, SPSS, or Microsoft Excel to run regressions.
*   **Markdown / LaTeX:** Clean Markdown tables to insert directly into academic research papers.
