// @ts-check
// Documentation site for TNS AI Applications.

import {themes as prismThemes} from 'prism-react-renderer';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const docsDomain = 'https://docs.tnsai.vn';

// Site-wide structured data for search engines and AI crawlers.
const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${docsDomain}/#organization`,
  name: 'TNS AI',
  url: docsDomain,
  logo: `${docsDomain}/img/ecodata-logo.svg`,
  sameAs: [
    'https://www.tnsai.vn',
    'https://ecodata.io.vn',
    'https://ecolab.io.vn',
    'https://www.finco.vn',
    'https://vietlod.tnsai.vn',
    'https://sachktl.tnsai.vn',
  ],
  description:
    'Documentation portal for the TNS AI quantitative research and data platform ecosystem including EcoData, EcoLab, Finco, VietLOD, and SachKTL.',
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
        baseUrl: '/',
      },
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
        baseUrl: '/en/',
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

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.17.0/dist/katex.min.css',
      type: 'text/css',
      crossorigin: 'anonymous',
    },
  ],

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
          remarkPlugins: [remarkMath],
          rehypePlugins: [[rehypeKatex, { strict: false }]],
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
        generateLLMsTxt: true,
        generateLLMsFullTxt: true,
        generateMarkdownFiles: true,
        docsDir: 'docs',
        title: 'TNS AI Docs',
        description:
          'Tài liệu hướng dẫn hệ sinh thái ứng dụng TNS AI: EcoData, EcoLab, Finco, VietLOD và SachKTL.',
        includeOrder: [
          'ecodata/**',
          'ecolab/**',
          'finco/**',
          'vietlod/**',
          'sachktl/**',
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
            sidebarId: 'fincoSidebar',
            position: 'left',
            label: 'Finco',
          },
          {
            type: 'docSidebar',
            sidebarId: 'vietlodSidebar',
            position: 'left',
            label: 'VietLOD',
          },
          {
            type: 'docSidebar',
            sidebarId: 'sachktlSidebar',
            position: 'left',
            label: 'SachKTL',
          },
          {
            type: 'docSidebar',
            sidebarId: 'legalSidebar',
            position: 'left',
            label: 'Pháp lý',
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
                label: 'Tài liệu Finco',
                to: '/finco/overview',
              },
              {
                label: 'Tài liệu VietLOD',
                to: '/vietlod/overview',
              },
              {
                label: 'Tài liệu SachKTL',
                to: '/sachktl/overview',
              },
            ],
          },
          {
            title: 'Hệ sinh thái TNS AI',
            items: [
              {
                label: 'Cổng dữ liệu EcoData',
                href: 'https://ecodata.io.vn',
              },
              {
                label: 'Phòng thí nghiệm EcoLab',
                href: 'https://ecolab.io.vn',
              },
              {
                label: 'Nền tảng dữ liệu Finco',
                href: 'https://www.finco.vn',
              },
              {
                label: 'Cổng học thuật VietLOD',
                href: 'https://vietlod.tnsai.vn',
              },
              {
                label: 'Thư viện giáo trình SachKTL',
                href: 'https://sachktl.tnsai.vn',
              },
            ],
          },
          {
            title: 'Trung tâm pháp lý',
            items: [
              {
                label: 'Chính sách quyền riêng tư và dữ liệu cá nhân',
                to: '/legal/overview',
              },
              {
                label: 'Phương thức tiếp nhận và giải quyết khiếu nại',
                to: '/legal/overview#complaints',
              },
              {
                label: 'Chính sách giá và thanh toán trực tuyến',
                to: '/legal/overview#pricing-policy',
              },
              {
                label: 'Điều kiện cung cấp dịch vụ trên nền tảng',
                to: '/legal/overview#service-conditions',
              },
              {
                label: 'Chính sách giao ngay và không hoàn tiền',
                to: '/legal/overview#delivery-refund',
              },
              {
                label: 'Hình thức hỗ trợ trực tuyến',
                to: '/legal/overview#online-support',
              },
              {
                label: 'Cổng pháp lý tập trung TNSAI',
                href: 'https://www.tnsai.vn/legal/privacy',
              },
              {
                label: 'Quản lý quyền dữ liệu và xóa tài khoản',
                href: 'https://www.tnsai.vn/dashboard/privacy',
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} TNS AI • Đơn vị vận hành: CÔNG TY TNHH CÔNG NGHỆ TÀI NGUYÊN SỐ • Mã số thuế: 0319442411 • Địa chỉ: 55/107/30 Thành Mỹ, Khu phố 21, Phường Tân Hòa, TpHCM, Việt Nam • Điện thoại: 0941571981 • Email: support@tnsai.tech`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['python', 'json', 'bash', 'r', 'stata'],
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },
    }),
};

export default config;
