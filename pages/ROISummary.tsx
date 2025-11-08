import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, TrendingUp, MessageSquare } from 'lucide-react';

export default function ROISummary() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy mb-4">Why Digitize Your Booking Process?</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Moving from WhatsApp/Phone to a structured web app isn't just about looking modern—it's about scaling your business efficiently.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-blue-100 flex items-start">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <Clock className="text-navy w-6 h-6" />
              </div>
              <div>
                  <h3 className="text-xl font-bold text-navy mb-2">Reduce Coordination Time by 60%</h3>
                  <p className="text-gray-600">Stop the back-and-forth calls. Collect all trip details in one structured form, and assign drivers with two clicks.</p>
              </div>
          </div>
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-blue-100 flex items-start">
              <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <TrendingUp className="text-green-700 w-6 h-6" />
              </div>
              <div>
                  <h3 className="text-xl font-bold text-navy mb-2">Increase Booking Conversion</h3>
                  <p className="text-gray-600">Customers trust a professional booking portal more than a WhatsApp number. Capture bookings even when you're asleep.</p>
              </div>
          </div>
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-blue-100 flex items-start">
              <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                  <CheckCircle className="text-yellow-700 w-6 h-6" />
              </div>
              <div>
                  <h3 className="text-xl font-bold text-navy mb-2">Build Trust with Profiles</h3>
                  <p className="text-gray-600">Showing customers a verified driver profile before the trip reduces anxiety and increases repeat business.</p>
              </div>
          </div>
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-blue-100 flex items-start">
              <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <MessageSquare className="text-purple-700 w-6 h-6" />
              </div>
              <div>
                  <h3 className="text-xl font-bold text-navy mb-2">Centralized Records</h3>
                  <p className="text-gray-600">No more lost chats. Every trip, driver, and payment status is recorded in one searchable dashboard.</p>
              </div>
          </div>
      </div>

      <div className="bg-navy rounded-2xl p-8 sm:p-12 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to build the real thing?</h2>
          <p className="text-blue-200 mb-8 max-w-xl mx-auto">This prototype demonstrates the core flows. The next step is building the backend to connect real drivers and customers.</p>
          <div className="flex justify-center space-x-4">
              <button onClick={() => navigate('/')} className="px-6 py-3 bg-white text-navy font-bold rounded-lg hover:bg-blue-50">
                  Back to Prototype
              </button>
               <button onClick={() => window.print()} className="px-6 py-3 border-2 border-blue-400 text-blue-100 font-bold rounded-lg hover:bg-navy-dark">
                  Save as PDF
              </button>
          </div>
      </div>
    </div>
  );
}