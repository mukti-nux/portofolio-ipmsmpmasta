import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import KPICard from './components/KPICard';
import ActivityChart from './components/ActivityChart';
import NotificationCenter from './components/NotificationCenter';
import QuickActionPanel from './components/QuickActionPanel';
import ChatbotManagement from './components/ChatbotManagement';
import SystemMonitoring from './components/SystemMonitoring';
import CustomizableWidget from './components/CustomizableWidget';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeView, setActiveView] = useState('overview');

  // Mock data for KPI cards
  const kpiData = [
    {
      title: 'Total Anggota',
      value: '1,247',
      change: '+12%',
      changeType: 'increase',
      icon: 'Users',
      color: 'blue'
    },
    {
      title: 'Dokumen Aktif',
      value: '89',
      change: '+5%',
      changeType: 'increase',
      icon: 'FileText',
      color: 'green'
    },
    {
      title: 'Engagement Rate',
      value: '94.2%',
      change: '+2.1%',
      changeType: 'increase',
      icon: 'TrendingUp',
      color: 'purple'
    },
    {
      title: 'System Uptime',
      value: '99.9%',
      change: 'Stabil',
      changeType: 'stable',
      icon: 'Server',
      color: 'orange'
    }
  ];

  // Mock data for charts
  const memberActivityData = [
    { name: 'Jan', value: 120 },
    { name: 'Feb', value: 145 },
    { name: 'Mar', value: 167 },
    { name: 'Apr', value: 189 },
    { name: 'Mei', value: 201 },
    { name: 'Jun', value: 234 },
    { name: 'Jul', value: 267 },
    { name: 'Agu', value: 289 }
  ];

  const documentFlowData = [
    { name: 'Menunggu', value: 23 },
    { name: 'Review', value: 45 },
    { name: 'Disetujui', value: 67 },
    { name: 'Ditolak', value: 12 },
    { name: 'Arsip', value: 156 }
  ];

  const systemPerformanceData = [
    { name: '00:00', value: 45 },
    { name: '04:00', value: 32 },
    { name: '08:00', value: 78 },
    { name: '12:00', value: 89 },
    { name: '16:00', value: 95 },
    { name: '20:00', value: 67 },
    { name: '24:00', value: 54 }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date?.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const navigationTabs = [
    { id: 'overview', label: 'Ringkasan', icon: 'LayoutDashboard' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
    { id: 'management', label: 'Manajemen', icon: 'Settings' },
    { id: 'monitoring', label: 'Monitoring', icon: 'Monitor' }
  ];

  const renderOverviewContent = () => (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData?.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityChart
          type="line"
          data={memberActivityData}
          title="Aktivitas Anggota Bulanan"
          color="#1E40AF"
        />
        <ActivityChart
          type="bar"
          data={documentFlowData}
          title="Status Dokumen"
          color="#059669"
        />
      </div>

      {/* Notification Center and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NotificationCenter />
        <QuickActionPanel />
      </div>
    </div>
  );

  const renderAnalyticsContent = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityChart
            type="line"
            data={systemPerformanceData}
            title="Performa Sistem 24 Jam"
            color="#DC2626"
          />
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Insight Cepat</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Icon name="TrendingUp" size={20} className="text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Pertumbuhan Anggota</p>
                <p className="text-sm text-gray-600">+15% dari bulan lalu</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="Clock" size={20} className="text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">Waktu Respons</p>
                <p className="text-sm text-gray-600">Rata-rata 2.3 detik</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="Star" size={20} className="text-yellow-600" />
              <div>
                <p className="font-medium text-gray-900">Kepuasan Pengguna</p>
                <p className="text-sm text-gray-600">4.8/5.0 rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <ChatbotManagement />
    </div>
  );

  const renderManagementContent = () => (
    <div className="space-y-8">
      <QuickActionPanel />
      <CustomizableWidget />
    </div>
  );

  const renderMonitoringContent = () => (
    <div className="space-y-8">
      <SystemMonitoring />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityChart
          type="line"
          data={systemPerformanceData}
          title="CPU Usage"
          color="#8B5CF6"
        />
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Server Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">Database</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600">Online</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">API Server</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600">Online</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">File Storage</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-yellow-600">Warning</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">CDN</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeView) {
      case 'overview':
        return renderOverviewContent();
      case 'analytics':
        return renderAnalyticsContent();
      case 'management':
        return renderManagementContent();
      case 'monitoring':
        return renderMonitoringContent();
      default:
        return renderOverviewContent();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">
                {formatDate(currentTime)} • {formatTime(currentTime)}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                <Icon name="Activity" size={16} className="text-green-500" />
                <span>Sistem Normal</span>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                iconName="Bell"
                onClick={() => navigate('/notifications')}
              >
                <span className="hidden sm:inline">Notifikasi</span>
              </Button>
              
              <Button
                variant="default"
                size="sm"
                iconName="User"
                onClick={() => navigate('/profile')}
              >
                <span className="hidden sm:inline">Profile</span>
              </Button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 mt-6">
            {navigationTabs?.map(tab => (
              <button
                key={tab?.id}
                onClick={() => setActiveView(tab?.id)}
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeView === tab?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span className="hidden sm:inline">{tab?.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="px-6 py-8">
        {renderContent()}
      </div>
      {/* Quick Navigation Footer */}
      <div className="fixed bottom-6 right-6 z-20">
        <div className="bg-white rounded-full shadow-brand-lg border border-gray-200 p-2">
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="Home"
              onClick={() => navigate('/homepage')}
              className="rounded-full w-10 h-10 p-0"
              title="Homepage"
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="Users"
              onClick={() => navigate('/member-management-suite')}
              className="rounded-full w-10 h-10 p-0"
              title="Member Management"
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="FileText"
              onClick={() => navigate('/secretariat-dashboard')}
              className="rounded-full w-10 h-10 p-0"
              title="Secretariat"
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="BarChart3"
              onClick={() => navigate('/transparency-reports')}
              className="rounded-full w-10 h-10 p-0"
              title="Reports"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;