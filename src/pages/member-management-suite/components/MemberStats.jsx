import React from 'react';
import Icon from '../../../components/AppIcon';

const MemberStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Anggota',
      value: stats?.totalMembers,
      change: '+12',
      changeType: 'increase',
      icon: 'Users',
      color: 'bg-blue-500'
    },
    {
      title: 'Anggota Aktif',
      value: stats?.activeMembers,
      change: '+8',
      changeType: 'increase',
      icon: 'UserCheck',
      color: 'bg-green-500'
    },
    {
      title: 'Anggota Baru',
      value: stats?.newMembers,
      change: '+5',
      changeType: 'increase',
      icon: 'UserPlus',
      color: 'bg-purple-500'
    },
    {
      title: 'Menunggu Persetujuan',
      value: stats?.pendingMembers,
      change: '-2',
      changeType: 'decrease',
      icon: 'Clock',
      color: 'bg-yellow-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {statCards?.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6 hover:shadow-brand transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{stat?.title}</p>
              <p className="text-2xl font-bold text-foreground">{stat?.value}</p>
              <div className="flex items-center mt-2">
                <Icon 
                  name={stat?.changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                  size={14} 
                  className={stat?.changeType === 'increase' ? 'text-green-500' : 'text-red-500'} 
                />
                <span className={`text-xs ml-1 ${
                  stat?.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat?.change} bulan ini
                </span>
              </div>
            </div>
            <div className={`w-12 h-12 ${stat?.color} rounded-lg flex items-center justify-center`}>
              <Icon name={stat?.icon} size={24} color="white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MemberStats;