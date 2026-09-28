import React from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { ProductCategory, ViewType } from '../types';

export const Footer: React.FC = () => {
  const { setCurrentView, setSelectedCategory } = useShop();

  const handleCategoryClick = (cat: ProductCategory) => {
    setSelectedCategory(cat);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (view: ViewType) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories: ProductCategory[] = [
    'Skincare',
    'Makeup',
    'Lip Care',
    'Fragrances',
    'Haircare',
    'Face Makeup',
    'Eye Makeup',
    'Beauty Accessories'
  ];

  return (
    <footer className="bg-[#241B1D] text-[#FAF7F5] border-t border-[#3B2C30] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#3B2C30]">
          
          {/* Column 1: Brand & Philosophy (2 cols wide on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif text-3xl font-medium tracking-tight text-[#FAF7F5]">
              Glow & Grace
            </span>
            <p className="text-xs sm:text-sm text-[#C8BCBE] leading-relaxed max-w-sm">
              Crafted to celebrate your authentic radiance. We formulate clean, cruelty-free, and high-performance cosmetics using rare botanicals, cold-pressed oils, and clinically proven actives.
            </p>
            
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="#social" 
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-[#3B2C30] hover:bg-[#C5A880] text-[#FAF7F5] hover:text-[#241B1D] flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="#social" 
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-[#3B2C30] hover:bg-[#C5A880] text-[#FAF7F5] hover:text-[#241B1D] flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="#social" 
                aria-label="Twitter"
                className="w-8 h-8 rounded-full bg-[#3B2C30] hover:bg-[#C5A880] text-[#FAF7F5] hover:text-[#241B1D] flex items-center justify-center transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="#social" 
                aria-label="Youtube"
                className="w-8 h-8 rounded-full bg-[#3B2C30] hover:bg-[#C5A880] text-[#FAF7F5] hover:text-[#241B1D] flex items-center justify-center transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Categories */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C5A880] mb-4">
              Beauty Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#C8BCBE]">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => handleCategoryClick(cat)}
                    className="hover:text-white transition-colors"
                  >
                    {cat}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handleNavClick('categories')}
                  className="text-[#E8A69A] hover:underline inline-flex items-center gap-1"
                >
                  View All 8 Categories →
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C5A880] mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-[#C8BCBE]">
              <li>
                <button onClick={() => handleNavClick('shop')} className="hover:text-white transition-colors">
                  Shop All Products
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('new-arrivals')} className="hover:text-white transition-colors">
                  New Arrivals
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('best-sellers')} className="hover:text-white transition-colors">
                  Best Sellers
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('about')} className="hover:text-white transition-colors">
                  About Our Brand
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('contact')} className="hover:text-white transition-colors">
                  Contact & Concierge
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('admin')} className="hover:text-[#E8A69A] transition-colors flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                  Admin Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Customer Care & Concierge */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C5A880] mb-4">
              Concierge
            </h4>
            <ul className="space-y-3 text-xs text-[#C8BCBE]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>742 Fifth Avenue, 18th Floor, New York, NY 10022</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>concierge@glowandgrace.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>+1 (800) 456-GLOW (9am–6pm EST)</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9B8C90]">
          <p>© {new Date().getFullYear()} Glow & Grace Cosmetics LLC. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition-colors">Shipping & Returns</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
