---
title: Knowledge Graph & RAG
sidebar_position: 2
description: Guide to EcoLab's 6-source DOI-verified Literature Review module, Verified Citation Ledger, and interactive Academic Knowledge Graph.
---

# Six-Source Literature Synthesis & Academic Knowledge Graphs

EcoLab's **Literature Review** module automates academic discovery, DOI metadata verification, empirical evidence synthesis, and interactive knowledge graph mapping tailored to your research question. Every synthesized reference is locked into a **Verified Citation Ledger** backed by primary scholarly metadata to eliminate fabricated citations.

---

## 1. Simultaneous Discovery Across Six Scholarly Databases

EcoLab queries **six authoritative scholarly registries** in parallel:

- **Four Open-Access Registries Active by Default:** **OpenAlex**, **Crossref**, **DOAJ** (Directory of Open Access Journals), and **arXiv**.
- **Two Personal-Key Enhanced Registries:** **Semantic Scholar** and **CORE** — researchers can save encrypted personal API keys in **Settings → Scholarly API Keys** and run a live connectivity probe before launching large-scale reviews.

Execution steps:

1. Navigate to the **Literature Review** stage inside your research project.
2. Enter your research query or domain keywords; EcoLab automatically incorporates your selected Stage 1 research design context.
3. Confirm source readiness across the 6 registries and click **Run Review**.
4. Inspect retrieved publications in the **Papers** tab displaying title, authors, publication year, journal venue, citation count, verified DOI/source link, and ledger status.

---

## 2. Five Structured Academic Synthesis Outputs

Once candidate papers are retrieved and deduplicated across the six sources, EcoLab synthesizes the empirical literature into five structured components:

### Literature Matrix
Compares prior empirical studies side by side across standardized academic columns:
- **Authors, Year & Venue:** Tracks theoretical and empirical lineage.
- **Core Research Question:** Identifies the primary economic mechanism studied.
- **Econometric Identification & Estimator:** Highlights estimation strategies used (such as Multi-Way HDFE, System GMM, Staggered DID, PPML, ARDL/NARDL, or ACF TFP).
- **Key Variables & Quantitative Findings:** Summarizes effect signs, magnitudes, and sample scope.

### Research Gaps
Isolates concrete scholarly contributions your paper can address:
- *Contextual & Institutional Gaps:* Under-explored emerging-market settings or harmonized Vietnam 34-province and firm-level panels.
- *Methodological Gaps:* Unresolved endogeneity, cross-sectional dependence, or staggered treatment-effect heterogeneity in older TWFE studies.
- *Temporal & Policy Gaps:* Recent structural reforms, digital transformation waves, or macroeconomic shocks absent from earlier samples.

### Research Objectives and Testable Hypotheses ($H_0 / H_1$)
Translates theoretical mechanisms and literature gaps into general objectives, specific objectives, and falsifiable statistical hypotheses ready for Stage 4 estimation.

### Proposed Variable Dictionary and Estimator Mapping
- **Editable Variable Framework:** Defines dependent, core explanatory, control, and endogenous/instrumental variables alongside measurement formulas and expected theoretical signs ($+$, $-$, $?$).
- **Recommended Estimators Across 15 Families:** Maps your data structure directly to baseline and robustness estimators within EcoLab's **201+ estimator catalog**.

### Interactive Academic Knowledge Graph
Renders an interactive network map connecting:
- Citation and co-citation clusters linking foundational papers.
- Semantic pathways bridging economic concepts and transmission channels.
- Methodological clusters showing dominant econometric designs in your field.
