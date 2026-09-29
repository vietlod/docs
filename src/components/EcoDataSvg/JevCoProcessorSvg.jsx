import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

export default function JevCoProcessorSvg() {
  const { i18n: { currentLocale } } = useDocusaurusContext();
  const isVi = currentLocale === 'vi';

  const t = {
    title: isVi ? 'Phân hệ Jev Co-Processor: Tối ưu suy luận & Kiểm chứng học thuật 3 tầng' : 'Jev Co-Processor: AI Inference Optimization & 3-Tier Academic Verification',
    sub: isVi ? 'Cắt giảm 84.2% token ngữ cảnh, chặn bẫy lặp và chống ảo giác thống kê tuyệt đối' : '84.2% context token cut, loop prevention, and zero statistical hallucination',
    inboundHeader: isVi ? '1. Inbound Guardrails' : '1. Inbound Guardrails',
    inboundDesc: isVi ? 'Kiểm soát đầu vào & Tiết kiệm token' : 'Input control & token savings',
    coreHeader: isVi ? '2. 1-Click Engine' : '2. 1-Click Engine',
    coreDesc: isVi ? 'Động cơ tự hành không vòng lặp' : 'Loop-free autonomous engine',
    verifyHeader: isVi ? '3. Kiểm chứng học thuật 3 tầng' : '3. 3-Tier Academic Verification',
    pillar1Title: isVi ? 'Tầng 1: Dữ liệu & Định danh' : 'Tier 1: Data & Identity',
    pillar1Desc: isVi ? 'Xác thực chuỗi gốc, short-code và nguồn trích dẫn' : 'Raw series integrity, short-code & citation audit',
    pillar2Title: isVi ? 'Tầng 2: Phương pháp luận' : 'Tier 2: Methodology',
    pillar2Desc: isVi ? 'Kiểm định Gauss-Markov: VIF, DW, White, Hausman' : 'Gauss-Markov rigor: VIF, DW, White, Hausman tests',
    pillar3Title: isVi ? 'Tầng 3: Tính nhất quán' : 'Tier 3: Consistency',
    pillar3Desc: isVi ? 'Kiểm định chéo Python / R / Stata sai số < 10⁻⁶' : 'Cross-runtime parity (Python / R / Stata) delta < 10⁻⁶',
    badgeSavings: isVi ? '-84.2% Token ngữ cảnh' : '-84.2% Context Tokens',
    badgeZero: isVi ? 'Không ảo giác thống kê' : 'Zero Hallucination',
  };

  return (
    <div className={styles.svgContainer} aria-label={t.title}>
      <svg
        className={styles.svgRoot}
        viewBox="0 0 960 490"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="jevBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.07" />
          </linearGradient>

          <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#4c1d95" stopOpacity="0.08" />
          </linearGradient>

          <linearGradient id="radarSweepGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Outer Background */}
        <rect width="960" height="490" rx="16" fill="url(#jevBg)" />

        {/* Top Header */}
        <rect x="30" y="20" width="900" height="52" rx="10" fill="rgba(15, 23, 42, 0.05)" />
        <circle cx="56" cy="46" r="12" fill="#7c3aed" fillOpacity="0.2" />
        <path d="M56 38l6 14-12-6 12-2z" fill="#7c3aed" />
        <text x="80" y="41" fill="currentColor" fontSize="15" fontWeight="700" fontFamily="inherit">
          {t.title}
        </text>
        <text x="80" y="58" fill="#64748b" fontSize="11.5" fontWeight="500" fontFamily="inherit">
          {t.sub}
        </text>

        {/* Top Floating Badges */}
        <g transform="translate(620, 32)" className={styles.animFloat}>
          <rect width="145" height="26" rx="13" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="1" />
          <text x="14" y="17" fill="#047857" fontSize="10" fontWeight="700">⚡ {t.badgeSavings}</text>
        </g>
        <g transform="translate(775, 32)" className={styles.animFloatDelay}>
          <rect width="145" height="26" rx="13" fill="#8b5cf6" fillOpacity="0.15" stroke="#8b5cf6" strokeWidth="1" />
          <text x="14" y="17" fill="#6d28d9" fontSize="10" fontWeight="700">🛡️ {t.badgeZero}</text>
        </g>

        {/* Connecting Animated Paths */}
        {/* Stage 1 -> Stage 2 */}
        <path
          d="M 235 240 L 275 240"
          stroke="#7c3aed"
          strokeWidth="2.5"
          strokeDasharray="6 4"
          className={styles.animFlow}
        />
        <circle cx="275" cy="240" r="3.5" fill="#7c3aed" />

        {/* Stage 2 -> Stage 3 (Pillars) */}
        <path
          d="M 455 240 C 475 240, 475 160, 500 160"
          stroke="#7c3aed"
          strokeWidth="2"
          strokeDasharray="6 4"
          fill="none"
          className={styles.animFlow}
        />
        <path
          d="M 455 240 L 500 240"
          stroke="#7c3aed"
          strokeWidth="2"
          strokeDasharray="6 4"
          fill="none"
          className={styles.animFlowFast}
        />
        <path
          d="M 455 240 C 475 240, 475 320, 500 320"
          stroke="#7c3aed"
          strokeWidth="2"
          strokeDasharray="6 4"
          fill="none"
          className={styles.animFlow}
        />

        {/* STAGE 1: Inbound Guardrails */}
        <g transform="translate(35, 100)">
          <rect width="200" height="280" rx="14" fill="rgba(124, 58, 237, 0.06)" stroke="#7c3aed" strokeWidth="1.5" />
          <rect x="14" y="14" width="34" height="34" rx="8" fill="#7c3aed" fillOpacity="0.18" />
          <path d="M26 23l10 5-10 5z" fill="#7c3aed" />
          <text x="16" y="70" fill="currentColor" fontSize="13" fontWeight="700">
            {t.inboundHeader}
          </text>
          <text x="16" y="88" fill="#64748b" fontSize="10.5">
            {t.inboundDesc}
          </text>

          {/* Feature 1 */}
          <g transform="translate(12, 105)">
            <rect width="176" height="46" rx="7" fill="rgba(255,255,255,0.7)" stroke="rgba(124,58,237,0.2)" />
            <text x="10" y="18" fill="#6d28d9" fontSize="10" fontWeight="700">Intent Classifier &lt; 5ms</text>
            <text x="10" y="32" fill="#64748b" fontSize="8.5">Nhận diện câu hỏi kinh tế lượng siêu tốc</text>
          </g>

          {/* Feature 2 */}
          <g transform="translate(12, 160)">
            <rect width="176" height="46" rx="7" fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.3)" />
            <text x="10" y="18" fill="#047857" fontSize="10" fontWeight="700">Dynamic Sub-schema</text>
            <text x="10" y="32" fill="#065f46" fontSize="8.5">Chỉ nạp 7–10 công cụ (giảm 84.2% token)</text>
          </g>

          {/* Feature 3 */}
          <g transform="translate(12, 215)">
            <rect width="176" height="46" rx="7" fill="rgba(255,255,255,0.7)" stroke="rgba(124,58,237,0.2)" />
            <text x="10" y="18" fill="#6d28d9" fontSize="10" fontWeight="700">Inbound Interceptor</text>
            <text x="10" y="32" fill="#64748b" fontSize="8.5">Tự sửa đảo ngược năm, chặn lặp mã</text>
          </g>
        </g>

        {/* STAGE 2: 1-Click Autonomous Engine */}
        <g transform="translate(275, 100)">
          <rect width="180" height="280" rx="14" fill="rgba(3, 105, 161, 0.06)" stroke="#0284c7" strokeWidth="1.5" />
          <rect x="14" y="14" width="34" height="34" rx="8" fill="#0284c7" fillOpacity="0.18" />
          <path d="M25 24h12v12H25z" fill="#0284c7" />
          <text x="16" y="70" fill="currentColor" fontSize="13" fontWeight="700">
            {t.coreHeader}
          </text>
          <text x="16" y="88" fill="#64748b" fontSize="10.5">
            {t.coreDesc}
          </text>

          {/* Phase 1 */}
          <g transform="translate(12, 105)">
            <rect width="156" height="36" rx="6" fill="rgba(255,255,255,0.7)" stroke="rgba(2,132,199,0.2)" />
            <text x="10" y="16" fill="#0369a1" fontSize="9.5" fontWeight="700">1. Data Harmonization</text>
            <text x="10" y="28" fill="#64748b" fontSize="8">Ghép panel / cân bằng chuỗi</text>
          </g>

          {/* Phase 2 */}
          <g transform="translate(12, 150)">
            <rect width="156" height="36" rx="6" fill="rgba(255,255,255,0.7)" stroke="rgba(2,132,199,0.2)" />
            <text x="10" y="16" fill="#0369a1" fontSize="9.5" fontWeight="700">2. Model Estimation</text>
            <text x="10" y="28" fill="#64748b" fontSize="8">Chạy hồi quy tự động</text>
          </g>

          {/* Phase 3 */}
          <g transform="translate(12, 195)">
            <rect width="156" height="36" rx="6" fill="rgba(255,255,255,0.7)" stroke="rgba(2,132,199,0.2)" />
            <text x="10" y="16" fill="#0369a1" fontSize="9.5" fontWeight="700">3. Outbound Synthesis</text>
            <text x="10" y="28" fill="#64748b" fontSize="8">Tổng hợp bảng &amp; kết luận</text>
          </g>

          {/* Badge */}
          <g transform="translate(12, 240)">
            <rect width="156" height="24" rx="5" fill="rgba(2,132,199,0.15)" />
            <text x="12" y="16" fill="#0284c7" fontSize="9" fontWeight="700">⚡ 1 Lần gõ câu lệnh duy nhất</text>
          </g>
        </g>

        {/* STAGE 3: 3-Pillar Academic Verification */}
        <g transform="translate(495, 95)">
          <rect width="430" height="290" rx="16" fill="url(#shieldGrad)" stroke="#7c3aed" strokeWidth="1.8" />

          {/* Header */}
          <g transform="translate(16, 16)">
            <rect width="398" height="32" rx="8" fill="rgba(124,58,237,0.2)" stroke="#7c3aed" strokeWidth="1" />
            <circle cx="16" cy="16" r="6" fill="#7c3aed" className={styles.animPulse} />
            <text x="32" y="21" fill="#5b21b6" fontSize="12.5" fontWeight="700">
              🛡️ {t.verifyHeader} (Unified Outbound Verifier)
            </text>
          </g>

          {/* PILLAR 1: Verifiability */}
          <g transform="translate(16, 58)">
            <rect width="398" height="64" rx="8" fill="rgba(255,255,255,0.75)" stroke="rgba(124,58,237,0.25)" />
            <circle cx="22" cy="22" r="10" fill="#0284c7" fillOpacity="0.2" />
            <text x="17" y="26" fill="#0284c7" fontSize="12" fontWeight="700">1</text>
            <text x="40" y="20" fill="currentColor" fontSize="11.5" fontWeight="700">
              {t.pillar1Title}
            </text>
            <text x="40" y="36" fill="#64748b" fontSize="9.5">
              {t.pillar1Desc}
            </text>
            <g transform="translate(40, 42)">
              <rect width="160" height="15" rx="3" fill="rgba(2,132,199,0.15)" />
              <text x="6" y="11" fill="#0284c7" fontSize="8" fontWeight="600">✓ Truy xuất nguồn gốc 100%</text>
            </g>
          </g>

          {/* PILLAR 2: Methodology */}
          <g transform="translate(16, 130)">
            <rect width="398" height="64" rx="8" fill="rgba(255,255,255,0.75)" stroke="rgba(124,58,237,0.25)" />
            <circle cx="22" cy="22" r="10" fill="#10b981" fillOpacity="0.2" />
            <text x="17" y="26" fill="#059669" fontSize="12" fontWeight="700">2</text>
            <text x="40" y="20" fill="currentColor" fontSize="11.5" fontWeight="700">
              {t.pillar2Title}
            </text>
            <text x="40" y="36" fill="#64748b" fontSize="9.5">
              {t.pillar2Desc}
            </text>
            <g transform="translate(40, 42)">
              <rect width="180" height="15" rx="3" fill="rgba(16,185,129,0.15)" />
              <text x="6" y="11" fill="#059669" fontSize="8" fontWeight="600">✓ Báo động vi phạm giả định OLS</text>
            </g>
          </g>

          {/* PILLAR 3: Cross-Runtime Consistency */}
          <g transform="translate(16, 202)">
            <rect width="398" height="68" rx="8" fill="rgba(255,255,255,0.75)" stroke="rgba(124,58,237,0.25)" />
            <circle cx="22" cy="22" r="10" fill="#8b5cf6" fillOpacity="0.2" />
            <text x="17" y="26" fill="#7c3aed" fontSize="12" fontWeight="700">3</text>
            <text x="40" y="20" fill="currentColor" fontSize="11.5" fontWeight="700">
              {t.pillar3Title}
            </text>
            <text x="40" y="36" fill="#64748b" fontSize="9.5">
              {t.pillar3Desc}
            </text>
            <g transform="translate(40, 44)">
              <rect width="210" height="15" rx="3" fill="rgba(124,58,237,0.15)" />
              <text x="6" y="11" fill="#7c3aed" fontSize="8" fontWeight="600">✓ Hệ số hồi quy đồng nhất giữa 3 runtime</text>
            </g>
          </g>
        </g>

        {/* Footer info in SVG */}
        <g transform="translate(40, 455)">
          <circle cx="10" cy="10" r="5" fill="#10b981" className={styles.animPulse} />
          <text x="24" y="14" fill="#64748b" fontSize="11.5" fontWeight="500">
            {isVi ? 'Phân phối biểu đồ Native MCP Multimodal & Gói tái lập học thuật chuẩn quốc tế' : 'Native MCP Multimodal chart distribution & international-standard replication packages'}
          </text>
        </g>
      </svg>
      <div className={styles.svgFooter}>
        <span><strong>{isVi ? 'Kiểm chứng 3 tầng' : '3-Tier Verification'}</strong>: Verifiability • Methodology • Consistency</span>
        <span className={styles.badgeTag}>Dynamic Sub-schema • Sub-5ms Routing</span>
      </div>
    </div>
  );
}
