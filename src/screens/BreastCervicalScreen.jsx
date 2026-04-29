import React, { useState } from 'react';
import { appendData } from '../utils/storage';

function BackIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>;
}

export default function BreastCervicalScreen({ onBack }) {
  const [form, setForm] = useState({ name: '', age: '', mobile: '', village: '', screeningDate: '', lastMenstrual: '', menopause: false, breastLump: false, breastPain: false, nippleDischarge: false, skinChange: false, breastResult: '', viaResult: '', cervicalDischarge: false, postCoitalBleeding: false, pelvicPain: false, suspectedBreastCancer: false, suspectedCervicalCancer: false, referral: false, notes: '' });
  const [saved, setSaved] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = (e) => {
    e.preventDefault();
    appendData('breastCervicalScreenings', { ...form, recordedAt: new Date().toISOString() });
    setSaved(true); setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <div style={{ background: 'var(--primary)', display: 'flex', alignItems: 'center', padding: '12px 16px', gap: 12, flexShrink: 0 }}>
        <button className="app-bar-icon-btn" onClick={onBack}><BackIcon /></button>
        <span style={{ flex: 1, fontSize: 17, fontWeight: 700, color: 'white', textAlign: 'center' }}>Breast/Cervical Screening</span>
        <div style={{ width: 30 }} />
      </div>
      <div style={{ background: 'rgba(27,79,155,0.08)', padding: '8px 16px', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600 }}>🎗️ Cancer Screening for Women (30-65 years)</p>
      </div>
      <div className="screen-content">
        {saved && <div style={{ background: '#DCFCE7', border: '1px solid #16A34A', borderRadius: 12, padding: '12px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}><span>✅</span><span style={{ fontSize: 14, fontWeight: 600, color: '#16A34A' }}>Screening saved!</span></div>}
        {(form.suspectedBreastCancer || form.suspectedCervicalCancer) && <div style={{ background: '#FEE2E2', border: '1px solid #DC2626', borderRadius: 12, padding: '12px 16px', marginBottom: 16 }}><p style={{ fontSize: 13, fontWeight: 700, color: '#DC2626' }}>⚠️ Suspected Cancer - Immediate Referral Required!</p></div>}
        <form onSubmit={handleSave}>
          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Patient Details</p>
            <div className="form-group"><label className="form-label">Name <span className="required">*</span></label><input type="text" className="form-input" placeholder="Full name" value={form.name} onChange={e => set('name', e.target.value)} required /></div>
            <div className="row-2col">
              <div className="form-group"><label className="form-label">Age (30-65)</label><input type="number" min="30" max="65" className="form-input" placeholder="Years" value={form.age} onChange={e => set('age', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Screening Date</label><input type="date" className="form-input" value={form.screeningDate} onChange={e => set('screeningDate', e.target.value)} /></div>
            </div>
            <div className="toggle-wrapper"><span className="toggle-label">Post-Menopausal</span><label className="toggle"><input type="checkbox" checked={form.menopause} onChange={e => set('menopause', e.target.checked)} /><span className="toggle-slider" /></label></div>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 10 }}>🎗️ Breast Examination (CBE)</p>
            {[['breastLump', 'Lump in Breast'], ['breastPain', 'Breast Pain'], ['nippleDischarge', 'Nipple Discharge'], ['skinChange', 'Skin Changes (Dimpling/Peau d\'orange)'], ['suspectedBreastCancer', '⚠️ Suspected Breast Cancer']].map(([key, label]) => (
              <div key={key} className="toggle-wrapper" style={{ marginBottom: 8 }}>
                <span className="toggle-label" style={key === 'suspectedBreastCancer' ? { color: '#DC2626', fontWeight: 700 } : {}}>{label}</span>
                <label className="toggle"><input type="checkbox" checked={form[key]} onChange={e => set(key, e.target.checked)} /><span className="toggle-slider" /></label>
              </div>
            ))}
            <div className="form-group" style={{ marginTop: 10, marginBottom: 0 }}><label className="form-label">CBE Result</label><select className="form-input" value={form.breastResult} onChange={e => set('breastResult', e.target.value)}><option value="">Select</option><option>Normal</option><option>Abnormal - Refer</option><option>Inconclusive</option></select></div>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 10 }}>🔬 Cervical Screening (VIA)</p>
            {[['cervicalDischarge', 'Abnormal Vaginal Discharge'], ['postCoitalBleeding', 'Post-Coital Bleeding'], ['pelvicPain', 'Pelvic Pain'], ['suspectedCervicalCancer', '⚠️ Suspected Cervical Cancer']].map(([key, label]) => (
              <div key={key} className="toggle-wrapper" style={{ marginBottom: 8 }}>
                <span className="toggle-label" style={key === 'suspectedCervicalCancer' ? { color: '#DC2626', fontWeight: 700 } : {}}>{label}</span>
                <label className="toggle"><input type="checkbox" checked={form[key]} onChange={e => set(key, e.target.checked)} /><span className="toggle-slider" /></label>
              </div>
            ))}
            <div className="form-group" style={{ marginTop: 10, marginBottom: 0 }}><label className="form-label">VIA Result</label><select className="form-input" value={form.viaResult} onChange={e => set('viaResult', e.target.value)}><option value="">Select</option><option>VIA Negative</option><option>VIA Positive</option><option>Suspicious for Cancer</option><option>Not Done</option></select></div>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <div className="toggle-wrapper"><span className="toggle-label" style={{ fontWeight: 600 }}>Referred to Higher Facility</span><label className="toggle"><input type="checkbox" checked={form.referral} onChange={e => set('referral', e.target.checked)} /><span className="toggle-slider" /></label></div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginBottom: 24 }}>💾 Save Screening</button>
        </form>
      </div>
    </div>
  );
}
