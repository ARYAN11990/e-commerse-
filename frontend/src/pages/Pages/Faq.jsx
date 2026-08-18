import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDown, ChevronUp, Plus, Minus, Info, ChevronRight as BreadcrumbRight } from 'lucide-react';

const FaqItem1 = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col border-b border-stroke dark:border-strokedark">
      <button
        className="flex items-center justify-between py-5 text-left text-black dark:text-white font-medium sm:text-lg text-base hover:text-primary dark:hover:text-primary transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        <div className={`flex h-8 w-8 min-w-8 items-center justify-center rounded-full transition-transform duration-200 ${isOpen ? 'bg-primary text-white' : 'bg-[#F1F5F9] dark:bg-[#313D4A] text-black dark:text-white'}`}>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>
      {isOpen && (
        <div className="pb-5 pr-10 text-[#64748B] dark:text-[#8A99AF] transition-all">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const FaqItem2 = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-boxdark p-4 sm:p-6 mb-4">
      <button
        className="flex w-full items-center justify-between gap-4 text-left font-medium text-black dark:text-white hover:text-primary dark:hover:text-primary transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4 className="text-base sm:text-lg">{question}</h4>
        <div className={`flex h-8 w-8 min-w-8 items-center justify-center rounded-full transition-transform duration-200 ${isOpen ? 'bg-primary text-white' : 'bg-[#F1F5F9] dark:bg-[#313D4A] text-black dark:text-white'}`}>
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </div>
      </button>
      {isOpen && (
        <div className="mt-4 text-[#64748B] dark:text-[#8A99AF] transition-all">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const FaqItem3 = ({ question, answer }) => {
  return (
    <div className="flex gap-4 sm:gap-6 mb-8">
      <div className="flex h-10 w-10 min-w-10 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20">
        <Info size={24} />
      </div>
      <div>
        <h4 className="mb-3 text-lg font-semibold text-black dark:text-white">{question}</h4>
        <p className="text-[#64748B] dark:text-[#8A99AF]">{answer}</p>
      </div>
    </div>
  );
};

const Faq = () => {
  const faqs1 = [
    { question: "How does it work?", answer: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form." },
    { question: "Do I need a designer to use your templates?", answer: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form." },
    { question: "What do I need to do to start selling?", answer: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form." },
    { question: "What happens when I receive an order?", answer: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form." }
  ];

  const faqs2 = [
    { question: "How does it work?", answer: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form." },
    { question: "Do I need a designer to use your templates?", answer: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form." },
    { question: "What do I need to do to start selling?", answer: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form." },
    { question: "What happens when I receive an order?", answer: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form." }
  ];

  const faqs3 = [
    { question: "How does it work?", answer: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form." },
    { question: "Do I need a designer to use your templates?", answer: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form." },
    { question: "What do I need to do to start selling?", answer: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form." },
    { question: "What happens when I receive an order?", answer: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form." }
  ];

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold text-black dark:text-white">
          Faq's
        </h2>

        <nav>
          <ol className="flex items-center gap-2">
            <li>
              <NavLink className="font-medium text-[#64748B] dark:text-[#8A99AF] hover:text-primary dark:hover:text-primary" to="/">
                Dashboard
              </NavLink>
            </li>
            <li className="font-medium text-primary">
              <span className="flex items-center gap-2">
                <BreadcrumbRight size={16} />
                Faq's
              </span>
            </li>
          </ol>
        </nav>
      </div>

      <div className="flex flex-col gap-8">
        {/* Section 1 */}
        <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:p-10">
          <h3 className="mb-8 text-xl font-bold text-black dark:text-white">Faq's 1</h3>
          <div className="flex flex-col">
            {faqs1.map((faq, index) => (
              <FaqItem1 key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>

        {/* Section 2 */}
        <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:p-10">
          <h3 className="mb-8 text-xl font-bold text-black dark:text-white">Faq's 2</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:gap-8">
            <div className="flex flex-col gap-4">
              {faqs2.slice(0, 2).map((faq, index) => (
                <FaqItem2 key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
            <div className="flex flex-col gap-4">
              {faqs2.slice(2, 4).map((faq, index) => (
                <FaqItem2 key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:p-10">
          <h3 className="mb-8 text-xl font-bold text-black dark:text-white">Faq's 3</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 xl:gap-10">
            {faqs3.map((faq, index) => (
              <FaqItem3 key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Faq;
