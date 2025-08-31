import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggleCollapse, className = '' }) => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      name: 'Dashboard',
      icon: 'LayoutDashboard',
      path: '/homepage',
      badge: null
    },
    {
      name: 'Organization',
      icon: 'Building2',
      path: '/organization-profile',
      badge: null
    },
    {
      name: 'Secretariat',
      icon: 'FileText',
      path: '/secretariat-dashboard',
      badge: '3'
    },
    {
      name: 'Members',
      icon: 'Users',
      path: null,
      submenu: [
        { name: 'Member Suite', path: '/member-management-suite', icon: 'UserCheck' },
        { name: 'Member Directory', path: '/member-directory', icon: 'BookOpen' },
        { name: 'Member Analytics', path: '/member-analytics', icon: 'BarChart3' }
      ]
    },
    {
      name: 'Reports',
      icon: 'PieChart',
      path: null,
      submenu: [
        { name: 'Transparency Reports', path: '/transparency-reports', icon: 'Eye' },
        { name: 'Financial Reports', path: '/financial-reports', icon: 'DollarSign' },
        { name: 'Activity Reports', path: '/activity-reports', icon: 'Activity' }
      ]
    },
    {
      name: 'Administration',
      icon: 'Settings',
      path: '/admin-dashboard',
      badge: null
    }
  ];

  const bottomItems = [
    { name: 'Help Center', icon: 'HelpCircle', path: '/help' },
    { name: 'Settings', icon: 'Cog', path: '/settings' }
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNavigation = (path) => {
    if (path) {
      navigate(path);
    }
  };

  const toggleSubmenu = (index) => {
    if (isCollapsed) return;
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const isActiveSubmenu = (submenu) => {
    return submenu?.some(item => location?.pathname === item?.path);
  };

  const Logo = () => (
    <div className={`flex items-center transition-all duration-300 ${
      isCollapsed ? 'justify-center' : 'space-x-3'
    }`}>
      <div className="w-8 h-8 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon name="Workflow" size={18} color="white" strokeWidth={2.5} />
      </div>
      {!isCollapsed && (
        <div className="flex flex-col min-w-0">
          <span className="text-lg font-bold text-brand-primary tracking-tight truncate">
            OrganiFlow
          </span>
          <span className="text-xs text-muted-foreground font-medium -mt-1 truncate">
            Management
          </span>
        </div>
      )}
    </div>
  );

  return (
    <aside 
      className={`fixed left-0 top-0 h-full bg-card border-r border-border z-40 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      } ${className}`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className={`flex items-center justify-between p-4 border-b border-border ${
          isCollapsed ? 'px-2' : ''
        }`}>
          <div 
            className="cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => handleNavigation('/homepage')}
          >
            <Logo />
          </div>
          
          {!isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              className={`flex-shrink-0 ${isCollapsed ? 'hidden' : ''}`}
              iconName={isCollapsed ? "ChevronRight" : "ChevronLeft"}
            />
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="space-y-1 px-2">
            {navigationItems?.map((item, index) => (
              <div key={index}>
                {/* Main Item */}
                <button
                  onClick={() => {
                    if (item?.submenu) {
                      toggleSubmenu(index);
                    } else {
                      handleNavigation(item?.path);
                    }
                  }}
                  className={`flex items-center w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                    isActivePath(item?.path) || isActiveSubmenu(item?.submenu)
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-card-foreground hover:bg-muted hover:text-foreground'
                  } ${isCollapsed ? 'justify-center' : 'justify-between'}`}
                  title={isCollapsed ? item?.name : ''}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <Icon 
                      name={item?.icon} 
                      size={18} 
                      className="flex-shrink-0"
                    />
                    {!isCollapsed && (
                      <span className="truncate">{item?.name}</span>
                    )}
                  </div>
                  
                  {!isCollapsed && (
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      {item?.badge && (
                        <span className="bg-brand-accent text-white text-xs px-2 py-0.5 rounded-full font-medium">
                          {item?.badge}
                        </span>
                      )}
                      {item?.submenu && (
                        <Icon 
                          name="ChevronDown" 
                          size={16} 
                          className={`transition-transform duration-200 ${
                            activeSubmenu === index ? 'rotate-180' : ''
                          }`}
                        />
                      )}
                    </div>
                  )}
                </button>

                {/* Submenu */}
                {item?.submenu && !isCollapsed && (
                  <div className={`mt-1 space-y-1 overflow-hidden transition-all duration-200 ${
                    activeSubmenu === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    {item?.submenu?.map((subItem, subIndex) => (
                      <button
                        key={subIndex}
                        onClick={() => handleNavigation(subItem?.path)}
                        className={`flex items-center w-full px-3 py-2 ml-6 rounded-lg text-sm transition-colors ${
                          isActivePath(subItem?.path)
                            ? 'bg-primary/10 text-primary font-medium' :'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                      >
                        <Icon name={subItem?.icon} size={16} className="mr-3 flex-shrink-0" />
                        <span className="truncate">{subItem?.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Bottom Items */}
        <div className="border-t border-border p-2 space-y-1">
          {bottomItems?.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(item?.path)}
              className={`flex items-center w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-card-foreground hover:bg-muted hover:text-foreground'
              } ${isCollapsed ? 'justify-center' : ''}`}
              title={isCollapsed ? item?.name : ''}
            >
              <Icon name={item?.icon} size={18} className="flex-shrink-0" />
              {!isCollapsed && (
                <span className="ml-3 truncate">{item?.name}</span>
              )}
            </button>
          ))}
        </div>

        {/* User Profile */}
        <div className="border-t border-border p-2">
          <button 
            className={`flex items-center w-full px-3 py-3 rounded-lg text-sm font-medium text-card-foreground hover:bg-muted transition-colors ${
              isCollapsed ? 'justify-center' : ''
            }`}
            title={isCollapsed ? 'User Profile' : ''}
          >
            <div className="w-8 h-8 bg-brand-secondary rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="User" size={16} color="white" />
            </div>
            {!isCollapsed && (
              <div className="ml-3 text-left min-w-0">
                <div className="font-medium text-foreground truncate">Admin User</div>
                <div className="text-xs text-muted-foreground truncate">admin@organiflow.id</div>
              </div>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;