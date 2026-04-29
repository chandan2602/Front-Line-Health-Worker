import React, { useState } from 'react';
import AppBar from '../components/AppBar';
import FormField from '../components/FormField';
import BottomNav from '../components/BottomNav';
import { getData, appendData } from '../utils/storage';

function TBScreen({ onNavigate, onBack }) {
  const [activeTab, setActiveTab] = useState('enrollment');
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: '',
    tbType: '',
    testType: '',
    nikshayId: `NK-MP-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 99999)).padStart(5, '0')}`,
    dbtBank: '',
    dbtAccount: '',
    regimen: '',
    startDate: new Date().toISOString().split('T')[0],
  });
  const [saved, setSaved] = useState(false);

  const patients = getData('tbPatients') || [];
  const update = (key, val) => setForm(f => ({ ...f, [key]: val }));

  // Generate adherence calendar (last 30 days)
  const generateCalendar = () => {
    const days = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const rand = Math.random();
      days.push({
        date: d.getDate(),
        status: i === 0 ? 'future' : rand > 0.15 ? 'taken' : 'missed'
      });
    }
    return days;
  };

  const calendarDays = generateCalendar();
  const takenCount = calendarDays.filter(d => d.status === 'taken').length;

  const handleSave = () => {
    appendData('tbPatients', form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id: 'enrollment', label: 'Enrollment' },
    { id: 'treatment', label: 'Treatment' },
    { id: 'adherence', label: 'Adherence' },
    { id: 'contacts', label: 'Contacts' },
  ];

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <AppBar title="TB Management" onBack={onBack} />

      <div className="screen-content">
        {/* Tabs */}
        <div className="tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              style={{ fontSize: 11 }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Enrollment Tab */}
        {activeTab === 'enrollment' && (
          <>
            <div className="card" style={{ marginBottom: 14 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                📋 Patient Details
              </p>

              <FormField label="Patient Name" required>
                <input type="text" className="form-input" placeholder="Full name"
                  value={form.name} onChange={e => update('name', e.target.value)} />
              </FormField>

              <div className="row-2col">
                <FormField label="Age" required>
                  <input type="number" className="form-input" placeholder="Years"
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

              <FormField label="TB Type" required>
                <select className="form-input" value={form.tbType} onChange={e => update('tbType', e.target.value)}>
                  <option value="">Select Type</option>
                  <option value="Pulmonary">Pulmonary TB</option>
                  <option value="Extra-pulmonary">Extra-pulmonary TB</option>
                  <option value="MDR-TB">MDR-TB</option>
                  <option value="XDR-TB">XDR-TB</option>
                </select>
              </FormField>

              <FormField label="Diagnostic Test" required>
                <select className="form-input" value={form.testType} onChange={e => update('testType', e.target.value)}>
                  <option value="">Select Test</option>
                  <option value="Sputum Smear">Sputum Smear Microscopy</option>
                  <option value="CBNAAT">CBNAAT / GeneXpert</option>
                  <option value="X-Ray">Chest X-Ray</option>
                  <option value="Culture">Culture & DST</option>
                </select>
              </FormField>
            </div>

            <div className="card" style={{ marginBottom: 14 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                🆔 Nikshay Registration
              </p>

              <FormField label="Nikshay ID" hint="Auto-generated">
                <input type="text" className="form-input" readOnly value={form.nikshayId} />
              </FormField>

              <FormField label="Enrollment Date">
                <input type="date" className="form-input"
                  value={form.startDate} onChange={e => update('startDate', e.target.value)} />
              </FormField>
            </div>

            <div className="card" style={{ marginBottom: 14 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                🏦 DBT Bank Details
              </p>

              <FormField label="Bank Name">
                <select className="form-input" value={form.dbtBank} onChange={e => update('dbtBank', e.target.value)}>
                  <option value="">Select Bank</option>
                  <option value="SBI">State Bank of India</option>
                  <option value="PNB">Punjab National Bank</option>
                  <option value="BOB">Bank of Baroda</option>
                  <option value="Canara">Canara Bank</option>
                  <option value="UCO">UCO Bank</option>
                </select>
              </FormField>

              <FormField label="Account Number">
                <input type="text" className="form-input" placeholder="Bank account number"
                  value={form.dbtAccount} onChange={e => update('dbtAccount', e.target.value)} />
              </FormField>
            </div>

            {saved ? (
              <div style={{
                background: 'rgba(22,163,74,0.1)', border: '1px solid rgba(22,163,74,0.3)',
                borderRadius: 12, padding: '14px', textAlign: 'center',
                color: 'var(--success)', fontWeight: 600, fontSize: 15, marginBottom: 16
              }}>
                ✅ TB Patient enrolled successfully!
              </div>
            ) : (
              <button className="btn btn-primary" onClick={handleSave} style={{ marginBottom: 16 }}>
                💾 Enroll Patient
              </button>
            )}
          </>
        )}

        {/* Treatment Tab */}
        {activeTab === 'treatment' && (
          <>
            <div className="card" style={{ marginBottom: 14 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                💊 Drug Regimen
              </p>

              <FormField label="Treatment Category">
                <select className="form-input" value={form.regimen} onChange={e => update('regimen', e.target.value)}>
                  <option value="">Select Regimen</option>
                  <option value="Cat-I">Category I (New Cases)</option>
                  <option value="Cat-II">Category II (Retreatment)</option>
                  <option value="MDR">MDR-TB Regimen</option>
                  <option value="Pediatric">Pediatric Regimen</option>
                </select>
              </FormField>

              {/* Drug table */}
              <div style={{ marginTop: 12 }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>
                  Intensive Phase (2 months):
                </p>
                {['Isoniazid (H)', 'Rifampicin (R)', 'Pyrazinamide (Z)', 'Ethambutol (E)'].map(drug => (
                  <div key={drug} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '8px 0', borderBottom: '1px solid var(--border)'
                  }}>
                    <span style={{ fontSize: 13, color: 'var(--text-primary)' }}>{drug}</span>
                    <span className="badge badge-primary" style={{ fontSize: 11 }}>Daily</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 12 }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>
                  Continuation Phase (4 months):
                </p>
                {['Isoniazid (H)', 'Rifampicin (R)'].map(drug => (
                  <div key={drug} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '8px 0', borderBottom: '1px solid var(--border)'
                  }}>
                    <span style={{ fontSize: 13, color: 'var(--text-primary)' }}>{drug}</span>
                    <span className="badge badge-success" style={{ fontSize: 11 }}>Daily</span>
                  </div>
                ))}
              </div>
            </div>

            {patients.length > 0 && (
              <div className="card" style={{ marginBottom: 14 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  📋 Enrolled Patients
                </p>
                {patients.map(p => (
                  <div key={p.id} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '10px 0', borderBottom: '1px solid var(--border)'
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 50,
                      background: 'var(--primary)', color: 'white',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 14, fontWeight: 700, flexShrink: 0
                    }}>
                      {p.name?.charAt(0) || 'M'}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{p.name}</p>
                      <p style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                        {p.tbType} · {p.nikshayId}
                      </p>
                    </div>
                    <span className="badge badge-success" style={{ fontSize: 10 }}>Active</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Adherence Tab */}
        {activeTab === 'adherence' && (
          <>
            <div className="card" style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  📅 99DOTS Adherence
                </p>
                <span style={{
                  background: takenCount >= 25 ? 'rgba(22,163,74,0.1)' : 'rgba(220,38,38,0.1)',
                  color: takenCount >= 25 ? 'var(--success)' : 'var(--danger)',
                  borderRadius: 20, padding: '3px 10px', fontSize: 12, fontWeight: 700
                }}>
                  {Math.round((takenCount / 29) * 100)}%
                </span>
              </div>

              <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 12 }}>
                Last 30 days — Mohan Lal (NK-MP-2024-00891)
              </p>

              {/* Day labels */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 4 }}>
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                  <div key={i} style={{ textAlign: 'center', fontSize: 10, color: 'var(--text-secondary)', fontWeight: 600 }}>
                    {d}
                  </div>
                ))}
              </div>

              <div className="adherence-calendar">
                {calendarDays.map((day, i) => (
                  <div key={i} className={`cal-day ${day.status}`} title={`Day ${day.date}`}>
                    {day.date}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 16, marginTop: 12, justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: 'var(--success)' }} />
                  <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Taken ({takenCount})</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: 'var(--danger)' }} />
                  <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Missed ({29 - takenCount})</span>
                </div>
              </div>
            </div>

            <div className="card" style={{ marginBottom: 14 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                📞 Record Today's Dose
              </p>
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="btn btn-primary" style={{ flex: 1 }}>
                  ✅ Dose Taken
                </button>
                <button className="btn btn-outline" style={{ flex: 1, borderColor: 'var(--danger)', color: 'var(--danger)' }}>
                  ❌ Dose Missed
                </button>
              </div>
            </div>
          </>
        )}

        {/* Contact Tracing Tab */}
        {activeTab === 'contacts' && (
          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              👥 Contact Tracing
            </p>

            <div style={{ marginBottom: 16 }}>
              {[
                { name: 'Sita Devi', relation: 'Wife', age: 38, status: 'Screened', result: 'Negative' },
                { name: 'Raju Lal', relation: 'Son', age: 12, status: 'Pending', result: '-' },
                { name: 'Geeta Bai', relation: 'Mother', age: 65, status: 'Screened', result: 'Negative' },
              ].map((contact, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 0', borderBottom: '1px solid var(--border)'
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 50,
                    background: '#E2E8F0', color: 'var(--text-secondary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14, fontWeight: 700, flexShrink: 0
                  }}>
                    {contact.name.charAt(0)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                      {contact.name} <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 400 }}>({contact.relation}, {contact.age}y)</span>
                    </p>
                    <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
                      Result: {contact.result}
                    </p>
                  </div>
                  <span className={`badge ${contact.status === 'Screened' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: 10 }}>
                    {contact.status}
                  </span>
                </div>
              ))}
            </div>

            <button className="btn btn-outline">
              + Add Contact
            </button>
          </div>
        )}
      </div>

      <BottomNav active="home" onNavigate={onNavigate} />
    </div>
  );
}

export default TBScreen;
