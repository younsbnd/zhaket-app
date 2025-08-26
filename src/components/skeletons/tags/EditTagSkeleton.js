import { motion } from 'framer-motion';

export function EditTagSkeleton() {
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

      {/* Content Container */}
      <div className="mx-auto max-w-2xl px-4 py-10">
        {/* Page Title Skeleton */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6 flex items-center gap-2"
        >
          <div className="h-6 w-6 bg-slate-700/50 rounded animate-pulse"></div>
          <div className="h-6 w-24 bg-slate-700/50 rounded animate-pulse"></div>
        </motion.div>

        {/* Form Card Skeleton */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="glass rounded-2xl border border-slate-800/60 p-6 backdrop-blur-md shadow-xl"
        >
          <div className="space-y-5">
            {/* Name Field Skeleton */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="space-y-2"
            >
              <div className="h-4 w-12 bg-slate-700/50 rounded animate-pulse"></div>
              <div className="h-12 w-full bg-slate-700/30 border border-slate-700/40 rounded-xl animate-pulse"></div>
            </motion.div>

            {/* Slug Field Skeleton */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="space-y-2"
            >
              <div className="h-4 w-16 bg-slate-700/50 rounded animate-pulse"></div>
              <div className="h-12 w-full bg-slate-700/30 border border-slate-700/40 rounded-xl animate-pulse"></div>
            </motion.div>

            {/* Description Field Skeleton */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="space-y-2"
            >
              <div className="h-4 w-20 bg-slate-700/50 rounded animate-pulse"></div>
              <div className="h-24 w-full bg-slate-700/30 border border-slate-700/40 rounded-xl animate-pulse"></div>
            </motion.div>

            {/* Submit Button Skeleton */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="w-full h-12 bg-gradient-to-l from-slate-700/50 to-slate-600/50 rounded-xl animate-pulse flex items-center justify-center"
            >
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 bg-slate-600/50 rounded animate-pulse"></div>
                <div className="h-4 w-24 bg-slate-600/50 rounded animate-pulse"></div>
              </div>
            </motion.div>
          </div>

          {/* Pulsing overlay effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-2xl pointer-events-none"
          />
        </motion.div>
      </div>
    </div>
  );
}

export function EditTagErrorSkeleton({ message }) {
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

      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-red-400 text-lg p-8 bg-white/5 border border-red-400/20 rounded-xl backdrop-blur-md shadow-xl max-w-md text-center"
        >
          <div className="mb-4">
            <div className="w-16 h-16 mx-auto bg-red-400/20 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-red-400 rounded-full flex items-center justify-center">
                <span className="text-red-400 text-xl font-bold">!</span>
              </div>
            </div>
          </div>
          <p className="text-red-400">{message}</p>
        </motion.div>
      </div>
    </div>
  );
}
