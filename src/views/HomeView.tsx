import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ASSET_IMAGES, CATEGORIES_DATA } from '../data/mockProducts';
import { ProductCard } from '../components/ProductCard';
import { ProductCategory } from '../types';
import { 
  Sparkles, 
  ArrowRight, 
  Star, 
  ShieldCheck, 
  Leaf, 
  Heart, 
  Check, 
  Send,
  Plus
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { 
    products, 
    setCurrentView, 
    setSelectedCategory,
    reviews,
    addReview,
    showToast
  } = useShop();

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Review submission state
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [revName, setRevName] = useState('');
  const [revTitle, setRevTitle] = useState('');
  const [revRating, setRevRating] = useState(5);
  const [revComment, setRevComment] = useState('');

  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);

  const handleCategoryClick = (categoryName: ProductCategory) => {
    setSelectedCategory(categoryName);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setNewsletterSubscribed(true);
    showToast('Welcome to the Glow & Grace VIP Club! Check your inbox for your 20% gift code.');
    setNewsletterEmail('');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revName.trim() || !revComment.trim()) return;
    addReview({
      customerName: revName,
      title: revTitle || 'Wonderful beauty experience',
      rating: revRating,
      comment: revComment,
      verifiedBuyer: true,
    });
    setShowReviewModal(false);
    setRevName('');
    setRevTitle('');
    setRevComment('');
    setRevRating(5);
  };

  return (
    <div className="space-y-20 sm:space-y-28 pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-[#FAF7F5] border-b border-[#F0E4E1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#8D382D]">
              <Sparkles className="w-4 h-4 text-[#C5A880]" />
              <span>Clean Luxury & Botanical Formulations</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#2D2426] font-normal leading-[1.12] text-balance">
              Enhance Your Natural Glow
            </h1>

            <p className="text-base sm:text-lg text-[#5C4D50] leading-relaxed max-w-xl">
              Discover beauty products made to make you feel confident, radiant, and beautiful. Dermatologist tested, certified cruelty-free, and crafted with rare natural botanicals.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setCurrentView('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-7 py-3.5 bg-[#2D2426] hover:bg-[#423639] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setCurrentView('categories');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-7 py-3.5 bg-white hover:bg-[#FAF7F5] text-[#2D2426] border border-[#E8C5BE] text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
              >
                Explore Collection
              </button>
            </div>

            {/* Trust Markers */}
            <div className="pt-6 border-t border-[#F0E4E1] flex flex-wrap items-center gap-6 text-xs text-[#7A6B6E]">
              <div className="flex items-center gap-1.5">
                <Leaf className="w-4 h-4 text-[#8D382D]" />
                <span>100% Vegan & Cruelty-Free</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#8D382D]" />
                <span>Clean Actives</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-[#8D382D]" />
                <span>4.9/5 Rating (12,000+ Reviews)</span>
              </div>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-16/9 lg:aspect-4/3">
              <img
                src={ASSET_IMAGES.hero}
                alt="Glow and Grace luxury cosmetics arrangement"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Subtle Floating Proof Card */}
            <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#F0E4E1] shadow-xl max-w-xs items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#FFF2F0] flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-[#B9584B]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#2D2426]">Awarded Best Serum 2026</p>
                <p className="text-[11px] text-[#7A6B6E]">Celestial Dew Hyaluronic Glow Elixir</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Featured Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8D382D]">
              Curated Rituals
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2D2426] font-normal mt-1">
              Featured Categories
            </h2>
          </div>
          <button
            onClick={() => {
              setCurrentView('categories');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-semibold uppercase tracking-wider text-[#8D382D] hover:text-[#2D2426] flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES_DATA.map((cat) => (
            <div
              key={cat.name}
              onClick={() => handleCategoryClick(cat.name as ProductCategory)}
              className="group relative rounded-2xl overflow-hidden border border-[#F0E4E1] bg-white cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="aspect-4/3 w-full bg-[#FAF7F5] overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 bg-white">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm sm:text-base font-semibold text-[#2D2426] group-hover:text-[#B9584B] transition-colors">
                    {cat.name}
                  </h3>
                  <span className="text-xs text-[#A09395] tabular-nums">
                    {cat.productCount}+ items
                  </span>
                </div>
                <p className="text-[11px] text-[#7A6B6E] mt-1 line-clamp-1">
                  {cat.tagline}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Best Selling Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8D382D]">
              Most Beloved
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2D2426] font-normal mt-1">
              Best Selling Products
            </h2>
          </div>
          <button
            onClick={() => {
              setCurrentView('best-sellers');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-semibold uppercase tracking-wider text-[#8D382D] hover:text-[#2D2426] flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <span>See All Best Sellers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Special Offers Campaign Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#2D2426] via-[#3B2C30] to-[#241B1D] text-white p-8 sm:p-12 lg:p-16 border border-[#423639] shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A880]">
                Exclusive Luxury Celebration
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight">
                The Rose Gold Glow Ritual Box
              </h2>
              <p className="text-xs sm:text-sm text-[#D7CBCD] max-w-xl leading-relaxed">
                Enjoy 20% off all orders with code <strong className="text-[#C5A880] tracking-widest">GLOW20</strong>. Includes full-size Celestial Dew Elixir, Velvet Cashmere Lipstick, and a hand-carved Brazilian Rose Quartz Gua Sha.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    setSelectedCategory('Skincare');
                    setCurrentView('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3 bg-[#FAF7F5] text-[#2D2426] hover:bg-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-md"
                >
                  Claim Special Offer
                </button>
                <span className="text-xs text-[#C5A880] font-medium">
                  Free Worldwide Shipping on all Gift Sets
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl bg-white/10">
                <img
                  src={ASSET_IMAGES.skincare}
                  alt="Special Offer Glow Ritual"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8D382D]">
              Just Released
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2D2426] font-normal mt-1">
              New Arrivals
            </h2>
          </div>
          <button
            onClick={() => {
              setCurrentView('new-arrivals');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-semibold uppercase tracking-wider text-[#8D382D] hover:text-[#2D2426] flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <span>Explore All New</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Customer Reviews Section */}
      <section className="bg-[#FAF7F5] py-16 sm:py-20 border-y border-[#F0E4E1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8D382D]">
                Real Stories
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#2D2426] font-normal mt-1">
                Customer Reviews
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm font-bold text-[#2D2426] tabular-nums">4.9 out of 5</span>
                <span className="text-xs text-[#7A6B6E]">based on verified client purchases</span>
              </div>
            </div>

            <button
              onClick={() => setShowReviewModal(true)}
              className="px-4 py-2.5 bg-white border border-[#E8C5BE] hover:border-[#2D2426] text-[#2D2426] text-xs font-semibold rounded-xl transition-all shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              Write a Review
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.slice(0, 4).map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-6 rounded-2xl border border-[#F0E4E1] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[11px] text-[#A09395]">{rev.date}</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#2D2426] mb-2 leading-snug">
                    "{rev.title}"
                  </h4>
                  <p className="text-xs text-[#5C4D50] leading-relaxed line-clamp-4">
                    {rev.comment}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#F5EBE8] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#2D2426]">
                    {rev.customerName}
                  </span>
                  {rev.verifiedBuyer && (
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm font-medium">
                      Verified Buyer
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. Newsletter Subscription Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-[#FFF4F2] p-8 sm:p-12 rounded-3xl border border-[#F5EBE8] shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mx-auto shadow-xs">
            <Sparkles className="w-5 h-5 text-[#8D382D]" />
          </div>
          <h3 className="font-serif text-3xl sm:text-4xl text-[#2D2426] font-normal">
            Join The Glow Club
          </h3>
          <p className="text-xs sm:text-sm text-[#5C4D50] max-w-md mx-auto leading-relaxed">
            Receive exclusive seasonal beauty rituals, early access to limited edition fragrance batches, and 20% off your first luxury order.
          </p>

          {newsletterSubscribed ? (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs max-w-md mx-auto flex items-center justify-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Thank you! Your 20% invitation voucher is in your inbox.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-white border border-[#E8C5BE] rounded-xl text-xs text-[#2D2426] placeholder-[#A09395] focus:outline-none focus:border-[#2D2426]"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#2D2426] hover:bg-[#423639] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          <p className="text-[11px] text-[#A09395]">
            No spam, ever. Unsubscribe at any time with one click.
          </p>
        </div>
      </section>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white max-w-md w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#F0E4E1] space-y-4">
            <h3 className="font-serif text-2xl text-[#2D2426]">Share Your Experience</h3>
            <form onSubmit={handleReviewSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#2D2426] mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={revName}
                  onChange={(e) => setRevName(e.target.value)}
                  placeholder="e.g. Camilla V."
                  className="w-full px-3 py-2 bg-[#FAF7F5] border border-[#E8C5BE] rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D2426] mb-1">Star Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRevRating(star)}
                      className="p-1"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= revRating ? 'text-amber-500 fill-current' : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D2426] mb-1">Review Headline</label>
                <input
                  type="text"
                  required
                  value={revTitle}
                  onChange={(e) => setRevTitle(e.target.value)}
                  placeholder="e.g. Pure luxury in a bottle"
                  className="w-full px-3 py-2 bg-[#FAF7F5] border border-[#E8C5BE] rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D2426] mb-1">Your Review</label>
                <textarea
                  required
                  rows={3}
                  value={revComment}
                  onChange={(e) => setRevComment(e.target.value)}
                  placeholder="Tell us what you loved about the formula, scent, and results..."
                  className="w-full px-3 py-2 bg-[#FAF7F5] border border-[#E8C5BE] rounded-xl text-xs"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#2D2426] text-white text-xs font-bold uppercase rounded-xl"
                >
                  Submit Review
                </button>
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2.5 bg-gray-100 text-[#2D2426] text-xs font-semibold rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
