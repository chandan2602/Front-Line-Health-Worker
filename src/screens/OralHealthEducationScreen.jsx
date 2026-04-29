import React, { useState } from 'react';
import { appendData } from '../utils/storage';

function BackIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>;
}

const educationTopics = ['Brushing Technique', 'Flossing', 'Diet & Sugar Intake', 'Tobacco Cessation', 'Fluoride Use', 'Dental Visit Importance', 'Oral Cancer Awareness', 'Gum Disease Prevention', 'Child Dental Care', 'Denture Care'];

export default function OralHealthEducationScreen({ onBack }) {
  const [form, setForm] = useState({ sessionDate: '', venue: '', village: '', targetGroup: '', participantCount: '', topicsCovered: [], demonstrationDone: false, materialDistributed: false, materialType: '', followUpPlanned: false, followUpDate: '', notes: '' });
  const [saved, setSaved] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleTopic = (t) => setForm(f => ({ ...f, topicsCovered: f.topicsCovered.includes(t) ? f.topicsCovered.filter(x => x !== t) : [...f.topicsCovered, t] }));

  const handleSave = (e) => {
    e.preventDefault();
    appendData('oralHealthEducation', { ...form, recordedAt: new Date().toISOString() });
    setSaved(true); setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <div style={{ background: 'var(--primary)', display: 'flex', alignItems: 'center', padding: '12px 16px', gap: 12, flexShrink: 0 }}>
        <button className="app-bar-icon-btn" onClick={onBack}><BackIcon /></button>
        <span style={{ flex: 1, fontSize: 17, fontWeight: 700, color: 'white', textAlign: 'center' }}>Oral Health Education</span>
        <div style={{ width: 30 }} />
      </div>
      <div className="screen-content">
        {saved && <div style={{ background: '#DCFCE7', border: '1px solid #16A34A', borderRadius: 12, padding: '12px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}><span>✅</span><span style={{ fontSize: 14, fontWeight: 600, color: '#16A34A' }}>Session saved!</span></div>}
        <form onSubmit={handleSave}>
          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Session Details</p>
            <div className="form-group"><label className="form-label">Session Date <span className="required">*</span></label><input type="date" className="form-input" value={form.sessionDate} onChange={e => set('sessionDate', e.target.value)} required /></div>
            <div className="form-group"><label className="form-label">Village</label><input type="text" className="form-input" placeholder="Village name" value={form.village} onChange={e => set('village', e.target.value)} /></div>
            <div className="form-group"><label className="form-label">Venue</label><input type="text" className="form-input" placeholder="e.g. Anganwadi, School" value={form.venue} onChange={e => set('venue', e.target.value)} /></div>
            <div className="form-group"><label className="form-label">Target Group</label><select className="form-input" value={form.targetGroup} onChange={e => set('targetGroup', e.target.value)}><option value="">Select</option><option>Children (5-12 yrs)</option><option>Adolescents</option><option>Adults</option><option>Elderly</option><option>Pregnant Women</option><option>Mixed Group</option></select></div>
            <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Number of Participants</label><input type="number" className="form-input" placeholder="Count" value={form.participantCount} onChange={e => set('participantCount', e.target.value)} /></div>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Topics Covered</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {educationTopics.map(t => <button key={t} type="button" className={`chip ${form.topicsCovered.includes(t) ? 'selected' : ''}`} onClick={() => toggleTopic(t)}>{t}</button>)}
            </div>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <div className="toggle-wrapper" style={{ marginBottom: 8 }}><span className="toggle-label">Demonstration Done (brushing/flossing)</span><label className="toggle"><input type="checkbox" checked={form.demonstrationDone} onChange={e => set('demonstrationDone', e.target.checked)} /><span className="toggle-slider" /></label></div>
            <div className="toggle-wrapper" style={{ marginBottom: 8 }}><span className="toggle-label">IEC Material Distributed</span><label className="toggle"><input type="checkbox" checked={form.materialDistributed} onChange={e => set('materialDistributed', e.target.checked)} /><span className="toggle-slider" /></label></div>
            {form.materialDistributed && <div className="form-group"><label className="form-label">Material Type</label><input type="text" className="form-input" placeholder="e.g. Pamphlets, Posters" value={form.materialType} onChange={e => set('materialType', e.target.value)} /></div>}
            <div className="toggle-wrapper"><span className="toggle-label">Follow-up Planned</span><label className="toggle"><input type="checkbox" checked={form.followUpPlanned} onChange={e => set('followUpPlanned', e.target.checked)} /><span className="toggle-slider" /></label></div>
            {form.followUpPlanned && <div className="form-group" style={{ marginTop: 10, marginBottom: 0 }}><label className="form-label">Follow-up Date</label><input type="date" className="form-input" value={form.followUpDate} onChange={e => set('followUpDate', e.target.value)} /></div>}
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginBottom: 24 }}>💾 Save Session</button>
        </form>
      </div>
    </div>
  );
}
