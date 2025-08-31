import React from 'react';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onAddMember, onBulkImport, onSendMessage, onGenerateReport }) => {
  const actions = [
    {
      title: 'Tambah Anggota',
      description: 'Daftarkan anggota baru ke sistem',
      icon: 'UserPlus',
      color: 'bg-blue-500',
      onClick: onAddMember
    },
    {
      title: 'Import Massal',
      description: 'Upload data anggota dari file Excel/CSV',
      icon: 'Upload',
      color: 'bg-green-500',
      onClick: onBulkImport
    },
    {
      title: 'Kirim Pesan',
      description: 'Broadcast pesan ke semua atau grup anggota',
      icon: 'MessageSquare',
      color: 'bg-purple-500',
      onClick: onSendMessage
    },
    {
      title: 'Laporan Anggota',
      description: 'Generate laporan aktivitas dan statistik',
      icon: 'FileBarChart',
      color: 'bg-orange-500',
      onClick: onGenerateReport
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Aksi Cepat</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions?.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            className="h-auto p-4 flex flex-col items-center text-center space-y-2 hover:shadow-brand transition-all duration-200"
            onClick={action?.onClick}
          >
            <div className={`w-12 h-12 ${action?.color} rounded-lg flex items-center justify-center mb-2`}>
              <div className="text-white">
                {action?.icon}
              </div>
            </div>
            <div>
              <p className="font-medium text-foreground">{action?.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{action?.description}</p>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;