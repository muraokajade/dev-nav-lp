// src/components/Hero.tsx
import React from "react";
import { Section } from "./Section";
import { site } from "../data/site";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { RightLogos } from "./RightLogos";

const Pill: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full border bg-sky-500/15 text-sky-300 border-sky-500/30">
    {children}
  </span>
);

const Stat: React.FC<{ k: string; v: string; sub?: string }> = ({
  k,
  v,
  sub,
}) => (
  <div className="p-5 rounded-2xl border border-white/10 bg-white/5">
    <div className="text-xs text-gray-400 mb-1">{k}</div>
    <div className="text-3xl font-extrabold text-white">{v}</div>
    {sub && <div className="text-xs text-gray-400 mt-1">{sub}</div>}
  </div>
);

export const Hero: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  // 配置
  const reactPos = React.useMemo<[number, number, number]>(
    () => (isMobile ? [-1.5, 0.55, 0] : [-1.9, 0.35, 0]),
    [isMobile]
  );
  const tsPos = React.useMemo<[number, number, number]>(
    () => (isMobile ? [-0.5, -1.0, 0] : [-0.6, -1.0, 0]),
    [isMobile]
  );
  const springPos = React.useMemo<[number, number, number]>(
    () => (isMobile ? [1.5, 0.4, 0] : [1.5, 0.25, 0]),
    [isMobile]
  );
  const javaPos = React.useMemo<[number, number, number]>(
    () => (isMobile ? [2.6, -0.9, 0] : [2.7, -1.0, 0]),
    [isMobile]
  );

  // スケール
  const reactScale = isMobile ? 2.0 : 2.3;
  const tsScale = isMobile ? 0.75 : 0.7;
  const springScale = isMobile ? 2.7 : 3.0;
  const javaScale = isMobile ? 1.55 : 1.2;

  return (
    <Section space="normal" flushBottom>
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* 左カラム：テキスト */}
        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            {site.hero.badges.map((b) => (
              <Pill key={b}>{b}</Pill>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-emerald-400">
              {site.hero.headline}
            </span>
          </h1>
          <p className="mt-4 text-gray-300">{site.hero.sub}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 font-bold btn-shine"
            >
              5分で資料請求
            </a>
            <a
              href="#features"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10"
            >
              特徴を見る
            </a>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-8">
            {site.hero.stats.map((s) => (
              <Stat key={s.k} {...s} />
            ))}
          </div>
        </div>

        {/* 右カラム：3Dロゴ */}
        <RightLogos
          reactPos={reactPos}
          tsPos={tsPos}
          springPos={springPos}
          javaPos={javaPos}
          reactScale={reactScale}
          tsScale={tsScale}
          springScale={springScale}
          javaScale={javaScale}
        />
      </div>
    </Section>
  );
};
