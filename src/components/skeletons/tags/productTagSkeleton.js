import { motion } from 'framer-motion';

export function TagsListSkeleton() {
  return (
    <div className="relative min-h-screen text-slate-100">
      {/* Background Layer */}
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1557683316-973673baf926?q=90&w=2400&auto=format&fit=crop')",
        }}
      ></div>
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#000814]/[0.99] via-[#000814]/[0.992] to-[#000814]/[0.996] backdrop-blur-sm"></div>

      {/* Page Container */}
      <div className="mx-auto max-w-7xl px-4 py-8 space-y-6">
        {/* Header Skeleton */}
        <div className="flex items-center gap-3">
          <div className="h-7 w-32 bg-slate-700/50 rounded-lg animate-pulse"></div>
          <div className="ms-auto">
            <div className="h-10 w-32 bg-slate-700/50 rounded-xl animate-pulse"></div>
          </div>
        </div>

        {/* Tags Grid Skeleton */}
        <div className="glass rounded-2xl border border-slate-800/50 p-5 backdrop-blur-md">
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.05 }}
                className="rounded-xl bg-white/5 border border-slate-700/40 p-5 shadow-lg"
              >
                {/* Title and Action Buttons Skeleton */}
                <div className="flex justify-between items-start mb-3">
                  <div className="h-6 w-24 bg-slate-700/50 rounded animate-pulse"></div>
                  <div className="flex gap-2">
                    {/* Edit Button Skeleton */}
                    <div className="h-7 w-7 bg-slate-700/50 rounded-full animate-pulse"></div>
                    {/* Delete Button Skeleton */}
                    <div className="h-7 w-7 bg-red-700/50 rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* ID Skeleton */}
                <div className="h-4 w-full bg-slate-700/50 rounded animate-pulse mb-2"></div>

                {/* Description Skeleton */}
                <div className="space-y-1">
                  <div className="h-3 w-full bg-slate-700/50 rounded animate-pulse"></div>
                  <div className="h-3 w-3/4 bg-slate-700/50 rounded animate-pulse"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
