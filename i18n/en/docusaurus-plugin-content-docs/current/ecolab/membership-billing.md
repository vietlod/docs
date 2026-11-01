---
title: Membership & Billing
sidebar_position: 4
description: Guide to managing your academic profile, personal API keys (BYOK AI, Semantic Scholar, CORE, and MCP Access Tokens), and subscription upgrades in EcoLab.
---

# Account Management, Personal API Keys & Billing

EcoLab (`v1.5.0`) provides a unified workspace under **Settings** to manage your academic profile, personal AI provider keys, personal scholarly database keys, MCP access tokens, and subscription tiers.

---

## 1. Profile Management & Usage Analytics

In the **Profile** tab, you can:
- Update your display name, institutional affiliation, contact email, and account password.
- Inspect your active membership tier, project quotas, and renewal dates.

In the **Usage Analytics** tab, EcoLab reports transparent metrics covering:
- Input and output token utilization segmented across the 5-stage research pipeline.
- Daily econometric estimation runs and manuscript export history.

---

## 2. Configuring Three Categories of Personal Keys (BYOK, Scholarly & MCP)

Under **Settings → API Keys**, EcoLab organizes user-owned credentials into three isolated categories:

1. **Personal AI Provider Keys (BYOK AI):**
   - Connect your own API keys from leading language model providers (**Google Gemini**, **OpenAI**, **Anthropic Claude**, **Perplexity**, **OpenRouter**, and OpenAI-compatible endpoints) with one-click live connection testing.
2. **Personal Scholarly Literature Keys (6-Source Discovery):**
   - Four open-access scholarly databases (**OpenAlex**, **Crossref**, **DOAJ**, and **arXiv**) operate out-of-the-box without keys.
   - Add your personal **Semantic Scholar** and **CORE** API keys with live `Probe` verification to unlock dedicated rate limits across all **6/6 scholarly sources**.
3. **Personal EcoLab MCP Access Tokens:**
   - Mint, rotate, and revoke personal Bearer tokens to connect external AI clients (Gemini Task, AntiGravity, Claude Code, Codex, Cursor) directly to **`https://ecolab.io.vn/mcp`** under strict `server_llm_calls == 0` enforcement.

:::info[At-Rest Key Encryption Guarantee]
Every user-supplied API key is encrypted at rest using **Fernet authenticated encryption (AES-128-CBC + HMAC-SHA256)**. The UI displays only masked key suffixes, and keys are decrypted ephemerally in memory solely during authenticated requests initiated by their owner.
:::

---

## 3. Automated Subscription Upgrades via VietQR & SePay

EcoLab supports instant subscription activation via **SePay** automated Vietnamese bank transfers (VietQR) and online checkout:

```text
Select Membership Plan -> System generates VietQR & unique transaction reference ->
Scan QR in Mobile Banking -> Automated webhook reconciliation -> Instant Tier Activation
```

1. Navigate to the **Upgrade** page or **Settings → Billing**.
2. Choose the membership plan matching your empirical research workload.
3. Scan the **VietQR payment code** using any Mobile Banking application to pre-fill the exact amount and transaction reference automatically.

:::warning[Manual Bank Transfers]
If entering bank transfer details manually rather than scanning the VietQR code, **enter the displayed Transfer Reference string verbatim** so automated webhook reconciliation activates your membership within seconds.
:::
