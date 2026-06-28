/* THEOS components — over ambient room, visionOS liquid glass */

// Minimal vector glyphs for the symbiotic-gesture vocabulary.
// Stroke-based, monochrome, 14px viewBox. No emoji.
const GestureIcon = ({ kind, size = 12, stroke = 'currentColor' }) => {
  const sw = 1.4;
  const common = { width: size, height: size, viewBox: '0 0 14 14', fill: 'none', stroke, strokeWidth: sw, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (kind) {
    case 'gaze':  // eye, almond
      return (
        <svg {...common}>
          <path d="M1.5 7c1.6-2.4 3.4-3.6 5.5-3.6S11 4.6 12.5 7c-1.6 2.4-3.4 3.6-5.5 3.6S3 9.4 1.5 7Z" />
          <circle cx="7" cy="7" r="1.6" />
        </svg>
      );
    case 'nod':  // small downward arc
      return (
        <svg {...common}>
          <path d="M2.5 5.2c1.4 2.6 2.9 3.9 4.5 3.9s3.1-1.3 4.5-3.9" />
          <path d="M7 9.5v1.6" />
        </svg>
      );
    case 'pinch':  // two converging lines on a dot
      return (
        <svg {...common}>
          <path d="M2.5 2.5l3.2 3.2" />
          <path d="M11.5 2.5L8.3 5.7" />
          <circle cx="7" cy="7.5" r="1.6" />
          <path d="M5 11h4" />
        </svg>
      );
    case 'turn':  // arrow looking away
      return (
        <svg {...common}>
          <path d="M2 7h9" />
          <path d="M8.5 4.2L11.5 7l-3 2.8" />
        </svg>
      );
    case 'utter':  // soundwave
      return (
        <svg {...common}>
          <path d="M3 7v0" />
          <path d="M5.2 5.4v3.2" />
          <path d="M7 4v6" />
          <path d="M8.8 5.4v3.2" />
          <path d="M11 6.2v1.6" />
        </svg>
      );
    case 'brow':  // raised brow — small chevron with eye dot
      return (
        <svg {...common}>
          <path d="M3 5l4-1.6L11 5" />
          <circle cx="7" cy="9" r="1.4" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="7" cy="7" r="1.6" />
        </svg>
      );
  }
};

const Gesture = ({ kind, label }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 5,
    fontSize: 10, fontFamily: 'ui-monospace, SF Mono, Menlo, monospace',
    color: 'rgba(244,245,247,0.72)', textTransform: 'lowercase',
    padding: '2px 7px 2px 6px', borderRadius: 9999,
    background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.14)',
    whiteSpace: 'nowrap', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
  }}>
    <GestureIcon kind={kind} size={11} />
    <span>{label || kind}</span>
  </span>
);

// visionOS pill button — canonical recipe (luminosity glass / prominent / tinted)
// Uses Surface as base; falls back to plain div when only the visual is needed.
const PillButton = ({ children, gesture, gestureLabel, primary, dim, tinted, onClick, style, big }) => {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);

  const variant = primary ? 'prominent' : tinted ? 'tinted' : 'glass';
  const padding = big ? '0 26px' : '0 20px';
  const height  = big ? 56 : 44;
  const fontSize = big ? 17 : 15;

  // Hover/press state — overlay color, since Surface owns the base background
  const overlayBg = (() => {
    if (variant === 'prominent') return press ? 'rgba(0,0,0,0.06)' : hover ? 'rgba(0,0,0,0.03)' : 'transparent';
    if (variant === 'tinted')    return press ? 'rgba(0,0,0,0.10)' : hover ? 'rgba(255,255,255,0.06)' : 'transparent';
    // glass
    return press ? 'rgba(255,255,255,0.04)' : hover ? 'rgba(255,255,255,0.08)' : 'transparent';
  })();

  const fg = variant === 'prominent' ? '#1A1A1A' : '#FFFFFF';
  const dimFg = dim ? 'rgba(244,245,247,0.75)' : fg;

  const chipBg  = variant === 'prominent' ? 'rgba(26,26,26,0.06)'  : 'rgba(255,255,255,0.10)';
  const chipBd  = variant === 'prominent' ? 'rgba(26,26,26,0.10)'  : 'rgba(255,255,255,0.14)';
  const chipFg  = variant === 'prominent' ? 'rgba(26,26,26,0.62)'  : 'rgba(244,245,247,0.78)';

  return (
    <Surface
      variant={variant}
      radius={9999}
      padding={0}
      style={{
        display: 'inline-flex',
        cursor: 'pointer',
        transform: press ? 'scale(0.97)' : 'translateY(0)',
        transition: 'transform 120ms cubic-bezier(.32,.72,0,1)',
        ...(dim && { opacity: 0.85 }),
        ...style,
      }}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
    >
      <div style={{
        position: 'relative',
        display: 'inline-flex', alignItems: 'center', gap: 12,
        padding,
        height,
        fontSize,
        fontWeight: variant === 'prominent' ? 700 : 600,
        letterSpacing: '-0.005em',
        color: dimFg,
        whiteSpace: 'nowrap',
        borderRadius: 9999,
        background: overlayBg,
        transition: 'background 160ms cubic-bezier(.32,.72,0,1)',
      }}>
        <span>{children}</span>
        {gesture && (
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            fontSize: 10, fontFamily: 'ui-monospace, SF Mono, Menlo, monospace',
            color: chipFg,
            textTransform: 'lowercase',
            padding: '3px 7px 3px 6px', borderRadius: 9999,
            background: chipBg,
            border: `1px solid ${chipBd}`,
          }}>
            <GestureIcon kind={gesture} size={11} />
            <span>{gestureLabel || gesture}</span>
          </span>
        )}
      </div>
    </Surface>
  );
};

// THEOS chrome disc — used as ListenRing core and as the mark
const ChromeDisc = ({ size = 56 }) => (
  <div style={{
    width: size, height: size, borderRadius: '50%',
    position: 'relative',
    background: 'radial-gradient(circle at 32% 28%, #FFFFFF 0%, #DCE2EC 22%, #8893A6 55%, #2A2F3C 92%, #15171F 100%)',
    boxShadow: 'inset 0 2px 3px rgba(255,255,255,0.85), inset 0 -3px 6px rgba(0,0,0,0.55), 0 8px 22px rgba(0,0,0,0.55)',
  }}>
    <svg viewBox="0 0 48 48" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', mixBlendMode: 'overlay', opacity: 0.7 }}>
      <circle cx="24" cy="24" r="21" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="0.4" />
      <circle cx="24" cy="24" r="17" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.3" />
      <circle cx="24" cy="24" r="12" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.3" />
      <circle cx="24" cy="24" r="7" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.3" />
    </svg>
    <div style={{
      position: 'absolute', left: '20%', top: '15%', width: '35%', height: '20%',
      borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(255,255,255,0.85), transparent 70%)',
      filter: 'blur(2px)',
    }} />
  </div>
);

const ListenRing = ({ active = true, size = 56 }) => (
  <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    {/* Active state — fast triple ripple */}
    {active && [0,1,2].map(i => (
      <div key={i} style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.55)',
        animation: `theosListen 2.4s ${i * 0.8}s ease-out infinite`,
        opacity: 0,
      }} />
    ))}
    {/* Idle state — slow breathing halo (always present, fades out when active to avoid clash) */}
    {!active && (
      <>
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.30)',
          animation: 'theosBreath 3.6s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.12), transparent 70%)',
          animation: 'theosBreathGlow 3.6s ease-in-out infinite',
        }} />
      </>
    )}
    <img src="../../assets/theos_mark_on_dark.png" alt=""
      style={{
        width: size * 0.86, height: size * 0.86, objectFit: 'contain',
        filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.5))',
        animation: active ? 'none' : 'theosPulse 3.6s ease-in-out infinite',
      }} />
    <style>{`
      @keyframes theosListen {
        0% { transform: scale(0.85); opacity: 0.6; }
        100% { transform: scale(1.65); opacity: 0; }
      }
      @keyframes theosBreath {
        0%, 100% { transform: scale(1.0); opacity: 0.35; }
        50%      { transform: scale(1.18); opacity: 0; }
      }
      @keyframes theosBreathGlow {
        0%, 100% { transform: scale(0.95); opacity: 0.4; }
        50%      { transform: scale(1.25); opacity: 0; }
      }
      @keyframes theosPulse {
        0%, 100% { transform: scale(1.00); filter: drop-shadow(0 2px 6px rgba(0,0,0,0.5)); }
        50%      { transform: scale(1.04); filter: drop-shadow(0 2px 10px rgba(255,255,255,0.25)); }
      }
    `}</style>
  </div>
);

const NotifPill = ({ who, msg, action, gesture, gestureLabel, color, onAction }) => (
  <Surface variant="glass" radius={9999} padding={0}
    style={{ display: 'inline-flex', minWidth: 360 }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px 10px 10px', width: '100%' }}>
      <Avatar who={who} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '-0.01em', color: '#F4F5F7' }}>{who}</div>
        <div style={{ fontSize: 12, color: 'rgba(244,245,247,0.70)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{msg}</div>
      </div>
      <NotifActionChip action={action} gesture={gesture} gestureLabel={gestureLabel} onClick={onAction} />
    </div>
  </Surface>
);

// Notification action chip — small visionOS hairline pill, lives inside notif rows
const NotifActionChip = ({ action, gesture, gestureLabel, onClick }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        background: hover ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.10)',
        border: 0,
        borderRadius: 9999, padding: '6px 11px',
        fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
        color: '#F4F5F7', cursor: 'pointer', fontFamily: 'inherit',
        display: 'inline-flex', alignItems: 'center', gap: 6,
        whiteSpace: 'nowrap',
        transition: 'background 160ms cubic-bezier(.32,.72,0,1)',
      }}
    >
      {/* diagonal hairline */}
      <span aria-hidden style={{
        position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none',
        padding: 1,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.40) 0%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.10) 100%)',
        WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
        mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
        WebkitMaskComposite: 'xor', maskComposite: 'exclude',
      }} />
      {action}
      {gesture && (
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          fontSize: 9, fontFamily: 'ui-monospace, SF Mono, Menlo, monospace',
          color: 'rgba(244,245,247,0.78)', textTransform: 'lowercase',
          padding: '1px 5px 1px 4px', borderRadius: 9999,
          background: 'rgba(255,255,255,0.10)',
        }}>
          <GestureIcon kind={gesture} size={10} />
          <span>{gestureLabel || gesture}</span>
        </span>
      )}
    </button>
  );
};

// Flat notification row — lives INSIDE a glass shelf (not its own pill)
const NotifRow = ({ who, msg, action, gesture, gestureLabel, avatar, onAction }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '10px',
        borderRadius: 18,
        background: hover ? 'rgba(255,255,255,0.08)' : 'transparent',
        transition: 'background 180ms cubic-bezier(.32,.72,0,1)',
      }}
    >
      <Avatar who={who} kind={avatar} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '-0.01em', color: '#F4F5F7', lineHeight: 1.2 }}>{who}</div>
        <div style={{ fontSize: 12, color: 'rgba(244,245,247,0.72)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: 2 }}>{msg}</div>
      </div>
      <NotifActionChip action={action} gesture={gesture} gestureLabel={gestureLabel} onClick={onAction} />
    </div>
  );
};

// Tonal glass avatar — hairline-bordered chip, holds an initial or a brand mark.
const Avatar = ({ who, kind = 'initial' }) => {
  const base = {
    position: 'relative',
    width: 36, height: 36, flex: '0 0 36px',
    borderRadius: 12,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'rgba(255,255,255,0.10)',
    overflow: 'hidden',
  };
  const hairline = (
    <span aria-hidden style={{
      position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none',
      padding: 1,
      background: 'linear-gradient(135deg, rgba(255,255,255,0.40) 0%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.10) 100%)',
      WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
      mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
      WebkitMaskComposite: 'xor', maskComposite: 'exclude',
    }} />
  );
  if (kind === 'firma') {
    return (
      <div style={base}>
        {hairline}
        <img src="../../assets/firma-labs-mark.png" alt="Firma Labs"
          style={{ width: 22, height: 22, objectFit: 'contain', opacity: 0.95 }} />
      </div>
    );
  }
  return (
    <div style={base}>
      {hairline}
      <span style={{
        fontSize: 14, fontWeight: 700, color: '#F4F5F7',
        fontFamily: "'Supreme', system-ui, sans-serif",
        letterSpacing: '-0.01em',
      }}>{who[0]}</span>
    </div>
  );
};

// Connector — small glass tile with a brand glyph. Lit when "connected" (subtle ring + dot).
const ConnectorGlyph = ({ kind, size = 18 }) => {
  const s = { width: size, height: size, display: 'block' };
  switch (kind) {
    case 'slack':
      return (
        <svg viewBox="0 0 24 24" style={s}>
          <rect x="3.5" y="10.5" width="3" height="7" rx="1.5" fill="#36C5F0"/>
          <rect x="6.5" y="3.5" width="7" height="3" rx="1.5" fill="#2EB67D"/>
          <rect x="17.5" y="6.5" width="3" height="7" rx="1.5" fill="#ECB22E"/>
          <rect x="10.5" y="17.5" width="7" height="3" rx="1.5" fill="#E01E5A"/>
          <rect x="10.5" y="10.5" width="3" height="3" rx="1.5" fill="#36C5F0"/>
          <rect x="10.5" y="6.5" width="3" height="3" rx="1.5" fill="#2EB67D" transform="translate(0 -3)"/>
        </svg>
      );
    case 'github':
      return (
        <svg viewBox="0 0 24 24" style={s} fill="#F4F5F7">
          <path d="M12 2C6.48 2 2 6.58 2 12.22c0 4.51 2.87 8.34 6.84 9.69.5.09.68-.22.68-.49 0-.24-.01-.88-.01-1.72-2.78.62-3.37-1.36-3.37-1.36-.46-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.55-1.13-4.55-5.03 0-1.11.39-2.02 1.03-2.73-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.04A9.4 9.4 0 0 1 12 7.1c.85.004 1.7.117 2.5.34 1.91-1.31 2.75-1.04 2.75-1.04.55 1.4.2 2.44.1 2.7.64.71 1.03 1.62 1.03 2.73 0 3.91-2.34 4.77-4.57 5.02.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.04 10.04 0 0 0 22 12.22C22 6.58 17.52 2 12 2z"/>
        </svg>
      );
    case 'figma':
      return (
        <svg viewBox="0 0 24 24" style={s}>
          <path d="M8.5 12a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" fill="#1ABCFE"/>
          <path d="M5 19a3.5 3.5 0 0 1 3.5-3.5H12V19a3.5 3.5 0 1 1-7 0z" fill="#0ACF83"/>
          <path d="M12 2v7h3.5a3.5 3.5 0 1 0 0-7H12z" fill="#FF7262"/>
          <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" fill="#F24E1E"/>
          <path d="M5 12a3.5 3.5 0 0 1 3.5-3.5H12v7H8.5A3.5 3.5 0 0 1 5 12z" fill="#A259FF"/>
        </svg>
      );
    case 'clickup':
      return (
        <svg viewBox="0 0 24 24" style={s}>
          <defs>
            <linearGradient id="cu1" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#8930FD"/><stop offset="1" stopColor="#49CCF9"/></linearGradient>
            <linearGradient id="cu2" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#FF02F0"/><stop offset="1" stopColor="#FFC800"/></linearGradient>
          </defs>
          <path d="M3 16.6l3.4-2.6c1.6 2 3.4 3 5.6 3s4-.9 5.6-3L21 16.6c-2.3 3-5.2 4.6-9 4.6s-6.7-1.5-9-4.6z" fill="url(#cu2)"/>
          <path d="M12 6.7L6.5 11.5l-2.7-3.1L12 1.5l8.2 6.9-2.7 3.1L12 6.7z" fill="url(#cu1)"/>
        </svg>
      );
    case 'linear':
      return (
        <svg viewBox="0 0 24 24" style={s}>
          <defs><linearGradient id="lin1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#A8B1FF"/><stop offset="1" stopColor="#5E6AD2"/></linearGradient></defs>
          <path d="M12 2a10 10 0 0 1 10 10c0 .3-.01.6-.03.9L11.1 2.03c.3-.02.6-.03.9-.03zM2.83 9.74L14.26 21.17c-.83.31-1.7.55-2.6.7L2.13 12.34c.15-.9.39-1.77.7-2.6zM2.04 14.76l7.2 7.2c-.55-.04-1.09-.11-1.62-.22L2.26 16.38c-.11-.53-.18-1.07-.22-1.62zM3.96 6.78L17.22 20.04a10.05 10.05 0 0 1-2.05 1.27L2.69 8.83a10.05 10.05 0 0 1 1.27-2.05zM6.78 3.96L20.04 17.22a10.05 10.05 0 0 1-1.27 2.05L4.71 5.21c.61-.46 1.3-.88 2.07-1.25z" fill="url(#lin1)"/>
        </svg>
      );
    case 'notion':
      return (
        <svg viewBox="0 0 24 24" style={s}>
          <rect x="3" y="3" width="18" height="18" rx="3" fill="#FFFFFF"/>
          <path d="M7.5 7.2v9.6c0 .4.2.6.6.6l1.5.1c.3 0 .5-.2.5-.5V11l4.6 6.6c.3.4.6.5 1 .5h1.5c.4 0 .6-.2.6-.6V7.7c0-.4-.2-.6-.6-.6l-1.5-.1c-.3 0-.5.2-.5.5v6.1L10.6 7c-.3-.4-.6-.5-1-.5H8.1c-.4 0-.6.2-.6.6z" fill="#0B0F14"/>
        </svg>
      );
    case 'gcal':
      return (
        <svg viewBox="0 0 24 24" style={s}>
          <rect x="4" y="4" width="16" height="16" rx="2" fill="#FFFFFF"/>
          <path d="M4 4h16v4H4z" fill="#4285F4"/>
          <path d="M4 16h16v4H4z" fill="#1A73E8" opacity=".15"/>
          <text x="12" y="17" textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="ui-sans-serif, system-ui" fill="#1A73E8">31</text>
          <rect x="7" y="2" width="2" height="4" rx="1" fill="#1A73E8"/>
          <rect x="15" y="2" width="2" height="4" rx="1" fill="#1A73E8"/>
        </svg>
      );
    default:
      return <svg viewBox="0 0 24 24" style={s}><circle cx="12" cy="12" r="6" fill="#888"/></svg>;
  }
};

const Connector = ({ kind, label, connected = true, onClick }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      title={label || kind}
      style={{
        position: 'relative',
        width: 44, height: 44, borderRadius: 12,
        background: hover ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.08)',
        border: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', padding: 0,
        transition: 'background 180ms cubic-bezier(.32,.72,0,1)',
        opacity: connected ? 1 : 0.55,
      }}
    >
      {/* hairline */}
      <span aria-hidden style={{
        position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none',
        padding: 1,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.40) 0%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.10) 100%)',
        WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
        mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
        WebkitMaskComposite: 'xor', maskComposite: 'exclude',
      }} />
      <ConnectorGlyph kind={kind} size={20} />
      {connected && (
        <span style={{
          position: 'absolute', right: -2, bottom: -2,
          width: 10, height: 10, borderRadius: 9999,
          background: 'radial-gradient(circle at 35% 30%, #F4F5F7, #DCE2EC)',
          boxShadow: '0 0 0 2px rgba(11,15,20,0.85), 0 0 8px rgba(220,226,236,0.6)',
        }} />
      )}
    </button>
  );
};

const ConnectorStrip = ({ items }) => (
  <Surface variant="glass" radius={9999} padding={0} style={{ display: 'inline-flex' }}>
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 12px' }}>
      <span style={{
        fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.10em',
        color: 'rgba(244,245,247,0.65)', fontFamily: 'ui-monospace, SF Mono, Menlo, monospace',
        padding: '0 8px 0 4px',
      }}>Connected</span>
      {items.map(it => <Connector key={it.kind} {...it} />)}
    </div>
  </Surface>
);

Object.assign(window, { Gesture, GestureIcon, PillButton, ListenRing, NotifPill, NotifRow, NotifActionChip, Avatar, ChromeDisc, Connector, ConnectorStrip });
