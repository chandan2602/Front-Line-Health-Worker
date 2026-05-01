import React, { useState } from 'react';

function MicIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
      <line x1="12" y1="19" x2="12" y2="23"/>
      <line x1="8" y1="23" x2="16" y2="23"/>
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/>
      <path d="M19 12l.75 2.25L22 15l-2.25.75L19 18l-.75-2.25L16 15l2.25-.75L19 12z"/>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}

function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const handleVoiceClick = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
    setIsListening(!isListening);
    
    // Simulate voice recognition (in real app, use Web Speech API)
    if (!isListening) {
      setTimeout(() => {
        setTranscript('How can I help you today?');
        setIsListening(false);
      }, 2000);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsListening(false);
    setTranscript('');
  };

  return (
    <>
      {/* Floating AI Button */}
      <button
        onClick={handleVoiceClick}
        style={{
          position: 'fixed',
          bottom: isOpen ? '280px' : '80px',
          right: '16px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: isListening 
            ? 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)'
            : 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
          border: 'none',
          boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          transition: 'all 0.3s ease',
          animation: isListening ? 'pulse 1.5s infinite' : 'none'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 24px rgba(99, 102, 241, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(99, 102, 241, 0.4)';
        }}
      >
        {isListening ? <SparklesIcon /> : <MicIcon />}
      </button>

      {/* AI Assistant Panel */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '16px',
            width: '320px',
            maxHeight: '400px',
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
            zIndex: 999,
            overflow: 'hidden',
            animation: 'slideUp 0.3s ease'
          }}
        >
          {/* Header */}
          <div
            style={{
              background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <SparklesIcon />
              </div>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'white', margin: 0 }}>
                  AI Assistant
                </h3>
                <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.8)', margin: 0 }}>
                  {isListening ? 'Listening...' : 'Voice enabled'}
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                borderRadius: '8px',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <CloseIcon />
            </button>
          </div>

          {/* Content */}
          <div style={{ padding: '16px', maxHeight: '300px', overflowY: 'auto' }}>
            {/* Suggestions */}
            {!transcript && (
              <div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                  Try asking:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    '📋 Show today\'s tasks',
                    '🤰 Register new pregnant woman',
                    '💉 Check vaccination schedule',
                    '📊 View pending reports'
                  ].map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => setTranscript(suggestion)}
                      style={{
                        background: 'var(--bg)',
                        border: '1px solid var(--border)',
                        borderRadius: '10px',
                        padding: '10px 12px',
                        fontSize: '13px',
                        color: 'var(--text-primary)',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontFamily: 'var(--font)',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(99, 102, 241, 0.05)';
                        e.currentTarget.style.borderColor = '#6366F1';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'var(--bg)';
                        e.currentTarget.style.borderColor = 'var(--border)';
                      }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Response */}
            {transcript && (
              <div>
                <div
                  style={{
                    background: 'rgba(99, 102, 241, 0.1)',
                    borderRadius: '12px',
                    padding: '12px',
                    marginBottom: '12px'
                  }}
                >
                  <p style={{ fontSize: '13px', color: 'var(--text-primary)', margin: 0 }}>
                    {transcript}
                  </p>
                </div>
                <div
                  style={{
                    background: 'var(--bg)',
                    borderRadius: '12px',
                    padding: '12px'
                  }}
                >
                  <p style={{ fontSize: '13px', color: 'var(--text-primary)', margin: 0 }}>
                    I'm here to help! You can ask me about patient records, schedules, or navigate to any section.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div
            style={{
              padding: '12px 16px',
              borderTop: '1px solid var(--border)',
              background: 'var(--bg)'
            }}
          >
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)', textAlign: 'center', margin: 0 }}>
              Tap the mic button to speak
            </p>
          </div>
        </div>
      )}

      {/* Pulse Animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 4px 20px rgba(239, 68, 68, 0.4);
          }
          50% {
            box-shadow: 0 4px 30px rgba(239, 68, 68, 0.8);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}

export default AIAssistant;
