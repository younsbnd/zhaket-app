"use client";
import { Pagination } from "@heroui/pagination";
import React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const PaginationTickets = ({ totalPages, onPageChange, currentPage }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // handle page change and update the URL
  const handlePageChange = (page) => {
    onPageChange(page);
    const params = new URLSearchParams(searchParams);
    params.set("page", page);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <Pagination
        total={totalPages}
        initialPage={currentPage}
        onChange={handlePageChange}
        color="warning"
        classNames={{
          item: "cursor-pointer",
        }}
      />
    </div>
  );
};

export default PaginationTickets;
