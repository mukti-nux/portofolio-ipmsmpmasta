import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentRepository = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'Semua Dokumen', icon: 'FileText', count: 45 },
    { id: 'financial', name: 'Laporan Keuangan', icon: 'DollarSign', count: 12 },
    { id: 'meetings', name: 'Notulen Rapat', icon: 'Users', count: 18 },
    { id: 'policies', name: 'Kebijakan', icon: 'Shield', count: 8 },
    { id: 'activities', name: 'Laporan Kegiatan', icon: 'Activity', count: 7 }
  ];

  const documents = [
    {
      id: 1,
      title: "Laporan Keuangan Triwulan III 2024",
      category: "financial",
      date: "2024-08-25",
      size: "2.4 MB",
      downloads: 156,
      type: "PDF",
      description: "Laporan keuangan lengkap periode Juli-September 2024 dengan analisis pendapatan dan pengeluaran organisasi."
    },
    {
      id: 2,
      title: "Notulen Rapat Pengurus Bulanan Agustus 2024",
      category: "meetings",
      date: "2024-08-20",
      size: "1.8 MB",
      downloads: 89,
      type: "PDF",
      description: "Hasil rapat pengurus bulan Agustus membahas program kerja dan evaluasi kegiatan organisasi."
    },
    {
      id: 3,
      title: "Kebijakan Keanggotaan Terbaru",
      category: "policies",
      date: "2024-08-15",
      size: "1.2 MB",
      downloads: 234,
      type: "PDF",
      description: "Pembaruan kebijakan keanggotaan organisasi termasuk prosedur pendaftaran dan kewajiban anggota."
    },
    {
      id: 4,
      title: "Laporan Kegiatan Bakti Sosial Ramadhan 2024",
      category: "activities",
      date: "2024-08-10",
      size: "3.1 MB",
      downloads: 178,
      type: "PDF",
      description: "Dokumentasi lengkap kegiatan bakti sosial selama bulan Ramadhan dengan laporan distribusi bantuan."
    },
    {
      id: 5,
      title: "Audit Keuangan Semester I 2024",
      category: "financial",
      date: "2024-08-05",
      size: "2.8 MB",
      downloads: 145,
      type: "PDF",
      description: "Hasil audit independen terhadap pengelolaan keuangan organisasi semester pertama 2024."
    },
    {
      id: 6,
      title: "Notulen Rapat Anggota Tahunan 2024",
      category: "meetings",
      date: "2024-07-30",
      size: "2.2 MB",
      downloads: 267,
      type: "PDF",
      description: "Notulen lengkap rapat anggota tahunan dengan laporan pertanggungjawaban dan program kerja mendatang."
    }
  ];

  const filteredDocuments = documents?.filter(doc => {
    const matchesCategory = selectedCategory === 'all' || doc?.category === selectedCategory;
    const matchesSearch = doc?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         doc?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'PDF': return 'FileText';
      case 'DOC': return 'FileText';
      case 'XLS': return 'FileSpreadsheet';
      default: return 'File';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'PDF': return 'text-red-600 bg-red-50';
      case 'DOC': return 'text-blue-600 bg-blue-50';
      case 'XLS': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-brand border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Repositori Dokumen
            </h2>
            <p className="text-muted-foreground">
              Akses transparan ke dokumen organisasi untuk kepentingan publik
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Icon 
                name="Search" 
                size={20} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
              <input
                type="text"
                placeholder="Cari dokumen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e?.target?.value)}
                className="pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent w-full sm:w-64"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setSelectedCategory(category?.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedCategory === category?.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
              }`}
            >
              <Icon name={category?.icon} size={16} />
              <span>{category?.name}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                selectedCategory === category?.id
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-background text-muted-foreground'
              }`}>
                {category?.count}
              </span>
            </button>
          ))}
        </div>

        {/* Documents Grid */}
        <div className="grid gap-4">
          {filteredDocuments?.map((doc) => (
            <div
              key={doc?.id}
              className="border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200 hover:border-primary/20"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${getTypeColor(doc?.type)}`}>
                      <Icon name={getTypeIcon(doc?.type)} size={20} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
                        {doc?.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {doc?.description}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Icon name="Calendar" size={14} />
                          <span>{formatDate(doc?.date)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="HardDrive" size={14} />
                          <span>{doc?.size}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="Download" size={14} />
                          <span>{doc?.downloads} unduhan</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Eye"
                    iconPosition="left"
                    className="flex-shrink-0"
                  >
                    Lihat
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    iconName="Download"
                    iconPosition="left"
                    className="flex-shrink-0"
                  >
                    Unduh
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDocuments?.length === 0 && (
          <div className="text-center py-12">
            <Icon name="FileX" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Tidak ada dokumen ditemukan
            </h3>
            <p className="text-muted-foreground">
              Coba ubah filter atau kata kunci pencarian Anda
            </p>
          </div>
        )}

        {/* Load More */}
        {filteredDocuments?.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" iconName="ChevronDown" iconPosition="right">
              Muat Lebih Banyak Dokumen
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentRepository;