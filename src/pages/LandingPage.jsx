import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart, Gift, QrCode, Mail, Users, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { plans } from '@/hooks/usePlan';

const LandingPage = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: <Gift className="w-8 h-8 mb-4 text-accent" />,
            title: 'Get More Reviews Fast',
            description: 'Supercharge your product insert cards to turn happy customers into 5-star reviews.'
        },
        {
            icon: <Mail className="w-8 h-8 mb-4 text-accent" />,
            title: 'Build an Email List',
            description: 'Effortlessly collect customer emails for marketing and future product launches.'
        },
        {
            icon: <BarChart className="w-8 h-8 mb-4 text-accent" />,
            title: 'Boost Product Sales',
            description: 'Use positive reviews and a growing email list to drive more sales and climb the ranks.'
        }
    ];

    const steps = [
        {
            img: "https://images.unsplash.com/photo-1588694853745-741984a93549?q=80&w=800",
            title: "Step 1: Create Your Campaign",
            description: "Design a high-conversion campaign strategy. Offer a digital QR code, coupon, or gift to incentivize reviews. Customize everything to match your brand."
        },
        {
            img: "https://images.unsplash.com/photo-1620912189837-145c753b85d8?q=80&w=800",
            title: "Step 2: Add Your Unique QR Code",
            description: "Supercharge your product inserts or packaging with a unique QR code. It's a frictionless way for customers to engage with you post-purchase."
        },
        {
            img: "https://images.unsplash.com/photo-1579373369426-144d82a17951?q=80&w=800",
            title: "Step 3: Customers Scan Your QR Code",
            description: "Your customers scan the code to enter a simple, mobile-friendly review funnel. Connect with your most loyal fans and offer them your thank-you gift."
        },
        {
            img: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=800",
            title: "Step 4: Collect Feedback & Reviews",
            description: "Direct satisfied customers to your Amazon product page to leave a review. Capture valuable feedback from everyone else to improve your products."
        },
        {
            img: "https://images.unsplash.com/photo-1596526131034-0881144a82b8?q=80&w=800",
            title: "Step 5: Deliver Your Promotion",
            description: "Your customer is automatically sent their digital promotion. You can manage and fulfill physical gift promises easily from your dashboard."
        },
    ];

    const stats = [
        { icon: <CheckCircle className="w-8 h-8 text-accent" />, value: '20,482+', label: 'Reviews Generated' },
        { icon: <Users className="w-8 h-8 text-accent" />, value: '28,309+', label: 'Leads Collected' },
        { icon: <QrCode className="w-8 h-8 text-accent" />, value: '458+', label: 'Campaigns Created' },
    ];

    return (
        <>
        <Helmet>
            <title>ReviewFlow | Get More Amazon Reviews, Fast.</title>
            <meta name="description" content="Turn happy customers into 5-star reviews with supercharged product insert cards. Build your email list and boost product sales with ReviewFlow." />
        </Helmet>
        <div className="bg-background text-foreground">
            <header className="sticky top-0 left-0 w-full z-20 py-4 px-4 sm:px-6 lg:px-8 bg-background/80 backdrop-blur-sm border-b">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-xl font-bold text-primary flex items-center">
                        <BarChart className="h-6 w-6 mr-2"/>
                        ReviewFlow
                    </div>
                    <nav className="hidden md:flex items-center space-x-6">
                        <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary">Features</a>
                        <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-primary">How It Works</a>
                        <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-primary">Pricing</a>
                    </nav>
                    <div>
                        <Button variant="ghost" onClick={() => navigate('/login')}>Log In</Button>
                        <Button variant="accent" className="ml-2" onClick={() => navigate('/login')}>Sign Up</Button>
                    </div>
                </div>
            </header>

            <main>
                <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-28 bg-gradient-to-b from-primary/5 to-background">
                    <div className="container mx-auto text-center px-4">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight">
                                1. Get More Reviews <span className="text-accent">Fast</span>
                            </h1>
                            <h2 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight mt-2">
                                2. Build an Email List
                            </h2>
                            <h3 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight mt-2">
                                3. Boost Product Sales
                            </h3>
                        </motion.div>
                        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
                            ... with supercharged Product Insert Cards.
                        </motion.p>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="mt-8">
                            <Button size="lg" variant="accent" onClick={() => navigate('/login')}>
                                Get started today for free!
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </motion.div>
                    </div>
                    <div className="absolute -bottom-1 left-0 w-full h-20 bg-gradient-to-t from-background to-transparent" />
                </section>

                <section id="features" className="py-20">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">Everything you need to grow your brand on Amazon</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <motion.div 
                                    key={index}
                                    className="text-center p-8 border rounded-lg bg-card soft-shadow"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    {feature.icon}
                                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                    <p className="text-muted-foreground">{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="how-it-works" className="py-20 bg-primary/5">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <p className="text-accent font-semibold">Need More Product Reviews?</p>
                            <h2 className="text-3xl md:text-4xl font-bold mt-2">Get More Reviews By Supercharging Your Product Inserts...</h2>
                            <p className="text-muted-foreground mt-2">In 5 Easy Steps</p>
                        </div>
                        <div className="space-y-16">
                            {steps.map((step, index) => (
                                <motion.div 
                                    key={index} 
                                    className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7 }}
                                >
                                    <div className="md:w-1/2">
                                        <img 
                                            className="rounded-lg soft-shadow w-full h-64 object-cover"
                                            alt={step.title}
                                         src="https://images.unsplash.com/photo-1687210883777-d18748e4f5d4" />
                                    </div>
                                    <div className="md:w-1/2">
                                        <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                                        <p className="text-muted-foreground">{step.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
                
                <section id="pricing" className="py-20">
                    <div className="container mx-auto max-w-7xl px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                                Find the perfect plan for your business
                            </h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                Start for free, then upgrade as you grow. No hidden fees.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {Object.values(plans).map((plan) => (
                                <motion.div
                                key={plan.key}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 * Object.keys(plans).indexOf(plan.key) }}
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
                                        onClick={() => navigate('/login')}
                                        className="w-full"
                                        variant={plan.isPopular ? 'default' : 'outline'}
                                    >
                                        {plan.cta}
                                    </Button>
                                    </div>
                                </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="stats" className="py-20 bg-primary/5">
                    <div className="container mx-auto px-4">
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {stats.map((stat, index) => (
                                <motion.div 
                                    key={index}
                                    className="text-center p-8 border rounded-lg bg-card soft-shadow"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <div className="flex justify-center items-center mb-4">{stat.icon}</div>
                                    <p className="text-3xl font-bold">{stat.value}</p>
                                    <p className="text-muted-foreground">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-card border-t py-8">
                <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} ReviewFlow. All rights reserved.</p>
                    <div className="mt-4 space-x-4">
                        <a href="#" className="hover:text-primary">Terms of Service</a>
                        <span>&middot;</span>
                        <a href="#" className="hover:text-primary">Privacy Policy</a>
                    </div>
                </div>
            </footer>
        </div>
        </>
    );
};

export default LandingPage;