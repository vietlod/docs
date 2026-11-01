import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function FeatureNotAvailable({ note, reason, label }) {
  const { i18n } = useDocusaurusContext();
  const isEn = i18n?.currentLocale === 'en';
  const textNote = note || reason;

  if (textNote) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.65rem',
          padding: '0.8rem 1rem',
          margin: '1rem 0',
          borderRadius: '10px',
          border: '1px solid rgba(217, 119, 6, 0.35)',
          background: 'rgba(217, 119, 6, 0.08)',
          fontSize: '0.88rem',
          lineHeight: 1.55,
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#d97706"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ flexShrink: 0, marginTop: '2px' }}
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <div>
          <strong style={{ color: '#d97706', marginRight: '0.35rem' }}>
            {label || (isEn ? 'Methodological Scope Boundary:' : 'Giới hạn phạm vi áp dụng:')}
          </strong>
          <span>{textNote}</span>
        </div>
      </div>
    );
  }

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.3rem',
        padding: '0.18rem 0.55rem',
        borderRadius: '999px',
        fontSize: '0.76rem',
        fontWeight: 600,
        background: 'rgba(148, 163, 184, 0.16)',
        color: 'var(--ifm-color-emphasis-600)',
        whiteSpace: 'nowrap',
      }}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
      {label || (isEn ? 'Not Applicable' : 'Không áp dụng')}
    </span>
  );
}
