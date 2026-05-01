import React from 'react';
import { getData } from '../utils/storage';
import { useLanguage } from '../contexts/LanguageContext';
import AppBar from '../components/AppBar';

function ProfileScreen({ onBack }) {
    const user = getData('user') || {};
    const { t } = useLanguage();

    const profileSections = [
        {
            title: 'Personal Information',
            items: [
                { label: 'Full Name', value: user.name || 'Priya Sharma', icon: '👤' },
                { label: 'Role', value: user.role || 'ANM', icon: '💼' },
                { label: 'User ID', value: user.userId || 'ANM-MP-2024-00142', icon: '🆔' },
                { label: 'Phone Number', value: user.phone || '+91-9876543210', icon: '📱' },
                { label: 'Email', value: user.email || 'priya.sharma@mohfw.gov.in', icon: '📧' }
            ]
        },
        {
            title: 'Work Location',
            items: [
                { label: 'Health Center', value: user.center || 'PHC Bhopal Urban, Sub-Center Ward-7', icon: '🏥' },
                { label: 'District', value: user.district || 'Bhopal', icon: '📍' },
                { label: 'State', value: user.state || 'Madhya Pradesh', icon: '🗺️' }
            ]
        },
        {
            title: 'Employment Details',
            items: [
                { label: 'Join Date', value: user.joinDate || '15 Jan 2023', icon: '📅' },
                { label: 'Employee ID', value: user.userId || 'ANM-MP-2024-00142', icon: '🔢' },
                { label: 'Department', value: 'Ministry of Health & Family Welfare', icon: '🏛️' }
            ]
        }
    ];

    return (
        <div className="screen" style={{ background: 'var(--bg)' }}>
            <AppBar title={t.profile || 'My Profile'} onBack={onBack} />

            <div className="screen-content">
                {/* Profile Header Card */}
                <div className="card" style={{ marginBottom: 20, textAlign: 'center' }}>
                    <div style={{
                        width: 80,
                        height: 80,
                        borderRadius: 50,
                        background: 'linear-gradient(135deg, var(--primary), #3B82F6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 12px',
                        fontSize: 32,
                        fontWeight: 700,
                        color: 'white',
                        boxShadow: '0 4px 12px rgba(27,79,155,0.3)'
                    }}>
                        {(user.name || 'P').charAt(0)}
                    </div>
                    <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
                        {user.name || 'Priya Sharma'}
                    </h2>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
                        <span style={{
                            background: 'rgba(27,79,155,0.1)',
                            color: 'var(--primary)',
                            borderRadius: 20,
                            padding: '4px 12px',
                            fontSize: 12,
                            fontWeight: 600
                        }}>
                            {user.role || 'ANM'}
                        </span>
                        <span style={{
                            background: 'rgba(22,163,74,0.1)',
                            color: 'var(--success)',
                            borderRadius: 20,
                            padding: '4px 12px',
                            fontSize: 12,
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4
                        }}>
                            <span style={{ width: 6, height: 6, borderRadius: 50, background: 'var(--success)' }} />
                            Active
                        </span>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                        {user.userId || 'ANM-MP-2024-00142'}
                    </p>
                </div>

                {/* Profile Sections */}
                {profileSections.map((section, idx) => (
                    <div key={idx} style={{ marginBottom: 20 }}>
                        <h3 style={{
                            fontSize: 14,
                            fontWeight: 700,
                            color: 'var(--text-primary)',
                            marginBottom: 12,
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            {section.title}
                        </h3>
                        <div className="card">
                            {section.items.map((item, i) => (
                                <div
                                    key={i}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 12,
                                        padding: '12px 0',
                                        borderBottom: i < section.items.length - 1 ? '1px solid var(--border)' : 'none'
                                    }}
                                >
                                    <div style={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: 8,
                                        background: 'rgba(27,79,155,0.08)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: 18,
                                        flexShrink: 0
                                    }}>
                                        {item.icon}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 2 }}>
                                            {item.label}
                                        </p>
                                        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>
                                            {item.value}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
                    <button
                        className="btn btn-outline"
                        onClick={() => alert('Edit profile feature coming soon!')}
                        style={{ flex: 1 }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                        Edit Profile
                    </button>
                    <button
                        className="btn btn-outline"
                        onClick={() => alert('Change password feature coming soon!')}
                        style={{ flex: 1 }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                            <path d="M7 11V7a5 5 0 0110 0v4"/>
                        </svg>
                        Change Password
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProfileScreen;
