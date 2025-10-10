import React from "react";
import WalletLogic from "@/components/user-panel/wallet/WalletLogic";
import { metadata } from "@/lib/seo/metadata";

// generate metadata for seo the page
export const generateMetadata = () => {
  return metadata({
    title: "کیف پول",
    description: "کیف پول",
    noindex: true,
  });
};

const WalletPage = () => {
  return <WalletLogic />;
};

export default WalletPage;
