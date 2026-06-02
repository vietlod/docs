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
        'ecodata/bat-dau/huong-dan-nhanh',
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
      label: 'Từ điển & phương pháp',
      collapsed: false,
      items: [
        'ecodata/du-lieu/data-dictionary',
        'ecodata/du-lieu/methodology',
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
      label: 'Mô hình kinh tế lượng',
      collapsed: false,
      items: [
        'ecolab/mo-hinh/danh-muc',
        {
          type: 'category',
          label: '1. Hồi quy tuyến tính cổ điển',
          items: [
            'ecolab/mo-hinh/ols',
            'ecolab/mo-hinh/wls',
            'ecolab/mo-hinh/gls',
            'ecolab/mo-hinh/tls',
          ],
        },
        {
          type: 'category',
          label: '2. Hồi quy chính quy hóa',
          items: [
            'ecolab/mo-hinh/ridge',
            'ecolab/mo-hinh/lasso',
            'ecolab/mo-hinh/elastic-net',
            'ecolab/mo-hinh/adaptive-lasso',
          ],
        },
        {
          type: 'category',
          label: '3. Dữ liệu bảng tuyến tính',
          items: ['ecolab/mo-hinh/fem-rem'],
        },
        {
          type: 'category',
          label: '4. Dữ liệu bảng động',
          items: ['ecolab/mo-hinh/gmm'],
        },
        {
          type: 'category',
          label: '5. Biến phụ thuộc giới hạn',
          items: [
            'ecolab/mo-hinh/logit',
            'ecolab/mo-hinh/probit',
            'ecolab/mo-hinh/tobit',
            'ecolab/mo-hinh/truncated',
            'ecolab/mo-hinh/heckman',
          ],
        },
        {
          type: 'category',
          label: '6. Dữ liệu đếm',
          items: [
            'ecolab/mo-hinh/poisson',
            'ecolab/mo-hinh/negbin',
            'ecolab/mo-hinh/zip',
            'ecolab/mo-hinh/zinb',
          ],
        },
        {
          type: 'category',
          label: '7. Hồi quy phân vị',
          items: [
            'ecolab/mo-hinh/quantile',
            'ecolab/mo-hinh/panel-quantile',
          ],
        },
        {
          type: 'category',
          label: '8. Chuỗi thời gian đơn biến',
          items: ['ecolab/mo-hinh/ardl'],
        },
        {
          type: 'category',
          label: '9. Chuỗi thời gian đa biến',
          items: ['ecolab/mo-hinh/vecm'],
        },
        {
          type: 'category',
          label: '10. IV & hệ phương trình',
          items: [
            'ecolab/mo-hinh/iv-2sls',
            'ecolab/mo-hinh/3sls',
            'ecolab/mo-hinh/sur',
          ],
        },
        {
          type: 'category',
          label: '11. Phi tuyến & bán tham số',
          items: [
            'ecolab/mo-hinh/nls',
            'ecolab/mo-hinh/gam',
          ],
        },
        {
          type: 'category',
          label: '12. Suy luận nhân quả',
          items: ['ecolab/mo-hinh/did'],
        },
      ],
    },
    {
      type: 'category',
      label: 'Ví dụ thực nghiệm',
      collapsed: false,
      items: [
        'ecolab/vi-du/fdi-tang-truong-ardl',
        'ecolab/vi-du/no-cong-tang-truong-panel',
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
