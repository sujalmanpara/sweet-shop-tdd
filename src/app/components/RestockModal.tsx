'use client';

import React, { useState } from 'react';
import { Sweet } from '@/models/Sweet';

interface RestockModalProps {
  sweet: Sweet;
  onConfirm: (quantity: number) => void;
  onClose: () => void;
}

const RestockModal: React.FC<RestockModalProps> = ({ sweet, onConfirm, onClose }) => {
  const [quantity, setQuantity] = useState(10);

  const handleConfirm = () => {
    onConfirm(quantity);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-4">Restock Sweet</h2>
      <p className="mb-2">You are restocking: <span className="font-semibold">{sweet.name}</span></p>
      <p className="mb-4">Current stock: <span className="font-semibold">{sweet.stock}</span></p>
      
      <div className="flex items-center space-x-4 mb-6">
        <label htmlFor="quantity" className="font-semibold">Quantity to Add:</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
          min="1"
          className="bg-background border border-border rounded-lg py-2 px-3 w-24 text-center"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button onClick={onClose} className="bg-muted text-muted-foreground font-bold py-2 px-4 rounded-lg hover:bg-muted/90 transition-colors">
          Cancel
        </button>
        <button onClick={handleConfirm} className="bg-secondary text-white font-bold py-2 px-4 rounded-lg hover:bg-secondary/90 transition-colors">
          Confirm Restock
        </button>
      </div>
    </div>
  );
};

export default RestockModal; 