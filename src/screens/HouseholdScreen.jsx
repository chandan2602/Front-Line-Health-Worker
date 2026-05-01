import React, { useState } from 'react';
import AppBar from '../components/AppBar';
import FormField from '../components/FormField';
import BottomNav from '../components/BottomNav';
import PatientSearchBar from '../components/PatientSearchBar';
import { appendData } from '../utils/storage';

function HouseholdScreen({ onNavigate, onBack }) {
  const [form, setForm] = useState({
    subCenter: '',
    village: '',
    houseNumber: '',
    gpsLat: '',
    gpsLng: '',
    houseType: '',
    toilet: '',
    waterSource: '',
    electricity: '',
    contact: '',
  });
  const [members, setMembers] = useState([]);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsCaptured, setGpsCaptured] = useState(false);
  const [saved, setSaved] = useState(false);

  const update = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const captureGPS = () => {
    setGpsLoading(true);
    setTimeout(() => {
      setForm(f => ({ ...f, gpsLat: '23.2599', gpsLng: '77.4126' }));
      setGpsLoading(false);
      setGpsCaptured(true);
    }, 1500);
  };

  const addMember = () => {
    setMembers(m => [...m, { name: '', age: '', gender: '', relation: '' }]);
  };

  const updateMember = (index, key, val) => {
    setMembers(m => m.map((item, i) => i === index ? { ...item, [key]: val } : item));
  };

  const removeMember = (index) => {
    setMembers(m => m.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    appendData('households', { ...form, members });
    setSaved(true);
    setTimeout(() => { setSaved(false); onBack(); }, 1500);
  };

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <AppBar title="Household Enumeration" onBack={onBack} />

      <div className="screen-content">
        <PatientSearchBar onPatientFound={p => update('contact', p.mobile)} />
        {/* Location Section */}
        <div className="card" style={{ marginBottom: 14 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            📍 Location Details
          </p>

          <FormField label="Sub-Center / Ward" required>
            <select className="form-input" value={form.subCenter} onChange={e => update('subCenter', e.target.value)}>
              <option value="">Select Sub-Center</option>
              <option value="SC-Ward-7">Sub-Center Ward-7</option>
              <option value="SC-Ward-8">Sub-Center Ward-8</option>
              <option value="SC-Ward-9">Sub-Center Ward-9</option>
            </select>
          </FormField>

          <FormField label="Village / Mohalla" required>
            <select className="form-input" value={form.village} onChange={e => update('village', e.target.value)}>
              <option value="">Select Village</option>
              <option value="Arera Colony">Arera Colony</option>
              <option value="Kolar Road">Kolar Road</option>
              <option value="Shahpura">Shahpura</option>
              <option value="Berasia Road">Berasia Road</option>
            </select>
          </FormField>

          <FormField label="House Number / Name" required>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. H-42, Near Temple"
              value={form.houseNumber}
              onChange={e => update('houseNumber', e.target.value)}
            />
          </FormField>

          {/* GPS Button */}
          <button
            type="button"
            className="btn btn-outline"
            onClick={captureGPS}
            disabled={gpsLoading}
            style={{ marginBottom: 4 }}
          >
            {gpsLoading ? (
              <>
                <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⟳</span>
                Capturing GPS...
              </>
            ) : gpsCaptured ? (
              <>✅ GPS Captured: {form.gpsLat}, {form.gpsLng}</>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
                </svg>
                Capture GPS Location
              </>
            )}
          </button>
        </div>

        {/* House Details */}
        <div className="card" style={{ marginBottom: 14 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            🏠 House Details
          </p>

          <FormField label="Type of House" required>
            <select className="form-input" value={form.houseType} onChange={e => update('houseType', e.target.value)}>
              <option value="">Select Type</option>
              <option value="Pucca">Pucca</option>
              <option value="Kutcha">Kutcha</option>
              <option value="Semi-Pucca">Semi-Pucca</option>
            </select>
          </FormField>

          <FormField label="Toilet Available" required>
            <div style={{ display: 'flex', gap: 12 }}>
              {['Yes', 'No'].map(opt => (
                <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', flex: 1 }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: 50,
                    border: `2px solid ${form.toilet === opt ? 'var(--primary)' : 'var(--border)'}`,
                    background: form.toilet === opt ? 'var(--primary)' : 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s', flexShrink: 0
                  }} onClick={() => update('toilet', opt)}>
                    {form.toilet === opt && <div style={{ width: 8, height: 8, borderRadius: 50, background: 'white' }} />}
                  </div>
                  <span style={{ fontSize: 14, color: 'var(--text-primary)' }}>{opt}</span>
                </label>
              ))}
            </div>
          </FormField>

          <FormField label="Drinking Water Source" required>
            <select className="form-input" value={form.waterSource} onChange={e => update('waterSource', e.target.value)}>
              <option value="">Select Source</option>
              <option value="Tap Water">Tap Water (Piped)</option>
              <option value="Hand Pump">Hand Pump</option>
              <option value="Well">Well</option>
              <option value="River/Pond">River / Pond</option>
              <option value="Tanker">Tanker</option>
            </select>
          </FormField>

          <FormField label="Electricity Available" required>
            <div style={{ display: 'flex', gap: 12 }}>
              {['Yes', 'No'].map(opt => (
                <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', flex: 1 }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: 50,
                    border: `2px solid ${form.electricity === opt ? 'var(--primary)' : 'var(--border)'}`,
                    background: form.electricity === opt ? 'var(--primary)' : 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s', flexShrink: 0
                  }} onClick={() => update('electricity', opt)}>
                    {form.electricity === opt && <div style={{ width: 8, height: 8, borderRadius: 50, background: 'white' }} />}
                  </div>
                  <span style={{ fontSize: 14, color: 'var(--text-primary)' }}>{opt}</span>
                </label>
              ))}
            </div>
          </FormField>

          <FormField label="Contact Number">
            <input
              type="tel"
              className="form-input"
              placeholder="10-digit mobile number"
              value={form.contact}
              onChange={e => update('contact', e.target.value)}
              maxLength={10}
            />
          </FormField>
        </div>

        {/* Household Members */}
        <div className="card" style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              👥 Household Members
            </p>
            <button
              type="button"
              onClick={addMember}
              style={{
                background: 'var(--primary)', color: 'white', border: 'none',
                borderRadius: 8, width: 32, height: 32, fontSize: 20,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font)'
              }}
            >
              +
            </button>
          </div>

          {members.length === 0 && (
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', textAlign: 'center', padding: '12px 0' }}>
              Tap + to add household members
            </p>
          )}

          {members.map((member, index) => (
            <div key={index} style={{
              background: 'var(--input-bg)', borderRadius: 12, padding: 12,
              marginBottom: 10, border: '1px solid var(--border)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                  Member {index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeMember(index)}
                  style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', fontSize: 16 }}
                >
                  ×
                </button>
              </div>
              <div className="row-2col">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Name"
                  value={member.name}
                  onChange={e => updateMember(index, 'name', e.target.value)}
                />
                <input
                  type="number"
                  className="form-input"
                  placeholder="Age"
                  value={member.age}
                  onChange={e => updateMember(index, 'age', e.target.value)}
                />
              </div>
              <div className="row-2col" style={{ marginTop: 8 }}>
                <select
                  className="form-input"
                  value={member.gender}
                  onChange={e => updateMember(index, 'gender', e.target.value)}
                >
                  <option value="">Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <select
                  className="form-input"
                  value={member.relation}
                  onChange={e => updateMember(index, 'relation', e.target.value)}
                >
                  <option value="">Relation</option>
                  <option value="Head">Head</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Son">Son</option>
                  <option value="Daughter">Daughter</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          ))}
        </div>

        {/* Save Button */}
        {saved ? (
          <div style={{
            background: 'rgba(22,163,74,0.1)', border: '1px solid rgba(22,163,74,0.3)',
            borderRadius: 12, padding: '14px', textAlign: 'center',
            color: 'var(--success)', fontWeight: 600, fontSize: 15
          }}>
            ✅ Household saved successfully!
          </div>
        ) : (
          <button className="btn btn-primary" onClick={handleSave}>
            💾 Save &amp; Continue
          </button>
        )}
      </div>

      <BottomNav active="home" onNavigate={onNavigate} />
    </div>
  );
}

export default HouseholdScreen;
