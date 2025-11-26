
import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import * as THREE from 'three';

// --- Configuration ---
const LAYER_COUNT = 5;
const LAYER_SIZE = [3.2, 0.05, 3.2] as [number, number, number];
const BASE_GAP = 0.6;
const COLOR_INPUT = new THREE.Color('#001540'); // Deep Blue
const COLOR_HIDDEN = new THREE.Color('#00F0FF'); // Neon Blue
const COLOR_OUTPUT = new THREE.Color('#FFD700'); // UNSW Yellow

interface TensorLayerProps {
  index: number;
  total: number;
  offset: { x: number; z: number; r: number };
  pulse: number; // 0 to 1 cycle
}

const TensorLayer: React.FC<TensorLayerProps> = ({ index, total, offset, pulse }) => {
  const meshRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);

  // Calculate layer color based on depth
  const baseColor = useMemo(() => {
    const t = index / (total - 1);
    const c = new THREE.Color().lerpColors(COLOR_INPUT, COLOR_HIDDEN, t);
    if (index === total - 1) c.lerp(COLOR_OUTPUT, 0.8);
    return c;
  }, [index, total]);

  // Generate particles inside the layer
  const particleCount = 150 - index * 20; // Fewer particles in higher layers (abstraction)
  const particles = useMemo(() => {
    const temp = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      temp[i * 3] = (Math.random() - 0.5) * LAYER_SIZE[0] * 0.9;     // x
      temp[i * 3 + 1] = (Math.random() - 0.5) * LAYER_SIZE[1] * 4.0; // y (scatter slightly vertical)
      temp[i * 3 + 2] = (Math.random() - 0.5) * LAYER_SIZE[2] * 0.9; // z
    }
    return temp;
  }, [particleCount]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    // Check if the pulse wave is currently passing through this layer
    // Pulse moves from 0 to Total. 
    // We define a "window" of activation around the current pulse index.
    const pulsePos = pulse * (total + 1) - 0.5; // range -0.5 to total+0.5
    const dist = Math.abs(pulsePos - index);
    const activation = Math.max(0, 1 - dist * 1.5); // 0 to 1 intensity

    // Animate particles
    const time = state.clock.getElapsedTime();
    // Pulse effect: Scale up and brighten
    const material = pointsRef.current.material as THREE.PointsMaterial;
    material.size = 0.03 + activation * 0.05;
    material.opacity = 0.4 + activation * 0.6;
    
    // Slight color shift on activation
    if (activation > 0.1) {
       material.color.lerpColors(baseColor, new THREE.Color('#ffffff'), activation * 0.5);
    } else {
       material.color.copy(baseColor);
    }

    // Jitter particles slightly
    pointsRef.current.rotation.y = time * 0.05 * (index % 2 === 0 ? 1 : -1);
  });

  return (
    <group ref={meshRef}>
      {/* 1. Glass Plate */}
      <mesh rotation={[0, offset.r, 0]} position={[offset.x, 0, offset.z]}>
        <boxGeometry args={LAYER_SIZE} />
        <meshPhysicalMaterial 
          transparent 
          opacity={0.15} 
          roughness={0.1} 
          metalness={0.1}
          transmission={0.5} 
          color={baseColor}
        />
        {/* Neon Edges */}
        <Edges color={baseColor} threshold={15} scale={1.0} renderOrder={1} />
        {/* Glowy Accent Edges (Inner) */}
        <Edges color="white" threshold={15} scale={0.98} renderOrder={2} opacity={0.2} transparent />
      </mesh>

      {/* 2. Data Particles */}
      <points ref={pointsRef} rotation={[0, offset.r, 0]} position={[offset.x, 0, offset.z]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length / 3}
            array={particles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color={baseColor}
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </points>
    </group>
  );
};

const StackController: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse, viewport } = useThree();
  
  // Random architectural offsets for "Exploded View"
  const offsets = useMemo(() => {
    return Array.from({ length: LAYER_COUNT }).map(() => ({
      x: (Math.random() - 0.5) * 0.3,
      z: (Math.random() - 0.5) * 0.3,
      r: (Math.random() - 0.5) * 0.15, // slight rotation
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // 1. Float Animation
    groupRef.current.position.y = Math.sin(time * 0.5) * 0.1;

    // 2. Breathing (Gap Expansion)
    const breath = (Math.sin(time * 0.8) + 1) * 0.5; // 0 to 1
    const currentGap = BASE_GAP + breath * 0.15;

    // Apply positions to children (Layers)
    groupRef.current.children.forEach((child, i) => {
      // Center the stack vertically: (i - mid)
      const mid = (LAYER_COUNT - 1) / 2;
      const targetY = (i - mid) * currentGap;
      
      // Smooth lerp for spacing
      child.position.y = THREE.MathUtils.lerp(child.position.y, targetY, 0.1);
    });

    // 3. Mouse Interaction (Parallax / Rotation)
    // Convert normalized mouse (-1 to 1) to rotation angles
    const targetRotX = mouse.y * 0.5; // Tilt up/down
    const targetRotY = mouse.x * 0.8; // Rotate left/right
    
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY + time * 0.1, 0.05); // + auto slow spin
  });

  // Calculate pulse progress (0 to 1 loop every 2 seconds)
  const [pulse, setPulse] = useState(0);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const period = 2.5;
    setPulse((t % period) / period);
  });

  return (
    <group ref={groupRef}>
      {offsets.map((offset, i) => (
        <TensorLayer 
          key={i} 
          index={i} 
          total={LAYER_COUNT} 
          offset={offset} 
          pulse={pulse}
        />
      ))}
      
      {/* Connecting Data Lines (Visual Abstract) */}
      <lineSegments>
         <bufferGeometry />
         <lineBasicMaterial color="#00F0FF" transparent opacity={0.05} />
      </lineSegments>
    </group>
  );
};

const TensorStack: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        {/* Top-down light to highlight glass edges */}
        <pointLight position={[10, 10, 10]} intensity={1} color="#00F0FF" />
        <pointLight position={[-10, -5, -5]} intensity={0.5} color="#FFD700" />
        
        <StackController />
      </Canvas>
    </div>
  );
};

export default TensorStack;
