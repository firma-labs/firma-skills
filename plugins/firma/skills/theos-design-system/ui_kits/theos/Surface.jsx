/* Surface — visionOS canonical glass (luminosity grey + diagonal hairline + tiny drop)
   The design system's components-card / components-notification / components-buttons recipe.
   Three variants:
     glass      — luminosity grey, default
     prominent  — opaque white, ink text, drops the luminosity blend
     tinted     — signal red, drops the luminosity blend
*/

const Surface = ({
  variant = 'glass',
  radius = 24,
  padding = 18,
  style = {},
  className = '',
  children,
  ...rest
}) => {
  const isProm = variant === 'prominent';
  const isTint = variant === 'tinted';
  const isGlass = !isProm && !isTint;

  // Outer container — does the luminosity blend (glass) or carries the tint/white (prom/tint)
  const outerStyle = {
    position: 'relative',
    borderRadius: radius,
    isolation: 'isolate',
    boxShadow: '0 2px 4px rgba(0,0,0,0.10)',
    color: isProm ? '#1A1A1A' : '#F4F5F7',
    ...(isGlass && {
      background: 'rgba(128,128,128,0.30)',
      mixBlendMode: 'luminosity',
    }),
    ...(isProm && {
      background: 'rgba(255,255,255,0.92)',
      boxShadow: '0 2px 4px rgba(0,0,0,0.10), 0 24px 48px -16px rgba(0,0,0,0.30)',
    }),
    ...(isTint && {
      background: 'rgba(231,55,82,0.85)',
      boxShadow: '0 2px 4px rgba(0,0,0,0.10), 0 24px 48px -16px rgba(120,0,18,0.45)',
      color: '#FFFFFF',
    }),
    ...style,
  };

  // Hairline gradient — keyed to variant
  const hairlineGradient = isProm
    ? 'linear-gradient(135deg, rgba(255,255,255,1.0) 0%, rgba(255,255,255,0.30) 40%, rgba(0,0,0,0.04) 60%, rgba(0,0,0,0.06) 100%)'
    : isTint
      ? 'linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.04) 40%, rgba(255,255,255,0.04) 57%, rgba(255,255,255,0.18) 100%)'
      : 'linear-gradient(135deg, rgba(255,255,255,0.40) 0%, rgba(255,255,255,0.01) 40%, rgba(255,255,255,0.01) 57%, rgba(255,255,255,0.10) 100%)';

  return (
    <div className={className} style={outerStyle} {...rest}>
      {/* backdrop blur — only for glass; prom/tint don't blur */}
      {isGlass && (
        <div aria-hidden style={{
          position: 'absolute', inset: 0, borderRadius: 'inherit',
          backdropFilter: 'blur(50px)',
          WebkitBackdropFilter: 'blur(50px)',
          zIndex: -1,
        }} />
      )}

      {/* diagonal hairline border via mask-composite */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none',
        padding: 1.4,
        background: hairlineGradient,
        WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
        mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
      }} />

      {/* Content escapes the luminosity blend so type/icons render correctly */}
      <div style={{
        position: 'relative',
        mixBlendMode: 'normal',
        padding,
        borderRadius: 'inherit',
      }}>
        {children}
      </div>
    </div>
  );
};

Object.assign(window, { Surface });
