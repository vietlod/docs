---
title: EcoLab Overview & Step-by-Step User Guide
sidebar_position: 1
description: Step-by-step user guide for the EcoLab quantitative economics and behavioral research platform (v1.10.0), covering resource auditing, custom survey simulation, citation-style-aware sequential figure and table numbering, academic integer formatting, and universal auto-publishing across all research modes.
---

import McpPromptCatalog from '@site/src/components/McpPromptCatalog';

# EcoLab Overview & Step-by-Step User Guide

**EcoLab** (version `v1.10.0`) is an end-to-end quantitative economics, finance, and behavioral research platform designed to guide researchers through the entire scholarly workflow — from auditing attached research materials and synthesizing DOI-verified literature to estimating econometric and structural equation models, formatting figures and tables to international citation standards, and automatically publishing journal-ready articles.

---

## 1. Six Core Capabilities for Researchers

| Core Capability | Researcher Experience | Scholarly Value |
| :--- | :--- | :--- |
| **1. Attached Resource Auditing & Context Standardization** | Attach reference papers, research outlines, survey questionnaires, empirical datasets, or public article URLs directly in your initial prompt | Automatically detects methodological gaps, locks research questions (`RQ1..RQk`) and hypotheses (`H1..Hk`), personalizes academic style, and ensures the final report is 100% grounded in your provided resources. |
| **2. 6-Source DOI-Verified Literature Synthesis** | Search across six international scholarly catalogs simultaneously with verified DOI metadata | Every in-text citation is automatically rendered as a **clean, ununderlined one-way hyperlink** distinguished by academic color; clicking any citation smoothly scrolls to and highlights the exact entry in the References section. |
| **3. Behavioral Survey Studio & Academic Integer Formatting** | Conduct Likert-scale survey (`1..5`, `1..7`), binary outcome (`0`/`1`), and in-depth interview studies with 100% preservation of custom questionnaires | Sample sizes ($N$) and `Min`/`Max` bounds of Likert scale items and binary variables are formatted strictly as **integers** (`400`, `1`, `5`, `0`, `1`) in both statistical tables and downloadable `.csv` datasets, while continuous metrics (`Mean`, `SD`, path coefficients) retain standard decimal precision. |
| **4. Citation-Style Sequential Figure & Table Numbering (`APA 7th` Default)** | All charts, structural diagrams (`M1`, `M2`, `R1`), and statistical tables are numbered sequentially (`Figure 1, Figure 2, Figure 3...` and `Table 1, Table 2, Table 3...`; `Table A1...` in Appendices; or `TABLE I, TABLE II` under `IEEE`) | Synchronizes 100% of in-text cross-references with figure and table captions, and locks punctuation line-breaking so `.`, `?`, `~`, `,`, `;`, `:`, and `!` never wrap onto a new line by themselves on desktop, tablet, or mobile screens. |
| **5. Universal Auto-Publishing Across All Research Modes** | Automatically publishes every completed output to the Academic Blog (`/blog`) — not only 5-Stage Journal/Thesis projects (Mode B), but also **Top 5 Research Ideas**, **1-Click Automated Econometric Studies (Mode A)**, and custom synthesized reports | Every run returns a live public article URL complete with an academic cover banner and downloadable replication assets. |
| **6. Standalone Journal-Ready Prose & Condensed 3-Skill Suite** | Produces clean manuscripts free of any internal workflow self-references, paired with a floating **Back-to-Top** progress ring and condensed 1-click copy-paste skills for Gemini Connected Apps | Readers can download the exact `.csv` dataset and switch effortlessly across `R`, `Stata`, and `Python` replication scripts on any device. |

---

## 2. Step-by-Step User Guide for Four Common Workflows

### Workflow A — Starting from Your Own Research Outline, Seed Paper, or Empirical Dataset

1. **Step 1 (Attach Your Materials):** Open your connected AI assistant or the EcoLab workspace, attach your research outline, reference paper, public DOI URLs, or empirical dataset, and state your research objective.
2. **Step 2 (Review the Automated Audit):** EcoLab audits four dimensions (objectives and hypotheses, dataset or questionnaire structure, model-data compatibility, and verified citations), standardizing any inconsistencies before estimation begins.
3. **Step 3 (Estimate on Your Empirical Data):** When you provide an empirical dataset, EcoLab locks the project to your real data (preventing simulated data substitution) and executes the primary estimator, robustness specifications, and diagnostic battery.
4. **Step 4 (Receive Your Manuscript & Live Published URL):** Receive a complete manuscript with sequentially numbered tables and figures (`Table 1, Table 2...`, `Figure 1, Figure 2...`) alongside its live published article link on `/blog`.

### Workflow B — Conducting a Behavioral Survey or Structural Equation Study (`EFA / CFA / SEM / PLS-SEM`)

1. **Step 1 (Provide Constructs or Custom Survey Items):** Describe your latent constructs or paste your custom survey questionnaire.
   - If you request **strict questionnaire preservation**, EcoLab keeps 100% of your exact items without adding or dropping any indicator.
2. **Step 2 (Run Psychometric & Structural Estimation with Integer Formatting):** EcoLab evaluates Cronbach's Alpha, EFA, CFA/PLS-SEM measurement quality (AVE, CR, HTMT, Fornell–Larcker), Common Method Bias (CMB), sensitivity analysis, and structural paths. Sample sizes ($N$) and `Min`/`Max` values for Likert and binary items are formatted strictly as integers (`1`, `5`, `0`, `1`).
3. **Step 3 (Inspect the Sequentially Numbered 300-DPI Structural Diagrams):**
   - **Measurement & Conceptual Diagram (`Figure 1`):** Review the measurement model featuring concise indicator range boxes (`AIC1–AIC4`, `λ ∈ [0.84; 0.87]`) and construct names fitted completely inside ellipses.
   - **Competing Model Comparison (`Figure 2`):** Compare **Panel A (Baseline Direct Model)** against **Panel B (Extended / Mediated Alternative Model)** with a full construct code key bar at the bottom.
   - **Empirical Path Estimation Diagram (`Figure 3`):** Inspect the estimated path coefficients and significance levels directly on each hypothesis arrow (`H1: β̂ = +0.307***`, `H8: β̂ = +0.039 (ns)`).

### Workflow C — Generating Top 5 Research Ideas or Running a 1-Click Econometric Study (Mode A)

1. **Top 5 Research Ideas Blueprint:** Enter any research topic (for example, *"List the top 5 research ideas on green finance and corporate ESG performance in Vietnam"*). EcoLab formulates 5 structured research blueprints with literature gaps, identification strategies, and variable specifications, and **automatically publishes the blueprint article** to `/blog`.
2. **1-Click Automated Econometric Study (Mode A):** Request a 1-click empirical estimation on any macro, panel, corporate, or survey topic. EcoLab executes pre-estimation diagnostics, multi-model estimation, and post-estimation checks, and **automatically publishes the full empirical report and replication scripts** to `/blog`.

### Workflow D — Navigating Citations & Replicating Studies on the Academic Blog (`/blog`)

1. **One-Way Citation Lookup:** Click any color-highlighted in-text citation such as `Hair et al. (2022)` or `(Fornell & Larcker, 1981)` to smooth-scroll directly to the corresponding reference entry in **Section 6. References**, then click the `https://doi.org/...` link to inspect the source publication.
2. **Return to Top Anytime:** Click the floating **Back-to-Top** button with the live circular reading progress ring at the bottom-right corner.
3. **Download the `.csv` Dataset & Replication Code:** Scroll to the **Appendix**, click **Download Dataset (.csv)** (with integer-formatted Likert and binary columns), and use the single-row **R · Stata · Python** switcher to copy the complete replication script matching the dataset columns 100%.

---

## 3. Catalog of 23 Empirically Verified MCP Prompts (P01–P23)

Click **Copy** on any bilingual prompt below to run a complete 5-stage study:

<McpPromptCatalog locale="en" />
