import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import viText from '../i18n/vi.json';
import enText from '../i18n/en.json';
import styles from './index.module.css';
import Highlights from '../components/Highlights';
import EconometricsShowcase from '../components/EconometricsShowcase';

const localeText = {
  vi: viText,
  en: enText,
};

function useHomeText() {
  const {i18n} = useDocusaurusContext();
  return localeText[i18n.currentLocale] || viText;
}

function Hero() {
  const text = useHomeText();

  return (
    <header className={styles.hero}>
      <div className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>{text.hero.eyebrow}</span>
          <Heading as="h1" className={styles.title}>
            {text.hero.title}
          </Heading>
          <p className={styles.subtitle}>{text.hero.subtitle}</p>
          <div className={styles.actions}>
            <Link className={styles.primaryAction} to={text.hero.primaryHref}>
              {text.hero.primaryAction}
            </Link>
            <Link className={styles.secondaryAction} to={text.hero.secondaryHref}>
              {text.hero.secondaryAction}
            </Link>
          </div>
        </div>

        <div className={styles.workflowPanel} aria-label={text.workflow.title}>
          <div className={styles.panelHeader}>
            <span>{text.workflow.title}</span>
            <span>{text.workflow.badge}</span>
          </div>
          <ol className={styles.workflowList}>
            {text.workflow.steps.map((step) => (
              <li key={step.title}>
                <strong>{step.title}</strong>
                <span>{step.description}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </header>
  );
}

function SourceMatrix() {
  const text = useHomeText();

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <Heading as="h2">{text.sources.title}</Heading>
        <p>{text.sources.description}</p>
      </div>
      <div className={styles.sourceGrid}>
        {text.sources.items.map((item) => (
          <Link key={item.title} className={styles.sourceCard} to={item.href}>
            <span className={styles.sourceType}>{item.type}</span>
            <strong>{item.title}</strong>
            <p>{item.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ToolStrip() {
  const text = useHomeText();

  return (
    <section className={styles.toolBand}>
      <div className={styles.toolInner}>
        <div>
          <Heading as="h2">{text.tools.title}</Heading>
          <p>{text.tools.description}</p>
        </div>
        <div className={styles.toolLinks}>
          {text.tools.items.map((item) => (
            <Link key={item.title} to={item.href}>
              <strong>{item.title}</strong>
              <span>{item.description}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const text = useHomeText();

  return (
    <Layout title={text.meta.title} description={text.meta.description}>
      <Hero />
      <main>
        <Highlights />
        <SourceMatrix />
        <EconometricsShowcase />
        <ToolStrip />
      </main>
    </Layout>
  );
}
