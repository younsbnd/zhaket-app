"use client";
import React from "react";
import {
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import Link from "next/link";

const MenuTable = ({
  menus,
  isLoading,
  onOpenChange,
  isLoadingDelete,
  deleteId,
  setDeleteId,
}) => {
  // get status config for isActive
  const getStatusConfig = (isActive) => {
    return isActive 
      ? { color: "success", text: "فعال" }
      : { color: "danger", text: "غیرفعال" };
  };

  // get target config for target
  const getTargetConfig = (target) => {
    switch (target) {
      case "_self":
        return { color: "primary", text: "همان صفحه" };
      case "_blank":
        return { color: "secondary", text: "صفحه جدید" };
      default:
        return { color: "default", text: "نامشخص" };
    }
  };

  // get menu type config for menuType
  const getMenuTypeConfig = (menuType) => {
    switch (menuType) {
      case "mega-menu":
        return { color: "warning", text: "مگا منو" };
      case "header-menu":
        return { color: "primary", text: "منوی هدر" };
      case "footer-menu":
        return { color: "secondary", text: "منوی فوتر" };
      default:
        return { color: "default", text: "نامشخص" };
    }
  };

  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex flex-wrap items-center gap-3">
        <div className="ms-auto flex items-center gap-2">
          {/* button to create menu */}
          <Button
            size="sm"
            as={Link}
            href="/admin/menu/create"
            className="rounded-xl bg-gradient-to-l from-blue-600 to-indigo-700 px-3 py-2 text-[10px] text-white"
          >
            منوی جدید
          </Button>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        {/* table */}
        <Table
          radius="sm"
          shadow="none"
          aria-labelledby="menus-table"
          classNames={{
            wrapper: "bg-transparent",
            th: "bg-transparent text-white font-semibold",
            td: "text-[11px]",
            tr: "h-[47px] not-last:not-first:border-y border-white/10 hover:bg-white/5",
          }}
        >
          {/* table header */}
          <TableHeader>
            <TableColumn>نام منو</TableColumn>
            <TableColumn>نامک</TableColumn>
            <TableColumn>مسیر</TableColumn>
            <TableColumn>منوی والد</TableColumn>
            <TableColumn>نوع منو</TableColumn>
            <TableColumn>نوع باز کردن</TableColumn>
            <TableColumn>وضعیت</TableColumn>
            <TableColumn>اقدامات</TableColumn>
          </TableHeader>
          
          {/* table body */}
          <TableBody>
            {menus.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  منویی وجود ندارد
                </TableCell>
              </TableRow>
            )}
            
            {menus.map((menu) => (
              <TableRow key={menu._id}>
                <TableCell className="font-medium">{menu.name}</TableCell>
                <TableCell className="text-slate-400">{menu.slug}</TableCell>
                <TableCell className="text-slate-400">{menu.path}</TableCell>
                <TableCell className="text-slate-400">
                  {menu.parent?.name || "-"}
                </TableCell>
                
                <TableCell>
                  <Chip
                    color={getMenuTypeConfig(menu.menuType).color}
                    variant="flat"
                    radius="sm"
                    size="sm"
                    className="text-[12px] text-white"
                  >
                    {getMenuTypeConfig(menu.menuType).text}
                  </Chip>
                </TableCell>
                
                <TableCell>
                  <Chip
                    color={getTargetConfig(menu.target).color}
                    variant="flat"
                    radius="sm"
                    size="sm"
                    className="text-[12px] text-white"
                  >
                    {getTargetConfig(menu.target).text}
                  </Chip>
                </TableCell>
                
                <TableCell>
                  <Chip
                    color={getStatusConfig(menu.isActive).color}
                    variant="flat"
                    radius="sm"
                    size="sm"
                    className="text-[12px] text-white"
                  >
                    {getStatusConfig(menu.isActive).text}
                  </Chip>
                </TableCell>
                
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="shadow"
                      color="default"
                      className="text-[11px] rounded-[2px] w-auto h-[20px]"
                      as={Link}
                      href={`/admin/menu/edit/${menu._id}`}
                    >
                      ویرایش
                    </Button>
                    <Button
                      size="sm"
                      variant="shadow"
                      color="danger"
                      className="text-[11px] w-auto h-[20px] rounded-[2px]"
                      onPress={() => {
                        setDeleteId(menu._id);
                        onOpenChange();
                      }}
                      isLoading={isLoadingDelete && deleteId === menu._id}
                      isDisabled={isLoadingDelete}
                    >
                      <span className="whitespace-nowrap">حذف</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MenuTable;