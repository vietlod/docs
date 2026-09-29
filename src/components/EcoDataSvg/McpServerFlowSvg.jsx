import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

export default function McpServerFlowSvg() {
  const { i18n: { currentLocale } } = useDocusaurusContext();
  const isVi = currentLocale === 'vi';

  const t = {
    title: isVi ? 'Kiến trúc EcoData MCP Server với 37 công cụ AI chuyên biệt' : 'EcoData MCP Server Architecture with 37 Specialized AI Tools',
    sub: isVi ? 'Kết nối Gemini Spark, Claude Desktop, Cursor và AntiGravity vào kho dữ liệu kinh tế' : 'Connecting Gemini Spark, Claude Desktop, Cursor, and AntiGravity to economic data',
    clientsHeader: isVi ? 'Khách hàng AI (AI Clients)' : 'AI Clients & IDEs',
    busHeader: isVi ? 'Giao thức kết nối MCP (Model Context Protocol)' : 'MCP Protocol Bus',
    toolsHeader: isVi ? '37 công cụ kinh tế lượng chuyên biệt' : '37 Specialized Economic Tools',
    coreHeader: isVi ? 'Kho dữ liệu và lõi tính toán EcoData' : 'EcoData Data Warehouse & Analytical Engine',
    tool1: 'search_indicators_unified',
    tool2: 'query_macro_data_unified',
    tool3: 'inspect_series_metadata',
    tool4: 'run_econometrics_regression',
    tool5: 'export_replication_bundle',
    tokenBadge: isVi ? 'Cắt giảm 84.2% token ngữ cảnh' : '-84.2% context token usage',
    authBadge: isVi ? 'Xác thực an toàn OAuth 2.1 & Direct Token' : 'OAuth 2.1 & Direct Token Auth',
  };

  return (
    <div className={styles.svgContainer} aria-label={t.title}>
      <svg
        className={styles.svgRoot}
        viewBox="0 0 960 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="mcpBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.08" />
          </linearGradient>

          <linearGradient id="clientGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.05" />
          </linearGradient>

          <linearGradient id="mcpGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.06" />
          </linearGradient>

          <linearGradient id="coreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#059669" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#047857" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Outer Background */}
        <rect width="960" height="500" rx="16" fill="url(#mcpBg)" />

        {/* Top Header */}
        <rect x="30" y="20" width="900" height="52" rx="10" fill="rgba(15, 23, 42, 0.05)" />
        <circle cx="56" cy="46" r="12" fill="#8b5cf6" fillOpacity="0.2" />
        <path d="M51 46h10M56 41v10" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" />
        <text x="80" y="41" fill="currentColor" fontSize="15" fontWeight="700" fontFamily="inherit">
          {t.title}
        </text>
        <text x="80" y="58" fill="#64748b" fontSize="11.5" fontWeight="500" fontFamily="inherit">
          {t.sub}
        </text>
        <g transform="translate(735, 32)">
          <rect width="180" height="26" rx="13" fill="#8b5cf6" fillOpacity="0.15" stroke="#8b5cf6" strokeWidth="1" />
          <circle cx="14" cy="13" r="4" fill="#8b5cf6" className={styles.animPulse} />
          <text x="24" y="17" fill="#7c3aed" fontSize="10.5" fontWeight="600" fontFamily="inherit">
            {t.tokenBadge}
          </text>
        </g>

        {/* Animated Protocol Lines */}
        {/* Client to MCP Bus */}
        <path
          d="M 235 150 C 275 150, 275 250, 315 250"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeDasharray="6 4"
          fill="none"
          className={styles.animFlow}
        />
        <path
          d="M 235 220 L 315 250"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeDasharray="6 4"
          fill="none"
          className={styles.animFlowFast}
        />
        <path
          d="M 235 290 L 315 270"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeDasharray="6 4"
          fill="none"
          className={styles.animFlow}
        />
        <path
          d="M 235 360 C 275 360, 275 270, 315 270"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeDasharray="6 4"
          fill="none"
          className={styles.animFlowFast}
        />

        {/* MCP Bus to EcoData Core */}
        <path
          d="M 645 250 C 685 250, 685 160, 725 160"
          stroke="#10b981"
          strokeWidth="2.5"
          strokeDasharray="6 4"
          fill="none"
          className={styles.animFlowFast}
        />
        <path
          d="M 645 260 L 725 260"
          stroke="#10b981"
          strokeWidth="2.5"
          strokeDasharray="6 4"
          fill="none"
          className={styles.animFlow}
        />
        <path
          d="M 645 270 C 685 270, 685 360, 725 360"
          stroke="#10b981"
          strokeWidth="2.5"
          strokeDasharray="6 4"
          fill="none"
          className={styles.animFlowFast}
        />

        {/* Reverse Data Delivery Line (Returning Results) */}
        <path
          d="M 725 280 L 315 280"
          stroke="#8b5cf6"
          strokeWidth="2"
          strokeDasharray="8 6"
          fill="none"
          className={styles.animFlowRev}
        />

        {/* LEFT COLUMN: AI Clients */}
        <g transform="translate(35, 95)">
          <rect width="200" height="340" rx="14" fill="url(#clientGrad)" stroke="#3b82f6" strokeWidth="1.5" />
          <text x="16" y="28" fill="currentColor" fontSize="13" fontWeight="700">
            {t.clientsHeader}
          </text>

          {/* Client 1: Gemini Spark */}
          <g transform="translate(12, 42)">
            <rect width="176" height="58" rx="8" fill="rgba(255,255,255,0.7)" stroke="rgba(59,130,246,0.25)" />
            <circle cx="20" cy="22" r="10" fill="#3b82f6" fillOpacity="0.2" />
            <text x="15" y="26" fill="#1d4ed8" fontSize="11" fontWeight="700">G</text>
            <text x="38" y="22" fill="currentColor" fontSize="11.5" fontWeight="700">Google Gemini Spark</text>
            <text x="38" y="38" fill="#64748b" fontSize="9.5">Direct tokenized app / OAuth</text>
            <rect x="38" y="42" width="70" height="11" rx="3" fill="rgba(59,130,246,0.15)" />
            <text x="42" y="50" fill="#1d4ed8" fontSize="7.5" fontWeight="600">@EcoData mention</text>
          </g>

          {/* Client 2: Claude Desktop */}
          <g transform="translate(12, 112)">
            <rect width="176" height="58" rx="8" fill="rgba(255,255,255,0.7)" stroke="rgba(59,130,246,0.25)" />
            <circle cx="20" cy="22" r="10" fill="#ea580c" fillOpacity="0.2" />
            <text x="15" y="26" fill="#c2410c" fontSize="11" fontWeight="700">C</text>
            <text x="38" y="22" fill="currentColor" fontSize="11.5" fontWeight="700">Claude Desktop</text>
            <text x="38" y="38" fill="#64748b" fontSize="9.5">STDIO / SSE 1-click config</text>
            <rect x="38" y="42" width="76" height="11" rx="3" fill="rgba(234,88,12,0.15)" />
            <text x="42" y="50" fill="#c2410c" fontSize="7.5" fontWeight="600">claude_desktop.json</text>
          </g>

          {/* Client 3: Cursor & Windsurf */}
          <g transform="translate(12, 182)">
            <rect width="176" height="58" rx="8" fill="rgba(255,255,255,0.7)" stroke="rgba(59,130,246,0.25)" />
            <circle cx="20" cy="22" r="10" fill="#0284c7" fillOpacity="0.2" />
            <text x="16" y="26" fill="#0369a1" fontSize="11" fontWeight="700">&gt;</text>
            <text x="38" y="22" fill="currentColor" fontSize="11.5" fontWeight="700">Cursor &amp; Windsurf</text>
            <text x="38" y="38" fill="#64748b" fontSize="9.5">In-editor copilot &amp; terminal</text>
            <rect x="38" y="42" width="60" height="11" rx="3" fill="rgba(2,132,199,0.15)" />
            <text x="42" y="50" fill="#0369a1" fontSize="7.5" fontWeight="600">.cursor/mcp.json</text>
          </g>

          {/* Client 4: AntiGravity & Gemini CLI */}
          <g transform="translate(12, 252)">
            <rect width="176" height="58" rx="8" fill="rgba(255,255,255,0.7)" stroke="rgba(59,130,246,0.25)" />
            <circle cx="20" cy="22" r="10" fill="#9333ea" fillOpacity="0.2" />
            <text x="15" y="26" fill="#7e22ce" fontSize="11" fontWeight="700">AG</text>
            <text x="38" y="22" fill="currentColor" fontSize="11.5" fontWeight="700">AntiGravity &amp; CLI</text>
            <text x="38" y="38" fill="#64748b" fontSize="9.5">Agentic automated reasoning</text>
            <rect x="38" y="42" width="65" height="11" rx="3" fill="rgba(147,51,234,0.15)" />
            <text x="42" y="50" fill="#7e22ce" fontSize="7.5" fontWeight="600">Native subagent</text>
          </g>
        </g>

        {/* CENTER COLUMN: MCP Protocol Bus & 37 Tools */}
        <g transform="translate(315, 85)">
          <rect width="330" height="360" rx="16" fill="url(#mcpGrad)" stroke="#8b5cf6" strokeWidth="1.8" />

          {/* Header */}
          <g transform="translate(16, 16)">
            <rect width="298" height="34" rx="8" fill="rgba(139,92,246,0.2)" stroke="#8b5cf6" strokeWidth="1" />
            <circle cx="18" cy="17" r="6" fill="#8b5cf6" className={styles.animPulse} />
            <text x="34" y="22" fill="#6d28d9" fontSize="12" fontWeight="700">
              {t.busHeader}
            </text>
          </g>

          {/* Sub-schema exposure badge */}
          <g transform="translate(16, 60)">
            <rect width="298" height="26" rx="6" fill="rgba(139,92,246,0.1)" stroke="rgba(139,92,246,0.3)" strokeDasharray="3 3" />
            <text x="10" y="17" fill="#7c3aed" fontSize="10" fontWeight="600">
              ⚡ Jev Co-Processor: Tự động lọc 7–10 công cụ theo ý định (&lt; 5ms)
            </text>
          </g>

          {/* 37 Tools List showcase */}
          <text x="18" y="110" fill="currentColor" fontSize="11.5" fontWeight="700">
            {t.toolsHeader}
          </text>

          {/* Tool Card 1 */}
          <g transform="translate(16, 120)">
            <rect width="298" height="36" rx="7" fill="rgba(255,255,255,0.75)" stroke="rgba(139,92,246,0.25)" />
            <circle cx="16" cy="18" r="4" fill="#0284c7" />
            <text x="28" y="18" fill="#0f172a" fontSize="10.5" fontWeight="700" fontFamily="monospace">{t.tool1}</text>
            <text x="28" y="30" fill="#64748b" fontSize="8.5">Tìm kiếm ngữ nghĩa 200k+ chỉ số vĩ mô &amp; tỉnh thành</text>
          </g>

          {/* Tool Card 2 */}
          <g transform="translate(16, 164)">
            <rect width="298" height="36" rx="7" fill="rgba(255,255,255,0.75)" stroke="rgba(139,92,246,0.25)" />
            <circle cx="16" cy="18" r="4" fill="#0284c7" />
            <text x="28" y="18" fill="#0f172a" fontSize="10.5" fontWeight="700" fontFamily="monospace">{t.tool2}</text>
            <text x="28" y="30" fill="#64748b" fontSize="8.5">Truy xuất 1 bước dữ liệu đa chiều kèm metadata chuẩn</text>
          </g>

          {/* Tool Card 3 */}
          <g transform="translate(16, 208)">
            <rect width="298" height="36" rx="7" fill="rgba(255,255,255,0.75)" stroke="rgba(139,92,246,0.25)" />
            <circle cx="16" cy="18" r="4" fill="#10b981" />
            <text x="28" y="18" fill="#0f172a" fontSize="10.5" fontWeight="700" fontFamily="monospace">{t.tool3}</text>
            <text x="28" y="30" fill="#64748b" fontSize="8.5">Kiểm tra đơn vị đo, tần suất, nguồn gốc &amp; phương pháp tính</text>
          </g>

          {/* Tool Card 4 */}
          <g transform="translate(16, 252)">
            <rect width="298" height="36" rx="7" fill="rgba(255,255,255,0.75)" stroke="rgba(139,92,246,0.25)" />
            <circle cx="16" cy="18" r="4" fill="#f59e0b" />
            <text x="28" y="18" fill="#0f172a" fontSize="10.5" fontWeight="700" fontFamily="monospace">{t.tool4}</text>
            <text x="28" y="30" fill="#64748b" fontSize="8.5">Ước lượng OLS / Panel / GMM trực tiếp từ câu hỏi tự nhiên</text>
          </g>

          {/* Tool Card 5 */}
          <g transform="translate(16, 296)">
            <rect width="298" height="36" rx="7" fill="rgba(255,255,255,0.75)" stroke="rgba(139,92,246,0.25)" />
            <circle cx="16" cy="18" r="4" fill="#8b5cf6" />
            <text x="28" y="18" fill="#0f172a" fontSize="10.5" fontWeight="700" fontFamily="monospace">{t.tool5}</text>
            <text x="28" y="30" fill="#64748b" fontSize="8.5">Đóng gói mã Stata/R/Python + dữ liệu tái lập nghiên cứu</text>
          </g>

          <text x="18" y="348" fill="#7c3aed" fontSize="9.5" fontWeight="600">
            + 32 công cụ khác (BCTC, Thuyết minh, Customs, VHLSS micro...)
          </text>
        </g>

        {/* RIGHT COLUMN: EcoData Data Warehouse */}
        <g transform="translate(725, 95)">
          <rect width="200" height="340" rx="14" fill="url(#coreGrad)" stroke="#10b981" strokeWidth="1.5" />
          <text x="16" y="28" fill="currentColor" fontSize="13" fontWeight="700">
            {t.coreHeader}
          </text>

          {/* Section 1 */}
          <g transform="translate(12, 42)">
            <rect width="176" height="58" rx="8" fill="rgba(255,255,255,0.7)" stroke="rgba(16,185,129,0.25)" />
            <text x="12" y="20" fill="#047857" fontSize="11" fontWeight="700">Vĩ mô quốc tế</text>
            <text x="12" y="35" fill="#64748b" fontSize="9.5">World Bank, IMF, OECD, ILO, UN</text>
            <text x="12" y="49" fill="#059669" fontSize="9" fontWeight="600">200+ quốc gia &amp; vùng lãnh thổ</text>
          </g>

          {/* Section 2 */}
          <g transform="translate(12, 112)">
            <rect width="176" height="58" rx="8" fill="rgba(255,255,255,0.7)" stroke="rgba(16,185,129,0.25)" />
            <text x="12" y="20" fill="#047857" fontSize="11" fontWeight="700">Thống kê Việt Nam</text>
            <text x="12" y="35" fill="#64748b" fontSize="9.5">Tổng cục Thống kê (GSO VN)</text>
            <text x="12" y="49" fill="#059669" fontSize="9" fontWeight="600">Niên giám, KTXH, 63 tỉnh thành</text>
          </g>

          {/* Section 3 */}
          <g transform="translate(12, 182)">
            <rect width="176" height="58" rx="8" fill="rgba(255,255,255,0.7)" stroke="rgba(16,185,129,0.25)" />
            <text x="12" y="20" fill="#047857" fontSize="11" fontWeight="700">Hải quan &amp; Khảo sát</text>
            <text x="12" y="35" fill="#64748b" fontSize="9.5">Xuất nhập khẩu chi tiết, PAPI, PCI</text>
            <text x="12" y="49" fill="#059669" fontSize="9" fontWeight="600">Dữ liệu vi mô VHLSS / VARHS</text>
          </g>

          {/* Section 4 */}
          <g transform="translate(12, 252)">
            <rect width="176" height="58" rx="8" fill="rgba(255,255,255,0.7)" stroke="rgba(16,185,129,0.25)" />
            <text x="12" y="20" fill="#047857" fontSize="11" fontWeight="700">Tài chính Doanh nghiệp</text>
            <text x="12" y="35" fill="#64748b" fontSize="9.5">BCTC 30 năm, 1.600+ mã niêm yết</text>
            <text x="12" y="49" fill="#059669" fontSize="9" fontWeight="600">Thuyết minh &amp; Sự kiện doanh nghiệp</text>
          </g>
        </g>

        {/* Footer info in SVG */}
        <g transform="translate(40, 465)">
          <circle cx="10" cy="10" r="5" fill="#8b5cf6" className={styles.animPulse} />
          <text x="24" y="14" fill="#64748b" fontSize="11.5" fontWeight="500">
            {t.authBadge} • Giao thức Model Context Protocol chuẩn hóa mở
          </text>
        </g>
      </svg>
      <div className={styles.svgFooter}>
        <span><strong>37 {isVi ? 'công cụ MCP chuyên sâu' : 'specialized MCP tools'}</strong> | JSON-RPC 2.0 / SSE / STDIO</span>
        <span className={styles.badgeTag}>Gemini Spark • Claude • Cursor • AntiGravity</span>
      </div>
    </div>
  );
}
