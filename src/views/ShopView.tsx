import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { ProductCategory } from '../types';
import { Filter, SlidersHorizontal, RotateCcw, Search, Sparkles } from 'lucide-react';

export const ShopView: React.FC = () => {
  const { 
    products, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery,
    currentView 
  } = useShop();

  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<'all' | 'under30' | '30to60' | 'over60'>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('popular');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories: (ProductCategory | 'All')[] = [
    'All',
    'Skincare',
    'Makeup',
    'Lip Care',
    'Fragrances',
    'Haircare',
    'Face Makeup',
    'Eye Makeup',
    'Beauty Accessories'
  ];

  const brands = useMemo(() => {
    const list = Array.from(new Set(products.map((p) => p.brand)));
    return ['All', ...list];
  }, [products]);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Specialized views
      if (currentView === 'new-arrivals' && !product.isNew) return false;
      if (currentView === 'best-sellers' && !product.isBestSeller) return false;

      // Category
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }
      // Brand
      if (selectedBrand !== 'All' && product.brand !== selectedBrand) {
        return false;
      }
      // Price
      if (priceRange === 'under30' && product.price >= 30) return false;
      if (priceRange === '30to60' && (product.price < 30 || product.price > 60)) return false;
      if (priceRange === 'over60' && product.price <= 60) return false;
      // Rating
      if (minRating > 0 && product.rating < minRating) return false;
      // Stock
      if (onlyInStock && !product.inStock) return false;
      // Search
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matches = 
          product.name.toLowerCase().includes(q) ||
          product.brand.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [products, selectedCategory, selectedBrand, priceRange, minRating, onlyInStock, searchQuery]);

  // Sorting Logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      case 'popular':
      default:
        return list.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0) || b.reviewCount - a.reviewCount);
    }
  }, [filteredProducts, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedBrand('All');
    setPriceRange('all');
    setMinRating(0);
    setOnlyInStock(false);
    setSearchQuery('');
  };

  const hasActiveFilters = 
    selectedCategory !== 'All' || 
    selectedBrand !== 'All' || 
    priceRange !== 'all' || 
    minRating > 0 || 
    onlyInStock ||
    searchQuery !== '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header Banner */}
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#8D382D]">
          {currentView === 'new-arrivals' 
            ? 'Fresh Formulations' 
            : currentView === 'best-sellers' 
            ? 'Cult Classics' 
            : 'The Complete Collection'}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2D2426] font-normal mt-1">
          {currentView === 'new-arrivals'
            ? 'New Arrivals'
            : currentView === 'best-sellers'
            ? 'Best Selling Products'
            : selectedCategory === 'All'
            ? 'All Beauty Essentials'
            : selectedCategory}
        </h1>
        <p className="text-xs sm:text-sm text-[#7A6B6E] mt-2 max-w-xl">
          Clean formulas, skin-loving botanical infusions, and sensorial textures created to elevate your daily beauty ritual.
        </p>
      </div>

      {/* Top Filter & Sort Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#F0E4E1] shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
        
        {/* Results Count & Quick Category Tabs */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden flex items-center gap-2 px-3 py-2 bg-[#FAF7F5] border border-[#E8C5BE] rounded-xl text-xs font-semibold text-[#2D2426]"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>
          
          <span className="text-xs text-[#7A6B6E] font-medium">
            Showing <strong className="text-[#2D2426] tabular-nums">{sortedProducts.length}</strong> of{' '}
            <span className="tabular-nums">{products.length}</span> products
          </span>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs text-[#8D382D] hover:underline flex items-center gap-1 font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              Reset all
            </button>
          )}
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          <span className="text-xs font-semibold text-[#423639] whitespace-nowrap">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#FAF7F5] border border-[#E8C5BE] rounded-xl px-3 py-2 text-xs font-medium text-[#2D2426] focus:outline-none focus:border-[#2D2426]"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest Arrivals</option>
          </select>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Sidebar Filters (Desktop + Mobile overlay) */}
        <div className={`lg:block ${mobileFilterOpen ? 'block' : 'hidden'} lg:col-span-1 space-y-6 bg-white p-6 rounded-2xl border border-[#F0E4E1] shadow-xs`}>
          
          <div className="flex items-center justify-between pb-4 border-b border-[#F0E4E1]">
            <h3 className="font-serif text-lg text-[#2D2426]">Refine Search</h3>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-[11px] text-[#8D382D] hover:underline"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#423639] mb-3">
              Category
            </h4>
            <div className="space-y-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left text-xs py-1.5 px-2 rounded-lg transition-colors flex items-center justify-between ${
                    selectedCategory === cat
                      ? 'bg-[#FFF2F0] text-[#8D382D] font-bold'
                      : 'text-[#5C4D50] hover:bg-[#FAF7F5]'
                  }`}
                >
                  <span>{cat}</span>
                  <span className="text-[11px] text-[#A09395] tabular-nums">
                    {cat === 'All' 
                      ? products.length 
                      : products.filter(p => p.category === cat).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div className="pt-4 border-t border-[#F5EBE8]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#423639] mb-3">
              Brand
            </h4>
            <div className="space-y-1.5">
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`w-full text-left text-xs py-1.5 px-2 rounded-lg transition-colors ${
                    selectedBrand === brand
                      ? 'bg-[#FFF2F0] text-[#8D382D] font-bold'
                      : 'text-[#5C4D50] hover:bg-[#FAF7F5]'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="pt-4 border-t border-[#F5EBE8]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#423639] mb-3">
              Price Range
            </h4>
            <div className="space-y-2 text-xs text-[#5C4D50]">
              {[
                { id: 'all', label: 'All Prices' },
                { id: 'under30', label: 'Under $30' },
                { id: '30to60', label: '$30 - $60' },
                { id: 'over60', label: '$60 and Above' }
              ].map((p) => (
                <label key={p.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={priceRange === p.id}
                    onChange={() => setPriceRange(p.id as any)}
                    className="w-3.5 h-3.5 text-[#8D382D] focus:ring-[#8D382D]"
                  />
                  <span>{p.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div className="pt-4 border-t border-[#F5EBE8]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#423639] mb-3">
              Minimum Rating
            </h4>
            <div className="space-y-2 text-xs text-[#5C4D50]">
              {[
                { val: 0, label: 'Any Rating' },
                { val: 4.8, label: '★ 4.8 & Above' },
                { val: 4.9, label: '★ 4.9 & Above' }
              ].map((r) => (
                <label key={r.val} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="minRating"
                    checked={minRating === r.val}
                    onChange={() => setMinRating(r.val)}
                    className="w-3.5 h-3.5 text-[#8D382D] focus:ring-[#8D382D]"
                  />
                  <span>{r.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="pt-4 border-t border-[#F5EBE8]">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-[#5C4D50] font-medium">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="w-4 h-4 text-[#8D382D] rounded border-gray-300 focus:ring-[#8D382D]"
              />
              <span>In Stock Only</span>
            </label>
          </div>

        </div>

        {/* Product Grid Area */}
        <div className="lg:col-span-3">
          {sortedProducts.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-[#F0E4E1] shadow-xs">
              <div className="w-16 h-16 rounded-full bg-[#FAF7F5] flex items-center justify-center mx-auto mb-4 border border-[#F0E4E1]">
                <Search className="w-8 h-8 text-[#A09395]" />
              </div>
              <h3 className="font-serif text-2xl text-[#2D2426] mb-2">No beauty products match</h3>
              <p className="text-xs sm:text-sm text-[#7A6B6E] max-w-md mx-auto mb-6">
                Try widening your price range, clearing specific filters, or exploring another collection.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 bg-[#2D2426] hover:bg-[#423639] text-white text-xs font-semibold rounded-xl transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
