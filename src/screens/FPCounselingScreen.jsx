import React, { useState } from 'react';
import { appendData } from '../utils/storage';

function BackIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>;
}

const fpMethods = ['Condom', 'OCP (Oral Contraceptive Pills)', 'IUCD', 'Injectable (Antara)', 'Sterilization (Female)', 'Sterilization (Male)', 'LAM', 'Emergency Contraception', 'Natural Methods'];

export default function FPCounselingScreen({ onBack }) {
  const [form, setForm] = useState({ clientName: '', age: '', gender: '', mobile: '', village: '', counselingDate: '', currentMethod: '', methodsDiscussed: [], acceptedMethod: '', referralNeeded: false, referralFacility: '', followUpDate: '', notes: '' });
  const [saved, setSaved] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleMethod = (m) => setForm(f => ({ ...f, methodsDiscussed: f.methodsDiscussed.includes(m) ? f.methodsDiscussed.filter(x => x !== m) : [...f.methodsDiscussed, m] }));

  const handleSave = (e) => {
    e.preventDefault();
    appendData('fpCounseling', { ...form, recordedAt: new Date().toISOString() });
    setSaved(true); setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <div style={{ background: 'var(--primary)', display: 'flex', alignItems: 'center', padding: '12px 16px', gap: 12, flexShrink: 0 }}>
        <button className="app-bar-icon-btn" onClick={onBack}><BackIcon /></button>
        <span style={{ flex: 1, fontSize: 17, fontWeight: 700, color: 'white', textAlign: 'center' }}>FP Counseling</span>
        <div style={{ width: 30 }} />
      </div>
      <div style={{ background: 'rgba(27,79,155,0.08)', padding: '8px 16px', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600 }}>💬 Family Planning Counseling Session</p>
      </div>
      <div className="screen-content">
        {saved && <div style={{ background: '#DCFCE7', border: '1px solid #16A34A', borderRadius: 12, padding: '12px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}><span>✅</span><span style={{ fontSize: 14, fontWeight: 600, color: '#16A34A' }}>Counseling session saved!</span></div>}
        <form onSubmit={handleSave}>
          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Client Details</p>
            <div className="form-group"><label className="form-label">Client Name <span className="required">*</span></label><input type="text" className="form-input" placeholder="Full name" value={form.clientName} onChange={e => set('clientName', e.target.value)} required /></div>
            <div className="row-2col">
              <div className="form-group"><label className="form-label">Age</label><input type="number" className="form-input" placeholder="Years" value={form.age} onChange={e => set('age', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Gender</label><select className="form-input" value={form.gender} onChange={e => set('gender', e.target.value)}><option value="">Select</option><option>Female</option><option>Male</option><option>Couple</option></select></div>
            </div>
            <div className="form-group"><label className="form-label">Mobile</label><input type="tel" className="form-input" placeholder="10-digit number" value={form.mobile} onChange={e => set('mobile', e.target.value)} /></div>
            <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Village</label><input type="text" className="form-input" placeholder="Village name" value={form.village} onChange={e => set('village', e.target.value)} /></div>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Counseling Details</p>
            <div className="form-group"><label className="form-label">Counseling Date <span className="required">*</span></label><input type="date" className="form-input" value={form.counselingDate} onChange={e => set('counselingDate', e.target.value)} required /></div>
            <div className="form-group"><label className="form-label">Current Method (if any)</label><select className="form-input" value={form.currentMethod} onChange={e => set('currentMethod', e.target.value)}><option value="">None / Not using</option>{fpMethods.map(m => <option key={m}>{m}</option>)}</select></div>
            <div className="form-group">
              <label className="form-label">Methods Discussed</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
                {fpMethods.map(m => <button key={m} type="button" className={`chip ${form.methodsDiscussed.includes(m) ? 'selected' : ''}`} onClick={() => toggleMethod(m)}>{m}</button>)}
              </div>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Method Accepted</label><select className="form-input" value={form.acceptedMethod} onChange={e => set('acceptedMethod', e.target.value)}><option value="">None accepted</option>{fpMethods.map(m => <option key={m}>{m}</option>)}</select></div>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <div className="toggle-wrapper" style={{ marginBottom: 10 }}>
              <span className="toggle-label" style={{ fontWeight: 600 }}>Referral Needed</span>
              <label className="toggle"><input type="checkbox" checked={form.referralNeeded} onChange={e => set('referralNeeded', e.target.checked)} /><span className="toggle-slider" /></label>
            </div>
            {form.referralNeeded && <div className="form-group"><label className="form-label">Referral Facility</label><select className="form-input" value={form.referralFacility} onChange={e => set('referralFacility', e.target.value)}><option value="">Select</option><option>PHC</option><option>CHC</option><option>District Hospital</option></select></div>}
            <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Follow-up Date</label><input type="date" className="form-input" value={form.followUpDate} onChange={e => set('followUpDate', e.target.value)} /></div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginBottom: 24 }}>💾 Save Counseling Session</button>
        </form>
      </div>
    </div>
  );
}
