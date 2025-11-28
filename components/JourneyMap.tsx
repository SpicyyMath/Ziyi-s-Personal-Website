'use client';

import { useState, useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Trail } from '@react-three/drei';
import * as THREE from 'three';

interface LocationPoint {
  id: string;
  label: string;
  color: string;
  position: [number, number, number];
}

// 更新配色方案：电光青、洋红、电光黄
const locations: LocationPoint[] = [
  { id: 'china', label: 'China', color: '#FF00FF', position: [3.44, 0.1, -0.32] },      // Magenta
  { id: 'canada', label: 'Edmonton, CA', color: '#10B981', position: [-3.65, 0.1, -1.22] }, // Emerald Green
  { id: 'australia', label: 'Sydney, AU', color: '#FFE000', position: [4.54, 0.1, 1.52] },  // Electric Yellow
];

// 新增：密度点云地图组件
function DensityMap() {
  const texture = useLoader(THREE.TextureLoader, '/worldmap.jpeg');
  
  // 使用 Points 材质配合高细分平面，实现"密度点"效果
  // 只有纹理亮部(陆地)的点会显示出来
  return (
    <group>
      <points rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        {/* 显著提高网格密度: 260x130，使大洲轮廓更清晰 */}
        <planeGeometry args={[12, 6, 260, 130]} />
        <pointsMaterial 
          map={texture}
          size={0.06} // 稍微减小单点尺寸以适应高密度
          sizeAttenuation={true}
          transparent={true}
          opacity={0.8} // 提高不透明度
          color="#94a3b8" // 提亮基础点颜色 (Slate-400)，增强对比
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      
      {/* 底部网格作为参考平面 */}
      <gridHelper 
        args={[12, 24, '#1a1a1a', '#0a0a0a']} 
        position={[0, -0.1, 0]} 
      />
    </group>
  );
}

// 升级后的信标：光柱风格
function LightBeacon({ 
  location, 
  isActive, 
  onHover 
}: { 
  location: LocationPoint, 
  isActive: boolean,
  onHover: (id: string | null) => void 
}) {
  const beamRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // 光柱脉冲
    if (beamRef.current) {
      // 随机闪烁效果
      const flicker = Math.random() * 0.1 + 0.9;
      beamRef.current.scale.set(1, flicker, 1);
      (beamRef.current.material as THREE.MeshBasicMaterial).opacity = isActive ? 0.6 : 0.3;
    }

    // 核心旋转
    if (coreRef.current) {
      coreRef.current.rotation.y += 0.05;
      coreRef.current.position.y = 0.2 + Math.sin(time * 2) * 0.05;
    }

    // 底部波纹
    if (ringRef.current) {
      ringRef.current.scale.setScalar(1 + (time % 1) * 2);
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity = 1 - (time % 1);
    }
  });

  return (
    <group position={location.position}>
      {/* 交互热区 (不可见) */}
      <mesh 
        position={[0, 1, 0]} 
        visible={false}
        onPointerEnter={() => onHover(location.id)}
        onPointerLeave={() => onHover(null)}
      >
        <cylinderGeometry args={[0.5, 0.5, 2, 8]} />
      </mesh>

      {/* 1. 垂直光柱 (核心) */}
      <mesh position={[0, 1.0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 2.0, 8]} />
        <meshBasicMaterial color={location.color} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* 2. 垂直光柱 (外发光) */}
      <mesh ref={beamRef} position={[0, 1.0, 0]}>
        <cylinderGeometry args={[0.08, 0.15, 2.0, 16, 1, true]} />
        <meshBasicMaterial 
          color={location.color} 
          transparent 
          opacity={0.3} 
          blending={THREE.AdditiveBlending} 
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* 3. 底部扩散波纹 */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[0.1, 0.15, 32]} />
        <meshBasicMaterial color={location.color} transparent opacity={0.5} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* 4. 悬浮核心 (菱形) */}
      <mesh ref={coreRef} position={[0, 0.2, 0]}>
        <octahedronGeometry args={[0.12, 0]} />
        <meshBasicMaterial color="#ffffff" />
        <lineSegments>
          <edgesGeometry args={[new THREE.OctahedronGeometry(0.12, 0)]} />
          <lineBasicMaterial color={location.color} />
        </lineSegments>
      </mesh>
    </group>
  );
}

// 飞行动画：矢量箭头 + 数据流
function DataStreamFlight() {
  const planeRef = useRef<THREE.Group>(null);

  const curvePath = useMemo(() => {
    const path = new THREE.CurvePath<THREE.Vector3>();
    const p1 = new THREE.Vector3(...locations[0].position);
    const p2 = new THREE.Vector3(...locations[1].position);
    const p3 = new THREE.Vector3(...locations[2].position);

    const height = 0.6; 

    path.add(new THREE.QuadraticBezierCurve3(
      p1,
      new THREE.Vector3((p1.x + p2.x)/2, height, (p1.z + p2.z)/2 - 1),
      p2
    ));
    path.add(new THREE.QuadraticBezierCurve3(
      p2,
      new THREE.Vector3((p2.x + p3.x)/2, height, (p2.z + p3.z)/2),
      p3
    ));
    path.add(new THREE.QuadraticBezierCurve3(
      p3,
      new THREE.Vector3((p3.x + p1.x)/2, height, (p3.z + p1.z)/2 + 1),
      p1
    ));
    return path;
  }, []);

  const lineGeometry = useMemo(() => {
    const points = curvePath.getPoints(100);
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [curvePath]);

  useFrame(({ clock }) => {
    if (planeRef.current) {
      const t = (clock.getElapsedTime() % 5) / 5;
      const position = curvePath.getPointAt(t);
      const tangent = curvePath.getTangentAt(t);
      planeRef.current.position.copy(position);
      planeRef.current.lookAt(position.clone().add(tangent));
    }
  });

  return (
    <group>
      {/* 静态路径：虚线数据流 */}
      <line>
        <primitive object={lineGeometry} attach="geometry" />
        <lineDashedMaterial 
          color="#00FFFF" 
          transparent 
          opacity={0.2} 
          dashSize={0.2} 
          gapSize={0.1} 
          linewidth={1}
        />
      </line>

      {/* 飞行器组 */}
      <group ref={planeRef}>
        <Trail
          width={0.6}
          length={4}
          color={new THREE.Color("#00FFFF")}
          attenuation={(t) => t * t}
        >
           {/* 矢量箭头图标 */}
           <mesh rotation={[0, -Math.PI / 2, 0]}>
             {/* 使用自定义形状模拟箭头 */}
             <coneGeometry args={[0.15, 0.4, 3]} /> {/* 3边形锥体 = 箭头 */}
             <meshBasicMaterial color="#ffffff" />
           </mesh>
        </Trail>
        
        {/* 引擎光点 */}
        <pointLight color="#00FFFF" intensity={2} distance={1} />
      </group>
    </group>
  );
}

function MapScene({ 
  activeLocationId, 
  onLocationHover 
}: { 
  activeLocationId: string | null,
  onLocationHover: (id: string | null) => void 
}) {
  return (
    <group>
      <Suspense fallback={null}>
        <DensityMap />
      </Suspense>
      
      <DataStreamFlight />

      {locations.map((loc) => (
        <LightBeacon
          key={loc.id}
          location={loc}
          isActive={activeLocationId === loc.id}
          onHover={onLocationHover}
        />
      ))}
    </group>
  );
}

interface JourneyMapProps {
  activeLocationId?: string | null;
  onLocationHover?: (id: string | null) => void;
}

const JourneyMap = ({ activeLocationId, onLocationHover }: JourneyMapProps) => {
  const [internalHovered, setInternalHovered] = useState<string | null>(null);
  const hoveredLocation = activeLocationId !== undefined ? activeLocationId : internalHovered;
  
  const handleHover = (id: string | null) => {
    if (onLocationHover) onLocationHover(id);
    else setInternalHovered(id);
  };

  return (
    <div className="w-full h-full relative">
      <Canvas
        orthographic
        camera={{ 
          position: [0, 10, 0],
          zoom: 55,
          up: [0, 0, -1],
          near: 0.1,
          far: 100
        }}
        style={{ background: 'transparent' }}
      >
        {/* 黑暗环境，只靠自发光 */}
        <ambientLight intensity={0.2} />
        
        <MapScene 
          activeLocationId={hoveredLocation} 
          onLocationHover={handleHover}
        />
      </Canvas>

      {/* Map Legend */}
      <div className="absolute bottom-6 right-8 flex items-center gap-6 font-mono text-[10px] text-gray-500 uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#FF00FF]"></div>
          <span>China</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
          <span>Canada</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#FFE000]"></div>
          <span>Australia</span>
        </div>
      </div>
    </div>
  );
};

export default JourneyMap;