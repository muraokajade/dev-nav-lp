import React from "react";
import { Section } from "./Section";
import { site } from "../data/site";

export const Flow: React.FC = () => (
  <Section id="curriculum" className="py-14">
    <div className="mb-8">
      <div className="text-xs uppercase tracking-[.2em] text-sky-300/80 mb-2">Flow</div>
      <h2 className="text-2xl md:text-3xl font-extrabold text-white">学習の流れ（3ステップ）</h2>
    </div>

    <ol className="grid md:grid-cols-3 gap-6">
      {site.flow.map((s) => (
        <li key={s.step} className="p-5 rounded-2xl bg-white/5 border border-white/10">
          <div className="text-xs uppercase tracking-wide text-gray-400">{s.step}</div>
          <div className="font-semibold mt-1 text-white">{s.title}</div>
          <p className="text-gray-300 text-sm mt-2">{s.body}</p>
        </li>
      ))}
    </ol>
    <div className="mt-6">
      <a
        href="#contact"
        className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 font-bold"
      >
        導入の流れを相談する
      </a>
    </div>
  </Section>
);
