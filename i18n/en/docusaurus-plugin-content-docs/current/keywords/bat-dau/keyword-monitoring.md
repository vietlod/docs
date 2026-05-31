---
title: Keyword Monitoring
sidebar_position: 1
---

# Authentication, Google Drive Linking & Keywords Management

This guide helps you log into the KEYWORDs platform, link your Google Drive folder containing reports, and configure custom keywords dictionary files.

---

## 1. Authentication & Whitelist Policy

The platform uses **Google OAuth2** for secure authentication and automated workspace separation:

1.  Navigate to the KEYWORDs application interface (`https://keywords.tnsai.vn`).
2.  Click **Đăng nhập bằng tài khoản Google (Sign in with Google)**.
3.  **Whitelist Policy:**
    *   To manage API costs and protect the server, only email addresses added to the Whitelist by an administrator can log in successfully.
    *   The administrator's email address (`ADMIN_EMAIL`) is always automatically whitelisted.

---

## 2. Linking Google Drive Folders

To enable the system to scan and download your reports:

1.  Open your Google Drive and create a directory containing the reports you want to analyze (PDF, DOCX, XLSX, TXT).
2.  Copy the **Folder ID** from your browser's address bar. The Folder ID is the string of characters following `folders/` (e.g., `1a2b3c4d5e6f7g8h9i0j...`).
3.  In the KEYWORDs application, open the **Settings** panel.
4.  Paste your Folder ID into the **Google Drive Folder ID** field.
5.  Click **Save Settings**.
6.  The system runs a test connection to verify read permissions before saving.

---

## 3. Configuring Keywords Dictionary Files

Each extraction job counts keywords based on the active dictionary file in your workspace. You can use the default file or upload your own:

### Using the Default Dictionary
The system preloads `fintech_keywords.xlsx` containing **331 bilingual keywords** split across 11 standard technology and finance categories.

### Uploading a Custom Dictionary
If you want to track a different set of keywords (e.g., *Sustainable Development - ESG* or *E-commerce SEO*):
1.  Navigate to **Settings → Keywords File**.
2.  Click **Download Template** (Tải tệp mẫu) next to Upload New File to download the structure of the active Excel file.
3.  Open the file in Microsoft Excel and edit:
    *   **Sheet 1 (Metadata):** Defines the project title and description.
    *   **Sheet 2 (Keywords List):** Contains two columns: `Keyword` and `Category`. You can add rows and categories as needed.
4.  Save the Excel file.
5.  In settings, click **Upload New File** and select your saved Excel file.
6.  The system checks the file structure. If valid, the dictionary is immediately activated in your workspace.
