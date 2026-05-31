---
title: Getting Started & Auth
sidebar_position: 1
---

# Authentication, Authorization & API Key Management

To start exploiting the vast academic knowledge base of EcoLit, you need to log into the system and configure your AI resource quotas.

---

## 1. Google Sign-In & Access Control

EcoLit integrates a single sign-on (SSO) solution via Google accounts to simplify registration:

1.  Access the EcoLit home page.
2.  Click the **Đăng nhập bằng Google** (Sign in with Google) button.
3.  The system will redirect you to the Google authentication screen. Select your email account.
4.  Upon successful authentication, the backend will verify and initialize your profile in the PostgreSQL database. Newly registered accounts are assigned the default **Starter** plan.

### Role-Based Access Control (RBAC)
The system categorizes user permissions into 3 primary roles:
*   **Viewer:** Read-only access. Can search papers and explore the Knowledge Graph, but cannot interact with the AI Chatbot.
*   **Researcher (Default):** Search papers, explore interactive graph networks, interact with the AI Chatbot, and configure personal API Keys.
*   **Admin:** Full administrative control. Configures ingestion rules, manages user accounts, changes user roles/plans, and monitors billing events.

---

## 2. Subscription Plans & Token Quotas

To ensure fair usage and manage AI computing costs, the system applies monthly token quotas:

| Subscription Plan | Monthly Token Quota | AI Chat Access | Graph Explorer | Literature Search | Admin Rights |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Starter** (Default) | 50,000 tokens | ✅ (Limited turns) | ✅ | ✅ | ❌ |
| **Pro** | 500,000 tokens | ✅ | ✅ | ✅ | ❌ |
| **Enterprise** | Unlimited | ✅ | ✅ | ✅ | ✅ |

*The system counts input (prompt) and output (completion) tokens separately to deduct quotas accurately.*

---

## 3. Configuring Personal API Keys (User Settings)

By default, the system utilizes local LLMs running via **Ollama** (such as Qwen3-30B or Phi-4) to process tasks, ensuring absolute data privacy. However, if you wish to improve response quality or when the local server is overloaded, you can configure your own third-party API Keys:

### Configuration Steps
1.  Navigate to **Settings (Cài đặt) → API Keys (Khóa API)**.
2.  You will see cards for each provider: **OpenAI, Google Gemini, DeepSeek, and Anthropic (Claude)**.
3.  Click the *"How to get API Key"* link to open the provider's developer console.
4.  Paste your API key into the input field (the key will be masked to protect privacy).
5.  Click the **Test Connection** button. The system will send a small request. Once the status shows `✅ Connected`, choose your default models and click save.
6.  Enable **Set as preferred** to prioritize this provider over the local Ollama instance.

> [!IMPORTANT]
> **Encryption Security:** Your API keys are encrypted using the **AES-256** algorithm before being written to the PostgreSQL database. Keys are only decrypted in-memory during API calls.
