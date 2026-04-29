import React, { useState } from 'react';
import { getData, appendData } from '../utils/storage';

function BackIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 5l-7 7 7 7"/>
    </svg>
  );
}

const servicesOptions = [
  'ANC Check-up', 'PNC Check-up', 'Immunization', 'IFA Distribution',
  'ORS Distribution', 'Family Planning Counseling', 'CBAC Screening',
  'Nutrition Counseling', 'Health Education', 'Referral'
];

function VHSNDScreen({ onBack }) {
  const user = getData('user') || {};
  const pregnantWomen = getData('pregnantWomen') || [];

  const [form, setForm] = useState({
    sessionDate: '',
    village: '',
    subCenter: '',
    venue: '',
    startTime: '',
    endTime: '',
    totalBeneficiaries: '',
    ancCount: '',
    pncCount: '',
    immunizationCount: '',
    servicesProvided: [],
    hrpCounseled: '',
    notes: ''
  });
  const [saved, setSaved] = useState(false);

  const toggleService = (s) => {
    setForm(f => ({
      ...f,
      servicesProvided: f.servicesProvided.includes(s)
        ? f.servicesProvided.filter(x => x !== s)
        : [...f.servicesProvided, s]
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    appendData('vhsndSessions', {
      ...form,
      recordedBy: user.name,
      recordedAt: new Date().toISOString()
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const hrpList = pregnantWomen.filter(p => p.isHRP);
  const dueANC = pregnantWomen.filter(p => !p.isHRP);

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      {/* App Bar */}
      <div style={{ background: 'var(--primary)', display: 'flex', alignItems: 'center', padding: '12px 16px', gap: 12, flexShrink: 0 }}>
        <button className="app-bar-icon-btn" onClick={onBack}><BackIcon /></button>
        <span style={{ flex: 1, fontSize: 17, fontWeight: 700, color: 'white', textAlign: 'center' }}>VHSND Sessions</span>
        <div style={{ width: 30 }} />
      </div>

      {/* Info Banner */}
      <div style={{ background: 'rgba(27,79,155,0.08)', padding: '10px 16px', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600 }}>
          📅 Village Health, Sanitation & Nutrition Day
        </p>
      </div>

      <div className="screen-content">
        {saved && (
          <div style={{ background: '#DCFCE7', border: '1px solid #16A34A', borderRadius: 12, padding: '12px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 18 }}>✅</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#16A34A' }}>VHSND session saved successfully!</span>
          </div>
        )}

        {/* Due List Summary */}
        <div className="card" style={{ marginBottom: 14 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Today's Due List</p>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 1, background: 'rgba(27,79,155,0.08)', borderRadius: 10, padding: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--primary)' }}>{dueANC.length}</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>ANC Due</div>
            </div>
            <div style={{ flex: 1, background: 'rgba(220,38,38,0.08)', borderRadius: 10, padding: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--danger)' }}>{hrpList.length}</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>HRP Cases</div>
            </div>
            <div style={{ flex: 1, background: 'rgba(22,163,74,0.08)', borderRadius: 10, padding: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--success)' }}>{pregnantWomen.length}</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>Total PW</div>
            </div>
          </div>
        </div>

        {/* HRP Due List */}
        {hrpList.length > 0 && (
          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--danger)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>⚠️ HRP Beneficiaries</p>
            {hrpList.map(pw => (
              <div key={pw.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#FEE2E2', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                  {pw.name.charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{pw.name}</p>
                  <p style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{pw.hrpConditions?.join(', ')}</p>
                </div>
                <span className="badge badge-danger" style={{ fontSize: 10 }}>HRP</span>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleSave}>
          {/* Session Details */}
          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Session Details</p>

            <div className="form-group">
              <label className="form-label">Session Date <span className="required">*</span></label>
              <input type="date" className="form-input" value={form.sessionDate} onChange={e => setForm(f => ({ ...f, sessionDate: e.target.value }))} required />
            </div>

            <div className="form-group">
              <label className="form-label">Village / Ward <span className="required">*</span></label>
              <input type="text" className="form-input" placeholder="Enter village name" value={form.village} onChange={e => setForm(f => ({ ...f, village: e.target.value }))} required />
            </div>

            <div className="form-group">
              <label className="form-label">Sub-Center</label>
              <input type="text" className="form-input" placeholder="Sub-center name" value={form.subCenter} onChange={e => setForm(f => ({ ...f, subCenter: e.target.value }))} />
            </div>

            <div className="form-group">
              <label className="form-label">Venue</label>
              <input type="text" className="form-input" placeholder="e.g. Anganwadi Center, School" value={form.venue} onChange={e => setForm(f => ({ ...f, venue: e.target.value }))} />
            </div>

            <div className="row-2col">
              <div className="form-group">
                <label className="form-label">Start Time</label>
                <input type="time" className="form-input" value={form.startTime} onChange={e => setForm(f => ({ ...f, startTime: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">End Time</label>
                <input type="time" className="form-input" value={form.endTime} onChange={e => setForm(f => ({ ...f, endTime: e.target.value }))} />
              </div>
            </div>
          </div>

          {/* Beneficiary Count */}
          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Beneficiary Count</p>

            <div className="row-2col">
              <div className="form-group">
                <label className="form-label">Total Beneficiaries</label>
                <input type="number" className="form-input" placeholder="0" value={form.totalBeneficiaries} onChange={e => setForm(f => ({ ...f, totalBeneficiaries: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">ANC Attended</label>
                <input type="number" className="form-input" placeholder="0" value={form.ancCount} onChange={e => setForm(f => ({ ...f, ancCount: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">PNC Attended</label>
                <input type="number" className="form-input" placeholder="0" value={form.pncCount} onChange={e => setForm(f => ({ ...f, pncCount: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Immunized</label>
                <input type="number" className="form-input" placeholder="0" value={form.immunizationCount} onChange={e => setForm(f => ({ ...f, immunizationCount: e.target.value }))} />
              </div>
            </div>
          </div>

          {/* Services Provided */}
          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Services Provided</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {servicesOptions.map(s => (
                <button key={s} type="button"
                  className={`chip ${form.servicesProvided.includes(s) ? 'selected' : ''}`}
                  onClick={() => toggleService(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="card" style={{ marginBottom: 14 }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Additional Notes</label>
              <textarea
                className="form-input"
                rows={3}
                placeholder="Any observations or remarks..."
                value={form.notes}
                onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                style={{ resize: 'none' }}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginBottom: 24 }}>
            💾 Save VHSND Session
          </button>
        </form>
      </div>
    </div>
  );
}

export default VHSNDScreen;
