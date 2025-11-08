export type TripStatus = 'PENDING' | 'ASSIGNED' | 'COMPLETED' | 'CANCELLED';

export interface Driver {
  id: string;
  name: string;
  licenseId: string;
  isVerified: boolean;
  rating: number;
  yearsExperience: number;
  tripsCompleted: number;
  imageUrl: string;
}

export interface TripRequest {
  id: string;
  customerName: string;
  customerPhone: string;
  pickupCity: string;
  destinationCity: string;
  date: string;
  time: string;
  passengers: number;
  notes?: string;
  status: TripStatus;
  assignedDriverId?: string;
  createdAt: Date;
  completedMetrics?: {
    distanceKm: number;
    durationHours: number;
  }
}

export interface DemoState {
  isActive: boolean;
  currentStep: number;
}

export const DEMO_STEPS = [
  { step: 1, text: "Start as a customer: Click 'Book a Trip' on the landing page." },
  { step: 2, text: "Fill out the booking form. Use 'Prefill Demo Data' for speed." },
  { step: 3, text: "Submit the booking request." },
  { step: 4, text: "Review the confirmation page. Notice the 'Pending' status. Now, switch to the Admin view (top right)." },
  { step: 5, text: "As Admin, find the new request DEMO-R001 and click 'Assign Driver'." },
  { step: 6, text: "Select 'Chike Obi' from the list of verified drivers." },
  { step: 7, text: "The request is now Assigned. Switch back to the Customer view to see the live update." },
  { step: 8, text: "End of core flow. You can now explore reports or complete the trip." }
];