import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ActivityTimeline = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const years = ['2024', '2023', '2022'];
  
  const categories = [
    { id: 'all', name: 'Semua Kegiatan', icon: 'Calendar' },
    { id: 'community', name: 'Kegiatan Masyarakat', icon: 'Users' },
    { id: 'education', name: 'Pendidikan', icon: 'GraduationCap' },
    { id: 'environment', name: 'Lingkungan', icon: 'Leaf' },
    { id: 'health', name: 'Kesehatan', icon: 'Heart' }
  ];

  const activities = [
    {
      id: 1,
      title: "Program Bantuan Pendidikan Anak Kurang Mampu",
      category: "education",
      date: "2024-08-25",
      status: "completed",
      impact: "150 anak terbantu",
      budget: "Rp 75.000.000",
      description: "Program pemberian beasiswa dan bantuan alat tulis untuk anak-anak dari keluarga kurang mampu di wilayah Jakarta Selatan. Program ini melibatkan 15 sekolah dasar dan menengah.",
      image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&h=250&fit=crop",
      documents: ["Laporan Pelaksanaan", "Daftar Penerima Bantuan", "Dokumentasi Kegiatan"],
      participants: 25,
      location: "Jakarta Selatan"
    },
    {
      id: 2,
      title: "Kampanye Lingkungan Hidup: Jakarta Hijau",
      category: "environment",
      date: "2024-08-20",
      status: "ongoing",
      impact: "500 pohon ditanam",
      budget: "Rp 45.000.000",
      description: "Kampanye penanaman pohon dan edukasi lingkungan hidup di berbagai taman kota Jakarta. Melibatkan komunitas lokal dan sekolah-sekolah untuk menciptakan kesadaran lingkungan.",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=250&fit=crop",
      documents: ["Proposal Kegiatan", "Laporan Progress", "Rencana Tindak Lanjut"],
      participants: 120,
      location: "DKI Jakarta"
    },
    {
      id: 3,
      title: "Bakti Sosial Kesehatan Gratis",
      category: "health",
      date: "2024-08-15",
      status: "completed",
      impact: "300 warga dilayani",
      budget: "Rp 35.000.000",
      description: "Pelayanan kesehatan gratis berupa pemeriksaan umum, cek tekanan darah, dan konsultasi kesehatan untuk masyarakat kurang mampu di wilayah Jakarta Timur.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
      documents: ["Laporan Medis", "Data Pasien", "Evaluasi Program"],
      participants: 35,
      location: "Jakarta Timur"
    },
    {
      id: 4,
      title: "Workshop Keterampilan Digital untuk UMKM",
      category: "community",
      date: "2024-08-10",
      status: "completed",
      impact: "80 UMKM terlatih",
      budget: "Rp 25.000.000",
      description: "Pelatihan penggunaan teknologi digital dan media sosial untuk meningkatkan penjualan UMKM lokal. Termasuk pelatihan e-commerce dan digital marketing.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
      documents: ["Materi Pelatihan", "Sertifikat Peserta", "Evaluasi Dampak"],
      participants: 15,
      location: "Jakarta Pusat"
    },
    {
      id: 5,
      title: "Program Literasi Masyarakat",
      category: "education",
      date: "2024-08-05",
      status: "ongoing",
      impact: "200 peserta aktif",
      budget: "Rp 40.000.000",
      description: "Program peningkatan literasi baca tulis untuk dewasa dan lansia yang belum menguasai kemampuan dasar membaca dan menulis di wilayah Jakarta Utara.",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop",
      documents: ["Kurikulum Program", "Progress Report", "Testimoni Peserta"],
      participants: 20,
      location: "Jakarta Utara"
    },
    {
      id: 6,
      title: "Gotong Royong Bersih Lingkungan",
      category: "environment",
      date: "2024-07-30",
      status: "completed",
      impact: "5 ton sampah terkumpul",
      budget: "Rp 15.000.000",
      description: "Kegiatan gotong royong membersihkan lingkungan di kawasan Kali Ciliwung dengan melibatkan warga sekitar dan relawan organisasi.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop",
      documents: ["Laporan Kegiatan", "Data Sampah", "Foto Dokumentasi"],
      participants: 85,
      location: "Jakarta Selatan"
    }
  ];

  const filteredActivities = activities?.filter(activity => {
    const matchesCategory = selectedCategory === 'all' || activity?.category === selectedCategory;
    const activityYear = new Date(activity.date)?.getFullYear()?.toString();
    const matchesYear = selectedYear === 'all' || activityYear === selectedYear;
    return matchesCategory && matchesYear;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'ongoing': return 'bg-blue-100 text-blue-800';
      case 'planned': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Selesai';
      case 'ongoing': return 'Berlangsung';
      case 'planned': return 'Direncanakan';
      default: return 'Unknown';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-brand border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Timeline Kegiatan Organisasi
            </h2>
            <p className="text-muted-foreground">
              Jejak aktivitas dan dampak organisasi untuk masyarakat
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e?.target?.value)}
              className="px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">Semua Tahun</option>
              {years?.map(year => (
                <option key={year} value={year}>{year}</option>
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
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border hidden lg:block"></div>
          
          <div className="space-y-8">
            {filteredActivities?.map((activity, index) => (
              <div key={activity?.id} className="relative">
                {/* Timeline Dot */}
                <div className="absolute left-2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-sm hidden lg:block"></div>
                
                <div className="lg:ml-12">
                  <div className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-all duration-200">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Image */}
                      <div className="lg:w-80 flex-shrink-0">
                        <div className="relative overflow-hidden rounded-lg h-48 lg:h-40">
                          <Image
                            src={activity?.image}
                            alt={activity?.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 right-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(activity?.status)}`}>
                              {getStatusText(activity?.status)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2 mb-3">
                          <h3 className="text-xl font-bold text-foreground line-clamp-2">
                            {activity?.title}
                          </h3>
                          <div className="text-sm text-muted-foreground flex items-center gap-1 flex-shrink-0">
                            <Icon name="Calendar" size={14} />
                            <span>{formatDate(activity?.date)}</span>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-4 line-clamp-3">
                          {activity?.description}
                        </p>
                        
                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div className="text-center lg:text-left">
                            <div className="text-sm text-muted-foreground">Dampak</div>
                            <div className="font-semibold text-foreground">{activity?.impact}</div>
                          </div>
                          <div className="text-center lg:text-left">
                            <div className="text-sm text-muted-foreground">Anggaran</div>
                            <div className="font-semibold text-foreground">{activity?.budget}</div>
                          </div>
                          <div className="text-center lg:text-left">
                            <div className="text-sm text-muted-foreground">Peserta</div>
                            <div className="font-semibold text-foreground">{activity?.participants} orang</div>
                          </div>
                          <div className="text-center lg:text-left">
                            <div className="text-sm text-muted-foreground">Lokasi</div>
                            <div className="font-semibold text-foreground">{activity?.location}</div>
                          </div>
                        </div>
                        
                        {/* Documents */}
                        <div className="mb-4">
                          <div className="text-sm text-muted-foreground mb-2">Dokumen Terkait:</div>
                          <div className="flex flex-wrap gap-2">
                            {activity?.documents?.map((doc, docIndex) => (
                              <span
                                key={docIndex}
                                className="inline-flex items-center gap-1 px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs"
                              >
                                <Icon name="FileText" size={12} />
                                {doc}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" size="sm" iconName="Eye" iconPosition="left">
                            Lihat Detail
                          </Button>
                          <Button variant="ghost" size="sm" iconName="Download" iconPosition="left">
                            Unduh Laporan
                          </Button>
                          <Button variant="ghost" size="sm" iconName="Share2" iconPosition="left">
                            Bagikan
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredActivities?.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Calendar" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Tidak ada kegiatan ditemukan
            </h3>
            <p className="text-muted-foreground">
              Coba ubah filter tahun atau kategori untuk melihat kegiatan lainnya
            </p>
          </div>
        )}

        {/* Load More */}
        {filteredActivities?.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" iconName="ChevronDown" iconPosition="right">
              Muat Kegiatan Lainnya
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityTimeline;