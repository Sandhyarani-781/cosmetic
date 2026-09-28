import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Check, 
  Truck,
  Sparkles
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartDiscount,
    cartDeliveryCharge,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setCurrentView,
    setSelectedCategory
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const progressToFreeShipping = Math.min(100, (cartSubtotal / 50) * 100);
  const remainingForFreeShipping = Math.max(0, 50 - cartSubtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="absolute inset-y-0 right-0 max-w-full flex pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md bg-white border-l border-[#F0E4E1] shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#F0E4E1] flex items-center justify-between bg-[#FAF7F5]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#8D382D]" />
              <h2 className="font-serif text-xl font-medium text-[#2D2426]">
                Your Shopping Bag ({cart.length})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              aria-label="Close cart"
              className="p-1.5 text-[#7A6B6E] hover:text-[#2D2426] rounded-full hover:bg-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#FFF4F2] px-6 py-2.5 border-b border-[#F5EBE8]">
            <div className="flex items-center justify-between text-xs text-[#8D382D] font-medium mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" />
                {remainingForFreeShipping === 0 ? (
                  <strong className="text-emerald-700">You unlocked FREE Complimentary Delivery!</strong>
                ) : (
                  <span>Add <strong>${remainingForFreeShipping}</strong> more for Free Shipping</span>
                )}
              </span>
              <span className="tabular-nums font-bold">{Math.round(progressToFreeShipping)}%</span>
            </div>
            <div className="w-full bg-[#F2D7D2] h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-[#B9584B] h-full rounded-full transition-all duration-300"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-[#FAF7F5] flex items-center justify-center mx-auto mb-4 border border-[#F0E4E1]">
                  <ShoppingBag className="w-8 h-8 text-[#A09395]" />
                </div>
                <h3 className="font-serif text-xl text-[#2D2426] mb-1">Your bag is empty</h3>
                <p className="text-xs text-[#7A6B6E] max-w-xs mx-auto mb-6">
                  Indulge in botanical skincare, couture lip shades, and bespoke French fragrances.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setSelectedCategory('All');
                    setCurrentView('shop');
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2D2426] text-white text-xs font-semibold rounded-xl hover:bg-[#423639] transition-colors"
                >
                  Explore Collection
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="divide-y divide-[#F5EBE8]">
                {cart.map((item, index) => (
                  <div key={`${item.product.id}-${item.selectedShade || index}`} className="py-3.5 flex gap-4">
                    {/* Thumbnail */}
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#FAF7F5] border border-[#F0E4E1] shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs sm:text-sm font-semibold text-[#2D2426] truncate">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.selectedShade)}
                            aria-label="Remove item"
                            className="text-[#A09395] hover:text-red-600 transition-colors p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {item.selectedShade && (
                          <p className="text-[11px] text-[#8D382D] mt-0.5">
                            Shade: <strong>{item.selectedShade}</strong>
                          </p>
                        )}
                        <span className="text-xs text-[#7A6B6E]">{item.product.brand}</span>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Stepper */}
                        <div className="flex items-center border border-[#E8C5BE] rounded-lg overflow-hidden bg-[#FAF7F5]">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedShade)}
                            className="p-1 hover:bg-[#F5EBE8] text-[#423639]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-bold text-[#2D2426] tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedShade)}
                            className="p-1 hover:bg-[#F5EBE8] text-[#423639]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="text-sm font-bold text-[#2D2426] tabular-nums">
                          ${item.product.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {cart.length > 0 && (
            <div className="border-t border-[#F0E4E1] bg-[#FAF7F5] p-6 space-y-4">
              {/* Coupon Code Input */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Code <strong>{appliedCoupon.code}</strong> applied (-{appliedCoupon.discountPercent}%)</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-emerald-700 hover:text-emerald-900 font-semibold text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => {
                        setCouponInput(e.target.value);
                        setCouponError('');
                      }}
                      placeholder="Promo code (e.g. GLOW20)"
                      className="flex-1 bg-white border border-[#E8C5BE] rounded-xl px-3 py-2 text-xs text-[#2D2426] uppercase placeholder-[#A09395] focus:outline-none focus:border-[#2D2426]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#423639] hover:bg-[#2D2426] text-white text-xs font-semibold rounded-xl transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[11px] text-red-600 mt-1">{couponError}</p>
                )}
              </div>

              {/* Breakdown */}
              <div className="space-y-1.5 text-xs text-[#5C4D50] pt-2 border-t border-[#F5EBE8]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold tabular-nums text-[#2D2426]">${cartSubtotal}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-[#8D382D]">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span className="font-semibold tabular-nums">-${cartDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className="font-semibold tabular-nums text-[#2D2426]">
                    {cartDeliveryCharge === 0 ? 'FREE' : `$${cartDeliveryCharge}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-bold text-[#2D2426] pt-2 border-t border-[#E8C5BE]">
                  <span>Total Amount</span>
                  <span className="tabular-nums">${cartTotal}</span>
                </div>
              </div>

              {/* Proceed to Checkout CTA */}
              <button
                onClick={handleCheckout}
                className="w-full py-3.5 bg-[#2D2426] hover:bg-[#423639] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <span>Proceed To Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
