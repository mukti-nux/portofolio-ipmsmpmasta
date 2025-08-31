import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TransparencySection = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('updates');

  const recentUpdates = [
    {
      id: 1,
      title: "Laporan Keuangan Triwulan III 2024",
      description: "Transparansi pengelolaan keuangan organisasi dengan detail alokasi dana dan pencapaian target.",
      date: "2024-08-28",
      type: "financial",
      status: "published",
      downloads: 234,
      icon: "DollarSign"
    },
    {
      id: 2,
      title: "Update Sistem Manajemen Digital",
      description: "Peningkatan fitur AI chatbot dan implementasi dashboard analytics untuk member.",
      date: "2024-08-25",
      type: "system",
      status: "published",
      downloads: 156,
      icon: "Cpu"
    },
    {
      id: 3,
      title: "Hasil Evaluasi Program Keanggotaan",
      description: "Analisis komprehensif tingkat kepuasan anggota dan rekomendasi perbaikan layanan.",
      date: "2024-08-22",
      type: "evaluation",
      status: "published",
      downloads: 189,
      icon: "BarChart3"
    },
    {
      id: 4,
      title: "Kebijakan Baru Transparansi Data",
      description: "Panduan lengkap mengenai akses data publik dan perlindungan privasi anggota.",
      date: "2024-08-20",
      type: "policy",
      status: "published",
      downloads: 298,
      icon: "Shield"
    }
  ];

  const impactMetrics = [
    {
      label: "Dokumen Transparan",
      value: "1,247",
      change: "+12%",
      trend: "up",
      icon: "FileText",
      color: "text-green-600"
    },
    {
      label: "Tingkat Kepuasan",
      value: "98.2%",
      change: "+5.3%",
      trend: "up",
      icon: "Heart",
      color: "text-blue-600"
    },
    {
      label: "Response Time",
      value: "< 2 jam",
      change: "-30%",
      trend: "up",
      icon: "Clock",
      color: "text-purple-600"
    },
    {
      label: "Anggota Aktif",
      value: "150+",
      change: "+8%",
      trend: "up",
      icon: "Users",
      color: "text-orange-600"
    }
  ];

  const tabs = [
    { id: 'updates', label: 'Update Terbaru', icon: 'Bell' },
    { id: 'metrics', label: 'Metrik Dampak', icon: 'TrendingUp' },
    { id: 'documents', label: 'Dokumen Publik', icon: 'FolderOpen' }
  ];

  const handleViewReport = () => {
    navigate('/transparency-reports');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getTypeColor = (type) => {
    const colors = {
      financial: 'bg-green-100 text-green-800',
      system: 'bg-blue-100 text-blue-800',
      evaluation: 'bg-purple-100 text-purple-800',
      policy: 'bg-orange-100 text-orange-800'
    };
    return colors?.[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <section className="py-20 bg-gradient-to-b from-muted to-background">
      <div className="container-brand">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-success/10 text-success rounded-full px-4 py-2 text-sm font-medium mb-4">
            <Icon name="Eye" size={16} />
            <span>Transparansi Penuh</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Akuntabilitas & <span className="text-primary">Transparansi</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Komitmen kami terhadap keterbukaan informasi dan akuntabilitas dalam setiap aspek operasional organisasi.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-card border border-border rounded-xl p-2 inline-flex">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab?.id
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-6xl mx-auto">
          {activeTab === 'updates' && (
            <div className="grid lg:grid-cols-2 gap-6">
              {recentUpdates?.map((update) => (
                <div
                  key={update?.id}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-brand transition-shadow duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getTypeColor(update?.type)}`}>
                      <Icon name={update?.icon} size={20} />
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">{formatDate(update?.date)}</div>
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-1">
                        <Icon name="Download" size={12} />
                        <span>{update?.downloads}</span>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {update?.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {update?.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(update?.type)}`}>
                      {update?.type?.charAt(0)?.toUpperCase() + update?.type?.slice(1)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="ExternalLink"
                      iconPosition="right"
                    >
                      Lihat Detail
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'metrics' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {impactMetrics?.map((metric, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-brand transition-shadow duration-300"
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center`}>
                    <Icon name={metric?.icon} size={24} className={metric?.color} />
                  </div>
                  
                  <div className="text-3xl font-bold text-foreground mb-2">
                    {metric?.value}
                  </div>
                  <div className="text-sm text-muted-foreground mb-3">
                    {metric?.label}
                  </div>
                  
                  <div className={`inline-flex items-center space-x-1 text-xs font-medium ${
                    metric?.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <Icon name={metric?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={12} />
                    <span>{metric?.change}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="bg-card border border-border rounded-xl p-8">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="FolderOpen" size={32} className="text-primary" />
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Repositori Dokumen Publik
                </h3>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Akses lengkap ke semua dokumen publik organisasi, termasuk laporan keuangan, 
                  kebijakan, dan dokumentasi kegiatan yang dapat diunduh secara gratis.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-2">500+</div>
                    <div className="text-sm text-muted-foreground">Dokumen Tersedia</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-2">24/7</div>
                    <div className="text-sm text-muted-foreground">Akses Terbuka</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-2">100%</div>
                    <div className="text-sm text-muted-foreground">Gratis</div>
                  </div>
                </div>
                
                <Button
                  variant="default"
                  size="lg"
                  onClick={handleViewReport}
                  iconName="FolderOpen"
                  iconPosition="left"
                >
                  Jelajahi Dokumen
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-success to-success/80 rounded-2xl p-8 text-white">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Icon name="Shield" size={32} />
              <h3 className="text-2xl font-bold">Komitmen Transparansi</h3>
            </div>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Kami berkomitmen untuk menjaga transparansi penuh dalam setiap aspek operasional. 
              Semua informasi publik dapat diakses dengan mudah dan cepat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                onClick={handleViewReport}
                iconName="FileText"
                iconPosition="left"
                className="bg-white text-success hover:bg-white/90"
              >
                Lihat Semua Laporan
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Mail"
                iconPosition="left"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Hubungi Kami
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransparencySection;