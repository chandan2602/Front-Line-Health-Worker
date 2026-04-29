import React, { useState } from 'react';
import { getData, appendData } from '../utils/storage';

function BackIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 5l-7 7 7 7"/>
    </svg>
  );
}

const diseaseOptions = [
  'Acute Diarrhoeal Disease', 'Cholera', 'Typhoid', 'Malaria (P.falciparum)',
  'Malaria (P.vivax)', 'Dengue', 'Chikungunya', 'Acute Encephalitis Syndrome',
  'Japanese Encephalitis', 'Measles', 'Acute Flaccid Paralysis', 'Rabies',
  'Leptospirosis', 'Scrub Typhus', 'COVID-19', 'Influenza-like Illness', 'Other'
];

const symptomOptions = [
  'Fever', 'Diarrhoea', 'Vomiting', 'Rash', 'Jaundice',
  'Breathlessness', 'Convulsions', 'Altered Sensorium', 'Bleeding', 'Cough'
];

function SurveillanceScreen({ onBack }) {
  const user = getData('user') || {};
  const [activeTab, setActiveTab] = useState('sick');

  // Sick Person Form
  const [sickForm, setSickForm] = useState({
    name: '', age: '', gender: '', village: '',
    onsetDate: '', reportDate: '',
    disease: '', symptoms: [],
    hospitalized: false, hospital: '',
    outcome: '', notes: ''
  });

  // Death Report Form
  const [deathForm, setDeathForm] = useState({
    name: '', age: '', gender: '', village: '',
    deathDate: '', causeOfDeath: '',
    placeOfDeath: '', investigationDone: false, notes: ''
  });

  // Event Alert Form
  const [alertForm, setAlertForm] = useState({
    alertType: '', location: '', date: '',
    affectedCount: '', description: '', geoTag: ''
  });

  const [saved, setSaved] = useState(false);

  const toggleSymptom = (s) => {
    setSickForm(f => ({
      ...f,
      symptoms: f.symptoms.includes(s) ? f.symptoms.filter(x => x !== s) : [...f.symptoms, s]
    }));
  };

  const handleSaveSick = (e) => {
    e.preventDefault();
    appendData('sickReports', { ...sickForm, reportedBy: user.name, recordedAt: new Date().toISOString() });
    setSaved(true); setTimeout(() => setSaved(false), 2500);
  };

  const handleSaveDeath = (e) => {
    e.preventDefault();
    appendData('deathReports', { ...deathForm, reportedBy: user.name, recordedAt: new Date().toISOString() });
    setSaved(true); setTimeout(() => setSaved(false), 2500);
  };

  const handleSaveAlert = (e) => {
    e.preventDefault();
    appendData('eventAlerts', { ...alertForm, reportedBy: user.name, recordedAt: new Date().toISOString() });
    setSaved(true); setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      {/* App Bar */}
      <div style={{ background: 'var(--primary)', display: 'flex', alignItems: 'center', padding: '12px 16px', gap: 12, flexShrink: 0 }}>
        <button className="app-bar-icon-btn" onClick={onBack}><BackIcon /></button>
        <span style={{ flex: 1, fontSize: 17, fontWeight: 700, color: 'white', textAlign: 'center' }}>Surveillance</span>
        <div style={{ width: 30 }} />
      </div>

      {/* Tabs */}
      <div style={{ background: 'white', padding: '10px 16px', borderBottom: '1px solid var(--border)' }}>
        <div className="tabs" style={{ marginBottom: 0 }}>
          {[
            { key: 'sick', label: '🤒 Sick Person' },
            { key: 'death', label: '🕊️ Death Report' },
            { key: 'alert', label: '🚨 Event Alert' }
          ].map(t => (
            <button key={t.key} className={`tab-btn ${activeTab === t.key ? 'active' : ''}`} onClick={() => setActiveTab(t.key)}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="screen-content">
        {saved && (
          <div style={{ background: '#DCFCE7', border: '1px solid #16A34A', borderRadius: 12, padding: '12px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 18 }}>✅</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#16A34A' }}>Report submitted successfully!</span>
          </div>
        )}

        {/* SICK PERSON TAB */}
        {activeTab === 'sick' && (
          <form onSubmit={handleSaveSick}>
            <div className="card" style={{ marginBottom: 14 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Patient Details</p>
              <div className="form-group">
                <label className="form-label">Patient Name <span className="required">*</span></label>
                <input type="text" className="form-input" placeholder="Full name" value={sickForm.name} onChange={e => setSickForm(f => ({ ...f, name: e.target.value }))} required />
              </div>
              <div className="row-2col">
                <div className="form-group">
                  <label className="form-label">Age</label>
                  <input type="number" className="form-input" placeholder="Years" value={sickForm.age} onChange={e => setSickForm(f => ({ ...f, age: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Gender</label>
                  <select className="form-input" value={sickForm.gender} onChange={e => setSickForm(f => ({ ...f, gender: e.target.value }))}>
                    <option value="">Select</option>
                    <option>Male</option><option>Female</option><option>Other</option>
                  </select>
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Village / Ward</label>
                <input type="text" className="form-input" placeholder="Village name" value={sickForm.village} onChange={e => setSickForm(f => ({ ...f, village: e.target.value }))} />
              </div>
            </div>

            <div className="card" style={{ marginBottom: 14 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Disease Details</p>
              <div className="row-2col">
                <div className="form-group">
                  <label className="form-label">Onset Date</label>
                  <input type="date" className="form-input" value={sickForm.onsetDate} onChange={e => setSickForm(f => ({ ...f, onsetDate: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Report Date</label>
                  <input type="date" className="form-input" value={sickForm.reportDate} onChange={e => setSickForm(f => ({ ...f, reportDate: e.target.value }))} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Suspected Disease <span className="required">*</span></label>
                <select className="form-input" value={sickForm.disease} onChange={e => setSickForm(f => ({ ...f, disease: e.target.value }))} required>
                  <option value="">Select disease</option>
                  {diseaseOptions.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Symptoms</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
                  {symptomOptions.map(s => (
                    <button key={s} type="button"
                      className={`chip ${sickForm.symptoms.includes(s) ? 'selected' : ''}`}
                      onClick={() => toggleSymptom(s)}
                    >{s}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className="card" style={{ marginBottom: 14 }}>
              <div className="toggle-wrapper" style={{ marginBottom: 10 }}>
                <span className="toggle-label">Hospitalized</span>
                <label className="toggle">
                  <input type="checkbox" checked={sickForm.hospitalized} onChange={e => setSickForm(f => ({ ...f, hospitalized: e.target.checked }))} />
                  <span className="toggle-slider" />
                </label>
              </div>
              {sickForm.hospitalized && (
                <div className="form-group">
                  <label className="form-label">Hospital Name</label>
                  <input type="text" className="form-input" placeholder="Hospital / facility name" value={sickForm.hospital} onChange={e => setSickForm(f => ({ ...f, hospital: e.target.value }))} />
                </div>
              )}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Outcome</label>
                <select className="form-input" value={sickForm.outcome} onChange={e => setSickForm(f => ({ ...f, outcome: e.target.value }))}>
                  <option value="">Select outcome</option>
                  <option>Recovered</option><option>Under Treatment</option><option>Referred</option><option>Deceased</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginBottom: 24 }}>
              📤 Submit Sick Person Report
            </button>
          </form>
        )}

        {/* DEATH REPORT TAB */}
        {activeTab === 'death' && (
          <form onSubmit={handleSaveDeath}>
            <div className="card" style={{ marginBottom: 14 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Deceased Details</p>
              <div className="form-group">
                <label className="form-label">Name of Deceased <span className="required">*</span></label>
                <input type="text" className="form-input" placeholder="Full name" value={deathForm.name} onChange={e => setDeathForm(f => ({ ...f, name: e.target.value }))} required />
              </div>
              <div className="row-2col">
                <div className="form-group">
                  <label className="form-label">Age</label>
                  <input type="number" className="form-input" placeholder="Years" value={deathForm.age} onChange={e => setDeathForm(f => ({ ...f, age: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Gender</label>
                  <select className="form-input" value={deathForm.gender} onChange={e => setDeathForm(f => ({ ...f, gender: e.target.value }))}>
                    <option value="">Select</option>
                    <option>Male</option><option>Female</option><option>Other</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Village / Ward</label>
                <input type="text" className="form-input" placeholder="Village name" value={deathForm.village} onChange={e => setDeathForm(f => ({ ...f, village: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Date of Death <span className="required">*</span></label>
                <input type="date" className="form-input" value={deathForm.deathDate} onChange={e => setDeathForm(f => ({ ...f, deathDate: e.target.value }))} required />
              </div>
              <div className="form-group">
                <label className="form-label">Cause of Death</label>
                <input type="text" className="form-input" placeholder="Suspected / confirmed cause" value={deathForm.causeOfDeath} onChange={e => setDeathForm(f => ({ ...f, causeOfDeath: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Place of Death</label>
                <select className="form-input" value={deathForm.placeOfDeath} onChange={e => setDeathForm(f => ({ ...f, placeOfDeath: e.target.value }))}>
                  <option value="">Select</option>
                  <option>Home</option><option>PHC</option><option>CHC</option>
                  <option>District Hospital</option><option>Private Hospital</option><option>In Transit</option>
                </select>
              </div>
              <div className="toggle-wrapper" style={{ marginBottom: 0 }}>
                <span className="toggle-label">Investigation Done</span>
                <label className="toggle">
                  <input type="checkbox" checked={deathForm.investigationDone} onChange={e => setDeathForm(f => ({ ...f, investigationDone: e.target.checked }))} />
                  <span className="toggle-slider" />
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginBottom: 24 }}>
              📤 Submit Death Report
            </button>
          </form>
        )}

        {/* EVENT ALERT TAB */}
        {activeTab === 'alert' && (
          <form onSubmit={handleSaveAlert}>
            <div className="card" style={{ marginBottom: 14 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Event Alert Details</p>

              <div className="form-group">
                <label className="form-label">Alert Type <span className="required">*</span></label>
                <select className="form-input" value={alertForm.alertType} onChange={e => setAlertForm(f => ({ ...f, alertType: e.target.value }))} required>
                  <option value="">Select alert type</option>
                  <option>Disease Outbreak</option>
                  <option>Cluster of Cases</option>
                  <option>Unusual Event</option>
                  <option>Environmental Hazard</option>
                  <option>Food Poisoning</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Location <span className="required">*</span></label>
                <input type="text" className="form-input" placeholder="Village / area name" value={alertForm.location} onChange={e => setAlertForm(f => ({ ...f, location: e.target.value }))} required />
              </div>

              <div className="form-group">
                <label className="form-label">Date of Event</label>
                <input type="date" className="form-input" value={alertForm.date} onChange={e => setAlertForm(f => ({ ...f, date: e.target.value }))} />
              </div>

              <div className="form-group">
                <label className="form-label">Number of Affected Persons</label>
                <input type="number" className="form-input" placeholder="0" value={alertForm.affectedCount} onChange={e => setAlertForm(f => ({ ...f, affectedCount: e.target.value }))} />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Description <span className="required">*</span></label>
                <textarea
                  className="form-input" rows={4}
                  placeholder="Describe the event in detail..."
                  value={alertForm.description}
                  onChange={e => setAlertForm(f => ({ ...f, description: e.target.value }))}
                  style={{ resize: 'none' }}
                  required
                />
              </div>
            </div>

            {/* Geo Tag */}
            <div className="card" style={{ marginBottom: 14 }}>
              <button
                type="button"
                className="btn btn-outline"
                style={{ marginBottom: 0 }}
                onClick={() => setAlertForm(f => ({ ...f, geoTag: '23.2599° N, 77.4126° E' }))}
              >
                📍 {alertForm.geoTag || 'Capture GPS Location'}
              </button>
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginBottom: 24 }}>
              🚨 Submit Event Alert
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default SurveillanceScreen;
