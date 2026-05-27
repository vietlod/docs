/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  guideSidebar: [
    'overview',
    {
      type: 'category',
      label: 'Bắt đầu',
      collapsed: false,
      items: [
        'bat-dau/login-filter-preview-export',
      ],
    },
    {
      type: 'category',
      label: 'Nguồn dữ liệu',
      collapsed: false,
      items: [
        'nguon-du-lieu/phan-nhom-nguon-du-lieu',
      ],
    },
    {
      type: 'category',
      label: 'Indicators',
      collapsed: false,
      items: [
        'indicators/tong-hop-indicators',
        'indicators/global-data',
        'indicators/gso-vietnam',
        'indicators/customs',
        'indicators/macro-survey-vhlss',
        'indicators/stock-hub',
      ],
    },
    {
      type: 'category',
      label: 'Công cụ hỗ trợ',
      collapsed: false,
      items: [
        'cong-cu/ai-chat',
        'cong-cu/econometrics',
      ],
    },
    {
      type: 'category',
      label: 'Xuất dữ liệu',
      collapsed: false,
      items: [
        'xuat-du-lieu/preview-export',
      ],
    },
    {
      type: 'category',
      label: 'Quản trị và triển khai',
      collapsed: true,
      items: [
        'admin/quan-tri-du-lieu',
        'trien-khai/docusaurus-vps',
      ],
    },
  ],
};

export default sidebars;
