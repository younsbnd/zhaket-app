"use client";
import React, { useState } from "react";
import { Button, addToast } from "@heroui/react";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "@/lib/api/fetcher";
import MenuItemsList from "./MenuItemsList";
import MenuItemForm from "./MenuItemForm";
import { useParams } from "next/navigation";
import { IoMdArrowRoundForward } from "react-icons/io";
import { FiAlertTriangle } from "react-icons/fi";
import MenuItemsSkeleton from "@/components/skeletons/admin/MenuItemsSkeleton";



const MenuItemsLogic = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [parentItem, setParentItem] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { slug } = useParams();
  // fetch menu data from API (using slug which will be converted to id by the API)
  const { data: response, isLoading, mutate } = useSWR(
    process.env.NEXT_PUBLIC_API_BASE_URL + `/admin/menus/${slug}`,
    fetcher
  );

  const menu = response?.data;
  const menuId = menu?._id;

  // Helper function to generate unique ID
  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  // Helper function to add item to items array (recursive)
  const addItemToArray = (items, newItem, parentId = null) => {
    if (!parentId) {
      return [...items, { ...newItem, _id: generateId(), children: [] }];
    }

    return items.map((item) => {
      if (item._id === parentId) {
        return {
          ...item,
          children: [
            ...(item.children || []),
            { ...newItem, _id: generateId(), children: [] },
          ],
        };
      }
      if (item.children && item.children.length > 0) {
        return {
          ...item,
          children: addItemToArray(item.children, newItem, parentId),
        };
      }
      return item;
    });
  };

  // Helper function to update item in array (recursive)
  const updateItemInArray = (items, itemId, updatedData) => {
    return items.map((item) => {
      if (item._id === itemId) {
        return { ...item, ...updatedData };
      }
      if (item.children && item.children.length > 0) {
        return {
          ...item,
          children: updateItemInArray(item.children, itemId, updatedData),
        };
      }
      return item;
    });
  };

  // Helper function to delete item from array (recursive)
  const deleteItemFromArray = (items, itemId) => {
    return items
      .filter((item) => item._id !== itemId)
      .map((item) => {
        if (item.children && item.children.length > 0) {
          return {
            ...item,
            children: deleteItemFromArray(item.children, itemId),
          };
        }
        return item;
      });
  };

  // handle add item button click
  const handleAddItem = (parent = null) => {
    setParentItem(parent);
    setEditingItem(null);
    setIsFormOpen(true);
  };

  // handle edit item button click
  const handleEditItem = (item) => {
    setEditingItem(item);
    setParentItem(null);
    setIsFormOpen(true);
  };

  // handle close form button click
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingItem(null);
    setParentItem(null);
  };

  // handle submit for add or edit item
  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      let updatedItems;

      if (editingItem) {
        // Update existing item
        updatedItems = updateItemInArray(menu.items, editingItem._id, formData);
      } else {
        // Add new item
        updatedItems = addItemToArray(
          menu.items,
          formData,
          parentItem?._id || null
        );
      }

      // Send update to API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/menus/${menuId}/items`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ items: updatedItems }),
        }
      );

      if (!response.ok) {
        throw new Error("خطا در ذخیره آیتم");
      }

      addToast({
        description: editingItem
          ? "آیتم با موفقیت ویرایش شد"
          : "آیتم با موفقیت اضافه شد",
        color: "success",
        shouldShowTimeoutProgress: true,
      });

      // Refresh data
      mutate();
      handleCloseForm();
    } catch (error) {
      addToast({
        description: error.message || "خطا در ذخیره آیتم",
        color: "danger",
        shouldShowTimeoutProgress: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // handle delete item button click
  const handleDeleteItem = async (itemId) => {
    if (!confirm("آیا مطمئن هستید که می‌خواهید این آیتم را حذف کنید؟")) {
      return;
    }

    try {
      const updatedItems = deleteItemFromArray(menu.items, itemId);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/menus/${menuId}/items`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ items: updatedItems }),
        }
      );

      if (!response.ok) {
        throw new Error("خطا در حذف آیتم");
      }

      addToast({
        description: "آیتم با موفقیت حذف شد",
        color: "success",
        shouldShowTimeoutProgress: true,
      });

      // Refresh data
      mutate();
    } catch (error) {
      addToast({
        description: error.message || "خطا در حذف آیتم",
        color: "danger",
        shouldShowTimeoutProgress: true,
      });
    }
  };

  // show loading if menu items are loading
  if (isLoading) {
    return <MenuItemsSkeleton />;
  }

  if (!menu) {
    return (
      <div className="glass rounded-2xl p-5">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="text-4xl mb-4">
              <FiAlertTriangle className="text-lg" />
            </div>
            <p className="text-gray-400">منو یافت نشد</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="glass rounded-2xl p-4 md:p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center gap-8">
            <Button
              size="sm"
              as={Link}
              href="/admin/menus"
              variant="flat"
              className="rounded-xl w-fit text-white"
              startContent={<IoMdArrowRoundForward  className="text-lg" />}
            >
              بازگشت
            </Button>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg md:text-xl font-bold text-white">
                مدیریت آیتم های {menu.name}
              </h1>
              <p className="text-xs md:text-sm text-gray-400 truncate">
                شناسه: {menu.slug}
              </p>
            </div>
          </div>
          <Button
            size="sm"
            onPress={() => handleAddItem()}
            className="rounded-xl bg-gradient-to-l from-blue-600 to-indigo-700 px-4 py-5 text-sm text-white w-full sm:w-auto"
          >
            افزودن آیتم جدید
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Items List */}
        <div className="lg:col-span-2">
          <MenuItemsList
            items={menu.items || []}
            onEdit={handleEditItem}
            onDelete={handleDeleteItem}
            onAddChild={handleAddItem}
          />
        </div>

        {/* item form */}
        <div className="lg:col-span-1">
          <MenuItemForm
            item={editingItem}
            parentItem={parentItem}
            onClose={handleCloseForm}
            isOpen={isFormOpen}
            onSubmit={handleSubmit}
            isLoading={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
};

export default MenuItemsLogic;

