import React, { useState } from 'react';
import { getData } from '../utils/storage';
import PatientSearchBar from '../components/PatientSearchBar';

function BackIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>;
}

const vaccineSchedule = [
  { age: 'At Birth', vaccines: ['BCG', 'OPV-0', 'Hep-B (Birth dose)'] },
  { age: '6 Weeks', vaccines: ['OPV-1', 'Penta-1', 'RVV-1', 'fIPV-1', 'PCV-1'] },
  { age: '10 Weeks', vaccines: ['OPV-2', 'Penta-2', 'RVV-2'] },
  { age: '14 Weeks', vaccines: ['OPV-3', 'Penta-3', 'fIPV-2', 'PCV-2', 'RVV-3'] },
  { age: '9 Months', vaccines: ['MR-1', 'JE-1', 'Vit A (1st dose)'] },
  { age: '16-24 Months', vaccines: ['MR-2', 'OPV Booster', 'DPT Booster-1', 'JE-2', 'Vit A (2nd dose)'] },
  { age: '5-6 Years', vaccines: ['DPT Booster-2'] },
  { age: '10 Years', vaccines: ['Td'] },
  { age: '16 Years', vaccines: ['Td'] },
];

export default function VaccinationScreen({ onBack }) {
  const children = getData('children') || [];
  const [selectedChild, setSelectedChild] = useState('');
  const [given, setGiven] = useState({});
  const [saved, setSaved] = useState(false);

  const toggle = (vaccine) => setGiven(g => ({ ...g, [vaccine]: !g[vaccine] }));

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true); setTimeout(() => setSaved(false), 2500);
  };

  const dueCount = vaccineSchedule.reduce((acc, s) => acc + s.vaccines.filter(v => !given[v]).length, 0);
  const doneCount = Object.values(given).filter(Boolean).length;

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <div style={{ background: 'var(--primary)', display: 'flex', alignItems: 'center', padding: '12px 16px', gap: 12, flexShrink: 0 }}>
        <button className="app-bar-icon-btn" onClick={onBack}><BackIcon /></button>
        <span style={{ flex: 1, fontSize: 17, fontWeight: 700, color: 'white', textAlign: 'center' }}>Vaccination Due List</span>
        <div style={{ width: 30 }} />
      </div>
      <div style={{ background: 'rgba(27,79,155,0.08)', padding: '8px 16px', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600 }}>💉 Universal Immunization Programme</p>
      </div>
      <div className="screen-content">
        {saved && <div style={{ background: '#DCFCE7', border: '1px solid #16A34A', borderRadius: 12, padding: '12px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}><span>✅</span><span style={{ fontSize: 14, fontWeight: 600, color: '#16A34A' }}>Vaccination record updated!</span></div>}

        <PatientSearchBar onPatientFound={p => {
          const match = children.find(c => c.childName === p.name || c.mobile === p.mobile);
          if (match) setSelectedChild(String(match.id));
        }} />
        <div className="card" style={{ marginBottom: 14 }}>
          <label className="form-label">Select Child</label>
          <select className="form-input" value={selectedChild} onChange={e => setSelectedChild(e.target.value)}>
            <option value="">-- Select Child --</option>
            {children.map(c => <option key={c.id} value={c.id}>{c.childName}</option>)}
            <option value="demo">Ravi Kumar (Demo)</option>
          </select>
        </div>

        {/* Summary */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
          <div style={{ flex: 1, background: '#DCFCE7', borderRadius: 12, padding: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#16A34A' }}>{doneCount}</div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Given</div>
          </div>
          <div style={{ flex: 1, background: '#FEF3C7', borderRadius: 12, padding: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#B45309' }}>{dueCount}</div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Due</div>
          </div>
        </div>

        <form onSubmit={handleSave}>
          {vaccineSchedule.map(schedule => (
            <div key={schedule.age} className="card" style={{ marginBottom: 12 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 10 }}>📅 {schedule.age}</p>
              {schedule.vaccines.map(vaccine => (
                <div key={vaccine} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: given[vaccine] ? '#16A34A' : '#E2E8F0', flexShrink: 0 }} />
                    <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{vaccine}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {given[vaccine] && <span className="badge badge-success" style={{ fontSize: 10 }}>Given</span>}
                    {!given[vaccine] && <span className="badge badge-warning" style={{ fontSize: 10 }}>Due</span>}
                    <label className="toggle" style={{ width: 36, height: 20 }}>
                      <input type="checkbox" checked={!!given[vaccine]} onChange={() => toggle(vaccine)} />
                      <span className="toggle-slider" />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          ))}
          <button type="submit" className="btn btn-primary" style={{ marginBottom: 24 }}>💾 Update Vaccination Record</button>
        </form>
      </div>
    </div>
  );
}
