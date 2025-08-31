import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const MemberFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  onExport,
  totalMembers,
  filteredCount 
}) => {
  const statusOptions = [
    { value: '', label: 'Semua Status' },
    { value: 'active', label: 'Aktif' },
    { value: 'inactive', label: 'Tidak Aktif' },
    { value: 'pending', label: 'Menunggu' },
    { value: 'suspended', label: 'Ditangguhkan' }
  ];

  const roleOptions = [
    { value: '', label: 'Semua Peran' },
    { value: 'admin', label: 'Administrator' },
    { value: 'secretary', label: 'Sekretaris' },
    { value: 'treasurer', label: 'Bendahara' },
    { value: 'member', label: 'Anggota' }
  ];

  const departmentOptions = [
    { value: '', label: 'Semua Departemen' },
    { value: 'executive', label: 'Eksekutif' },
    { value: 'finance', label: 'Keuangan' },
    { value: 'operations', label: 'Operasional' },
    { value: 'marketing', label: 'Pemasaran' },
    { value: 'hr', label: 'SDM' }
  ];

  const sortOptions = [
    { value: 'name_asc', label: 'Nama (A-Z)' },
    { value: 'name_desc', label: 'Nama (Z-A)' },
    { value: 'join_date_desc', label: 'Terbaru Bergabung' },
    { value: 'join_date_asc', label: 'Terlama Bergabung' },
    { value: 'activity_desc', label: 'Paling Aktif' },
    { value: 'contribution_desc', label: 'Kontribusi Tertinggi' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Filter & Pencarian</h3>
          <p className="text-sm text-muted-foreground">
            Menampilkan {filteredCount} dari {totalMembers} anggota
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            onClick={onExport}
          >
            Export
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="RotateCcw"
            onClick={onClearFilters}
          >
            Reset
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        <div className="lg:col-span-2">
          <Input
            type="search"
            placeholder="Cari nama, email, atau nomor anggota..."
            value={filters?.search}
            onChange={(e) => onFilterChange('search', e?.target?.value)}
          />
        </div>

        <Select
          placeholder="Status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => onFilterChange('status', value)}
        />

        <Select
          placeholder="Peran"
          options={roleOptions}
          value={filters?.role}
          onChange={(value) => onFilterChange('role', value)}
        />

        <Select
          placeholder="Departemen"
          options={departmentOptions}
          value={filters?.department}
          onChange={(value) => onFilterChange('department', value)}
        />

        <Select
          placeholder="Urutkan"
          options={sortOptions}
          value={filters?.sort}
          onChange={(value) => onFilterChange('sort', value)}
        />
      </div>
      {(filters?.search || filters?.status || filters?.role || filters?.department) && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
          <span className="text-sm text-muted-foreground">Filter aktif:</span>
          {filters?.search && (
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
              Pencarian: "{filters?.search}"
            </span>
          )}
          {filters?.status && (
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
              Status: {statusOptions?.find(opt => opt?.value === filters?.status)?.label}
            </span>
          )}
          {filters?.role && (
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
              Peran: {roleOptions?.find(opt => opt?.value === filters?.role)?.label}
            </span>
          )}
          {filters?.department && (
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
              Departemen: {departmentOptions?.find(opt => opt?.value === filters?.department)?.label}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default MemberFilters;