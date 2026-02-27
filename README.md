# EcoData Documentation

This repository contains the source code for the **EcoData Documentation** site, built with [Docusaurus](https://docusaurus.io/). The documentation provides comprehensive guides and references for the EcoData platform - an economic data aggregation platform for Vietnam and global economic indicators.

**Live Site:** [https://ecodata.khoviet.com/docs](https://ecodata.khoviet.com/docs)

## 📋 Overview

EcoData Documentation covers:

- **Vietnam Data**: Official economic data from GSO, Customs, Stock exchanges, Surveys, Indices, and Sector-specific sources
- **World Data**: International economic indicators from IMF, World Bank, OECD, ILO, ADB, WTO, United Nations, and other global sources
- **API Reference**: Complete API documentation for accessing economic datasets
- **Guides**: Getting started tutorials, data export guides, and best practices

The documentation is available in **English** and **Tiếng Việt** (Vietnamese).

## 🛠️ Tech Stack

- **[Docusaurus](https://docusaurus.io/) 3.9.2** - Documentation framework
- **React 18** - UI library
- **MDX** - Content format (Markdown + React components)
- **Prism** - Syntax highlighting
- **i18n** - Internationalization (English & Vietnamese)

### Key Dependencies

- `@docusaurus/preset-classic` - Core Docusaurus preset
- `@docusaurus/theme-mermaid` - Mermaid diagram support
- `docusaurus-plugin-openapi-docs` - API documentation plugin
- `@iconify/react` - Icon system

## 🚀 Getting Started

### Prerequisites

- **Node.js**: >= 18.0
- **npm** or **yarn**

### Installation

```bash
# Navigate to docs directory
cd docs

# Install dependencies
npm install
```

### Development

```bash
# Start development server (English locale)
npm start

# Start development server (Vietnamese locale)
npm start -- --locale vi

# Build for production
npm run build

# Serve production build locally
npm run serve
```

The development server will start at `http://localhost:3000/docs/` (English) or `http://localhost:3000/docs/vi/` (Vietnamese).

### Important Notes for i18n Development

- **Dev mode (`npm start`)**: i18n routing may not work perfectly. Use build mode for accurate testing.
- **Build mode (`npm run build && npm run serve`)**: Required for proper i18n testing, especially when switching between locales.
- Always clear cache before building: `npm run clear && npm run build`

## 📁 Project Structure

```
docs/
├── docs/                          # Documentation content (MDX files)
│   ├── vietnam-data/             # Vietnam economic data documentation
│   │   ├── gso/                  # General Statistics Office
│   │   ├── customs/              # Customs data
│   │   ├── stocks/               # Stock market data
│   │   ├── surveys/              # Survey data (VHLSS, VES, etc.)
│   │   ├── indices/              # Economic indices (PCI, PAPI, PMI, etc.)
│   │   ├── sectors/              # Sector-specific data
│   │   └── guide/                # User guides
│   └── world-data/               # World economic data documentation
│       ├── imf/                  # International Monetary Fund
│       ├── world-bank/           # World Bank data
│       ├── oecd/                 # OECD data
│       ├── ilo/                  # International Labour Organization
│       ├── adb/                  # Asian Development Bank
│       ├── wto/                  # World Trade Organization
│       ├── united-nations/       # UN data sources
│       ├── other-sources/        # Other global sources
│       └── api/                  # API documentation
├── i18n/                         # Internationalization
│   └── vi/                       # Vietnamese translations
│       ├── docusaurus-plugin-content-docs/  # Translated docs
│       ├── docusaurus-theme-classic/        # Translated UI
│       └── src/pages/            # Translated pages
├── src/                          # Source code
│   ├── components/               # React components
│   ├── css/                      # Custom styles
│   └── pages/                    # Custom pages
├── static/                       # Static assets (images, files)
├── docusaurus.config.js          # Docusaurus configuration
├── package.json                  # Dependencies and scripts
└── DEPLOYMENT_GUIDE.md           # Deployment instructions
```

## 🌐 Deployment

The documentation is deployed at `https://ecodata.khoviet.com/docs` using Docker and Nginx.

### Production Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed deployment instructions, including:

- Docker container setup
- Nginx configuration for path-based routing (`/docs/`)
- i18n routing setup (`/docs/vi/` for Vietnamese)
- Static asset serving
- Build and deployment workflow

### Key Deployment Configuration

- **baseUrl**: `/docs/`
- **url**: `https://ecodata.khoviet.com`
- **Default locale**: English (`en`)
- **Locales**: English (`en`), Vietnamese (`vi`)

## 📝 Contributing

### Adding Documentation

1. Create or edit MDX files in `docs/docs/` directory
2. Follow the existing structure and naming conventions
3. Use absolute paths for internal links (e.g., `/vietnam-data/gso` instead of `./gso`)
4. Add translations in `i18n/vi/docusaurus-plugin-content-docs/current/` for Vietnamese content

### Adding New Pages

1. Create MDX file in appropriate directory
2. Add `_category_.json` if creating a new category
3. Update navigation in `docusaurus.config.js` if needed
4. Add translations if applicable

### Running Linters

```bash
# Check markdown linting
npm run lint
```

## 🔧 Configuration

Main configuration file: `docusaurus.config.js`

Key settings:
- **Site metadata**: Title, tagline, organization info
- **i18n**: Locale configuration (English & Vietnamese)
- **Navbar**: Navigation menu items
- **Footer**: Footer content and links
- **Plugins**: Mermaid diagrams, OpenAPI docs

## 📚 Resources

- [Docusaurus Documentation](https://docusaurus.io/docs)
- [MDX Documentation](https://mdxjs.com/)
- [Deployment Guide](./DEPLOYMENT_GUIDE.md)

## 📄 License

All documentation content and resources fall under the Apache v2 license present at the root of this repository.

---

**Built with ❤️ for the EcoData community**
