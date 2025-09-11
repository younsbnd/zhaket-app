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
import AdminTableSkeleton from "../skeletons/admin/AdminTableSkeleton";

const AdminTable = ({
  isLoading,
  // Data props
  data = [],
  columns = [],

  // Create button props
  createLink,
  createButtonText,

  // Edit/Delete props
  editLinkPrefix,
  onDelete,
  deleteId,
  setDeleteId,
  isLoadingDelete,

  // Table props
  emptyMessage = "داده‌ای وجود ندارد",
  tableId = "admin-table",
  isActions = true,
}) => {
  const handleDelete = (id) => {
    setDeleteId(id);
    onDelete();
  };

  if (isLoading) {
    return <AdminTableSkeleton />;
  }

  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex flex-wrap items-center gap-3">
        <div className="ms-auto flex items-center gap-2">
          {createLink && createButtonText && (
            <Button
              size="sm"
              as={Link}
              href={createLink}
              className="rounded-xl bg-gradient-to-l from-blue-600 to-indigo-700 px-3 py-5 text-sm text-white"
            >
              {createButtonText}
            </Button>
          )}
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <Table
          radius="sm"
          shadow="none"
          aria-labelledby={tableId}
          classNames={{
            wrapper: "bg-transparent ",
            th: "bg-transparent text-white font-semibold text-[15px] text-white/80",
            td: "text-[15px]",
            tr: "h-[47px] not-last:not-first:border-y border-white/10 hover:bg-white/5",
          }}
        >
          {/* Table Header */}
          <TableHeader>
            {columns.map((column, index) => (
              <TableColumn key={index}>{column.header}</TableColumn>
            ))}
            {<TableColumn>اقدامات</TableColumn>}
          </TableHeader>

          {/* Table Body with no data */}
          <TableBody>
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="text-center">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}

            {data.map((item) => (
              <TableRow key={item._id}>
                {/* Data Columns */}
                {columns.map((column, index) => (
                  <TableCell key={index}>
                    {column.render ? column.render(item) : item[column.key]}
                  </TableCell>
                ))}

                {/* Actions Column */}
                {
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {editLinkPrefix && (
                        <Button
                          size="sm"
                          variant="shadow"
                          color="default"
                          className="text-[15px] rounded-[2px]"
                          as={Link}
                          href={`${editLinkPrefix}/${item._id}`}
                        >
                          ویرایش
                        </Button>
                      )}

                      <Button
                        size="sm"
                        variant="shadow"
                        color="danger"
                        className="text-sm rounded-[2px]"
                        onPress={() => handleDelete(item._id)}
                        isLoading={isLoadingDelete && deleteId === item._id}
                        isDisabled={isLoadingDelete}
                      >
                        <span className="whitespace-nowrap">حذف</span>
                      </Button>
                    </div>
                  </TableCell>
                }
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminTable;
