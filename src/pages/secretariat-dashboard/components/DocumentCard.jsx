import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentCard = ({ document, onView, onApprove, onReject, onDownload }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'approved': return 'bg-success text-success-foreground';
      case 'rejected': return 'bg-destructive text-destructive-foreground';
      case 'in_review': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 sm:p-6 hover:shadow-brand transition-all duration-200">
      {/* Header dengan status dan priority */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground mb-2 truncate">
            {document?.title}
          </h3>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="User" size={16} />
              <span className="truncate max-w-[120px] sm:max-w-none">{document?.submittedBy}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={16} />
              <span>{formatDate(document?.submittedDate)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="FileText" size={16} />
              <span className="hidden sm:inline">{document?.type}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-end sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 ml-2 sm:ml-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(document?.status)}`}>
            {document?.status === 'pending' ? 'Menunggu' : 
             document?.status === 'approved' ? 'Disetujui' : 
             document?.status === 'rejected' ? 'Ditolak' : 
             document?.status === 'in_review' ? 'Dalam Review' : document?.status}
          </span>
          <Icon 
            name="AlertCircle" 
            size={16} 
            className={getPriorityColor(document?.priority)}
          />
        </div>
      </div>

      {/* Deskripsi */}
      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
        {document?.description}
      </p>

      {/* Deadline */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
        <Icon name="Clock" size={16} />
        <span>Deadline: {formatDate(document?.deadline)}</span>
      </div>
      
      {/* Tombol-tombol - Responsif */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Tombol aksi utama */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="Eye"
            onClick={() => onView(document)}
            className="flex-1 sm:flex-none"
          >
            <span className="hidden sm:inline">Lihat</span>
            <span className="sm:hidden">View</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="Download"
            onClick={() => onDownload(document)}
            className="flex-1 sm:flex-none"
          >
            <span className="hidden sm:inline">Unduh</span>
            <span className="sm:hidden">Download</span>
          </Button>
        </div>

        {/* Tombol approve/reject - hanya untuk status pending */}
        {document?.status === 'pending' && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Check"
              onClick={() => onApprove(document)}
              className="flex-1 sm:flex-none"
            >
              <span className="hidden sm:inline">Setujui</span>
              <span className="sm:hidden">✓</span>
            </Button>
            <Button
              variant="destructive"
              size="sm"
              iconName="X"
              onClick={() => onReject(document)}
              className="flex-1 sm:flex-none"
            >
              <span className="hidden sm:inline">Tolak</span>
              <span className="sm:hidden">✗</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentCard;