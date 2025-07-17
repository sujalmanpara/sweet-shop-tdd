import React from 'react';
import { Package, TrendingDown, Layers } from 'lucide-react';
import { Sweet } from '@/models/Sweet';

interface InventoryStatsProps {
  sweets: Sweet[];
  lowStockThreshold: number;
}

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: number; color: string }> = ({ icon, label, value, color }) => (
  <div className="bg-card p-6 rounded-lg shadow-md flex items-center">
    <div className={`p-3 rounded-full mr-4 ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-muted-foreground">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const InventoryStats: React.FC<InventoryStatsProps> = ({ sweets, lowStockThreshold }) => {
  const totalSweets = sweets.length;
  const lowStockCount = sweets.filter(s => s.stock < lowStockThreshold).length;
  const categoryCount = new Set(sweets.map(s => s.category)).size;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard 
        icon={<Package size={24} className="text-white" />} 
        label="Total Sweets" 
        value={totalSweets}
        color="bg-blue-500"
      />
      <StatCard 
        icon={<TrendingDown size={24} className="text-white" />} 
        label="Low Stock" 
        value={lowStockCount}
        color={lowStockCount > 0 ? "bg-red-500" : "bg-green-500"}
      />
      <StatCard 
        icon={<Layers size={24} className="text-white" />} 
        label="Categories" 
        value={categoryCount}
        color="bg-purple-500"
      />
    </div>
  );
};

export default InventoryStats; 