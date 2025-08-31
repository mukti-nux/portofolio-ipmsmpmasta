import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import MemberCard from './components/MemberCard';
import MemberFilters from './components/MemberFilters';
import MemberStats from './components/MemberStats';
import MemberModal from './components/MemberModal';
import QuickActions from './components/QuickActions';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const MemberManagementSuite = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [modalMode, setModalMode] = useState('view');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    role: '',
    department: '',
    sort: 'name_asc'
  });

  // Mock data for members
  const mockMembers = [
    {
      id: 1,
      name: "Dr. Sari Wijayanti",
      email: "sari.wijayanti@organiflow.id",
      phone: "+62 812-3456-7890",
      memberNumber: "ORG-2024-001",
      role: "admin",
      department: "executive",
      status: "active",
      joinDate: "15/01/2024",
      lastActivity: "2 jam lalu",
      documentsCount: 24,
      contributionScore: 95,
      isOnline: true,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      activities: [
        { icon: "FileText", description: "Mengupload dokumen laporan keuangan Q3", timestamp: "2 jam lalu" },
        { icon: "Users", description: "Menyetujui 3 anggota baru", timestamp: "1 hari lalu" },
        { icon: "MessageSquare", description: "Mengirim pengumuman ke semua anggota", timestamp: "2 hari lalu" }
      ],
      documents: [
        { name: "Laporan Keuangan Q3 2024", date: "28/08/2024" },
        { name: "Proposal Kegiatan Tahunan", date: "25/08/2024" }
      ]
    },
    {
      id: 2,
      name: "Ahmad Rizki Pratama",
      email: "ahmad.rizki@organiflow.id",
      phone: "+62 813-9876-5432",
      memberNumber: "ORG-2024-002",
      role: "secretary",
      department: "operations",
      status: "active",
      joinDate: "20/01/2024",
      lastActivity: "1 hari lalu",
      documentsCount: 18,
      contributionScore: 88,
      isOnline: false,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      activities: [
        { icon: "Calendar", description: "Menjadwalkan rapat bulanan", timestamp: "1 hari lalu" },
        { icon: "FileText", description: "Memperbarui notulen rapat", timestamp: "3 hari lalu" }
      ],
      documents: [
        { name: "Notulen Rapat Agustus 2024", date: "30/08/2024" }
      ]
    },
    {
      id: 3,
      name: "Indira Sari Dewi",
      email: "indira.sari@organiflow.id",
      phone: "+62 814-5555-6666",
      memberNumber: "ORG-2024-003",
      role: "treasurer",
      department: "finance",
      status: "active",
      joinDate: "10/02/2024",
      lastActivity: "3 jam lalu",
      documentsCount: 31,
      contributionScore: 92,
      isOnline: true,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      activities: [
        { icon: "DollarSign", description: "Memproses pembayaran iuran anggota", timestamp: "3 jam lalu" },
        { icon: "Calculator", description: "Menyelesaikan rekonsiliasi bank", timestamp: "1 hari lalu" }
      ],
      documents: [
        { name: "Laporan Kas Agustus 2024", date: "31/08/2024" },
        { name: "Rekonsiliasi Bank Agustus", date: "31/08/2024" }
      ]
    },
    {
      id: 4,
      name: "Budi Santoso",
      email: "budi.santoso@organiflow.id",
      phone: "+62 815-7777-8888",
      memberNumber: "ORG-2024-004",
      role: "member",
      department: "marketing",
      status: "pending",
      joinDate: "25/08/2024",
      lastActivity: "5 hari lalu",
      documentsCount: 2,
      contributionScore: 45,
      isOnline: false,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      activities: [
        { icon: "UserPlus", description: "Mendaftar sebagai anggota baru", timestamp: "5 hari lalu" }
      ],
      documents: [
        { name: "Formulir Pendaftaran", date: "25/08/2024" }
      ]
    },
    {
      id: 5,
      name: "Maya Kusuma",
      email: "maya.kusuma@organiflow.id",
      phone: "+62 816-1111-2222",
      memberNumber: "ORG-2024-005",
      role: "member",
      department: "hr",
      status: "inactive",
      joinDate: "05/03/2024",
      lastActivity: "2 minggu lalu",
      documentsCount: 12,
      contributionScore: 67,
      isOnline: false,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      activities: [
        { icon: "Clock", description: "Status diubah menjadi tidak aktif", timestamp: "2 minggu lalu" }
      ],
      documents: [
        { name: "Laporan Kegiatan Maret", date: "31/03/2024" }
      ]
    },
    {
      id: 6,
      name: "Reza Firmansyah",
      email: "reza.firmansyah@organiflow.id",
      phone: "+62 817-3333-4444",
      memberNumber: "ORG-2024-006",
      role: "member",
      department: "operations",
      status: "active",
      joinDate: "12/04/2024",
      lastActivity: "6 jam lalu",
      documentsCount: 15,
      contributionScore: 78,
      isOnline: true,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      activities: [
        { icon: "CheckCircle", description: "Menyelesaikan tugas operasional", timestamp: "6 jam lalu" },
        { icon: "FileText", description: "Mengupload laporan mingguan", timestamp: "2 hari lalu" }
      ],
      documents: [
        { name: "Laporan Operasional Mingguan", date: "29/08/2024" }
      ]
    }
  ];

  const stats = {
    totalMembers: mockMembers?.length,
    activeMembers: mockMembers?.filter(m => m?.status === 'active')?.length,
    newMembers: mockMembers?.filter(m => {
      const joinDate = new Date(m.joinDate.split('/').reverse().join('-'));
      const oneMonthAgo = new Date();
      oneMonthAgo?.setMonth(oneMonthAgo?.getMonth() - 1);
      return joinDate > oneMonthAgo;
    })?.length,
    pendingMembers: mockMembers?.filter(m => m?.status === 'pending')?.length
  };

  useEffect(() => {
    setMembers(mockMembers);
    setFilteredMembers(mockMembers);
  }, []);

  useEffect(() => {
    let filtered = [...members];

    // Apply search filter
    if (filters?.search) {
      filtered = filtered?.filter(member =>
        member?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        member?.email?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        member?.memberNumber?.toLowerCase()?.includes(filters?.search?.toLowerCase())
      );
    }

    // Apply status filter
    if (filters?.status) {
      filtered = filtered?.filter(member => member?.status === filters?.status);
    }

    // Apply role filter
    if (filters?.role) {
      filtered = filtered?.filter(member => member?.role === filters?.role);
    }

    // Apply department filter
    if (filters?.department) {
      filtered = filtered?.filter(member => member?.department === filters?.department);
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      switch (filters?.sort) {
        case 'name_asc':
          return a?.name?.localeCompare(b?.name);
        case 'name_desc':
          return b?.name?.localeCompare(a?.name);
        case 'join_date_desc':
          return new Date(b.joinDate.split('/').reverse().join('-')) - new Date(a.joinDate.split('/').reverse().join('-'));
        case 'join_date_asc':
          return new Date(a.joinDate.split('/').reverse().join('-')) - new Date(b.joinDate.split('/').reverse().join('-'));
        case 'activity_desc':
          return b?.contributionScore - a?.contributionScore;
        case 'contribution_desc':
          return b?.contributionScore - a?.contributionScore;
        default:
          return 0;
      }
    });

    setFilteredMembers(filtered);
  }, [members, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      status: '',
      role: '',
      department: '',
      sort: 'name_asc'
    });
  };

  const handleViewMember = (member) => {
    setSelectedMember(member);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleEditMember = (member) => {
    setSelectedMember(member);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleAddMember = () => {
    setSelectedMember(null);
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleMessageMember = (member) => {
    console.log('Sending message to:', member?.name);
    // Implement messaging logic
  };

  const handleExport = () => {
    console.log('Exporting member data...');
    // Implement export logic
  };

  const handleBulkImport = () => {
    console.log('Opening bulk import...');
    // Implement bulk import logic
  };

  const handleSendMessage = () => {
    console.log('Opening message composer...');
    // Implement message sending logic
  };

  const handleGenerateReport = () => {
    console.log('Generating member report...');
    // Implement report generation logic
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="container-brand py-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Manajemen Anggota</h1>
              <p className="text-muted-foreground mt-2">
                Kelola data anggota, peran, dan aktivitas organisasi dengan mudah
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center bg-muted rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
                  }`}
                >
                  <Icon name="Grid3X3" size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
                  }`}
                >
                  <Icon name="List" size={18} />
                </button>
              </div>
              <Button iconName="Plus" onClick={handleAddMember}>
                Tambah Anggota
              </Button>
            </div>
          </div>

          {/* Statistics */}
          <MemberStats stats={stats} />

          {/* Quick Actions */}
          <QuickActions
            onAddMember={handleAddMember}
            onBulkImport={handleBulkImport}
            onSendMessage={handleSendMessage}
            onGenerateReport={handleGenerateReport}
          />

          {/* Filters */}
          <MemberFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            onExport={handleExport}
            totalMembers={members?.length}
            filteredCount={filteredMembers?.length}
          />

          {/* Members Grid/List */}
          <div className="bg-card border border-border rounded-lg p-6">
            {filteredMembers?.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Tidak ada anggota ditemukan</h3>
                <p className="text-muted-foreground mb-4">
                  Coba ubah filter pencarian atau tambah anggota baru
                </p>
                <Button iconName="Plus" onClick={handleAddMember}>
                  Tambah Anggota Pertama
                </Button>
              </div>
            ) : (
              <div className={
                viewMode === 'grid' ?'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' :'space-y-4'
              }>
                {filteredMembers?.map((member) => (
                  <MemberCard
                    key={member?.id}
                    member={member}
                    onView={handleViewMember}
                    onEdit={handleEditMember}
                    onMessage={handleMessageMember}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredMembers?.length > 0 && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-muted-foreground">
                Menampilkan {filteredMembers?.length} dari {members?.length} anggota
              </p>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" iconName="ChevronLeft" disabled>
                  Sebelumnya
                </Button>
                <Button variant="outline" size="sm" disabled>
                  1
                </Button>
                <Button variant="outline" size="sm" iconName="ChevronRight" disabled>
                  Selanjutnya
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Member Modal */}
      <MemberModal
        member={selectedMember}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
      />
    </div>
  );
};

export default MemberManagementSuite;