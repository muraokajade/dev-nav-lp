// src/components/Section.tsx
import clsx from "clsx";

type Space = "tight" | "normal" | "loose";

export const Section: React.FC<{
  id?: string;
  className?: string;
  space?: Space;
  /** 上だけ余白を潰す */
  flushTop?: boolean;
  /** 下だけ余白を潰す */
  flushBottom?: boolean;
  children: React.ReactNode;
}> = ({ id, className, space = "normal", flushTop, flushBottom, children }) => {
  const pad: Record<Space, string> = {
    tight:  "py-10 md:py-14",
    normal: "py-16 md:py-24",
    loose:  "py-20 md:py-32",
  };

  return (
    <section
      id={id}
      className={clsx(
        "max-w-6xl mx-auto px-4 scroll-mt-20 md:scroll-mt-24",
        pad[space],
        flushTop && "!pt-0",
        flushBottom && "!pb-0",
        className
      )}
    >
      {children}
    </section>
  );
};
