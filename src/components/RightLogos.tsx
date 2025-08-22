// src/components/RightLogos.tsx
import * as THREE from "three";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { LogoPlane } from "./LogoPlane";

type V3 = [number, number, number];

type RightLogosProps = {
  // 任意：明示指定しない場合は isMobile に応じてデフォルトを使う
  reactPos?: V3;
  tsPos?: V3;
  springPos?: V3;
  javaPos?: V3;
  reactScale?: number;
  tsScale?: number;
  springScale?: number;
  javaScale?: number;
  // 任意：デフォルト値計算用フラグ（未指定なら false として扱う）
  isMobile?: boolean;
};

export const RightLogos: React.FC<RightLogosProps> = (props) => {
  const isMobile = !!props.isMobile;

  // ==== デフォルト（あなたが直前に使っていた値）====
  const defReactPos: V3  = isMobile ? [-1.5,  0.55, 0] : [-1.6,  0.35, 0];
  const defTsPos: V3     = isMobile ? [-0.3, -1.00, 0] : [-0.3, -1.00, 0];
  const defSpringPos: V3 = isMobile ? [ 1.5,  0.40, 0] : [ 1.2,  0.25, 0];
  const defJavaPos: V3   = isMobile ? [ 2.6, -0.90, 0] : [ 2.1, -1.00, 0];

  const defReactScale  = isMobile ? 2.00 : 2.30;
  const defTsScale     = isMobile ? 0.85 : 0.70;
  const defSpringScale = isMobile ? 2.50 : 2.50;
  const defJavaScale   = isMobile ? 1.55 : 1.20;

  // ==== 実際に使う値（props 優先、なければデフォルト）====
  const reactPos   = props.reactPos   ?? defReactPos;
  const tsPos      = props.tsPos      ?? defTsPos;
  const springPos  = props.springPos  ?? defSpringPos;
  const javaPos    = props.javaPos    ?? defJavaPos;
  const reactScale = props.reactScale ?? defReactScale;
  const tsScale    = props.tsScale    ?? defTsScale;
  const springScale= props.springScale?? defSpringScale;
  const javaScale  = props.javaScale  ?? defJavaScale;

  // Canvas のイベント範囲をこの枠内に限定
  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[18rem] md:h-[24rem] overflow-hidden rounded-2xl"
    >
      {/* 背景カード */}
      <div className="absolute inset-0 z-0 bg-white ring-1 ring-white/10 shadow-2xl pointer-events-none
                      bg-gradient-to-br from-zinc-900/80 to-zinc-800/40" />

      {/* 3D ロゴ */}
      <Canvas
        className="absolute inset-0 z-10"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6], fov: 50 }}
        eventSource={containerRef.current ?? undefined}
        eventPrefix="client"
        onCreated={({ gl }) => {
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.toneMapping = THREE.NoToneMapping;
        }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={0.7} />

        <LogoPlane
          url="/assets/logos/react.svg"
          position={reactPos}
          scale={reactScale}
          rotationSpeed={0.01}
          opacity={1}
          saturation={1.55}
        />
        <LogoPlane
          url="/assets/logos/ts.svg"
          position={tsPos}
          scale={tsScale}
          opacity={1}
        />
        <LogoPlane
          url="/assets/logos/spring.png"
          position={springPos}
          scale={springScale}
          opacity={1}
          saturation={1.25}
          bounce
        />
        <LogoPlane
          url="/assets/logos/java.png"
          position={javaPos}
          scale={javaScale}
          opacity={1}
        />
      </Canvas>
    </div>
  );
};
