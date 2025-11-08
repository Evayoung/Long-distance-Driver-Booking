import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, CheckCircle, Clock, MapPin, ChevronRight, X } from 'lucide-react';
import { useAppState } from '../state';

export default function LandingPage() {
  const navigate = useNavigate();
  const { demo, nextDemoStep } = useAppState();
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const handleBookClick = () => {
    if (demo.isActive && demo.currentStep === 1) {
      nextDemoStep();
    }
    navigate('/book');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Hero Section */}
      <section className="bg-navy text-white py-16 px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center">
          <div className="sm:w-1/2 sm:pr-12 mb-10 sm:mb-0">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              Book a licensed driver for <span className="text-blue-300">long-distance</span> trips
            </h1>
            <p className="text-lg text-blue-100 mb-8 max-w-md mx-auto sm:mx-0">
              We match you with verified drivers for safe intercity travel. Relax and let a professional handle the road.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center sm:justify-start">
              <button
                onClick={handleBookClick}
                className={`px-8 py-4 bg-white text-navy font-bold rounded-xl shadow-lg hover:bg-blue-50 transition-all transform hover:-translate-y-1 flex items-center justify-center ${demo.isActive && demo.currentStep === 1 ? 'ring-4 ring-yellow-400 animate-pulse' : ''}`}
              >
                Book a Trip <ChevronRight className="ml-2 w-5 h-5" />
              </button>
              <button
                onClick={() => setShowHowItWorks(true)}
                className="px-8 py-4 bg-transparent border-2 border-blue-400 text-blue-100 font-semibold rounded-xl hover:bg-blue-800/30 transition-colors"
              >
                How it works
              </button>
            </div>
          </div>
          {/* Hero Image Placeholder - Abstract Map/Car illustration */}
          <div className="sm:w-1/2 flex justify-center">
             <div className="relative w-full max-w-md h-64 bg-blue-800/50 rounded-2xl overflow-hidden border border-blue-700/50 flex items-center justify-center">
                 <MapPin className="text-blue-300/20 w-48 h-48 absolute -top-10 -left-10" />
                 <div className="bg-white p-4 rounded-xl shadow-xl z-10 flex items-center space-x-4 max-w-xs">
                     <div className="bg-green-100 p-2 rounded-full">
                        <Shield className="text-green-600 w-6 h-6" />
                     </div>
                     <div>
                         <p className="text-navy font-bold">Verified Driver</p>
                         <p className="text-gray-500 text-sm">Arriving in 5 mins</p>
                     </div>
                 </div>
             </div>
          </div>
        </div>

        {/* Trust Signals Row */}
        <div className="max-w-4xl mx-auto mt-12 pt-8 border-t border-blue-800 flex flex-wrap justify-center sm:justify-between gap-6 text-blue-100 text-sm font-medium">
          <div className="flex items-center"><Shield className="w-5 h-5 mr-2 text-blue-300" /> 100% Verified Drivers</div>
          <div className="flex items-center"><Clock className="w-5 h-5 mr-2 text-blue-300" /> 24/7 Trip Support</div>
          <div className="flex items-center"><CheckCircle className="w-5 h-5 mr-2 text-blue-300" /> Simple, Secure Booking</div>
        </div>
      </section>

      {/* How it Works Modal */}
      {showHowItWorks && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative animate-scale-in">
            <button onClick={() => setShowHowItWorks(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800">
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-navy mb-6">How DriveMate Works</h2>
            <div className="grid sm:grid-cols-3 gap-6">
               <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center text-navy font-bold text-xl mx-auto mb-4">1</div>
                  <h3 className="font-semibold text-navy mb-2">Request Trip</h3>
                  <p className="text-sm text-gray-600">Tell us your pickup, destination, and vehicle details.</p>
               </div>
               <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center text-navy font-bold text-xl mx-auto mb-4">2</div>
                  <h3 className="font-semibold text-navy mb-2">We Assign</h3>
                  <p className="text-sm text-gray-600">Our admins manually select the best verified driver for your route.</p>
               </div>
               <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center text-navy font-bold text-xl mx-auto mb-4">3</div>
                  <h3 className="font-semibold text-navy mb-2">Travel Safely</h3>
                  <p className="text-sm text-gray-600">Enjoy your trip. We track progress and gather feedback.</p>
               </div>
            </div>
            <div className="mt-8 text-center">
               <button onClick={() => { setShowHowItWorks(false); handleBookClick(); }} className="px-6 py-3 bg-navy text-white font-semibold rounded-lg hover:bg-navy-dark">
                   Get Started
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}