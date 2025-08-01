import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';

export const plans = {
  free: {
    key: 'free',
    name: 'Free',
    price: '₹0',
    period: '/mo',
    description: 'Ideal for new sellers testing the platform.',
    features: {
      campaigns: 1,
      products: 1,
      reviews: 10,
      screenshot_verification: false,
      white_label: false,
    },
    feature_list: [
      '1 active campaign',
      '1 product',
      '10 reviews total',
      'Amazon SP-API connection (optional)',
    ],
    cta: 'Current Plan',
  },
  starter: {
    key: 'starter',
    name: 'Starter',
    price: '₹299',
    period: '/mo',
    description: 'For growing sellers who need more power.',
    features: {
      campaigns: 1,
      products: 5,
      reviews: 100,
      screenshot_verification: false,
      white_label: false,
    },
    feature_list: [
      '1 active campaign',
      '5 products',
      '100 reviews/month',
      'Amazon SP-API connection (optional)',
      'Email support',
    ],
    cta: 'Upgrade to Starter',
  },
  business: {
    key: 'business',
    name: 'Business',
    price: '₹499',
    period: '/mo',
    description: 'For serious sellers and D2C brands.',
    features: {
      campaigns: 20,
      products: 100,
      reviews: 1000,
      screenshot_verification: true,
      white_label: false,
    },
    feature_list: [
      '20 active campaigns',
      '100 products',
      '1000 reviews/month',
      'Screenshot verification system',
      'Priority email support',
    ],
    cta: 'Upgrade to Business',
    isPopular: true,
  },
  agency: {
    key: 'agency',
    name: 'Agency',
    price: '₹1,999+',
    period: '/mo',
    description: 'For agencies managing multiple brands.',
    features: {
      campaigns: Infinity,
      products: Infinity,
      reviews: Infinity,
      screenshot_verification: true,
      white_label: true,
    },
    feature_list: [
      'Unlimited campaigns & products',
      'Unlimited reviews',
      'White-label branding option',
      'Dedicated account manager',
    ],
    cta: 'Contact Sales',
  },
};

const fetchUserPlan = async (userId) => {
  if (!userId) return plans.free;

  const { data, error } = await supabase
    .from('profiles')
    .select('plan')
    .eq('user_id', userId)
    .single();

  if (error || !data) {
    console.error('Error fetching user plan:', error);
    return plans.free;
  }

  return plans[data.plan] || plans.free;
};

export const usePlan = () => {
  const { user } = useAuth();
  
  const { data: plan, isLoading } = useQuery({
    queryKey: ['userPlan', user?.id],
    queryFn: () => fetchUserPlan(user?.id),
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
  });

  return { plan: plan || plans.free, isLoading };
};