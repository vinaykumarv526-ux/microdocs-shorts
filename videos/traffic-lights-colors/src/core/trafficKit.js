// Traffic Lights Explainer Kit: Clean 2D flat architectural vector components for optical physics & signaling history.
import { ctx, C, W, H, TAU, lerp, clamp, rnd, rr, circle, ell, line, fillAll } from './lib.js';
import * as K from './kit.js';

/** Detailed 2D technical traffic signal head */
export function trafficSignalHousing(x, y, s = 1, active = 'red', t = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  // Main mounting pole / arm behind
  ctx.fillStyle = '#2A3441';
  ctx.fillRect(-22, -450, 44, 900);
  ctx.lineWidth = 6;
  ctx.strokeStyle = C.ink;
  ctx.strokeRect(-22, -450, 44, 900);

  // Outer high-visibility yellow backplate (standard highway safety feature)
  rr(-170, -380, 340, 760, 40);
  ctx.fillStyle = '#F59E0B';
  ctx.fill();
  ctx.lineWidth = 10;
  ctx.strokeStyle = C.ink;
  ctx.stroke();

  // Dark signal housing body
  rr(-140, -350, 280, 700, 28);
  ctx.fillStyle = '#111827';
  ctx.fill();
  ctx.lineWidth = 8;
  ctx.strokeStyle = '#374151';
  ctx.stroke();

  const lights = [
    { name: 'red', y: -220, col: '#EF4444', glow: '#F87171', offCol: '#450A0A' },
    { name: 'yellow', y: 0, col: '#FBBF24', glow: '#FDE68A', offCol: '#451A03' },
    { name: 'green', y: 220, col: '#10B981', glow: '#6EE7B7', offCol: '#064E3B' },
  ];

  for (const l of lights) {
    const isActive = (active === l.name || active === 'all');

    // Sun visor hood over lens
    ctx.beginPath();
    ctx.moveTo(-110, l.y - 40);
    ctx.bezierCurveTo(-110, l.y - 120, 110, l.y - 120, 110, l.y - 40);
    ctx.lineWidth = 12;
    ctx.strokeStyle = '#1F2937';
    ctx.stroke();

    // Dark bezel ring
    circle(0, l.y, 88, '#1F2937');
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#0F172A';
    ctx.stroke();

    // The lens surface
    if (isActive) {
      // Glow halo
      const pulse = Math.sin(t * 8) * 0.15 + 0.85;
      const grad = ctx.createRadialGradient(0, l.y, 40, 0, l.y, 140);
      grad.addColorStop(0, l.glow);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, l.y, 140, 0, TAU);
      ctx.fill();

      // Bright active lens
      circle(0, l.y, 76, l.col);
      // Concentric Fresnel lens grooves
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 3;
      for (const r of [25, 45, 62]) {
        ctx.beginPath();
        ctx.arc(0, l.y, r, 0, TAU);
        ctx.stroke();
      }
      // Top glass highlight
      ell(-24, l.y - 28, 28, 14, '#FFFFFF', -0.3);
    } else {
      // Inactive dark tinted glass
      circle(0, l.y, 76, l.offCol);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 2;
      for (const r of [30, 55]) {
        ctx.beginPath();
        ctx.arc(0, l.y, r, 0, TAU);
        ctx.stroke();
      }
    }
  }

  ctx.restore();
}

/** Optical electromagnetic wave spectrum comparison */
export function wavelengthSpectrum(x, y, s = 1, t = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  // Blueprint grid container
  rr(-460, -320, 920, 640, 24);
  ctx.fillStyle = '#0F172A';
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#38BDF8';
  ctx.stroke();

  // Header tag
  ctx.font = '900 36px Inter';
  ctx.fillStyle = '#38BDF8';
  ctx.textAlign = 'center';
  ctx.fillText('ELECTROMAGNETIC VISIBLE SPECTRUM', 0, -250);

  // Wave 1: Blue / Violet (Short wavelength ~450nm)
  ctx.font = '700 24px Inter';
  ctx.fillStyle = '#60A5FA';
  ctx.textAlign = 'left';
  ctx.fillText('VIOLET / BLUE (400 - 480nm) — FAST SCATTERING', -420, -150);

  ctx.beginPath();
  ctx.strokeStyle = '#60A5FA';
  ctx.lineWidth = 5;
  for (let px = -420; px <= 420; px += 4) {
    const py = -100 + Math.sin((px * 0.08) - (t * 8)) * 32;
    if (px === -420) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();

  // Wave 2: Green / Yellow (Medium ~550nm)
  ctx.fillStyle = '#34D399';
  ctx.fillText('GREEN / YELLOW (520 - 580nm) — HIGH RETINA SENSITIVITY', -420, -10);

  ctx.beginPath();
  ctx.strokeStyle = '#34D399';
  ctx.lineWidth = 5;
  for (let px = -420; px <= 420; px += 4) {
    const py = 40 + Math.sin((px * 0.045) - (t * 6)) * 32;
    if (px === -420) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();

  // Wave 3: Red (Longest wavelength ~700nm)
  ctx.fillStyle = '#EF4444';
  ctx.fillText('RED (650 - 700nm) — MAXIMUM PENETRATION', -420, 130);

  ctx.beginPath();
  ctx.strokeStyle = '#EF4444';
  ctx.lineWidth = 7;
  for (let px = -420; px <= 420; px += 4) {
    const py = 190 + Math.sin((px * 0.024) - (t * 4)) * 36;
    if (px === -420) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();

  // Red callout tag
  K.pill('LONGEST WAVELENGTH: 700nm', 180, 260, 36, '#EF4444', '#FFFFFF');

  ctx.restore();
}

/** Atmospheric fog & rain scattering physics simulation */
export function fogScatteringSim(x, y, s = 1, t = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  // Night fog background
  rr(-480, -360, 960, 720, 24);
  ctx.fillStyle = '#0B132B';
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#38BDF8';
  ctx.stroke();

  // Fog particles (droplets in atmosphere)
  for (let i = 0; i < 35; i++) {
    const fx = -440 + ((i * 59 + t * 40) % 880);
    const fy = -300 + ((i * 97) % 600);
    circle(fx, fy, 16 + (i % 6) * 5, 'rgba(148, 163, 184, 0.25)');
  }

  // Emitter source on left (signal lamp)
  rr(-460, -120, 100, 240, 16);
  ctx.fillStyle = '#1E293B';
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = C.ink;
  ctx.stroke();

  // Blue light scattering (top half) - scatters away and diffuses
  ctx.font = '700 24px Inter';
  ctx.fillStyle = '#60A5FA';
  ctx.fillText('BLUE LIGHT: SCATTERS RAPIDLY IN FOG', -320, -180);

  for (let b = 0; b < 6; b++) {
    const len = 120 + b * 40;
    const an = -0.4 + b * 0.16;
    ctx.beginPath();
    ctx.moveTo(-360, -60);
    ctx.lineTo(-360 + Math.cos(an) * len, -60 + Math.sin(an) * len);
    ctx.strokeStyle = 'rgba(96, 165, 250, 0.4)';
    ctx.lineWidth = 4;
    ctx.stroke();
  }

  // Red light penetrating (bottom half) - slices cleanly 800px forward
  ctx.fillStyle = '#EF4444';
  ctx.fillText('RED LIGHT (700nm): RAYLEIGH SCATTERING RESISTANT', -320, 60);

  // Red beam with outer glow
  ctx.beginPath();
  ctx.moveTo(-360, 100);
  ctx.lineTo(440, 100);
  ctx.strokeStyle = 'rgba(239, 68, 68, 0.3)';
  ctx.lineWidth = 32;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-360, 100);
  ctx.lineTo(440, 100);
  ctx.strokeStyle = '#EF4444';
  ctx.lineWidth = 8;
  ctx.stroke();

  // Target receiver on right (driver eye / vehicle)
  rr(360, 40, 80, 120, 14);
  ctx.fillStyle = '#10B981';
  ctx.fill();
  ctx.font = '900 22px Inter';
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.fillText('DRIVER', 400, 95);
  ctx.fillText('EYE', 400, 125);

  K.pill('PENETRATES 3X FARTHER IN DENSE FOG', 0, 290, 40, '#EF4444', '#FFFFFF');

  ctx.restore();
}

/** 19th Century Railway white light failure breakdown */
export function railwayWhiteCrash(x, y, s = 1, t = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  // Victorian dark railway landscape
  rr(-460, -350, 920, 700, 24);
  ctx.fillStyle = '#1A1829';
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#EF4444';
  ctx.stroke();

  // Distant stars / lanterns in night sky
  for (let i = 0; i < 8; i++) {
    const sx = -350 + i * 90;
    const sy = -240 + Math.sin(i * 3) * 40;
    circle(sx, sy, 5, '#FFFFFF');
    // Subtle twinkle
    circle(sx, sy, 12, 'rgba(255, 255, 255, 0.2)');
  }

  // Distant Victorian streetlamp / house window
  rr(120, -260, 36, 60, 6);
  ctx.fillStyle = '#FEF08A';
  ctx.fill();
  K.tag('DISTANT STREETLAMP', 140, -300, 140, -220, 30);

  // Train railway track
  line([[-420, 180], [420, 180]], '#475569', 14);
  for (let tx = -380; tx <= 380; tx += 60) {
    line([[tx, 160], [tx, 200]], '#64748B', 8);
  }

  // Railway semaphore mast with white light
  line([[-240, 180], [-240, -120]], '#0F172A', 16);
  circle(-240, -120, 32, '#FFFFFF');
  circle(-240, -120, 60, 'rgba(255, 255, 255, 0.4)');
  K.tag("ORIGINAL 'GO' SIGNAL", -240, -180, -240, -120, 32);

  // Danger crash alert
  K.warning(0, 0, 1.2);
  K.redX(0, 0, 1.2, 0.9);
  K.pill('FATAL ERROR: MISTAKEN FOR STARS & STREETLAMPS', 0, 280, 40, '#EF4444', '#FFFFFF');

  ctx.restore();
}

/** Modern 3-Color Protocol Architecture */
export function trafficColorProtocol(x, y, s = 1, t = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  // 3 distinct protocol cards
  const cards = [
    { label: 'RED = STOP', sub: 'Longest wavelength (700nm)\nUnconscious reflex stop', col: '#EF4444', x: -300 },
    { label: 'YELLOW = CAUTION', sub: 'High visibility (590nm)\nClear intersection buffer', col: '#F59E0B', x: 0 },
    { label: 'GREEN = GO', sub: 'Distinct from stars (520nm)\nClear visual contrast', col: '#10B981', x: 300 },
  ];

  for (const c of cards) {
    rr(c.x - 135, -240, 270, 480, 24);
    ctx.fillStyle = '#0F172A';
    ctx.fill();
    ctx.lineWidth = 6;
    ctx.strokeStyle = c.col;
    ctx.stroke();

    // Color beacon indicator
    circle(c.x, -120, 56, c.col);
    circle(c.x, -120, 72, 'rgba(255, 255, 255, 0.2)');

    // Label
    ctx.font = '900 28px Inter';
    ctx.fillStyle = c.col;
    ctx.textAlign = 'center';
    ctx.fillText(c.label, c.x, -10);

    // Subtext
    ctx.font = '600 20px Inter';
    ctx.fillStyle = '#CBD5E1';
    const lines = c.sub.split('\n');
    ctx.fillText(lines[0], c.x, 60);
    ctx.fillText(lines[1], c.x, 95);
  }

  K.pill('THE 19TH CENTURY RAILROAD PROTOCOL', 0, 290, 42, C.ink, '#FFD43B');

  ctx.restore();
}
