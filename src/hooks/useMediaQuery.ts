import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const get = () =>
    typeof window !== "undefined"
      ? window.matchMedia(query).matches
      : false;

  const [matches, setMatches] = useState(get);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    // 新API / 旧API 両対応
    if ("addEventListener" in mql) mql.addEventListener("change", onChange);
    else (mql as any).addListener?.(onChange);

    setMatches(mql.matches);
    return () => {
      if ("removeEventListener" in mql)
        mql.removeEventListener("change", onChange);
      else (mql as any).removeListener?.(onChange);
    };
  }, [query]);

  return matches;
}
