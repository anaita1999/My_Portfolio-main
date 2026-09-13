import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function NexusCore() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 480;
    const height = container.clientHeight || 520;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for all core elements
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central Pulsing Plasma Sphere
    const coreGeo = new THREE.IcosahedronGeometry(1.3, 3);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xff6b00,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // Inner glowing sphere
    const innerGeo = new THREE.SphereGeometry(0.9, 24, 24);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xffa000,
      transparent: true,
      opacity: 0.35,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerMesh);

    // 2. Swarm Particle Cloud (800 vertices)
    const particleCount = 700;
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0xff6b00);
    const c2 = new THREE.Color(0x00e5ff);
    const c3 = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.0 + Math.random() * 1.5;

      const sinPhi = Math.sin(phi);
      posArray[i * 3] = r * sinPhi * Math.cos(theta);
      posArray[i * 3 + 1] = r * sinPhi * Math.sin(theta);
      posArray[i * 3 + 2] = r * Math.cos(phi);

      const mixC = Math.random() > 0.6 ? c1 : (Math.random() > 0.5 ? c2 : c3);
      colorArray[i * 3] = mixC.r;
      colorArray[i * 3 + 1] = mixC.g;
      colorArray[i * 3 + 2] = mixC.b;
    }

    const partGeo = new THREE.BufferGeometry();
    partGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    partGeo.setAttribute("color", new THREE.BufferAttribute(colorArray, 3));

    const partMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(partGeo, partMat);
    mainGroup.add(particleSystem);

    // 3. Orbital Gyroscopic Rings
    const createRing = (radius, tube, color, rotX, rotY) => {
      const rGeo = new THREE.TorusGeometry(radius, tube, 16, 100);
      const rMat = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.6,
        wireframe: true,
      });
      const ring = new THREE.Mesh(rGeo, rMat);
      ring.rotation.x = rotX;
      ring.rotation.y = rotY;
      mainGroup.add(ring);
      return ring;
    };

    const ring1 = createRing(2.5, 0.015, 0xff6b00, Math.PI / 4, 0);
    const ring2 = createRing(2.8, 0.012, 0x00e5ff, -Math.PI / 3, Math.PI / 6);
    const ring3 = createRing(3.1, 0.01, 0xffa000, Math.PI / 6, -Math.PI / 4);

    // 4. 5 Department Agent Satellite Nodes
    const agentNodes = [];
    const agentColors = [0xff6b00, 0x00e5ff, 0x34d399, 0xffa000, 0xffffff];
    for (let i = 0; i < 5; i++) {
      const nodeGeo = new THREE.SphereGeometry(0.12, 16, 16);
      const nodeMat = new THREE.MeshBasicMaterial({
        color: agentColors[i],
        wireframe: false,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      
      // Halo around node
      const haloGeo = new THREE.RingGeometry(0.16, 0.22, 24);
      const haloMat = new THREE.MeshBasicMaterial({
        color: agentColors[i],
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      nodeMesh.add(haloMesh);

      mainGroup.add(nodeMesh);
      agentNodes.push({ mesh: nodeMesh, angle: (i * (Math.PI * 2)) / 5, radius: 2.6 + (i % 2) * 0.4, speed: 0.4 + i * 0.08 });
    }

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.6;
      targetY = y * 0.6;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      mainGroup.rotation.y = elapsedTime * 0.2 + mouseX;
      mainGroup.rotation.x = Math.sin(elapsedTime * 0.15) * 0.15 + mouseY;

      // Core pulsing
      const pulse = 1 + Math.sin(elapsedTime * 3) * 0.08;
      coreMesh.scale.set(pulse, pulse, pulse);
      innerMesh.scale.set(pulse * 0.95, pulse * 0.95, pulse * 0.95);
      coreMesh.rotation.y = -elapsedTime * 0.4;
      coreMesh.rotation.z = elapsedTime * 0.2;

      // Rings rotation
      ring1.rotation.z = elapsedTime * 0.3;
      ring2.rotation.z = -elapsedTime * 0.25;
      ring3.rotation.z = elapsedTime * 0.2;

      // Particles drift
      particleSystem.rotation.y = -elapsedTime * 0.08;

      // Agent satellites orbit
      agentNodes.forEach((node, idx) => {
        const a = node.angle + elapsedTime * node.speed * 0.6;
        node.mesh.position.x = Math.cos(a) * node.radius;
        node.mesh.position.y = Math.sin(a * 1.5) * 0.8;
        node.mesh.position.z = Math.sin(a) * node.radius;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "auto",
      }}
    />
  );
}
