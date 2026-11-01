import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const CARD_ICONS = [
  // Chart / Analytics
  (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 3v18h18" />
      <path d="M7 14l4-4 4 4 5-6" />
    </svg>
  ),
  // Database / Layers
  (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
    </svg>
  ),
  // Globe / Network
  (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3.6 9h16.8M3.6 15h16.8" />
      <path d="M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
    </svg>
  ),
  // Code / Terminal
  (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
      <line x1="14" y1="4" x2="10" y2="20" />
    </svg>
  ),
  // Shield / Verification
  (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  // Book / Academic
  (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
];

export function FeatureCardsRow({ features = [] }) {
  const { i18n } = useDocusaurusContext();
  const isEn = i18n?.currentLocale === 'en';
  const ctaLabel = isEn ? 'Explore Guide' : 'Xem hướng dẫn';

  if (!Array.isArray(features) || features.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1rem',
        margin: '1.25rem 0 1.75rem 0',
      }}
    >
      {features.map((item, idx) => {
        const title = item.title || item.name || '';
        const desc = item.description || '';
        const href = item.link || item.url || '';
        const badge = item.badge || '';
        const iconNode = CARD_ICONS[idx % CARD_ICONS.length];

        const cardInner = (
          <div
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '1.15rem 1.25rem',
              borderRadius: '12px',
              border: '1px solid var(--ifm-color-emphasis-200)',
              background: 'var(--ifm-background-surface-color)',
              boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
              transition: 'border-color 0.2s ease, transform 0.2s ease',
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0.65rem',
                  gap: '0.5rem',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'rgba(13, 148, 136, 0.12)',
                    color: '#0d9488',
                    flexShrink: 0,
                  }}
                >
                  {iconNode}
                </span>
                {badge ? (
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '0.15rem 0.55rem',
                      borderRadius: '999px',
                      background: 'rgba(30, 58, 138, 0.1)',
                      color: 'var(--ifm-color-primary)',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {badge}
                  </span>
                ) : null}
              </div>
              <div
                style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: 'var(--ifm-heading-color)',
                  marginBottom: '0.45rem',
                  lineHeight: 1.35,
                }}
              >
                {title}
              </div>
              <p
                style={{
                  fontSize: '0.88rem',
                  color: 'var(--ifm-color-emphasis-700)',
                  margin: 0,
                  lineHeight: 1.55,
                }}
              >
                {desc}
              </p>
            </div>
            {href ? (
              <div
                style={{
                  marginTop: '0.9rem',
                  paddingTop: '0.65rem',
                  borderTop: '1px solid var(--ifm-color-emphasis-200)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: '#0d9488',
                }}
              >
                <span>{ctaLabel}</span>
                <span aria-hidden="true">→</span>
              </div>
            ) : null}
          </div>
        );

        return href ? (
          <Link
            key={idx}
            to={href}
            style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}
          >
            {cardInner}
          </Link>
        ) : (
          <div key={idx} style={{ height: '100%' }}>
            {cardInner}
          </div>
        );
      })}
    </div>
  );
}

export default FeatureCardsRow;
