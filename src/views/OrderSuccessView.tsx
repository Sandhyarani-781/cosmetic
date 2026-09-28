import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, Package, Truck, ArrowRight, Sparkles, MapPin } from 'lucide-react';

export const OrderSuccessView: React.FC = () => {
  const { lastOrder, setCurrentView } = useShop();

  if (!lastOrder) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h2 className="font-serif text-3xl text-[#2D2426] mb-3">No Active Order</h2>
        <button
          onClick={() => setCurrentView('shop')}
          className="px-6 py-3 bg-[#2D2426] text-white text-xs font-semibold rounded-xl"
        >
          Explore Collection
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#F0E4E1] shadow-xl text-center space-y-8">
        
        {/* Success Icon */}
        <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600 animate-in zoom-in-75 duration-300">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8D382D]">
            Order Confirmed
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#2D2426] font-normal">
            Thank You, {lastOrder.customer.fullName.split(' ')[0]}!
          </h1>
          <p className="text-xs sm:text-sm text-[#7A6B6E] max-w-md mx-auto leading-relaxed">
            Your beauty ritual is being lovingly packaged at our atelier. We have sent a confirmation receipt to <strong>{lastOrder.customer.email}</strong>.
          </p>
        </div>

        {/* Order Details Badge */}
        <div className="bg-[#FAF7F5] rounded-2xl p-6 border border-[#F0E4E1] text-left grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-[#A09395] uppercase tracking-wider text-[11px] block">Order Number</span>
            <strong className="text-[#2D2426] text-sm tabular-nums">#{lastOrder.id}</strong>
          </div>
          <div>
            <span className="text-[#A09395] uppercase tracking-wider text-[11px] block">Est. Delivery</span>
            <strong className="text-[#2D2426] text-sm">3–5 Business Days</strong>
          </div>
          <div>
            <span className="text-[#A09395] uppercase tracking-wider text-[11px] block">Payment Method</span>
            <strong className="text-[#2D2426] text-sm">{lastOrder.paymentMethod}</strong>
          </div>
        </div>

        {/* Delivery Address & Status */}
        <div className="bg-white rounded-2xl p-5 border border-[#F5EBE8] text-left flex items-start gap-3">
          <MapPin className="w-5 h-5 text-[#8D382D] shrink-0 mt-0.5" />
          <div className="text-xs text-[#5C4D50]">
            <p className="font-semibold text-[#2D2426]">Shipping Address:</p>
            <p>{lastOrder.customer.address}, {lastOrder.customer.city}, {lastOrder.customer.state} {lastOrder.customer.pinCode}</p>
            <p className="text-[11px] text-[#A09395] mt-1">Phone: {lastOrder.customer.phone}</p>
          </div>
        </div>

        {/* Items Summary */}
        <div className="text-left border-t border-[#F5EBE8] pt-6 space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#423639]">
            Purchased Beauty Essentials
          </h3>
          <div className="divide-y divide-[#F5EBE8]">
            {lastOrder.items.map((item, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-10 h-10 rounded-lg object-cover bg-[#FAF7F5] border border-[#F0E4E1]"
                  />
                  <div>
                    <p className="font-semibold text-[#2D2426]">{item.product.name}</p>
                    {item.selectedShade && (
                      <p className="text-[11px] text-[#8D382D]">Shade: {item.selectedShade}</p>
                    )}
                    <span className="text-[11px] text-[#A09395]">Qty: {item.quantity}</span>
                  </div>
                </div>
                <span className="font-bold text-[#2D2426] tabular-nums">
                  ${item.product.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-[#F0E4E1] flex justify-between items-center text-sm font-bold text-[#2D2426]">
            <span>Total Paid</span>
            <span className="tabular-nums">${lastOrder.total}</span>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => {
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-8 py-3.5 bg-[#2D2426] hover:bg-[#423639] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
