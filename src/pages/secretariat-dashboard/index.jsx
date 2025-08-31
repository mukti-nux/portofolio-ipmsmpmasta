import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import DocumentCard from './components/DocumentCard';
import DocumentFilters from './components/DocumentFilters';
import DocumentUpload from './components/DocumentUpload';
import WorkflowVisualization from './components/WorkflowVisualization';
import StatisticsCards from './components/StatisticsCards';
import RecentActivity from './components/RecentActivity';
import DocumentViewer from './components/DocumentViewer';

const SecretariatDashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    priority: 'all',
    search: '',
    startDate: '',
    endDate: '',
    submitter: ''
  });
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showWorkflowModal, setShowWorkflowModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showDocumentViewer, setShowDocumentViewer] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Mock data
  const mockDocuments = [
    {
      id: 1,
      title: "Proposal Kegiatan Bakti Sosial 2025",
      description: "Proposal untuk kegiatan bakti sosial yang akan dilaksanakan pada bulan Februari 2025 di wilayah Jakarta Selatan. Kegiatan ini meliputi pembagian sembako dan pemeriksaan kesehatan gratis.",
      type: "proposal",
      status: "pending",
      priority: "high",
      submittedBy: "Ahmad Rizki",
      submittedDate: "2025-01-28T10:30:00Z",
      deadline: "2025-02-05T23:59:59Z",
      reviewDate: null,
      approvalDate: null,
      finalizedDate: null,
      finalizedBy: null
    },
    {
      id: 2,
      title: "Laporan Keuangan Triwulan IV 2024",
      description: "Laporan keuangan lengkap untuk periode Oktober-Desember 2024 termasuk neraca, laporan laba rugi, dan arus kas organisasi.",
      type: "laporan",
      status: "approved",
      priority: "high",
      submittedBy: "Siti Nurhaliza",
      submittedDate: "2025-01-25T14:15:00Z",
      deadline: "2025-01-30T23:59:59Z",
      reviewDate: "2025-01-26T09:00:00Z",
      approvalDate: "2025-01-27T16:30:00Z",
      finalizedDate: "2025-01-27T16:30:00Z",
      finalizedBy: "Kepala Sekretariat"
    },
    {
      id: 3,
      title: "Surat Permohonan Kerjasama dengan Universitas Indonesia",
      description: "Surat resmi untuk menjalin kerjasama dalam bidang penelitian dan pengembangan masyarakat dengan Fakultas Ilmu Sosial dan Politik UI.",
      type: "surat",
      status: "in_review",
      priority: "medium",
      submittedBy: "Dr. Bambang Sutrisno",
      submittedDate: "2025-01-26T11:45:00Z",
      deadline: "2025-02-10T23:59:59Z",
      reviewDate: "2025-01-27T08:00:00Z",
      approvalDate: null,
      finalizedDate: null,
      finalizedBy: null
    },
    {
      id: 4,
      title: "Notulen Rapat Pengurus Bulanan Januari 2025",
      description: "Catatan lengkap hasil rapat pengurus yang membahas program kerja, evaluasi kegiatan, dan rencana strategis untuk semester pertama 2025.",
      type: "notulen",
      status: "pending",
      priority: "low",
      submittedBy: "Maya Sari",
      submittedDate: "2025-01-29T16:20:00Z",
      deadline: "2025-02-03T23:59:59Z",
      reviewDate: null,
      approvalDate: null,
      finalizedDate: null,
      finalizedBy: null
    },
    {
      id: 5,
      title: "Rancangan Anggaran Kegiatan Seminar Nasional",
      description: "Detail anggaran untuk penyelenggaraan seminar nasional tentang \'Inovasi Digital dalam Pemberdayaan Masyarakat\' yang akan diselenggarakan pada Maret 2025.",
      type: "anggaran",
      status: "rejected",
      priority: "medium",
      submittedBy: "Eko Prasetyo",
      submittedDate: "2025-01-24T13:10:00Z",
      deadline: "2025-02-01T23:59:59Z",
      reviewDate: "2025-01-25T10:00:00Z",
      approvalDate: "2025-01-26T14:20:00Z",
      finalizedDate: "2025-01-26T14:20:00Z",
      finalizedBy: "Kepala Sekretariat"
    }
  ];

  const mockStatistics = {
    totalDocuments: 156,
    pendingDocuments: 23,
    approvedThisMonth: 45,
    averageProcessingTime: 3.2
  };

  const mockActivities = [
    {
      type: 'approve',
      user: 'Kepala Sekretariat',
      action: 'menyetujui dokumen "Laporan Keuangan Triwulan IV 2024"',
      document: 'Laporan Keuangan Triwulan IV 2024',
      timestamp: '2025-01-31T01:30:00Z'
    },
    {
      type: 'upload',
      user: 'Ahmad Rizki',
      action: 'mengupload dokumen baru "Proposal Kegiatan Bakti Sosial 2025"',
      document: 'Proposal Kegiatan Bakti Sosial 2025',
      timestamp: '2025-01-31T01:00:00Z'
    },
    {
      type: 'review',
      user: 'Tim Sekretariat',
      action: 'memulai review dokumen "Surat Permohonan Kerjasama"',
      document: 'Surat Permohonan Kerjasama dengan Universitas Indonesia',
      timestamp: '2025-01-31T00:45:00Z'
    },
    {
      type: 'reject',
      user: 'Kepala Sekretariat',
      action: 'menolak dokumen "Rancangan Anggaran Kegiatan Seminar"',
      document: 'Rancangan Anggaran Kegiatan Seminar Nasional',
      timestamp: '2025-01-30T23:20:00Z'
    },
    {
      type: 'comment',
      user: 'Maya Sari',
      action: 'menambahkan komentar pada dokumen "Notulen Rapat Pengurus"',
      document: 'Notulen Rapat Pengurus Bulanan Januari 2025',
      timestamp: '2025-01-30T22:15:00Z'
    }
  ];

  useEffect(() => {
    setDocuments(mockDocuments);
    setFilteredDocuments(mockDocuments);
  }, []);

  useEffect(() => {
    let filtered = documents;

    // Apply filters
    if (filters?.status !== 'all') {
      filtered = filtered?.filter(doc => doc?.status === filters?.status);
    }
    if (filters?.type !== 'all') {
      filtered = filtered?.filter(doc => doc?.type === filters?.type);
    }
    if (filters?.priority !== 'all') {
      filtered = filtered?.filter(doc => doc?.priority === filters?.priority);
    }
    if (filters?.search) {
      filtered = filtered?.filter(doc => 
        doc?.title?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        doc?.description?.toLowerCase()?.includes(filters?.search?.toLowerCase())
      );
    }
    if (filters?.submitter) {
      filtered = filtered?.filter(doc => 
        doc?.submittedBy?.toLowerCase()?.includes(filters?.submitter?.toLowerCase())
      );
    }
    if (filters?.startDate) {
      filtered = filtered?.filter(doc => 
        new Date(doc.submittedDate) >= new Date(filters.startDate)
      );
    }
    if (filters?.endDate) {
      filtered = filtered?.filter(doc => 
        new Date(doc.submittedDate) <= new Date(filters.endDate)
      );
    }

    setFilteredDocuments(filtered);
  }, [filters, documents]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      status: 'all',
      type: 'all',
      priority: 'all',
      search: '',
      startDate: '',
      endDate: '',
      submitter: ''
    });
  };

  const handleDocumentUpload = (uploadData) => {
    const newDocument = {
      id: documents?.length + 1,
      title: uploadData?.title,
      description: uploadData?.description,
      type: uploadData?.type,
      status: 'pending',
      priority: uploadData?.priority,
      submittedBy: 'Admin User',
      submittedDate: new Date()?.toISOString(),
      deadline: uploadData?.deadline,
      reviewDate: null,
      approvalDate: null,
      finalizedDate: null,
      finalizedBy: null
    };

    setDocuments(prev => [newDocument, ...prev]);
    setShowUploadModal(false);
  };

  const handleDocumentView = (document) => {
    setSelectedDocument(document);
    setShowDocumentViewer(true);
  };

  const handleDocumentApprove = (document, comment) => {
    setDocuments(prev => prev?.map(doc => 
      doc?.id === document?.id 
        ? { 
            ...doc, 
            status: 'approved',
            approvalDate: new Date()?.toISOString(),
            finalizedDate: new Date()?.toISOString(),
            finalizedBy: 'Admin User'
          }
        : doc
    ));
  };

  const handleDocumentReject = (document, comment) => {
    setDocuments(prev => prev?.map(doc => 
      doc?.id === document?.id 
        ? { 
            ...doc, 
            status: 'rejected',
            approvalDate: new Date()?.toISOString(),
            finalizedDate: new Date()?.toISOString(),
            finalizedBy: 'Admin User'
          }
        : doc
    ));
  };

  const handleDocumentDownload = (document) => {
    // Mock download functionality
    alert(`Mengunduh dokumen: ${document?.title}`);
  };

  const handleWorkflowView = (document) => {
    setSelectedDocument(document);
    setShowWorkflowModal(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="container-brand py-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Dashboard Sekretariat
              </h1>
              <p className="text-muted-foreground">
                Kelola dokumen organisasi dengan sistem persetujuan terintegrasi
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center bg-muted rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  iconName="Grid3X3"
                  onClick={() => setViewMode('grid')}
                />
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  iconName="List"
                  onClick={() => setViewMode('list')}
                />
              </div>
              
              <Button
                variant="outline"
                iconName="BarChart3"
                onClick={() => setShowWorkflowModal(true)}
              >
                Workflow
              </Button>
              
              <Button
                iconName="Plus"
                onClick={() => setShowUploadModal(true)}
              >
                Upload Dokumen
              </Button>
            </div>
          </div>

          {/* Statistics Cards */}
          <StatisticsCards statistics={mockStatistics} />

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="xl:col-span-3">
              {/* Filters */}
              <DocumentFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={handleResetFilters}
              />

              {/* Documents Grid/List */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-foreground">
                    Dokumen ({filteredDocuments?.length})
                  </h2>
                  
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Filter" size={16} />
                    <span>
                      {filters?.status !== 'all' || filters?.type !== 'all' || filters?.priority !== 'all' || filters?.search || filters?.submitter ?'Filter aktif' :'Semua dokumen'
                      }
                    </span>
                  </div>
                </div>

                {filteredDocuments?.length > 0 ? (
                  <div className={viewMode === 'grid' ?'grid grid-cols-1 lg:grid-cols-2 gap-6' :'space-y-4'
                  }>
                    {filteredDocuments?.map((document) => (
                      <DocumentCard
                        key={document?.id}
                        document={document}
                        onView={handleDocumentView}
                        onApprove={handleDocumentApprove}
                        onReject={handleDocumentReject}
                        onDownload={handleDocumentDownload}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Icon name="FileX" size={64} className="mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      Tidak ada dokumen ditemukan
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Coba ubah filter atau upload dokumen baru
                    </p>
                    <Button
                      variant="outline"
                      iconName="Plus"
                      onClick={() => setShowUploadModal(true)}
                    >
                      Upload Dokumen
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-1">
              <RecentActivity activities={mockActivities} />
            </div>
          </div>
        </div>
      </div>
      {/* Modals */}
      {showUploadModal && (
        <DocumentUpload
          onUpload={handleDocumentUpload}
          onClose={() => setShowUploadModal(false)}
        />
      )}
      {showWorkflowModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-semibold text-foreground">
                Visualisasi Workflow
              </h2>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => setShowWorkflowModal(false)}
              />
            </div>
            <div className="p-6">
              <WorkflowVisualization document={selectedDocument || mockDocuments?.[0]} />
            </div>
          </div>
        </div>
      )}
      {showDocumentViewer && selectedDocument && (
        <DocumentViewer
          document={selectedDocument}
          onClose={() => {
            setShowDocumentViewer(false);
            setSelectedDocument(null);
          }}
          onApprove={handleDocumentApprove}
          onReject={handleDocumentReject}
        />
      )}
    </div>
  );
};

export default SecretariatDashboard;