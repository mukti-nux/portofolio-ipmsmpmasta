import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCenter = () => {
  const [activeTab, setActiveTab] = useState('all');

  const notifications = [
    {
      id: 1,
      type: 'approval',
      priority: 'high',
      title: 'Persetujuan Dokumen Menunggu',
      message: '3 dokumen memerlukan persetujuan dari Anda',
      time: '5 menit yang lalu',
      unread: true,
      icon: 'FileCheck',
      color: 'orange'
    },
    {
      id: 2,
      type: 'member',
      priority: 'medium',
      title: 'Anggota Baru Terdaftar',
      message: 'Ahmad Rizki telah mendaftar sebagai anggota baru',
      time: '15 menit yang lalu',
      unread: true,
      icon: 'UserPlus',
      color: 'green'
    },
    {
      id: 3,
      type: 'system',
      priority: 'low',
      title: 'Backup Sistem Berhasil',
      message: 'Backup otomatis telah selesai dilakukan',
      time: '1 jam yang lalu',
      unread: false,
      icon: 'Shield',
      color: 'blue'
    },
    {
      id: 4,
      type: 'alert',
      priority: 'high',
      title: 'Peringatan Keamanan',
      message: 'Terdeteksi login mencurigakan dari IP tidak dikenal',
      time: '2 jam yang lalu',
      unread: true,
      icon: 'AlertTriangle',
      color: 'red'
    },
    {
      id: 5,
      type: 'update',
      priority: 'medium',
      title: 'Pembaruan Profil Organisasi',
      message: 'Profil organisasi telah diperbarui oleh sekretaris',
      time: '3 jam yang lalu',
      unread: false,
      icon: 'Edit',
      color: 'purple'
    }
  ];

  const tabs = [
    { id: 'all', label: 'Semua', count: notifications?.length },
    { id: 'unread', label: 'Belum Dibaca', count: notifications?.filter(n => n?.unread)?.length },
    { id: 'high', label: 'Prioritas Tinggi', count: notifications?.filter(n => n?.priority === 'high')?.length }
  ];

  const filteredNotifications = notifications?.filter(notification => {
    if (activeTab === 'unread') return notification?.unread;
    if (activeTab === 'high') return notification?.priority === 'high';
    return true;
  });

  const getIconColor = (color) => {
    const colors = {
      orange: 'text-orange-600 bg-orange-50',
      green: 'text-green-600 bg-green-50',
      blue: 'text-blue-600 bg-blue-50',
      red: 'text-red-600 bg-red-50',
      purple: 'text-purple-600 bg-purple-50'
    };
    return colors?.[color] || colors?.blue;
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    return badges?.[priority] || badges?.medium;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Pusat Notifikasi</h3>
          <Button variant="ghost" size="sm" iconName="Settings">
            Pengaturan
          </Button>
        </div>
        
        <div className="flex space-x-1">
          {tabs?.map(tab => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === tab?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab?.label}
              {tab?.count > 0 && (
                <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                  activeTab === tab?.id 
                    ? 'bg-primary-foreground/20 text-primary-foreground' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {tab?.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {filteredNotifications?.length === 0 ? (
          <div className="p-6 text-center">
            <Icon name="Bell" size={48} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Tidak ada notifikasi</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredNotifications?.map(notification => (
              <div 
                key={notification?.id}
                className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                  notification?.unread ? 'bg-blue-50/30' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getIconColor(notification?.color)}`}>
                    <Icon name={notification?.icon} size={20} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`text-sm font-medium ${notification?.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                        {notification?.title}
                      </h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityBadge(notification?.priority)}`}>
                        {notification?.priority === 'high' ? 'Tinggi' : notification?.priority === 'medium' ? 'Sedang' : 'Rendah'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{notification?.message}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{notification?.time}</span>
                      {notification?.unread && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {filteredNotifications?.length > 0 && (
        <div className="p-4 border-t border-gray-200">
          <Button variant="ghost" size="sm" fullWidth>
            Lihat Semua Notifikasi
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;