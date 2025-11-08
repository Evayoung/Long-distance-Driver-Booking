import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppState } from '../state';
import { CheckCircle, Clock, Phone, Star, Shield, MessageCircle, Share2, AlertTriangle } from 'lucide-react';

export default function ConfirmationPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { requests, drivers, demo, nextDemoStep } = useAppState();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);

  const request = requests.find(r => r.id === id);
  const assignedDriver = request?.assignedDriverId ? drivers.find(d => d.id === request.assignedDriverId) : null;

  // Demo step auto-advance hook when status changes
  React.useEffect(() => {
      if (demo.isActive && demo.currentStep === 7 && request?.status === 'ASSIGNED') {
          nextDemoStep();
      }
  }, [demo.isActive, demo.currentStep, request?.status, nextDemoStep]);

  if (!request) {
    return <div className="p-8 text-center">Request not found. <button onClick={() => navigate('/')} className="text-navy underline">Go Home</button></div>;
  }

  const handleShare = () => {
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 3000);
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">

      {/* Success Banner (only if just created or pending) */}
      {request.status === 'PENDING' && (
         <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-r-lg flex items-start animate-fade-in">
            <CheckCircle className="text-green-600 w-6 h-6 mr-3 flex-shrink-0 mt-0.5" />
            <div>
                <h3 className="text-green-800 font-bold">Thanks — we received your request.</h3>
                <p className="text-green-700 text-sm mt-1">Reference <strong>{request.id}</strong>. A driver will be assigned shortly (demo).</p>
            </div>
         </div>
      )}

      {/* Main Status Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
                <h1 className="text-xl font-bold text-gray-900">Trip to {request.destinationCity}</h1>
                <p className="text-gray-500 text-sm">{new Date(request.date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })} at {request.time}</p>
            </div>
            <div className={`mt-4 sm:mt-0 px-4 py-1.5 rounded-full text-sm font-bold flex items-center uppercase tracking-wide ${
                request.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                request.status === 'ASSIGNED' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
            }`}>
                {request.status === 'PENDING' && <Clock size={16} className="mr-2"/>}
                {request.status === 'ASSIGNED' && <CheckCircle size={16} className="mr-2"/>}
                {request.status}
            </div>
        </div>

        <div className="p-6 bg-gray-50">
            {/* If Pending */}
            {request.status === 'PENDING' && (
                <div className="text-center py-8">
                    <div className="inline-block p-4 bg-yellow-100 rounded-full mb-4 animate-pulse">
                        <Clock className="w-10 h-10 text-yellow-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Matching you with a driver...</h3>
                    <p className="text-gray-500 max-w-md mx-auto">Our dispatch team is reviewing your route to find the best verified driver. This usually takes 15-30 minutes.</p>
                </div>
            )}

            {/* If Assigned - DRIVER CARD */}
            {request.status === 'ASSIGNED' && assignedDriver && (
                 <div className="animate-scale-in">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Your Assigned Driver</h3>
                    <div className="bg-white border border-blue-100 rounded-xl p-6 flex flex-col sm:flex-row items-center sm:items-start shadow-sm">
                        <img src={assignedDriver.imageUrl} alt={assignedDriver.name} className="w-24 h-24 rounded-full object-cover border-4 border-blue-50 mb-4 sm:mb-0 sm:mr-6" />
                        <div className="flex-1 text-center sm:text-left">
                            <div className="flex flex-col sm:flex-row sm:items-center mb-2">
                                <h2 className="text-2xl font-bold text-navy mr-3">{assignedDriver.name}</h2>
                                {assignedDriver.isVerified && (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2 sm:mt-0 self-center sm:self-auto">
                                        <Shield size={12} className="mr-1" /> Verified
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center justify-center sm:justify-start text-sm text-gray-600 mb-4 space-x-4">
                                <span className="flex items-center"><Star size={16} className="text-yellow-400 mr-1 fill-current" /> {assignedDriver.rating} Rating</span>
                                <span>•</span>
                                <span>{assignedDriver.yearsExperience} years exp.</span>
                                <span>•</span>
                                <span className="text-gray-400">Lic: {assignedDriver.licenseId}</span>
                            </div>
                            <div className="flex space-x-3 justify-center sm:justify-start">
                                <button className="flex-1 sm:flex-none px-6 py-2.5 bg-navy text-white font-semibold rounded-lg hover:bg-navy-dark flex items-center justify-center">
                                    <Phone size={18} className="mr-2" /> Call Driver
                                </button>
                                <button className="px-4 py-2.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 flex items-center">
                                     <MessageCircle size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                     <p className="text-center sm:text-left text-sm text-green-600 mt-4 flex items-center justify-center sm:justify-start">
                         <CheckCircle size={16} className="mr-2"/> Driver has confirmed for {request.date} at {request.time}.
                     </p>
                 </div>
            )}
        </div>
      </div>

       {/* Actions */}
       <div className="flex justify-between text-sm">
           <button onClick={() => setShowCancelModal(true)} className="text-red-600 hover:text-red-800 font-medium">Cancel Request</button>
           <button className="text-gray-500 hover:text-navy flex items-center">Need Help? Contact Support</button>
       </div>

       {/* Share CTA */}
       <div className="mt-12 text-center">
          <button onClick={handleShare} className="inline-flex items-center text-navy font-semibold bg-blue-50 px-6 py-3 rounded-full hover:bg-blue-100 transition-colors">
              <Share2 size={18} className="mr-2"/> Share Trip Details (WhatsApp)
          </button>
       </div>

       {/* TOASTS/MODALS */}
       {showCancelModal && (
           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
               <div className="bg-white p-6 rounded-xl max-w-sm w-full">
                   <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                       <AlertTriangle className="text-red-600" />
                   </div>
                   <h3 className="text-lg font-bold text-center mb-2">Cancel this Trip?</h3>
                   <p className="text-gray-600 text-center text-sm mb-6">Are you sure? This action cannot be undone (in a real app).</p>
                   <div className="flex space-x-3">
                       <button onClick={() => setShowCancelModal(false)} className="flex-1 py-2.5 bg-gray-100 font-semibold rounded-lg hover:bg-gray-200">Keep it</button>
                       <button onClick={() => { alert("Demo: Cancelled"); setShowCancelModal(false); }} className="flex-1 py-2.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700">Yes, Cancel</button>
                   </div>
               </div>
           </div>
       )}
       {showShareToast && (
           <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg z-50 flex items-center animate-fade-in-up">
               <Share2 size={16} className="mr-2"/> Demo: WhatsApp share dialog would open here.
           </div>
       )}
    </div>
  );
}