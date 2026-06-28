// Firma Frontier — UI Kit atoms
// Shared primitives: Orb, Wordmark, Kicker, Button, GradientGlow, Reveal, DotMatrix.
const { useEffect, useRef, useState } = React;

// ── Brand orb (image asset) ───────────────────────────────────────────────
// variant: "acid" (smooth pink→peach→yellow, default) · "yellow" (solid, for
// dark backgrounds) · "ink" (charcoal) · "mesh" (recolored mesh fill)
function Orb({ size = 30, variant = "acid", mono = false, style = {} }) {
  const v = mono ? "ink" : variant;
  const src = {
    acid:   "orb-acid-smooth.png",
    yellow: "orb-yellow-official.png",
    ink:    "orb-ink-official.png",
    white:  "orb-mask-official.png",
    mesh:   "orb-acid-meshfill.png",
  }[v] || "orb-acid-smooth.png";
  return (
    <img
      src={`../../assets/${src}`}
      alt="Firma Frontier"
      width={size} height={size}
      style={{ display: "block", ...style }}
    />
  );
}

// ── Lowercase wordmark — Space Grotesk 700, ligatures off ──────────────────
function Wordmark({ size = 21, color = "var(--ink)" }) {
  return (
    <span style={{
      fontFamily: 'var(--font-mark)', fontWeight: 700, fontSize: size,
      letterSpacing: "-0.047em", textTransform: "lowercase", color,
      fontFeatureSettings: '"liga" 0, "clig" 0, "calt" 0',
      WebkitFontFeatureSettings: '"liga" 0, "clig" 0, "calt" 0',
    }}>firma frontier</span>
  );
}

// ── Mono kicker / eyebrow ──────────────────────────────────────────────────
function Kicker({ children, color = "var(--ink-2)", style = {} }) {
  return (
    <span style={{
      fontFamily: "var(--font-mono)", fontWeight: 500, fontSize: 13,
      letterSpacing: "0.20em", textTransform: "uppercase", color, ...style,
    }}>{children}</span>
  );
}

// ── Buttons ────────────────────────────────────────────────────────────────
function Button({ children, variant = "primary", as = "button", href, onClick, style = {} }) {
  const [hover, setHover] = useState(false);
  const base = {
    fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 16, letterSpacing: "-0.02em",
    border: "none", cursor: "pointer", borderRadius: "var(--r-pill)",
    padding: variant === "quiet" ? "12px 4px" : "13px 26px",
    transition: "all var(--dur-fast) var(--ease)", textDecoration: "none",
    display: "inline-flex", alignItems: "center", gap: 8, lineHeight: 1, ...style,
  };
  const skins = {
    primary: { background: hover ? "var(--accent-press)" : "var(--accent)", color: "var(--accent-ink)",
               transform: hover ? "translateY(-1px)" : "none" },
    ghost:   { background: "#fff", color: "var(--ink)",
               border: `1px solid ${hover ? "var(--ink-2)" : "var(--ink-line)"}` },
    light:   { background: hover ? "rgba(255,255,255,.9)" : "#fff", color: "var(--ink)",
               transform: hover ? "translateY(-1px)" : "none" },
    quiet:   { background: "transparent", color: hover ? "var(--ink)" : "var(--ink-2)" },
  };
  const Tag = as;
  return (
    <Tag href={href} onClick={onClick}
      style={{ ...base, ...skins[variant], ...style }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      {children}
    </Tag>
  );
}

// ── Soft iridescent glow (atmospheric, placed behind a focal element) ──────
function GradientGlow({ w = 600, h = 360, blur = 70, opacity = 0.45, style = {} }) {
  return (
    <div aria-hidden="true" style={{
      position: "absolute", width: w, height: h, borderRadius: "50%",
      background: "var(--iridescent)", filter: `blur(${blur}px)`,
      opacity: `calc(var(--ff-glow, 1) * ${opacity})`,
      pointerEvents: "none", animation: "ffDrift 16s var(--ease-soft) infinite alternate",
      ...style,
    }} />
  );
}

// ── Scroll-reveal wrapper (fade + translate-up, respects reduced-motion) ───
function Reveal({ children, delay = 0, y = 24, as = "div", style = {}, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setShown(true); return; }
    const io = new IntersectionObserver((es) => {
      es.forEach(e => { if (e.isIntersecting) { setShown(true); io.disconnect(); } });
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Tag = as;
  return (
    <Tag ref={ref} style={{
      opacity: shown ? 1 : 0,
      transform: shown ? "none" : `translateY(${y}px)`,
      transition: `opacity var(--dur-slow) var(--ease) ${delay}ms, transform var(--dur-slow) var(--ease) ${delay}ms`,
      ...style,
    }} {...rest}>{children}</Tag>
  );
}

// ── React wrapper around the vanilla dot-matrix builder ────────────────────
function DotMatrix(props) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && window.buildDotMatrixCard) window.buildDotMatrixCard(ref.current, props);
  }, []);
  return <div ref={ref} style={{ width: "100%" }} />;
}

Object.assign(window, { Orb, Wordmark, Kicker, Button, GradientGlow, Reveal, DotMatrix });
