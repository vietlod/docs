/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  ecodataSidebar: [
    'ecodata/overview',
    'ecodata/faq',
    {
      type: 'category',
      label: 'Bắt đầu',
      collapsed: false,
      items: [
        'ecodata/bat-dau/login-filter-preview-export',
      ],
    },
    {
      type: 'category',
      label: 'Nguồn dữ liệu',
      collapsed: false,
      items: [
        'ecodata/nguon-du-lieu/phan-nhom-nguon-du-lieu',
      ],
    },
    {
      type: 'category',
      label: 'Indicators',
      collapsed: false,
      items: [
        'ecodata/indicators/tong-hop-indicators',
        'ecodata/indicators/global-data',
        'ecodata/indicators/gso-vietnam',
        'ecodata/indicators/customs',
        'ecodata/indicators/macro-survey-vhlss',
        'ecodata/indicators/stock-hub',
      ],
    },
    {
      type: 'category',
      label: 'Công cụ hỗ trợ',
      collapsed: false,
      items: [
        'ecodata/cong-cu/ai-chat',
        'ecodata/cong-cu/econometrics',
      ],
    },
    {
      type: 'category',
      label: 'Xuất dữ liệu',
      collapsed: false,
      items: [
        'ecodata/xuat-du-lieu/preview-export',
      ],
    },
    {
      type: 'category',
      label: 'Quản trị và triển khai',
      collapsed: true,
      items: [
        'ecodata/admin/quan-tri-du-lieu',
        'ecodata/trien-khai/docusaurus-vps',
      ],
    },
  ],

  ecolabSidebar: [
    'ecolab/overview',
    {
      type: 'category',
      label: 'Bắt đầu',
      collapsed: false,
      items: [
        'ecolab/bat-dau/login-navigation',
      ],
    },
    {
      type: 'category',
      label: 'Đồ thị & Tra cứu RAG',
      collapsed: false,
      items: [
        'ecolab/rag-knowledge-graph',
      ],
    },
    {
      type: 'category',
      label: 'Phân tích Định lượng',
      collapsed: false,
      items: [
        'ecolab/econometrics-modeling',
      ],
    },
    {
      type: 'category',
      label: 'Tài khoản & Thanh toán',
      collapsed: false,
      items: [
        'ecolab/membership-billing',
      ],
    },
  ],

  ecolitSidebar: [
    'ecolit/overview',
    {
      type: 'category',
      label: 'Bắt đầu',
      collapsed: false,
      items: [
        'ecolit/bat-dau/academic-search',
      ],
    },
    {
      type: 'category',
      label: 'Tìm kiếm Học thuật',
      collapsed: false,
      items: [
        'ecolit/openalex-search',
        'ecolit/crossref-metadata',
      ],
    },
    {
      type: 'category',
      label: 'Hồ sơ cá nhân',
      collapsed: false,
      items: [
        'ecolit/orcid-integration',
      ],
    },
  ],

  pdfhubSidebar: [
    'pdfhub/overview',
    {
      type: 'category',
      label: 'Bắt đầu',
      collapsed: false,
      items: [
        'pdfhub/bat-dau/file-upload',
      ],
    },
    {
      type: 'category',
      label: 'Trích xuất & Caching',
      collapsed: false,
      items: [
        'pdfhub/parser-engine',
        'pdfhub/liteparse-prompt-caching',
      ],
    },
    {
      type: 'category',
      label: 'RAG Tài chính',
      collapsed: false,
      items: [
        'pdfhub/agentic-rag-finance',
      ],
    },
  ],

  keywordsSidebar: [
    'keywords/overview',
    {
      type: 'category',
      label: 'Bắt đầu',
      collapsed: false,
      items: [
        'keywords/bat-dau/keyword-monitoring',
      ],
    },
    {
      type: 'category',
      label: 'Cào & Phân tích',
      collapsed: false,
      items: [
        'keywords/crawler-settings',
        'keywords/semantic-analysis',
      ],
    },
  ],
};

export default sidebars;
