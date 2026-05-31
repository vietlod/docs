---
title: Crawler Settings
sidebar_position: 2
---

# Document Downloading & Background Task Controls

KEYWORDs is built to process large batches of corporate PDF reports reliably. This document outlines how files are crawled from Google Drive and how background tasks are monitored to prevent zombie jobs.

---

## 1. Robust Google Drive Downloading Pipeline

Downloading large reports (20 MB to 100 MB) from Google Drive can be interrupted due to network fluctuations. KEYWORDs uses a 4-tier download flow:

*   **Exponential Backoff Retries:** If connection errors occur (e.g., `HttpError 5xx/429` rate-limits, `socket.timeout`, `ConnectionError`), the system retries up to 5 times with growing delay intervals (2s → 4s → 8s → 16s → 32s).
*   **Per-chunk Timeout:** Files are downloaded in 8 MB chunks. Each chunk is capped with a 120-second timer. If a chunk stalls past this limit, the transfer resets to avoid hanging.
*   **Verification:** Once downloaded, the file size is verified against Drive metadata, the `%PDF-` signature is checked, and the MD5 checksum is compared.
*   **Atomic Finalize:** Files are written temporarily as `.part` files. Only after passing all checks is the file renamed to `.pdf` and promoted to the workspace directory.

---

## 2. Task Heartbeat Daemons

When running OCR on scanned PDFs, recognizing a single page can take several seconds to a few minutes. To prevent the background watchdog from marking active tasks as dead (zombies), KEYWORDs uses a **Heartbeat Daemon**:

*   **Parallel Watchdog Thread:** A background daemon thread runs alongside each Celery extraction task. It writes a `heartbeat_at` timestamp to the SQLite database every **30 seconds**, independent of OCR or download tasks.
*   **Accurate Zombie Detection:** The watchdog runs every 60 seconds. It only marks a job as a "zombie" if 5 minutes pass without a heartbeat **AND** checking Celery active tasks confirms the task ID is no longer in the queue.
*   **Cooperative Stop:** When a user stops a job via the UI, the daemon thread detects the database flag and halts processing between files to avoid writing incomplete files.

---

## 3. Independent Job Control Policy

To ensure fair resource sharing and prevent overloading the VPS CPU, the system enforces a **Per-User Single-Active-Job Policy**:

*   Starting or resuming a job sends a revoke call (`celery_app.control.revoke(terminate=True)`) to your other active tasks.
*   Other users' queued or active jobs continue processing sequentially without interruption.
*   **Resuming Interrupted Jobs:** If a job is stopped, clicking **Resume** prompts the system to cross-reference completed files and resume processing only the remaining pending or failed files in the batch.
