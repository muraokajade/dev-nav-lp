// src/App.tsx
import React from "react";
import { site } from "./data/site";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Flow } from "./components/Flow";
import { Voices } from "./components/Voices";
import { FAQ } from "./components/FAQ";
import { CTA } from "./components/CTA";
import { Section } from "./components/Section";
import { Footer } from "./components/Footer";

const App: React.FC = () => {
  return (
    // ヘッダーかぶり対策（stickyヘッダーぶんのオフセット）
    <div id="top" className="text-white font-[Inter] scroll-smooth scroll-pt-14">
      {/* Header（本文と同じ幅に統一） */}
      <header className="sticky top-0 z-40 backdrop-blur bg-black/30 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <a
            href="#top"
            aria-label="Go to home"
            className="text-xl font-extrabold hover:opacity-90 focus-visible:ring-2 focus-visible:ring-sky-400 rounded"
          >
            <span className="text-sky-400">{site.brand}</span>
          </a>

          <nav className="hidden md:flex gap-6 text-sm text-gray-300">
            {site.nav.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-white">
                {n.label}
              </a>
            ))}
          </nav>

          {/* 資料請求は本体サイトへ */}
          <a
            href={site.requestUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-sm font-semibold btn-shine"
          >
            {site.ctaLabel}
          </a>
        </div>
      </header>

      {/* Main：幅と縦リズムを一括管理。モバイルは固定CTAぶつかり回避で pb-20 */}
      <main className="max-w-5xl mx-auto px-4 pb-20 md:pb-0">
        <div className="space-y-12 md:space-y-20 lg:space-y-24">
          <Hero />
          <Features />
          <Flow />
          <Voices />
          <FAQ />
          <CTA />

          {/* Contact：本体サイトへ誘導（mailtoは使わない運用） */}
          <Section id="contact">
            <div className="mb-6">
              <div className="text-xs uppercase tracking-[.2em] text-sky-300/80 mb-2">Contact</div>
              <h2 className="text-2xl md:text-3xl font-extrabold">お問い合わせ</h2>
            </div>
            <p className="text-gray-300 mb-4 text-sm">
              資料請求/お問い合わせは本サイトのフォームからお願いします。
            </p>
            <a
              href={site.requestUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10"
            >
              本サイトで資料請求する
            </a>
          </Section>
        </div>
      </main>

      <Footer />

      {/* Sticky CTA（モバイルも外部リンクに統一） */}
      <div className="fixed bottom-3 inset-x-0 px-4 md:hidden">
        <a
          href={site.requestUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center rounded-xl bg-sky-500 hover:bg-sky-400 font-bold py-3 btn-shine"
        >
          いますぐ資料請求
        </a>
      </div>
    </div>
  );
};

export default App;
