import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchAndFilter = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    dateRange: 'all',
    category: 'all',
    documentType: 'all',
    status: 'all'
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const dateRanges = [
    { id: 'all', name: 'Semua Waktu' },
    { id: 'today', name: 'Hari Ini' },
    { id: 'week', name: '7 Hari Terakhir' },
    { id: 'month', name: '30 Hari Terakhir' },
    { id: 'quarter', name: '3 Bulan Terakhir' },
    { id: 'year', name: '1 Tahun Terakhir' }
  ];

  const categories = [
    { id: 'all', name: 'Semua Kategori' },
    { id: 'financial', name: 'Keuangan' },
    { id: 'programs', name: 'Program' },
    { id: 'governance', name: 'Tata Kelola' },
    { id: 'reports', name: 'Laporan' },
    { id: 'policies', name: 'Kebijakan' },
    { id: 'meetings', name: 'Rapat' }
  ];

  const documentTypes = [
    { id: 'all', name: 'Semua Tipe' },
    { id: 'pdf', name: 'PDF' },
    { id: 'doc', name: 'Word Document' },
    { id: 'xls', name: 'Excel' },
    { id: 'ppt', name: 'PowerPoint' },
    { id: 'image', name: 'Gambar' }
  ];

  const statuses = [
    { id: 'all', name: 'Semua Status' },
    { id: 'published', name: 'Dipublikasikan' },
    { id: 'updated', name: 'Diperbarui' },
    { id: 'archived', name: 'Diarsipkan' }
  ];

  const handleSearch = (e) => {
    e?.preventDefault();
    onSearch?.(searchTerm);
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = {
      ...selectedFilters,
      [filterType]: value
    };
    setSelectedFilters(newFilters);
    onFilter?.(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      dateRange: 'all',
      category: 'all',
      documentType: 'all',
      status: 'all'
    };
    setSelectedFilters(clearedFilters);
    setSearchTerm('');
    onFilter?.(clearedFilters);
    onSearch?.('');
  };

  const getActiveFilterCount = () => {
    return Object.values(selectedFilters)?.filter(value => value !== 'all')?.length;
  };

  return (
    <div className="bg-white rounded-xl shadow-brand border border-border mb-6">
      <div className="p-6">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <input
              type="text"
              placeholder="Cari dokumen, laporan, atau informasi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full pl-12 pr-12 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder-muted-foreground"
            />
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              iconName="Search"
            />
          </div>
        </form>

        {/* Quick Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-sm font-medium text-foreground">Filter Cepat:</span>
          
          {/* Date Range */}
          <select
            value={selectedFilters?.dateRange}
            onChange={(e) => handleFilterChange('dateRange', e?.target?.value)}
            className="px-3 py-1.5 text-sm border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {dateRanges?.map(range => (
              <option key={range?.id} value={range?.id}>{range?.name}</option>
            ))}
          </select>

          {/* Category */}
          <select
            value={selectedFilters?.category}
            onChange={(e) => handleFilterChange('category', e?.target?.value)}
            className="px-3 py-1.5 text-sm border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {categories?.map(category => (
              <option key={category?.id} value={category?.id}>{category?.name}</option>
            ))}
          </select>

          {/* Advanced Filters Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            iconName={showAdvancedFilters ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            Filter Lanjutan
            {getActiveFilterCount() > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-primary text-primary-foreground rounded-full text-xs">
                {getActiveFilterCount()}
              </span>
            )}
          </Button>

          {/* Clear Filters */}
          {(getActiveFilterCount() > 0 || searchTerm) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              iconName="X"
              iconPosition="left"
              className="text-muted-foreground hover:text-foreground"
            >
              Hapus Filter
            </Button>
          )}
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="border-t border-border pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Document Type */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Tipe Dokumen
                </label>
                <select
                  value={selectedFilters?.documentType}
                  onChange={(e) => handleFilterChange('documentType', e?.target?.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {documentTypes?.map(type => (
                    <option key={type?.id} value={type?.id}>{type?.name}</option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Status
                </label>
                <select
                  value={selectedFilters?.status}
                  onChange={(e) => handleFilterChange('status', e?.target?.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {statuses?.map(status => (
                    <option key={status?.id} value={status?.id}>{status?.name}</option>
                  ))}
                </select>
              </div>

              {/* Custom Date Range */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Rentang Tanggal Kustom
                </label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    className="flex-1 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  />
                  <input
                    type="date"
                    className="flex-1 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Search Within Results */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-foreground mb-2">
                Pencarian dalam Hasil
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Kata kunci spesifik..."
                  className="flex-1 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Button variant="outline" iconName="Plus">
                  Tambah
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {getActiveFilterCount() > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-foreground">Filter Aktif:</span>
              
              {Object.entries(selectedFilters)?.map(([key, value]) => {
                if (value === 'all') return null;
                
                let filterName = '';
                let filterValue = '';
                
                switch (key) {
                  case 'dateRange':
                    filterName = 'Waktu';
                    filterValue = dateRanges?.find(r => r?.id === value)?.name || value;
                    break;
                  case 'category':
                    filterName = 'Kategori';
                    filterValue = categories?.find(c => c?.id === value)?.name || value;
                    break;
                  case 'documentType':
                    filterName = 'Tipe';
                    filterValue = documentTypes?.find(t => t?.id === value)?.name || value;
                    break;
                  case 'status':
                    filterName = 'Status';
                    filterValue = statuses?.find(s => s?.id === value)?.name || value;
                    break;
                }
                
                return (
                  <span
                    key={key}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    <span className="font-medium">{filterName}:</span>
                    <span>{filterValue}</span>
                    <button
                      onClick={() => handleFilterChange(key, 'all')}
                      className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
                    >
                      <Icon name="X" size={12} />
                    </button>
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Search Suggestions */}
        {searchTerm && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="text-sm text-muted-foreground mb-2">Saran pencarian:</div>
            <div className="flex flex-wrap gap-2">
              {[
                'laporan keuangan',
                'notulen rapat',
                'program pendidikan',
                'kebijakan organisasi',
                'audit internal'
              ]?.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchTerm(suggestion);
                    onSearch?.(suggestion);
                  }}
                  className="px-3 py-1 text-sm bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground rounded-full transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilter;