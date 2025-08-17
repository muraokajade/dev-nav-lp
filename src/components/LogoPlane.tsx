import * as THREE from "three";
import React, { useEffect, useMemo, useRef } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";

type Props = {
  url: string;
  position: [number, number, number];
  scale?: number;
  opacity?: number;
  rotationSpeed?: number; // ゆっくり回転
  bounce?: boolean; // ふわふわ上下
};

export const LogoPlane: React.FC<Props> = ({
  url,
  position,
  scale = 1,
  opacity = 1,
  rotationSpeed = 0,
  bounce = false,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const map = useLoader(THREE.TextureLoader, url);
  const { gl } = useThree();

  // ロゴをくっきり＆正しい発色に
  useMemo(() => {
    map.colorSpace = THREE.SRGBColorSpace;
    map.generateMipmaps = false;
    map.minFilter = THREE.LinearFilter;
    map.magFilter = THREE.LinearFilter;
    map.anisotropy = gl.capabilities.getMaxAnisotropy();
  }, [map, gl]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    if (rotationSpeed) meshRef.current.rotation.z += rotationSpeed;
    if (bounce) {
      const baseY = position[1];
      meshRef.current.position.y =
        baseY + Math.sin(clock.getElapsedTime() * 2) * 0.08;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={[scale, scale, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={map}
        transparent // ← 常に true にする
        alphaTest={0.05} // 端のにじみ防止（お好みで 0.01〜0.1）
        depthWrite={false} // ロゴ重なり時のにじみ防止（任意）
        side={THREE.DoubleSide}
        toneMapped={false}
      />
    </mesh>
  );
};
