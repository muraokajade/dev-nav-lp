// src/components/ReactLogoMesh.tsx
import * as THREE from "three";
import React, { useMemo, useRef, useLayoutEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { SVGLoader } from "three-stdlib";

type Props = {
  url: string;
  position?: [number, number, number];
  /** ビュー全体のスケール（SVG→3Dの変換係数に掛ける） */
  scale?: number;
  /** 全パスの色を強制上書きしたい場合 */
  color?: string;
  /** Z回転（秒間ラジアン） */
  rotateSpeed?: number;
  /** ストロークの点密度（曲線の滑らかさ） */
  sample?: number; // 既定 64
  /** stroke があるパスは fill を描かない（React ロゴで推奨） */
  preferStroke?: boolean; // 既定 true
};

const num = (v: unknown, fallback: number) => {
  if (v == null) return fallback;
  const n = parseFloat(String(v));
  return Number.isFinite(n) ? n : fallback;
};

export const ReactLogoMesh: React.FC<Props> = ({
  url,
  position = [0, 0, 0],
  scale = 1,
  color,
  rotateSpeed = 0,
  sample = 64,
  preferStroke = true,
}) => {
  /** 外側（回転・位置・スケール用） */
  const outerRef = useRef<THREE.Group>(null);
  /** 内側（実メッシュ格納。ここをセンタリング） */
  const innerRef = useRef<THREE.Group>(null);

  const data = useLoader(SVGLoader, url);

  const nodes = useMemo(() => {
    const items: React.ReactNode[] = [];

    data.paths.forEach((path, i) => {
      const style = (path.userData?.style ?? {}) as Record<string, any>;

      // ============ 塗り（fill） ============
      const hasStroke = typeof style.stroke === "string" && style.stroke !== "none";
      const hasFill = typeof style.fill === "string" && style.fill !== "none";

      // stroke 優先表示なら、stroke のあるパスは fill を描かない
      const shouldDrawFill = hasFill && !(preferStroke && hasStroke);

      if (shouldDrawFill || color) {
        const fillColor = (color ?? style.fill) as string;
        const fillOpacity = num(style.fillOpacity ?? style.opacity, 1);

        path.toShapes(true).forEach((shape, j) => {
          const geom = new THREE.ShapeGeometry(shape);
          // ★ ここでは center() しない（全パスが原点に集合して崩れるため）
          items.push(
            <mesh key={`fill-${i}-${j}`} geometry={geom}>
              <meshBasicMaterial
                color={fillColor}
                opacity={fillOpacity}
                transparent={fillOpacity < 1}
                side={THREE.DoubleSide}
                toneMapped={false}
              />
            </mesh>
          );
        });
      }

      // ============ 線（stroke） ============
      if (hasStroke || color) {
        const strokeColor = (color ?? style.stroke ?? "#00D8FF") as string;
        const strokeWidth = num(style.strokeWidth, 4);
        if (strokeWidth > 0) {
          const strokeOpacity = num(style.strokeOpacity ?? style.opacity, 1);
          const strokeLineJoin = (style.strokeLinejoin ??
            style.strokeLineJoin ??
            "miter") as "miter" | "round" | "bevel";
          const strokeLineCap = (style.strokeLinecap ??
            style.strokeLineCap ??
            "butt") as "butt" | "round" | "square";
          const strokeMiterLimit = num(style.strokeMiterlimit ?? style.strokeMiterLimit, 4);

          const mat = new THREE.MeshBasicMaterial({
            color: strokeColor,
            opacity: strokeOpacity,
            transparent: strokeOpacity < 1,
            side: THREE.DoubleSide,
            toneMapped: false,
          });

          path.subPaths.forEach((sp, k) => {
            // ★ 曲線を滑らかにするため点を増やす
            const pts = sp.getSpacedPoints(Math.max(32, sample));
            const geom = SVGLoader.pointsToStroke(pts, {
              strokeWidth,
              strokeLineJoin,
              strokeLineCap,
              strokeMiterLimit,
              strokeColor, // d.ts 的に string
            });
            if (geom) {
              // ★ ここでも center() はしない
              items.push(<mesh key={`stroke-${i}-${k}`} geometry={geom} material={mat} />);
            }
          });
        }
      }
    });

    return items;
  }, [data, color, sample, preferStroke]);

  // ★ グループ単位でセンタリング（各ジオメトリに center() を掛けないこと）
  useLayoutEffect(() => {
    if (!innerRef.current) return;
    const box = new THREE.Box3().setFromObject(innerRef.current);
    const c = box.getCenter(new THREE.Vector3());
    innerRef.current.position.x -= c.x;
    innerRef.current.position.y -= c.y;
    innerRef.current.position.z -= c.z;
  }, [nodes]);

  // 回転
  useFrame(() => {
    if (rotateSpeed && outerRef.current) {
      outerRef.current.rotation.z += rotateSpeed;
    }
  });

  // SVG → Three 変換スケール（Y 反転込み）
  const s = 0.008 * scale;

  return (
    <group ref={outerRef} position={position} scale={[s, -s, s]}>
      <group ref={innerRef}>{nodes}</group>
    </group>
  );
};
