// @ts-check
// Documentation site for TNS AI Applications.

import {themes as prismThemes} from 'prism-react-renderer';

const docsDomain = 'https://docs.tnsai.vn';

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
      }),
    ],
  ],

  plugins: ['@docusaurus/plugin-ideal-image'],

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
