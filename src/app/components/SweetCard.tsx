'use client';

import React from 'react';
import { Sweet } from '@/models/Sweet';
import { FiShoppingCart, FiPlusSquare, FiEdit, FiTrash2 } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface SweetCardProps {
  sweet: Sweet;
  onPurchase: (sweet: Sweet) => void;
  onRestock: (sweet: Sweet) => void;
  onEdit: (sweet: Sweet) => void;
  onDelete: (id: number) => void;
}

const SweetCard: React.FC<SweetCardProps> = ({ sweet, onPurchase, onRestock, onEdit, onDelete }) => {
  const getStockColor = () => {
    if (sweet.stock === 0) return 'bg-red-500';
    if (sweet.stock < 10) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, scale: 1.03 }}
      className="bg-card rounded-xl shadow-lg overflow-hidden flex flex-col"
    >
      <div className={`w-full h-2 ${getStockColor()}`}></div>
      
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-2">
            <div>
                <h3 className="text-xl font-bold text-primary">{sweet.name}</h3>
                <p className="text-sm text-muted-foreground">{sweet.category}</p>
            </div>
            <p className="text-2xl font-bold text-secondary">${sweet.price.toFixed(2)}</p>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          <span className="font-bold">{sweet.stock}</span> units in stock
        </p>
      </div>

      <div className="bg-background/50 p-3 flex justify-around items-center">
        <button onClick={() => onPurchase(sweet)} title="Purchase" className="p-2 rounded-full text-muted-foreground hover:bg-blue-500/10 hover:text-blue-500 transition-colors">
            <FiShoppingCart size={20} />
        </button>
        <button onClick={() => onRestock(sweet)} title="Restock" className="p-2 rounded-full text-muted-foreground hover:bg-green-500/10 hover:text-green-500 transition-colors">
            <FiPlusSquare size={20} />
        </button>
        <button onClick={() => onEdit(sweet)} title="Edit" className="p-2 rounded-full text-muted-foreground hover:bg-yellow-500/10 hover:text-yellow-500 transition-colors">
            <FiEdit size={20} />
        </button>
        <button onClick={() => onDelete(sweet.id)} title="Delete" className="p-2 rounded-full text-muted-foreground hover:bg-red-500/10 hover:text-red-500 transition-colors">
            <FiTrash2 size={20} />
        </button>
      </div>
    </motion.div>
  );
};

export default SweetCard; 