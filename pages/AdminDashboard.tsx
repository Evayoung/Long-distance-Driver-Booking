import React, { useState } from 'react';
import { useAppState } from '../state';
import { TripRequest, Driver } from '../types';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Users, Calendar, BarChart2, Search, MapPin, Star, Shield, Check, X, User } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// --- SUB-COMPONENTS FOR ADMIN ---

const AdminNav = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path || (path !== '/admin' && location.pathname.startsWith(path));

  return (
    <div className="w-full sm:w-64 bg-white border-r border-gray-200 sm:min-h-[calc(100vh-64px)] flex-shrink-0">
      <div className="p-6">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Management</h2>
          <nav className="mt-4 space-y-1">
              <Link to="/admin" className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${location.pathname === '/admin' ? 'bg-blue-50 text-navy' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <Calendar size={18} className={`mr-3 ${location.pathname === '/admin' ? 'text-navy' : 'text-gray-400'}`}/> Requests
              </Link>
              <Link to="/admin/drivers" className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive('/admin/drivers') ? 'bg-blue-50 text-navy' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <Users size={18} className={`mr-3 ${isActive('/admin/drivers') ? 'text-navy' : 'text-gray-400'}`}/> Drivers
              </Link>
               <Link to="/admin/reports" className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive('/admin/reports') ? 'bg-blue-50 text-navy' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <BarChart2 size={18} className={`mr-3 ${isActive('/admin/reports') ? 'text-navy' : 'text-gray-400'}`}/> Reports
              </Link>
          </nav>
      </div>
    </div>
  );
};

const RequestsList = () => {
    const { requests, drivers, assignDriver, completeTrip, demo, nextDemoStep } = useAppState();
    const [assignModalOpen, setAssignModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<TripRequest | null>(null);
    const [assignToast, setAssignToast] = useState<string | null>(null);

    const openAssign = (req: TripRequest) => {
        setSelectedRequest(req);
        setAssignModalOpen(true);
        if (demo.isActive && demo.currentStep === 5) nextDemoStep();
    }

    const handleAssign = (driver: Driver) => {
        if (selectedRequest) {
            assignDriver(selectedRequest.id, driver.id);
            setAssignModalOpen(false);
            setAssignToast(`Driver ${driver.name} assigned to ${selectedRequest.id}. Customer notified (demo).`);
            setTimeout(() => setAssignToast(null), 5000);
            if (demo.isActive && demo.currentStep === 6) nextDemoStep();
        }
    }

    return (
        <div className="p-6 sm:p-8 flex-1 overflow-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Trip Requests</h1>
                <button className="text-sm bg-navy text-white px-4 py-2 rounded-lg hover:bg-navy-dark transition-colors">+ New Manual Booking</button>
            </div>

            {assignToast && (
                <div className="mb-4 p-4 bg-gray-900 text-green-400 rounded-lg flex items-center justify-between animate-fade-in">
                   <span className="flex items-center"><Check size={18} className="mr-2"/> {assignToast}</span>
                   <button onClick={() => setAssignToast(null)}><X size={16} className="text-gray-500 hover:text-white"/></button>
                </div>
            )}

            <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
                {requests.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                        <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300"/>
                        <p>No requests yet — bookings will appear here.</p>
                        <p className="text-sm">Use 'Start Guided Demo' to simulate a booking.</p>
                    </div>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID & Customer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {requests.map(req => {
                                const assigned = req.assignedDriverId ? drivers.find(d => d.id === req.assignedDriverId) : null;
                                return (
                                <tr key={req.id} className={`hover:bg-gray-50 transition-colors ${demo.isActive && demo.currentStep === 5 && req.id === 'DEMO-R001' ? 'bg-yellow-50' : ''}`}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-bold text-navy">{req.id}</div>
                                        <div className="text-sm text-gray-900">{req.customerName}</div>
                                        <div className="text-xs text-gray-500">{req.customerPhone}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm flex items-center"><MapPin size={14} className="mr-1 text-gray-400"/> {req.pickupCity} → {req.destinationCity}</div>
                                        {req.notes && <div className="text-xs text-gray-500 italic mt-1 truncate max-w-xs">"{req.notes}"</div>}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {req.date}<br/>{req.time}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                            ${req.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                              req.status === 'ASSIGNED' ? 'bg-blue-100 text-blue-800' :
                                              req.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                            {req.status}
                                        </span>
                                        {assigned && <div className="text-xs text-gray-500 mt-1">Dr: {assigned.name}</div>}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        {req.status === 'PENDING' && (
                                            <button
                                                onClick={() => openAssign(req)}
                                                className={`text-white bg-navy hover:bg-navy-dark px-3 py-1.5 rounded-md shadow-sm transition-all ${demo.isActive && demo.currentStep === 5 && req.id === 'DEMO-R001' ? 'ring-4 ring-yellow-400 animate-pulse' : ''}`}
                                            >
                                                Assign Driver
                                            </button>
                                        )}
                                        {req.status === 'ASSIGNED' && (
                                             <button
                                                onClick={() => completeTrip(req.id)}
                                                className="text-green-700 hover:text-green-900 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-md ml-2"
                                            >
                                                Mark Complete
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            )})}
                        </tbody>
                    </table>
                )}
            </div>

            {/* ASSIGN MODAL */}
            {assignModalOpen && selectedRequest && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col animate-scale-in">
                        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                             <h3 className="text-xl font-bold text-navy">Assign Driver for {selectedRequest.id}</h3>
                             <button onClick={() => setAssignModalOpen(false)} className="text-gray-400 hover:text-gray-800"><X size={24}/></button>
                        </div>
                        <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center">
                            <Search className="text-gray-400 mr-3" />
                            <input type="text" placeholder="Search drivers by name or city..." className="bg-transparent flex-1 outline-none text-sm" />
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {drivers.map(driver => (
                                <div key={driver.id} className={`border rounded-xl p-4 flex flex-col sm:flex-row items-center transition-all hover:border-navy ${demo.isActive && demo.currentStep === 6 && driver.name.includes('Chike') ? 'ring-4 ring-yellow-400 bg-blue-50' : 'bg-white border-gray-200'}`}>
                                    <img src={driver.imageUrl} className="w-16 h-16 rounded-full object-cover mr-4 sm:mb-0 mb-3" alt={driver.name}/>
                                    <div className="flex-1 text-center sm:text-left">
                                        <div className="flex items-center justify-center sm:justify-start">
                                            <h4 className="font-bold text-lg text-navy mr-2">{driver.name}</h4>
                                            <Shield size={14} className="text-green-600 fill-current"/>
                                        </div>
                                        <div className="text-sm text-gray-600 flex items-center justify-center sm:justify-start space-x-3 mt-1">
                                            <span className="flex items-center"><Star size={14} className="text-yellow-400 fill-current mr-1"/> {driver.rating}</span>
                                            <span>{driver.tripsCompleted} trips</span>
                                            <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs font-medium">Available</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleAssign(driver)}
                                        className={`mt-4 sm:mt-0 px-6 py-2 bg-navy text-white font-semibold rounded-lg hover:bg-navy-dark transition-colors ${demo.isActive && demo.currentStep === 6 && driver.name.includes('Chike') ? 'animate-pulse' : ''}`}
                                    >
                                        Assign
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const Reports = () => {
    const data = [
      { name: 'Week 1', trips: 12 },
      { name: 'Week 2', trips: 19 },
      { name: 'Week 3', trips: 15 },
      { name: 'Week 4', trips: 24 },
    ];

    return (
        <div className="p-6 sm:p-8 flex-1 overflow-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Performance Reports</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-gray-500 text-sm font-medium uppercase">Total Trips (30d)</h3>
                    <p className="text-3xl font-bold text-navy mt-2">70</p>
                    <span className="text-green-600 text-sm font-medium">↑ 12% vs last month</span>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                     <h3 className="text-gray-500 text-sm font-medium uppercase">Active Drivers</h3>
                    <p className="text-3xl font-bold text-navy mt-2">3</p>
                </div>
                 <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                     <h3 className="text-gray-500 text-sm font-medium uppercase">Avg. Rating</h3>
                    <p className="text-3xl font-bold text-navy mt-2 flex items-center">4.8 <Star className="ml-2 text-yellow-400 fill-current" size={24}/></p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-80">
                <h3 className="text-lg font-bold text-navy mb-4">Weekly Completed Trips</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip cursor={{fill: '#F3F4F6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                        <Bar dataKey="trips" fill="#0B3D91" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

const DriversList = () => (
    <div className="p-8 flex-1 flex items-center justify-center text-gray-400">
        Driver management not in MVP scope yet.
    </div>
)

export default function AdminDashboard() {
  return (
    <div className="flex flex-col sm:flex-row min-h-[calc(100vh-64px)] bg-gray-100">
      <AdminNav />
      <Routes>
        <Route path="/" element={<RequestsList />} />
        <Route path="/drivers" element={<DriversList />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </div>
  );
}