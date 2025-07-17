'use client';

import { Sweet } from '@/models/Sweet';
import { useEffect, useState } from 'react';

interface SweetFormProps {
  sweet?: Sweet;
  onSave: (sweet: Omit<Sweet, 'id'> & { id?: number }) => void;
  onClose: () => void;
}

export default function SweetForm({ sweet, onSave, onClose }: SweetFormProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    if (sweet) {
      setName(sweet.name);
      setCategory(sweet.category);
      setPrice(sweet.price.toString());
      setQuantity(sweet.quantity.toString());
    }
  }, [sweet]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: sweet?.id,
      name,
      category,
      price: parseFloat(price),
      quantity: parseInt(quantity),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4 text-foreground">{sweet ? 'Edit Sweet' : 'Add New Sweet'}</h2>
      {/* Form fields */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-muted-foreground">Name</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full bg-background border border-muted rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" required />
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-muted-foreground">Category</label>
        <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 block w-full bg-background border border-muted rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" required />
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block text-sm font-medium text-muted-foreground">Price</label>
        <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 block w-full bg-background border border-muted rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" required />
      </div>
      <div className="mb-4">
        <label htmlFor="quantity" className="block text-sm font-medium text-muted-foreground">Quantity</label>
        <input type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="mt-1 block w-full bg-background border border-muted rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" required />
      </div>
      <div className="flex justify-end gap-4 mt-6">
        <button type="button" onClick={onClose} className="bg-muted text-muted-foreground py-2 px-4 rounded-md hover:bg-muted/80 transition-colors">Cancel</button>
        <button type="submit" className="bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors">Save</button>
      </div>
    </form>
  );
} 