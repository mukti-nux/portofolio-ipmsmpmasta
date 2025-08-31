import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import MemberSpotlight from './components/MemberSpotlight';
import UserPathways from './components/UserPathways';
import TransparencySection from './components/TransparencySection';
import AIAssistant from './components/AIAssistant';

const Homepage = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>OrganiFlow - Transformasi Digital Organisasi Modern</title>
        <meta
          name="description"
          content="Platform manajemen organisasi terdepan yang menggabungkan transparansi dengan efisiensi. Sistem digital terintegrasi untuk organisasi modern di Indonesia."
        />
        <meta
          name="keywords"
          content="manajemen organisasi, sistem digital, transparansi, efisiensi, Indonesia, OrganiFlow"
        />
        <meta property="og:title" content="OrganiFlow - Transformasi Digital Organisasi Modern" />
        <meta
          property="og:description"
          content="Ekosistem digital yang memberdayakan setiap anggota organisasi dengan transparansi penuh dan efisiensi maksimal."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://organiflow.id/homepage" />
        <link rel="canonical" href="https://organiflow.id/homepage" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="pt-16">
          {/* Hero Section */}
          <HeroSection />

          {/* Member Spotlight */}
          <MemberSpotlight />

          {/* User Pathways */}
          <UserPathways />

          {/* Transparency Section */}
          <TransparencySection />
        </main>

        {/* AI Assistant */}
        <AIAssistant />

        {/* Footer */}
        <footer className="bg-card border-t border-border py-12">
          <div className="container-brand">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Brand */}
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  {/* Logo */}
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                    <img
                      src="/favicon.ico"
                      alt="logoUtama"
                      className="w-7 h-7 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-brand-primary">PR IPM SMP Muh Tempuran</h3>
                    <p className="text-sm text-muted-foreground">Morals in Motion, Kindness in Action</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Transformasi digital untuk organisasi modern yang mengutamakan transparansi,
                  efisiensi, dan pemberdayaan anggota melalui teknologi terdepan.
                </p>
                <div className="flex space-x-4">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                      <a href="https://maps.app.goo.gl/1ZmLqXQKaWFGze2w9" target="_blank" rel="noopener noreferrer">
                        <img
                          src="/logo/maps.png"
                          alt="logomaps"
                          className="w-7 h-7 object-contain"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                      <a href="https://www.instagram.com/ipm_smpmuhtempuran/?hl=en" target="_blank" rel="noopener noreferrer">
                        <img
                          src="/logo/ig.png"
                          alt="logoig"
                          className="w-7 h-7 object-contain"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                      <a href="https://wa.me/62081391442236" target="_blank" rel="noopener noreferrer">
                        <img
                          src="/logo/wa.png"
                          alt="logowa"
                          className="w-7 h-7 object-contain"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold text-foreground mb-4">Akses Cepat</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/organization-profile" className="text-muted-foreground hover:text-primary transition-colors">Profil Organisasi</a></li>
                  <li><a href="/member-management-suite" className="text-muted-foreground hover:text-primary transition-colors">Portal Anggota</a></li>
                  <li><a href="/secretariat-dashboard" className="text-muted-foreground hover:text-primary transition-colors">Sekretariat</a></li>
                  <li><a href="/transparency-reports" className="text-muted-foreground hover:text-primary transition-colors">Transparansi</a></li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="font-semibold text-foreground mb-4">Kontak</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>pripmsmpmuhtpr@gmail.com</li>
                  <li>(081) 0813-9144-2236</li>
                  <li>Jl. Magelang-Purworejo Km.10 Tempuran, Magelang 56172</li>
                  <li>Magelang, Indonesia</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} PR IPM SMP Muh Tempuran. Seluruh hak cipta dilindungi.
              </p>
              <div className="flex space-x-6 text-sm text-muted-foreground mt-4 md:mt-0">
                <a href="/privacy" className="hover:text-primary transition-colors">Kebijakan Privasi</a>
                <a href="/terms" className="hover:text-primary transition-colors">Syarat & Ketentuan</a>
                <a href="/help" className="hover:text-primary transition-colors">Bantuan</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Homepage;