import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DocumentViewer = ({ documentId, onClose, onApprove, onReject }) => {
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [showCommentForm, setShowCommentForm] = useState(false);

  useEffect(() => {
    const fetchDocument = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('document') // table = "document"
        .select('*')
        .eq('id', documentId)
        .single();

      if (error) {
        console.error('Error fetching document:', error);
      } else {
        setDocument(data);
      }
      setLoading(false);
    };

    if (documentId) fetchDocument();
  }, [documentId]);

  const handleApprove = async () => {
    // update status di Supabase langsung
    const { error } = await supabase
      .from('document')
      .update({ status: 'approved', comment })
      .eq('id', documentId);

    if (error) {
      console.error('Error approving document:', error);
      return;
    }

    onApprove?.(document, comment);
    onClose();
  };

  const handleReject = async () => {
    if (!comment?.trim()) {
      alert('Mohon berikan alasan penolakan');
      return;
    }

    const { error } = await supabase
      .from('document')
      .update({ status: 'rejected', comment })
      .eq('id', documentId);

    if (error) {
      console.error('Error rejecting document:', error);
      return;
    }

    onReject?.(document, comment);
    onClose();
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
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

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-card p-6 rounded-lg">Loading...</div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-card p-6 rounded-lg">Dokumen tidak ditemukan</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      {/* UI kamu yang lama tetap bisa dipakai di sini, tapi `document` sudah hasil fetch dari Supabase */}
    </div>
  );
};

export default DocumentViewer;
