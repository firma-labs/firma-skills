// Onym Capital — Nav, Hero, Thesis
const { useEffect: useEffectNH, useState: useStateNH, useRef: useRefNH } = React;

// ── Shared "stuck" store ───────────────────────────────────────────────────
// Section headers report when they pin against the 66px nav; the nav subscribes
// so it darkens only while a header is touching it (the dark header merges up).
window.ONStuck = window.ONStuck || (function () {
  const set = new Set();
  const listeners = new Set();
  const emit = () => { const on = set.size > 0; listeners.forEach((l) => l(on)); };
  return {
    set(id, on) { const had = set.size > 0; if (on) set.add(id); else set.delete(id); if ((set.size > 0) !== had) emit(); },
    subscribe(l) { listeners.add(l); l(set.size > 0); return () => listeners.delete(l); },
  };
})();

// ── AtomOrb ────────────────────────────────────────────────────────────────
// Onym's black mark, sampled into a dot field. No glow, no dissolve — the atoms
// only part as the cursor sweeps through (fast or slow, via the swept segment)
// and spring back together like liquid. Restrained by design.
function AtomOrb({ src = "../../assets/orb-ink-official.png", orb = 360, pad = 130 }) {
  const wrapRef = useRefNH(null);
  const canvasRef = useRefNH(null);
  const particlesRef = useRefNH(null);
  const mouseRef = useRefNH({ x: null, y: null });
  const BOX = orb + pad * 2;

  useEffectNH(() => {
    const canvas = canvasRef.current, wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    let raf = 0, dpr = Math.min(window.devicePixelRatio || 1, 2), scale = 1;
    let lastMx = null, lastMy = null;

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

    // Swept-segment repulsion + velocity/spring physics (liquid reform)
    const REP_R = 132, REP_STR = 19, SPRING = 0.085, DAMP = 0.87;
    const onMove = (ev) => {
      const r = canvas.getBoundingClientRect();
      const mx = ((ev.clientX - r.left) / r.width) * BOX;
      const my = ((ev.clientY - r.top) / r.height) * BOX;
      if (mx > -70 && mx < BOX + 70 && my > -70 && my < BOX + 70) mouseRef.current = { x: mx, y: my };
      else mouseRef.current = { x: null, y: null };
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const img = new Image();
    img.onload = () => {
      const off = document.createElement("canvas");
      off.width = orb; off.height = orb;
      const octx = off.getContext("2d");
      octx.drawImage(img, 0, 0, orb, orb);
      const data = octx.getImageData(0, 0, orb, orb).data;
      const S = 4.4, ps = [];
      for (let y = 0; y < orb; y += S) {
        for (let x = 0; x < orb; x += S) {
          const i = ((y | 0) * orb + (x | 0)) * 4;
          if (data[i + 3] < 60) continue;
          ps.push({
            hx: pad + x, hy: pad + y,
            col: `rgb(${data[i]},${data[i + 1]},${data[i + 2]})`,
            a: data[i + 3] / 255, sz: S * 0.86, ox: 0, oy: 0, vx: 0, vy: 0,
          });
        }
      }
      particlesRef.current = ps;
    };
    img.src = src;

    const frame = () => {
      const ps = particlesRef.current;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (ps) {
        ctx.setTransform(scale, 0, 0, scale, 0, 0);
        const m = mouseRef.current, active = m.x != null;
        const ax = lastMx != null ? lastMx : m.x, ay = lastMy != null ? lastMy : m.y;
        const abx = active ? m.x - ax : 0, aby = active ? m.y - ay : 0;
        const abLen2 = abx * abx + aby * aby || 1e-6;
        for (let k = 0; k < ps.length; k++) {
          const p = ps[k];
          let fx = -p.ox * SPRING, fy = -p.oy * SPRING;
          if (active) {
            const px = p.hx + p.ox, py = p.hy + p.oy;
            let tt = ((px - ax) * abx + (py - ay) * aby) / abLen2;
            tt = tt < 0 ? 0 : tt > 1 ? 1 : tt;
            const dx = px - (ax + abx * tt), dy = py - (ay + aby * tt);
            const dd = Math.sqrt(dx * dx + dy * dy);
            if (dd < REP_R && dd > 0.01) {
              const f = 1 - dd / REP_R, mag = f * f * REP_STR;
              fx += (dx / dd) * mag; fy += (dy / dd) * mag;
            }
          }
          p.vx = (p.vx + fx) * DAMP; p.vy = (p.vy + fy) * DAMP;
          p.ox += p.vx; p.oy += p.vy;
          const s = p.sz;
          ctx.globalAlpha = p.a;
          ctx.fillStyle = p.col;
          ctx.fillRect(p.hx + p.ox - s / 2, p.hy + p.oy - s / 2, s, s);
        }
        ctx.globalAlpha = 1;
        lastMx = m.x; lastMy = m.y;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); window.removeEventListener("mousemove", onMove); };
  }, []);

  return (
    <div ref={wrapRef} style={{
      position: "relative", width: "min(74vw, 360px)", aspectRatio: "1 / 1", margin: "0 auto",
      animation: "onOrbFloat 8s ease-in-out infinite alternate",
    }}>
      <canvas ref={canvasRef} aria-hidden="true" style={{
        position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)",
        pointerEvents: "none",
      }} />
      <div role="img" aria-label="Onym Capital"
        style={{ position: "absolute", inset: 0, borderRadius: "50%" }} />
    </div>
  );
}

// ── Fixed navigation (white blur) ─────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useStateNH(false);
  const [stuck, setStuck] = useStateNH(false);
  useEffectNH(() => {
    const f = () => setScrolled(window.scrollY > 20);
    f(); window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  useEffectNH(() => window.ONStuck && window.ONStuck.subscribe(setStuck), []);
  const links = [
    { label: "Industries", href: "industries.html" },
    { label: "Approach", href: "index.html#approach" },
    { label: "Impact", href: "impact.html" },
    { label: "Contact", href: "contact.html" },
  ];
  const here = (location.pathname.split("/").pop() || "index.html");
  const dark = scrolled || stuck;
  const fg = dark ? "#fff" : "var(--ink)";
  const fg2 = dark ? "rgba(255,255,255,.6)" : "var(--ink-2)";
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, height: 66, zIndex: 50,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 clamp(20px, 5vw, 64px)",
      background: dark ? "var(--ink)" : "rgba(255,255,255,.8)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
      borderBottom: `1px solid ${dark ? "rgba(255,255,255,.1)" : (scrolled ? "var(--ink-line)" : "transparent")}`,
      transition: "background var(--dur) var(--ease), border-color var(--dur) var(--ease)",
    }}>
      <a href="index.html" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
        <img src="../../assets/onym-capital-lockup.png" alt="Onym Capital"
          style={{ height: 24, display: "block", filter: dark ? "invert(1) brightness(2)" : "none",
            transition: "filter var(--dur) var(--ease)" }} />
      </a>
      <div className="on-navlinks" style={{ display: "flex", gap: 30 }}>
        {links.map(l => {
          const active = here === l.href.split("#")[0];
          return (
            <a key={l.label} href={l.href} style={{
              fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.14em",
              textTransform: "uppercase", color: active ? fg : fg2, textDecoration: "none",
              transition: "color var(--dur-fast) var(--ease)",
              borderBottom: active ? `1px solid ${fg}` : "1px solid transparent", paddingBottom: 3,
            }}
            onMouseEnter={e => e.currentTarget.style.color = fg}
            onMouseLeave={e => e.currentTarget.style.color = active ? fg : fg2}>{l.label}</a>
          );
        })}
      </div>
      <Button as="a" href="contact.html"
        style={dark ? { background: "#fff", color: "var(--ink)" } : undefined}>Get in touch</Button>
    </nav>
  );
}

// ── Hero — monochrome: lockup, big headline left, mono dot-matrix card right.
//    Vast negative space. No glow. Calm staggered reveal. ──────────────────
function Hero() {
  const [load, setLoad] = useStateNH(false);
  useEffectNH(() => { const t = setTimeout(() => setLoad(true), 80); return () => clearTimeout(t); }, []);
  const step = (i) => ({
    opacity: load ? 1 : 0,
    transform: load ? "none" : "translateY(24px)",
    transition: `opacity 900ms var(--ease) ${i * 150}ms, transform 900ms var(--ease) ${i * 150}ms`,
  });
  return (
    <header id="top" style={{ position: "relative", overflow: "hidden", background: "var(--canvas)" }}>
      <div style={{
        maxWidth: 1500, margin: "0 auto", padding: "160px clamp(20px,5vw,64px) 110px",
        display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,540px)",
        gap: "clamp(32px,5vw,88px)", alignItems: "center",
      }} className="on-hero-grid">

        {/* left column */}
        <div>
          <div style={{ ...step(0), marginBottom: 34 }}>
            <img src="../../assets/onym-capital-lockup.png" alt="Onym Capital"
              style={{ height: "clamp(34px,4.6vw,64px)", display: "block" }} />
          </div>
          <Kicker style={step(1)}>Onym Capital&nbsp;&nbsp;·&nbsp;&nbsp;Capital at the Frontier</Kicker>
          <h1 className="ff-display" style={{ ...step(2), margin: "22px 0 26px", maxWidth: 720 }}>
            Patient capital for the new economy.
          </h1>
          <p className="ff-lead" style={{ ...step(3), maxWidth: 560, color: "var(--ink-2)" }}>
            We back the companies rebuilding the physical economy — energy, infrastructure and
            the systems the next century will run on.
          </p>
          <div style={{ ...step(4), display: "flex", gap: 14, marginTop: 38 }}>
            <Button>Get in touch</Button>
            <Button variant="ghost">What we back →</Button>
          </div>
        </div>

        {/* right column — black atom orb, magnetic & liquid. No glow. */}
        <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
          <div style={{
            position: "relative", width: "100%", maxWidth: 420,
            opacity: load ? 1 : 0, transform: load ? "none" : "translateY(30px) scale(.985)",
            transition: "opacity 1000ms var(--ease) 620ms, transform 1000ms var(--ease) 620ms",
          }}>
            <AtomOrb />
          </div>
        </div>
      </div>
    </header>
  );
}

// ── Thesis — restrained editorial centrepiece ──────────────────────────────
function Thesis() {
  const paras = [
    "Software ate the world. The next era is harder: it is built in atoms — energy, infrastructure, compute, land.",
    "These are the systems a modern economy actually runs on. They are capital-intensive, slow to build, and durable for decades.",
    "Onym is the patient capital behind them. We commit early, hold long, and align with founders building for the next quarter-century — not the next quarter.",
    "Discipline is the strategy. Restraint is the edge.",
  ];
  return (
    <section style={{ position: "relative", background: "var(--canvas)",
      padding: "clamp(80px,12vw,180px) clamp(20px,5vw,64px)" }}>
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>
        <Reveal><Kicker style={{ display: "block", marginBottom: 34 }}>Thesis</Kicker></Reveal>
        <Reveal delay={80}>
          <h2 className="ff-display" style={{ fontSize: "clamp(38px,5.6vw,78px)", maxWidth: 900, marginBottom: 60 }}>
            The economy is being rebuilt in atoms.
          </h2>
        </Reveal>
        <div style={{ maxWidth: 740, display: "flex", flexDirection: "column", gap: 30 }}>
          {paras.map((p, i) => (
            <Reveal key={i} delay={i * 60}>
              <p className="ff-lead" style={{ color: i === paras.length - 1 ? "var(--ink)" : "var(--ink-2)",
                fontWeight: i === paras.length - 1 ? 500 : 400 }}>{p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Nav, Hero, Thesis });
