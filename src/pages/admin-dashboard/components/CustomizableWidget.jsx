import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CustomizableWidget = () => {
  const [widgets, setWidgets] = useState([
    { id: 1, type: 'member-stats', title: 'Statistik Anggota', enabled: true, position: 1 },
    { id: 2, type: 'document-flow', title: 'Alur Dokumen', enabled: true, position: 2 },
    { id: 3, type: 'recent-activities', title: 'Aktivitas Terbaru', enabled: true, position: 3 },
    { id: 4, type: 'system-health', title: 'Kesehatan Sistem', enabled: false, position: 4 },
    { id: 5, type: 'financial-overview', title: 'Ringkasan Keuangan', enabled: false, position: 5 },
    { id: 6, type: 'upcoming-events', title: 'Event Mendatang', enabled: true, position: 6 }
  ]);

  const [isCustomizing, setIsCustomizing] = useState(false);

  const availableWidgets = [
    { type: 'member-stats', title: 'Statistik Anggota', icon: 'Users', description: 'Tampilkan data keanggotaan' },
    { type: 'document-flow', title: 'Alur Dokumen', icon: 'FileText', description: 'Monitor proses dokumen' },
    { type: 'recent-activities', title: 'Aktivitas Terbaru', icon: 'Activity', description: 'Log aktivitas sistem' },
    { type: 'system-health', title: 'Kesehatan Sistem', icon: 'Monitor', description: 'Status server dan performa' },
    { type: 'financial-overview', title: 'Ringkasan Keuangan', icon: 'DollarSign', description: 'Laporan keuangan singkat' },
    { type: 'upcoming-events', title: 'Event Mendatang', icon: 'Calendar', description: 'Jadwal acara organisasi' },
    { type: 'task-management', title: 'Manajemen Tugas', icon: 'CheckSquare', description: 'Daftar tugas dan deadline' },
    { type: 'communication-hub', title: 'Hub Komunikasi', icon: 'MessageSquare', description: 'Pesan dan notifikasi' }
  ];

  const toggleWidget = (widgetId) => {
    setWidgets(widgets?.map(widget => 
      widget?.id === widgetId 
        ? { ...widget, enabled: !widget?.enabled }
        : widget
    ));
  };

  const moveWidget = (widgetId, direction) => {
    const widget = widgets?.find(w => w?.id === widgetId);
    const targetPosition = direction === 'up' ? widget?.position - 1 : widget?.position + 1;
    
    if (targetPosition < 1 || targetPosition > widgets?.length) return;

    setWidgets(widgets?.map(w => {
      if (w?.id === widgetId) {
        return { ...w, position: targetPosition };
      }
      if (w?.position === targetPosition) {
        return { ...w, position: widget?.position };
      }
      return w;
    }));
  };

  const addWidget = (widgetType) => {
    const existingWidget = widgets?.find(w => w?.type === widgetType);
    if (existingWidget) {
      toggleWidget(existingWidget?.id);
      return;
    }

    const newWidget = {
      id: Date.now(),
      type: widgetType,
      title: availableWidgets?.find(w => w?.type === widgetType)?.title || 'New Widget',
      enabled: true,
      position: widgets?.length + 1
    };

    setWidgets([...widgets, newWidget]);
  };

  const resetToDefault = () => {
    setWidgets([
      { id: 1, type: 'member-stats', title: 'Statistik Anggota', enabled: true, position: 1 },
      { id: 2, type: 'document-flow', title: 'Alur Dokumen', enabled: true, position: 2 },
      { id: 3, type: 'recent-activities', title: 'Aktivitas Terbaru', enabled: true, position: 3 },
      { id: 4, type: 'system-health', title: 'Kesehatan Sistem', enabled: false, position: 4 },
      { id: 5, type: 'financial-overview', title: 'Ringkasan Keuangan', enabled: false, position: 5 },
      { id: 6, type: 'upcoming-events', title: 'Event Mendatang', enabled: true, position: 6 }
    ]);
  };

  const enabledWidgets = widgets?.filter(w => w?.enabled)?.sort((a, b) => a?.position - b?.position);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Kustomisasi Dashboard</h3>
        <div className="flex space-x-2">
          <Button 
            variant={isCustomizing ? "default" : "outline"} 
            size="sm" 
            iconName="Settings"
            onClick={() => setIsCustomizing(!isCustomizing)}
          >
            {isCustomizing ? 'Selesai' : 'Kustomisasi'}
          </Button>
          <Button variant="ghost" size="sm" iconName="RotateCcw" onClick={resetToDefault}>
            Reset
          </Button>
        </div>
      </div>
      {isCustomizing ? (
        <div className="space-y-6">
          {/* Current Widgets */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Widget Aktif</h4>
            <div className="space-y-2">
              {widgets?.sort((a, b) => a?.position - b?.position)?.map(widget => (
                <div 
                  key={widget?.id}
                  className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
                    widget?.enabled 
                      ? 'border-green-200 bg-green-50' :'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex flex-col space-y-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="ChevronUp"
                        onClick={() => moveWidget(widget?.id, 'up')}
                        disabled={widget?.position === 1}
                        className="h-6 w-6 p-0"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="ChevronDown"
                        onClick={() => moveWidget(widget?.id, 'down')}
                        disabled={widget?.position === widgets?.length}
                        className="h-6 w-6 p-0"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Icon 
                        name={availableWidgets?.find(w => w?.type === widget?.type)?.icon || 'Square'} 
                        size={20} 
                        className={widget?.enabled ? 'text-green-600' : 'text-gray-400'}
                      />
                      <div>
                        <p className={`font-medium ${widget?.enabled ? 'text-green-900' : 'text-gray-500'}`}>
                          {widget?.title}
                        </p>
                        <p className="text-sm text-gray-500">Posisi: {widget?.position}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleWidget(widget?.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        widget?.enabled ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <span 
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          widget?.enabled ? 'translate-x-6' : 'translate-x-1'
                        }`} 
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Available Widgets */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Widget Tersedia</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {availableWidgets?.map(widget => {
                const isActive = widgets?.some(w => w?.type === widget?.type && w?.enabled);
                return (
                  <button
                    key={widget?.type}
                    onClick={() => addWidget(widget?.type)}
                    disabled={isActive}
                    className={`p-3 rounded-lg border-2 border-dashed text-left transition-all ${
                      isActive 
                        ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed' :'border-blue-200 bg-blue-50 hover:border-blue-300 hover:bg-blue-100'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <Icon 
                        name={widget?.icon} 
                        size={20} 
                        className={isActive ? 'text-gray-400' : 'text-blue-600'}
                      />
                      <div>
                        <p className={`font-medium ${isActive ? 'text-gray-500' : 'text-blue-900'}`}>
                          {widget?.title}
                        </p>
                        <p className={`text-sm ${isActive ? 'text-gray-400' : 'text-blue-700'}`}>
                          {widget?.description}
                        </p>
                        {isActive && (
                          <span className="inline-block mt-1 px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded-full">
                            Sudah Aktif
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Preview Dashboard</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {enabledWidgets?.map(widget => (
              <div key={widget?.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={availableWidgets?.find(w => w?.type === widget?.type)?.icon || 'Square'} 
                    size={20} 
                    className="text-blue-600"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{widget?.title}</p>
                    <p className="text-sm text-gray-500">Widget #{widget?.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {enabledWidgets?.length === 0 && (
            <div className="text-center py-8">
              <Icon name="Layout" size={48} className="text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Tidak ada widget yang aktif</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={() => setIsCustomizing(true)}
              >
                Tambah Widget
              </Button>
            </div>
          )}
        </div>
      )}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900">Tips Kustomisasi</p>
            <p className="text-sm text-blue-700">
              Atur widget sesuai prioritas kerja Anda. Widget yang paling sering digunakan sebaiknya ditempatkan di posisi atas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizableWidget;