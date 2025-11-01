"use client";
import React, { useState } from "react";
import { Button } from "@heroui/react";
import {
  BiChevronDown,
  BiChevronLeft,
  BiEdit,
  BiTrash,
  BiPlus,
} from "react-icons/bi";

const MenuItem = ({ item, onEdit, onDelete, onAddChild, level = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div>
      {/* main item */}
      <div
        className="group flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition-colors cursor-pointer"
        onClick={hasChildren ? () => setIsExpanded(!isExpanded) : undefined}
      >
        <div className="flex items-center gap-3 flex-1">
          {/* expand/collapse icon */}
          {hasChildren ? (
            <div className="text-gray-400 transition-colors">
              {isExpanded ? (
                <BiChevronDown className="text-xl" />
              ) : (
                <BiChevronLeft className="text-xl" />
              )}
            </div>
          ) : (
            <div className="w-5" /> // empty space for alignment
          )}

          {/* item information */}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              {item.icon && (
                <span className="text-sm text-gray-400">{item.icon}</span>
              )}
              <h3 className="text-sm font-medium text-white">{item.title}</h3>
            </div>
            <p className="text-xs text-gray-400 mt-1">{item.url}</p>
          </div>
        </div>

        {/* action buttons */}
        <div 
          className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => e.stopPropagation()}
        >
          {/* add child button */}
          <Button
            size="sm"
            isIconOnly
            variant="flat"
            color="primary"
            className="rounded-lg min-w-8 w-8 h-8 text-blue-400"
            onPress={() => onAddChild(item)}
            title="افزودن زیرمنو"
          >
            <BiPlus className="text-lg" />
          </Button>
          {/* edit button */}
          <Button
            size="sm"
            isIconOnly
            variant="flat"
            color="default"
            className="rounded-lg min-w-8 w-8 h-8 text-gray-800"
            onPress={() => onEdit(item)}
            title="ویرایش"
          >
            <BiEdit className="text-lg" />
          </Button>
          {/* delete button */}
          <Button
            size="sm"
            isIconOnly
            variant="flat"
            color="danger"
            className="rounded-lg min-w-8 w-8 h-8 text-red-500"
            onPress={() => onDelete(item._id)}
            title="حذف"
          >
            <BiTrash className="text-lg" />
          </Button>
        </div>
      </div>

      {/* show children */}
      {hasChildren && isExpanded && (
        <div className="mt-2 space-y-2 mr-6">
          {item.children.map((child) => (
            <MenuItem
              key={child._id}
              item={child}
              onEdit={onEdit}
              onDelete={onDelete}
              onAddChild={onAddChild}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuItem;

