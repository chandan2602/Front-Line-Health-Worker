import React, { useState } from 'react';
import { appendData } from '../utils/storage';
import PatientSearchBar from '../components/PatientSearchBar';

function BackIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>;
}

export default function ECRegistrationScreen({ onBack }) {
  const [form, setForm] = useState({
    subCenter: '', village: '', asha: '',
    samagraIdWoman: '', samagraIdHusband: '', familySamagraId: '',
    nameWoman: '', nameHusband: '', abhaId: '',
    mobile: '', rchrNo: '', isOtherState: false,
    otherState: '', otherDistrict: ''
  });
  const [saved, setSaved] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = (e) => {
    e.preventDefault();
    appendData('ecRegistrations', { ...form, recordedAt: new Date().toISOString() });
    setSaved(true); setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <div style={{ background: 'var(--primary)', display: 'flex', alignItems: 'center', padding: '12px 16px', gap: 12, flexShrink: 0 }}>
        <button className="app-bar-icon-btn" onClick={onBack}><BackIcon /></button>
        <span style={{ flex: 1, fontSize: 17, fontWeight: 700, color: 'white', textAlign: 'center' }}>EC Registration</span>
        <div style={{ width: 30 }} />
      </div>
      <div style={{ background: 'rgba(27,79,155,0.08)', padding: '8px 16px', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600 }}>👫 Eligible Couple Registration</p>
      </div>
      <div className="screen-content">
        {saved && <div style={{ background: '#DCFCE7', border: '1px solid #16A34A', borderRadius: 12, padding: '12px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}><span>✅</span><span style={{ fontSize: 14, fontWeight: 600, color: '#16A34A' }}>EC Registration saved!</span></div>}
        <PatientSearchBar onPatientFound={p => setForm(f => ({ ...f, nameWoman: p.name, mobile: p.mobile, abhaId: p.abhaId, village: p.village }))} />
        <form onSubmit={handleSave}>
          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Location Details</p>
            <div className="form-group"><label className="form-label">Sub-Center / Ward <span className="required">*</span></label><select className="form-input" value={form.subCenter} onChange={e => set('subCenter', e.target.value)} required><option value="">Select Sub-Center</option><option>Ward-7 Sub-Center</option><option>Ward-12 Sub-Center</option><option>PHC Bhopal Urban</option></select></div>
            <div className="form-group"><label className="form-label">Village <span className="required">*</span></label><select className="form-input" value={form.village} onChange={e => set('village', e.target.value)} required><option value="">Select Village</option><option>Arera Colony</option><option>Kolar Road</option><option>Berasia</option></select></div>
            <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">ASHA Worker <span className="required">*</span></label><select className="form-input" value={form.asha} onChange={e => set('asha', e.target.value)} required><option value="">Select ASHA</option><option>Sunita Yadav</option><option>Rekha Bai</option><option>Meena Kumari</option></select></div>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Woman's Details</p>
            <div className="form-group"><label className="form-label">Name of Woman <span className="required">*</span></label><input type="text" className="form-input" placeholder="Full name" value={form.nameWoman} onChange={e => set('nameWoman', e.target.value)} required /></div>
            <div className="form-group"><label className="form-label">ABHA ID (Woman) <span className="required">*</span></label><input type="text" className="form-input" placeholder="e.g. SG-001234" value={form.samagraIdWoman} onChange={e => set('samagraIdWoman', e.target.value)} required /></div>
            <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">ABHA ID</label><input type="text" className="form-input" placeholder="Ayushman Bharat Health ID" value={form.abhaId} onChange={e => set('abhaId', e.target.value)} /></div>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Husband's Details</p>
            <div className="form-group"><label className="form-label">Name of Husband <span className="required">*</span></label><input type="text" className="form-input" placeholder="Full name" value={form.nameHusband} onChange={e => set('nameHusband', e.target.value)} required /></div>
            <div className="form-group"><label className="form-label">ABHA ID (Husband) <span className="required">*</span></label><input type="text" className="form-input" placeholder="e.g. SG-001235" value={form.samagraIdHusband} onChange={e => set('samagraIdHusband', e.target.value)} required /></div>
            <div className="form-group"><label className="form-label">Family ABHA ID <span className="required">*</span></label><input type="text" className="form-input" placeholder="Family identifier" value={form.familySamagraId} onChange={e => set('familySamagraId', e.target.value)} required /></div>
            <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Mobile Number</label><input type="tel" className="form-input" placeholder="10-digit mobile" value={form.mobile} onChange={e => set('mobile', e.target.value)} /></div>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <div className="toggle-wrapper">
              <span className="toggle-label" style={{ fontWeight: 600 }}>Is Other State Migrant?</span>
              <label className="toggle"><input type="checkbox" checked={form.isOtherState} onChange={e => set('isOtherState', e.target.checked)} /><span className="toggle-slider" /></label>
            </div>
            {form.isOtherState && (
              <div style={{ marginTop: 12 }}>
                <div className="form-group"><label className="form-label">State of Origin</label><select className="form-input" value={form.otherState} onChange={e => set('otherState', e.target.value)}><option value="">Select State</option><option>Uttar Pradesh</option><option>Bihar</option><option>Rajasthan</option><option>Chhattisgarh</option><option>Other</option></select></div>
                <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">District of Origin</label><input type="text" className="form-input" placeholder="District name" value={form.otherDistrict} onChange={e => set('otherDistrict', e.target.value)} /></div>
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginBottom: 24 }}>💾 Save EC Registration</button>
        </form>
      </div>
    </div>
  );
}
