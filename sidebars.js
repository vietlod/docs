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
        'ecolab/model/group',
        {
          type: 'category',
          label: '1. Hồi quy tuyến tính cổ điển',
          items: [
            'ecolab/model/ols',
            'ecolab/model/wls',
            'ecolab/model/gls',
            'ecolab/model/tls',
          ],
        },
        {
          type: 'category',
          label: '2. Hồi quy chính quy hóa',
          items: [
            'ecolab/model/ridge',
            'ecolab/model/lasso',
            'ecolab/model/elastic-net',
            'ecolab/model/adaptive-lasso',
          ],
        },
        {
          type: 'category',
          label: '3. Dữ liệu bảng tuyến tính',
          items: [
            'ecolab/model/pooled-ols',
            'ecolab/model/fem-rem',
            'ecolab/model/between',
          ],
        },
        {
          type: 'category',
          label: '4. Dữ liệu bảng động',
          items: ['ecolab/model/gmm'],
        },
        {
          type: 'category',
          label: '5. Biến phụ thuộc giới hạn',
          items: [
            'ecolab/model/logit',
            'ecolab/model/probit',
            'ecolab/model/tobit',
            'ecolab/model/truncated',
            'ecolab/model/heckman',
          ],
        },
        {
          type: 'category',
          label: '6. Dữ liệu đếm',
          items: [
            'ecolab/model/poisson',
            'ecolab/model/negbin',
            'ecolab/model/zip',
            'ecolab/model/zinb',
          ],
        },
        {
          type: 'category',
          label: '7. Hồi quy phân vị',
          items: [
            'ecolab/model/quantile',
            'ecolab/model/panel-quantile',
          ],
        },
        {
          type: 'category',
          label: '8. Chuỗi thời gian đơn biến',
          items: [
            'ecolab/model/arima',
            'ecolab/model/sarima',
            'ecolab/model/garch',
            'ecolab/model/egarch',
            'ecolab/model/ardl',
          ],
        },
        {
          type: 'category',
          label: '9. Chuỗi thời gian đa biến',
          items: [
            'ecolab/model/var',
            'ecolab/model/vecm',
            'ecolab/model/svar',
          ],
        },
        {
          type: 'category',
          label: '10. IV & hệ phương trình',
          items: [
            'ecolab/model/iv-2sls',
            'ecolab/model/3sls',
            'ecolab/model/sur',
          ],
        },
        {
          type: 'category',
          label: '11. Phi tuyến & bán tham số',
          items: [
            'ecolab/model/nls',
            'ecolab/model/gam',
          ],
        },
        {
          type: 'category',
          label: '12. Suy luận nhân quả',
          items: [
            'ecolab/model/did',
            'ecolab/model/psm',
            'ecolab/model/rdd',
          ],
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
        'ecolab/vi-du/luong-giao-duc-ols',
        'ecolab/vi-du/iv-loi-suat-giao-duc',
        'ecolab/vi-du/vo-no-logit',
        'ecolab/vi-du/bang-sang-che-count',
        'ecolab/vi-du/bat-binh-dang-quantile',
        'ecolab/vi-du/du-bao-lam-phat-lasso',
        'ecolab/vi-du/var-vimo',
        'ecolab/vi-du/duong-cong-engel-gam',
        'ecolab/vi-du/rdd-hoc-bong',
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
