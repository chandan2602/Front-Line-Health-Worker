import React, { useState } from 'react';

// Mock ABHA patient registry — in production this would be an API call
export const ABHA_REGISTRY = [
  { abhaId: '91-1234-5678-9012', name: 'Sunita Devi',      age: 28, gender: 'Female', mobile: '9876543210', village: 'Ward-7', dob: '1996-04-15', aadhaar: '1234-5678-9012' },
  { abhaId: '91-2345-6789-0123', name: 'Kavita Singh',     age: 24, gender: 'Female', mobile: '9876543211', village: 'Ward-5', dob: '2000-07-22', aadhaar: '2345-6789-0123' },
  { abhaId: '91-3456-7890-1234', name: 'Mohan Lal',        age: 52, gender: 'Male',   mobile: '9876543212', village: 'Ward-3', dob: '1972-01-10', aadhaar: '3456-7890-1234' },
  { abhaId: '91-4567-8901-2345', name: 'Meena Bai',        age: 35, gender: 'Female', mobile: '9876543213', village: 'Ward-7', dob: '1989-11-05', aadhaar: '4567-8901-2345' },
  { abhaId: '91-5678-9012-3456', name: 'Ramesh Kumar',     age: 45, gender: 'Male',   mobile: '9876543214', village: 'Ward-2', dob: '1979-03-18', aadhaar: '5678-9012-3456' },
  { abhaId: '91-6789-0123-4567', name: 'Anita Sharma',     age: 31, gender: 'Female', mobile: '9876543215', village: 'Ward-4', dob: '1993-08-30', aadhaar: '6789-0123-4567' },
  { abhaId: '91-7890-1234-5678', name: 'Suresh Patel',     age: 60, gender: 'Male',   mobile: '9876543216', village: 'Ward-6', dob: '1964-12-01', aadhaar: '7890-1234-5678' },
  { abhaId: '91-8901-2345-6789', name: 'Geeta Yadav',      age: 22, gender: 'Female', mobile: '9876543217', village: 'Ward-1', dob: '2002-05-14', aadhaar: '8901-2345-6789' },
  { abhaId: '91-9012-3456-7890', name: 'Pradeep Mishra',   age: 38, gender: 'Male',   mobile: '9876543218', village: 'Ward-8', dob: '1986-09-25', aadhaar: '9012-3456-7890' },
  { abhaId: '91-0123-4567-8901', name: 'Lakshmi Devi',     age: 55, gender: 'Female', mobile: '9876543219', village: 'Ward-3', dob: '1969-02-07', aadhaar: '0123-4567-8901' },
];

/**
 * PatientSearchBar — reusable ABHA search widget
 *
 * Props:
 *   onPatientFound(patient) — called when a match is found; parent should auto-fill its form
 *   compact — if true, renders a smaller inline version (default false)
 */
export default function PatientSearchBar({ onPatientFound, compact = false }) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState(null); // null | 'found' | 'notfound' | 'searching'
  const [foundPatient, setFoundPatient] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.trim().replace(/\s/g, '');
    if (!q) return;

    setStatus('searching');
    // Simulate a brief network delay
    setTimeout(() => {
      const match = ABHA_REGISTRY.find(p =>
        p.abhaId.replace(/-/g, '') === q.replace(/-/g, '') ||
        p.mobile === q ||
        p.aadhaar.replace(/-/g, '') === q.replace(/-/g, '')
      );
      if (match) {
        setFoundPatient(match);
        setStatus('found');
        onPatientFound(match);
      } else {
        setFoundPatient(null);
        setStatus('notfound');
      }
    }, 600);
  };

  const handleClear = () => {
    setQuery('');
    setStatus(null);
    setFoundPatient(null);
  };

  return (
    <div style={{
      background: '#EFF6FF',
      border: '1.5px solid #BFDBFE',
      borderRadius: 12,
      padding: compact ? '10px 12px' : '14px',
      marginBottom: 14,
    }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 10 }}>
        🔍 Search by ABHA ID / Mobile / Aadhaar
      </p>

      <form onSubmit={handleSearch} style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          className="form-input"
          placeholder="ABHA ID, Mobile or Aadhaar No."
          value={query}
          onChange={e => { setQuery(e.target.value); setStatus(null); }}
          style={{ flex: 1, marginBottom: 0, fontSize: 13 }}
        />
        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: 'auto', padding: '0 16px', flexShrink: 0, fontSize: 13 }}
          disabled={status === 'searching'}
        >
          {status === 'searching' ? '...' : 'Search'}
        </button>
      </form>

      {/* Not found */}
      {status === 'notfound' && (
        <p style={{ fontSize: 12, color: '#DC2626', marginTop: 8, fontWeight: 600 }}>
          ❌ No patient found. Please fill details manually.
        </p>
      )}

      {/* Found */}
      {status === 'found' && foundPatient && (
        <div style={{
          background: 'white', border: '1px solid #BBF7D0',
          borderRadius: 10, padding: '10px 12px', marginTop: 10,
          display: 'flex', alignItems: 'center', gap: 10
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 18,
            background: 'var(--primary)', color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 15, fontWeight: 700, flexShrink: 0
          }}>
            {foundPatient.name.charAt(0)}
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
              ✅ {foundPatient.name}
            </p>
            <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 1 }}>
              {foundPatient.age} yrs · {foundPatient.gender} · {foundPatient.village} · 📞 {foundPatient.mobile}
            </p>
            <p style={{ fontSize: 11, color: 'var(--primary)', marginTop: 1, fontWeight: 600 }}>
              ABHA: {foundPatient.abhaId}
            </p>
          </div>
          <button
            type="button"
            onClick={handleClear}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#9CA3AF' }}
          >✕</button>
        </div>
      )}
    </div>
  );
}
