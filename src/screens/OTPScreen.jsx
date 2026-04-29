import React, { useState, useRef, useEffect } from 'react';
import StepIndicator from '../components/StepIndicator';
import AppBar from '../components/AppBar';

function OTPScreen({ onNavigate, onBack }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setTimer(30);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  const handleVerify = () => {
    onNavigate('pin');
  };

  const isComplete = otp.every(d => d !== '');

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <AppBar title="Verify OTP" onBack={onBack} />

      <div style={{ padding: '0 16px' }}>
        <StepIndicator currentStep={2} />
      </div>

      <div style={{ padding: '8px 16px 24px' }}>
        {/* Info card */}
        <div className="card" style={{ marginBottom: 20, textAlign: 'center' }}>
          <div style={{
            width: 56, height: 56, borderRadius: 50,
            background: 'rgba(27,79,155,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 12px'
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
          </div>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 4 }}>OTP sent to</p>
          <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>+91-XXXXXX7890</p>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 6 }}>
            Enter the 6-digit OTP received via SMS
          </p>
        </div>

        {/* OTP Inputs */}
        <div className="otp-inputs">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="tel"
              inputMode="numeric"
              maxLength={1}
              className="otp-input"
              value={digit}
              onChange={e => handleChange(index, e.target.value)}
              onKeyDown={e => handleKeyDown(index, e)}
              autoFocus={index === 0}
            />
          ))}
        </div>

        {/* Timer / Resend */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          {canResend ? (
            <button
              onClick={handleResend}
              style={{
                background: 'none', border: 'none', color: 'var(--primary)',
                fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font)'
              }}
            >
              Resend OTP
            </button>
          ) : (
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              Resend OTP in{' '}
              <span style={{ color: 'var(--primary)', fontWeight: 600 }}>
                00:{String(timer).padStart(2, '0')}
              </span>
            </p>
          )}
        </div>

        {/* Verify Button */}
        <button
          className="btn btn-primary"
          onClick={handleVerify}
          disabled={!isComplete}
          style={{ opacity: isComplete ? 1 : 0.6 }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Verify OTP
        </button>

        {/* Demo hint */}
        <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-secondary)', marginTop: 16 }}>
          Demo: Enter any 6 digits to continue
        </p>
      </div>
    </div>
  );
}

export default OTPScreen;
