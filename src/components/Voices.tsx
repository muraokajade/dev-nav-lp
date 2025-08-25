import React from "react";
import { Section } from "./Section";
import { site } from "../data/site";

export const Voices: React.FC = () => (
  <Section id="voices">
    <div className="mb-8">
      <div className="text-xs uppercase tracking-[.2em] text-sky-300/80 mb-2">Voices</div>
      <h2 className="text-2xl md:text-3xl font-extrabold text-white">受講者の声</h2>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      {site.voices.map((v) => (
        <div key={v.name} className="p-6 rounded-2xl border border-white/10 bg-white/5">
          <div className="text-sm text-gray-300 italic">“{v.quote}”</div>
          <div className="text-xs text-gray-400 mt-3">— {v.name}</div>
        </div>
      ))}
    </div>
  </Section>
);
