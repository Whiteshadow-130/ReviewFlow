import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, Loader2, Mail } from 'lucide-react';
import { usePlan, plans } from '@/hooks/usePlan';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const AgencyInquiryForm = ({ open, onOpenChange }) => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Mock sending email
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    onOpenChange(false);
    toast({
      title: "Inquiry Sent!",
      description: "Thank you for your interest. Our team will contact you shortly.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agency & White-Label Inquiry</DialogTitle>
          <DialogDescription>
            Please fill out the form below, and one of our specialists will get in touch to discuss your needs.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company Name</Label>
            <Input id="company" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Tell us about your needs</Label>
            <Textarea id="message" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} required />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Mail className="mr-2 h-4 w-4" />}
            Submit Inquiry
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const PricingPage = () => {
  const { user } = useAuth();
  const { plan: currentPlan, isLoading: isLoadingPlan } = usePlan();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showAgencyForm, setShowAgencyForm] = useState(false);

  const updatePlanMutation = useMutation({
    mutationFn: async (newPlanKey) => {
      if (currentPlan.key !== 'free' && newPlanKey === 'free') {
        throw new Error("Downgrading to the Free plan is not permitted.");
      }
      const { error } = await supabase
        .from('profiles')
        .update({ plan: newPlanKey })
        .eq('user_id', user.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Plan updated!", description: "Your plan has been successfully changed." });
      queryClient.invalidateQueries({ queryKey: ['userPlan', user?.id] });
    },
    onError: (error) => {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
    },
  });

  const handleSelectPlan = (planKey) => {
    if (!user) {
      toast({ title: "Authentication required", description: "Please log in to select a plan.", variant: "destructive" });
      return;
    }
    if (planKey === 'agency') {
      setShowAgencyForm(true);
      return;
    }
    updatePlanMutation.mutate(planKey);
  };

  return (
    <>
      <Helmet>
        <title>Pricing - ReviewFlow</title>
        <meta name="description" content="Choose the perfect plan for your Amazon business." />
      </Helmet>
      <div className="container mx-auto max-w-7xl py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground">
            Find the perfect plan for your business
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Start for free, then upgrade as you grow. No hidden fees.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.values(plans).map((plan) => (
            <motion.div
              key={plan.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * Object.keys(plans).indexOf(plan.key) }}
            >
              <Card className={`flex flex-col h-full ${plan.isPopular ? 'border-primary ring-2 ring-primary' : ''}`}>
                <CardHeader className="pb-4">
                  {plan.isPopular && (
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-primary-foreground bg-primary rounded-full uppercase">
                        Popular
                      </span>
                    </div>
                  )}
                  <CardTitle className="text-2xl text-card-foreground">{plan.name}</CardTitle>
                  <div className="flex items-baseline text-foreground">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="ml-1 text-muted-foreground">{plan.period}</span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {plan.feature_list.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-success mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button
                    onClick={() => handleSelectPlan(plan.key)}
                    className="w-full"
                    variant={plan.isPopular ? 'default' : 'outline'}
                    disabled={isLoadingPlan || updatePlanMutation.isPending || currentPlan.key === plan.key}
                  >
                    {currentPlan.key === plan.key ? 'Current Plan' : plan.cta}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      <AgencyInquiryForm open={showAgencyForm} onOpenChange={setShowAgencyForm} />
    </>
  );
};

export default PricingPage;