import React from "react";
import { Section } from "./Section";
import { site } from "../data/site";
import CodeShowcase from "./CodeShowcase";

export const Features: React.FC = () => (
  <Section id="features" className="py-14">
    {/* 見出し */}
    <div className="mb-8">
      <div className="text-xs uppercase tracking-[.2em] text-sky-300/80 mb-2">Why</div>
      <h2 className="text-2xl md:text-3xl font-extrabold text-white">こんな課題、ありませんか？</h2>
    </div>

    {/* 課題カード */}
    <div className="grid md:grid-cols-3 gap-6">
      {site.features.map((f) => (
        <div key={f.title} className="p-5 rounded-2xl bg-white/5 border border-white/10">
          <div className="text-lg font-semibold mb-2">
            <span className="mr-2">{f.icon}</span>
            {f.title}
          </div>
          <p className="text-sm text-gray-300">{f.body}</p>
        </div>
      ))}
    </div>

    {/* コード・ショーケース */}
    <div className="mt-10">
      <div className="text-xs uppercase tracking-[.2em] text-sky-300/80 mb-2">Code Highlight</div>
      <h3 className="text-xl md:text-2xl font-extrabold text-white">
        Markdown のコードは<strong className="text-sky-400">美しく読みやすく</strong>表示
      </h3>
      <p className="mt-3 text-gray-300">
        ReactMarkdown + Prism ベースで、⾏番号・コピー・長⾏折返しに対応。実際の記事と同じ見え方でプレビューできます。
      </p>
      <ul className="mt-4 space-y-2 text-sm text-gray-300">
        <li>・主要言語（TS/JS、Java、SQL など）に対応</li>
        <li>・ダークテーマ（oneDark）でコントラスト最適化</li>
        <li>・コピー1クリック、モバイルでも読みやすい行高</li>
      </ul>

      <CodeShowcase className="mt-4" />
    </div>
  </Section>
);

export default Features;
