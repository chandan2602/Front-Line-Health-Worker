import React, { useState } from 'react';
import { getData } from '../utils/storage';

function BackIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>;
}

const PATIENTS = [
  { id: 'p1', name: 'Sunita Devi', age: 28, gender: 'Female', abhaId: '91-1234-5678-9012', village: 'Ward-7', phone: '9876543210' },
  { id: 'p2', name: 'Kavita Singh', age: 24, gender: 'Female', abhaId: '91-2345-6789-0123', village: 'Ward-5', phone: '9876543211' },
  { id: 'p3', name: 'Mohan Lal', age: 52, gender: 'Male', abhaId: '91-3456-7890-1234', village: 'Ward-3', phone: '9876543212' },
  { id: 'p4', name: 'Meena Bai', age: 35, gender: 'Female', abhaId: '91-4567-8901-2345', village: 'Ward-7', phone: '9876543213' },
];

const RECORD_SECTIONS = [
  { key: 'anc', label: 'ANC Visits', icon: '🤰', color: '#EFF6FF', border: '#BFDBFE', records: [
    { date: '2024-03-10', summary: 'ANC Visit 2 — BP: 118/76, Hb: 11.2 g/dL, Weight: 58 kg, IFA given, TT given' },
    { date: '2024-01-15', summary: 'ANC Visit 1 — BP: 116/74, Hb: 10.8 g/dL, Weight: 55 kg, IFA given' },
  ]},
  { key: 'delivery', label: 'Delivery', icon: '🏥', color: '#F0FDF4', border: '#BBF7D0', records: [
    { date: '2024-06-02', summary: 'Institutional delivery at PHC Bhopal. Live birth, male, 3.1 kg. No complications.' },
  ]},
  { key: 'hbpnc', label: 'HBPNC Visits', icon: '🏠', color: '#FDF4FF', border: '#E9D5FF', records: [
    { date: '2024-06-05', summary: 'Day 3 PNC — Mother BP normal, breastfeeding established, baby weight 3.0 kg' },
    { date: '2024-06-09', summary: 'Day 7 PNC — Baby weight 3.2 kg, cord healed, exclusive breastfeeding' },
  ]},
  { key: 'vaccination', label: 'Vaccinations', icon: '💉', color: '#FFF7ED', border: '#FED7AA', records: [
    { date: '2024-06-02', summary: 'BCG, OPV-0, Hep-B given at birth' },
    { date: '2024-07-02', summary: 'OPV-1, Penta-1, RVV-1, PCV-1 given at 4 weeks' },
  ]},
  { key: 'hbnc', label: 'HBNC Visits', icon: '🍼', color: '#F0FDFA', border: '#99F6E4', records: [
    { date: '2024-06-04', summary: 'Day 1 HBNC — Baby temp 36.8°C, weight 3.0 kg, breastfeeding good' },
    { date: '2024-06-06', summary: 'Day 3 HBNC — Baby active, no danger signs, weight 3.05 kg' },
  ]},
  { key: 'hbyc', label: 'HBYC Visits', icon: '🌱', color: '#FFFBEB', border: '#FDE68A', records: [
    { date: '2024-09-02', summary: '3 months — Weight 5.8 kg, Height 60 cm, Milestones: holds head, smiles. Vitamin A given.' },
  ]},
  { key: 'cbac', label: 'CBAC Screening', icon: '📋', color: '#FFF1F2', border: '#FECDD3', records: [
    { date: '2024-02-20', summary: 'CBAC Score: 4 (Low Risk). No NCD risk factors identified.' },
  ]},
  { key: 'hypertension', label: 'Hypertension', icon: '💓', color: '#FFF1F2', border: '#FECDD3', records: [
    { date: '2024-04-10', summary: 'BP: 138/88 mmHg — Pre-hypertension. Lifestyle counseling done. Follow-up in 1 month.' },
  ]},
  { key: 'diabetes', label: 'Diabetes', icon: '🩸', color: '#FFF7ED', border: '#FED7AA', records: [
    { date: '2024-04-10', summary: 'FBS: 98 mg/dL — Normal. No diabetes detected.' },
  ]},
  { key: 'tb', label: 'TB Screening', icon: '🫁', color: '#F0FDFA', border: '#99F6E4', records: [
    { date: '2024-01-05', summary: 'TB Screening — No symptoms. Sputum test negative. No treatment required.' },
  ]},
  { key: 'mentalhealth', label: 'Mental Health', icon: '🧠', color: '#EFF6FF', border: '#BFDBFE', records: [
    { date: '2024-03-15', summary: 'PHQ-9 Score: 3 (Minimal). GAD-7 Score: 2. No significant distress.' },
  ]},
  { key: 'emergency', label: 'Emergency Reports', icon: '🚨', color: '#FFF1F2', border: '#FECDD3', records: [] },
];

// ── Mini bar chart (pure CSS/SVG, no library) ──────────────────────────────
function BarChart({ data, color = 'var(--primary)' }) {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 60 }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <span style={{ fontSize: 9, color: 'var(--text-secondary)', fontWeight: 600 }}>{d.value}</span>
          <div style={{
            width: '100%', borderRadius: '4px 4px 0 0',
            background: color, opacity: 0.85,
            height: `${Math.max((d.value / max) * 44, d.value > 0 ? 6 : 0)}px`,
            transition: 'height 0.4s ease'
          }} />
          <span style={{ fontSize: 9, color: 'var(--text-secondary)', textAlign: 'center', lineHeight: 1.2 }}>{d.label}</span>
        </div>
      ))}
    </div>
  );
}

// ── Donut / ring chart ──────────────────────────────────────────────────────
function DonutChart({ segments, size = 80 }) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const r = 28, cx = 40, cy = 40, stroke = 10;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg width={size} height={size} viewBox="0 0 80 80">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#E5E7EB" strokeWidth={stroke} />
      {segments.map((seg, i) => {
        const dash = (seg.value / total) * circ;
        const el = (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none"
            stroke={seg.color} strokeWidth={stroke}
            strokeDasharray={`${dash} ${circ - dash}`}
            strokeDashoffset={-offset}
            strokeLinecap="round"
            style={{ transform: 'rotate(-90deg)', transformOrigin: '40px 40px' }}
          />
        );
        offset += dash;
        return el;
      })}
    </svg>
  );
}

// ── Horizontal progress bar ─────────────────────────────────────────────────
function ProgressBar({ value, max, color, label, sublabel }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{label}</span>
        <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{sublabel}</span>
      </div>
      <div style={{ height: 8, background: '#E5E7EB', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 4, transition: 'width 0.5s ease' }} />
      </div>
    </div>
  );
}

// ── Trend line (SVG sparkline) ──────────────────────────────────────────────
function Sparkline({ points, color = 'var(--primary)', height = 40, width = 120 }) {
  if (!points.length) return null;
  const max = Math.max(...points), min = Math.min(...points);
  const range = max - min || 1;
  const pad = 4;
  const xs = points.map((_, i) => pad + (i / (points.length - 1)) * (width - pad * 2));
  const ys = points.map(v => pad + ((max - v) / range) * (height - pad * 2));
  const d = xs.map((x, i) => `${i === 0 ? 'M' : 'L'}${x},${ys[i]}`).join(' ');
  const area = `${d} L${xs[xs.length - 1]},${height} L${xs[0]},${height} Z`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path d={area} fill={color} fillOpacity="0.12" />
      <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {xs.map((x, i) => <circle key={i} cx={x} cy={ys[i]} r="2.5" fill={color} />)}
    </svg>
  );
}

// ── LHRM phase definitions — single source of truth ─────────────────────────
const LHRM_PHASES = [
  { key: 'birth',      label: 'Birth & Newborn',  icon: '👶', color: '#0891B2', ageStart: 0,  ageEnd: 1,  program: 'HBNC / HBPNC',    events: 5, status: 'normal' },
  { key: 'infant',     label: 'Infant & Child',   icon: '🍼', color: '#16A34A', ageStart: 1,  ageEnd: 5,  program: 'HBYC / Immunization', events: 4, status: 'normal' },
  { key: 'school',     label: 'School Age',       icon: '🧒', color: '#F59E0B', ageStart: 6,  ageEnd: 14, program: 'RBSK / School Health', events: 3, status: 'watch'  },
  { key: 'adolescent', label: 'Adolescent',       icon: '🧑', color: '#7C3AED', ageStart: 15, ageEnd: 19, program: 'RKSK / WIFS',       events: 3, status: 'normal' },
  { key: 'rch',        label: 'Maternal / RCH',   icon: '🤰', color: '#DC2626', ageStart: 20, ageEnd: 45, program: 'RCH / ANC / FP',    events: 5, status: 'watch'  },
  { key: 'ncd',        label: 'NCD / Chronic',    icon: '💊', color: '#B45309', ageStart: 30, ageEnd: 60, program: 'NCD / HTN / DM',    events: 3, status: 'alert'  },
  { key: 'geriatric',  label: 'Geriatric',        icon: '👴', color: '#6B7280', ageStart: 60, ageEnd: 80, program: 'Geriatric / Palliative', events: 1, status: 'normal' },
];
const STATUS_COLOR = { normal: '#16A34A', watch: '#F59E0B', alert: '#DC2626' };

// ── Analytics / Summary panel (LHRM-aligned) ────────────────────────────────
function PatientSummary({ patient }) {
  const activePhases = LHRM_PHASES.filter(p => patient.age >= p.ageStart);
  const totalEvents  = activePhases.reduce((a, p) => a + p.events, 0);

  const normalCount = activePhases.filter(p => p.status === 'normal').length;
  const watchCount  = activePhases.filter(p => p.status === 'watch').length;
  const alertCount  = activePhases.filter(p => p.status === 'alert').length;
  const donutSegments = [
    { label: 'Normal', value: normalCount, color: '#16A34A' },
    { label: 'Watch',  value: watchCount,  color: '#F59E0B' },
    { label: 'Alert',  value: alertCount,  color: '#DC2626' },
  ].filter(s => s.value > 0);

  const bpTrend     = [116, 118, 122, 138];
  const hbTrend     = [10.2, 10.8, 11.2, 11.5];
  const weightTrend = [55, 58, 60, 62];
  const vaccDone = 5, vaccTotal = 9;
  const healthScore = Math.max(0, 100 - watchCount * 5 - alertCount * 10 - 6);

  return (
    <div>
      {/* Health Score */}
      <div style={{ background: 'linear-gradient(135deg, #1B4F9B 0%, #2563EB 100%)', borderRadius: 16, padding: '16px', marginBottom: 14, color: 'white' }}>
        <p style={{ fontSize: 11, opacity: 0.8, marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Overall Health Score</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div>
            <p style={{ fontSize: 42, fontWeight: 800, lineHeight: 1 }}>{healthScore}</p>
            <p style={{ fontSize: 11, opacity: 0.75, marginTop: 4 }}>out of 100 · {healthScore >= 80 ? 'Excellent' : healthScore >= 60 ? 'Good' : 'Needs Attention'}</p>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ height: 8, background: 'rgba(255,255,255,0.2)', borderRadius: 4, overflow: 'hidden', marginBottom: 8 }}>
              <div style={{ height: '100%', width: `${healthScore}%`, background: 'white', borderRadius: 4 }} />
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {activePhases.map(p => (
                <span key={p.key} style={{ fontSize: 10, opacity: 0.9 }}>
                  {p.status === 'normal' ? '✅' : p.status === 'watch' ? '⚠️' : '🔴'} {p.label.split(' ')[0]}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
        {[
          { label: 'Total Events', value: totalEvents,         icon: '📄', color: '#EFF6FF', text: 'var(--primary)' },
          { label: 'Life Phases',  value: activePhases.length, icon: '🗂️', color: '#F0FDF4', text: '#16A34A' },
          { label: 'Programs',     value: activePhases.length, icon: '🏥', color: '#FFF7ED', text: '#B45309' },
        ].map(s => (
          <div key={s.label} style={{ background: s.color, borderRadius: 12, padding: '12px 8px', textAlign: 'center' }}>
            <p style={{ fontSize: 18 }}>{s.icon}</p>
            <p style={{ fontSize: 20, fontWeight: 800, color: s.text }}>{s.value}</p>
            <p style={{ fontSize: 10, color: 'var(--text-secondary)' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Events by LHRM Phase — multi-color bar chart */}
      <div className="card" style={{ marginBottom: 14 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.06em' }}>📊 Events by Life Phase (LHRM)</p>
        <p style={{ fontSize: 10, color: 'var(--text-secondary)', marginBottom: 12 }}>Health events recorded across each life stage</p>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 80 }}>
          {activePhases.map((ph) => {
            const max = Math.max(...activePhases.map(x => x.events), 1);
            return (
              <div key={ph.key} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <span style={{ fontSize: 10, color: ph.color, fontWeight: 700 }}>{ph.events}</span>
                <div style={{ width: '100%', borderRadius: '4px 4px 0 0', background: ph.color, height: `${Math.max((ph.events / max) * 52, 6)}px` }} />
                <span style={{ fontSize: 14 }}>{ph.icon}</span>
                <span style={{ fontSize: 8, color: 'var(--text-secondary)', textAlign: 'center' }}>{ph.ageStart}–{ph.ageEnd}y</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Health Status by Phase — donut */}
      <div className="card" style={{ marginBottom: 14 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.06em' }}>🩺 Health Status by Life Phase</p>
        <p style={{ fontSize: 10, color: 'var(--text-secondary)', marginBottom: 12 }}>Status across {activePhases.length} active LHRM phases</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <DonutChart segments={donutSegments} size={90} />
          <div style={{ flex: 1 }}>
            {donutSegments.map(s => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: s.color, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: 'var(--text-primary)', flex: 1 }}>{s.label} phases</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: s.color }}>{s.value}</span>
              </div>
            ))}
            <div style={{ marginTop: 8, borderTop: '1px solid var(--border)', paddingTop: 8 }}>
              {activePhases.map(p => (
                <div key={p.key} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <span style={{ fontSize: 12 }}>{p.icon}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-primary)', flex: 1 }}>{p.label}</span>
                  <span style={{ background: STATUS_COLOR[p.status] + '20', color: STATUS_COLOR[p.status], borderRadius: 20, padding: '1px 8px', fontSize: 9, fontWeight: 700, textTransform: 'uppercase' }}>{p.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Vital Trends — from RCH & NCD phases */}
      <div className="card" style={{ marginBottom: 14 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.06em' }}>📈 Vital Trends</p>
        <p style={{ fontSize: 10, color: 'var(--text-secondary)', marginBottom: 12 }}>From 🤰 RCH & 💊 NCD phase records</p>
        {[
          { label: 'BP Systolic (mmHg)', points: bpTrend,     color: '#DC2626', unit: 'mmHg', latest: 138,  status: '⚠️ Pre-HTN', phase: '💊 NCD Phase' },
          { label: 'Hemoglobin (g/dL)',  points: hbTrend,     color: '#7C3AED', unit: 'g/dL', latest: 11.5, status: '✅ Normal',  phase: '🤰 RCH Phase' },
          { label: 'Weight (kg)',        points: weightTrend, color: '#0891B2', unit: 'kg',   latest: 62,   status: '✅ Normal',  phase: '🤰 RCH Phase' },
        ].map((t, ti) => (
          <div key={t.label} style={{ marginBottom: ti < 2 ? 14 : 0, paddingBottom: ti < 2 ? 14 : 0, borderBottom: ti < 2 ? '1px solid var(--border)' : 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>{t.label}</p>
                <p style={{ fontSize: 10, color: 'var(--text-secondary)' }}>{t.phase}</p>
                <p style={{ fontSize: 11, color: t.color, marginTop: 2 }}>{t.status}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 20, fontWeight: 800, color: t.color }}>{t.latest}</p>
                <p style={{ fontSize: 10, color: 'var(--text-secondary)' }}>{t.unit}</p>
              </div>
            </div>
            <Sparkline points={t.points} color={t.color} width={260} height={44} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
              {['ANC-1', 'ANC-2', 'Delivery', 'Post'].map(m => (
                <span key={m} style={{ fontSize: 8, color: 'var(--text-secondary)' }}>{m}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Vaccination — Birth + Infant phases */}
      <div className="card" style={{ marginBottom: 14 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.06em' }}>💉 Vaccination Coverage</p>
        <p style={{ fontSize: 10, color: 'var(--text-secondary)', marginBottom: 12 }}>👶 Birth & 🍼 Infant LHRM phases</p>
        <ProgressBar value={vaccDone} max={vaccTotal} color="#16A34A" label="Vaccines Given" sublabel={`${vaccDone}/${vaccTotal}`} />
        <ProgressBar value={vaccTotal - vaccDone} max={vaccTotal} color="#F59E0B" label="Vaccines Due" sublabel={`${vaccTotal - vaccDone}/${vaccTotal}`} />
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
          {['BCG', 'OPV-0', 'Hep-B', 'OPV-1', 'Penta-1'].map(v => (
            <span key={v} style={{ background: '#DCFCE7', color: '#16A34A', borderRadius: 20, padding: '3px 8px', fontSize: 10, fontWeight: 600 }}>✅ {v}</span>
          ))}
          {['RVV-1', 'PCV-1', 'MR-1', 'JE-1'].map(v => (
            <span key={v} style={{ background: '#FEF3C7', color: '#B45309', borderRadius: 20, padding: '3px 8px', fontSize: 10, fontWeight: 600 }}>⏳ {v}</span>
          ))}
        </div>
      </div>

      {/* Risk Flags — from NCD / RCH phases */}
      <div className="card" style={{ marginBottom: 14 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.06em' }}>🚩 Risk Flags by Phase</p>
        <p style={{ fontSize: 10, color: 'var(--text-secondary)', marginBottom: 12 }}>Active alerts from LHRM phase screenings</p>
        {[
          { label: 'Pre-Hypertension', detail: 'BP 138/88 — monitor monthly', color: '#FEF3C7', text: '#B45309', icon: '⚠️', phase: '💊 NCD' },
          { label: 'Anaemia (mild)',   detail: 'Hb 11.2 g/dL — IFA ongoing',  color: '#FFF1F2', text: '#DC2626', icon: '🩸', phase: '🤰 RCH' },
        ].map(f => (
          <div key={f.label} style={{ background: f.color, borderRadius: 10, padding: '10px 12px', marginBottom: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
              <span style={{ fontSize: 16 }}>{f.icon}</span>
              <p style={{ fontSize: 13, fontWeight: 700, color: f.text, flex: 1 }}>{f.label}</p>
              <span style={{ background: f.text + '20', color: f.text, borderRadius: 20, padding: '1px 7px', fontSize: 9, fontWeight: 700 }}>{f.phase}</span>
            </div>
            <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginLeft: 24 }}>{f.detail}</p>
          </div>
        ))}
        <div style={{ background: '#F0FDF4', borderRadius: 10, padding: '10px 12px', display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ fontSize: 16 }}>✅</span>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#16A34A' }}>No critical alerts</p>
            <p style={{ fontSize: 11, color: 'var(--text-secondary)' }}>All other LHRM phases within normal range</p>
          </div>
        </div>
      </div>

      {/* LHRM Phase journey — compact timeline */}
      <div className="card" style={{ marginBottom: 14 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.06em' }}>🗓️ LHRM Phase Journey</p>
        <p style={{ fontSize: 10, color: 'var(--text-secondary)', marginBottom: 12 }}>Life stages completed and upcoming</p>
        {LHRM_PHASES.map((ph, i) => {
          const active  = patient.age >= ph.ageStart;
          const current = patient.age >= ph.ageStart && patient.age <= ph.ageEnd;
          return (
            <div key={ph.key} style={{ display: 'flex', gap: 12, marginBottom: i < LHRM_PHASES.length - 1 ? 10 : 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 28 }}>
                <div style={{ width: 28, height: 28, borderRadius: 14, background: active ? ph.color : '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, border: current ? '2px solid #DC2626' : 'none', flexShrink: 0 }}>{ph.icon}</div>
                {i < LHRM_PHASES.length - 1 && <div style={{ width: 2, flex: 1, background: active ? ph.color + '40' : '#E5E7EB', minHeight: 12, marginTop: 2 }} />}
              </div>
              <div style={{ flex: 1, paddingTop: 3 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: active ? 'var(--text-primary)' : '#9CA3AF' }}>{ph.label}</p>
                  {current && <span style={{ background: '#DC2626', color: 'white', borderRadius: 20, padding: '1px 6px', fontSize: 8, fontWeight: 700 }}>NOW</span>}
                  {active && !current && <span style={{ background: '#DCFCE7', color: '#16A34A', borderRadius: 20, padding: '1px 6px', fontSize: 8, fontWeight: 700 }}>DONE</span>}
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 2 }}>
                  <span style={{ fontSize: 10, color: 'var(--text-secondary)' }}>{ph.ageStart}–{ph.ageEnd} yrs · {ph.events} events</span>
                  {active && <span style={{ fontSize: 10, fontWeight: 600, color: STATUS_COLOR[ph.status] }}>● {ph.status}</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── LHRM — Longitudinal Health Record Management ────────────────────────────
function LHRMView({ patient }) {
  const [expandedPhase, setExpandedPhase] = useState(null);
  const dob = 1996; // derived from patient age
  const currentYear = 2024;
  const currentAge = patient.age;

  // Life phases with age ranges, color, program, events
  const phases = [
    {
      key: 'birth',
      label: 'Birth & Newborn',
      ageRange: '0–1 yr',
      ageStart: 0, ageEnd: 1,
      color: '#0891B2', bg: '#ECFEFF', border: '#A5F3FC',
      program: 'HBNC / HBPNC',
      icon: '👶',
      events: [
        { year: dob, age: 0, label: 'Birth', detail: 'Institutional delivery, PHC Bhopal. Live birth, male, 3.1 kg. APGAR 9/10.', type: 'delivery', color: '#16A34A' },
        { year: dob, age: 0, label: 'BCG + OPV-0 + Hep-B', detail: 'Birth dose vaccines given.', type: 'vaccine', color: '#0891B2' },
        { year: dob, age: 0, label: 'HBNC Day 1', detail: 'Temp 36.8°C, weight 3.0 kg, breastfeeding good.', type: 'visit', color: '#7C3AED' },
        { year: dob, age: 0, label: 'HBNC Day 3', detail: 'Baby active, no danger signs, weight 3.05 kg.', type: 'visit', color: '#7C3AED' },
        { year: dob, age: 0, label: 'HBPNC Day 7', detail: 'Mother BP normal, breastfeeding established.', type: 'visit', color: '#B45309' },
      ]
    },
    {
      key: 'infant',
      label: 'Infant & Child',
      ageRange: '1–5 yrs',
      ageStart: 1, ageEnd: 5,
      color: '#16A34A', bg: '#F0FDF4', border: '#BBF7D0',
      program: 'HBYC / Immunization',
      icon: '🍼',
      events: [
        { year: dob+1, age: 1, label: 'OPV-1, Penta-1, RVV-1', detail: 'Given at 6 weeks. No adverse reaction.', type: 'vaccine', color: '#0891B2' },
        { year: dob+1, age: 1, label: 'HBYC 3 months', detail: 'Weight 5.8 kg, Height 60 cm. Milestones normal. Vit A given.', type: 'visit', color: '#7C3AED' },
        { year: dob+2, age: 2, label: 'MR-1, JE-1', detail: 'Given at 9 months. Vit A 2nd dose.', type: 'vaccine', color: '#0891B2' },
        { year: dob+3, age: 3, label: 'DPT Booster-1', detail: '16–24 months booster. OPV booster given.', type: 'vaccine', color: '#0891B2' },
      ]
    },
    {
      key: 'school',
      label: 'School Age',
      ageRange: '6–14 yrs',
      ageStart: 6, ageEnd: 14,
      color: '#F59E0B', bg: '#FFFBEB', border: '#FDE68A',
      program: 'RBSK / School Health',
      icon: '🧒',
      events: [
        { year: dob+6, age: 6, label: 'RBSK Screening', detail: 'Vision normal, hearing normal, dental: mild caries. Referred for dental care.', type: 'screening', color: '#F59E0B' },
        { year: dob+10, age: 10, label: 'Td Vaccine', detail: 'Tetanus-diphtheria booster at 10 years.', type: 'vaccine', color: '#0891B2' },
        { year: dob+12, age: 12, label: 'RBSK Follow-up', detail: 'BMI normal. Anaemia detected — IFA started.', type: 'screening', color: '#F59E0B' },
      ]
    },
    {
      key: 'adolescent',
      label: 'Adolescent',
      ageRange: '15–19 yrs',
      ageStart: 15, ageEnd: 19,
      color: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE',
      program: 'RKSK / WIFS',
      icon: '🧑',
      events: [
        { year: dob+15, age: 15, label: 'RKSK Registration', detail: 'Adolescent health program enrolled. Nutrition counseling done.', type: 'registration', color: '#7C3AED' },
        { year: dob+16, age: 16, label: 'Td Vaccine', detail: 'Tetanus-diphtheria booster at 16 years.', type: 'vaccine', color: '#0891B2' },
        { year: dob+17, age: 17, label: 'WIFS', detail: 'Weekly Iron Folic Acid Supplementation started. Hb: 10.2 g/dL.', type: 'visit', color: '#DC2626' },
      ]
    },
    {
      key: 'rch',
      label: 'Reproductive & Maternal',
      ageRange: '20–45 yrs',
      ageStart: 20, ageEnd: 45,
      color: '#DC2626', bg: '#FFF1F2', border: '#FECDD3',
      program: 'RCH / ANC / FP',
      icon: '🤰',
      events: [
        { year: dob+22, age: 22, label: 'EC Registration', detail: 'Eligible couple registered. FP counseling done.', type: 'registration', color: '#DC2626' },
        { year: dob+26, age: 26, label: 'ANC Visit 1', detail: 'BP 116/74, Hb 10.8 g/dL, Weight 55 kg. IFA given.', type: 'anc', color: '#DC2626' },
        { year: dob+26, age: 26, label: 'ANC Visit 2', detail: 'BP 118/76, Hb 11.2 g/dL, Weight 58 kg. TT given.', type: 'anc', color: '#DC2626' },
        { year: dob+28, age: 28, label: 'Delivery', detail: 'Institutional delivery, PHC Bhopal. Live birth, male, 3.1 kg.', type: 'delivery', color: '#16A34A' },
        { year: dob+28, age: 28, label: 'CBAC Screening', detail: 'Score: 4 — Low Risk. No NCD risk factors.', type: 'screening', color: '#F59E0B' },
      ]
    },
    {
      key: 'ncd',
      label: 'NCD & Chronic Care',
      ageRange: '30–60 yrs',
      ageStart: 30, ageEnd: 60,
      color: '#B45309', bg: '#FFF7ED', border: '#FED7AA',
      program: 'NCD / HTN / DM',
      icon: '💊',
      events: [
        { year: dob+28, age: 28, label: 'BP Screening', detail: 'BP 138/88 mmHg — Pre-hypertension. Lifestyle counseling.', type: 'screening', color: '#DC2626' },
        { year: dob+28, age: 28, label: 'Diabetes Screening', detail: 'FBS 98 mg/dL — Normal. No diabetes detected.', type: 'screening', color: '#F59E0B' },
        { year: dob+28, age: 28, label: 'Mental Health', detail: 'PHQ-9: 3 (Minimal). GAD-7: 2. No significant distress.', type: 'screening', color: '#7C3AED' },
      ]
    },
    {
      key: 'geriatric',
      label: 'Geriatric Care',
      ageRange: '60+ yrs',
      ageStart: 60, ageEnd: 80,
      color: '#6B7280', bg: '#F9FAFB', border: '#E5E7EB',
      program: 'Geriatric / Palliative',
      icon: '👴',
      events: [
        { year: dob+60, age: 60, label: 'Geriatric Registration', detail: 'Elderly care program enrolled. Functional assessment done.', type: 'registration', color: '#6B7280' },
      ]
    },
  ];

  const typeColors = {
    vaccine: '#0891B2', visit: '#7C3AED', delivery: '#16A34A',
    screening: '#F59E0B', registration: '#6B7280', anc: '#DC2626',
  };
  const typeLabels = {
    vaccine: '💉', visit: '🏠', delivery: '🏥',
    screening: '🔍', registration: '📝', anc: '🤰',
  };

  // Which phases are "active" (patient has reached that age)
  const isActive = (phase) => currentAge >= phase.ageStart;
  const isCurrent = (phase) => currentAge >= phase.ageStart && currentAge <= phase.ageEnd;

  return (
    <div>
      {/* Header card */}
      <div style={{
        background: 'linear-gradient(135deg, #0891B2 0%, #1B4F9B 100%)',
        borderRadius: 16, padding: '16px', marginBottom: 16, color: 'white'
      }}>
        <p style={{ fontSize: 11, opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
          Longitudinal Health Record Management
        </p>
        <p style={{ fontSize: 17, fontWeight: 800 }}>{patient.name}</p>
        <div style={{ display: 'flex', gap: 16, marginTop: 6, flexWrap: 'wrap' }}>
          {[
            ['DOB', `${dob}-01-01`],
            ['Age', `${currentAge} yrs`],
            ['UID', patient.abhaId],
            ['Village', patient.village],
          ].map(([k, v]) => (
            <div key={k}>
              <p style={{ fontSize: 9, opacity: 0.7, textTransform: 'uppercase' }}>{k}</p>
              <p style={{ fontSize: 12, fontWeight: 700 }}>{v}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Age ruler / timeline bar */}
      <div className="card" style={{ marginBottom: 16, padding: '14px 14px 10px' }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
          Life Stage Timeline
        </p>
        <div style={{ position: 'relative', height: 36, marginBottom: 6 }}>
          {/* Background track */}
          <div style={{ position: 'absolute', top: 14, left: 0, right: 0, height: 8, background: '#E5E7EB', borderRadius: 4 }} />
          {/* Progress fill */}
          <div style={{ position: 'absolute', top: 14, left: 0, width: `${(currentAge / 80) * 100}%`, height: 8, background: 'linear-gradient(90deg, #0891B2, #1B4F9B)', borderRadius: 4 }} />
          {/* Current age marker */}
          <div style={{ position: 'absolute', top: 8, left: `${(currentAge / 80) * 100}%`, transform: 'translateX(-50%)' }}>
            <div style={{ width: 20, height: 20, borderRadius: 10, background: '#DC2626', border: '3px solid white', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }} />
          </div>
          {/* Age labels */}
          {[0, 10, 20, 30, 40, 50, 60, 70, 80].map(age => (
            <div key={age} style={{ position: 'absolute', top: 24, left: `${(age / 80) * 100}%`, transform: 'translateX(-50%)' }}>
              <div style={{ width: 1, height: 4, background: '#9CA3AF', margin: '0 auto' }} />
              <p style={{ fontSize: 8, color: 'var(--text-secondary)', textAlign: 'center', marginTop: 1 }}>{age}</p>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 10, color: 'var(--text-secondary)', textAlign: 'center', marginTop: 8 }}>
          Years of Age — Current: <span style={{ color: '#DC2626', fontWeight: 700 }}>{currentAge} yrs</span>
        </p>
      </div>

      {/* Phase legend */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
        {phases.map(ph => (
          <span key={ph.key} style={{
            background: isActive(ph) ? ph.color : '#E5E7EB',
            color: isActive(ph) ? 'white' : '#9CA3AF',
            borderRadius: 20, padding: '3px 10px', fontSize: 10, fontWeight: 700,
            border: isCurrent(ph) ? `2px solid #DC2626` : '2px solid transparent'
          }}>
            {ph.icon} {ph.ageRange}
          </span>
        ))}
      </div>

      {/* Phase cards — vertical timeline */}
      {phases.map((phase, pi) => (
        <div key={phase.key} style={{ marginBottom: 10 }}>
          {/* Phase header row */}
          <button
            onClick={() => setExpandedPhase(expandedPhase === phase.key ? null : phase.key)}
            style={{
              width: '100%', background: isActive(phase) ? phase.bg : '#F9FAFB',
              border: `2px solid ${isCurrent(phase) ? '#DC2626' : isActive(phase) ? phase.border : '#E5E7EB'}`,
              borderRadius: expandedPhase === phase.key ? '12px 12px 0 0' : 12,
              padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10,
              cursor: 'pointer', textAlign: 'left', opacity: isActive(phase) ? 1 : 0.5
            }}
          >
            {/* Left color bar */}
            <div style={{ width: 4, height: 36, borderRadius: 2, background: isActive(phase) ? phase.color : '#D1D5DB', flexShrink: 0 }} />
            <span style={{ fontSize: 20 }}>{phase.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: isActive(phase) ? 'var(--text-primary)' : '#9CA3AF' }}>{phase.label}</p>
                {isCurrent(phase) && (
                  <span style={{ background: '#DC2626', color: 'white', borderRadius: 20, padding: '1px 7px', fontSize: 9, fontWeight: 700 }}>CURRENT</span>
                )}
              </div>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 1 }}>{phase.ageRange} · {phase.program}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 16, fontWeight: 800, color: isActive(phase) ? phase.color : '#D1D5DB' }}>{phase.events.length}</p>
              <p style={{ fontSize: 9, color: 'var(--text-secondary)' }}>events</p>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ transform: expandedPhase === phase.key ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>

          {/* Expanded events */}
          {expandedPhase === phase.key && (
            <div style={{
              background: 'white', border: `2px solid ${isCurrent(phase) ? '#DC2626' : phase.border}`,
              borderTop: 'none', borderRadius: '0 0 12px 12px', padding: '8px 14px 14px'
            }}>
              {/* Mini age bar for this phase */}
              <div style={{ background: phase.bg, borderRadius: 8, padding: '8px 10px', marginBottom: 12 }}>
                <div style={{ position: 'relative', height: 16 }}>
                  <div style={{ position: 'absolute', top: 6, left: 0, right: 0, height: 4, background: '#E5E7EB', borderRadius: 2 }} />
                  <div style={{ position: 'absolute', top: 6, left: 0,
                    width: `${Math.min(((currentAge - phase.ageStart) / (phase.ageEnd - phase.ageStart)) * 100, 100)}%`,
                    height: 4, background: phase.color, borderRadius: 2 }} />
                  {[phase.ageStart, Math.round((phase.ageStart + phase.ageEnd) / 2), phase.ageEnd].map(a => (
                    <div key={a} style={{ position: 'absolute', top: 0, left: `${((a - phase.ageStart) / (phase.ageEnd - phase.ageStart)) * 100}%`, transform: 'translateX(-50%)' }}>
                      <p style={{ fontSize: 8, color: phase.color, fontWeight: 700 }}>{a}y</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Events list as vertical timeline */}
              {phase.events.map((ev, ei) => (
                <div key={ei} style={{ display: 'flex', gap: 12, marginBottom: ei < phase.events.length - 1 ? 14 : 0 }}>
                  {/* Timeline dot + line */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 28, flexShrink: 0 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: 14,
                      background: ev.color + '20', border: `2px solid ${ev.color}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, flexShrink: 0
                    }}>
                      {typeLabels[ev.type] || '📌'}
                    </div>
                    {ei < phase.events.length - 1 && (
                      <div style={{ width: 2, flex: 1, background: '#E5E7EB', marginTop: 3, minHeight: 16 }} />
                    )}
                  </div>
                  {/* Event content */}
                  <div style={{ flex: 1, paddingTop: 2 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                      <span style={{ background: ev.color, color: 'white', borderRadius: 20, padding: '1px 8px', fontSize: 9, fontWeight: 700 }}>
                        Age {ev.age}
                      </span>
                      <span style={{ background: ev.color + '15', color: ev.color, borderRadius: 20, padding: '1px 8px', fontSize: 9, fontWeight: 600, textTransform: 'capitalize' }}>
                        {ev.type}
                      </span>
                    </div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{ev.label}</p>
                    <p style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{ev.detail}</p>
                    <p style={{ fontSize: 10, color: '#9CA3AF', marginTop: 3 }}>📅 {ev.year}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Summary count row */}
      <div className="card" style={{ marginTop: 6, marginBottom: 14 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
          Lifetime Health Events
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {[
            { label: 'Vaccines', count: 8, icon: '💉', color: '#0891B2' },
            { label: 'Visits', count: 6, icon: '🏠', color: '#7C3AED' },
            { label: 'Screenings', count: 7, icon: '🔍', color: '#F59E0B' },
            { label: 'ANC', count: 2, icon: '🤰', color: '#DC2626' },
            { label: 'Deliveries', count: 1, icon: '🏥', color: '#16A34A' },
            { label: 'Programs', count: 5, icon: '📝', color: '#6B7280' },
          ].map(s => (
            <div key={s.label} style={{ background: s.color + '12', borderRadius: 10, padding: '10px 6px', textAlign: 'center' }}>
              <p style={{ fontSize: 16 }}>{s.icon}</p>
              <p style={{ fontSize: 18, fontWeight: 800, color: s.color }}>{s.count}</p>
              <p style={{ fontSize: 9, color: 'var(--text-secondary)' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main screen ─────────────────────────────────────────────────────────────
export default function EMRScreen({ onBack, onNavigate }) {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeView, setActiveView] = useState('records'); // 'records' | 'summary'

  const filteredPatients = PATIENTS.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.abhaId.includes(searchQuery) ||
    p.village.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSection = (key) => setExpandedSection(prev => prev === key ? null : key);

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      {/* App Bar */}
      <div style={{ background: 'var(--primary)', display: 'flex', alignItems: 'center', padding: '12px 16px', gap: 12, flexShrink: 0 }}>
        <button className="app-bar-icon-btn" onClick={onBack}><BackIcon /></button>
        <span style={{ flex: 1, fontSize: 17, fontWeight: 700, color: 'white', textAlign: 'center' }}>Electronic Medical Record</span>
        <div style={{ width: 30 }} />
      </div>

      <div style={{ background: 'rgba(27,79,155,0.08)', padding: '8px 16px', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600 }}>📁 EMR — Complete Patient Health History</p>
      </div>

      <div className="screen-content">
        {!selectedPatient ? (
          <>
            <div className="card" style={{ marginBottom: 14 }}>
              <label className="form-label">Search Patient</label>
              <input type="text" className="form-input" placeholder="Name, ABHA ID, or Village..."
                value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            <div style={{ marginBottom: 8 }}>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 10, fontWeight: 600 }}>
                {filteredPatients.length} PATIENT(S) FOUND
              </p>
              {filteredPatients.map(p => (
                <button key={p.id} onClick={() => { setSelectedPatient(p); setActiveView('records'); }}
                  style={{ width: '100%', background: 'white', border: '1px solid var(--border)', borderRadius: 12, padding: '12px 14px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', textAlign: 'left' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 22, background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, flexShrink: 0 }}>
                    {p.name.charAt(0)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{p.name}</p>
                    <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{p.age} yrs · {p.gender} · {p.village}</p>
                    <p style={{ fontSize: 11, color: 'var(--primary)', marginTop: 2 }}>🆔 ABHA: {p.abhaId}</p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Patient Header */}
            <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 12, padding: '14px', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <div style={{ width: 48, height: 48, borderRadius: 24, background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700 }}>
                  {selectedPatient.name.charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>{selectedPatient.name}</p>
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{selectedPatient.age} yrs · {selectedPatient.gender} · {selectedPatient.village}</p>
                </div>
                <button onClick={() => setSelectedPatient(null)}
                  style={{ background: '#F3F4F6', border: 'none', borderRadius: 8, padding: '6px 10px', cursor: 'pointer', fontSize: 12, color: 'var(--text-secondary)' }}>
                  Change
                </button>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ background: '#EFF6FF', color: 'var(--primary)', borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 600 }}>🆔 {selectedPatient.abhaId}</span>
                <span style={{ background: '#F0FDF4', color: '#16A34A', borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 600 }}>📞 {selectedPatient.phone}</span>
              </div>
            </div>

            {/* View Toggle — Records / Summary / LHRM */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
              {[
                { key: 'records', label: '📋 Records', color: 'var(--primary)' },
                { key: 'summary', label: '📊 Summary', color: '#7C3AED' },
                { key: 'lhrm',    label: '🗂️ LHRM',    color: '#0891B2' },
              ].map(v => (
                <button key={v.key} onClick={() => setActiveView(v.key)}
                  style={{ flex: 1, padding: '9px 4px', borderRadius: 10, border: '2px solid', fontWeight: 700, fontSize: 12, cursor: 'pointer', fontFamily: 'var(--font)',
                    borderColor: activeView === v.key ? v.color : 'var(--border)',
                    background: activeView === v.key ? v.color : 'white',
                    color: activeView === v.key ? 'white' : 'var(--text-secondary)' }}>
                  {v.label}
                </button>
              ))}
            </div>

            {/* ── RECORDS VIEW ── */}
            {activeView === 'records' && (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
                  {[
                    { label: 'Total Records', value: RECORD_SECTIONS.reduce((a, s) => a + s.records.length, 0), color: 'var(--primary)' },
                    { label: 'Sections', value: RECORD_SECTIONS.filter(s => s.records.length > 0).length, color: '#16A34A' },
                    { label: 'Last Visit', value: 'Mar 2024', color: '#B45309' },
                  ].map(s => (
                    <div key={s.label} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 8px', textAlign: 'center' }}>
                      <p style={{ fontSize: 18, fontWeight: 700, color: s.color }}>{s.value}</p>
                      <p style={{ fontSize: 10, color: 'var(--text-secondary)', marginTop: 2 }}>{s.label}</p>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Health Records</p>
                {RECORD_SECTIONS.map(section => (
                  <div key={section.key} style={{ marginBottom: 8 }}>
                    <button onClick={() => toggleSection(section.key)}
                      style={{ width: '100%', background: section.color, border: `1px solid ${section.border}`, borderRadius: expandedSection === section.key ? '12px 12px 0 0' : 12, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', textAlign: 'left' }}>
                      <span style={{ fontSize: 18 }}>{section.icon}</span>
                      <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{section.label}</span>
                      <span style={{ background: section.records.length > 0 ? 'var(--primary)' : '#D1D5DB', color: 'white', borderRadius: 20, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>{section.records.length}</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        style={{ transform: expandedSection === section.key ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>
                        <polyline points="9 18 15 12 9 6"/>
                      </svg>
                    </button>
                    {expandedSection === section.key && (
                      <div style={{ background: 'white', border: `1px solid ${section.border}`, borderTop: 'none', borderRadius: '0 0 12px 12px', padding: '4px 0' }}>
                        {section.records.length === 0
                          ? <p style={{ padding: '14px', fontSize: 13, color: 'var(--text-secondary)', textAlign: 'center' }}>No records found</p>
                          : section.records.map((rec, i) => (
                            <div key={i} style={{ padding: '12px 14px', borderBottom: i < section.records.length - 1 ? '1px solid var(--border)' : 'none' }}>
                              <p style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 600, marginBottom: 4 }}>📅 {rec.date}</p>
                              <p style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.5 }}>{rec.summary}</p>
                            </div>
                          ))
                        }
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}

            {/* ── SUMMARY VIEW ── */}
            {activeView === 'summary' && <PatientSummary patient={selectedPatient} />}

            {/* ── LHRM VIEW ── */}
            {activeView === 'lhrm' && <LHRMView patient={selectedPatient} />}

            <div style={{ height: 16 }} />
          </>
        )}
      </div>
    </div>
  );
}
