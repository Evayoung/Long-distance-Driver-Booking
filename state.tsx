import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Driver, TripRequest, DemoState, DEMO_STEPS } from './types';

interface AppState {
  requests: TripRequest[];
  drivers: Driver[];
  demo: DemoState;
  isAdminView: boolean;
}

interface AppContextType extends AppState {
  addRequest: (req: TripRequest) => void;
  assignDriver: (requestId: string, driverId: string) => void;
  completeTrip: (requestId: string) => void;
  toggleAdminView: () => void;
  startDemo: () => void;
  nextDemoStep: () => void;
  stopDemo: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const MOCK_DRIVERS: Driver[] = [
  {
    id: 'D001',
    name: 'Chike Obi',
    licenseId: 'MX-1234',
    isVerified: true,
    rating: 4.8,
    yearsExperience: 8,
    tripsCompleted: 142,
    imageUrl: 'https://picsum.photos/id/1/200/200'
  },
  {
    id: 'D002',
    name: 'Maria Udo',
    licenseId: 'MX-5678',
    isVerified: true,
    rating: 4.6,
    yearsExperience: 6,
    tripsCompleted: 98,
    imageUrl: 'https://picsum.photos/id/64/200/200'
  },
  {
    id: 'D003',
    name: 'Emmanuel Eze',
    licenseId: 'MX-9012',
    isVerified: true,
    rating: 4.9,
    yearsExperience: 12,
    tripsCompleted: 310,
    imageUrl: 'https://picsum.photos/id/91/200/200'
  }
];

// Pre-populate one completed trip for reports
const INITIAL_REQUESTS: TripRequest[] = [
    {
        id: 'PAST-001',
        customerName: 'Tunde Bakare',
        customerPhone: '08012345678',
        pickupCity: 'Lagos',
        destinationCity: 'Ibadan',
        date: '2023-10-01',
        time: '09:00',
        passengers: 2,
        status: 'COMPLETED',
        assignedDriverId: 'D003',
        createdAt: new Date('2023-09-28'),
        completedMetrics: { distanceKm: 130, durationHours: 2.5 }
    }
];

export const AppProvider = ({ children }: { children?: ReactNode }) => {
  const [requests, setRequests] = useState<TripRequest[]>(INITIAL_REQUESTS);
  const [drivers] = useState<Driver[]>(MOCK_DRIVERS);
  const [isAdminView, setIsAdminView] = useState(false);
  const [demo, setDemo] = useState<DemoState>({ isActive: false, currentStep: 0 });

  const addRequest = useCallback((req: TripRequest) => {
    setRequests(prev => [req, ...prev]);
  }, []);

  const assignDriver = useCallback((requestId: string, driverId: string) => {
    setRequests(prev => prev.map(req =>
      req.id === requestId ? { ...req, status: 'ASSIGNED', assignedDriverId: driverId } : req
    ));
  }, []);

  const completeTrip = useCallback((requestId: string) => {
     setRequests(prev => prev.map(req =>
      req.id === requestId ? { ...req, status: 'COMPLETED', completedMetrics: { distanceKm: 756, durationHours: 9.5 } } : req
    ));
  }, []);

  const toggleAdminView = useCallback(() => setIsAdminView(prev => !prev), []);

  const startDemo = useCallback(() => {
    setDemo({ isActive: true, currentStep: 1 });
    setIsAdminView(false); // Always start demo as customer
  }, []);

  const nextDemoStep = useCallback(() => {
    setDemo(prev => {
        if (prev.currentStep >= DEMO_STEPS.length) {
             return { isActive: false, currentStep: 0 };
        }
        return { ...prev, currentStep: prev.currentStep + 1 };
    });
  }, []);
    const stopDemo = useCallback(() => {
        setDemo({ isActive: false, currentStep: 0 });
    }, []);

  return (
    <AppContext.Provider value={{
      requests, drivers, demo, isAdminView,
      addRequest, assignDriver, completeTrip, toggleAdminView, startDemo, nextDemoStep, stopDemo
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppState must be used within AppProvider");
  return context;
};