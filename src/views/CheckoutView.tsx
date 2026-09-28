import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { CustomerDetails, PaymentMethod } from '../types';
import { 
  ShieldCheck, 
  CreditCard, 
  Banknote, 
  QrCode, 
  Lock, 
  Truck, 
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';

export const CheckoutView: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    cartDiscount, 
    cartDeliveryCharge, 
    cartTotal, 
    createOrder, 
    setCurrentView,
    currentUser,
    appliedCoupon
  } = useShop();

  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: currentUser?.name || 'Charlotte Vance',
    email: currentUser?.email || 'charlotte.vance@example.com',
    phone: '+1 (555) 234-5678',
    address: '450 Lexington Avenue, Suite 1204',
    city: 'New York',
    state: 'NY',
    pinCode: '10017',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Card');
  const [upiId, setUpiId] = useState('user@okaxis');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('321');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h2 className="font-serif text-3xl text-[#2D2426] mb-3">Your bag is empty</h2>
        <p className="text-xs text-[#7A6B6E] mb-6">You need at least one beauty item in your bag to checkout.</p>
        <button
          onClick={() => setCurrentView('shop')}
          className="px-6 py-3 bg-[#2D2426] text-white text-xs font-semibold uppercase tracking-wider rounded-xl"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!customer.fullName.trim()) errs.fullName = 'Full name is required';
    if (!customer.email.trim() || !customer.email.includes('@')) errs.email = 'Valid email is required';
    if (!customer.phone.trim()) errs.phone = 'Phone number is required';
    if (!customer.address.trim()) errs.address = 'Shipping address is required';
    if (!customer.city.trim()) errs.city = 'City is required';
    if (!customer.state.trim()) errs.state = 'State / Province is required';
    if (!customer.pinCode.trim()) errs.pinCode = 'PIN / Postal Code is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      createOrder(customer, paymentMethod);
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Back button */}
      <button
        onClick={() => setCurrentView('shop')}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-[#7A6B6E] hover:text-[#2D2426] mb-6 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Continue Shopping</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Checkout Information Form */}
        <div className="lg:col-span-7 space-y-8">
          
          <form onSubmit={handlePlaceOrder} id="checkout-form" className="space-y-8">
            
            {/* Step 1: Customer Contact & Shipping */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#F0E4E1] shadow-xs">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#F0E4E1]">
                <h2 className="font-serif text-xl sm:text-2xl text-[#2D2426]">
                  1. Delivery Details
                </h2>
                <div className="flex items-center gap-1.5 text-xs text-[#8D382D] font-medium">
                  <Truck className="w-4 h-4" />
                  <span>Complimentary Courier</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#2D2426] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={customer.fullName}
                    onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F5] border border-[#E8C5BE] rounded-xl text-xs text-[#2D2426] focus:outline-none focus:border-[#2D2426]"
                    placeholder="First and last name"
                  />
                  {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2D2426] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F5] border border-[#E8C5BE] rounded-xl text-xs text-[#2D2426] focus:outline-none focus:border-[#2D2426]"
                    placeholder="order.updates@example.com"
                  />
                  {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2D2426] mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F5] border border-[#E8C5BE] rounded-xl text-xs text-[#2D2426] focus:outline-none focus:border-[#2D2426]"
                    placeholder="+1 (555) 000-0000"
                  />
                  {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#2D2426] mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F5] border border-[#E8C5BE] rounded-xl text-xs text-[#2D2426] focus:outline-none focus:border-[#2D2426]"
                    placeholder="Apartment, suite, building, street address"
                  />
                  {errors.address && <p className="text-[11px] text-red-600 mt-1">{errors.address}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2D2426] mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    value={customer.city}
                    onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F5] border border-[#E8C5BE] rounded-xl text-xs text-[#2D2426] focus:outline-none focus:border-[#2D2426]"
                    placeholder="e.g. New York"
                  />
                  {errors.city && <p className="text-[11px] text-red-600 mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2D2426] mb-1">
                    State / Province *
                  </label>
                  <input
                    type="text"
                    value={customer.state}
                    onChange={(e) => setCustomer({ ...customer, state: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F5] border border-[#E8C5BE] rounded-xl text-xs text-[#2D2426] focus:outline-none focus:border-[#2D2426]"
                    placeholder="e.g. NY"
                  />
                  {errors.state && <p className="text-[11px] text-red-600 mt-1">{errors.state}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2D2426] mb-1">
                    PIN / Postal Code *
                  </label>
                  <input
                    type="text"
                    value={customer.pinCode}
                    onChange={(e) => setCustomer({ ...customer, pinCode: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F5] border border-[#E8C5BE] rounded-xl text-xs text-[#2D2426] focus:outline-none focus:border-[#2D2426]"
                    placeholder="e.g. 10017"
                  />
                  {errors.pinCode && <p className="text-[11px] text-red-600 mt-1">{errors.pinCode}</p>}
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#F0E4E1] shadow-xs">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#F0E4E1]">
                <h2 className="font-serif text-xl sm:text-2xl text-[#2D2426]">
                  2. Payment Method
                </h2>
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                  <Lock className="w-3.5 h-3.5" />
                  <span>256-Bit Encrypted</span>
                </div>
              </div>

              {/* 3 Payment Options: Card, UPI, COD */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                
                {/* Credit / Debit Card */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Card')}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between gap-3 transition-all ${
                    paymentMethod === 'Card'
                      ? 'border-[#2D2426] bg-[#FAF7F5] shadow-xs'
                      : 'border-[#F0E4E1] hover:border-[#E8C5BE]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <CreditCard className="w-5 h-5 text-[#8D382D]" />
                    {paymentMethod === 'Card' && (
                      <CheckCircle2 className="w-4 h-4 text-[#8D382D]" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#2D2426]">Credit / Debit</p>
                    <p className="text-[11px] text-[#7A6B6E]">Visa, MC, Amex</p>
                  </div>
                </button>

                {/* UPI */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('UPI')}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between gap-3 transition-all ${
                    paymentMethod === 'UPI'
                      ? 'border-[#2D2426] bg-[#FAF7F5] shadow-xs'
                      : 'border-[#F0E4E1] hover:border-[#E8C5BE]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <QrCode className="w-5 h-5 text-[#8D382D]" />
                    {paymentMethod === 'UPI' && (
                      <CheckCircle2 className="w-4 h-4 text-[#8D382D]" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#2D2426]">UPI Transfer</p>
                    <p className="text-[11px] text-[#7A6B6E]">GPay, PhonePe</p>
                  </div>
                </button>

                {/* Cash on Delivery */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('COD')}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between gap-3 transition-all ${
                    paymentMethod === 'COD'
                      ? 'border-[#2D2426] bg-[#FAF7F5] shadow-xs'
                      : 'border-[#F0E4E1] hover:border-[#E8C5BE]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Banknote className="w-5 h-5 text-[#8D382D]" />
                    {paymentMethod === 'COD' && (
                      <CheckCircle2 className="w-4 h-4 text-[#8D382D]" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#2D2426]">Cash on Delivery</p>
                    <p className="text-[11px] text-[#7A6B6E]">Pay upon arrival</p>
                  </div>
                </button>

              </div>

              {/* Payment Details based on selection */}
              {paymentMethod === 'Card' && (
                <div className="p-4 bg-[#FAF7F5] rounded-2xl border border-[#F0E4E1] space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#2D2426] mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#E8C5BE] rounded-xl text-xs tabular-nums text-[#2D2426]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#2D2426] mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#E8C5BE] rounded-xl text-xs tabular-nums text-[#2D2426]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#2D2426] mb-1">
                        Security Code (CVV)
                      </label>
                      <input
                        type="password"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#E8C5BE] rounded-xl text-xs tabular-nums text-[#2D2426]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'UPI' && (
                <div className="p-4 bg-[#FAF7F5] rounded-2xl border border-[#F0E4E1] space-y-3">
                  <label className="block text-xs font-semibold text-[#2D2426] mb-1">
                    Your UPI ID
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="username@bank"
                    className="w-full px-3 py-2 bg-white border border-[#E8C5BE] rounded-xl text-xs text-[#2D2426]"
                  />
                  <p className="text-[11px] text-[#7A6B6E]">
                    A payment request will be sent to your UPI application upon placing the order.
                  </p>
                </div>
              )}

              {paymentMethod === 'COD' && (
                <div className="p-4 bg-[#FAF7F5] rounded-2xl border border-[#F0E4E1]">
                  <p className="text-xs text-[#5C4D50] leading-relaxed">
                    You can pay in cash or digital scan upon courier delivery. Please ensure exact change or mobile payment ready.
                  </p>
                </div>
              )}

            </div>

          </form>

        </div>

        {/* Right Column: Order Summary Card */}
        <div className="lg:col-span-5">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#F0E4E1] shadow-lg sticky top-28 space-y-6">
            
            <h2 className="font-serif text-2xl text-[#2D2426] pb-4 border-b border-[#F0E4E1]">
              Order Summary ({cart.length})
            </h2>

            {/* Itemized list */}
            <div className="max-h-72 overflow-y-auto divide-y divide-[#F5EBE8] pr-1">
              {cart.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-lg object-cover bg-[#FAF7F5] border border-[#F0E4E1] shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#2D2426] truncate">
                        {item.product.name}
                      </p>
                      {item.selectedShade && (
                        <p className="text-[11px] text-[#8D382D]">
                          Shade: {item.selectedShade}
                        </p>
                      )}
                      <p className="text-[11px] text-[#A09395]">
                        Qty: {item.quantity} × ${item.product.price}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#2D2426] tabular-nums shrink-0">
                    ${item.product.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 pt-4 border-t border-[#F0E4E1] text-xs text-[#5C4D50]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#2D2426] tabular-nums">${cartSubtotal}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-[#8D382D]">
                  <span>Discount ({appliedCoupon?.code})</span>
                  <span className="font-semibold tabular-nums">-${cartDiscount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span className="font-semibold text-[#2D2426] tabular-nums">
                  {cartDeliveryCharge === 0 ? 'FREE' : `$${cartDeliveryCharge}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#2D2426] pt-3 border-t border-[#E8C5BE]">
                <span>Total Due</span>
                <span className="tabular-nums">${cartTotal}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              form="checkout-form"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#2D2426] hover:bg-[#423639] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md disabled:opacity-50"
            >
              {isSubmitting ? 'Securing Your Order...' : `Place Order · $${cartTotal}`}
            </button>

            <div className="text-center">
              <span className="text-[11px] text-[#A09395] inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                Satisfaction Guaranteed · 30-Day Luxury Return Policy
              </span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
