import React from 'react';
import { useShop } from '../context/ShopContext';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export const WishlistView: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart, clearWishlist, setCurrentView, setSelectedCategory } = useShop();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#F0E4E1]">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8D382D]">
            Personal Curation
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#2D2426] font-normal mt-1">
            My Wishlist ({wishlist.length})
          </h1>
        </div>

        {wishlist.length > 0 && (
          <button
            onClick={clearWishlist}
            className="text-xs text-[#7A6B6E] hover:text-red-600 transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear Wishlist
          </button>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 sm:p-20 text-center border border-[#F0E4E1] shadow-xs max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#FFF2F0] flex items-center justify-center mx-auto mb-4 border border-[#F0E4E1]">
            <Heart className="w-8 h-8 text-[#B9584B]" />
          </div>
          <h2 className="font-serif text-2xl text-[#2D2426] mb-2">Your wishlist is empty</h2>
          <p className="text-xs sm:text-sm text-[#7A6B6E] mb-6 leading-relaxed">
            Save your favorite botanical serums, couture lipsticks, and handcrafted perfumes to revisit whenever you wish.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#2D2426] hover:bg-[#423639] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors shadow-md"
          >
            <span>Explore Beauty Collection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-[#F0E4E1] overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-4/3 w-full bg-[#FAF7F5] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-3 right-3 p-2 bg-white/90 rounded-full text-red-500 hover:bg-white shadow-xs"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] text-[#A09395] uppercase tracking-wider font-medium">
                    {product.brand}
                  </span>
                  <h3 className="text-sm font-semibold text-[#2D2426] mt-1 line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-base font-bold text-[#2D2426] tabular-nums">
                      ${product.price}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-xs text-[#A09395] line-through tabular-nums">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F5EBE8] flex gap-2">
                  <button
                    onClick={() => {
                      addToCart(product, 1, product.shades?.[0]?.name);
                    }}
                    className="flex-1 py-2 px-3 bg-[#2D2426] hover:bg-[#423639] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add To Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
