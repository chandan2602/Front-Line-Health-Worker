import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { languages } from '../utils/translations';

function GlobeIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="2" y1="12" x2="22" y2="12"/>
            <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
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

function LanguageSelector({ variant = 'default' }) {
    const { language, setLanguage } = useLanguage();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownOpen && !event.target.closest('.language-selector')) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [dropdownOpen]);

    const isWhite = variant === 'white';

    return (
        <div className="language-selector" style={{ position: 'relative' }}>
            <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    background: isWhite ? 'white' : 'rgba(255,255,255,0.2)',
                    border: isWhite ? '1px solid var(--border)' : '1px solid rgba(255,255,255,0.3)',
                    borderRadius: 20, padding: '6px 12px',
                    fontSize: 13, fontWeight: 600,
                    color: isWhite ? 'var(--text-primary)' : 'white',
                    cursor: 'pointer', fontFamily: 'var(--font)'
                }}
            >
                <GlobeIcon />
                {language} <ChevronIcon />
            </button>

            {dropdownOpen && (
                <div style={{
                    position: 'absolute',
                    top: '40px',
                    right: '0',
                    background: 'white',
                    border: '1px solid var(--border)',
                    borderRadius: 12,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    overflow: 'hidden',
                    zIndex: 1000,
                    minWidth: '140px'
                }}>
                    {languages.map((lang) => (
                        <button
                            key={lang}
                            type="button"
                            onClick={() => {
                                setLanguage(lang);
                                setDropdownOpen(false);
                            }}
                            style={{
                                width: '100%',
                                padding: '10px 14px',
                                background: language === lang ? 'rgba(27,79,155,0.08)' : 'white',
                                border: 'none',
                                textAlign: 'left',
                                fontSize: 13,
                                fontWeight: language === lang ? 600 : 500,
                                color: language === lang ? 'var(--primary)' : 'var(--text-primary)',
                                cursor: 'pointer',
                                fontFamily: 'var(--font)',
                                transition: 'background 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                if (language !== lang) e.target.style.background = 'rgba(0,0,0,0.03)';
                            }}
                            onMouseLeave={(e) => {
                                if (language !== lang) e.target.style.background = 'white';
                            }}
                        >
                            {lang}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default LanguageSelector;
