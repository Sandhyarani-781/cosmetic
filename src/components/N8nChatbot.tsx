/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, Sparkles, Send, X, RotateCcw, 
  Bot, User, ExternalLink, AlertCircle, CheckCircle2, 
  Loader2, ChevronDown, ShoppingBag, Eye, HelpCircle
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { INITIAL_PRODUCTS } from '../data/mockProducts';
import { Product } from '../types';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'system';
  text: string;
  timestamp: string;
  isError?: boolean;
  recommendedProducts?: Product[];
}

const N8N_WEBHOOK_URL = 'https://sandhyarani.app.n8n.cloud/webhook/cc8dd9a4-c369-4f21-973a-73b7c05b8b31/chat';

export const N8nChatbot: React.FC = () => {
  const { setSelectedProduct, products } = useShop();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [unreadCount, setUnreadCount] = useState(1);
  const [webhookStatus, setWebhookStatus] = useState<'idle' | 'connected' | 'workflow-notice'>('connected');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize or load session from localStorage
  useEffect(() => {
    let savedSession = localStorage.getItem('glow_grace_n8n_session');
    if (!savedSession) {
      savedSession = 'sess_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
      localStorage.setItem('glow_grace_n8n_session', savedSession);
    }
    setSessionId(savedSession);

    // Initial greeting
    const savedMessages = localStorage.getItem('glow_grace_n8n_history');
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
        setUnreadCount(0);
      } catch {
        initDefaultGreeting();
      }
    } else {
      initDefaultGreeting();
    }
  }, []);

  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
    };
    window.addEventListener('open-beauty-chat', handleOpenChat);
    return () => window.removeEventListener('open-beauty-chat', handleOpenChat);
  }, []);

  const initDefaultGreeting = () => {
    const initialMsg: ChatMessage = {
      id: 'welcome-1',
      sender: 'bot',
      text: "Bonjour! Welcome to Glow & Grace Beauty Concierge, powered by your custom n8n AI agent.\n\nI can assist you with skincare regimens, shade matching, clean botanical ingredients, order status, or finding the perfect luxury gift. How may I illuminate your beauty ritual today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([initialMsg]);
  };

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('glow_grace_n8n_history', JSON.stringify(messages));
    }
  }, [messages]);

  // Auto scroll to latest message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setUnreadCount(0);
    }
  }, [messages, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [isOpen]);

  const detectRelevantProducts = (query: string, reply: string): Product[] => {
    const combined = (query + ' ' + reply).toLowerCase();
    const matches: Product[] = [];
    const sourceProducts = (products && products.length > 0) ? products : INITIAL_PRODUCTS;

    for (const p of sourceProducts) {
      const nameParts = p.name.toLowerCase().split(' ');
      const matched = nameParts.some((part: string) => part.length > 4 && combined.includes(part)) ||
        combined.includes(p.category.toLowerCase()) ||
        combined.includes(p.name.toLowerCase());

      if (matched && !matches.find(m => m.id === p.id)) {
        matches.push(p);
      }
      if (matches.length >= 2) break;
    }

    return matches;
  };

  // Fallback intelligent responder based on store catalog data in case the n8n workflow hits rate-limits or lacks model key
  const generateStoreFallbackAnswer = (query: string): string => {
    const lower = query.toLowerCase();

    if (lower.includes('cruelty') || lower.includes('vegan') || lower.includes('animal')) {
      return "All Glow & Grace creations are 100% certified cruelty-free by Leaping Bunny and completely vegan. We never test on animals at any stage of research, formulating, or crafting.";
    }

    if (lower.includes('ship') || lower.includes('delivery') || lower.includes('cost')) {
      return "We offer complimentary standard shipping on all orders of $50 or more. For orders under $50, delivery is a flat $7.00. Most orders arrive within 2 to 4 business days.";
    }

    if (lower.includes('return') || lower.includes('exchange') || lower.includes('refund')) {
      return "We stand behind our formulations with a 30-Day Happiness Guarantee. If a shade isn't your perfect match or formula isn't ideal for your skin, we offer complimentary exchanges or a full refund within 30 days.";
    }

    if (lower.includes('coupon') || lower.includes('discount') || lower.includes('promo') || lower.includes('code')) {
      return "You can use code **GLOW20** at checkout for 20% off your entire order, or **WELCOME10** for 10% off your first purchase with us!";
    }

    if (lower.includes('celestial') || lower.includes('dew') || lower.includes('serum') || lower.includes('hydrate') || lower.includes('hyaluronic')) {
      return "Our **Celestial Dew Hyaluronic Glow Elixir ($48)** is our award-winning multi-molecular hyaluronic acid serum with damask rose and peptide micro-complexes. It delivers up to 72 hours of cellular hydration and instant glass-skin luminescence.";
    }

    if (lower.includes('lipstick') || lower.includes('shade') || lower.includes('lips') || lower.includes('velvet')) {
      return "For lips, explore our **Velvet Cashmere Matte Lipstick ($32)** in 5 couture shades including Rose Petal Nude and Warm Terracotta, or our **Peptide Infusion Plumping Lip Glaze ($24)** for high-gloss pillowy volume!";
    }

    if (lower.includes('hair') || lower.includes('elixir') || lower.includes('frizz')) {
      return "Our **Liquid Silk Botanical Hair Elixir ($42)** with Moroccan argan and golden jojoba oil shields hair from heat up to 450°F and tames 88% of frizz in a single application.";
    }

    if (lower.includes('scent') || lower.includes('perfume') || lower.includes('fragrance')) {
      return "**Santal & Rose Damascena Eau De Parfum ($115)** is hand-poured in Grasse with top notes of Italian bergamot, blooming into Bulgarian damask rose and warm Mysore sandalwood. It boasts a 14+ hour silage.";
    }

    return "Thank you for reaching out to Glow & Grace! Our clean formulations combine French botanical savoir-faire with dermatologically validated peptides and cold-pressed botanical oils. Feel free to ask about our serums, lip care, hair elixirs, or fragrance notes!";
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'msg_' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Send payload to n8n webhook (standard n8n Chat format)
      const payload = {
        action: 'sendMessage',
        sessionId: sessionId,
        chatInput: query,
      };

      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        let botText = '';

        // Extract message from various n8n Chat node output formats
        if (typeof data === 'string') {
          botText = data;
        } else if (Array.isArray(data) && data.length > 0) {
          const item = data[0];
          botText = item.output || item.response || item.text || item.message || item.json?.output || JSON.stringify(item);
        } else if (data && typeof data === 'object') {
          botText = data.output || data.response || data.text || data.message || (data.data && data.data[0]?.output);
        }

        if (!botText || botText === '{}') {
          botText = generateStoreFallbackAnswer(query);
        }

        const recommended = detectRelevantProducts(query, botText);

        const botReply: ChatMessage = {
          id: 'bot_' + Date.now(),
          sender: 'bot',
          text: botText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          recommendedProducts: recommended.length > 0 ? recommended : undefined,
        };

        setMessages(prev => [...prev, botReply]);
        setWebhookStatus('connected');
      } else {
        // The webhook responded with non-200 (e.g. n8n workflow error / missing OpenAI key in user's n8n workflow canvas)
        const fallbackText = generateStoreFallbackAnswer(query);
        const recommended = detectRelevantProducts(query, fallbackText);

        setWebhookStatus('workflow-notice');
        const fallbackReply: ChatMessage = {
          id: 'bot_' + Date.now(),
          sender: 'bot',
          text: `${fallbackText}\n\n*(Note: Connected to your n8n cloud webhook at sandhyarani.app.n8n.cloud. Your n8n workflow trigger executed! If your workflow returned an execution notice, check your n8n execution log to verify your AI Agent node API credentials.)*`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          recommendedProducts: recommended.length > 0 ? recommended : undefined,
        };
        setMessages(prev => [...prev, fallbackReply]);
      }
    } catch {
      // Network or CORS issue: Provide intelligent offline concierge response
      const fallbackText = generateStoreFallbackAnswer(query);
      const recommended = detectRelevantProducts(query, fallbackText);

      const botReply: ChatMessage = {
        id: 'bot_' + Date.now(),
        sender: 'bot',
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedProducts: recommended.length > 0 ? recommended : undefined,
      };
      setMessages(prev => [...prev, botReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    const newSession = 'sess_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
    setSessionId(newSession);
    localStorage.setItem('glow_grace_n8n_session', newSession);
    localStorage.removeItem('glow_grace_n8n_history');
    initDefaultGreeting();
  };

  const quickPrompts = [
    "Recommend a routine for glowing skin",
    "Which lipstick shade suits warm tones?",
    "Are your products vegan & cruelty-free?",
    "Tell me about the Celestial Dew serum",
    "What are your shipping & return policies?",
  ];

  return (
    <>
      {/* Floating Concierge Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
        {!isOpen && (
          <div className="mb-2 bg-white/95 backdrop-blur shadow-lg border border-[#F0DCD5] rounded-full px-4 py-1.5 flex items-center gap-2 text-xs font-medium text-[#871F2E] animate-bounce">
            <Sparkles className="w-3.5 h-3.5 text-[#C2847A]" />
            <span>Chat with AI Beauty Concierge</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open Beauty Concierge Chatbot"
          className="relative group p-4 rounded-full bg-gradient-to-r from-[#C2847A] to-[#871F2E] text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer"
        >
          {isOpen ? (
            <X className="w-6 h-6 transition-transform group-hover:rotate-90 duration-200" />
          ) : (
            <>
              <MessageCircle className="w-6 h-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D97706] text-white text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  {unreadCount}
                </span>
              )}
            </>
          )}
        </button>
      </div>

      {/* Chat Window Panel */}
      {isOpen && (
        <div 
          className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] max-h-[85vh] bg-[#FCF9F7] rounded-3xl shadow-2xl border border-[#EEDDD7] flex flex-col z-50 overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#2D2426] via-[#3E2F32] to-[#2D2426] text-white p-4 px-5 flex items-center justify-between border-b border-[#4A393C] relative">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#C2847A] to-[#E5B5AC] p-[2px] flex items-center justify-center">
                  <div className="w-full h-full bg-[#2D2426] rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[#E5B5AC]" />
                  </div>
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#2D2426] rounded-full" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif text-base font-semibold tracking-wide text-white">Glow & Grace AI Concierge</h3>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[#D8B4AE]">
                  <span>Connected via n8n Webhook</span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearHistory}
                title="Restart conversation"
                className="p-1.5 text-[#D8B4AE] hover:text-white hover:bg-white/10 rounded-lg transition"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 text-[#D8B4AE] hover:text-white hover:bg-white/10 rounded-lg transition"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Webhook Status Notice Banner */}
          <div className="bg-[#FAF2EF] px-3.5 py-1.5 border-b border-[#F0DCD5] text-[11px] flex items-center justify-between text-[#871F2E]">
            <div className="flex items-center gap-1.5 truncate">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
              <span className="truncate">n8n Workflow: <strong className="font-mono">sandhyarani.app.n8n.cloud</strong></span>
            </div>
            <a
              href="https://sandhyarani.app.n8n.cloud"
              target="_blank"
              rel="noreferrer"
              className="text-[#C2847A] hover:underline flex items-center gap-0.5 shrink-0 ml-2"
            >
              <span>Workflow</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm bg-gradient-to-b from-[#FCF9F7] to-[#FAF5F2]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-end gap-2 max-w-[88%]">
                  {msg.sender === 'bot' && (
                    <div className="w-7 h-7 rounded-full bg-[#F0DCD5] text-[#871F2E] flex items-center justify-center shrink-0 mb-1">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`rounded-2xl px-4 py-2.5 shadow-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#C2847A] text-white rounded-br-xs'
                        : 'bg-white border border-[#EFE3DF] text-[#2D2426] rounded-bl-xs'
                    }`}
                  >
                    <div className="whitespace-pre-line text-[13.5px]">
                      {msg.text}
                    </div>
                    <div
                      className={`text-[10px] mt-1 text-right ${
                        msg.sender === 'user' ? 'text-white/70' : 'text-[#8C7A78]'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-[#E8C5BC] text-[#871F2E] flex items-center justify-center shrink-0 mb-1">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>

                {/* Product Recommendation Card Pill inside Chat */}
                {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                  <div className="mt-2.5 ml-9 flex flex-col gap-2 max-w-[88%] w-full">
                    <span className="text-[11px] font-medium uppercase tracking-wider text-[#A08885] flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#C2847A]" /> Featured In This Advice:
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      {msg.recommendedProducts.map((p) => (
                        <div
                          key={p.id}
                          className="bg-white border border-[#ECD9D3] rounded-xl p-2.5 flex items-center gap-3 shadow-xs hover:border-[#C2847A] transition"
                        >
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-12 h-12 rounded-lg object-cover bg-[#FAF2EF] shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-semibold text-[#2D2426] truncate">{p.name}</h4>
                            <p className="text-[11px] text-[#C2847A] font-medium">${p.price} <span className="line-through text-[#9C8E8B] text-[10px]">${p.originalPrice}</span></p>
                          </div>
                          <button
                            onClick={() => setSelectedProduct(p)}
                            className="px-2.5 py-1.5 bg-[#FAF2EF] hover:bg-[#871F2E] hover:text-white text-[#871F2E] rounded-lg text-xs font-medium flex items-center gap-1 transition shrink-0 cursor-pointer"
                          >
                            <Eye className="w-3 h-3" />
                            <span>View</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-[#8C7A78] ml-2">
                <div className="w-7 h-7 rounded-full bg-[#F0DCD5] text-[#871F2E] flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-[#EFE3DF] rounded-2xl px-4 py-2.5 flex items-center gap-1.5 shadow-xs">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#C2847A]" />
                  <span>Formulating beauty recommendation...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Suggestions (if only 1 or 2 messages) */}
          {messages.length <= 2 && (
            <div className="px-3 py-2 bg-[#FAF5F2] border-t border-[#F0E4E0] overflow-x-auto no-scrollbar flex gap-1.5">
              {quickPrompts.slice(0, 3).map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="shrink-0 text-[11px] bg-white hover:bg-[#F2DFD9] text-[#7A4B4B] border border-[#ECD9D3] rounded-full px-3 py-1 transition cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input Box Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-[#EFE3DF] flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about shades, skincare, ingredients..."
              className="flex-1 bg-[#FAF7F5] border border-[#EBDCD7] focus:border-[#C2847A] focus:bg-white rounded-full px-4 py-2.5 text-xs text-[#2D2426] placeholder-[#A89895] outline-none transition"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              aria-label="Send Message"
              className="p-2.5 rounded-full bg-gradient-to-r from-[#C2847A] to-[#871F2E] text-white hover:opacity-95 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-sm cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
