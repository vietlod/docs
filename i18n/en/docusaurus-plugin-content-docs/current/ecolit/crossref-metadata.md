---
title: Crossref Metadata
sidebar_position: 3
---

# Extracting Metadata via Crossref API

In addition to OpenAlex, EcoLit synchronizes with the **CrossRef API** — the world's largest DOI (Digital Object Identifier) registration agency for academic publications. This module enables you to look up precise metadata for any paper via its DOI.

---

## 1. Crossref Endpoint Mapping

The platform provides local endpoints designed to match the native structure of Crossref:

| Upstream Crossref Endpoint | App API Endpoint | Lookup Domain |
| :--- | :--- | :--- |
| `GET /works` | `GET /api/crossref/works` | Search and filter works across the Crossref database. |
| `GET /works/{doi}` | `GET /api/crossref/works/{doi}` | Retrieve detailed metadata for a paper via its DOI. |
| `GET /journals` | `GET /api/crossref/journals` | List academic journals registered with Crossref. |
| `GET /journals/{issn}/works` | `GET /api/crossref/journals/{issn}/works` | Retrieve works published in a specific journal via ISSN. |
| `GET /members/{id}/works` | `GET /api/crossref/members/{id}/works` | Retrieve works belonging to a specific publisher member. |

---

## 2. Crossref Query Parameter Syntax

Unlike OpenAlex, Crossref uses its own naming conventions for query parameters and filters, which are fully supported by EcoLit:

*   **`query=` (Keyword search):** Free text keyword search across all publication metadata. E.g., `query=inflation targeting`
*   **`filter=` (Crossref filters):** Filter by metadata criteria.
    *   *Date Range:* `filter=from-pub-date:2020-01-01`
    *   *Author ORCID:* `filter=has-orcid:true` (Only return papers where at least one author has an ORCID).
    *   *Research Funder:* `filter=funder:10.13039/100000001`
*   **`rows=` (Page size):** Crossref allows up to **1,000** records per request. E.g., `rows=500`
*   **`cursor=` (Deep Pagination):** When downloading thousands of records, use the cursor (`cursor=*`) to paginate instead of page numbers.
*   **`mailto=` (Polite Pool):** The system automatically appends the email address configured in settings to place requests into Crossref's Polite Pool, increasing response speeds and preventing rate-limiting.

---

## 3. Fallback Proxy Workflow

Similar to OpenAlex, when you request a paper by DOI (e.g., `/api/crossref/works/10.1016/j.jfineco.2020.04.019`):

1.  The system searches for this DOI in the `papers_core` table in the local PostgreSQL database.
2.  If the record is found, it is returned immediately in Crossref JSON format.
3.  If not found, EcoLit acts as a **Proxy**: sending the request to the upstream Crossref server (`https://api.crossref.org/works/10.1016/j.jfineco.2020.04.019`) with the configured `mailto` header.
4.  The retrieved metadata is stored in the local PostgreSQL database and the citation references are extracted (`paper_references` table) to build interactive citation graphs.
