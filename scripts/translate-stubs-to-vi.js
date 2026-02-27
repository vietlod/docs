/**
 * Script to translate stub files to Vietnamese with econometrics research context
 * Run: node scripts/translate-stubs-to-vi.js
 */

const fs = require('fs');
const path = require('path');

// Translation mappings for common terms
const translations = {
  'overview': 'Tổng quan',
  'getting-started': 'Bắt đầu',
  'api-reference': 'Tham khảo API',
  'authentication': 'Xác thực',
  'endpoints': 'Điểm cuối',
  'export-data': 'Xuất dữ liệu',
  'employment': 'Việc làm',
  'wages': 'Tiền lương',
  'merchandise': 'Hàng hóa',
  'services': 'Dịch vụ',
};

// Function to translate title based on ID
function translateTitle(id) {
  const parts = id.split('-');
  const lastPart = parts[parts.length - 1];
  
  // Handle special cases
  if (id.includes('wb-overview')) return 'Tổng quan dữ liệu World Bank';
  if (id.includes('wb-wdi')) return 'Hướng dẫn World Development Indicators';
  if (id.includes('wb-ids')) return 'Thống kê Nợ Quốc tế';
  if (id.includes('imf-overview')) return 'Tổng quan dữ liệu IMF';
  if (id.includes('imf-weo')) return 'Triển vọng Kinh tế Thế giới';
  if (id.includes('imf-ifs')) return 'Thống kê Tài chính Quốc tế';
  if (id.includes('imf-bop')) return 'Thống kê Cán cân Thanh toán';
  if (id.includes('imf-dots')) return 'Thống kê Hướng Thương mại';
  if (id.includes('imf-gfs')) return 'Thống kê Tài chính Chính phủ';
  if (id.includes('un-overview')) return 'Tổng quan dữ liệu Liên Hợp Quốc';
  if (id.includes('oecd-overview')) return 'Tổng quan dữ liệu OECD';
  if (id.includes('adb-overview')) return 'Tổng quan dữ liệu ADB';
  if (id.includes('ilo-overview')) return 'Tổng quan Thống kê Lao động ILO';
  if (id.includes('wto-overview')) return 'Tổng quan Thống kê Thương mại WTO';
  if (id.includes('gso-overview')) return 'Tổng quan dữ liệu GSO Việt Nam';
  if (id.includes('gso-gdp')) return 'GDP và Tăng trưởng Kinh tế';
  if (id.includes('gso-iip')) return 'Chỉ số Sản xuất Công nghiệp';
  if (id.includes('gso-retail')) return 'Thống kê Thương mại Bán lẻ';
  if (id.includes('gso-cpi')) return 'Chỉ số Giá Tiêu dùng';
  if (id.includes('gso-population')) return 'Dữ liệu Dân số';
  if (id.includes('gso-provincial')) return 'Dữ liệu Cấp Tỉnh';
  if (id.includes('customs-overview')) return 'Tổng quan Dữ liệu Hải quan';
  if (id.includes('customs-import-export')) return 'Thống kê Xuất Nhập khẩu';
  if (id.includes('customs-by-commodity')) return 'Thương mại theo Mặt hàng';
  if (id.includes('customs-by-country')) return 'Thương mại theo Quốc gia';
  if (id.includes('surveys-overview')) return 'Tổng quan Dữ liệu Khảo sát';
  if (id.includes('surveys-vhlss')) return 'Khảo sát Mức sống Hộ gia đình';
  if (id.includes('surveys-ves')) return 'Khảo sát Doanh nghiệp';
  if (id.includes('indices-overview')) return 'Tổng quan Chỉ số và Xếp hạng';
  if (id.includes('indices-pci')) return 'Chỉ số Năng lực Cạnh tranh Cấp tỉnh';
  if (id.includes('indices-papi')) return 'Chỉ số Quản trị Công Cấp tỉnh';
  if (id.includes('indices-pmi')) return 'Chỉ số Nhà Quản trị Mua hàng';
  if (id.includes('indices-ict')) return 'Chỉ số Phát triển ICT';
  if (id.includes('stocks-overview')) return 'Tổng quan Thị trường Chứng khoán';
  if (id.includes('stocks-vnindex')) return 'VN-Index';
  if (id.includes('stocks-hnx')) return 'HNX-Index';
  if (id.includes('stocks-upcom')) return 'UPCOM';
  if (id.includes('stocks-sectors')) return 'Chỉ số Ngành';
  if (id.includes('sectors-vasep')) return 'Dữ liệu Thủy sản';
  if (id.includes('sectors-evn')) return 'Dữ liệu Điện lực';
  if (id.includes('sectors-mof')) return 'Dữ liệu Tài chính Chính phủ';
  if (id.includes('sectors-moit')) return 'Dữ liệu Công Thương';
  if (id.includes('guide-getting-started')) return 'Bắt đầu với Dữ liệu Việt Nam';
  if (id.includes('guide-api-reference')) return 'Tham khảo API Dữ liệu Việt Nam';
  if (id.includes('guide-export-data')) return 'Xuất Dữ liệu Việt Nam';
  if (id.includes('api-getting-started')) return 'Hướng dẫn Bắt đầu API';
  if (id.includes('api-authentication')) return 'Xác thực API';
  if (id.includes('api-endpoints')) return 'Tham khảo Điểm cuối API';
  
  // Generic translation
  return parts.map(p => {
    if (translations[p]) return translations[p];
    return p.charAt(0).toUpperCase() + p.slice(1);
  }).join(' ');
}

// Function to create Vietnamese content
function createVietnameseContent(id, docPath) {
  const title = translateTitle(id);
  const pathParts = docPath.split('/');
  const category = pathParts[pathParts.length - 2];
  
  let content = `---
id: ${id}
title: ${title}
sidebar_label: ${title.split(' ').slice(0, 3).join(' ')}
sidebar_position: 1
description: ${title} - Dữ liệu kinh tế cho nghiên cứu kinh tế lượng.
keywords:
  - ${category}
  - dữ liệu kinh tế
  - nghiên cứu kinh tế lượng
slug: /${docPath}
---

# ${title}

## Giới thiệu

Tài liệu này cung cấp hướng dẫn chi tiết về dữ liệu ${category} phục vụ nghiên cứu kinh tế lượng.

## Ứng dụng trong Nghiên cứu

Dữ liệu này có thể được sử dụng cho:
- **Phân tích chuỗi thời gian**: Nghiên cứu xu hướng và dự báo
- **Phân tích hồi quy**: Xác định mối quan hệ giữa các biến kinh tế
- **Phân tích panel data**: So sánh giữa các đơn vị và thời gian
- **Nghiên cứu định lượng**: Kiểm định các giả thuyết kinh tế

## Truy cập Dữ liệu

Dữ liệu có thể được truy cập thông qua:
- Giao diện web ECODATA
- API RESTful
- Xuất dữ liệu CSV/Excel

*Nội dung đầy đủ đang được dịch. Vui lòng xem phiên bản tiếng Anh để biết thêm chi tiết.*
`;

  return content;
}

// Main function
function translateStubs() {
  const i18nPath = path.join(__dirname, '..', 'i18n', 'vi', 'docusaurus-plugin-content-docs', 'current');
  
  // Get all stub files
  const stubFiles = [];
  
  function walkDir(dir, basePath = '') {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        walkDir(filePath, path.join(basePath, file));
      } else if (file.endsWith('.mdx')) {
        const relativePath = path.join(basePath, file).replace(/\\/g, '/');
        const id = file.replace('.mdx', '');
        stubFiles.push({ id, path: relativePath, fullPath: filePath });
      }
    });
  }
  
  walkDir(i18nPath);
  
  console.log(`Found ${stubFiles.length} stub files to translate\n`);
  
  // Translate each stub file
  stubFiles.forEach(({ id, path: docPath, fullPath }) => {
    const content = fs.readFileSync(fullPath, 'utf8');
    
    // Skip if already has substantial content (more than 20 lines)
    if (content.split('\n').length > 20) {
      console.log(`⏭ Skipped (already translated): ${docPath}`);
      return;
    }
    
    const viContent = createVietnameseContent(id, docPath);
    fs.writeFileSync(fullPath, viContent, 'utf8');
    console.log(`✓ Translated: ${docPath}`);
  });
  
  console.log('\n✓ Translation complete!');
}

translateStubs();

