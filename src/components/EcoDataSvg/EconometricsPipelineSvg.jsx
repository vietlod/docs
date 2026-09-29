import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

export default function EconometricsPipelineSvg() {
  const { i18n: { currentLocale } } = useDocusaurusContext();
  const isVi = currentLocale === 'vi';

  const t = {
    title: isVi ? 'Quy trình phân tích kinh tế lượng tự động qua bộ 3 runtime' : 'Automated Econometrics Analysis Pipeline Across Triple Runtime',
    sub: isVi ? 'Từ trích xuất dữ liệu, kiểm định giả định đến xuất kịch bản tái lập (Python, R, Stata)' : 'From data ingestion and hypothesis testing to reproducible scripts (Python, R, Stata)',
    step1Title: isVi ? '1. Nạp và xử lý dữ liệu' : '1. Ingestion & Prep',
    step1Desc1: isVi ? '200.000+ chuỗi vĩ mô & vi mô' : '200k+ macro & micro series',
    step1Desc2: isVi ? 'Làm sạch, định danh, trễ/log' : 'Cleaning, panel indexing, lag/log',
    step2Title: isVi ? '2. Xác lập 105 mô hình' : '2. Model Specification',
    step2Desc1: isVi ? '12 họ phân tích định lượng' : '12 quantitative families',
    step2Desc2: isVi ? 'OLS, Panel FE/RE, GMM, VAR, DID' : 'OLS, Panel FE/RE, GMM, VAR, DID',
    step3Title: isVi ? '3. Bộ 3 runtime song song' : '3. Parallel Triple Runtime',
    pyDesc: 'Python (statsmodels / linearmodels)',
    rDesc: 'R (tidyverse / plm / fixest)',
    stataDesc: 'Stata 18 MP (C-engine / multi-core)',
    step4Title: isVi ? '4. Kiểm định và tái lập' : '4. Diagnostics & Replication',
    step4Desc1: isVi ? 'VIF, DW, White, Hausman test' : 'VIF, DW, White, Hausman tests',
    step4Desc2: isVi ? 'Xuất mã .do / .R / .py và bảng APA' : 'Export .do / .R / .py & APA tables',
    badge: isVi ? 'Khả năng tái lập 100%' : '100% Reproducibility',
    runtimeTag: isVi ? 'Thực thi song song thời gian thực' : 'Real-time parallel execution',
  };

  return (
    <div className={styles.svgContainer} aria-label={t.title}>
      <svg
        className={styles.svgRoot}
        viewBox="0 0 960 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.06" />
          </linearGradient>

          <linearGradient id="cardGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284c7" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0369a1" stopOpacity="0.05" />
          </linearGradient>

          <linearGradient id="cardGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.05" />
          </linearGradient>

          <linearGradient id="cardGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#047857" stopOpacity="0.06" />
          </linearGradient>

          <linearGradient id="cardGrad4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.06" />
          </linearGradient>
        </defs>

        {/* Outer Background Grid */}
        <rect width="960" height="480" rx="16" fill="url(#bgGrad)" />
        <g stroke="rgba(100, 116, 139, 0.12)" strokeWidth="1" strokeDasharray="4 6">
          <line x1="240" y1="40" x2="240" y2="440" />
          <line x1="470" y1="40" x2="470" y2="440" />
          <line x1="720" y1="40" x2="720" y2="440" />
          <line x1="40" y1="240" x2="920" y2="240" />
        </g>

        {/* Top Header Banner in SVG */}
        <rect x="30" y="20" width="900" height="52" rx="10" fill="rgba(15, 23, 42, 0.05)" />
        <circle cx="56" cy="46" r="12" fill="#0284c7" fillOpacity="0.2" />
        <path d="M51 46h10M56 41v10" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
        <text x="80" y="41" fill="currentColor" fontSize="15" fontWeight="700" fontFamily="inherit">
          {t.title}
        </text>
        <text x="80" y="58" fill="#64748b" fontSize="11.5" fontWeight="500" fontFamily="inherit">
          {t.sub}
        </text>
        <g transform="translate(770, 32)">
          <rect width="145" height="26" rx="13" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="1" />
          <circle cx="14" cy="13" r="4" fill="#10b981" className={styles.animPulse} />
          <text x="24" y="17" fill="#059669" fontSize="10.5" fontWeight="600" fontFamily="inherit">
            {t.badge}
          </text>
        </g>

        {/* Dynamic Animated Connector Paths */}
        {/* Step 1 -> Step 2 */}
        <path
          d="M 215 240 L 255 240"
          stroke="#0284c7"
          strokeWidth="2.5"
          strokeDasharray="6 4"
          className={styles.animFlow}
        />
        <circle cx="255" cy="240" r="3.5" fill="#0284c7" />

        {/* Step 2 -> Step 3 (Branching to 3 Runtimes) */}
        <path
          d="M 445 240 C 465 240, 465 150, 490 150"
          stroke="#38bdf8"
          strokeWidth="2.5"
          strokeDasharray="6 4"
          fill="none"
          className={styles.animFlow}
        />
        <path
          d="M 445 240 L 490 240"
          stroke="#2563eb"
          strokeWidth="2.5"
          strokeDasharray="6 4"
          fill="none"
          className={styles.animFlowFast}
        />
        <path
          d="M 445 240 C 465 240, 465 330, 490 330"
          stroke="#dc2626"
          strokeWidth="2.5"
          strokeDasharray="6 4"
          fill="none"
          className={styles.animFlow}
        />

        {/* Step 3 -> Step 4 (Converging to Diagnostics) */}
        <path
          d="M 695 150 C 720 150, 720 240, 745 240"
          stroke="#38bdf8"
          strokeWidth="2.5"
          strokeDasharray="6 4"
          fill="none"
          className={styles.animFlow}
        />
        <path
          d="M 695 240 L 745 240"
          stroke="#2563eb"
          strokeWidth="2.5"
          strokeDasharray="6 4"
          fill="none"
          className={styles.animFlowFast}
        />
        <path
          d="M 695 330 C 720 330, 720 240, 745 240"
          stroke="#dc2626"
          strokeWidth="2.5"
          strokeDasharray="6 4"
          fill="none"
          className={styles.animFlow}
        />
        <circle cx="745" cy="240" r="3.5" fill="#f59e0b" />

        {/* STEP 1: Data Ingestion */}
        <g transform="translate(35, 110)">
          <rect width="180" height="260" rx="14" fill="url(#cardGrad1)" stroke="#0284c7" strokeWidth="1.5" />
          <rect x="12" y="12" width="36" height="36" rx="8" fill="#0284c7" fillOpacity="0.2" />
          <path d="M24 23v14M20 27l4-4 4 4M20 33h8" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <text x="16" y="72" fill="currentColor" fontSize="13.5" fontWeight="700" fontFamily="inherit">
            {t.step1Title}
          </text>
          <text x="16" y="94" fill="#64748b" fontSize="11" fontWeight="500" fontFamily="inherit">
            {t.step1Desc1}
          </text>

          <g transform="translate(14, 115)">
            <rect width="152" height="32" rx="6" fill="rgba(255,255,255,0.6)" stroke="rgba(2,132,199,0.2)" />
            <text x="10" y="20" fill="#0369a1" fontSize="10.5" fontWeight="600">GSO / Customs / WB / IMF</text>
          </g>
          <g transform="translate(14, 155)">
            <rect width="152" height="32" rx="6" fill="rgba(255,255,255,0.6)" stroke="rgba(2,132,199,0.2)" />
            <text x="10" y="20" fill="#0369a1" fontSize="10.5" fontWeight="600">VHLSS &amp; PCI Microdata</text>
          </g>
          <g transform="translate(14, 195)">
            <rect width="152" height="44" rx="6" fill="rgba(2,132,199,0.08)" stroke="rgba(2,132,199,0.3)" />
            <text x="10" y="18" fill="#0284c7" fontSize="10" fontWeight="600">✓ {t.step1Desc2}</text>
            <text x="10" y="32" fill="#64748b" fontSize="9.5">ADF unit root &amp; outlier filter</text>
          </g>
        </g>

        {/* STEP 2: Model Specification */}
        <g transform="translate(255, 110)">
          <rect width="190" height="260" rx="14" fill="url(#cardGrad2)" stroke="#8b5cf6" strokeWidth="1.5" />
          <rect x="12" y="12" width="36" height="36" rx="8" fill="#8b5cf6" fillOpacity="0.2" />
          <path d="M22 23h16M22 29h12M22 35h16" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" />
          <text x="16" y="72" fill="currentColor" fontSize="13.5" fontWeight="700" fontFamily="inherit">
            {t.step2Title}
          </text>
          <text x="16" y="94" fill="#64748b" fontSize="11" fontWeight="500" fontFamily="inherit">
            {t.step2Desc1}
          </text>

          <g transform="translate(14, 115)">
            <rect width="162" height="30" rx="6" fill="rgba(139,92,246,0.1)" stroke="rgba(139,92,246,0.3)" />
            <text x="10" y="19" fill="#7c3aed" fontSize="10" fontWeight="600">Linear &amp; Panel (FE, RE, 2SLS)</text>
          </g>
          <g transform="translate(14, 152)">
            <rect width="162" height="30" rx="6" fill="rgba(139,92,246,0.1)" stroke="rgba(139,92,246,0.3)" />
            <text x="10" y="19" fill="#7c3aed" fontSize="10" fontWeight="600">Dynamic GMM (Arellano-Bond)</text>
          </g>
          <g transform="translate(14, 189)">
            <rect width="162" height="30" rx="6" fill="rgba(139,92,246,0.1)" stroke="rgba(139,92,246,0.3)" />
            <text x="10" y="19" fill="#7c3aed" fontSize="10" fontWeight="600">Time-Series: VAR / VECM / ARDL</text>
          </g>
          <g transform="translate(14, 226)">
            <rect width="162" height="24" rx="5" fill="rgba(139,92,246,0.15)" />
            <text x="10" y="16" fill="#6d28d9" fontSize="9.5" fontWeight="700">+ Logit, Probit, Spatial, DID</text>
          </g>
        </g>

        {/* STEP 3: Triple Parallel Runtime */}
        <g transform="translate(485, 95)">
          <rect x="10" y="-8" width="200" height="22" rx="11" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1" />
          <text x="24" y="7" fill="#047857" fontSize="10" fontWeight="700">⚡ {t.step3Title}</text>

          {/* Python Box */}
          <g transform="translate(5, 20)">
            <rect width="205" height="66" rx="10" fill="rgba(56,189,248,0.08)" stroke="#38bdf8" strokeWidth="1.5" />
            <circle cx="22" cy="33" r="12" fill="#38bdf8" fillOpacity="0.2" />
            <text x="16" y="37" fill="#0284c7" fontSize="12" fontWeight="700">Py</text>
            <text x="42" y="28" fill="currentColor" fontSize="12" fontWeight="700">Python Runtime</text>
            <text x="42" y="45" fill="#64748b" fontSize="9.5">pandas • statsmodels • linearmodels</text>
            <rect x="42" y="51" width="70" height="12" rx="3" fill="rgba(56,189,248,0.2)" />
            <text x="46" y="60" fill="#0284c7" fontSize="8" fontWeight="600">AI Native Stack</text>
          </g>

          {/* R Box */}
          <g transform="translate(5, 110)">
            <rect width="205" height="66" rx="10" fill="rgba(37,99,235,0.08)" stroke="#2563eb" strokeWidth="1.5" />
            <circle cx="22" cy="33" r="12" fill="#2563eb" fillOpacity="0.2" />
            <text x="17" y="37" fill="#1d4ed8" fontSize="13" fontWeight="700">R</text>
            <text x="42" y="28" fill="currentColor" fontSize="12" fontWeight="700">R Runtime</text>
            <text x="42" y="45" fill="#64748b" fontSize="9.5">tidyverse • plm • fixest • sandwich</text>
            <rect x="42" y="51" width="78" height="12" rx="3" fill="rgba(37,99,235,0.2)" />
            <text x="46" y="60" fill="#1e40af" fontSize="8" fontWeight="600">Fast Fixed Effects</text>
          </g>

          {/* Stata Box */}
          <g transform="translate(5, 200)">
            <rect width="205" height="66" rx="10" fill="rgba(220,38,38,0.08)" stroke="#dc2626" strokeWidth="1.5" />
            <circle cx="22" cy="33" r="12" fill="#dc2626" fillOpacity="0.2" />
            <text x="15" y="37" fill="#b91c1c" fontSize="11" fontWeight="700">STA</text>
            <text x="42" y="28" fill="currentColor" fontSize="12" fontWeight="700">Stata 18 MP</text>
            <text x="42" y="45" fill="#64748b" fontSize="9.5">High-perf C-engine • Multi-core SSC</text>
            <rect x="42" y="51" width="86" height="12" rx="3" fill="rgba(220,38,38,0.2)" />
            <text x="46" y="60" fill="#b91c1c" fontSize="8" fontWeight="600">Gold-standard C-core</text>
          </g>
        </g>

        {/* STEP 4: Diagnostics & Replication */}
        <g transform="translate(745, 110)">
          <rect width="180" height="260" rx="14" fill="url(#cardGrad4)" stroke="#f59e0b" strokeWidth="1.5" />
          <rect x="12" y="12" width="36" height="36" rx="8" fill="#f59e0b" fillOpacity="0.2" />
          <path d="M20 23l5 5 10-10" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <text x="16" y="72" fill="currentColor" fontSize="13.5" fontWeight="700" fontFamily="inherit">
            {t.step4Title}
          </text>
          <text x="16" y="94" fill="#64748b" fontSize="11" fontWeight="500" fontFamily="inherit">
            {t.step4Desc1}
          </text>

          <g transform="translate(14, 115)">
            <rect width="152" height="28" rx="6" fill="rgba(245,158,11,0.12)" stroke="rgba(245,158,11,0.3)" />
            <text x="10" y="18" fill="#b45309" fontSize="10" fontWeight="600">✓ Breusch-Pagan / White</text>
          </g>
          <g transform="translate(14, 150)">
            <rect width="152" height="28" rx="6" fill="rgba(245,158,11,0.12)" stroke="rgba(245,158,11,0.3)" />
            <text x="10" y="18" fill="#b45309" fontSize="10" fontWeight="600">✓ Durbin-Watson / VIF &lt; 5</text>
          </g>
          <g transform="translate(14, 185)">
            <rect width="152" height="34" rx="6" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="1" />
            <text x="10" y="16" fill="#047857" fontSize="9.5" fontWeight="700">{isVi ? 'Gói tái lập (1-Click):' : 'Replication bundle (1-Click):'}</text>
            <text x="10" y="28" fill="#065f46" fontSize="9.5" fontWeight="600">.do (Stata) • .R • .py script</text>
          </g>
          <g transform="translate(14, 226)">
            <rect width="152" height="24" rx="5" fill="rgba(15,23,42,0.06)" />
            <text x="8" y="16" fill="#64748b" fontSize="9">APA 7th, Chicago 8th, IEEE</text>
          </g>
        </g>

        {/* Bottom Status bar */}
        <g transform="translate(40, 420)">
          <circle cx="10" cy="10" r="5" fill="#10b981" className={styles.animPulse} />
          <text x="24" y="14" fill="#64748b" fontSize="11.5" fontWeight="500" fontFamily="inherit">
            {t.runtimeTag} • {isVi ? 'Đồng bộ thuật toán 3 môi trường sai số < 10⁻⁶' : 'Cross-runtime parity numerical delta < 10⁻⁶'}
          </text>
        </g>
      </svg>
      <div className={styles.svgFooter}>
        <span><strong>105 {isVi ? 'mô hình kinh tế lượng' : 'econometric models'}</strong> | 12 {isVi ? 'họ phân tích chuyên sâu' : 'analytical families'}</span>
        <span className={styles.badgeTag}>Python 3.12 • R 4.4 • Stata 18 MP</span>
      </div>
    </div>
  );
}
