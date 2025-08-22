// src/components/LogoPlane.tsx
import * as THREE from "three";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";

export type LogoPlaneProps = {
  url: string;                                // 例: "/assets/logos/react.svg"
  position?: [number, number, number];        // 初期位置
  scale?: number;                             // 板の基準サイズ（幅基準）
  rotationSpeed?: number;                     // Z回転/フレーム
  opacity?: number;                           // 0–1
  bounce?: boolean;                           // ふわっと上下に揺らす
  saturation?: number;                        // 0=白黒, 1=元の彩度, >1で強調
};

export const LogoPlane: React.FC<LogoPlaneProps> = ({
  url,
  position = [0, 0, 0],
  scale = 1,
  rotationSpeed = 0,
  opacity = 1,
  bounce = false,
  saturation = 1,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  // 画像読み込み
  const texture = useLoader(THREE.TextureLoader, url);

  // 読み込み後にレンダリング品質・色空間を調整
  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = true;
    texture.anisotropy = 4;
  }, [texture]);

  // アスペクト比（幅/高）を得て、メッシュスケールに反映
  const [aspect, setAspect] = useState(1);
  useEffect(() => {
    const img = texture.image as HTMLImageElement | { width: number; height: number } | undefined;
    if (img && (img as any).width && (img as any).height) {
      setAspect((img as any).width / (img as any).height);
    } else {
      // SVGなどで遅れる場合があるので、ロード完了後にも再計算
      const id = setInterval(() => {
        const im = texture.image as any;
        if (im?.width && im?.height) {
          setAspect(im.width / im.height);
          clearInterval(id);
        }
      }, 30);
      return () => clearInterval(id);
    }
  }, [texture]);

  // サチュレーション・不透明度を扱う簡易シェーダ
  const material = useMemo(() => {
    const uniforms = {
      map: { value: texture },
      uOpacity: { value: opacity },
      uSat: { value: saturation },
    };
    const mat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D map;
        uniform float uOpacity;
        uniform float uSat;
        varying vec2 vUv;

        // Rec.709 luma
        const vec3 LUMA = vec3(0.2126, 0.7152, 0.0722);

        void main() {
          vec4 tex = texture2D(map, vUv);
          // サチュレーション調整: グレースケールと元色を mix
          float l = dot(tex.rgb, LUMA);
          vec3 sat = mix(vec3(l), tex.rgb, uSat);
          gl_FragColor = vec4(sat, tex.a * uOpacity);
          // アルファ0は破棄（フチのにじみ軽減）
          if (gl_FragColor.a <= 0.001) discard;
        }
      `,
      transparent: true,
      depthWrite: false,
      toneMapped: false,
    });
    return mat;
  }, [texture, opacity, saturation]);

  // prop更新で uniforms を追従
  useEffect(() => {
    (material.uniforms.uOpacity as any).value = opacity;
  }, [opacity, material]);
  useEffect(() => {
    (material.uniforms.uSat as any).value = saturation;
  }, [saturation, material]);

  // アニメーション
  useFrame(({ clock }) => {
    const m = meshRef.current;
    if (!m) return;
    if (rotationSpeed) m.rotation.z += rotationSpeed;
    if (bounce) m.position.y = position[1] + Math.sin(clock.elapsedTime * 1.2) * 0.08;
  });

  // 幅=scale, 高さ=scale/aspect となるようスケール設定
  const sx = scale;
  const sy = scale / aspect;

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={[sx, sy, 1]}
      material={material}
      // 1x1 のプレーン。UVは [0,1] で貼られる
      geometry={useMemo(() => new THREE.PlaneGeometry(1, 1, 1, 1), [])}
    />
  );
};
