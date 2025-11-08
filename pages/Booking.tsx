import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../state';
import { TripRequest } from '../types';
import { MapPin, Calendar, Car, Users, Info, Shield } from 'lucide-react';

export default function BookingPage() {
  const navigate = useNavigate();
  const { addRequest, demo, nextDemoStep } = useAppState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pickup: '',
    destination: '',
    date: '',
    time: '',
    passengers: '1',
    notes: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => { const newErrs = { ...prev }; delete newErrs[name]; return newErrs; });
    }
  };

  const prefillDemoData = () => {
    setFormData({
      name: 'Adaoke Chukwu',
      phone: '07000000000',
      pickup: 'Abuja',
      destination: 'Lagos',
      date: '2025-12-15',
      time: '07:00',
      passengers: '2',
      notes: 'Traveling with elderly mother, need careful driving.'
    });
    setErrors({});
    if (demo.isActive && demo.currentStep === 2) nextDemoStep();
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.phone) newErrors.phone = 'Contact number is required';
    if (!formData.pickup) newErrors.pickup = 'Pickup city is required';
    if (!formData.destination) newErrors.destination = 'Destination is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate network delay
    setTimeout(() => {
      const newRequest: TripRequest = {
        id: 'DEMO-R001', // Hardcoded for demo script consistency
        customerName: formData.name,
        customerPhone: formData.phone,
        pickupCity: formData.pickup,
        destinationCity: formData.destination,
        date: formData.date,
        time: formData.time,
        passengers: parseInt(formData.passengers),
        notes: formData.notes,
        status: 'PENDING',
        createdAt: new Date()
      };

      addRequest(newRequest);
      setIsSubmitting(false);
      if (demo.isActive && demo.currentStep === 3) nextDemoStep();
      navigate(`/confirmation/${newRequest.id}`);
    }, 1000);
  };

  const NIGERIAN_CITIES = ['', 'Abuja', 'Lagos', 'Ibadan', 'Port Harcourt', 'Enugu', 'Kano', 'Kaduna', 'Benin City'];

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-navy p-6 text-white flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold">Request a Driver</h1>
                <p className="text-blue-200 text-sm">Fill in your trip details to get matched.</p>
            </div>
            <button
                type="button"
                onClick={prefillDemoData}
                className={`text-xs bg-blue-800 hover:bg-blue-700 text-blue-100 py-2 px-3 rounded-lg border border-blue-600 transition-all ${demo.isActive && demo.currentStep === 2 ? 'ring-4 ring-yellow-400 animate-pulse font-bold text-white bg-blue-600' : ''}`}
            >
                ✨ Prefill Demo Data
            </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {/* Contact Info */}
          <div className="grid sm:grid-cols-2 gap-6">
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
               <input name="name" value={formData.name} onChange={handleChange} type="text" className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-navy focus:border-navy outline-none ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'}`} placeholder="e.g., Adaoke Chukwu" />
               {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
               <input name="phone" value={formData.phone} onChange={handleChange} type="tel" className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-navy focus:border-navy outline-none ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'}`} placeholder="e.g., 080 1234 5678" />
               {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
             </div>
          </div>

          {/* Trip Details */}
          <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 space-y-5">
            <h3 className="font-semibold text-navy flex items-center"><MapPin size={18} className="mr-2"/> Route & Timing</h3>
            <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Pickup City <span className="text-red-500">*</span></label>
                  <select name="pickup" value={formData.pickup} onChange={handleChange} className={`w-full p-3 bg-white border rounded-lg outline-none ${errors.pickup ? 'border-red-500' : 'border-gray-300'}`}>
                    <option value="">Select City</option>
                    {NIGERIAN_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {errors.pickup && <p className="text-red-500 text-xs mt-1">{errors.pickup}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Destination City <span className="text-red-500">*</span></label>
                  <select name="destination" value={formData.destination} onChange={handleChange} className={`w-full p-3 bg-white border rounded-lg outline-none ${errors.destination ? 'border-red-500' : 'border-gray-300'}`}>
                    <option value="">Select City</option>
                    {NIGERIAN_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                   {errors.destination && <p className="text-red-500 text-xs mt-1">{errors.destination}</p>}
                </div>
                <div>
                   <label className="block text-sm font-medium text-navy mb-1">Date <span className="text-red-500">*</span></label>
                   <div className="relative">
                     <Calendar className="absolute left-3 top-3.5 text-gray-400" size={18}/>
                     <input name="date" value={formData.date} onChange={handleChange} type="date" className={`w-full pl-10 p-3 border rounded-lg outline-none bg-white ${errors.date ? 'border-red-500' : 'border-gray-300'}`} />
                   </div>
                   {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                </div>
                 <div>
                   <label className="block text-sm font-medium text-navy mb-1">Preferred Time <span className="text-red-500">*</span></label>
                   <input name="time" value={formData.time} onChange={handleChange} type="time" className={`w-full p-3 border rounded-lg outline-none bg-white ${errors.time ? 'border-red-500' : 'border-gray-300'}`} />
                   {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
                </div>
            </div>
          </div>

           {/* Extras */}
           <div className="grid sm:grid-cols-2 gap-6">
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center"><Users size={16} className="mr-1 text-gray-400"/> Passengers</label>
                <select name="passengers" value={formData.passengers} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg outline-none">
                   {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
             </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center"><Car size={16} className="mr-1 text-gray-400"/> Car Preference (Optional)</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg outline-none text-gray-500" disabled>
                   <option>Any standard sedan (Customer supplies car)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1 flex items-center"><Info size={12} className="mr-1"/> Currently we only supply drivers for your vehicle.</p>
             </div>
           </div>

           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Travel Notes (Optional)</label>
             <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3} className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-navy" placeholder="Any special requirements or luggage details..." />
           </div>

           <div className="pt-4">
             <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 bg-navy text-white text-lg font-bold rounded-xl hover:bg-navy-dark transition-all flex justify-center items-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''} ${demo.isActive && demo.currentStep === 3 ? 'ring-4 ring-yellow-400 animate-pulse' : ''}`}
             >
               {isSubmitting ? (
                 <>
                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                   </svg>
                   Submitting Request...
                 </>
               ) : 'Request Trip'}
             </button>
             <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center">
               <Shield size={14} className="mr-1 text-green-600"/> Your details are secure and only shared with the assigned driver.
             </p>
           </div>
        </form>
      </div>
    </div>
  );
}