import React, { useState } from 'react';
import StepIndicator from '../components/StepIndicator';

function GlobeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0110 0v4"/>
    </svg>
  );
}

function EyeIcon({ show }) {
  return show ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
}

function IDCardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2"/>
      <circle cx="8" cy="12" r="2"/>
      <path d="M14 9h4M14 12h4M14 15h2"/>
    </svg>
  );
}

function FingerprintIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B4F9B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 10a2 2 0 00-2 2c0 1.02-.1 2.51-.26 4"/>
      <path d="M14 13.12c0 2.38 0 6.38-1 8.88"/>
      <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02"/>
      <path d="M2 12a10 10 0 0118-6"/>
      <path d="M2 17.5a14.5 14.5 0 004.5-9.5"/>
      <path d="M21.5 17c-.28-2-.56-5.37-1.5-6.5"/>
      <path d="M6.2 22C6.81 19.23 7 17.5 7 14.5"/>
      <path d="M9 6.8a6 6 0 019 5.2c0 .47 0 1.17-.02 2"/>
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6"/>
    </svg>
  );
}

function LoginScreen({ onNavigate }) {
  const [role, setRole] = useState('ANM');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [firstTime, setFirstTime] = useState(true);
  const [aadhaarOpen, setAadhaarOpen] = useState(false);
  const [language, setLanguage] = useState('English');

  const handleSubmit = (e) => {
    e.preventDefault();
    onNavigate('otp');
  };

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      {/* Language Selector */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '12px 16px 0' }}>
        <button
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'white', border: '1px solid var(--border)',
            borderRadius: 20, padding: '6px 12px',
            fontSize: 13, fontWeight: 600, color: 'var(--text-primary)',
            cursor: 'pointer', fontFamily: 'var(--font)'
          }}
        >
          <GlobeIcon />
          {language} <ChevronIcon />
        </button>
      </div>

      {/* Logo & Title */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 16px 8px' }}>
        <div style={{
          width: 72, height: 72, borderRadius: 18,
          background: 'var(--primary)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 12, boxShadow: '0 4px 16px rgba(27,79,155,0.3)'
        }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M20 4L6 10v10c0 8.84 5.96 17.12 14 19.32C28.04 37.12 34 28.84 34 20V10L20 4z" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1.5"/>
            <path d="M20 13v14M13 20h14" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </div>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>FLHW App</h1>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 14 }}>Front Line Health Worker</p>

        {/* Badges */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{
            background: 'rgba(27,79,155,0.08)', color: 'var(--primary)',
            borderRadius: 20, padding: '5px 14px', fontSize: 11, fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: 5
          }}>
            🏳️ Ministry of Health &amp; Family Welfare, GoI
          </span>
          <span style={{
            background: 'rgba(22,163,74,0.1)', color: 'var(--success)',
            borderRadius: 20, padding: '5px 14px', fontSize: 11, fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: 5
          }}>
            ● Offline-capable · Works without internet
          </span>
        </div>
      </div>

      {/* Step Indicator */}
      <div style={{ padding: '0 16px' }}>
        <StepIndicator currentStep={1} />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ padding: '8px 16px 24px' }}>
        {/* Login Role */}
        <div className="form-group">
          <label className="form-label">Login Role</label>
          <div className="input-wrapper">
            <span className="input-icon-left"><IDCardIcon /></span>
            <select
              className="form-input with-icon-left"
              value={role}
              onChange={e => setRole(e.target.value)}
            >
              <option value="ANM">ANM</option>
              <option value="ASHA">ASHA / Sahiya</option>
              <option value="MPW">MPW</option>
              <option value="MO">Medical Officer</option>
            </select>
          </div>
        </div>

        {/* User ID */}
        <div className="form-group">
          <label className="form-label">User ID / ANM ID / Sahiya ID</label>
          <div className="input-wrapper">
            <span className="input-icon-left"><PersonIcon /></span>
            <input
              type="text"
              className="form-input with-icon-left"
              placeholder="e.g. ANM-MP-2024-00142"
              value={userId}
              onChange={e => setUserId(e.target.value)}
            />
          </div>
        </div>

        {/* Password */}
        <div className="form-group">
          <label className="form-label">Password</label>
          <div className="input-wrapper">
            <span className="input-icon-left"><LockIcon /></span>
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-input with-both-icons"
              placeholder="Default: Registered mobile number"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <span className="input-icon-right" onClick={() => setShowPassword(!showPassword)}>
              <EyeIcon show={showPassword} />
            </span>
          </div>
        </div>

        {/* First time + Forgot */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={firstTime}
              onChange={e => setFirstTime(e.target.checked)}
              style={{ display: 'none' }}
            />
            <div style={{
              width: 18, height: 18, borderRadius: 5,
              background: firstTime ? 'var(--primary)' : 'white',
              border: `2px solid ${firstTime ? 'var(--primary)' : 'var(--border)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s', flexShrink: 0
            }}>
              {firstTime && (
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <span style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 500 }}>First-time login</span>
          </label>
          <button type="button" style={{
            background: 'none', border: 'none', color: 'var(--primary)',
            fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font)'
          }}>
            Forgot Password?
          </button>
        </div>

        {/* Aadhaar Collapsible */}
        <div style={{
          background: 'white', borderRadius: 12, border: '1px solid var(--border)',
          marginBottom: 16, overflow: 'hidden'
        }}>
          <button
            type="button"
            onClick={() => setAadhaarOpen(!aadhaarOpen)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 10,
              padding: '12px 14px', background: 'none', border: 'none',
              cursor: 'pointer', fontFamily: 'var(--font)'
            }}
          >
            <FingerprintIcon />
            <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: 'var(--primary)', textAlign: 'left' }}>
              Link Aadhaar / ABHA ID (Optional)
            </span>
            <span style={{ transform: aadhaarOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', color: 'var(--text-secondary)' }}>
              <ChevronIcon />
            </span>
          </button>
          {aadhaarOpen && (
            <div style={{ padding: '0 14px 14px' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Aadhaar / ABHA ID</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter 12-digit Aadhaar or ABHA ID"
                />
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary" style={{ fontSize: 15, padding: '15px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
          </svg>
          Send OTP &amp; Continue
        </button>
      </form>
    </div>
  );
}

export default LoginScreen;
