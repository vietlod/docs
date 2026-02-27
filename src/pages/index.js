import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { useColorMode } from '@docusaurus/theme-common';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const { colorMode } = useColorMode();
 
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/world-data">
            World Data
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/vietnam-data">
            Vietnam Data
          </Link>
        </div>
      </div>
    </header>
  );
}

function FeatureCard({icon, title, description, link}) {
  return (
    <div className="col col--4">
      <div className={clsx('card', styles.featureCard)}>
        <div className="card__header">
          <h3>{icon} {title}</h3>
        </div>
        <div className="card__body">
          <p>{description}</p>
        </div>
        <div className="card__footer">
          <Link className="button button--primary button--block" to={link}>
            Explore →
          </Link>
        </div>
      </div>
    </div>
  );
}

function HomepageFeatures() {
  const features = [
    {
      icon: '🏦',
      title: 'World Bank',
      description: 'Access WDI, IDS, and microdata for 200+ countries with 1,600+ development indicators.',
      link: '/world-data/world-bank',
    },
    {
      icon: '💰',
      title: 'IMF',
      description: 'Financial statistics, economic outlook, balance of payments, and trade data.',
      link: '/world-data/imf',
    },
    {
      icon: '🌐',
      title: 'United Nations',
      description: 'Trade statistics (Comtrade), SDG indicators, and demographic data.',
      link: '/world-data/united-nations',
    },
    {
      icon: '📊',
      title: 'GSO Vietnam',
      description: 'Official statistics including GDP, CPI, industrial production, and provincial data.',
      link: '/vietnam-data/gso',
    },
    {
      icon: '🚢',
      title: 'Vietnam Customs',
      description: 'Import/export data by commodity, partner country, and time period.',
      link: '/vietnam-data/customs',
    },
    {
      icon: '📈',
      title: 'Stock Market',
      description: 'VN-Index, HNX, UPCOM indices and sector analysis for Vietnam stocks.',
      link: '/vietnam-data/stocks',
    },
  ];

  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <Heading as="h2" className={styles.featuresTitle}>
              Data Sources
            </Heading>
          </div>
        </div>
        <div className="row">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

function QuickStats() {
  const stats = [
    { value: '50+', label: 'Data Sources' },
    { value: '200+', label: 'Countries' },
    { value: '10,000+', label: 'Indicators' },
    { value: '2', label: 'Languages' },
  ];

  return (
    <section className={styles.stats}>
      <div className="container">
        <div className="row">
          {stats.map((stat, idx) => (
            <div key={idx} className="col col--3">
              <div className={styles.statItem}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <QuickStats />
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
