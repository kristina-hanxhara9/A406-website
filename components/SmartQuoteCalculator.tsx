import React, { useState } from 'react';
import { Calculator, Check, ChevronRight, User, Mail, Phone } from 'lucide-react';

const SmartQuoteCalculator: React.FC = () => {
  const [step, setStep] = useState(1);
  const [service, setService] = useState<'windows' | 'doors'>('windows');
  const [quantity, setQuantity] = useState(1);
  const [material, setMaterial] = useState('Aluminium');
  
  // New Contact State
  const [contact, setContact] = useState({ name: '', email: '', phone: '' });
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    // Basic validation
    if (!contact.name || !contact.email || !contact.phone) return;

    setLoading(true);
    setTimeout(() => {
      let basePrice = 0;
      if (service === 'windows') {
        const materialMultiplier = material === 'uPVC' ? 650 : 1200;
        basePrice = quantity * materialMultiplier;
      } else {
        const doorPrice = material === 'Composite' ? 1500 : 3800;
        basePrice = quantity * doorPrice; 
      }
      setResult(basePrice);
      setLoading(false);
      setStep(4);
    }, 1500);
  };

  const reset = () => {
    setStep(1);
    setResult(null);
    setQuantity(1);
    setContact({ name: '', email: '', phone: '' });
  };

  return (
    <div className="w-full bg-brand-light border border-gray-200 shadow-xl p-8 md:p-12 relative overflow-hidden min-h-[600px] flex flex-col justify-center">
      {/* Decorative Technical Lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-brand-red"></div>
      <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-brand-red/20"></div>

      <div className="relative z-10 w-full">
        <div className="flex justify-between items-start mb-10">
          <div>
            <h3 className="font-display text-3xl font-bold uppercase tracking-wide text-brand-black">Estimator</h3>
            <p className="text-gray-500 text-sm mt-1 uppercase tracking-widest">Interactive Costing Tool</p>
          </div>
          <div className="bg-brand-red/10 p-3 rounded-full">
            <Calculator className="text-brand-red w-6 h-6" />
          </div>
        </div>

        {/* STEP 1: Service Selection */}
        {step === 1 && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-400 mb-4 block font-bold">01 / System Selection</label>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setService('windows')}
                  className={`group p-5 text-left transition-all border ${
                    service === 'windows' 
                    ? 'bg-brand-black text-white border-brand-black shadow-lg' 
                    : 'bg-white text-gray-500 border-gray-200 hover:border-brand-red'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-display text-lg font-bold uppercase">Windows & Glazing</span>
                    {service === 'windows' && <Check className="w-5 h-5 text-brand-red" />}
                  </div>
                </button>
                <button
                  onClick={() => setService('doors')}
                  className={`group p-5 text-left transition-all border ${
                    service === 'doors' 
                    ? 'bg-brand-black text-white border-brand-black shadow-lg' 
                    : 'bg-white text-gray-500 border-gray-200 hover:border-brand-red'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-display text-lg font-bold uppercase">Entrance Systems</span>
                    {service === 'doors' && <Check className="w-5 h-5 text-brand-red" />}
                  </div>
                </button>
              </div>
            </div>
            
            <button
              onClick={() => setStep(2)}
              className="w-full py-4 bg-brand-red text-white font-display font-bold uppercase tracking-widest hover:bg-brand-redHover transition-all flex items-center justify-center gap-2"
            >
              Next Step <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: Configuration */}
        {step === 2 && (
          <div className="space-y-10 animate-fadeIn">
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-400 mb-6 block font-bold">02 / Dimensions & Quantity</label>
              <div className="flex items-center gap-6 bg-white p-6 border border-gray-200">
                <span className="font-display text-5xl font-bold text-brand-black">{quantity < 10 ? `0${quantity}` : quantity}</span>
                <div className="flex-1">
                  <input 
                    type="range" min="1" max="20" value={quantity} 
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full h-1 bg-gray-200 accent-brand-red appearance-none cursor-pointer rounded-full"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-2 font-mono">
                    <span>1 Unit</span>
                    <span>20 Units</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-widest text-gray-400 mb-4 block font-bold">03 / Material Finish</label>
              <div className="grid grid-cols-2 gap-4">
                {(service === 'windows' ? ['Aluminium', 'uPVC'] : ['Aluminium', 'Composite']).map(m => (
                  <button 
                    key={m}
                    onClick={() => setMaterial(m)}
                    className={`py-4 border text-sm font-bold uppercase tracking-wider transition-all ${
                      material === m 
                      ? 'bg-brand-black text-white border-brand-black' 
                      : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-gray-200 gap-4">
              <button onClick={() => setStep(1)} className="text-gray-500 hover:text-brand-black text-xs uppercase tracking-widest font-bold">Back</button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 bg-brand-black text-white py-4 font-display font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                Next Step <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Contact Details */}
        {step === 3 && (
          <div className="space-y-8 animate-fadeIn">
             <div>
               <label className="text-xs uppercase tracking-widest text-brand-red mb-2 block font-bold">04 / Your Details</label>
               <h4 className="font-display text-2xl font-bold uppercase mb-6">Unlock Your Estimate</h4>
               
               <div className="space-y-4">
                 <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-red transition-colors" />
                    <input 
                      type="text" 
                      placeholder="Full Name"
                      value={contact.name}
                      onChange={(e) => setContact({...contact, name: e.target.value})}
                      className="w-full bg-white border border-gray-200 p-4 pl-12 text-brand-black focus:border-brand-red focus:outline-none transition-colors font-medium placeholder:font-normal"
                    />
                 </div>
                 <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-red transition-colors" />
                    <input 
                      type="email" 
                      placeholder="Email Address"
                      value={contact.email}
                      onChange={(e) => setContact({...contact, email: e.target.value})}
                      className="w-full bg-white border border-gray-200 p-4 pl-12 text-brand-black focus:border-brand-red focus:outline-none transition-colors font-medium placeholder:font-normal"
                    />
                 </div>
                 <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-red transition-colors" />
                    <input 
                      type="tel" 
                      placeholder="Phone Number"
                      value={contact.phone}
                      onChange={(e) => setContact({...contact, phone: e.target.value})}
                      className="w-full bg-white border border-gray-200 p-4 pl-12 text-brand-black focus:border-brand-red focus:outline-none transition-colors font-medium placeholder:font-normal"
                    />
                 </div>
               </div>
               
               <p className="text-xs text-gray-400 mt-4 leading-relaxed">
                 By clicking below, you agree to receive your estimate and related communications. We respect your privacy.
               </p>
             </div>

             <div className="flex justify-between items-center pt-6 border-t border-gray-200 gap-4">
                <button onClick={() => setStep(2)} className="text-gray-500 hover:text-brand-black text-xs uppercase tracking-widest font-bold">Back</button>
                <button
                  onClick={calculate}
                  disabled={loading || !contact.name || !contact.email || !contact.phone}
                  className="flex-1 bg-brand-red text-white py-4 font-display font-bold uppercase tracking-widest hover:bg-brand-redHover transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-center"
                >
                  {loading ? 'Processing...' : 'Calculate Quote'}
                </button>
              </div>
          </div>
        )}

        {/* STEP 4: Results */}
        {step === 4 && result !== null && (
          <div className="animate-fadeIn">
            <div className="bg-white border border-gray-200 p-8 mb-6 shadow-sm border-t-4 border-t-brand-red">
              <span className="text-gray-400 text-xs uppercase tracking-widest mb-2 block font-bold">Estimate for {contact.name.split(' ')[0]}</span>
              <div className="font-display text-5xl font-bold text-brand-black mb-1">
                £{result.toLocaleString()}
              </div>
              <span className="text-sm text-brand-red font-medium uppercase tracking-wide">+ VAT @ 20%</span>
            </div>
            
            <p className="text-gray-500 text-sm mb-8 leading-relaxed font-light">
              We've sent a copy of this estimate to <span className="font-bold text-brand-black">{contact.email}</span>. 
              This figure is a preliminary estimate. A site survey is required for a binding quotation.
            </p>

            <div className="flex flex-col gap-3">
              <button onClick={() => window.location.href='#contact-form'} className="w-full bg-brand-black text-white py-4 font-display font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
                Book Site Survey
              </button>
              <button onClick={reset} className="w-full border border-gray-300 text-gray-500 py-3 text-xs uppercase tracking-widest hover:text-brand-black hover:border-brand-black transition-colors">
                Start New Estimate
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartQuoteCalculator;