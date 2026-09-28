import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, User, ViewType, ProductCategory, Review } from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_CUSTOMERS, INITIAL_REVIEWS } from '../data/mockProducts';

interface ToastState {
  id: number;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface Coupon {
  code: string;
  discountPercent: number;
  description: string;
}

interface ShopContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedShade?: string) => void;
  removeFromCart: (productId: string, selectedShade?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedShade?: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartDiscount: number;
  cartDeliveryCharge: number;
  cartTotal: number;
  cartItemCount: number;

  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  wishlistCount: number;

  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  selectedCategory: ProductCategory | 'All';
  setSelectedCategory: (cat: ProductCategory | 'All') => void;

  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;

  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;

  currentUser: User | null;
  loginUser: (email: string, name?: string) => void;
  logoutUser: () => void;
  signupUser: (name: string, email: string) => void;

  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  orders: Order[];
  createOrder: (customer: Order['customer'], paymentMethod: Order['paymentMethod']) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  lastOrder: Order | null;
  setLastOrder: (order: Order | null) => void;

  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;

  toasts: ToastState[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load products from localStorage or fallback
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('glow_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Load cart from localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('glow_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Load wishlist from localStorage
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('glow_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('glow_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // User
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('glow_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('glow_reviews');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  // Views & UI states
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [toasts, setToasts] = useState<ToastState[]>([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('glow_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('glow_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('glow_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('glow_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('glow_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('glow_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('glow_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const addProduct = (newProduct: Omit<Product, 'id'>) => {
    const id = 'gg-' + Date.now();
    const created: Product = { ...newProduct, id };
    setProducts((prev) => [created, ...prev]);
    showToast(`"${created.name}" added to catalog.`);
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast(`"${updated.name}" updated successfully.`);
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setCart((prev) => prev.filter((item) => item.product.id !== id));
    setWishlist((prev) => prev.filter((p) => p.id !== id));
    showToast('Product removed from catalog.', 'info');
  };

  const addToCart = (product: Product, quantity = 1, selectedShade?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedShade === selectedShade
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }
      return [...prev, { product, quantity, selectedShade }];
    });
    showToast(`Added ${quantity > 1 ? `${quantity}x ` : ''}"${product.name}" to cart.`);
  };

  const removeFromCart = (productId: string, selectedShade?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedShade === selectedShade)
      )
    );
    showToast('Item removed from cart.', 'info');
  };

  const updateQuantity = (productId: string, quantity: number, selectedShade?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedShade);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedShade === selectedShade) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from wishlist.`, 'info');
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`Saved "${product.name}" to your wishlist.`);
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  const clearWishlist = () => {
    setWishlist([]);
    showToast('Wishlist cleared.', 'info');
  };

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartDiscount = appliedCoupon
    ? Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100)
    : 0;
  const cartDeliveryCharge = cartSubtotal >= 50 || cart.length === 0 ? 0 : 7;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartDeliveryCharge);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const clean = code.trim().toUpperCase();
    if (clean === 'GLOW20') {
      const coupon: Coupon = {
        code: 'GLOW20',
        discountPercent: 20,
        description: '20% Off Glow Signature Celebration',
      };
      setAppliedCoupon(coupon);
      showToast('Coupon "GLOW20" applied! 20% discount granted.');
      return { success: true, message: '20% discount applied!' };
    }
    if (clean === 'WELCOME10') {
      const coupon: Coupon = {
        code: 'WELCOME10',
        discountPercent: 10,
        description: '10% Off Welcome Courtesy',
      };
      setAppliedCoupon(coupon);
      showToast('Coupon "WELCOME10" applied! 10% discount granted.');
      return { success: true, message: '10% discount applied!' };
    }
    return { success: false, message: 'Invalid or expired promotional code. Try "GLOW20"' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed.', 'info');
  };

  const loginUser = (email: string, name?: string) => {
    const user: User = {
      id: 'usr-' + Date.now(),
      email,
      name: name || email.split('@')[0],
      joinedDate: new Date().toISOString().split('T')[0],
      ordersCount: 1,
      totalSpent: 64,
      role: email.includes('admin') ? 'admin' : 'customer',
    };
    setCurrentUser(user);
    setIsAuthModalOpen(false);
    showToast(`Welcome back, ${user.name}!`);
  };

  const logoutUser = () => {
    setCurrentUser(null);
    showToast('You have been signed out.', 'info');
  };

  const signupUser = (name: string, email: string) => {
    const user: User = {
      id: 'usr-' + Date.now(),
      name,
      email,
      joinedDate: new Date().toISOString().split('T')[0],
      ordersCount: 0,
      totalSpent: 0,
      role: 'customer',
    };
    setCurrentUser(user);
    setIsAuthModalOpen(false);
    showToast(`Welcome to Glow & Grace, ${name}!`);
  };

  const createOrder = (customer: Order['customer'], paymentMethod: Order['paymentMethod']): Order => {
    const newOrder: Order = {
      id: `GG-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      customer,
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscount,
      deliveryCharge: cartDeliveryCharge,
      total: cartTotal,
      paymentMethod,
      status: 'Pending',
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastOrder(newOrder);
    clearCart();
    setAppliedCoupon(null);
    setCurrentView('order-success');
    showToast(`Order #${newOrder.id} placed successfully!`);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
    showToast(`Order #${orderId} marked as ${status}.`);
  };

  const addReview = (reviewData: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...reviewData,
      id: 'rev-' + Date.now(),
      date: 'Just now',
    };
    setReviews((prev) => [newReview, ...prev]);
    showToast('Thank you! Your verified review has been published.');
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        cartDiscount,
        cartDeliveryCharge,
        cartTotal,
        cartItemCount,
        wishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        wishlistCount,
        currentView,
        setCurrentView,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        isCartOpen,
        setIsCartOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        selectedProduct,
        setSelectedProduct,
        currentUser,
        loginUser,
        logoutUser,
        signupUser,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        orders,
        createOrder,
        updateOrderStatus,
        lastOrder,
        setLastOrder,
        reviews,
        addReview,
        toasts,
        showToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
