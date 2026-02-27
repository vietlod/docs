/**
 * Script to create Vietnamese stub files for all missing translations
 * Run: node scripts/create-vi-stubs.js
 */

const fs = require('fs');
const path = require('path');

// List of all document IDs from sidebars.js
const documentIds = [
  // World Data
  'world-data/world-bank/wb-overview',
  'world-data/world-bank/wb-wdi',
  'world-data/world-bank/wb-ids',
  'world-data/world-bank/wb-microdata',
  'world-data/world-bank/wb-doing-business',
  'world-data/imf/imf-overview',
  'world-data/imf/imf-weo',
  'world-data/imf/imf-ifs',
  'world-data/imf/imf-bop',
  'world-data/imf/imf-dots',
  'world-data/imf/imf-gfs',
  'world-data/united-nations/un-overview',
  'world-data/united-nations/un-unsd',
  'world-data/united-nations/un-comtrade',
  'world-data/united-nations/un-unctad',
  'world-data/united-nations/un-sdg',
  'world-data/oecd/oecd-overview',
  'world-data/oecd/oecd-national-accounts',
  'world-data/oecd/oecd-industry',
  'world-data/oecd/oecd-trade',
  'world-data/adb/adb-overview',
  'world-data/adb/adb-key-indicators',
  'world-data/adb/adb-aric',
  'world-data/ilo/ilo-overview',
  'world-data/ilo/ilo-employment',
  'world-data/ilo/ilo-wages',
  'world-data/wto/wto-overview',
  'world-data/wto/wto-merchandise',
  'world-data/wto/wto-services',
  'world-data/other-sources/bis-overview',
  'world-data/other-sources/fao-overview',
  'world-data/other-sources/eurostat-overview',
  'world-data/other-sources/wgi-overview',
  'world-data/other-sources/fred-overview',
  'world-data/api/api-getting-started',
  'world-data/api/api-authentication',
  'world-data/api/api-endpoints',
  // Vietnam Data
  'vietnam-data/gso/gso-overview',
  'vietnam-data/gso/gso-gdp',
  'vietnam-data/gso/gso-iip',
  'vietnam-data/gso/gso-retail',
  'vietnam-data/gso/gso-population',
  'vietnam-data/gso/gso-provincial',
  'vietnam-data/gso/gso-cpi',
  'vietnam-data/customs/customs-overview',
  'vietnam-data/customs/customs-import-export',
  'vietnam-data/customs/customs-by-commodity',
  'vietnam-data/customs/customs-by-country',
  'vietnam-data/surveys/surveys-overview',
  'vietnam-data/surveys/surveys-vhlss',
  'vietnam-data/surveys/surveys-ves',
  'vietnam-data/surveys/surveys-wbg-es',
  'vietnam-data/indices/indices-overview',
  'vietnam-data/indices/indices-pci',
  'vietnam-data/indices/indices-papi',
  'vietnam-data/indices/indices-pmi',
  'vietnam-data/indices/indices-ict',
  'vietnam-data/stocks/stocks-overview',
  'vietnam-data/stocks/stocks-vnindex',
  'vietnam-data/stocks/stocks-hnx',
  'vietnam-data/stocks/stocks-upcom',
  'vietnam-data/stocks/stocks-sectors',
  'vietnam-data/sectors/sectors-vasep',
  'vietnam-data/sectors/sectors-evn',
  'vietnam-data/sectors/sectors-mof',
  'vietnam-data/sectors/sectors-moit',
  'vietnam-data/guide/guide-getting-started',
  'vietnam-data/guide/guide-api-reference',
  'vietnam-data/guide/guide-export-data',
];

const i18nPath = path.join(__dirname, '..', 'i18n', 'vi', 'docusaurus-plugin-content-docs', 'current');

function createStubFile(docId) {
  const filePath = path.join(i18nPath, `${docId}.mdx`);
  const dirPath = path.dirname(filePath);
  
  // Skip if file already exists
  if (fs.existsSync(filePath)) {
    console.log(`✓ Already exists: ${docId}`);
    return;
  }
  
  // Create directory if not exists
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  // Extract ID and create title
  const idParts = docId.split('/');
  const id = idParts[idParts.length - 1];
  const title = id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  const content = `---
id: ${id}
title: ${title}
sidebar_label: Overview
sidebar_position: 1
description: Nội dung đang được dịch.
keywords:
  - ecodata
slug: /${docId}
---

# ${title}

*Nội dung đang được dịch sang tiếng Việt. Vui lòng xem phiên bản tiếng Anh trong lúc chờ đợi.*
`;
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Created: ${docId}`);
}

// Create all stub files
console.log('Creating Vietnamese stub files...\n');
documentIds.forEach(createStubFile);
console.log('\n✓ Done!');

