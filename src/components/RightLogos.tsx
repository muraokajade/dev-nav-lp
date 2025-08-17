// RightLogos.tsx
import * as THREE from "three";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { LogoPlane } from "./LogoPlane";

export function RightLogos({
  reactPos, tsPos, springPos, javaPos,
  reactScale, tsScale, springScale, javaScale,
}: {
  reactPos: [number, number, number];
  tsPos: [number, number, number];
  springPos: [number, number, number];
  javaPos: [number, number, number];
  reactScale: number; tsScale: number; springScale: number; javaScale: number;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[18rem] md:h-[24rem] overflow-hidden rounded-2xl"
    >
      {/* 背景カード */}
      <div className="absolute inset-0 bg-white z-0 ring-1 ring-white/10 shadow-2xl pointer-events-none
                      " />

      {/* 3Dロゴ（テクスチャ貼り付けに戻す） */}
      <Canvas
        className="absolute inset-0 z-10"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6], fov: 50 }}
        eventSource={containerRef as React.RefObject<HTMLElement>}
        eventPrefix="client"
        onCreated={({ gl }) => {
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.toneMapping = THREE.NoToneMapping; // 退色防止
        }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={0.7} />

        <LogoPlane
          url="/assets/logos/react.svg"
          position={reactPos}
          scale={reactScale}
          rotationSpeed={0.01}
        />
        <LogoPlane
          url="/assets/logos/ts.svg"
          position={tsPos}
          scale={tsScale}
        />
        <LogoPlane
          url="/assets/logos/spring.png"
          position={springPos}
          scale={springScale}
          bounce
        />
        <LogoPlane
          url="/assets/logos/java.png"
          position={javaPos}
          scale={javaScale}
        />
      </Canvas>
    </div>
  );
}
