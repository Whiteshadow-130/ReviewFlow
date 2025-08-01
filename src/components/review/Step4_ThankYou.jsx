import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const Step4_ThankYou = ({ formData, campaign }) => {
  return (
    <motion.div
      key="step4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="soft-shadow">
        <CardContent className="p-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <CheckCircle className="h-16 w-16 text-success mx-auto mb-6" />
          </motion.div>
          <CardTitle className="text-3xl font-bold mb-4">Thank You!</CardTitle>
          <CardDescription className="mb-6 max-w-md mx-auto">
            Your feedback has been submitted successfully. We appreciate you taking the time!
          </CardDescription>
          {campaign?.promo_message && (
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 text-accent-darker font-medium">
              {campaign.promo_message}
            </div>
          )}
          <div className="space-y-2 text-sm text-muted-foreground mt-6">
            <p>Submitted: {new Date().toLocaleString()}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Step4_ThankYou;