"use client";
import { useEffect, useRef, useState } from "react";
import SearchModal from "./SearchModal";
import { useRouter } from "next/navigation";

export default function Search({ onClose }) {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const formRef = useRef(null);
  const router = useRouter();

  // Load recent searches from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("recentSearches");
      if (saved) setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Fetch search results from API
  const fetchResults = async (term, pageNum = 1) => {
    if (pageNum === 1) {
      setResults([]);
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/search?query=${encodeURIComponent(term)}&page=${pageNum}&limit=10`
      );
      if (!res.ok) throw new Error("Server error");

      const data = await res.json();
      if (pageNum === 1) {
        setResults(data.results);
      } else {
        setResults((prev) => [...prev, ...data.results]);
      }
    } catch (err) {
      console.error(err);
      setError("محصول دریافت نشد لطفا دوباره تلاش کنید");
      if (pageNum === 1) setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Save term to recent searches and localStorage
  const saveToRecentSearches = (item) => {
    if (typeof item === "string") {
      item = { title: item };
    }
    if (!item?.title?.trim()) return;

    setRecentSearches((prev) => {
      // Filter out duplicates by _id or by title (case-insensitive)
      const updated = [
        item,
        ...prev.filter((q) => {
          if (item._id && q._id) return q._id !== item._id;
          // fallback to title comparison if no _id
          return q.title.toLowerCase() !== item.title.toLowerCase();
        }),
      ].slice(0, 10);

      localStorage.setItem("recentSearches", JSON.stringify(updated));
      return updated;
    });
  };

  // Debounced search on query change
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const handler = setTimeout(() => {
      fetchResults(query, 1);
    }, 300);
    return () => clearTimeout(handler);
  }, [query]);

  // Handle search submit (e.g. press Enter)
  const handleSearchSubmit = (val) => {
    saveToRecentSearches(val);
    router.push(`/search?query=${encodeURIComponent(val)}`);
    onClose();
  };

  // Handle clicking a search result
  const handleSelectResult = (item) => {
    saveToRecentSearches(item);
    router.push(`/search?query=${encodeURIComponent(item.title)}`);
    setTimeout(() => onClose(), 100);
  };

  return (
    <SearchModal
      query={query}
      setQuery={setQuery}
      recentSearches={recentSearches}
      results={results}
      loading={loading}
      error={error}
      onClose={onClose}
      onSubmit={handleSearchSubmit}
      onSelectResult={handleSelectResult}
      formRef={formRef}
    />
  );
}
