import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { HERO } from '@/constants/testIds';

// Particle field with mouse parallax
function ParticleField() {
  const points = useRef(null);
  const shader = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  const { geometry, material } = useMemo(() => {
    const count = 4200;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const cA = new THREE.Color('#00F3FF');
    const cB = new THREE.Color('#FF00E5');
    const cC = new THREE.Color('#7C5CFF');
    for (let i = 0; i < count; i++) {
      const r = 1.6 + Math.pow(Math.random(), 0.6) * 5.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.55;
      positions[i * 3 + 2] = r * Math.cos(phi);
      sizes[i] = Math.random() * 2 + 0.6;
      const mix = Math.random();
      const col = mix < 0.5 ? cA.clone().lerp(cB, mix * 2) : cB.clone().lerp(cC, (mix - 0.5) * 2);
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geom.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
      vertexShader: `
        attribute float aSize;
        attribute vec3 aColor;
        uniform float uTime;
        uniform float uPixelRatio;
        varying vec3 vColor;
        void main() {
          vec3 p = position;
          float t = uTime * 0.25;
          p.x += sin(t + p.z * 0.6) * 0.06;
          p.y += cos(t + p.x * 0.5) * 0.06;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = aSize * uPixelRatio * (240.0 / -mv.z);
          vColor = aColor;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv);
          float a = smoothstep(0.5, 0.0, d);
          a *= a;
          gl_FragColor = vec4(vColor, a);
        }
      `,
    });
    shader.current = mat;
    return { geometry: geom, material: mat };
  }, []);

  useFrame((state, delta) => {
    if (!points.current) return;
    material.uniforms.uTime.value += delta;

    // Mouse target
    const mx = state.pointer.x;
    const my = state.pointer.y;
    mouse.current.x += (mx - mouse.current.x) * 0.05;
    mouse.current.y += (my - mouse.current.y) * 0.05;

    points.current.rotation.y += delta * 0.05;
    points.current.rotation.x = mouse.current.y * 0.25;
    points.current.rotation.z = mouse.current.x * 0.12;
  });

  return <points ref={points} geometry={geometry} material={material} />;
}

function Rings() {
  const g = useRef(null);
  useFrame((_, dt) => {
    if (!g.current) return;
    g.current.rotation.z += dt * 0.06;
    g.current.rotation.x = Math.PI / 2.2;
  });
  return (
    <group ref={g}>
      {[2.4, 3.1, 3.9].map((r, i) => (
        <mesh key={i} rotation={[0, 0, i * 0.4]}>
          <torusGeometry args={[r, 0.005, 8, 220]} />
          <meshBasicMaterial
            color={i === 1 ? '#FF00E5' : '#00F3FF'}
            transparent
            opacity={0.35 - i * 0.08}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroScene() {
  return (
    <div
      data-testid="hero-canvas"
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
    >
      <Canvas
        camera={{ position: [0, 0, 6.4], fov: 55 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.4} />
        <ParticleField />
        <Rings />
      </Canvas>
    </div>
  );
}
