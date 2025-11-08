import React from 'react';
import { useAppState } from '../state';
import { DEMO_STEPS } from '../types';

export default function DemoGuide() {
  const { demo, nextDemoStep } = useAppState();

  if (!demo.isActive || demo.currentStep === 0) return null;

  const currentInstruction = DEMO_STEPS.find(s => s.step === demo.currentStep);

  if (!currentInstruction) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-navy text-white p-4 z-50 shadow-lg border-t-4 border-yellow-400 flex flex-col sm:flex-row items-center justify-between animate-slide-up">
      <div className="flex items-start mb-3 sm:mb-0">
        <div className="bg-yellow-400 text-navy font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
          {demo.currentStep}
        </div>
        <p className="text-sm sm:text-base font-medium pt-1">
          {currentInstruction.text}
        </p>
      </div>
      <div className="flex space-x-3">
          <span className="text-xs text-blue-200 self-center mr-2 hidden sm:block">
              Step {demo.currentStep} of {DEMO_STEPS.length}
          </span>
          {/* Auto-advance happens via clicks in the app, but provide manual override */}
         <button
            onClick={nextDemoStep}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded text-sm transition-colors whitespace-nowrap"
         >
           Skip Step →
         </button>
      </div>
    </div>
  );
}