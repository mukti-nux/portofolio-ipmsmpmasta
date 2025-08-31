import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const LeadershipSection = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  const leadershipTeam = [
    {
      id: 1,
      name: 'Dr. Sari Wijayanti',
      position: 'Ketua Umum',
      department: 'Kepemimpinan Strategis',
      experience: '15+ tahun',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop',
      bio: `Dr. Sari adalah visioner yang memimpin transformasi digital OrganiFlow. Dengan latar belakang teknologi informasi dan manajemen strategis, beliau telah membawa organisasi mencapai berbagai pencapaian gemilang.`,
      expertise: ['Transformasi Digital', 'Manajemen Strategis', 'Kepemimpinan Organisasi'],
      achievements: [
        'Memimpin transformasi digital organisasi sejak 2016',
        'Meraih penghargaan "Digital Leader of the Year 2023"',
        'Penulis 3 buku tentang manajemen organisasi modern'
      ],
      contact: {
        email: 'sari.wijayanti@organiflow.id',
        linkedin: 'sari-wijayanti'
      }
    },
    {
      id: 2,
      name: 'Budi Santoso, M.T.',
      position: 'Wakil Ketua',
      department: 'Teknologi & Inovasi',
      experience: '12+ tahun',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      bio: `Budi adalah arsitek teknologi di balik platform OrganiFlow. Keahliannya dalam pengembangan sistem dan inovasi teknologi menjadi tulang punggung kemajuan organisasi.`,
      expertise: ['Arsitektur Sistem', 'AI & Machine Learning', 'Pengembangan Produk'],
      achievements: [
        'Mengembangkan platform OrganiFlow 3.0',
        'Memimpin integrasi AI dalam sistem organisasi',
        'Holder 5 paten teknologi manajemen digital'
      ],
      contact: {
        email: 'budi.santoso@organiflow.id',
        linkedin: 'budi-santoso-tech'
      }
    },
    {
      id: 3,
      name: 'Maya Kusuma, S.E., M.M.',
      position: 'Sekretaris Jenderal',
      department: 'Operasional & Administrasi',
      experience: '10+ tahun',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      bio: `Maya adalah tulang punggung operasional OrganiFlow. Dengan keahlian manajemen dan administrasi yang luar biasa, beliau memastikan semua proses berjalan dengan efisien.`,
      expertise: ['Manajemen Operasional', 'Administrasi Strategis', 'Pengembangan SOP'],
      achievements: [
        'Merancang sistem administrasi terintegrasi',
        'Meningkatkan efisiensi operasional hingga 40%',
        'Sertifikasi ISO 9001 Lead Auditor'
      ],
      contact: {
        email: 'maya.kusuma@organiflow.id',
        linkedin: 'maya-kusuma-ops'
      }
    },
    {
      id: 4,
      name: 'Ahmad Rizki, S.Kom.',
      position: 'Kepala Teknologi',
      department: 'Pengembangan Sistem',
      experience: '8+ tahun',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      bio: `Ahmad adalah pemimpin tim teknologi yang berdedikasi menghadirkan solusi inovatif. Keahliannya dalam pengembangan software menjadi kunci kesuksesan platform digital kami.`,
      expertise: ['Full-Stack Development', 'Cloud Architecture', 'DevOps'],
      achievements: [
        'Membangun infrastruktur cloud scalable',
        'Mengimplementasikan sistem keamanan berlapis',
        'Memimpin tim developer 20+ orang'
      ],
      contact: {
        email: 'ahmad.rizki@organiflow.id',
        linkedin: 'ahmad-rizki-dev'
      }
    }
  ];

  const advisoryBoard = [
    {
      name: 'Prof. Dr. Indira Sari',
      position: 'Penasihat Akademik',
      expertise: 'Manajemen Organisasi',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop'
    },
    {
      name: 'Ir. Bambang Wijaya',
      position: 'Penasihat Teknologi',
      expertise: 'Sistem Informasi',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop'
    },
    {
      name: 'Dra. Ratna Dewi',
      position: 'Penasihat Strategis',
      expertise: 'Kebijakan Publik',
      image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=300&h=300&fit=crop'
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container-brand">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">Tim Kepemimpinan</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dipimpin oleh para ahli berpengalaman yang berdedikasi menghadirkan inovasi 
            dan transformasi digital untuk kemajuan organisasi.
          </p>
        </div>

        {/* Leadership Team */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {leadershipTeam?.map((member) => (
            <div key={member?.id} className="group cursor-pointer" onClick={() => setSelectedMember(member)}>
              <div className="bg-card rounded-xl p-6 border border-border hover:shadow-brand-lg transition-all duration-300 hover:-translate-y-2">
                <div className="relative mb-6">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-brand-primary/20 group-hover:border-brand-primary/40 transition-colors">
                    <Image
                      src={member?.image}
                      alt={member?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} color="white" />
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <h3 className="font-semibold text-foreground text-lg">{member?.name}</h3>
                  <p className="text-brand-primary font-medium">{member?.position}</p>
                  <p className="text-sm text-muted-foreground">{member?.department}</p>
                  <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
                    <Icon name="Clock" size={14} />
                    <span>{member?.experience}</span>
                  </div>
                </div>

                <div className="mt-4 flex justify-center space-x-2">
                  <button className="w-8 h-8 bg-brand-primary/10 hover:bg-brand-primary hover:text-white rounded-full flex items-center justify-center transition-colors">
                    <Icon name="Mail" size={14} />
                  </button>
                  <button className="w-8 h-8 bg-brand-primary/10 hover:bg-brand-primary hover:text-white rounded-full flex items-center justify-center transition-colors">
                    <Icon name="Linkedin" size={14} />
                  </button>
                  <button className="w-8 h-8 bg-brand-primary/10 hover:bg-brand-primary hover:text-white rounded-full flex items-center justify-center transition-colors">
                    <Icon name="Info" size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Advisory Board */}
        <div className="bg-muted/30 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">Dewan Penasihat</h3>
            <p className="text-muted-foreground">Para ahli yang memberikan panduan strategis</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {advisoryBoard?.map((advisor, index) => (
              <div key={index} className="bg-card rounded-lg p-6 border border-border text-center">
                <div className="w-16 h-16 mx-auto rounded-full overflow-hidden mb-4 border-2 border-brand-primary/20">
                  <Image
                    src={advisor?.image}
                    alt={advisor?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-semibold text-foreground mb-1">{advisor?.name}</h4>
                <p className="text-sm text-brand-primary mb-1">{advisor?.position}</p>
                <p className="text-xs text-muted-foreground">{advisor?.expertise}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Member Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-brand-primary/20">
                    <Image
                      src={selectedMember?.image}
                      alt={selectedMember?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{selectedMember?.name}</h3>
                    <p className="text-brand-primary font-medium">{selectedMember?.position}</p>
                    <p className="text-sm text-muted-foreground">{selectedMember?.department}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="w-8 h-8 bg-muted hover:bg-destructive hover:text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <Icon name="X" size={16} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Tentang</h4>
                  <p className="text-muted-foreground leading-relaxed">{selectedMember?.bio}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3">Keahlian</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember?.expertise?.map((skill, index) => (
                      <span key={index} className="bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3">Pencapaian</h4>
                  <div className="space-y-2">
                    {selectedMember?.achievements?.map((achievement, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <Icon name="Award" size={16} className="text-warning mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground text-sm">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4 pt-4 border-t border-border">
                  <button className="flex items-center space-x-2 bg-brand-primary text-white px-4 py-2 rounded-lg hover:bg-brand-primary/90 transition-colors">
                    <Icon name="Mail" size={16} />
                    <span>Kirim Email</span>
                  </button>
                  <button className="flex items-center space-x-2 bg-muted text-foreground px-4 py-2 rounded-lg hover:bg-muted/80 transition-colors">
                    <Icon name="Linkedin" size={16} />
                    <span>LinkedIn</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default LeadershipSection;