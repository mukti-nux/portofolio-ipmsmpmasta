import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ReportingSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('latest');

  const categories = [
    { id: 'all', name: 'Semua Laporan', icon: 'FileText', count: 28 },
    { id: 'monthly', name: 'Laporan Bulanan', icon: 'Calendar', count: 12 },
    { id: 'quarterly', name: 'Laporan Triwulan', icon: 'BarChart3', count: 4 },
    { id: 'annual', name: 'Laporan Tahunan', icon: 'BookOpen', count: 3 },
    { id: 'special', name: 'Laporan Khusus', icon: 'Star', count: 9 }
  ];

  const periods = [
    { id: 'latest', name: 'Terbaru' },
    { id: '2024', name: '2024' },
    { id: '2023', name: '2023' },
    { id: '2022', name: '2022' }
  ];

  const reports = [
    {
      id: 1,
      title: "Laporan Bulanan Agustus 2024",
      category: "monthly",
      period: "2024",
      date: "2024-08-31",
      summary: "Ringkasan kegiatan organisasi bulan Agustus 2024 mencakup 5 program utama, 150 penerima manfaat, dan pencapaian target 85%.",
      highlights: [
        "Program bantuan pendidikan untuk 50 anak",
        "Pelatihan keterampilan digital 80 peserta",
        "Bakti sosial kesehatan 300 warga",
        "Kampanye lingkungan hidup 500 pohon"
      ],
      metrics: {
        programs: 5,
        beneficiaries: 150,
        budget: "Rp 180.000.000",
        achievement: "85%"
      },
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
      downloadCount: 234,
      size: "2.8 MB"
    },
    {
      id: 2,
      title: "Laporan Triwulan II 2024",
      category: "quarterly",
      period: "2024",
      date: "2024-07-31",
      summary: "Evaluasi komprehensif kinerja organisasi triwulan kedua 2024 dengan fokus pada program pendidikan dan kesehatan masyarakat.",
      highlights: [
        "15 program berhasil diselesaikan",
        "450 penerima manfaat langsung",
        "Kemitraan dengan 8 lembaga baru",
        "Peningkatan anggota aktif 12%"
      ],
      metrics: {
        programs: 15,
        beneficiaries: 450,
        budget: "Rp 540.000.000",
        achievement: "92%"
      },
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
      downloadCount: 189,
      size: "4.2 MB"
    },
    {
      id: 3,
      title: "Laporan Tahunan 2023",
      category: "annual",
      period: "2023",
      date: "2024-01-31",
      summary: "Laporan komprehensif pencapaian organisasi sepanjang tahun 2023 dengan dokumentasi lengkap program dan dampak sosial.",
      highlights: [
        "48 program berhasil dilaksanakan",
        "1,250 penerima manfaat total",
        "Penghargaan organisasi terbaik",
        "Ekspansi ke 3 wilayah baru"
      ],
      metrics: {
        programs: 48,
        beneficiaries: 1250,
        budget: "Rp 2.100.000.000",
        achievement: "96%"
      },
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
      downloadCount: 567,
      size: "8.5 MB"
    },
    {
      id: 4,
      title: "Laporan Khusus: Dampak Program Pendidikan",
      category: "special",
      period: "2024",
      date: "2024-08-15",
      summary: "Analisis mendalam dampak program pendidikan organisasi terhadap peningkatan kualitas hidup anak-anak kurang mampu.",
      highlights: [
        "200 anak mendapat beasiswa",
        "95% tingkat kelulusan",
        "Peningkatan nilai rata-rata 25%",
        "Testimoni positif dari orang tua"
      ],
      metrics: {
        programs: 8,
        beneficiaries: 200,
        budget: "Rp 320.000.000",
        achievement: "98%"
      },
      image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&h=250&fit=crop",
      downloadCount: 145,
      size: "3.1 MB"
    },
    {
      id: 5,
      title: "Laporan Bulanan Juli 2024",
      category: "monthly",
      period: "2024",
      date: "2024-07-31",
      summary: "Dokumentasi kegiatan bulan Juli 2024 dengan fokus pada program lingkungan hidup dan pemberdayaan masyarakat.",
      highlights: [
        "Penanaman 300 pohon",
        "Workshop UMKM 60 peserta",
        "Gotong royong 5 lokasi",
        "Edukasi lingkungan 200 siswa"
      ],
      metrics: {
        programs: 4,
        beneficiaries: 125,
        budget: "Rp 95.000.000",
        achievement: "88%"
      },
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=250&fit=crop",
      downloadCount: 178,
      size: "2.1 MB"
    },
    {
      id: 6,
      title: "Laporan Khusus: Evaluasi Program Kesehatan",
      category: "special",
      period: "2024",
      date: "2024-08-01",
      summary: "Evaluasi komprehensif program kesehatan masyarakat dengan analisis efektivitas dan rekomendasi perbaikan.",
      highlights: [
        "500 pemeriksaan kesehatan gratis",
        "15 kampanye kesehatan",
        "Kerjasama dengan 5 puskesmas",
        "Pelatihan kader kesehatan 40 orang"
      ],
      metrics: {
        programs: 6,
        beneficiaries: 500,
        budget: "Rp 275.000.000",
        achievement: "91%"
      },
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
      downloadCount: 203,
      size: "3.7 MB"
    }
  ];

  const filteredReports = reports?.filter(report => {
    const matchesCategory = selectedCategory === 'all' || report?.category === selectedCategory;
    const matchesPeriod = selectedPeriod === 'latest' || report?.period === selectedPeriod;
    return matchesCategory && matchesPeriod;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'monthly': return 'bg-blue-100 text-blue-800';
      case 'quarterly': return 'bg-green-100 text-green-800';
      case 'annual': return 'bg-purple-100 text-purple-800';
      case 'special': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryName = (category) => {
    const cat = categories?.find(c => c?.id === category);
    return cat ? cat?.name : category;
  };

  return (
    <div className="bg-white rounded-xl shadow-brand border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Laporan Organisasi
            </h2>
            <p className="text-muted-foreground">
              Akses laporan berkala dan dokumentasi kegiatan organisasi
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e?.target?.value)}
              className="px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {periods?.map(period => (
                <option key={period?.id} value={period?.id}>{period?.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="p-6">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
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

        {/* Reports Grid */}
        <div className="grid gap-6">
          {filteredReports?.map((report) => (
            <div
              key={report?.id}
              className="border border-border rounded-xl p-6 hover:shadow-md transition-all duration-200 hover:border-primary/20"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Image */}
                <div className="lg:w-80 flex-shrink-0">
                  <div className="relative overflow-hidden rounded-lg h-48 lg:h-40">
                    <Image
                      src={report?.image}
                      alt={report?.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(report?.category)}`}>
                        {getCategoryName(report?.category)}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2 mb-3">
                    <h3 className="text-xl font-bold text-foreground line-clamp-2">
                      {report?.title}
                    </h3>
                    <div className="text-sm text-muted-foreground flex items-center gap-1 flex-shrink-0">
                      <Icon name="Calendar" size={14} />
                      <span>{formatDate(report?.date)}</span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {report?.summary}
                  </p>
                  
                  {/* Highlights */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-foreground mb-2">Sorotan Utama:</h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
                      {report?.highlights?.slice(0, 4)?.map((highlight, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Icon name="CheckCircle" size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-1">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Metrics */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="text-center lg:text-left">
                      <div className="text-sm text-muted-foreground">Program</div>
                      <div className="font-semibold text-foreground">{report?.metrics?.programs}</div>
                    </div>
                    <div className="text-center lg:text-left">
                      <div className="text-sm text-muted-foreground">Penerima</div>
                      <div className="font-semibold text-foreground">{report?.metrics?.beneficiaries}</div>
                    </div>
                    <div className="text-center lg:text-left">
                      <div className="text-sm text-muted-foreground">Anggaran</div>
                      <div className="font-semibold text-foreground">{report?.metrics?.budget}</div>
                    </div>
                    <div className="text-center lg:text-left">
                      <div className="text-sm text-muted-foreground">Pencapaian</div>
                      <div className="font-semibold text-primary">{report?.metrics?.achievement}</div>
                    </div>
                  </div>
                  
                  {/* File Info */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Icon name="HardDrive" size={14} />
                      <span>{report?.size}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Download" size={14} />
                      <span>{report?.downloadCount} unduhan</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="FileText" size={14} />
                      <span>PDF</span>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    <Button variant="default" size="sm" iconName="Eye" iconPosition="left">
                      Baca Laporan
                    </Button>
                    <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
                      Unduh PDF
                    </Button>
                    <Button variant="ghost" size="sm" iconName="Share2" iconPosition="left">
                      Bagikan
                    </Button>
                    <Button variant="ghost" size="sm" iconName="Bookmark" iconPosition="left">
                      Simpan
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredReports?.length === 0 && (
          <div className="text-center py-12">
            <Icon name="FileX" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Tidak ada laporan ditemukan
            </h3>
            <p className="text-muted-foreground">
              Coba ubah filter kategori atau periode untuk melihat laporan lainnya
            </p>
          </div>
        )}

        {/* Load More */}
        {filteredReports?.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" iconName="ChevronDown" iconPosition="right">
              Muat Laporan Lainnya
            </Button>
          </div>
        )}

        {/* Newsletter Subscription */}
        <div className="mt-12 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 border border-primary/10">
          <div className="text-center">
            <Icon name="Mail" size={48} className="mx-auto text-primary mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">
              Berlangganan Laporan Berkala
            </h3>
            <p className="text-muted-foreground mb-6">
              Dapatkan laporan terbaru organisasi langsung di email Anda
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Masukkan email Anda"
                className="flex-1 px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button variant="default" iconName="Send" iconPosition="right">
                Berlangganan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportingSection;