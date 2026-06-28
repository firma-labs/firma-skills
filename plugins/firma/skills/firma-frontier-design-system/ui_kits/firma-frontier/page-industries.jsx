// Firma Frontier — Industries page body.
// Two on-page layouts, switchable via a smooth segmented tab:
//   "Index"     — editorial scroll-rows with iridescent visuals (motion language)
//   "Portfolio" — a Finder-style window: sector cards in a panel, selected = acid fill
const { useState: useStateIP, useRef: useRefIP, useEffect: useEffectIP } = React;

const FF_INDUSTRIES = [
  ["01", "AI & advanced compute", "The intelligence layer of the new earth — frontier models, the silicon that trains them, and the compute the world will increasingly run on."],
  ["02", "Agentic systems", "Software that doesn't just answer but acts — autonomous agents doing real, accountable work across the economy."],
  ["03", "Robotics", "Intelligence given a body — labour, logistics and the physical world automated, from the factory floor to the open field."],
  ["04", "Quantum", "Computation's next substrate — crossing from physics experiment into durable industrial advantage."],
  ["05", "Space", "Orbit as infrastructure — launch, sensing, and the high ground of the next economy."],
  ["06", "Deeptech", "Hard science crossing the chasm — from the lab into deployed, world-scale systems."],
  ["07", "National security", "The sovereign edge — defense, resilience and technological independence for a contested century."],
  ["08", "Network states · Charter cities", "Sovereignty as software — new jurisdictions and charter cities, purpose-built for what comes next."],
];

// Split a description into a short tagline (before the em-dash) + the rest.
function tagOf(desc) { return desc.split("—")[0].trim(); }

// ── Smooth segmented tab control (sliding indicator, Linear/Square style) ───
function FFTabs({ value, options, onChange }) {
  const wrap = useRefIP(null);
  const btns = useRefIP([]);
  const [ind, setInd] = useStateIP({ x: 0, w: 0 });
  const measure = () => {
    const i = Math.max(0, options.indexOf(value));
    const el = btns.current[i];
    if (el) setInd({ x: el.offsetLeft, w: el.offsetWidth });
  };
  useEffectIP(() => { measure(); const id = setTimeout(measure, 70); return () => clearTimeout(id); }, [value]);
  useEffectIP(() => {
    const on = () => measure();
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  return (
    <div ref={wrap} style={{ position: "relative", display: "inline-flex", padding: 5,
      background: "var(--paper)", border: "1px solid var(--ink-line)", borderRadius: "var(--r-pill)" }}>
      <div aria-hidden="true" style={{ position: "absolute", top: 5, bottom: 5, left: 0, width: ind.w,
        transform: `translateX(${ind.x}px)`, background: "#fff", border: "1px solid var(--ink-line)",
        borderRadius: "var(--r-pill)", boxShadow: "var(--shadow-card)",
        transition: "transform .42s cubic-bezier(.34,1.1,.36,1), width .42s cubic-bezier(.34,1.1,.36,1)" }} />
      {options.map((o, i) => (
        <button key={o} ref={(el) => (btns.current[i] = el)} onClick={() => onChange(o)}
          style={{ position: "relative", zIndex: 1, border: "none", background: "transparent", cursor: "pointer",
            fontFamily: "var(--font-mono)", fontSize: 12.5, letterSpacing: "0.12em", textTransform: "uppercase",
            padding: "9px 22px", borderRadius: "var(--r-pill)",
            color: value === o ? "var(--ink)" : "var(--ink-3)", transition: "color .25s var(--ease)" }}>
          {o}
        </button>
      ))}
    </div>
  );
}

// ── Layout A: editorial scroll-rows ────────────────────────────────────────
function useScrollScale() {
  const ref = useRefIP(null);
  const [p, setP] = useStateIP(0);
  useEffectIP(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setP(1); return; }
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current; if (!el) return;
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const dist = Math.abs((r.top + r.height / 2) - vh / 2);
        setP(Math.max(0, Math.min(1, 1 - dist / (vh * 0.75))));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);
  return [ref, p];
}

function IndustryRow({ n, title, desc }) {
  const [hover, setHover] = useStateIP(false);
  const [ref, p] = useScrollScale();
  const lift = (1 - p) * 26;
  const vis = 0.5 + p * 0.5;
  return (
    <article ref={ref}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      className="ff-ind-row"
      style={{
        borderTop: "1px solid var(--ink-line)", padding: "clamp(40px,6vw,84px) 0",
        display: "grid", gridTemplateColumns: "92px 1fr clamp(220px,28vw,380px)",
        gap: "clamp(20px,4vw,56px)", alignItems: "center",
        opacity: vis, transform: `translateY(${lift}px)`,
        transition: "opacity .2s linear, transform .2s linear",
      }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 16, letterSpacing: "0.12em",
        color: "var(--ink-3)", alignSelf: "start", paddingTop: 8 }}>{n}</div>
      <div>
        <h2 className="ff-display" style={{ fontSize: "clamp(30px,4vw,54px)", lineHeight: 1.05, margin: 0 }}>{title}</h2>
        <p className="ff-lead" style={{ marginTop: 18, maxWidth: 640, color: "var(--ink-2)" }}>{desc}</p>
      </div>
      <div style={{ position: "relative", aspectRatio: "16 / 11", borderRadius: "var(--r-lg)",
        overflow: "hidden", border: "1px solid var(--paper-line)",
        boxShadow: hover ? "var(--shadow-soft)" : "var(--shadow-card)",
        transition: "box-shadow var(--dur) var(--ease)" }}>
        <div style={{ position: "absolute", inset: "-12%", background: "var(--iridescent)",
          opacity: 0.5 + p * 0.4,
          transform: `scale(${hover ? 1.12 : 1.04 + p * 0.04}) translate(${(p - 0.5) * 10}px, ${(0.5 - p) * 8}px)`,
          transition: "transform 1.1s var(--ease), opacity .3s linear" }} />
        <div style={{ position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(255,255,255,.12), rgba(255,255,255,0) 40%)" }} />
      </div>
    </article>
  );
}

function IndustriesIndex() {
  return (
    <div>
      {FF_INDUSTRIES.map(([n, t, d]) => <IndustryRow key={t} n={n} title={t} desc={d} />)}
    </div>
  );
}

// ── Layout B: Portfolio — a Finder-style window of sector cards ─────────────
function PFFund({ name, on }) {
  const [h, setH] = useStateIP(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: "flex", alignItems: "center", gap: 11, padding: "9px 11px", borderRadius: 9,
        background: on ? "var(--accent)" : (h ? "var(--l-hover)" : "transparent"),
        color: on ? "var(--accent-ink)" : "var(--ink-2)", transition: "background .16s ease, color .16s ease",
        fontFamily: "var(--font-body)", fontSize: 14, letterSpacing: "-0.01em" }}>
      <span style={{ width: 15, height: 15, borderRadius: 4, flex: "none",
        background: on ? "rgba(43,41,48,.32)" : "#e6e2da" }} />
      {name}
    </div>
  );
}

function PFCard({ s, on, onSelect }) {
  const [h, setH] = useStateIP(false);
  return (
    <button onClick={onSelect} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ textAlign: "left", cursor: "pointer", display: "flex", flexDirection: "column",
        background: on ? "var(--accent)" : "var(--l-surface-3)",
        border: `1px solid ${on ? "var(--accent)" : "var(--l-hairline)"}`, borderRadius: 12,
        padding: "16px 17px 18px",
        boxShadow: on ? "0 12px 30px rgba(150,158,0,.40), 0 2px 8px rgba(56,53,59,.12)"
          : (h ? "var(--shadow-soft)" : "var(--l-shadow)"),
        transform: !on && h ? "translateY(-2px)" : "none",
        transition: "box-shadow .16s ease, transform .16s ease, background .18s ease, border-color .18s ease" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
        color: on ? "rgba(43,41,48,.62)" : "var(--ink-3)" }}>{s[0]} · Sector</div>
      <div className="ff-mark-h" style={{ fontFamily: "var(--font-mark)", fontWeight: 700,
        fontSize: "clamp(19px,1.5vw,23px)", letterSpacing: "-0.03em", lineHeight: 1.08, marginTop: 9,
        color: on ? "var(--accent-ink)" : "var(--ink)", fontFeatureSettings: '"liga" 0' }}>{s[1]}</div>
      <p style={{ margin: "8px 0 0", fontFamily: "var(--font-body)",
        fontSize: on ? 14 : 13, lineHeight: 1.5,
        color: on ? "rgba(43,41,48,.78)" : "var(--ink-2)" }}>
        {on ? s[2] : tagOf(s[2])}
      </p>
    </button>
  );
}

function IndustriesPortfolio() {
  const [active, setActive] = useStateIP(0);
  const FUNDS = ["Onym Capital", "Firma Frontier", "Firma Terra"];
  const cycle = (d) => setActive((a) => (a + d + FF_INDUSTRIES.length) % FF_INDUSTRIES.length);
  const navBtn = {
    width: 30, height: 30, borderRadius: 9, background: "var(--l-surface-2)",
    border: "1px solid var(--l-hairline)", color: "var(--ink-2)", cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, lineHeight: 1,
  };
  return (
    <div style={{ position: "relative" }}>
      <GradientGlow w={680} h={420} blur={120} opacity={0.32}
        style={{ right: "-90px", top: "-70px", animationDuration: "24s" }} />
      <div className="ff-pf-win" style={{ position: "relative", borderRadius: 18, overflow: "hidden",
        background: "var(--l-surface-1)", border: "1px solid var(--l-hairline)", boxShadow: "var(--l-shadow-pop)",
        display: "grid", gridTemplateColumns: "248px 1fr" }}>
        {/* sidebar */}
        <aside className="ff-pf-side" style={{ background: "var(--l-surface-2)",
          borderRight: "1px solid var(--l-hairline)", padding: "20px 14px", display: "flex",
          flexDirection: "column", gap: 3 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "2px 8px 16px" }}>
            <Orb size={22} variant="ink" />
            <span style={{ fontFamily: "var(--font-mark)", fontWeight: 700, fontSize: 16,
              letterSpacing: "-0.04em", textTransform: "lowercase", color: "var(--ink)",
              fontFeatureSettings: '"liga" 0' }}>frontier</span>
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, letterSpacing: "0.18em",
            textTransform: "uppercase", color: "var(--ink-3)", padding: "8px 9px 6px" }}>Funds</div>
          {FUNDS.map((f) => <PFFund key={f} name={f} on={f === "Firma Frontier"} />)}
        </aside>
        {/* main */}
        <section style={{ padding: "20px 22px 24px", display: "flex", flexDirection: "column", minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
            <div style={{ display: "flex", gap: 7 }}>
              <button style={navBtn} onClick={() => cycle(-1)} aria-label="Previous sector">‹</button>
              <button style={navBtn} onClick={() => cycle(1)} aria-label="Next sector">›</button>
            </div>
            <span style={{ fontFamily: "var(--font-mark)", fontWeight: 700, fontSize: 20,
              letterSpacing: "-0.03em", color: "var(--ink)", fontFeatureSettings: '"liga" 0' }}>what we fund</span>
          </div>
          <div style={{ background: "var(--l-surface-2)", border: "1px solid var(--l-hairline)",
            borderRadius: 14, padding: 16, flex: 1, display: "flex", flexDirection: "column", gap: 13 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.16em",
              textTransform: "uppercase", color: "var(--ink-3)", display: "flex", justifyContent: "space-between" }}>
              <span>Sectors · panel</span><span>{active + 1} / {FF_INDUSTRIES.length}</span>
            </div>
            <div className="ff-pf-cards" style={{ display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)", gap: 12, alignItems: "start" }}>
              {FF_INDUSTRIES.map((s, i) => (
                <PFCard key={s[1]} s={s} on={i === active} onSelect={() => setActive(i)} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// ── Page body with the tab switcher + crossfade ────────────────────────────
function IndustriesBody({ layout = "Index" }) {
  const [load, setLoad] = useStateIP(false);
  const [view, setView] = useStateIP(layout);
  const [vis, setVis] = useStateIP(true);
  useEffectIP(() => { setView(layout); }, [layout]);
  useEffectIP(() => { const t = setTimeout(() => setLoad(true), 80); return () => clearTimeout(t); }, []);
  const change = (v) => {
    if (v === view) return;
    setVis(false);
    setTimeout(() => { setView(v); setVis(true); }, 200);
  };
  const step = (i) => ({ opacity: load ? 1 : 0, transform: load ? "none" : "translateY(24px)",
    transition: `opacity 800ms var(--ease) ${i * 130}ms, transform 800ms var(--ease) ${i * 130}ms` });
  return (
    <main>
      <header style={{ position: "relative", overflow: "hidden", background: "var(--canvas)",
        padding: "clamp(130px,16vw,200px) clamp(20px,5vw,64px) clamp(40px,6vw,72px)" }}>
        <GradientGlow w={760} h={440} blur={120} opacity={0.4}
          style={{ right: "-160px", top: "-40px", animationDuration: "22s" }} />
        <div style={{ maxWidth: 1340, margin: "0 auto", position: "relative" }}>
          <Kicker style={step(0)}>Industries</Kicker>
          <h1 className="ff-display" style={{ ...step(1), fontSize: "clamp(46px,8vw,104px)", margin: "20px 0 24px", maxWidth: 1000 }}>
            Where we deploy conviction.
          </h1>
          <p className="ff-lead" style={{ ...step(2), maxWidth: 640, color: "var(--ink-2)" }}>
            Eight frontiers we back at the scale the moment demands — the systems a civilization
            will depend on, funded early and completely.
          </p>
        </div>
      </header>
      <section style={{ background: "var(--canvas)", padding: "clamp(20px,3vw,40px) clamp(20px,5vw,64px) clamp(60px,8vw,120px)" }}>
        <div style={{ maxWidth: 1340, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20,
            flexWrap: "wrap", marginBottom: "clamp(26px,4vw,44px)" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.18em",
              textTransform: "uppercase", color: "var(--ink-3)" }}>
              Where we deploy · {FF_INDUSTRIES.length} sectors
            </div>
            <FFTabs value={view} options={["Index", "Portfolio"]} onChange={change} />
          </div>
          <div style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(10px)",
            transition: "opacity .3s var(--ease), transform .3s var(--ease)" }}>
            {view === "Portfolio" ? <IndustriesPortfolio /> : <IndustriesIndex />}
          </div>
        </div>
      </section>
      <CTA />
    </main>
  );
}

Object.assign(window, { IndustriesBody });
