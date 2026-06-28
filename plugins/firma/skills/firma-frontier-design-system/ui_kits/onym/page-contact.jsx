// Onym Capital — Contact page body (monochrome, routed inquiry: deal · partner · lp/data room)
// Matches the rest of the Onym kit (light monochrome) with the three-tab inquiry
// router from onymcapital.com: each tab has its own field set and routing note.
const { useState: useStateOC, useEffect: useEffectOC } = React;

const OC_BASE = [
  { k: "name", label: "Your name", type: "text" },
  { k: "org",  label: "Organization / fund", type: "text" },
  { k: "email",label: "Work email", type: "email" },
  { k: "role", label: "Title / role", type: "text" },
];

const OC_TABS = [
  {
    id: "deal", label: "[bring a deal]",
    blurb: "Founders raising, or investors with a company worth our attention.",
    extra: [
      { k: "oppType", label: "Type of opportunity", kind: "select",
        options: ["Company raise (priced round)", "Secondary", "Co-investment / SPV", "Other"] },
      { k: "summary", label: "Deal summary or relevant context", kind: "area",
        placeholder: "Brief description of the opportunity, timeline, and any materials you'd like to share." },
    ],
    note: "Routes to the investment team.",
  },
  {
    id: "partner", label: "[partner]",
    blurb: "Operators, advisors, and institutions who want to build alongside us.",
    extra: [
      { k: "area", label: "Primary area of collaboration", kind: "select",
        options: ["Strategic / corporate", "Service provider", "Ecosystem / community", "Co-investment", "Other"] },
      { k: "context", label: "Context", kind: "area",
        placeholder: "What are you looking to explore together?" },
    ],
    note: "Routes to the platform team.",
  },
  {
    id: "lp", label: "[lp / data room]",
    blurb: "Qualified investors requesting access to the fund data room.",
    extra: [
      { k: "capital", label: "Type of capital", kind: "select",
        options: ["Family office", "Institutional", "Fund-of-funds", "Endowment / foundation", "Individual (accredited)", "Other"] },
      { k: "aum", label: "Approx. AUM or target commitment (optional)", kind: "text",
        placeholder: "e.g. $250M+ or $25–50M" },
      { k: "thesis", label: "Specific thesis alignment (optional)", kind: "area",
        placeholder: "Which parts of our approach or sectors resonate most?" },
      { k: "timeline", label: "Expected timeline", kind: "select", placeholder: "Select",
        options: ["This quarter", "Next 6 months", "This year", "Exploratory"] },
    ],
    note: "Data room access is granted selectively. Routes directly to the right person on the team.",
  },
];

const ocLabel = {
  display: "block", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em",
  textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 10,
};
const ocBox = {
  width: "100%", boxSizing: "border-box", fontFamily: "var(--font-body)", fontSize: 17,
  color: "var(--ink)", background: "var(--surface-card)", padding: "15px 16px",
  border: "1px solid var(--surface-line)", borderRadius: "var(--r-md)",
  outline: "none", transition: "border-color var(--dur-fast) var(--ease)", resize: "vertical",
};

function OCInput({ f, value, onChange }) {
  const [foc, setFoc] = useStateOC(false);
  const border = foc ? "var(--ink)" : "var(--surface-line)";
  if (f.kind === "area") {
    return (
      <label style={{ display: "block" }}>
        <span style={ocLabel}>{f.label}</span>
        <textarea rows={5} value={value || ""} onChange={onChange} placeholder={f.placeholder || ""}
          onFocus={() => setFoc(true)} onBlur={() => setFoc(false)}
          style={{ ...ocBox, borderColor: border }} />
      </label>
    );
  }
  if (f.kind === "select") {
    return (
      <label style={{ display: "block" }}>
        <span style={ocLabel}>{f.label}</span>
        <select value={value || ""} onChange={onChange} onFocus={() => setFoc(true)} onBlur={() => setFoc(false)}
          style={{ ...ocBox, borderColor: border, color: value ? "var(--ink)" : "var(--ink-3)",
            appearance: "none", WebkitAppearance: "none", cursor: "pointer",
            backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14'><path d='M3 5l4 4 4-4' fill='none' stroke='%2338353b' stroke-width='1.4'/></svg>\")",
            backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}>
          <option value="" disabled>{f.placeholder || "Select one"}</option>
          {f.options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </label>
    );
  }
  return (
    <label style={{ display: "block" }}>
      <span style={ocLabel}>{f.label}</span>
      <input type={f.type || "text"} value={value || ""} onChange={onChange} placeholder={f.placeholder || ""}
        onFocus={() => setFoc(true)} onBlur={() => setFoc(false)} style={{ ...ocBox, borderColor: border }} />
    </label>
  );
}

function OCTabPill({ active, label, onClick }) {
  const [h, setH] = useStateOC(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ fontFamily: "var(--font-mono)", fontSize: 14, letterSpacing: "0.01em",
        padding: "12px 22px", borderRadius: "var(--r-pill)", cursor: "pointer",
        border: `1px solid ${active ? "var(--ink)" : "var(--ink-line)"}`,
        background: active ? "var(--ink)" : (h ? "var(--surface-card)" : "transparent"),
        color: active ? "#fff" : "var(--ink-2)",
        transition: "all var(--dur-fast) var(--ease)" }}>
      {label}
    </button>
  );
}

function ContactBody() {
  const [load, setLoad] = useStateOC(false);
  const [tab, setTab] = useStateOC("deal");
  const [v, setV] = useStateOC({});
  const [sent, setSent] = useStateOC(false);
  useEffectOC(() => { const t = setTimeout(() => setLoad(true), 80); return () => clearTimeout(t); }, []);
  const step = (i) => ({ opacity: load ? 1 : 0, transform: load ? "none" : "translateY(22px)",
    transition: `opacity 780ms var(--ease) ${i * 110}ms, transform 780ms var(--ease) ${i * 110}ms` });
  const set = (k) => (e) => setV({ ...v, [k]: e.target.value });
  const cfg = OC_TABS.find(t => t.id === tab);

  return (
    <main style={{ background: "var(--canvas)" }}>
      <section style={{ position: "relative",
        padding: "clamp(140px,16vw,210px) clamp(20px,5vw,64px) clamp(80px,10vw,140px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto",
          display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,560px)",
          gap: "clamp(40px,6vw,96px)", alignItems: "start" }} className="on-contact-grid">
          {/* left — invitation */}
          <div>
            <Kicker style={step(0)}>Contact</Kicker>
            <h1 className="ff-display" style={{ ...step(1), fontSize: "clamp(42px,6.4vw,84px)", margin: "20px 0 24px", maxWidth: 540 }}>
              Let&rsquo;s talk.
            </h1>
            <p className="ff-lead" style={{ ...step(2), maxWidth: 440, color: "var(--ink-2)", marginBottom: 40 }}>
              Whether you&rsquo;re raising, partnering, or allocating — choose what brings you
              and we&rsquo;ll route it to the right desk.
            </p>
            <div style={{ ...step(3) }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em",
                textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 8 }}>Direct</div>
              <a className="ff-link" href="mailto:hello@onymcapital.com"
                style={{ fontSize: 21, fontWeight: 500 }}>hello@onymcapital.com</a>
            </div>
          </div>

          {/* right — routed form */}
          <div style={{ ...step(2) }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 11, marginBottom: 20 }}>
              {OC_TABS.map(t => (
                <OCTabPill key={t.id} active={tab === t.id} label={t.label}
                  onClick={() => { setTab(t.id); setSent(false); }} />
              ))}
            </div>

            <div style={{ background: "#fff", border: "1px solid var(--surface-line)", borderRadius: "var(--r-lg)",
              boxShadow: "var(--shadow-soft)", padding: "clamp(24px,3vw,36px)" }}>
              {sent ? (
                <div style={{ padding: "48px 8px", textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 28,
                    letterSpacing: "-0.03em", marginBottom: 10 }}>Received.</div>
                  <p className="ff-small" style={{ fontSize: 16 }}>We read every inquiry. We&rsquo;ll be in touch.</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--ink-2)", margin: "0 0 2px" }}>{cfg.blurb}</p>
                  {OC_BASE.map(f => <OCInput key={f.k} f={f} value={v[f.k]} onChange={set(f.k)} />)}
                  {cfg.extra.map(f => <OCInput key={f.k} f={f} value={v[f.k]} onChange={set(f.k)} />)}
                  <button onClick={() => setSent(true)} style={{ marginTop: 4, justifyContent: "center",
                    fontFamily: "var(--font-mono)", fontSize: 14, letterSpacing: "0.04em",
                    background: "var(--ink)", color: "#fff", border: "none", borderRadius: "var(--r-pill)",
                    padding: "15px 24px", cursor: "pointer", transition: "background var(--dur-fast) var(--ease)" }}
                    onMouseEnter={e => e.currentTarget.style.background = "var(--blue-press)"}
                    onMouseLeave={e => e.currentTarget.style.background = "var(--ink)"}>
                    Send inquiry
                  </button>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)", textAlign: "center", margin: 0 }}>
                    {cfg.note}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

Object.assign(window, { ContactBody });
