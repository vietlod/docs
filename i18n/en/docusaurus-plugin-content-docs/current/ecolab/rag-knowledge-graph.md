---
title: Knowledge Graph & RAG
sidebar_position: 2
---

# AI RAG Agents & Academic Knowledge Graphs

EcoLab's **Literature Review** module is designed to fully automate the process of searching, evaluating, and synthesizing academic papers related to your research topic. This module uses **Retrieval-Augmented Generation (RAG)** combined with **Knowledge Graphs** powered by Neo4j to ensure academic accuracy and eliminate AI hallucinations.

---

## 1. Academic Search and Filtering

The platform connects directly to large-scale open academic databases (Semantic Scholar, ArXiv) to retrieve relevant literature:

1.  Navigate to the **Literature Review** module.
2.  Enter your research question or topic into the search bar. The AI agent will automatically combine this with the selected project idea as the background context.
3.  Click the **Chạy tổng quan** (Run Review) button.
4.  Search results will populate the **Bài báo** (Papers) tab with detailed information:
    *   Paper title, authors list, journal, year.
    *   Citation count — a key metric for measuring paper authority.
    *   Verification status.

---

## 2. Academic Synthesis Modules

After retrieving the papers, EcoLab's RAG agent analyzes the abstracts and full texts (if available) to synthesize findings into 5 structured formats:

### Literature Matrix
A structured matrix that allows you to compare previous studies at a glance:
*   **Author & Year:** Identifies the timeline and research group.
*   **Research Question:** The core question addressed by the paper.
*   **Econometric Methodology:** The estimators used (e.g., OLS, GMM, FE/RE).
*   **Key Findings:** The most important quantitative results of the study.
*   **Variables & Identification Strategy:** Key variables included in the model.

### Research Gaps
The AI agent analyzes the collection of papers to identify remaining knowledge gaps that your study could fill:
*   *Geographic/Contextual Gaps:* Studies have not been conducted in developing countries or specifically in Vietnam.
*   *Methodological Gaps:* Lack of robustness tests or endogeneity corrections.
*   *Temporal Gaps:* Datasets used in previous studies are outdated and do not reflect recent economic shifts (e.g., post-pandemic or post-financial crisis).

### Research Objectives & Hypotheses
The AI automatically translates your selected idea and reference papers into a clear set of objectives:
*   **General & Specific Objectives.**
*   **Scientific Hypotheses:** Clearly defines testing hypotheses (e.g., $H_0$, $H_1$) to form the basis for econometric modeling.

### Proposed Model (Variables & Estimator)
Based on the selected papers, the AI suggests a model specification:
*   **Editable Variables Table:**
    *   *Variable Name:* Name of the indicator (e.g., ROA, Leverage, Size).
    *   *Variable Role:* Dependent, Independent, or Control.
    *   *Measurement:* How the indicator is calculated.
    *   *Expected Sign:* Negative ($-$), positive ($+$), or ambiguous ($?$) based on economic theory.
*   **Suggested Estimator:** Suggests OLS, Fixed Effects, or GMM depending on the proposed data structure.

### Knowledge Graph Viz
Uses Neo4j to draw interactive visual network maps connecting:
*   Citation relationships between papers.
*   Semantic relationships between research concepts.
*   The most frequently applied methodological clusters.
