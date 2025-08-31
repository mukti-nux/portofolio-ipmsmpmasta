import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import DocumentRepository from './components/DocumentRepository';
import ActivityTimeline from './components/ActivityTimeline';
import PerformanceDashboard from './components/PerformanceDashboard';
import ReportingSection from './components/ReportingSection';
import SearchAndFilter from './components/SearchAndFilter';

const TransparencyReports = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchResults, setSearchResults] = useState(null);
  const [filterResults, setFilterResults] = useState(null);

  const tabs = [
    { id: 'overview', name: 'Ringkasan', icon: 'LayoutDashboard' },
    { id: 'documents', name: 'Dokumen', icon: 'FileText' },
    { id: 'activities', name: 'Kegiatan', icon: 'Calendar' },
    { id: 'performance', name: 'Kinerja', icon: 'BarChart3' },
    { id: 'reports', name: 'Laporan', icon: 'BookOpen' }
  ];

  const handleSearch = (searchTerm) => {
    // Mock search functionality
    console.log('Searching for:', searchTerm);
    setSearchResults(searchTerm);
  };

  const handleFilter = (filters) => {
    // Mock filter functionality
    console.log('Applying filters:', filters);
    setFilterResults(filters);
  };

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-brand border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <Icon name="FileText" size={24} className="text-blue-600" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">156</div>
                    <div className="text-sm text-muted-foreground">Dokumen Publik</div>
                  </div>
                </div>
                <div className="flex items-center text-sm text-green-600">
                  <Icon name="TrendingUp" size={16} className="mr-1" />
                  <span>+12 bulan ini</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-brand border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <Icon name="Activity" size={24} className="text-green-600" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">48</div>
                    <div className="text-sm text-muted-foreground">Program Selesai</div>
                  </div>
                </div>
                <div className="flex items-center text-sm text-green-600">
                  <Icon name="TrendingUp" size={16} className="mr-1" />
                  <span>+8 dari target</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-brand border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <Icon name="Users" size={24} className="text-purple-600" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">3,856</div>
                    <div className="text-sm text-muted-foreground">Penerima Manfaat</div>
                  </div>
                </div>
                <div className="flex items-center text-sm text-green-600">
                  <Icon name="TrendingUp" size={16} className="mr-1" />
                  <span>+31% tahun ini</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-brand border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <Icon name="DollarSign" size={24} className="text-orange-600" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">98%</div>
                    <div className="text-sm text-muted-foreground">Transparansi</div>
                  </div>
                </div>
                <div className="flex items-center text-sm text-green-600">
                  <Icon name="Shield" size={16} className="mr-1" />
                  <span>Audit Bersih</span>
                </div>
              </div>
            </div>
            {/* Recent Updates */}
            <div className="bg-white rounded-xl shadow-brand border border-border p-6">
              <h3 className="text-xl font-bold text-foreground mb-6">Pembaruan Terbaru</h3>
              <div className="space-y-4">
                {[
                  {
                    title: "Laporan Keuangan Triwulan III 2024 Dipublikasikan",
                    date: "31 Agustus 2024",
                    type: "financial",
                    icon: "DollarSign"
                  },
                  {
                    title: "Dokumentasi Program Bantuan Pendidikan Tersedia",
                    date: "28 Agustus 2024",
                    type: "program",
                    icon: "GraduationCap"
                  },
                  {
                    title: "Notulen Rapat Pengurus Bulanan Agustus",
                    date: "25 Agustus 2024",
                    type: "governance",
                    icon: "Users"
                  },
                  {
                    title: "Laporan Dampak Program Kesehatan Masyarakat",
                    date: "22 Agustus 2024",
                    type: "impact",
                    icon: "Heart"
                  }
                ]?.map((update, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon name={update?.icon} size={20} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{update?.title}</h4>
                      <p className="text-sm text-muted-foreground">{update?.date}</p>
                    </div>
                    <Button variant="ghost" size="sm" iconName="ArrowRight">
                      Lihat
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            {/* Quick Access */}
            <div className="bg-white rounded-xl shadow-brand border border-border p-6">
              <h3 className="text-xl font-bold text-foreground mb-6">Akses Cepat</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'Laporan Keuangan', icon: 'DollarSign', description: 'Akses laporan keuangan terbaru' },
                  { name: 'Dokumen Kebijakan', icon: 'Shield', description: 'Kebijakan dan prosedur organisasi' },
                  { name: 'Notulen Rapat', icon: 'FileText', description: 'Hasil rapat dan keputusan penting' },
                  { name: 'Program Kegiatan', icon: 'Calendar', description: 'Dokumentasi program dan kegiatan' },
                  { name: 'Audit & Evaluasi', icon: 'CheckCircle', description: 'Hasil audit dan evaluasi internal' },
                  { name: 'Kontak Transparansi', icon: 'MessageCircle', description: 'Hubungi tim transparansi' }
                ]?.map((item, index) => (
                  <button
                    key={index}
                    className="flex items-start gap-3 p-4 text-left bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon name={item?.icon} size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{item?.name}</h4>
                      <p className="text-sm text-muted-foreground">{item?.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 'documents':
        return <DocumentRepository />;
      case 'activities':
        return <ActivityTimeline />;
      case 'performance':
        return <PerformanceDashboard />;
      case 'reports':
        return <ReportingSection />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Transparansi & Laporan - OrganiFlow</title>
        <meta name="description" content="Akses transparan ke dokumen organisasi, laporan kinerja, dan informasi akuntabilitas publik OrganiFlow" />
      </Helmet>
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-secondary/5 to-background py-16">
          <div className="container-brand">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                <Icon name="Shield" size={16} />
                <span>Komitmen Transparansi</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Transparansi & Laporan
                <span className="block text-primary mt-2">Organisasi</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Akses terbuka ke informasi organisasi, laporan kinerja, dan dokumentasi kegiatan 
                untuk membangun kepercayaan dan akuntabilitas publik
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="default" 
                  size="lg"
                  iconName="Search"
                  iconPosition="left"
                  onClick={() => setActiveTab('documents')}
                >
                  Cari Dokumen
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  iconName="BarChart3"
                  iconPosition="left"
                  onClick={() => setActiveTab('performance')}
                >
                  Lihat Kinerja
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 bg-muted/30">
          <div className="container-brand">
            <SearchAndFilter onSearch={handleSearch} onFilter={handleFilter} />
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="bg-white border-b border-border sticky top-16 z-30">
          <div className="container-brand">
            <div className="flex overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-200 ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                  }`}
                >
                  <Icon name={tab?.icon} size={18} />
                  <span>{tab?.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container-brand">
            {renderTabContent()}
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-16 bg-muted/30">
          <div className="container-brand">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Komitmen Transparansi Kami
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Kami berkomitmen untuk memberikan akses terbuka dan transparan terhadap 
                informasi organisasi demi membangun kepercayaan publik
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Shield" size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Audit Independen
                </h3>
                <p className="text-muted-foreground">
                  Laporan keuangan diaudit oleh auditor independen dan dipublikasikan secara berkala
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Eye" size={32} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Akses Terbuka
                </h3>
                <p className="text-muted-foreground">
                  Dokumen dan informasi organisasi dapat diakses oleh publik tanpa hambatan
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Clock" size={32} className="text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Update Berkala
                </h3>
                <p className="text-muted-foreground">
                  Informasi dan laporan diperbarui secara berkala sesuai jadwal yang telah ditetapkan
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-white">
          <div className="container-brand">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 lg:p-12 border border-primary/10">
                <div className="text-center">
                  <Icon name="MessageCircle" size={48} className="mx-auto text-primary mb-6" />
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    Butuh Informasi Lebih Lanjut?
                  </h2>
                  <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Tim transparansi kami siap membantu Anda mendapatkan informasi yang dibutuhkan. 
                    Hubungi kami untuk pertanyaan atau permintaan dokumen khusus.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center">
                      <Icon name="Mail" size={24} className="mx-auto text-primary mb-2" />
                      <div className="font-semibold text-foreground">Email</div>
                      <div className="text-sm text-muted-foreground">transparansi@organiflow.id</div>
                    </div>
                    <div className="text-center">
                      <Icon name="Phone" size={24} className="mx-auto text-primary mb-2" />
                      <div className="font-semibold text-foreground">Telepon</div>
                      <div className="text-sm text-muted-foreground">+62 21 1234 5678</div>
                    </div>
                    <div className="text-center">
                      <Icon name="Clock" size={24} className="mx-auto text-primary mb-2" />
                      <div className="font-semibold text-foreground">Jam Layanan</div>
                      <div className="text-sm text-muted-foreground">Senin - Jumat, 09:00 - 17:00</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="default" iconName="Send" iconPosition="left">
                      Kirim Pertanyaan
                    </Button>
                    <Button variant="outline" iconName="Download" iconPosition="left">
                      Formulir Permintaan Info
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container-brand">
          <div className="text-center text-muted-foreground">
            <p>&copy; {new Date()?.getFullYear()} OrganiFlow. Semua hak dilindungi.</p>
            <p className="mt-2 text-sm">
              Komitmen transparansi untuk kepercayaan publik yang berkelanjutan
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TransparencyReports;