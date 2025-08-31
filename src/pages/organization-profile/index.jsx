import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import MissionVisionSection from './components/MissionVisionSection';
import TimelineSection from './components/TimelineSection';
import LeadershipSection from './components/LeadershipSection';
import ImpactSection from './components/ImpactSection';

const OrganizationProfile = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Profil Organisasi - OrganiFlow | Membangun Masa Depan Bersama Inovasi</title>
        <meta 
          name="description" 
          content="Pelajari lebih lanjut tentang OrganiFlow - organisasi progresif yang menggabungkan tradisi dengan inovasi untuk menciptakan solusi berkelanjutan bagi kemajuan masyarakat Indonesia." 
        />
        <meta name="keywords" content="profil organisasi, OrganiFlow, inovasi, transformasi digital, manajemen organisasi, Indonesia" />
        <meta property="og:title" content="Profil Organisasi - OrganiFlow" />
        <meta property="og:description" content="Organisasi progresif yang memimpin transformasi digital dan inovasi berkelanjutan di Indonesia." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/organization-profile" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <HeroSection />
          <MissionVisionSection />
          <TimelineSection />
          <LeadershipSection />
          <ImpactSection />
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-border py-8">
          <div className="container-brand">
            <div className="text-center text-muted-foreground">
              <p>&copy; {new Date()?.getFullYear()} OrganiFlow. Semua hak dilindungi undang-undang.</p>
              <p className="text-sm mt-2">Membangun masa depan organisasi yang lebih baik bersama teknologi dan inovasi.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default OrganizationProfile;