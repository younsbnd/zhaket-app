import DownloadsSkeleton from "@/components/skeletons/user-panel/DownloadsSkeleton";
import UserDownloads from "@/components/user-panel/downloads/UserDownloads";
import { metadata } from "@/lib/seo/metadata";
import React, { Suspense } from "react";

// generate metadata for seo the page
export const generateMetadata = () => {
  return metadata({
    title: "دانلودها",
    description: "دانلودها",
    noindex: true,
  });
};

const DownloadsPage = () => {
  return (
    <Suspense fallback={<DownloadsSkeleton />}>
      <UserDownloads />
    </Suspense>
  );
};

export default DownloadsPage;
