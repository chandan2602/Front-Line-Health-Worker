import React, { useState } from 'react';
import AppBar from '../components/AppBar';
import FormField from '../components/FormField';
import BottomNav from '../components/BottomNav';
import { appendData } from '../utils/storage';

const HRP_CONDITIONS = ['Anaemia', 'Pre-eclampsia', 'Hypertension', 'Diabetes', 'HIV', 'Previous C-Section', 'Short Stature'];

function calculateEDD(lmp) {
  if (!lmp) return '';
  const d = new Date(lmp);
  d.setDate(d.getDate() + 280);
  return d.toISOString().split('T')[0];
}

function ToggleSwitch({ checked, onChange, label }) {
  return (
    <div className="toggle-wrapper">
      <span className="toggle-label">{label}</span>
      <label className="toggle">
        <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
        <span className="toggle-slider" />
      </label>
    </div>
  );
}

function PregnantWomanScreen({ onNavigate, onBack }) {
  const [form, setForm] = useState({
    samagraId: '',
    name: '',
    husband: '',
    mobile: '',
    lmp: '',
    edd: '',
    isHRP: false,
    hrpConditions: [],
    bloodGroup: '',
    prevPregnancies: '',
    height: '',
    weight: '',
  });
  const [saved, setSaved] = useState(false);

  const update = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleLMPChange = (val) => {
    setForm(f => ({ ...f, lmp: val, edd: calculateEDD(val) }));
  };

  const toggleHRPCondition = (condition) => {
    setForm(f => ({
      ...f,
      hrpConditions: f.hrpConditions.includes(condition)
        ? f.hrpConditions.filter(c => c !== condition)
        : [...f.hrpConditions, condition]
    }));
  };

  const handleSave = () => {
    appendData('pregnantWomen', form);
    setSaved(true);
    setTimeout(() => { setSaved(false); onBack(); }, 1500);
  };

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <AppBar title="Pregnant Woman Reg." onBack={onBack} />

      <div className="screen-content">
        {/* Identity */}
        <div className="card" style={{ marginBottom: 14 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            👤 Identity Details
          </p>

          <FormField label="Samagra ID">
            <input type="text" className="form-input" placeholder="e.g. SG-001234"
              value={form.samagraId} onChange={e => update('samagraId', e.target.value)} />
          </FormField>

          <FormField label="Name of Woman" required>
            <input type="text" className="form-input" placeholder="Full name"
              value={form.name} onChange={e => update('name', e.target.value)} />
          </FormField>

          <FormField label="Name of Husband" required>
            <input type="text" className="form-input" placeholder="Husband's full name"
              value={form.husband} onChange={e => update('husband', e.target.value)} />
          </FormField>

          <FormField label="Mobile Number" required>
            <input type="tel" className="form-input" placeholder="10-digit mobile number"
              value={form.mobile} onChange={e => update('mobile', e.target.value)} maxLength={10} />
          </FormField>
        </div>

        {/* Pregnancy Details */}
        <div className="card" style={{ marginBottom: 14 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            🤰 Pregnancy Details
          </p>

          <FormField label="LMP Date (Last Menstrual Period)" required>
            <input type="date" className="form-input"
              value={form.lmp} onChange={e => handleLMPChange(e.target.value)} />
          </FormField>

          <FormField label="EDD (Expected Delivery Date)" hint="Auto-calculated from LMP">
            <input type="date" className="form-input" readOnly
              value={form.edd} />
          </FormField>

          <FormField label="Previous Pregnancies">
            <input type="number" className="form-input" placeholder="0" min="0" max="20"
              value={form.prevPregnancies} onChange={e => update('prevPregnancies', e.target.value)} />
          </FormField>

          <FormField label="Blood Group">
            <select className="form-input" value={form.bloodGroup} onChange={e => update('bloodGroup', e.target.value)}>
              <option value="">Select Blood Group</option>
              {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </FormField>

          <div className="row-2col">
            <FormField label="Height (cm)">
              <input type="number" className="form-input" placeholder="e.g. 155"
                value={form.height} onChange={e => update('height', e.target.value)} />
            </FormField>
            <FormField label="Weight (kg)">
              <input type="number" className="form-input" placeholder="e.g. 58"
                value={form.weight} onChange={e => update('weight', e.target.value)} />
            </FormField>
          </div>
        </div>

        {/* HRP Section */}
        <div className="card" style={{ marginBottom: 14 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            ⚠️ High Risk Pregnancy (HRP)
          </p>

          <ToggleSwitch
            checked={form.isHRP}
            onChange={val => update('isHRP', val)}
            label="Mark as High Risk Pregnancy"
          />

          {form.isHRP && (
            <div style={{ marginTop: 14 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 10 }}>
                HRP Conditions (select all that apply):
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {HRP_CONDITIONS.map(condition => (
                  <button
                    key={condition}
                    type="button"
                    className={`chip ${form.hrpConditions.includes(condition) ? 'selected' : ''}`}
                    onClick={() => toggleHRPCondition(condition)}
                  >
                    {condition}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Save Button */}
        {saved ? (
          <div style={{
            background: 'rgba(22,163,74,0.1)', border: '1px solid rgba(22,163,74,0.3)',
            borderRadius: 12, padding: '14px', textAlign: 'center',
            color: 'var(--success)', fontWeight: 600, fontSize: 15
          }}>
            ✅ Registration saved successfully!
          </div>
        ) : (
          <button className="btn btn-primary" onClick={handleSave}>
            💾 Register &amp; Save
          </button>
        )}
      </div>

      <BottomNav active="beneficiary" onNavigate={onNavigate} />
    </div>
  );
}

export default PregnantWomanScreen;
