// @ts-check
// Documentation site for Khai thac Ecodata.

import {themes as prismThemes} from 'prism-react-renderer';

const docsDomain = 'https://ecodata.tnsai.vn';
const appDomain = 'https://ecodata.io.vn';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Khai thác Ecodata',
  tagline: 'Hướng dẫn chọn, xem trước và tải đúng indicators cho nghiên cứu',
  favicon: 'img/favicon.ico',

  url: docsDomain,
  baseUrl: '/',
  organizationName: 'vietlod',
  projectName: 'docs',

  onBrokenLinks: 'warn',

  customFields: {
    appUrl: appDomain,
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
        title: 'Khai thác Ecodata',
        logo: {
          alt: 'Ecodata',
          src: 'img/ecodata-logo.svg',
          srcDark: 'img/ecodata-logo-white.svg',
          href: docsDomain,
          target: '_self',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'guideSidebar',
            position: 'left',
            label: 'Hướng dẫn',
          },
          {
            to: '/nguon-du-lieu/phan-nhom-nguon-du-lieu',
            label: 'Nguồn dữ liệu',
            position: 'left',
          },
          {
            to: '/indicators/tong-hop-indicators',
            label: 'Indicators',
            position: 'left',
          },
          {
            href: appDomain,
            label: 'Mở ứng dụng',
            position: 'right',
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
            title: 'Hướng dẫn chính',
            items: [
              {
                label: 'Flow chọn và tải dữ liệu',
                to: '/bat-dau/login-filter-preview-export',
              },
              {
                label: 'Tổng hợp indicators',
                to: '/indicators/tong-hop-indicators',
              },
              {
                label: 'Preview và Export',
                to: '/xuat-du-lieu/preview-export',
              },
            ],
          },
          {
            title: 'Công cụ hỗ trợ',
            items: [
              {
                label: 'AI Chat',
                to: '/cong-cu/ai-chat',
              },
              {
                label: 'Econometrics',
                to: '/cong-cu/econometrics',
              },
              {
                label: 'Quản trị dữ liệu',
                to: '/admin/quan-tri-du-lieu',
              },
            ],
          },
        ],
        copyright: '© 2025 TNS. Tài liệu Khai thác Ecodata.',
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
