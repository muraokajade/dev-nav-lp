import React from "react";
import { Section } from "./Section";
import { site } from "../data/site";

export const Features: React.FC = () => (
  <Section id="features" className="py-14">
    <div className="mb-8">
      <div className="text-xs uppercase tracking-[.2em] text-sky-300/80 mb-2">Why</div>
      <h2 className="text-2xl md:text-3xl font-extrabold text-white">こんな課題、ありませんか？</h2>
    </div>

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
  </Section>
);
