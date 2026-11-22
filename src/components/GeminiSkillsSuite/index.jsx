import React, { useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const SKILLS = [
  {
    id: 'skill-1',
    file: 'gemini-ecodata-mcp-skill.md',
    viName: 'Skill 1 — Điều phối dữ liệu & 328 mô hình',
    enName: 'Skill 1 — Macro-Financial Data & 328 Models',
    viDesc:
      'Điều phối 58 công cụ MCP hợp nhất, dữ liệu quốc tế, chuỗi 34/63 tỉnh 1995–2026, BCTC 30 năm, ghép bảng Zero-Copy và ước lượng 328 mô hình kinh tế lượng trên Python, R và StataNow 19.5 MP.',
    enDesc:
      'Orchestrates all 58 Unified MCP tools across global series, Vietnam 34/63-province panels, 30-year financial statements, Zero-Copy panels, and 328 econometric models on Python, R, and StataNow 19.5 MP.',
    tags: ['all'],
  },
  {
    id: 'skill-2',
    file: 'behavioral-research-ecodata-skill.md',
    viName: 'Skill 2 — Khảo sát hành vi Likert & SEM',
    enName: 'Skill 2 — Behavioral Surveys & SEM',
    viDesc:
      'Thiết kế nghiên cứu hành vi, tâm lý học, quản trị & marketing: khóa nguyên bảng hỏi, mô phỏng Likert, kiểm định EFA, CFA, CB-SEM, PLS-SEM, HTMT, CMB và sơ đồ 300-DPI.',
    enDesc:
      'Behavioral, psychology, management, and marketing studio: strict questionnaire locking, Likert simulation, EFA, CFA, CB-SEM, PLS-SEM, HTMT, CMB, and 300-DPI diagrams.',
    tags: ['all'],
  },
  {
    id: 'skill-3',
    file: 'gemini-ecolab-ecodata-mcp-skill.md',
    viName: 'Skill 3 — Bản thảo Q1–Q3 & trích dẫn xác thực DOI',
    enName: 'Skill 3 — Q1–Q3 Manuscripts & Verified DOI Citations',
    viDesc:
      'Chuẩn hóa bản thảo học thuật trên 6.000 từ, một khối tóm tắt cốt lõi duy nhất, siêu liên kết trích dẫn một chiều xác thực DOI, tiền kiểm 9 cổng G1–G9 và gói xuất bản .docx + .pdf.',
    enDesc:
      'Governs standalone scholarly manuscripts above 6,000 words, single core abstract formatting, DOI-verified one-way citation hyperlinks, 9-gate G1–G9 QA, and .docx + .pdf exports.',
    tags: ['all'],
  },
  {
    id: 'skill-4',
    file: 'vhlss-micro-ecodata-skill.md',
    viName: 'Skill 4 — Vi mô VHLSS 2004–2024 & quyền số mẫu',
    enName: 'Skill 4 — VHLSS 2004–2024 Microdata & Survey Weights',
    viDesc:
      'Chuyên sâu dữ liệu vi mô VHLSS 2004–2024 cấp cá nhân, hộ và xã: hài hòa hóa bảng hỏi đa kỳ, quyền số pweight wt45/wt9, phân cụm PSU, hệ số Kish UWE, kiểm định DuMouchel–Duncan và 5 toán tử khai báo.',
    enDesc:
      'Dedicated to VHLSS 2004–2024 individual, household, and commune microdata: cross-wave questionnaire harmonization, pweight wt45/wt9 rules, PSU clustering, Kish UWE, DuMouchel–Duncan test, and 5 declarative primitives.',
    tags: ['all', 'vhlss'],
  },
  {
    id: 'skill-5',
    file: 'reproducibility-research-ecodata-skill.md',
    viName: 'Skill 5 — Nghiên cứu tái lập Q1–Q2 & bình duyệt độc lập',
    enName: 'Skill 5 — Q1–Q2 Reproducibility Studies & Peer Review',
    viDesc:
      'Kiểm toán gói lưu trữ Harvard Dataverse và DOI quốc tế, giải quyết dữ liệu 3 tầng, đối chiếu ba runtime R, StataNow 19.5 MP, Python với khóa dung sai định lượng không quá 1.0% và Phụ lục A bình duyệt.',
    enDesc:
      'Audits Harvard Dataverse and DOI replication archives, resolves 3-tier empirical data, verifies R, StataNow 19.5 MP, and Python parity within 1.0% tolerance, and authors Appendix A peer-review critiques.',
    tags: ['all'],
  },
];

function SkillCard({ item, isVi }) {
  const [copied, setCopied] = useState(false);
  const localHref = useBaseUrl(`/downloads/${item.file}`);
  const canonicalUrl = `https://ecodata.io.vn/downloads/${item.file}`;

  const handleCopy = async () => {
    try {
      const res = await fetch(localHref);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(canonicalUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2400);
      }
    }
  };

  return (
    <div className={styles.card}>
      <div>
        <div className={styles.cardHeader}>
          <strong className={styles.cardTitle}>{isVi ? item.viName : item.enName}</strong>
          <code className={styles.badge}>{item.file}</code>
        </div>
        <p className={styles.desc}>{isVi ? item.viDesc : item.enDesc}</p>
      </div>
      <div className={styles.actions}>
        <button
          type="button"
          onClick={handleCopy}
          className={`${styles.copyBtn} ${copied ? styles.copyBtnActive : ''}`}
        >
          {copied ? (isVi ? 'Đã chép' : 'Copied') : isVi ? 'Sao chép' : 'Copy'}
        </button>
        <a href={localHref} download={item.file} className={styles.downloadBtn}>
          {isVi ? 'Tải về' : 'Download'}
        </a>
      </div>
    </div>
  );
}

export default function GeminiSkillsSuite({ locale = 'vi', filter = 'all' }) {
  const isVi = locale !== 'en';
  const items = filter === 'vhlss' ? SKILLS.filter((s) => s.tags.includes('vhlss')) : SKILLS;

  return (
    <div className={filter === 'vhlss' ? styles.singleGrid : styles.grid}>
      {items.map((item) => (
        <SkillCard key={item.id} item={item} isVi={isVi} />
      ))}
    </div>
  );
}
