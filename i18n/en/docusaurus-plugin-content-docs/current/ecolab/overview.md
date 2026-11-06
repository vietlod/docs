---
title: EcoLab Overview
sidebar_position: 1
description: Overview of the EcoLab quantitative economics research platform (v1.6.0) featuring a closed-loop 5-stage pipeline, 6-source DOI-verified literature synthesis, Zero-Copy EcoData handoff, 201+ estimators across 15 families, 8-gate (G1–G8) evidence-locked manuscript authoring, and 23 verified MCP prompts.
---

import McpPromptCatalog from '@site/src/components/McpPromptCatalog';

# EcoLab Overview

**EcoLab** (version `v1.6.0`) is an end-to-end quantitative economics research workspace engineered to streamline the entire scholarly lifecycle — from research design and DOI-verified literature synthesis to standardized dataset preparation, Tri-Engine econometric estimation, and publication-ready manuscript generation.

Connected directly to the **EcoData Tri-Engine** (**Python**, **R**, and **Stata 18 MP**), EcoLab exposes a dynamically synchronized catalog of **201+ core estimators across 15 model families and 58 sub-models**, accessible both in the interactive web studio and through the **Unified 53-Tool EcoData MCP (`https://ecodata.io.vn/mcp`)** and **Direct 15-Tool EcoLab MCP (`https://ecolab.io.vn/mcp`)** gateways.

---

## 1. Academic Architecture and Core Capabilities

EcoLab is built around methodological transparency, 100% computational reproducibility, and zero statistical hallucination:

| Research Pillar | Core Capability | Scholarly Value Delivered |
| :--- | :--- | :--- |
| **6-Source Literature Synthesis** | OpenAlex, Crossref, DOAJ, and arXiv out-of-the-box, plus encrypted personal keys for Semantic Scholar and CORE | Every citation is anchored to a Verified Citation Ledger entry backed by an authentic DOI or primary scholarly identifier and rendered in standard academic styles (APA 7th, Chicago, Harvard, IEEE, MLA). |
| **Zero-Copy EcoData Data Bridge** | Seamless transfer of global macro indicators, Vietnam 34/63-province panels (`build_research_panel`), 30-year corporate financials, and VHLSS/PCI microdata | Eliminates manual spreadsheet merging errors while preserving bilingual variable labels and exporting clean 2-sheet Excel replication workbooks (`"Data"` + `"Meta"`). |
| **201+ Econometric Estimators** | 15 model families and 58 sub-models executing on Python, R, and Stata 18 MP with `<= 60s` automatic catalog sync | Separates Pre-Estimation and Postestimation diagnostics, enforces Fail-Closed `422` integrity (zero silent OLS/FE fallback), and exports `.zip` replication bundles (`SHA256SUMS.txt`). |
| **8-Gate (G1–G8) Evidence-Locked Manuscripts** | Dual **Standard IMRaD** and multi-perspective **STORM** authoring across 5 citation styles (APA 7th, Chicago, Harvard, IEEE, MLA) | Locks every reported coefficient, standard error, $p$-value, identification rationale (G7), clean 300-DPI figure label (G8), and native Word OMML `.docx` equation (G6) to verified estimation artifacts. |
| **Dual MCP Ecosystem (`server_llm_calls == 0`)** | 53 unified tools at `https://ecodata.io.vn/mcp` (38 EcoData + 15 EcoLab) or 15 direct tools at `https://ecolab.io.vn/mcp` | Connects cleanly to Gemini Task/Gems, AntiGravity, Claude Code, OpenAI Codex, and Cursor IDE with zero server-side LLM quota dependency. |

---

## 2. Target Audience

EcoLab accelerates rigorous empirical research across the academic and policy community:

- **Graduate Students & PhD Candidates:** Structure theses and dissertations in economics, corporate finance, international trade, and public policy to international peer-reviewed standards.
- **University Faculty:** Rapidly prototype empirical strategies, validate identification assumptions on real datasets, and supervise students using transparent `.do`, `.R`, and `.py` replication bundles.
- **Researchers & Policy Analysts:** Conduct staggered policy evaluations (Callaway-Sant'Anna DID, SDID, Synthetic Control, RDD), productivity benchmarks (SFA/DEA/ACF TFP), and structural demand analyses (QUAIDS/BLP) with full diagnostic auditability.

---

## 3. Closed-Loop 5-Stage Research Pipeline

To guarantee scientific coherence, EcoLab organizes every study into a five-stage pipeline where hypotheses, variable dictionaries, and empirical artifacts flow seamlessly from stage to stage:

```mermaid
flowchart LR
    A["1. Idea Design"] --> B["2. 6-Source Lit Review"]
    B --> C["3. Data & Zero-Copy"]
    C --> D["4. Modeling (201+)"]
    D --> E["5. 8-Gate Report (.docx)"]
```

1. **Idea Generation:** Formulate, score, and refine empirical research questions and causal identification designs from topics or seed papers.
2. **Literature Review:** Query six scholarly databases simultaneously, construct structured literature matrices, isolate research gaps, formalize $H_0 / H_1$ hypotheses, and propose empirical variable frameworks.
3. **Data Collection & Diagnostics:** Ingest datasets Zero-Copy from EcoData (`build_research_panel`) or upload local CSV/Excel/Stata files, inspect summary statistics and correlation matrices, and run **Pre-Estimation Diagnostics**.
4. **Econometric Modeling:** Estimate **201+ core estimators across 15 model families** on Python, R, and Stata 18 MP, audit **Postestimation Diagnostics**, run robustness specifications, and export `.zip` replication bundles (`SHA256SUMS.txt`).
5. **Research Report:** Author **Standard IMRaD** or **STORM** manuscripts verified through eight evidence-locking gates (G1–G8), exporting native Word OMML `.docx`, clean 300-DPI PNG figures, LaTeX, Markdown, and HTML.

---

## 4. Catalog of 23 Empirically Verified MCP Prompts (P01–P23)

Use the 23 bilingual prompts below to test and execute the complete 5-stage EcoData + EcoLab workflow directly inside Google Gemini, Claude, or Cursor. Click **Copy** to grab any prompt:

<McpPromptCatalog locale="en" />
