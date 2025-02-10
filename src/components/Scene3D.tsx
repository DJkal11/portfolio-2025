import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

interface Scene3DProps {
  activeTab: string;
}

interface GeometryProps {
  activeTab: string;
}

const createNeonCube = () => {
  const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
  const edgesGeometry = new THREE.EdgesGeometry(cubeGeometry);
  return { cubeGeometry, edgesGeometry };
};

const NeonGeometry = ({ activeTab, orbitControlsRef }: GeometryProps & { orbitControlsRef: any }) => {
  const groupRef = useRef<THREE.Group>(null);
  const cubeRef = useRef<THREE.Mesh>(null);
  const edgesRef = useRef<THREE.LineSegments>(null);
  const morphRef = useRef<THREE.Mesh>(null);
  const morphInfluenceRef = useRef<{ value: number }>({ value: 0 });
  const smallObjectsRef = useRef<THREE.Group>(null);
  
  // Store initial positions and properties in refs
  const smallObjectsPropsRef = useRef<Array<{
    position: [number, number, number];
    size: number;
    color: string;
  }>>([]);
  
  const decorativeObjectsPropsRef = useRef<Array<{
    position: [number, number, number];
    rotation: [number, number, number];
    scale: number;
    color: string;
    geometryType: number;
  }>>([]);

  // Initialize the properties once
  useEffect(() => {
    // Initialize small objects properties
    if (smallObjectsPropsRef.current.length === 0) {
      [...Array(8)].forEach((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 3;
        const position: [number, number, number] = [
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 2,
          Math.sin(angle) * radius
        ];
        const size = 0.2 + Math.random() * 0.2;
        const color = i % 3 === 0 ? "#00ffff" : i % 3 === 1 ? "#ff00ff" : "#7f00ff";
        
        smallObjectsPropsRef.current.push({ position, size, color });
      });
    }

    // Initialize decorative objects properties
    if (decorativeObjectsPropsRef.current.length === 0) {
      [...Array(15)].forEach((_, i) => {
        const radius = 2 + Math.random() * 4;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const position: [number, number, number] = [
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.cos(phi),
          radius * Math.sin(phi) * Math.sin(theta)
        ];
        const rotation: [number, number, number] = [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ];
        const scale = 0.1 + Math.random() * 0.15;
        const color = i % 4 === 0 ? "#00ffff" : i % 4 === 1 ? "#ff00ff" : i % 4 === 2 ? "#7f00ff" : "#ff3366";
        
        decorativeObjectsPropsRef.current.push({
          position,
          rotation,
          scale,
          color,
          geometryType: i % 3
        });
      });
    }
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
    if (smallObjectsRef.current) {
      smallObjectsRef.current.children.forEach((child, i) => {
        child.rotation.x += 0.01 * (i % 2 ? 1 : -1);
        child.rotation.y += 0.01 * (i % 3 ? 1 : -1);
        child.position.y += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.002;
      });
    }
  });

  useEffect(() => {
    if (!orbitControlsRef.current) return;

    const cameraPositions = {
      home: { azimuth: -Math.PI / 4, polar: Math.PI / 2.2, distance: 3.5 },
      projects: { azimuth: Math.PI, polar: Math.PI / 2.2, distance: 5 },
      contact: { azimuth: -Math.PI * 1.25, polar: Math.PI / 2.8, distance: 4.5 }
    };

    const newPosition = cameraPositions[activeTab as keyof typeof cameraPositions];
    const controls = orbitControlsRef.current;

    const currentSpherical = new THREE.Spherical().setFromVector3(controls.object.position);
    const targetSpherical = new THREE.Spherical(
      newPosition.distance,
      newPosition.polar,
      newPosition.azimuth
    );

    let deltaTheta = targetSpherical.theta - currentSpherical.theta;
    if (Math.abs(deltaTheta) > Math.PI) {
      if (deltaTheta > 0) {
        targetSpherical.theta -= 2 * Math.PI;
      } else {
        targetSpherical.theta += 2 * Math.PI;
      }
    }

    gsap.killTweensOf(currentSpherical);
    gsap.killTweensOf(morphInfluenceRef.current);

    // Animate camera position
    gsap.to(currentSpherical, {
      radius: targetSpherical.radius,
      phi: targetSpherical.phi,
      theta: targetSpherical.theta,
      duration: 1.2,
      ease: 'power2.inOut',
      onUpdate: () => {
        controls.object.position.setFromSpherical(currentSpherical);
        controls.update();
      }
    });

    // Animate shape morphing
    const targetInfluence = activeTab === 'home' ? 0 : activeTab === 'projects' ? 1 : 0.5;
    gsap.to(morphInfluenceRef.current, {
      value: targetInfluence,
      duration: 1.2,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (morphRef.current) {
          morphRef.current.morphTargetInfluences![0] = morphInfluenceRef.current.value;
          morphRef.current.morphTargetInfluences![1] = 1 - morphInfluenceRef.current.value;
        }
      }
    });
  }, [activeTab, orbitControlsRef]);

  return (
    <group ref={groupRef}>
      <mesh ref={cubeRef}>
        <primitive object={createNeonCube().cubeGeometry} attach="geometry" />
        <meshPhysicalMaterial
          color="#000000"
          emissive="#00fff5"
          emissiveIntensity={0.5}
          metalness={1}
          roughness={0}
          clearcoat={1}
          clearcoatRoughness={0}
          toneMapped={false}
        />
      </mesh>

      <lineSegments ref={edgesRef}>
        <primitive object={createNeonCube().edgesGeometry} attach="geometry" />
        <lineBasicMaterial color="#00fff5" linewidth={2} toneMapped={false} />
      </lineSegments>

      <group ref={smallObjectsRef}>
        {smallObjectsPropsRef.current.map((props, i) => (
          <group key={i} position={props.position}>
            <mesh>
              <octahedronGeometry args={[props.size]} />
              <meshPhysicalMaterial
                color="#000000"
                emissive={props.color}
                emissiveIntensity={1}
                metalness={1}
                roughness={0}
                clearcoat={1}
                clearcoatRoughness={0}
                toneMapped={false}
              />
            </mesh>
            <pointLight color={props.color} intensity={1.2} distance={4} />
          </group>
        ))}
      </group>

      {decorativeObjectsPropsRef.current.map((props, i) => (
        <group
          key={`deco-${i}`}
          position={props.position}
          rotation={props.rotation}
          scale={props.scale}
        >
          <mesh>
            {props.geometryType === 0 ? (
              <tetrahedronGeometry />
            ) : props.geometryType === 1 ? (
              <dodecahedronGeometry />
            ) : (
              <icosahedronGeometry />
            )}
            <meshPhysicalMaterial
              color="#000000"
              emissive={props.color}
              emissiveIntensity={2}
              metalness={1}
              roughness={0}
              clearcoat={1}
              clearcoatRoughness={0}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshPhysicalMaterial
          color="#000000"
          metalness={1}
          roughness={0.1}
          clearcoat={1}
          reflectivity={1}
          transparent={true}
          opacity={0.7}
        />
      </mesh>

      <pointLight position={[3, 3, 3]} intensity={1.5} color="#00fff5" />
      <pointLight position={[-3, -2, -3]} intensity={1.5} color="#ff1493" />
      <pointLight position={[0, -1, 3]} intensity={1.5} color="#4b0082" />
    </group>
  );
};

export const Scene3D = ({ activeTab }: Scene3DProps) => {
  const orbitControlsRef = useRef<any>(null);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      pointerEvents: 'none'
    }}>
      <Canvas
        camera={{ position: [0, 0, 5] }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.2} />
        <hemisphereLight intensity={0.1} groundColor="#000000" />
        <NeonGeometry activeTab={activeTab} orbitControlsRef={orbitControlsRef} />
        <fog attach="fog" args={['#000000', 1, 10]} />
        <OrbitControls
          ref={orbitControlsRef}
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.05}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
        <Environment preset="night" background blur={0.5} />
      </Canvas>
    </div>
  );
};