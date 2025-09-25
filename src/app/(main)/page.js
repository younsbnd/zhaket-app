import DiversChoicesSection from "@/components/main/home/various-choices-section/VariousChoicesSection";
import TopSection from "@/components/main/home/top-section/TopSection";
import { metadata } from "@/lib/seo/metadata";
import React from "react";
import DiscountsSetction from "@/components/main/home/discounts/DiscountsSetction";

export const generateMetadata = () => {
  return metadata({
    title: "ژاکت",
    description: "خانه",
  });
};

const HomePage = () => {
  return (
    <div className="pb-40">
      <TopSection />
      <div className="mx-auto">
        <DiversChoicesSection />
      </div>
      <div className="mx-auto">
        <DiscountsSetction />
      </div>
    </div>
  );
};

export default HomePage;
