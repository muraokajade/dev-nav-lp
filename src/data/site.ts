// src/data/site.ts
export const site = {
  brand: "DevNav+",
  // すべて「サイトを見る」に統一
  ctaLabel: "サイトを見る",

  // 公式サイト（デモ）へ飛ばすだけ
  requestUrl: "https://devnav.tech",

  // 声・導入事例は使わないので削除
  nav: [
    { href: "#features",   label: "特徴" },
    { href: "#curriculum", label: "カリキュラム" },
    { href: "#faq",        label: "FAQ" },
  ],

  hero: {
    badges: ["現場直結カリキュラム", "Q&A / 読了トラッキング"],
    headline: "3週間で、Spring × React を現場投入レベルに。",
    sub: "手を動かすハンズオンと、詰まったらすぐ聞けるQ&A。読了管理で可視化し、独学の回り道を最短化。",
    // 誇張・偽装になりうる数値を排除し、事実ベースに変更
    stats: [
      { k: "公開状況", v: "公開中",    sub: "devnav.tech" },
      { k: "構成",     v: "Vercel/Koyeb/Neon", sub: "本番同等" },
      { k: "記事数",   v: "100+ 本",     sub: "手順解説" },
    ],
  },

  features: [
    { icon: "🚀", title: "最新の現場手法で学べる", body: "API 設計〜DB〜フロント実装まで、今の現場で使う流儀をそのまま吸収。" },
    { icon: "🧭", title: "詰まらない学習導線",     body: "Q&A とレビュー、読了トラッキングで“止まらない学習”を実現。" },
    { icon: "📈", title: "チームで進捗可視化",     body: "誰がどこまで進んだか一目で把握。メンタリングもスムーズに。" },
  ],

  flow: [
    { step: "STEP 1", title: "環境構築",   body: "Docker で Spring & React を最短構築。" },
    { step: "STEP 2", title: "最小アプリ", body: "API→画面疎通、一覧/詳細を実装。" },
    { step: "STEP 3", title: "CRUD＋認証", body: "DB/CRUD/JWT 認証まで仕上げ。" },
  ],

  // 利用者の声や満足度は掲載しない方針のため削除
  // voices: [],

  cta: {
    heading: "デモで確認する",
    body: "実装とUIを公式サイトでご確認ください。",
    buttonLabel: "サイトを見る",
  },
};
