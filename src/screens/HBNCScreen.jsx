import React, { useState } from 'react';
import { getData, appendData } from '../utils/storage';
import PatientSearchBar from '../components/PatientSearchBar';

function BackIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>;
}

const visitSchedule = [
  { label: 'Day 1', day: 1, focus: 'Breastfeeding, warmth, cord care' },
  { label: 'Day 3', day: 3, focus: 'Weight check, jaundice, feeding' },
  { label: 'Day 7', day: 7, focus: 'Weight, danger signs, immunization' },
  { label: 'Day 14', day: 14, focus: 'Growth monitoring, feeding' },
  { label: 'Day 28', day: 28, focus: 'Weight, development, Vit A' },
  { label: 'Day 42', day: 42, focus: 'Final assessment, family planning' },
];

const dangerSigns = ['Not feeding', 'Convulsions', 'Fast breathing', 'Chest in-drawing', 'Fever', 'Hypothermia', 'Jaundice', 'Umbilical infection', 'None'];

export default function HBNCScreen({ onBack }) {
  const children = getData('children') || [];
  const [selectedChild, setSelectedChild] = useState('');
  const [activeDay, setActiveDay] = useState(0);
  const [form, setForm] = useState({ visitDate: '', weight: '', temp: '', breastfeeding: '', cordCare: false, vitaminK: false, bcgGiven: false, opvGiven: false, dangerSigns: [], referred: false, notes: '' });
  const [saved, setSaved] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleDS = (s) => setForm(f => ({ ...f, dangerSigns: f.dangerSigns.includes(s) ? f.dangerSigns.filter(x => x !== s) : [...f.dangerSigns, s] }));

  const handleSave = (e) => {
    e.preventDefault();
    appendData('hbncVisits', { ...form, visitDay: visitSchedule[activeDay].day, childId: selectedChild, recordedAt: new Date().toISOString() });
    setSaved(true); setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <div style={{ background: 'var(--primary)', display: 'flex', alignItems: 'center', padding: '12px 16px', gap: 12, flexShrink: 0 }}>
        <button className="app-bar-icon-btn" onClick={onBack}><BackIcon /></button>
        <span style={{ flex: 1, fontSize: 17, fontWeight: 700, color: 'white', textAlign: 'center' }}>HBNC</span>
        <div style={{ width: 30 }} />
      </div>
      <div style={{ background: 'rgba(27,79,155,0.08)', padding: '8px 16px', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600 }}>🏠 Home Based Newborn Care (0-42 days)</p>
      </div>
      <div className="screen-content">
        {saved && <div style={{ background: '#DCFCE7', border: '1px solid #16A34A', borderRadius: 12, padding: '12px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}><span>✅</span><span style={{ fontSize: 14, fontWeight: 600, color: '#16A34A' }}>HBNC visit saved!</span></div>}
        <PatientSearchBar onPatientFound={p => {
          const match = children.find(c => c.childName === p.name || c.mobile === p.mobile);
          if (match) setSelectedChild(String(match.id));
        }} />
        <form onSubmit={handleSave}>
          <div className="card" style={{ marginBottom: 14 }}>
            <label className="form-label">Select Child <span className="required">*</span></label>
            <select className="form-input" value={selectedChild} onChange={e => setSelectedChild(e.target.value)} required>
              <option value="">-- Select Child --</option>
              {children.map(c => <option key={c.id} value={c.id}>{c.childName}</option>)}
              <option value="demo">Baby of Sunita Devi (Demo)</option>
            </select>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Visit Day</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {visitSchedule.map((v, i) => (
                <button key={v.day} type="button" onClick={() => setActiveDay(i)}
                  style={{ padding: '8px 14px', borderRadius: 20, border: '2px solid', borderColor: activeDay === i ? 'var(--primary)' : 'var(--border)', background: activeDay === i ? 'var(--primary)' : 'white', color: activeDay === i ? 'white' : 'var(--text-secondary)', fontWeight: 600, fontSize: 12, cursor: 'pointer', fontFamily: 'var(--font)' }}>
                  {v.label}
                </button>
              ))}
            </div>
            <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 8 }}>Focus: {visitSchedule[activeDay].focus}</p>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Assessment</p>
            <div className="form-group"><label className="form-label">Visit Date <span className="required">*</span></label><input type="date" className="form-input" value={form.visitDate} onChange={e => set('visitDate', e.target.value)} required /></div>
            <div className="row-2col">
              <div className="form-group"><label className="form-label">Weight (g)</label><input type="number" className="form-input" placeholder="grams" value={form.weight} onChange={e => set('weight', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Temp (°C)</label><input type="number" step="0.1" className="form-input" placeholder="36.8" value={form.temp} onChange={e => set('temp', e.target.value)} /></div>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Breastfeeding</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {['Exclusive', 'Partial', 'Not Feeding'].map(opt => (
                  <button key={opt} type="button" onClick={() => set('breastfeeding', opt)}
                    style={{ flex: 1, padding: '8px 4px', borderRadius: 10, border: '2px solid', borderColor: form.breastfeeding === opt ? 'var(--primary)' : 'var(--border)', background: form.breastfeeding === opt ? 'rgba(27,79,155,0.08)' : 'white', color: form.breastfeeding === opt ? 'var(--primary)' : 'var(--text-secondary)', fontWeight: 600, fontSize: 11, cursor: 'pointer', fontFamily: 'var(--font)' }}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>⚠️ Danger Signs</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {dangerSigns.map(s => (
                <button key={s} type="button" className={`chip ${form.dangerSigns.includes(s) ? 'selected' : ''}`}
                  style={form.dangerSigns.includes(s) && s !== 'None' ? { background: '#EF4444', borderColor: '#EF4444' } : {}}
                  onClick={() => toggleDS(s)}>{s}</button>
              ))}
            </div>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Interventions</p>
            {[['cordCare', 'Cord Care Done'], ['vitaminK', 'Vitamin K Given'], ['bcgGiven', 'BCG Given'], ['opvGiven', 'OPV-0 Given'], ['referred', 'Referred to Facility']].map(([key, label]) => (
              <div key={key} className="toggle-wrapper" style={{ marginBottom: 8 }}>
                <span className="toggle-label">{label}</span>
                <label className="toggle"><input type="checkbox" checked={form[key]} onChange={e => set(key, e.target.checked)} /><span className="toggle-slider" /></label>
              </div>
            ))}
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginBottom: 24 }}>💾 Save HBNC Visit</button>
        </form>
      </div>
    </div>
  );
}
