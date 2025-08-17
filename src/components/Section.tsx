import React from "react";

export const Section: React.FC<{
  id?: string;
  className?: string;
  children: React.ReactNode;
}> = ({ id, className, children }) => (
  <section id={id} className={`max-w-6xl mx-auto px-4 ${className || ""}`}>
    {children}
  </section>
);
