// src/components/CTA.tsx
import React from "react";
import  Section  from "./Section";
import { site } from "../data/site";

export const CTA: React.FC = () => (
  <Section id="cta">
    <h2 className="text-2xl md:text-3xl font-extrabold mb-2">{site.cta.heading}</h2>
    <p className="text-gray-300 mb-6">{site.cta.body}</p>
    <a
      href={site.requestUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 font-bold"
    >
      {site.cta.buttonLabel}
    </a>
  </Section>
);
export default CTA;
