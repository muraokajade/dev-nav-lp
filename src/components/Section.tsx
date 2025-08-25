// src/components/Section.tsx（新規 or 既存を置換）
import React from "react";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  space?: "none" | "normal" | "wide";
  flushBottom?: boolean;
};

export default function Section({
  children,
  className,
  space = "none",
  flushBottom = false,
  ...rest
}: SectionProps) {
  const spaceClass =
    space === "normal" ? "py-8" : space === "wide" ? "py-16" : "";
  const classes = [spaceClass, flushBottom ? "pb-0" : "", className]
    .filter(Boolean)
    .join(" ");
  return (
    <section className={classes} {...rest}>
      {children}
    </section>
  );
}
