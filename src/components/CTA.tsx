import React from "react";
import { Section } from "./Section";
import { site } from "../data/site";

export const CTA: React.FC = () => (
  <Section className="py-16">
    <div className="rounded-2xl border border-sky-500/30 bg-sky-900/20 p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <div className="text-lg font-semibold">{site.cta.heading}</div>
        <p className="text-gray-300 text-sm">{site.cta.body}</p>
      </div>
      <a
        href="#contact"
        className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 font-bold btn-shine"
      >
        {site.cta.buttonLabel}
      </a>
    </div>
  </Section>
);
