import React, { useState } from "react";
import { Section } from "./Section";
import { faqs } from "../data/faq";

const Item: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10 py-3">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between text-left"
      >
        <span className="font-semibold text-white">{q}</span>
        <span className="text-sky-300">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="text-gray-300 text-sm mt-2">{a}</p>}
    </div>
  );
};

export const FAQ: React.FC = () => (
  <Section id="faq">
    <div className="mb-8">
      <div className="text-xs uppercase tracking-[.2em] text-sky-300/80 mb-2">FAQ</div>
      <h2 className="text-2xl md:text-3xl font-extrabold text-white">よくある質問</h2>
    </div>

    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      {faqs.map((f) => (
        <Item key={f.q} {...f} />
      ))}
    </div>
  </Section>
);
