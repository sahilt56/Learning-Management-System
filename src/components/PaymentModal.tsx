import React, { useState } from 'react';
import axios from 'axios';
import { Shield, CheckCircle2, Loader2, X } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Course props
  course?: {
    _id: string;
    title: string;
    price: number;
    originalPrice?: number;
    thumbnailUrl?: string;
  };
  // Plan props
  plan?: {
    name: string;
    price: string | number;
  };
  onPlanSubmit?: (e: React.FormEvent) => Promise<void>;
  planLoading?: boolean;
  planError?: string;
  onPlanSuccess?: () => void; // called after modal shows success screen
}

export default function PaymentModal({ 
  isOpen, 
  onClose, 
  course, 
  plan, 
  onPlanSubmit, 
  planLoading, 
  planError,
  onPlanSuccess,
}: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('card');
  const [upiId, setUpiId] = useState('');
  const [upiApp, setUpiApp] = useState<'gpay' | 'phonepe' | 'none'>('none');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [email, setEmail] = useState('');
  
  const [step, setStep] = useState<'details' | 'payment' | 'success'>(plan ? 'payment' : 'details');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const itemName = course?.title || plan?.name || 'Item';
  const itemPrice = course?.price ?? plan?.price ?? 0;
  const isPlan = !!plan;

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardName.trim() || !email.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email.');
      return;
    }
    setError('');
    setStep('payment');
  };

  const handleCoursePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isPlan && onPlanSubmit) {
      await onPlanSubmit(e);
      // After plan payment completes without error, show success
      setStep('success');
      return;
    }

    setLoading(true);
    setError('');
    try {
      // Simulate payment
      await new Promise(r => setTimeout(r, 2000));

      const response = await axios.post('http://localhost:5000/api/enroll', {
        name: cardName,
        email: email,
        courseId: course?._id,
      });

      if (response.data.alreadyEnrolled) {
        setError('You already purchased this course.');
        return;
      }
      setStep('success');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const currentLoading = isPlan ? planLoading : loading;
  const currentError = isPlan ? planError : error;

  const handleClose = () => {
    if (!currentLoading) {
      setStep(plan ? 'payment' : 'details');
      setCardName('');
      setEmail('');
      setError('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm overflow-y-auto flex items-center justify-center p-4">
      <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] p-8 w-full max-w-md relative overflow-hidden">
        {/* Glass reflections */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-x-10 -translate-y-10" />
        
        {!currentLoading && step !== 'success' && (
          <button onClick={handleClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-20">
            <X className="size-5" />
          </button>
        )}

        {step === 'details' && !isPlan && (
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white mb-1">Your Details</h2>
            <p className="text-slate-400 text-sm mb-6">Enrolling in <span className="text-white font-bold">{itemName}</span></p>
            
            <form onSubmit={handleDetailsSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide block mb-1">Full Name</label>
                <input
                  type="text"
                  value={cardName}
                  onChange={e => setCardName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-white/30 focus:bg-white/5 transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide block mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  required
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-white/30 focus:bg-white/5 transition-all"
                />
                <p className="text-[11px] text-slate-400 mt-1">Use the same email to login.</p>
              </div>

              {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

              <button
                type="submit"
                className="w-full bg-white text-black hover:bg-slate-200 font-bold py-3.5 rounded-xl text-sm transition-all mt-4 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
              >
                Continue to Payment →
              </button>
            </form>
          </div>
        )}

        {step === 'payment' && (
          <div className="relative z-10">
            {!isPlan && (
              <button onClick={() => setStep('details')} className="text-slate-400 hover:text-white text-sm mb-6 flex items-center gap-1 transition-colors">
                ← Back
              </button>
            )}
            <h2 className="text-2xl font-bold text-white mb-1">Complete your purchase</h2>
            <p className="text-slate-400 text-sm mb-6">{itemName} — <span className="text-white font-bold">${itemPrice}{isPlan ? '/month' : ''}</span></p>
            
            <div className="flex bg-black/20 rounded-xl p-1 mb-6 border border-white/5">
              <button 
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${paymentMethod === 'card' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Credit Card
              </button>
              <button 
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${paymentMethod === 'upi' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
              >
                UPI App
              </button>
            </div>

            <form onSubmit={handleCoursePayment} className="space-y-4">
              {paymentMethod === 'card' ? (
                <>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide block mb-1">Name on Card</label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={e => setCardName(e.target.value)}
                      placeholder="John Doe"
                      required
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-white/30 focus:bg-white/5 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide block mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={e => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})/g, '$1 ').trim())}
                      placeholder="1234 5678 9012 3456"
                      required
                      maxLength={19}
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-white/30 focus:bg-white/5 font-mono tracking-widest transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide block mb-1">Expiry</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={e => {
                          let v = e.target.value.replace(/\D/g,'').slice(0,4);
                          if(v.length>2) v = v.slice(0,2)+'/'+v.slice(2);
                          setCardExpiry(v);
                        }}
                        placeholder="MM/YY"
                        required
                        maxLength={5}
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-white/30 focus:bg-white/5 font-mono transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide block mb-1">CVV</label>
                      <input
                        type="text"
                        value={cardCVV}
                        onChange={e => setCardCVV(e.target.value.replace(/\D/g,'').slice(0,4))}
                        placeholder="•••"
                        required
                        maxLength={4}
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-white/30 focus:bg-white/5 font-mono transition-all"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <button
                      type="button"
                      onClick={() => { setUpiApp('gpay'); setUpiId(''); }}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${upiApp === 'gpay' ? 'bg-white/10 border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'bg-black/20 border-white/5 hover:bg-white/5'}`}
                    >
                      <div className="size-10 rounded-full bg-white mb-3 flex items-center justify-center shadow-inner">
                        <span className="text-[#EA4335] font-bold text-xs">G</span><span className="text-[#34A853] font-bold text-xs">Pay</span>
                      </div>
                      <span className="text-sm font-medium text-slate-200">Google Pay</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => { setUpiApp('phonepe'); setUpiId(''); }}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${upiApp === 'phonepe' ? 'bg-white/10 border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'bg-black/20 border-white/5 hover:bg-white/5'}`}
                    >
                      <div className="size-10 rounded-full bg-white mb-3 flex items-center justify-center shadow-inner">
                        <span className="text-[#5f259f] font-bold text-lg leading-none mt-1">पे</span>
                      </div>
                      <span className="text-sm font-medium text-slate-200">PhonePe</span>
                    </button>
                  </div>
                  <div className="relative flex items-center py-2">
                    <div className="flex-grow border-t border-white/10"></div>
                    <span className="flex-shrink-0 mx-4 text-xs text-slate-500 uppercase tracking-wider">Or</span>
                    <div className="flex-grow border-t border-white/10"></div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide block mb-1">Enter UPI ID</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={e => {setUpiId(e.target.value); setUpiApp('none');}}
                      placeholder="username@upi"
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-white/30 focus:bg-white/5 transition-all"
                    />
                  </div>
                </>
              )}

              {currentError && <p className="text-red-400 text-sm mt-2">{currentError}</p>}

              <button
                type="submit"
                disabled={currentLoading || (paymentMethod === 'upi' && !upiId && upiApp === 'none')}
                className="w-full bg-white text-black hover:bg-slate-200 disabled:opacity-50 disabled:hover:bg-white font-bold py-3.5 rounded-xl text-sm transition-all mt-4 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2"
              >
                {currentLoading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
                ) : (
                  `Pay $${itemPrice} & Activate`
                )}
              </button>
              <p className="text-center text-xs text-slate-500 mt-3 flex items-center justify-center gap-1">
                <span className="opacity-70">🔒</span> Secured with 256-bit SSL encryption
              </p>
            </form>
          </div>
        )}

        {step === 'success' && (
          <div className="relative z-10 text-center space-y-5">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase tracking-wide">Payment Successful! 🎉</h2>
              <p className="text-slate-300 text-sm mt-2">
                {isPlan
                  ? <>Your <span className="font-bold text-white">{itemName}</span> plan is now active!</>
                  : <>You're now enrolled in <span className="font-bold text-white">{itemName}</span></>}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-left space-y-2 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-emerald-300 text-sm font-bold">
                <Shield className="w-4 h-4" />
                {isPlan ? 'Plan Activated Successfully' : 'Course Access Granted'}
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                {isPlan
                  ? 'Your account is being set up. You will be redirected to your dashboard shortly.'
                  : <>Login with <span className="font-bold text-indigo-400">{email}</span> to access your enrolled course in the dashboard.</>}
              </p>
            </div>

            <button
              onClick={() => {
                if (isPlan && onPlanSuccess) {
                  onPlanSuccess();
                } else {
                  handleClose();
                }
              }}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold uppercase tracking-wider py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
            >
              {isPlan ? 'Go to Dashboard →' : 'Go to Dashboard'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
