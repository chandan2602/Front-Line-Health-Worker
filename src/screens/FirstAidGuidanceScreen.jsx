import React, { useState } from 'react';

function BackIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>;
}

const firstAidGuides = [
  {
    id: 'cpr', icon: '❤️', title: 'CPR (Cardiac Arrest)', color: '#DC2626', bg: '#FEE2E2',
    steps: ['Call 108 immediately', 'Place person on firm flat surface', 'Kneel beside the person', 'Place heel of hand on center of chest', 'Push hard and fast - 100-120 compressions/min', 'Depth: 5-6 cm for adults', 'Give 2 rescue breaths after every 30 compressions', 'Continue until ambulance arrives']
  },
  {
    id: 'choking', icon: '🫁', title: 'Choking', color: '#F59E0B', bg: '#FEF3C7',
    steps: ['Ask "Are you choking?"', 'If they can cough - encourage coughing', 'If cannot cough/speak - act immediately', 'Stand behind person, lean them forward', 'Give 5 firm back blows between shoulder blades', 'Give 5 abdominal thrusts (Heimlich maneuver)', 'Alternate back blows and abdominal thrusts', 'Call 108 if object not dislodged']
  },
  {
    id: 'snakebite', icon: '🐍', title: 'Snake Bite', color: '#7C3AED', bg: '#EDE9FE',
    steps: ['Keep patient calm and still', 'Immobilize the bitten limb', 'Remove jewelry/tight clothing near bite', 'Keep bitten area below heart level', 'Do NOT cut, suck, or apply tourniquet', 'Do NOT apply ice or heat', 'Note time of bite and snake description', 'Rush to hospital immediately - anti-venom needed']
  },
  {
    id: 'burns', icon: '🔥', title: 'Burns', color: '#EA580C', bg: '#FFF7ED',
    steps: ['Remove from heat source safely', 'Cool burn with cool (not cold) running water for 20 min', 'Do NOT use ice, butter, or toothpaste', 'Remove jewelry/clothing near burn (if not stuck)', 'Cover with clean non-fluffy material', 'Do NOT burst blisters', 'For severe burns - call 108', 'For chemical burns - flush with water 20+ min']
  },
  {
    id: 'bleeding', icon: '🩸', title: 'Severe Bleeding', color: '#DC2626', bg: '#FEE2E2',
    steps: ['Apply direct pressure with clean cloth', 'Maintain pressure - do not remove cloth', 'Elevate injured area above heart if possible', 'Add more cloth if blood soaks through', 'Do NOT remove embedded objects', 'Apply pressure bandage', 'Call 108 for severe bleeding', 'Monitor for shock signs']
  },
  {
    id: 'fracture', icon: '🦴', title: 'Fracture / Dislocation', color: '#2563EB', bg: '#EFF6FF',
    steps: ['Do not move the injured area', 'Immobilize with splint (use available materials)', 'Pad the splint for comfort', 'Check circulation below injury', 'Apply ice pack wrapped in cloth', 'Do NOT try to straighten the bone', 'Elevate if possible', 'Transport to hospital carefully']
  },
  {
    id: 'drowning', icon: '🌊', title: 'Drowning', color: '#0891B2', bg: '#ECFEFF',
    steps: ['Ensure your own safety first', 'Call for help / 108', 'Remove from water safely', 'Check for breathing', 'If not breathing - start CPR immediately', 'Give 5 rescue breaths first', 'Continue CPR 30:2 ratio', 'Keep warm - prevent hypothermia']
  },
  {
    id: 'seizure', icon: '⚡', title: 'Seizure / Convulsion', color: '#7C3AED', bg: '#EDE9FE',
    steps: ['Stay calm - do not restrain', 'Clear area of hard/sharp objects', 'Cushion head with soft material', 'Turn on side (recovery position)', 'Do NOT put anything in mouth', 'Time the seizure', 'Call 108 if seizure > 5 minutes', 'Stay until fully conscious']
  }
];

export default function FirstAidGuidanceScreen({ onBack }) {
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = firstAidGuides.filter(g => g.title.toLowerCase().includes(search.toLowerCase()));

  if (selectedGuide) {
    const guide = firstAidGuides.find(g => g.id === selectedGuide);
    return (
      <div className="screen" style={{ background: 'var(--bg)' }}>
        <div style={{ background: guide.color, display: 'flex', alignItems: 'center', padding: '12px 16px', gap: 12, flexShrink: 0 }}>
          <button className="app-bar-icon-btn" onClick={() => setSelectedGuide(null)}><BackIcon /></button>
          <span style={{ flex: 1, fontSize: 17, fontWeight: 700, color: 'white', textAlign: 'center' }}>{guide.icon} {guide.title}</span>
          <div style={{ width: 30 }} />
        </div>
        <div className="screen-content">
          <div style={{ background: guide.bg, borderRadius: 16, padding: '16px', marginBottom: 16, textAlign: 'center' }}>
            <span style={{ fontSize: 48 }}>{guide.icon}</span>
            <p style={{ fontSize: 18, fontWeight: 800, color: guide.color, marginTop: 8 }}>{guide.title}</p>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>Follow these steps in order</p>
          </div>
          <div className="card">
            {guide.steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 0', borderBottom: i < guide.steps.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: guide.color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{i + 1}</div>
                <p style={{ fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.5, paddingTop: 4 }}>{step}</p>
              </div>
            ))}
          </div>
          <div style={{ background: '#FEE2E2', border: '1px solid #FECACA', borderRadius: 12, padding: '12px 16px', marginTop: 14, textAlign: 'center' }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#DC2626' }}>📞 Emergency: Call 108</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <div style={{ background: 'var(--primary)', display: 'flex', alignItems: 'center', padding: '12px 16px', gap: 12, flexShrink: 0 }}>
        <button className="app-bar-icon-btn" onClick={onBack}><BackIcon /></button>
        <span style={{ flex: 1, fontSize: 17, fontWeight: 700, color: 'white', textAlign: 'center' }}>First Aid Guidance</span>
        <div style={{ width: 30 }} />
      </div>
      <div style={{ background: '#FEE2E2', padding: '10px 16px', borderBottom: '1px solid #FECACA', textAlign: 'center' }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: '#DC2626' }}>📞 Emergency Ambulance: 108 | Maternal: 102</p>
      </div>
      <div className="screen-content">
        <div className="card" style={{ marginBottom: 14 }}>
          <input type="text" className="form-input" placeholder="🔍 Search first aid guide..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {filtered.map(guide => (
            <button key={guide.id} onClick={() => setSelectedGuide(guide.id)}
              style={{ background: guide.bg, borderRadius: 14, padding: '16px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer', border: `1.5px solid ${guide.color}30`, fontFamily: 'var(--font)', transition: 'all 0.2s' }}>
              <span style={{ fontSize: 32 }}>{guide.icon}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: guide.color, textAlign: 'center', lineHeight: 1.3 }}>{guide.title}</span>
              <span style={{ fontSize: 10, color: 'var(--text-secondary)' }}>{guide.steps.length} steps →</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
