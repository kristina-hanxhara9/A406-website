import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, PerspectiveCamera, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const ArchitecturalWindow = () => {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      // Very slow, majestic rotation
      group.current.rotation.y = -0.2 + Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  const frameMaterial = new THREE.MeshStandardMaterial({ 
    color: '#0f0f0f', // Matte black finish
    roughness: 0.4, 
    metalness: 0.6 
  });
  
  const glassMaterial = new THREE.MeshPhysicalMaterial({  
    roughness: 0.0,  
    transmission: 1.0,  
    thickness: 0.05,
    metalness: 0.1,
    transparent: true,
    opacity: 0.2,
    color: '#ffffff',
    ior: 1.5,
  });

  return (
    <group ref={group} rotation={[0, -0.2, 0]}>
        {/* Sleek Minimalist Frame */}
        <mesh position={[0, 0, 0]} material={frameMaterial}>
          <boxGeometry args={[3.0, 0.1, 0.15]} position={[0, 1.55, 0]} /> {/* Top */}
          <boxGeometry args={[3.0, 0.1, 0.15]} position={[0, -1.55, 0]} /> {/* Bottom */}
          <boxGeometry args={[0.1, 3.2, 0.15]} position={[-1.55, 0, 0]} /> {/* Left */}
          <boxGeometry args={[0.1, 3.2, 0.15]} position={[1.55, 0, 0]} /> {/* Right */}
          <boxGeometry args={[0.05, 3.2, 0.1]} position={[0, 0, 0]} /> {/* Mullion */}
        </mesh>

        {/* Glass Panels */}
        <mesh position={[-0.775, 0, 0]}>
          <planeGeometry args={[1.45, 3]} />
          <primitive object={glassMaterial} attach="material" side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0.775, 0, 0]}>
          <planeGeometry args={[1.45, 3]} />
          <primitive object={glassMaterial} attach="material" side={THREE.DoubleSide} />
        </mesh>
    </group>
  );
};

const Hero3D: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
        
        {/* Architectural Lighting Studio Setup */}
        <ambientLight intensity={0.5} />
        <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={2} color="#ffffff" />
        <spotLight position={[-5, 5, 2]} angle={0.3} penumbra={1} intensity={1} color="#e63946" /> {/* Red accent light */}
        
        <ArchitecturalWindow />
        
        <Environment preset="studio" />
        <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
      </Canvas>
    </div>
  );
};

export default Hero3D;