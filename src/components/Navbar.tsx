
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { Button } from './ui/button';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  return (
    <nav className="bg-card shadow-sm border-b border-border sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2 md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="bg-primary/90 text-primary-foreground p-1 rounded flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon>
                <path d="M7.5 12.5l4 4"></path>
              </svg>
            </div>
            <Link to="/" className="font-bold text-xl">Prompt<span className="text-primary">2</span>Query</Link>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-1">
          <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground">
            Home
          </Link>
          <Link to="/docs" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground">
            Docs
          </Link>
          <Link to="/about" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground">
            About
          </Link>
          <div className="ml-3">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="md:hidden">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
