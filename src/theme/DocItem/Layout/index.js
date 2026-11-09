import React, {useEffect, useState, useCallback} from 'react';
import Layout from '@theme-original/DocItem/Layout';
import Head from '@docusaurus/Head';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function DocsBackToTopButton({locale}) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      const scrollRange = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setVisible(scrollTop > 320);
      setProgress(Math.min(100, Math.max(0, (scrollTop / scrollRange) * 100)));
    };
    window.addEventListener('scroll', onScroll, {passive: true});
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, []);

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (progress / 100) * circumference;
  const label = locale === 'en' ? 'Back to Top' : 'Lên đầu trang';

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={label}
      title={label}
      className={`tns-docs-back-to-top ${visible ? 'tns-docs-back-to-top--visible' : ''}`}
    >
      <svg className="tns-docs-back-to-top__ring" width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
        <circle className="tns-docs-back-to-top__track" cx="22" cy="22" r={radius} fill="none" strokeWidth="2.5" />
        <circle
          className="tns-docs-back-to-top__progress"
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          strokeWidth="2.5"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
        />
      </svg>
      <span className="tns-docs-back-to-top__icon" aria-hidden="true">↑</span>
    </button>
  );
}

export default function DocItemLayoutWrapper(props) {
  const {metadata, frontMatter} = useDoc();
  const {siteConfig, i18n} = useDocusaurusContext();
  const docsDomain = siteConfig.customFields?.docsDomain || siteConfig.url;
  const url = docsDomain + metadata.permalink;
  const currentLocale = i18n?.currentLocale || siteConfig.i18n?.defaultLocale || 'vi';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: metadata.title,
    description: frontMatter.description || metadata.description || siteConfig.tagline,
    inLanguage: currentLocale,
    url,
    author: {'@type': 'Organization', name: 'TNS AI', url: docsDomain},
    publisher: {'@type': 'Organization', '@id': `${docsDomain}/#organization`},
    isPartOf: {'@type': 'WebSite', '@id': `${docsDomain}/#website`},
  };
  if (metadata.lastUpdatedAt) {
    jsonLd.dateModified = new Date(metadata.lastUpdatedAt * 1000).toISOString();
  }

  return (
    <>
      <Head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>
      <Layout {...props} />
      <DocsBackToTopButton locale={currentLocale} />
    </>
  );
}
