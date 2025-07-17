'use client';

import { useState } from 'react';

interface AddSweetFormProps {
  onAddSweet: (name: string, category: string, price: number, quantity: number) => void;
}

export default function AddSweetForm({ onAddSweet }: AddSweetFormProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddSweet(name, category, parseFloat(price), parseInt(quantity));
    setName('');
    setCategory('');
    setPrice('');
    setQuantity('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 w-full max-w-md bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add a New Sweet</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Category</label>
        <input type="text" id="category" value={category} onChange={e => setCategory(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price</label>
        <input type="number" id="price" value={price} onChange={e => setPrice(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
      </div>
      <div className="mb-6">
        <label htmlFor="quantity" className="block text-gray-700 font-bold mb-2">Quantity</label>
        <input type="number" id="quantity" value={quantity} onChange={e => setQuantity(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
      </div>
      <div className="flex items-center justify-between">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Add Sweet
        </button>
      </div>
    </form>
  );
} 