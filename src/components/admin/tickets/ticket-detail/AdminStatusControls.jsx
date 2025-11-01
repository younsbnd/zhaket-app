"use client";

import React from "react";
import { Chip, Select, SelectItem } from "@heroui/react";

// getStatusConfig is a function that returns the config for the status
const getStatusConfig = (status) => {
  switch (status) {
    case "OPEN":
      return { color: "success", text: "باز" };
    case "PENDING":
      return { color: "warning", text: "در انتظار پاسخ" };
    case "ANSWERED":
      return { color: "primary", text: "پاسخ داده شده" };
    case "CLOSED":
      return { color: "danger", text: "بسته شده" };
    default:
      return { color: "default", text: "نامشخص" };
  }
};

const AdminStatusControls = ({ status, selectedStatus, onChange }) => {
  const statusConfig = getStatusConfig(status);

  return (
    <div className="flex justify-between items-center gap-3 mt-3 md:min-w-[200px]">
      <Select
        label=" وضعیت"
        placeholder="انتخاب وضعیت"
        selectedKeys={[selectedStatus]}
        onChange={onChange}
        className="max-w-xs"
        size="sm"
        variant="bordered"
        classNames={{
          trigger: "bg-white/10 border-white/20 text-white",
          value: "!text-white text-center",
          label: "!text-white/80",
        }}
      >
        <SelectItem key="OPEN" value="OPEN">
          باز
        </SelectItem>
        <SelectItem key="PENDING" value="PENDING">
          در انتظار پاسخ
        </SelectItem>
        <SelectItem key="ANSWERED" value="ANSWERED">
          پاسخ داده شده
        </SelectItem>
        <SelectItem key="CLOSED" value="CLOSED">
          بسته شده
        </SelectItem>
      </Select>
      <Chip
        color={statusConfig.color}
        variant="flat"
        size="md"
        className="text-white font-semibold"
      >
        {statusConfig.text}
      </Chip>
    </div>
  );
};

export default AdminStatusControls;
