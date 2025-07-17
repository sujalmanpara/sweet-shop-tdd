'use client';

import SweetShop from '@/services/SweetShop';
import { Sweet } from '@/models/Sweet';
import { useEffect, useState } from 'react';
import InventoryStats from './components/InventoryStats';
import SearchFilter from './components/SearchFilter';
import SweetGrid from './components/SweetGrid';
import Modal from './components/Modal';
import SweetForm from './components/SweetForm';
import PurchaseModal from './components/PurchaseModal';
import RestockModal from './components/RestockModal';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { motion } from 'framer-motion';

const sweetShop = new SweetShop();
// Initial data
if (sweetShop.getAllSweets().length === 0) {
  sweetShop.addSweet({ id: 1001, name: 'Kaju Katli', category: 'Nut-Based', price: 50, stock: 20 });
  sweetShop.addSweet({ id: 1002, name: 'Gajar Halwa', category: 'Vegetable-Based', price: 30, stock: 15 });
  sweetShop.addSweet({ id: 1003, name: 'Gulab Jamun', category: 'Milk-Based', price: 10, stock: 5 });
  sweetShop.addSweet({ id: 1004, name: 'Chocolate Barfi', category: 'Chocolate', price: 40, stock: 0 });
}


export default function Home() {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [filteredSweets, setFilteredSweets] = useState<Sweet[]>([]);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedSweet, setSelectedSweet] = useState<Sweet | undefined>(undefined);

  useEffect(() => {
    const allSweets = sweetShop.getAllSweets();
    setSweets(allSweets);
    setFilteredSweets(allSweets);
  }, []);

  const refreshSweets = () => {
    const allSweets = sweetShop.getAllSweets();
    setSweets(allSweets);
    setFilteredSweets(allSweets); 
  };
  
  // Filter and Sort Logic
  const handleFilterChange = (filters: { search: string; category: string; price: number; sort: string }) => {
    let tempSweets = [...sweets];

    if (filters.search) {
      tempSweets = tempSweets.filter(s => s.name.toLowerCase().includes(filters.search.toLowerCase()));
    }

    if (filters.category !== 'All') {
      tempSweets = tempSweets.filter(s => s.category === filters.category);
    }

    tempSweets = tempSweets.filter(s => s.price <= filters.price);

    if (filters.sort === 'Name') {
      tempSweets.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filters.sort === 'Price') {
      tempSweets.sort((a, b) => a.price - b.price);
    } else if (filters.sort === 'Stock') {
      tempSweets.sort((a, b) => a.stock - b.stock);
    }

    setFilteredSweets(tempSweets);
  };

  // Handlers for opening modals
  const handleOpenModal = (modalName: string, sweet?: Sweet) => {
    setSelectedSweet(sweet);
    setActiveModal(modalName);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    setSelectedSweet(undefined);
  };
  
  // CRUD Handlers
  const handleSaveSweet = (sweetData: Omit<Sweet, 'id'> & { id?: number }) => {
    if (sweetData.id) {
      sweetShop.deleteSweet(sweetData.id);
      sweetShop.addSweet({ ...sweetData, id: sweetData.id });
      toast.success('Sweet updated successfully!');
    } else {
      const newId = sweetShop.getAllSweets().length > 0 ? Math.max(...sweetShop.getAllSweets().map(s => s.id)) + 1 : 1001;
      sweetShop.addSweet({ ...sweetData, id: newId });
      toast.success('Sweet added successfully!');
    }
    refreshSweets();
    handleCloseModal();
  };

  const handleDeleteSweet = (id: number) => {
    if (window.confirm('Are you sure you want to delete this sweet?')) {
      sweetShop.deleteSweet(id);
      refreshSweets();
      toast.success('Sweet deleted successfully!');
    }
  };

  const handlePurchase = (quantity: number) => {
    if (selectedSweet) {
      const result = sweetShop.purchaseSweet(selectedSweet.id, quantity);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
      refreshSweets();
      handleCloseModal();
    }
  };

  const handleRestock = (quantity: number) => {
    if (selectedSweet) {
      try {
        const result = sweetShop.restockSweet(selectedSweet.id, quantity);
        if (result.success) {
          toast.success(result.message);
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
      refreshSweets();
      handleCloseModal();
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <header className="bg-card shadow-md">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-primary">Sweet Shop Management System</h1>
        </div>
      </header>
      <main className="container mx-auto px-6 py-8">
        <InventoryStats
          sweets={sweets}
          lowStockThreshold={10}
        />
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-foreground">Sweets Inventory</h2>
          <motion.button 
            onClick={() => handleOpenModal('add')} 
            className="flex items-center bg-white text-black font-bold py-3 px-5 rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            animate={{
                boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
                transition: {
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                },
            }}
          >
            <FiPlus className="mr-2 text-primary" />
            Add New Sweet
          </motion.button>
        </div>
        <SearchFilter onFilterChange={handleFilterChange} categories={[...new Set(sweets.map(s => s.category))]} />
        <SweetGrid sweets={filteredSweets} onPurchase={(sweet) => handleOpenModal('purchase', sweet)} onRestock={(sweet) => handleOpenModal('restock', sweet)} onEdit={(sweet) => handleOpenModal('edit', sweet)} onDelete={handleDeleteSweet} />

        {/* Modals */}
        <Modal isOpen={activeModal === 'add' || activeModal === 'edit'} onClose={handleCloseModal}>
          <SweetForm sweet={selectedSweet} onSave={handleSaveSweet} onClose={handleCloseModal} />
        </Modal>
        {selectedSweet && (
          <>
            <Modal isOpen={activeModal === 'purchase'} onClose={handleCloseModal}>
              <PurchaseModal sweet={selectedSweet} onConfirm={handlePurchase} onClose={handleCloseModal} />
            </Modal>
            <Modal isOpen={activeModal === 'restock'} onClose={handleCloseModal}>
              <RestockModal sweet={selectedSweet} onConfirm={handleRestock} onClose={handleCloseModal} />
            </Modal>
          </>
        )}
      </main>
    </div>
  );
}
