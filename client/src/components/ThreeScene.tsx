import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import { motion } from 'framer-motion';

interface ThreeSceneProps {
  photos: {
    id: number;
    src: string;
    title: string;
  }[];
  onPhotoSelect: (photoId: number) => void;
}

function PhotoFrame({ photo, position, onClick }: { 
  photo: { id: number; src: string; title: string }; 
  position: [number, number, number];
  onClick: () => void;
}) {
  const texture = useRef<THREE.Texture>();
  const { scene } = useThree();

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(photo.src, (loadedTexture) => {
      texture.current = loadedTexture;
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh && object.material.map === null) {
          object.material.map = texture.current;
          object.material.needsUpdate = true;
        }
      });
    });
  }, [photo.src, scene]);

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh position={position} onClick={onClick}>
        <planeGeometry args={[2, 1.5]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
    </Float>
  );
}

export default function ThreeScene({ photos, onPhotoSelect }: ThreeSceneProps) {
  return (
    <motion.div
      className="w-full h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Environment preset="city" />

        {photos.map((photo, index) => {
          const angle = (index / photos.length) * Math.PI * 2;
          const radius = 4;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <PhotoFrame
              key={photo.id}
              photo={photo}
              position={[x, y, 0]}
              onClick={() => onPhotoSelect(photo.id)}
            />
          );
        })}

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={10}
        />
      </Canvas>
    </motion.div>
  );
}