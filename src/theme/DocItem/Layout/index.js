import React from 'react';
import Layout from '@theme-original/DocItem/Layout';
import Head from '@docusaurus/Head';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// Wrap the default DocItem layout to emit per-page TechArticle JSON-LD.
// Combined with the site-wide Organization/WebSite schema (headTags in
// docusaurus.config.js) and the auto-generated BreadcrumbList, every docs
// page exposes structured data for search engines and AI/LLM crawlers.
export default function DocItemLayoutWrapper(props) {
  const {metadata, frontMatter} = useDoc();
  const {siteConfig} = useDocusaurusContext();
  const docsDomain = siteConfig.customFields?.docsDomain || siteConfig.url;
  const url = docsDomain + metadata.permalink;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: metadata.title,
    description: frontMatter.description || metadata.description || siteConfig.tagline,
    inLanguage: siteConfig.i18n?.defaultLocale || 'vi',
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
    </>
  );
}
