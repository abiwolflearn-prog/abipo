import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, Environment, Preload } from '@react-three/drei';
import * as THREE from 'three';
import RobotModel from './RobotModel';
import HeadTracking from './HeadTracking';

interface SceneProps {
  isDarkMode?: boolean;
}

export default function Scene({ isDarkMode = true }: SceneProps) {
  const robotGroupRef = useRef<THREE.Group>(null);

  // Acknowledgment action trigger on click
  const handleCanvasClick = () => {
    // Dispatch instant action event to animate physical gear nod
    const clickEvent = new CustomEvent('robot-action', { detail: { type: 'click' } });
    window.dispatchEvent(clickEvent);
  };

  return (
    <div 
      className="w-full h-full relative cursor-pointer select-none"
      onClick={handleCanvasClick}
      id="robot-canvas-container"
    >
      <Canvas
        shadows
        dpr={[1, 1.5]} // Performance optimized on high DPI displays
        camera={{ position: [0, 0.15, 3.15], fov: 45, near: 0.1, far: 20 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
          logarithmicDepthBuffer: false
        }}
        id="robot-canvas"
      >
        {/* Cinematic Ambient Backdrop Illuminator */}
        <ambientLight intensity={isDarkMode ? 0.45 : 0.7} color={isDarkMode ? "#0f172a" : "#cbd5e1"} />
        
        {/* Key Point Light (Cool steel white) */}
        <directionalLight
          castShadow
          position={[3, 3, 4]}
          intensity={1.4}
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
          color="#f1f5f9"
        />

        {/* Fill Light (Futuristic cyan glow reflecting cyber aesthetics) */}
        <directionalLight
          position={[-3, 0.5, 2.5]}
          intensity={1.2}
          color="#06b6d4"
        />

        {/* Warm Pink/Orange Rim Light Silhouette constructor */}
        <pointLight
          position={[0, 1.5, -2.5]}
          intensity={2.8}
          distance={8}
          color="#3b82f6"
        />

        <Suspense fallback={null}>
          <Center>
            <group ref={robotGroupRef}>
              <RobotModel />
            </group>
          </Center>

          {/* Load an elegant studio environment map for gorgeous metallic reflections */}
          <Environment preset="night" />
          
          {/* Mount the interactive neck and head cursor tracker */}
          <HeadTracking robotGroupRef={robotGroupRef} />
          
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
