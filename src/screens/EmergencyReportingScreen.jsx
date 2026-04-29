import React, { useState } from 'react';
import { appendData } from '../utils/storage';

function BackIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>;
}

export default function EmergencyReportingScreen({ onBack }) {
  const [form, setForm] = useState({ patientName: '', age: '', gender: '', mobile: '', village: '', reportTime: '', emergencyType: '', description: '', vitals: '', firstAidGiven: false, firstAidDetails: '', ambulanceCalled: false, ambulanceTime: '', referralFacility: '', escortedBy: '', outcome: '', notes: '' });
  const [saved, setSaved] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const emergencyTypes = ['Road Traffic Accident', 'Snake Bite', 'Drowning', 'Burns', 'Poisoning', 'Cardiac Emergency', 'Stroke', 'Obstetric Emergency', 'Seizure', 'Severe Injury', 'Other'];

  const handleSave = (e) => {
    e.preventDefault();
    appendData('emergencyReports', { ...form, recordedAt: new Date().toISOString() });
    setSaved(true); setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <div style={{ background: '#DC2626', display: 'flex', alignItems: 'center', padding: '12px 16px', gap: 12, flexShrink: 0 }}>
        <button className="app-bar-icon-btn" onClick={onBack}><BackIcon /></button>
        <span style={{ flex: 1, fontSize: 17, fontWeight: 700, color: 'white', textAlign: 'center' }}>🚨 Emergency Reporting</span>
        <div style={{ width: 30 }} />
      </div>

      {/* Emergency Contacts */}
      <div style={{ background: '#FEE2E2', padding: '10px 16px', borderBottom: '1px solid #FECACA' }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: '#DC2626', marginBottom: 6 }}>📞 Emergency Contacts</p>
        <div style={{ display: 'flex', gap: 8 }}>
          {[['108', 'Ambulance'], ['102', 'Maternal'], ['1800-180-1104', 'FLHW Help']].map(([num, label]) => (
            <div key={num} style={{ flex: 1, background: 'white', borderRadius: 8, padding: '6px', textAlign: 'center', border: '1px solid #FECACA' }}>
              <p style={{ fontSize: 14, fontWeight: 800, color: '#DC2626' }}>{num}</p>
              <p style={{ fontSize: 10, color: 'var(--text-secondary)' }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="screen-content">
        {saved && <div style={{ background: '#DCFCE7', border: '1px solid #16A34A', borderRadius: 12, padding: '12px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}><span>✅</span><span style={{ fontSize: 14, fontWeight: 600, color: '#16A34A' }}>Emergency report saved!</span></div>}
        <form onSubmit={handleSave}>
          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Patient Details</p>
            <div className="form-group"><label className="form-label">Patient Name <span className="required">*</span></label><input type="text" className="form-input" placeholder="Full name / Unknown" value={form.patientName} onChange={e => set('patientName', e.target.value)} required /></div>
            <div className="row-2col">
              <div className="form-group"><label className="form-label">Age (approx)</label><input type="number" className="form-input" placeholder="Years" value={form.age} onChange={e => set('age', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Gender</label><select className="form-input" value={form.gender} onChange={e => set('gender', e.target.value)}><option value="">Select</option><option>Male</option><option>Female</option><option>Unknown</option></select></div>
            </div>
            <div className="form-group"><label className="form-label">Mobile / Contact</label><input type="tel" className="form-input" placeholder="Patient/relative mobile" value={form.mobile} onChange={e => set('mobile', e.target.value)} /></div>
            <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Location / Village</label><input type="text" className="form-input" placeholder="Location of emergency" value={form.village} onChange={e => set('village', e.target.value)} /></div>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Emergency Details</p>
            <div className="form-group"><label className="form-label">Report Time <span className="required">*</span></label><input type="datetime-local" className="form-input" value={form.reportTime} onChange={e => set('reportTime', e.target.value)} required /></div>
            <div className="form-group">
              <label className="form-label">Emergency Type <span className="required">*</span></label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {emergencyTypes.map(t => <button key={t} type="button" className={`chip ${form.emergencyType === t ? 'selected' : ''}`} style={form.emergencyType === t ? { background: '#DC2626', borderColor: '#DC2626' } : {}} onClick={() => set('emergencyType', t)}>{t}</button>)}
              </div>
            </div>
            <div className="form-group"><label className="form-label">Description <span className="required">*</span></label><textarea className="form-input" rows={3} placeholder="Describe the emergency..." value={form.description} onChange={e => set('description', e.target.value)} style={{ resize: 'none' }} required /></div>
            <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Vitals (if available)</label><input type="text" className="form-input" placeholder="BP, Pulse, SpO2, etc." value={form.vitals} onChange={e => set('vitals', e.target.value)} /></div>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Response Actions</p>
            <div className="toggle-wrapper" style={{ marginBottom: 8 }}><span className="toggle-label" style={{ fontWeight: 600 }}>First Aid Given</span><label className="toggle"><input type="checkbox" checked={form.firstAidGiven} onChange={e => set('firstAidGiven', e.target.checked)} /><span className="toggle-slider" /></label></div>
            {form.firstAidGiven && <div className="form-group"><label className="form-label">First Aid Details</label><input type="text" className="form-input" placeholder="What first aid was given" value={form.firstAidDetails} onChange={e => set('firstAidDetails', e.target.value)} /></div>}
            <div className="toggle-wrapper" style={{ marginBottom: 8 }}><span className="toggle-label" style={{ fontWeight: 600 }}>Ambulance Called (108)</span><label className="toggle"><input type="checkbox" checked={form.ambulanceCalled} onChange={e => set('ambulanceCalled', e.target.checked)} /><span className="toggle-slider" /></label></div>
            {form.ambulanceCalled && <div className="form-group"><label className="form-label">Ambulance Call Time</label><input type="time" className="form-input" value={form.ambulanceTime} onChange={e => set('ambulanceTime', e.target.value)} /></div>}
            <div className="form-group"><label className="form-label">Referred to Facility</label><select className="form-input" value={form.referralFacility} onChange={e => set('referralFacility', e.target.value)}><option value="">Select</option><option>PHC</option><option>CHC</option><option>District Hospital</option><option>Medical College</option><option>Private Hospital</option></select></div>
            <div className="form-group"><label className="form-label">Outcome</label><select className="form-input" value={form.outcome} onChange={e => set('outcome', e.target.value)}><option value="">Select</option><option>Referred & Stable</option><option>Treated at Site</option><option>Deceased at Site</option><option>Unknown</option></select></div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ background: '#DC2626', marginBottom: 24 }}>🚨 Submit Emergency Report</button>
        </form>
      </div>
    </div>
  );
}
