import { Skeleton } from "@heroui/react";
import { FiTag } from "react-icons/fi";

const TagsTableSkeleton = () => {
  // Create array for skeleton rows
  const skeletonRows = Array.from({ length: 5 }, (_, index) => index);

  return (
    <div className="text-slate-100 min-h-screen selection:bg-blue-600/30">
      {/* Background overlay */}
      <div className="fixed inset-0 -z-20 bg-cover bg-center" />
      <div className="fixed inset-0 -z-10" />

      <main className="mx-auto w-full max-w-7xl px-4 py-8">
        <div className="glass rounded-2xl p-5">
          {/* Header section skeleton */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <FiTag className="text-emerald-400" />
              <Skeleton className="h-6 w-24 rounded-lg bg-white/10" />
            </div>
            <Skeleton className="h-10 w-24 rounded-xl bg-white/10" />
          </div>

          {/* Table skeleton */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              {/* Table header skeleton */}
              <thead className="text-slate-300">
                <tr className="text-right">
                  <th className="px-3 py-2">
                    <Skeleton className="h-4 w-16 rounded bg-white/10" />
                  </th>
                  <th className="px-3 py-2">
                    <Skeleton className="h-4 w-12 rounded bg-white/10" />
                  </th>
                  <th className="px-3 py-2">
                    <Skeleton className="h-4 w-20 rounded bg-white/10" />
                  </th>
                  <th className="px-3 py-2">
                    <Skeleton className="h-4 w-16 rounded bg-white/10" />
                  </th>
                </tr>
              </thead>

              {/* Table body skeleton */}
              <tbody className="divide-y divide-white/10">
                {skeletonRows.map((index) => (
                  <tr key={index} className="hover:bg-white/5">
                    {/* Tag name column skeleton */}
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-3">
                        <Skeleton className="size-9 rounded-lg bg-white/10" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-32 rounded bg-white/10" />
                          <Skeleton className="h-3 w-24 rounded bg-white/10" />
                        </div>
                      </div>
                    </td>

                    {/* Tag slug column skeleton */}
                    <td className="px-3 py-3">
                      <Skeleton className="h-4 w-28 rounded bg-white/10" />
                    </td>

                    {/* Tag description column skeleton */}
                    <td className="px-3 py-3">
                      <Skeleton className="h-4 w-40 rounded bg-white/10" />
                    </td>

                    {/* Action buttons column skeleton */}
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-8 w-16 rounded-lg bg-white/10" />
                        <Skeleton className="h-8 w-12 rounded-lg bg-white/10" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TagsTableSkeleton;
