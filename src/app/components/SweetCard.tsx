'use client';

import { Sweet } from '@/models/Sweet';

interface SweetCardProps {
  sweet: Sweet;
  onEdit: (sweet: Sweet) => void;
  onDelete: (id: number) => void;
}

const getStockLevelColor = (quantity: number) => {
  if (quantity < 10) return 'text-red-500';
  if (quantity < 25) return 'text-yellow-500';
  return 'text-green-500';
};

export default function SweetCard({ sweet, onEdit, onDelete }: SweetCardProps) {
  return (
    <div className="bg-card shadow-lg rounded-lg p-6 flex flex-col justify-between transition-transform transform hover:scale-105">
      <div>
        <div className="mb-4">
          {/* Placeholder for an image */}
          <div className="w-full h-32 bg-background rounded-md mb-4"></div>
          <h2 className="text-2xl font-bold text-foreground">{sweet.name}</h2>
          <p className="text-muted-foreground">{sweet.category}</p>
        </div>
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-semibold text-secondary">${sweet.price.toFixed(2)}</p>
          <p className={`font-semibold ${getStockLevelColor(sweet.quantity)}`}>
            In Stock: {sweet.quantity}
          </p>
        </div>
      </div>
      <div className="flex justify-between gap-2">
        <button className="bg-blue-600 text-white py-1 px-3 rounded-md text-sm hover:bg-blue-700 transition-colors">Purchase</button>
        <button className="bg-green-600 text-white py-1 px-3 rounded-md text-sm hover:bg-green-700 transition-colors">Restock</button>
        <button onClick={() => onEdit(sweet)} className="bg-yellow-500 text-white py-1 px-3 rounded-md text-sm hover:bg-yellow-600 transition-colors">Edit</button>
        <button onClick={() => onDelete(sweet.id)} className="bg-red-600 text-white py-1 px-3 rounded-md text-sm hover:bg-red-700 transition-colors">Delete</button>
      </div>
    </div>
  );
} 