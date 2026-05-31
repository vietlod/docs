---
title: Ingestion & Parser
sidebar_position: 2
---

# Ingestion Mechanics & Schema-Based Parsing

The core of PDFHUB is an intelligent extraction engine that combines LlamaParse/LiteParse **Layout-aware Parsing** with **Schema-based Ingestion**. This process converts disorganized PDF table grids into structured, row-level data.

---

## 1. Layout-Aware Parsing

Traditional OCR libraries read documents from left-to-right and top-to-bottom, which completely breaks down the column structures of data tables. PDFHUB solves this using LlamaParse:

*   **Layout Analysis:** The parser analyzes the physical page layout to isolate text blocks, tables, charts, and footnotes.
*   **Table Spatial Reconstruction:** Identifies rows, columns, and merged cells (e.g., merged economic sector headers or merged regional row blocks).
*   **Intermediate Output:** Exports table grids as JSON matrices or Markdown tables (e.g., using `|` cell separators) to preserve spatial associations.

---

## 2. Schema-Based Ingestion

Once the table is recognized as a raw grid, the system uses **LlamaExtract** alongside pre-defined Pydantic schemas to transform cells into validated records.

Rather than extracting the entire table as a single chunk, the system uses the `PER_TABLE_ROW` ingestion target. Each row in the PDF table is mapped into a single database record.

### Example Pydantic Schema for GDP:
Here is a Pydantic schema definition for a GDP indicator table:

```python
from pydantic import BaseModel, Field

class GdpBySector(BaseModel):
    year: int = Field(description="The statistical year of the record")
    sector_code: str = Field(description="The economic sector code (e.g., A, B, C...)")
    sector_name_vi: str = Field(description="The economic sector name in Vietnamese")
    value: float = Field(description="The GDP value of the sector")
    unit: str = Field(description="The measurement unit, e.g., billion VND")
```

When this schema is applied, the AI parses the PDF table row:
`Agriculture, forestry and fisheries | 2023 | Billion VND | 1,234,567.8`
And converts it into the following JSON object:
```json
{
  "year": 2023,
  "sector_code": "A",
  "sector_name_vi": "Nông, lâm nghiệp và thủy sản",
  "value": 1234567.8,
  "unit": "Billion VND"
}
```

---

## 3. Table Routing

Because a statistical yearbook contains hundreds of tables spanning multiple topics, the system must determine which schema to apply to each table. PDFHUB implements a **Table Router** mechanism:

1.  The system reads the table caption and surrounding text context (e.g., *"Table 2.15: Export volume of key commodities by trading partners"*).
2.  The LLM Router classifies the caption into its corresponding topic (e.g., *International Trade / Exports*).
3.  The system applies the configured schema for that topic (e.g., `TradeByCommodity` schema) to ingest row-level records.
4.  If a table caption is unrecognized, the table is queued under *Pending Schema Definition* and administrators are notified.
