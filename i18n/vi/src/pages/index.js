import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { useColorMode } from '@docusaurus/theme-common';
import Heading from '@theme/Heading';
import styles from '@site/src/pages/index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const { colorMode } = useColorMode();
 
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          Tài liệu EcoData
        </Heading>
        <p className="hero__subtitle">Nền tảng dữ liệu kinh tế cho Việt Nam và thế giới</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/world-data">
            Dữ liệu thế giới
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/vietnam-data">
            Dữ liệu Việt Nam
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
            Khám phá →
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
      description: 'Truy cập WDI, IDS và dữ liệu vi mô cho hơn 200 quốc gia với hơn 1.600 chỉ số phát triển.',
      link: '/world-data/world-bank',
    },
    {
      icon: '💰',
      title: 'IMF',
      description: 'Thống kê tài chính, triển vọng kinh tế, cán cân thanh toán và dữ liệu thương mại.',
      link: '/world-data/imf',
    },
    {
      icon: '🌐',
      title: 'Liên Hợp Quốc',
      description: 'Thống kê thương mại (Comtrade), chỉ số SDG và dữ liệu dân số.',
      link: '/world-data/united-nations',
    },
    {
      icon: '📊',
      title: 'GSO Việt Nam',
      description: 'Thống kê chính thức bao gồm GDP, CPI, sản xuất công nghiệp và dữ liệu cấp tỉnh.',
      link: '/vietnam-data/gso',
    },
    {
      icon: '🚢',
      title: 'Hải quan Việt Nam',
      description: 'Dữ liệu xuất/nhập khẩu theo mặt hàng, quốc gia đối tác và thời gian.',
      link: '/vietnam-data/customs',
    },
    {
      icon: '📈',
      title: 'Thị trường chứng khoán',
      description: 'Chỉ số VN-Index, HNX, UPCOM và phân tích ngành cho cổ phiếu Việt Nam.',
      link: '/vietnam-data/stocks',
    },
  ];

  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <Heading as="h2" className={styles.featuresTitle}>
              Nguồn dữ liệu
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
    { value: '50+', label: 'Nguồn dữ liệu' },
    { value: '200+', label: 'Quốc gia' },
    { value: '10,000+', label: 'Chỉ số' },
    { value: '2', label: 'Ngôn ngữ' },
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
      title="EcoData Docs"
      description="Nền tảng dữ liệu kinh tế cho Việt Nam và thế giới">
      <HomepageHeader />
      <main>
        <QuickStats />
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

