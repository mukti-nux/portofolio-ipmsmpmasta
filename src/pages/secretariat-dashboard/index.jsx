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
import { supabase } from '../../../lib/supabaseClient';

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
  const [activities, setActivities] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showWorkflowModal, setShowWorkflowModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showDocumentViewer, setShowDocumentViewer] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Fetch documents
  useEffect(() => {
    const fetchDocuments = async () => {
      const { data, error } = await supabase
        .from('document')
        .select('*')
        .order('submitted_date', { ascending: false });

      if (error) {
        console.error('Error fetching documents:', error);
      } else {
        setDocuments(data);
        setFilteredDocuments(data);
      }
    };

    fetchDocuments();
  }, []);

  // Fetch activities
  useEffect(() => {
    const fetchActivities = async () => {
      const { data, error } = await supabase
        .from('activity')
        .select(`
          id, type, action, user, timestamp,
          document:document_id (id, title)
        `)
        .order('timestamp', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching activities:', error);
      } else {
        setActivities(data);
      }
    };

    fetchActivities();
  }, []);

  // Fetch statistics
  useEffect(() => {
    const fetchStats = async () => {
      const { count: totalDocuments } = await supabase
        .from('document')
        .select('*', { count: 'exact', head: true });

      const { count: pendingDocuments } = await supabase
        .from('document')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      const { count: approvedThisMonth } = await supabase
        .from('document')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'approved');

      setStatistics({
        totalDocuments,
        pendingDocuments,
        approvedThisMonth,
        averageProcessingTime: 0 // bisa dihitung lebih detail
      });
    };

    fetchStats();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = documents;

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
        doc?.submitted_by?.toLowerCase()?.includes(filters?.submitter?.toLowerCase())
      );
    }
    if (filters?.startDate) {
      filtered = filtered?.filter(doc =>
        new Date(doc.submitted_date) >= new Date(filters.startDate)
      );
    }
    if (filters?.endDate) {
      filtered = filtered?.filter(doc =>
        new Date(doc.submitted_date) <= new Date(filters.endDate)
      );
    }

    setFilteredDocuments(filtered);
  }, [filters, documents]);

  // Handle filter changes
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

  // Upload document
  const handleDocumentUpload = async (uploadData) => {
    const { data, error } = await supabase
      .from('document')
      .insert([{
        title: uploadData.title,
        description: uploadData.description,
        type: uploadData.type,
        status: 'pending',
        priority: uploadData.priority,
        submitted_by: 'Admin User',
        submitted_date: new Date().toISOString(),
        deadline: uploadData.deadline,
        review_date: null,
        approval_date: null,
        finalized_date: null,
        finalized_by: null
      }])
      .select()
      .single();

    if (error) {
      console.error('Error uploading document:', error);
    } else {
      setDocuments(prev => [data, ...prev]);
      setShowUploadModal(false);
    }
  };

  // Approve document
  const handleDocumentApprove = async (document) => {
    const { data, error } = await supabase
      .from('document')
      .update({
        status: 'approved',
        approval_date: new Date().toISOString(),
        finalized_date: new Date().toISOString(),
        finalized_by: 'Admin User'
      })
      .eq('id', document.id)
      .select()
      .single();

    if (error) {
      console.error('Error approving document:', error);
    } else {
      setDocuments(prev => prev.map(doc => doc.id === document.id ? data : doc));
    }
  };

  // Reject document
  const handleDocumentReject = async (document) => {
    const { data, error } = await supabase
      .from('document')
      .update({
        status: 'rejected',
        approval_date: new Date().toISOString(),
        finalized_date: new Date().toISOString(),
        finalized_by: 'Admin User'
      })
      .eq('id', document.id)
      .select()
      .single();

    if (error) {
      console.error('Error rejecting document:', error);
    } else {
      setDocuments(prev => prev.map(doc => doc.id === document.id ? data : doc));
    }
  };

  // Download document from Storage
  const handleDocumentDownload = async (document) => {
    const { data, error } = await supabase
      .storage
      .from('document')
      .download(document.file_path);

    if (error) {
      console.error('Error downloading file:', error);
    } else {
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = document.title;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleDocumentView = (document) => {
    setSelectedDocument(document);
    setShowDocumentViewer(true);
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
          <StatisticsCards statistics={statistics} />

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
                      {filters?.status !== 'all' || filters?.type !== 'all' || filters?.priority !== 'all' || filters?.search || filters?.submitter
                        ? 'Filter aktif'
                        : 'Semua dokumen'}
                    </span>
                  </div>
                </div>

                {filteredDocuments?.length > 0 ? (
                  <div className={viewMode === 'grid'
                    ? 'grid grid-cols-1 lg:grid-cols-2 gap-6'
                    : 'space-y-4'}>
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
              <RecentActivity activities={activities} />
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
              <WorkflowVisualization document={selectedDocument || documents?.[0]} />
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
