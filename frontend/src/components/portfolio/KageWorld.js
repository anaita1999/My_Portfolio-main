import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// ============================================================================
// CINEMATIC PHOTOREALISTIC PROCEDURAL PBR TEXTURE SYNTHESIZERS
// True Tangent-Space Normal Maps + Hongawara Ceramic Tiles + V-Cut Engraved Beam
// ============================================================================

// Utility: Compute True Tangent-Space Normal Map from Height Canvas using 3x3 Sobel Operator
function createNormalMapFromHeight(heightCanvas, strength = 1.4) {
  const width = heightCanvas.width;
  const height = heightCanvas.height;
  const ctxH = heightCanvas.getContext('2d');
  const srcData = ctxH.getImageData(0, 0, width, height).data;

  const normalCanvas = document.createElement('canvas');
  normalCanvas.width = width;
  normalCanvas.height = height;
  const ctxN = normalCanvas.getContext('2d');
  const dstImg = ctxN.createImageData(width, height);
  const dstData = dstImg.data;

  const getH = (x, y) => {
    const px = (x + width) % width;
    const py = (y + height) % height;
    const idx = (py * width + px) * 4;
    return (srcData[idx] + srcData[idx + 1] + srcData[idx + 2]) / (3 * 255);
  };

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const tl = getH(x - 1, y - 1);
      const t  = getH(x,     y - 1);
      const tr = getH(x + 1, y - 1);
      const l  = getH(x - 1, y);
      const r  = getH(x + 1, y);
      const bl = getH(x - 1, y + 1);
      const b  = getH(x,     y + 1);
      const br = getH(x + 1, y + 1);

      const dx = (tr + 2.0 * r + br) - (tl + 2.0 * l + bl);
      const dy = (bl + 2.0 * b + br) - (tl + 2.0 * t + tr);
      const dz = 1.0 / strength;

      const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
      const nx = (-dx / len) * 0.5 + 0.5;
      const ny = (-dy / len) * 0.5 + 0.5;
      const nz = (dz / len) * 0.5 + 0.5;

      const idx = (y * width + x) * 4;
      dstData[idx]     = Math.floor(nx * 255);
      dstData[idx + 1] = Math.floor(ny * 255);
      dstData[idx + 2] = Math.floor(nz * 255);
      dstData[idx + 3] = 255;
    }
  }

  ctxN.putImageData(dstImg, 0, 0);
  const tex = new THREE.CanvasTexture(normalCanvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

// 1. Hand-Hewn Vermilion Pillar Texture (Smooth Naguri Chisel Waves + Urushi Lacquer)
function createHandCraftedPillarTextures() {
  const size = 512;
  const canvasMap = document.createElement('canvas');
  canvasMap.width = size;
  canvasMap.height = size;
  const ctxMap = canvasMap.getContext('2d');

  const canvasHeight = document.createElement('canvas');
  canvasHeight.width = size;
  canvasHeight.height = size;
  const ctxH = canvasHeight.getContext('2d');

  const canvasRough = document.createElement('canvas');
  canvasRough.width = size;
  canvasRough.height = size;
  const ctxRough = canvasRough.getContext('2d');

  const grad = ctxMap.createLinearGradient(0, 0, size, 0);
  grad.addColorStop(0, '#a51810');
  grad.addColorStop(0.3, '#cc241a');
  grad.addColorStop(0.7, '#da3024');
  grad.addColorStop(1, '#90120a');
  ctxMap.fillStyle = grad;
  ctxMap.fillRect(0, 0, size, size);

  ctxH.fillStyle = '#808080';
  ctxH.fillRect(0, 0, size, size);

  ctxRough.fillStyle = '#555555';
  ctxRough.fillRect(0, 0, size, size);

  for (let i = 0; i < 350; i++) {
    const x = Math.random() * size;
    const w = 1 + Math.random() * 2;
    const a = 0.02 + Math.random() * 0.05;
    ctxMap.fillStyle = Math.random() > 0.5 ? `rgba(255, 150, 90, ${a})` : `rgba(60, 8, 4, ${a})`;
    ctxMap.fillRect(x, 0, w, size);
  }

  const rows = 14;
  const cols = 8;
  const cellW = size / cols;
  const cellH = size / rows;

  for (let r = 0; r < rows; r++) {
    const xShift = (r % 2) * (cellW * 0.5);
    for (let c = -1; c <= cols; c++) {
      const cx = c * cellW + xShift + cellW * 0.5;
      const cy = r * cellH + cellH * 0.5;
      const rx = cellW * 0.48;
      const ry = cellH * 0.45;

      const gougeGrad = ctxMap.createRadialGradient(cx, cy - ry * 0.25, 2, cx, cy, rx);
      gougeGrad.addColorStop(0, 'rgba(255, 130, 90, 0.22)');
      gougeGrad.addColorStop(0.7, 'rgba(180, 25, 18, 0.06)');
      gougeGrad.addColorStop(1, 'rgba(50, 4, 2, 0.28)');

      ctxMap.save();
      ctxMap.beginPath();
      ctxMap.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      ctxMap.fillStyle = gougeGrad;
      ctxMap.fill();
      ctxMap.restore();

      const hGrad = ctxH.createRadialGradient(cx, cy, 1, cx, cy, rx);
      hGrad.addColorStop(0, '#282828');
      hGrad.addColorStop(0.6, '#606060');
      hGrad.addColorStop(0.88, '#e0e0e0');
      hGrad.addColorStop(1, '#808080');

      ctxH.save();
      ctxH.beginPath();
      ctxH.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      ctxH.fillStyle = hGrad;
      ctxH.fill();
      ctxH.restore();

      const rGrad = ctxRough.createRadialGradient(cx, cy, 1, cx, cy, rx);
      rGrad.addColorStop(0, '#757575');
      rGrad.addColorStop(0.85, '#353535');
      rGrad.addColorStop(1, '#555555');

      ctxRough.save();
      ctxRough.beginPath();
      ctxRough.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      ctxRough.fillStyle = rGrad;
      ctxRough.fill();
      ctxRough.restore();
    }
  }

  const mapTex = new THREE.CanvasTexture(canvasMap);
  mapTex.wrapS = mapTex.wrapT = THREE.RepeatWrapping;
  mapTex.repeat.set(2, 4);

  const normalTex = createNormalMapFromHeight(canvasHeight, 1.8);
  normalTex.repeat.set(2, 4);

  const roughTex = new THREE.CanvasTexture(canvasRough);
  roughTex.wrapS = roughTex.wrapT = THREE.RepeatWrapping;
  roughTex.repeat.set(2, 4);

  return { mapTex, normalTex, roughTex };
}

// 2. Realistic Hand-Engraved "ANAITA PAL" Torii Crossbeam (Aged Urushi + V-Chisel Kinpaku Inlay)
function createEngravedBeamTextures() {
  const width = 2048;
  const height = 512;

  const canvasMap = document.createElement('canvas');
  canvasMap.width = width;
  canvasMap.height = height;
  const ctxMap = canvasMap.getContext('2d');

  const canvasHeight = document.createElement('canvas');
  canvasHeight.width = width;
  canvasHeight.height = height;
  const ctxH = canvasHeight.getContext('2d');

  const canvasRough = document.createElement('canvas');
  canvasRough.width = width;
  canvasRough.height = height;
  const ctxRough = canvasRough.getContext('2d');

  // Deep aged Vermilion Urushi lacquer background with organic architectural bevels
  const bgGrad = ctxMap.createLinearGradient(0, 0, 0, height);
  bgGrad.addColorStop(0, '#680e08'); // Dark aged top eave shadow
  bgGrad.addColorStop(0.12, '#8e1610');
  bgGrad.addColorStop(0.5, '#b82218'); // Rich vermilion body
  bgGrad.addColorStop(0.88, '#8e1610');
  bgGrad.addColorStop(1, '#580a06'); // Dark bottom rim shadow
  ctxMap.fillStyle = bgGrad;
  ctxMap.fillRect(0, 0, width, height);

  ctxH.fillStyle = '#808080';
  ctxH.fillRect(0, 0, width, height);

  ctxRough.fillStyle = '#656565';
  ctxRough.fillRect(0, 0, width, height);

  // Micro horizontal wood fibers & Urushi lacquer polish
  for (let i = 0; i < 900; i++) {
    const y = Math.random() * height;
    const h = 1 + Math.random() * 2.5;
    const a = 0.02 + Math.random() * 0.05;
    ctxMap.fillStyle = Math.random() > 0.45 ? `rgba(240, 140, 80, ${a})` : `rgba(40, 4, 2, ${a * 1.5})`;
    ctxMap.fillRect(0, y, width, h);

    ctxH.fillStyle = Math.random() > 0.5 ? `rgba(175, 175, 175, ${a * 0.8})` : `rgba(75, 75, 75, ${a * 0.8})`;
    ctxH.fillRect(0, y, width, h);
  }

  // Proportionate, dignified typography: "ANAITA PAL"
  const text = 'A N A I T A   P A L';
  const fontSize = 84;
  const font = `600 ${fontSize}px "Cinzel", "Outfit", "Times New Roman", serif`;

  ctxMap.font = font;
  ctxMap.textAlign = 'center';
  ctxMap.textBaseline = 'middle';

  ctxH.font = font;
  ctxH.textAlign = 'center';
  ctxH.textBaseline = 'middle';

  ctxRough.font = font;
  ctxRough.textAlign = 'center';
  ctxRough.textBaseline = 'middle';

  const cx = width / 2;
  const cy = height / 2;

  // Multi-pass V-Chisel carving:
  // Layer 1: Deep Chisel Trench Shadow (Top-Left offset)
  ctxMap.fillStyle = 'rgba(20, 2, 1, 0.95)';
  for (let offset = 4; offset >= 1; offset--) {
    ctxMap.fillText(text, cx - offset, cy - offset);
  }

  // Layer 2: Inlaid Antique Burnished Gold Leaf (Kinpaku 金箔)
  const goldGrad = ctxMap.createLinearGradient(0, cy - fontSize * 0.45, 0, cy + fontSize * 0.45);
  goldGrad.addColorStop(0, '#fff4c2');
  goldGrad.addColorStop(0.25, '#ebd173');
  goldGrad.addColorStop(0.55, '#c99b2e');
  goldGrad.addColorStop(0.85, '#996f18');
  goldGrad.addColorStop(1, '#5a3d0a');
  ctxMap.fillStyle = goldGrad;
  ctxMap.fillText(text, cx, cy);

  // Layer 3: Sun/Moonlight Grazing Rim Highlight along lower-right carved bevel
  ctxMap.fillStyle = 'rgba(255, 245, 210, 0.85)';
  ctxMap.fillText(text, cx + 2, cy + 2);
  ctxMap.fillStyle = 'rgba(255, 255, 240, 0.5)';
  ctxMap.fillText(text, cx + 3.5, cy + 3.5);

  // Height Map V-Groove:
  ctxH.fillStyle = '#101010';
  for (let offset = 4; offset >= 1; offset--) {
    ctxH.fillText(text, cx - offset, cy - offset);
  }
  ctxH.fillStyle = '#353535';
  ctxH.fillText(text, cx, cy);

  ctxH.fillStyle = '#eeeeee';
  ctxH.fillText(text, cx + 2, cy + 2);
  ctxH.fillStyle = '#ffffff';
  ctxH.fillText(text, cx + 3.5, cy + 3.5);

  // Roughness Map:
  ctxRough.fillStyle = '#222222';
  ctxRough.fillText(text, cx, cy);

  const mapTex = new THREE.CanvasTexture(canvasMap);
  const normalTex = createNormalMapFromHeight(canvasHeight, 2.8);
  const roughTex = new THREE.CanvasTexture(canvasRough);

  return { mapTex, normalTex, roughTex };
}

// 3. Japanese Kiln-Fired Ceramic Roof Tiles (Ibushi-Kawara / Hongawara 燻し瓦)
function createHandCraftedRoofTileTextures() {
  const size = 512;
  const canvasMap = document.createElement('canvas');
  canvasMap.width = size;
  canvasMap.height = size;
  const ctxMap = canvasMap.getContext('2d');

  const canvasHeight = document.createElement('canvas');
  canvasHeight.width = size;
  canvasHeight.height = size;
  const ctxH = canvasHeight.getContext('2d');

  const canvasRough = document.createElement('canvas');
  canvasRough.width = size;
  canvasRough.height = size;
  const ctxRough = canvasRough.getContext('2d');

  ctxMap.fillStyle = '#141c26';
  ctxMap.fillRect(0, 0, size, size);

  ctxH.fillStyle = '#606060';
  ctxH.fillRect(0, 0, size, size);

  ctxRough.fillStyle = '#707070';
  ctxRough.fillRect(0, 0, size, size);

  const tileRows = 8;
  const tileCols = 6;
  const cellW = size / tileCols;
  const cellH = size / tileRows;

  for (let r = 0; r < tileRows; r++) {
    const y = r * cellH;

    const courseGrad = ctxMap.createLinearGradient(0, y, 0, y + cellH);
    courseGrad.addColorStop(0, '#0c121a');
    courseGrad.addColorStop(0.15, '#18222e');
    courseGrad.addColorStop(0.85, '#283647');
    courseGrad.addColorStop(1, '#3a4b5e');

    ctxMap.fillStyle = courseGrad;
    ctxMap.fillRect(0, y, size, cellH);

    const hStep = ctxH.createLinearGradient(0, y, 0, y + cellH);
    hStep.addColorStop(0, '#101010');
    hStep.addColorStop(0.12, '#606060');
    hStep.addColorStop(0.9, '#e8e8e8');
    hStep.addColorStop(1, '#ffffff');

    ctxH.fillStyle = hStep;
    ctxH.fillRect(0, y, size, cellH);

    const rStep = ctxRough.createLinearGradient(0, y, 0, y + cellH);
    rStep.addColorStop(0, '#a0a0a0');
    rStep.addColorStop(0.5, '#404040');
    rStep.addColorStop(1, '#2c2c2c');

    ctxRough.fillStyle = rStep;
    ctxRough.fillRect(0, y, size, cellH);
  }

  for (let c = 0; c < tileCols; c++) {
    const x = c * cellW + cellW * 0.5 - cellW * 0.18;
    const w = cellW * 0.36;

    const ridgeGrad = ctxMap.createLinearGradient(x, 0, x + w, 0);
    ridgeGrad.addColorStop(0, '#0c121a');
    ridgeGrad.addColorStop(0.3, '#324458');
    ridgeGrad.addColorStop(0.5, '#4c627c');
    ridgeGrad.addColorStop(0.7, '#324458');
    ridgeGrad.addColorStop(1, '#0c121a');

    ctxMap.fillStyle = ridgeGrad;
    ctxMap.fillRect(x, 0, w, size);

    const ridgeH = ctxH.createLinearGradient(x, 0, x + w, 0);
    ridgeH.addColorStop(0, '#303030');
    ridgeH.addColorStop(0.5, '#ffffff');
    ridgeH.addColorStop(1, '#303030');

    ctxH.fillStyle = ridgeH;
    ctxH.fillRect(x, 0, w, size);

    const ridgeR = ctxRough.createLinearGradient(x, 0, x + w, 0);
    ridgeR.addColorStop(0, '#888888');
    ridgeR.addColorStop(0.5, '#252525');
    ridgeR.addColorStop(1, '#888888');

    ctxRough.fillStyle = ridgeR;
    ctxRough.fillRect(x, 0, w, size);
  }

  for (let i = 0; i < 600; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const a = Math.random() * 0.08;
    ctxMap.fillStyle = `rgba(255, 255, 255, ${a})`;
    ctxMap.fillRect(x, y, 1.5, 1.5);
  }

  const mapTex = new THREE.CanvasTexture(canvasMap);
  mapTex.wrapS = mapTex.wrapT = THREE.RepeatWrapping;
  mapTex.repeat.set(6, 6);

  const normalTex = createNormalMapFromHeight(canvasHeight, 2.2);
  normalTex.repeat.set(6, 6);

  const roughTex = new THREE.CanvasTexture(canvasRough);
  roughTex.wrapS = roughTex.wrapT = THREE.RepeatWrapping;
  roughTex.repeat.set(6, 6);

  return { mapTex, normalTex, roughTex };
}

// 4. Hand-Dressed Floor & Courtyard Flagstones (Wet Stone Sheen + Puddle Highlights)
function createHandCraftedFloorTextures() {
  const size = 512;
  const canvasMap = document.createElement('canvas');
  canvasMap.width = size;
  canvasMap.height = size;
  const ctxMap = canvasMap.getContext('2d');

  const canvasHeight = document.createElement('canvas');
  canvasHeight.width = size;
  canvasHeight.height = size;
  const ctxH = canvasHeight.getContext('2d');

  const canvasRough = document.createElement('canvas');
  canvasRough.width = size;
  canvasRough.height = size;
  const ctxRough = canvasRough.getContext('2d');

  ctxMap.fillStyle = '#080c12';
  ctxMap.fillRect(0, 0, size, size);

  ctxH.fillStyle = '#101010';
  ctxH.fillRect(0, 0, size, size);

  ctxRough.fillStyle = '#b0b0b0';
  ctxRough.fillRect(0, 0, size, size);

  const rows = 6;
  const cols = 5;
  const cellW = size / cols;
  const cellH = size / rows;

  for (let r = 0; r < rows; r++) {
    const xShift = (r % 2) * (cellW * 0.45);
    for (let c = -1; c <= cols; c++) {
      const margin = 5;
      const x = c * cellW + xShift + margin;
      const y = r * cellH + margin;
      const w = cellW - margin * 2;
      const h = cellH - margin * 2;
      const radius = 6;

      const baseTone = 28 + Math.floor(Math.random() * 16);
      const toneR = baseTone;
      const toneG = baseTone + Math.floor(Math.random() * 8) + 4;
      const toneB = baseTone + Math.floor(Math.random() * 14) + 8;

      ctxMap.fillStyle = `rgb(${toneR}, ${toneG}, ${toneB})`;
      ctxMap.beginPath();
      ctxMap.roundRect ? ctxMap.roundRect(x, y, w, h, radius) : ctxMap.rect(x, y, w, h);
      ctxMap.fill();

      const hGrad = ctxH.createRadialGradient(
        x + w * 0.5, y + h * 0.5, 4,
        x + w * 0.5, y + h * 0.5, Math.max(w, h) * 0.65
      );
      hGrad.addColorStop(0, '#f8f8f8');
      hGrad.addColorStop(0.7, '#d0d0d0');
      hGrad.addColorStop(0.95, '#505050');
      hGrad.addColorStop(1, '#101010');

      ctxH.fillStyle = hGrad;
      ctxH.beginPath();
      ctxH.roundRect ? ctxH.roundRect(x, y, w, h, radius) : ctxH.rect(x, y, w, h);
      ctxH.fill();

      // Wet stone sheen with damp puddle reflection variation
      const isDampStone = Math.random() > 0.45;
      ctxRough.fillStyle = isDampStone ? '#353535' : '#707070';
      ctxRough.beginPath();
      ctxRough.roundRect ? ctxRough.roundRect(x, y, w, h, radius) : ctxRough.rect(x, y, w, h);
      ctxRough.fill();

      for (let p = 0; p < 45; p++) {
        const px = x + Math.random() * w;
        const py = y + Math.random() * h;
        const pr = 0.8 + Math.random() * 1.5;
        const isPit = Math.random() > 0.5;

        ctxMap.fillStyle = isPit ? 'rgba(4, 6, 10, 0.3)' : 'rgba(80, 100, 125, 0.25)';
        ctxMap.beginPath();
        ctxMap.arc(px, py, pr, 0, Math.PI * 2);
        ctxMap.fill();
      }
    }
  }

  const mapTex = new THREE.CanvasTexture(canvasMap);
  mapTex.wrapS = mapTex.wrapT = THREE.RepeatWrapping;
  mapTex.repeat.set(3, 8);

  const normalTex = createNormalMapFromHeight(canvasHeight, 1.6);
  normalTex.repeat.set(3, 8);

  const roughTex = new THREE.CanvasTexture(canvasRough);
  roughTex.wrapS = roughTex.wrapT = THREE.RepeatWrapping;
  roughTex.repeat.set(3, 8);

  return { mapTex, normalTex, roughTex };
}

// 5. Hand-Charred Yakisugi Cedar (Shou Sugi Ban Temple Chambers & Framework)
function createHandCraftedYakisugiTextures() {
  const size = 512;
  const canvasMap = document.createElement('canvas');
  canvasMap.width = size;
  canvasMap.height = size;
  const ctxMap = canvasMap.getContext('2d');

  const canvasHeight = document.createElement('canvas');
  canvasHeight.width = size;
  canvasHeight.height = size;
  const ctxH = canvasHeight.getContext('2d');

  const canvasRough = document.createElement('canvas');
  canvasRough.width = size;
  canvasRough.height = size;
  const ctxRough = canvasRough.getContext('2d');

  ctxMap.fillStyle = '#141a22';
  ctxMap.fillRect(0, 0, size, size);

  ctxH.fillStyle = '#808080';
  ctxH.fillRect(0, 0, size, size);

  ctxRough.fillStyle = '#909090';
  ctxRough.fillRect(0, 0, size, size);

  for (let i = 0; i < 400; i++) {
    const y = Math.random() * size;
    const h = 1.5 + Math.random() * 3.5;
    const a = 0.08 + Math.random() * 0.2;
    const isDark = Math.random() > 0.4;

    ctxMap.fillStyle = isDark ? `rgba(4, 6, 10, ${a * 1.6})` : `rgba(48, 62, 80, ${a})`;
    ctxMap.fillRect(0, y, size, h);

    ctxH.fillStyle = isDark ? `rgba(15, 15, 15, ${a * 2.0})` : `rgba(230, 230, 230, ${a * 1.5})`;
    ctxH.fillRect(0, y, size, h);

    ctxRough.fillStyle = isDark ? `rgba(220, 220, 220, ${a})` : `rgba(60, 60, 60, ${a})`;
    ctxRough.fillRect(0, y, size, h);
  }

  const mapTex = new THREE.CanvasTexture(canvasMap);
  mapTex.wrapS = mapTex.wrapT = THREE.RepeatWrapping;
  mapTex.repeat.set(2, 4);

  const normalTex = createNormalMapFromHeight(canvasHeight, 1.4);
  normalTex.repeat.set(2, 4);

  const roughTex = new THREE.CanvasTexture(canvasRough);
  roughTex.wrapS = roughTex.wrapT = THREE.RepeatWrapping;
  roughTex.repeat.set(2, 4);

  return { mapTex, normalTex, roughTex };
}

// 6. Hand-Chiseled Mountain Granite (Stone Steps, Lanterns & Plinths)
function createHandCraftedStoneTextures() {
  const size = 512;
  const canvasMap = document.createElement('canvas');
  canvasMap.width = size;
  canvasMap.height = size;
  const ctxMap = canvasMap.getContext('2d');

  const canvasHeight = document.createElement('canvas');
  canvasHeight.width = size;
  canvasHeight.height = size;
  const ctxH = canvasHeight.getContext('2d');

  const canvasRough = document.createElement('canvas');
  canvasRough.width = size;
  canvasRough.height = size;
  const ctxRough = canvasRough.getContext('2d');

  ctxMap.fillStyle = '#202a35';
  ctxMap.fillRect(0, 0, size, size);

  ctxH.fillStyle = '#808080';
  ctxH.fillRect(0, 0, size, size);

  ctxRough.fillStyle = '#a0a0a0';
  ctxRough.fillRect(0, 0, size, size);

  for (let i = 0; i < 3500; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = 1 + Math.random() * 3;
    const a = 0.05 + Math.random() * 0.14;
    const isLight = Math.random() > 0.5;

    ctxMap.fillStyle = isLight ? `rgba(75, 95, 120, ${a})` : `rgba(8, 12, 18, ${a * 1.6})`;
    ctxMap.beginPath();
    ctxMap.arc(x, y, r, 0, Math.PI * 2);
    ctxMap.fill();

    ctxH.fillStyle = isLight ? `rgba(235, 235, 235, ${a * 1.8})` : `rgba(20, 20, 20, ${a * 1.8})`;
    ctxH.beginPath();
    ctxH.arc(x, y, r, 0, Math.PI * 2);
    ctxH.fill();
  }

  const mapTex = new THREE.CanvasTexture(canvasMap);
  mapTex.wrapS = mapTex.wrapT = THREE.RepeatWrapping;
  mapTex.repeat.set(3, 3);

  const normalTex = createNormalMapFromHeight(canvasHeight, 1.5);
  normalTex.repeat.set(3, 3);

  const roughTex = new THREE.CanvasTexture(canvasRough);
  roughTex.wrapS = roughTex.wrapT = THREE.RepeatWrapping;
  roughTex.repeat.set(3, 3);

  return { mapTex, normalTex, roughTex };
}

// 7. Hand-Woven Washi Paper + Kumiko Lattice Texture
function createHandCraftedWashiTexture() {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createRadialGradient(size / 2, size / 2, 8, size / 2, size / 2, size * 0.6);
  grad.addColorStop(0, '#fff2c8');
  grad.addColorStop(0.5, '#ffbc58');
  grad.addColorStop(1, '#e5822a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  ctx.strokeStyle = 'rgba(255, 245, 215, 0.28)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 200; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const l = 8 + Math.random() * 20;
    const a = Math.random() * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l);
    ctx.stroke();
  }

  ctx.strokeStyle = 'rgba(50, 15, 8, 0.45)';
  ctx.lineWidth = 2.5;
  const step = size / 4;
  for (let i = 0; i <= size; i += step) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, size);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(size, i);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

// 8. Vermilion Celestial Moon Texture
function createHandCraftedMoonTexture() {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createRadialGradient(size * 0.44, size * 0.4, 20, size / 2, size / 2, size * 0.5);
  grad.addColorStop(0, '#ff4c38');
  grad.addColorStop(0.5, '#e0231c');
  grad.addColorStop(0.85, '#aa1610');
  grad.addColorStop(1, '#660805');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  for (let i = 0; i < 280; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = 5 + Math.random() * 26;
    const a = 0.04 + Math.random() * 0.12;
    ctx.fillStyle = Math.random() > 0.45 ? `rgba(60, 4, 2, ${a})` : `rgba(255, 150, 90, ${a * 0.8})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

// 9. Realistic Red Sakura Cherry Blossom Petal Texture & 3D Curved Geometry
function createSakuraPetalTexture() {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createRadialGradient(size * 0.5, size * 0.85, 10, size * 0.5, size * 0.45, size * 0.55);
  grad.addColorStop(0, '#e0231c');
  grad.addColorStop(0.4, '#ff3b30');
  grad.addColorStop(0.75, '#ff6272');
  grad.addColorStop(1, '#ff96a4');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  ctx.strokeStyle = 'rgba(255, 230, 240, 0.28)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 24; i++) {
    const angle = -Math.PI * 0.5 + (i - 12) * 0.06;
    const len = size * (0.42 + Math.random() * 0.35);
    ctx.beginPath();
    ctx.moveTo(size * 0.5, size * 0.88);
    ctx.quadraticCurveTo(
      size * 0.5 + Math.cos(angle) * (len * 0.5) + (Math.random() - 0.5) * 10,
      size * 0.88 + Math.sin(angle) * (len * 0.5),
      size * 0.5 + Math.cos(angle) * len,
      size * 0.88 + Math.sin(angle) * len
    );
    ctx.stroke();
  }

  for (let i = 0; i < 250; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const a = Math.random() * 0.14;
    ctx.fillStyle = `rgba(255, 255, 255, ${a})`;
    ctx.fillRect(x, y, 1.5, 1.5);
  }

  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

function createSakuraPetalGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(0, -0.12);
  shape.bezierCurveTo(-0.065, -0.05, -0.115, 0.06, -0.085, 0.15);
  shape.bezierCurveTo(-0.05, 0.19, -0.015, 0.18, 0, 0.14);
  shape.bezierCurveTo(0.015, 0.18, 0.05, 0.19, 0.085, 0.15);
  shape.bezierCurveTo(0.115, 0.06, 0.065, -0.05, 0, -0.12);

  const geo = new THREE.ShapeGeometry(shape, 10);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = -Math.sin((y + 0.12) * 3.8) * 0.032 - (x * x) * 1.4;
    pos.setZ(i, z);
  }
  geo.computeVertexNormals();
  return geo;
}

// 10. Soft Circular Bioluminescent Firefly Sprite Texture
function createFireflySpriteTexture() {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createRadialGradient(size / 2, size / 2, 2, size / 2, size / 2, size / 2);
  grad.addColorStop(0, 'rgba(255, 255, 220, 1.0)');
  grad.addColorStop(0.18, 'rgba(255, 215, 80, 0.85)');
  grad.addColorStop(0.45, 'rgba(130, 235, 90, 0.42)');
  grad.addColorStop(0.75, 'rgba(60, 190, 70, 0.10)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

// 11. Cinematic Volumetric Moon Mist / Atmospheric Fog Shader
function createVolumetricMistPlane(width = 60, height = 30) {
  const geo = new THREE.PlaneGeometry(width, height);
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(0x304860) },
      uWarmColor: { value: new THREE.Color(0x5a3020) },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform float uTime;
      uniform vec3 uColor;
      uniform vec3 uWarmColor;
      void main() {
        float x = vUv.x * 4.0 + uTime * 0.04;
        float y = vUv.y * 2.0;
        float wave = sin(x) * cos(y * 3.0 + uTime * 0.06) * 0.5 + 0.5;
        float edgeFade = smoothstep(0.0, 0.3, vUv.x) * smoothstep(1.0, 0.7, vUv.x) *
                         smoothstep(0.0, 0.25, vUv.y) * smoothstep(1.0, 0.75, vUv.y);
        float alpha = wave * edgeFade * 0.18;
        vec3 col = mix(uColor, uWarmColor, smoothstep(0.3, 0.7, vUv.y));
        gl_FragColor = vec4(col, alpha);
      }
    `,
  });
  return new THREE.Mesh(geo, mat);
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function KageWorld() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // --- High Performance WebGL Renderer ---
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.32;

    // Cinematic Soft Shadow Mapping
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // --- Scene & Atmospheric Fog ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06090e, 0.015);

    // --- Camera (Outdoor Mountain Vista Coordinates) ---
    const camera = new THREE.PerspectiveCamera(
      46,
      window.innerWidth / window.innerHeight,
      0.1,
      160,
    );
    camera.position.set(0, 3.0, 18.0);

    // --- Synthesize True Normal Map PBR Textures (<20ms in memory) ---
    const pillarTextures = createHandCraftedPillarTextures();
    const engravedBeamTextures = createEngravedBeamTextures();
    const roofTileTextures = createHandCraftedRoofTileTextures();
    const floorTextures = createHandCraftedFloorTextures();
    const yakisugiTextures = createHandCraftedYakisugiTextures();
    const stoneTextures = createHandCraftedStoneTextures();
    const washiTex = createHandCraftedWashiTexture();
    const moonTex = createHandCraftedMoonTexture();
    const sakuraTex = createSakuraPetalTexture();
    const fireflyTex = createFireflySpriteTexture();

    // --- Cinematic Lighting Hierarchy ---
    const ambientLight = new THREE.AmbientLight(0x182432, 2.6);
    scene.add(ambientLight);

    // Cold Silvery Moonlight (Primary Key Light)
    const moonDirLight = new THREE.DirectionalLight(0xa5cbfa, 2.4);
    moonDirLight.position.set(16, 32, -8);
    moonDirLight.castShadow = true;
    moonDirLight.shadow.mapSize.width = 2048;
    moonDirLight.shadow.mapSize.height = 2048;
    moonDirLight.shadow.camera.near = 0.5;
    moonDirLight.shadow.camera.far = 80;
    moonDirLight.shadow.camera.left = -25;
    moonDirLight.shadow.camera.right = 25;
    moonDirLight.shadow.camera.top = 25;
    moonDirLight.shadow.camera.bottom = -25;
    moonDirLight.shadow.bias = -0.0004;
    scene.add(moonDirLight);

    // Natural Angular Sunlight/Moonlight Grazing Light (Rakes across Torii beam evenly)
    const beamGrazingLight = new THREE.DirectionalLight(0xffedd8, 1.35);
    beamGrazingLight.position.set(12, 18, 14);
    beamGrazingLight.target.position.set(0, 5.4, 4.0);
    scene.add(beamGrazingLight);
    scene.add(beamGrazingLight.target);

    // Vermilion Back-Rim Glow Light
    const vermilionLight = new THREE.DirectionalLight(0xff3322, 2.8);
    vermilionLight.position.set(-14, 24, -36);
    scene.add(vermilionLight);

    // Subtle Cyan Architectural Edge Fill Light (Accentuates Pagoda Roof Eaves)
    const edgeFillLight = new THREE.DirectionalLight(0x4088cc, 1.35);
    edgeFillLight.position.set(-18, 12, 10);
    scene.add(edgeFillLight);

    // --- Low-Lying Atmospheric Mountain Ground Mist ---
    const mistPlanes = [];
    const mist1 = createVolumetricMistPlane(50, 16);
    mist1.rotation.x = -Math.PI / 2;
    mist1.position.set(0, 0.35, 4.0);
    scene.add(mist1);
    mistPlanes.push(mist1);

    const mist2 = createVolumetricMistPlane(60, 20);
    mist2.rotation.x = -Math.PI / 2;
    mist2.position.set(-2, 0.6, -12.0);
    scene.add(mist2);
    mistPlanes.push(mist2);

    // --- True Tangent-Space PBR Materials ---
    const roofTileMat = new THREE.MeshStandardMaterial({
      color: 0x222e3c,
      map: roofTileTextures.mapTex,
      normalMap: roofTileTextures.normalTex,
      normalScale: new THREE.Vector2(1.1, 1.1),
      roughnessMap: roofTileTextures.roughTex,
      roughness: 0.52,
      metalness: 0.18,
    });

    const charredWoodMat = new THREE.MeshStandardMaterial({
      color: 0x1b232e,
      map: yakisugiTextures.mapTex,
      normalMap: yakisugiTextures.normalTex,
      normalScale: new THREE.Vector2(0.8, 0.8),
      roughnessMap: yakisugiTextures.roughTex,
      roughness: 0.76,
      metalness: 0.12,
    });

    const vermilionWoodMat = new THREE.MeshStandardMaterial({
      color: 0xe02820,
      map: pillarTextures.mapTex,
      normalMap: pillarTextures.normalTex,
      normalScale: new THREE.Vector2(0.75, 0.75),
      roughnessMap: pillarTextures.roughTex,
      roughness: 0.42,
      metalness: 0.22,
    });

    // Realistic Hand-Engraved "ANAITA PAL" Front Crossbeam Material (Urushi + Kinpaku)
    const engravedBeamMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: engravedBeamTextures.mapTex,
      normalMap: engravedBeamTextures.normalTex,
      normalScale: new THREE.Vector2(1.3, 1.3),
      roughnessMap: engravedBeamTextures.roughTex,
      roughness: 0.46,
      metalness: 0.28,
    });

    const stoneMat = new THREE.MeshStandardMaterial({
      color: 0x24303c,
      map: stoneTextures.mapTex,
      normalMap: stoneTextures.normalTex,
      normalScale: new THREE.Vector2(0.85, 0.85),
      roughnessMap: stoneTextures.roughTex,
      roughness: 0.84,
      metalness: 0.08,
    });

    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x202c38,
      map: floorTextures.mapTex,
      normalMap: floorTextures.normalTex,
      normalScale: new THREE.Vector2(0.9, 0.9),
      roughnessMap: floorTextures.roughTex,
      roughness: 0.74,
      metalness: 0.12,
    });

    const shojiGlowMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      map: washiTex,
      transparent: true,
      opacity: 0.95,
    });

    // --- 1. Vermilion Moon & Corona Halo ---
    const moonGroup = new THREE.Group();
    moonGroup.position.set(8.0, 16.0, -42);

    // Moon Core Sphere with Smooth Curvature
    const moonGeo = new THREE.SphereGeometry(5.0, 48, 48);
    const moonMat = new THREE.MeshBasicMaterial({
      map: moonTex,
      color: 0xff3b2f,
    });
    const moonMesh = new THREE.Mesh(moonGeo, moonMat);
    moonGroup.add(moonMesh);

    // Moon Outer Corona Glow Disk
    const coronaGeo = new THREE.PlaneGeometry(30, 30);
    const coronaMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uColor: { value: new THREE.Color(0xe0231c) },
        uInnerColor: { value: new THREE.Color(0xff7744) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform vec3 uColor;
        uniform vec3 uInnerColor;
        void main() {
          vec2 center = vUv - 0.5;
          float dist = length(center) * 2.0;
          if (dist > 1.0) discard;
          float alpha = pow(1.0 - dist, 2.0) * 0.82;
          vec3 col = mix(uInnerColor, uColor, smoothstep(0.08, 0.62, dist));
          gl_FragColor = vec4(col, alpha);
        }
      `,
    });
    const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
    coronaMesh.position.z = -0.1;
    moonGroup.add(coronaMesh);
    scene.add(moonGroup);

    // --- 2. Central Temple Castle Sanmon Pavilion ---
    function createSanmon(x, y, z, scale = 1, rotationY = 0) {
      const pavilion = new THREE.Group();
      pavilion.position.set(x, y, z);
      pavilion.scale.set(scale, scale, scale);
      pavilion.rotation.y = rotationY;

      // Stone Base Platform
      const baseGeo = new THREE.BoxGeometry(12, 1.0, 10);
      const base = new THREE.Mesh(baseGeo, stoneMat);
      base.position.y = 0.5;
      base.receiveShadow = true;
      base.castShadow = true;
      pavilion.add(base);

      // Grand Stone Steps Leading Up
      for (let i = 0; i < 6; i++) {
        const step = new THREE.Mesh(
          new THREE.BoxGeometry(7.5 - i * 0.5, 0.22, 1.2),
          stoneMat,
        );
        step.position.set(0, 0.11 + i * 0.18, 5.4 - i * 0.45);
        step.receiveShadow = true;
        step.castShadow = true;
        pavilion.add(step);
      }

      // Supporting Columns (Smooth 32-segment Cylinders with Naguri Normal Map)
      const colGeo = new THREE.CylinderGeometry(0.28, 0.28, 5.4, 32);
      const colPositions = [
        [-4.8, 3.5, -3.8], [0, 3.5, -3.8], [4.8, 3.5, -3.8],
        [-4.8, 3.5, 3.8],  [4.8, 3.5, 3.8],
        [-2.4, 3.5, 3.8],  [2.4, 3.5, 3.8]
      ];
      colPositions.forEach(([cx, cy, cz]) => {
        const col = new THREE.Mesh(colGeo, vermilionWoodMat);
        col.position.set(cx, cy, cz);
        col.castShadow = true;
        col.receiveShadow = true;
        pavilion.add(col);
      });

      // Inner Chamber
      const chamberGeo = new THREE.BoxGeometry(8.8, 4.6, 6.4);
      const chamber = new THREE.Mesh(chamberGeo, charredWoodMat);
      chamber.position.set(0, 3.3, -0.2);
      chamber.castShadow = true;
      chamber.receiveShadow = true;
      pavilion.add(chamber);

      // Glowing Shoji Screen Windows with Kumiko Lattice
      const shoji1 = new THREE.Mesh(new THREE.PlaneGeometry(3.0, 2.8), shojiGlowMat);
      shoji1.position.set(-2.2, 3.2, 3.02);
      const shoji2 = new THREE.Mesh(new THREE.PlaneGeometry(3.0, 2.8), shojiGlowMat);
      shoji2.position.set(2.2, 3.2, 3.02);
      pavilion.add(shoji1, shoji2);

      // Lower Pagoda Roof (Textured Ceramic Ibushi-Kawara Hongawara Tiles)
      const roof1Geo = new THREE.ConeGeometry(9.8, 2.4, 4);
      const roof1 = new THREE.Mesh(roof1Geo, roofTileMat);
      roof1.position.set(0, 6.8, 0);
      roof1.rotation.y = Math.PI / 4;
      roof1.castShadow = true;
      roof1.receiveShadow = true;
      pavilion.add(roof1);

      // Upper Pagoda Roof Peak (Textured Ceramic Ibushi-Kawara Hongawara Tiles)
      const roof2Geo = new THREE.ConeGeometry(6.8, 2.2, 4);
      const roof2 = new THREE.Mesh(roof2Geo, roofTileMat);
      roof2.position.set(0, 8.8, 0);
      roof2.rotation.y = Math.PI / 4;
      roof2.castShadow = true;
      roof2.receiveShadow = true;
      pavilion.add(roof2);

      // Roof Finial Spire
      const spire = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.22, 2.4, 16),
        vermilionWoodMat,
      );
      spire.position.set(0, 10.8, 0);
      spire.castShadow = true;
      pavilion.add(spire);

      scene.add(pavilion);
      return pavilion;
    }

    createSanmon(0, 0, -20.0, 1.25, 0);
    createSanmon(-14.0, 2.0, -36.0, 1.15, 0.4);

    // --- 3. Torii Gate on the Approach ---
    function createTorii(x, y, z, scale = 1, rotationY = 0) {
      const torii = new THREE.Group();
      torii.position.set(x, y, z);
      torii.scale.set(scale, scale, scale);
      torii.rotation.y = rotationY;

      // Smooth 32-segment Vermilion Pillars
      const pillarGeo = new THREE.CylinderGeometry(0.26, 0.3, 5.6, 32);
      const leftPillar = new THREE.Mesh(pillarGeo, vermilionWoodMat);
      leftPillar.position.set(-2.5, 2.8, 0);
      leftPillar.castShadow = true;
      leftPillar.receiveShadow = true;

      const rightPillar = new THREE.Mesh(pillarGeo, vermilionWoodMat);
      rightPillar.position.set(2.5, 2.8, 0);
      rightPillar.castShadow = true;
      rightPillar.receiveShadow = true;

      // Smooth Stone Plinths
      const plinthGeo = new THREE.CylinderGeometry(0.4, 0.46, 0.5, 24);
      const leftPlinth = new THREE.Mesh(plinthGeo, stoneMat);
      leftPlinth.position.set(-2.5, 0.25, 0);
      leftPlinth.receiveShadow = true;
      leftPlinth.castShadow = true;

      const rightPlinth = new THREE.Mesh(plinthGeo, stoneMat);
      rightPlinth.position.set(2.5, 0.25, 0);
      rightPlinth.receiveShadow = true;
      rightPlinth.castShadow = true;

      // Top Crossbeam with Engraved "ANAITA PAL" on Front Torii Gate
      const topBeamGeo = new THREE.BoxGeometry(7.2, 0.45, 0.58);
      let beamMaterial = vermilionWoodMat;

      // If this is the front Torii gate facing the approach, apply the hand-engraved "ANAITA PAL" material to the front face (+Z)
      if (z > 0) {
        beamMaterial = [
          vermilionWoodMat, // +X right
          vermilionWoodMat, // -X left
          vermilionWoodMat, // +Y top
          vermilionWoodMat, // -Y bottom
          engravedBeamMat,  // +Z front face with engraved "ANAITA PAL"
          vermilionWoodMat, // -Z back
        ];
      }

      const topBeam = new THREE.Mesh(topBeamGeo, beamMaterial);
      topBeam.position.set(0, 5.4, 0);
      topBeam.castShadow = true;
      topBeam.receiveShadow = true;

      // Ceramic Tile Cap Top Roof (Kawara Tiles)
      const roofCapGeo = new THREE.BoxGeometry(7.4, 0.14, 0.68);
      const roofCap = new THREE.Mesh(roofCapGeo, roofTileMat);
      roofCap.position.set(0, 5.68, 0);
      roofCap.castShadow = true;
      roofCap.receiveShadow = true;

      // Secondary Tie Beam
      const tieBeamGeo = new THREE.BoxGeometry(6.2, 0.3, 0.38);
      const tieBeam = new THREE.Mesh(tieBeamGeo, charredWoodMat);
      tieBeam.position.set(0, 4.45, 0);
      tieBeam.castShadow = true;
      tieBeam.receiveShadow = true;

      // Central Tablet
      const tabletGeo = new THREE.BoxGeometry(0.4, 0.7, 0.14);
      const tablet = new THREE.Mesh(tabletGeo, charredWoodMat);
      tablet.position.set(0, 4.95, 0);
      tablet.castShadow = true;

      torii.add(leftPillar, rightPillar, leftPlinth, rightPlinth, topBeam, roofCap, tieBeam, tablet);
      scene.add(torii);
      return torii;
    }

    createTorii(0, 0, 4.0, 1.15, 0);
    createTorii(2.0, 0.8, -8.0, 1.25, 0.1);
    createTorii(-2.2, 1.8, -16.0, 1.35, -0.12);

    // --- 4. Stone Lanterns (Tōrō) with Glowing Fire ---
    const lanterns = [];
    function createLantern(x, y, z, scale = 0.85) {
      const lantern = new THREE.Group();
      lantern.position.set(x, y, z);
      lantern.scale.set(scale, scale, scale);

      // Base
      const kiso = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.48, 0.42, 16), stoneMat);
      kiso.position.y = 0.21;
      kiso.castShadow = true;
      kiso.receiveShadow = true;

      // Post
      const sao = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.24, 1.25, 16), stoneMat);
      sao.position.y = 0.95;
      sao.castShadow = true;
      sao.receiveShadow = true;

      // Middle Platform
      const chudai = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.24, 0.9), stoneMat);
      chudai.position.y = 1.62;
      chudai.castShadow = true;
      chudai.receiveShadow = true;

      // Light Chamber with Washi Paper Walls
      const hibukuro = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 0.7), charredWoodMat);
      hibukuro.position.y = 2.05;
      hibukuro.castShadow = true;

      // Inner glowing core
      const fireCore = new THREE.Mesh(
        new THREE.SphereGeometry(0.26, 16, 16),
        new THREE.MeshBasicMaterial({ map: washiTex, color: 0xffaa44 }),
      );
      fireCore.position.y = 2.05;

      // Roof Canopy (Ceramic Kawara Stone Tile)
      const kasa = new THREE.Mesh(new THREE.ConeGeometry(1.0, 0.48, 4), roofTileMat);
      kasa.position.y = 2.58;
      kasa.rotation.y = Math.PI / 4;
      kasa.castShadow = true;
      kasa.receiveShadow = true;

      // Jewel Top
      const hoju = new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 12), stoneMat);
      hoju.position.y = 2.9;
      hoju.castShadow = true;

      lantern.add(kiso, sao, chudai, hibukuro, fireCore, kasa, hoju);

      // Warm point light with soft shadow illumination
      const pLight = new THREE.PointLight(0xff8833, 2.2, 12, 1.5);
      pLight.position.set(x, y + 2.05 * scale, z);
      scene.add(pLight);

      scene.add(lantern);
      lanterns.push({ group: lantern, light: pLight, baseIntensity: 2.2, fireCore });
      return lantern;
    }

    createLantern(-3.2, 0, 11.0, 0.88);
    createLantern(3.2, 0, 11.0, 0.88);
    createLantern(-3.0, 0, 4.5, 0.88);
    createLantern(3.0, 0, 4.5, 0.88);
    createLantern(-3.4, 0.4, -2.5, 0.92);
    createLantern(3.4, 0.4, -2.5, 0.92);
    createLantern(-3.8, 0.8, -9.5, 0.98);
    createLantern(3.8, 0.8, -9.5, 0.98);
    createLantern(-2.6, 1.6, -16.0, 1.05);
    createLantern(2.6, 1.6, -16.0, 1.05);

    // --- 5. Ground Terrain & Beveled Stone Floor Path ---
    const groundGeo = new THREE.PlaneGeometry(90, 140, 32, 32);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x070b10,
      map: floorTextures.mapTex,
      normalMap: floorTextures.normalTex,
      normalScale: new THREE.Vector2(0.6, 0.6),
      roughness: 0.92,
      metalness: 0.06,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(0, -0.05, -20);
    ground.receiveShadow = true;
    scene.add(ground);

    for (let i = 0; i < 20; i++) {
      const pathTile = new THREE.Mesh(
        new THREE.BoxGeometry(2.6, 0.09, 1.5),
        floorMat,
      );
      pathTile.position.set(
        Math.sin(i * 0.25) * 0.2,
        0.02,
        14 - i * 1.8,
      );
      pathTile.receiveShadow = true;
      pathTile.castShadow = true;
      scene.add(pathTile);
    }

    // --- 6. Realistic 3D Sakura Petals (Red + Golden Amber Layers) ---
    const petalCount = 500;
    const petalGeo = createSakuraPetalGeometry();

    const sakuraColors = [
      new THREE.Color(0xe0231c), // Vibrant Crimson Red
      new THREE.Color(0xff2d20), // Vermilion Red
      new THREE.Color(0xff4a3a), // Sunset Scarlet
      new THREE.Color(0xd61a35), // Ruby Carmine
      new THREE.Color(0xffd580), // Warm Golden Amber Blossom
      new THREE.Color(0xfff0d8), // Soft Ivory-White Sakura
      new THREE.Color(0xffb870), // Peach Gold Flower
    ];

    const instancedPetals = new THREE.InstancedMesh(
      petalGeo,
      new THREE.MeshStandardMaterial({
        map: sakuraTex,
        color: 0xffffff,
        side: THREE.DoubleSide,
        roughness: 0.44,
        metalness: 0.06,
        transparent: true,
        alphaTest: 0.03,
      }),
      petalCount,
    );

    const dummy = new THREE.Object3D();
    const petalData = [];

    for (let i = 0; i < petalCount; i++) {
      const x = (Math.random() - 0.5) * 38;
      const y = Math.random() * 22 + 0.5;
      const z = Math.random() * -60 + 16;
      const rx = Math.random() * Math.PI * 2;
      const ry = Math.random() * Math.PI * 2;
      const rz = Math.random() * Math.PI * 2;
      const scale = 0.85 + Math.random() * 0.45;
      const speedY = 0.007 + Math.random() * 0.014;
      const driftX = (Math.random() - 0.5) * 0.007;
      const swayAmp = 0.01 + Math.random() * 0.02;
      const flutterFreq = 1.0 + Math.random() * 1.8;
      const phase = Math.random() * Math.PI * 2;
      const rotSpeedX = (Math.random() - 0.5) * 0.025;
      const rotSpeedY = (Math.random() - 0.5) * 0.035;
      const rotSpeedZ = (Math.random() - 0.5) * 0.02;

      dummy.position.set(x, y, z);
      dummy.rotation.set(rx, ry, rz);
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      instancedPetals.setMatrixAt(i, dummy.matrix);

      const color = sakuraColors[Math.floor(Math.random() * sakuraColors.length)];
      instancedPetals.setColorAt(i, color);

      petalData.push({
        x, y, z, rx, ry, rz, scale,
        speedY, driftX, swayAmp, flutterFreq, phase,
        rotSpeedX, rotSpeedY, rotSpeedZ,
      });
    }
    instancedPetals.instanceMatrix.needsUpdate = true;
    scene.add(instancedPetals);

    // --- 7. Bioluminescent Fireflies / Tiny Glowing Insects (Hotaru 萤) ---
    const fireflyCount = 180;
    const fireflyPositions = new Float32Array(fireflyCount * 3);
    const fireflyData = [];

    for (let i = 0; i < fireflyCount; i++) {
      const x = (Math.random() - 0.5) * 26;
      const y = Math.random() * 12 + 0.3;
      const z = Math.random() * -45 + 12;
      fireflyPositions[i * 3] = x;
      fireflyPositions[i * 3 + 1] = y;
      fireflyPositions[i * 3 + 2] = z;

      fireflyData.push({
        baseSpeedY: 0.002 + Math.random() * 0.005,
        hoverSpeedX: 0.6 + Math.random() * 1.2,
        hoverSpeedY: 1.0 + Math.random() * 1.6,
        phaseX: Math.random() * Math.PI * 2,
        phaseY: Math.random() * Math.PI * 2,
        phaseZ: Math.random() * Math.PI * 2,
      });
    }

    const fireflyGeo = new THREE.BufferGeometry();
    fireflyGeo.setAttribute('position', new THREE.BufferAttribute(fireflyPositions, 3));

    const fireflyMat = new THREE.PointsMaterial({
      map: fireflyTex,
      color: 0xffffff,
      size: 0.34,
      transparent: true,
      opacity: 0.92,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const fireflyPoints = new THREE.Points(fireflyGeo, fireflyMat);
    scene.add(fireflyPoints);

    // --- 8. Spline Camera Path across Chapters (Exact Coordinates) ---
    const splinePoints = [
      { p: 0.0,  pos: new THREE.Vector3(0, 3.2, 19.5),     look: new THREE.Vector3(0, 3.4, -20.0) },
      { p: 0.16, pos: new THREE.Vector3(0, 3.0, 18.0),     look: new THREE.Vector3(0, 3.4, -20.0) },
      { p: 0.28, pos: new THREE.Vector3(0.6, 2.6, 10.0),   look: new THREE.Vector3(0, 3.2, -18.0) },
      { p: 0.40, pos: new THREE.Vector3(-1.2, 2.2, 2.5),   look: new THREE.Vector3(0.3, 2.8, -16.0) },
      { p: 0.54, pos: new THREE.Vector3(1.2, 1.9, -4.5),   look: new THREE.Vector3(-0.4, 2.6, -18.0) },
      { p: 0.68, pos: new THREE.Vector3(-0.8, 2.4, -10.5), look: new THREE.Vector3(0.2, 3.0, -22.0) },
      { p: 0.80, pos: new THREE.Vector3(1.0, 3.2, -15.5),  look: new THREE.Vector3(-0.2, 3.4, -26.0) },
      { p: 0.90, pos: new THREE.Vector3(-0.6, 3.6, -19.5), look: new THREE.Vector3(0, 3.8, -30.0) },
      { p: 1.0,  pos: new THREE.Vector3(0, 4.2, -23.5),    look: new THREE.Vector3(0, 4.8, -42.0) },
    ];

    function getInterpolatedCamera(progress) {
      const clamped = Math.max(0, Math.min(1, progress));
      let idx = 0;
      for (let i = 0; i < splinePoints.length - 1; i++) {
        if (clamped >= splinePoints[i].p && clamped <= splinePoints[i + 1].p) {
          idx = i;
          break;
        }
      }
      const p0 = splinePoints[idx];
      const p1 = splinePoints[idx + 1] || p0;
      const span = p1.p - p0.p || 1;
      const localT = Math.max(0, Math.min(1, (clamped - p0.p) / span));
      const smoothT = localT * localT * (3 - 2 * localT);

      const targetPos = new THREE.Vector3().lerpVectors(p0.pos, p1.pos, smoothT);
      const targetLook = new THREE.Vector3().lerpVectors(p0.look, p1.look, smoothT);
      return { targetPos, targetLook };
    }

    // --- Interaction & RAF ---
    let scrollProgress = 0;
    let targetScrollProgress = 0;
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const currentCameraPos = camera.position.clone();
    const currentCameraLook = new THREE.Vector3(0, 3.4, -20.0);

    const onScroll = () => {
      const totalH = document.documentElement.scrollHeight - window.innerHeight;
      targetScrollProgress = totalH > 0 ? window.scrollY / totalH : 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const onMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // --- Mobile Gyroscope (DeviceOrientation) & Touch Parallax ---
    let gyroActive = false;

    const onDeviceOrientation = (e) => {
      if (e.gamma !== null && e.beta !== null) {
        gyroActive = true;
        // Gamma: roll tilt left/right (-28 to +28 deg mapped to [-1, 1])
        const normX = Math.max(-1, Math.min(1, e.gamma / 28));
        // Beta: pitch tilt forward/backward (calibrated around natural 50 deg upright hand-holding angle)
        const normY = Math.max(-1, Math.min(1, (e.beta - 50) / 25));

        mouse.targetX = normX;
        mouse.targetY = -normY;
      }
    };

    // Auto-request iOS 13+ device orientation permission on first touch interaction
    const requestOrientationPermission = () => {
      if (
        typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function'
      ) {
        DeviceOrientationEvent.requestPermission()
          .then((permissionState) => {
            if (permissionState === 'granted') {
              window.addEventListener('deviceorientation', onDeviceOrientation, { passive: true });
            }
          })
          .catch(() => {});
      }
    };

    // Standard Android & Chromium orientation listener (works automatically)
    window.addEventListener('deviceorientation', onDeviceOrientation, { passive: true });
    window.addEventListener('touchstart', requestOrientationPermission, { passive: true, once: true });

    // Touch Swipe fallback for devices without motion sensors
    let touchStartX = 0;
    let touchStartY = 0;
    const onTouchStart = (e) => {
      if (e.touches && e.touches.length > 0) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };
    const onTouchMove = (e) => {
      if (!gyroActive && e.touches && e.touches.length > 0) {
        const deltaX = (e.touches[0].clientX - touchStartX) / window.innerWidth;
        const deltaY = (e.touches[0].clientY - touchStartY) / window.innerHeight;
        mouse.targetX = Math.max(-1, Math.min(1, deltaX * 3.0));
        mouse.targetY = Math.max(-1, Math.min(1, -deltaY * 3.0));
      }
    };
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      scrollProgress += (targetScrollProgress - scrollProgress) * (1 - Math.exp(-8 * delta));
      mouse.x += (mouse.targetX - mouse.x) * (1 - Math.exp(-6 * delta));
      mouse.y += (mouse.targetY - mouse.y) * (1 - Math.exp(-6 * delta));

      const { targetPos, targetLook } = getInterpolatedCamera(scrollProgress);

      const parallaxPos = targetPos.clone().add(
        new THREE.Vector3(mouse.x * 0.38, mouse.y * 0.24, 0),
      );
      const parallaxLook = targetLook.clone().add(
        new THREE.Vector3(mouse.x * 0.48, mouse.y * 0.32, 0),
      );

      currentCameraPos.lerp(parallaxPos, 1 - Math.exp(-7 * delta));
      currentCameraLook.lerp(parallaxLook, 1 - Math.exp(-7 * delta));

      camera.position.copy(currentCameraPos);
      camera.lookAt(currentCameraLook);

      // Low-lying mountain ground mist gentle drift
      mistPlanes.forEach((mp) => {
        if (mp.material.uniforms) {
          mp.material.uniforms.uTime.value = elapsed;
        }
      });

      lanterns.forEach((l, i) => {
        const flicker = Math.sin(elapsed * 7.5 + i * 2.1) * 0.25 + Math.cos(elapsed * 13.0 + i) * 0.15;
        l.light.intensity = l.baseIntensity + flicker;
      });

      const moonPulse = 1.0 + Math.sin(elapsed * 0.6) * 0.025;
      moonGroup.scale.set(moonPulse, moonPulse, moonPulse);

      // Realistic Sakura Petal Flutter & Tumbling Physics
      for (let i = 0; i < petalCount; i++) {
        const d = petalData[i];

        d.y -= d.speedY;
        d.x += Math.sin(elapsed * d.flutterFreq + d.phase) * d.swayAmp + d.driftX;
        d.z += Math.cos(elapsed * (d.flutterFreq * 0.7) + d.phase) * (d.swayAmp * 0.6);

        d.rx += d.rotSpeedX + Math.sin(elapsed * 1.6 + i) * 0.008;
        d.ry += d.rotSpeedY;
        d.rz += d.rotSpeedZ + Math.cos(elapsed * 1.4 + i) * 0.012;

        if (d.y < -0.2) {
          d.y = 19 + Math.random() * 3;
          d.x = (Math.random() - 0.5) * 38;
          d.z = Math.random() * -60 + 16;
        }

        dummy.position.set(d.x, d.y, d.z);
        dummy.rotation.set(d.rx, d.ry, d.rz);
        dummy.scale.set(d.scale, d.scale, d.scale);
        dummy.updateMatrix();
        instancedPetals.setMatrixAt(i, dummy.matrix);
      }
      instancedPetals.instanceMatrix.needsUpdate = true;

      // Bioluminescent Fireflies / Tiny Insects Flight & Breathing Glow
      const posAttr = fireflyGeo.attributes.position;
      for (let i = 0; i < fireflyCount; i++) {
        const f = fireflyData[i];
        let x = posAttr.getX(i);
        let y = posAttr.getY(i);
        let z = posAttr.getZ(i);

        y += Math.sin(elapsed * f.hoverSpeedY + f.phaseY) * 0.005 + f.baseSpeedY;
        x += Math.cos(elapsed * f.hoverSpeedX + f.phaseX) * 0.007;
        z += Math.sin(elapsed * (f.hoverSpeedX * 0.8) + f.phaseZ) * 0.007;

        if (y > 14) {
          y = 0.3 + Math.random() * 0.8;
          x = (Math.random() - 0.5) * 26;
          z = Math.random() * -45 + 12;
        }
        posAttr.setX(i, x);
        posAttr.setY(i, y);
        posAttr.setZ(i, z);
      }
      posAttr.needsUpdate = true;

      fireflyMat.opacity = 0.78 + Math.sin(elapsed * 2.2) * 0.18;
      fireflyMat.size = 0.32 + Math.sin(elapsed * 3.0) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('deviceorientation', onDeviceOrientation);
      window.removeEventListener('touchstart', requestOrientationPermission);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', onResize);

      // Clean texture & geometry disposal
      pillarTextures.mapTex.dispose();
      pillarTextures.normalTex.dispose();
      pillarTextures.roughTex.dispose();
      engravedBeamTextures.mapTex.dispose();
      engravedBeamTextures.normalTex.dispose();
      engravedBeamTextures.roughTex.dispose();
      roofTileTextures.mapTex.dispose();
      roofTileTextures.normalTex.dispose();
      roofTileTextures.roughTex.dispose();
      floorTextures.mapTex.dispose();
      floorTextures.normalTex.dispose();
      floorTextures.roughTex.dispose();
      yakisugiTextures.mapTex.dispose();
      yakisugiTextures.normalTex.dispose();
      yakisugiTextures.roughTex.dispose();
      stoneTextures.mapTex.dispose();
      stoneTextures.normalTex.dispose();
      stoneTextures.roughTex.dispose();
      washiTex.dispose();
      moonTex.dispose();
      sakuraTex.dispose();
      fireflyTex.dispose();
      petalGeo.dispose();
      fireflyGeo.dispose();
      mistPlanes.forEach((mp) => {
        mp.geometry.dispose();
        mp.material.dispose();
      });

      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="gl"
      data-testid="hero-canvas"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}
