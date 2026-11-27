// Manhole Explainer Kit: Clean 2D flat architectural vector components for constant-diameter geometry & civil engineering.
import { ctx, C, W, H, TAU, lerp, clamp, rnd, rr, circle, ell, line, fillAll } from './lib.js';
import * as K from './kit.js';

/** Detailed 2D technical manhole cover street view with waffle grip pattern */
export function manholeCoverTop(x, y, s = 1, t = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  // Street asphalt background
  rr(-420, -420, 840, 840, 36);
  ctx.fillStyle = '#1E293B';
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#475569';
  ctx.stroke();

  // Asphalt gravel specks
  for (let i = 0; i < 25; i++) {
    const gx = -380 + (i * 37) % 760;
    const gy = -380 + (i * 59) % 760;
    circle(gx, gy, 4, '#334155');
  }

  // Outer cast iron seat frame ring
  circle(0, 0, 300, '#0F172A');
  ctx.lineWidth = 14;
  ctx.strokeStyle = '#334155';
  ctx.stroke();

  // Circular cover plate
  circle(0, 0, 260, '#1E293B');
  ctx.lineWidth = 8;
  ctx.strokeStyle = '#020617';
  ctx.stroke();

  // Waffle traction grip grid
  ctx.save();
  ctx.beginPath();
  ctx.arc(0, 0, 240, 0, TAU);
  ctx.clip();

  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 5;
  for (let gx = -240; gx <= 240; gx += 40) {
    line([[gx, -240], [gx, 240]], '#475569', 4);
  }
  for (let gy = -240; gy <= 240; gy += 40) {
    line([[-240, gy], [240, gy]], '#475569', 4);
  }

  // Pick hole / pry notch
  circle(0, -180, 18, '#020617');
  circle(0, 180, 18, '#020617');

  // Center city badge
  circle(0, 0, 80, '#0F172A');
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#F59E0B';
  ctx.stroke();

  ctx.font = '900 24px Inter';
  ctx.fillStyle = '#F59E0B';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('SEWER', 0, 0);

  ctx.restore();

  K.pill('PERFECT 360° CIRCLE', 0, 340, 40, C.ink, '#FFD43B');

  ctx.restore();
}

/** Square hole diagonal failure breakdown */
export function squareDiagonalFailure(x, y, s = 1, t = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  // Underground shaft container
  rr(-440, -360, 880, 720, 28);
  ctx.fillStyle = '#0F172A';
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#EF4444';
  ctx.stroke();

  // Square hole opening (Top View)
  rr(-160, -200, 320, 320, 8);
  ctx.fillStyle = '#020617';
  ctx.fill();
  ctx.lineWidth = 8;
  ctx.strokeStyle = '#94A3B8';
  ctx.stroke();

  // Diagonal line showing sqrt(2) * L length
  ctx.setLineDash([8, 6]);
  line([[-160, -200], [160, 120]], '#38BDF8', 5);
  ctx.setLineDash([]);

  K.tag('DIAGONAL: 1.414 × WIDTH', 180, -260, 40, -60, 28);

  // Turned square cover falling right through
  ctx.save();
  ctx.translate(0, -40);
  ctx.rotate(Math.PI / 4 + Math.sin(t * 8) * 0.1);
  rr(-130, -130, 260, 260, 8);
  ctx.fillStyle = '#78350F';
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#F59E0B';
  ctx.stroke();
  ctx.restore();

  // Downward fall motion arrows
  for (let i = 0; i < 3; i++) {
    const ay = 120 + i * 40;
    line([[0, ay], [0, ay + 25]], '#EF4444', 6);
  }

  // Crash alert
  K.warning(0, 180, 1.0);
  K.redX(0, -40, 1.2, 0.9);
  K.pill('SQUARE DROPS THROUGH ITS OWN HOLE!', 0, 280, 38, '#EF4444', '#FFFFFF');

  ctx.restore();
}

/** Constant Diameter Mathematical Proof */
export function constantDiameterProof(x, y, s = 1, t = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  // Blueprint diagram container
  rr(-450, -360, 900, 720, 28);
  ctx.fillStyle = '#0B132B';
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#38BDF8';
  ctx.stroke();

  // Rotating circle
  ctx.save();
  ctx.rotate(t * 0.5);

  circle(0, -20, 220, '#1E293B');
  ctx.lineWidth = 8;
  ctx.strokeStyle = '#38BDF8';
  ctx.stroke();

  // 4 diameter measurement calipers at different angles
  const angles = [0, Math.PI / 4, Math.PI / 2, Math.PI * 0.75];
  for (const an of angles) {
    ctx.save();
    ctx.rotate(an);
    ctx.setLineDash([6, 6]);
    line([[-220, -20], [220, -20]], '#67E8F9', 3);
    ctx.setLineDash([]);
    // End arrows
    circle(-220, -20, 8, '#38BDF8');
    circle(220, -20, 8, '#38BDF8');
    ctx.restore();
  }
  ctx.restore();

  // Lip cross section at bottom
  rr(-280, 220, 560, 32, 8);
  ctx.fillStyle = '#334155';
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#94A3B8';
  ctx.stroke();

  K.pill('DIAMETER IS CONSTANT AT EVERY ANGLE', 0, 180, 36, C.ink, '#38BDF8');
  K.pill('PHYSICALLY IMPOSSIBLE TO FALL IN', 0, 280, 40, '#10B981', '#FFFFFF');

  ctx.restore();
}

/** Rolling mechanics on asphalt */
export function rollingMechanics(x, y, s = 1, t = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  // Asphalt ground profile
  rr(-450, -340, 900, 680, 28);
  ctx.fillStyle = '#1E293B';
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#475569';
  ctx.stroke();

  // Ground asphalt line
  line([[-420, 120], [420, 120]], '#64748B', 8);

  // Rolling wheel motion
  const rx = ((t * 220) % 600) - 300;
  ctx.save();
  ctx.translate(rx, 20);
  ctx.rotate(t * 3);

  // Cover seen edge-on with diameter circle
  circle(0, 0, 100, '#0F172A');
  ctx.lineWidth = 8;
  ctx.strokeStyle = '#F59E0B';
  ctx.stroke();

  // Spoke indicator to show rotation
  line([[-100, 0], [100, 0]], '#F59E0B', 5);
  line([[0, -100], [0, 100]], '#F59E0B', 5);
  ctx.restore();

  // Effort comparison pill
  K.pill('ROLL 250 LBS WITH 1 WORKER', 0, 220, 42, C.ink, '#FBBF24');
  K.pill('VS LIFTING HEAVY SQUARE IRON', 0, 280, 34, '#EF4444', '#FFFFFF');

  ctx.restore();
}
