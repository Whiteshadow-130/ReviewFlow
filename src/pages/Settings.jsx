
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CredentialsForm from '@/components/CredentialsForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Mail } from 'lucide-react';

const ContactSupportForm = () => {
  const [formData, setFormData] = useState({ subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // This is a mock submission. In a real app, you'd send this to your support backend/email service.
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setFormData({ subject: '', message: '' });
    toast({
      title: "Message Sent!",
      description: "Our support team will get back to you shortly.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="subject" className="text-foreground">Subject</Label>
        <Input
          id="subject"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          placeholder="e.g., Issue with campaign setup"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message" className="text-foreground">Message</Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Please describe your issue in detail..."
          required
          rows={5}
        />
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Mail className="mr-2 h-4 w-4" />}
        Send Message
      </Button>
    </form>
  );
};

const Settings = () => {
  return (
    <>
      <Helmet>
        <title>Settings - ReviewFlow</title>
      </Helmet>
      <div className="space-y-8 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your integrations and application settings.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Amazon SP-API Credentials</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Securely store your Amazon Selling Partner API credentials here. These are required to verify customer Order IDs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CredentialsForm />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Contact Support</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Need help? Fill out the form below to get in touch with our support team.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContactSupportForm />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Settings;
