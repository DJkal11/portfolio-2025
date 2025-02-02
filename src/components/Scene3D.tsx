import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

interface GeometryProps {
  activeTab: string;
}

const ComplexGeometry = ({ activeTab, orbitControlsRef }: GeometryProps & { orbitControlsRef: any }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  useEffect(() => {
    if (!orbitControlsRef.current) return;

    const cameraPositions = {
      home: { azimuth: -Math.PI / 2, polar: Math.PI / 2.5, distance: 4 },
      '3d': { azimuth: Math.PI / 4, polar: Math.PI / 2, distance: 3 },
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

    gsap.to(currentSpherical, {
      radius: targetSpherical.radius,
      phi: targetSpherical.phi,
      theta: targetSpherical.theta,
      duration: 1.8,
      ease: 'power3.inOut',
      onUpdate: () => {
        controls.object.position.setFromSpherical(currentSpherical);
        controls.update();
      }
    });
  }, [activeTab, orbitControlsRef]);

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1, 0.3, 128, 16]} />
      <meshStandardMaterial
        color="#ffffff"
        metalness={0.9}
        roughness={0.1}
        transparent={true}
        opacity={0.6}
        emissive="#ffffff"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
};

interface Scene3DProps {
  activeTab: string;
}

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
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <ComplexGeometry activeTab={activeTab} orbitControlsRef={orbitControlsRef} />
        <OrbitControls
          ref={orbitControlsRef}
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.05}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
        <Environment preset="sunset" background blur={0.5} />
      </Canvas>
    </div>
  );
};