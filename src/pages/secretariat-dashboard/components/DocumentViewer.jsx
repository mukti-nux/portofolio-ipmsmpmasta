import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DocumentViewer = ({ document, onClose, onApprove, onReject }) => {
  const [comment, setComment] = useState('');
  const [showCommentForm, setShowCommentForm] = useState(false);

  const handleApprove = () => {
    onApprove(document, comment);
    onClose();
  };

  const handleReject = () => {
    if (!comment?.trim()) {
      alert('Mohon berikan alasan penolakan');
      return;
    }
    onReject(document, comment);
    onClose();
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'approved': return 'bg-success text-success-foreground';
      case 'rejected': return 'bg-destructive text-destructive-foreground';
      case 'in_review': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-semibold text-foreground truncate mb-2">
              {document?.title}
            </h2>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>Diajukan oleh: {document?.submittedBy}</span>
              <span>•</span>
              <span>{formatDate(document?.submittedDate)}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(document?.status)}`}>
                {document?.status === 'pending' ? 'Menunggu' : 
                 document?.status === 'approved' ? 'Disetujui' : 
                 document?.status === 'rejected' ? 'Ditolak' : 
                 document?.status === 'in_review' ? 'Dalam Review' : document?.status}
              </span>
            </div>
          </div>
          <Button variant="ghost" size="sm" iconName="X" onClick={onClose} />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Document Details */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Detail Dokumen</h3>
                <div className="bg-muted rounded-lg p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-muted-foreground">Jenis Dokumen:</span>
                      <p className="font-medium text-foreground">{document?.type}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Prioritas:</span>
                      <p className={`font-medium ${
                        document?.priority === 'high' ? 'text-destructive' :
                        document?.priority === 'medium'? 'text-warning' : 'text-success'
                      }`}>
                        {document?.priority === 'high' ? 'Tinggi' :
                         document?.priority === 'medium' ? 'Sedang' : 'Rendah'}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Deadline:</span>
                      <p className="font-medium text-foreground">{formatDate(document?.deadline)}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Ukuran File:</span>
                      <p className="font-medium text-foreground">2.4 MB</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Deskripsi</h3>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-foreground leading-relaxed">
                    {document?.description}
                  </p>
                </div>
              </div>

              {/* Document Preview */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Preview Dokumen</h3>
                <div className="bg-muted rounded-lg p-8 text-center">
                  <Icon name="FileText" size={64} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">
                    Preview dokumen tidak tersedia
                  </p>
                  <Button variant="outline" iconName="Download">
                    Unduh untuk Melihat
                  </Button>
                </div>
              </div>
            </div>

            {/* Actions & History */}
            <div className="space-y-6">
              {/* Actions */}
              {document?.status === 'pending' && (
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Tindakan</h3>
                  <div className="space-y-3">
                    <Button
                      variant="default"
                      fullWidth
                      iconName="Check"
                      onClick={() => setShowCommentForm(true)}
                    >
                      Setujui Dokumen
                    </Button>
                    <Button
                      variant="destructive"
                      fullWidth
                      iconName="X"
                      onClick={() => setShowCommentForm(true)}
                    >
                      Tolak Dokumen
                    </Button>
                    <Button
                      variant="outline"
                      fullWidth
                      iconName="Download"
                    >
                      Unduh Dokumen
                    </Button>
                  </div>
                </div>
              )}

              {/* Comment Form */}
              {showCommentForm && (
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Komentar</h3>
                  <div className="space-y-3">
                    <Input
                      label="Catatan/Komentar"
                      type="text"
                      placeholder="Berikan catatan atau komentar..."
                      value={comment}
                      onChange={(e) => setComment(e?.target?.value)}
                    />
                    <div className="flex space-x-2">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={handleApprove}
                      >
                        Setujui
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleReject}
                      >
                        Tolak
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowCommentForm(false)}
                      >
                        Batal
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* History */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Riwayat</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                    <Icon name="Upload" size={16} className="text-primary mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">Dokumen diajukan</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(document?.submittedDate)}
                      </p>
                    </div>
                  </div>
                  
                  {document?.status !== 'pending' && (
                    <div className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                      <Icon 
                        name={document?.status === 'approved' ? 'Check' : 'X'} 
                        size={16} 
                        className={document?.status === 'approved' ? 'text-success mt-0.5' : 'text-destructive mt-0.5'} 
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">
                          Dokumen {document?.status === 'approved' ? 'disetujui' : 'ditolak'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          2 jam yang lalu
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;