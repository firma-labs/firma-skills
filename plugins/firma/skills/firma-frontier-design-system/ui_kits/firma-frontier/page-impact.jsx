// Firma Frontier — Impact / Stewardship page body
const { useState: useStateMP, useEffect: useEffectMP } = React;

const FF_PRINCIPLES = [
  ["Stewardship is the strategy", "We measure success by what endures, not by what exits. Returns are the result of stewardship — not its enemy."],
  ["People are the business", "Caring for the people a company touches is not a cost of doing business. It is the business."],
  ["Patient by design", "We hold for the long arc. The frontier compounds on a civilizational horizon, not a quarterly one."],
  ["Conviction over extraction", "The last era pulled the most value from the fewest hands. We back the builders of real things instead."],
];

function ImpactBody() {
  const [load, setLoad] = useStateMP(false);
  useEffectMP(() => { const t = setTimeout(() => setLoad(true), 80); return () => clearTimeout(t); }, []);
  const step = (i) => ({ opacity: load ? 1 : 0, transform: load ? "none" : "translateY(24px)",
    transition: `opacity 800ms var(--ease) ${i * 130}ms, transform 800ms var(--ease) ${i * 130}ms` });
  return (
    <main>
      {/* hero — dark, the reflective register */}
      <header style={{ position: "relative", overflow: "hidden", background: "var(--ink)",
        padding: "clamp(140px,17vw,220px) clamp(20px,5vw,64px) clamp(72px,9vw,120px)" }}>
        <GradientGlow w={820} h={480} blur={130} opacity={0.42}
          style={{ left: "-180px", bottom: "-160px", animationDuration: "22s" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: "-160px", right: "-120px",
          width: 520, height: 520, borderRadius: "50%", pointerEvents: "none",
          background: "radial-gradient(circle at center, rgba(247,255,5,.4) 0%, rgba(247,255,5,0) 68%)", filter: "blur(24px)" }} />
        <div style={{ maxWidth: 1040, margin: "0 auto", position: "relative" }}>
          <Kicker color="var(--accent)" style={step(0)}>Impact</Kicker>
          <h1 className="ff-display" style={{ ...step(1), color: "#fff", fontSize: "clamp(44px,7.5vw,100px)", margin: "20px 0 28px", maxWidth: 920 }}>
            Returns are the result of stewardship.
          </h1>
          <p className="ff-lead" style={{ ...step(2), maxWidth: 620, color: "rgba(255,255,255,.66)" }}>
            We believe caring for people is not a cost of doing business — it is the business.
            That conviction shapes every company we back.
          </p>
        </div>
      </header>

      {/* principles */}
      <section style={{ background: "var(--canvas)", padding: "clamp(80px,11vw,160px) clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 1040, margin: "0 auto", display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)", gap: "clamp(28px,4vw,56px)" }} className="ff-impact-grid">
          {FF_PRINCIPLES.map(([t, d], i) => (
            <Reveal key={t} delay={i * 80}>
              <div style={{ borderTop: "2px solid var(--ink)", paddingTop: 26 }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.2em",
                  textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 16 }}>{String(i + 1).padStart(2, "0")}</div>
                <h2 className="ff-h3" style={{ fontSize: "clamp(24px,2.4vw,32px)", marginBottom: 14 }}>{t}</h2>
                <p className="ff-small" style={{ fontSize: 18 }}>{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* closing statement */}
      <section style={{ background: "var(--paper)", padding: "clamp(80px,12vw,180px) clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal>
            <h2 className="ff-display" style={{ fontSize: "clamp(32px,4.6vw,64px)", maxWidth: 880 }}>
The frontier doesn't need more extraction. It needs conviction. We bring it.
            </h2>
          </Reveal>
        </div>
      </section>
      <CTA />
    </main>
  );
}

Object.assign(window, { ImpactBody });
