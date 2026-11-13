'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building, CheckCircle2, ShieldCheck, Truck, Percent, 
  ArrowRight, Phone, Mail, MapPin, IndianRupee, Sparkles, 
  HelpCircle, ChevronRight, Lock
} from 'lucide-react';
import HeaderNav from '../../components/HeaderNav';
import Footer from '../../components/Footer';

export default function BecomeSellerPage() {
  const [form, setForm] = useState({
    shopName: '',
    contactPerson: '',
    phone: '',
    email: '',
    category: 'pooja-kits',
    street: '',
    city: '',
    state: '',
    pincode: '',
    bankAccount: '',
    ifsc: '',
    upiId: '',
    productDescription: '',
    agreedCommission: true
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('http://localhost:5000/api/vendors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shopName: form.shopName,
          contactPerson: form.contactPerson,
          phone: form.phone,
          email: form.email,
          category: form.category,
          commissionRate: 20, // Standard 20% platform commission
          pickupAddress: {
            street: form.street,
            city: form.city,
            state: form.state,
            pincode: form.pincode
          },
          bankDetails: {
            accountNumber: form.bankAccount,
            ifscCode: form.ifsc,
            upiId: form.upiId
          }
        })
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || 'Failed to submit registration. Please check fields.');
      }
    } catch (err) {
      setErrorMsg('Error contacting server: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf9f4] flex flex-col font-sans">
      <HeaderNav />

      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-[#78131e] via-[#5d0e17] to-[#450a11] text-white py-12 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-200 border border-amber-300/30 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Sri Astadasapeetam Multi-Vendor Partner Program</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-amber-100">
            Sell Your Sacred Devotional Creations to Devotees Pan-India
          </h1>
          <p className="text-xs sm:text-sm text-stone-200 max-w-2xl mx-auto leading-relaxed">
            Join Bharat&apos;s most revered spiritual marketplace. Ship directly from your workshop or store. Automated Shiprocket courier pickups right at your doorstep. Zero listing fee.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-4 text-xs font-semibold text-amber-200">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Doorstep Courier Pickup
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Weekly Direct Bank Payouts
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Instant WhatsApp Orders
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-10">
        {!submitted ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Left Col: Explainer Cards */}
            <div className="space-y-4 md:col-span-1">
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
                <h3 className="font-bold text-stone-900 text-sm font-serif">How It Works for Sellers</h3>
                
                <div className="space-y-3 text-xs text-stone-600">
                  <div className="flex gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-[#78131e] font-bold text-xs flex items-center justify-center shrink-0">1</span>
                    <p><strong className="text-stone-900">List Your Items:</strong> We feature your certified rudrakshas, brass idols, or pooja samagri.</p>
                  </div>

                  <div className="flex gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-[#78131e] font-bold text-xs flex items-center justify-center shrink-0">2</span>
                    <p><strong className="text-stone-900">Get WhatsApp Alert:</strong> When a devotee orders, you get the customer details &amp; shipping label on WhatsApp.</p>
                  </div>

                  <div className="flex gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-[#78131e] font-bold text-xs flex items-center justify-center shrink-0">3</span>
                    <p><strong className="text-stone-900">Doorstep Pickup:</strong> Blue Dart / Delhivery courier agent comes to your shop and picks up the parcel.</p>
                  </div>

                  <div className="flex gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-[#78131e] font-bold text-xs flex items-center justify-center shrink-0">4</span>
                    <p><strong className="text-stone-900">Weekly Payouts:</strong> 80% product amount credited to your bank account every Tuesday.</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-xs text-amber-950 space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-sm text-[#78131e]">
                  <Percent className="w-4 h-4" />
                  <span>Fair Platform Fee</span>
                </div>
                <p className="leading-relaxed">
                  Astadasapeetam charges a flat <strong>20% platform commission</strong> only upon successful delivery. No setup fees, no monthly software charges.
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-stone-200 text-xs space-y-1.5">
                <span className="font-bold text-stone-900 block">📞 Seller Support Helpdesk</span>
                <p className="text-stone-500">Need help onboarding? Talk directly with our Vendor Lead.</p>
                <p className="font-mono font-bold text-[#78131e]">+91 86398 61707</p>
                <p className="text-stone-400 text-[11px]">sellers@astadasapeetam.com</p>
              </div>
            </div>

            {/* Right Col: Intake Form */}
            <div className="md:col-span-2 bg-white rounded-3xl p-6 sm:p-7 border border-[#ebdcc7] shadow-sm space-y-5">
              <div>
                <h2 className="text-lg font-black text-stone-900 font-serif">
                  Artisan &amp; Vendor Partner Application
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Fill in your workshop / store details to begin receiving automated orders.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {/* Shop / Business Name */}
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Store / Workshop / Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kumbakonam Brass Idol Works"
                    value={form.shopName}
                    onChange={(e) => setForm({ ...form, shopName: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 focus:border-[#78131e] rounded-xl px-3.5 py-2.5 font-medium outline-none text-stone-900 text-xs sm:text-sm"
                  />
                </div>

                {/* Owner / Contact Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      Contact Person (Owner / Lead Artisan) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sunder Raman"
                      value={form.contactPerson}
                      onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 focus:border-[#78131e] rounded-xl px-3.5 py-2.5 font-medium outline-none text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      WhatsApp Mobile Number (For Order Alerts) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 focus:border-[#78131e] rounded-xl px-3.5 py-2.5 font-medium outline-none text-stone-900"
                    />
                  </div>
                </div>

                {/* Email & Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      Email Address <span className="font-normal text-stone-400">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. contact@crafts.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 focus:border-[#78131e] rounded-xl px-3.5 py-2.5 font-medium outline-none text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Primary Category *</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 focus:border-[#78131e] rounded-xl px-3.5 py-2.5 font-medium outline-none text-stone-900"
                    >
                      <option value="pooja-kits">Pooja Kits &amp; Samagri</option>
                      <option value="rudraksha">Certified Nepal/Indo Rudrakshas</option>
                      <option value="yantras-idols">Energized Brass Idols &amp; Yantras</option>
                      <option value="dhoop-samagri">Pure Camphor, Dhoop &amp; Ghee Wicks</option>
                      <option value="vedic-books">Vedic Books &amp; Puranas</option>
                      <option value="prasadam">Temple Prasadam</option>
                    </select>
                  </div>
                </div>

                {/* Pickup Address for Courier (Critical) */}
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl space-y-2.5">
                  <span className="font-bold text-stone-900 text-xs flex items-center gap-1.5 uppercase tracking-wide">
                    <MapPin className="w-4 h-4 text-[#78131e]" />
                    <span>Courier Pickup Address (Where delivery vans will collect) *</span>
                  </span>

                  <input
                    type="text"
                    required
                    placeholder="Shop No, Building, Street Address *"
                    value={form.street}
                    onChange={(e) => setForm({ ...form, street: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 outline-none font-medium text-stone-900"
                  />

                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="City *"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="bg-white border border-stone-300 rounded-xl px-3 py-2 outline-none font-medium text-stone-900"
                    />
                    <input
                      type="text"
                      required
                      placeholder="State *"
                      value={form.state}
                      onChange={(e) => setForm({ ...form, state: e.target.value })}
                      className="bg-white border border-stone-300 rounded-xl px-3 py-2 outline-none font-medium text-stone-900"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Pincode *"
                      value={form.pincode}
                      onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                      className="bg-white border border-stone-300 rounded-xl px-3 py-2 outline-none font-bold text-stone-900 font-mono"
                    />
                  </div>
                </div>

                {/* Bank Details for Weekly Payouts */}
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl space-y-2.5">
                  <span className="font-bold text-stone-900 text-xs flex items-center gap-1.5 uppercase tracking-wide">
                    <IndianRupee className="w-4 h-4 text-emerald-600" />
                    <span>Bank Account / UPI for Weekly Profit Payouts *</span>
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <input
                      type="text"
                      placeholder="Bank Account Number *"
                      value={form.bankAccount}
                      onChange={(e) => setForm({ ...form, bankAccount: e.target.value })}
                      className="bg-white border border-stone-300 rounded-xl px-3 py-2 outline-none font-medium text-stone-900 font-mono"
                    />
                    <input
                      type="text"
                      placeholder="Bank IFSC Code *"
                      value={form.ifsc}
                      onChange={(e) => setForm({ ...form, ifsc: e.target.value.toUpperCase() })}
                      className="bg-white border border-stone-300 rounded-xl px-3 py-2 outline-none font-bold uppercase text-stone-900 font-mono"
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Or UPI ID (e.g. seller@okaxis / 9876543210@ybl)"
                    value={form.upiId}
                    onChange={(e) => setForm({ ...form, upiId: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 outline-none font-medium text-stone-900"
                  />
                </div>

                {/* Terms agreement */}
                <label className="flex items-start gap-2 text-[11px] text-stone-600 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    required
                    checked={form.agreedCommission}
                    onChange={(e) => setForm({ ...form, agreedCommission: e.target.checked })}
                    className="mt-0.5 accent-[#78131e] rounded"
                  />
                  <span>
                    I confirm my items are 100% authentic and Vedic pure. I agree to Astadasapeetam&apos;s standard 20% platform commission on completed deliveries.
                  </span>
                </label>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#78131e] hover:bg-[#600e17] text-white font-bold py-3.5 px-4 rounded-2xl shadow-md transition cursor-pointer text-sm flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4 text-amber-300" />
                  <span>{loading ? 'Submitting Application...' : 'Submit Seller Application & Connect Shiprocket'}</span>
                </button>
              </form>
            </div>

          </div>
        ) : (
          /* Confirmation Success Screen */
          <div className="bg-white rounded-3xl p-8 max-w-xl mx-auto text-center border border-stone-200 shadow-sm space-y-4 animate-in zoom-in-95">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h2 className="text-xl sm:text-2xl font-serif font-black text-stone-900">
              Dhanya Vadamulu! Seller Application Received
            </h2>

            <p className="text-xs text-stone-600 leading-relaxed max-w-md mx-auto">
              Welcome to the Astadasapeetam Partner Network, <strong className="text-stone-900">{form.shopName}</strong>! Our Seller Relations team has registered your pickup location in Shiprocket and will contact you on WhatsApp (+91 {form.phone}) to verify your first product batch.
            </p>

            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-left text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-stone-500">Shop:</span>
                <span className="font-bold text-stone-800">{form.shopName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Contact:</span>
                <span className="font-medium text-stone-800">{form.contactPerson} ({form.phone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Pickup Location:</span>
                <span className="font-medium text-stone-800">{form.city}, {form.state} - {form.pincode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Platform Commission:</span>
                <span className="font-bold text-emerald-700">20% on Delivered Orders</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/marketplace"
                className="inline-flex items-center gap-2 bg-stone-950 hover:bg-stone-900 text-white font-bold text-xs px-6 py-3 rounded-xl transition cursor-pointer"
              >
                <span>Return to Marketplace</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
