// src/components/Section.tsx
import clsx from "clsx";
import React from "react";

export const Section: React.FC<{
  id?: string;
  className?: string;
  children: React.ReactNode;
}> = ({ id, className, children }) => (
  <section id={id} className={clsx("w-full scroll-mt-14", className)}>
    {children}
  </section>
);
