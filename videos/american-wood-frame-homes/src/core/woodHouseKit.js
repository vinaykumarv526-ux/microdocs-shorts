// American Wood Homes Explainer Kit: Clean 2D flat architectural vector components for timber framing & structural engineering.
import { ctx, C, W, H, TAU, lerp, clamp, rnd, rr, circle, ell, line, fillAll } from './lib.js';
import * as K from './kit.js';

/** Detailed 2D technical house cutaway: Exterior siding on left, 2x4 stud skeleton on right */
export function houseFramingCutaway(x, y, s = 1, t = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  // Background blueprint card
  rr(-440, -420, 880, 840, 32);
  ctx.fillStyle = '#0F172A';
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#38BDF8';
  ctx.stroke();

  // Concrete foundation base
  rr(-380, 240, 760, 80, 10);
  ctx.fillStyle = '#64748B';
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#94A3B8';
  ctx.stroke();
  ctx.font = '700 20px Inter';
  ctx.fillStyle = '#CBD5E1';
  ctx.textAlign = 'center';
  ctx.fillText('CONCRETE FOUNDATION SLAB', 0, 290);

  // Gabled roof triangle
  ctx.beginPath();
  ctx.moveTo(0, -340);
  ctx.lineTo(360, -100);
  ctx.lineTo(-360, -100);
  ctx.closePath();
  ctx.fillStyle = '#1E293B';
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#94A3B8';
  ctx.stroke();

  // Left Half: Finished American home siding & window
  ctx.save();
  ctx.beginPath();
  ctx.rect(-360, -100, 360, 340);
  ctx.clip();
  ctx.fillStyle = '#E2E8F0';
  ctx.fillRect(-360, -100, 360, 340);
  // Horizontal lap siding boards
  for (let sy = -100; sy <= 240; sy += 32) {
    line([[-360, sy], [0, sy]], '#CBD5E1', 3);
  }
  // Finished window
  rr(-240, -20, 140, 160, 8);
  ctx.fillStyle = '#38BDF8';
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#0F172A';
  ctx.stroke();
  ctx.restore();

  // Right Half: 2x4 Stud Wall Skeleton (Wood Timber)
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, -100, 360, 340);
  ctx.clip();
  ctx.fillStyle = '#1E293B';
  ctx.fillRect(0, -100, 360, 340);

  // Top plate & Sole plate
  ctx.fillStyle = '#D97706';
  ctx.fillRect(0, -100, 360, 18);
  ctx.fillRect(0, 222, 360, 18);

  // Vertical 2x4 Studs spaced 16" on center
  for (let sx = 20; sx <= 340; sx += 60) {
    rr(sx, -82, 20, 304, 4);
    ctx.fillStyle = '#F59E0B';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#B45309';
    ctx.stroke();
  }

  // Cross blocking
  ctx.fillRect(0, 60, 360, 16);
  ctx.restore();

  // Dividing line
  line([[0, -340], [0, 240]], '#38BDF8', 4);

  K.tag('FINISHED SIDING', -180, -160, -180, -80, 28);
  K.tag('2x4 TIMBER SKELETON', 180, -160, 180, -80, 28);

  K.pill('STANDARD PLATFORM FRAMING', 0, 360, 38, C.ink, '#FFD43B');

  ctx.restore();
}

/** Seismic flexibility comparison: Wood Frame vs Brittle Brick */
export function seismicComparison(x, y, s = 1, t = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  // Ground vibration oscillation
  const shake = Math.sin(t * 30) * 12;

  // Comparison container
  rr(-450, -350, 900, 700, 28);
  ctx.fillStyle = '#0F172A';
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#38BDF8';
  ctx.stroke();

  // Ground line with earthquake wave
  line([[-420, 180], [420, 180]], '#64748B', 8);

  // Left: Brittle Brick / Stone Wall (Cracking & Hazard)
  ctx.save();
  ctx.translate(-220, 30);
  rr(-120, -180, 240, 330, 8);
  ctx.fillStyle = '#7F1D1D';
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#DC2626';
  ctx.stroke();

  // Jagged violent crack lines
  ctx.beginPath();
  ctx.moveTo(0, -180);
  ctx.lineTo(-40, -90);
  ctx.lineTo(30, 0);
  ctx.lineTo(-20, 80);
  ctx.lineTo(20, 150);
  ctx.strokeStyle = '#EF4444';
  ctx.lineWidth = 8;
  ctx.stroke();

  K.warning(0, -60, 0.9);
  K.redX(0, 60, 0.8, 0.85);
  K.pill('BRICK: BRITTLE COLLAPSE', 0, 190, 28, '#EF4444', '#FFFFFF');
  ctx.restore();

  // Right: Wood Frame (Flexible shear dissipation)
  ctx.save();
  ctx.translate(220, 30);
  // Frame sways safely with earthquake wave
  const flexAngle = Math.sin(t * 8) * 0.08;
  ctx.rotate(flexAngle);

  // Wood stud frame grid
  for (let sx = -100; sx <= 100; sx += 50) {
    rr(sx - 8, -180, 16, 330, 4);
    ctx.fillStyle = '#F59E0B';
    ctx.fill();
  }
  ctx.fillRect(-110, -180, 220, 16);
  ctx.fillRect(-110, 134, 220, 16);

  // Green checkmark
  circle(0, 0, 48, '#10B981');
  ctx.beginPath();
  ctx.moveTo(-18, 0);
  ctx.lineTo(-6, 16);
  ctx.lineTo(18, -16);
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 8;
  ctx.lineCap = 'round';
  ctx.stroke();

  K.pill('WOOD: FLEXES SAFELY', 0, 190, 28, '#10B981', '#FFFFFF');
  ctx.restore();

  K.pill('SEISMIC & HIGH-WIND ENERGY ABSORPTION', 0, 280, 38, C.ink, '#38BDF8');

  ctx.restore();
}

/** Inside the wall cavity: Plumbing, Wiring & Insulation */
export function wallCavityDetail(x, y, s = 1, t = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  // Blueprint frame
  rr(-450, -340, 900, 680, 28);
  ctx.fillStyle = '#0F172A';
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#38BDF8';
  ctx.stroke();

  // Stud cavity (between two 2x4 studs)
  rr(-240, -260, 480, 520, 8);
  ctx.fillStyle = '#1E293B';
  ctx.fill();

  // Two 2x4 studs on edges
  rr(-240, -260, 40, 520, 4);
  ctx.fillStyle = '#F59E0B'; ctx.fill();
  rr(200, -260, 40, 520, 4);
  ctx.fillStyle = '#F59E0B'; ctx.fill();

  // Pink fiberglass insulation layer
  rr(-190, -260, 120, 520, 4);
  ctx.fillStyle = 'rgba(244, 114, 182, 0.4)';
  ctx.fill();
  K.tag('R-15 INSULATION', -130, -300, -130, -180, 26);

  // Blue PEX cold water pipe running vertically through drilled holes
  line([[0, -260], [0, 260]], '#38BDF8', 16);
  K.tag('PEX WATER LINE', 0, 120, 0, 20, 26);

  // Red PEX hot water pipe
  line([[40, -260], [40, 260]], '#EF4444', 16);

  // Yellow Romex electrical cable running across
  line([[-240, -40], [240, -40]], '#FBBF24', 10);
  K.tag('120V ROMEX WIRING', 140, -100, 100, -40, 26);

  K.pill('FAST MODULAR PLUMBING & HVAC ROUTING', 0, 280, 38, C.ink, '#FBBF24');

  ctx.restore();
}

/** Vast sustainable lumber forestry */
export function lumberForestry(x, y, s = 1, t = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  // Landscape container
  rr(-450, -340, 900, 680, 28);
  ctx.fillStyle = '#064E3B';
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#10B981';
  ctx.stroke();

  // Pine tree silhouettes
  for (let i = 0; i < 9; i++) {
    const tx = -380 + i * 95;
    const ty = -20 + Math.sin(i * 2) * 30;
    // Tree trunk
    rr(tx - 8, ty, 16, 120, 4);
    ctx.fillStyle = '#78350F';
    ctx.fill();
    // Pine layers
    for (let l = 0; l < 3; l++) {
      ctx.beginPath();
      ctx.moveTo(tx, ty - 120 - l * 40);
      ctx.lineTo(tx + 45 - l * 6, ty - 60 - l * 40);
      ctx.lineTo(tx - 45 + l * 6, ty - 60 - l * 40);
      ctx.closePath();
      ctx.fillStyle = '#059669';
      ctx.fill();
    }
  }

  // Milled 2x4 lumber stack at foreground
  rr(-160, 130, 320, 90, 8);
  ctx.fillStyle = '#F59E0B';
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#B45309';
  ctx.stroke();
  // Stack lines
  line([[-160, 160], [160, 160]], '#B45309', 3);
  line([[-160, 190], [160, 190]], '#B45309', 3);

  K.pill('500 MILLION ACRES OF TIMBERLAND', 0, -260, 38, '#064E3B', '#FFFFFF');
  K.pill('RENEWABLE, SUSTAINABLE LUMBER SUPPLY', 0, 270, 38, C.ink, '#10B981');

  ctx.restore();
}
