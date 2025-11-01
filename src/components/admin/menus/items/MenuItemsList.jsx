"use client";
import React from "react";
import MenuItem from "./MenuItem";
import { BsListCheck } from "react-icons/bs";

const MenuItemsList = ({ items, onEdit, onDelete, onAddChild }) => {

  // show empty state if no items are found
  if (!items || items.length === 0) {
    return (
      <div className="glass rounded-2xl p-5">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-6xl text-gray-600 mb-4">
            <BsListCheck className="text-gray-600" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            هیچ آیتمی وجود ندارد
          </h3>
          <p className="text-sm text-gray-400">
            برای شروع، یک آیتم جدید اضافه کنید
          </p>
        </div>
      </div>
    );
  }

  // show items list
  return (
    <div className="glass rounded-2xl p-5">
      <h2 className="text-lg font-semibold text-white mb-4">لیست آیتم ها</h2>
      <div className="space-y-2">
        {items.map((item) => (
          <MenuItem
            key={item._id}
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
            onAddChild={onAddChild}
            level={0}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuItemsList;

