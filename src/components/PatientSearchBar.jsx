import React, { useState } from 'react';

// ── Full ABHA Registry ───────────────────────────────────────────────────────
// Three rich profiles: Regular Woman, Man, Pregnant Woman
// Remaining entries keep basic fields for backward compatibility
export const ABHA_REGISTRY = [

  // ── 1. Regular Woman ────────────────────────────────────────────────────────
  {
    abhaId:       '91-1234-5678-9012',
    abhaAddress:  'sunita.devi@abdm',
    name:         'Sunita Devi',
    age:          28,
    dob:          '1996-04-15',
    gender:       'Female',
    mobile:       '9876543210',
    email:        'sunita.devi@gmail.com',
    aadhaar:      '1234-5678-9012',
    bloodGroup:   'B+',
    village:      'Ward-7',
    subCenter:    'Sub-Center Ward-7',
    district:     'Bhopal',
    state:        'Madhya Pradesh',
    pincode:      '462001',
    address:      'H-42, Arera Colony, Ward-7, Bhopal',
    occupation:   'Homemaker',
    education:    'Secondary (10th)',
    religion:     'Hindu',
    caste:        'OBC',
    bpl:          false,
    disability:   false,
    guardianName: 'Ramesh Kumar',
    guardianRel:  'Husband',
    guardianMobile: '9876543220',
    samagraId:    'SG-001234',
    rchId:        'RCH-MP-2024-001',
    photo:        null,
    type:         'woman',
  },

  // ── 2. Man ──────────────────────────────────────────────────────────────────
  {
    abhaId:       '91-3456-7890-1234',
    abhaAddress:  'mohan.lal@abdm',
    name:         'Mohan Lal',
    age:          52,
    dob:          '1972-01-10',
    gender:       'Male',
    mobile:       '9876543212',
    email:        'mohan.lal@gmail.com',
    aadhaar:      '3456-7890-1234',
    bloodGroup:   'O+',
    village:      'Ward-3',
    subCenter:    'Sub-Center Ward-3',
    district:     'Bhopal',
    state:        'Madhya Pradesh',
    pincode:      '462003',
    address:      'H-15, Shahpura, Ward-3, Bhopal',
    occupation:   'Farmer',
    education:    'Primary (5th)',
    religion:     'Hindu',
    caste:        'General',
    bpl:          true,
    disability:   false,
    guardianName: 'Sita Devi',
    guardianRel:  'Wife',
    guardianMobile: '9876543221',
    samagraId:    'SG-003456',
    rchId:        null,
    nikshayId:    'NK-MP-2024-00891',
    photo:        null,
    type:         'man',
    // NCD flags
    hypertension: true,
    diabetes:     false,
    tbStatus:     'Active Treatment',
  },

  // ── 3. Pregnant Woman ───────────────────────────────────────────────────────
  {
    abhaId:       '91-2345-6789-0123',
    abhaAddress:  'kavita.singh@abdm',
    name:         'Kavita Singh',
    age:          24,
    dob:          '2000-07-22',
    gender:       'Female',
    mobile:       '9876543211',
    email:        'kavita.singh@gmail.com',
    aadhaar:      '2345-6789-0123',
    bloodGroup:   'A+',
    village:      'Ward-5',
    subCenter:    'Sub-Center Ward-5',
    district:     'Bhopal',
    state:        'Madhya Pradesh',
    pincode:      '462005',
    address:      'H-8, Kolar Road, Ward-5, Bhopal',
    occupation:   'Homemaker',
    education:    'Higher Secondary (12th)',
    religion:     'Hindu',
    caste:        'SC',
    bpl:          true,
    disability:   false,
    guardianName: 'Anil Singh',
    guardianRel:  'Husband',
    guardianMobile: '9876543222',
    samagraId:    'SG-002345',
    rchId:        'RCH-MP-2024-002',
    photo:        null,
    type:         'pregnant',
    // Pregnancy details
    lmp:          '2024-06-10',
    edd:          '2025-03-17',
    gravida:      1,
    para:         0,
    isHRP:        true,
    hrpConditions: ['Diabetes', 'Anaemia'],
    ancVisits:    0,
  },

  // ── Remaining basic entries ──────────────────────────────────────────────────
  { abhaId: '91-4567-8901-2345', name: 'Meena Bai',      age: 35, gender: 'Female', mobile: '9876543213', village: 'Ward-7', dob: '1989-11-05', aadhaar: '4567-8901-2345', email: '', district: 'Bhopal', state: 'Madhya Pradesh', bloodGroup: 'AB+', address: 'Ward-7, Bhopal', type: 'woman' },
  { abhaId: '91-5678-9012-3456', name: 'Ramesh Kumar',   age: 45, gender: 'Male',   mobile: '9876543214', village: 'Ward-2', dob: '1979-03-18', aadhaar: '5678-9012-3456', email: '', district: 'Bhopal', state: 'Madhya Pradesh', bloodGroup: 'B+',  address: 'Ward-2, Bhopal', type: 'man' },
  { abhaId: '91-6789-0123-4567', name: 'Anita Sharma',   age: 31, gender: 'Female', mobile: '9876543215', village: 'Ward-4', dob: '1993-08-30', aadhaar: '6789-0123-4567', email: '', district: 'Bhopal', state: 'Madhya Pradesh', bloodGroup: 'O-',  address: 'Ward-4, Bhopal', type: 'woman' },
  { abhaId: '91-7890-1234-5678', name: 'Suresh Patel',   age: 60, gender: 'Male',   mobile: '9876543216', village: 'Ward-6', dob: '1964-12-01', aadhaar: '7890-1234-5678', email: '', district: 'Bhopal', state: 'Madhya Pradesh', bloodGroup: 'A+',  address: 'Ward-6, Bhopal', type: 'man' },
  { abhaId: '91-8901-2345-6789', name: 'Geeta Yadav',    age: 22, gender: 'Female', mobile: '9876543217', village: 'Ward-1', dob: '2002-05-14', aadhaar: '8901-2345-6789', email: '', district: 'Bhopal', state: 'Madhya Pradesh', bloodGroup: 'B-',  address: 'Ward-1, Bhopal', type: 'woman' },
  { abhaId: '91-9012-3456-7890', name: 'Pradeep Mishra', age: 38, gender: 'Male',   mobile: '9876543218', village: 'Ward-8', dob: '1986-09-25', aadhaar: '9012-3456-7890', email: '', district: 'Bhopal', state: 'Madhya Pradesh', bloodGroup: 'O+',  address: 'Ward-8, Bhopal', type: 'man' },
  { abhaId: '91-0123-4567-8901', name: 'Lakshmi Devi',   age: 55, gender: 'Female', mobile: '9876543219', village: 'Ward-3', dob: '1969-02-07', aadhaar: '0123-4567-8901', email: '', district: 'Bhopal', state: 'Madhya Pradesh', bloodGroup: 'AB-', address: 'Ward-3, Bhopal', type: 'woman' },
];

// ── Type badge config ────────────────────────────────────────────────────────
const TYPE_CONFIG = {
  woman:    { label: 'Woman',           color: '#7C3AED', bg: '#F5F3FF', icon: '👩' },
  man:      { label: 'Man',             color: '#0891B2', bg: '#ECFEFF', icon: '👨' },
  pregnant: { label: 'Pregnant Woman',  color: '#DC2626', bg: '#FFF1F2', icon: '🤰' },
};

// ── Detail row helper ────────────────────────────────────────────────────────
function DetailRow({ icon, label, value }) {
  if (!value) return null;
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 6 }}>
      <span style={{ fontSize: 13, flexShrink: 0, width: 18 }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <span style={{ fontSize: 10, color: 'var(--text-secondary)', display: 'block', lineHeight: 1.2 }}>{label}</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{value}</span>
      </div>
    </div>
  );
}

/**
 * PatientSearchBar — reusable ABHA search widget
 * Props:
 *   onPatientFound(patient) — called when a match is found
 *   compact — smaller inline version (default false)
 */
export default function PatientSearchBar({ onPatientFound, compact = false }) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState(null);
  const [foundPatient, setFoundPatient] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.trim().replace(/\s/g, '');
    if (!q) return;
    setStatus('searching');
    setTimeout(() => {
      const match = ABHA_REGISTRY.find(p =>
        p.abhaId.replace(/-/g, '') === q.replace(/-/g, '') ||
        p.mobile === q ||
        (p.aadhaar && p.aadhaar.replace(/-/g, '') === q.replace(/-/g, ''))
      );
      if (match) {
        setFoundPatient(match);
        setStatus('found');
        setExpanded(false);
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
    setExpanded(false);
  };

  const tc = foundPatient ? (TYPE_CONFIG[foundPatient.type] || TYPE_CONFIG.woman) : null;

  return (
    <div style={{ background: '#EFF6FF', border: '1.5px solid #BFDBFE', borderRadius: 12, padding: compact ? '10px 12px' : '14px', marginBottom: 14 }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 10 }}>
        🔍 Search by ABHA ID / Mobile / Aadhaar
      </p>

      <form onSubmit={handleSearch} style={{ display: 'flex', gap: 8 }}>
        <input type="text" className="form-input"
          placeholder="ABHA ID, Mobile or Aadhaar No."
          value={query}
          onChange={e => { setQuery(e.target.value); setStatus(null); }}
          style={{ flex: 1, marginBottom: 0, fontSize: 13 }}
        />
        <button type="submit" className="btn btn-primary"
          style={{ width: 'auto', padding: '0 16px', flexShrink: 0, fontSize: 13 }}
          disabled={status === 'searching'}>
          {status === 'searching' ? '...' : 'Search'}
        </button>
      </form>

      {status === 'notfound' && (
        <p style={{ fontSize: 12, color: '#DC2626', marginTop: 8, fontWeight: 600 }}>
          ❌ No patient found. Please fill details manually.
        </p>
      )}

      {status === 'found' && foundPatient && (
        <div style={{ background: 'white', border: '1.5px solid #BBF7D0', borderRadius: 12, marginTop: 10, overflow: 'hidden' }}>

          {/* ── Summary row ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px' }}>
            <div style={{ width: 40, height: 40, borderRadius: 20, background: tc.bg, border: `2px solid ${tc.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
              {tc.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>✅ {foundPatient.name}</p>
                <span style={{ background: tc.bg, color: tc.color, borderRadius: 20, padding: '1px 8px', fontSize: 9, fontWeight: 700 }}>{tc.icon} {tc.label}</span>
                {foundPatient.isHRP && <span style={{ background: '#FEE2E2', color: '#DC2626', borderRadius: 20, padding: '1px 8px', fontSize: 9, fontWeight: 700 }}>⚠️ HRP</span>}
              </div>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 1 }}>
                {foundPatient.age} yrs · {foundPatient.gender} · {foundPatient.village} · 📞 {foundPatient.mobile}
              </p>
              <p style={{ fontSize: 11, color: 'var(--primary)', marginTop: 1, fontWeight: 600 }}>
                ABHA: {foundPatient.abhaId}
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-end' }}>
              <button type="button" onClick={handleClear}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#9CA3AF', lineHeight: 1 }}>✕</button>
              <button type="button" onClick={() => setExpanded(e => !e)}
                style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 6, padding: '3px 8px', fontSize: 10, color: 'var(--primary)', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font)' }}>
                {expanded ? '▲ Less' : '▼ Details'}
              </button>
            </div>
          </div>

          {/* ── Expanded full details ── */}
          {expanded && (
            <div style={{ borderTop: '1px solid #E5E7EB', padding: '12px 14px', background: '#FAFAFA' }}>

              {/* Personal */}
              <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Personal Details</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
                <DetailRow icon="👤" label="Full Name"     value={foundPatient.name} />
                <DetailRow icon="🎂" label="Date of Birth" value={foundPatient.dob} />
                <DetailRow icon="🧬" label="Gender"        value={foundPatient.gender} />
                <DetailRow icon="🩸" label="Blood Group"   value={foundPatient.bloodGroup} />
                <DetailRow icon="📅" label="Age"           value={foundPatient.age ? `${foundPatient.age} years` : null} />
                <DetailRow icon="💼" label="Occupation"    value={foundPatient.occupation} />
                <DetailRow icon="🎓" label="Education"     value={foundPatient.education} />
                <DetailRow icon="🏷️" label="Caste"         value={foundPatient.caste} />
              </div>

              {/* Contact */}
              <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8, marginTop: 10 }}>Contact & Address</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
                <DetailRow icon="📞" label="Mobile"        value={foundPatient.mobile} />
                <DetailRow icon="📧" label="Email"         value={foundPatient.email} />
                <DetailRow icon="📍" label="Village/Ward"  value={foundPatient.village} />
                <DetailRow icon="🏙️" label="District"      value={foundPatient.district} />
                <DetailRow icon="🗺️" label="State"         value={foundPatient.state} />
                <DetailRow icon="📮" label="Pincode"       value={foundPatient.pincode} />
              </div>
              {foundPatient.address && (
                <div style={{ background: '#EFF6FF', borderRadius: 8, padding: '8px 10px', marginTop: 4 }}>
                  <p style={{ fontSize: 10, color: 'var(--text-secondary)' }}>Full Address</p>
                  <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{foundPatient.address}</p>
                </div>
              )}

              {/* IDs */}
              <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8, marginTop: 10 }}>Identity Numbers</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
                <DetailRow icon="🆔" label="ABHA ID"       value={foundPatient.abhaId} />
                <DetailRow icon="🔗" label="ABHA Address"  value={foundPatient.abhaAddress} />
                <DetailRow icon="🪪" label="Aadhaar No."   value={foundPatient.aadhaar} />
                <DetailRow icon="📋" label="ABHA ID"    value={foundPatient.samagraId} />
                <DetailRow icon="🏥" label="RCH ID"        value={foundPatient.rchId} />
                <DetailRow icon="💊" label="Nikshay ID"    value={foundPatient.nikshayId} />
              </div>

              {/* Guardian */}
              {foundPatient.guardianName && (
                <>
                  <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8, marginTop: 10 }}>Guardian / Emergency Contact</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
                    <DetailRow icon="👥" label="Name"         value={foundPatient.guardianName} />
                    <DetailRow icon="🔗" label="Relation"     value={foundPatient.guardianRel} />
                    <DetailRow icon="📞" label="Mobile"       value={foundPatient.guardianMobile} />
                  </div>
                </>
              )}

              {/* Pregnancy details (only for pregnant type) */}
              {foundPatient.type === 'pregnant' && (
                <>
                  <p style={{ fontSize: 10, fontWeight: 700, color: '#DC2626', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8, marginTop: 10 }}>🤰 Pregnancy Details</p>
                  <div style={{ background: '#FFF1F2', borderRadius: 10, padding: '10px 12px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
                      <DetailRow icon="📅" label="LMP"          value={foundPatient.lmp} />
                      <DetailRow icon="🗓️" label="EDD"          value={foundPatient.edd} />
                      <DetailRow icon="🔢" label="Gravida"      value={foundPatient.gravida ? `G${foundPatient.gravida}` : null} />
                      <DetailRow icon="🔢" label="Para"         value={foundPatient.para !== undefined ? `P${foundPatient.para}` : null} />
                      <DetailRow icon="🏥" label="ANC Visits"   value={foundPatient.ancVisits !== undefined ? `${foundPatient.ancVisits} visits` : null} />
                    </div>
                    {foundPatient.isHRP && (
                      <div style={{ background: '#FEE2E2', borderRadius: 8, padding: '6px 10px', marginTop: 6 }}>
                        <p style={{ fontSize: 11, fontWeight: 700, color: '#DC2626' }}>⚠️ High Risk Pregnancy</p>
                        <p style={{ fontSize: 11, color: '#991B1B' }}>{foundPatient.hrpConditions?.join(', ')}</p>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* NCD flags (for man with conditions) */}
              {foundPatient.type === 'man' && (foundPatient.hypertension || foundPatient.tbStatus) && (
                <>
                  <p style={{ fontSize: 10, fontWeight: 700, color: '#B45309', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8, marginTop: 10 }}>💊 Health Conditions</p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {foundPatient.hypertension && <span style={{ background: '#FEF3C7', color: '#B45309', borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 600 }}>⚠️ Hypertension</span>}
                    {foundPatient.tbStatus && <span style={{ background: '#FFF1F2', color: '#DC2626', borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 600 }}>🫁 TB: {foundPatient.tbStatus}</span>}
                  </div>
                </>
              )}

              {/* BPL / Disability flags */}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
                {foundPatient.bpl && <span style={{ background: '#EFF6FF', color: 'var(--primary)', borderRadius: 20, padding: '3px 10px', fontSize: 10, fontWeight: 600 }}>🟦 BPL Card Holder</span>}
                {foundPatient.disability && <span style={{ background: '#F5F3FF', color: '#7C3AED', borderRadius: 20, padding: '3px 10px', fontSize: 10, fontWeight: 600 }}>♿ Disability</span>}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
