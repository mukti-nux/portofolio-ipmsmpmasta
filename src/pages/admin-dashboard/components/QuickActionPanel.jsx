import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionPanel = () => {
  const quickActions = [
    {
      id: 1,
      title: 'Setujui Anggota',
      description: '5 pendaftaran menunggu',
      icon: 'UserCheck',
      color: 'green',
      count: 5,
      action: 'approve-members'
    },
    {
      id: 2,
      title: 'Review Dokumen',
      description: '12 dokumen perlu ditinjau',
      icon: 'FileText',
      color: 'blue',
      count: 12,
      action: 'review-documents'
    },
    {
      id: 3,
      title: 'Konfigurasi Sistem',
      description: 'Pengaturan platform',
      icon: 'Settings',
      color: 'purple',
      count: null,
      action: 'system-config'
    },
    {
      id: 4,
      title: 'Backup Data',
      description: 'Cadangkan data organisasi',
      icon: 'Database',
      color: 'orange',
      count: null,
      action: 'backup-data'
    },
    {
      id: 5,
      title: 'Kelola Chatbot',
      description: 'Update knowledge base',
      icon: 'Bot',
      color: 'teal',
      count: null,
      action: 'manage-chatbot'
    },
    {
      id: 6,
      title: 'Laporan Aktivitas',
      description: 'Generate laporan bulanan',
      icon: 'BarChart3',
      color: 'indigo',
      count: null,
      action: 'activity-reports'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      green: 'bg-green-50 text-green-600 border-green-200 hover:bg-green-100',
      blue: 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100',
      purple: 'bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100',
      orange: 'bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100',
      teal: 'bg-teal-50 text-teal-600 border-teal-200 hover:bg-teal-100',
      indigo: 'bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-100'
    };
    return colors?.[color] || colors?.blue;
  };

  const handleQuickAction = (action) => {
    console.log(`Executing quick action: ${action}`);
    // Handle navigation or action execution
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Aksi Cepat</h3>
        <Button variant="ghost" size="sm" iconName="Plus">
          Tambah Aksi
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions?.map(action => (
          <button
            key={action?.id}
            onClick={() => handleQuickAction(action?.action)}
            className={`p-4 rounded-lg border-2 border-dashed transition-all duration-200 text-left group ${getColorClasses(action?.color)}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getColorClasses(action?.color)?.replace('border-dashed', 'border-solid')}`}>
                <Icon name={action?.icon} size={20} />
              </div>
              {action?.count && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {action?.count}
                </span>
              )}
            </div>
            
            <h4 className="font-medium text-gray-900 mb-1 group-hover:text-current transition-colors">
              {action?.title}
            </h4>
            <p className="text-sm text-gray-600 group-hover:text-current/80 transition-colors">
              {action?.description}
            </p>
            
            <div className="mt-3 flex items-center text-sm font-medium group-hover:text-current transition-colors">
              <span>Jalankan</span>
              <Icon name="ArrowRight" size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        ))}
      </div>
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-3">
          <Icon name="Zap" size={20} className="text-yellow-600" />
          <div>
            <h4 className="font-medium text-gray-900">Otomatisasi Tersedia</h4>
            <p className="text-sm text-gray-600">Atur workflow otomatis untuk tugas berulang</p>
          </div>
          <Button variant="outline" size="sm" className="ml-auto">
            Atur
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActionPanel;