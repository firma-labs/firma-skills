// Firma Frontier — What we back, Approach, Credibility, People, CTA, Footer
window.__FF_SECTIONS_VERSION = 8;

// ── Section heading helper — sticky, full-bleed, locks under the 66px nav ──
function SectionHead({ kicker, title, max = 820, align = "left", bg = "var(--paper)" }) {
  const ref = React.useRef(null);
  const sentinelRef = React.useRef(null);
  const [stuck, setStuck] = React.useState(false);
  React.useEffect(() => {
    const sentinel = sentinelRef.current, head = ref.current;
    if (!sentinel || !head) return;
    let alive = true, last = null;
    const tick = () => {
      if (!alive) return;
      const isSticky = getComputedStyle(head).position === "sticky";
      const v = isSticky && sentinel.getBoundingClientRect().top <= 66;
      if (v !== last) { last = v; setStuck(v); }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    return () => { alive = false; };
  }, []);
  return (
    <React.Fragment>
    <div ref={sentinelRef} aria-hidden="true" style={{ height: 0 }} />
    <div ref={ref} style={{ position: "var(--ff-head-pos, sticky)", top: 66, zIndex: 20,
      background: stuck ? "var(--ink)" : bg,
      width: "var(--ff-head-w, 100vw)", marginLeft: "var(--ff-head-ml, calc(50% - 50vw))",
      paddingTop: 20, paddingBottom: 22,
      borderBottom: `1px solid ${stuck ? "rgba(255,255,255,.12)" : "transparent"}`,
      boxShadow: stuck ? "0 14px 30px -12px rgba(20,18,22,.55)" : "0 0 0 rgba(0,0,0,0)",
      transition: "background .22s var(--ease), border-color .22s var(--ease), box-shadow .22s var(--ease)" }}>
      <div style={{ maxWidth: 1340, margin: "0 auto", padding: "0 clamp(20px,5vw,64px)",
        boxSizing: "border-box", textAlign: align }}>
        <Kicker style={{ display: "block", marginBottom: 14,
          color: stuck ? "var(--accent)" : "var(--ink-2)", transition: "color .25s var(--ease)" }}>{kicker}</Kicker>
        <h2 className="ff-h2" style={{ maxWidth: max, margin: align === "center" ? "0 auto" : 0,
          color: stuck ? "#fff" : "var(--ink)", transition: "color .25s var(--ease)" }}>{title}</h2>
      </div>
    </div>
    <div aria-hidden="true" style={{ height: 44 }} />
    </React.Fragment>
  );
}

// ── What we back — 6 cards, iridescent accent on hover ─────────────────────
function WhatWeBack() {
  const items = [
    ["AI & advanced compute", "The intelligence layer — and the compute the world will run on."],
    ["Agentic systems", "Software that acts — autonomous systems doing real work in the world."],
    ["Robotics", "Intelligence given a body: labour, logistics and the physical world automated."],
    ["Quantum", "Computation's next substrate, crossing from physics into industry."],
    ["Space", "Orbit as infrastructure — the high ground of the next economy."],
    ["Deeptech", "Hard science crossing from the lab into deployed systems."],
    ["National security", "The sovereign edge — defense, resilience and technological independence."],
    ["Network states · Charter cities", "Sovereignty as software — new jurisdictions for what comes next."],
  ];
  return (
    <section style={{ background: "var(--paper)" }}>
      <div style={{ maxWidth: 1340, margin: "0 auto", padding: "0 clamp(20px,5vw,64px)" }}>
        <SectionHead kicker="What we back" title="The frontiers we fund with conviction." />
        <div className="ff-back-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20,
        }}>
          {items.map(([t, d], i) => <BackCard key={t} idx={i + 1} title={t} desc={d} delay={(i % 3) * 70} />)}
        </div>
        <div aria-hidden="true" style={{ height: "clamp(80px,11vw,160px)" }} />
      </div>
    </section>
  );
}

// Deterministic per-sector signature — seeded heights + color/grey dot mix.
function ffRng(seed) {
  let s = 0; for (let i = 0; i < seed.length; i++) s = (s * 31 + seed.charCodeAt(i)) >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}
// iridescent ramp (pink → peach → acid yellow) for the colored dots
const FF_RAMP = [[0,[255,166,194]],[0.45,[255,190,150]],[0.78,[255,214,110]],[1,[247,255,5]]];
function ffRamp(p){ p=Math.max(0,Math.min(1,p));
  for(let i=0;i<FF_RAMP.length-1;i++){const a=FF_RAMP[i],b=FF_RAMP[i+1];
    if(p>=a[0]&&p<=b[0]){const t=(p-a[0])/(b[0]-a[0]);
      return [a[1][0]+(b[1][0]-a[1][0])*t,a[1][1]+(b[1][1]-a[1][1])*t,a[1][2]+(b[1][2]-a[1][2])*t];}}
  return FF_RAMP[FF_RAMP.length-1][1];
}

function SectorDots({ seed, hover, dark }) {
  const wrapRef = React.useRef(null);
  const cvsRef = React.useRef(null);
  const stateRef = React.useRef({ raf: 0, amp: 0, intro: 0, cols: null, t: 0 });

  // build the seeded column/dot model once per seed
  const model = React.useMemo(() => {
    const rnd = ffRng(seed);
    const ROWS = 9, PITCH = 8;
    const NCOL = 30;
    const cols = [];
    for (let i = 0; i < NCOL; i++) {
      const ramp = i / (NCOL - 1);                       // ascending toward the right edge
      const base = 1.4 + ramp * (ROWS - 2) * (0.7 + rnd() * 0.5) + (rnd() * 2 - 1);
      const h = Math.max(1, Math.min(ROWS, Math.round(base)));
      const speed = 1.4 + rnd() * 2.2;
      const phase = rnd() * Math.PI * 2;
      const dots = [];
      for (let r = 0; r < ROWS; r++) {
        const colored = rnd() < (0.28 + ramp * 0.35);    // more color toward the peak
        const p = (r / (ROWS - 1)) * 0.7 + ramp * 0.3;   // higher + righter = yellower
        dots.push({ colored, col: ffRamp(p), wob: rnd() });
      }
      cols.push({ h, speed, phase, dots });
    }
    return { ROWS, PITCH, NCOL, cols };
  }, [seed]);

  React.useEffect(() => {
    const cvs = cvsRef.current, wrap = wrapRef.current;
    if (!cvs || !wrap) return;
    const ctx = cvs.getContext("2d");
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const { ROWS, PITCH, cols } = model;
    let W = 0, H = ROWS * PITCH;

    function size() {
      W = wrap.clientWidth; H = ROWS * PITCH;
      cvs.width = W * DPR; cvs.height = H * DPR;
      cvs.style.width = W + "px"; cvs.style.height = H + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    size();
    const ro = new ResizeObserver(size); ro.observe(wrap);

    const st = stateRef.current;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      const introE = st.intro < 1 ? (1 - Math.pow(1 - st.intro, 3)) : 1;  // easeOutCubic
      for (let i = 0; i < cols.length; i++) {
        const c = cols[i];
        const x = W - (i + 0.5) * PITCH;            // flush to the RIGHT edge
        if (x < -PITCH) continue;
        const colStart = (i / cols.length) * 0.6;   // right-to-left populate stagger
        const colP = Math.max(0, Math.min(1, (introE - colStart) / 0.4));
        const wave = Math.sin(st.t * c.speed + c.phase) * st.amp;       // hover equalizer
        const liveH = Math.max(0, c.h * colP + wave);
        const full = Math.floor(liveH);
        for (let r = 0; r < ROWS; r++) {
          const dot = c.dots[r];
          let op;
          if (r < full) op = 1;
          else if (r === full) op = liveH - full;     // soft growing tip
          else op = 0;
          if (op <= 0.02) continue;
          const y = H - (r + 0.5) * PITCH;
          const isTip = r >= Math.floor(liveH) - 1 && r >= c.h - 2;
          let rgb, a, rad = 1.7;
          if (dot.colored) {
            rgb = dot.col; a = (0.55 + 0.45 * st.amp / 3) * op;
          } else {
            rgb = [56, 53, 59]; a = (0.16 + 0.16 * (r / ROWS)) * op;   // grey
          }
          if (hover && isTip) { rgb = [247, 255, 5]; a = op; rad = 2.1; }   // acid peak on hover
          if (dark) {                                                       // on yellow card → ink dots
            rgb = [43, 41, 48];
            a = (dot.colored ? 0.62 + 0.3 * st.amp / 3 : 0.14 + 0.14 * (r / ROWS)) * op;
            if (hover && isTip) { a = op; rad = 2.1; }
          }
          ctx.beginPath();
          ctx.fillStyle = `rgba(${rgb[0]|0},${rgb[1]|0},${rgb[2]|0},${a})`;
          ctx.arc(x, y, rad, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    function tick() {
      st.t += 0.05;
      const targetAmp = hover ? 2.6 : 0;
      st.amp += (targetAmp - st.amp) * 0.08;
      if (st.intro < 1) st.intro = Math.min(1, st.intro + 0.022);
      draw();
      // keep animating while intro running, hovering, or settling
      if (st.intro < 1 || hover || st.amp > 0.04) {
        st.raf = requestAnimationFrame(tick);
      } else { st.raf = 0; draw(); }
    }
    if (!st.raf) st.raf = requestAnimationFrame(tick);

    return () => { cancelAnimationFrame(st.raf); st.raf = 0; ro.disconnect(); };
  }, [model, hover, dark]);

  return (
    <div ref={wrapRef} aria-hidden="true"
      style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 72, pointerEvents: "none" }}>
      <canvas ref={cvsRef} style={{ position: "absolute", right: 0, bottom: 0, display: "block" }} />
    </div>
  );
}

function BackCard({ idx, title, desc, delay }) {
  const [h, setH] = React.useState(false);
  const sel = h;
  return (
    <Reveal delay={delay} style={{ height: "100%" }}>
      <article
        onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
        style={{
          position: "relative", overflow: "hidden", height: "100%",
          background: sel ? "var(--accent)" : "#fff",
          border: sel ? "1px solid var(--accent)" : "1px solid var(--paper-line)",
          borderRadius: "var(--r-lg)",
          padding: "26px 30px 0", minHeight: 280, boxSizing: "border-box",
          display: "flex", flexDirection: "column",
          boxShadow: sel
            ? (h ? "0 16px 40px rgba(150,158,0,.52), 0 2px 8px rgba(56,53,59,.16)"
                 : "0 10px 28px rgba(150,158,0,.42), 0 2px 8px rgba(56,53,59,.14)")
            : (h ? "var(--shadow-soft)" : "var(--shadow-card)"),
          transform: h ? "translateY(-4px)" : "none",
          transition: "transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease), background var(--dur) var(--ease), border-color var(--dur) var(--ease)",
        }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.14em",
            color: sel ? "rgba(43,41,48,.6)" : (h ? "var(--ink)" : "var(--ink-3)"), transition: "color var(--dur) var(--ease)" }}>
            {String(idx).padStart(2, "0")}
          </span>
          <span aria-hidden="true" style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.2em",
            textTransform: "uppercase", color: sel ? "rgba(43,41,48,.7)" : "var(--ink-3)", opacity: (h || sel) ? 1 : 0,
            transform: (h || sel) ? "none" : "translateX(-6px)", transition: "all var(--dur) var(--ease)" }}>
            {sel ? "funded \u2192" : "fund \u2192"}
          </span>
        </div>
        <h3 className="ff-h3" style={{ marginBottom: 12, minHeight: "2.1em", color: sel ? "var(--accent-ink)" : undefined }}>{title}</h3>
        <p className="ff-small" style={{ fontSize: 16.5, maxWidth: 300, marginBottom: 88, color: sel ? "rgba(43,41,48,.72)" : undefined }}>{desc}</p>
        <SectorDots seed={title} hover={h} dark={sel} />
      </article>
    </Reveal>
  );
}

// ── Approach — three pillars (Framer-style cursor-tilt cards) ──────────────
function PillarCard({ n, t, d, delay }) {
  const ref = React.useRef(null);
  const [h, setH] = React.useState(false);
  const onMove = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (0.5 - py) * 7;
    const ry = (px - 0.5) * 9;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    el.style.setProperty("--mx", px * 100 + "%");
    el.style.setProperty("--my", py * 100 + "%");
  };
  const onLeave = () => {
    setH(false);
    const el = ref.current;
    if (el) el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
  };
  return (
    <Reveal delay={delay} style={{ height: "100%" }}>
      <div ref={ref} className="ff-pillar"
        onMouseEnter={() => setH(true)} onMouseMove={onMove} onMouseLeave={onLeave}
        style={{
          position: "relative", overflow: "hidden", height: "100%", boxSizing: "border-box",
          background: "#26232a", border: "1px solid rgba(255,255,255,.08)",
          borderRadius: "var(--r-lg)", padding: "30px 30px 34px", minHeight: 220,
          boxShadow: h ? "0 28px 64px rgba(18,16,20,.52)" : "0 12px 32px rgba(40,36,44,.20)",
          transformStyle: "preserve-3d", willChange: "transform",
          transition: "transform .34s cubic-bezier(.22,1,.36,1), box-shadow .4s var(--ease)",
        }}>
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, pointerEvents: "none", borderRadius: "inherit",
          background: "radial-gradient(420px circle at var(--mx,50%) var(--my,0%), rgba(247,255,5,.15), transparent 62%)",
          opacity: h ? 1 : 0, transition: "opacity .3s var(--ease)",
        }}></div>
        <div style={{ position: "relative" }}>
          <Kicker style={{ color: "var(--accent-ink)", background: "var(--accent)",
            padding: "3px 8px", borderRadius: 4 }}>{n}</Kicker>
          <h3 className="ff-h3" style={{ margin: "18px 0 14px", color: "#fff" }}>{t}</h3>
          <p className="ff-small" style={{ fontSize: 17, maxWidth: 340, color: "rgba(255,255,255,.66)" }}>{d}</p>
        </div>
      </div>
    </Reveal>
  );
}

function Approach() {
  const pillars = [
    ["01", "Conviction", "We concentrate. A few founders, backed early and completely, beat a portfolio of polite bets."],
    ["02", "Scale", "We deploy at the magnitude the frontier demands — patient capital that matches the ambition."],
    ["03", "Stewardship", "We measure success by what endures. Caring for people is not a cost of business — it is the business."],
  ];
  return (
    <section style={{ background: "var(--canvas)" }}>
      <div style={{ maxWidth: 1340, margin: "0 auto", padding: "0 clamp(20px,5vw,64px)" }}>
        <SectionHead kicker="Approach" title="Conviction at sovereign scale." bg="var(--canvas)" />
        <div className="ff-pillars" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          {pillars.map(([n, t, d], i) => (
            <PillarCard key={t} n={n} t={t} d={d} delay={i * 90} />
          ))}
        </div>
        <div aria-hidden="true" style={{ height: "clamp(80px,11vw,160px)" }} />
      </div>
    </section>
  );
}

// ── Credibility — "What we look for" + illustrative data + logo slots ──────
function Credibility() {
  const traits = ["Founder-obsessed", "Technically inevitable", "Civilizationally useful", "Built to endure"];
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--paper)",
      padding: "clamp(80px,11vw,160px) clamp(20px,5vw,64px)" }}>
      <div style={{ maxWidth: 1340, margin: "0 auto" }}>
        <div className="ff-cred-grid" style={{
          display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,540px)",
          gap: "clamp(40px,6vw,96px)", alignItems: "center",
        }}>
          <div>
            <Reveal><Kicker style={{ display: "block", marginBottom: 22 }}>What we look for</Kicker></Reveal>
            <Reveal delay={70}>
              <h2 className="ff-h2" style={{ marginBottom: 36 }}>Conviction starts with the founder.</h2>
            </Reveal>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 44 }}>
              {traits.map((t, i) => (
                <Reveal key={t} delay={i * 60} as="span" style={{
                  fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 18, letterSpacing: "-0.02em",
                  borderRadius: "var(--r-pill)", padding: "13px 26px", boxShadow: "var(--shadow-pill)",
                  border: "1px solid",
                  background: i === 0 ? "var(--chip-yellow)" : "var(--chip-cream)",
                  borderColor: i === 0 ? "var(--chip-yellow-line)" : "var(--chip-cream-line)",
                  color: i === 0 ? "var(--chip-yellow-ink)" : "var(--chip-cream-ink)",
                }}>{t}</Reveal>
              ))}
            </div>
            <Reveal delay={120}>
              <Kicker style={{ display: "block", marginBottom: 16, color: "var(--ink-3)" }}>Portfolio — coming soon</Kicker>
              <div className="ff-logos" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
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
            <GradientGlow w={460} h={300} blur={66} opacity={0.42}
              style={{ left: "50%", top: "50%", transform: "translate(-50%,-50%)" }} />
            <div style={{ position: "relative", width: "100%", maxWidth: 520 }}>
              <DotMatrix label="Conviction index" periods={["Seed","Early","Frontier"]} period="Frontier"
                footL="Thesis" footR="Outcome" caption="illustrative" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ── People — forward-looking placeholder partner cards ─────────────────────
function People() {
  const roles = ["Founding Partner", "Partner", "Partner", "Operating Partner"];
  return (
    <section style={{ background: "var(--canvas)" }}>
      <div style={{ maxWidth: 1340, margin: "0 auto", padding: "0 clamp(20px,5vw,64px)" }}>
        <SectionHead kicker="People" title="The conviction behind the capital." />
        <div className="ff-people" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
          {roles.map((r, i) => (
            <Reveal key={i} delay={(i % 4) * 70}>
              <div style={{ borderRadius: "var(--r-lg)", overflow: "hidden",
                border: "1px solid var(--paper-line)", background: "var(--paper)" }}>
                <div style={{ aspectRatio: "1 / 1", position: "relative", overflow: "hidden",
                  background: "#26232a",
                  backgroundImage: "radial-gradient(circle, rgba(255,255,255,.16) 1.4px, transparent 1.7px)",
                  backgroundSize: "15px 15px", backgroundPosition: "center",
                  display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
                  <div aria-hidden="true" style={{ position: "absolute", inset: 0,
                    background: "linear-gradient(180deg, rgba(38,35,42,.1) 0%, rgba(38,35,42,.78) 100%)" }} />
                </div>
                <div style={{ padding: "20px 22px 24px" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20,
                    letterSpacing: "-0.03em", color: "var(--ink-3)", marginBottom: 6 }}>To be announced</div>
                  <Kicker style={{ fontSize: 11 }}>{r}</Kicker>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div aria-hidden="true" style={{ height: "clamp(80px,11vw,160px)" }} />
      </div>
    </section>
  );
}

// ── Close / CTA ────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--ink)",
      padding: "clamp(96px,14vw,200px) clamp(20px,5vw,64px)" }}>
      {/* acid-yellow glow — low, toward the bottom */}
      <div aria-hidden="true" style={{
        position: "absolute", bottom: "-220px", left: "50%", width: 620, height: 560,
        transform: "translateX(-50%)",
        borderRadius: "50%", pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(circle at center, rgba(247,255,5,.5) 0%, rgba(247,255,5,.2) 38%, rgba(247,255,5,0) 70%)",
        filter: "blur(26px)",
      }} />
      <div style={{ maxWidth: 980, margin: "0 auto", position: "relative", zIndex: 1, textAlign: "center" }}>
        <Reveal>
          <h2 className="ff-display" style={{ color: "#fff", fontSize: "clamp(44px,7vw,96px)", marginBottom: 40 }}>
            Building the new earth.
          </h2>
        </Reveal>
        <Reveal delay={90} style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
          <Button variant="light" style={{ background: "var(--accent)", color: "var(--accent-ink)" }}>Get in touch</Button>
          <Button variant="ghost" as="a" href="#/manifesto" style={{ background: "transparent", color: "#fff",
            border: "1px solid rgba(255,255,255,.3)" }}>Read the worldview</Button>
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
      <div style={{ maxWidth: 1340, margin: "0 auto", borderTop: "1px solid rgba(255,255,255,.12)", paddingTop: 48 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 30, justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Orb size={30} variant="white" />
            <Wordmark size={22} color="#fff" />
          </div>
          <div className="ff-family" style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            {family.map((f, i) => (
              <React.Fragment key={f}>
                {i > 0 && <span style={{ color: "rgba(255,255,255,.3)" }}>·</span>}
                <a href="#" style={{
                  fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase",
                  color: f === "Firma Frontier" ? "var(--accent)" : "rgba(255,255,255,.55)", textDecoration: "none",
                }}>{f}</a>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 40, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em",
          color: "rgba(255,255,255,.4)", textTransform: "uppercase" }}>
          © 2026 Firma Frontier · Conviction capital for the frontier
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { SectionHead, WhatWeBack, Approach, Credibility, People, CTA, Footer });
