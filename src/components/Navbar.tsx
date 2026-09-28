import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User as UserIcon, 
  Menu, 
  X, 
  ShieldCheck, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { ViewType } from '../types';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cartItemCount,
    wishlistCount,
    setIsSearchOpen,
    setIsCartOpen,
    setIsAuthModalOpen,
    currentUser,
    logoutUser,
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [showPromoBanner, setShowPromoBanner] = useState(true);

  const navLinks: { label: string; view: ViewType }[] = [
    { label: 'Home', view: 'home' },
    { label: 'Shop', view: 'shop' },
    { label: 'Categories', view: 'categories' },
    { label: 'New Arrivals', view: 'new-arrivals' },
    { label: 'Best Sellers', view: 'best-sellers' },
    { label: 'About Us', view: 'about' },
    { label: 'Contact', view: 'contact' },
  ];

  const handleNavClick = (view: ViewType) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF7F5]/95 backdrop-blur-md border-b border-[#F0E4E1] transition-all">
      {/* Slim Top Announcement Banner */}
      {showPromoBanner && (
        <div className="bg-[#2D2426] text-[#FAF7F5] text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>Complimentary Luxury Damask Rose Sample with orders $50+ · Use code <strong className="text-[#E8A69A] tracking-wider">GLOW20</strong> for 20% off</span>
          <button 
            onClick={() => setShowPromoBanner(false)}
            aria-label="Dismiss banner"
            className="ml-3 text-white/60 hover:text-white transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Main Nav Bar: Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left group focus:outline-none"
            >
              <span className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#2D2426] group-hover:text-[#B9584B] transition-colors">
                Glow & Grace
              </span>
            </button>
          </div>

          {/* Zone 2: Navigation Links (desktop) */}
          <nav className="hidden lg:flex items-center gap-7 text-xs tracking-wider uppercase font-medium text-[#423639]">
            {navLinks.map((link) => {
              const isActive = currentView === link.view;
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.view)}
                  className={`transition-colors py-1 relative hover:text-[#B9584B] ${
                    isActive ? 'text-[#B9584B] font-semibold' : 'text-[#423639]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B9584B] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Search, Wishlist, Cart, User, Admin, Mobile Toggle) */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search products"
              className="p-2.5 text-[#423639] hover:text-[#B9584B] hover:bg-[#F5EBE8] rounded-full transition-colors"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => handleNavClick('wishlist')}
              aria-label="View wishlist"
              className="relative p-2.5 text-[#423639] hover:text-[#B9584B] hover:bg-[#F5EBE8] rounded-full transition-colors"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#B9584B] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center tabular-nums">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="View shopping cart"
              className="relative p-2.5 text-[#423639] hover:text-[#B9584B] hover:bg-[#F5EBE8] rounded-full transition-colors"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {cartItemCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#2D2426] text-[#FAF7F5] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center tabular-nums">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Profile / Auth Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  if (!currentUser) {
                    setIsAuthModalOpen(true);
                  } else {
                    setProfileDropdownOpen(!profileDropdownOpen);
                  }
                }}
                aria-label="Account profile"
                className="flex items-center gap-1 p-2.5 text-[#423639] hover:text-[#B9584B] hover:bg-[#F5EBE8] rounded-full transition-colors"
              >
                <UserIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                {currentUser && (
                  <span className="hidden xl:inline text-xs font-medium text-[#2D2426] max-w-[80px] truncate">
                    {currentUser.name}
                  </span>
                )}
                {currentUser && <ChevronDown className="w-3 h-3 text-slate-500" />}
              </button>

              {/* Profile Dropdown */}
              {currentUser && profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-[#F0E4E1] py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-4 py-2 border-b border-[#F0E4E1]">
                    <p className="text-xs font-semibold text-[#2D2426] truncate">{currentUser.name}</p>
                    <p className="text-[11px] text-[#7A6B6E] truncate">{currentUser.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      handleNavClick('wishlist');
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-[#423639] hover:bg-[#FAF7F5] transition-colors"
                  >
                    My Wishlist ({wishlistCount})
                  </button>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      handleNavClick('admin');
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-[#423639] hover:bg-[#FAF7F5] transition-colors flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-[#B9584B]" />
                    Admin Dashboard
                  </button>
                  <button
                    onClick={() => {
                      logoutUser();
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors border-t border-[#F0E4E1]"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Quick Admin Portal Access Link */}
            <button
              onClick={() => handleNavClick('admin')}
              title="Admin Portal"
              className={`hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                currentView === 'admin'
                  ? 'bg-[#2D2426] text-[#FAF7F5] border-[#2D2426]'
                  : 'bg-transparent text-[#7A6B6E] border-[#E8C5BE] hover:text-[#2D2426] hover:border-[#2D2426]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Admin</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="lg:hidden p-2 text-[#423639] hover:text-[#B9584B] rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F5] border-b border-[#F0E4E1] px-4 pt-2 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.view)}
                className={`text-left py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                  currentView === link.view
                    ? 'bg-[#F4CCC4]/40 text-[#8D382D] font-semibold'
                    : 'text-[#423639] hover:bg-[#FAF7F5]'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('admin')}
              className={`text-left py-2.5 px-3 rounded-lg text-sm font-medium flex items-center gap-2 ${
                currentView === 'admin'
                  ? 'bg-[#2D2426] text-white'
                  : 'text-[#423639] hover:bg-[#FAF7F5]'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
              Admin Portal
            </button>
          </nav>
          
          <div className="pt-4 border-t border-[#F0E4E1] flex items-center justify-between">
            {currentUser ? (
              <div className="flex items-center justify-between w-full">
                <span className="text-xs text-[#7A6B6E]">Signed in as <strong>{currentUser.name}</strong></span>
                <button
                  onClick={() => {
                    logoutUser();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs text-red-600 font-medium"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAuthModalOpen(true);
                }}
                className="w-full py-2.5 bg-[#2D2426] text-white rounded-xl text-xs font-semibold text-center"
              >
                Sign In / Join Glow Club
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
