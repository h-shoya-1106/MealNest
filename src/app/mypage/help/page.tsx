import HelpClient from "../../../features/mypage/Help/HelpClient";

export default async function HelpPage() {
  // サーバーで取得するデータ（今は静的だが将来的にAPI化可）
  const faqItems = [
    {
      question: "献立はどのように作成しますか？",
      answer: "ホーム画面の「メニュー作成ボタン」から献立を作成できます。",
    },
    {
      question: "買い物リストの使い方は？",
      answer: "献立から自動で買い物リストを生成できます。",
    },
    {
      question: "データのバックアップはできますか？",
      answer: "設定画面からデータのエクスポートが可能です。",
    },
  ];

  const contactItems = [
    {
      title: "技術的な問題を報告",
      description: "アプリの不具合やエラーについて",
    },
    {
      title: "機能改善の提案",
      description: "新機能のアイデアや要望",
    },
  ];

  return <HelpClient faqItems={faqItems} contactItems={contactItems} />;
}
