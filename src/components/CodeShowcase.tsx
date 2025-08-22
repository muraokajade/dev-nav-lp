import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type Snippet = {
  key: "ts" | "java" | "bash";
  label: string;
  code: string;
  lang: string;
};

const SNIPPETS: Snippet[] = [
  {
    key: "ts",
    label: "TypeScript",
    lang: "tsx",
    code: `// 認証コンテキスト（抜粋）
import { createContext, useContext, useEffect, useState } from "react";

type Auth = { idToken: string | null; loading: boolean; isAuthenticated: boolean };
const AuthContext = createContext<Auth>({ idToken: null, loading: true, isAuthenticated: false });
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<Auth>({ idToken: null, loading: true, isAuthenticated: false });

  useEffect(() => {
    // 実装例：Firebase/自作APIなどでトークン監視
    const unsubscribe = fakeOnAuth((token) =>
      setState({ idToken: token, loading: false, isAuthenticated: !!token })
    );
    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

// ダミー
function fakeOnAuth(cb: (token: string | null) => void) {
  const t = setTimeout(() => cb("demo.jwt.token"), 500);
  return () => clearTimeout(t);
}
`,
  },
  {
    key: "java",
    label: "Java",
    lang: "java",
    code: `// Spring Security (抜粋)
@Bean
SecurityFilterChain filter(HttpSecurity http) throws Exception {
  http.csrf(csrf -> csrf.disable())
      .authorizeHttpRequests(req -> req
        .requestMatchers(HttpMethod.GET, "/api/articles/**").permitAll()
        .requestMatchers("/api/review-scores/**").authenticated()
        .anyRequest().permitAll()
      );
  return http.build();
}`,
  },
  {
    key: "bash",
    label: "Bash",
    lang: "bash",
    code: `# 1発デプロイ例
git pull --rebase
pnpm i --frozen-lockfile
pnpm build
pm2 restart devnav-lp
echo "Deployed ✅"`,
  },
];

const Pill: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex items-center gap-2 text-[10px] px-2 py-0.5 rounded-full border bg-emerald-500/10 text-emerald-300 border-emerald-500/30">
    {children}
  </span>
);

export const CodeShowcase: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [active, setActive] = React.useState<Snippet>(SNIPPETS[0]);
  const [copied, setCopied] = React.useState(false);

  const doCopy = async () => {
    try {
      await navigator.clipboard.writeText(active.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  // Markdown → Prism
// Markdown → Prism（記事と同じ見栄え）
const components = {
  code({ className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || "");
    const codeString = String(children ?? "");
    return match ? (
      <SyntaxHighlighter
        style={oneDark}
        language={match[1]}
        PreTag="pre"                       // ← pre を使う
        showLineNumbers
        wrapLongLines={false}              // ← 強制折返しをOFF
        customStyle={{
          margin: 0,
          borderRadius: 12,
          background: "transparent",
          whiteSpace: "pre",               // ← 念のためダブル指定
        }}
        codeTagProps={{
          style: {
            whiteSpace: "pre",
            wordBreak: "normal",
            overflowWrap: "normal",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas",
          },
        }}
        {...props}
      >
        {codeString.replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children }: any) => <>{children}</>,
};


  const md = `### 記事本文は Markdown で美しく
\`\`\`${active.lang}
${active.code}
\`\`\`
`;

  return (
    <div className={`rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6 tracking-normal ${className}`}>
      {/* タブ & バッジ */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex gap-2">
          {SNIPPETS.map((s) => {
            const isActive = s.key === active.key;
            return (
              <button
                key={s.key}
                onClick={() => setActive(s)}
                className={`px-3 py-1 rounded-lg text-sm font-semibold transition
                  ${isActive ? "bg-sky-600 text-white" : "bg-white/10 text-gray-200 hover:bg-white/20"}`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          <Pill>Markdown</Pill>
          <Pill>Prism oneDark</Pill>
          <Pill>行番号</Pill>
          <button
            onClick={doCopy}
            className="ml-2 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-gray-100 text-sm"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* コード枠（グラデ削除済み） */}
      <div className="relative">
        <div className="relative rounded-2xl border border-white/10 bg-[#0b0f15] p-4 [word-break:normal] [overflow-wrap:normal]">
          <div className="tracking-normal">
            <ReactMarkdown components={components}>{md}</ReactMarkdown>
          </div>
        </div>
      </div>

      {/* 補足点 */}
      <ul className="mt-4 grid md:grid-cols-3 gap-3 text-sm text-gray-300">
        <li className="bg-white/5 border border-white/10 rounded-xl p-3">言語自動検出＆ハイライト</li>
        <li className="bg-white/5 border border-white/10 rounded-xl p-3">行番号・折返し・コピー対応</li>
        <li className="bg-white/5 border border-white/10 rounded-xl p-3">記事は Markdown で執筆OK</li>
      </ul>
    </div>
  );
};

export default CodeShowcase;
