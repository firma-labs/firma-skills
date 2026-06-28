/* ============================================================================
   Firma Frontier — Dot-Matrix Data Card
   A live recreation of the brand's signature data card (it is a flat image in
   Figma). Honest by design: categorical / illustrative labels, NO fabricated
   performance figures, plus a small "illustrative" caption.

   Usage:
     buildDotMatrixCard(targetEl, {
       label, period, periods, columns, footL, footR, scale
     });
   `columns` is an array of integers (dot heights). The tallest few dots in the
   peak column render in electric blue as the accent.
   ============================================================================ */
(function (global) {
  const DOT = 6;      // dot diameter (px)
  const GAP = 9;      // grid pitch (px)
  const ROWS = 14;    // max dots tall

  // A calm, illustrative ascending profile (one small swell, one tall peak, trailing).
  const DEFAULT_COLS = [
    1,1,2,2,3,2,1,1, 1,1,1,2,1,1, 1,1,2,3,5,7,9,12,9,7,5,4,3,2, 1,1,2,1,1,
    1,3,2,1,1,1,2,4,3,2,1,1,1,2,1,1,1,1,2,1,1
  ];

  // Named illustrative layouts — different "shapes" of the same honest data card.
  const PROFILES = {
    peak:     DEFAULT_COLS,
    plateau:  [1,1,2,2,3,4,4,5,5,6,6,7,7,8,8,9,9,9,9,9,9,8,9,9,9,9,9,9,9,9],
    ramp:     [1,1,1,2,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,13,13],
    twin:     [1,2,3,5,7,6,4,2,1,1,1,2,2,1,1,1,2,4,7,10,12,10,7,4,2,1,1,1,1,1],
    wave:     [3,4,6,8,9,10,9,8,6,4,3,2,2,3,4,6,8,9,10,9,8,6,4,3,2,2,3,5,7,8],
    volatile: [2,1,5,2,8,3,1,6,2,9,4,1,3,7,2,11,3,1,5,2,8,4,1,6,2,3,9,2,1,4],
  };

  function buildDotMatrixCard(target, opts = {}) {
    const o = Object.assign({
      label: "Momentum",
      value: null,                       // optional headline (kept illustrative if used)
      periods: ["Daily", "Weekly", "Monthly"],
      period: "Monthly",
      columns: DEFAULT_COLS,
      footL: "Early",
      footR: "Frontier",
      caption: "illustrative",
      theme: "light",                    // "light" (white card) | "ink" (charcoal card)
      accent: "blue",                    // "blue" (electric) | "iridescent" | "none"
    }, opts);

    const isInk = o.theme === "ink";
    const cols = o.columns;
    const w = cols.length * GAP;
    const h = ROWS * GAP;
    const peak = Math.max(...cols);

    // Per-theme dot inks: base dot color + the faint baseline (r===0) tone.
    const baseDot = isInk ? "#f3f1ee" : "var(--ink)";
    const floorDot = isInk ? "#6a6770" : "#cec9d0";
    const accentFill = o.accent === "iridescent" ? "url(#dm-irid)"
                     : o.accent === "none"        ? baseDot
                     : "var(--blue)";

    // Optional iridescent gradient def for accented peaks.
    const irid = o.accent === "iridescent"
      ? `<defs><linearGradient id="dm-irid" x1="0" y1="1" x2="1" y2="0">
           <stop offset="0" stop-color="#ffa6c2"/><stop offset=".42" stop-color="#ffb9a3"/>
           <stop offset=".74" stop-color="#ffce6e"/><stop offset="1" stop-color="#f7ff05"/>
         </linearGradient></defs>` : "";

    // dots SVG
    let dots = "";
    cols.forEach((c, x) => {
      for (let r = 0; r < c; r++) {
        const cy = h - GAP / 2 - r * GAP;
        const cx = GAP / 2 + x * GAP;
        // accent the very top of the tallest columns
        const isPeak = o.accent !== "none" && c >= peak - 1 && r >= c - 2;
        const fill = isPeak ? accentFill : (r === 0 ? floorDot : baseDot);
        const op = r === 0 ? (isInk ? 0.6 : 0.5)
                 : (isPeak ? 1 : Math.max(isInk ? 0.34 : 0.28, 0.85 - r * 0.02));
        // Yellow accent dots get a thin ink ring so they read on a white card.
        const ring = (isPeak && o.accent === "blue")
          ? ` stroke="${isInk ? 'rgba(0,0,0,.35)' : 'rgba(43,41,48,.85)'}" stroke-width="0.9"` : "";
        dots += `<circle cx="${cx}" cy="${cy}" r="${DOT/2}" fill="${fill}" opacity="${op}"${ring}/>`;
      }
    });

    const periodTabs = o.periods.map(p =>
      `<span class="dm-period${p === o.period ? ' is-on' : ''}">${p}</span>`
    ).join("");

    target.innerHTML = `
      <div class="dm-card${isInk ? ' dm-ink' : ''}">
        <div class="dm-head">
          <div class="dm-head-l">
            <span class="dm-label">${o.label}</span>
            ${o.value ? `<span class="dm-value">${o.value}</span>` : ``}
          </div>
          <div class="dm-periods">${periodTabs}</div>
        </div>
        <div class="dm-rule"></div>
        <div class="dm-chart">
          <svg viewBox="0 0 ${w} ${h}" width="100%" preserveAspectRatio="xMidYMax meet"
               style="display:block;overflow:visible">${irid}${dots}</svg>
        </div>
        <div class="dm-foot">
          <span>${o.footL}</span>
          <span class="dm-cap">${o.caption}</span>
          <span>${o.footR}</span>
        </div>
      </div>`;
  }

  // Inject component styles once.
  if (!document.getElementById("dm-styles")) {
    const s = document.createElement("style");
    s.id = "dm-styles";
    s.textContent = `
      .dm-card{background:#fff;border:1px solid var(--paper-line,#f4efec);border-radius:20px;
        box-shadow:var(--shadow-soft,0 8px 28px rgba(173,166,160,.18));padding:26px 30px 22px;
        font-family:var(--font-mono,"IBM Plex Mono",monospace);width:100%;box-sizing:border-box;}
      .dm-head{display:flex;justify-content:space-between;align-items:flex-start;}
      .dm-label{display:block;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:var(--ink-2,#706d73);}
      .dm-value{display:block;font-family:var(--font-display,"Satoshi",sans-serif);font-weight:700;
        font-size:42px;letter-spacing:-.03em;color:var(--ink,#38353b);margin-top:6px;line-height:1;}
      .dm-periods{display:flex;gap:16px;}
      .dm-period{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-3,#a7a3a9);}
      .dm-period.is-on{color:var(--ink,#38353b);}
      .dm-rule{height:1px;background:var(--ink-line,#e7e3e6);margin:18px 0 20px;}
      .dm-chart{width:100%;}
      .dm-foot{display:flex;justify-content:space-between;align-items:center;margin-top:16px;
        font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-2,#706d73);}
      .dm-cap{font-size:10px;letter-spacing:.12em;color:var(--ink-3,#a7a3a9);text-transform:lowercase;font-style:italic;}

      /* Ink (charcoal) variant — pairs with the white orb. */
      .dm-card.dm-ink{background:var(--ink,#38353b);border-color:rgba(255,255,255,.08);
        box-shadow:0 18px 50px rgba(28,26,30,.45);}
      .dm-ink .dm-label{color:#cbc7cd;}
      .dm-ink .dm-value{color:#fff;}
      .dm-ink .dm-period{color:#7c7882;}
      .dm-ink .dm-period.is-on{color:#fff;}
      .dm-ink .dm-rule{background:rgba(255,255,255,.12);}
      .dm-ink .dm-foot{color:#b7b3ba;}
      .dm-ink .dm-cap{color:#827e88;}
    `;
    document.head.appendChild(s);
  }

  global.buildDotMatrixCard = buildDotMatrixCard;
  global.DOTMATRIX_PROFILES = PROFILES;
})(window);
