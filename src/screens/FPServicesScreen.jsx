import React, { useState } from 'react';
import { appendData } from '../utils/storage';
import PatientSearchBar from '../components/PatientSearchBar';

function BackIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>;
}

export default function FPServicesScreen({ onBack }) {
  const [form, setForm] = useState({ clientName: '', age: '', mobile: '', village: '', serviceDate: '', serviceType: '', methodProvided: '', quantity: '', sideEffects: false, sideEffectDetails: '', followUpDate: '', notes: '' });
  const [saved, setSaved] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = (e) => {
    e.preventDefault();
    appendData('fpServices', { ...form, recordedAt: new Date().toISOString() });
    setSaved(true); setTimeout(() => setSaved(false), 2500);
  };

  const serviceTypes = ['New Acceptor', 'Continuing User', 'Switching Method', 'Discontinuation', 'Follow-up'];
  const methods = ['Condom (Male)', 'Condom (Female)', 'OCP', 'ECP', 'IUCD Insertion', 'IUCD Removal', 'Injectable (Antara)', 'Sterilization Referral'];

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <div style={{ background: 'var(--primary)', display: 'flex', alignItems: 'center', padding: '12px 16px', gap: 12, flexShrink: 0 }}>
        <button className="app-bar-icon-btn" onClick={onBack}><BackIcon /></button>
        <span style={{ flex: 1, fontSize: 17, fontWeight: 700, color: 'white', textAlign: 'center' }}>FP Services</span>
        <div style={{ width: 30 }} />
      </div>
      <div style={{ background: 'rgba(27,79,155,0.08)', padding: '8px 16px', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600 }}>🏥 Family Planning Services Delivery</p>
      </div>
      <div className="screen-content">
        {saved && <div style={{ background: '#DCFCE7', border: '1px solid #16A34A', borderRadius: 12, padding: '12px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}><span>✅</span><span style={{ fontSize: 14, fontWeight: 600, color: '#16A34A' }}>FP service recorded!</span></div>}
        <PatientSearchBar onPatientFound={p => setForm(f => ({ ...f, clientName: p.name, age: String(p.age), mobile: p.mobile, village: p.village }))} />
        <form onSubmit={handleSave}>
          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Client Details</p>
            <div className="form-group"><label className="form-label">Client Name <span className="required">*</span></label><input type="text" className="form-input" placeholder="Full name" value={form.clientName} onChange={e => set('clientName', e.target.value)} required /></div>
            <div className="row-2col">
              <div className="form-group"><label className="form-label">Age</label><input type="number" className="form-input" placeholder="Years" value={form.age} onChange={e => set('age', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Mobile</label><input type="tel" className="form-input" placeholder="Mobile" value={form.mobile} onChange={e => set('mobile', e.target.value)} /></div>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Village</label><input type="text" className="form-input" placeholder="Village name" value={form.village} onChange={e => set('village', e.target.value)} /></div>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Service Details</p>
            <div className="form-group"><label className="form-label">Service Date <span className="required">*</span></label><input type="date" className="form-input" value={form.serviceDate} onChange={e => set('serviceDate', e.target.value)} required /></div>
            <div className="form-group">
              <label className="form-label">Service Type <span className="required">*</span></label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {serviceTypes.map(t => <button key={t} type="button" className={`chip ${form.serviceType === t ? 'selected' : ''}`} onClick={() => set('serviceType', t)}>{t}</button>)}
              </div>
            </div>
            <div className="form-group"><label className="form-label">Method Provided <span className="required">*</span></label><select className="form-input" value={form.methodProvided} onChange={e => set('methodProvided', e.target.value)} required><option value="">Select method</option>{methods.map(m => <option key={m}>{m}</option>)}</select></div>
            <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Quantity Provided</label><input type="number" className="form-input" placeholder="e.g. 3 cycles / 12 condoms" value={form.quantity} onChange={e => set('quantity', e.target.value)} /></div>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <div className="toggle-wrapper" style={{ marginBottom: 10 }}>
              <span className="toggle-label" style={{ fontWeight: 600 }}>Side Effects Reported</span>
              <label className="toggle"><input type="checkbox" checked={form.sideEffects} onChange={e => set('sideEffects', e.target.checked)} /><span className="toggle-slider" /></label>
            </div>
            {form.sideEffects && <div className="form-group"><label className="form-label">Side Effect Details</label><input type="text" className="form-input" placeholder="Describe side effects" value={form.sideEffectDetails} onChange={e => set('sideEffectDetails', e.target.value)} /></div>}
            <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Follow-up Date</label><input type="date" className="form-input" value={form.followUpDate} onChange={e => set('followUpDate', e.target.value)} /></div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginBottom: 24 }}>💾 Save FP Service</button>
        </form>
      </div>
    </div>
  );
}
