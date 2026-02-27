/**
 * ECODATA Feature Cards Component
 * Displays data sources as feature cards on the homepage
 */

import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import Image from '@theme/IdealImage';
import Heading from '@theme/Heading';
import { Icon } from '@iconify-icon/react';

const Features = [
  {
    name: (
      <span>
        <Icon icon="mdi:bank" width="1.2em" height="1.2em" />
        <Translate id='features.worldbank.title'>World Bank</Translate>
      </span>
    ),
    image: require('@site/static/home/projects.png'),
    url: 'world-data/world-bank',
    description: (
      <Translate id="features.worldbank.description">
        Access WDI, IDS, and microdata for 200+ countries with 1,600+ development indicators.
      </Translate>
    ),
  },
  {
    name: (
      <span>
        <Icon icon="mdi:currency-usd" width="1.2em" height="1.2em" />
        <Translate id='features.imf.title'>IMF</Translate>
      </span>
    ),
    image: require('@site/static/home/dashboards.png'),
    url: 'world-data/imf',
    description: (
      <Translate id="feature.imf.description">
        Financial statistics, economic outlook, balance of payments, and trade data.
      </Translate>
    ),
  },
  {
    name: (
      <span>
        <Icon icon="mdi:earth" width="1.2em" height="1.2em" />
        <Translate id='features.un.title'>United Nations</Translate>
      </span>
    ),
    image: require('@site/static/home/workflows.png'),
    url: 'world-data/united-nations',
    description: (
      <Translate id="feature.un.description">
        Trade statistics (Comtrade), SDG indicators, and demographic data.
      </Translate>
    ),
  },
  {
    name: (
      <span>
        <Icon icon="mdi:chart-bar" width="1.2em" height="1.2em" />
        <Translate id='features.gso.title'>GSO Vietnam</Translate>
      </span>
    ),
    image: require('@site/static/home/jobs.png'),
    url: 'vietnam-data/gso',
    description: (
      <Translate id="feature.gso.description">
        Official statistics including GDP, CPI, industrial production, and provincial data.
      </Translate>
    ),
  },
  {
    name: (
      <span>
        <Icon icon="mdi:ship" width="1.2em" height="1.2em" />
        <Translate id='features.customs.title'>Vietnam Customs</Translate>
      </span>
    ),
    image: require('@site/static/home/organizations.png'),
    url: 'vietnam-data/customs',
    description: (
      <Translate id="feature.customs.description">
        Import/export data by commodity, partner country, and time period.
      </Translate>
    ),
  },
  {
    name: (
      <span>
        <Icon icon="mdi:chart-line" width="1.2em" height="1.2em" />
        <Translate id='features.stocks.title'>Stock Market</Translate>
      </span>
    ),
    image: require('@site/static/home/test-reports.png'),
    url: 'vietnam-data/stocks',
    description: (
      <Translate id="feature.stocks.description">
        VN-Index, HNX, UPCOM indices and sector analysis for Vietnam stocks.
      </Translate>
    ),
  },
];

function FeatureCard({name, image, url, description}) {
  return (
    <div className="col col--4 margin-bottom--lg">
      <div className={clsx('card')} style={{minHeight: "380px"}} >
        <div className={clsx('card__image')}>
          <Link to={url}>
            <Image img={image} alt={`${name}'s image`} />
          </Link>
        </div>
        <div className="card__body" >
          <Heading as="h3">{name}</Heading>
          <p>{description}</p>
        </div>
        <div className="card__footer">
          <Link to={url} className="button button--primary button--block">
            <Translate id="features.learnmore">Learn more</Translate>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function FeatureCardsRow() {
  return (
    <div className="row">
      {Features.map((feature, idx) => (
        <FeatureCard key={idx} {...feature} />
      ))}
    </div>
  );
}

export default FeatureCardsRow;
