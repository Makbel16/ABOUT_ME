import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import ParticleField from './ParticleField';
import FloatingShapes from './FloatingShapes';
import RotatingCube from './RotatingCube';
import Car3D from './Car3D';
import './styles.css';

const Scene3D = () => {
  return (
    <div className="scene-container">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
        style={{ background: 'transparent' }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={75} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#fff" />
        <spotLight position={[-10, 10, -10]} intensity={0.5} color="#ff6b6b" />
        <spotLight position={[10, -10, 10]} intensity={0.5} color="#4ecdc4" />
        
        <Suspense fallback={null}>
          <ParticleField />
          <FloatingShapes />
          <RotatingCube />
          <Car3D />
          <Environment preset="night" />
        </Suspense>
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
};

export default Scene3D;