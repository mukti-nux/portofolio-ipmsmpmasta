import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const DocumentFilters = ({ filters, onFilterChange, onReset }) => {
  const statusOptions = [
    { value: 'all', label: 'Semua Status' },
    { value: 'pending', label: 'Menunggu' },
    { value: 'in_review', label: 'Dalam Review' },
    { value: 'approved', label: 'Disetujui' },
    { value: 'rejected', label: 'Ditolak' }
  ];

  const typeOptions = [
    { value: 'all', label: 'Semua Jenis' },
    { value: 'proposal', label: 'Proposal' },
    { value: 'laporan', label: 'Laporan' },
    { value: 'surat', label: 'Surat' },
    { value: 'notulen', label: 'Notulen' },
    { value: 'anggaran', label: 'Anggaran' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'Semua Prioritas' },
    { value: 'high', label: 'Tinggi' },
    { value: 'medium', label: 'Sedang' },
    { value: 'low', label: 'Rendah' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Filter Dokumen</h3>
        <Button
          variant="ghost"
          size="sm"
          iconName="RotateCcw"
          onClick={onReset}
        >
          Reset Filter
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Select
          label="Status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => onFilterChange('status', value)}
          className="w-full"
        />

        <Select
          label="Jenis Dokumen"
          options={typeOptions}
          value={filters?.type}
          onChange={(value) => onFilterChange('type', value)}
          className="w-full"
        />

        <Select
          label="Prioritas"
          options={priorityOptions}
          value={filters?.priority}
          onChange={(value) => onFilterChange('priority', value)}
          className="w-full"
        />

        <Input
          label="Pencarian"
          type="search"
          placeholder="Cari dokumen..."
          value={filters?.search}
          onChange={(e) => onFilterChange('search', e?.target?.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="Tanggal Mulai"
          type="date"
          value={filters?.startDate}
          onChange={(e) => onFilterChange('startDate', e?.target?.value)}
        />

        <Input
          label="Tanggal Akhir"
          type="date"
          value={filters?.endDate}
          onChange={(e) => onFilterChange('endDate', e?.target?.value)}
        />

        <Input
          label="Pengaju"
          type="text"
          placeholder="Nama pengaju..."
          value={filters?.submitter}
          onChange={(e) => onFilterChange('submitter', e?.target?.value)}
        />
      </div>
    </div>
  );
};

export default DocumentFilters;