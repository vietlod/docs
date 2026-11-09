---
title: EcoLab Overview & Step-by-Step User Guide
sidebar_position: 1
description: Step-by-step user guide for the EcoLab quantitative economics and behavioral research platform (v1.9.0), covering resource auditing, custom survey simulation, multi-model estimation, publication-grade structural diagrams, and one-way citation navigation.
---

import McpPromptCatalog from '@site/src/components/McpPromptCatalog';

# EcoLab Overview & Step-by-Step User Guide

**EcoLab** (version `v1.9.0`) is an end-to-end quantitative economics, finance, and behavioral research platform designed to guide researchers through the entire scholarly workflow — from auditing attached research materials and synthesizing DOI-verified literature to estimating econometric and structural equation models and publishing journal-ready manuscripts.

---

## 1. Five Core Capabilities for Researchers

| Core Capability | Researcher Experience | Scholarly Value |
| :--- | :--- | :--- |
| **1. Attached Resource Auditing & Context Standardization** | Attach reference papers, research outlines, survey questionnaires, empirical datasets, or public article URLs directly in your initial prompt | Automatically detects methodological gaps, locks research questions (`RQ1..RQk`) and hypotheses (`H1..Hk`), personalizes academic style, and ensures the final report is 100% grounded in your provided resources. |
| **2. 6-Source DOI-Verified Literature Synthesis** | Search across six international scholarly catalogs simultaneously with verified DOI metadata | Every in-text citation is automatically rendered as a **clean, ununderlined one-way hyperlink** distinguished by academic color; clicking any citation smoothly scrolls to and highlights the exact entry in the References section. |
| **3. Behavioral Survey Studio & Custom Questionnaire Lock** | Conduct Likert-scale survey and in-depth interview studies with either 100% exact preservation of your custom questionnaire or automatic item augmentation | Runs full reliability screening, exploratory and confirmatory factor analysis, common method bias checks, sensitivity analysis, mediation, moderation simple slopes, and demographic group comparisons. |
| **4. 300-DPI Three-Diagram Structural Suite (`M1`, `M2`, `R1`)** | Automatically renders and embeds three publication-grade diagrams exclusively for `EFA / CFA / SEM / PLS-SEM` studies (`Figure 3.1: M1`, `Figure 3.2: M2`, `Figure 4.1: R1`) | Displays concise indicator ranges (`ENV1–ENV4`) with loading intervals, a unified dual-frame comparison of Baseline (`Panel A`) versus Extended (`Panel B`) specifications, and staggered path coefficient badges (`H1: β̂ = +0.307***`) on arrows. |
| **5. Standalone Journal-Ready Prose & Reproducibility Package** | Produces clean manuscripts free of any internal workflow self-references, paired with a floating **Back-to-Top** progress ring | Readers can download the exact `.csv` dataset and switch effortlessly across `R`, `Stata`, and `Python` replication scripts on desktop, tablet, and mobile devices. |

---

## 2. Step-by-Step User Guide for Three Common Workflows

### Workflow A — Starting from Your Own Research Outline, Seed Paper, or Empirical Dataset

1. **Step 1 (Attach Your Materials):** Open your connected AI assistant or the EcoLab workspace, attach your research outline, reference paper, public DOI URLs, or empirical dataset, and state your research objective.
2. **Step 2 (Review the Automated Audit):** EcoLab audits four dimensions (objectives and hypotheses, dataset or questionnaire structure, model-data compatibility, and verified citations), standardizing any inconsistencies before estimation begins.
3. **Step 3 (Estimate on Your Empirical Data):** When you provide an empirical dataset, EcoLab locks the project to your real data (preventing simulated data substitution) and executes the primary estimator, robustness specifications, and diagnostic battery.
4. **Step 4 (Generate Your Publication-Ready Manuscript):** Receive a complete manuscript that resolves 100% of your locked research questions and hypotheses strictly from your estimated empirical results.

### Workflow B — Conducting a Behavioral Survey or Structural Equation Study (`EFA / CFA / SEM / PLS-SEM`)

1. **Step 1 (Provide Constructs or Custom Survey Items):** Describe your latent constructs or paste your custom survey questionnaire.
   - If you request **strict questionnaire preservation**, EcoLab keeps 100% of your exact items without adding or dropping any indicator.
2. **Step 2 (Run Psychometric & Structural Estimation):** EcoLab evaluates Cronbach's Alpha, EFA, CFA/PLS-SEM measurement quality (AVE, CR, HTMT, Fornell–Larcker), Common Method Bias (CMB), sensitivity analysis, and structural paths.
3. **Step 3 (Inspect the Three Automated 300-DPI Structural Diagrams):**
   - **In Section 3 (`Figure 3.1: Diagram M1`):** Review the measurement and conceptual model featuring concise indicator range boxes (`AIC1–AIC4`, `λ ∈ [0.84; 0.87]`) and construct names fitted completely inside ellipses.
   - **At the end of Section 3 (`Figure 3.2: Diagram M2`):** Compare **Panel A (Baseline Direct Model)** against **Panel B (Extended / Mediated Alternative Model)** with a full construct code key bar at the bottom.
   - **In Section 4 (`Figure 4.1: Diagram R1`):** Inspect the estimated path coefficients and significance levels directly on each hypothesis arrow (`H1: β̂ = +0.307***`, `H8: β̂ = +0.039 (ns)`).

### Workflow C — Navigating Citations & Replicating Studies on the Academic Blog (`/blog`)

1. **One-Way Citation Lookup:** Click any color-highlighted in-text citation such as `Hair et al. (2022)` or `(Fornell & Larcker, 1981)` to smooth-scroll directly to the corresponding reference entry in **Section 6. References**, then click the `https://doi.org/...` link to inspect the source publication.
2. **Return to Top Anytime:** Click the floating **Back-to-Top** button with the live circular reading progress ring at the bottom-right corner.
3. **Download the `.csv` Dataset & Replication Code:** Scroll to the **Appendix**, click **Download Dataset (.csv)**, and use the single-row **R · Stata · Python** switcher to copy the complete replication script matching the dataset columns 100%.

---

## 3. Catalog of 23 Empirically Verified MCP Prompts (P01–P23)

Click **Copy** on any bilingual prompt below to run a complete 5-stage study:

<McpPromptCatalog locale="en" />
