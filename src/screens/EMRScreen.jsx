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
  {
    key: 'anc', label: 'ANC Visits', icon: '🤰', color: '#EFF6FF', border: '#BFDBFE',
    records: [
      { date: '2024-03-10', summary: 'ANC Visit 2 — BP: 118/76, Hb: 11.2 g/dL, Weight: 58 kg, IFA given, TT given' },
      { date: '2024-01-15', summary: 'ANC Visit 1 — BP: 116/74, Hb: 10.8 g/dL, Weight: 55 kg, IFA given' },
    ]
  },
  {
    key: 'delivery', label: 'Delivery', icon: '🏥', color: '#F0FDF4', border: '#BBF7D0',
    records: [
      { date: '2024-06-02', summary: 'Institutional delivery at PHC Bhopal. Live birth, male, 3.1 kg. No complications.' },
    ]
  },
  {
    key: 'hbpnc', label: 'HBPNC Visits', icon: '🏠', color: '#FDF4FF', border: '#E9D5FF',
    records: [
      { date: '2024-06-05', summary: 'Day 3 PNC — Mother BP normal, breastfeeding established, baby weight 3.0 kg' },
      { date: '2024-06-09', summary: 'Day 7 PNC — Baby weight 3.2 kg, cord healed, exclusive breastfeeding' },
    ]
  },
  {
    key: 'vaccination', label: 'Vaccinations', icon: '💉', color: '#FFF7ED', border: '#FED7AA',
    records: [
      { date: '2024-06-02', summary: 'BCG, OPV-0, Hep-B given at birth' },
      { date: '2024-07-02', summary: 'OPV-1, Penta-1, RVV-1, PCV-1 given at 4 weeks' },
    ]
  },
  {
    key: 'hbnc', label: 'HBNC Visits', icon: '🍼', color: '#F0FDFA', border: '#99F6E4',
    records: [
      { date: '2024-06-04', summary: 'Day 1 HBNC — Baby temp 36.8°C, weight 3.0 kg, breastfeeding good' },
      { date: '2024-06-06', summary: 'Day 3 HBNC — Baby active, no danger signs, weight 3.05 kg' },
    ]
  },
  {
    key: 'hbyc', label: 'HBYC Visits', icon: '🌱', color: '#FFFBEB', border: '#FDE68A',
    records: [
      { date: '2024-09-02', summary: '3 months — Weight 5.8 kg, Height 60 cm, Milestones: holds head, smiles. Vitamin A given.' },
    ]
  },
  {
    key: 'cbac', label: 'CBAC Screening', icon: '📋', color: '#FFF1F2', border: '#FECDD3',
    records: [
      { date: '2024-02-20', summary: 'CBAC Score: 4 (Low Risk). No NCD risk factors identified.' },
    ]
  },
  {
    key: 'hypertension', label: 'Hypertension', icon: '💓', color: '#FFF1F2', border: '#FECDD3',
    records: [
      { date: '2024-04-10', summary: 'BP: 138/88 mmHg — Pre-hypertension. Lifestyle counseling done. Follow-up in 1 month.' },
    ]
  },
  {
    key: 'diabetes', label: 'Diabetes', icon: '🩸', color: '#FFF7ED', border: '#FED7AA',
    records: [
      { date: '2024-04-10', summary: 'FBS: 98 mg/dL — Normal. No diabetes detected.' },
    ]
  },
  {
    key: 'tb', label: 'TB Screening', icon: '🫁', color: '#F0FDFA', border: '#99F6E4',
    records: [
      { date: '2024-01-05', summary: 'TB Screening — No symptoms. Sputum test negative. No treatment required.' },
    ]
  },
  {
    key: 'mentalhealth', label: 'Mental Health', icon: '🧠', color: '#EFF6FF', border: '#BFDBFE',
    records: [
      { date: '2024-03-15', summary: 'PHQ-9 Score: 3 (Minimal). GAD-7 Score: 2. No significant distress.' },
    ]
  },
  {
    key: 'emergency', label: 'Emergency Reports', icon: '🚨', color: '#FFF1F2', border: '#FECDD3',
    records: []
  },
];

export default function EMRScreen({ onBack, onNavigate }) {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

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
            {/* Search */}
            <div className="card" style={{ marginBottom: 14 }}>
              <label className="form-label">Search Patient</label>
              <input
                type="text"
                className="form-input"
                placeholder="Name, ABHA ID, or Village..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Patient List */}
            <div style={{ marginBottom: 8 }}>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 10, fontWeight: 600 }}>
                {filteredPatients.length} PATIENT(S) FOUND
              </p>
              {filteredPatients.map(p => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPatient(p)}
                  style={{
                    width: '100%', background: 'white', border: '1px solid var(--border)',
                    borderRadius: 12, padding: '12px 14px', marginBottom: 10,
                    display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', textAlign: 'left'
                  }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: 22,
                    background: 'var(--primary)', color: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, fontWeight: 700, flexShrink: 0
                  }}>
                    {p.name.charAt(0)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{p.name}</p>
                    <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
                      {p.age} yrs · {p.gender} · {p.village}
                    </p>
                    <p style={{ fontSize: 11, color: 'var(--primary)', marginTop: 2 }}>
                      🆔 ABHA: {p.abhaId}
                    </p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Patient Header */}
            <div style={{
              background: 'white', border: '1px solid var(--border)', borderRadius: 12,
              padding: '14px', marginBottom: 14
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 24,
                  background: 'var(--primary)', color: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, fontWeight: 700
                }}>
                  {selectedPatient.name.charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>{selectedPatient.name}</p>
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                    {selectedPatient.age} yrs · {selectedPatient.gender} · {selectedPatient.village}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedPatient(null)}
                  style={{ background: '#F3F4F6', border: 'none', borderRadius: 8, padding: '6px 10px', cursor: 'pointer', fontSize: 12, color: 'var(--text-secondary)' }}
                >
                  Change
                </button>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ background: '#EFF6FF', color: 'var(--primary)', borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 600 }}>
                  🆔 {selectedPatient.abhaId}
                </span>
                <span style={{ background: '#F0FDF4', color: '#16A34A', borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 600 }}>
                  📞 {selectedPatient.phone}
                </span>
              </div>
            </div>

            {/* Summary Stats */}
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

            {/* Record Sections */}
            <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Health Records
            </p>
            {RECORD_SECTIONS.map(section => (
              <div key={section.key} style={{ marginBottom: 8 }}>
                <button
                  onClick={() => toggleSection(section.key)}
                  style={{
                    width: '100%', background: section.color,
                    border: `1px solid ${section.border}`,
                    borderRadius: expandedSection === section.key ? '12px 12px 0 0' : 12,
                    padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10,
                    cursor: 'pointer', textAlign: 'left'
                  }}
                >
                  <span style={{ fontSize: 18 }}>{section.icon}</span>
                  <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{section.label}</span>
                  <span style={{
                    background: section.records.length > 0 ? 'var(--primary)' : '#D1D5DB',
                    color: 'white', borderRadius: 20, padding: '2px 8px', fontSize: 11, fontWeight: 700
                  }}>
                    {section.records.length}
                  </span>
                  <svg
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    style={{ transform: expandedSection === section.key ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}
                  >
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </button>

                {expandedSection === section.key && (
                  <div style={{
                    background: 'white', border: `1px solid ${section.border}`,
                    borderTop: 'none', borderRadius: '0 0 12px 12px', padding: '4px 0'
                  }}>
                    {section.records.length === 0 ? (
                      <p style={{ padding: '14px', fontSize: 13, color: 'var(--text-secondary)', textAlign: 'center' }}>
                        No records found
                      </p>
                    ) : (
                      section.records.map((rec, i) => (
                        <div key={i} style={{
                          padding: '12px 14px',
                          borderBottom: i < section.records.length - 1 ? '1px solid var(--border)' : 'none'
                        }}>
                          <p style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 600, marginBottom: 4 }}>
                            📅 {rec.date}
                          </p>
                          <p style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.5 }}>{rec.summary}</p>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            ))}

            <div style={{ height: 16 }} />
          </>
        )}
      </div>
    </div>
  );
}
