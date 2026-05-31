import React from 'react';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.css';

const ICON = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const ITEMS = [
  {
    key: 'clean',
    icon: (
      <svg {...ICON} aria-hidden="true">
        <path d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: (
      <Translate id="highlights.item1.title" description="Highlight 1 title">
        Dữ liệu sạch, sẵn sàng công bố
      </Translate>
    ),
    desc: (
      <Translate id="highlights.item1.desc" description="Highlight 1 description">
        Toàn bộ dữ liệu được làm sạch và chuẩn hóa theo định dạng panel/time-series, sẵn sàng cho nghiên cứu và công bố quốc tế (ready to publication).
      </Translate>
    ),
  },
  {
    key: 'rich',
    icon: (
      <svg {...ICON} aria-hidden="true">
        <path d="M12 3l9 5-9 5-9-5 9-5z" />
        <path d="M3 12l9 5 9-5" />
        <path d="M3 16.5l9 5 9-5" />
      </svg>
    ),
    title: (
      <Translate id="highlights.item2.title" description="Highlight 2 title">
        Phong phú và cập nhật
      </Translate>
    ),
    desc: (
      <Translate id="highlights.item2.desc" description="Highlight 2 description">
        Kho dữ liệu đa lĩnh vực, đa nguồn, được cập nhật thường xuyên từ các cơ quan và tổ chức chính thức.
      </Translate>
    ),
  },
  {
    key: 'macro',
    icon: (
      <svg {...ICON} aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
      </svg>
    ),
    title: (
      <Translate id="highlights.item3.title" description="Highlight 3 title">
        Đầy đủ chỉ số vĩ mô quốc tế
      </Translate>
    ),
    desc: (
      <Translate id="highlights.item3.desc" description="Highlight 3 description">
        Bao phủ các chỉ số vĩ mô từ những nguồn uy tín: World Bank, IMF, ADB, UN, FRED, OECD, ILO...
      </Translate>
    ),
  },
  {
    key: 'vn',
    icon: (
      <svg {...ICON} aria-hidden="true">
        <path d="M12 3l8 5H4l8-5z" />
        <path d="M5 10v9M9 10v9M15 10v9M19 10v9" />
        <path d="M3 21h18" />
      </svg>
    ),
    title: (
      <Translate id="highlights.item4.title" description="Highlight 4 title">
        Dữ liệu chính thức của Việt Nam
      </Translate>
    ),
    desc: (
      <Translate id="highlights.item4.desc" description="Highlight 4 description">
        Tổng cục Thống kê (Niên giám thống kê, báo cáo kinh tế – xã hội), Hải quan (xuất nhập khẩu theo mặt hàng), khảo sát (PAPI, PCI, PAR, SIPAS, ICT) và các bộ vi mô VHLSS, VARHS, VES.
      </Translate>
    ),
  },
];

export default function Highlights() {
  return (
    <section className={styles.highlights}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <span className={styles.eyebrow}>
            <Translate id="highlights.eyebrow" description="Highlights eyebrow">
              Sẵn sàng cho công bố quốc tế
            </Translate>
          </span>
          <h2 className={styles.title}>
            <Translate id="highlights.title" description="Highlights title">
              Vì sao chọn EcoData?
            </Translate>
          </h2>
          <p className={styles.subtitle}>
            <Translate id="highlights.subtitle" description="Highlights subtitle">
              Nền tảng dữ liệu kinh tế – tài chính được chuẩn hóa cho nghiên cứu và giảng dạy.
            </Translate>
          </p>
        </div>
        <div className={styles.grid}>
          {ITEMS.map((it) => (
            <div key={it.key} className={styles.card}>
              <span className={styles.icon}>{it.icon}</span>
              <h3 className={styles.cardTitle}>{it.title}</h3>
              <p className={styles.cardDesc}>{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
