
import React from 'react';
import { Outlet } from 'react-router-dom';
import KhelaHeader from './KhelaHeader';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <KhelaHeader />
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="bg-secondary/50 border-t border-white/10 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-white/60">© 2025 Khela Onchain Arena. All rights reserved.</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-sm text-white/60 hover:text-primary">Privacy Policy</a>
              <a href="#" className="text-sm text-white/60 hover:text-primary">Terms of Service</a>
              <a href="#" className="text-sm text-white/60 hover:text-primary">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
