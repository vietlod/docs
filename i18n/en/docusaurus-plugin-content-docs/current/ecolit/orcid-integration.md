---
title: ORCID Integration
sidebar_position: 4
---

# Integrating ORCID Author Identifiers

To support precise tracking and management of individual researcher portfolios (preventing name ambiguity or incorrect institutional affiliations), EcoLit integrates the **ORCID** (Open Researcher and Contributor ID) standard.

---

## 1. What is ORCID and its Role?

ORCID is a unique 16-digit non-proprietary identifier (e.g., `0000-0002-1825-0097`) assigned to researchers worldwide. 

In EcoLit, ORCID serves as:
*   A unique key to identify authors in PostgreSQL (`paper_authors` table) and Neo4j (`Author` node).
*   A mechanism to group and display a researcher's portfolio accurately without mixing up researchers with identical names (e.g., "Nguyen, V.").
*   A connection to sync metadata from the author's public profile on the international ORCID registry to the local database.

---

## 2. Profile Sync Workflow via ORCID

Users with the **Researcher** role can sync any author profile (or their own) by following these steps:

1.  Navigate to the **Personal Profiles** or the author details page.
2.  Enter the 16-digit ORCID identifier (e.g., `0000-0003-1234-5678`).
3.  Click the **Đồng bộ hồ sơ** (Sync Profile) button.
4.  The system will spawn a background worker that:
    *   Queries the ORCID API for biography data: name, institutional affiliations history, and funded research grants.
    *   Cross-references OpenAlex and Crossref to download all papers (`works`) where this ORCID is listed as an author.
    *   Updates the local PostgreSQL database.

---

## 3. Neo4j Knowledge Graph Connections

Once synchronization completes, EcoLit maps the metadata to the Neo4j Academic Knowledge Graph:

```
(Author {orcid: '0000-0003-1234-5678'})-[:AUTHORED]->(Paper)
(Author)-[:AFFILIATED_WITH]->(Institution)
(Paper)-[:PUBLISHED_IN]->(Venue)
```

When exploring the Knowledge Graph, you can click on an Author node to:
*   View the co-authorship network representing frequent research partners.
*   View charts showing the topic distribution of the author's work.
*   Locate institutions associated with the author.
*   Extract text evidence clips (`Finding` nodes) taken from the author's publications.
