import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const Available = ({ plans, label }) => {
  const { i18n } = useDocusaurusContext();
  const isEn = i18n?.currentLocale === 'en';

  if (Array.isArray(plans) && plans.length > 0) {
    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1rem',
          margin: '1rem 0',
          borderRadius: '10px',
          border: '1px solid rgba(13, 148, 136, 0.35)',
          background: 'rgba(13, 148, 136, 0.08)',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontWeight: 700,
            fontSize: '0.85rem',
            color: '#0d9488',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
          {label || (isEn ? 'Verified Environments & Platforms:' : 'Môi trường & nền tảng hỗ trợ:')}
        </span>
        {plans.map((plan, idx) => (
          <span
            key={idx}
            style={{
              display: 'inline-block',
              fontSize: '0.78rem',
              fontWeight: 600,
              padding: '0.18rem 0.6rem',
              borderRadius: '999px',
              background: 'var(--ifm-background-surface-color)',
              border: '1px solid rgba(13, 148, 136, 0.4)',
              color: 'var(--ifm-font-color-base)',
            }}
          >
            {plan}
          </span>
        ))}
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
        fontWeight: 700,
        background: 'rgba(13, 148, 136, 0.14)',
        color: '#0d9488',
        whiteSpace: 'nowrap',
      }}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="20 6 9 17 4 12" />
      </svg>
      {label || (isEn ? 'Available' : 'Sẵn sàng')}
    </span>
  );
};

export default Available;
