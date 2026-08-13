"use client";

import type React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X, Loader2, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useDebounce } from "../../_hooks/useDebounce";
import { searchProducts } from "../../_services/product-search.service";
import { useRouter } from "next/navigation";
import Image from "next/image";
import RenderCurrency from "@/helper/render-currency";
import { IProductGetAll } from "../../_types/products";
import { CircularLogo, LogoImage } from "../../../../../public/images";
import Link from "next/link";
import { MenuButton } from "./nav-bar-menu";

interface SearchNavbarProps {
  placeholder?: string;
  className?: string;
  isFocusInput?: boolean;
  onClose?: () => void;
}

export function SearchNavbar({
  placeholder = "Search products...",
  isFocusInput,
  className,
  onClose,
}: SearchNavbarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<IProductGetAll[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const debouncedQuery = useDebounce(query, 300);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const searchResults = await searchProducts(searchQuery);
      setResults(searchResults);
      setSelectedIndex(-1);
    } catch (error) {
      console.error("Search failed:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isFocusInput) {
      inputRef.current?.focus();
    }
  }, [isFocusInput]);

  useEffect(() => {
    performSearch(debouncedQuery);
  }, [debouncedQuery, performSearch]);

  const handleSearchButtonClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/products?name=${encodeURIComponent(query)}`);
    setIsOpen(false);
    setQuery("");
    onClose?.();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(true);
    if (!value.trim()) {
      setResults([]);
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  // Handle product selection
  const handleProductSelect = (product: IProductGetAll) => {
    router.push(`/products/${product.slug}`);
    setIsOpen(false);
    setSelectedIndex(-1);
    setQuery("");
    onClose?.();
  };

  const router = useRouter();
  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          return handleProductSelect(results[selectedIndex]);
        }
        router.push(`/products?name=${encodeURIComponent(query)}`);
        setIsOpen(false);
        setQuery("");
        onClose?.();
        break;
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showResults = isOpen && (query.trim() !== "" || results.length > 0);

  return (
    <div
      ref={searchRef}
      className={cn("relative w-full flex flex-col items-center justify-center font-sans", className)}
    >
      {/* Sleek & Compact Search Input Bar */}
      <form onSubmit={handleSearchButtonClick} className="relative w-full flex items-center">
        <div className="relative flex items-center w-full bg-white rounded-full border border-[#E8E2D9] focus-within:border-[#0555A2] focus-within:ring-2 focus-within:ring-[#0555A2]/10 transition-all duration-300 shadow-xs px-3 py-1">
          <Search className="w-4 h-4 text-[#0555A2] shrink-0 ml-1" />
          
          <input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => query.trim() && setIsOpen(true)}
            className="w-full bg-transparent border-0 text-stone-900 text-xs sm:text-sm placeholder:text-stone-400 focus:outline-none focus:ring-0 focus-visible:ring-0 px-2.5 py-1 font-sans"
            aria-label="Search products"
            aria-expanded={showResults}
            aria-haspopup="listbox"
            aria-autocomplete="list"
            role="combobox"
          />

          {/* Right Action Icons & Button */}
          <div className="flex items-center gap-1.5 shrink-0">
            {isLoading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin text-[#0555A2]" />
            ) : (
              query && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )
            )}

            <Button
              type="submit"
              className="bg-[#0555A2] hover:bg-[#28AAE0] text-white rounded-full px-3.5 py-1 h-7.5 text-[11px] font-bold uppercase tracking-wider transition-all duration-300 shadow-2xs"
            >
              <span>Search</span>
            </Button>
          </div>
        </div>
      </form>

      {/* Popular Search Suggestions (when search query is empty) */}
      {!query && (
        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2 text-xs">
          <span className="text-stone-400 font-medium text-[11px]">Popular:</span>
          {["Biscuits", "Cookies", "Puffs", "Coffee", "Creamer", "Chocolate"].map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => {
                setQuery(term);
                setIsOpen(true);
                inputRef.current?.focus();
              }}
              className="px-2.5 py-0.5 rounded-full bg-white hover:bg-sky-50 text-stone-600 hover:text-[#0555A2] border border-[#E8E2D9] transition-colors text-[10px] font-medium"
            >
              {term}
            </button>
          ))}
        </div>
      )}

      {/* Aesthetic Search Results Dropdown */}
      {showResults && (
        <Card
          ref={resultsRef}
          className="absolute top-full left-0 right-0 z-[9999] mt-2 w-full bg-white rounded-2xl border border-[#E8E2D9] shadow-xl p-2 animate-in fade-in slide-in-from-top-2 overflow-hidden"
          role="listbox"
        >
          <div className="max-h-80 overflow-y-auto p-1 space-y-1">
            {isLoading && results.length === 0 ? (
              <div className="flex items-center justify-center py-6 text-xs text-stone-500 font-sans gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-[#0555A2]" />
                <span>Searching Arksh Food catalog...</span>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-1">
                {results.map((product, index) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductSelect(product)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl p-2 text-left transition-all duration-200 border border-transparent group",
                      selectedIndex === index
                        ? "bg-[#FAF8F5] border-[#0555A2]/20"
                        : "hover:bg-[#FAF8F5] hover:border-[#E8E2D9]"
                    )}
                    role="option"
                    aria-selected={selectedIndex === index}
                  >
                    {/* Product Image */}
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-stone-50 border border-[#E8E2D9]">
                      <Image
                        src={product.images?.url! || "/placeholder.svg"}
                        height={40}
                        width={40}
                        alt={product.images?.alt! || product.name}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-serif font-semibold text-xs text-stone-900 group-hover:text-[#0555A2] transition-colors truncate">
                        {product.name}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-bold text-[#0555A2]">
                          <RenderCurrency amount={product.specialPrice} />
                        </span>
                        {product.unitSellingPrice !== product.specialPrice && (
                          <span className="text-[10px] text-stone-400 line-through font-sans">
                            <RenderCurrency amount={product.unitSellingPrice} />
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : query.trim() && !isLoading ? (
              <div className="py-6 text-center text-xs text-stone-500 font-sans">
                No matching products found for "<span className="font-semibold text-stone-800">{query}</span>"
              </div>
            ) : null}
          </div>
        </Card>
      )}
    </div>
  );
}

