import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import { Suspense, useRef } from 'react';

function Shape({ shape, color }) {
  const mesh = useRef();

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = state.clock.elapsedTime * 0.18;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.26;
  });

  const geometry = {
    icosahedron: <icosahedronGeometry args={[1.15, 1]} />,
    torusKnot: <torusKnotGeometry args={[0.85, 0.26, 128, 16]} />,
    octahedron: <octahedronGeometry args={[1.25, 0]} />,
  }[shape] ?? <icosahedronGeometry args={[1.15, 1]} />;

  return (
    <mesh ref={mesh}>
      {geometry}
      <MeshDistortMaterial color={color} distort={0.25} emissive={color} emissiveIntensity={0.5} metalness={0.55} roughness={0.32} speed={1.1} />
    </mesh>
  );
}

export default function ProjectPreview({ shape, color }) {
  return (
    <Canvas camera={{ fov: 42, position: [0, 0, 4.2] }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight color="#BFDBFE" intensity={1.1} position={[3, 4, 3]} />
        <pointLight color={color} distance={7} intensity={2.1} position={[-2, -1, 2]} />
        <Float floatIntensity={0.6} rotationIntensity={0.3} speed={1.4}>
          <Shape color={color} shape={shape} />
        </Float>
      </Suspense>
    </Canvas>
  );
}
