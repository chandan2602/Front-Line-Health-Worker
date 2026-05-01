import React, { useState } from 'react';
import AppBar from '../components/AppBar';
import FormField from '../components/FormField';
import BottomNav from '../components/BottomNav';
import PatientSearchBar from '../components/PatientSearchBar';
import { appendData } from '../utils/storage';

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

function NCDScreen({ onNavigate, onBack }) {
  const [activeTab, setActiveTab] = useState('A');
  const [form, setForm] = useState({
    // Part A - CBAC
    name: '',
    age: '',
    gender: '',
    waist: '',
    physicalActivity: '',
    familyHistory: false,
    smokingTobacco: false,
    alcohol: false,
    // Part B - Clinical
    bpSystolic: '',
    bpDiastolic: '',
    bloodSugar: '',
    bmi: '',
    // Part C - Exam
    oralCavity: '',
    breastExam: '',
    cervicalVIA: '',
  });
  const [saved, setSaved] = useState(false);

  const update = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const calculateRisk = () => {
    let score = 0;
    if (parseInt(form.age) >= 45) score += 2;
    if (parseInt(form.age) >= 60) score += 1;
    if (form.familyHistory) score += 2;
    if (form.smokingTobacco) score += 2;
    if (form.alcohol) score += 1;
    if (parseInt(form.waist) > 90) score += 1;
    if (form.physicalActivity === 'sedentary') score += 1;
    if (parseInt(form.bpSystolic) >= 140) score += 2;
    if (parseFloat(form.bloodSugar) >= 200) score += 2;
    if (parseFloat(form.bmi) >= 30) score += 1;
    return score;
  };

  const getRiskLevel = (score) => {
    if (score <= 3) return { level: 'Low', class: 'low', color: 'var(--success)' };
    if (score <= 6) return { level: 'Medium', class: 'medium', color: '#B45309' };
    return { level: 'High', class: 'high', color: 'var(--danger)' };
  };

  const score = calculateRisk();
  const risk = getRiskLevel(score);

  const handleSubmit = () => {
    appendData('ncdScreenings', { ...form, score, riskLevel: risk.level });
    setSaved(true);
    setTimeout(() => { setSaved(false); }, 2000);
  };

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <AppBar title="NCD Screening" onBack={onBack} />

      <div className="screen-content">
        <PatientSearchBar onPatientFound={p => update('name', p.name) || setForm(f => ({ ...f, name: p.name, age: String(p.age), gender: p.gender }))} />
        {/* CBAC Tabs */}
        <div className="tabs">
          {['A', 'B', 'C'].map(tab => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              Part {tab}
            </button>
          ))}
        </div>

        {/* Part A */}
        {activeTab === 'A' && (
          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              📋 Part A — CBAC Score
            </p>

            <FormField label="Patient Name" required>
              <input type="text" className="form-input" placeholder="Full name"
                value={form.name} onChange={e => update('name', e.target.value)} />
            </FormField>

            <div className="row-2col">
              <FormField label="Age (years)" required>
                <input type="number" className="form-input" placeholder="e.g. 45"
                  value={form.age} onChange={e => update('age', e.target.value)} />
              </FormField>
              <FormField label="Gender" required>
                <select className="form-input" value={form.gender} onChange={e => update('gender', e.target.value)}>
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </FormField>
            </div>

            <FormField label="Waist Circumference (cm)">
              <input type="number" className="form-input" placeholder="e.g. 88"
                value={form.waist} onChange={e => update('waist', e.target.value)} />
            </FormField>

            <FormField label="Physical Activity Level">
              <select className="form-input" value={form.physicalActivity} onChange={e => update('physicalActivity', e.target.value)}>
                <option value="">Select</option>
                <option value="active">Active (30+ min/day)</option>
                <option value="moderate">Moderate</option>
                <option value="sedentary">Sedentary</option>
              </select>
            </FormField>

            <ToggleSwitch checked={form.familyHistory} onChange={v => update('familyHistory', v)} label="Family History of Diabetes/HTN/Cancer" />
            <ToggleSwitch checked={form.smokingTobacco} onChange={v => update('smokingTobacco', v)} label="Smoking / Tobacco Use" />
            <ToggleSwitch checked={form.alcohol} onChange={v => update('alcohol', v)} label="Alcohol Consumption" />

            <button className="btn btn-primary" style={{ marginTop: 8 }} onClick={() => setActiveTab('B')}>
              Next: Part B →
            </button>
          </div>
        )}

        {/* Part B */}
        {activeTab === 'B' && (
          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              🩺 Part B — Clinical Measurements
            </p>

            <div className="row-2col">
              <FormField label="BP Systolic (mmHg)">
                <input type="number" className="form-input" placeholder="e.g. 130"
                  value={form.bpSystolic} onChange={e => update('bpSystolic', e.target.value)} />
              </FormField>
              <FormField label="BP Diastolic (mmHg)">
                <input type="number" className="form-input" placeholder="e.g. 85"
                  value={form.bpDiastolic} onChange={e => update('bpDiastolic', e.target.value)} />
              </FormField>
            </div>

            {form.bpSystolic >= 140 && (
              <div style={{ background: 'rgba(220,38,38,0.08)', borderRadius: 8, padding: '8px 12px', marginBottom: 10 }}>
                <p style={{ fontSize: 12, color: 'var(--danger)', fontWeight: 500 }}>⚠️ High BP detected — consider referral</p>
              </div>
            )}

            <FormField label="Blood Sugar (mg/dL)" hint="Fasting or Random">
              <input type="number" className="form-input" placeholder="e.g. 110"
                value={form.bloodSugar} onChange={e => update('bloodSugar', e.target.value)} />
            </FormField>

            <FormField label="BMI (kg/m²)" hint="Weight(kg) / Height(m)²">
              <input type="number" className="form-input" placeholder="e.g. 24.5" step="0.1"
                value={form.bmi} onChange={e => update('bmi', e.target.value)} />
            </FormField>

            <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
              <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setActiveTab('A')}>
                ← Part A
              </button>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => setActiveTab('C')}>
                Part C →
              </button>
            </div>
          </div>
        )}

        {/* Part C */}
        {activeTab === 'C' && (
          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              🔬 Part C — Physical Examination
            </p>

            <FormField label="Oral Cavity Examination">
              <select className="form-input" value={form.oralCavity} onChange={e => update('oralCavity', e.target.value)}>
                <option value="">Select Result</option>
                <option value="Normal">Normal</option>
                <option value="Suspicious">Suspicious Lesion</option>
                <option value="Abnormal">Abnormal — Refer</option>
              </select>
            </FormField>

            {form.gender === 'Female' && (
              <>
                <FormField label="Breast Examination">
                  <select className="form-input" value={form.breastExam} onChange={e => update('breastExam', e.target.value)}>
                    <option value="">Select Result</option>
                    <option value="Normal">Normal</option>
                    <option value="Lump">Lump Detected</option>
                    <option value="Discharge">Nipple Discharge</option>
                    <option value="Refer">Refer to Higher Facility</option>
                  </select>
                </FormField>

                <FormField label="Cervical Exam (VIA)" hint="Only if VIA trained">
                  <select className="form-input" value={form.cervicalVIA} onChange={e => update('cervicalVIA', e.target.value)}>
                    <option value="">Select Result</option>
                    <option value="VIA Negative">VIA Negative</option>
                    <option value="VIA Positive">VIA Positive</option>
                    <option value="Suspicious">Suspicious — Refer</option>
                    <option value="Not Done">Not Done</option>
                  </select>
                </FormField>
              </>
            )}

            {/* Risk Score Display */}
            <div className={`risk-score-display ${risk.class}`}>
              <div className="risk-score-value">{score}</div>
              <div className="risk-score-label" style={{ color: risk.color }}>
                {risk.level} Risk
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 6 }}>
                CBAC Score: {score}/15
              </p>
            </div>

            <button className="btn btn-outline" style={{ marginBottom: 10 }} onClick={() => setActiveTab('B')}>
              ← Part B
            </button>
          </div>
        )}

        {/* Submit */}
        {saved ? (
          <div style={{
            background: 'rgba(22,163,74,0.1)', border: '1px solid rgba(22,163,74,0.3)',
            borderRadius: 12, padding: '14px', textAlign: 'center',
            color: 'var(--success)', fontWeight: 600, fontSize: 15, marginBottom: 16
          }}>
            ✅ NCD Screening submitted!
          </div>
        ) : (
          <button className="btn btn-primary" onClick={handleSubmit} style={{ marginBottom: 16 }}>
            📤 Submit Screening
          </button>
        )}
      </div>

      <BottomNav active="home" onNavigate={onNavigate} />
    </div>
  );
}

export default NCDScreen;
