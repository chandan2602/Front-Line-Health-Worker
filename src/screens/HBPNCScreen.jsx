import React, { useState } from 'react';
import { getData, appendData } from '../utils/storage';
import PatientSearchBar from '../components/PatientSearchBar';

function BackIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 5l-7 7 7 7"/>
    </svg>
  );
}

const visitDays = [
  { label: '1st Day', day: 1 },
  { label: '3rd Day', day: 3 },
  { label: '7th Day', day: 7 },
  { label: '14th Day', day: 14 },
  { label: '28th Day', day: 28 },
  { label: '42nd Day', day: 42 },
];

const dangerSignsOptions = [
  'Not feeding well', 'Convulsions', 'Fast breathing',
  'Chest in-drawing', 'Fever (>38°C)', 'Hypothermia (<35.5°C)',
  'Jaundice', 'Umbilical infection', 'Skin pustules', 'None'
];

function HBPNCScreen({ onBack }) {
  const pregnantWomen = getData('pregnantWomen') || [];
  const [selectedPW, setSelectedPW] = useState('');
  const [activeVisit, setActiveVisit] = useState(0);
  const [form, setForm] = useState({
    visitDate: '',
    newbornWeight: '',
    temperature: '',
    breastfeeding: '',
    ifaGiven: false,
    vitaminAGiven: false,
    dangerSigns: [],
    referral: false,
    referralFacility: '',
    motherCondition: '',
    notes: ''
  });
  const [saved, setSaved] = useState(false);

  const toggleDangerSign = (s) => {
    setForm(f => ({
      ...f,
      dangerSigns: f.dangerSigns.includes(s)
        ? f.dangerSigns.filter(x => x !== s)
        : [...f.dangerSigns, s]
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const pw = pregnantWomen.find(p => String(p.id) === String(selectedPW));
    appendData('hbpncVisits', {
      ...form,
      visitDay: visitDays[activeVisit].day,
      patientId: selectedPW,
      patientName: pw?.name || '',
      recordedAt: new Date().toISOString()
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      {/* App Bar */}
      <div style={{ background: 'var(--primary)', display: 'flex', alignItems: 'center', padding: '12px 16px', gap: 12, flexShrink: 0 }}>
        <button className="app-bar-icon-btn" onClick={onBack}><BackIcon /></button>
        <span style={{ flex: 1, fontSize: 17, fontWeight: 700, color: 'white', textAlign: 'center' }}>HBPNC / HBNC</span>
        <div style={{ width: 30 }} />
      </div>

      {/* Info Banner */}
      <div style={{ background: 'rgba(27,79,155,0.08)', padding: '10px 16px', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600 }}>
          🏠 Home Based Post Natal Care · Newborn Care
        </p>
      </div>

      <div className="screen-content">
        {saved && (
          <div style={{ background: '#DCFCE7', border: '1px solid #16A34A', borderRadius: 12, padding: '12px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 18 }}>✅</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#16A34A' }}>HBPNC visit saved successfully!</span>
          </div>
        )}

        <PatientSearchBar onPatientFound={p => {
          const match = pregnantWomen.find(pw => pw.name === p.name || pw.mobile === p.mobile);
          if (match) setSelectedPW(String(match.id));
        }} />
        <form onSubmit={handleSave}>
          {/* Select Patient */}
          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Select Patient</p>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Mother's Name <span className="required">*</span></label>
              <select className="form-input" value={selectedPW} onChange={e => setSelectedPW(e.target.value)} required>
                <option value="">-- Select Mother --</option>
                {pregnantWomen.map(pw => (
                  <option key={pw.id} value={pw.id}>{pw.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Visit Day Selector */}
          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Visit Day</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {visitDays.map((v, i) => (
                <button
                  key={v.day} type="button"
                  onClick={() => setActiveVisit(i)}
                  style={{
                    padding: '8px 14px', borderRadius: 20, border: '2px solid',
                    borderColor: activeVisit === i ? 'var(--primary)' : 'var(--border)',
                    background: activeVisit === i ? 'var(--primary)' : 'white',
                    color: activeVisit === i ? 'white' : 'var(--text-secondary)',
                    fontWeight: 600, fontSize: 12, cursor: 'pointer', fontFamily: 'var(--font)'
                  }}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          {/* Newborn Assessment */}
          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Newborn Assessment</p>

            <div className="form-group">
              <label className="form-label">Visit Date <span className="required">*</span></label>
              <input type="date" className="form-input" value={form.visitDate} onChange={e => setForm(f => ({ ...f, visitDate: e.target.value }))} required />
            </div>

            <div className="row-2col">
              <div className="form-group">
                <label className="form-label">Weight (grams)</label>
                <input type="number" className="form-input" placeholder="e.g. 2900" value={form.newbornWeight} onChange={e => setForm(f => ({ ...f, newbornWeight: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Temperature (°C)</label>
                <input type="number" step="0.1" className="form-input" placeholder="e.g. 36.8" value={form.temperature} onChange={e => setForm(f => ({ ...f, temperature: e.target.value }))} />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Breastfeeding Status</label>
              <div style={{ display: 'flex', gap: 10 }}>
                {['Exclusive', 'Partial', 'Not Feeding'].map(opt => (
                  <button key={opt} type="button"
                    onClick={() => setForm(f => ({ ...f, breastfeeding: opt }))}
                    style={{
                      flex: 1, padding: '9px 4px', borderRadius: 10, border: '2px solid',
                      borderColor: form.breastfeeding === opt ? 'var(--primary)' : 'var(--border)',
                      background: form.breastfeeding === opt ? 'rgba(27,79,155,0.08)' : 'white',
                      color: form.breastfeeding === opt ? 'var(--primary)' : 'var(--text-secondary)',
                      fontWeight: 600, fontSize: 11, cursor: 'pointer', fontFamily: 'var(--font)'
                    }}
                  >{opt}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Danger Signs */}
          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>⚠️ Danger Signs (Newborn)</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {dangerSignsOptions.map(s => (
                <button key={s} type="button"
                  className={`chip ${form.dangerSigns.includes(s) ? 'selected' : ''}`}
                  style={form.dangerSigns.includes(s) && s !== 'None' ? { background: '#EF4444', borderColor: '#EF4444' } : {}}
                  onClick={() => toggleDangerSign(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Interventions */}
          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Interventions</p>

            <div className="toggle-wrapper" style={{ marginBottom: 10 }}>
              <span className="toggle-label">IFA Tablets Given (Mother)</span>
              <label className="toggle">
                <input type="checkbox" checked={form.ifaGiven} onChange={e => setForm(f => ({ ...f, ifaGiven: e.target.checked }))} />
                <span className="toggle-slider" />
              </label>
            </div>

            <div className="toggle-wrapper" style={{ marginBottom: 10 }}>
              <span className="toggle-label">Vitamin A Given (Newborn)</span>
              <label className="toggle">
                <input type="checkbox" checked={form.vitaminAGiven} onChange={e => setForm(f => ({ ...f, vitaminAGiven: e.target.checked }))} />
                <span className="toggle-slider" />
              </label>
            </div>

            <div className="toggle-wrapper">
              <span className="toggle-label">Referred to Higher Facility</span>
              <label className="toggle">
                <input type="checkbox" checked={form.referral} onChange={e => setForm(f => ({ ...f, referral: e.target.checked }))} />
                <span className="toggle-slider" />
              </label>
            </div>

            {form.referral && (
              <div className="form-group" style={{ marginTop: 12, marginBottom: 0 }}>
                <label className="form-label">Referral Facility</label>
                <select className="form-input" value={form.referralFacility} onChange={e => setForm(f => ({ ...f, referralFacility: e.target.value }))}>
                  <option value="">Select facility</option>
                  <option>PHC</option>
                  <option>CHC</option>
                  <option>District Hospital</option>
                  <option>Medical College</option>
                </select>
              </div>
            )}
          </div>

          {/* Mother's Condition */}
          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Mother's Condition</p>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Post-Natal Condition</label>
              <div style={{ display: 'flex', gap: 10 }}>
                {['Good', 'Fair', 'Critical'].map(opt => (
                  <button key={opt} type="button"
                    onClick={() => setForm(f => ({ ...f, motherCondition: opt }))}
                    style={{
                      flex: 1, padding: '9px', borderRadius: 10, border: '2px solid',
                      borderColor: form.motherCondition === opt ? (opt === 'Good' ? '#16A34A' : opt === 'Fair' ? '#B45309' : '#DC2626') : 'var(--border)',
                      background: form.motherCondition === opt ? (opt === 'Good' ? 'rgba(22,163,74,0.1)' : opt === 'Fair' ? 'rgba(180,83,9,0.1)' : 'rgba(220,38,38,0.1)') : 'white',
                      color: form.motherCondition === opt ? (opt === 'Good' ? '#16A34A' : opt === 'Fair' ? '#B45309' : '#DC2626') : 'var(--text-secondary)',
                      fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font)'
                    }}
                  >{opt}</button>
                ))}
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginBottom: 24 }}>
            💾 Save HBPNC Visit
          </button>
        </form>
      </div>
    </div>
  );
}

export default HBPNCScreen;
