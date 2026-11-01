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
        Toàn bộ dữ liệu được làm sạch và chuẩn hóa theo định dạng dữ liệu bảng và chuỗi thời gian, sẵn sàng cho nghiên cứu học thuật và công bố quốc tế.
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
        Kho dữ liệu đa lĩnh vực, đa nguồn từ Finco và EcoData, được cập nhật thường xuyên từ các cơ quan thống kê và tổ chức tài chính chính thức.
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
        Đầy đủ chỉ số vĩ mô và hàng hóa quốc tế
      </Translate>
    ),
    desc: (
      <Translate id="highlights.item3.desc" description="Highlight 3 description">
        Bao phủ các chỉ số vĩ mô và thị trường hàng hóa từ những nguồn uy tín: World Bank, IMF, ADB, UN, FRED, OECD, ILO, FAO và MXV.
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
        Cục Thống kê với Niên giám thống kê và báo cáo kinh tế xã hội, Hải quan với xuất nhập khẩu theo mặt hàng, khảo sát PAPI, PCI, PAR, SIPAS, DTI và bộ vi mô VHLSS 34 và 63 tỉnh thành.
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
              Vì sao chọn hệ sinh thái dữ liệu và phân tích TNS AI?
            </Translate>
          </h2>
          <p className={styles.subtitle}>
            <Translate id="highlights.subtitle" description="Highlights subtitle">
              Nền tảng dữ liệu kinh tế, tài chính và hàng hóa kết hợp 201 mô hình kinh tế lượng chuẩn hóa cho nghiên cứu và giảng dạy.
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
