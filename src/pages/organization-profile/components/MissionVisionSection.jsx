import React from 'react';
import Icon from '../../../components/AppIcon';

const MissionVisionSection = () => {
  const values = [
    {
      icon: 'Eye',
      title: 'Transparansi',
      description: 'Keterbukaan dalam setiap proses dan keputusan organisasi untuk membangun kepercayaan publik.'
    },
    {
      icon: 'Zap',
      title: 'Efisiensi',
      description: 'Mengoptimalkan sumber daya dan proses untuk mencapai hasil maksimal dengan cara yang berkelanjutan.'
    },
    {
      icon: 'Heart',
      title: 'Koneksi Manusia',
      description: 'Mengutamakan hubungan interpersonal yang bermakna dalam setiap aspek kerja organisasi.'
    },
    {
      icon: 'Lightbulb',
      title: 'Inovasi',
      description: 'Terus berinovasi dan beradaptasi dengan perkembangan teknologi dan kebutuhan masyarakat.'
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container-brand">
        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Mission */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 text-brand-primary">
              <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Target" size={24} />
              </div>
              <h2 className="text-2xl font-bold">Misi Kami</h2>
            </div>
            <div className="bg-card rounded-xl p-8 border border-border">
              <p className="text-lg text-foreground leading-relaxed mb-6">
                Memberdayakan organisasi dan komunitas melalui solusi teknologi yang inovatif, 
                transparan, dan berkelanjutan untuk menciptakan dampak positif bagi masyarakat Indonesia.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Icon name="CheckCircle" size={20} className="text-success mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">Mengembangkan platform digital yang mudah digunakan</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Icon name="CheckCircle" size={20} className="text-success mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">Meningkatkan transparansi dan akuntabilitas organisasi</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Icon name="CheckCircle" size={20} className="text-success mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">Memfasilitasi kolaborasi yang efektif antar anggota</span>
                </div>
              </div>
            </div>
          </div>

          {/* Vision */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 text-brand-primary">
              <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Eye" size={24} />
              </div>
              <h2 className="text-2xl font-bold">Visi Kami</h2>
            </div>
            <div className="bg-card rounded-xl p-8 border border-border">
              <p className="text-lg text-foreground leading-relaxed mb-6">
                Menjadi pelopor transformasi digital organisasi di Indonesia yang menginspirasi 
                transparansi, efisiensi, dan inovasi berkelanjutan.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Icon name="Star" size={20} className="text-warning mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">Standar baru dalam manajemen organisasi digital</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Icon name="Star" size={20} className="text-warning mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">Ekosistem kolaboratif yang berkelanjutan</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Icon name="Star" size={20} className="text-warning mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">Dampak positif yang terukur bagi masyarakat</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Nilai-Nilai Kami</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Prinsip-prinsip fundamental yang memandu setiap langkah dan keputusan dalam perjalanan organisasi kami.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values?.map((value, index) => (
            <div key={index} className="group">
              <div className="bg-card rounded-xl p-6 border border-border hover:shadow-brand-lg transition-all duration-300 hover:-translate-y-1 h-full">
                <div className="w-16 h-16 bg-brand-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-primary/20 transition-colors">
                  <Icon name={value?.icon} size={32} className="text-brand-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{value?.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;