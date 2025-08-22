// src/components/Showcase.tsx
import React from "react";
import { Section } from "./Section";

export const Showcase: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Section id="showcase" className="py-16 md:py-24">
      {/* 画像カラムを少し広めに */}
      <div className="grid gap-10 items-start md:[grid-template-columns:1fr_1.45fr] lg:[grid-template-columns:1fr_1.7fr]">
        {/* 左：コピー */}
        <div>
          <div className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full border bg-emerald-500/15 text-emerald-300 border-emerald-500/30">
            Q&A / コメント / レビュー
          </div>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-white">
            一画面で「投稿」「議論」「評価」を完結
          </h2>
          <p className="mt-4 text-gray-300 leading-relaxed">
            未ログインは閲覧だけ、ログインで投稿可能。レビューは星評価、Q&Aはスレッド化、読了トグルもワンクリック。
            管理画面ではラベル・リンク付きで素早く対応できます。
          </p>

          <ul className="mt-6 space-y-3 text-gray-300">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
              未ログイン: 一覧は見える、投稿UIは非表示
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
              レビュー: 平均/自分のスコア表示。投稿はログイン後に解放
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
              Q&amp;A/コメント: タブ切替・スレッド・本人のみ編集/削除
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
              読了トグル: 記事・文法・手順で統一API
            </li>
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#contact" className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 font-bold">
              導入について相談
            </a>
            <a href="#features" className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10">
              もっと詳しく
            </a>
          </div>
        </div>

        {/* 右：拡大できるスクショ */}
        <figure className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/70 to-zinc-800/40 p-3 shadow-2xl">
          {/* ウィンドウ風ヘッダ */}
          <div className="flex items-center gap-2 pb-2 px-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-lime-400/70" />
            <span className="ml-2 text-xs text-gray-400">Q&amp;A スクリーンショット</span>
          </div>

          {/* 画像本体：aspect で安定＆拡大時にくっきり */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="overflow-hidden rounded-xl ring-1 ring-white/10 block cursor-zoom-in group"
            aria-label="スクリーンショットを拡大表示"
          >
            <div className="aspect-[16/10] md:aspect-[16/9]">
              <img
                src="/assets/images/Q_and_A.png"
                srcSet="/assets/images/Q_and_A.png 1x, /assets/images/Q_and_A@2x.png 2x"
                sizes="(min-width:1024px) 720px, 90vw"
                alt="Q&A/レビュー/コメントUIのスクリーンショット"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.01]"
                style={{ imageRendering: "auto" }}
              />
            </div>
          </button>

          <figcaption className="text-xs text-gray-400 mt-2 px-1">
            * 画像はデモ。実際のUIは環境により異なります。
          </figcaption>
        </figure>
      </div>

      {/* 拡大モーダル */}
      {open && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <img
            src="/assets/images/Q_and_A.png"
            srcSet="/assets/images/Q_and_A.png 1x, /assets/images/Q_and_A@2x.png 2x"
            alt=""
            className="max-w-[min(95vw,1200px)] w-full h-auto rounded-xl ring-1 ring-white/10 shadow-2xl"
          />
          <button
            className="absolute top-4 right-4 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white"
            onClick={() => setOpen(false)}
          >
            閉じる
          </button>
        </div>
      )}
    </Section>
  );
};
