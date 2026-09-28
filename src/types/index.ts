export type ProductCategory = 
  | 'Makeup'
  | 'Skincare'
  | 'Haircare'
  | 'Lip Care'
  | 'Eye Makeup'
  | 'Face Makeup'
  | 'Fragrances'
  | 'Beauty Accessories';

export interface ProductShade {
  name: string;
  hex: string;
}

export interface Review {
  id: string;
  productId?: string;
  customerName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verifiedBuyer: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  image: string;
  galleryImages: string[];
  description: string;
  ingredients: string[];
  benefits: string[];
  howToUse: string;
  shades?: ProductShade[];
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  isSpecialOffer?: boolean;
  volume?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedShade?: string;
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
}

export type PaymentMethod = 'UPI' | 'Card' | 'COD';

export interface Order {
  id: string;
  date: string;
  customer: CustomerDetails;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  total: number;
  paymentMethod: PaymentMethod;
  status: 'Pending' | 'Shipped' | 'Delivered';
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role?: 'customer' | 'admin';
  joinedDate: string;
  ordersCount: number;
  totalSpent: number;
}

export type ViewType = 
  | 'home' 
  | 'shop' 
  | 'categories' 
  | 'new-arrivals' 
  | 'best-sellers' 
  | 'about' 
  | 'contact' 
  | 'wishlist' 
  | 'cart' 
  | 'checkout' 
  | 'order-success'
  | 'admin';
