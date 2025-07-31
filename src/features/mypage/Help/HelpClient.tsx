"use client";

type FAQItem = {
  question: string;
  answer: string;
};

type ContactItem = {
  title: string;
  description: string;
};

type Props = {
  faqItems: FAQItem[];
  contactItems: ContactItem[];
};

export default function HelpClient({ faqItems, contactItems }: Props) {
  return (
    <div className="max-w-xl mx-auto space-y-8 p-4">
      {/* よくある質問セクション */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-4">よくある質問</h2>
        <div className="space-y-3">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="border rounded-md p-3 hover:bg-gray-50 transition text-sm"
            >
              <p className="font-medium">{item.question}</p>
              <p className="text-gray-600">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* お問い合わせセクション */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-4">お問い合わせ</h2>
        <div className="space-y-3">
          {contactItems.map((item, index) => (
            <div
              key={index}
              className="border rounded-md p-3 hover:bg-gray-50 transition text-sm"
            >
              <p className="font-medium">{item.title}</p>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
