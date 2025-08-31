import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UserPathways = () => {
  const navigate = useNavigate();

  const pathways = [
    {
      id: 'public',
      title: 'Jelajahi Organisasi',
      subtitle: 'Untuk Masyarakat Umum',
      description: 'Pelajari lebih lanjut tentang visi, misi, dan dampak organisasi kami dalam memajukan komunitas.',
      icon: 'Globe',
      color: 'from-blue-500 to-blue-600',
      features: [
        'Profil lengkap organisasi',
        'Galeri kegiatan dan pencapaian',
        'Dokumen publik dan transparansi',
        'Kontak dan informasi kerjasama'
      ],
      ctaText: 'Mulai Jelajahi',
      route: '/organization-profile',
      stats: { label: 'Pengunjung Bulanan', value: '2.5K+' }
    },
    {
      id: 'member',
      title: 'Portal Anggota',
      subtitle: 'Untuk Anggota Terdaftar',
      description: 'Akses lengkap ke sistem manajemen anggota, dokumen internal, dan layanan eksklusif.',
      icon: 'Users',
      color: 'from-green-500 to-green-600',
      features: [
        'Dashboard personal anggota',
        'Akses dokumen dan arsip',
        'Sistem komunikasi internal',
        'Tracking status keanggotaan'
      ],
      ctaText: 'Masuk Portal',
      route: '/member-management-suite',
      stats: { label: 'Anggota Aktif', value: '150+' }
    },
    {
      id: 'admin',
      title: 'Dashboard Admin',
      subtitle: 'Untuk Administrator',
      description: 'Panel kontrol lengkap untuk mengelola seluruh aspek organisasi dengan efisiensi maksimal.',
      icon: 'Settings',
      color: 'from-purple-500 to-purple-600',
      features: [
        'Manajemen anggota dan peran',
        'Kontrol dokumen dan arsip',
        'Analytics dan pelaporan',
        'Konfigurasi sistem'
      ],
      ctaText: 'Buka Dashboard',
      route: '/admin-dashboard',
      stats: { label: 'Admin Aktif', value: '12' }
    }
  ];

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <section className="py-20 bg-background">
      <div className="container-brand">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-brand-accent/10 text-brand-accent rounded-full px-4 py-2 text-sm font-medium mb-4">
            <Icon name="Route" size={16} />
            <span>Jalur Akses</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Pilih <span className="text-primary">Jalur Anda</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Setiap pengguna memiliki kebutuhan yang berbeda. Temukan jalur yang tepat untuk mengakses layanan kami.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {pathways?.map((pathway, index) => (
            <div
              key={pathway?.id}
              className="group relative bg-card border border-border rounded-2xl p-8 hover:shadow-brand-lg transition-all duration-300 hover:-translate-y-2"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${pathway?.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
              
              {/* Header */}
              <div className="relative z-10">
                <div className={`w-16 h-16 bg-gradient-to-br ${pathway?.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={pathway?.icon} size={28} color="white" />
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {pathway?.title}
                  </h3>
                  <p className="text-primary font-semibold mb-3">
                    {pathway?.subtitle}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {pathway?.description}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {pathway?.features?.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <div className={`w-2 h-2 bg-gradient-to-r ${pathway?.color} rounded-full flex-shrink-0`}></div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="bg-muted rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{pathway?.stats?.label}</span>
                    <span className="text-lg font-bold text-foreground">{pathway?.stats?.value}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  variant="default"
                  size="lg"
                  fullWidth
                  onClick={() => handleNavigation(pathway?.route)}
                  iconName="ArrowRight"
                  iconPosition="right"
                  className="group-hover:shadow-lg transition-shadow duration-300"
                >
                  {pathway?.ctaText}
                </Button>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <Icon name={pathway?.icon} size={64} className="text-foreground" />
              </div>
              
              {/* Index Number */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-brand-accent text-white rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-brand-primary to-brand-secondary rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Butuh Bantuan Memilih Jalur yang Tepat?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Tim AI assistant kami siap membantu Anda menemukan jalur akses yang paling sesuai dengan kebutuhan Anda.
            </p>
            <Button
              variant="secondary"
              size="lg"
              iconName="MessageCircle"
              iconPosition="left"
              className="bg-white text-brand-primary hover:bg-white/90"
            >
              Tanya AI Assistant
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserPathways;