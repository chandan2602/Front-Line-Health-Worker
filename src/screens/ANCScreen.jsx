import React, { useState } from 'react';
import AppBar from '../components/AppBar';
import FormField from '../components/FormField';
import BottomNav from '../components/BottomNav';
import { getData, appendData } from '../utils/storage';

function ToggleSwitch({ checked, onChange, label }) {
  return (
    <div className="toggle-wrapper" style={{ marginBottom: 10 }}>
      <span className="toggle-label">{label}</span>
      <label className="toggle">
        <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
        <span className="toggle-slider" />
      </label>
    </div>
  );
}

function ANCScreen({ onNavigate, onBack }) {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [visitTab, setVisitTab] = useState(1);
  const [form, setForm] = useState({
    visitDate: new Date().toISOString().split('T')[0],
    weeksPregnancy: '',
    bpSystolic: '',
    bpDiastolic: '',
    weight: '',
    hb: '',
    urineProtein: false,
    urineSugar: false,
    ifaGiven: false,
    ttGiven: false,
    referred: false,
    notes: '',
  });
  const [saved, setSaved] = useState(false);

  const patients = getData('pregnantWomen') || [];
  const update = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleSave = () => {
    if (!selectedPatient) return;
    appendData('ancVisits', {
      ...form,
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      visitNumber: visitTab,
    });
    setSaved(true);
    setTimeout(() => { setSaved(false); }, 2000);
  };

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <AppBar title="ANC Services" onBack={onBack} />

      <div className="screen-content">
        {/* Patient Search */}
        <div className="card" style={{ marginBottom: 14 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            🔍 Select Beneficiary
          </p>
          <FormField label="Pregnant Woman">
            <select
              className="form-input"
              value={selectedPatient?.id || ''}
              onChange={e => {
                const p = patients.find(p => p.id === parseInt(e.target.value));
                setSelectedPatient(p || null);
              }}
            >
              <option value="">-- Select Patient --</option>
              {patients.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} {p.isHRP ? '⚠️ HRP' : ''}
                </option>
              ))}
            </select>
          </FormField>

          {selectedPatient && (
            <div style={{
              background: selectedPatient.isHRP ? 'rgba(239,68,68,0.06)' : 'rgba(27,79,155,0.06)',
              border: `1px solid ${selectedPatient.isHRP ? 'rgba(239,68,68,0.2)' : 'rgba(27,79,155,0.15)'}`,
              borderRadius: 10, padding: '10px 12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>
                  {selectedPatient.name}
                </span>
                {selectedPatient.isHRP && (
                  <span className="badge badge-danger" style={{ fontSize: 10 }}>HRP</span>
                )}
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                EDD: {selectedPatient.edd || 'N/A'} · Blood Group: {selectedPatient.bloodGroup || 'N/A'}
              </p>
              {selectedPatient.isHRP && selectedPatient.hrpConditions?.length > 0 && (
                <p style={{ fontSize: 11, color: 'var(--danger)', marginTop: 4 }}>
                  ⚠️ {selectedPatient.hrpConditions.join(', ')}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Visit Tabs */}
        <div className="tabs">
          {[1, 2, 3, 4].map(n => (
            <button
              key={n}
              className={`tab-btn ${visitTab === n ? 'active' : ''}`}
              onClick={() => setVisitTab(n)}
            >
              {n === 1 ? '1st' : n === 2 ? '2nd' : n === 3 ? '3rd' : '4th'}
            </button>
          ))}
        </div>

        {/* Visit Form */}
        <div className="card" style={{ marginBottom: 14 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            📋 Visit {visitTab} Details
          </p>

          <div className="row-2col">
            <FormField label="Visit Date" required>
              <input type="date" className="form-input"
                value={form.visitDate} onChange={e => update('visitDate', e.target.value)} />
            </FormField>
            <FormField label="Weeks of Pregnancy">
              <input type="number" className="form-input" placeholder="e.g. 16"
                value={form.weeksPregnancy} onChange={e => update('weeksPregnancy', e.target.value)} />
            </FormField>
          </div>

          <div className="row-2col">
            <FormField label="BP Systolic (mmHg)">
              <input type="number" className="form-input" placeholder="e.g. 120"
                value={form.bpSystolic} onChange={e => update('bpSystolic', e.target.value)} />
            </FormField>
            <FormField label="BP Diastolic (mmHg)">
              <input type="number" className="form-input" placeholder="e.g. 80"
                value={form.bpDiastolic} onChange={e => update('bpDiastolic', e.target.value)} />
            </FormField>
          </div>

          <div className="row-2col">
            <FormField label="Weight (kg)">
              <input type="number" className="form-input" placeholder="e.g. 60"
                value={form.weight} onChange={e => update('weight', e.target.value)} />
            </FormField>
            <FormField label="Hemoglobin (g/dL)">
              <input type="number" className="form-input" placeholder="e.g. 11.5" step="0.1"
                value={form.hb} onChange={e => update('hb', e.target.value)} />
            </FormField>
          </div>
        </div>

        {/* Investigations & Interventions */}
        <div className="card" style={{ marginBottom: 14 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            💉 Investigations & Interventions
          </p>

          <ToggleSwitch checked={form.urineProtein} onChange={v => update('urineProtein', v)} label="Urine Protein (Positive)" />
          <ToggleSwitch checked={form.urineSugar} onChange={v => update('urineSugar', v)} label="Urine Sugar (Positive)" />
          <ToggleSwitch checked={form.ifaGiven} onChange={v => update('ifaGiven', v)} label="IFA Tablets Given" />
          <ToggleSwitch checked={form.ttGiven} onChange={v => update('ttGiven', v)} label="TT Vaccine Given" />
          <ToggleSwitch checked={form.referred} onChange={v => update('referred', v)} label="Referred to Higher Facility" />

          {form.referred && (
            <div style={{ marginTop: 10 }}>
              <FormField label="Referral Reason">
                <input type="text" className="form-input" placeholder="Reason for referral"
                  value={form.referralReason || ''} onChange={e => update('referralReason', e.target.value)} />
              </FormField>
            </div>
          )}
        </div>

        {/* Notes */}
        <div className="card" style={{ marginBottom: 14 }}>
          <FormField label="Clinical Notes">
            <textarea
              className="form-input"
              placeholder="Any additional observations..."
              rows={3}
              value={form.notes}
              onChange={e => update('notes', e.target.value)}
              style={{ resize: 'none' }}
            />
          </FormField>
        </div>

        {/* Save */}
        {saved ? (
          <div style={{
            background: 'rgba(22,163,74,0.1)', border: '1px solid rgba(22,163,74,0.3)',
            borderRadius: 12, padding: '14px', textAlign: 'center',
            color: 'var(--success)', fontWeight: 600, fontSize: 15, marginBottom: 16
          }}>
            ✅ ANC Visit {visitTab} saved successfully!
          </div>
        ) : (
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={!selectedPatient}
            style={{ opacity: selectedPatient ? 1 : 0.6, marginBottom: 16 }}
          >
            💾 Save ANC Visit
          </button>
        )}
      </div>

      <BottomNav active="beneficiary" onNavigate={onNavigate} />
    </div>
  );
}

export default ANCScreen;
