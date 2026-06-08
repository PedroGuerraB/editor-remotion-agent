import {
  AbsoluteFill, Audio, Easing, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig,
} from 'remotion';

function fadeIn(frame, duration = 15) {
  return interpolate(frame, [0, duration], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) });
}
function slideUp(frame, duration = 20) {
  return interpolate(frame, [0, duration], [60, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) });
}
function popIn(frame, delay = 0, fps = 30) {
  return spring({ frame: frame - delay, fps, config: { damping: 10, stiffness: 180, mass: 0.8 } });
}
function pulse(frame, period = 60, min = 0.97, max = 1.03) {
  return interpolate((frame % period) / period, [0, 0.5, 1], [min, max, min], { easing: Easing.bezier(0.45, 0, 0.55, 1) });
}

function AttentionSection({ frame, fps }) {
  const bannerScale = popIn(frame, 0, fps);
  const priceScale  = popIn(frame, 45, fps);
  const pricePulse  = pulse(frame, 50, 0.97, 1.03);
  const subOpacity  = fadeIn(frame - 20);
  const subY        = slideUp(frame - 20);
  return (
    <AbsoluteFill style={{ background: 'linear-gradient(180deg, #0a0000 0%, #1a0000 50%, #0a0000 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 36 }}>
      <div style={{ background: '#FF2D2D', width: '100%', padding: '32px 0', textAlign: 'center', fontSize: 68, fontWeight: 900, color: '#fff', letterSpacing: 4, transform: `scale(${bannerScale})`, boxShadow: '0 8px 48px rgba(255,45,45,0.6)' }}>⚠️ ATENÇÃO ⚠️</div>
      <div style={{ opacity: subOpacity, transform: `translateY(${subY}px)`, fontSize: 52, color: '#fff', fontWeight: 700, textAlign: 'center', padding: '0 60px', lineHeight: 1.35 }}>
        Material disponível em<br /><span style={{ color: '#FFE600', fontSize: 60 }}>condição PROMOCIONAL</span>
      </div>
      <div style={{ border: '4px solid #FF2D2D', borderRadius: 32, padding: '44px 90px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, transform: `scale(${priceScale * pricePulse})`, background: 'rgba(0,0,0,0.55)', boxShadow: '0 0 60px rgba(255,45,45,0.25)' }}>
        <div style={{ fontSize: 48, color: '#aaa', textDecoration: 'line-through', fontWeight: 700, opacity: fadeIn(frame - 50) }}>de R$49,90</div>
        <div style={{ fontSize: 128, fontWeight: 900, color: '#FFE600', textShadow: '0 0 40px rgba(255,230,0,0.7), 4px 4px 0 #000', lineHeight: 1, letterSpacing: -2 }}>R$9,90</div>
        <div style={{ fontSize: 42, color: '#FF2D2D', fontWeight: 900, letterSpacing: 3 }}>APENAS HOJE</div>
      </div>
    </AbsoluteFill>
  );
}

function UrgencySection({ frame, fps }) {
  const titleScale = popIn(frame, 0, fps);
  const boxOpacity = fadeIn(frame - 15);
  const boxY       = slideUp(frame - 15);
  const priceScale = popIn(frame, 30, fps);
  const ctaOpacity = fadeIn(frame - 50);
  const ctaY       = slideUp(frame - 50);
  return (
    <AbsoluteFill style={{ background: 'linear-gradient(180deg, #0a0200 0%, #1a0800 50%, #0a0200 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 44, padding: '0 50px' }}>
      <div style={{ fontSize: 54, color: '#fff', fontWeight: 700, textAlign: 'center', lineHeight: 1.4, transform: `scale(${titleScale})` }}>Quando a promoção encerrar...</div>
      <div style={{ opacity: boxOpacity, transform: `translateY(${boxY}px)`, background: 'rgba(255,107,0,0.12)', border: '3px solid #FF6B00', borderRadius: 32, padding: '52px 90px', textAlign: 'center' }}>
        <div style={{ fontSize: 44, color: '#bbb', fontWeight: 600, marginBottom: 12 }}>o valor volta para</div>
        <div style={{ fontSize: 118, fontWeight: 900, color: '#FF6B00', textShadow: '0 0 40px rgba(255,107,0,0.55)', lineHeight: 1, transform: `scale(${priceScale})`, display: 'inline-block' }}>R$49,90</div>
      </div>
      <div style={{ opacity: ctaOpacity, transform: `translateY(${ctaY}px)`, fontSize: 48, color: '#FFE600', fontWeight: 700, textAlign: 'center', textShadow: '0 0 24px rgba(255,230,0,0.4)' }}>🔥 Garanta agora pelo menor preço!</div>
    </AbsoluteFill>
  );
}

function CTASection({ frame, fps }) {
  const buttonScale = popIn(frame, 0, fps);
  const buttonPulse = pulse(frame, 45, 0.97, 1.03);
  return (
    <AbsoluteFill style={{ background: 'linear-gradient(180deg, #001400 0%, #002800 50%, #001400 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 50px' }}>
      <div style={{ background: 'linear-gradient(135deg, #00C853, #00E676)', borderRadius: 64, padding: '38px 76px', fontSize: 58, fontWeight: 900, color: '#fff', boxShadow: '0 8px 48px rgba(0,200,83,0.55), 0 0 0 6px rgba(0,200,83,0.25)', transform: `scale(${buttonScale * buttonPulse})`, textAlign: 'center', letterSpacing: -1 }}>👇 CLIQUE EM SAIBA MAIS</div>
    </AbsoluteFill>
  );
}

export const CTAAnimationV2 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ fontFamily: "'Arial Black', Arial, sans-serif" }}>
      {/* Section 1: attention+urgency narration ends at frame 274 */}
      <Sequence durationInFrames={274}>
        <Audio src={staticFile('video.mp4')} startFrom={Math.round(55 * fps)} />
      </Sequence>
      {/* Section 2: "clique em saiba mais" phrase only — frames 274-311 silent gap */}
      <Sequence from={312} durationInFrames={16}>
        <Audio src={staticFile('video.mp4')} startFrom={Math.round(65.30 * fps)} />
      </Sequence>
      {frame < 163 && <div style={{ position: 'absolute', inset: 0, opacity: fadeIn(frame) }}><AttentionSection frame={frame} fps={fps} /></div>}
      {frame >= 163 && frame < 274 && <div style={{ position: 'absolute', inset: 0, opacity: fadeIn(frame - 163) }}><UrgencySection frame={frame - 163} fps={fps} /></div>}
      {frame >= 274 && <div style={{ position: 'absolute', inset: 0, opacity: fadeIn(frame - 274) }}><CTASection frame={frame - 274} fps={fps} /></div>}
    </AbsoluteFill>
  );
};
