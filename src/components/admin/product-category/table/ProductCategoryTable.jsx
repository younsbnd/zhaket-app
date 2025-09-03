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

const ProductCategoryTable = ({
  productCategories,
  isLoading,
  onOpenChange,
  isLoadingDelete,
  deleteId,
  setDeleteId,
}) => {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex flex-wrap items-center gap-3">
        <div className="ms-auto flex items-center gap-2">
          {/* button to create product category */}
          <Button
            size="sm"
            as={Link}
            href="/admin/product-categories/create"
            className="rounded-xl bg-gradient-to-l from-blue-600 to-indigo-700 px-3 py-2 text-[10px] text-white"
          >
            کاربر جدید
          </Button>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        {/* table */}
        <Table
          radius="sm"
          shadow="none"
          aria-labelledby="product-category-table"
          classNames={{
            wrapper: "bg-transparent ",
            th: "bg-transparent text-white font-semibold",
            td: "text-[11px]",
            tr: "h-[47px] not-last:not-first:border-y border-white/10 hover:bg-white/5",
          }}
        >
          {/* table header */}
          <TableHeader>
            <TableColumn>نام</TableColumn>
            <TableColumn>نامک</TableColumn>
            <TableColumn>وضعیت</TableColumn>
            <TableColumn>اقدامات</TableColumn>
          </TableHeader>
          {/* table body */}
          <TableBody>
            {productCategories.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  دسته بندی محصولی وجود ندارد
                </TableCell>
              </TableRow>
            )}
            {productCategories.map((productCategory) => (
              <TableRow key={productCategory._id}>
                <TableCell>{productCategory.name}</TableCell>
                <TableCell>{productCategory.slug}</TableCell>

                <TableCell>
                  <Chip
                    color={productCategory.isActive ? "success" : "danger"}
                    variant="flat"
                    radius="sm"
                    size="sm"
                    className="text-[12px] text-white "
                  >
                    {productCategory.isActive ? "فعال" : "غیرفعال"}
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
                      href={`/admin/product-categories/edit/${productCategory._id}`}
                    >
                      ویرایش
                    </Button>
                    <Button
                      size="sm"
                      variant="shadow"
                      color="danger"
                      className="text-[11px] w-auto h-[20px] rounded-[2px] "
                      onPress={() => {
                        setDeleteId(productCategory._id);
                        onOpenChange();
                      }}
                      isLoading={
                        isLoadingDelete && deleteId === productCategory._id
                      }
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

export default ProductCategoryTable;
