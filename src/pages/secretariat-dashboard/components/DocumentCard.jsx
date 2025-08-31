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
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-brand transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground mb-2 truncate">
            {document?.title}
          </h3>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="User" size={16} />
              <span>{document?.submittedBy}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={16} />
              <span>{formatDate(document?.submittedDate)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="FileText" size={16} />
              <span>{document?.type}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(document?.status)}`}>
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
      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
        {document?.description}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Clock" size={16} />
          <span>Deadline: {formatDate(document?.deadline)}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="Eye"
            onClick={() => onView(document)}
          >
            Lihat
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="Download"
            onClick={() => onDownload(document)}
          >
            Unduh
          </Button>
          {document?.status === 'pending' && (
            <>
              <Button
                variant="outline"
                size="sm"
                iconName="Check"
                onClick={() => onApprove(document)}
              >
                Setujui
              </Button>
              <Button
                variant="destructive"
                size="sm"
                iconName="X"
                onClick={() => onReject(document)}
              >
                Tolak
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;