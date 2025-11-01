"use client";
import { Button } from "@heroui/react";
import React, { useState } from "react";
import TopSectionSendTicket from "@/components/user-panel/tickets/new-ticket/TopSectionSendTicket";
import NewTicketAccordion from "@/components/user-panel/tickets/new-ticket/NewTicketAccordion";
import NewTicketFormLogic from "./NewTicketFormLogic";

const NewTicket = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <div>
      <div className="text-right bg-transparent p-4 md:py-0 min-h-[calc(100vh-200px)] mt-5">
        <div className="text-right bg-transparent space-y-4 md:mx-0 mx-2">
          <div className="rounded-lg bg-white text-card-foreground shadow-[0px_25px_10px_0px_#5B5E6812]">
            {/* top section send ticket */}
            <TopSectionSendTicket />
            {/* accordion items */}
            <div className="md:p-7.5 md:pt-4 p-2">
              <NewTicketAccordion />
            </div>
            <div className="flex justify-center items-center p-4 md:p-9 md:pt-1">
              {/* button to open the form */}
              {!isFormOpen && (
                <Button
                  onPress={() => setIsFormOpen(true)}
                  className="inline-flex items-center justify-center !transition-all duration-300 gap-2 lg:whitespace-nowrap ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-100 leading-5 bg-background h-[53px] rounded-md px-[30px] font-bold md:!w-[241px] border-[0.5px] border-[#E5E8EB] !text-gray-500 hover:!bg-lime-50 hover:!text-lime-700 w-full text-small tracking-tighter ! shadow-[0px_2px_6px_0px_#7E899B14]"
                >
                  جواب سوال خود را پیدا نکردم
                </Button>
              )}
            </div>
          </div>
          {/* new ticket form section */}
          <section className={`${isFormOpen ? "block" : "hidden"}`}>
            <div className="rounded-lg bg-white text-card-foreground shadow-[0px_25px_10px_0px_#5B5E6812] pt-9 md:pr-[52px] md:pl-[46px] px-2.5 pb-4">
              <NewTicketFormLogic />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default NewTicket;
