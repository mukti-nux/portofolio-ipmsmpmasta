import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MemberCard = ({ member, onEdit, onView, onMessage }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'suspended':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'secretary':
        return 'bg-blue-100 text-blue-800';
      case 'treasurer':
        return 'bg-emerald-100 text-emerald-800';
      case 'member':
        return 'bg-slate-100 text-slate-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-brand transition-all duration-200 hover-lift">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Image
              src={member?.avatar}
              alt={member?.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
              member?.isOnline ? 'bg-green-500' : 'bg-gray-400'
            }`}></div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{member?.name}</h3>
            <p className="text-sm text-muted-foreground">{member?.email}</p>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(member?.status)}`}>
                {member?.status?.charAt(0)?.toUpperCase() + member?.status?.slice(1)}
              </span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(member?.role)}`}>
                {member?.role?.charAt(0)?.toUpperCase() + member?.role?.slice(1)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="MessageCircle"
            onClick={() => onMessage(member)}
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="Eye"
            onClick={() => onView(member)}
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="Edit"
            onClick={() => onEdit(member)}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-muted-foreground">Nomor Anggota</p>
          <p className="text-sm font-medium text-foreground">{member?.memberNumber}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Tanggal Bergabung</p>
          <p className="text-sm font-medium text-foreground">{member?.joinDate}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Telepon</p>
          <p className="text-sm font-medium text-foreground">{member?.phone}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Departemen</p>
          <p className="text-sm font-medium text-foreground">{member?.department}</p>
        </div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={14} />
            <span>Aktivitas: {member?.lastActivity}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="FileText" size={14} />
            <span>{member?.documentsCount} dokumen</span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Star" size={14} className="text-yellow-500" />
          <span className="text-xs font-medium text-foreground">{member?.contributionScore}</span>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;