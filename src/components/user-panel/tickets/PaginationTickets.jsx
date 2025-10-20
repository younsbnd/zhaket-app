"use client";
import { Pagination } from "@heroui/pagination";
import React from "react";

const PaginationTickets = () => {
  return (
    <div>
      <Pagination
        total={10}
        initialPage={1}
        color="warning"
        classNames={{
          item: "cursor-pointer",
        }}
      />
    </div>
  );
};

export default PaginationTickets;
