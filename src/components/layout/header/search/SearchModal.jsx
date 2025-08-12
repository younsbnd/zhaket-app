"use client";

import { AnimatePresence, motion } from "framer-motion";
import SearchForm from "./SearchForm";
import SearchSuggestion from "./SearchSuggestion";
import SearchResultItem from "./SearchResultItem";
import Image from "next/image";
import LoadingMessage from "../../Loader";

export default function SearchModal({
  query,
  setQuery,
  recentSearches,
  results,
  loading,
  error,
  onClose,
  onSubmit,
  onSelectResult,
  formRef,
}) {
  return (
    <AnimatePresence>
      <motion.div
        role='dialog'
        aria-modal='true'
        className='absolute inset-0 w-screen h-screen bg-zhaket-secondary/50 z-[9999] flex items-start justify-center'
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>
        <motion.div
          onClick={(e) => e.stopPropagation()}
          ref={formRef}
          className='md:w-[50%] relative sm:w-[90%] w-full bg-zhaket-bg sm:mt-0 rounded-br-xl rounded-bl-xl md:px-10 sm:px-5 px-2 pb-3 max-h-[80vh] overflow-y-auto scrollbar-hide'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}>
          {/* Sticky Search Form */}
          <div className='sticky top-0 left-0 right-0 bg-light pt-3 z-10'>
            <SearchForm
              query={query}
              setQuery={setQuery}
              onSubmit={onSubmit}
              showBtnMore={results.length > 5}
              onClose={onClose}
            />
          </div>

          {/* Loading / Error */}
          {loading && <LoadingMessage />}
          {error && <p className='text-red-500 mt-4'>{error}</p>}

          {/* Results */}
          <motion.div
            className='mt-4 space-y-2'
            initial='hidden'
            animate='visible'
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2,
                },
              },
            }}>
            {results.length > 0
              ? results.map((item, i) => (
                  <SearchResultItem
                    key={i}
                    item={item}
                    onSelect={onSelectResult}
                    index={i}
                  />
                ))
              : query &&
                !loading &&
                !error && <p className='mt-4 text-black/60'>موردی یافت نشد</p>}
          </motion.div>

          {/* Recent Searches */}
          {recentSearches.length > 0 && results.length === 0 && (
            <motion.div
              className='mt-6'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}>
              <div className='mt-6'>
                <p className='text-black/60 mb-2'>جستجوهای اخیر:</p>
                <div
                  className='hide-scrollbar w-full flex md:gap-16 gap-10 justify-center mx-auto overflow-x-auto whitespace-nowrap px-4'
                  style={{ scrollBehavior: "smooth" }}>
                  {recentSearches.map((item, i) => (
                    <motion.button
                      key={item._id || i}
                      onClick={() => setQuery(item.title || "")}
                      className='flex-shrink-0 flex md:w-20 w-16 flex-col items-center rounded-full text-center group'
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}>
                      <Image
                        src={
                          item.imageUrl && item.imageUrl.length > 0
                            ? item.imageUrl[0]
                            : "/placeholder.png"
                        }
                        alt={item.title}
                        width={80}
                        height={80}
                        className='object-cover rounded-md'
                        loading='lazy'
                      />
                      <span className='truncate max-w-full text-center text-xs font-medium'>
                        {item.title}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {!query && <SearchSuggestion />}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
