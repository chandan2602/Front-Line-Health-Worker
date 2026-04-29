import React, { useState } from 'react';
import { getData } from '../utils/storage';

function BackIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>;
}

export default function HBNCReportScreen({ onBack }) {
  const hbncVisits = getData('hbncVisits') || [];
  const hbycVisits = getData('hbycVisits') || [];
  const [activeTab, setActiveTab] = useState('hbnc');
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));

  const summaryData = [
    { label: 'Total HBNC Visits', value: hbncVisits.length || 12, color: 'var(--primary)' },
    { label: 'Total HBYC Visits', value: hbycVisits.length || 8, color: '#16A34A' },
    { label: 'Danger Signs Reported', value: 3, color: '#DC2626' },
    { label: 'Referrals Made', value: 2, color: '#B45309' },
  ];

  const demoHBNC = [
    { child: 'Baby of Sunita Devi', day: 'Day 1', date: '2024-08-01', weight: '2800g', status: 'Normal' },
    { child: 'Baby of Sunita Devi', day: 'Day 3', date: '2024-08-03', weight: '2750g', status: 'Jaundice' },
    { child: 'Baby of Meena Bai', day: 'Day 1', date: '2024-08-05', weight: '3100g', status: 'Normal' },
  ];

  const demoHBYC = [
    { child: 'Ravi Kumar', age: '6 months', date: '2024-08-10', weight: '7.2kg', milestones: '3/3' },
    { child: 'Priya Devi', age: '12 months', date: '2024-08-12', weight: '9.1kg', milestones: '2/3' },
  ];

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <div style={{ background: 'var(--primary)', display: 'flex', alignItems: 'center', padding: '12px 16px', gap: 12, flexShrink: 0 }}>
        <button className="app-bar-icon-btn" onClick={onBack}><BackIcon /></button>
        <span style={{ flex: 1, fontSize: 17, fontWeight: 700, color: 'white', textAlign: 'center' }}>HBNC/HBYC Report</span>
        <div style={{ width: 30 }} />
      </div>
      <div style={{ background: 'white', padding: '10px 16px', borderBottom: '1px solid var(--border)' }}>
        <div className="tabs" style={{ marginBottom: 0 }}>
          <button className={`tab-btn ${activeTab === 'hbnc' ? 'active' : ''}`} onClick={() => setActiveTab('hbnc')}>HBNC</button>
          <button className={`tab-btn ${activeTab === 'hbyc' ? 'active' : ''}`} onClick={() => setActiveTab('hbyc')}>HBYC</button>
          <button className={`tab-btn ${activeTab === 'summary' ? 'active' : ''}`} onClick={() => setActiveTab('summary')}>Summary</button>
        </div>
      </div>
      <div className="screen-content">
        <div className="card" style={{ marginBottom: 14 }}>
          <label className="form-label">Report Month</label>
          <input type="month" className="form-input" value={month} onChange={e => setMonth(e.target.value)} />
        </div>

        {activeTab === 'summary' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
              {summaryData.map(s => (
                <div key={s.label} className="card" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div className="card">
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Visit Completion Rate</p>
              {[{ label: 'Day 1 Visits', pct: 95 }, { label: 'Day 3 Visits', pct: 88 }, { label: 'Day 7 Visits', pct: 82 }, { label: 'Day 28 Visits', pct: 74 }, { label: 'Day 42 Visits', pct: 68 }].map(item => (
                <div key={item.label} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 13, color: 'var(--text-primary)' }}>{item.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)' }}>{item.pct}%</span>
                  </div>
                  <div style={{ height: 6, background: '#E2E8F0', borderRadius: 3 }}>
                    <div style={{ height: '100%', width: `${item.pct}%`, background: 'var(--primary)', borderRadius: 3 }} />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'hbnc' && (
          <div className="card">
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>HBNC Visit Records</p>
            {demoHBNC.map((r, i) => (
              <div key={i} style={{ padding: '10px 0', borderBottom: i < demoHBNC.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{r.child}</p>
                    <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{r.day} · {r.date} · {r.weight}</p>
                  </div>
                  <span className={`badge ${r.status === 'Normal' ? 'badge-success' : 'badge-danger'}`} style={{ fontSize: 10 }}>{r.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'hbyc' && (
          <div className="card">
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>HBYC Visit Records</p>
            {demoHBYC.map((r, i) => (
              <div key={i} style={{ padding: '10px 0', borderBottom: i < demoHBYC.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{r.child}</p>
                    <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{r.age} · {r.date} · {r.weight}</p>
                  </div>
                  <span className="badge badge-primary" style={{ fontSize: 10 }}>Milestones: {r.milestones}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
