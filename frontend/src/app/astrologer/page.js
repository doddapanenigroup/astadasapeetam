'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Calendar, 
  Clock, 
  MapPin, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  Filter, 
  RefreshCw, 
  ExternalLink, 
  User, 
  Send, 
  ShieldCheck, 
  BookOpen,
  Award,
  DollarSign,
  Phone,
  Mail,
  Check,
  X,
  Compass
} from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

export default function AstrologerWorkspacePage() {
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  // Consultations state
  const [consultations, setConsultations] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal for Prescribing Remedies
  const [completingConsultation, setCompletingConsultation] = useState(null);
  const [remedyNotes, setRemedyNotes] = useState('');

  // Helper Toast
  const showToast = (type, text) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage({ type: '', text: '' }), 4000);
  };

  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      try {
        const storedToken = localStorage.getItem('astada_token');
        const storedRole = localStorage.getItem('astada_role');

        if (storedToken && storedRole === 'astrologer') {
          setToken(storedToken);
          setUser({ name: 'Pandit Suryanarayana Shastri', role: 'astrologer', email: 'astrologer@astadasapeetam.com' });
          await fetchConsultations(storedToken);
        } else {
          // Auto-login as astrologer for instant testing
          const res = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'astrologer@astadasapeetam.com', password: 'Astro@12345' })
          });
          const data = await res.json();
          if (data.token) {
            setToken(data.token);
            setUser(data.user);
            localStorage.setItem('astada_token', data.token);
            localStorage.setItem('astada_role', data.user.role);
            await fetchConsultations(data.token);
          }
        }
      } catch (err) {
        console.error('Astrologer init error:', err);
        showToast('error', 'Cannot connect to backend server on port 5000');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const fetchConsultations = async (authToken) => {
    try {
      const res = await fetch(`${API_BASE}/astrologer/consultations`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      const data = await res.json();
      if (data.success) {
        setConsultations(data.data);
      }
    } catch (err) {
      console.error('Fetch consultations error:', err);
    }
  };

  // Accept Consultation
  const handleAcceptConsultation = async (id) => {
    setActionLoading(true);
    try {
      const res = await fetch(`${API_BASE}/astrologer/consultations/${id}/accept`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ scheduledSlot: new Date(Date.now() + 86400000) })
      });
      const data = await res.json();
      if (data.success) {
        setConsultations(prev => prev.map(c => c._id === id ? data.data : c));
        showToast('success', data.message);
      } else {
        showToast('error', data.message);
      }
    } catch {
      showToast('error', 'Failed to accept consultation');
    } finally {
      setActionLoading(false);
    }
  };

  // Complete & Prescribe Remedies
  const handleCompleteConsultation = async (e) => {
    e.preventDefault();
    if (!completingConsultation) return;
    setActionLoading(true);

    try {
      const res = await fetch(`${API_BASE}/astrologer/consultations/${completingConsultation._id}/complete`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ remedyNotes })
      });
      const data = await res.json();
      if (data.success) {
        setConsultations(prev => prev.map(c => c._id === completingConsultation._id ? data.data : c));
        setCompletingConsultation(null);
        setRemedyNotes('');
        showToast('success', 'Vedic remedy prescribed and consultation marked completed!');
      } else {
        showToast('error', data.message);
      }
    } catch {
      showToast('error', 'Failed to complete consultation');
    } finally {
      setActionLoading(false);
    }
  };

  const filteredConsultations = consultations.filter(c => {
    return statusFilter === 'all' || c.status === statusFilter;
  });

  return (
    <div className="min-h-screen bg-[#faf8f4] text-slate-800 font-sans pb-20">
      {/* Top Identity Header */}
      <div className="bg-[#32134a] text-white border-b border-purple-900/60 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🔮</span>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold tracking-wide">Verified Astrologer Jyotish Workspace</h1>
                <span className="text-[10px] bg-amber-400 text-purple-950 font-black uppercase px-2 py-0.5 rounded-full shadow-sm">
                  Role: Jyotish Acharya
                </span>
              </div>
              <p className="text-xs text-purple-200/80">
                Devotee Kundali Analysis, Vivaha Guna Milan & Vedic Remedy Prescriptions
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <div className="bg-stone-900/60 border border-purple-400/30 px-3 py-1.5 rounded-lg flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-semibold">{user?.name || 'Pandit Suryanarayana Shastri'}</span>
              <span className="text-purple-300">({user?.email || 'astrologer@astadasapeetam.com'})</span>
            </div>

            <Link
              href="/"
              className="bg-purple-700 hover:bg-purple-600 text-white font-medium px-3 py-1.5 rounded-lg flex items-center space-x-1 transition"
            >
              <span>Public Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Toast Notification Alert */}
      {statusMessage.text && (
        <div className="max-w-md mx-auto mt-4 px-4">
          <div className={`p-3 rounded-xl shadow-lg border flex items-center space-x-3 text-sm ${
            statusMessage.type === 'success' 
              ? 'bg-emerald-50 border-emerald-300 text-emerald-800' 
              : 'bg-rose-50 border-rose-300 text-rose-800'
          }`}>
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
            )}
            <span className="font-medium">{statusMessage.text}</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Acharya Profile Card */}
        <div className="bg-gradient-to-r from-[#280c3d] via-[#3a1257] to-[#280c3d] text-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-3xl shrink-0">
              🕉️
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold">Pandit Suryanarayana Shastri</h2>
                <span className="bg-emerald-500 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified Jyotish Acharya</span>
                </span>
              </div>
              <p className="text-xs text-purple-200">
                Pradhana Jyotish Acharya • 24 Years Experience in Parashara Hora Shastra
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1 text-[11px]">
                {['Kundali Matching', 'Dosha Nivarana', 'Vedic Muhurtham', 'Gemstones Remedy'].map((spec, i) => (
                  <span key={i} className="bg-white/10 px-2 py-0.5 rounded-md text-amber-200">
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-black/30 border border-purple-400/30 p-4 rounded-xl text-xs space-y-1 self-stretch md:self-auto min-w-[200px]">
            <div className="text-purple-300">Consultation Dakshina:</div>
            <div className="text-xl font-black text-amber-400">₹750 / Session</div>
            <div className="text-[10px] text-emerald-400 font-semibold">100% Guaranteed Confidential</div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-xl border border-purple-100 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-xs">
            <span className="font-bold text-slate-700">Filter Queue by Status:</span>
            {[
              { id: 'all', label: 'All Devotee Requests' },
              { id: 'pending', label: '⏳ Pending Approval' },
              { id: 'confirmed', label: '📅 In Review / Scheduled' },
              { id: 'completed', label: '✅ Completed Readings' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setStatusFilter(f.id)}
                className={`px-3 py-1.5 rounded-lg font-medium transition ${
                  statusFilter === f.id
                    ? 'bg-[#32134a] text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => fetchConsultations(token)}
            className="text-xs bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 px-3 py-1.5 rounded-lg font-semibold flex items-center space-x-1.5 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh Queue</span>
          </button>
        </div>

        {/* Consultations List */}
        <div className="space-y-4">
          {filteredConsultations.map((c) => (
            <div
              key={c._id}
              className="bg-white rounded-2xl border border-purple-100 p-6 shadow-sm hover:shadow-md transition space-y-4"
            >
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-900 font-black flex items-center justify-center text-sm">
                    {c.devoteeName?.charAt(0) || 'D'}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{c.devoteeName}</h3>
                    <div className="text-xs text-slate-500 flex items-center space-x-3">
                      <span>📞 {c.devoteePhone}</span>
                      {c.devoteeEmail && <span>✉️ {c.devoteeEmail}</span>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900">
                    {c.consultationType?.replace('_', ' ')}
                  </span>
                  <span className={`text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                    c.status === 'completed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : c.status === 'confirmed'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    Status: {c.status}
                  </span>
                  <span className="text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded">
                    Dakshina: ₹{c.fee} Paid
                  </span>
                </div>
              </div>

              {/* Devotee Birth Chart Details */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 bg-purple-50/50 p-4 rounded-xl text-xs border border-purple-100">
                <div>
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Date of Birth</div>
                  <div className="font-bold text-slate-800">{c.birthDetails?.dateOfBirth || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Time of Birth</div>
                  <div className="font-bold text-slate-800">{c.birthDetails?.timeOfBirth || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Place of Birth</div>
                  <div className="font-bold text-slate-800">{c.birthDetails?.placeOfBirth || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Janma Rasi</div>
                  <div className="font-bold text-purple-900">{c.birthDetails?.rasi || 'Not Known'}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Nakshatram</div>
                  <div className="font-bold text-purple-900">{c.birthDetails?.nakshatram || 'Not Known'}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Gotram</div>
                  <div className="font-bold text-slate-800">{c.birthDetails?.gotram || 'Not Known'}</div>
                </div>
              </div>

              {/* Query Description */}
              <div className="space-y-1">
                <div className="text-xs font-bold text-slate-600">Devotee Question & Seeking Guidance:</div>
                <p className="text-xs text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
                  "{c.problemDescription}"
                </p>
              </div>

              {/* Remedy notes if completed */}
              {c.astrologerRemedyNotes && (
                <div className="space-y-1 bg-amber-50 p-3.5 rounded-xl border border-amber-200 text-xs">
                  <div className="font-bold text-[#701a28] flex items-center space-x-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>Prescribed Vedic Remedies & Parikaram:</span>
                  </div>
                  <p className="text-slate-800 font-serif leading-relaxed">
                    {c.astrologerRemedyNotes}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-1">
                {c.status === 'pending' && (
                  <button
                    onClick={() => handleAcceptConsultation(c._id)}
                    disabled={actionLoading}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center space-x-1.5 shadow"
                  >
                    <Check className="w-4 h-4" />
                    <span>Accept & Schedule Slot</span>
                  </button>
                )}

                {c.status !== 'completed' && (
                  <button
                    onClick={() => {
                      setCompletingConsultation(c);
                      setRemedyNotes(c.astrologerRemedyNotes || '');
                    }}
                    className="bg-[#32134a] hover:bg-[#230c34] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center space-x-1.5 shadow"
                  >
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span>Write Remedy & Complete</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Complete / Prescribe Remedy Modal */}
      {completingConsultation && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-purple-200">
            <div className="bg-[#32134a] text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Prescribe Vedic Remedy for {completingConsultation.devoteeName}</span>
              </h3>
              <button onClick={() => setCompletingConsultation(null)} className="text-purple-200 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCompleteConsultation} className="p-5 space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Vedic Remedies, Mantra Japa & Suggested Temple Parikaram *
                </label>
                <textarea
                  rows="6"
                  required
                  placeholder="e.g. 1. Perform Navagraha Shanti Homa on upcoming Shukla Paksha Ekadashi.&#10;2. Wear certified 5-Mukhi Nepal Rudraksha.&#10;3. Chant Lalitha Sahasranama Stotram every Friday evening."
                  value={remedyNotes}
                  onChange={(e) => setRemedyNotes(e.target.value)}
                  className="w-full border rounded-xl p-3 focus:border-purple-600 focus:outline-none font-serif leading-relaxed"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setCompletingConsultation(null)}
                  className="px-4 py-2 rounded-lg border text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 rounded-lg bg-[#32134a] hover:bg-[#230c34] text-white font-bold"
                >
                  {actionLoading ? 'Submitting...' : 'Dispatch Remedy & Complete'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
