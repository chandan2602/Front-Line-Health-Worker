import React, { useState } from 'react';
import AppBar from '../components/AppBar';
import BottomNav from '../components/BottomNav';
import { getData } from '../utils/storage';

const reportModules = [
  { name: 'Household Enumeration Report', icon: '🏠', format: ['PDF', 'Excel'] },
  { name: 'ANC Services Report', icon: '🤰', format: ['PDF', 'Excel'] },
  { name: 'Delivery & PNC Report', icon: '🏥', format: ['PDF', 'Excel'] },
  { name: 'NCD Screening Report', icon: '🩺', format: ['PDF', 'Excel'] },
  { name: 'TB Management Report', icon: '💊', format: ['PDF', 'Excel'] },
  { name: 'VHSND Session Report', icon: '📋', format: ['PDF'] },
  { name: 'HRP Cases Summary', icon: '⚠️', format: ['PDF', 'Excel'] },
  { name: 'Monthly Progress Report', icon: '📊', format: ['PDF', 'Excel'] },
];

function ReportsScreen({ onNavigate, onBack }) {
  const [dateFrom, setDateFrom] = useState('2024-07-01');
  const [dateTo, setDateTo] = useState(new Date().toISOString().split('T')[0]);
  const [downloading, setDownloading] = useState(null);

  const pregnantWomen = getData('pregnantWomen') || [];
  const ancVisits = getData('ancVisits') || [];
  const tbPatients = getData('tbPatients') || [];
  const households = getData('households') || [];

  const summaryCards = [
    { label: 'Total Beneficiaries', value: pregnantWomen.length + 12, icon: '👥', color: 'var(--primary)' },
    { label: 'ANC Done', value: ancVisits.length + 8, icon: '✅', color: 'var(--success)' },
    { label: 'Deliveries', value: 4, icon: '🏥', color: '#7C3AED' },
    { label: 'TB Cases', value: tbPatients.length + 2, icon: '💊', color: 'var(--danger)' },
  ];

  const handleDownload = (reportName, format) => {
    setDownloading(`${reportName}-${format}`);
    setTimeout(() => setDownloading(null), 1500);
  };

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <AppBar title="Reports & Analytics" onBack={onBack} />

      <div className="screen-content">
        {/* Date Range */}
        <div className="card" style={{ marginBottom: 14 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            📅 Date Range
          </p>
          <div className="row-2col">
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">From</label>
              <input type="date" className="form-input"
                value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">To</label>
              <input type="date" className="form-input"
                value={dateTo} onChange={e => setDateTo(e.target.value)} />
            </div>
          </div>

          {/* Quick Range Buttons */}
          <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
            {['This Week', 'This Month', 'Last Month', 'This Quarter'].map(range => (
              <button
                key={range}
                style={{
                  background: 'var(--input-bg)', border: '1px solid var(--border)',
                  borderRadius: 20, padding: '5px 12px', fontSize: 11, fontWeight: 500,
                  cursor: 'pointer', color: 'var(--text-secondary)', fontFamily: 'var(--font)'
                }}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Summary Cards */}
        <div style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>
            Summary
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {summaryCards.map((card, i) => (
              <div key={i} className="card" style={{ textAlign: 'center', padding: '14px 10px' }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{card.icon}</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: card.color, lineHeight: 1 }}>
                  {card.value}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4, fontWeight: 500 }}>
                  {card.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Charts Placeholder */}
        <div className="card" style={{ marginBottom: 14 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            📈 ANC Coverage Trend
          </p>
          <div style={{ height: 100, display: 'flex', alignItems: 'flex-end', gap: 6, padding: '0 4px' }}>
            {[65, 72, 68, 80, 75, 88, 92].map((val, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{
                  width: '100%', height: `${val}%`,
                  background: `rgba(27,79,155,${0.4 + (i * 0.08)})`,
                  borderRadius: '4px 4px 0 0',
                  transition: 'height 0.3s ease'
                }} />
                <span style={{ fontSize: 9, color: 'var(--text-secondary)' }}>
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][i]}
                </span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 11, color: 'var(--text-secondary)', textAlign: 'center', marginTop: 8 }}>
            ANC 1st Visit Coverage (%)
          </p>
        </div>

        {/* HRP Distribution */}
        <div className="card" style={{ marginBottom: 14 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            ⚠️ HRP Distribution
          </p>
          {[
            { condition: 'Anaemia', count: 8, pct: 62 },
            { condition: 'Hypertension', count: 4, pct: 31 },
            { condition: 'Diabetes', count: 3, pct: 23 },
            { condition: 'Pre-eclampsia', count: 2, pct: 15 },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: 'var(--text-primary)', fontWeight: 500 }}>{item.condition}</span>
                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{item.count} cases</span>
              </div>
              <div style={{ height: 6, background: '#E2E8F0', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', background: 'var(--hrp-red)',
                  width: `${item.pct}%`, borderRadius: 3
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* Report Downloads */}
        <div className="card" style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            📥 Download Reports
          </p>
          {reportModules.map((report, i) => (
            <div key={i} className="report-row">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 18 }}>{report.icon}</span>
                <span className="report-name">{report.name}</span>
              </div>
              <div className="report-actions">
                {report.format.map(fmt => (
                  <button
                    key={fmt}
                    className="btn btn-outline btn-sm"
                    onClick={() => handleDownload(report.name, fmt)}
                    style={{
                      fontSize: 11, padding: '5px 10px',
                      background: downloading === `${report.name}-${fmt}` ? 'var(--primary)' : 'transparent',
                      color: downloading === `${report.name}-${fmt}` ? 'white' : 'var(--primary)',
                    }}
                  >
                    {downloading === `${report.name}-${fmt}` ? '⟳' : fmt === 'PDF' ? '📄' : '📊'} {fmt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav active="more" onNavigate={onNavigate} />
    </div>
  );
}

export default ReportsScreen;
