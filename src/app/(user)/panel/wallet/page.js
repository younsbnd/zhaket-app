import React, { Suspense } from "react";
import WalletLogic from "@/components/user-panel/wallet/WalletLogic";
import WalletSkeleton from "@/components/skeletons/user-panel/WalletSkeleton";
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
  return (
    <Suspense fallback={<WalletSkeleton />}>
      <WalletLogic />
    </Suspense>
  );
};

export default WalletPage;
