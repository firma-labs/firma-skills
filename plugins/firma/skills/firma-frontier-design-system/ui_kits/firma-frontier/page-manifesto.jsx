// Firma Frontier — Manifesto. A single declaration document: letterhead,
// masthead, flowing titled sections, a JetBrains-Mono manifest block, an
// emphatic close, and a signed sign-off. Honest framing — no fabricated numbers.
const { useState: useStateMF, useEffect: useEffectMF, useRef: useRefMF } = React;

// ── The manifesto, verbatim — as movements of stanzas ──────────────────────
// Each stanza is a group of lines. `tone` controls emphasis:
//   "lead"     — the opening dedication, larger
//   "turn"     — "We call them founders." the human pivot
//   "pivot"    — "We fund what comes after." standalone, accent rule
//   "belief"   — the radical belief, set apart on paper card
const MF_MOVEMENTS = [
  { lines: ["We honor the ones building it."], tone: "lead" },
  { lines: [
    "The fearless. The first movers. The dreamers.",
    "The ones who start before it's safe.",
    "The ones who build for the people the world forgot.",
  ] },
  { lines: [
    "They don't ask permission.",
    "They don't wait for proof.",
    "They see the future before it arrives — and they build it anyway.",
  ] },
  { lines: [
    "Some call them reckless. Naive. Too early.",
    "We call them founders.",
  ], tone: "turn", emphasizeLast: true },
  { lines: [
    "They build the things a civilization runs on.",
    "New energy. New intelligence. New ways for people to govern themselves, and to be free.",
    "Not apps. Not abstractions. Real things, at the scale of nations.",
  ] },
  { lines: [
    "The old world ran on extraction —",
    "take the most, from the most people, and answer to no one.",
    "That world is ending.",
  ] },
  { lines: ["We fund what comes after."], tone: "pivot" },
  { lines: [
    "We back the builders early, and completely.",
    "We bring conviction where the market brings caution,",
    "and capital where it brings committees.",
    "When we believe, we go all in. And we stay.",
  ] },
];

const MF_BELIEF = {
  intro: "We believe one radical thing:",
  head: "Take care of people, and the returns take care of themselves.",
  body: [
    "Caring for people isn't the cost of doing business.",
    "It is the business.",
  ],
};

// ── A stanza of the manifesto ──────────────────────────────────────────────
function Stanza({ lines, tone, emphasizeLast, delay }) {
  const cls = "mf-stanza" + (tone ? " mf-stanza--" + tone : "");
  return (
    <Reveal as="p" className={cls} delay={delay}>
      {lines.map((ln, i) => {
        const last = i === lines.length - 1;
        return (
          <React.Fragment key={i}>
            <span className={emphasizeLast && last ? "mf-emph" : undefined}>{ln}</span>
            {!last && <br />}
          </React.Fragment>
        );
      })}
    </Reveal>
  );
}

function ManifestoBody() {
  const [load, setLoad] = useStateMF(false);
  useEffectMF(() => { const t = setTimeout(() => setLoad(true), 80); return () => clearTimeout(t); }, []);

  // Darken the fixed nav as soon as the page scrolls. Uses the same FFStuck
  // IntersectionObserver channel the nav subscribes to (reliable across scroll
  // containers, unlike window.scrollY in embedded previews).
  const stickRef = useRefMF(null);
  useEffectMF(() => {
    const el = stickRef.current;
    if (!el || !window.FFStuck) return;
    const io = new IntersectionObserver(
      ([e]) => { window.FFStuck.set("manifesto", e.boundingClientRect.top < 66); },
      { threshold: [0, 1], rootMargin: "-66px 0px 0px 0px" }
    );
    io.observe(el);
    return () => { io.disconnect(); if (window.FFStuck) window.FFStuck.set("manifesto", false); };
  }, []);
  const step = (i) => ({ opacity: load ? 1 : 0, transform: load ? "none" : "translateY(26px)",
    transition: `opacity 900ms var(--ease) ${i * 130}ms, transform 900ms var(--ease) ${i * 130}ms` });

  return (
    <main style={{ paddingTop: 66 }}>
      <style>{MF_CSS}</style>
      <div ref={stickRef} aria-hidden="true" style={{ height: 0 }} />

      {/* ── Letterhead — white sticky bar, pinned under the 66px nav ──────── */}
      <div className="mf-letterhead">
        <div className="mf-letterhead-inner">
          <span className="ff-wordmark" style={{ fontSize: 15 }}>firma frontier</span>
          <span className="mf-rule" />
          <span className="mf-lh-mid">The Manifesto</span>
          <span className="mf-rule" />
          <span className="mf-lh-end">№ 001 · MMXXVI</span>
        </div>
      </div>

      {/* ── Masthead ─────────────────────────────────────────────────────── */}
      <header className="mf-masthead">
        <GradientGlow w={920} h={560} blur={140} opacity={0.32}
          style={{ left: "50%", top: "-6%", transform: "translateX(-50%)", animationDuration: "24s" }} />
        <div className="mf-masthead-inner">
          <div style={step(0)}><Kicker>A declaration</Kicker></div>
          <h1 className="ff-display mf-title" style={step(1)}>
            <span className="mf-prompt-glyph">&gt;</span>
            A new earth is being built.<br />We fund it.
          </h1>
          <p className="mf-dek" style={step(2)}>
            This is what we believe, who we are, and what we put capital behind — stated plainly, and on the record.
          </p>
        </div>
      </header>

      {/* ── The manifesto — flowing movements ────────────────────────────── */}
      <article className="mf-doc">
        {MF_MOVEMENTS.map((m, i) => (
          <Stanza key={i} {...m} delay={i === 0 ? 0 : 40} />
        ))}

        {/* The radical belief — set apart */}
        <Reveal as="aside" className="mf-belief">
          <span className="mf-belief-intro">{MF_BELIEF.intro}</span>
          <h2 className="mf-belief-head">{MF_BELIEF.head}</h2>
          <p className="mf-belief-body">
            {MF_BELIEF.body.map((ln, i) => (
              <React.Fragment key={i}>{ln}{i < MF_BELIEF.body.length - 1 && <br />}</React.Fragment>
            ))}
          </p>
        </Reveal>

        {/* The close */}
        <Stanza lines={["The future doesn't need more takers.", "It needs builders."]}
          tone="turn" emphasizeLast={true} delay={40} />
      </article>

      {/* ── The declaration — on ink, the turn ───────────────────────────── */}
      <section className="mf-declare">
        <div aria-hidden="true" className="mf-declare-glow" />
        <div className="mf-declare-inner">
          <Reveal><Kicker color="var(--accent)">The conviction</Kicker></Reveal>
          <Reveal delay={80}>
            <h2 className="ff-display mf-declare-h">
              A new earth is being built.<br /><span className="mf-declare-accent">We fund it.</span>
            </h2>
          </Reveal>
        </div>
      </section>

      {/* ── Signed ───────────────────────────────────────────────────────── */}
      <section className="mf-sign">
        <Reveal className="mf-sign-inner">
          <div className="mf-sign-lockup">
            <Orb size={48} style={{ width: "0.9em", height: "0.9em" }} />
            <span className="ff-wordmark" style={{ fontSize: "1em" }}>firma frontier</span>
          </div>
          <div className="mf-sign-meta">Signed in conviction · Firma Frontier · MMXXVI</div>
        </Reveal>
      </section>

      <CTA />
    </main>
  );
}

const MF_CSS = `
  .mf-letterhead{position:sticky;top:66px;z-index:40;background:var(--canvas);
    border-bottom:1px solid var(--ink-line);}
  .mf-letterhead-inner{display:flex;align-items:center;gap:clamp(12px,2vw,22px);
    max-width:1180px;margin:0 auto;padding:15px clamp(20px,5vw,64px);}
  .mf-rule{flex:1;height:1px;background:var(--ink-line);}
  .mf-lh-mid,.mf-lh-end{font-family:var(--font-mono);font-size:11px;letter-spacing:.22em;
    text-transform:uppercase;color:var(--ink-3);white-space:nowrap;}

  .mf-masthead{position:relative;overflow:hidden;background:var(--canvas);
    padding:clamp(44px,6vw,84px) clamp(20px,5vw,64px) clamp(56px,9vw,116px);}
  .mf-masthead-inner{max-width:1180px;margin:0 auto;position:relative;}
  .mf-title{font-size:clamp(44px,8.2vw,120px);line-height:1.02;margin:24px 0 0;
    max-width:16ch;letter-spacing:-0.035em;}
  .mf-prompt-glyph{color:var(--ink-3);font-family:var(--font-mono);font-size:.3em;
    font-weight:500;letter-spacing:0;vertical-align:.5em;margin-right:.42em;}
  .mf-dek{font-family:var(--font-body);font-weight:400;font-size:clamp(18px,1.7vw,22px);
    line-height:1.5;letter-spacing:-0.01em;color:var(--ink-2);max-width:54ch;margin:clamp(26px,3vw,40px) 0 0;}

  .mf-doc{max-width:1080px;margin:0 auto;padding:clamp(40px,6vw,80px) clamp(20px,5vw,64px) clamp(20px,3vw,40px);}
  .mf-stanza{font-family:var(--font-display);font-weight:500;
    font-size:clamp(24px,3.1vw,42px);line-height:1.28;letter-spacing:-0.025em;
    color:var(--ink);margin:0 0 clamp(34px,4.4vw,64px);max-width:24ch;text-wrap:balance;}
  .mf-stanza:last-child{margin-bottom:0;}
  .mf-stanza--lead{font-weight:600;font-size:clamp(30px,4.4vw,60px);line-height:1.12;
    color:var(--ink);max-width:18ch;margin-bottom:clamp(44px,5.5vw,80px);}
  .mf-stanza--turn{max-width:30ch;}
  .mf-emph{color:var(--ink);background:linear-gradient(transparent 64%, var(--accent) 64%);
    padding:0 .06em;font-weight:700;}
  .mf-stanza--pivot{font-weight:700;font-size:clamp(30px,4.4vw,62px);line-height:1.06;
    letter-spacing:-0.035em;max-width:none;color:var(--ink);
    padding-left:clamp(18px,2.2vw,30px);border-left:3px solid var(--accent);}

  /* The radical belief — paper card, set apart */
  .mf-belief{display:block;margin:clamp(20px,3vw,40px) 0 clamp(40px,5vw,72px);
    background:var(--paper);border:1px solid var(--paper-line);border-radius:var(--r-lg);
    box-shadow:var(--shadow-card);padding:clamp(34px,4.4vw,60px) clamp(30px,4vw,56px);max-width:760px;}
  .mf-belief-intro{font-family:var(--font-mono);font-size:13px;letter-spacing:.14em;
    text-transform:uppercase;color:var(--ink-3);display:block;margin-bottom:18px;}
  .mf-belief-head{font-family:var(--font-display);font-weight:700;letter-spacing:-0.03em;
    font-size:clamp(28px,3.5vw,48px);line-height:1.1;color:var(--ink);margin:0 0 22px;text-wrap:balance;}
  .mf-belief-body{font-family:var(--font-display);font-weight:500;
    font-size:clamp(20px,2vw,27px);line-height:1.4;letter-spacing:-0.02em;color:var(--ink-2);margin:0;}

  /* Declaration */
  .mf-declare{position:relative;overflow:hidden;background:var(--ink);
    padding:clamp(110px,16vw,220px) clamp(20px,5vw,64px);}
  .mf-declare-glow{position:absolute;bottom:-200px;left:50%;transform:translateX(-50%);
    width:680px;height:680px;border-radius:50%;pointer-events:none;
    background:radial-gradient(circle at center, rgba(247,255,5,.30) 0%, rgba(247,255,5,0) 70%);filter:blur(30px);}
  .mf-declare-inner{max-width:1080px;margin:0 auto;position:relative;text-align:center;}
  .mf-declare-h{color:#fff;font-size:clamp(36px,5.6vw,82px);max-width:19ch;margin:22px auto 0;
    line-height:1.08;letter-spacing:-0.035em;}
  .mf-declare-accent{color:var(--accent);}

  /* Signature */
  .mf-sign{background:var(--paper);padding:clamp(64px,9vw,120px) clamp(20px,5vw,64px);}
  .mf-sign-inner{max-width:1080px;margin:0 auto;display:flex;flex-direction:column;gap:18px;}
  .mf-sign-lockup{display:flex;align-items:center;gap:0.2em;font-size:clamp(28px,4vw,50px);}
  .mf-sign-meta{font-family:var(--font-mono);font-size:12px;letter-spacing:.2em;
    text-transform:uppercase;color:var(--ink-3);}

  @media (max-width:760px){
    .mf-stanza{font-size:clamp(22px,5.6vw,30px);max-width:none;}
    .mf-stanza--lead{font-size:clamp(27px,7vw,38px);}
    .mf-letterhead .mf-rule:first-of-type{display:none;}
  }
`;

Object.assign(window, { ManifestoBody });
