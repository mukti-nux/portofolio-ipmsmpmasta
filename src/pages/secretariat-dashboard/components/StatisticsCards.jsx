import React, { useEffect, useState } from 'react';
import { supabase } from '../../../../lib/supabaseClient';
import Icon from '../../../components/AppIcon';

const StatisticsCards = () => {
  const [statistics, setStatistics] = useState({
    totalDocuments: 0,
    pendingDocuments: 0,
    approvedThisMonth: 0,
    averageProcessingTime: 0,
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      // 1. Total Dokumen
      const { count: totalCount } = await supabase
        .from('document')
        .select('*', { count: 'exact', head: true });

      // 2. Pending Dokumen
      const { count: pendingCount } = await supabase
        .from('document')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      // 3. Disetujui Bulan Ini
      const now = new Date();
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
      const { count: approvedThisMonth } = await supabase
        .from('document')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'approved')
        .gte('submittedDate', firstDayOfMonth);

      // 4. Rata-rata waktu proses (butuh kolom submittedDate & approvedDate)
      const { data: approvedDocs } = await supabase
        .from('document')
        .select('submittedDate, approvedDate')
        .not('approvedDate', 'is', null);

      let avgDays = 0;
      if (approvedDocs?.length) {
        const totalDays = approvedDocs.reduce((acc, doc) => {
          const submitted = new Date(doc.submittedDate);
          const approved = new Date(doc.approvedDate);
          const diffDays = (approved - submitted) / (1000 * 60 * 60 * 24);
          return acc + diffDays;
        }, 0);
        avgDays = (totalDays / approvedDocs.length).toFixed(1);
      }

      setStatistics({
        totalDocuments: totalCount || 0,
        pendingDocuments: pendingCount || 0,
        approvedThisMonth: approvedThisMonth || 0,
        averageProcessingTime: avgDays || 0,
      });
    };

    fetchStatistics();
  }, []);

  const cards = [
    {
      title: 'Total Dokumen',
      value: statistics.totalDocuments,
      icon: 'FileText',
      color: 'bg-primary text-primary-foreground',
      trend: '+12%', // ini masih dummy, bisa diganti hitung beneran
      trendUp: true
    },
    {
      title: 'Menunggu Persetujuan',
      value: statistics.pendingDocuments,
      icon: 'Clock',
      color: 'bg-warning text-warning-foreground',
      trend: '+5',
      trendUp: true
    },
    {
      title: 'Disetujui Bulan Ini',
      value: statistics.approvedThisMonth,
      icon: 'CheckCircle',
      color: 'bg-success text-success-foreground',
      trend: '+18%',
      trendUp: true
    },
    {
      title: 'Rata-rata Waktu Proses',
      value: `${statistics.averageProcessingTime} hari`,
      icon: 'Timer',
      color: 'bg-secondary text-secondary-foreground',
      trend: '-2 hari',
      trendUp: true
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
              card?.trendUp ? 'text-success' : 'text-destructive'
            }`}>
              <Icon name={card?.trendUp ? 'TrendingUp' : 'TrendingDown'} size={16} />
              <span>{card?.trend}</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-1">
              {card?.value}
            </h3>
            <p className="text-sm text-muted-foreground">
              {card?.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatisticsCards;
