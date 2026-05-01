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

function DeliveryScreen({ onBack }) {
  const pregnantWomen = getData('pregnantWomen') || [];
  const [selectedPW, setSelectedPW] = useState('');
  const [form, setForm] = useState({
    deliveryDate: '',
    deliveryTime: '',
    deliveryType: '',
    deliveryPlace: '',
    attendantType: '',
    complications: [],
    outcome: '',
    newbornSex: '',
    newbornWeight: '',
    maternalMortality: false,
    notes: ''
  });
  const [saved, setSaved] = useState(false);

  const complicationOptions = [
    'Hemorrhage', 'Obstructed Labor', 'Prolonged Labor',
    'Eclampsia', 'Sepsis', 'Cord Prolapse', 'None'
  ];

  const toggleComplication = (c) => {
    setForm(f => ({
      ...f,
      complications: f.complications.includes(c)
        ? f.complications.filter(x => x !== c)
        : [...f.complications, c]
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const pw = pregnantWomen.find(p => String(p.id) === String(selectedPW));
    appendData('deliveries', {
      ...form,
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
        <span style={{ flex: 1, fontSize: 17, fontWeight: 700, color: 'white', textAlign: 'center' }}>Delivery Tracking</span>
        <div style={{ width: 30 }} />
      </div>

      <div className="screen-content">
        {saved && (
          <div style={{ background: '#DCFCE7', border: '1px solid #16A34A', borderRadius: 12, padding: '12px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 18 }}>✅</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#16A34A' }}>Delivery record saved successfully!</span>
          </div>
        )}

        <PatientSearchBar onPatientFound={p => {
          const match = pregnantWomen.find(pw => pw.name === p.name || pw.mobile === p.mobile);
          if (match) setSelectedPW(String(match.id));
        }} />
        <form onSubmit={handleSave}>
          {/* Select Patient */}
          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Patient Details</p>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Select Pregnant Woman <span className="required">*</span></label>
              <select className="form-input" value={selectedPW} onChange={e => setSelectedPW(e.target.value)} required>
                <option value="">-- Select Patient --</option>
                {pregnantWomen.map(pw => (
                  <option key={pw.id} value={pw.id}>{pw.name} {pw.isHRP ? '(HRP)' : ''}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Delivery Details */}
          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Delivery Details</p>

            <div className="row-2col">
              <div className="form-group">
                <label className="form-label">Delivery Date <span className="required">*</span></label>
                <input type="date" className="form-input" value={form.deliveryDate} onChange={e => setForm(f => ({ ...f, deliveryDate: e.target.value }))} required />
              </div>
              <div className="form-group">
                <label className="form-label">Delivery Time</label>
                <input type="time" className="form-input" value={form.deliveryTime} onChange={e => setForm(f => ({ ...f, deliveryTime: e.target.value }))} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Delivery Type <span className="required">*</span></label>
              <select className="form-input" value={form.deliveryType} onChange={e => setForm(f => ({ ...f, deliveryType: e.target.value }))} required>
                <option value="">Select type</option>
                <option>Normal / Vaginal</option>
                <option>C-Section</option>
                <option>Assisted (Forceps/Vacuum)</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Delivery Place <span className="required">*</span></label>
              <select className="form-input" value={form.deliveryPlace} onChange={e => setForm(f => ({ ...f, deliveryPlace: e.target.value }))} required>
                <option value="">Select place</option>
                <option>Home</option>
                <option>Sub-Center</option>
                <option>PHC</option>
                <option>CHC</option>
                <option>District Hospital</option>
                <option>Private Hospital</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Attendant Type <span className="required">*</span></label>
              <select className="form-input" value={form.attendantType} onChange={e => setForm(f => ({ ...f, attendantType: e.target.value }))} required>
                <option value="">Select attendant</option>
                <option>ANM</option>
                <option>Doctor</option>
                <option>Nurse / Midwife</option>
                <option>Dai (Traditional Birth Attendant)</option>
                <option>Relative</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          {/* Complications */}
          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Complications</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {complicationOptions.map(c => (
                <button
                  key={c} type="button"
                  className={`chip ${form.complications.includes(c) ? 'selected' : ''}`}
                  onClick={() => toggleComplication(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Outcome */}
          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Outcome</p>

            <div className="form-group">
              <label className="form-label">Delivery Outcome <span className="required">*</span></label>
              <div style={{ display: 'flex', gap: 10 }}>
                {['Live Birth', 'Stillbirth'].map(opt => (
                  <button
                    key={opt} type="button"
                    onClick={() => setForm(f => ({ ...f, outcome: opt }))}
                    style={{
                      flex: 1, padding: '10px', borderRadius: 10, border: '2px solid',
                      borderColor: form.outcome === opt ? 'var(--primary)' : 'var(--border)',
                      background: form.outcome === opt ? 'rgba(27,79,155,0.08)' : 'white',
                      color: form.outcome === opt ? 'var(--primary)' : 'var(--text-secondary)',
                      fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font)'
                    }}
                  >
                    {opt === 'Live Birth' ? '👶 ' : '🕊️ '}{opt}
                  </button>
                ))}
              </div>
            </div>

            {form.outcome === 'Live Birth' && (
              <>
                <div className="form-group">
                  <label className="form-label">Newborn Sex <span className="required">*</span></label>
                  <div style={{ display: 'flex', gap: 10 }}>
                    {['Male', 'Female', 'Other'].map(s => (
                      <button key={s} type="button"
                        onClick={() => setForm(f => ({ ...f, newbornSex: s }))}
                        style={{
                          flex: 1, padding: '9px', borderRadius: 10, border: '2px solid',
                          borderColor: form.newbornSex === s ? 'var(--primary)' : 'var(--border)',
                          background: form.newbornSex === s ? 'rgba(27,79,155,0.08)' : 'white',
                          color: form.newbornSex === s ? 'var(--primary)' : 'var(--text-secondary)',
                          fontWeight: 600, fontSize: 12, cursor: 'pointer', fontFamily: 'var(--font)'
                        }}
                      >{s}</button>
                    ))}
                  </div>
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Newborn Weight (grams) <span className="required">*</span></label>
                  <input type="number" className="form-input" placeholder="e.g. 2800" value={form.newbornWeight} onChange={e => setForm(f => ({ ...f, newbornWeight: e.target.value }))} />
                </div>
              </>
            )}
          </div>

          {/* Maternal Mortality */}
          <div className="card" style={{ marginBottom: 14 }}>
            <div className="toggle-wrapper">
              <span className="toggle-label" style={{ fontWeight: 600 }}>⚠️ Maternal Mortality</span>
              <label className="toggle">
                <input type="checkbox" checked={form.maternalMortality} onChange={e => setForm(f => ({ ...f, maternalMortality: e.target.checked }))} />
                <span className="toggle-slider" />
              </label>
            </div>
            {form.maternalMortality && (
              <div style={{ marginTop: 12 }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Cause of Death</label>
                  <input type="text" className="form-input" placeholder="Enter cause of maternal death" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
                </div>
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginBottom: 24 }}>
            💾 Save Delivery Record
          </button>
        </form>
      </div>
    </div>
  );
}

export default DeliveryScreen;
