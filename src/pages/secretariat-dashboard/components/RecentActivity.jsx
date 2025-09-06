import React, { useEffect, useState } from 'react';
import { supabase } from '../../../../lib/supabaseClient';
import Icon from '../../../components/AppIcon';

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const getActivityIcon = (status) => {
    switch (status) {
      case 'pending': return 'Clock';
      case 'approved': return 'Check';
      case 'rejected': return 'X';
      case 'review': return 'Eye';
      default: return 'Activity';
    }
  };

  const getActivityColor = (status) => {
    switch (status) {
      case 'pending': return 'text-warning bg-warning/10';
      case 'approved': return 'text-success bg-success/10';
      case 'rejected': return 'text-destructive bg-destructive/10';
      case 'review': return 'text-primary bg-primary/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) return 'Baru saja';
    if (diffInMinutes < 60) return `${diffInMinutes} menit yang lalu`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} jam yang lalu`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} hari yang lalu`;

    return date?.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      
      // Ambil dokumen terbaru dan buat aktivitas dari perubahan status
      const { data, error } = await supabase
        .from('document')
        .select('*')
        .order('submitted_date', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching activities:', error.message);
      } else {
        // Transform dokumen menjadi aktivitas
        const activities = data?.map(doc => {
          let action = '';
          let timestamp = doc.submitted_date;
          let user = doc.submitted_by;

          if (doc.status === 'approved' && doc.approval_date) {
            action = `Menyetujui dokumen "${doc.title}"`;
            timestamp = doc.approval_date;
            user = doc.finalized_by || doc.submitted_by;
          } else if (doc.status === 'rejected' && doc.approval_date) {
            action = `Menolak dokumen "${doc.title}"`;
            timestamp = doc.approval_date;
            user = doc.finalized_by || doc.submitted_by;
          } else if (doc.status === 'pending') {
            action = `Mengupload dokumen "${doc.title}"`;
            timestamp = doc.submitted_date;
            user = doc.submitted_by;
          }

          return {
            id: doc.id,
            type: doc.status,
            user: user,
            action: action,
            document: doc.title,
            timestamp: timestamp
          };
        }) || [];

        setActivities(activities);
      }
      setLoading(false);
    };

    fetchActivities();
  }, []);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Aktivitas Terbaru</h3>
        <Icon name="Activity" size={20} className="text-muted-foreground" />
      </div>

      {loading ? (
        <div className="text-center py-8 text-muted-foreground">Memuat...</div>
      ) : activities?.length > 0 ? (
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={activity.id || index} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getActivityColor(activity?.type)}`}>
                <Icon name={getActivityIcon(activity?.type)} size={16} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-foreground truncate">
                    {activity?.user}
                  </p>
                  <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                    {formatTimeAgo(activity?.timestamp)}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-1">
                  {activity?.action}
                </p>

                {activity?.document && (
                  <p className="text-xs text-muted-foreground truncate">
                    Dokumen: {activity?.document}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Icon name="Activity" size={48} className="mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Belum ada aktivitas terbaru</p>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;