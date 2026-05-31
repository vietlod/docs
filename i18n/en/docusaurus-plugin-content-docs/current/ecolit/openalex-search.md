---
title: OpenAlex Search
sidebar_position: 2
---

# Extracting Data via OpenAlex API

EcoLit's data ingestion and querying interfaces are designed to be fully synchronous with the official **OpenAlex API** (the world's largest open academic catalog). This allows researchers to query the local database using familiar OpenAlex query syntax.

---

## 1. Endpoint Mapping

The platform exposes local API endpoints that map directly to the upstream OpenAlex catalog:

| Upstream OpenAlex Endpoint | App API Endpoint | Extracted Object |
| :--- | :--- | :--- |
| `GET /works` | `GET /api/openalex/works` | List of works (papers, books, dissertations). |
| `GET /works/{id}` | `GET /api/openalex/works/{id}` | Detailed work metadata based on OpenAlex ID. |
| `GET /authors` | `GET /api/openalex/authors` | List of researchers (Authors). |
| `GET /authors/{id}` | `GET /api/openalex/authors/{id}` | Author details, h-index, and affiliation history. |
| `GET /sources` | `GET /api/openalex/sources` | Host venues (Journals, repositories, preprints). |
| `GET /institutions` | `GET /api/openalex/institutions` | Universities and research centers (Institutions). |
| `GET /topics` | `GET /api/openalex/topics` | Academic classification hierarchy (Topics/Subfields/Fields). |

---

## 2. Inbound Query Parameter Filtering

The system supports all advanced filtering parameters in accordance with the OpenAlex standard:

*   **`filter=` (Filters):** Narrow down results based on specific fields.
    *   *AND logic:* Separate parameters with commas (`,`). E.g., `filter=publication_year:2020,has_abstract:true`
    *   *OR logic:* Separate parameters with vertical pipes (`|`). E.g., `filter=institutions.country_code:vn|institutions.country_code:sg`
    *   *Negation:* Prepend an exclamation mark (`!`). E.g., `filter=type:!dataset`
    *   *Numeric range:* Separate values with a hyphen (`-`). E.g., `filter=cited_by_count:10-100`
*   **`search=` (Full-text search):** Search keywords across titles, abstracts, and full texts. E.g., `search=green finance`
*   **`sort=` (Sorting):** Sort by metrics. E.g., `sort=cited_by_count:desc` (Sorts citation count in descending order).
*   **`group_by=` (Aggregations):** Group results for charts. E.g., `group_by=publication_year`
*   **`sample=` (Random sampling):** Select $N$ random results for preliminary reviews. E.g., `sample=50`

---

## 3. Fallback Proxy Mechanics

To optimize disk storage, EcoLit implements a two-tier querying workflow:

```
Query Request → Look up Local Database (PostgreSQL)
  ├─► [Record Exists] ──► Return result instantly
  └─► [Not Found] ──────► Proxy to Upstream OpenAlex ──► Return & Save to PostgreSQL
```

1.  When a user requests a work or author detail (e.g., `GET /api/openalex/works/W4285741639`), the system checks the local PostgreSQL database first.
2.  If the record is found, it is returned instantly (latency < 50ms).
3.  If not found locally, EcoLit automatically triggers the **Fallback Proxy**: sending a request directly to the upstream OpenAlex server (`https://api.openalex.org/works/W4285741639`) using the configured Polite Pool email.
4.  Once retrieved, the data is returned to the user, and a background task is spawned to write this record to PostgreSQL and synchronize it with Neo4j, ensuring future queries for this record do not require internet access.
