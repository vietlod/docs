// @ts-check
// Documentation site for TNS AI Applications.

import {themes as prismThemes} from 'prism-react-renderer';

const docsDomain = 'https://docs.tnsai.vn';

// Site-wide structured data (read by search engines and AI/LLM crawlers).
const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${docsDomain}/#organization`,
  name: 'TNS AI',
  url: docsDomain,
  logo: `${docsDomain}/img/ecodata-logo.svg`,
  description:
    'Documentation portal for the TNS AI application ecosystem (EcoData, EcoLab, EcoLit, PDFHUB, KEYWORDs).',
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${docsDomain}/#website`,
  url: docsDomain,
  name: 'TNS AI Docs',
  inLanguage: ['vi', 'en'],
  publisher: { '@id': `${docsDomain}/#organization` },
};

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'TNS AI Docs',
  tagline: 'Cổng hướng dẫn sử dụng các ứng dụng hệ sinh thái TNS AI',
  favicon: 'img/favicon.ico',

  url: docsDomain,
  baseUrl: '/',
  organizationName: 'vietlod',
  projectName: 'docs',

  onBrokenLinks: 'warn',

  customFields: {
    docsDomain,
  },

  headTags: [
    {
      tagName: 'script',
      attributes: { type: 'application/ld+json' },
      innerHTML: JSON.stringify(orgSchema),
    },
    {
      tagName: 'script',
      attributes: { type: 'application/ld+json' },
      innerHTML: JSON.stringify(websiteSchema),
    },
  ],

  i18n: {
    defaultLocale: 'vi',
    locales: ['vi', 'en'],
    localeConfigs: {
      vi: {
        label: 'Tiếng Việt',
        direction: 'ltr',
        htmlLang: 'vi-VN',
        calendar: 'gregory',
      },
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
      },
    },
  },

  themes: ['@docusaurus/theme-mermaid'],
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          sidebarCollapsible: true,
          editUrl: 'https://github.com/vietlod/docs/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      }),
    ],
  ],

  plugins: [
    '@docusaurus/plugin-ideal-image',
    [
      'docusaurus-plugin-llms',
      {
        // Sinh /llms.txt, /llms-full.txt va ban .md tung trang cho AI/LLM crawler
        // (chuan llmstxt.org). Thay cho file static/llms.txt thu cong truoc day.
        generateLLMsTxt: true,
        generateLLMsFullTxt: true,
        generateMarkdownFiles: true,
        docsDir: 'docs',
        title: 'TNS AI Docs',
        description:
          'Tai lieu huong dan he sinh thai ung dung TNS AI: EcoData, EcoLab, EcoLit, PDFHUB, KEYWORDs.',
        includeOrder: [
          'ecodata/**',
          'ecolab/**',
          'ecolit/**',
          'pdfhub/**',
          'keywords/**',
        ],
        includeUnmatchedLast: true,
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/ecodata-docs-hero.png',
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'TNS AI Docs',
        logo: {
          alt: 'TNS AI Logo',
          src: 'img/logo.svg',
          srcDark: 'img/logo-white.svg',
          href: docsDomain,
          target: '_self',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'ecodataSidebar',
            position: 'left',
            label: 'EcoData',
          },
          {
            type: 'docSidebar',
            sidebarId: 'ecolabSidebar',
            position: 'left',
            label: 'EcoLab',
          },
          {
            type: 'docSidebar',
            sidebarId: 'ecolitSidebar',
            position: 'left',
            label: 'EcoLit',
          },
          {
            type: 'docSidebar',
            sidebarId: 'pdfhubSidebar',
            position: 'left',
            label: 'PDFHUB',
          },
          {
            type: 'docSidebar',
            sidebarId: 'keywordsSidebar',
            position: 'left',
            label: 'KEYWORDs',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            type: 'search',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Tài liệu ứng dụng',
            items: [
              {
                label: 'Tài liệu EcoData',
                to: '/ecodata/overview',
              },
              {
                label: 'Tài liệu EcoLab',
                to: '/ecolab/overview',
              },
              {
                label: 'Tài liệu EcoLit',
                to: '/ecolit/overview',
              },
            ],
          },
          {
            title: 'Phân tích & Tiện ích',
            items: [
              {
                label: 'Tài liệu PDFHUB',
                to: '/pdfhub/overview',
              },
              {
                label: 'Tài liệu KEYWORDs',
                to: '/keywords/overview',
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} TNS AI. Tài liệu hướng dẫn sử dụng hệ sinh thái ứng dụng.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['python', 'json', 'bash'],
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },
    }),
};

export default config;
