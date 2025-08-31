import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ className = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { name: 'Home', path: '/homepage', icon: 'Home' },
    { name: 'Organization', path: '/organization-profile', icon: 'Building2' },
    { name: 'Secretariat', path: '/secretariat-dashboard', icon: 'LayoutDashboard' },
    { name: 'Members', path: '/member-management-suite', icon: 'Users' },
    { name: 'Reports', path: '/transparency-reports', icon: 'FileText' }
  ];

  const moreItems = [
    { name: 'Admin Dashboard', path: '/admin-dashboard', icon: 'Settings' },
    { name: 'Help Center', path: '/help', icon: 'HelpCircle' },
    { name: 'Settings', path: '/settings', icon: 'Cog' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const Logo = () => (
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center">
        <img
          src="/favicon.ico"
          alt="logoUtama"
          className="w-7 h-7 object-contain"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold text-brand-primary tracking-tight">
          PR IPM SMP MUHAMMADIYAH TEMPURAN
        </span>
        <span className="text-xs text-muted-foreground font-medium -mt-1">
          Morals in Motion, Kindness in Action
        </span>
      </div>
    </div>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-brand'
        : 'bg-background/80 backdrop-blur-sm'
        } ${className}`}
    >
      <div className="container-brand">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => handleNavigation('/homepage')}
          >
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-foreground hover:bg-muted hover:text-foreground'
                  }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.name}</span>
              </button>
            ))}

            {/* More Menu */}
            <div className="relative group">
              <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-muted hover:text-foreground transition-all duration-200">
                <Icon name="MoreHorizontal" size={18} />
                <span>More</span>
              </button>

              {/* Dropdown */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-brand-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {moreItems?.map((item) => (
                    <button
                      key={item?.path}
                      onClick={() => handleNavigation(item?.path)}
                      className={`flex items-center space-x-3 w-full px-4 py-2 text-sm text-left transition-colors ${isActivePath(item?.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-popover-foreground hover:bg-muted'
                        }`}
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* User Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button variant="ghost" size="sm" iconName="Bell" iconPosition="left">
              Notifications
            </Button>
            <Button variant="outline" size="sm" iconName="User" iconPosition="left">
              Profile
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-foreground hover:bg-muted transition-colors"
            aria-label="Toggle mobile menu"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-md">
            <nav className="py-4 space-y-1">
              {[...navigationItems, ...moreItems]?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`flex items-center space-x-3 w-full px-4 py-3 text-left rounded-lg transition-colors ${isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                    }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span className="font-medium">{item?.name}</span>
                </button>
              ))}

              {/* Mobile User Actions */}
              <div className="pt-4 mt-4 border-t border-border space-y-1">
                <button className="flex items-center space-x-3 w-full px-4 py-3 text-left text-foreground hover:bg-muted rounded-lg transition-colors">
                  <Icon name="Bell" size={20} />
                  <span className="font-medium">Notifications</span>
                </button>
                <button className="flex items-center space-x-3 w-full px-4 py-3 text-left text-foreground hover:bg-muted rounded-lg transition-colors">
                  <Icon name="User" size={20} />
                  <span className="font-medium">Profile</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;