import React, { useState } from 'react';
import AppBar from '../components/AppBar';
import BottomNav from '../components/BottomNav';
import { getData } from '../utils/storage';

const modules = [
  { name: 'Household Enumeration', icon: '🏠', pending: 3 },
  { name: 'Pregnant Women', icon: '🤰', pending: 2 },
  { name: 'ANC Visits', icon: '❤️', pending: 5 },
  { name: 'NCD Screenings', icon: '🩺', pending: 1 },
  { name: 'TB Management', icon: '💊', pending: 0 },
  { name: 'Deliveries', icon: '🏥', pending: 1 },
];

const syncHistory = [
  { time: '2024-07-15 14:32', records: 12, status: 'success' },
  { time: '2024-07-14 09:15', records: 8, status: 'success' },
  { time: '2024-07-13 16:45', records: 3, status: 'partial' },
  { time: '2024-07-12 11:20', records: 15, status: 'success' },
];

function SyncScreen({ onNavigate, onBack }) {
  const [syncing, setSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [lastSynced, setLastSynced] = useState('Today, 2:32 PM');
  const [syncDone, setSyncDone] = useState(false);
  const [moduleStates, setModuleStates] = useState(modules.map(m => ({ ...m })));

  const totalPending = moduleStates.reduce((sum, m) => sum + m.pending, 0);

  const handleSyncAll = () => {
    setSyncing(true);
    setSyncProgress(0);
    setSyncDone(false);

    const interval = setInterval(() => {
      setSyncProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setSyncing(false);
          setSyncDone(true);
          setLastSynced('Just now');
          setModuleStates(ms => ms.map(m => ({ ...m, pending: 0 })));
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <AppBar title="Sync Manager" onBack={onBack} />

      <div className="screen-content">
        {/* Status Card */}
        <div className="card" style={{ marginBottom: 14, textAlign: 'center' }}>
          <div style={{
            width: 64, height: 64, borderRadius: 50,
            background: syncDone ? 'rgba(22,163,74,0.1)' : 'rgba(27,79,155,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 12px', fontSize: 28
          }}>
            {syncDone ? '✅' : '🔄'}
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>Last Synced</p>
          <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>{lastSynced}</p>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 6 }}>
            {totalPending > 0
              ? `${totalPending} records pending upload`
              : 'All records synced ✓'}
          </p>

          {/* Network Status */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            marginTop: 12, padding: '8px 16px',
            background: 'rgba(22,163,74,0.08)', borderRadius: 20
          }}>
            <div style={{ width: 8, height: 8, borderRadius: 50, background: 'var(--success)' }} />
            <span style={{ fontSize: 12, color: 'var(--success)', fontWeight: 600 }}>
              Connected to NHM Server
            </span>
          </div>
        </div>

        {/* Sync Progress */}
        {syncing && (
          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 10 }}>
              Syncing... {syncProgress}%
            </p>
            <div style={{
              height: 8, background: '#E2E8F0', borderRadius: 4, overflow: 'hidden'
            }}>
              <div style={{
                height: '100%', background: 'var(--primary)',
                width: `${syncProgress}%`, borderRadius: 4,
                transition: 'width 0.2s ease'
              }} />
            </div>
            <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 8 }}>
              Uploading records to NHM server...
            </p>
          </div>
        )}

        {/* Sync All Button */}
        <button
          className="btn btn-primary"
          onClick={handleSyncAll}
          disabled={syncing || totalPending === 0}
          style={{
            marginBottom: 16,
            opacity: (syncing || totalPending === 0) ? 0.6 : 1,
            fontSize: 16, padding: '16px'
          }}
        >
          {syncing ? '⟳ Syncing...' : syncDone ? '✅ All Synced' : `🔄 Sync All (${totalPending} records)`}
        </button>

        {/* Module-wise Pending */}
        <div className="card" style={{ marginBottom: 14 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            📦 Pending by Module
          </p>
          {moduleStates.map((module, i) => (
            <div key={i} className="sync-module-row">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 18 }}>{module.icon}</span>
                <span className="sync-module-name">{module.name}</span>
              </div>
              {module.pending > 0 ? (
                <span className="sync-count-badge">{module.pending}</span>
              ) : (
                <span style={{ fontSize: 18 }}>✅</span>
              )}
            </div>
          ))}
        </div>

        {/* Conflict Resolution */}
        <div className="card" style={{ marginBottom: 14 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            ⚠️ Conflict Resolution
          </p>
          <div style={{
            background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)',
            borderRadius: 10, padding: '12px'
          }}>
            <p style={{ fontSize: 13, color: '#92400E', fontWeight: 500, marginBottom: 8 }}>
              1 conflict detected
            </p>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 10 }}>
              ANC Visit for Sunita Devi — local vs server version differ
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-primary btn-sm" style={{ flex: 1 }}>Keep Local</button>
              <button className="btn btn-outline btn-sm" style={{ flex: 1 }}>Keep Server</button>
            </div>
          </div>
        </div>

        {/* Sync History */}
        <div className="card" style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            📜 Sync History
          </p>
          {syncHistory.map((entry, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 0', borderBottom: i < syncHistory.length - 1 ? '1px solid var(--border)' : 'none'
            }}>
              <div>
                <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{entry.time}</p>
                <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
                  {entry.records} records uploaded
                </p>
              </div>
              <span className={`badge ${entry.status === 'success' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: 10 }}>
                {entry.status === 'success' ? '✓ Success' : '⚠ Partial'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <BottomNav active="more" onNavigate={onNavigate} />
    </div>
  );
}

export default SyncScreen;
