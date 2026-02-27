// @ts-check
// ECODATA Documentation - Docusaurus Configuration
// https://docs.khoviet.com

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  // Search engine indexing
  noIndex: false,
  
  // Site metadata
  title: 'EcoData Docs',
  tagline: 'Economic Data Platform for Vietnam and the World',
  // No favicon specified - Docusaurus will use default favicon

  // Extra themes
  themes: [
    '@docusaurus/theme-mermaid',
  ],
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  // Production URL
  url: 'https://docs.khoviet.com',
  baseUrl: '/',
  
  // Organization info
  organizationName: 'khoviet',
  projectName: 'ecodata',

  onBrokenLinks: 'warn',

  // Internationalization - English and Vietnamese
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'vi'],
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
      },
      vi: {
        label: 'Tiếng Việt',
        direction: 'ltr',
        htmlLang: 'vi-VN',
        calendar: 'gregory',
      },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarCollapsible: true,
          routeBasePath: '/', // docs at root
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/khoviet/ecodata/tree/main/docs/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  plugins: [
    '@docusaurus/plugin-ideal-image',
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Social card image
      image: 'img/ecodata-social-card.jpg',
      
      // Color mode settings
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },

      // Search configuration (can be replaced with Algolia later)
      // algolia: {
      //   appId: 'YOUR_APP_ID',
      //   apiKey: 'YOUR_API_KEY',
      //   indexName: 'ecodata',
      //   contextualSearch: true,
      // },

      // Navbar configuration
      navbar: {
        logo: {
          alt: 'EcoData Logo',
          src: 'img/ecodata-logo.svg',
          srcDark: 'img/ecodata-logo-white.svg',
          href: 'https://ecodata.khoviet.com',
          target: '_self',
        },
        items: [
          // Home link to docs homepage
          {
            type: 'html',
            position: 'left',
            value: '<a href="/docs" class="navbar__item navbar__link" target="_self"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 4px;"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>Home</a>',
          },
          // World Data sidebar
          {
            type: 'docSidebar',
            sidebarId: 'worldData',
            position: 'left',
            label: 'World Data',
          },
          // Vietnam Data sidebar
          {
            type: 'docSidebar',
            sidebarId: 'vietnamData',
            position: 'left',
            label: 'Vietnam Data',
          },
          // Language switcher
          {
            type: 'localeDropdown',
            position: 'right',
            dropdownItemsAfter: [],
            dropdownItemsBefore: [],
          },
          // Search
          {
            type: 'search',
            position: 'right',
          },
        ],
      },

      // Announcement bar (optional)
      announcementBar: {
        id: 'ecodata-launch',
        content: '🎉 EcoData v2.0 - Comprehensive economic data platform for Vietnam and the World. <a href="https://ecodata.khoviet.com">Explore now →</a>',
        backgroundColor: '#1e40af',
        textColor: '#ffffff',
        isCloseable: true,
      },

      // Footer configuration - 2 column layout
      footer: {
        style: 'dark',
        links: [
          {
            // Column 1 - Info links
            title: 'Thông tin',
            items: [
              {
                label: 'Giới thiệu',
                href: 'https://ecodata.khoviet.com/about',
              },
              {
                label: 'Hướng dẫn thanh toán',
                href: 'https://ecodata.khoviet.com/payment-guide',
              },
              {
                label: 'Chính sách bảo mật',
                href: 'https://ecodata.khoviet.com/privacy-policy',
              },
            ],
          },
          {
            // Column 2 - Data Resources
            title: 'Dữ liệu',
            items: [
              {
                label: 'World Data',
                to: '/world-data',
              },
              {
                label: 'Vietnam Data',
                to: '/vietnam-data',
              },
              {
                label: 'API Reference',
                href: 'https://ecodata.khoviet.com/api/docs',
              },
            ],
          },
          {
            // Column 3 - Contact
            title: 'Liên hệ',
            items: [
              {
                label: 'Email: ngocthuyet@gmail.com',
                href: 'mailto:ngocthuyet@gmail.com',
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} EcoData by Vietlod. Tất cả quyền được bảo lưu.`,
      },

      // Prism syntax highlighting
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['python', 'json', 'bash'],
      },

      // Table of contents settings
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },
    }),
};

export default config;
