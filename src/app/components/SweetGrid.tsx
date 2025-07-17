'use client';

import React from 'react';
import { Sweet } from '@/models/Sweet';
import SweetCard from './SweetCard';

interface SweetGridProps {
  sweets: Sweet[];
  onPurchase: (sweet: Sweet) => void;
  onRestock: (sweet: Sweet) => void;
  onEdit: (sweet: Sweet) => void;
  onDelete: (id: number) => void;
}

const SweetGrid: React.FC<SweetGridProps> = ({ sweets, ...props }) => {
  if (sweets.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-muted-foreground">No sweets found. Try adjusting your filters!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {sweets.map(sweet => (
        <SweetCard key={sweet.id} sweet={sweet} {...props} />
      ))}
    </div>
  );
};

export default SweetGrid; 