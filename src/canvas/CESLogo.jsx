import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF, Environment } from '@react-three/drei';
import CanvasLoader from '../components/Loader';
import * as THREE from 'three';

const CES = ({ isMobile }) => {
  const basePath = import.meta.env.BASE_URL || '';
  const logoPath = `${basePath}Logo/6.gltf`;
  const logo = useGLTF(logoPath);
  
  return (
    <mesh>
      <ambientLight intensity={0.0} /> {/* Soft overall lighting */}
      <hemisphereLight intensity={0.0} groundColor="black" />
      <directionalLight
        position={[-15, -10, 120]}
        intensity={6}
        castShadow
      />

      <primitive
        object={logo.scene}
        scale={isMobile ? 0.2 : 0.5}// Adjust rotation to tilt downwards
        position={isMobile ? [-0.25, 0, -2.2] : [-0.5, 0.25, 0]}
      />
    </mesh>
  );
};

const CESCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 250px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
    frameloop='demand'
    camera={{ position: isMobile ? [10, 7, 0]:[12, 9, 0], fov: 25 }}
    shadows
    dpr={[1, 2]}
    gl={{ preserveDrawingBuffer: true }}
  >
    <Suspense fallback={<CanvasLoader />}>
      <OrbitControls
        enableZoom={false}
        autoRotate
        enablePan={false} // Disable panning
        mouseButtons={{
          LEFT: THREE.MOUSE.ROTATE,
          MIDDLE: THREE.MOUSE.DOLLY,
          RIGHT: THREE.MOUSE.NONE // Disable right-click dragging
        }}
      />
        <CES isMobile={isMobile} />
        <Environment preset="sunset" /> {/* Adds an environment map for realistic lighting */}
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default CESCanvas;
