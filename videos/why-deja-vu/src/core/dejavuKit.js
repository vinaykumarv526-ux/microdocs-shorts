// Deja Vu Explainer Kit: Clean 2D flat architectural vector components for neural circuits & memory processing delay.
import { ctx, C, W, H, TAU, lerp, clamp, rnd, rr, circle, ell, line, fillAll } from './lib.js';
import * as K from './kit.js';

/** Detailed 2D technical Brain Profile cutaway highlighting Temporal Lobe & Hippocampus */
export function brainProfile(x, y, s = 1, t = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  // Background blueprint card
  rr(-450, -420, 900, 840, 32);
  ctx.fillStyle = '#0F172A';
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#38BDF8';
  ctx.stroke();

  // Brain outer cortex outline (Stylized 2D technical vector)
  ctx.beginPath();
  ctx.moveTo(-160, 160);
  ctx.bezierCurveTo(-260, 140, -320, 0, -280, -120);
  ctx.bezierCurveTo(-240, -260, -100, -320, 40, -320);
  ctx.bezierCurveTo(180, -320, 300, -240, 320, -100);
  ctx.bezierCurveTo(340, 20, 260, 140, 160, 180);
  ctx.bezierCurveTo(120, 220, 80, 260, 40, 260);
  ctx.bezierCurveTo(0, 260, -20, 200, -60, 180);
  ctx.closePath();
  ctx.fillStyle = '#1E293B';
  ctx.fill();
  ctx.lineWidth = 8;
  ctx.strokeStyle = '#64748B';
  ctx.stroke();

  // Internal brain convolutions / sulci lines
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 4;
  for (let i = 0; i < 6; i++) {
    const cy = -200 + i * 60;
    line([[-180 + i * 20, cy], [200 - i * 15, cy + 20]], '#334155', 4);
  }

  // Prefrontal Cortex (Front - Left)
  circle(-180, -120, 46, 'rgba(16, 185, 129, 0.3)');
  K.tag('PREFRONTAL CORTEX', -180, -240, -180, -120, 26);

  // Temporal Lobe (Center-Bottom highlighted glowing cyan)
  circle(60, 60, 72, 'rgba(56, 189, 248, 0.4)');
  circle(60, 60, 48, '#0284C7');
  K.tag('TEMPORAL LOBE', 180, -40, 60, 60, 28);

  // Hippocampus (Inner memory node glowing amber)
  circle(20, -10, 36, '#F59E0B');
  K.tag('HIPPOCAMPUS (MEMORY)', 220, -160, 20, -10, 26);

  // Pulsing neural signal wave
  const pulse = Math.sin(t * 8) * 0.5 + 0.5;
  ctx.beginPath();
  ctx.arc(60, 60, 60 + pulse * 25, 0, TAU);
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.5)';
  ctx.lineWidth = 4;
  ctx.stroke();

  K.pill('MEDIAL TEMPORAL MEMORY CIRCUIT', 0, 360, 38, C.ink, '#FFD43B');

  ctx.restore();
}

/** Dual-Pathway Transmission Misfire (The Déjà Vu Lag) */
export function memoryBypassDiagram(x, y, s = 1, t = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  // Dark container
  rr(-450, -350, 900, 700, 28);
  ctx.fillStyle = '#0B132B';
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#EF4444';
  ctx.stroke();

  // Input Node (Left: Current Visual Perception)
  circle(-320, 0, 56, '#38BDF8');
  ctx.font = '900 22px Inter';
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.fillText('NEW', -320, -6);
  ctx.fillText('SIGHT', -320, 18);
  K.tag('PERCEPTION (NOW)', -320, -160, -320, -60, 26);

  // Normal Pathway (Top: Short-term Buffer)
  ctx.save();
  ctx.setLineDash([8, 6]);
  line([[-260, -30], [-40, -120]], '#64748B', 4);
  line([[40, -120], [240, -30]], '#64748B', 4);
  ctx.setLineDash([]);
  rr(-60, -160, 120, 80, 12);
  ctx.fillStyle = '#1E293B';
  ctx.fill();
  ctx.font = '700 18px Inter';
  ctx.fillStyle = '#94A3B8';
  ctx.fillText('SHORT-TERM', 0, -125);
  ctx.fillText('BUFFER', 0, -100);
  ctx.restore();

  // Glitch Shortcut Pathway (Bottom: Direct jump to Long-Term Storage)
  ctx.beginPath();
  ctx.moveTo(-260, 30);
  ctx.bezierCurveTo(-100, 160, 100, 160, 240, 30);
  ctx.strokeStyle = '#EF4444';
  ctx.lineWidth = 10;
  ctx.stroke();

  // Traveling electrical spark along the bypass
  const sparkProgress = (t * 2.5) % 1;
  const sx = lerp(-260, 240, sparkProgress);
  const sy = 30 + Math.sin(sparkProgress * Math.PI) * 110;
  circle(sx, sy, 14, '#FDE047');
  circle(sx, sy, 28, 'rgba(253, 224, 71, 0.4)');

  K.pill('15ms NEUROLOGICAL MISFIRE', 0, 170, 36, '#EF4444', '#FFFFFF');

  // Destination Node (Right: Long-Term Memory)
  circle(300, 0, 64, '#F59E0B');
  ctx.font = '900 20px Inter';
  ctx.fillStyle = '#0F172A';
  ctx.fillText('LONG-TERM', 300, -6);
  ctx.fillText('STORAGE', 300, 18);
  K.tag('FLAGGED AS "PAST EVENT"', 300, -160, 300, -70, 26);

  K.pill('CURRENT EXPERIENCE STORED AS AN ANCIENT MEMORY', 0, 280, 36, C.ink, '#FBBF24');

  ctx.restore();
}

/** Frontal Lobe Fact-Checking System Override */
export function factCheckingOverride(x, y, s = 1, t = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  // Blueprint frame
  rr(-450, -340, 900, 680, 28);
  ctx.fillStyle = '#0F172A';
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#10B981';
  ctx.stroke();

  // Split comparison card
  // Left: The Illusion
  rr(-380, -200, 350, 380, 20);
  ctx.fillStyle = '#1E293B';
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#EF4444';
  ctx.stroke();

  ctx.font = '900 26px Inter';
  ctx.fillStyle = '#EF4444';
  ctx.textAlign = 'center';
  ctx.fillText('TEMPORAL LOBE', -205, -130);
  ctx.font = '600 20px Inter';
  ctx.fillStyle = '#CBD5E1';
  ctx.fillText('"I HAVE BEEN HERE"', -205, -70);
  ctx.fillText('False Familiarity Signal', -205, -30);
  circle(-205, 70, 42, '#EF4444');
  K.warning(-205, 70, 0.8);

  // Right: Fact-Checker Resolution
  rr(30, -200, 350, 380, 20);
  ctx.fillStyle = '#1E293B';
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#10B981';
  ctx.stroke();

  ctx.font = '900 26px Inter';
  ctx.fillStyle = '#10B981';
  ctx.fillText('FRONTAL CORTEX', 205, -130);
  ctx.font = '600 20px Inter';
  ctx.fillStyle = '#CBD5E1';
  ctx.fillText('"FIRST TIME HERE"', 205, -70);
  ctx.fillText('Reality Check Verified', 205, -30);

  circle(205, 70, 42, '#10B981');
  ctx.beginPath();
  ctx.moveTo(190, 70);
  ctx.lineTo(200, 84);
  ctx.lineTo(222, 56);
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 7;
  ctx.lineCap = 'round';
  ctx.stroke();

  K.pill('BRAIN FACT-CHECKER IS HEALTHY & ACTIVE', 0, 270, 40, C.ink, '#10B981');

  ctx.restore();
}
