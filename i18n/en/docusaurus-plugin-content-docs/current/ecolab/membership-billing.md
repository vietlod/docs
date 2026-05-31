---
title: Membership & Billing
sidebar_position: 4
---

# User Account, API Keys & SePay Integration

EcoLab provides an intuitive administrative dashboard under **Cài đặt** (Settings) to help you manage your personal profile, configure large language model (LLM) API keys, monitor resource utilization, and purchase premium upgrades via the automated SePay gateway.

---

## 1. Profile Management & Usage Analytics

In the **Hồ sơ (Profile)** tab:
*   Update your name, contact email, and account password.
*   View your active subscription tier (Free, Premium, Academic Partner) and expiration date.

In the **Sử dụng Token (Token Usage)** tab, the platform provides clear metrics on your AI consumption:
*   *Token Consumption:* Total input and output tokens consumed.
*   *Estimated Cost:* Token usage converted to USD/VND value based on real-time pricing from LLM providers.
*   *API Calls:* Total successful connections to LLM backends.
*   Daily consumption bar charts help you analyze usage trends and optimize prompts.

---

## 2. Configuring LLM API Keys

To activate AI Agents throughout the research pipeline, you need to configure at least one valid API key from an LLM provider.

### Setup Guide
1.  Navigate to **Settings → API Keys**.
2.  Select your provider:
    *   **DeepSeek:** The primary reasoning engine, optimized for mathematical structures and econometrics logic.
    *   **OpenAI:** GPT-4 models, offering high stability and general-purpose capabilities.
    *   **Gemini (Google):** Flash models, offering quick response times for general Q&A.
    *   **Perplexity:** Search-augmented models, excellent for locating academic papers.
    *   **OpenRouter:** A model aggregator allowing you to access 400+ models from a single API endpoint.
3.  Paste your API key and click **Thêm** (Add).
4.  Click **Kiểm tra** (Test Connection). The system will send a small test prompt to verify. A green checkmark confirms a successful connection.

> [!IMPORTANT]
> **API Key Encryption:** All user-provided API keys are encrypted at rest using **asymmetric encryption in the database**. Keys are only decrypted in-memory during API calls and are never exposed.

---

## 3. Upgrading via the SePay Payment Gateway

EcoLab integrates the **SePay** payment gateway to support instant premium upgrades or token purchases via Vietnamese bank transfers.

```
Select Plan → System generates QR & Transaction Code → 
Bank Transfer → SePay webhook notification → Instant Account Activation
```

### Steps to Upgrade
1.  Navigate to the **Upgrade** page or the **Billing** tab.
2.  Select your desired plan (e.g., *Academic Monthly*, *Professional Yearly*, or *Token Credit Top-up*).
3.  The system will generate a checkout window showing:
    *   **A VietQR Code** (for fast scanning using any Vietnamese Mobile Banking application).
    *   **Transfer Details:** Account Number, Recipient Bank, exact Amount, and the **Transfer Message** (containing a unique transaction ID in the format `ECOLABXXXXX`).
4.  Initiate the transfer from your banking app.
    *   > [!WARNING]
    *   If transferring manually (not scanning the QR code), **you must input the Transfer Message exactly as displayed**. This message is the only way the system matches transaction records.
5.  As soon as the bank processes the transaction (usually within 3 to 10 seconds), SePay will send a webhook confirmation to the EcoLab backend. The system will automatically upgrade your account to Premium without requiring a page reload.
