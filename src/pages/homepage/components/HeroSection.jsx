import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <section className="relative bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-primary min-h-screen flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-xl"></div>
        <div className="absolute bottom-40 right-32 w-48 h-48 bg-white rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="container-brand relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
                <Icon name="Sparkles" size={16} />
                <span>Pengenalan Organisasi</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Transformasi Digital untuk{' '}
                <span className="text-brand-accent">Organisasi Modern</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed">
                PR IPM SMP Muhammadiyah Tempuran melangkah lebih jauh dengan solusi digital kami yang inovatif, dirancang khusus untuk meningkatkan efisiensi dan keterlibatan anggota. Menggunakan basis Vite dan React membuat akses lebih mudah dan cepat.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => handleNavigation('/organization-profile')}
                iconName="ArrowRight"
                iconPosition="right"
                className="bg-white text-brand-primary hover:bg-white/90"
              >
                Jelajahi Organisasi
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleNavigation('/member-management-suite')}
                iconName="Users"
                iconPosition="left"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Portal Anggota
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl font-bold">24+</div>
                <div className="text-white/80 text-sm">Anggota Aktif</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">89%</div>
                <div className="text-white/80 text-sm">Kepuasan</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-white/80 text-sm">Dukungan CS</div>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-brand-accent rounded-lg flex items-center justify-center">
                      <Icon name="BarChart3" size={24} color="white" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">Dashboard Organisasi</div>
                      <div className="text-white/70 text-sm">Real-time Analytics</div>
                    </div>
                  </div>
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">Dokumen Diproses</span>
                    <span className="text-white font-semibold">247</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-brand-accent h-2 rounded-full w-3/4"></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-lg p-4 text-center">
                    <Icon name="FileText" size={24} className="mx-auto mb-2 text-white" />
                    <div className="text-white font-semibold">Sekretariat</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 text-center">
                    <Icon name="Users" size={24} className="mx-auto mb-2 text-white" />
                    <div className="text-white font-semibold">Anggota</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center animate-bounce">
              <Icon name="Zap" size={24} color="white" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Icon name="Shield" size={16} color="white" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <Icon name="ChevronDown" size={24} />
      </div>
    </section>
  );
};

export default HeroSection;