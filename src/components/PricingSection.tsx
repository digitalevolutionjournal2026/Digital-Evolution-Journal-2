import React, { useState } from 'react';
import { MEMBERSHIP_TIERS } from '../data/journalData';
import { 
  Check, 
  Sparkles, 
  ShieldCheck, 
  BookOpen, 
  CreditCard, 
  Lock, 
  HelpCircle,
  Globe,
  Award
} from 'lucide-react';

interface PricingSectionProps {
  onOpenAuth: (mode: 'register') => void;
  onOpenGovernance: (docId?: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  onOpenAuth,
  onOpenGovernance,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  return (
    <section id="membership" className="py-20 bg-slate-900 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider font-mono">
            <Globe className="w-3.5 h-3.5" />
            <span>100% Gold Open Access Guarantee</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-serif-editorial text-white tracking-tight">
            Reading Published Articles Is Always Free
          </h2>

          <p className="text-base text-slate-300 leading-relaxed font-normal">
            Every manuscript on Digital Evolution is published under Creative Commons CC BY 4.0. No paywalls, no subscriptions required to read. Optional supporter tiers fund advanced analytical tools and library repository feeds.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-slate-800 border border-slate-700 p-1 rounded-xl text-xs font-semibold mt-4">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                billingCycle === 'yearly'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono font-bold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {MEMBERSHIP_TIERS.map((tier) => {
            const price = billingCycle === 'yearly' ? tier.priceYearly : tier.priceMonthly;
            return (
              <div
                key={tier.id}
                className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between border transition-all relative ${
                  tier.isPopular
                    ? 'bg-slate-800/95 border-amber-500 shadow-2xl shadow-amber-500/10'
                    : 'bg-slate-800/50 border-slate-700/80 hover:border-slate-600'
                }`}
              >
                {tier.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 text-[10px] uppercase font-mono font-bold px-3 py-1 rounded-full shadow-md">
                    Most Popular for Researchers
                  </div>
                )}

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold font-serif-editorial text-white">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-slate-400 leading-snug">
                      {tier.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="py-2 border-y border-slate-700/60 flex items-baseline gap-1 font-mono">
                    <span className="text-3xl sm:text-4xl font-bold text-white">
                      ${price}
                    </span>
                    <span className="text-xs text-slate-400">
                      {tier.priceMonthly === 0 ? '/ forever' : billingCycle === 'yearly' ? '/ year' : '/ month'}
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 text-xs text-slate-300 pt-2">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block font-semibold">
                      Included Capabilities:
                    </span>
                    {tier.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-8 pt-4 border-t border-slate-700/60 space-y-2">
                  <button
                    onClick={() => onOpenAuth('register')}
                    className={`w-full py-3 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                      tier.isPopular
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg'
                        : 'bg-slate-700 hover:bg-slate-600 text-white'
                    }`}
                  >
                    {tier.ctaLabel}
                  </button>
                  <span className="text-[10px] text-slate-500 font-mono block text-center">
                    Audience: {tier.targetAudience}
                  </span>
                </div>

              </div>
            );
          })}
        </div>

        {/* Security & Payment Partners */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-400" />
            <span>Secure Checkout: Razorpay (India) + Stripe (International)</span>
          </div>

          <button
            onClick={() => onOpenGovernance('doc-copyright-oa')}
            className="text-amber-400 underline hover:text-amber-300 cursor-pointer"
          >
            Read Gold Open Access Governance Policy
          </button>
        </div>

      </div>
    </section>
  );
};
