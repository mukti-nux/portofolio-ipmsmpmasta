import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ChatbotManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const chatbotStats = {
    totalConversations: 1247,
    activeUsers: 89,
    averageResponseTime: '2.3s',
    satisfactionRate: '94%'
  };

  const recentConversations = [
    {
      id: 1,
      user: 'Ahmad Rizki',
      query: 'Bagaimana cara mendaftar sebagai anggota?',
      response: 'Untuk mendaftar sebagai anggota, Anda dapat mengisi formulir...',
      timestamp: '10 menit yang lalu',
      satisfaction: 'positive',
      resolved: true
    },
    {
      id: 2,
      user: 'Siti Nurhaliza',
      query: 'Kapan rapat umum anggota akan dilaksanakan?',
      response: 'Rapat umum anggota dijadwalkan pada tanggal 15 September...',
      timestamp: '25 menit yang lalu',
      satisfaction: 'positive',
      resolved: true
    },
    {
      id: 3,
      user: 'Budi Santoso',
      query: 'Dokumen apa saja yang diperlukan untuk proposal?',
      response: 'Maaf, saya tidak memiliki informasi lengkap tentang...',
      timestamp: '1 jam yang lalu',
      satisfaction: 'negative',
      resolved: false
    }
  ];

  const knowledgeBase = [
    {
      id: 1,
      category: 'Keanggotaan',
      topics: 15,
      lastUpdated: '2 hari yang lalu',
      status: 'updated'
    },
    {
      id: 2,
      category: 'Dokumen & Prosedur',
      topics: 23,
      lastUpdated: '5 hari yang lalu',
      status: 'needs_update'
    },
    {
      id: 3,
      category: 'Organisasi',
      topics: 8,
      lastUpdated: '1 minggu yang lalu',
      status: 'updated'
    },
    {
      id: 4,
      category: 'Kontak & Bantuan',
      topics: 12,
      lastUpdated: '3 hari yang lalu',
      status: 'updated'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Ringkasan', icon: 'BarChart3' },
    { id: 'conversations', label: 'Percakapan', icon: 'MessageSquare' },
    { id: 'knowledge', label: 'Knowledge Base', icon: 'Book' },
    { id: 'settings', label: 'Pengaturan', icon: 'Settings' }
  ];

  const getSatisfactionIcon = (satisfaction) => {
    return satisfaction === 'positive' ? 'ThumbsUp' : satisfaction === 'negative' ? 'ThumbsDown' : 'Minus';
  };

  const getSatisfactionColor = (satisfaction) => {
    return satisfaction === 'positive' ? 'text-green-600' : satisfaction === 'negative' ? 'text-red-600' : 'text-gray-400';
  };

  const getStatusBadge = (status) => {
    const badges = {
      updated: 'bg-green-100 text-green-800',
      needs_update: 'bg-yellow-100 text-yellow-800',
      outdated: 'bg-red-100 text-red-800'
    };
    return badges?.[status] || badges?.updated;
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Total Percakapan</p>
              <p className="text-2xl font-bold text-blue-900">{chatbotStats?.totalConversations}</p>
            </div>
            <Icon name="MessageCircle" size={24} className="text-blue-600" />
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Pengguna Aktif</p>
              <p className="text-2xl font-bold text-green-900">{chatbotStats?.activeUsers}</p>
            </div>
            <Icon name="Users" size={24} className="text-green-600" />
          </div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Waktu Respons</p>
              <p className="text-2xl font-bold text-purple-900">{chatbotStats?.averageResponseTime}</p>
            </div>
            <Icon name="Clock" size={24} className="text-purple-600" />
          </div>
        </div>
        
        <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">Tingkat Kepuasan</p>
              <p className="text-2xl font-bold text-orange-900">{chatbotStats?.satisfactionRate}</p>
            </div>
            <Icon name="Star" size={24} className="text-orange-600" />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-medium text-gray-900 mb-4">Rekomendasi Perbaikan</h4>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <Icon name="AlertCircle" size={16} className="text-yellow-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Update Knowledge Base</p>
              <p className="text-sm text-gray-600">2 kategori memerlukan pembaruan informasi</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Icon name="TrendingUp" size={16} className="text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Tingkatkan Akurasi</p>
              <p className="text-sm text-gray-600">Tambahkan 15 FAQ baru berdasarkan pertanyaan umum</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderConversations = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          type="search"
          placeholder="Cari percakapan..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e?.target?.value)}
          className="max-w-md"
        />
        <Button variant="outline" size="sm" iconName="Download">
          Export
        </Button>
      </div>

      <div className="space-y-3">
        {recentConversations?.map(conversation => (
          <div key={conversation?.id} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{conversation?.user}</p>
                  <p className="text-sm text-gray-500">{conversation?.timestamp}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getSatisfactionIcon(conversation?.satisfaction)} 
                  size={16} 
                  className={getSatisfactionColor(conversation?.satisfaction)}
                />
                {conversation?.resolved ? (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Terselesaikan
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                    Perlu Tindakan
                  </span>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium text-gray-700">Pertanyaan:</p>
                <p className="text-sm text-gray-600">{conversation?.query}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Respons:</p>
                <p className="text-sm text-gray-600">{conversation?.response}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderKnowledgeBase = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-900">Kategori Knowledge Base</h4>
        <Button variant="outline" size="sm" iconName="Plus">
          Tambah Kategori
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {knowledgeBase?.map(category => (
          <div key={category?.id} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h5 className="font-medium text-gray-900">{category?.category}</h5>
                <p className="text-sm text-gray-600">{category?.topics} topik</p>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(category?.status)}`}>
                {category?.status === 'updated' ? 'Terbaru' : 'Perlu Update'}
              </span>
            </div>
            
            <p className="text-sm text-gray-500 mb-3">Terakhir diperbarui: {category?.lastUpdated}</p>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" iconName="Edit">
                Edit
              </Button>
              <Button variant="ghost" size="sm" iconName="Eye">
                Lihat
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="font-medium text-gray-900 mb-4">Pengaturan Umum</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Chatbot Aktif</p>
              <p className="text-sm text-gray-600">Mengaktifkan atau menonaktifkan chatbot</p>
            </div>
            <button className="bg-green-500 relative inline-flex h-6 w-11 items-center rounded-full transition-colors">
              <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition-transform" />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Mode Pembelajaran</p>
              <p className="text-sm text-gray-600">Chatbot belajar dari percakapan baru</p>
            </div>
            <button className="bg-green-500 relative inline-flex h-6 w-11 items-center rounded-full transition-colors">
              <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="font-medium text-gray-900 mb-4">Pelatihan Model</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Terakhir Dilatih</p>
              <p className="text-sm text-gray-600">25 Agustus 2025, 14:30 WIB</p>
            </div>
            <Button variant="outline" size="sm" iconName="RefreshCw">
              Latih Ulang
            </Button>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={16} className="text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">Pelatihan Otomatis</p>
                <p className="text-sm text-blue-700">Model akan dilatih ulang setiap minggu dengan data percakapan terbaru</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'conversations':
        return renderConversations();
      case 'knowledge':
        return renderKnowledgeBase();
      case 'settings':
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Manajemen AI Chatbot</h3>
        
        <div className="flex space-x-1">
          {tabs?.map(tab => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === tab?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ChatbotManagement;