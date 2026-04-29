import React, { useState } from 'react';
import { getData, appendData } from '../utils/storage';

function BackIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>;
}

export default function PalliativeCarePlanScreen({ onBack }) {
  const patients = getData('palliativePatients') || [];
  const [selectedPatient, setSelectedPatient] = useState('');
  const [form, setForm] = useState({ visitDate: '', painManagement: '', medications: '', symptomControl: [], emotionalSupport: false, spiritualSupport: false, familyCounseling: false, nutritionSupport: false, woundCare: false, oxygenTherapy: false, nextVisitDate: '', goals: '', notes: '' });
  const [saved, setSaved] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const symptoms = ['Pain', 'Nausea', 'Vomiting', 'Breathlessness', 'Fatigue', 'Constipation', 'Anxiety', 'Depression', 'Insomnia', 'Loss of Appetite'];
  const toggleSymptom = (s) => setForm(f => ({ ...f, symptomControl: f.symptomControl.includes(s) ? f.symptomControl.filter(x => x !== s) : [...f.symptomControl, s] }));

  const handleSave = (e) => {
    e.preventDefault();
    appendData('palliativeCarePlans', { ...form, patientId: selectedPatient, recordedAt: new Date().toISOString() });
    setSaved(true); setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <div style={{ background: 'var(--primary)', display: 'flex', alignItems: 'center', padding: '12px 16px', gap: 12, flexShrink: 0 }}>
        <button className="app-bar-icon-btn" onClick={onBack}><BackIcon /></button>
        <span style={{ flex: 1, fontSize: 17, fontWeight: 700, color: 'white', textAlign: 'center' }}>Palliative Care Plan</span>
        <div style={{ width: 30 }} />
      </div>
      <div className="screen-content">
        {saved && <div style={{ background: '#DCFCE7', border: '1px solid #16A34A', borderRadius: 12, padding: '12px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}><span>✅</span><span style={{ fontSize: 14, fontWeight: 600, color: '#16A34A' }}>Care plan saved!</span></div>}
        <form onSubmit={handleSave}>
          <div className="card" style={{ marginBottom: 14 }}>
            <label className="form-label">Select Patient <span className="required">*</span></label>
            <select className="form-input" value={selectedPatient} onChange={e => setSelectedPatient(e.target.value)} required>
              <option value="">-- Select Patient --</option>
              {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              <option value="demo">Shyam Lal (Demo, Cancer Stage IV)</option>
            </select>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Visit Details</p>
            <div className="row-2col">
              <div className="form-group"><label className="form-label">Visit Date <span className="required">*</span></label><input type="date" className="form-input" value={form.visitDate} onChange={e => set('visitDate', e.target.value)} required /></div>
              <div className="form-group"><label className="form-label">Next Visit</label><input type="date" className="form-input" value={form.nextVisitDate} onChange={e => set('nextVisitDate', e.target.value)} /></div>
            </div>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Symptom Management</p>
            <label className="form-label" style={{ marginBottom: 8, display: 'block' }}>Symptoms Being Managed</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
              {symptoms.map(s => <button key={s} type="button" className={`chip ${form.symptomControl.includes(s) ? 'selected' : ''}`} onClick={() => toggleSymptom(s)}>{s}</button>)}
            </div>
            <div className="form-group"><label className="form-label">Pain Management Plan</label><select className="form-input" value={form.painManagement} onChange={e => set('painManagement', e.target.value)}><option value="">Select</option><option>Non-pharmacological</option><option>Step 1 (Non-opioid)</option><option>Step 2 (Mild opioid)</option><option>Step 3 (Strong opioid)</option></select></div>
            <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Medications Prescribed</label><textarea className="form-input" rows={2} placeholder="List medications..." value={form.medications} onChange={e => set('medications', e.target.value)} style={{ resize: 'none' }} /></div>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Holistic Care</p>
            {[['emotionalSupport', 'Emotional Support Provided'], ['spiritualSupport', 'Spiritual Support'], ['familyCounseling', 'Family Counseling Done'], ['nutritionSupport', 'Nutrition Support'], ['woundCare', 'Wound Care Done'], ['oxygenTherapy', 'Oxygen Therapy']].map(([key, label]) => (
              <div key={key} className="toggle-wrapper" style={{ marginBottom: 8 }}>
                <span className="toggle-label">{label}</span>
                <label className="toggle"><input type="checkbox" checked={form[key]} onChange={e => set(key, e.target.checked)} /><span className="toggle-slider" /></label>
              </div>
            ))}
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Care Goals / Notes</label><textarea className="form-input" rows={3} placeholder="Goals of care, patient wishes..." value={form.goals} onChange={e => set('goals', e.target.value)} style={{ resize: 'none' }} /></div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginBottom: 24 }}>💾 Save Care Plan</button>
        </form>
      </div>
    </div>
  );
}
