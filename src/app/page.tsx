'use client';
import SweetShop from '@/services/SweetShop';
import { Sweet } from '@/models/Sweet';
import { useEffect, useState } from 'react';
import SweetList from './components/SweetList';
import AddSweetForm from './components/AddSweetForm';

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

  const handleAddSweet = (name: string, category: string, price: number, quantity: number) => {
    const newId = sweetShop.getAllSweets().length > 0 ? Math.max(...sweetShop.getAllSweets().map(s => s.id)) + 1 : 1;
    sweetShop.addSweet({ id: newId, name, category, price, quantity });
    setSweets(sweetShop.getAllSweets());
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">Sweet Shop</h1>
      <AddSweetForm onAddSweet={handleAddSweet} />
      <SweetList sweets={sweets} />
    </main>
  );
}
