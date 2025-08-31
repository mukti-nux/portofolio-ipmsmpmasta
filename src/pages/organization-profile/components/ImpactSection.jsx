import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';

const ImpactSection = () => {
  const impactData = [
    { year: '2020', members: 150, programs: 12, partners: 45 },
    { year: '2021', members: 250, programs: 18, partners: 78 },
    { year: '2022', members: 350, programs: 25, partners: 120 },
    { year: '2023', members: 450, programs: 35, partners: 180 },
    { year: '2024', members: 500, programs: 50, partners: 200 }
  ];

  const programDistribution = [
    { name: 'Teknologi', value: 35, color: '#1E40AF' },
    { name: 'Pendidikan', value: 25, color: '#0F766E' },
    { name: 'Sosial', value: 20, color: '#DC2626' },
    { name: 'Ekonomi', value: 15, color: '#D97706' },
    { name: 'Lingkungan', value: 5, color: '#059669' }
  ];

  const achievements = [
    {
      icon: 'Users',
      title: '500+ Anggota Aktif',
      description: 'Komunitas profesional yang terus berkembang',
      color: 'bg-blue-500'
    },
    {
      icon: 'Target',
      title: '50+ Program Sukses',
      description: 'Inisiatif yang memberikan dampak nyata',
      color: 'bg-green-500'
    },
    {
      icon: 'Building2',
      title: '200+ Organisasi Mitra',
      description: 'Jaringan kolaborasi yang kuat',
      color: 'bg-purple-500'
    },
    {
      icon: 'Award',
      title: '15+ Penghargaan',
      description: 'Pengakuan atas kontribusi dan inovasi',
      color: 'bg-orange-500'
    }
  ];

  const socialProof = [
    {
      type: 'Media',
      title: 'Liputan Kompas',
      description: 'OrganiFlow: Pelopor Transformasi Digital Organisasi',
      date: '15 Agustus 2024',
      icon: 'Newspaper'
    },
    {
      type: 'Penghargaan',
      title: 'Indonesia Digital Innovation Award 2024',
      description: 'Kategori Best Organizational Management Platform',
      date: '10 Juli 2024',
      icon: 'Trophy'
    },
    {
      type: 'Kemitraan',
      title: 'MoU dengan Kementerian BUMN',
      description: 'Kolaborasi pengembangan sistem manajemen digital',
      date: '5 Juni 2024',
      icon: 'Handshake'
    },
    {
      type: 'Sertifikasi',
      title: 'ISO 27001:2013',
      description: 'Sertifikasi keamanan informasi internasional',
      date: '20 Mei 2024',
      icon: 'Shield'
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container-brand">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">Dampak & Pencapaian</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Melalui inovasi dan kolaborasi, kami telah menciptakan dampak positif yang terukur 
            bagi komunitas dan ekosistem organisasi di Indonesia.
          </p>
        </div>

        {/* Key Achievements */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {achievements?.map((achievement, index) => (
            <div key={index} className="bg-card rounded-xl p-6 border border-border hover:shadow-brand-lg transition-all duration-300">
              <div className={`w-16 h-16 ${achievement?.color} rounded-xl flex items-center justify-center mb-4`}>
                <Icon name={achievement?.icon} size={32} color="white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{achievement?.title}</h3>
              <p className="text-muted-foreground">{achievement?.description}</p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Growth Chart */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center space-x-3 mb-6">
              <Icon name="TrendingUp" size={24} className="text-brand-primary" />
              <h3 className="text-xl font-semibold text-foreground">Pertumbuhan Organisasi</h3>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={impactData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="year" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#FFFFFF', 
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar dataKey="members" fill="#1E40AF" name="Anggota" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="programs" fill="#0F766E" name="Program" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Program Distribution */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center space-x-3 mb-6">
              <Icon name="PieChart" size={24} className="text-brand-primary" />
              <h3 className="text-xl font-semibold text-foreground">Distribusi Program</h3>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={programDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {programDistribution?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry?.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Partnership Growth */}
        <div className="bg-card rounded-xl p-6 border border-border mb-16">
          <div className="flex items-center space-x-3 mb-6">
            <Icon name="Network" size={24} className="text-brand-primary" />
            <h3 className="text-xl font-semibold text-foreground">Pertumbuhan Kemitraan</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={impactData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="year" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="partners" 
                  stroke="#DC2626" 
                  strokeWidth={3}
                  dot={{ fill: '#DC2626', strokeWidth: 2, r: 6 }}
                  name="Mitra Organisasi"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Social Proof */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-4">Pengakuan & Kemitraan</h3>
            <p className="text-muted-foreground">Pencapaian dan kolaborasi yang membanggakan</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {socialProof?.map((item, index) => (
              <div key={index} className="bg-card rounded-xl p-6 border border-border hover:shadow-brand-lg transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={item?.icon} size={24} className="text-brand-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="bg-brand-primary/10 text-brand-primary px-2 py-1 rounded text-xs font-medium">
                        {item?.type}
                      </span>
                      <span className="text-xs text-muted-foreground">{item?.date}</span>
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">{item?.title}</h4>
                    <p className="text-muted-foreground text-sm">{item?.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Bergabunglah dengan Perjalanan Kami</h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Jadilah bagian dari komunitas yang terus berinovasi dan menciptakan dampak positif 
            untuk kemajuan organisasi di Indonesia.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-brand-primary px-6 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors flex items-center space-x-2">
              <Icon name="UserPlus" size={20} />
              <span>Bergabung Sekarang</span>
            </button>
            <button className="border border-white/30 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors flex items-center space-x-2">
              <Icon name="Download" size={20} />
              <span>Unduh Laporan</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;