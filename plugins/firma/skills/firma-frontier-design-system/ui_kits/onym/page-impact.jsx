// Onym Capital — Impact page body (restrained; dark statement)
const { useState: useStateOM, useEffect: useEffectOM } = React;

const ON_PRINCIPLES = [
  ["Patient", "We hold for the long arc. Real assets compound on a horizon measured in decades, not exits."],
  ["Disciplined", "We say no with conviction. A concentrated book of considered bets beats activity for its own sake."],
  ["Aligned", "We win when our partners win. Our incentives, our horizon and our patience are theirs."],
  ["Durable", "We back what endures — the systems that will still be standing, and compounding, in fifty years."],
];

function ImpactBody() {
  const [load, setLoad] = useStateOM(false);
  useEffectOM(() => { const t = setTimeout(() => setLoad(true), 80); return () => clearTimeout(t); }, []);
  const step = (i) => ({ opacity: load ? 1 : 0, transform: load ? "none" : "translateY(20px)",
    transition: `opacity 700ms var(--ease) ${i * 120}ms, transform 700ms var(--ease) ${i * 120}ms` });
  return (
    <main>
      {/* hero — light, editorial */}
      <header style={{ background: "var(--canvas)", padding: "clamp(140px,16vw,210px) clamp(20px,5vw,64px) clamp(56px,7vw,90px)" }}>
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <Kicker style={step(0)}>Impact</Kicker>
          <h1 className="ff-display" style={{ ...step(1), fontSize: "clamp(44px,7vw,96px)", margin: "20px 0 24px", maxWidth: 900 }}>
            Discipline is the strategy.
          </h1>
          <p className="ff-lead" style={{ ...step(2), maxWidth: 600, color: "var(--ink-2)" }}>
            We measure success by what endures. Restraint is the edge — and the clearest signal
            of respect for the capital we steward.
          </p>
        </div>
      </header>
      {/* principles — clean ruled rows */}
      <section style={{ background: "var(--canvas)", padding: "clamp(40px,5vw,72px) clamp(20px,5vw,64px) clamp(80px,10vw,140px)" }}>
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          {ON_PRINCIPLES.map(([t, d], i) => (
            <Reveal key={t} delay={i * 80}>
              <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "clamp(20px,4vw,56px)",
                padding: "clamp(28px,4vw,44px) 0", borderTop: "1px solid var(--ink-line)" }} className="on-impact-row">
                <h2 className="ff-h3" style={{ fontSize: "clamp(26px,3vw,40px)", margin: 0 }}>{t}</h2>
                <p className="ff-lead" style={{ margin: 0, color: "var(--ink-2)", maxWidth: 560 }}>{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      {/* dark closing statement — Onym's quiet gravitas */}
      <section style={{ background: "var(--d-surface-0)", padding: "clamp(96px,14vw,200px) clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal>
            <h2 className="ff-display" style={{ fontSize: "clamp(30px,4.4vw,60px)", color: "var(--d-ink)", maxWidth: 880 }}>
              The economy is being rebuilt in atoms. We commit early, hold long, and align with the builders.
            </h2>
          </Reveal>
        </div>
      </section>
      <CTA />
    </main>
  );
}

Object.assign(window, { ImpactBody });
