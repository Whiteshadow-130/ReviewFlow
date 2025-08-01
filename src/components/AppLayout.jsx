import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, QrCode, Star, User, Settings, LogOut, ChevronDown, Package, Crown } from 'lucide-react';
import { motion } from 'framer-motion';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { usePlan } from '@/hooks/usePlan';

const navLinks = [
  { to: '/dashboard', icon: LayoutDashboard, text: 'Dashboard' },
  { to: '/campaigns', icon: QrCode, text: 'Campaigns' },
  { to: '/products', icon: Package, text: 'Products' },
  { to: '/reviews', icon: Star, text: 'Reviews' },
];

const AppLayout = ({ children }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { plan } = usePlan();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <motion.aside
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="w-64 bg-card border-r flex flex-col"
      >
        <div className="p-4 border-b">
          <div className="text-2xl font-bold text-primary">ReviewFlow</div>
        </div>
        
        <nav className="flex-1 space-y-2 p-4 overflow-y-auto">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/dashboard'}
              className={({ isActive }) =>
                `flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`
              }
            >
              <link.icon className="h-5 w-5 mr-3" />
              {link.text}
            </NavLink>
          ))}
        </nav>
        
        <div className="p-4 border-t mt-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start items-center text-left text-foreground hover:bg-secondary p-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold">
                    {user?.email?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-medium truncate">{user?.user_metadata?.full_name || user?.email}</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none text-foreground">My Account</p>
                  <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => navigate('/profile')} className="focus:bg-secondary">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => navigate('/settings')} className="focus:bg-secondary">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => navigate('/pricing')} className="focus:bg-secondary text-accent">
                <Crown className="mr-2 h-4 w-4" />
                <span>Upgrade Plan</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={handleLogout} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.aside>
      <main className="flex-1 bg-background overflow-y-auto">
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
};

export default AppLayout;