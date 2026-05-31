---
title: Registration & Navigation
sidebar_position: 1
---

# Registration, Login & Project Creation

Welcome to EcoLab. This guide will walk you through setting up your account and creating your first research project on the platform.

---

## 1. Registration & Authentication

### Steps to Follow
1.  Open your browser and navigate to the EcoLab application domain (`https://ecolab.io.vn`).
2.  On the homepage, click the **Bắt đầu nghiên cứu** (Start Research) button.
3.  **Register a New Account:**
    *   Enter your name, academic/institutional email address (using `.edu` or organization email is recommended).
    *   Set a secure password (minimum 8 characters, containing uppercase, lowercase, and digits).
    *   Click **Register**.
4.  **Login:**
    *   Enter your registered email and password, then click **Login**.
    *   Upon successful authentication, you will be redirected to the **Dashboard**.

### Security Measures
To protect computing resources and user research data, the system applies the following security measures:

*   **Rate Limiting:** Accounts are temporarily locked after 5 consecutive failed login attempts within 10 minutes to protect against brute-force attacks.
*   **Session Lifespan (Token TTL):** The JWT authentication token is valid for 8 hours. You will need to log in again once it expires.
*   **Cookie Security:** Session tokens are stored in the browser's cookies using high-security attributes: `SameSite=Lax` and `Secure` (sent only over encrypted HTTPS).

---

## 2. Initializing a Research Project

All research activities, data collection, and model runs in EcoLab must be organized inside **Projects** to ensure context isolation.

### Creating a Project
1.  On the Dashboard, click the **Tạo dự án mới** (New Project) button.
2.  Enter the **Project Name** (e.g., *Impact of Capital Structure on Firm Performance in Listed Companies*).
3.  Enter a **Description** (Optional - summarizing the research goals).
4.  **Content Language Setting:**
    *   Select **Tiếng Việt** (Vietnamese) or **English** for the AI output.
    *   > [!WARNING]
    *   **This setting will be PERMANENTLY LOCKED** once the project is created. The content language determines the language of all AI-generated outputs (ideas, literature reviews, reports) throughout the project life cycle.
5.  Click **Create** to initialize the project and set it as your active project.

---

## 3. Project Life Cycle Management

You can manage your projects from the Dashboard or under the **Cài đặt → Dự án** (Settings → Projects) tab:

| Action | Description |
| :--- | :--- |
| **Save Snapshot** | Save the current research state as a version snapshot with a descriptive label. This is highly recommended before making major changes to variables or model specifications. |
| **Restore Version** | Revert the project to a previously saved snapshot. All module data will go back to that specific point in time. |
| **Clone Project** | Create an exact replica of the active project (inheriting all data, literature, and configurations) to explore alternative methodologies. |
| **Archive Project** | Hide completed projects from the active list to clean up the Dashboard. Archived projects can be restored anytime from settings. |
| **Delete Project** | Permanently delete the project and all associated data from the database. This action is irreversible. |
