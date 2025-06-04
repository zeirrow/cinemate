// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is Cinemate?",
      answer: "Cinemate is your personal movie companion — explore top movies, check trailers, rate your favorites, and bookmark what you want to watch later."
    },
    {
      question: "How do I bookmark a movie?",
      answer: "Just hit the 🔖 icon on any movie detail page. Bookmarked movies are saved locally in your browser."
    },
    {
      question: "Can I watch trailers here?",
      answer: "Yep. If a trailer exists on YouTube, Cinemate will embed it directly on the movie page — no extra searching needed."
    },
    {
      question: "How do I rate a movie?",
      answer: "Use the star rating component on any movie page. Your ratings are stored locally and help you track what you've enjoyed."
    },
    {
      question: "Do I need an account?",
      answer: "Nope. Cinemate runs 100% in your browser. No signups. No trackers. Just movies."
    },
    {
      question: "Why is a movie missing info like runtime or trailer?",
      answer: "We fetch data from TMDb (The Movie Database). If some details are missing, they might not be available from the source."
    },
    {
      question: "Can I share a movie with friends?",
      answer: "Absolutely. Use the 📤 Share button on any movie to copy the link or share it with supported apps."
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto my-16 px-4 text-white">
      <h2 className="text-3xl font-bold mb-6 text-accent">🎬 Cinemate FAQ</h2>
      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <div 
            key={index}
            className="border-b border-gray-700 last:border-b-0"
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex justify-between items-center py-4 text-left focus:outline-none"
            >
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              <motion.div
                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <FiChevronDown className="text-gray-400 text-xl" />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="pb-4 text-gray-300">
                    {faq.answer.split('🔖').map((part, i) => (
                      i > 0 ? (
                        <span key={i}>
                          <span className="inline-block bg-white/10 px-2 py-1 rounded">🔖</span>
                          {part}
                        </span>
                      ) : (
                        <span key={i}>{part}</span>
                      )
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}