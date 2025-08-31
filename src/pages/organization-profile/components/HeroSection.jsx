import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-primary min-h-[70vh] flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-white rounded-full"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 border border-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-white rounded-full"></div>
      </div>

      <div className="container-brand relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-white/80">
                <Icon name="Building2" size={24} />
                <span className="text-lg font-medium">Profil Organisasi</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                Membangun Masa Depan
                <span className="block text-brand-accent">Bersama Inovasi</span>
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-lg">
                OrganiFlow adalah organisasi progresif yang menggabungkan tradisi dengan inovasi, 
                menciptakan solusi berkelanjutan untuk kemajuan masyarakat Indonesia.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-accent">15+</div>
                <div className="text-sm text-white/80">Tahun Pengalaman</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-accent">500+</div>
                <div className="text-sm text-white/80">Anggota Aktif</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-accent">50+</div>
                <div className="text-sm text-white/80">Program Sukses</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="bg-brand-accent hover:bg-brand-accent/90 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2">
                <Icon name="Users" size={20} />
                <span>Bergabung dengan Kami</span>
              </button>
              <button className="border border-white/30 hover:bg-white/10 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2">
                <Icon name="FileText" size={20} />
                <span>Lihat Laporan</span>
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop"
                alt="Tim OrganiFlow sedang berkolaborasi"
                className="w-full h-80 object-cover rounded-xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-brand-accent text-white p-4 rounded-xl shadow-lg">
                <Icon name="Award" size={32} />
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-6 -left-6 bg-white text-brand-primary p-4 rounded-xl shadow-lg">
              <Icon name="Target" size={24} />
            </div>
            <div className="absolute -bottom-6 left-1/3 bg-white text-brand-primary p-3 rounded-full shadow-lg">
              <Icon name="Heart" size={20} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;