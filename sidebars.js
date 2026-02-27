/**
 * ECODATA Documentation Sidebars
 * 
 * Two main sidebars:
 * 1. worldData - International data sources (WB, IMF, UN, OECD, etc.)
 * 2. vietnamData - Vietnam-specific data sources (GSO, Customs, Stocks, etc.)
 */

const sidebars = {

  // ============================================
  // WORLD DATA SIDEBAR
  // International economic data sources
  // ============================================
  worldData: [
    {
      type: 'category',
      label: 'World Data',
      collapsed: false,
      link: {
        type: 'generated-index',
        title: 'World Economic Data',
        description: 'Access comprehensive international economic data from major global organizations including World Bank, IMF, United Nations, OECD, and more.',
        keywords: ['world data', 'international', 'economic indicators', 'global statistics'],
      },
      items: [
        'world-data/world-data-overview',
        
        // World Bank
        {
          type: 'category',
          label: 'World Bank (WB)',
          link: {
            type: 'doc',
            id: 'world-data/world-bank/wb-overview',
          },
          collapsed: true,
          items: [
            'world-data/world-bank/wb-wdi',
            'world-data/world-bank/wb-ids',
            'world-data/world-bank/wb-microdata',
            'world-data/world-bank/wb-doing-business',
          ],
        },

        // IMF
        {
          type: 'category',
          label: 'IMF',
          link: {
            type: 'doc',
            id: 'world-data/imf/imf-overview',
          },
          collapsed: true,
          items: [
            'world-data/imf/imf-weo',
            'world-data/imf/imf-ifs',
            'world-data/imf/imf-bop',
            'world-data/imf/imf-dots',
            'world-data/imf/imf-gfs',
          ],
        },

        // United Nations
        {
          type: 'category',
          label: 'United Nations (UN)',
          link: {
            type: 'doc',
            id: 'world-data/united-nations/un-overview',
          },
          collapsed: true,
          items: [
            'world-data/united-nations/un-unsd',
            'world-data/united-nations/un-comtrade',
            'world-data/united-nations/un-unctad',
            'world-data/united-nations/un-sdg',
          ],
        },

        // OECD
        {
          type: 'category',
          label: 'OECD',
          link: {
            type: 'doc',
            id: 'world-data/oecd/oecd-overview',
          },
          collapsed: true,
          items: [
            'world-data/oecd/oecd-national-accounts',
            'world-data/oecd/oecd-industry',
            'world-data/oecd/oecd-trade',
          ],
        },

        // Asian Development Bank
        {
          type: 'category',
          label: 'Asian Development Bank (ADB)',
          link: {
            type: 'doc',
            id: 'world-data/adb/adb-overview',
          },
          collapsed: true,
          items: [
            'world-data/adb/adb-key-indicators',
            'world-data/adb/adb-aric',
          ],
        },

        // ILO
        {
          type: 'category',
          label: 'ILO (Labor Statistics)',
          link: {
            type: 'doc',
            id: 'world-data/ilo/ilo-overview',
          },
          collapsed: true,
          items: [
            'world-data/ilo/ilo-employment',
            'world-data/ilo/ilo-wages',
          ],
        },

        // WTO
        {
          type: 'category',
          label: 'WTO (Trade Statistics)',
          link: {
            type: 'doc',
            id: 'world-data/wto/wto-overview',
          },
          collapsed: true,
          items: [
            'world-data/wto/wto-merchandise',
            'world-data/wto/wto-services',
          ],
        },

        // Other Sources
        {
          type: 'category',
          label: 'Other Sources',
          collapsed: true,
          items: [
            'world-data/other-sources/bis-overview',
            'world-data/other-sources/fao-overview',
            'world-data/other-sources/eurostat-overview',
            'world-data/other-sources/wgi-overview',
            'world-data/other-sources/fred-overview',
          ],
        },

        // API Guide
        {
          type: 'category',
          label: 'API Reference',
          collapsed: true,
          items: [
            'world-data/api/api-getting-started',
            'world-data/api/api-authentication',
            'world-data/api/api-endpoints',
          ],
        },
      ],
    },
  ],

  // ============================================
  // VIETNAM DATA SIDEBAR
  // Vietnam-specific economic data sources
  // ============================================
  vietnamData: [
    {
      type: 'category',
      label: 'Vietnam Data',
      collapsed: false,
      link: {
        type: 'generated-index',
        title: 'Dữ liệu kinh tế Việt Nam',
        description: 'Truy cập dữ liệu kinh tế toàn diện của Việt Nam từ Tổng cục Thống kê, Hải quan, các chỉ số PCI, PAPI, thị trường chứng khoán và nhiều nguồn khác.',
        keywords: ['vietnam data', 'dữ liệu việt nam', 'GSO', 'thống kê', 'kinh tế'],
      },
      items: [
        'vietnam-data/vietnam-data-overview',

        // GSO - General Statistics Office
        {
          type: 'category',
          label: 'GSO (Tổng cục Thống kê)',
          link: {
            type: 'doc',
            id: 'vietnam-data/gso/gso-overview',
          },
          collapsed: true,
          items: [
            'vietnam-data/gso/gso-gdp',
            'vietnam-data/gso/gso-iip',
            'vietnam-data/gso/gso-retail',
            'vietnam-data/gso/gso-population',
            'vietnam-data/gso/gso-provincial',
            'vietnam-data/gso/gso-cpi',
          ],
        },

        // Vietnam Customs
        {
          type: 'category',
          label: 'Customs (Hải quan)',
          link: {
            type: 'doc',
            id: 'vietnam-data/customs/customs-overview',
          },
          collapsed: true,
          items: [
            'vietnam-data/customs/customs-import-export',
            'vietnam-data/customs/customs-by-commodity',
            'vietnam-data/customs/customs-by-country',
          ],
        },

        // Survey Datasets
        {
          type: 'category',
          label: 'Survey Datasets',
          link: {
            type: 'doc',
            id: 'vietnam-data/surveys/surveys-overview',
          },
          collapsed: true,
          items: [
            'vietnam-data/surveys/surveys-vhlss',
            'vietnam-data/surveys/surveys-ves',
            'vietnam-data/surveys/surveys-wbg-es',
          ],
        },

        // Indices & Rankings
        {
          type: 'category',
          label: 'Indices & Rankings',
          link: {
            type: 'doc',
            id: 'vietnam-data/indices/indices-overview',
          },
          collapsed: true,
          items: [
            'vietnam-data/indices/indices-pci',
            'vietnam-data/indices/indices-papi',
            'vietnam-data/indices/indices-pmi',
            'vietnam-data/indices/indices-ict',
          ],
        },

        // Stock Market
        {
          type: 'category',
          label: 'Stock Market (Thị trường chứng khoán)',
          link: {
            type: 'doc',
            id: 'vietnam-data/stocks/stocks-overview',
          },
          collapsed: true,
          items: [
            'vietnam-data/stocks/stocks-vnindex',
            'vietnam-data/stocks/stocks-hnx',
            'vietnam-data/stocks/stocks-upcom',
            'vietnam-data/stocks/stocks-sectors',
          ],
        },

        // Sector Data
        {
          type: 'category',
          label: 'Sector Data',
          collapsed: true,
          items: [
            'vietnam-data/sectors/sectors-vasep',
            'vietnam-data/sectors/sectors-evn',
            'vietnam-data/sectors/sectors-mof',
            'vietnam-data/sectors/sectors-moit',
          ],
        },

        // API Guide
        {
          type: 'category',
          label: 'Hướng dẫn sử dụng',
          collapsed: true,
          items: [
            'vietnam-data/guide/guide-getting-started',
            'vietnam-data/guide/guide-api-reference',
            'vietnam-data/guide/guide-export-data',
          ],
        },
      ],
    },
  ],

};

export default sidebars;
