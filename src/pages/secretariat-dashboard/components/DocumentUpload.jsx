import React, { useState, useRef } from 'react';
import { supabase } from '../../../../lib/supabaseClient'; // tambahkan ini
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const DocumentUpload = ({ onUpload, onClose }) => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    priority: 'medium',
    deadline: ''
  });
  const [loading, setLoading] = useState(false); // loading state
  const fileInputRef = useRef(null);

  const documentTypes = [
    { value: 'proposal', label: 'Proposal' },
    { value: 'laporan', label: 'Laporan' },
    { value: 'surat', label: 'Surat' },
    { value: 'notulen', label: 'Notulen' },
    { value: 'anggaran', label: 'Anggaran' },
    { value: 'lainnya', label: 'Lainnya' }
  ];

  const priorityOptions = [
    { value: 'high', label: 'Tinggi' },
    { value: 'medium', label: 'Sedang' },
    { value: 'low', label: 'Rendah' }
  ];

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFiles(e?.dataTransfer?.files);
    }
  };

  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList)?.map(file => ({
      file,
      name: file?.name,
      size: file?.size,
      type: file?.type,
      id: Math.random()?.toString(36)?.substr(2, 9)
    }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (fileId) => {
    setFiles(prev => prev?.filter(f => f?.id !== fileId));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (files?.length === 0 || !formData?.title || !formData?.type) {
      alert('Mohon lengkapi semua field yang diperlukan');
      return;
    }
    setLoading(true);

    // Ambil user aktif dari Supabase Auth
    let userEmail = 'Unknown User';
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) userEmail = user.email;
    } catch {
      // fallback
    }

    // Upload semua file ke Supabase Storage
    const uploadedFiles = [];
    for (const fileObj of files) {
      const filePath = `${Date.now()}_${fileObj.name}`;
      const { data, error } = await supabase.storage
        .from('Documents') // pastikan bucket 'documents' sudah dibuat di Supabase Storage
        .upload(filePath, fileObj.file);

      if (error) {
        alert(`Gagal upload file: ${fileObj.name}`);
        setLoading(false);
        return;
      }
      // Dapatkan public URL file
      const { data: publicUrlData } = supabase
        .storage
        .from('documents')
        .getPublicUrl(filePath);

      uploadedFiles.push({
        name: fileObj.name,
        url: publicUrlData.publicUrl,
        size: fileObj.size,
        type: fileObj.type
      });
    }

    const uploadData = {
      ...formData,
      files: uploadedFiles,
      submittedDate: new Date()?.toISOString(),
      submittedBy: userEmail,
      status: 'pending'
    };

    await onUpload(uploadData);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Upload Dokumen Baru</h2>
          <Button variant="ghost" size="sm" iconName="X" onClick={onClose} />
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Icon name="Upload" size={48} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium text-foreground mb-2">
              Drag & drop file di sini
            </p>
            <p className="text-muted-foreground mb-4">
              atau klik untuk memilih file
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef?.current?.click()}
              disabled={loading}
            >
              Pilih File
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e?.target?.files)}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png"
              disabled={loading}
            />
          </div>

          {/* File List */}
          {files?.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">File yang dipilih:</h4>
              {files?.map((file) => (
                <div key={file?.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon name="FileText" size={20} className="text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{file?.name}</p>
                      <p className="text-xs text-muted-foreground">{formatFileSize(file?.size)}</p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    iconName="X"
                    onClick={() => removeFile(file?.id)}
                    disabled={loading}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Judul Dokumen"
              type="text"
              placeholder="Masukkan judul dokumen"
              value={formData?.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e?.target?.value }))}
              required
              disabled={loading}
            />

            <Select
              label="Jenis Dokumen"
              options={documentTypes}
              value={formData?.type}
              onChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
              placeholder="Pilih jenis dokumen"
              required
              disabled={loading}
            />

            <Select
              label="Prioritas"
              options={priorityOptions}
              value={formData?.priority}
              onChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}
              disabled={loading}
            />

            <Input
              label="Deadline"
              type="date"
              value={formData?.deadline}
              onChange={(e) => setFormData(prev => ({ ...prev, deadline: e?.target?.value }))}
              required
              disabled={loading}
            />
          </div>

          <Input
            label="Deskripsi"
            type="text"
            placeholder="Deskripsi singkat dokumen"
            value={formData?.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e?.target?.value }))}
            disabled={loading}
          />

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
            <Button type="button" variant="ghost" onClick={onClose} disabled={loading}>
              Batal
            </Button>
            <Button type="submit" iconName="Upload" disabled={loading}>
              {loading ? 'Uploading...' : 'Upload Dokumen'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DocumentUpload;