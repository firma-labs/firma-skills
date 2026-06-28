// Firma Frontier — Nav, Hero, Manifesto
const { useEffect: useEffectNH, useState: useStateNH, useRef: useRefNH } = React;

// ── Shared "stuck" store ───────────────────────────────────────────────────
// Section headers report when they pin (stuck) against the 66px nav. The nav
// subscribes so it can go dark only while a section header is touching it —
// the dark header "merges up" into the nav rather than the nav darkening on
// any scroll.
window.FFStuck = window.FFStuck || (function () {
  const set = new Set();
  const listeners = new Set();
  const emit = () => { const on = set.size > 0; listeners.forEach((l) => l(on)); };
  return {
    set(id, on) { const had = set.size > 0; if (on) set.add(id); else set.delete(id); if ((set.size > 0) !== had) emit(); },
    subscribe(l) { listeners.add(l); l(set.size > 0); return () => listeners.delete(l); },
  };
})();

// ── DissolveOrb ────────────────────────────────────────────────────────────
// The brand orb, sampled into a dot-matrix field (on-brand) that disintegrates
// into drifting embers on hover and reassembles on leave. Pure canvas/RAF.
function DissolveOrb({ src = "../../assets/orb-acid-smooth.png", orb = 380, pad = 132 }) {
  const wrapRef = useRefNH(null);
  const canvasRef = useRefNH(null);
  const particlesRef = useRefNH(null);
  const targetRef = useRefNH(0);
  const progRef = useRefNH(0);
  const mouseRef = useRefNH({ x: null, y: null });
  const BOX = orb + pad * 2; // logical drawing box (orb centred, room for embers)

  useEffectNH(() => {
    const canvas = canvasRef.current, wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    let raf = 0, dpr = Math.min(window.devicePixelRatio || 1, 2), scale = 1;
    let lastMx = null, lastMy = null; // cursor position last frame (for swept-segment repel)

    // Resize backing store to match the rendered box (keeps logical BOX coords)
    const sync = () => {
      const cssBox = wrap.clientWidth * (BOX / orb);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.style.width = cssBox + "px";
      canvas.style.height = cssBox + "px";
      canvas.width = Math.round(cssBox * dpr);
      canvas.height = Math.round(cssBox * dpr);
      scale = (cssBox * dpr) / BOX;
    };
    sync();
    const ro = new ResizeObserver(sync); ro.observe(wrap);

    // Magnetic field: track the cursor in BOX-logical coords. We repel against the
    // line the cursor swept since last frame, so even a fast flick hits every atom
    // in its path; atoms then spring back together like liquid.
    const REP_R = 132, REP_STR = 19, SPRING = 0.085, DAMP = 0.87;
    const onMove = (ev) => {
      const r = canvas.getBoundingClientRect();
      const mx = ((ev.clientX - r.left) / r.width) * BOX;
      const my = ((ev.clientY - r.top) / r.height) * BOX;
      if (mx > -70 && mx < BOX + 70 && my > -70 && my < BOX + 70) mouseRef.current = { x: mx, y: my };
      else mouseRef.current = { x: null, y: null };
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    // Sample the orb image into particles
    const img = new Image();
    img.onload = () => {
      const off = document.createElement("canvas");
      off.width = orb; off.height = orb;
      const octx = off.getContext("2d");
      octx.drawImage(img, 0, 0, orb, orb);
      const data = octx.getImageData(0, 0, orb, orb).data;
      const S = 4.4, cx = orb / 2, cy = orb / 2, ps = [];
      for (let y = 0; y < orb; y += S) {
        for (let x = 0; x < orb; x += S) {
          const i = ((y | 0) * orb + (x | 0)) * 4;
          const a = data[i + 3];
          if (a < 60) continue;
          const ang = Math.atan2(y - cy, x - cx) + (Math.random() - 0.5) * 1.35;
          ps.push({
            hx: pad + x, hy: pad + y,
            col: `rgb(${data[i]},${data[i + 1]},${data[i + 2]})`,
            a: a / 255,
            ang, dist: 70 + Math.random() * 240, rise: 24 + Math.random() * 130,
            swirl: (Math.random() - 0.5) * 1.7, t0: Math.random() * 0.34,
            wob: 6 + Math.random() * 17, spd: 0.6 + Math.random() * 1.5,
            ph: Math.random() * 6.283, sz: S * 0.86, ox: 0, oy: 0, vx: 0, vy: 0,
          });
        }
      }
      particlesRef.current = ps;
    };
    img.src = src;

    const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
    const frame = (now) => {
      const ps = particlesRef.current;
      progRef.current += (targetRef.current - progRef.current) * 0.085;
      const prog = reduce ? targetRef.current : progRef.current;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (ps) {
        ctx.setTransform(scale, 0, 0, scale, 0, 0);
        const t = now / 1000;
        // Swept cursor segment a→b for this frame (point if the cursor just appeared)
        const m = mouseRef.current;
        const active = m.x != null;
        const ax = lastMx != null ? lastMx : m.x, ay = lastMy != null ? lastMy : m.y;
        const bx = m.x, by = m.y;
        const abx = active ? bx - ax : 0, aby = active ? by - ay : 0;
        const abLen2 = abx * abx + aby * aby || 1e-6;
        for (let k = 0; k < ps.length; k++) {
          const p = ps[k];
          const lp = clamp01((prog - p.t0) / 0.62);
          const e = lp * lp * (3 - 2 * lp);
          const D = p.dist * e;
          const a2 = p.ang + p.swirl * e;
          const x = p.hx + Math.cos(a2) * D + Math.sin(t * p.spd + p.ph) * p.wob * e;
          const y = p.hy + Math.sin(a2) * D - p.rise * e + Math.cos(t * p.spd * 0.8 + p.ph) * p.wob * 0.6 * e;
          // force = repulsion from the swept segment + spring pull back to rest
          let fx = -p.ox * SPRING, fy = -p.oy * SPRING;
          if (active) {
            const px = x + p.ox, py = y + p.oy;
            let tt = ((px - ax) * abx + (py - ay) * aby) / abLen2;
            tt = tt < 0 ? 0 : tt > 1 ? 1 : tt;
            const dx = px - (ax + abx * tt), dy = py - (ay + aby * tt);
            const dd = Math.sqrt(dx * dx + dy * dy);
            if (dd < REP_R && dd > 0.01) {
              const f = 1 - dd / REP_R;
              const mag = f * f * REP_STR * (1 - prog * 0.7);
              fx += (dx / dd) * mag; fy += (dy / dd) * mag;
            }
          }
          // integrate velocity (damped) → liquid knock-away + reform
          p.vx = (p.vx + fx) * DAMP; p.vy = (p.vy + fy) * DAMP;
          p.ox += p.vx; p.oy += p.vy;
          const al = p.a * (1 - e * 0.93);
          if (al <= 0.012) continue;
          const s = p.sz * (1 + e * 0.7);
          ctx.globalAlpha = al;
          ctx.fillStyle = p.col;
          ctx.fillRect(x + p.ox - s / 2, y + p.oy - s / 2, s, s);
        }
        ctx.globalAlpha = 1;
        lastMx = m.x; lastMy = m.y;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf); ro.disconnect();
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div ref={wrapRef} style={{
      position: "relative", width: "min(74vw, 380px)", aspectRatio: "1 / 1",
      animation: "ffOrbFloat 7s ease-in-out infinite alternate",
    }}>
      <canvas ref={canvasRef} aria-hidden="true" style={{
        position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)",
        pointerEvents: "none",
      }} />
      <div role="img" aria-label="Firma Frontier"
        style={{ position: "absolute", inset: 0, borderRadius: "50%" }} />
    </div>
  );
}

// ── Fixed navigation (white blur) ─────────────────────────────────────────
// Tab-style: when `go`/`route` are passed it switches views in place (SPA);
// otherwise it falls back to hard hrefs for standalone use.
const FF_NAV_LINKS = [
  { label: "Industries", view: "industries", href: "index.html#/industries" },
  { label: "Manifesto", view: "manifesto", href: "index.html#/manifesto" },
  { label: "Impact", view: "impact", href: "index.html#/impact" },
  { label: "Contact", view: "contact", href: "index.html#/contact" },
];

function Nav({ route, go }) {
  const [scrolled, setScrolled] = useStateNH(false);
  const [headerTouching, setHeaderTouching] = useStateNH(false);
  useEffectNH(() => {
    const f = () => setScrolled(window.scrollY > 20);
    f(); window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  useEffectNH(() => window.FFStuck && window.FFStuck.subscribe(setHeaderTouching), []);
  const spa = typeof go === "function";
  const here = (location.pathname.split("/").pop() || "index.html");
  const onNav = (e, l) => { if (spa) { e.preventDefault(); go(l.view); } };

  // Nav goes dark while a pinned section header (or the manifesto's top
  // sentinel) is touching it — driven by the FFStuck IntersectionObserver
  // channel, which is reliable regardless of the scroll container.
  const dark = headerTouching;
  const navFg = dark ? "#fff" : "var(--ink)";
  const navFg2 = dark ? "rgba(255,255,255,.62)" : "var(--ink-2)";

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, height: 66, zIndex: 50,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 clamp(20px, 5vw, 64px)",
      backgroundColor: dark ? "#38353b" : "rgba(255,255,255,.9)",
      backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
      borderBottom: `1px solid ${dark ? "rgba(255,255,255,.1)" : "transparent"}`,
      transition: "background-color var(--dur) var(--ease), border-color var(--dur) var(--ease)",
    }}>
      <a href={spa ? "#/" : "index.html"} onClick={(e) => { if (spa) { e.preventDefault(); go("home"); } }}
        style={{ display: "flex", alignItems: "center", gap: "0.2em", textDecoration: "none", fontSize: 30 }}>
        <Orb size={28} variant={dark ? "yellow" : "ink"} style={{ width: "0.92em", height: "0.92em" }} />
        <Wordmark size={20} color={navFg} />
      </a>
      <div className="ff-navlinks" style={{ display: "flex", gap: 30 }}>
        {FF_NAV_LINKS.map(l => {
          const active = spa ? route === l.view : here === l.href.split("#")[0];
          return (
            <a key={l.label} href={spa ? ("#/" + l.view) : l.href} onClick={(e) => onNav(e, l)} style={{
              fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.14em",
              textTransform: "uppercase", color: active ? navFg : navFg2,
              textDecoration: "none", transition: "color var(--dur-fast) var(--ease)",
              borderBottom: active ? `2px solid ${dark ? "var(--accent)" : "var(--ink)"}` : "2px solid transparent", paddingBottom: 2,
            }}
            onMouseEnter={e => e.currentTarget.style.color = navFg}
            onMouseLeave={e => e.currentTarget.style.color = active ? navFg : navFg2}>{l.label}</a>
          );
        })}
      </div>
      <Button as="a" href={spa ? "#/contact" : "contact.html"}
        onClick={(e) => { if (spa) { e.preventDefault(); go("contact"); } }}
        style={{ background: dark ? "var(--accent)" : "var(--ink)", color: dark ? "var(--accent-ink)" : "#fff" }}>Get in touch</Button>
    </nav>
  );
}

// ── Hero — matches Figma 7483-6166: wordmark lockup, big headline left,
//    dot-matrix card floating right over a soft iridescent glow ────────────
function Hero() {
  const [load, setLoad] = useStateNH(false);
  useEffectNH(() => { const t = setTimeout(() => setLoad(true), 80); return () => clearTimeout(t); }, []);
  const step = (i) => ({
    opacity: load ? 1 : 0,
    transform: load ? "none" : "translateY(26px)",
    transition: `opacity 900ms var(--ease) ${i * 160}ms, transform 900ms var(--ease) ${i * 160}ms`,
  });
  return (
    <header id="top" style={{ position: "relative", overflow: "hidden", background: "var(--canvas)" }}>
      <div style={{
        maxWidth: 1500, margin: "0 auto", padding: "150px clamp(20px,5vw,64px) 96px",
        display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,560px)",
        gap: "clamp(32px,5vw,80px)", alignItems: "center",
      }} className="ff-hero-grid">

        {/* left column */}
        <div>
          <Kicker style={step(0)}>Firma Frontier&nbsp;&nbsp;·&nbsp;&nbsp;Conviction Capital for the Frontier</Kicker>
          <h1 className="ff-display" style={{ ...step(1), margin: "22px 0 26px", maxWidth: 760 }}>
            Capital for a new earth.
          </h1>
          <p className="ff-lead" style={{ ...step(2), maxWidth: 600, color: "var(--ink-2)" }}>
            We back the founders building what the world will depend on — at the scale the moment demands.
          </p>
          <div style={{ ...step(3), display: "flex", gap: 14, marginTop: 38 }}>
            <Button>Get in touch</Button>
            <Button variant="ghost">What we back →</Button>
          </div>
        </div>

        {/* right column — brand orb floating over the iridescent glow */}
        <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", minHeight: 380 }}>
          <GradientGlow w={540} h={440} blur={78} opacity={0.6}
            style={{ left: "50%", top: "50%", marginLeft: -270, marginTop: -220 }} />
          <div style={{
            position: "relative",
            opacity: load ? 1 : 0,
            transform: load ? "none" : "translateY(34px)",
            transition: "opacity 1100ms var(--ease) 600ms, transform 1100ms var(--ease) 600ms",
          }}>
            <DissolveOrb />
          </div>
        </div>
      </div>
    </header>
  );
}

// ── Manifesto / Worldview — the cultural centrepiece ───────────────────────
function Manifesto() {
  const SectionHead = window.SectionHead;
  const paras = [
    "The last era of capital optimized for extraction — the most value, pulled from the fewest hands. It is unwinding.",
    "The next era belongs to the builders of real things: energy, intelligence, sovereignty — the systems a civilization runs on. The pioneers of a new earth.",
    "Firma Frontier is the capital behind them. We back the founders building what the world will depend on, at the scale the moment demands.",
    "We believe returns are the result of stewardship, not its enemy. That caring for people is not a cost of doing business — it is the business.",
  ];
  const close = "The frontier doesn't need more extraction. It needs conviction. We bring it.";
  return (
    <section id="worldview" style={{ background: "var(--canvas)" }}>
      <div style={{ maxWidth: 1340, margin: "0 auto", padding: "0 clamp(20px,5vw,64px)" }}>
        <SectionHead kicker="Worldview" title="A new earth is being built. We fund it." bg="var(--canvas)" max={920} />
        <div className="ff-worldview-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
          {paras.map((p, i) => (
            <Reveal key={i} delay={(i % 2) * 80} style={{ height: "100%" }}>
              <div style={{ height: "100%", boxSizing: "border-box", background: "var(--paper)",
                border: "1px solid var(--paper-line)", borderRadius: "var(--r-lg)",
                padding: "clamp(26px,3vw,40px)" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.16em",
                  color: "var(--ink-3)", marginBottom: 18 }}>{String(i + 1).padStart(2, "0")}</div>
                <p className="ff-lead" style={{ margin: 0, color: i >= 2 ? "var(--ink)" : "var(--ink-2)" }}>{p}</p>
              </div>
            </Reveal>
          ))}
          {/* closing conviction — full-width ink box */}
          <Reveal delay={160} style={{ gridColumn: "1 / -1" }}>
            <div style={{ background: "var(--ink)", borderRadius: "var(--r-lg)",
              padding: "clamp(34px,4vw,56px)", display: "flex", alignItems: "baseline",
              gap: "clamp(18px,3vw,40px)", flexWrap: "wrap" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.16em",
                color: "var(--accent)", flex: "none" }}>05</div>
              <p className="ff-h3" style={{ margin: 0, color: "#fff", maxWidth: 900,
                fontSize: "clamp(22px,2.4vw,34px)", lineHeight: 1.25 }}>{close}</p>
            </div>
          </Reveal>
        </div>
        <div aria-hidden="true" style={{ height: "clamp(80px,11vw,160px)" }} />
      </div>
    </section>
  );
}

Object.assign(window, { Nav, Hero, Manifesto });
