import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function KageWorld() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // --- Renderer Setup ---
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // --- Scene & Crisp Atmospheric Fog ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070a, 0.014);

    // --- Camera (Outdoor Mountain Approach Vista) ---
    const camera = new THREE.PerspectiveCamera(
      46,
      window.innerWidth / window.innerHeight,
      0.1,
      160,
    );
    camera.position.set(0, 3.0, 18.0);

    // --- Vibrant Cinematic Lighting ---
    const ambientLight = new THREE.AmbientLight(0x1c2836, 2.6);
    scene.add(ambientLight);

    // Cold Silvery Moonlight
    const moonDirLight = new THREE.DirectionalLight(0xa5cbfa, 2.0);
    moonDirLight.position.set(16, 32, -8);
    scene.add(moonDirLight);

    // Vermilion Back-Rim Glow Light
    const vermilionLight = new THREE.DirectionalLight(0xff3322, 2.8);
    vermilionLight.position.set(-14, 24, -36);
    scene.add(vermilionLight);

    // --- Procedural Materials (Vibrant & Sharp) ---
    const charredWoodMat = new THREE.MeshStandardMaterial({
      color: 0x18202a,
      roughness: 0.75,
      metalness: 0.15,
    });

    const vermilionWoodMat = new THREE.MeshStandardMaterial({
      color: 0xe02820,
      roughness: 0.5,
      metalness: 0.2,
    });

    const stoneMat = new THREE.MeshStandardMaterial({
      color: 0x222c36,
      roughness: 0.85,
      metalness: 0.08,
    });

    const shojiGlowMat = new THREE.MeshBasicMaterial({
      color: 0xffb355,
      transparent: true,
      opacity: 0.92,
    });

    // --- 1. Vermilion Moon & Corona Halo ---
    const moonGroup = new THREE.Group();
    moonGroup.position.set(8.0, 16.0, -42);

    // Moon Core Sphere
    const moonGeo = new THREE.SphereGeometry(5.0, 36, 36);
    const moonMat = new THREE.MeshBasicMaterial({
      color: 0xff2418,
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
      pavilion.add(base);

      // Grand Stone Steps Leading Up
      for (let i = 0; i < 6; i++) {
        const step = new THREE.Mesh(
          new THREE.BoxGeometry(7.5 - i * 0.5, 0.22, 1.2),
          stoneMat,
        );
        step.position.set(0, 0.11 + i * 0.18, 5.4 - i * 0.45);
        pavilion.add(step);
      }

      // Supporting Columns
      const colGeo = new THREE.CylinderGeometry(0.28, 0.28, 5.4, 16);
      const colPositions = [
        [-4.8, 3.5, -3.8], [0, 3.5, -3.8], [4.8, 3.5, -3.8],
        [-4.8, 3.5, 3.8],  [4.8, 3.5, 3.8],
        [-2.4, 3.5, 3.8],  [2.4, 3.5, 3.8]
      ];
      colPositions.forEach(([cx, cy, cz]) => {
        const col = new THREE.Mesh(colGeo, vermilionWoodMat);
        col.position.set(cx, cy, cz);
        pavilion.add(col);
      });

      // Inner Chamber
      const chamberGeo = new THREE.BoxGeometry(8.8, 4.6, 6.4);
      const chamber = new THREE.Mesh(chamberGeo, charredWoodMat);
      chamber.position.set(0, 3.3, -0.2);
      pavilion.add(chamber);

      // Glowing Shoji Screen Windows
      const shoji1 = new THREE.Mesh(new THREE.PlaneGeometry(3.0, 2.8), shojiGlowMat);
      shoji1.position.set(-2.2, 3.2, 3.02);
      const shoji2 = new THREE.Mesh(new THREE.PlaneGeometry(3.0, 2.8), shojiGlowMat);
      shoji2.position.set(2.2, 3.2, 3.02);
      pavilion.add(shoji1, shoji2);

      // Lower Pagoda Roof
      const roof1Geo = new THREE.ConeGeometry(9.8, 2.4, 4);
      const roof1 = new THREE.Mesh(roof1Geo, charredWoodMat);
      roof1.position.set(0, 6.8, 0);
      roof1.rotation.y = Math.PI / 4;
      pavilion.add(roof1);

      // Upper Pagoda Roof Peak
      const roof2Geo = new THREE.ConeGeometry(6.8, 2.2, 4);
      const roof2 = new THREE.Mesh(roof2Geo, charredWoodMat);
      roof2.position.set(0, 8.8, 0);
      roof2.rotation.y = Math.PI / 4;
      pavilion.add(roof2);

      // Roof Finial Spire
      const spire = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.22, 2.4, 8),
        vermilionWoodMat,
      );
      spire.position.set(0, 10.8, 0);
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

      // Pillars
      const pillarGeo = new THREE.CylinderGeometry(0.26, 0.3, 5.6, 18);
      const leftPillar = new THREE.Mesh(pillarGeo, vermilionWoodMat);
      leftPillar.position.set(-2.5, 2.8, 0);
      const rightPillar = new THREE.Mesh(pillarGeo, vermilionWoodMat);
      rightPillar.position.set(2.5, 2.8, 0);

      // Plinths
      const plinthGeo = new THREE.CylinderGeometry(0.4, 0.46, 0.5, 14);
      const leftPlinth = new THREE.Mesh(plinthGeo, stoneMat);
      leftPlinth.position.set(-2.5, 0.25, 0);
      const rightPlinth = new THREE.Mesh(plinthGeo, stoneMat);
      rightPlinth.position.set(2.5, 0.25, 0);

      // Top Crossbeam
      const topBeamGeo = new THREE.BoxGeometry(7.2, 0.45, 0.58);
      const topBeam = new THREE.Mesh(topBeamGeo, vermilionWoodMat);
      topBeam.position.set(0, 5.4, 0);

      // Black Cap Top Roof
      const roofCapGeo = new THREE.BoxGeometry(7.4, 0.14, 0.68);
      const roofCap = new THREE.Mesh(roofCapGeo, charredWoodMat);
      roofCap.position.set(0, 5.68, 0);

      // Secondary Tie Beam
      const tieBeamGeo = new THREE.BoxGeometry(6.2, 0.3, 0.38);
      const tieBeam = new THREE.Mesh(tieBeamGeo, charredWoodMat);
      tieBeam.position.set(0, 4.45, 0);

      // Central Tablet
      const tabletGeo = new THREE.BoxGeometry(0.4, 0.7, 0.14);
      const tablet = new THREE.Mesh(tabletGeo, charredWoodMat);
      tablet.position.set(0, 4.95, 0);

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
      const kiso = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.48, 0.42, 8), stoneMat);
      kiso.position.y = 0.21;
      // Post
      const sao = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.24, 1.25, 8), stoneMat);
      sao.position.y = 0.95;
      // Middle Platform
      const chudai = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.24, 0.9), stoneMat);
      chudai.position.y = 1.62;
      // Light Chamber
      const hibukuro = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 0.7), charredWoodMat);
      hibukuro.position.y = 2.05;
      // Inner glowing core
      const fireCore = new THREE.Mesh(
        new THREE.SphereGeometry(0.26, 14, 14),
        new THREE.MeshBasicMaterial({ color: 0xffaa44 }),
      );
      fireCore.position.y = 2.05;
      // Roof
      const kasa = new THREE.Mesh(new THREE.ConeGeometry(1.0, 0.48, 4), stoneMat);
      kasa.position.y = 2.58;
      kasa.rotation.y = Math.PI / 4;
      // Jewel Top
      const hoju = new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 8), stoneMat);
      hoju.position.y = 2.9;

      lantern.add(kiso, sao, chudai, hibukuro, fireCore, kasa, hoju);

      // Warm point light
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

    // --- 5. Ground Terrain & Stone Path ---
    const groundGeo = new THREE.PlaneGeometry(90, 140, 32, 32);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x090e14,
      roughness: 0.92,
      metalness: 0.06,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(0, -0.05, -20);
    scene.add(ground);

    for (let i = 0; i < 20; i++) {
      const pathTile = new THREE.Mesh(
        new THREE.BoxGeometry(2.6, 0.09, 1.5),
        stoneMat,
      );
      pathTile.position.set(
        Math.sin(i * 0.25) * 0.2,
        0.02,
        14 - i * 1.8,
      );
      scene.add(pathTile);
    }

    // --- 6. Drifting Leaves & Sparks ---
    const leafCount = 420;
    const leafGeo = new THREE.PlaneGeometry(0.16, 0.2);
    const leafColors = [
      new THREE.Color(0xe0231c),
      new THREE.Color(0xff5a3c),
      new THREE.Color(0xc9a24a),
      new THREE.Color(0xff88a0),
    ];

    const instancedLeaves = new THREE.InstancedMesh(
      leafGeo,
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        roughness: 0.65,
      }),
      leafCount,
    );

    const dummy = new THREE.Object3D();
    const leafData = [];

    for (let i = 0; i < leafCount; i++) {
      const x = (Math.random() - 0.5) * 36;
      const y = Math.random() * 20 + 0.5;
      const z = Math.random() * -60 + 16;
      const rx = Math.random() * Math.PI;
      const ry = Math.random() * Math.PI;
      const rz = Math.random() * Math.PI;
      const speedY = 0.008 + Math.random() * 0.016;
      const driftX = (Math.random() - 0.5) * 0.006;
      const rotSpeedX = (Math.random() - 0.5) * 0.03;
      const rotSpeedY = (Math.random() - 0.5) * 0.03;

      dummy.position.set(x, y, z);
      dummy.rotation.set(rx, ry, rz);
      dummy.updateMatrix();
      instancedLeaves.setMatrixAt(i, dummy.matrix);

      const color = leafColors[Math.floor(Math.random() * leafColors.length)];
      instancedLeaves.setColorAt(i, color);

      leafData.push({ x, y, z, rx, ry, rz, speedY, driftX, rotSpeedX, rotSpeedY });
    }
    instancedLeaves.instanceMatrix.needsUpdate = true;
    scene.add(instancedLeaves);

    // Sparks
    const sparkCount = 280;
    const sparkPositions = new Float32Array(sparkCount * 3);
    const sparkData = [];

    for (let i = 0; i < sparkCount; i++) {
      const x = (Math.random() - 0.5) * 28;
      const y = Math.random() * 14 + 0.2;
      const z = Math.random() * -50 + 14;
      sparkPositions[i * 3] = x;
      sparkPositions[i * 3 + 1] = y;
      sparkPositions[i * 3 + 2] = z;
      sparkData.push({
        speedY: 0.004 + Math.random() * 0.012,
        wobbleSpeed: 0.8 + Math.random() * 1.5,
        offset: Math.random() * Math.PI * 2,
      });
    }

    const sparkGeo = new THREE.BufferGeometry();
    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));

    const sparkMat = new THREE.PointsMaterial({
      color: 0xffaa55,
      size: 0.2,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const sparkPoints = new THREE.Points(sparkGeo, sparkMat);
    scene.add(sparkPoints);

    // --- 7. Spline Camera Path across Chapters (Synced with Pinned Hero) ---
    const splinePoints = [
      { p: 0.0,  pos: new THREE.Vector3(0, 3.2, 19.5),     look: new THREE.Vector3(0, 3.4, -20.0) },  // Initial Vista (Pure Sanctuary)
      { p: 0.16, pos: new THREE.Vector3(0, 3.0, 18.0),     look: new THREE.Vector3(0, 3.4, -20.0) },  // Subtle dolly during pinned hero sequence
      { p: 0.28, pos: new THREE.Vector3(0.6, 2.6, 10.0),   look: new THREE.Vector3(0, 3.2, -18.0) },  // 01 About (Approach Path)
      { p: 0.40, pos: new THREE.Vector3(-1.2, 2.2, 2.5),   look: new THREE.Vector3(0.3, 2.8, -16.0) }, // 02 Skills (Torii Crossing)
      { p: 0.54, pos: new THREE.Vector3(1.2, 1.9, -4.5),   look: new THREE.Vector3(-0.4, 2.6, -18.0) },// 03 Projects (Gardens & Lanterns)
      { p: 0.68, pos: new THREE.Vector3(-0.8, 2.4, -10.5), look: new THREE.Vector3(0.2, 3.0, -22.0) }, // 04 Experience (Ascending Steps)
      { p: 0.80, pos: new THREE.Vector3(1.0, 3.2, -15.5),  look: new THREE.Vector3(-0.2, 3.4, -26.0) },// 05 Certifications (Veranda)
      { p: 0.90, pos: new THREE.Vector3(-0.6, 3.6, -19.5), look: new THREE.Vector3(0, 3.8, -30.0) },  // 06 Testimonials (Sanctum Hall)
      { p: 1.0,  pos: new THREE.Vector3(0, 4.2, -23.5),    look: new THREE.Vector3(0, 4.8, -42.0) },   // 07 Contact (Moonlit Summit)
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

      lanterns.forEach((l, i) => {
        const flicker = Math.sin(elapsed * 7.5 + i * 2.1) * 0.25 + Math.cos(elapsed * 13.0 + i) * 0.15;
        l.light.intensity = l.baseIntensity + flicker;
      });

      const moonPulse = 1.0 + Math.sin(elapsed * 0.6) * 0.025;
      moonGroup.scale.set(moonPulse, moonPulse, moonPulse);

      for (let i = 0; i < leafCount; i++) {
        const d = leafData[i];
        d.y -= d.speedY;
        d.x += Math.sin(elapsed * 0.8 + i) * 0.008 + d.driftX;
        d.rx += d.rotSpeedX;
        d.ry += d.rotSpeedY;

        if (d.y < -0.2) {
          d.y = 18 + Math.random() * 3;
          d.x = (Math.random() - 0.5) * 36;
        }

        dummy.position.set(d.x, d.y, d.z);
        dummy.rotation.set(d.rx, d.ry, d.rz);
        dummy.updateMatrix();
        instancedLeaves.setMatrixAt(i, dummy.matrix);
      }
      instancedLeaves.instanceMatrix.needsUpdate = true;

      const posAttr = sparkGeo.attributes.position;
      for (let i = 0; i < sparkCount; i++) {
        const s = sparkData[i];
        let y = posAttr.getY(i);
        let x = posAttr.getX(i);
        y += s.speedY;
        x += Math.sin(elapsed * s.wobbleSpeed + s.offset) * 0.005;

        if (y > 14) {
          y = 0.2 + Math.random() * 0.5;
          x = (Math.random() - 0.5) * 28;
        }
        posAttr.setY(i, y);
        posAttr.setX(i, x);
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
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
