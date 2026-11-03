import React, { useEffect, useState } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import viMessages from "@site/src/i18n/vi.json";
import enMessages from "@site/src/i18n/en.json";

const STORAGE_KEY = "tnsai_docs_cookie_consent_v2026";

export default function Root({ children }) {
  const { i18n } = useDocusaurusContext();
  const locale = i18n?.currentLocale === "en" ? "en" : "vi";
  const dict = locale === "en" ? enMessages.cookieBanner : viMessages.cookieBanner;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const handleSave = (analytics) => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          essential: true,
          analytics,
          updatedAt: new Date().toISOString(),
        })
      );
    } catch {
      // Ignore storage errors
    }
    setVisible(false);
  };

  return (
    <>
      {children}
      {visible && dict && (
        <div
          role="region"
          aria-label={dict.title}
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            padding: "12px 16px",
            background: "rgba(15, 23, 42, 0.96)",
            borderTop: "1px solid rgba(20, 184, 166, 0.35)",
            color: "#f1f5f9",
            boxShadow: "0 -10px 25px rgba(0,0,0,0.35)",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            <div style={{ flex: "1 1 320px" }}>
              <div style={{ fontWeight: 700, fontSize: "14px", marginBottom: "4px", color: "#5eead4" }}>
                {dict.title}
              </div>
              <div style={{ fontSize: "12px", lineHeight: 1.5, color: "#cbd5e1" }}>
                {dict.desc}{" "}
                <a
                  href={dict.policyHref}
                  style={{ color: "#2dd4bf", textDecoration: "underline", fontWeight: 600 }}
                >
                  {dict.policyLink}
                </a>
              </div>
              <div style={{ fontSize: "11px", lineHeight: 1.5, color: "#94a3b8", marginTop: "4px" }}>
                {dict.operatorLine}
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              <button
                type="button"
                onClick={() => handleSave(false)}
                style={{
                  padding: "8px 14px",
                  borderRadius: "8px",
                  border: "1px solid #475569",
                  background: "#1e293b",
                  color: "#e2e8f0",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {dict.essentialOnly}
              </button>
              <button
                type="button"
                onClick={() => handleSave(true)}
                style={{
                  padding: "8px 14px",
                  borderRadius: "8px",
                  border: "none",
                  background: "#0d9488",
                  color: "#ffffff",
                  fontSize: "12px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {dict.acceptAll}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
