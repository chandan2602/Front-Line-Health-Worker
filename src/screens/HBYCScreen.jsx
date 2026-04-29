import React, { useState } from 'react';
import { getData, appendData } from '../utils/storage';

function BackIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>;
}

const milestones = [
  { age: '3 months', items: ['Holds head up', 'Smiles', 'Follows objects'] },
  { age: '6 months', items: ['Sits with support', 'Babbles', 'Reaches for objects'] },
  { age: '9 months', items: ['Sits without support', 'Crawls', 'Says mama/dada'] },
  { age: '12 months', items: ['Stands with support', 'First words', 'Pincer grasp'] },
  { age: '15 months', items: ['Walks alone', 'Says 3-5 words', 'Points to objects'] },
  { age: '18 months', items: ['Runs', '10+ words', 'Feeds self'] },
  { age: '24 months', items: ['Climbs stairs', '2-word phrases', 'Follows 2-step instructions'] },
];

export default function HBYCScreen({ onBack }) {
  const children = getData('children') || [];
  const [selectedChild, setSelectedChild] = useState('');
  const [form, setForm] = useState({ visitDate: '', ageMonths: '', weight: '', height: '', achieved: {}, vitaminA: false, deworming: false, notes: '' });
  const [saved, setSaved] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleMilestone = (item) => setForm(f => ({ ...f, achieved: { ...f.achieved, [item]: !f.achieved[item] } }));

  const handleSave = (e) => {
    e.preventDefault();
    appendData('hbycVisits', { ...form, childId: selectedChild, recordedAt: new Date().toISOString() });
    setSaved(true); setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <div style={{ background: 'var(--primary)', display: 'flex', alignItems: 'center', padding: '12px 16px', gap: 12, flexShrink: 0 }}>
        <button className="app-bar-icon-btn" onClick={onBack}><BackIcon /></button>
        <span style={{ flex: 1, fontSize: 17, fontWeight: 700, color: 'white', textAlign: 'center' }}>HBYC</span>
        <div style={{ width: 30 }} />
      </div>
      <div style={{ background: 'rgba(27,79,155,0.08)', padding: '8px 16px', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600 }}>🌱 Home Based Young Child Care (2 months - 3 years)</p>
      </div>
      <div className="screen-content">
        {saved && <div style={{ background: '#DCFCE7', border: '1px solid #16A34A', borderRadius: 12, padding: '12px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}><span>✅</span><span style={{ fontSize: 14, fontWeight: 600, color: '#16A34A' }}>HBYC visit saved!</span></div>}
        <form onSubmit={handleSave}>
          <div className="card" style={{ marginBottom: 14 }}>
            <label className="form-label">Select Child <span className="required">*</span></label>
            <select className="form-input" value={selectedChild} onChange={e => setSelectedChild(e.target.value)} required>
              <option value="">-- Select Child --</option>
              {children.map(c => <option key={c.id} value={c.id}>{c.childName}</option>)}
              <option value="demo">Ravi Kumar (Demo, 8 months)</option>
            </select>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Growth Monitoring</p>
            <div className="form-group"><label className="form-label">Visit Date <span className="required">*</span></label><input type="date" className="form-input" value={form.visitDate} onChange={e => set('visitDate', e.target.value)} required /></div>
            <div className="form-group"><label className="form-label">Age (months)</label><input type="number" className="form-input" placeholder="e.g. 8" value={form.ageMonths} onChange={e => set('ageMonths', e.target.value)} /></div>
            <div className="row-2col">
              <div className="form-group"><label className="form-label">Weight (kg)</label><input type="number" step="0.1" className="form-input" placeholder="e.g. 7.2" value={form.weight} onChange={e => set('weight', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Height (cm)</label><input type="number" step="0.1" className="form-input" placeholder="e.g. 68" value={form.height} onChange={e => set('height', e.target.value)} /></div>
            </div>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Developmental Milestones</p>
            {milestones.map(m => (
              <div key={m.age} style={{ marginBottom: 12 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary)', marginBottom: 6 }}>📅 {m.age}</p>
                {m.items.map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ fontSize: 13, color: 'var(--text-primary)' }}>{item}</span>
                    <label className="toggle" style={{ width: 36, height: 20 }}>
                      <input type="checkbox" checked={!!form.achieved[item]} onChange={() => toggleMilestone(item)} />
                      <span className="toggle-slider" />
                    </label>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Interventions</p>
            <div className="toggle-wrapper" style={{ marginBottom: 8 }}>
              <span className="toggle-label">Vitamin A Given</span>
              <label className="toggle"><input type="checkbox" checked={form.vitaminA} onChange={e => set('vitaminA', e.target.checked)} /><span className="toggle-slider" /></label>
            </div>
            <div className="toggle-wrapper">
              <span className="toggle-label">Deworming Done</span>
              <label className="toggle"><input type="checkbox" checked={form.deworming} onChange={e => set('deworming', e.target.checked)} /><span className="toggle-slider" /></label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginBottom: 24 }}>💾 Save HBYC Visit</button>
        </form>
      </div>
    </div>
  );
}
