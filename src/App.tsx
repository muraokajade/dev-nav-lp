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
    <div className="text-white font-[Inter]">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur bg-black/30 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="text-xl font-extrabold">
            <span className="text-sky-400">{site.brand}</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm text-gray-300">
            {site.nav.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-white">
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-sm font-semibold btn-shine"
          >
            {site.ctaLabel}
          </a>
        </div>
      </header>

      {/* Sections */}
      <Hero />
      <Features />
      <Flow />
      <Voices />
      <FAQ />
      <CTA />

      {/* Contact（ダミー） */}
      <Section id="contact" className="py-14">
        <div className="mb-8">
          <div className="text-xs uppercase tracking-[.2em] text-sky-300/80 mb-2">Contact</div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">お問い合わせ</h2>
        </div>
        <p className="text-gray-300 mb-6 text-sm">
          フォームは後で差し替え。今はメールリンクだけ用意しています。
        </p>
        <a
          href={`mailto:${site.contactMail}`}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10"
        >
          {site.contactMail} にメールする
        </a>
      </Section>

      <Footer />

      {/* Sticky CTA（モバイル） */}
      <div className="fixed bottom-3 inset-x-0 px-4 md:hidden">
        <a
          href="#contact"
          className="block text-center rounded-xl bg-sky-500 hover:bg-sky-400 font-bold py-3 btn-shine"
        >
          いますぐ資料請求
        </a>
      </div>
    </div>
  );
};

export default App;
