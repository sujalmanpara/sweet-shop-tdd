'use client';
import SweetShop from '@/services/SweetShop';
import { Sweet } from '@/models/Sweet';
import { useEffect, useState } from 'react';
import SweetList from './components/SweetList';
import SearchFilter from './components/SearchFilter';
import Modal from './components/Modal';
import SweetForm from './components/SweetForm';
import toast from 'react-hot-toast';

// Instantiate the shop and pre-populate with some data
const sweetShop = new SweetShop();
sweetShop.addSweet({ id: 1, name: 'Chocolate Delight', category: 'Chocolate', price: 2.5, quantity: 10 });
sweetShop.addSweet({ id: 2, name: 'Gummy Bears', category: 'Gummy', price: 1.75, quantity: 5 });
sweetShop.addSweet({ id: 3, name: 'Caramel Chew', category: 'Caramel', price: 0.5, quantity: 100 });
sweetShop.addSweet({ id: 4, name: 'Apple Pie', category: 'Pie', price: 12.5, quantity: 2 });


export default function Home() {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSweet, setEditingSweet] = useState<Sweet | undefined>(undefined);

  useEffect(() => {
    setSweets(sweetShop.getAllSweets());
  }, []);

  const handleOpenModal = (sweet?: Sweet) => {
    setEditingSweet(sweet);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingSweet(undefined);
    setIsModalOpen(false);
  };

  const handleSaveSweet = (sweetData: Omit<Sweet, 'id'> & { id?: number }) => {
    if (sweetData.id) {
      // This is an update, but our service doesn't have an update method.
      // We can fake it by deleting the old one and adding a new one.
      sweetShop.deleteSweet(sweetData.id);
      sweetShop.addSweet({ ...sweetData, id: sweetData.id });
      toast.success('Sweet updated successfully!');
    } else {
      const newId = sweetShop.getAllSweets().length > 0 ? Math.max(...sweetShop.getAllSweets().map(s => s.id)) + 1 : 1;
      sweetShop.addSweet({ ...sweetData, id: newId });
      toast.success('Sweet added successfully!');
    }
    setSweets(sweetShop.getAllSweets());
    handleCloseModal();
  };

  const handleDeleteSweet = (id: number) => {
    sweetShop.deleteSweet(id);
    setSweets(sweetShop.getAllSweets());
    toast.success('Sweet deleted successfully!');
  };

  const totalSweets = sweets.length;
  const lowStockSweets = sweets.filter(s => s.quantity < 10).length;
  const categories = [...new Set(sweets.map(s => s.category))].length;

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-primary">Sweet Shop Management System</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-muted-foreground">Total Sweets</h3>
            <p className="text-3xl font-bold text-foreground">{totalSweets}</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-muted-foreground">Low Stock Alerts</h3>
            <p className="text-3xl font-bold text-secondary">{lowStockSweets}</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-muted-foreground">Categories</h3>
            <p className="text-3xl font-bold text-foreground">{categories}</p>
          </div>
        </div>

        {/* Search, Filter, and Add Button */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="w-full md:w-auto flex-grow">
            <SearchFilter />
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="bg-primary text-primary-foreground font-bold py-2 px-4 rounded-lg shadow-md hover:bg-primary/90 transition-colors"
          >
            Add New Sweet
          </button>
        </div>
        
        <SweetList sweets={sweets} onEdit={handleOpenModal} onDelete={handleDeleteSweet} />

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <SweetForm sweet={editingSweet} onSave={handleSaveSweet} onClose={handleCloseModal} />
        </Modal>
      </main>
    </div>
  );
}
