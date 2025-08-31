import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const MemberSpotlight = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const members = [
    {
      id: 1,
      name: "Holy Safura Nurin Hasana",
      position: "Ketua Organisasi periode 24/25",
      avatar: "https://github.com/mukti-nux/portof-asset/blob/main/0116430408.png?raw=true",
      achievement: "Meningkatkan partisipasi anggota sebesar 40% melalui inisiatif keterlibatan komunitas dan program pelatihan kepemimpinan",
      department: "Kepemimpinan",
      experience: "2 tahun",
      specialization: "Manajemen Strategis"
    },
    {
      id: 2,
      name: "Zumila Dewi Safitri",
      position: "Sekretaris Umum",
      avatar: "https://github.com/mukti-nux/portof-asset/blob/main/0103508222.png?raw=true",
      achievement: "Implementasi sistem dokumentasi digital yang mengurangi penggunaan kertas hingga 30% dan mempercepat akses informasi",
      department: "Sekretariat",
      experience: "2 tahun",
      specialization: "Administrasi & Organisasi"
    },
    {
      id: 3,
      name: "Firda Aulia Falevy",
      position: "Bendahara Umum",
      avatar: "https://github.com/mukti-nux/portof-asset/blob/main/3116331997.png?raw=true",
      achievement: "Management keuangan yang transparan dan akurat, meningkatkan kepercayaan anggota terhadap pengelolaan dana organisasi",
      department: "Keuangan",
      experience: "2 tahun",
      specialization: "Financial Planning & Analysis"
    },
    {
      id: 4,
      name: "Hasan Mukti Abdulloh",
      position: "Ketua PIP",
      avatar: "https://github.com/mukti-nux/portof-asset/blob/main/0102419866%20(1).png?raw=true",
      achievement: "Pengembangan website organisasi yang meningkatkan visibilitas online dan interaksi anggota",
      department: "Teknologi Informasi",
      experience: "2 tahun",
      specialization: "Web Development, Graphic Design & AI"
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % members?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, members?.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % members?.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + members?.length) % members?.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted">
      <div className="container-brand">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-medium mb-4">
            <Icon name="Star" size={16} />
            <span>Anggota yang Terlibat pembangunan Media Digital</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Spotlight <span className="text-primary">Anggota</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Mengenal lebih dekat para anggota yang berkontribusi luar biasa dalam memajukan organisasi
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Main Carousel */}
          <div className="relative overflow-hidden rounded-2xl bg-card border border-border shadow-brand-lg">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {members?.map((member, index) => (
                <div key={member?.id} className="w-full flex-shrink-0">
                  <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
                    {/* Member Image */}
                    <div className="relative">
                      <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
                        <Image
                          src={member?.avatar}
                          alt={member?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Achievement Badge */}
                      <div className="absolute -bottom-4 -right-4 bg-brand-accent text-white p-4 rounded-xl shadow-lg">
                        <Icon name="Award" size={24} />
                      </div>
                    </div>

                    {/* Member Info */}
                    <div className="flex flex-col justify-center space-y-6">
                      <div>
                        <h3 className="text-3xl font-bold text-foreground mb-2">
                          {member?.name}
                        </h3>
                        <p className="text-xl text-primary font-semibold mb-4">
                          {member?.position}
                        </p>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                          {member?.achievement}
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-muted rounded-lg">
                          <Icon name="Building2" size={20} className="mx-auto mb-2 text-primary" />
                          <div className="text-sm font-medium text-foreground">Divisi</div>
                          <div className="text-xs text-muted-foreground">{member?.department}</div>
                        </div>
                        <div className="text-center p-4 bg-muted rounded-lg">
                          <Icon name="Clock" size={20} className="mx-auto mb-2 text-primary" />
                          <div className="text-sm font-medium text-foreground">Pengalaman</div>
                          <div className="text-xs text-muted-foreground">{member?.experience}</div>
                        </div>
                        <div className="text-center p-4 bg-muted rounded-lg">
                          <Icon name="Target" size={20} className="mx-auto mb-2 text-primary" />
                          <div className="text-sm font-medium text-foreground">Keahlian</div>
                          <div className="text-xs text-muted-foreground">{member?.specialization}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-foreground hover:bg-white transition-colors z-10"
          >
            <Icon name="ChevronLeft" size={20} />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-foreground hover:bg-white transition-colors z-10"
          >
            <Icon name="ChevronRight" size={20} />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {members?.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-primary w-8' :'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>

          {/* Auto-play Control */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name={isAutoPlaying ? "Pause" : "Play"} size={16} />
              <span>{isAutoPlaying ? "Jeda Otomatis" : "Putar Otomatis"}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MemberSpotlight;