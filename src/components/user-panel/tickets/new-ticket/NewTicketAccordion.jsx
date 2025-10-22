import { ACCORDION_ITEMS } from "@/constants/main/user/tickets/accordionItems";
import { Accordion, AccordionItem } from "@heroui/react";
import React from "react";

const NewTicketAccordion = () => {
  return (
    <div className="text-right bg-gray-50 md:px-6 md:pt-3 md:pb-6 p-2.5 rounded-md">
      {/* accordion */}
      <Accordion
        selectionMode="multiple"
        variant="splitted"
        itemClasses={{
          title: "text-sm text-gray-500 tracking-tight ",
          trigger: "text-sm tracking-tight px-3 cursor-pointer",
          base: "bg-white shadow-xs rounded-md p-0 border-1 border-gray-50",
          content:
            "text-[12px] leading-6 text-gray-500 tracking-tight rounded-md m-0 p-4 bg-gradient-to-b to-100% from-[#B8B8B8]/10 to-white",
        }}
      >
        {/* accordion items */}
        {ACCORDION_ITEMS.map((item) => (
          <AccordionItem key={item.title} title={item.title}>
            {item.content}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default NewTicketAccordion;
