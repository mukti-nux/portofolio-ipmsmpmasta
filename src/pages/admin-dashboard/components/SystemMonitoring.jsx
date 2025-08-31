import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SystemMonitoring = () => {
  const [refreshing, setRefreshing] = useState(false);

  const systemMetrics = {
    serverStatus: 'online',
    uptime: '99.9%',
    responseTime: '145ms',
    activeUsers: 23,
    diskUsage: 67,
    memoryUsage: 45,
    cpuUsage: 32
  };

  const securityStatus = {
    lastScan: '2 jam yang lalu',
    threatsDetected: 0,
    firewallStatus: 'active',
    sslStatus: 'valid',
    backupStatus: 'completed'
  };

  const recentActivities = [
    {
      id: 1,
      type: 'backup',
      message: 'Backup otomatis berhasil diselesaikan',
      timestamp: '30 menit yang lalu',
      status: 'success',
      icon: 'Database'
    },
    {
      id: 2,
      type: 'security',
      message: 'Pemindaian keamanan selesai - tidak ada ancaman',
      timestamp: '2 jam yang lalu',
      status: 'success',
      icon: 'Shield'
    },
    {
      id: 3,
      type: 'update',
      message: 'Pembaruan sistem berhasil diinstal',
      timestamp: '1 hari yang lalu',
      status: 'success',
      icon: 'Download'
    },
    {
      id: 4,
      type: 'warning',
      message: 'Penggunaan disk mencapai 70%',
      timestamp: '2 hari yang lalu',
      status: 'warning',
      icon: 'AlertTriangle'
    }
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const getStatusColor = (status) => {
    const colors = {
      online: 'text-green-600 bg-green-50',
      offline: 'text-red-600 bg-red-50',
      warning: 'text-yellow-600 bg-yellow-50'
    };
    return colors?.[status] || colors?.online;
  };

  const getUsageColor = (percentage) => {
    if (percentage >= 80) return 'bg-red-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getActivityStatusColor = (status) => {
    const colors = {
      success: 'text-green-600',
      warning: 'text-yellow-600',
      error: 'text-red-600'
    };
    return colors?.[status] || colors?.success;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Monitoring Sistem</h3>
        <Button 
          variant="outline" 
          size="sm" 
          iconName="RefreshCw" 
          loading={refreshing}
          onClick={handleRefresh}
        >
          Refresh
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Status */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Status Sistem</h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${systemMetrics?.serverStatus === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm font-medium text-gray-900">Server Status</span>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(systemMetrics?.serverStatus)}`}>
                {systemMetrics?.serverStatus === 'online' ? 'Online' : 'Offline'}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-900">Uptime</span>
              <span className="text-sm font-bold text-green-600">{systemMetrics?.uptime}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-900">Response Time</span>
              <span className="text-sm font-bold text-blue-600">{systemMetrics?.responseTime}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-900">Active Users</span>
              <span className="text-sm font-bold text-purple-600">{systemMetrics?.activeUsers}</span>
            </div>
          </div>
        </div>

        {/* Resource Usage */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Penggunaan Resource</h4>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">Disk Usage</span>
                <span className="text-sm font-bold text-gray-600">{systemMetrics?.diskUsage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${getUsageColor(systemMetrics?.diskUsage)}`}
                  style={{ width: `${systemMetrics?.diskUsage}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">Memory Usage</span>
                <span className="text-sm font-bold text-gray-600">{systemMetrics?.memoryUsage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${getUsageColor(systemMetrics?.memoryUsage)}`}
                  style={{ width: `${systemMetrics?.memoryUsage}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">CPU Usage</span>
                <span className="text-sm font-bold text-gray-600">{systemMetrics?.cpuUsage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${getUsageColor(systemMetrics?.cpuUsage)}`}
                  style={{ width: `${systemMetrics?.cpuUsage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Security Status */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-medium text-gray-900 mb-4">Status Keamanan</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
            <Icon name="Shield" size={20} className="text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-900">Firewall</p>
              <p className="text-xs text-green-700">Aktif</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
            <Icon name="Lock" size={20} className="text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-900">SSL Certificate</p>
              <p className="text-xs text-green-700">Valid</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <Icon name="Database" size={20} className="text-blue-600" />
            <div>
              <p className="text-sm font-medium text-blue-900">Last Backup</p>
              <p className="text-xs text-blue-700">Berhasil</p>
            </div>
          </div>
        </div>
      </div>
      {/* Recent Activities */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-medium text-gray-900 mb-4">Aktivitas Terbaru</h4>
        
        <div className="space-y-3">
          {recentActivities?.map(activity => (
            <div key={activity?.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <Icon 
                name={activity?.icon} 
                size={16} 
                className={`mt-0.5 ${getActivityStatusColor(activity?.status)}`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{activity?.message}</p>
                <p className="text-xs text-gray-500">{activity?.timestamp}</p>
              </div>
              <div className={`w-2 h-2 rounded-full ${
                activity?.status === 'success' ? 'bg-green-500' : 
                activity?.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
              }`}></div>
            </div>
          ))}
        </div>
      </div>
      {/* Quick Actions */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" iconName="Download">
            Download Logs
          </Button>
          <Button variant="outline" size="sm" iconName="Database">
            Manual Backup
          </Button>
          <Button variant="outline" size="sm" iconName="Shield">
            Security Scan
          </Button>
          <Button variant="outline" size="sm" iconName="Settings">
            System Config
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SystemMonitoring;