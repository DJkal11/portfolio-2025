import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Stars, Trail, useTexture } from '@react-three/drei';
import { useRef, useEffect, useState, useMemo } from 'react';
// Post-processing imports temporarily removed
import * as THREE from 'three';
import gsap from 'gsap';
import { theme } from '../theme';
import { prefersReducedMotion, getDeviceCapabilities } from '../utils/lazyLoad';

interface Scene3DProps {
  activeTab: string;
}

interface GeometryProps {
  activeTab: string;
  lowPerformanceMode: boolean;
}

// Memoized function to create geometries
const createNeonCube = () => {
  const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
  const edgesGeometry = new THREE.EdgesGeometry(cubeGeometry);
  return { cubeGeometry, edgesGeometry };
};

const NeonGeometry = ({ activeTab, orbitControlsRef, lowPerformanceMode }: GeometryProps & { orbitControlsRef: any }) => {
  const groupRef = useRef<THREE.Group>(null);
  const cubeRef = useRef<THREE.Mesh>(null);
  const edgesRef = useRef<THREE.LineSegments>(null);
  const morphRef = useRef<THREE.Mesh>(null);
  const morphInfluenceRef = useRef<{ value: number }>({ value: 0 });
  const smallObjectsRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const pulseRef = useRef<number>(0);
  
  // Reduce the number of objects based on performance mode
  const smallObjectsCount = lowPerformanceMode ? 1 : 6;
  const decorativeObjectsCount = lowPerformanceMode ? 2 : 12;
  const particleCount = lowPerformanceMode ? 50 : 300;
  
  // Optimize memory usage to prevent context loss
  const optimizeMemoryUsage = () => {
    if (particlesRef.current) {
      // Dispose of geometry and material when not visible
      if (particlesRef.current.geometry && !particlesRef.current.visible) {
        particlesRef.current.geometry.dispose();
      }
    }
  };
  
  // Call optimization on tab change
  useEffect(() => {
    optimizeMemoryUsage();
  }, [activeTab]);
  
  // Cleanup resources when component unmounts to prevent memory leaks
  useEffect(() => {
    return () => {
      // Dispose geometries
      if (cubeRef.current?.geometry) cubeRef.current.geometry.dispose();
      if (edgesRef.current?.geometry) edgesRef.current.geometry.dispose();
      if (morphRef.current?.geometry) morphRef.current.geometry.dispose();
      if (particlesRef.current?.geometry) particlesRef.current.geometry.dispose();
      
      // Dispose materials with proper type checking
      const disposeMaterial = (material: any) => {
        if (material && typeof material.dispose === 'function') {
          material.dispose();
        }
      };
      
      // Safely dispose cube materials
      if (cubeRef.current?.material) {
        if (Array.isArray(cubeRef.current.material)) {
          cubeRef.current.material.forEach(disposeMaterial);
        } else {
          disposeMaterial(cubeRef.current.material);
        }
      }
      
      // Safely dispose edges materials
      if (edgesRef.current?.material) {
        if (Array.isArray(edgesRef.current.material)) {
          edgesRef.current.material.forEach(disposeMaterial);
        } else {
          disposeMaterial(edgesRef.current.material);
        }
      }
      
      // Safely dispose morph materials
      if (morphRef.current?.material) {
        if (Array.isArray(morphRef.current.material)) {
          morphRef.current.material.forEach(disposeMaterial);
        } else {
          disposeMaterial(morphRef.current.material);
        }
      }
      
      // Safely dispose particles materials
      if (particlesRef.current?.material) {
        if (Array.isArray(particlesRef.current.material)) {
          particlesRef.current.material.forEach(disposeMaterial);
        } else {
          disposeMaterial(particlesRef.current.material);
        }
      }
      
      // Dispose textures with proper type checking
      const disposeTextures = (material: any) => {
        if (material) {
          if (material.map && typeof material.map.dispose === 'function') material.map.dispose();
          if (material.normalMap && typeof material.normalMap.dispose === 'function') material.normalMap.dispose();
          if (material.specularMap && typeof material.specularMap.dispose === 'function') material.specularMap.dispose();
          if (material.envMap && typeof material.envMap.dispose === 'function') material.envMap.dispose();
        }
      };
      
      // Apply texture disposal to all materials
      if (cubeRef.current?.material) {
        if (Array.isArray(cubeRef.current.material)) {
          cubeRef.current.material.forEach(disposeTextures);
        } else {
          disposeTextures(cubeRef.current.material);
        }
      }
    };
  }, []);
  
  // Store initial positions and properties in refs - memoized to prevent recreations
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

  // Initialize the properties once with useMemo
  useMemo(() => {
    // Initialize small objects properties
    if (smallObjectsPropsRef.current.length === 0) {
      [...Array(smallObjectsCount)].forEach((_, i) => {
        const angle = (i / smallObjectsCount) * Math.PI * 2;
        const radius = 3;
        const position: [number, number, number] = [
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 2,
          Math.sin(angle) * radius
        ];
        const size = 0.2 + Math.random() * 0.2;
        const color = i % 3 === 0 ? theme.colors.primary : i % 3 === 1 ? theme.colors.secondary : theme.colors.quaternary;
        
        smallObjectsPropsRef.current.push({ position, size, color });
      });
    }

    // Initialize decorative objects properties
    if (decorativeObjectsPropsRef.current.length === 0) {
      [...Array(decorativeObjectsCount)].forEach((_, i) => {
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
        const color = i % 4 === 0 ? theme.colors.primary : 
                     i % 4 === 1 ? theme.colors.secondary : 
                     i % 4 === 2 ? theme.colors.quaternary : 
                     '#ff3366';
        
        decorativeObjectsPropsRef.current.push({
          position,
          rotation,
          scale,
          color,
          geometryType: i % 3
        });
      });
    }
  }, [smallObjectsCount, decorativeObjectsCount]);

  // Optimize animation frame rate based on performance mode
  const frameSkip = lowPerformanceMode ? 2 : 1;
  const frameCount = useRef(0);

  // Frame counter for skipping frames on low-end devices
  const frameCountRef = useRef(0);
  
  // Animation loop with frame skipping for low-end devices
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // Skip frames for low performance mode
    frameCountRef.current += 1;
    if (lowPerformanceMode && frameCountRef.current % 3 !== 0) {
      return; // Skip 2 out of 3 frames in low performance mode
    }
    
    const time = state.clock.elapsedTime;
    pulseRef.current = (Math.sin(time * 0.5) + 1) * 0.5; // 0 to 1 pulsing value
    
    if (groupRef.current) {
      groupRef.current.rotation.y += lowPerformanceMode ? 0.0005 : 0.001;
      groupRef.current.rotation.x = Math.sin(time * 0.25) * 0.05;
    }
    
    if (smallObjectsRef.current) {
      smallObjectsRef.current.children.forEach((child, i) => {
        child.rotation.x += 0.005 * (i % 2 ? 1 : -1) * (lowPerformanceMode ? 0.5 : 1);
        child.rotation.y += 0.005 * (i % 3 ? 1 : -1) * (lowPerformanceMode ? 0.5 : 1);
        child.position.y += Math.sin(time * 0.25 + i) * 0.001;
        
        // Add pulsing effect to materials
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const material = mesh.material as THREE.MeshPhysicalMaterial;
          material.emissiveIntensity = 1 + pulseRef.current * 0.5;
        }
      });
    }
    
    // Animate particles - only update every other frame in low performance mode
    if (particlesRef.current && (!lowPerformanceMode || frameCountRef.current % 2 === 0)) {
      const particles = particlesRef.current;
      const positions = particles.geometry.attributes.position;
      const colors = particles.geometry.attributes.color;
      
      for (let i = 0; i < positions.count; i++) {
        // Get current position
        const x = positions.getX(i);
        const y = positions.getY(i);
        const z = positions.getZ(i);
        
        // Spiral movement
        const angle = time * 0.1 + i * 0.01;
        const radius = Math.sqrt(x*x + z*z);
        
        positions.setX(i, Math.cos(angle) * radius);
        positions.setY(i, y + Math.sin(time + i * 0.1) * 0.01 - 0.005);
        positions.setZ(i, Math.sin(angle) * radius);
        
        // Reset particles that fall below a certain point
        if (positions.getY(i) < -5) {
          positions.setY(i, 5);
        }
        
        // Pulsing colors
        const colorIndex = i % theme.colors.particleColors.length;
        const color = new THREE.Color(theme.colors.particleColors[colorIndex]);
        color.offsetHSL(0, 0, pulseRef.current * 0.2);
        
        colors.setXYZ(i, color.r, color.g, color.b);
      }
      
      positions.needsUpdate = true;
      colors.needsUpdate = true;
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

  // Memoize geometries to prevent recreation on each render
  const { cubeGeometry, edgesGeometry } = useMemo(() => createNeonCube(), []);
  
  // Create particle system
  const particleSystem = useMemo(() => {
    if (lowPerformanceMode && particleCount < 50) return null;
    
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      // Position particles in a sphere
      const radius = 3 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10; // Spread vertically
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
      
      // Random color from theme
      const colorIndex = i % theme.colors.particleColors.length;
      const color = new THREE.Color(theme.colors.particleColors[colorIndex]);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      // Random sizes
      sizes[i] = Math.random() * 0.1 + 0.05;
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    return geometry;
  }, [particleCount, lowPerformanceMode]);

  return (
    <group ref={groupRef}>
      {/* Main neon cube with pulsing effect */}
      <mesh ref={cubeRef}>
        <primitive object={cubeGeometry} attach="geometry" />
        <meshPhysicalMaterial
          color="#000000"
          emissive={theme.colors.primary}
          emissiveIntensity={0.5}
          metalness={1}
          roughness={0}
          clearcoat={1}
          clearcoatRoughness={0}
          toneMapped={false}
        />
      </mesh>

      {/* Glowing edges */}
      <lineSegments ref={edgesRef}>
        <primitive object={edgesGeometry} attach="geometry" />
        <lineBasicMaterial color={theme.colors.primary} linewidth={2} toneMapped={false} />
      </lineSegments>

      {/* Particle system */}
      {particleSystem && (
        <points ref={particlesRef}>
          <primitive object={particleSystem} attach="geometry" />
          <pointsMaterial
            size={0.15}
            sizeAttenuation
            transparent
            depthWrite={false}
            vertexColors
            blending={THREE.AdditiveBlending}
            map={useTexture('/images/particle.svg')}
          />
        </points>
      )}

      {/* Satellite objects with trails */}
      <group ref={smallObjectsRef}>
        {smallObjectsPropsRef.current.map((props, i) => (
          <group key={i} position={props.position}>
            {/* Add trails to some objects */}
            {i % 2 === 0 && !lowPerformanceMode && (
              <Trail
                width={0.5}
                length={5}
                color={props.color}
                attenuation={(t) => t * t}
              >
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
              </Trail>
            )}
            
            {/* Regular objects without trails */}
            {i % 2 !== 0 && (
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
            )}
            
            {/* Only add lights in high performance mode */}
            {!lowPerformanceMode && (
              <pointLight color={props.color} intensity={1.2} distance={4} />
            )}
          </group>
        ))}
      </group>

      {/* Enhanced decorative objects with more variety */}
      {decorativeObjectsPropsRef.current.map((props, i) => {
        // Add pulsing animation to some objects
        const pulsingScale = i % 3 === 0 ? 1 + Math.sin(Date.now() * 0.001 + i) * 0.2 : 1;
        
        return (
          <group
            key={`deco-${i}`}
            position={props.position}
            rotation={props.rotation}
            scale={props.scale * pulsingScale}
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
            
            {/* Add small point lights to some decorative objects */}
            {!lowPerformanceMode && i % 4 === 0 && (
              <pointLight color={props.color} intensity={0.8} distance={2} />
            )}
          </group>
        );
      })}
      
      {/* Enhanced reflective floor with grid pattern */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
        <planeGeometry args={[50, 50, 20, 20]} />
        <meshPhysicalMaterial
          color="#000000"
          metalness={1}
          roughness={0.1}
          clearcoat={1}
          reflectivity={1}
          transparent={true}
          opacity={0.7}
          wireframe={!lowPerformanceMode}
          emissive={theme.colors.primary}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Enhanced lighting setup */}
      <pointLight position={[3, 3, 3]} intensity={1.5} color={theme.colors.primary} />
      <pointLight position={[-3, -2, -3]} intensity={1.5} color={theme.colors.secondary} />
      {!lowPerformanceMode && (
        <>
          <pointLight position={[0, -1, 3]} intensity={1.5} color={theme.colors.tertiary} />
          <pointLight position={[0, 4, 0]} intensity={1} color={theme.colors.quaternary} />
        </>
      )}
      
      {/* Add stars in the background */}
      {!lowPerformanceMode && (
        <Stars 
          radius={50} 
          depth={50} 
          count={1000} 
          factor={4} 
          saturation={0.5} 
          fade 
          speed={0.5}
        />
      )}
    </group>
  );
};

export const Scene3DOptimized = ({ activeTab }: Scene3DProps) => {
  const orbitControlsRef = useRef<any>(null);
  const [lowPerformanceMode, setLowPerformanceMode] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [contextLost, setContextLost] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Check device capabilities and user preferences on mount
  useEffect(() => {
    const reducedMotion = prefersReducedMotion();
    const { isLowEnd } = getDeviceCapabilities();
    // Convert to boolean to avoid TypeScript error
    setLowPerformanceMode(Boolean(reducedMotion || isLowEnd));
  }, []);
  
  // Handle WebGL context loss and restoration
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      console.log('WebGL context lost');
      setContextLost(true);
      
      // Force low performance mode to reduce resource usage
      setLowPerformanceMode(true);
      
      // Attempt to recover after a delay
      const recoveryTimeout = setTimeout(() => {
        console.log('Attempting to recover WebGL context');
        // Force a re-render by toggling state
        setContextLost(false);
      }, 5000); // Wait 5 seconds before attempting recovery
      
      return () => clearTimeout(recoveryTimeout);
    };
    
    const handleContextRestored = () => {
      console.log('WebGL context restored');
      setContextLost(false);
    };
    
    canvas.addEventListener('webglcontextlost', handleContextLost);
    canvas.addEventListener('webglcontextrestored', handleContextRestored);
    
    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, []);
  
  // Add automatic recovery mechanism
  useEffect(() => {
    if (contextLost) {
      const recoveryInterval = setInterval(() => {
        // Try to restore context by forcing a re-render
        console.log('Attempting automatic recovery');
        setContextLost(prevState => !prevState);
      }, 10000); // Try every 10 seconds
      
      return () => clearInterval(recoveryInterval);
    }
  }, [contextLost]);

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {contextLost ? (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#00fff5',
          background: 'rgba(0,0,0,0.7)',
          fontSize: '14px',
          padding: '20px',
          textAlign: 'center'
        }}>
          <div>
            <p>3D rendering paused due to graphics memory limitations.</p>
            <p>Try refreshing the page or closing other browser tabs.</p>
          </div>
        </div>
      ) : (
      <Canvas
        ref={canvasRef}
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ background: 'transparent' }}
        // Optimize performance with lower pixel ratio for low-end devices
        dpr={lowPerformanceMode ? [0.5, 1] : [1, 2]}
        // Disable performance-heavy features for low-end devices
        gl={{
            antialias: !lowPerformanceMode,
            alpha: true,
            powerPreference: 'high-performance',
            // Add tone mapping for more vibrant colors
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2
          }}
        // Handle context events through onCreated callback
        onCreated={({ gl }) => {
          // Add context loss handling to the WebGL rendering context
          const originalCanvas = gl.domElement;
          originalCanvas.addEventListener('webglcontextlost', (event: Event) => {
            event.preventDefault();
            setContextLost(true);
          });
          originalCanvas.addEventListener('webglcontextrestored', () => {
            setContextLost(false);
          });
        }}
      >
        <ambientLight intensity={0.2} />
        <hemisphereLight intensity={0.1} groundColor="#000000" />
        <NeonGeometry 
          activeTab={activeTab} 
          orbitControlsRef={orbitControlsRef} 
          lowPerformanceMode={lowPerformanceMode} 
        />
        <fog attach="fog" args={['#000000', 1, 15]} />
        <OrbitControls
          ref={orbitControlsRef}
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.05}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
          // Add subtle auto-rotation when hovered
          autoRotate={hovered && !lowPerformanceMode}
          autoRotateSpeed={0.5}
        />
        {/* Enhanced environment with better lighting */}
        <Environment preset="night" background={false} blur={1.5} />
        
        {/* Post-processing effects temporarily removed to fix errors */}
      </Canvas>
      )}
    </div>
  );
};