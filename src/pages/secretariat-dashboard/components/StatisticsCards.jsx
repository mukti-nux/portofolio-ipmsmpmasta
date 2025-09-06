import React, { useEffect, useState } from 'react';
import { supabase } from '../../../../lib/supabaseClient';
import Icon from '../../../components/AppIcon';

const StatisticsCards = () => {
  const [statistics, setStatistics] = useState({
    totalDocuments: 0,
    pendingDocuments: 0,
    approvedThisMonth: 0,
    averageProcessingTime: 0,
    // Data untuk perhitungan trend
    totalDocumentsLastMonth: 0,
    pendingDocumentsLastWeek: 0,
    approvedLastMonth: 0,
    averageProcessingTimeLastMonth: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      setLoading(true);
      
      try {
        const now = new Date();
        
        // 1. Total Dokumen (All Time)
        const { count: totalCount } = await supabase
          .from('document')
          .select('*', { count: 'exact', head: true });

        // 2. Total Dokumen Bulan Lalu (untuk trend)
        const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const lastDayLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        
        const { count: totalLastMonth } = await supabase
          .from('document')
          .select('*', { count: 'exact', head: true })
          .gte('submitted_date', firstDayLastMonth.toISOString())
          .lte('submitted_date', lastDayLastMonth.toISOString());

        // 3. Pending Dokumen (Sekarang)
        const { count: pendingCount } = await supabase
          .from('document')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending');

        // 4. Pending Dokumen Minggu Lalu (untuk trend)
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const { count: pendingLastWeek } = await supabase
          .from('document')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending')
          .lte('submitted_date', oneWeekAgo.toISOString());

        // 5. Disetujui Bulan Ini
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const { count: approvedThisMonth } = await supabase
          .from('document')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'approved')
          .gte('approval_date', firstDayOfMonth.toISOString());

        // 6. Disetujui Bulan Lalu (untuk trend)
        const { count: approvedLastMonth } = await supabase
          .from('document')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'approved')
          .gte('approval_date', firstDayLastMonth.toISOString())
          .lte('approval_date', lastDayLastMonth.toISOString());

        // 7. Rata-rata waktu proses (Bulan Ini)
        const { data: approvedDocsThisMonth } = await supabase
          .from('document')
          .select('submitted_date, approval_date')
          .eq('status', 'approved')
          .not('approval_date', 'is', null)
          .gte('approval_date', firstDayOfMonth.toISOString());

        let avgDaysThisMonth = 0;
        if (approvedDocsThisMonth?.length) {
          const totalDays = approvedDocsThisMonth.reduce((acc, doc) => {
            const submitted = new Date(doc.submitted_date);
            const approved = new Date(doc.approval_date);
            const diffDays = (approved - submitted) / (1000 * 60 * 60 * 24);
            return acc + diffDays;
          }, 0);
          avgDaysThisMonth = totalDays / approvedDocsThisMonth.length;
        }

        // 8. Rata-rata waktu proses (Bulan Lalu)
        const { data: approvedDocsLastMonth } = await supabase
          .from('document')
          .select('submitted_date, approval_date')
          .eq('status', 'approved')
          .not('approval_date', 'is', null)
          .gte('approval_date', firstDayLastMonth.toISOString())
          .lte('approval_date', lastDayLastMonth.toISOString());

        let avgDaysLastMonth = 0;
        if (approvedDocsLastMonth?.length) {
          const totalDays = approvedDocsLastMonth.reduce((acc, doc) => {
            const submitted = new Date(doc.submitted_date);
            const approved = new Date(doc.approval_date);
            const diffDays = (approved - submitted) / (1000 * 60 * 60 * 24);
            return acc + diffDays;
          }, 0);
          avgDaysLastMonth = totalDays / approvedDocsLastMonth.length;
        }

        setStatistics({
          totalDocuments: totalCount || 0,
          pendingDocuments: pendingCount || 0,
          approvedThisMonth: approvedThisMonth || 0,
          averageProcessingTime: avgDaysThisMonth || 0,
          // Data untuk trend
          totalDocumentsLastMonth: totalLastMonth || 0,
          pendingDocumentsLastWeek: pendingLastWeek || 0,
          approvedLastMonth: approvedLastMonth || 0,
          averageProcessingTimeLastMonth: avgDaysLastMonth || 0,
        });
      } catch (error) {
        console.error('Error fetching statistics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  // Helper function untuk menghitung persentase
  const calculatePercentage = (current, previous) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  };

  // Helper function untuk format trend
  const formatTrend = (current, previous, isTime = false) => {
    const percentage = calculatePercentage(current, previous);
    const isPositive = percentage >= 0;
    const absPercentage = Math.abs(percentage);
    
    if (isTime) {
      const diff = current - previous;
      return {
        value: `${isPositive ? '+' : ''}${diff.toFixed(1)} hari`,
        isPositive: !isPositive, // Untuk waktu, lebih rendah = lebih baik
        percentage: absPercentage.toFixed(1)
      };
    } else {
      return {
        value: `${isPositive ? '+' : ''}${absPercentage.toFixed(1)}%`,
        isPositive: isPositive,
        percentage: absPercentage.toFixed(1)
      };
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-6 animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-muted rounded-lg"></div>
              <div className="w-16 h-4 bg-muted rounded"></div>
            </div>
            <div className="w-20 h-8 bg-muted rounded mb-2"></div>
            <div className="w-24 h-4 bg-muted rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: 'Total Dokumen',
      value: statistics.totalDocuments,
      icon: 'FileText',
      color: 'bg-primary text-primary-foreground',
      trend: formatTrend(statistics.totalDocuments, statistics.totalDocumentsLastMonth),
      description: 'Semua dokumen yang pernah diupload'
    },
    {
      title: 'Menunggu Persetujuan',
      value: statistics.pendingDocuments,
      icon: 'Clock',
      color: 'bg-warning text-warning-foreground',
      trend: formatTrend(statistics.pendingDocuments, statistics.pendingDocumentsLastWeek),
      description: 'Dokumen yang masih pending'
    },
    {
      title: 'Disetujui Bulan Ini',
      value: statistics.approvedThisMonth,
      icon: 'CheckCircle',
      color: 'bg-success text-success-foreground',
      trend: formatTrend(statistics.approvedThisMonth, statistics.approvedLastMonth),
      description: 'Dokumen yang sudah disetujui'
    },
    {
      title: 'Rata-rata Waktu Proses',
      value: `${statistics.averageProcessingTime.toFixed(1)} hari`,
      icon: 'Timer',
      color: 'bg-secondary text-secondary-foreground',
      trend: formatTrend(statistics.averageProcessingTime, statistics.averageProcessingTimeLastMonth, true),
      description: 'Waktu rata-rata persetujuan'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards?.map((card, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6 hover:shadow-brand transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg ${card?.color} flex items-center justify-center`}>
              <Icon name={card?.icon} size={24} />
            </div>
            <div className={`flex items-center space-x-1 text-sm ${
              card?.trend?.isPositive ? 'text-success' : 'text-destructive'
            }`}>
              <Icon name={card?.trend?.isPositive ? 'TrendingUp' : 'TrendingDown'} size={16} />
              <span>{card?.trend?.value}</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-1">
              {card?.value}
            </h3>
            <p className="text-sm text-muted-foreground mb-1">
              {card?.title}
            </p>
            <p className="text-xs text-muted-foreground">
              {card?.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatisticsCards;