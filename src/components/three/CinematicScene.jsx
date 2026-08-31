import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line, MeshDistortMaterial, Stars } from '@react-three/drei';
import { Bloom, ChromaticAberration, EffectComposer, Noise, Vignette } from '@react-three/postprocessing';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const STACK_NODES = [
  { label: 'UI', color: '#5EEAD4', radius: 2.1, speed: 0.16, tilt: 0.12 },
  { label: 'API', color: '#2F80ED', radius: 2.6, speed: -0.12, tilt: -0.22 },
  { label: 'DB', color: '#10B981', radius: 3.05, speed: 0.09, tilt: 0.34 },
  { label: '3D', color: '#A7F3D0', radius: 2.35, speed: -0.2, tilt: -0.08 },
];

function useQualityTier() {
  const [tier, setTier] = useState('high');

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isNarrow = window.matchMedia('(max-width: 780px)').matches;
    const isWeak = (navigator.hardwareConcurrency ?? 8) <= 4;
    setTier(reduceMotion || isNarrow || isWeak ? 'low' : 'high');
  }, []);

  return tier;
}

function ParticleField({ count }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const points = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      points[i * 3] = (Math.random() - 0.5) * 22;
      points[i * 3 + 1] = (Math.random() - 0.5) * 11;
      points[i * 3 + 2] = (Math.random() - 0.5) * 11;
    }

    return points;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.018;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={positions.length / 3} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#A7F3D0" opacity={0.24} size={0.012} sizeAttenuation transparent />
    </points>
  );
}

function OrbitRing({ radius, tilt }) {
  const points = useMemo(() => {
    const segments = 128;
    const pts = [];
    for (let i = 0; i <= segments; i += 1) {
      const angle = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    return pts;
  }, [radius]);

  return (
    <group rotation={[tilt, 0, tilt * 0.6]}>
      <Line color="#5EEAD4" lineWidth={0.6} opacity={0.16} points={points} transparent />
    </group>
  );
}

function StackNode({ node, index, total }) {
  const ref = useRef();
  const baseAngle = (index / total) * Math.PI * 2;

  useFrame((state) => {
    if (!ref.current) return;
    const angle = baseAngle + state.clock.elapsedTime * node.speed;
    const x = Math.cos(angle) * node.radius;
    const z = Math.sin(angle) * node.radius;
    const y = Math.sin(state.clock.elapsedTime * 0.6 + index) * 0.22;
    ref.current.position.set(x, y, z);
    ref.current.rotation.y += 0.01;
  });

  return (
    <group rotation={[node.tilt, 0, node.tilt * 0.6]}>
      <mesh ref={ref}>
        <octahedronGeometry args={[0.16, 0]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={0.55}
          metalness={0.4}
          roughness={0.32}
        />
      </mesh>
    </group>
  );
}

function Core({ tier }) {
  const group = useRef();
  const core = useRef();
  const shell = useRef();
  const scrollMotion = useRef({ x: 2.6, y: 0.35, z: -2.1, scale: 1, rotY: 0 });

  useEffect(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.25,
      },
    });

    timeline
      .to(scrollMotion.current, { x: -2.4, y: -0.15, z: -2.4, scale: 0.88, rotY: 1.4, ease: 'none', duration: 1 })
      .to(scrollMotion.current, { x: 2.75, y: 0.1, z: -2.2, scale: 0.98, rotY: 2.9, ease: 'none', duration: 1 })
      .to(scrollMotion.current, { x: -2.85, y: 0.3, z: -2.5, scale: 0.84, rotY: 4.3, ease: 'none', duration: 1 })
      .to(scrollMotion.current, { x: 2.1, y: -0.3, z: -2.75, scale: 0.92, rotY: 5.7, ease: 'none', duration: 1 })
      .to(scrollMotion.current, { x: 0.35, y: 0.2, z: -3, scale: 0.8, rotY: 7.1, ease: 'none', duration: 1 });

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
    };
  }, []);

  useFrame((state) => {
    const { pointer, clock } = state;
    if (group.current) {
      group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, scrollMotion.current.x, 0.055);
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, scrollMotion.current.y, 0.055);
      group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, scrollMotion.current.z, 0.055);
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, scrollMotion.current.rotY, 0.04);
      const nextScale = THREE.MathUtils.lerp(group.current.scale.x, scrollMotion.current.scale, 0.055);
      group.current.scale.setScalar(nextScale);
    }
    if (core.current) {
      core.current.rotation.x = clock.elapsedTime * 0.14 + pointer.y * 0.16;
      core.current.rotation.y += 0.0022;
    }
    if (shell.current) {
      shell.current.rotation.x = -clock.elapsedTime * 0.05;
      shell.current.rotation.y = clock.elapsedTime * 0.08 + pointer.x * 0.14;
    }
  });

  return (
    <group position={[2.6, 0.35, -2.1]} ref={group}>
      <Float floatIntensity={0.3} rotationIntensity={0.2} speed={1}>
        <mesh ref={core}>
          <icosahedronGeometry args={[1.15, tier === 'high' ? 4 : 2]} />
          <MeshDistortMaterial
            color="#2F80ED"
            distort={0.22}
            emissive="#10B981"
            emissiveIntensity={0.7}
            metalness={0.6}
            roughness={0.3}
            speed={1.1}
          />
        </mesh>
        <mesh ref={shell} scale={1.55}>
          <icosahedronGeometry args={[1.15, 1]} />
          <meshBasicMaterial color="#5EEAD4" opacity={0.08} transparent wireframe />
        </mesh>
        <mesh scale={2.05}>
          <torusGeometry args={[1, 0.006, 12, 160]} />
          <meshBasicMaterial color="#5EEAD4" opacity={0.3} transparent />
        </mesh>
        {tier === 'high' && (
          <>
            {STACK_NODES.map((node) => (
              <OrbitRing key={`ring-${node.label}`} radius={node.radius} tilt={node.tilt} />
            ))}
            {STACK_NODES.map((node, index) => (
              <StackNode index={index} key={node.label} node={node} total={STACK_NODES.length} />
            ))}
          </>
        )}
      </Float>
    </group>
  );
}

function FloatingGeometry() {
  const group = useRef();

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.08;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.18 - 0.25;
  });

  return (
    <group position={[-3.7, -1.15, -2.8]} ref={group}>
      {[0, 1, 2, 3].map((item) => (
        <mesh
          key={item}
          position={[Math.cos(item * 1.6) * 1.25, Math.sin(item * 0.9) * 0.7, Math.sin(item * 1.4) * 0.7]}
        >
          <octahedronGeometry args={[0.22, 0]} />
          <meshStandardMaterial
            color={item % 2 ? '#10B981' : '#2F80ED'}
            emissive={item % 2 ? '#064E3B' : '#075985'}
            emissiveIntensity={0.38}
            metalness={0.45}
            roughness={0.38}
          />
        </mesh>
      ))}
    </group>
  );
}

function Rig() {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 0.3, 0.035);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 0.2 + state.pointer.y * 0.22, 0.035);
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function CinematicScene() {
  const tier = useQualityTier();
  const isHigh = tier === 'high';

  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ fov: 48, position: [0, 0.2, 6] }} dpr={isHigh ? [1, 1.6] : [1, 1]} gl={{ alpha: true, antialias: true }}>
        <Suspense fallback={null}>
          <color args={['#04131F']} attach="background" />
          <fog args={['#04131F', 5, 14]} attach="fog" />
          <ambientLight intensity={0.3} />
          <directionalLight color="#BFDBFE" intensity={1.05} position={[3, 5, 4]} />
          <pointLight color="#10B981" distance={8} intensity={2.25} position={[-4, 1.5, 2]} />
          <pointLight color="#2F80ED" distance={9} intensity={1.9} position={[4, -2, 3]} />
          <Stars count={isHigh ? 850 : 380} depth={24} factor={2.8} fade radius={68} saturation={0.18} speed={0.22} />
          <ParticleField count={isHigh ? 420 : 180} />
          <Core tier={tier} />
          <FloatingGeometry />
          <Rig />
          {isHigh && (
            <EffectComposer multisampling={0}>
              <Bloom intensity={0.34} luminanceSmoothing={0.82} luminanceThreshold={0.28} mipmapBlur />
              <ChromaticAberration offset={[0.00025, 0.00035]} />
              <Noise opacity={0.018} />
              <Vignette darkness={0.65} eskil={false} offset={0.25} />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
