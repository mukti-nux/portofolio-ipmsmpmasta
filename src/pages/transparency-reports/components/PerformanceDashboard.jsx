import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Line, Area, AreaChart } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PerformanceDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('2024');
  const [selectedMetric, setSelectedMetric] = useState('all');

  const periods = ['2024', '2023', '2022'];
  
  const metrics = [
    { id: 'all', name: 'Semua Metrik', icon: 'BarChart3' },
    { id: 'programs', name: 'Program', icon: 'Target' },
    { id: 'members', name: 'Keanggotaan', icon: 'Users' },
    { id: 'finance', name: 'Keuangan', icon: 'DollarSign' },
    { id: 'impact', name: 'Dampak', icon: 'TrendingUp' }
  ];

  // Key Performance Indicators
  const kpiData = [
    {
      title: "Total Program Selesai",
      value: "24",
      change: "+15%",
      trend: "up",
      icon: "CheckCircle",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Anggota Aktif",
      value: "1,247",
      change: "+8%",
      trend: "up",
      icon: "Users",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Dana Tersalurkan",
      value: "Rp 2.4M",
      change: "+22%",
      trend: "up",
      icon: "DollarSign",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Penerima Manfaat",
      value: "3,856",
      change: "+31%",
      trend: "up",
      icon: "Heart",
      color: "text-red-600",
      bgColor: "bg-red-50"
    }
  ];

  // Monthly Program Data
  const monthlyProgramData = [
    { month: 'Jan', completed: 2, ongoing: 1, planned: 3 },
    { month: 'Feb', completed: 3, ongoing: 2, planned: 2 },
    { month: 'Mar', completed: 4, ongoing: 1, planned: 4 },
    { month: 'Apr', completed: 2, ongoing: 3, planned: 2 },
    { month: 'Mei', completed: 5, ongoing: 2, planned: 3 },
    { month: 'Jun', completed: 3, ongoing: 4, planned: 1 },
    { month: 'Jul', completed: 4, ongoing: 2, planned: 3 },
    { month: 'Agu', completed: 1, ongoing: 3, planned: 2 }
  ];

  // Budget Allocation Data
  const budgetData = [
    { name: 'Pendidikan', value: 35, amount: 840000000, color: '#3B82F6' },
    { name: 'Kesehatan', value: 25, amount: 600000000, color: '#EF4444' },
    { name: 'Lingkungan', value: 20, amount: 480000000, color: '#10B981' },
    { name: 'Sosial', value: 15, amount: 360000000, color: '#F59E0B' },
    { name: 'Operasional', value: 5, amount: 120000000, color: '#6B7280' }
  ];

  // Member Growth Data
  const memberGrowthData = [
    { month: 'Jan', members: 1150, newMembers: 45 },
    { month: 'Feb', members: 1180, newMembers: 30 },
    { month: 'Mar', members: 1195, newMembers: 15 },
    { month: 'Apr', members: 1210, newMembers: 15 },
    { month: 'Mei', members: 1225, newMembers: 15 },
    { month: 'Jun', members: 1235, newMembers: 10 },
    { month: 'Jul', members: 1242, newMembers: 7 },
    { month: 'Agu', members: 1247, newMembers: 5 }
  ];

  // Impact Metrics
  const impactData = [
    { category: 'Anak Terbantu', current: 1250, target: 1500, percentage: 83 },
    { category: 'Keluarga Terdampak', current: 850, target: 1000, percentage: 85 },
    { category: 'Pohon Ditanam', current: 2100, target: 2500, percentage: 84 },
    { category: 'Pelatihan Diberikan', current: 45, target: 60, percentage: 75 }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-white p-3 border border-border rounded-lg shadow-lg">
          <p className="font-medium text-foreground">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.name}: {entry?.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-brand border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Dashboard Kinerja Organisasi
            </h2>
            <p className="text-muted-foreground">
              Visualisasi data kinerja dan pencapaian organisasi
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e?.target?.value)}
              className="px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {periods?.map(period => (
                <option key={period} value={period}>Tahun {period}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="p-6">
        {/* Metric Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {metrics?.map((metric) => (
            <button
              key={metric?.id}
              onClick={() => setSelectedMetric(metric?.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedMetric === metric?.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
              }`}
            >
              <Icon name={metric?.icon} size={16} />
              <span>{metric?.name}</span>
            </button>
          ))}
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiData?.map((kpi, index) => (
            <div key={index} className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${kpi?.bgColor}`}>
                  <Icon name={kpi?.icon} size={24} className={kpi?.color} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  kpi?.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <Icon name={kpi?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={16} />
                  {kpi?.change}
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">
                {kpi?.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {kpi?.title}
              </div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Programs Chart */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Program Bulanan 2024
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyProgramData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                  <YAxis stroke="#6B7280" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="completed" fill="#10B981" name="Selesai" />
                  <Bar dataKey="ongoing" fill="#3B82F6" name="Berlangsung" />
                  <Bar dataKey="planned" fill="#F59E0B" name="Direncanakan" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Budget Allocation Chart */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Alokasi Anggaran 2024
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={budgetData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {budgetData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry?.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name, props) => [
                      `${value}% (${formatCurrency(props?.payload?.amount)})`,
                      props?.payload?.name
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {budgetData?.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item?.color }}
                  ></div>
                  <span className="text-xs text-muted-foreground">{item?.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Member Growth Chart */}
        <div className="bg-card border border-border rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Pertumbuhan Keanggotaan 2024
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={memberGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="members" 
                  stroke="#3B82F6" 
                  fill="#3B82F6" 
                  fillOpacity={0.1}
                  name="Total Anggota"
                />
                <Line 
                  type="monotone" 
                  dataKey="newMembers" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="Anggota Baru"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Impact Metrics */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">
            Pencapaian Target Dampak 2024
          </h3>
          <div className="space-y-6">
            {impactData?.map((impact, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-foreground">{impact?.category}</span>
                  <span className="text-sm text-muted-foreground">
                    {impact?.current?.toLocaleString('id-ID')} / {impact?.target?.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div 
                    className="bg-primary h-3 rounded-full transition-all duration-500"
                    style={{ width: `${impact?.percentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-muted-foreground">0</span>
                  <span className="text-sm font-medium text-primary">
                    {impact?.percentage}%
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {impact?.target?.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Export Actions */}
        <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-border">
          <Button variant="outline" iconName="Download" iconPosition="left">
            Unduh Laporan PDF
          </Button>
          <Button variant="outline" iconName="FileSpreadsheet" iconPosition="left">
            Ekspor ke Excel
          </Button>
          <Button variant="outline" iconName="Share2" iconPosition="left">
            Bagikan Dashboard
          </Button>
          <Button variant="outline" iconName="Printer" iconPosition="left">
            Cetak Laporan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboard;