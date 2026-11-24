// Train Explainer Kit: flat 2D vector components for train physics & mechanics.
import { ctx, C, W, H, TAU, lerp, clamp, rnd, rr, circle, ell, line, fillAll } from './lib.js';
import * as K from './kit.js';

/** Rail cross section (standard Vignoles rail profile) */
export function drawRailHead(x, y, s = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  // Rail foot / base
  rr(-70, 60, 140, 24, 6);
  ctx.fillStyle = '#3A4252'; ctx.fill();
  ctx.lineWidth = 4; ctx.strokeStyle = C.ink; ctx.stroke();
  // Rail web (vertical column)
  rr(-16, -20, 32, 85, 4);
  ctx.fillStyle = '#4A5568'; ctx.fill();
  ctx.lineWidth = 4; ctx.strokeStyle = C.ink; ctx.stroke();
  // Rail head (curved crown top)
  rr(-45, -60, 90, 44, [16, 16, 6, 6]);
  ctx.fillStyle = '#718096'; ctx.fill();
  ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke();
  // Shiny polished crown highlight where wheel rolls
  rr(-32, -60, 64, 10, [8, 8, 0, 0]);
  ctx.fillStyle = '#E2E8F0'; ctx.fill();
  ctx.restore();
}

/** Side view of a modern aerodynamic train car */
export function trainSide(x, y, s = 1, t = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  // Ballast & ground
  ctx.fillStyle = '#D8D1C5';
  ctx.fillRect(-1200, 150, 2400, 400);
  // Rail track line
  ctx.fillStyle = '#4A5568';
  ctx.fillRect(-1200, 140, 2400, 16);
  ctx.fillStyle = '#E2E8F0';
  ctx.fillRect(-1200, 138, 2400, 4); // shiny rail top

  // Ties / sleepers passing under
  const tieOffset = (t * 800) % 120;
  ctx.fillStyle = '#6E5C4F';
  for (let bx = -1200 + tieOffset; bx < 1200; bx += 120) {
    rr(bx, 156, 70, 26, 4); ctx.fill();
  }

  // Bogies (wheels & suspension)
  for (const bogieX of [-420, 380]) {
    // Bogie frame
    rr(bogieX - 160, 80, 320, 35, 8);
    ctx.fillStyle = '#2D3748'; ctx.fill();
    ctx.lineWidth = 4; ctx.strokeStyle = C.ink; ctx.stroke();

    // Wheels
    for (const wx of [-100, 100]) {
      const wheelAngle = t * 20;
      ctx.save();
      ctx.translate(bogieX + wx, 138 - 55);
      circle(0, 0, 56, '#4A5568');
      ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke();
      circle(0, 0, 42, '#2D3748');
      circle(0, 0, 20, '#718096');
      // Rotating wheel spokes indicator
      ctx.rotate(wheelAngle);
      for (let sp = 0; sp < 4; sp++) {
        ctx.rotate(Math.PI / 2);
        rr(-4, -40, 8, 26, 3);
        ctx.fillStyle = '#A0AEC0'; ctx.fill();
      }
      ctx.restore();
    }
  }

  // Main train aerodynamic body
  ctx.beginPath();
  ctx.moveTo(700, 110);
  ctx.bezierCurveTo(760, 110, 780, 40, 720, -20);
  ctx.bezierCurveTo(650, -85, 450, -110, 250, -110);
  ctx.lineTo(-750, -110);
  ctx.bezierCurveTo(-780, -110, -800, -80, -800, -50);
  ctx.lineTo(-800, 110);
  ctx.closePath();
  ctx.fillStyle = C.shirt; // sleek electric blue
  ctx.fill();
  ctx.lineWidth = 8; ctx.strokeStyle = C.ink; ctx.stroke();

  // White dynamic racing stripe
  ctx.beginPath();
  ctx.moveTo(-800, 20);
  ctx.lineTo(600, 20);
  ctx.bezierCurveTo(680, 20, 740, 0, 740, -10);
  ctx.lineTo(660, -35);
  ctx.bezierCurveTo(600, -25, 520, -15, -800, -15);
  ctx.closePath();
  ctx.fillStyle = C.white; ctx.fill();

  // Yellow accent stripe
  ctx.fillStyle = C.yellow;
  ctx.fillRect(-800, 25, 1460, 12);

  // Aerodynamic nose windscreen / cabin window
  ctx.beginPath();
  ctx.moveTo(420, -85);
  ctx.bezierCurveTo(550, -85, 660, -60, 680, -20);
  ctx.lineTo(540, -20);
  ctx.bezierCurveTo(500, -45, 450, -70, 390, -75);
  ctx.closePath();
  ctx.fillStyle = C.ink; ctx.fill();
  ctx.lineWidth = 4; ctx.strokeStyle = C.cyan; ctx.stroke();

  // Passenger windows
  for (let wx = -720; wx <= 240; wx += 120) {
    rr(wx, -75, 80, 45, 10);
    ctx.fillStyle = '#1A202C'; ctx.fill();
    ctx.lineWidth = 4; ctx.strokeStyle = C.ink; ctx.stroke();
    // Warm interior light / tint
    rr(wx + 8, -70, 64, 35, 6);
    ctx.fillStyle = 'rgba(255, 212, 59, 0.4)'; ctx.fill();
  }

  // Roof Pantograph (current collector)
  ctx.save();
  ctx.translate(-200, -110);
  rr(-80, -15, 160, 15, 4); ctx.fillStyle = '#2D3748'; ctx.fill();
  line([[ -50, -15], [-20, -120], [40, -60], [80, -180]], C.ink, 8);
  line([[ -50, -15], [-20, -120], [40, -60], [80, -180]], C.red, 4);
  rr(30, -190, 110, 14, 4); ctx.fillStyle = '#4A5568'; ctx.fill();
  ctx.restore();

  // Speed lines rushing behind
  ctx.save();
  ctx.globalAlpha = 0.7;
  for (let i = 0; i < 6; i++) {
    const lx = -850 - ((t * 1200 + i * 160) % 600);
    const ly = -80 + i * 35;
    ctx.fillStyle = C.white;
    rr(lx, ly, 140 + (i % 3) * 60, 8, 4);
    ctx.fill();
  }
  ctx.restore();

  ctx.restore();
}

/** Front view of wheelset (Axle + 2 Wheels on Rails)
 *  mode: 'flat' | 'cone'
 *  drift: horizontal shift (-100 to 100 px)
 *  tilt: body tilt angle (radians)
 */
export function wheelsetFront(x, y, s = 1, { mode = 'cone', drift = 0, tilt = 0, label = true } = {}) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  // Rails are fixed on the ground at +/- 340 px
  const railLeftX = -340;
  const railRightX = 340;
  const groundY = 280;

  // Track ties / ballast underneath
  rr(-480, groundY + 40, 960, 60, 8);
  ctx.fillStyle = '#6E5C4F'; ctx.fill();
  ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();

  // Left & Right fixed Rails
  drawRailHead(railLeftX, groundY, 1.3);
  drawRailHead(railRightX, groundY, 1.3);

  // Now the wheelset (can drift left/right, and tilt slightly)
  ctx.save();
  ctx.translate(drift, 0);
  ctx.rotate(tilt);

  // Rigid Axle connecting the two wheels
  rr(-380, -25, 760, 50, 12);
  ctx.fillStyle = '#4A5568'; ctx.fill();
  ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
  // Axle center highlight
  rr(-350, -12, 700, 16, 6);
  ctx.fillStyle = '#718096'; ctx.fill();

  // Draw each wheel: left & right
  [-1, 1].forEach((side) => {
    ctx.save();
    const cx = side * 340; // normal wheel center
    ctx.translate(cx, 0);

    if (mode === 'flat') {
      // Cylindrical flat wheel: rectangular profile, flat bottom
      const w = 110, h = 280;
      // Wheel main body
      rr(-w / 2, -h / 2, w, h, 8);
      ctx.fillStyle = '#4A5568'; ctx.fill();
      ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();

      // Inside safety flange
      const flangeX = side === -1 ? w / 2 - 10 : -w / 2 - 25;
      rr(flangeX, 60, 35, 110, 6);
      ctx.fillStyle = '#2D3748'; ctx.fill();
      ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();

      // Flat bottom edge marker
      line([[-w / 2, h / 2], [w / 2, h / 2]], C.yellow, 8);
    } else {
      // Conical Wheel: tapered outer slope!
      // In a train wheel, diameter is LARGER near the inside flange, and SMALLER toward the outside!
      // For left wheel (side = -1): inside is right (+x), outside is left (-x).
      // So right side is taller, left side is shorter!
      const flangeSide = -side; // inside direction (+1 for left wheel, -1 for right wheel)
      const flangeX = flangeSide * 45;

      ctx.beginPath();
      if (side === -1) {
        // Left wheel: inner edge (right) is radius 155, outer edge (left) is radius 135
        ctx.moveTo(-55, -135);
        ctx.lineTo(45, -155);
        ctx.lineTo(45, 155); // inner edge bottom (taller)
        ctx.lineTo(-55, 135); // outer edge bottom (shorter, cone slope!)
      } else {
        // Right wheel: inner edge (left) is radius 155, outer edge (right) is radius 135
        ctx.moveTo(-45, -155);
        ctx.lineTo(55, -135);
        ctx.lineTo(55, 135); // outer edge bottom (shorter)
        ctx.lineTo(-45, 155); // inner edge bottom (taller)
      }
      ctx.closePath();
      ctx.fillStyle = '#4A5568'; ctx.fill();
      ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();

      // Flange on inside
      rr(flangeX - 16, 60, 32, 125, 8);
      ctx.fillStyle = '#2D3748'; ctx.fill();
      ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();

      // Highlight the tapered slope line in cyan or yellow
      const slopePts = side === -1
        ? [[-55, 135], [45, 155]]
        : [[-45, 155], [55, 135]];
      line(slopePts, C.cyan, 10);
    }

    // Wheel hub center cap
    circle(0, 0, 48, '#2D3748');
    ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
    circle(0, 0, 24, '#E2E8F0');

    ctx.restore();
  });

  ctx.restore(); // end drift/tilt

  // Labels
  if (label) {
    if (mode === 'flat') {
      K.pill('FLAT CYLINDRICAL WHEELS', 0, -180, 50, C.red, C.white);
    } else {
      K.pill('CONICAL TAPERED WHEELS (1:20)', 0, -180, 50, C.cyanDark, C.white);
    }
  }

  ctx.restore();
}

/** Detailed close-up cross-section of a single Conical Wheel contacting the Rail */
export function wheelConeMacro(x, y, s = 1, { contactU = 0.5 } = {}) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  // Background grid
  ctx.fillStyle = '#E8E3D7';
  rr(-380, -320, 760, 640, 20); ctx.fill();
  ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();

  // Rail head below
  drawRailHead(0, 180, 2.0);

  // Giant wheel tire slice above
  // Tread surface slopes down from right (flange side) to left (outside)
  ctx.beginPath();
  ctx.moveTo(-300, -220);
  ctx.lineTo(240, -220);
  ctx.lineTo(240, 80); // flange top
  ctx.lineTo(160, 160); // flange curve
  ctx.lineTo(120, 100); // flange throat
  ctx.lineTo(-300, 20); // conical tread slope! (slanted upward to the right)
  ctx.closePath();
  ctx.fillStyle = '#4A5568'; ctx.fill();
  ctx.lineWidth = 8; ctx.strokeStyle = C.ink; ctx.stroke();

  // Highlight the conical slope
  line([[-300, 20], [120, 100]], C.yellow, 14);

  // Angle indicator showing the taper slope
  ctx.save();
  line([[-260, 30], [-60, 30]], '#718096', 4);
  line([[-260, 30], [-60, 75]], C.red, 6);
  ctx.font = '900 36px Inter';
  ctx.fillStyle = C.ink;
  ctx.fillText('1:20 TAPER', -40, 60);
  ctx.restore();

  // Contact Patch Point on Rail Head
  // Contact point moves along the tread depending on contactU
  const contactX = lerp(-120, 60, contactU);
  const contactY = lerp(55, 90, contactU);

  // Contact patch oval
  ell(contactX, contactY, 32, 10, C.red, 0.15);
  ctx.lineWidth = 4; ctx.strokeStyle = C.ink; ctx.stroke();

  // Contact Patch callout tag
  K.tag('CONTACT PATCH', contactX, -120, contactX, contactY - 15, 36);

  // Flange label pointing to the safety lip
  K.tag('SAFETY FLANGE', 130, -30, 150, 90, 34);

  ctx.restore();
}

/** Top-down view of Curving Rails & Self-Steering Conical Wheelset */
export function trackCurvingTop(x, y, s = 1, { trainCurve = 0, progress = 0 } = {}) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  // Ballast base
  rr(-380, -450, 760, 900, 24);
  ctx.fillStyle = '#D6CEBF'; ctx.fill();
  ctx.lineWidth = 8; ctx.strokeStyle = C.ink; ctx.stroke();

  // Curving center path
  const curveAmt = trainCurve * 140;

  // Sleepers / ties
  for (let ty = -400; ty <= 400; ty += 60) {
    const norm = (ty + 400) / 800;
    const cx = Math.sin(norm * Math.PI) * curveAmt;
    const ang = Math.cos(norm * Math.PI) * trainCurve * 0.4;
    ctx.save();
    ctx.translate(cx, ty);
    ctx.rotate(ang);
    rr(-240, -14, 480, 28, 6);
    ctx.fillStyle = '#6E5C4F'; ctx.fill();
    ctx.restore();
  }

  // Steel Rails (inner & outer)
  [-160, 160].forEach((ro) => {
    ctx.beginPath();
    for (let ty = -450; ty <= 450; ty += 20) {
      const norm = (ty + 400) / 800;
      const cx = Math.sin(norm * Math.PI) * curveAmt + ro;
      if (ty === -450) ctx.moveTo(cx, ty);
      else ctx.lineTo(cx, ty);
    }
    ctx.lineWidth = 18; ctx.strokeStyle = '#4A5568'; ctx.stroke();
    ctx.lineWidth = 8; ctx.strokeStyle = '#E2E8F0'; ctx.stroke();
  });

  // Wheelset running on the curve
  const wy = lerp(-300, 250, progress);
  const wNorm = (wy + 400) / 800;
  const wcx = Math.sin(wNorm * Math.PI) * curveAmt;
  const wAng = Math.cos(wNorm * Math.PI) * trainCurve * 0.4;

  ctx.save();
  ctx.translate(wcx, wy);
  ctx.rotate(wAng);

  // Axle
  rr(-180, -12, 360, 24, 6); ctx.fillStyle = '#2D3748'; ctx.fill();
  ctx.lineWidth = 4; ctx.strokeStyle = C.ink; ctx.stroke();

  // Wheels (top-down view)
  [-160, 160].forEach((ws) => {
    rr(ws - 18, -45, 36, 90, 8);
    ctx.fillStyle = '#4A5568'; ctx.fill();
    ctx.lineWidth = 4; ctx.strokeStyle = C.ink; ctx.stroke();
    // Inner flange
    const flX = ws === -160 ? ws + 12 : ws - 20;
    rr(flX, -52, 8, 104, 4);
    ctx.fillStyle = C.red; ctx.fill();
  });

  // Motion arrows indicating self-correction
  K.arrow(0, -90, 120, -Math.PI / 2, 0.9);

  ctx.restore();

  ctx.restore();
}

/** X-Ray cutaway of Electric Traction Motor & Drive Axle */
export function tractionMotorXray(x, y, s = 1, t = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  // Dark X-Ray container box
  rr(-420, -380, 840, 760, 28);
  ctx.fillStyle = '#0E1A2B'; ctx.fill();
  ctx.lineWidth = 8; ctx.strokeStyle = C.cyan; ctx.stroke();

  // Grid scanlines
  ctx.save();
  ctx.globalAlpha = 0.15;
  for (let gy = -360; gy <= 360; gy += 40) {
    line([[-400, gy], [400, gy]], C.cyan, 2);
  }
  ctx.restore();

  // Heavy rotating steel axle at bottom
  rr(-380, 180, 760, 60, 10);
  ctx.fillStyle = '#2D3748'; ctx.fill();
  ctx.lineWidth = 5; ctx.strokeStyle = C.cyanLight; ctx.stroke();

  // Big Bull Gear on Axle
  circle(120, 210, 110, '#3182CE');
  ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
  // Gear teeth spinning
  ctx.save();
  ctx.translate(120, 210);
  ctx.rotate(t * 10);
  for (let gt = 0; gt < 12; gt++) {
    ctx.rotate(Math.PI / 6);
    rr(-8, -125, 16, 25, 4); ctx.fillStyle = C.cyan; ctx.fill();
  }
  circle(0, 0, 45, '#1A202C');
  ctx.restore();

  // Pinion gear meshing with bull gear
  circle(120, 30, 55, '#E2E8F0');
  ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke();

  // Electric Motor Stator Housing
  rr(-320, -260, 380, 360, 20);
  ctx.fillStyle = '#1A202C'; ctx.fill();
  ctx.lineWidth = 6; ctx.strokeStyle = C.cyan; ctx.stroke();

  // Copper Coils & Magnetic Fields
  for (let cy = -220; cy <= 60; cy += 65) {
    rr(-300, cy, 70, 45, 8); ctx.fillStyle = '#DD6B20'; ctx.fill(); // copper
    rr(-90, cy, 70, 45, 8); ctx.fillStyle = '#DD6B20'; ctx.fill();
  }

  // Motor Rotor Core (spinning)
  circle(-160, -80, 100, '#2B6CB0');
  ctx.lineWidth = 5; ctx.strokeStyle = C.cyanLight; ctx.stroke();
  ctx.save();
  ctx.translate(-160, -80);
  ctx.rotate(-t * 25);
  for (let r = 0; r < 8; r++) {
    ctx.rotate(Math.PI / 4);
    line([[0, 0], [0, 85]], C.yellow, 8);
  }
  circle(0, 0, 35, C.yellow);
  ctx.restore();

  // Power Torque Vector Arrows
  K.arrow(240, 210, 140, Math.PI / 2, 0.9);

  // Electrical sparks / energy arcs
  const sparkPhase = Math.sin(t * 30);
  if (sparkPhase > 0) {
    ctx.save();
    ctx.strokeStyle = C.yellow;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-160, -80);
    ctx.lineTo(-120 + rnd(1) * 30, -50);
    ctx.lineTo(-60, -60);
    ctx.stroke();
    ctx.restore();
  }

  // Labels
  K.pill('ELECTRIC TRACTION MOTOR', 0, -320, 36, C.cyanDark, C.white);
  K.pill('DRIVE AXLE', -160, 280, 36, C.ink, C.white);
  K.tag('8,000 HP TORQUE', 110, -180, 110, 20, 34);

  ctx.restore();
}

/** Ultra macro steel-on-steel contact point showing tiny contact patch */
export function steelContactMacro(x, y, s = 1, t = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  // Split view: top is giant curved wheel bottom, bottom is giant rail head top
  ctx.fillStyle = '#222831';
  rr(-420, -420, 840, 840, 30); ctx.fill();
  ctx.lineWidth = 8; ctx.strokeStyle = C.ink; ctx.stroke();

  // Rail head (bottom half)
  ctx.beginPath();
  ctx.moveTo(-400, 380);
  ctx.lineTo(400, 380);
  ctx.lineTo(400, 40);
  ctx.bezierCurveTo(200, 10, -200, 10, -400, 40);
  ctx.closePath();
  ctx.fillStyle = '#4A5568'; ctx.fill();
  ctx.lineWidth = 6; ctx.strokeStyle = '#718096'; ctx.stroke();

  // Wheel rim (top half, curved downward)
  ctx.beginPath();
  ctx.moveTo(-400, -380);
  ctx.lineTo(400, -380);
  ctx.lineTo(400, -40);
  ctx.bezierCurveTo(200, -10, -200, -10, -400, -40);
  ctx.closePath();
  ctx.fillStyle = '#2D3748'; ctx.fill();
  ctx.lineWidth = 6; ctx.strokeStyle = '#718096'; ctx.stroke();

  // Microscopic contact oval: only the size of a dime / coin!
  const pulse = Math.sin(t * 15) * 4;
  ell(0, 0, 55 + pulse, 14, C.yellow);
  ctx.lineWidth = 4; ctx.strokeStyle = C.red; ctx.stroke();

  // Pressure compression arrows
  K.arrow(0, -120, 110, Math.PI / 2, 0.9);
  K.arrow(0, 120, 110, -Math.PI / 2, 0.9);

  // Dimension indicator (Coin comparison)
  ctx.save();
  ctx.translate(220, 0);
  circle(0, 0, 48, '#D69E2E');
  ctx.lineWidth = 4; ctx.strokeStyle = C.ink; ctx.stroke();
  ctx.font = '900 28px Inter';
  ctx.fillStyle = C.ink;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('COIN', 0, 0);
  ctx.restore();

  // Labels
  K.pill('CONTACT AREA: SIZE OF A DIME', 0, -280, 46, C.red, C.white);
  K.pill('ROLLING FRICTION: < 0.1%', 0, 260, 46, C.cyanDark, C.white);

  ctx.restore();
}
