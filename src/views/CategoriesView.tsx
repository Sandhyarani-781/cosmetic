import React from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES_DATA } from '../data/mockProducts';
import { ProductCategory } from '../types';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CategoriesView: React.FC = () => {
  const { setSelectedCategory, setCurrentView } = useShop();

  const handleSelectCategory = (catName: ProductCategory) => {
    setSelectedCategory(catName);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#8D382D]">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>Curated Rituals & Formulations</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#2D2426] font-normal">
          Explore By Category
        </h1>
        <p className="text-xs sm:text-sm text-[#5C4D50] leading-relaxed">
          From multi-molecular serums to couture lip velvets and Grasse-distilled perfumes, select a category to start your journey to natural radiance.
        </p>
      </div>

      {/* Grid of 8 categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CATEGORIES_DATA.map((cat) => (
          <div
            key={cat.name}
            onClick={() => handleSelectCategory(cat.name as ProductCategory)}
            className="group relative rounded-3xl overflow-hidden border border-[#F0E4E1] bg-white cursor-pointer shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="aspect-4/3 w-full bg-[#FAF7F5] overflow-hidden relative">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-[11px] font-semibold text-[#2D2426] px-2.5 py-1 rounded-full tabular-nums">
                {cat.productCount}+ Products
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#2D2426] group-hover:text-[#B9584B] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-[#7A6B6E] mt-1.5 leading-relaxed">
                  {cat.tagline}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F5EBE8] flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#8D382D] group-hover:text-[#2D2426] transition-colors">
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
