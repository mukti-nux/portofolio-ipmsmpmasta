import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const MemberModal = ({ member, isOpen, onClose, mode = 'view' }) => {
  const [formData, setFormData] = useState(member || {
    name: '',
    email: '',
    phone: '',
    memberNumber: '',
    role: 'member',
    department: '',
    status: 'active',
    joinDate: new Date()?.toISOString()?.split('T')?.[0]
  });

  const [activeTab, setActiveTab] = useState('profile');

  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving member data:', formData);
    onClose();
  };

  const roleOptions = [
    { value: 'admin', label: 'Administrator' },
    { value: 'secretary', label: 'Sekretaris' },
    { value: 'treasurer', label: 'Bendahara' },
    { value: 'member', label: 'Anggota' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Aktif' },
    { value: 'inactive', label: 'Tidak Aktif' },
    { value: 'pending', label: 'Menunggu' },
    { value: 'suspended', label: 'Ditangguhkan' }
  ];

  const departmentOptions = [
    { value: 'executive', label: 'Eksekutif' },
    { value: 'finance', label: 'Keuangan' },
    { value: 'operations', label: 'Operasional' },
    { value: 'marketing', label: 'Pemasaran' },
    { value: 'hr', label: 'SDM' }
  ];

  const tabs = [
    { id: 'profile', label: 'Profil', icon: 'User' },
    { id: 'activity', label: 'Aktivitas', icon: 'Activity' },
    { id: 'documents', label: 'Dokumen', icon: 'FileText' },
    { id: 'permissions', label: 'Izin', icon: 'Shield' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-brand-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            {member && (
              <Image
                src={member?.avatar}
                alt={member?.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            )}
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {mode === 'add' ? 'Tambah Anggota Baru' : 
                 mode === 'edit' ? 'Edit Anggota' : 'Detail Anggota'}
              </h2>
              {member && (
                <p className="text-sm text-muted-foreground">{member?.email}</p>
              )}
            </div>
          </div>
          <Button variant="ghost" size="sm" iconName="X" onClick={onClose} />
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Nama Lengkap"
                  value={formData?.name}
                  onChange={(e) => handleInputChange('name', e?.target?.value)}
                  disabled={mode === 'view'}
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  value={formData?.email}
                  onChange={(e) => handleInputChange('email', e?.target?.value)}
                  disabled={mode === 'view'}
                  required
                />
                <Input
                  label="Nomor Telepon"
                  type="tel"
                  value={formData?.phone}
                  onChange={(e) => handleInputChange('phone', e?.target?.value)}
                  disabled={mode === 'view'}
                />
                <Input
                  label="Nomor Anggota"
                  value={formData?.memberNumber}
                  onChange={(e) => handleInputChange('memberNumber', e?.target?.value)}
                  disabled={mode === 'view'}
                />
                <Select
                  label="Peran"
                  options={roleOptions}
                  value={formData?.role}
                  onChange={(value) => handleInputChange('role', value)}
                  disabled={mode === 'view'}
                />
                <Select
                  label="Departemen"
                  options={departmentOptions}
                  value={formData?.department}
                  onChange={(value) => handleInputChange('department', value)}
                  disabled={mode === 'view'}
                />
                <Select
                  label="Status"
                  options={statusOptions}
                  value={formData?.status}
                  onChange={(value) => handleInputChange('status', value)}
                  disabled={mode === 'view'}
                />
                <Input
                  label="Tanggal Bergabung"
                  type="date"
                  value={formData?.joinDate}
                  onChange={(e) => handleInputChange('joinDate', e?.target?.value)}
                  disabled={mode === 'view'}
                />
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Riwayat Aktivitas</h3>
              <div className="space-y-3">
                {member?.activities?.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                    <Icon name={activity?.icon} size={16} className="text-muted-foreground mt-1" />
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{activity?.description}</p>
                      <p className="text-xs text-muted-foreground">{activity?.timestamp}</p>
                    </div>
                  </div>
                )) || (
                  <p className="text-sm text-muted-foreground">Tidak ada aktivitas terbaru</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Dokumen Terkait</h3>
              <div className="space-y-3">
                {member?.documents?.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon name="FileText" size={16} className="text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{doc?.name}</p>
                        <p className="text-xs text-muted-foreground">{doc?.date}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" iconName="Download" />
                  </div>
                )) || (
                  <p className="text-sm text-muted-foreground">Tidak ada dokumen</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'permissions' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Izin & Akses</h3>
              <div className="space-y-3">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Akses Sistem</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">Dashboard Admin</span>
                      <Icon name={formData?.role === 'admin' ? 'Check' : 'X'} 
                            size={16} 
                            className={formData?.role === 'admin' ? 'text-green-500' : 'text-red-500'} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">Manajemen Dokumen</span>
                      <Icon name={['admin', 'secretary']?.includes(formData?.role) ? 'Check' : 'X'} 
                            size={16} 
                            className={['admin', 'secretary']?.includes(formData?.role) ? 'text-green-500' : 'text-red-500'} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">Laporan Keuangan</span>
                      <Icon name={['admin', 'treasurer']?.includes(formData?.role) ? 'Check' : 'X'} 
                            size={16} 
                            className={['admin', 'treasurer']?.includes(formData?.role) ? 'text-green-500' : 'text-red-500'} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {mode !== 'view' && (
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
            <Button variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button onClick={handleSave}>
              {mode === 'add' ? 'Tambah Anggota' : 'Simpan Perubahan'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberModal;