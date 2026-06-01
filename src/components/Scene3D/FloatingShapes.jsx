import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Box, Torus } from '@react-three/drei';

const FloatingShapes = () => {
  const groupRef = useRef();
  const shapes = useMemo(() => {
    const items = [];
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
    
    for (let i = 0; i < 30; i++) {
      const type = Math.random() > 0.7 ? 'torus' : (Math.random() > 0.5 ? 'sphere' : 'box');
      items.push({
        type,
        position: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 20 - 10],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        scale: 0.2 + Math.random() * 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: 0.1 + Math.random() * 0.5,
      });
    }
    return items;
  }, []);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, index) => {
        if (shapes[index]) {
          child.rotation.x += 0.01 * shapes[index].speed;
          child.rotation.y += 0.02 * shapes[index].speed;
          child.position.y += Math.sin(state.clock.getElapsedTime() * shapes[index].speed) * 0.002;
        }
      });
    }
  });
  
  return (
    <group ref={groupRef}>
      {shapes.map((shape, index) => {
        if (shape.type === 'sphere') {
          return (
            <Sphere
              key={index}
              position={shape.position}
              scale={shape.scale}
              rotation={shape.rotation}
            >
              <meshStandardMaterial color={shape.color} roughness={0.3} metalness={0.7} emissive={shape.color} emissiveIntensity={0.2} />
            </Sphere>
          );
        } else if (shape.type === 'box') {
          return (
            <Box
              key={index}
              position={shape.position}
              scale={shape.scale}
              rotation={shape.rotation}
            >
              <meshStandardMaterial color={shape.color} roughness={0.2} metalness={0.8} emissive={shape.color} emissiveIntensity={0.3} />
            </Box>
          );
        } else {
          return (
            <Torus
              key={index}
              position={shape.position}
              scale={shape.scale}
              rotation={shape.rotation}
              args={[0.5, 0.2, 16, 100]}
            >
              <meshStandardMaterial color={shape.color} roughness={0.4} metalness={0.6} emissive={shape.color} emissiveIntensity={0.2} />
            </Torus>
          );
        }
      })}
    </group>
  );
};

export default FloatingShapes;