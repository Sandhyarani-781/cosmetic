import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { Search, X, Star, ArrowRight, Sparkles } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    products,
    setSelectedProduct,
    addToCart,
    setCurrentView,
    setSelectedCategory,
  } = useShop();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filtered = query.trim() === ''
    ? []
    : products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.ingredients.some((ing) => ing.toLowerCase().includes(q))
        );
      });

  const popularSearches = ['Hyaluronic Serum', 'Velvet Lipstick', 'Rose Perfume', 'Hair Elixir', 'Gua Sha', 'Skin Tint'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="bg-[#FAF7F5] w-full max-w-2xl rounded-2xl shadow-2xl border border-[#F0E4E1] overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-5 py-4 border-b border-[#F0E4E1] bg-white gap-3">
          <Search className="w-5 h-5 text-[#8D382D] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search serums, lipsticks, perfumes, ingredients..."
            className="w-full bg-transparent text-sm sm:text-base text-[#2D2426] placeholder-[#A09395] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#A09395] hover:text-[#2D2426]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="ml-2 text-xs font-semibold uppercase tracking-wider text-[#7A6B6E] hover:text-[#2D2426] px-2 py-1"
          >
            Esc
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-5">
          {query.trim() === '' ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#A09395] mb-3">
                Trending Beauty Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((item) => (
                  <button
                    key={item}
                    onClick={() => setQuery(item)}
                    className="px-3 py-1.5 bg-[#F5EBE8] hover:bg-[#E8C5BE]/60 text-xs font-medium text-[#423639] rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3 h-3 text-[#C5A880]" />
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ) : filtered.length > 0 ? (
            <div className="space-y-3">
              <p className="text-xs text-[#7A6B6E] font-medium">
                Found <strong className="text-[#2D2426]">{filtered.length}</strong> matching beauty treasures:
              </p>
              <div className="divide-y divide-[#F0E4E1]">
                {filtered.map((product) => (
                  <div
                    key={product.id}
                    className="py-3 flex items-center justify-between gap-4 hover:bg-white/60 p-2 rounded-xl transition-colors cursor-pointer group"
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsSearchOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#F5EBE8] shrink-0 border border-[#F0E4E1]">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 text-[11px] text-[#A09395] uppercase tracking-wider">
                          <span>{product.brand}</span>
                          <span aria-hidden="true">·</span>
                          <span>{product.category}</span>
                        </div>
                        <h4 className="text-sm font-semibold text-[#2D2426] truncate group-hover:text-[#B9584B] transition-colors">
                          {product.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-bold text-[#2D2426] tabular-nums">
                            ${product.price}
                          </span>
                          {product.originalPrice > product.price && (
                            <span className="text-[11px] text-[#A09395] line-through tabular-nums">
                              ${product.originalPrice}
                            </span>
                          )}
                          <div className="flex items-center text-amber-500 text-[11px] ml-2">
                            <Star className="w-3 h-3 fill-current" />
                            <span className="ml-1 text-[#423639] font-medium tabular-nums">{product.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className="px-3 py-1.5 bg-[#2D2426] hover:bg-[#423639] text-white text-xs font-medium rounded-lg transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="font-serif text-xl text-[#2D2426] mb-2">No matching beauty products found</p>
              <p className="text-xs text-[#7A6B6E] max-w-sm mx-auto mb-6">
                We couldn't find any products matching "{query}". Try checking your spelling or exploring our curated categories.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setCurrentView('shop');
                  setIsSearchOpen(false);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2D2426] text-white text-xs font-semibold rounded-xl hover:bg-[#423639] transition-colors"
              >
                Browse All Products
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
