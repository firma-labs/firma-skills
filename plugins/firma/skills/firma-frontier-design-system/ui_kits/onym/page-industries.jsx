// Onym Capital — Industries page body. Two layouts switchable via Tweak:
//   "Grid"  — cards, each with its dot-matrix glyph; hover re-seeds the glyph
//   "Index" — big editorial sector list; hover reveals desc + glyph on the right
const { useState: useStateOIB, useEffect: useEffectOIB, useRef: useRefOIB } = React;

// ── Sliding-indicator tab control (Vercel / Linear style) ───────────────────
// A pill rail with one highlight that springs between options on select.
function SlideTabs({ options, value, onChange }) {
  const wrapRef = useRefOIB(null);
  const [ind, setInd] = useStateOIB({ left: 0, width: 0, ready: false });
  useEffectOIB(() => {
    const wrap = wrapRef.current; if (!wrap) return;
    const measure = () => {
      const i = Math.max(0, options.indexOf(value));
      const btn = wrap.querySelectorAll("[data-tab]")[i];
      if (btn) setInd({ left: btn.offsetLeft, width: btn.offsetWidth, ready: true });
    };
    measure();
    const ro = new ResizeObserver(measure); ro.observe(wrap);
    return () => ro.disconnect();
  }, [value, options]);
  return (
    <div ref={wrapRef} role="tablist" style={{
      position: "relative", display: "inline-flex", gap: 2, padding: 4,
      borderRadius: "var(--r-pill)", background: "var(--d-surface-2)",
      border: "1px solid var(--d-hairline)",
    }}>
      <div aria-hidden="true" style={{
        position: "absolute", top: 4, bottom: 4, left: ind.left, width: ind.width,
        borderRadius: "var(--r-pill)", background: "var(--d-ink)", opacity: ind.ready ? 1 : 0,
        transition: "left .34s cubic-bezier(.22,1,.36,1), width .34s cubic-bezier(.22,1,.36,1), opacity .2s ease",
      }} />
      {options.map((opt) => {
        const on = opt === value;
        return (
          <button key={opt} data-tab role="tab" aria-selected={on} onClick={() => onChange(opt)}
            style={{
              position: "relative", zIndex: 1, border: "none", background: "transparent", cursor: "pointer",
              fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase",
              padding: "9px 22px", color: on ? "var(--d-surface-2)" : "var(--d-ink-2)",
              transition: "color .22s var(--ease)",
            }}>{opt}</button>
        );
      })}
    </div>
  );
}

// ── Layout A: signature grid ───────────────────────────────────────────────
function OnymGlyphCard({ n, title, desc, delay }) {
  const [h, setH] = useStateOIB(false);
  const [phase, setPhase] = useStateOIB(0);
  return (
    <Reveal delay={delay} as="article"
      onMouseEnter={() => { setH(true); setPhase(p => p + 1); }}
      onMouseLeave={() => setH(false)}
      style={{
        background: h ? "var(--d-surface-3)" : "var(--d-surface-2)",
        border: "1px solid var(--d-hairline)", borderRadius: "var(--r-lg)",
        padding: "26px 28px 30px", minHeight: 230, boxSizing: "border-box",
        boxShadow: h ? "var(--d-shadow)" : "none",
        transform: h ? "translateY(-3px)" : "none",
        transition: "background .18s ease, transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease)",
        display: "flex", flexDirection: "column",
      }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em", color: h ? "#f7ff05" : "var(--d-ink-3)", transition: "color .18s ease" }}>{n}</div>
        <DotGlyph seed={title} phase={phase} on={h} />
      </div>
      <h2 className="ff-h3" style={{ fontSize: "clamp(20px,2vw,25px)", color: "var(--d-ink)", marginBottom: 12 }}>{title}</h2>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 15.5, lineHeight: 1.5, color: "var(--d-ink-2)", margin: 0 }}>{desc}</p>
    </Reveal>
  );
}

function IndustriesGrid() {
  return (
    <div className="on-ind-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
      {ON_INDUSTRIES.map(([n, t, d], i) => <OnymGlyphCard key={t} n={n} title={t} desc={d} delay={(i % 3) * 70} />)}
      <div style={{
        borderRadius: "var(--r-lg)", border: "1px dashed var(--d-hairline-2)", minHeight: 230,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em",
        textTransform: "uppercase", color: "var(--d-ink-3)", textAlign: "center", padding: 24,
      }}>More on the horizon</div>
    </div>
  );
}

// ── Layout B: interactive index ────────────────────────────────────────────
function IndustriesIndex() {
  const [active, setActive] = useStateOIB(0);
  const [phase, setPhase] = useStateOIB(0);
  const cur = ON_INDUSTRIES[active];
  return (
    <div className="on-ind-index" style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: "clamp(32px,5vw,80px)", alignItems: "start" }}>
      {/* left — the stacked sector names */}
      <div style={{ borderTop: "1px solid var(--d-hairline)" }}>
        {ON_INDUSTRIES.map(([n, t], i) => {
          const on = i === active;
          return (
            <div key={t}
              onMouseEnter={() => { setActive(i); setPhase(p => p + 1); }}
              style={{
                display: "flex", alignItems: "baseline", gap: 22, cursor: "default",
                padding: "clamp(14px,1.6vw,22px) 8px", borderBottom: "1px solid var(--d-hairline)",
                transition: "padding-left .25s var(--ease)", paddingLeft: on ? 22 : 8,
              }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.16em",
                color: on ? "#f7ff05" : "var(--d-ink-3)", transition: "color .2s", minWidth: 26 }}>{n}</span>
              <span className="ff-display" style={{
                fontSize: "clamp(26px,3.4vw,46px)", lineHeight: 1.04, letterSpacing: "-0.02em",
                color: on ? "var(--d-ink)" : "var(--d-ink-3)", transition: "color .2s var(--ease)" }}>{t}</span>
            </div>
          );
        })}
      </div>
      {/* right — reveal panel (sticky) */}
      <div style={{ position: "sticky", top: 120 }}>
        <div style={{ background: "var(--d-surface-2)", border: "1px solid var(--d-hairline)",
          borderRadius: "var(--r-lg)", padding: "32px 34px 36px", minHeight: 280 }}>
          <div style={{ marginBottom: 26 }}>
            <DotGlyph seed={cur[1]} phase={phase} on={true} cols={16} rows={9} dot={5} gap={9} />
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em",
            textTransform: "uppercase", color: "var(--d-ink-3)", marginBottom: 12 }}>{cur[0]} · Sector</div>
          <h3 className="ff-h3" style={{ fontSize: "clamp(24px,2.4vw,32px)", color: "var(--d-ink)", marginBottom: 14 }}>{cur[1]}</h3>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.55, color: "var(--d-ink-2)", margin: 0 }}>{cur[2]}</p>
        </div>
      </div>
    </div>
  );
}

function IndustriesBody({ layout = "Grid" }) {
  const [load, setLoad] = useStateOIB(false);
  const [lay, setLay] = useStateOIB(layout);
  useEffectOIB(() => { setLay(layout); }, [layout]);
  useEffectOIB(() => { const t = setTimeout(() => setLoad(true), 80); return () => clearTimeout(t); }, []);
  const step = (i) => ({ opacity: load ? 1 : 0, transform: load ? "none" : "translateY(20px)",
    transition: `opacity 700ms var(--ease) ${i * 120}ms, transform 700ms var(--ease) ${i * 120}ms` });
  return (
    <main>
      <header style={{ background: "var(--canvas)", padding: "clamp(140px,16vw,210px) clamp(20px,5vw,64px) clamp(56px,7vw,90px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Kicker style={step(0)}>Industries</Kicker>
          <h1 className="ff-display" style={{ ...step(1), fontSize: "clamp(44px,7vw,96px)", margin: "20px 0 24px", maxWidth: 940 }}>
            The foundations of the real economy.
          </h1>
          <p className="ff-lead" style={{ ...step(2), maxWidth: 600, color: "var(--ink-2)" }}>
            Seven sectors that the next century will be built on — capital-intensive, durable,
            and slow to build. We commit early and hold long.
          </p>
        </div>
      </header>
      <section style={{ background: "var(--d-surface-0)", padding: "clamp(64px,8vw,110px) clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: 20, marginBottom: 36 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.2em",
              textTransform: "uppercase", color: "var(--d-ink-3)" }}>Where we deploy</div>
            <SlideTabs options={["Grid", "Index"]} value={lay} onChange={setLay} />
          </div>
          <div key={lay} style={{ animation: "onLayFade .4s var(--ease) both" }}>
            {lay === "Index" ? <IndustriesIndex /> : <IndustriesGrid />}
          </div>
        </div>
      </section>
      <CTA />
    </main>
  );
}

Object.assign(window, { IndustriesBody });
