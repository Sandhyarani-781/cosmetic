import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Mail, Phone, MapPin, Send, CheckCircle2, ChevronDown, Sparkles } from 'lucide-react';

export const ContactView: React.FC = () => {
  const { showToast } = useShop();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
    showToast('Your message has been received by our beauty concierge team.');
  };

  const faqs = [
    {
      q: 'Are Glow & Grace cosmetic products cruelty-free and vegan?',
      a: 'Yes, 100% of our products are certified cruelty-free. We never conduct animal testing, nor do we commission third parties to do so. All our skincare and makeup formulations are completely vegan.',
    },
    {
      q: 'How do I choose the correct shade for my skin tone?',
      a: 'Each product detail view displays precise undertone recommendations and swatches. You may also contact our virtual concierge team with a no-makeup photo for bespoke shade matching.',
    },
    {
      q: 'What is your complimentary shipping policy?',
      a: 'We offer complimentary standard courier shipping on all orders over $50 within the United States. International express delivery is calculated at checkout.',
    },
    {
      q: 'What is your satisfaction guarantee and return window?',
      a: 'We want you to adore your skin. We offer a 30-day return policy for a full refund or shade exchange if you are not completely delighted with your purchase.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#8D382D]">
          Client Concierge
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#2D2426] font-normal">
          We’re Here To Assist You
        </h1>
        <p className="text-xs sm:text-sm text-[#5C4D50] leading-relaxed">
          Have an inquiry regarding shade selection, order status, or botanical ingredient sourcing? Our concierge team is delighted to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-[#F0E4E1] shadow-xs">
          <h2 className="font-serif text-2xl text-[#2D2426] mb-6">Send A Message</h2>

          {submitted ? (
            <div className="p-8 text-center bg-[#FAF7F5] rounded-2xl border border-[#F0E4E1] space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#8D382D] mx-auto" />
              <h3 className="font-serif text-2xl text-[#2D2426]">Message Dispatched</h3>
              <p className="text-xs sm:text-sm text-[#5C4D50] leading-relaxed max-w-sm mx-auto">
                Thank you, {name}. A member of our beauty concierge will review your message and reply to <strong>{email}</strong> within 1 business day.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setPhone('');
                  setMessage('');
                }}
                className="mt-4 px-5 py-2 bg-[#2D2426] text-white text-xs font-semibold rounded-xl"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#2D2426] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Camilla Vance"
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F5] border border-[#E8C5BE] rounded-xl text-xs text-[#2D2426] focus:outline-none focus:border-[#2D2426]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2D2426] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="camilla@example.com"
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F5] border border-[#E8C5BE] rounded-xl text-xs text-[#2D2426] focus:outline-none focus:border-[#2D2426]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D2426] mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F5] border border-[#E8C5BE] rounded-xl text-xs text-[#2D2426] focus:outline-none focus:border-[#2D2426]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D2426] mb-1">
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can our beauty specialists help you today?"
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F5] border border-[#E8C5BE] rounded-xl text-xs text-[#2D2426] focus:outline-none focus:border-[#2D2426]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#2D2426] hover:bg-[#423639] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Submit Message</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

        {/* Contact Details & Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#F0E4E1] shadow-xs space-y-6">
            <h2 className="font-serif text-2xl text-[#2D2426]">Direct Contact</h2>
            
            <div className="space-y-4 text-xs text-[#5C4D50]">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FFF2F0] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#8D382D]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#2D2426]">Atelier & Headquarters</h3>
                  <p className="mt-0.5 leading-relaxed">742 Fifth Avenue, 18th Floor<br />New York, NY 10022, United States</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FFF2F0] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#8D382D]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#2D2426]">Email Concierge</h3>
                  <p className="mt-0.5">concierge@glowandgrace.com</p>
                  <p className="text-[11px] text-[#A09395]">Average response under 4 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FFF2F0] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#8D382D]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#2D2426]">Toll-Free Concierge Phone</h3>
                  <p className="mt-0.5 font-bold tabular-nums">+1 (800) 456-GLOW</p>
                  <p className="text-[11px] text-[#A09395]">Monday – Friday: 9am – 6pm EST</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#F0E4E1] shadow-xs space-y-4">
            <h2 className="font-serif text-2xl text-[#2D2426]">Frequent Inquiries</h2>
            <div className="divide-y divide-[#F5EBE8]">
              {faqs.map((faq, idx) => (
                <div key={idx} className="py-3">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between text-left text-xs font-semibold text-[#2D2426] hover:text-[#8D382D] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#A09395] transition-transform duration-200 ${
                        openFaq === idx ? 'rotate-180 text-[#8D382D]' : ''
                      }`}
                    />
                  </button>
                  {openFaq === idx && (
                    <p className="text-xs text-[#5C4D50] mt-2 leading-relaxed pl-1 animate-in fade-in duration-150">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
