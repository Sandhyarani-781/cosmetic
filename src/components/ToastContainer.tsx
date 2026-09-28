import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-3 px-4 py-3 bg-[#2D2426] text-[#FAF7F5] rounded-xl shadow-xl border border-[#FAF7F5]/10 animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
          {toast.type === 'info' && <Info className="w-4 h-4 text-rose-300 shrink-0" />}
          <p className="text-xs font-medium leading-relaxed">{toast.message}</p>
        </div>
      ))}
    </div>
  );
};
