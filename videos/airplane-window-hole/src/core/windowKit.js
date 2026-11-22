// Window Explainer Kit: Clean 2D flat architectural vector components for airplane window physics.
import { ctx, C, W, H, TAU, lerp, clamp, rnd, rr, circle, ell, line, fillAll } from './lib.js';
import * as K from './kit.js';

/** Aircraft cabin window oval view with clouds */
export function airplaneWindowView(x, y, s = 1, t = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  // Cabin interior wall (warm clean cream)
  rr(-480, -750, 960, 1500, 36);
  ctx.fillStyle = '#E8ECEF'; ctx.fill();
  ctx.lineWidth = 10; ctx.strokeStyle = C.ink; ctx.stroke();

  // Window frame bevel
  rr(-320, -520, 640, 1040, 260);
  ctx.fillStyle = '#CFD8DC'; ctx.fill();
  ctx.lineWidth = 8; ctx.strokeStyle = C.ink; ctx.stroke();

  // Glass aperture cutout
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(-240, -420, 480, 840, 200);
  ctx.clip();

  // Sky outside
  ctx.fillStyle = '#38BDF8';
  ctx.fillRect(-300, -500, 600, 1000);

  // Moving clouds outside
  for (let i = 0; i < 4; i++) {
    const cx = ((i * 320 - t * 400) % 900) - 150;
    const cy = -300 + i * 220;
    ell(cx, cy, 140, 60, '#FFFFFF');
    ell(cx + 60, cy - 20, 100, 50, '#FFFFFF');
  }

  // Wing tip visible in distance
  ctx.fillStyle = '#E2E8F0';
  ctx.beginPath();
  ctx.moveTo(120, 180);
  ctx.lineTo(240, -100);
  ctx.lineTo(240, 160);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#94A3B8'; ctx.lineWidth = 4; ctx.stroke();
  ctx.restore();

  // Inner glass rim
  ctx.roundRect(-240, -420, 480, 840, 200);
  ctx.lineWidth = 8; ctx.strokeStyle = C.ink; ctx.stroke();

  // The tiny bleed hole at bottom center
  circle(0, 310, 14, C.ink);
  circle(0, 310, 8, '#FFFFFF');

  // Pulsing callout ring
  const pulse = (Math.sin(t * 8) + 1) * 0.5;
  ctx.beginPath();
  ctx.arc(0, 310, 24 + pulse * 14, 0, TAU);
  ctx.strokeStyle = '#EF4444'; ctx.lineWidth = 4; ctx.stroke();

  K.tag('2mm BLEED HOLE', 0, 180, 0, 280, 38);

  ctx.restore();
}

/** 3-pane cross-section architectural stack */
export function windowCrossSection(x, y, s = 1, { showTags = true, showBleed = true, airFlow = 0 } = {}) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  // Background blueprint / architectural frame
  rr(-440, -600, 880, 1200, 28);
  ctx.fillStyle = '#0F172A'; ctx.fill();
  ctx.lineWidth = 8; ctx.strokeStyle = '#38BDF8'; ctx.stroke();

  // Cabin interior on right, high altitude sky on left
  ctx.font = '900 32px Inter';
  ctx.fillStyle = '#38BDF8'; ctx.textAlign = 'center';
  ctx.fillText('OUTSIDE (-60°F / 3 PSI)', -240, -520);
  ctx.fillStyle = '#F59E0B';
  ctx.fillText('CABIN (72°F / 11 PSI)', 240, -520);

  // Outer structural pane (thick acrylic)
  rr(-300, -440, 50, 880, 12);
  ctx.fillStyle = '#38BDF8'; ctx.fill();
  ctx.lineWidth = 5; ctx.strokeStyle = '#FFFFFF'; ctx.stroke();

  // Middle pane with bleed valve hole
  rr(-40, -440, 40, 880, 10);
  ctx.fillStyle = '#38BDF8'; ctx.fill();
  ctx.lineWidth = 5; ctx.strokeStyle = '#FFFFFF'; ctx.stroke();

  // Cutout in middle pane for bleed hole
  if (showBleed) {
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(-45, 120, 50, 30);
    // Bleed hole aperture highlight
    rr(-45, 120, 50, 30, 4);
    ctx.strokeStyle = '#EF4444'; ctx.lineWidth = 4; ctx.stroke();

    // Flowing air dots through bleed hole
    for (let p = 0; p < 3; p++) {
      const dotX = lerp(80, -180, (airFlow + p * 0.33) % 1);
      circle(dotX, 135, 7, '#FCD34D');
    }
  }

  // Inner scratch pane (thin cosmetic acrylic)
  rr(220, -440, 24, 880, 8);
  ctx.fillStyle = '#94A3B8'; ctx.fill();
  ctx.lineWidth = 4; ctx.strokeStyle = '#FFFFFF'; ctx.stroke();

  if (showTags) {
    K.tag('1. OUTER PANE (HOLDS PRESSURE)', -160, -320, -250, -260, 26);
    K.tag('2. MIDDLE PANE (BLEED VALVE)', 120, 40, -10, 120, 26);
    K.tag('3. SCRATCH PANE (PROTECTIVE)', 180, 380, 230, 280, 26);
  }

  ctx.restore();
}

/** Failure Point: Window fracture without bleed hole */
export function windowFailure(x, y, s = 1, t = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  windowCrossSection(0, 0, 1, { showTags: false, showBleed: false });

  // Violent pressure cracks on the acrylic
  ctx.save();
  ctx.strokeStyle = '#EF4444';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(-20, -200);
  ctx.lineTo(40, -80);
  ctx.lineTo(-30, 60);
  ctx.lineTo(80, 220);
  ctx.stroke();

  ctx.moveTo(10, -80);
  ctx.lineTo(120, -120);
  ctx.stroke();
  ctx.restore();

  // Red Warning Badge
  K.warning(0, -180, 1.2);
  K.redX(0, -180, 1.2);
  K.pill('CRITICAL FAILURE', 0, 20, 54, '#EF4444', '#FFFFFF', 1);
  K.pill('PRESSURE DIFFERENTIAL EXPLOSION', 0, 110, 32, C.ink, '#FCD34D', 1);

  ctx.restore();
}

/** Bleed Hole Airflow Dynamics */
export function bleedHoleDynamics(x, y, s = 1, t = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  // Zoomed in view of middle pane aperture
  rr(-360, -400, 720, 800, 24);
  ctx.fillStyle = '#0F172A'; ctx.fill();
  ctx.lineWidth = 8; ctx.strokeStyle = '#38BDF8'; ctx.stroke();

  // Acrylic walls above and below
  rr(-120, -400, 240, 320, 12); ctx.fillStyle = '#1E293B'; ctx.fill();
  rr(-120, 80, 240, 320, 12); ctx.fillStyle = '#1E293B'; ctx.fill();

  // 2mm aperture gap
  rr(-120, -80, 240, 160, 8);
  ctx.strokeStyle = '#F59E0B'; ctx.lineWidth = 6; ctx.stroke();

  // Airflow stream arrows
  for (let yOff of [-30, 0, 30]) {
    const flowT = (t * 2 + yOff * 0.05) % 1;
    const ax = lerp(260, -260, flowT);
    circle(ax, yOff, 12, '#38BDF8');
    line([[ax + 20, yOff], [ax + 70, yOff]], '#38BDF8', 6);
  }

  K.pill('2mm BLEED APERTURE', 0, -280, 48, C.ink, '#FFFFFF', 1);
  K.pill('EQUALIZES PRESSURE', 0, 260, 44, '#10B981', '#FFFFFF', 1);

  ctx.restore();
}

/** Self-balancing force distribution */
export function pressureBalanceLoop(x, y, s = 1, t = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  rr(-400, -500, 800, 1000, 28);
  ctx.fillStyle = '#0B132B'; ctx.fill();
  ctx.lineWidth = 8; ctx.strokeStyle = '#10B981'; ctx.stroke();

  // Giant force arrows pushing from cabin to outer pane
  const arrowPulse = (Math.sin(t * 6) + 1) * 0.5;
  for (let ay of [-240, -80, 80, 240]) {
    line([[180, ay], [-140, ay]], '#F59E0B', 18);
    // Arrow head pointing left
    ctx.beginPath();
    ctx.moveTo(-180, ay);
    ctx.lineTo(-130, ay - 30);
    ctx.lineTo(-130, ay + 30);
    ctx.closePath();
    ctx.fillStyle = '#F59E0B'; ctx.fill();
  }

  // Outer hull barrier holding firm
  rr(-240, -420, 60, 840, 12);
  ctx.fillStyle = '#10B981'; ctx.fill();
  ctx.lineWidth = 6; ctx.strokeStyle = '#FFFFFF'; ctx.stroke();

  K.pill('OUTER PANE: 100% LOAD', 0, -360, 50, '#10B981', '#FFFFFF', 1);
  K.pill('INNER PANE: 0% STRESS', 0, 360, 46, C.ink, '#38BDF8', 1);

  ctx.restore();
}

/** Engine X-Ray: Internal dessicant moisture wicking channel */
export function dessicantXray(x, y, s = 1, t = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  rr(-400, -450, 800, 900, 24);
  ctx.fillStyle = '#080E18'; ctx.fill();
  ctx.lineWidth = 8; ctx.strokeStyle = '#38BDF8'; ctx.stroke();

  // Grid scanlines
  ctx.save();
  ctx.globalAlpha = 0.12;
  for (let gy = -420; gy <= 420; gy += 40) {
    line([[-380, gy], [380, gy]], '#38BDF8', 2);
  }
  ctx.restore();

  // Dessicant channel at bottom of window frame
  rr(-320, 60, 640, 220, 20);
  ctx.fillStyle = '#1E293B'; ctx.fill();
  ctx.lineWidth = 6; ctx.strokeStyle = '#F59E0B'; ctx.stroke();

  // Moisture absorbing silica beads
  for (let bx = -280; bx <= 280; bx += 50) {
    for (let by = 100; by <= 240; by += 45) {
      circle(bx, by, 14, '#94A3B8');
      circle(bx - 3, by - 3, 5, '#FFFFFF');
    }
  }

  K.tag('SILICA DESSICANT MATRIX', 0, -180, 0, 60, 40);
  K.pill('PREVENTS FROST & CONDENSATION', 0, 340, 40, '#0284C7', '#FFFFFF', 1);

  ctx.restore();
}

/** Macro close-up leverage metric (2mm hole vs 4 atmospheres) */
export function windowMetric(x, y, s = 1, t = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  rr(-400, -500, 800, 1000, 28);
  ctx.fillStyle = C.bg; ctx.fill();
  ctx.lineWidth = 10; ctx.strokeStyle = C.ink; ctx.stroke();

  // Circular zoom scope
  circle(0, -60, 260, '#0F172A');
  ctx.lineWidth = 12; ctx.strokeStyle = '#EF4444'; ctx.stroke();

  // 2mm pinhole in the center of scope
  circle(0, -60, 28, '#FFFFFF');
  circle(0, -60, 18, '#EF4444');

  // Dimension line
  line([[-60, -60], [-35, -60]], '#FCD34D', 6);
  line([[35, -60], [60, -60]], '#FCD34D', 6);

  K.tag('DIAMETER: 2.0 mm', 0, -380, 0, -90, 42);

  // Big metric cards at bottom
  rr(-320, 240, 640, 180, 24);
  ctx.fillStyle = '#0F172A'; ctx.fill();
  ctx.lineWidth = 6; ctx.strokeStyle = '#10B981'; ctx.stroke();

  ctx.font = '900 64px Inter'; ctx.fillStyle = '#10B981'; ctx.textAlign = 'center';
  ctx.fillText('4.0 ATMOSPHERES', 0, 310);
  ctx.font = '900 36px Inter'; ctx.fillStyle = '#FFFFFF';
  ctx.fillText('SAFETY MARGIN AT CRUISE', 0, 375);

  ctx.restore();
}
