import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Product, ProductCategory, Order } from '../types';
import { 
  Package, 
  ShoppingBag, 
  Users, 
  DollarSign, 
  Plus, 
  Trash2, 
  Edit3, 
  X, 
  Check, 
  Search, 
  ArrowLeft,
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { INITIAL_CUSTOMERS } from '../data/mockProducts';

export const AdminView: React.FC = () => {
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    orders, 
    updateOrderStatus,
    setCurrentView 
  } = useShop();

  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'customers'>('products');
  const [productSearch, setProductSearch] = useState('');
  
  // Product Modal (Add or Edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Form fields
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('Glow & Grace Atelier');
  const [category, setCategory] = useState<ProductCategory>('Skincare');
  const [price, setPrice] = useState(38);
  const [originalPrice, setOriginalPrice] = useState(48);
  const [discountPercent, setDiscountPercent] = useState(20);
  const [description, setDescription] = useState('');
  const [volume, setVolume] = useState('30 ml / 1.0 fl. oz');
  const [inStock, setInStock] = useState(true);

  // Summary Metrics calculations
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalCustomers = INITIAL_CUSTOMERS.length + 4; // Mock registered customer count
  const totalSales = orders.reduce((sum, ord) => sum + ord.total, 0) + 1480; // seeded baseline

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

  const filteredProducts = products.filter((p) => {
    if (!productSearch.trim()) return true;
    const q = productSearch.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
  });

  const openAddModal = () => {
    setEditingProduct(null);
    setName('');
    setBrand('Glow & Grace Atelier');
    setCategory('Skincare');
    setPrice(35);
    setOriginalPrice(45);
    setDiscountPercent(22);
    setDescription('Luminous botanical formulation designed for all skin types.');
    setVolume('50 ml / 1.7 fl. oz');
    setInStock(true);
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setBrand(p.brand);
    setCategory(p.category);
    setPrice(p.price);
    setOriginalPrice(p.originalPrice);
    setDiscountPercent(p.discountPercent);
    setDescription(p.description);
    setVolume(p.volume || '');
    setInStock(p.inStock);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        name,
        brand,
        category,
        price: Number(price),
        originalPrice: Number(originalPrice),
        discountPercent: Number(discountPercent),
        description,
        volume,
        inStock,
      });
    } else {
      addProduct({
        name,
        brand,
        category,
        price: Number(price),
        originalPrice: Number(originalPrice),
        discountPercent: Number(discountPercent),
        rating: 5.0,
        reviewCount: 1,
        image: products[0]?.image || '',
        galleryImages: [products[0]?.image || ''],
        description,
        ingredients: ['Hyaluronic Peptides', 'Organic Rose Damascena Water', 'Plant Squalane', 'Vitamin E'],
        benefits: ['Instantly hydrates', 'Imparts natural radiance', 'Strengthens moisture barrier'],
        howToUse: 'Smooth gently onto skin morning and night.',
        inStock,
        isNew: true,
        volume,
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F0E4E1]">
        <div>
          <button
            onClick={() => setCurrentView('home')}
            className="inline-flex items-center gap-1.5 text-xs text-[#7A6B6E] hover:text-[#2D2426] mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Storefront</span>
          </button>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#2D2426] font-normal">
            Atelier Admin Dashboard
          </h1>
          <p className="text-xs text-[#7A6B6E] mt-1">
            Store telemetry, inventory management, order processing, and customer relations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={openAddModal}
            className="px-4 py-2.5 bg-[#2D2426] hover:bg-[#423639] text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* 4 Telemetry Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-[#F0E4E1] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#FAF7F5] flex items-center justify-center text-[#8D382D] shrink-0">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-[#A09395] uppercase tracking-wider font-semibold">Total Products</span>
            <p className="text-2xl font-bold text-[#2D2426] tabular-nums mt-0.5">{totalProducts}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#F0E4E1] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#FAF7F5] flex items-center justify-center text-[#8D382D] shrink-0">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-[#A09395] uppercase tracking-wider font-semibold">Total Orders</span>
            <p className="text-2xl font-bold text-[#2D2426] tabular-nums mt-0.5">{totalOrders}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#F0E4E1] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#FAF7F5] flex items-center justify-center text-[#8D382D] shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-[#A09395] uppercase tracking-wider font-semibold">Total Customers</span>
            <p className="text-2xl font-bold text-[#2D2426] tabular-nums mt-0.5">{totalCustomers}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#F0E4E1] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#FAF7F5] flex items-center justify-center text-emerald-700 shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-[#A09395] uppercase tracking-wider font-semibold">Total Sales</span>
            <p className="text-2xl font-bold text-[#2D2426] tabular-nums mt-0.5">${totalSales}</p>
          </div>
        </div>
      </div>

      {/* Tabs: Products, Orders, Customers */}
      <div className="border-b border-[#F0E4E1] flex gap-8 text-xs font-semibold uppercase tracking-wider">
        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 transition-colors relative ${
            activeTab === 'products' ? 'text-[#8D382D]' : 'text-[#7A6B6E] hover:text-[#2D2426]'
          }`}
        >
          Product Catalog ({products.length})
          {activeTab === 'products' && (
            <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#8D382D]" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 transition-colors relative ${
            activeTab === 'orders' ? 'text-[#8D382D]' : 'text-[#7A6B6E] hover:text-[#2D2426]'
          }`}
        >
          Customer Orders ({orders.length})
          {activeTab === 'orders' && (
            <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#8D382D]" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('customers')}
          className={`pb-3 transition-colors relative ${
            activeTab === 'customers' ? 'text-[#8D382D]' : 'text-[#7A6B6E] hover:text-[#2D2426]'
          }`}
        >
          Customer Directory ({INITIAL_CUSTOMERS.length})
          {activeTab === 'customers' && (
            <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#8D382D]" />
          )}
        </button>
      </div>

      {/* Tab 1: Products */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-3xl border border-[#F0E4E1] shadow-xs overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-[#F0E4E1] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-[#A09395] absolute left-3 top-3" />
              <input
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Search products by title or category..."
                className="w-full pl-9 pr-3 py-2 bg-[#FAF7F5] border border-[#E8C5BE] rounded-xl text-xs text-[#2D2426] focus:outline-none"
              />
            </div>
            <span className="text-xs text-[#7A6B6E]">
              Showing <strong className="text-[#2D2426] tabular-nums">{filteredProducts.length}</strong> items
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F5] border-b border-[#F0E4E1] text-[#7A6B6E] uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Item</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Brand</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Discount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5EBE8] text-[#5C4D50]">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-[#FAF7F5]/60 transition-colors">
                    <td className="py-3 px-4 flex items-center gap-3">
                      <img
                        src={p.image}
                        alt=""
                        className="w-10 h-10 rounded-lg object-cover bg-gray-50 border border-[#F0E4E1] shrink-0"
                      />
                      <span className="font-semibold text-[#2D2426] max-w-xs truncate">{p.name}</span>
                    </td>
                    <td className="py-3 px-4">{p.category}</td>
                    <td className="py-3 px-4">{p.brand}</td>
                    <td className="py-3 px-4 font-bold tabular-nums text-[#2D2426]">${p.price}</td>
                    <td className="py-3 px-4 tabular-nums">{p.discountPercent}%</td>
                    <td className="py-3 px-4">
                      {p.inStock ? (
                        <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm font-medium text-[10px]">
                          In Stock
                        </span>
                      ) : (
                        <span className="text-red-700 bg-red-50 px-2 py-0.5 rounded-sm font-medium text-[10px]">
                          Out of Stock
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1.5 text-[#7A6B6E] hover:text-[#2D2426] rounded-lg hover:bg-white"
                          title="Edit product"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="p-1.5 text-[#7A6B6E] hover:text-red-600 rounded-lg hover:bg-white"
                          title="Delete product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Orders */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl border border-[#F0E4E1] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F5] border-b border-[#F0E4E1] text-[#7A6B6E] uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Items</th>
                  <th className="py-3 px-4">Payment</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5EBE8] text-[#5C4D50]">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#FAF7F5]/60 transition-colors">
                    <td className="py-3 px-4 font-bold tabular-nums text-[#2D2426]">#{ord.id}</td>
                    <td className="py-3 px-4">{ord.date}</td>
                    <td className="py-3 px-4">
                      <p className="font-semibold text-[#2D2426]">{ord.customer.fullName}</p>
                      <p className="text-[11px] text-[#A09395]">{ord.customer.email}</p>
                    </td>
                    <td className="py-3 px-4">
                      {ord.items.map((it, i) => (
                        <div key={i} className="truncate max-w-xs text-[11px]">
                          {it.quantity}x {it.product.name}
                        </div>
                      ))}
                    </td>
                    <td className="py-3 px-4 font-medium">{ord.paymentMethod}</td>
                    <td className="py-3 px-4 font-bold tabular-nums text-[#2D2426]">${ord.total}</td>
                    <td className="py-3 px-4">
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                        className={`text-xs font-semibold px-2 py-1 rounded-lg border focus:outline-none ${
                          ord.status === 'Delivered'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : ord.status === 'Shipped'
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Customers */}
      {activeTab === 'customers' && (
        <div className="bg-white rounded-3xl border border-[#F0E4E1] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F5] border-b border-[#F0E4E1] text-[#7A6B6E] uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Customer Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Joined Date</th>
                  <th className="py-3 px-4">Orders Placed</th>
                  <th className="py-3 px-4">Lifetime Spend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5EBE8] text-[#5C4D50]">
                {INITIAL_CUSTOMERS.map((cust) => (
                  <tr key={cust.id} className="hover:bg-[#FAF7F5]/60 transition-colors">
                    <td className="py-3 px-4 font-semibold text-[#2D2426]">{cust.name}</td>
                    <td className="py-3 px-4">{cust.email}</td>
                    <td className="py-3 px-4">{cust.phone}</td>
                    <td className="py-3 px-4">{cust.joinedDate}</td>
                    <td className="py-3 px-4 tabular-nums font-medium">{cust.ordersCount}</td>
                    <td className="py-3 px-4 tabular-nums font-bold text-[#2D2426]">${cust.totalSpent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white max-w-xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#F0E4E1] space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0E4E1]">
              <h3 className="font-serif text-2xl text-[#2D2426]">
                {editingProduct ? 'Edit Beauty Product' : 'Add New Cosmetic Product'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-[#7A6B6E] hover:text-[#2D2426]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#2D2426] mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Silk Damask Body Balm"
                  className="w-full px-3 py-2 bg-[#FAF7F5] border border-[#E8C5BE] rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#2D2426] mb-1">Brand</label>
                  <input
                    type="text"
                    required
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF7F5] border border-[#E8C5BE] rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#2D2426] mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#FAF7F5] border border-[#E8C5BE] rounded-xl text-xs"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-[#2D2426] mb-1">Price ($) *</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#FAF7F5] border border-[#E8C5BE] rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#2D2426] mb-1">Original Price ($)</label>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#FAF7F5] border border-[#E8C5BE] rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#2D2426] mb-1">Discount %</label>
                  <input
                    type="number"
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#FAF7F5] border border-[#E8C5BE] rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#2D2426] mb-1">Volume / Size</label>
                <input
                  type="text"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  placeholder="e.g. 50 ml / 1.7 fl. oz"
                  className="w-full px-3 py-2 bg-[#FAF7F5] border border-[#E8C5BE] rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#2D2426] mb-1">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF7F5] border border-[#E8C5BE] rounded-xl text-xs"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  id="stock"
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                  className="w-4 h-4 text-[#8D382D] rounded"
                />
                <label htmlFor="stock" className="text-xs text-[#5C4D50]">Available in Stock</label>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#2D2426] text-white text-xs font-bold uppercase rounded-xl hover:bg-[#423639]"
                >
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
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
