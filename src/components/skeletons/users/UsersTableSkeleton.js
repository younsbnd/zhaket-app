"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Skeleton,
} from "@heroui/react";
import React from "react";
import { FiUser } from "react-icons/fi";

/**
 * UsersTableSkeleton component
 * Loading skeleton for UsersTable component
 */
const UsersTableSkeleton = () => {
  // Create array for skeleton rows
  const skeletonRows = Array.from({ length: 6 }, (_, index) => index);

  return (
    <div className="text-slate-100 min-h-screen selection:bg-blue-600/30">
      {/* Background layers */}
      <div className="fixed inset-0 -z-20 bg-cover bg-center" />
      <div className="fixed inset-0 -z-10" />

      <main className="mx-auto w-full max-w-7xl px-6 py-10">
        <div className="glass rounded-2xl p-6">
          {/* Header skeleton */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <FiUser className="text-blue-400 w-7 h-7" />
              <Skeleton className="h-8 w-32 rounded-lg bg-white/10" />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-32 rounded-xl bg-gradient-to-l from-blue-600/30 to-indigo-700/30" />
            </div>
          </div>

          {/* Table skeleton */}
          <div className="mt-6 overflow-x-auto">
            <Table
              radius="md"
              shadow="none"
              aria-labelledby="users-table-skeleton"
              classNames={{
                wrapper: "bg-transparent",
                th: "bg-transparent text-white font-semibold text-[15px]",
                td: "text-[14px]",
                tr: "h-[56px] not-last:not-first:border-y border-white/10",
              }}
            >
              <TableHeader>
                <TableColumn>نام کامل</TableColumn>
                <TableColumn>ایمیل</TableColumn>
                <TableColumn>شماره موبایل</TableColumn>
                <TableColumn>نقش</TableColumn>
                <TableColumn>اقدامات</TableColumn>
              </TableHeader>
              <TableBody>
                {skeletonRows.map((index) => (
                  <TableRow key={index}>
                    {/* Full name skeleton */}
                    <TableCell>
                      <div className="flex items-center gap-5">
                        <div className="size-12 rounded-lg bg-blue-500/15 flex items-center justify-center">
                          <FiUser className="text-blue-400 w-6 h-6" />
                        </div>
                        <div>
                          <Skeleton className="h-4 w-24 rounded-lg bg-white/10" />
                        </div>
                      </div>
                    </TableCell>

                    {/* Email skeleton */}
                    <TableCell>
                      <Skeleton className="h-4 w-32 rounded-lg bg-white/10" />
                    </TableCell>

                    {/* Phone skeleton */}
                    <TableCell>
                      <Skeleton className="h-4 w-28 rounded-lg bg-white/10" />
                    </TableCell>

                    {/* Role skeleton */}
                    <TableCell>
                      <Skeleton className="h-6 w-16 rounded-full bg-white/10" />
                    </TableCell>

                    {/* Actions skeleton */}
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {/* Edit button skeleton */}
                        <Skeleton className="h-8 w-16 rounded-md bg-white/10" />
                        {/* Delete button skeleton */}
                        <Skeleton className="h-8 w-12 rounded-md bg-red-500/20" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UsersTableSkeleton;
