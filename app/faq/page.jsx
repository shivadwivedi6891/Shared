'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqData = [
  {
    question: 'How do I place a bid on a vehicle?',
    answer:
      'To place a bid, you must first create an account and verify your email. Once logged in, go to the vehicle’s page and click "Place Bid." Enter your bid amount and confirm it.',
  },
  {
    question: 'Is there a fee to list my car?',
    answer:
      'Yes, we charge a small listing fee and a success fee once your car sells. All fees are clearly outlined during the listing process.',
  },
  {
    question: 'What happens if I win an auction?',
    answer:
      'If you win, you’ll be notified via email and your dashboard. You will then be responsible for completing payment and arranging transport with the seller.',
  },
  {
    question: 'Can I withdraw my bid?',
    answer:
      'No. All bids are final and legally binding. Please bid responsibly after reviewing the vehicle listing carefully.',
  },
  {
    question: 'Are vehicles inspected before listing?',
    answer:
      'We encourage sellers to provide third-party inspection reports and detailed photos. While not all vehicles are inspected by us directly, we prioritize listings with full transparency.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Frequently Asked Questions</h1>
        <p className="text-center text-gray-400 mb-12">
          Answers to the most common questions about buying and selling cars on our platform.
        </p>

        <div className="space-y-6">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="border border-white/10 rounded-lg p-6 bg-white/5 transition-all duration-300"
            >
              <button
                onClick={() => toggleAnswer(index)}
                className="flex items-center justify-between w-full text-left text-lg font-semibold"
              >
                {faq.question}
                {openIndex === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              {openIndex === index && (
                <p className="mt-4 text-gray-300 text-sm leading-relaxed">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
