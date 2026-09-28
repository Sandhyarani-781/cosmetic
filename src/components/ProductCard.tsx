import React from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Heart, Star, Eye, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, setSelectedProduct } = useShop();
  const wishlisted = isInWishlist(product.id);

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-[#F0E4E1] overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Product Image Slot */}
      <div 
        className="relative aspect-4/3 w-full bg-[#FAF7F5] overflow-hidden cursor-pointer"
        onClick={() => setSelectedProduct(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Minimal Unboxed Promotion Marker (max 1 tag, anti-pill rule) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.discountPercent > 0 && (
            <span className="text-[11px] font-semibold text-[#8D382D] bg-[#FFF2F0]/90 backdrop-blur-xs px-2 py-0.5 rounded-sm tracking-wide">
              {product.discountPercent}% OFF
            </span>
          )}
          {product.isBestSeller && !product.discountPercent && (
            <span className="text-[11px] font-semibold text-[#C5A880] bg-[#2D2426]/90 backdrop-blur-xs px-2 py-0.5 rounded-sm tracking-wide text-white">
              BESTSELLER
            </span>
          )}
          {product.isNew && !product.discountPercent && !product.isBestSeller && (
            <span className="text-[11px] font-semibold text-[#2D2426] bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-sm tracking-wide">
              NEW
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
            wishlisted
              ? 'bg-[#B9584B] text-white'
              : 'bg-white/80 text-[#423639] hover:bg-white hover:text-[#B9584B] shadow-xs'
          }`}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Hover Quick View Trigger */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="w-full py-2 bg-[#2D2426]/90 hover:bg-[#2D2426] text-white text-xs font-semibold rounded-xl backdrop-blur-xs flex items-center justify-center gap-1.5 transition-colors shadow-md"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-4 sm:p-5 justify-between">
        <div>
          {/* Brand & Category quiet metadata */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#A09395] tracking-wider uppercase font-medium">
            <span>{product.brand}</span>
            <span aria-hidden="true">·</span>
            <span>{product.category}</span>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => setSelectedProduct(product)}
            className="mt-1 text-sm sm:text-base font-semibold text-[#2D2426] leading-snug line-clamp-1 group-hover:text-[#B9584B] transition-colors cursor-pointer"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-1.5 mt-1.5 text-xs">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="font-semibold text-[#2D2426] tabular-nums">{product.rating}</span>
            <span className="text-[#A09395] tabular-nums">({product.reviewCount})</span>
          </div>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="mt-4 pt-3 border-t border-[#F5EBE8] flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base sm:text-lg font-bold text-[#2D2426] tabular-nums">
              ${product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-[#A09395] line-through tabular-nums">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1, product.shades?.[0]?.name)}
            aria-label={`Add ${product.name} to cart`}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-[#FAF7F5] hover:bg-[#2D2426] text-[#2D2426] hover:text-white border border-[#E8C5BE] hover:border-[#2D2426] text-xs font-semibold rounded-xl transition-all"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
