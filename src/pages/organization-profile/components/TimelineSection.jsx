import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const TimelineSection = () => {
  const [activeYear, setActiveYear] = useState(2025);

  const timelineData = [
    {
      year: '18 jan 2025',
      title: 'Pelantikan Organisasi',
      description: 'Pelantikan resmi anggota IPM SMP Muhammadiyah Tempuran periode 2024-2025.',
      achievements: ['Tim pendiri 24 orang', 'Konsep awal keorganisasian', 'Riset kebutuhan organisasi'],
      icon: 'Rocket',
      color: 'bg-blue-500'
    },
    {
      year: 2012,
      title: 'Ekspansi Regional',
      description: 'Memperluas jangkauan ke berbagai daerah di Indonesia dengan membuka cabang regional.',
      achievements: ['10 cabang regional', '100+ anggota aktif', 'Program pelatihan nasional'],
      icon: 'MapPin',
      color: 'bg-green-500'
    },
    {
      year: 2016,
      title: 'Transformasi Digital',
      description: 'Meluncurkan platform digital pertama untuk manajemen organisasi modern.',
      achievements: ['Platform web pertama', 'Sistem manajemen terintegrasi', 'Sertifikasi ISO 9001'],
      icon: 'Monitor',
      color: 'bg-purple-500'
    },
    {
      year: 2019,
      title: 'Inovasi AI',
      description: 'Mengintegrasikan kecerdasan buatan untuk meningkatkan efisiensi operasional.',
      achievements: ['Chatbot AI pertama', 'Analitik prediktif', 'Otomasi workflow'],
      icon: 'Brain',
      color: 'bg-orange-500'
    },
    {
      year: 2022,
      title: 'Keberlanjutan',
      description: 'Fokus pada program berkelanjutan dan dampak sosial yang terukur.',
      achievements: ['Program CSR nasional', 'Sertifikasi B-Corp', '1000+ organisasi mitra'],
      icon: 'Leaf',
      color: 'bg-emerald-500'
    },
    {
      year: 2024,
      title: 'Era Baru',
      description: 'Meluncurkan OrganiFlow 3.0 dengan teknologi terdepan dan fitur kolaboratif.',
      achievements: ['Platform 3.0 launch', 'Mobile app native', 'Integrasi blockchain'],
      icon: 'Sparkles',
      color: 'bg-brand-accent'
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container-brand">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">Perjalanan Kami</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dari visi sederhana hingga menjadi pelopor transformasi digital organisasi di Indonesia.
          </p>
        </div>

        {/* Timeline Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {timelineData?.map((item) => (
            <button
              key={item?.year}
              onClick={() => setActiveYear(item?.year)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeYear === item?.year
                  ? 'bg-brand-primary text-white shadow-brand'
                  : 'bg-card text-muted-foreground hover:bg-brand-primary/10 hover:text-brand-primary border border-border'
              }`}
            >
              {item?.year}
            </button>
          ))}
        </div>

        {/* Timeline Content */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-border"></div>

          <div className="space-y-12">
            {timelineData?.map((item, index) => (
              <div
                key={item?.year}
                className={`transition-all duration-500 ${
                  activeYear === item?.year ? 'opacity-100 scale-100' : 'opacity-50 scale-95'
                }`}
              >
                <div className={`grid lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 0 ? '' : 'lg:grid-flow-col-dense'
                }`}>
                  {/* Content */}
                  <div className={`space-y-6 ${index % 2 === 0 ? '' : 'lg:col-start-2'}`}>
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 ${item?.color} rounded-xl flex items-center justify-center shadow-lg`}>
                        <Icon name={item?.icon} size={28} color="white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-brand-primary">{item?.year}</div>
                        <h3 className="text-xl font-semibold text-foreground">{item?.title}</h3>
                      </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {item?.description}
                    </p>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground">Pencapaian Utama:</h4>
                      <div className="space-y-2">
                        {item?.achievements?.map((achievement, idx) => (
                          <div key={idx} className="flex items-center space-x-3">
                            <Icon name="CheckCircle" size={16} className="text-success flex-shrink-0" />
                            <span className="text-muted-foreground">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Visual Element */}
                  <div className={`relative ${index % 2 === 0 ? '' : 'lg:col-start-1'}`}>
                    <div className="bg-card rounded-2xl p-8 border border-border shadow-brand">
                      <div className="aspect-video bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 rounded-xl flex items-center justify-center">
                        <div className={`w-24 h-24 ${item?.color} rounded-full flex items-center justify-center shadow-xl`}>
                          <Icon name={item?.icon} size={48} color="white" />
                        </div>
                      </div>
                    </div>

                    {/* Timeline Dot */}
                    <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className={`w-6 h-6 ${item?.color} rounded-full border-4 border-background shadow-lg ${
                        index % 2 === 0 ? '-ml-12' : 'ml-12'
                      }`}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Stats */}
        <div className="mt-20 bg-card rounded-2xl p-8 border border-border">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">Dampak Kami Hari Ini</h3>
            <p className="text-muted-foreground">Pencapaian terkini yang terus berkembang</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Anggota Aktif</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-primary mb-2">1,200+</div>
              <div className="text-sm text-muted-foreground">Organisasi Mitra</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Program Sukses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-primary mb-2">15+</div>
              <div className="text-sm text-muted-foreground">Tahun Pengalaman</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;