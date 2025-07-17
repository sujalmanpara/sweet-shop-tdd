'use client';

import React, { useState, useEffect } from 'react';
import { Sweet } from '@/models/Sweet';

interface SweetFormProps {
  sweet?: Sweet;
  onSave: (sweetData: Omit<Sweet, 'id'> & { id?: number }) => void;
  onClose: () => void;
}

const SweetForm: React.FC<SweetFormProps> = ({ sweet, onSave, onClose }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  useEffect(() => {
    if (sweet) {
      setName(sweet.name);
      setCategory(sweet.category);
      setPrice(sweet.price);
      setStock(sweet.stock);
    }
  }, [sweet]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ id: sweet?.id, name, category, price, stock });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-primary mb-6">{sweet ? 'Edit Sweet' : 'Add New Sweet'}</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-muted-foreground">Name</label>
          <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full bg-background border-border rounded-lg py-2 px-3 shadow-sm focus:ring-primary focus:border-primary" />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-muted-foreground">Category</label>
          <input type="text" id="category" value={category} onChange={e => setCategory(e.target.value)} required className="mt-1 block w-full bg-background border-border rounded-lg py-2 px-3 shadow-sm focus:ring-primary focus:border-primary" />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-muted-foreground">Price</label>
          <input type="number" id="price" value={price} onChange={e => setPrice(Number(e.target.value))} min="0" step="0.01" required className="mt-1 block w-full bg-background border-border rounded-lg py-2 px-3 shadow-sm focus:ring-primary focus:border-primary" />
        </div>
        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-muted-foreground">Stock</label>
          <input type="number" id="stock" value={stock} onChange={e => setStock(Number(e.target.value))} min="0" required className="mt-1 block w-full bg-background border-border rounded-lg py-2 px-3 shadow-sm focus:ring-primary focus:border-primary" />
        </div>
      </div>

      <div className="flex justify-end space-x-4 mt-8">
        <button type="button" onClick={onClose} className="bg-transparent border border-muted text-muted hover:text-foreground hover:bg-muted/10 font-bold py-2 px-4 rounded-lg transition-colors">
          Cancel
        </button>
        <button type="submit" className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors">
          Save Sweet
        </button>
      </div>
    </form>
  );
};

export default SweetForm; 