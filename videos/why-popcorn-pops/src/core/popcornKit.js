// Popcorn Explainer Kit: Clean 2D flat architectural vector components for pericarp hull physics & steam expansion.
import { ctx, C, W, H, TAU, lerp, clamp, rnd, rr, circle, ell, line, fillAll } from './lib.js';
import * as K from './kit.js';

/** Detailed 2D technical kernel cross-section showing pericarp hull & moisture core */
export function kernelCrossSection(x, y, s = 1, state = 'raw', t = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  // Outer dark background card
  rr(-380, -380, 760, 760, 36);
  ctx.fillStyle = '#0F172A';
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#F59E0B';
  ctx.stroke();

  // Kernel silhouette (teardrop shape)
  const drawKernelPath = () => {
    ctx.beginPath();
    ctx.moveTo(0, -220);
    ctx.bezierCurveTo(180, -200, 260, 40, 160, 200);
    ctx.bezierCurveTo(90, 280, -90, 280, -160, 200);
    ctx.bezierCurveTo(-260, 40, -180, -200, 0, -220);
    ctx.closePath();
  };

  // Outer waterproof Pericarp Hull (dense amber shell)
  drawKernelPath();
  ctx.fillStyle = state === 'heating' || state === 'molten' ? '#EA580C' : '#D97706';
  ctx.fill();
  ctx.lineWidth = 14;
  ctx.strokeStyle = '#78350F';
  ctx.stroke();

  // Hull thickness cutaway highlight
  ctx.save();
  ctx.clip();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.lineWidth = 6;
  drawKernelPath();
  ctx.stroke();
  ctx.restore();

  // Inner Endosperm (hard dense starch)
  ctx.save();
  ctx.scale(0.86, 0.86);
  drawKernelPath();
  if (state === 'molten') {
    // Molten gelatinous starch swirling
    ctx.fillStyle = '#FDE68A';
    ctx.fill();
    for (let i = 0; i < 8; i++) {
      const sx = Math.sin(t * 6 + i) * 80;
      const sy = Math.cos(t * 6 + i) * 60;
      circle(sx, sy, 22 + (i % 3) * 8, 'rgba(245, 158, 11, 0.4)');
    }
  } else {
    ctx.fillStyle = '#FBBF24';
    ctx.fill();
  }
  ctx.restore();

  // Central moisture droplet (14% trapped water)
  if (state === 'raw') {
    circle(0, 40, 52, '#38BDF8');
    circle(0, 40, 68, 'rgba(56, 189, 248, 0.3)');
    ell(-16, 26, 18, 10, '#FFFFFF', -0.3);
    K.tag('TRAPPED WATER (14%)', 0, -140, 0, 0, 32);
    K.tag('HARD PERICARP HULL', 280, 80, 190, 60, 32);
  } else if (state === 'heating') {
    // Superheated steam bubbles building
    for (let i = 0; i < 12; i++) {
      const bx = Math.sin(i * 1.5 + t * 8) * (50 + i * 8);
      const by = 40 + Math.cos(i * 1.5 + t * 8) * (50 + i * 8);
      circle(bx, by, 14 + (i % 4) * 4, '#67E8F9');
    }
    K.tag('SUPERHEATED STEAM (>400°F)', 0, -140, 0, 0, 34);
  } else if (state === 'molten') {
    // High pressure steam + molten dough
    circle(0, 30, 80, '#F59E0B');
    K.tag('MOLTEN STARCH DOUGH', 0, -140, 0, 20, 36);
  }

  ctx.restore();
}

/** 135 PSI Internal Pressure Gauge Dial */
export function pressureGauge(x, y, s = 1, psi = 135, t = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  // Outer gauge housing
  circle(0, 0, 260, '#1E293B');
  ctx.lineWidth = 12;
  ctx.strokeStyle = '#F59E0B';
  ctx.stroke();

  // Inner dial face
  circle(0, 0, 230, '#0F172A');

  // Red danger arc (100 - 150 PSI)
  ctx.beginPath();
  ctx.arc(0, 0, 200, -Math.PI * 0.1, Math.PI * 0.6);
  ctx.strokeStyle = '#EF4444';
  ctx.lineWidth = 24;
  ctx.stroke();

  // Dial tick marks
  for (let i = 0; i <= 10; i++) {
    const an = -Math.PI * 0.8 + (i / 10) * Math.PI * 1.4;
    const r1 = 180, r2 = 210;
    line([[Math.cos(an) * r1, Math.sin(an) * r1], [Math.cos(an) * r2, Math.sin(an) * r2]], '#FFFFFF', i % 2 === 0 ? 6 : 3);
  }

  // Needle angle animated toward 135 PSI
  const needleTarget = -Math.PI * 0.8 + (clamp(psi / 150) * Math.PI * 1.4);
  const needleJitter = Math.sin(t * 40) * 0.04;
  const needleAng = needleTarget + needleJitter;

  ctx.save();
  ctx.rotate(needleAng);
  ctx.beginPath();
  ctx.moveTo(-10, 20);
  ctx.lineTo(-4, -180);
  ctx.lineTo(4, -180);
  ctx.lineTo(10, 20);
  ctx.closePath();
  ctx.fillStyle = '#EF4444';
  ctx.fill();
  ctx.restore();

  // Needle cap center
  circle(0, 0, 26, '#F8FAFC');
  circle(0, 0, 14, '#0F172A');

  // Reading label
  K.pill('135 PSI (9.3 BAR)', 0, 120, 38, '#EF4444', '#FFFFFF');
  ctx.font = '700 22px Inter';
  ctx.fillStyle = '#94A3B8';
  ctx.textAlign = 'center';
  ctx.fillText('4X CAR TIRE PRESSURE', 0, 175);

  ctx.restore();
}

/** Explosive Hull Rupture & Flash Expansion */
export function ruptureExplosion(x, y, s = 1, t = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  // Background dark blast container
  rr(-450, -360, 900, 720, 28);
  ctx.fillStyle = '#0B132B';
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#EF4444';
  ctx.stroke();

  // Shockwaves
  for (let r = 1; r <= 3; r++) {
    const rad = (120 * r + t * 240) % 400;
    const alpha = clamp(1 - rad / 400);
    ctx.beginPath();
    ctx.arc(0, 0, rad, 0, TAU);
    ctx.strokeStyle = `rgba(239, 68, 68, ${alpha * 0.6})`;
    ctx.lineWidth = 8;
    ctx.stroke();
  }

  // Ruptured pericarp fragments flying outwards
  for (let i = 0; i < 8; i++) {
    const an = i * (Math.PI / 4) + 0.3;
    const dist = 140 + t * 180;
    ctx.save();
    ctx.translate(Math.cos(an) * dist, Math.sin(an) * dist);
    ctx.rotate(an + t * 4);
    rr(-24, -14, 48, 28, 8);
    ctx.fillStyle = '#78350F';
    ctx.fill();
    ctx.restore();
  }

  // Rapidly expanding white starch foam lobes
  const foamScale = clamp(t * 3.5, 0.2, 1.2);
  ctx.save();
  ctx.scale(foamScale, foamScale);
  const lobes = [
    { x: -60, y: -50, r: 110 },
    { x: 70, y: -60, r: 120 },
    { x: -40, y: 70, r: 115 },
    { x: 80, y: 60, r: 105 },
    { x: 0, y: 0, r: 130 },
  ];
  for (const lb of lobes) {
    circle(lb.x, lb.y, lb.r, '#F8FAFC');
    circle(lb.x - 15, lb.y - 15, lb.r * 0.7, '#FFFFFF');
  }
  ctx.restore();

  K.pill('EXPANDS 40X IN 0.1 SECONDS', 0, 280, 42, '#EF4444', '#FFFFFF');

  ctx.restore();
}

/** Fluffy finished popcorn flake macro */
export function finishedPopcornFlake(x, y, s = 1, t = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  // Clean studio background card
  rr(-400, -380, 800, 760, 32);
  ctx.fillStyle = '#1E293B';
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#F59E0B';
  ctx.stroke();

  // Floating gentle bob
  const bob = Math.sin(t * 3) * 12;
  ctx.translate(0, bob);

  // Amber pericarp hull remnant at core
  rr(-35, 10, 70, 50, 16);
  ctx.fillStyle = '#92400E';
  ctx.fill();

  // Crisp white / cream expanded starch lobes
  const lobes = [
    { x: -110, y: -70, r: 115, col: '#F8FAFC' },
    { x: 100, y: -90, r: 130, col: '#FFFFFF' },
    { x: -130, y: 60, r: 110, col: '#FEF3C7' },
    { x: 110, y: 70, r: 120, col: '#F8FAFC' },
    { x: 0, y: -40, r: 145, col: '#FFFFFF' },
    { x: -10, y: 80, r: 100, col: '#F1F5F9' },
  ];

  for (const l of lobes) {
    circle(l.x, l.y, l.r, l.col);
    // Delicate texture shading
    ctx.strokeStyle = 'rgba(217, 119, 6, 0.15)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(l.x, l.y, l.r * 0.85, 0, TAU);
    ctx.stroke();
  }

  K.pill('CRISP SOLIDIFIED STARCH FOAM', 0, 270, 40, C.ink, '#FFD43B');

  ctx.restore();
}
