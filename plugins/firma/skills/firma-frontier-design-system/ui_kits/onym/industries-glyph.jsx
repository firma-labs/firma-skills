// Onym Capital — Industries: dot-matrix glyph helper + two layouts (grid / index),
// switchable via Tweak. Icon-free; the dot-matrix is the repeated signature device.
const { useState: useStateOI, useEffect: useEffectOI, useRef: useRefOI } = React;

const ON_INDUSTRIES = [
  ["01", "Energy", "Generation, storage and grid — the foundation the rest of the economy is built on."],
  ["02", "Compute & data centers", "The physical backbone of intelligence: power, silicon, and the racks that hold it."],
  ["03", "Sovereign infrastructure", "The systems a nation depends on, owned and operated for the long term."],
  ["04", "Banking & fintech", "The rails of capital — and the institutions that move it."],
  ["05", "Manufacturing", "The industrial base: making real things, reliably, at scale."],
  ["06", "Real estate & development", "The built environment and the land beneath it."],
  ["07", "Tokenized RWAs", "Real-world assets brought on-chain — ownership made liquid and legible."],
];

// ── deterministic per-sector dot-matrix glyph ──────────────────────────────
// A compact COLS×ROWS field; each column height is seeded from the title so
// every sector gets a unique, repeatable signature. `phase` re-seeds on hover.
function glyphCols(seedStr, phase = 0, cols = 11, rows = 7) {
  let s = 0; for (let i = 0; i < seedStr.length; i++) s = (s * 31 + seedStr.charCodeAt(i)) >>> 0;
  const out = [];
  for (let x = 0; x < cols; x++) {
    s = (s * 1103515245 + 12345 + phase * 2654435761) >>> 0;
    const t = ((s >>> 8) & 0xffff) / 0xffff;            // 0..1
    out.push(1 + Math.round(t * (rows - 1)));
  }
  return out;
}

function DotGlyph({ seed, phase, on, ink = "#f3f1ee", accent = "#f7ff05", cols = 11, rows = 7, dot = 4.4, gap = 8 }) {
  const heights = glyphCols(seed, phase, cols, rows);
  const w = cols * gap, h = rows * gap;
  const peak = Math.max(...heights);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} style={{ display: "block", overflow: "visible" }}>
      {heights.map((c, x) =>
        Array.from({ length: c }).map((_, r) => {
          const cx = gap / 2 + x * gap, cy = h - gap / 2 - r * gap;
          const isTop = c >= peak && r === c - 1;
          return (
            <circle key={x + "-" + r} cx={cx} cy={cy} r={dot / 2}
              fill={isTop && on ? accent : ink}
              opacity={isTop ? 1 : Math.max(0.22, 0.8 - r * 0.05)}
              style={{ transition: "opacity .4s ease, fill .3s ease" }} />
          );
        })
      )}
    </svg>
  );
}

Object.assign(window, { ON_INDUSTRIES, glyphCols, DotGlyph });
