// src/components/Hero.tsx
import React from "react";
import Section from "./Section";
import { site } from "../data/site";
import { useMediaQuery } from "../hooks/useMediaQuery";

const RightLogos = React.lazy(() =>
  import("./RightLogos").then((m) => ({ default: m.RightLogos }))
);

/** 画面内に入ったら一度だけ true */
function useVisible() {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);
  return { ref, visible };
}

const Pill = React.memo<{ children: React.ReactNode }>(({ children }) => (
  <span className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full border bg-sky-500/15 text-sky-300 border-sky-500/30">
    {children}
  </span>
));


/** 3Dを避けたい環境（モバイル/低性能/省エネ設定）の判定 */
function useShouldFallbackImage() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const prefersReduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  // 必要に応じて他の条件も追加可
  return isMobile || prefersReduceMotion;
}

export const Hero: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { ref, visible } = useVisible();
  const useImageFallback = useShouldFallbackImage();

  // 3Dロゴの配置（RightLogos用）
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
    <Section
      className="py-8 pb-0"
      style={{ contentVisibility: "auto", containIntrinsicSize: "800px" }}
    >
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

          {/* CTA：サイトを見るで完全統一 */}
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={site.requestUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 font-bold btn-shine"
            >
              {site.ctaLabel /* "サイトを見る" */}
            </a>
            <a
              href="#features"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10"
            >
              特徴を見る
            </a>
          </div>

          {/* 統計：auto-fitで折り返し、はみ出し防止 */}
          {/* 統計：右の箱と同じ高さで3枚横並び（SPは1列） */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
            {site.hero.stats.map((s) => (
              <div
                key={s.k}
                className=" rounded-2xl border border-white/10 bg-white/5 p-4 flex flex-col justify-between"
              >
                <div className="text-[11px] text-gray-400">{s.k}</div>
                <div className="text-xl md:text-xl font-extrabold text-white leading-tight break-words">
                  {s.v}
                </div>
                {s.sub && (
                  <div className="text-[11px] text-gray-400">{s.sub}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 右カラム：3Dロゴ（必要に応じて静止画フォールバック） */}
        <div ref={ref} className="min-h-64">
          {visible ? (
            useImageFallback ? (
              // フォールバック静止画（public配下に用意しておく）
              <div className="rounded-2xl border border-white/10 bg-white/5 h-64 flex items-center justify-center">
                <img
                  src="/fallbacks/hero-fallback.webp"
                  alt=""
                  loading="lazy"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ) : (
              <React.Suspense
                fallback={
                  <div className="h-64 rounded-2xl border border-white/10 bg-white/5" />
                }
              >
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
              </React.Suspense>
            )
          ) : (
            <div className="h-64 rounded-2xl border border-white/10 bg-white/5" />
          )}
        </div>
      </div>
    </Section>
  );
};
