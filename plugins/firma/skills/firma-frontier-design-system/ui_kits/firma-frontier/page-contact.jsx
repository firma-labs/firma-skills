// Firma Frontier — Contact page body (routed inquiry: deal · partner · lp/data room)
const { useState: useStateCP, useEffect: useEffectCP } = React;

// ── Per-tab configuration ──────────────────────────────────────────────────
const FF_TABS = [
  {
    id: "deal", label: "[bring a deal]",
    blurb: "Founders raising, and investors with a company on the frontier.",
    select: { label: "Type of opportunity",
      options: ["Company raise (priced round)", "Secondary", "Co-investment", "Other"] },
    area: { label: "Deal summary or relevant context",
      placeholder: "Brief description of the opportunity, timeline, and any materials you'd like to share." },
    cta: "Send inquiry",
  },
  {
    id: "partner", label: "[partner]",
    blurb: "Operators, advisors, and institutions who want to build alongside us.",
    select: { label: "How you'd partner",
      options: ["Strategic / corporate", "Service provider", "Ecosystem / community", "Other"] },
    area: { label: "How we might work together",
      placeholder: "Tell us about your organization and what a partnership could look like." },
    cta: "Start the conversation",
  },
  {
    id: "lp", label: "[lp / data room]",
    blurb: "Qualified investors requesting access to the fund data room.",
    select: { label: "Capital type",
      options: ["Family office", "Institutional", "Fund-of-funds", "Individual (accredited)", "Other"] },
    area: { label: "What you'd like access to",
      placeholder: "Let us know your mandate and what you're looking to review. Access is granted to qualified investors." },
    cta: "Request access",
  },
];

function FFField({ label, type = "text", value, onChange }) {
  const [f, setF] = useStateCP(false);
  return (
    <label style={{ display: "block" }}>
      <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em",
        textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 10 }}>{label}</span>
      <input type={type} value={value} onChange={onChange}
        onFocus={() => setF(true)} onBlur={() => setF(false)}
        style={{ width: "100%", boxSizing: "border-box", fontFamily: "var(--font-body)", fontSize: 17,
          color: "var(--ink)", background: "var(--surface-card)", padding: "15px 16px",
          border: `1px solid ${f ? "var(--ink)" : "var(--surface-line)"}`, borderRadius: "var(--r-md)",
          outline: "none", transition: "border-color var(--dur-fast) var(--ease)" }} />
    </label>
  );
}

function FFTab({ active, label, onClick }) {
  const [h, setH] = useStateCP(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ fontFamily: "var(--font-mono)", fontSize: 14, letterSpacing: "0.02em",
        padding: "11px 20px", borderRadius: "var(--r-pill)", cursor: "pointer",
        border: `1px solid ${active ? "var(--ink)" : "var(--surface-line)"}`,
        background: active ? "var(--ink)" : (h ? "var(--surface-card)" : "transparent"),
        color: active ? "#fff" : "var(--ink-2)",
        transition: "all var(--dur-fast) var(--ease)" }}>
      {label}
    </button>
  );
}

function ContactBody() {
  const [load, setLoad] = useStateCP(false);
  const [tab, setTab] = useStateCP("deal");
  const [v, setV] = useStateCP({ name: "", org: "", email: "", role: "", type: "", msg: "" });
  const [sent, setSent] = useStateCP(false);
  useEffectCP(() => { const t = setTimeout(() => setLoad(true), 80); return () => clearTimeout(t); }, []);
  const step = (i) => ({ opacity: load ? 1 : 0, transform: load ? "none" : "translateY(24px)",
    transition: `opacity 800ms var(--ease) ${i * 120}ms, transform 800ms var(--ease) ${i * 120}ms` });
  const set = (k) => (e) => setV({ ...v, [k]: e.target.value });
  const cfg = FF_TABS.find(t => t.id === tab);

  const selectStyle = { width: "100%", boxSizing: "border-box", fontFamily: "var(--font-body)", fontSize: 17,
    color: v.type ? "var(--ink)" : "var(--ink-3)", background: "var(--surface-card)", padding: "15px 16px",
    border: "1px solid var(--surface-line)", borderRadius: "var(--r-md)", outline: "none",
    appearance: "none", WebkitAppearance: "none",
    backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14'><path d='M3 5l4 4 4-4' fill='none' stroke='%2338353b' stroke-width='1.4'/></svg>\")",
    backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" };

  return (
    <main style={{ background: "var(--canvas)" }}>
      <section style={{ position: "relative", overflow: "hidden",
        padding: "clamp(140px,16vw,210px) clamp(20px,5vw,64px) clamp(80px,10vw,140px)" }}>
        <GradientGlow w={720} h={420} blur={120} opacity={0.42}
          style={{ right: "-140px", top: "-20px", animationDuration: "22s",
            background: "linear-gradient(115deg, #ffd49a 0%, #f3ff44 42%, #f7ff05 100%)" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative",
          display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,560px)",
          gap: "clamp(40px,6vw,96px)", alignItems: "start" }} className="ff-contact-grid">
          {/* left — invitation */}
          <div>
            <Kicker style={step(0)}>Contact</Kicker>
            <h1 className="ff-display" style={{ ...step(1), fontSize: "clamp(44px,7vw,96px)", margin: "20px 0 26px", maxWidth: 560 }}>
              Building a new earth?
            </h1>
            <p className="ff-lead" style={{ ...step(2), maxWidth: 460, color: "var(--ink-2)", marginBottom: 40 }}>
              Whether you&rsquo;re raising, partnering, or allocating — start here. Choose what
              brings you, and we&rsquo;ll route it to the right desk.
            </p>
            <div style={{ ...step(3) }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em",
                textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 8 }}>Direct</div>
              <a className="ff-link" href="mailto:hello@firmafrontier.com"
                style={{ fontSize: 22, fontWeight: 500 }}>hello@firmafrontier.com</a>
            </div>
          </div>

          {/* right — routed form */}
          <div style={{ ...step(2) }}>
            {/* tabs */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 22 }}>
              {FF_TABS.map(t => (
                <FFTab key={t.id} active={tab === t.id} label={t.label} onClick={() => { setTab(t.id); setSent(false); }} />
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
                  <FFField label="Your name" value={v.name} onChange={set("name")} />
                  <FFField label="Organization / fund" value={v.org} onChange={set("org")} />
                  <FFField label="Work email" type="email" value={v.email} onChange={set("email")} />
                  <FFField label="Title / role" value={v.role} onChange={set("role")} />
                  <label style={{ display: "block" }}>
                    <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em",
                      textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 10 }}>{cfg.select.label}</span>
                    <select value={v.type} onChange={set("type")} style={selectStyle}>
                      <option value="" disabled>Select one</option>
                      {cfg.select.options.map(o => <option key={o} value={o} style={{ color: "var(--ink)" }}>{o}</option>)}
                    </select>
                  </label>
                  <label style={{ display: "block" }}>
                    <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em",
                      textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 10 }}>{cfg.area.label}</span>
                    <textarea rows={4} value={v.msg} onChange={set("msg")} placeholder={cfg.area.placeholder}
                      style={{ width: "100%", boxSizing: "border-box", fontFamily: "var(--font-body)", fontSize: 17,
                        color: "var(--ink)", background: "var(--surface-card)", padding: "15px 16px",
                        border: "1px solid var(--surface-line)", borderRadius: "var(--r-md)", outline: "none", resize: "vertical" }} />
                  </label>
                  <Button onClick={() => setSent(true)} style={{ marginTop: 4, justifyContent: "center" }}>{cfg.cta}</Button>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)", textAlign: "center", margin: 0 }}>
                    {tab === "lp" ? "Access is granted to qualified investors only." : "We'll only use this to reply."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { ContactBody });
