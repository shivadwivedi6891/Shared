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
		<main className='min-h-screen bg-white px-4 sm:px-6 md:px-10 py-16 text-black transition-colors duration-300'>
			<div className='max-w-3xl mx-auto'>
				<h1 className='text-3xl sm:text-4xl font-bold text-center mb-4'>
					Frequently Asked Questions
				</h1>
				<p className='text-center text-gray-600 mb-12 text-sm sm:text-base'>
					Answers to the most common questions about buying and selling cars on
					our platform.
				</p>

				<div className='space-y-5'>
					{faqData.map((faq, index) => (
						<div
							key={index}
							className={`border border-gray-200 rounded-xl p-5 bg-gray-50 transition-all duration-300 shadow-sm ${
								openIndex === index ? 'ring-2 ring-indigo-500/20' : ''
							}`}
						>
							<button
								onClick={() => toggleAnswer(index)}
								className='flex items-center justify-between w-full text-left text-base sm:text-lg font-medium focus:outline-none'
							>
								<span>{faq.question}</span>
								{openIndex === index ? (
									<ChevronUp className='w-5 h-5' />
								) : (
									<ChevronDown className='w-5 h-5' />
								)}
							</button>
							<div
								className={`grid transition-all duration-300 ease-in-out ${
									openIndex === index
										? 'grid-rows-[1fr] opacity-100 mt-3'
										: 'grid-rows-[0fr] opacity-0'
								}`}
							>
								<div className='overflow-hidden'>
									<p className='text-sm sm:text-base text-gray-700 leading-relaxed'>
										{faq.answer}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</main>
	);
}