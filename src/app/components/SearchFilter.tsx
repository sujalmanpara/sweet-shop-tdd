'use client';

export default function SearchFilter() {
  return (
    <div className="bg-card p-4 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Input */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-muted-foreground">
            Search
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search by name..."
            className="mt-1 block w-full bg-background border border-muted rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>

        {/* Category Filter */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-muted-foreground">
            Category
          </label>
          <select
            id="category"
            className="mt-1 block w-full bg-background border border-muted rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          >
            <option>All</option>
            <option>Chocolate</option>
            <option>Gummy</option>
            <option>Caramel</option>
            <option>Pie</option>
          </select>
        </div>

        {/* Price Range Slider */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-muted-foreground">
            Max Price
          </label>
          <input
            type="range"
            id="price"
            min="0"
            max="20"
            step="0.5"
            className="mt-1 block w-full"
          />
        </div>

        {/* Sort Options */}
        <div>
          <label htmlFor="sort" className="block text-sm font-medium text-muted-foreground">
            Sort by
          </label>
          <select
            id="sort"
            className="mt-1 block w-full bg-background border border-muted rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          >
            <option>Name</option>
            <option>Price</option>
            <option>Quantity</option>
          </select>
        </div>
      </div>
    </div>
  );
} 