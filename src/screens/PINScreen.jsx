import React, { useState, useRef } from 'react';
import StepIndicator from '../components/StepIndicator';
import AppBar from '../components/AppBar';

function PINScreen({ onNavigate, onBack }) {
  const [pin, setPin] = useState(['', '', '', '']);
  const [confirmPin, setConfirmPin] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const pinRefs = useRef([]);
  const confirmRefs = useRef([]);

  const handlePinChange = (index, value, arr, setArr, refs) => {
    if (!/^\d*$/.test(value)) return;
    const newArr = [...arr];
    newArr[index] = value.slice(-1);
    setArr(newArr);
    if (value && index < 3) {
      refs.current[index + 1]?.focus();
    }
  };

  const handlePinKeyDown = (index, e, arr, refs) => {
    if (e.key === 'Backspace' && !arr[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  const handleSetPin = () => {
    const p1 = pin.join('');
    const p2 = confirmPin.join('');
    if (p1.length < 4) { setError('Please enter a 4-digit PIN'); return; }
    if (p1 !== p2) { setError('PINs do not match. Please try again.'); return; }
    setError('');
    onNavigate('dashboard');
  };

  const pinComplete = pin.every(d => d !== '');
  const confirmComplete = confirmPin.every(d => d !== '');

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <AppBar title="Set PIN" onBack={onBack} />

      <div style={{ padding: '0 16px' }}>
        <StepIndicator currentStep={3} />
      </div>

      <div style={{ padding: '8px 16px 24px' }}>
        {/* Header card */}
        <div className="card" style={{ marginBottom: 20, textAlign: 'center' }}>
          <div style={{
            width: 56, height: 56, borderRadius: 50,
            background: 'rgba(27,79,155,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 12px'
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
          </div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>
            Set 4-digit PIN
          </h2>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
            This PIN will be used for quick login next time
          </p>
        </div>

        {/* PIN Section */}
        <div className="card" style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12 }}>
            Enter PIN
          </p>
          <div className="pin-inputs">
            {pin.map((digit, index) => (
              <input
                key={index}
                ref={el => pinRefs.current[index] = el}
                type="password"
                inputMode="numeric"
                maxLength={1}
                className="pin-dot"
                value={digit}
                onChange={e => handlePinChange(index, e.target.value, pin, setPin, pinRefs)}
                onKeyDown={e => handlePinKeyDown(index, e, pin, pinRefs)}
                autoFocus={index === 0}
              />
            ))}
          </div>
        </div>

        {/* Confirm PIN Section */}
        <div className="card" style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12 }}>
            Confirm PIN
          </p>
          <div className="pin-inputs">
            {confirmPin.map((digit, index) => (
              <input
                key={index}
                ref={el => confirmRefs.current[index] = el}
                type="password"
                inputMode="numeric"
                maxLength={1}
                className="pin-dot"
                value={digit}
                onChange={e => handlePinChange(index, e.target.value, confirmPin, setConfirmPin, confirmRefs)}
                onKeyDown={e => handlePinKeyDown(index, e, confirmPin, confirmRefs)}
              />
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)',
            borderRadius: 10, padding: '10px 14px', marginBottom: 16,
            display: 'flex', alignItems: 'center', gap: 8
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--danger)" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span style={{ fontSize: 13, color: 'var(--danger)', fontWeight: 500 }}>{error}</span>
          </div>
        )}

        {/* PIN Tips */}
        <div style={{
          background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)',
          borderRadius: 10, padding: '10px 14px', marginBottom: 20
        }}>
          <p style={{ fontSize: 12, color: '#92400E', fontWeight: 500 }}>
            💡 Tips: Avoid using 1234, 0000, or your birth year as PIN
          </p>
        </div>

        {/* Set PIN Button */}
        <button
          className="btn btn-primary"
          onClick={handleSetPin}
          disabled={!pinComplete || !confirmComplete}
          style={{ opacity: (pinComplete && confirmComplete) ? 1 : 0.6 }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Set PIN &amp; Login
        </button>
      </div>
    </div>
  );
}

export default PINScreen;
