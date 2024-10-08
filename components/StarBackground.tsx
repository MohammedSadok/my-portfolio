"use client";

import { PointMaterial, Points } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import * as random from "maath/random/dist/maath-random.esm";
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";
interface StarBackgroundProps {
  radius?: number;
  count?: number;
}

const StarBackground = ({
  radius = 1.2,
  count = 5000,
}: StarBackgroundProps) => {
  const ref = useRef<THREE.Points>(null);
  const [positions] = useState(() => {
    const positions = new Float32Array(count * 3);
    random.inSphere(positions, { radius });
    return positions;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#fff"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => (
  <div className="w-full h-auto fixed inset-0 z-[2] pointer-events-none">
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={null}>
        <StarBackground />
      </Suspense>
    </Canvas>
  </div>
);

export default StarsCanvas;
