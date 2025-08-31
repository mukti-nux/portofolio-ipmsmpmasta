import React from 'react';
import Icon from '../../../components/AppIcon';

const WorkflowVisualization = ({ document }) => {
  const workflowSteps = [
    {
      id: 'submitted',
      title: 'Dokumen Diajukan',
      description: 'Dokumen telah disubmit oleh pengaju',
      icon: 'FileText',
      status: 'completed',
      date: document?.submittedDate,
      user: document?.submittedBy
    },
    {
      id: 'review',
      title: 'Dalam Review',
      description: 'Dokumen sedang direview oleh sekretariat',
      icon: 'Eye',
      status: document?.status === 'pending' ? 'current' : 
              ['in_review', 'approved', 'rejected']?.includes(document?.status) ? 'completed' : 'pending',
      date: document?.reviewDate,
      user: 'Tim Sekretariat'
    },
    {
      id: 'approval',
      title: 'Persetujuan',
      description: 'Menunggu persetujuan dari pihak berwenang',
      icon: 'CheckCircle',
      status: document?.status === 'in_review' ? 'current' : 
              ['approved', 'rejected']?.includes(document?.status) ? 'completed' : 'pending',
      date: document?.approvalDate,
      user: 'Kepala Sekretariat'
    },
    {
      id: 'finalized',
      title: 'Selesai',
      description: document?.status === 'approved' ? 'Dokumen telah disetujui' : 
                   document?.status === 'rejected' ? 'Dokumen ditolak' : 'Menunggu finalisasi',
      icon: document?.status === 'approved' ? 'Check' : 
            document?.status === 'rejected' ? 'X' : 'Clock',
      status: ['approved', 'rejected']?.includes(document?.status) ? 'completed' : 'pending',
      date: document?.finalizedDate,
      user: document?.finalizedBy
    }
  ];

  const getStepColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success border-success bg-success/10';
      case 'current': return 'text-primary border-primary bg-primary/10';
      case 'pending': return 'text-muted-foreground border-border bg-muted';
      default: return 'text-muted-foreground border-border bg-muted';
    }
  };

  const getConnectorColor = (currentStatus, nextStatus) => {
    if (currentStatus === 'completed') return 'bg-success';
    if (currentStatus === 'current') return 'bg-gradient-to-b from-primary to-border';
    return 'bg-border';
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString)?.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Alur Persetujuan Dokumen</h3>
      <div className="relative">
        {workflowSteps?.map((step, index) => (
          <div key={step?.id} className="relative">
            <div className="flex items-start space-x-4">
              {/* Step Icon */}
              <div className={`flex-shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center ${getStepColor(step?.status)}`}>
                <Icon name={step?.icon} size={20} />
              </div>

              {/* Step Content */}
              <div className="flex-1 min-w-0 pb-8">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-base font-medium text-foreground">{step?.title}</h4>
                  {step?.date && (
                    <span className="text-sm text-muted-foreground">
                      {formatDate(step?.date)}
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">
                  {step?.description}
                </p>
                
                {step?.user && (
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Icon name="User" size={12} />
                    <span>{step?.user}</span>
                  </div>
                )}

                {/* Status Badge */}
                {step?.status === 'current' && (
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                      <Icon name="Clock" size={12} className="mr-1" />
                      Sedang Diproses
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Connector Line */}
            {index < workflowSteps?.length - 1 && (
              <div 
                className={`absolute left-6 top-12 w-0.5 h-8 -translate-x-0.5 ${
                  getConnectorColor(step?.status, workflowSteps?.[index + 1]?.status)
                }`}
              />
            )}
          </div>
        ))}
      </div>
      {/* Additional Information */}
      {document && (
        <div className="mt-6 pt-6 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Total Waktu Proses:</span>
              <p className="font-medium text-foreground">
                {document?.status === 'pending' ? 'Sedang berjalan' : '3 hari kerja'}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Estimasi Selesai:</span>
              <p className="font-medium text-foreground">
                {document?.deadline ? formatDate(document?.deadline) : 'Belum ditentukan'}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Prioritas:</span>
              <p className={`font-medium ${
                document?.priority === 'high' ? 'text-destructive' :
                document?.priority === 'medium'? 'text-warning' : 'text-success'
              }`}>
                {document?.priority === 'high' ? 'Tinggi' :
                 document?.priority === 'medium' ? 'Sedang' : 'Rendah'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowVisualization;