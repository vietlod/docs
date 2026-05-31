---
title: Semantic Analysis
sidebar_position: 3
---

# Keyword Matching Engine & Semantic Analysis

To provide accurate keyword counts across complex layouts (such as tables, justified text columns, and low-quality scans) while maintaining server performance, KEYWORDs integrates a 3-layer matching engine and advanced OCR calibration.

---

## 1. Resource Isolation & Thread Limits

To prevent OCR tasks from consuming all CPU cores and affecting other applications on the VPS, KEYWORDs enforces strict resource caps:

*   **Hardware Capping:** The Celery worker container is limited to **2 vCPU** and **6 GB RAM**. The API backend container is limited to **1.5 vCPU** and **1 GB RAM**.
*   **Thread Configuration (`runtime_limits.py`):** Forces math-heavy libraries (PyTorch, OpenCV, OpenBLAS, MKL) and EasyOCR to run a maximum of **2 parallel threads**, matching the physical CPU allocations. This prevents CPU runaway.

---

## 2. Multi-DPI OCR Calibration

Running OCR at a fixed resolution (like 180 DPI) can result in low accuracy if the source document text is small or blurred. KEYWORDs addresses this with a calibration algorithm:

1.  **Sampling:** When a scanned PDF is detected, the system selects 5 representative sample pages.
2.  **Multi-DPI Test Scanning:** Runs OCR on these 5 pages at 5 resolution values: **150, 200, 250, 300, and 400 DPI**.
3.  **Accuracy Analysis:** Counts keywords retrieved at each DPI level. The DPI that yields the highest keyword count and best confidence score is selected as the **optimal DPI**.
4.  **Full Scan:** Performs OCR on all pages of the document at the selected optimal DPI. This increases extraction accuracy by up to **40%** compared to using a fixed resolution.

---

## 3. 3-Layer Keyword Matching Engine

PDF documents can contain random line breaks or Vietnamese character encoding issues, causing standard string search tools to miss keywords (false negatives). KEYWORDs deploys a 3-layer matching engine:

```
Input Text ──► Layer 1: Exact Match
                 └──► Layer 2: Whitespace Normalization (Join linebreaks \n)
                        └──► Layer 3: Diacritics Stripping (Normalized fallback)
```

### Layer 1: Exact Match
Performs standard case-sensitive string matching to locate perfect keyword occurrences.

### Layer 2: Whitespace Normalization
*   **The Issue:** In multi-column PDFs, keywords can be split by newlines `\n` (e.g., `Chuyển\nđổi số`).
*   **Solution:** The engine collapses all whitespaces and newlines into a single space before matching. The keyword `Chuyển đổi số` will successfully match the broken string above.

### Layer 3: Diacritics Stripping (Fallback)
*   **The Issue:** Many Vietnamese PDFs carry corrupted Unicode maps, causing vowels with tone marks to separate or show as garbled glyphs (e.g., `chuyển` becoming `chuyê'n`).
*   **Solution:** If the first two layers fail, the engine strips all tone marks and diacritics from both the keyword and the source text for a normalized fallback match (e.g., `chuyen doi so` matches `chuyê'n đổi số`). This salvages counts lost to PDF encoding bugs.

---

## 4. Exporting Jupyter Notebooks (Google Colab)

To support researchers running analysis independently on their own machines or cloud platforms:

*   The platform provides a one-click export button generating a self-contained Jupyter Notebook `.ipynb` file (`fintech_extract.ipynb`).
*   This notebook contains documented Python code for:
    *   Mounting personal Google Drive storage.
    *   Installing PDF and OCR libraries (PyMuPDF, EasyOCR).
    *   The same 3-layer keyword counting logic used on the web app.
    *   Exporting formatted Excel spreadsheets.
*   You can upload this `.ipynb` file to Google Colab and select "Run all" to process data without local environment setup.
