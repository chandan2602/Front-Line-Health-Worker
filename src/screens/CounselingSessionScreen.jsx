import React, { useState } from 'react';
import { appendData } from '../utils/storage';

function BackIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>;
}

export default function CounselingSessionScreen({ onBack }) {
  const [form, setForm] = useState({ clientName: '', age: '', gender: '', mobile: '', village: '', sessionDate: '', sessionType: '', duration: '', topics: [], outcome: '', homework: '', nextSession: '', notes: '' });
  const [saved, setSaved] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const topicOptions = ['Depression', 'Anxiety', 'Grief/Loss', 'Relationship Issues', 'Substance Use', 'Stress Management', 'Suicidal Thoughts', 'Trauma', 'Family Conflict', 'Work/Financial Stress'];
  const toggleTopic = (t) => setForm(f => ({ ...f, topics: f.topics.includes(t) ? f.topics.filter(x => x !== t) : [...f.topics, t] }));

  const handleSave = (e) => {
    e.preventDefault();
    appendData('counselingSessions', { ...form, recordedAt: new Date().toISOString() });
    setSaved(true); setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <div style={{ background: 'var(--primary)', display: 'flex', alignItems: 'center', padding: '12px 16px', gap: 12, flexShrink: 0 }}>
        <button className="app-bar-icon-btn" onClick={onBack}><BackIcon /></button>
        <span style={{ flex: 1, fontSize: 17, fontWeight: 700, color: 'white', textAlign: 'center' }}>Counseling Session</span>
        <div style={{ width: 30 }} />
      </div>
      <div className="screen-content">
        {saved && <div style={{ background: '#DCFCE7', border: '1px solid #16A34A', borderRadius: 12, padding: '12px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}><span>✅</span><span style={{ fontSize: 14, fontWeight: 600, color: '#16A34A' }}>Session saved!</span></div>}
        <form onSubmit={handleSave}>
          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Client Details</p>
            <div className="form-group"><label className="form-label">Client Name <span className="required">*</span></label><input type="text" className="form-input" placeholder="Full name" value={form.clientName} onChange={e => set('clientName', e.target.value)} required /></div>
            <div className="row-2col">
              <div className="form-group"><label className="form-label">Age</label><input type="number" className="form-input" placeholder="Years" value={form.age} onChange={e => set('age', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Gender</label><select className="form-input" value={form.gender} onChange={e => set('gender', e.target.value)}><option value="">Select</option><option>Male</option><option>Female</option><option>Other</option></select></div>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Village</label><input type="text" className="form-input" placeholder="Village name" value={form.village} onChange={e => set('village', e.target.value)} /></div>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Session Details</p>
            <div className="row-2col">
              <div className="form-group"><label className="form-label">Session Date <span className="required">*</span></label><input type="date" className="form-input" value={form.sessionDate} onChange={e => set('sessionDate', e.target.value)} required /></div>
              <div className="form-group"><label className="form-label">Duration (min)</label><input type="number" className="form-input" placeholder="e.g. 45" value={form.duration} onChange={e => set('duration', e.target.value)} /></div>
            </div>
            <div className="form-group"><label className="form-label">Session Type</label><select className="form-input" value={form.sessionType} onChange={e => set('sessionType', e.target.value)}><option value="">Select</option><option>Initial Assessment</option><option>Follow-up</option><option>Crisis Intervention</option><option>Group Session</option><option>Family Session</option></select></div>
            <div className="form-group">
              <label className="form-label">Topics Discussed</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
                {topicOptions.map(t => <button key={t} type="button" className={`chip ${form.topics.includes(t) ? 'selected' : ''}`} onClick={() => toggleTopic(t)}>{t}</button>)}
              </div>
            </div>
            <div className="form-group"><label className="form-label">Session Outcome</label><select className="form-input" value={form.outcome} onChange={e => set('outcome', e.target.value)}><option value="">Select</option><option>Improved</option><option>Stable</option><option>Deteriorated</option><option>Crisis - Referred</option></select></div>
            <div className="form-group"><label className="form-label">Homework / Action Plan</label><textarea className="form-input" rows={2} placeholder="Tasks assigned to client..." value={form.homework} onChange={e => set('homework', e.target.value)} style={{ resize: 'none' }} /></div>
            <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Next Session Date</label><input type="date" className="form-input" value={form.nextSession} onChange={e => set('nextSession', e.target.value)} /></div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginBottom: 24 }}>💾 Save Session</button>
        </form>
      </div>
    </div>
  );
}
