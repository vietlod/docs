import React from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.css';

const ICON = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const PHASES = [
  {
    num: '01',
    icon: (
      <svg {...ICON} aria-hidden="true">
        <path d="M4 7c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3z" />
        <path d="M4 7v10c0 1.7 3.6 3 8 3s8-1.3 8-3V7" />
        <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
      </svg>
    ),
    title: (
      <Translate id="econ.phase1.title" description="Econ phase 1 title">
        Chuẩn bị dữ liệu
      </Translate>
    ),
    desc: (
      <Translate id="econ.phase1.desc" description="Econ phase 1 desc">
        Lọc phạm vi dữ liệu, chọn chỉ số, tính toán biến, làm sạch và xem thống kê mô tả.
      </Translate>
    ),
  },
  {
    num: '02',
    icon: (
      <svg {...ICON} aria-hidden="true">
        <path d="M9 3h6" />
        <path d="M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3" />
        <path d="M7 15h10" />
      </svg>
    ),
    title: (
      <Translate id="econ.phase2.title" description="Econ phase 2 title">
        Mô hình phân tích
      </Translate>
    ),
    desc: (
      <Translate id="econ.phase2.desc" description="Econ phase 2 desc">
        Xây dựng mô hình đề xuất và mô hình thay thế, ước lượng và kiểm định, đánh giá robustness và lựa chọn mô hình.
      </Translate>
    ),
  },
  {
    num: '03',
    icon: (
      <svg {...ICON} aria-hidden="true">
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
        <path d="M14 3v5h5" />
        <path d="M9 15l2 2 4-4" />
      </svg>
    ),
    title: (
      <Translate id="econ.phase3.title" description="Econ phase 3 title">
        Trình bày báo cáo
      </Translate>
    ),
    desc: (
      <Translate id="econ.phase3.desc" description="Econ phase 3 desc">
        Xuất kết quả theo chuẩn trích dẫn: APA 7th, Chicago 8th, Harvard 2008, IEEE 2008 và MLA 7th.
      </Translate>
    ),
  },
  {
    num: '04',
    icon: (
      <svg {...ICON} aria-hidden="true">
        <path d="M8 9l-4 3 4 3" />
        <path d="M16 9l4 3-4 3" />
        <path d="M13 6l-2 12" />
      </svg>
    ),
    title: (
      <Translate id="econ.phase4.title" description="Econ phase 4 title">
        Xuất bộ mã tái lập
      </Translate>
    ),
    desc: (
      <Translate id="econ.phase4.desc" description="Econ phase 4 desc">
        Sinh bộ mã hoàn chỉnh từ bước chọn chỉ số đến xuất báo cáo, sẵn sàng chạy trên Stata, R và Python.
      </Translate>
    ),
  },
];

const CITATIONS = ['APA 7th', 'Chicago 8th', 'Harvard 2008', 'IEEE 2008', 'MLA 7th'];
const ENGINES = ['Stata', 'R', 'Python'];

function AnimatedBackground() {
  return (
    <svg
      className={styles.bg}
      viewBox="0 0 800 420"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true">
      <defs>
        <radialGradient id="ecoGlowTeal" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2a9d8f" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#2a9d8f" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ecoGlowGold" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f4c95d" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#f4c95d" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ecoLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2a9d8f" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#f4c95d" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#2a9d8f" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <circle className={styles.blobA} cx="160" cy="120" r="200" fill="url(#ecoGlowTeal)" />
      <circle className={styles.blobB} cx="660" cy="300" r="220" fill="url(#ecoGlowGold)" />
      <path
        className={styles.flow}
        d="M40,250 C 200,90 320,90 400,210 C 480,330 600,330 760,170"
        fill="none"
        stroke="url(#ecoLine)"
        strokeWidth="2"
        strokeDasharray="4 12"
      />
      <g className={styles.nodes} fill="#f4c95d">
        <circle cx="40" cy="250" r="4" />
        <circle cx="400" cy="210" r="4" />
        <circle cx="760" cy="170" r="4" />
      </g>
    </svg>
  );
}

export default function EconometricsShowcase() {
  return (
    <section className={styles.section}>
      <AnimatedBackground />
      <div className={styles.inner}>
        <div className={styles.head}>
          <span className={styles.badge}>
            <span className={styles.badgeDot} />
            <Translate id="econ.badge" description="Econ badge">
              Công cụ tích hợp
            </Translate>
          </span>
          <h2 className={styles.title}>
            <Translate id="econ.title" description="Econ title">
              Phân tích kinh tế lượng tích hợp sẵn
            </Translate>
          </h2>
          <p className={styles.subtitle}>
            <Translate id="econ.subtitle" description="Econ subtitle">
              Đánh giá ngay tính thực tế và khả thi của nghiên cứu, qua quy trình khép kín từ chuẩn bị dữ liệu đến xuất bộ mã tái lập.
            </Translate>
          </p>
        </div>

        <div className={styles.pipeline}>
          {PHASES.map((p) => (
            <div key={p.num} className={styles.step}>
              <span className={styles.stepIcon}>{p.icon}</span>
              <span className={styles.stepNum}>{p.num}</span>
              <h3 className={styles.stepTitle}>{p.title}</h3>
              <p className={styles.stepDesc}>{p.desc}</p>
            </div>
          ))}
        </div>

        <div className={styles.metaRow}>
          <div className={styles.metaGroup}>
            <span className={styles.metaLabel}>
              <Translate id="econ.citations.label" description="Citation styles label">
                Chuẩn trích dẫn
              </Translate>
            </span>
            <div className={styles.chips}>
              {CITATIONS.map((c) => (
                <span key={c} className={styles.chip}>
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.metaGroup}>
            <span className={styles.metaLabel}>
              <Translate id="econ.engines.label" description="Code export label">
                Xuất mã
              </Translate>
            </span>
            <div className={styles.chips}>
              {ENGINES.map((c) => (
                <span key={c} className={`${styles.chip} ${styles.chipEngine}`}>
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.cta}>
          <Link
            className={styles.ctaButton}
            href="https://ecodata.io.vn/econometrics/flow">
            <Translate id="econ.cta" description="Econ CTA">
              Dùng thử quy trình phân tích
            </Translate>
          </Link>
        </div>
      </div>
    </section>
  );
}
