'use client';
import SweetShop from '@/services/SweetShop';
import { Sweet } from '@/models/Sweet';
import { useEffect, useState } from 'react';

// Instantiate the shop and pre-populate with some data
const sweetShop = new SweetShop();
sweetShop.addSweet({ id: 1, name: 'Chocolate Delight', category: 'Chocolate', price: 2.5, quantity: 10 });
sweetShop.addSweet({ id: 2, name: 'Gummy Bears', category: 'Gummy', price: 1.75, quantity: 50 });
sweetShop.addSweet({ id: 3, name: 'Caramel Chew', category: 'Caramel', price: 0.5, quantity: 100 });

export default function Home() {
  const [sweets, setSweets] = useState<Sweet[]>([]);

  useEffect(() => {
    setSweets(sweetShop.getAllSweets());
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">Sweet Shop</h1>
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sweets.map(sweet => (
            <div key={sweet.id} className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800">{sweet.name}</h2>
              <p className="text-gray-600">{sweet.category}</p>
              <p className="text-lg font-semibold text-gray-900 mt-2">${sweet.price.toFixed(2)}</p>
              <p className="text-gray-500">In Stock: {sweet.quantity}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
