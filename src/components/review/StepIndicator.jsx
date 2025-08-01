import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const StepIndicator = ({ currentStep, campaignName }) => {
  const steps = [1, 2, 3];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="flex items-center justify-between mb-4 max-w-sm mx-auto">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 border-2 ${
              currentStep >= step 
                ? 'bg-primary border-primary text-primary-foreground' 
                : 'bg-card border-border text-foreground'
            }`}>
              {currentStep > step ? <Check className="h-5 w-5" /> : step}
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-2 bg-border relative">
                 <motion.div 
                    className="absolute top-0 left-0 h-full bg-primary"
                    initial={{ width: "0%" }}
                    animate={{ width: currentStep > step ? "100%" : "0%" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                 />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground">{campaignName}</h1>
        <p className="text-muted-foreground mt-1">Help us improve by sharing your experience.</p>
      </div>
    </motion.div>
  );
};

export default StepIndicator;