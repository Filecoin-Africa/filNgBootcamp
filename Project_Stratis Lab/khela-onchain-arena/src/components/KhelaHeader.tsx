
import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Link } from 'react-router-dom';
import { Trophy, BarChart3, PenSquare, Home } from 'lucide-react';

const KhelaHeader: React.FC = () => {
  return (
    <header className="border-b border-white/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Trophy className="w-8 h-8 text-primary" />
            <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60">
              KHELA
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" icon={<Home className="w-4 h-4" />} label="Home" />
            <NavLink to="/live-scores" icon={<BarChart3 className="w-4 h-4" />} label="Live Scores" />
            <NavLink to="/publish" icon={<PenSquare className="w-4 h-4" />} label="Become a Publisher" />
          </nav>
          
          <div className="flex items-center">
            <ConnectButton 
              chainStatus="icon" 
              showBalance={false}
              accountStatus="address"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
  icon: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label, icon }) => {
  return (
    <Link 
      to={to} 
      className="flex items-center gap-1.5 text-white/70 hover:text-primary transition-colors"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export default KhelaHeader;
