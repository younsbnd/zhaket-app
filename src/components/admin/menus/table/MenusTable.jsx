"use client";
import React from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import Link from "next/link";
import AdminTableSkeleton from "@/components/skeletons/admin/AdminTableSkeleton";

const MenusTable = ({
  menus,
  isLoading,
  deleteHandler,
  isLoadingDelete,
  deleteId,
  setDeleteId,
}) => {

  // show loading if menus are loading
  if (isLoading) {
    return <AdminTableSkeleton />;
  }

  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex flex-wrap items-center gap-3">
        {/* create menu button */}
        <div className="ms-auto flex items-center gap-2">
          <Button
            size="sm"
            as={Link}
            href="/admin/menus/create"
            className="rounded-xl bg-gradient-to-l from-blue-600 to-indigo-700 px-3 py-5 text-sm text-white"
          >
            منوی جدید
          </Button>
        </div>
      </div>

      {/* table */}
      <div className="mt-4 overflow-x-auto">
        <Table
          radius="sm"
          shadow="none"
          aria-labelledby="menus-table"
          classNames={{
            wrapper: "bg-transparent ",
            th: "bg-transparent text-white font-semibold text-[15px] text-white/80",
            td: "text-[15px]",
            tr: "h-[47px] not-last:not-first:border-y border-white/10 hover:bg-white/5",
          }}
        >
          {/* table header */}
          <TableHeader>
            <TableColumn>نام</TableColumn>
            <TableColumn>شناسه</TableColumn>
            <TableColumn>اقدامات</TableColumn>
          </TableHeader>

          {/* table body */}
          <TableBody>
            {menus.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  منویی وجود ندارد
                </TableCell>
              </TableRow>
            )}

            {/* table rows */}
            {menus.map((menu) => (
              <TableRow key={menu._id}>
                <TableCell>{menu.name}</TableCell>
                <TableCell>{menu.slug}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {menu.isEditable && (
                      <>
                        {/* edit button */}
                        <Button
                          size="sm"
                          variant="shadow"
                          color="default"
                          className="text-[15px] rounded-[2px]"
                          as={Link}
                          href={`/admin/menus/edit/${menu._id}`}
                        >
                          ویرایش
                        </Button>
                        {/* delete button */}
                        <Button
                          size="sm"
                          variant="shadow"
                          color="danger"
                          className="text-sm rounded-[2px]"
                          onPress={() => {
                            setDeleteId(menu._id);
                            deleteHandler(menu._id);
                          }}
                          isLoading={isLoadingDelete && deleteId === menu._id}
                          isDisabled={isLoadingDelete}
                        >
                          <span className="whitespace-nowrap">حذف</span>
                        </Button>
                      </>
                    )}
                    {/* manage items button */}
                    <Button
                      size="sm"
                      variant="shadow"
                      color="primary"
                      className="text-sm rounded-[2px]"
                      as={Link}
                      href={`/admin/menus/${menu.slug}`}
                    >
                      <span className="whitespace-nowrap">مدیریت آیتم ها</span>
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

export default MenusTable;

