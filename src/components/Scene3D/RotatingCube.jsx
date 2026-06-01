import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';

const RotatingCube = () => {
  const cubeRef = useRef();
  
  useFrame((state) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.5;
      cubeRef.current.rotation.y += 0.01;
      cubeRef.current.rotation.z = Math.cos(state.clock.getElapsedTime() * 0.3) * 0.5;
      
      const scale = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.1;
      cubeRef.current.scale.set(scale, scale, scale);
    }
  });
  
  return (
    <Box ref={cubeRef} args={[1.5, 1.5, 1.5]} position={[0, 0, 0]}>
      <meshStandardMaterial 
        color="#ff6b6b" 
        roughness={0.2} 
        metalness={0.8}
        emissive="#ff6b6b"
        emissiveIntensity={0.3}
        transparent
        opacity={0.9}
      />
    </Box>
  );
};

export default RotatingCube;