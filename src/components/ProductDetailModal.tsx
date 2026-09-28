import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  Star, 
  Heart, 
  ShoppingBag, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Plus,
  Minus
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    addToCart, 
    toggleWishlist, 
    isInWishlist,
    setCurrentView,
    setIsCartOpen
  } = useShop();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedShade, setSelectedShade] = useState<string | undefined>(
    selectedProduct?.shades?.[0]?.name
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'ingredients' | 'howToUse'>('benefits');

  if (!selectedProduct) return null;

  const wishlisted = isInWishlist(selectedProduct.id);
  const allImages = selectedProduct.galleryImages?.length 
    ? selectedProduct.galleryImages 
    : [selectedProduct.image];

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity, selectedShade);
    setSelectedProduct(null);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity, selectedShade);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-[#F0E4E1] overflow-hidden my-auto max-h-[92vh] flex flex-col relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-[#2D2426] text-[#2D2426] hover:text-white rounded-full transition-colors shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          
          {/* Left Column: Image Gallery */}
          <div className="flex flex-col gap-3">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#FAF7F5] border border-[#F0E4E1]">
              <img
                src={allImages[activeImageIndex] || selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
              {selectedProduct.discountPercent > 0 && (
                <div className="absolute top-4 left-4 bg-[#8D382D] text-white text-xs font-semibold px-2.5 py-1 rounded-md">
                  Save {selectedProduct.discountPercent}%
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-2">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx ? 'border-[#B9584B] ring-2 ring-[#B9584B]/20' : 'border-[#F0E4E1] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Quality Guarantees */}
            <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-[#F5EBE8] text-center">
              <div className="flex flex-col items-center text-[11px] text-[#7A6B6E]">
                <ShieldCheck className="w-4 h-4 text-[#C5A880] mb-1" />
                <span>100% Clean</span>
              </div>
              <div className="flex flex-col items-center text-[11px] text-[#7A6B6E]">
                <Truck className="w-4 h-4 text-[#C5A880] mb-1" />
                <span>Free Ship $50+</span>
              </div>
              <div className="flex flex-col items-center text-[11px] text-[#7A6B6E]">
                <RotateCcw className="w-4 h-4 text-[#C5A880] mb-1" />
                <span>30-Day Returns</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Purchase Module */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Brand & Category */}
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#8D382D]">
                  {selectedProduct.brand}
                </span>
                <span className="text-xs text-[#A09395]">
                  {selectedProduct.category}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-2xl sm:text-3xl text-[#2D2426] font-normal mt-1 leading-snug">
                {selectedProduct.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(selectedProduct.rating)
                          ? 'fill-current'
                          : 'stroke-current text-slate-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-[#2D2426] tabular-nums">
                  {selectedProduct.rating}
                </span>
                <span className="text-xs text-[#A09395] tabular-nums">
                  · ({selectedProduct.reviewCount} verified reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-3">
                <span className="text-2xl font-bold text-[#2D2426] tabular-nums">
                  ${selectedProduct.price}
                </span>
                {selectedProduct.originalPrice > selectedProduct.price && (
                  <span className="text-base text-[#A09395] line-through tabular-nums">
                    ${selectedProduct.originalPrice}
                  </span>
                )}
                {selectedProduct.volume && (
                  <span className="text-xs text-[#7A6B6E] ml-auto font-medium">
                    {selectedProduct.volume}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#5C4D50] mt-3 leading-relaxed">
                {selectedProduct.description}
              </p>

              {/* Shades Selector (if applicable) */}
              {selectedProduct.shades && selectedProduct.shades.length > 0 && (
                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-[#2D2426]">
                      Shade:{' '}
                      <span className="font-normal text-[#7A6B6E]">
                        {selectedShade || selectedProduct.shades[0].name}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    {selectedProduct.shades.map((shade) => {
                      const isSelected = (selectedShade || selectedProduct.shades![0].name) === shade.name;
                      return (
                        <button
                          key={shade.name}
                          onClick={() => setSelectedShade(shade.name)}
                          title={shade.name}
                          className={`relative w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                            isSelected ? 'border-[#2D2426] scale-110 shadow-sm' : 'border-white hover:border-[#E8C5BE]'
                          }`}
                          style={{ backgroundColor: shade.hex }}
                        >
                          {isSelected && (
                            <Check className="w-3.5 h-3.5 text-white drop-shadow-sm" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Stepper */}
              <div className="mt-5 flex items-center gap-4">
                <span className="text-xs font-semibold text-[#2D2426]">Quantity:</span>
                <div className="flex items-center border border-[#E8C5BE] rounded-xl overflow-hidden bg-[#FAF7F5]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-[#423639] hover:bg-[#F5EBE8] transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="px-4 text-xs font-bold text-[#2D2426] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-[#423639] hover:bg-[#F5EBE8] transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row items-center gap-2.5">
                <button
                  onClick={handleAddToCart}
                  className="w-full sm:flex-1 py-3 px-5 bg-[#2D2426] hover:bg-[#423639] text-white text-xs font-semibold tracking-wider uppercase rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add To Cart</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full sm:flex-1 py-3 px-5 bg-[#B9584B] hover:bg-[#8D382D] text-white text-xs font-semibold tracking-wider uppercase rounded-xl transition-colors shadow-sm"
                >
                  Buy Now
                </button>

                <button
                  onClick={() => toggleWishlist(selectedProduct)}
                  aria-label="Wishlist"
                  className={`p-3 rounded-xl border transition-colors ${
                    wishlisted
                      ? 'bg-[#B9584B] border-[#B9584B] text-white'
                      : 'border-[#E8C5BE] text-[#423639] hover:bg-[#FAF7F5]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Information Tabs: Benefits, Ingredients, How To Use */}
            <div className="mt-6 pt-5 border-t border-[#F5EBE8]">
              <div className="flex border-b border-[#F0E4E1] gap-6 text-xs font-medium">
                <button
                  onClick={() => setActiveTab('benefits')}
                  className={`pb-2 transition-colors relative ${
                    activeTab === 'benefits'
                      ? 'text-[#B9584B] font-semibold'
                      : 'text-[#7A6B6E] hover:text-[#2D2426]'
                  }`}
                >
                  Benefits
                  {activeTab === 'benefits' && (
                    <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#B9584B]" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('ingredients')}
                  className={`pb-2 transition-colors relative ${
                    activeTab === 'ingredients'
                      ? 'text-[#B9584B] font-semibold'
                      : 'text-[#7A6B6E] hover:text-[#2D2426]'
                  }`}
                >
                  Key Ingredients
                  {activeTab === 'ingredients' && (
                    <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#B9584B]" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('howToUse')}
                  className={`pb-2 transition-colors relative ${
                    activeTab === 'howToUse'
                      ? 'text-[#B9584B] font-semibold'
                      : 'text-[#7A6B6E] hover:text-[#2D2426]'
                  }`}
                >
                  How To Use
                  {activeTab === 'howToUse' && (
                    <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#B9584B]" />
                  )}
                </button>
              </div>

              <div className="py-3 text-xs text-[#5C4D50] leading-relaxed">
                {activeTab === 'benefits' && (
                  <ul className="space-y-1.5">
                    {selectedProduct.benefits?.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === 'ingredients' && (
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProduct.ingredients?.map((ing, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-[#FAF7F5] rounded-md border border-[#F0E4E1] text-[11px] text-[#423639]"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                )}

                {activeTab === 'howToUse' && (
                  <p className="italic bg-[#FAF7F5] p-3 rounded-xl border border-[#F0E4E1]">
                    "{selectedProduct.howToUse}"
                  </p>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
