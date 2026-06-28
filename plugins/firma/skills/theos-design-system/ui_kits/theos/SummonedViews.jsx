/* Summoned views — visionOS liquid glass over ambient room */

const EdgeNodesSheet = ({ visible }) => {
  if (!visible) return null;
  const nodes = [
    { id: 'EDG-001', region: 'sf-bay', status: 'consensus', drift: 0 },
    { id: 'EDG-014', region: 'frankfurt', status: 'consensus', drift: 0 },
    { id: 'EDG-022', region: 'tokyo', status: 'drift', drift: 12 },
    { id: 'EDG-028', region: 'são-paulo', status: 'consensus', drift: 0 },
    { id: 'EDG-031', region: 'sf-bay', status: 'drift', drift: 4 },
    { id: 'EDG-044', region: 'mumbai', status: 'drift', drift: 8 },
  ];
  return (
    <Surface variant="regular" radius={32} padding={24} lift style={{ width: 480 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.10em', color: 'rgba(244,245,247,0.65)' }}>Firmamint · live</div>
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', marginTop: 4, color: '#F4F5F7', whiteSpace: 'nowrap' }}>Edge nodes</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', color: '#F4F5F7' }}>42<span style={{ color: 'rgba(244,245,247,0.45)' }}>/45</span></div>
          <div style={{ fontSize: 11, color: 'rgba(244,245,247,0.65)' }}>3 drifted</div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {nodes.map(n => (
          <div key={n.id} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '11px 14px', borderRadius: 14,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.10)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.10)',
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: n.status === 'drift' ? '#F0B43A' : '#36D27A',
              boxShadow: n.status === 'drift' ? '0 0 12px rgba(240,180,58,0.85)' : '0 0 12px rgba(54,210,122,0.7)',
            }} />
            <div style={{ flex: 1, fontFamily: 'ui-monospace, monospace', fontSize: 12, color: '#F4F5F7' }}>{n.id}</div>
            <div style={{ fontSize: 11, color: 'rgba(244,245,247,0.6)', whiteSpace: 'nowrap' }}>{n.region}</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: n.status === 'drift' ? '#F0B43A' : 'rgba(244,245,247,0.45)', minWidth: 44, textAlign: 'right' }}>
              {n.status === 'drift' ? `+${n.drift}ms` : 'sync'}
            </div>
          </div>
        ))}
      </div>
      <div style={{
        marginTop: 16, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.10)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontSize: 11, color: 'rgba(244,245,247,0.6)',
      }}>
        <span>updated · just now</span>
      </div>
    </Surface>
  );
};

const TreasurySheet = ({ visible }) => {
  if (!visible) return null;
  return (
    <Surface variant="regular" radius={32} padding={24} lift style={{ width: 340 }}>
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.10em', color: 'rgba(244,245,247,0.65)' }}>Treasury</div>
      <div style={{ fontSize: 48, fontWeight: 800, letterSpacing: '-0.025em', marginTop: 6, color: '#F4F5F7', lineHeight: 1 }}>
        128.4 <span style={{ fontSize: 18, color: 'rgba(244,245,247,0.6)', fontWeight: 600 }}>FRMA</span>
      </div>
      <div style={{ fontSize: 13, color: '#36D27A', fontWeight: 600, marginTop: 6 }}>+4.2% · 7d</div>
      <div style={{
        marginTop: 18, height: 64, borderRadius: 14,
        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', alignItems: 'flex-end', padding: 8, gap: 4,
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
      }}>
        {[28,32,30,38,42,40,48,52,50,58,62,60,68,72].map((h,i) => (
          <div key={i} style={{
            flex: 1, height: `${h}%`, borderRadius: 2,
            background: i > 10 ? '#F4F5F7' : 'rgba(244,245,247,0.4)',
          }} />
        ))}
      </div>
    </Surface>
  );
};

const SarahReplySheet = ({ visible }) => {
  if (!visible) return null;
  return (
    <Surface variant="thick" radius={28} padding={22} lift style={{ width: 360 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <Avatar who="Sarah" kind="initial" />
        <div style={{ fontSize: 15, fontWeight: 700, color: '#F4F5F7' }}>Sarah</div>
        <div style={{ marginLeft: 'auto', fontSize: 10, color: 'rgba(244,245,247,0.5)', fontFamily: 'ui-monospace, monospace' }}>iMessage</div>
      </div>
      <div style={{
        padding: 16, borderRadius: 18,
        background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.14)',
        fontSize: 15, lineHeight: 1.4, color: '#F4F5F7',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15)',
      }}>
        "Yes — see you at 4. I'll bring the deck."
      </div>
      <div style={{ fontSize: 11, color: 'rgba(244,245,247,0.6)', marginTop: 10, fontStyle: 'italic' }}>
        THEO drafted · awaiting your nod
      </div>
    </Surface>
  );
};

Object.assign(window, { EdgeNodesSheet, TreasurySheet, SarahReplySheet });
