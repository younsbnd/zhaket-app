"use client";
import { Accordion, AccordionItem } from "@heroui/react";
import React from "react";
import { BsQuestionCircle, BsPatchQuestion } from "react-icons/bs";

const CategoryFAQSection = ({ faqs }) => {
  // Sort FAQs by order
  const sortedFaqs = faqs?.sort((a, b) => a.order - b.order) || [];

  // if no FAQs, show a message
  if (!sortedFaqs || sortedFaqs.length === 0) {
    return null;
  }

  // if FAQs, show the FAQs
  return (
    <div className="text-right bg-white shadow-[0px_10px_25px_0px_#969BA41A] md:px-6 md:pt-3 md:pb-6 p-2.5 rounded-md">
      <div className="mb-4 flex items-center justify-start gap-2">
        <div className="flex items-center justify-center h-11 w-11 rounded-full bg-white shadow-[0px_5px_20px_0px_rgba(219,146,78,0.3)]">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[linear-gradient(247.65deg,_#FFC107_-35.57%,_#FF9737_100%)]">
            <BsPatchQuestion className="text-white" size={20} />
          </div>
        </div>
        <h3 className="text-lg font-bold text-[#565656]">سوالات متداول</h3>
      </div>

      <div className="bg-slate-50 p-5 rounded-md mt-6">
        {/* accordion */}
        <Accordion
          selectionMode="multiple"
          variant="splitted"
          itemClasses={{
            title: "text-sm text-gray-500 tracking-tight",
            trigger: "text-sm tracking-tight px-3 cursor-pointer bg-white",
            base: "bg-white shadow-xs rounded-md border-1 border-gray-50 p-0 py-[2px]",
            content:
              "text-[12px] leading-6 text-gray-500 tracking-tight m-0 p-4 border-t border-t-[#F4F5F6] rounded-b-md bg-white",
          }}
        >
          {/* map the FAQs */}
          {sortedFaqs.map((faq, index) => (
            <AccordionItem
              key={index}
              aria-label={faq.question}
              title={
                <div className="flex items-center gap-3">
                  <span className="bg-gray-100/70 px-[9px] pt-[3.5px] pb-[1.6px] text-gray-400/70 rounded-md">
                    ?
                  </span>
                  <span className="flex-1 text-gray-600 font-bold">
                    {faq.question}
                  </span>
                </div>
              }
            >
              <div className="pr-9 whitespace-pre-wrap text-gray-600 text-[13px]">
                {faq.answer}
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default CategoryFAQSection;

