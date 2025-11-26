
import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// GLSL Noise Function (Simplex 3D)
const noiseGLSL = `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  // First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;

  // Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //   x0 = x0 - i1 + C.xxx;
  //   x1 = x0 - i2 + C.yyy;
  //   x2 = x0 - 1.0 + 2.0 * C.xxx; // Incorrect in original code comments, but math logic below is standard
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; 
  vec3 x3 = x0 - D.yyy;      

  // Permutations
  i = mod289(i); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  float n_ = 0.142857142857; // 1.0/7.0
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
}
`;

const vertexShader = `
uniform float uTime;
uniform float uIntensity;
varying vec2 vUv;
varying float vDisplacement;
varying vec3 vPosition;

${noiseGLSL}

void main() {
  vUv = uv;
  
  vec3 pos = position;
  
  // Slower, deeper movement for a more "breathing" feel
  float noiseVal = snoise(pos * 2.0 + uTime * 0.3);
  
  // Gentle displacement
  vec3 newPos = pos + normal * noiseVal * (0.05 + uIntensity * 0.25);
  
  vDisplacement = noiseVal;
  vPosition = newPos;

  vec4 mvPosition = modelViewMatrix * vec4(newPos, 1.0);
  gl_Position = projectionMatrix * mvPosition;

  // Reduced point size for sharper look
  // Was 4.0 base, now 3.0
  gl_PointSize = (3.0 + uIntensity * 1.5) * (10.0 / -mvPosition.z);
}
`;

const fragmentShader = `
uniform float uTime;
varying float vDisplacement;
varying vec3 vPosition;

// Colors - MUTED PALETTE for eye comfort
// Soft Slate Blue (Desaturated and darker)
const vec3 COLOR_BLUE = vec3(0.15, 0.25, 0.45); 
// Muted Bronze/Gold (Desaturated and darker)
const vec3 COLOR_YELLOW = vec3(0.5, 0.4, 0.2);

void main() {
  float r = distance(gl_PointCoord, vec2(0.5));
  if (r > 0.5) discard;

  // Softer glow falloff (Power 2.0 is softer than 2.5)
  float glow = 1.0 - (r * 2.0);
  glow = pow(glow, 2.0); 

  float mixFactor = smoothstep(-0.2, 0.5, vDisplacement);
  vec3 finalColor = mix(COLOR_BLUE, COLOR_YELLOW, mixFactor);

  // Increased Alpha slightly to 0.5 for better definition with darker colors
  // This creates a "smoke/cloud" effect rather than a "laser" effect
  gl_FragColor = vec4(finalColor, glow * 0.5);
}
`;

const BrainParticles: React.FC<{ isHovered: boolean }> = ({ isHovered }) => {
  const meshRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIntensity: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    if (!materialRef.current || !meshRef.current) return;

    materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();

    // Smoother transition: Max intensity reduced from 1.0 to 0.6
    const targetIntensity = isHovered ? 0.6 : 0.0;
    
    // Slower interpolation factor (0.02) for smoother animation response
    materialRef.current.uniforms.uIntensity.value = THREE.MathUtils.lerp(
      materialRef.current.uniforms.uIntensity.value,
      targetIntensity,
      0.02
    );

    const rotSpeed = isHovered ? 0.005 : 0.002;
    meshRef.current.rotation.y += rotSpeed;
    meshRef.current.rotation.z += rotSpeed * 0.2;
  });

  return (
    <points ref={meshRef}>
      {/* Reduced density (72 vs 96) to reduce white-out from overlapping */}
      <sphereGeometry args={[1.5, 72, 72]} /> 
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

const NeuralBrain: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="w-full h-full min-h-[400px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas camera={{ position: [0, 0, 4.5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <BrainParticles isHovered={isHovered} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate={false}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default NeuralBrain;
