'use client';

import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';

interface SearchFilterProps {
  onFilterChange: (filters: { search: string; category: string; price: number; sort: string }) => void;
  categories: string[];
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onFilterChange, categories }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [price, setPrice] = useState(100);
  const [sort, setSort] = useState('Name');

  useEffect(() => {
    onFilterChange({ search, category, price, sort });
  }, [search, category, price, sort, onFilterChange]);

  return (
    <div className="bg-card p-4 rounded-lg shadow-md mb-6 flex flex-wrap items-center justify-between">
      {/* Search Input */}
      <div className="relative flex-grow mr-4 mb-4 md:mb-0">
        <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted" />
        <input
          type="text"
          placeholder="Search for sweets..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="bg-background border border-border rounded-lg py-2 pl-10 pr-4 w-full focus:ring-primary focus:border-primary"
        />
      </div>

      {/* Category Filter */}
      <div className="flex items-center space-x-4">
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="bg-background border border-border rounded-lg py-2 px-4 focus:ring-primary focus:border-primary"
        >
          <option>All</option>
          {categories.map(cat => <option key={cat}>{cat}</option>)}
        </select>

        {/* Price Filter */}
        <div className="flex items-center space-x-2">
          <label htmlFor="price" className="text-muted">Price:</label>
          <input
            type="range"
            id="price"
            min="0"
            max="100"
            value={price}
            onChange={e => setPrice(Number(e.target.value))}
            className="w-32"
          />
          <span className="font-bold text-primary">${price}</span>
        </div>

        {/* Sort By */}
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="bg-background border border-border rounded-lg py-2 px-4 focus:ring-primary focus:border-primary"
        >
          <option>Name</option>
          <option>Price</option>
          <option>Stock</option>
        </select>
      </div>
    </div>
  );
};

export default SearchFilter; 