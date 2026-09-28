import React from 'react';
import { useShop } from '../context/ShopContext';
import { ASSET_IMAGES } from '../data/mockProducts';
import { Sparkles, Leaf, Heart, ShieldCheck, Award, ArrowRight } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { setCurrentView } = useShop();

  const values = [
    {
      icon: Leaf,
      title: 'Botanical Purity',
      desc: 'We sustainably harvest certified organic botanicals, cold-pressed seed oils, and floral distillates to formulate nutrient-rich elixirs.',
    },
    {
      icon: ShieldCheck,
      title: 'Dermatologist Validated',
      desc: 'Every serum, tint, and glaze is rigorously tested on diverse skin types to ensure maximum biocompatibility and barrier reinforcement.',
    },
    {
      icon: Heart,
      title: '100% Cruelty-Free',
      desc: 'We never test on animals at any stage of development. Certified Leaping Bunny approved and formulated without harmful toxins.',
    },
    {
      icon: Award,
      title: 'Conscious Luxury',
      desc: 'Housed in recyclable heavyweight frosted glass and FSC-certified paper, honoring the earth while elevating your dressing table.',
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      
      {/* Brand Story Hero */}
      <section className="bg-[#FAF7F5] border-b border-[#F0E4E1] py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8D382D]">
            Our Essence & Heritage
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#2D2426] font-normal leading-tight text-balance">
            Confidence, Radiance, & Uncompromised Grace
          </h1>
          <p className="text-base sm:text-lg text-[#5C4D50] leading-relaxed max-w-2xl mx-auto">
            At Glow & Grace, we believe beauty is an authentic expression of inner confidence. Our formulas are created not to mask, but to unveil and enhance your natural light.
          </p>
        </div>
      </section>

      {/* Founder / Atelier Narrative */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8D382D]">
              Born In The Botanical Atelier
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2D2426] font-normal leading-snug">
              Formulated With Intention, Crafted Without Compromise
            </h2>
            <p className="text-xs sm:text-sm text-[#5C4D50] leading-relaxed">
              Founded by cosmetic chemist and botanical enthusiast Vivienne Laurent, Glow & Grace emerged from a simple desire: luxurious cosmetics that combine the sensorial pleasure of high-end French beauty with the pristine safety of clean clinical actives.
            </p>
            <p className="text-xs sm:text-sm text-[#5C4D50] leading-relaxed">
              Whether it is our signature Damask rose water extracted at dawn or multi-weight hyaluronic peptides delivering deep moisture, each creation empowers you to feel luminous and self-assured every single day.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setCurrentView('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-[#2D2426] hover:bg-[#423639] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors inline-flex items-center gap-2"
              >
                <span>Discover The Rituals</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-4/3 rounded-3xl overflow-hidden border border-[#F0E4E1] shadow-xl">
              <img
                src={ASSET_IMAGES.fragrance}
                alt="Glow and Grace Atelier Craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8D382D]">
            The Glow Standard
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2D2426] font-normal mt-1">
            Our Core Commitments
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="bg-white p-6 rounded-2xl border border-[#F0E4E1] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#FFF2F0] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#8D382D]" />
                  </div>
                  <h3 className="font-serif text-xl text-[#2D2426] mb-2">{v.title}</h3>
                  <p className="text-xs text-[#5C4D50] leading-relaxed">{v.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
