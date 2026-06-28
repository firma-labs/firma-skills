/* THEOS Workstation — visionOS-style liquid glass over ambient room */

const { useState, useEffect, useRef } = React;

const App = () => {
  const [phase, setPhase] = useState('idle');
  const [transcript, setTranscript] = useState('');
  const [summoned, setSummoned] = useState(null);
  const [notifs, setNotifs] = useState([
    { id: 'n1', who: 'Sarah', msg: '"are we still on for 4?"', action: 'Reply', gesture: 'utter', gestureLabel: 'speak', kind: 'sarah', avatar: 'initial' },
    { id: 'n2', who: 'Firmamint', msg: '3 nodes drifted from consensus', action: 'Show', gesture: 'gaze', gestureLabel: 'dwell', kind: 'edge', avatar: 'firma' },
    { id: 'n3', who: 'Marco', msg: 'shared a node-health diff', action: 'Open', gesture: 'pinch', gestureLabel: 'place', kind: 'idle', avatar: 'initial' },
  ]);
  const [notifVisible, setNotifVisible] = useState(true);
  const [time, setTime] = useState('');
  const [dayMode, setDayMode] = useState(false);

  // Notifications stay pinned on the welcome view. They only melt away when a
  // sheet is summoned (so the surface clears for content). Reappear on idle.
  useEffect(() => {
    if (summoned) setNotifVisible(false);
    else setNotifVisible(true);
  }, [summoned]);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const h = d.getHours() % 12 || 12;
      const m = String(d.getMinutes()).padStart(2, '0');
      setTime(`${h}:${m}`);
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  const phrases = {
    'pull edge nodes': 'edge', 'show edge nodes': 'edge',
    'show treasury': 'treasury', 'pull treasury': 'treasury',
    'reply to sarah': 'sarah', 'reply sarah': 'sarah',
  };
  const summonFromPhrase = (text) => {
    const t = text.toLowerCase().trim();
    if (t.includes('notif')) return 'notifs';
    for (const [p, key] of Object.entries(phrases)) if (t.includes(p)) return key;
    return null;
  };
  const utter = (text) => {
    setTranscript(text); setPhase('listening');
    setTimeout(() => {
      const key = summonFromPhrase(text);
      if (key === 'notifs') { setNotifVisible(true); setPhase('idle'); }
      else if (key) { setSummoned(key); setPhase('summoned'); }
      else setPhase('idle');
    }, 700);
  };
  const letGo = () => { setSummoned(null); setPhase('idle'); setTranscript(''); };
  const handleNotif = (n) => {
    if (n.kind === 'sarah') { setSummoned('sarah'); setPhase('summoned'); }
    else if (n.kind === 'edge') { setSummoned('edge'); setPhase('summoned'); }
    setNotifVisible(false);
  };
  const dismissNotif = (id) => setNotifs(ns => ns.filter(n => n.id !== id));

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') letGo();
      // Press N to re-summon notifications
      if (e.key.toLowerCase() === 'n' && !e.target.matches('input,textarea')) setNotifVisible(true);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const greeting = (() => {
    const h = new Date().getHours();
    return h < 12 ? 'morning' : h < 18 ? 'afternoon' : 'evening';
  })();

  const bgImage = dayMode ? '../../assets/bg_room_day.jpg' : '../../assets/bg_room_night.jpg';
  const wash = dayMode
    ? 'linear-gradient(180deg, rgba(20,18,14,0.25), rgba(10,8,6,0.45))'
    : 'linear-gradient(180deg, rgba(8,10,18,0.45), rgba(4,6,12,0.65))';

  return (
    <div style={{
      position: 'fixed', inset: 0,
      overflow: 'hidden',
      backgroundColor: '#0A0B10',
    }}>
      {/* Ambient room */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        transition: 'background-image 800ms cubic-bezier(.32,.72,0,1)',
        filter: 'blur(0.5px)',
      }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: wash,
      }} />
      <div style={{
        position: 'absolute', right: '-5%', top: '5%', width: '50%', height: '70%',
        zIndex: 1, pointerEvents: 'none',
        background: dayMode
          ? 'radial-gradient(ellipse, rgba(255,210,150,0.18), transparent 65%)'
          : 'radial-gradient(ellipse, rgba(255,200,140,0.10), transparent 65%)',
        filter: 'blur(40px)',
        animation: 'caustic 16s ease-in-out infinite alternate',
      }} />

      {/* Top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 24px',
        fontSize: 13, color: 'rgba(244,245,247,0.7)',
        fontFamily: 'ui-monospace, SF Mono, Menlo, monospace',
        zIndex: 5,
        textShadow: '0 1px 2px rgba(0,0,0,0.5)',
        boxSizing: 'border-box',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* THEOS mark — tilted ellipse with horizontal stripes trailing right */}
          <img src="../../assets/theos-mark.png" alt=""
            style={{
              width: 26, height: 26, objectFit: 'contain', display: 'block',
              filter: 'invert(1) brightness(2)',
            }} />
          {/* THEOS wordmark — HTML text so it renders crisp */}
          <span style={{
            fontFamily: "'Gilroy Firma','Gilroy',system-ui,sans-serif",
            fontWeight: 700, fontSize: 17, letterSpacing: '-0.02em',
            color: '#FFFFFF', lineHeight: 1,
          }}>THEOS</span>
          <span style={{ opacity: 0.30, color: '#F4F5F7', margin: '0 2px' }}>·</span>
          <span style={{ opacity: 0.7, color: '#F4F5F7' }}>workstation</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: '0 0 auto' }}>
          <span>{time}</span>
        </div>
      </div>

      {/* Main grid: welcome left, notifications right. Flexible across widths. */}
      <div style={{
        position: 'absolute', top: 72, bottom: 120, left: 0, right: 0,
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) clamp(320px, 28vw, 400px)',
        gap: 32,
        padding: '40px 36px 24px',
        zIndex: 3,
        boxSizing: 'border-box',
        alignItems: 'start',
      }}>
        {/* Welcome / summoned column */}
        <div style={{ display: 'flex', alignItems: 'flex-start', minWidth: 0, height: '100%', overflow: 'auto' }}>
          {!summoned && (
            <div style={{ width: '100%', maxWidth: 620 }}>
              <div style={{
                fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em',
                color: 'rgba(244,245,247,0.65)', marginBottom: 18,
                fontFamily: 'ui-monospace, monospace',
                textShadow: '0 1px 4px rgba(0,0,0,0.5)',
              }}>
                Good {greeting} · Symbiotic Gestures
              </div>
              <div style={{
                fontSize: 'clamp(40px, 5.5vw, 64px)', fontWeight: 700,
                letterSpacing: '-0.025em', lineHeight: 1.0,
                color: '#F4F5F7',
                textShadow: '0 2px 16px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.5)',
              }}>
                Move. Speak.<br/>It follows.
              </div>
              <div style={{
                fontSize: 16, marginTop: 20, color: 'rgba(244,245,247,0.78)',
                lineHeight: 1.5, maxWidth: 460,
                textShadow: '0 1px 4px rgba(0,0,0,0.5)',
              }}>
                Speak to ask. Nod to send. Pinch to place. Look away to dismiss.
              </div>
              <div style={{ marginTop: 24, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {['pull edge nodes', 'show treasury', 'reply to sarah'].map(p => (
                  <PillButton key={p} onClick={() => utter(p)}
                    style={{ fontStyle: 'italic' }}>
                    “{p}”
                  </PillButton>
                ))}
              </div>
              <div style={{ marginTop: 28 }}>
                <ConnectorStrip items={[
                  { kind: 'slack', label: 'Slack', connected: true },
                  { kind: 'github', label: 'GitHub', connected: true },
                  { kind: 'figma', label: 'Figma', connected: true },
                  { kind: 'clickup', label: 'ClickUp', connected: true },
                  { kind: 'linear', label: 'Linear', connected: true },
                  { kind: 'notion', label: 'Notion', connected: false },
                  { kind: 'gcal', label: 'Calendar', connected: true },
                ]} />
              </div>
            </div>
          )}
          {summoned === 'edge' && <EdgeNodesSheet visible />}
          {summoned === 'treasury' && <TreasurySheet visible />}
          {summoned === 'sarah' && <SarahReplySheet visible />}
        </div>

        {/* Notifications column */}
        <div style={{
          opacity: notifVisible ? 1 : 0,
          transform: notifVisible ? 'translateY(0) scale(1)' : 'translateY(-6px) scale(0.97)',
          filter: notifVisible ? 'blur(0px)' : 'blur(8px)',
          transition: 'opacity 1400ms cubic-bezier(.32,.72,0,1), transform 1400ms cubic-bezier(.32,.72,0,1), filter 1400ms cubic-bezier(.32,.72,0,1)',
          pointerEvents: notifVisible ? 'auto' : 'none',
        }}>
          <Surface variant="glass" radius={28} padding={10}>
            <div style={{
              fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.10em', color: 'rgba(244,245,247,0.55)',
              padding: '4px 8px 8px',
              fontFamily: 'ui-monospace, SF Mono, Menlo, monospace',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span>Notifications · {notifs.length}</span>
              <span style={{ opacity: 0.6 }}>pinned</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {notifs.map(n => (
                <NotifRow key={n.id} {...n} onAction={() => handleNotif(n)} />
              ))}
            </div>
          </Surface>
        </div>
      </div>

      {/* Summoned controls */}
      {summoned && (
        <div style={{
          position: 'absolute', left: 36, bottom: 110,
          display: 'flex', gap: 10, zIndex: 6,
        }}>
          {summoned === 'sarah' && (
            <PillButton primary big gesture="nod" gestureLabel="send" onClick={() => { dismissNotif('n1'); letGo(); }}>
              Send THEO
            </PillButton>
          )}
          <PillButton dim gesture="turn" gestureLabel="let go" onClick={letGo}>
            Let go
          </PillButton>
        </div>
      )}

      {/* Ask dock — single luminous frosted-glass capsule (Control-Center idiom) */}
      <div style={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        zIndex: 10,
        width: 'min(640px, 64vw)',
      }}>
        <div className="ask-capsule" style={{
          position: 'relative',
          height: 72, borderRadius: 9999,
          background: 'rgba(255,255,255,0.18)',
          boxShadow: [
            '0 2px 4px rgba(0,0,0,0.10)',
            '0 32px 60px -18px rgba(0,0,0,0.55)',
            '0 12px 28px -10px rgba(0,0,0,0.40)',
            'inset 0 1px 0 rgba(255,255,255,0.55)',
            'inset 0 -1px 0 rgba(0,0,0,0.10)',
          ].join(', '),
          isolation: 'isolate',
          backdropFilter: 'blur(40px) saturate(140%)',
          WebkitBackdropFilter: 'blur(40px) saturate(140%)',
        }}>
          {/* diagonal hairline rim — bright TL → soft BR */}
          <div aria-hidden style={{
            position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none',
            padding: 1.5,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.10) 38%, rgba(255,255,255,0.04) 60%, rgba(255,255,255,0.32) 100%)',
            WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
            mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }} />

          {/* content row */}
          <div style={{
            position: 'relative',
            display: 'flex', alignItems: 'center', gap: 14,
            height: '100%', padding: '0 10px 0 24px',
            color: '#FFFFFF',
          }}>
            {/* leading listen ring — speaks "THEO is here, listening" */}
            <div style={{
              flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 36, height: 36,
            }}>
              <ListenRing active={phase === 'listening'} size={32} />
            </div>

            {/* input — type or speak */}
            <input type="text"
              placeholder={
                phase === 'listening' ? `${transcript}` :
                phase === 'summoned' ? `placed · ${transcript || summoned}` :
                'Ask THEO anything\u2026'
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) { utter(e.target.value); e.target.value = ''; }
              }}
              style={{
                flex: '1 1 auto', minWidth: 0,
                background: 'transparent', border: 'none', outline: 'none',
                fontSize: 18, fontWeight: 500, letterSpacing: '-0.005em',
                fontFamily: "'Supreme','Gilroy',system-ui,sans-serif",
                color: '#FFFFFF',
                textShadow: '0 1px 2px rgba(0,0,0,0.20)',
                padding: 0,
                height: '100%',
              }}
            />

            {/* ⌘K hint */}
            <span style={{
              flex: '0 0 auto',
              fontFamily: 'ui-monospace, SF Mono, Menlo, monospace',
              fontSize: 11, fontWeight: 600, letterSpacing: '0.04em',
              color: 'rgba(255,255,255,0.62)',
              padding: '0 4px',
            }}>⌘K</span>

            {/* mic — inner glass disc */}
            <button
              aria-label="speak"
              onClick={() => {
                const el = document.querySelector('input[type=text]');
                if (el && el.value.trim()) { utter(el.value); el.value = ''; }
              }}
              style={{
                position: 'relative',
                flex: '0 0 auto',
                width: 52, height: 52, borderRadius: 9999,
                background: phase === 'listening' ? '#FFFFFF' : 'rgba(255,255,255,0.28)',
                color: phase === 'listening' ? '#1A1A1A' : '#FFFFFF',
                border: 0, cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: phase === 'listening'
                  ? '0 2px 10px rgba(0,0,0,0.30), inset 0 -1px 0 rgba(0,0,0,0.05)'
                  : 'inset 0 1px 0 rgba(255,255,255,0.65), inset 0 -1px 0 rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.20)',
                isolation: 'isolate',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                transition: 'background 200ms ease, color 200ms ease',
              }}
            >
              {/* hairline rim on idle mic */}
              {phase !== 'listening' && (
                <span aria-hidden style={{
                  position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none',
                  padding: 1.2,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.10) 45%, rgba(255,255,255,0.04) 60%, rgba(255,255,255,0.30) 100%)',
                  WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                  mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                }} />
              )}
              <svg width="22" height="22" viewBox="0 0 24 24" style={{
                filter: phase === 'listening' ? 'none' : 'drop-shadow(0 1px 2px rgba(0,0,0,0.20))',
              }}>
                <rect x="9" y="3" width="6" height="12" rx="3" fill="currentColor"/>
                <path fill="currentColor" d="M6 11a1.4 1.4 0 0 1 2.8 0 3.2 3.2 0 0 0 6.4 0 1.4 1.4 0 0 1 2.8 0 6 6 0 0 1-4.6 5.83V19a1.4 1.4 0 0 1-2.8 0v-2.17A6 6 0 0 1 6 11Z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .ask-capsule input::placeholder{ color:rgba(255,255,255,0.78); }
        @keyframes caustic { 0%{transform:translate(0,0) scale(1)} 100%{transform:translate(-3%,4%) scale(1.05)} }
      `}</style>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
