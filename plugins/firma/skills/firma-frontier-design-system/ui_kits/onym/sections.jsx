// Onym Capital — What we back, Approach, Credibility, CTA, Footer
window.__ON_SECTIONS_VERSION = 1;

// Sticky section header (monochrome). Light in its section; when it pins under
// the 66px nav it turns into a dark charcoal band (white title, light-grey
// eyebrow) and reports to the shared ONStuck store so the nav can merge dark.
function SectionHead({ kicker, title, max = 820, align = "left", bg = "var(--paper)" }) {
  const ref = React.useRef(null);
  const sentinelRef = React.useRef(null);
  const [stuck, setStuck] = React.useState(false);
  React.useEffect(() => {
    const sentinel = sentinelRef.current, head = ref.current;
    if (!sentinel || !head) return;
    const id = (window.__onHeadSeq = (window.__onHeadSeq || 0) + 1);
    const io = new IntersectionObserver(
      ([e]) => {
        const isSticky = getComputedStyle(head).position === "sticky";
        const v = isSticky && e.boundingClientRect.top < 66;
        setStuck(v);
        if (window.ONStuck) window.ONStuck.set(id, v);
      },
      { threshold: [0, 1], rootMargin: "-66px 0px 0px 0px" }
    );
    io.observe(sentinel);
    return () => { io.disconnect(); if (window.ONStuck) window.ONStuck.set(id, false); };
  }, []);
  return (
    <React.Fragment>
      <div ref={sentinelRef} aria-hidden="true" style={{ height: 0 }} />
      <div ref={ref} style={{ position: "sticky", top: 66, zIndex: 20,
        background: stuck ? "var(--ink)" : bg,
        width: "100vw", marginLeft: "calc(50% - 50vw)",
        paddingTop: 20, paddingBottom: 22,
        borderBottom: `1px solid ${stuck ? "rgba(255,255,255,.12)" : "transparent"}`,
        transition: "background .25s var(--ease), border-color .25s var(--ease)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(20px,5vw,64px)",
          boxSizing: "border-box", textAlign: align }}>
          <Kicker style={{ display: "block", marginBottom: 14,
            color: stuck ? "rgba(255,255,255,.6)" : "var(--ink-2)", transition: "color .25s var(--ease)" }}>{kicker}</Kicker>
          <h2 className="ff-h2" style={{ maxWidth: max, margin: align === "center" ? "0 auto" : 0,
            color: stuck ? "#fff" : "var(--ink)", transition: "color .25s var(--ease)" }}>{title}</h2>
        </div>
      </div>
      <div aria-hidden="true" style={{ height: 44 }} />
    </React.Fragment>
  );
}

// ── What we back — 5 items in a clean bordered grid (no color accent) ──────
function WhatWeBack() {
  const items = [
    ["01", "Energy", "Generation, storage and grid — the foundation everything else is built on."],
    ["02", "Compute & data centers", "The physical backbone of intelligence: power, silicon and racks."],
    ["03", "Sovereign infrastructure", "The systems a nation depends on, built to endure for decades."],
    ["04", "Banking & fintech", "The rails of capital — and the institutions that move it."],
    ["05", "Manufacturing", "The industrial base: making real things, at scale."],
    ["06", "Real estate & development", "The built environment and the land beneath it."],
    ["07", "Tokenized RWAs", "Real-world assets brought on-chain — ownership made liquid and legible."],
  ];
  return (
    <section style={{ background: "var(--paper)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(20px,5vw,64px)" }}>
        <SectionHead kicker="Industries" title="Seven foundations of the real economy." bg="var(--paper)" />
        <div className="on-back-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          border: "1px solid var(--ink-line)", borderRadius: "var(--r-lg)", overflow: "hidden",
          background: "var(--ink-line)", gap: 1,
        }}>
          {items.map(([n, t, d], i) => <BackCell key={t} n={n} title={t} desc={d} delay={(i % 3) * 70} />)}
          <div style={{ background: "var(--paper)" }} />
          <div style={{ background: "var(--paper)" }} />
        </div>
        <div aria-hidden="true" style={{ height: "clamp(80px,11vw,160px)" }} />
      </div>
    </section>
  );
}

function BackCell({ n, title, desc, delay }) {
  const [h, setH] = React.useState(false);
  return (
    <Reveal delay={delay} as="article"
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        position: "relative", background: h ? "#fff" : "var(--canvas)",
        padding: "40px 34px 44px", minHeight: 230, boxSizing: "border-box",
        transition: "background var(--dur) var(--ease)",
      }}>
      <Kicker style={{ color: "var(--ink-3)" }}>{n}</Kicker>
      <h3 className="ff-h3" style={{ margin: "20px 0 14px" }}>{title}</h3>
      <p className="ff-small" style={{ fontSize: 17, maxWidth: 300 }}>{desc}</p>
    </Reveal>
  );
}

// ── Approach — three pillars ───────────────────────────────────────────────
function Approach() {
  const pillars = [
    ["01", "Patient", "We hold for the long arc. Real assets compound on a horizon measured in decades, not exits."],
    ["02", "Disciplined", "We say no with conviction. A concentrated book of considered bets beats activity for its own sake."],
    ["03", "Aligned", "We win when founders win. Our incentives, our horizon and our patience are theirs."],
  ];
  return (
    <section id="approach" style={{ background: "var(--canvas)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(20px,5vw,64px)" }}>
        <SectionHead kicker="Approach" title="Patient. Disciplined. Long." bg="var(--canvas)" />
        <div className="on-pillars" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 0 }}>
          {pillars.map(([nn, t, d], i) => (
            <Reveal key={t} delay={i * 90}>
              <div style={{
                padding: "8px 40px 8px 0",
                borderLeft: i === 0 ? "none" : "1px solid var(--ink-line)",
                paddingLeft: i === 0 ? 0 : 40,
              }} className="on-pillar">
                <Kicker style={{ color: "var(--ink-3)" }}>{nn}</Kicker>
                <h3 className="ff-h3" style={{ margin: "18px 0 16px" }}>{t}</h3>
                <p className="ff-small" style={{ fontSize: 18, maxWidth: 340 }}>{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div aria-hidden="true" style={{ height: "clamp(80px,11vw,160px)" }} />
      </div>
    </section>
  );
}

// ── Credibility — "What we look for" + monochrome dot-matrix + logo slots ──
function Credibility() {
  const traits = ["Durable economics", "Hard to replicate", "Critical to the system", "Built to last"];
  return (
    <section style={{ position: "relative", background: "var(--paper)",
      padding: "clamp(80px,11vw,160px) clamp(20px,5vw,64px)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="on-cred-grid" style={{
          display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,520px)",
          gap: "clamp(40px,6vw,96px)", alignItems: "center",
        }}>
          <div>
            <Reveal><Kicker style={{ display: "block", marginBottom: 22 }}>What we look for</Kicker></Reveal>
            <Reveal delay={70}>
              <h2 className="ff-h2" style={{ marginBottom: 36 }}>Conviction starts with the asset.</h2>
            </Reveal>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 44 }}>
              {traits.map((t, i) => (
                <Reveal key={t} delay={i * 60} as="span" style={{
                  fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 18, letterSpacing: "-0.02em",
                  background: "#fff", border: "1px solid var(--paper-line)", borderRadius: "var(--r-pill)",
                  padding: "13px 26px", boxShadow: "var(--shadow-pill)", color: "var(--ink)",
                }}>{t}</Reveal>
              ))}
            </div>
            <Reveal delay={120}>
              <Kicker style={{ display: "block", marginBottom: 16, color: "var(--ink-3)" }}>Portfolio — coming soon</Kicker>
              <div className="on-logos" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
                {[0,1,2,3].map(i => (
                  <div key={i} style={{
                    height: 64, borderRadius: "var(--r-md)", background: "#fff",
                    border: "1px dashed var(--ink-line)", display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em",
                    textTransform: "uppercase", color: "var(--ink-3)",
                  }}>logo</div>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal delay={120} style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative", width: "100%", maxWidth: 500 }}>
              <DotMatrix label="Conviction index" periods={["Thesis","Build","Compounding"]} period="Compounding"
                footL="Underwrite" footR="Endure" caption="illustrative" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ── Close / CTA — quiet, on ink, no glow ───────────────────────────────────
function CTA() {
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--ink)",
      padding: "clamp(96px,14vw,200px) clamp(20px,5vw,64px)" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", position: "relative", textAlign: "center" }}>
        <Reveal>
          <h2 className="ff-display" style={{ color: "#fff", fontSize: "clamp(44px,7vw,92px)", marginBottom: 40 }}>
            Let&rsquo;s talk.
          </h2>
        </Reveal>
        <Reveal delay={90} style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
          <Button as="a" href="contact.html" variant="light">Get in touch</Button>
        </Reveal>
      </div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────
function Footer() {
  const family = ["Onym Capital", "Firma Frontier", "Firma Terra"];
  return (
    <footer style={{ background: "var(--ink)", padding: "0 clamp(20px,5vw,64px) 64px", color: "#fff" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", borderTop: "1px solid rgba(255,255,255,.12)", paddingTop: 48 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 30, justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src="../../assets/onym-capital-lockup.png" alt="Onym Capital"
              style={{ height: 26, display: "block", filter: "invert(1) brightness(2)" }} />
          </div>
          <div className="on-family" style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            {family.map((f, i) => (
              <React.Fragment key={f}>
                {i > 0 && <span style={{ color: "rgba(255,255,255,.3)" }}>·</span>}
                <a href="#" style={{
                  fontFamily: "var(--font-mono)", letterSpacing: "0.1em", textTransform: "uppercase",
                  fontSize: f === "Onym Capital" ? 12 : 10.5,
                  color: f === "Onym Capital" ? "#fff" : "rgba(255,255,255,.5)", textDecoration: "none",
                }}>{f}</a>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 40, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em",
          color: "rgba(255,255,255,.4)", textTransform: "uppercase" }}>
          © 2026 Onym Capital · Patient capital for the new economy
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { WhatWeBack, Approach, Credibility, CTA, Footer });
